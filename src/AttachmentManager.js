/* Copyright (c) 2010, Sage Software, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Attatchment Manager 
 */
define('Mobile/SalesLogix/AttachmentManager', [
    'Mobile/SalesLogix/FileManager',
    'dojo/_base/lang',
    'dojo/_base/declare',
    'dojo/string',
    'dojo/number',
    'Sage/Platform/Mobile/Convert'
], function(
    FileManager,
    lang,
    declare,
    string,
    dNumber,
    convert
) {
    return declare('Mobile.SalesLogix.AttachmentManager', null, {
        _fileManager: null,
        _entityContext: null,
        _uploadUrl: '',
        _baseUrl: '',
        _attachmentTemplate: false,
        serviceName: false,
        contractName: 'system',
        resourceKind: 'attachments',
        querySelect: null,
        queryInclude: null,
        _files: null,
        _fileDescriptions: null,
        _filesUploadedCount: 0,
        _fileCount: 0,
        _totalProgress: 0,
        _isUploading:false,
        constructor: function() {
            var service, oldContractName;
            this.querySelect = [];
            this.queryInclude = [];
            this._files = [];
            this._fileDescriptions = [];
            this._fileManager = new FileManager();
            service = App.getService(this.serviceName);
            oldContractName = service.getContractName();
            service.setContractName(this.contractName);
            this._baseUrl = service.getUri().toString();
            this._uploadUrl = this._baseUrl + '/attachments/file';
            service.setContractName(oldContractName);            
        },
        createAttachments: function(files) {

        },
        createAttachment: function(file, mixin) {
            if (!mixin.hasOwnProperty('description')) {
                mixin['description'] = this._getDefaultDescription(file.name);
            }
            this._files.push(file);
            this._fileDescriptions.push({
                fileName:file.name, 
                description: mixin['description']
            });
            this.uploadFiles();
        },
        _getDefaultDescription: function(filename) {
            return filename.replace(/\.[\w]*/, '');
        },
        getAttachmentTemplate: function(callback) {
            this.requestTemplate(
                function(template) {
                    this._attachmentTemplate = template;
                    this.uploadFiles();
                },
                this.onRequestTemplateFailure
            );
        },
        getAttachmentUrl: function(attachmentId) {
            var fileUrl = this._baseUrl + '/attachments(\'' + attachmentId + '\')/file';
            return fileUrl;
        },
        _getFileDescription: function(fileName) {
            var description = this._getDefaultDescription(fileName);
            for (var i = 0; i < this._fileDescriptions.length; i++) {
                if (fileName === this._fileDescriptions[i].fileName) {
                    description = this._fileDescriptions[i].description;
                }
            }
            if ((description === null)|| (description === '')) {
                description = this._getDefaultDescription(fileName);
            }
            return description;
        },
        _getAttachmentContextMixin: function(fileName) {
            var contextMixin;
            contextMixin = this._getAttachmentContext();            
            return contextMixin;
        },
        _getAttachmentContext: function() {
            var contextView, view, entry, contextData, found;

            contextData = {};
            found = App.queryNavigationContext(function(o) {
                var context = (o.options && o.options.source) || o;
                if (/^(accounts|contacts|opportunities|tickets|leads|activities|history)$/.test(context.resourceKind) && context.key) {
                    return true;
                }
                return false;
            });
            contextView = (found && found.options && found.options.source) || found;
            if (contextView) {
                view = App.getView(contextView.id),
                entry = contextView.entry || (view && view.entry) || contextView;

                if (!entry || !entry['$key']) {
                    return {};
                }

                switch (contextView.resourceKind) {
                    case 'accounts':
                        contextData = { accountId: entry['$key'], accountName: entry['$descriptor'] };
                        break;
                    case 'contacts':
                        contextData = { contactId: entry['$key'], contactName: entry['$descriptor'], accountId: entry['Account']['$key'], accountName: entry['Account']['AccountName'] };
                        break;
                    case 'opportunities':
                        contextData = { opportunityId: entry['$key'], oppDescription: entry['$descriptor'], accountId: entry['Account']['$key'], accountName: entry['Account']['AccountName'] };
                        break;
                    case 'tickets':
                        contextData = { ticketId: entry['$key'], ticketNumber: entry['$descriptor'], accountId: entry['Account']['$key'], accountName: entry['Account']['AccountName'], contactId: entry['Contact']['$key'], contactName: entry['Contact']['$descriptor'] };
                        break;
                    case 'leads':
                        contextData = { leadId: entry['$key'], accountName: entry['$descriptor'] };
                        break;
                    case 'activities':
                        contextData = { activityId: entry['$key'], contactId: entry['ContactId'], contactName: entry['ContactName'], accountId: entry['AccountId'], accountName: entry['AccountName'], opportunityId: entry['OpportunityId'], ticketId: entry['TicketId'], };
                        break;
                    case 'history':
                        contextData = { historyId: entry['$key'], contactId: entry['ContactId'], contactName: entry['ContactName'], accountId: entry['AccountId'], accountName: entry['AccountName'], opportunityId: entry['OpportunityId'], ticketId: entry['TicketId'], };
                        break;
                    default:
                        contextData = { entityId: entry['$key'], entityName: contextView.id, description: entry['$descriptor'] };
                        break;
                }
            }
            return contextData;
        },
        getService: function() {
            return App.getService(this.serviceName); /* if false is passed, the default service will be returned */
        },
        createTemplateRequest: function() {
            var request = new Sage.SData.Client.SDataTemplateResourceRequest(this.getService());
            request.setResourceKind(this.resourceKind);
            request.setContractName(this.contractName);
            request.setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Select, this.querySelect.join(','));
            request.setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Include, this.queryInclude.join(','));            
            return request;
        },
        requestTemplate: function(onSucess, onFailure) {
            var request = this.createTemplateRequest();
            if (request)
                request.read({
                    success: onSucess,
                    failure: onFailure,
                    scope: this
                });
        },
        onRequestTemplateFailure: function(response, o) {

        },
        onRequestTemplateSuccess: function(entry) {
            this.processTemplateEntry(entry);
        },
        createDataRequest: function(id) {
            var request = new Sage.SData.Client.SDataSingleResourceRequest(this.getService());
            request.setResourceKind(this.resourceKind);
            request.setContractName(this.contractName);
            request.setResourceSelector(string.substitute("'${0}'", [id]));

            request.setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Select, this.querySelect.join(','));
            request.setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Include, this.queryInclude.join(','));
            request.setQueryArg('_includeFile', 'false');
            return request;
        },
        requestData: function(attachmnetId, onSucess, onFailure) {
            var request = this.createDataRequest(attachmnetId);
            if (request)
                request.read({
                    success: onSucess,
                    failure: onFailure,
                    scope: this
                });
        },
        onRequestTemplateFailure: function(response, o) {

        },
        onRequestDataFailure: function(response, o) {

        },
        uploadFiles: function() {
            var file
            this._isUploading = true;
            this._fileCount = this._files.length;
            while (this._files.length > 0) {
                file = this._files.pop();
                this._fileManager.uploadFile(file,
                this._uploadUrl,
                this._updateProgress,
                this._onSuccessUpload,
                this._onFailedUpload,
                this);
            }
        },
        _onSuccessUpload: function(request) {
            //the id of the new attachment is buried in the Location response header...
            var url, re, matches, id;
           
            url = request.getResponseHeader('Location');
            re = /\'\w+\'/g;
            matches = url.match(re);

            if (matches) {
                id = matches[0].replace(/\'/g, '');
                //now that we have the id, we can fetch it using the SingleEntrySDataStore
                this.requestData(id, function(attachment) {
                    var request, mixin;
                    mixin = this._getAttachmentContextMixin(attachment.fileName);
                    if (mixin) {
                        attachment.attachDate = convert.toIsoStringFromDate(new Date());
                        attachment.dataType = 'R';
                        attachment.description = this._getFileDescription(attachment.fileName);
                        attachment = lang.mixin(attachment, mixin);
                        request = this.createDataRequest(id);
                        if (request){
                            request.update(attachment, {
                                success: this.onSuccessUpdate,
                                failure: this._onFailedUpdate,
                                scope: this
                            });
                        }
                    }
                },
                    this.onRequestDataFailure
                );

            }
        },
        _onFailedUpload: function(resp) {
            console.warn('Attachment failed to upload %o', resp);
        },
        _onFailedAdd: function(resp) {
            console.warn('Attachment failed to save %o', resp);
        },
        onSuccessUpdate: function(attachment) {
        },
        _onFailedUpdate: function(resp) {
            console.warn('Attachment failed to update %o', resp);
        },
        _updateProgress: function(curFileProgress) {
            var pct, filePercent;

            pct = this._totalProgress;
      
            if (curFileProgress && curFileProgress.lengthComputable) {
                filePercent = (curFileProgress.loaded / curFileProgress.total) * 100;
                pct += Math.round(filePercent / this._fileCount);
            } else if (curFileProgress) {
                pct = curFileProgress;
            }
            this._totalProgress = pct;
            if (pct < 99) {

            } else {
                this._resetCounts();
            }
        },
        _resetCounts: function() {
            this._fileCount = 0;
            this._filesUploadedCount = 0;
            this._isUploading = false;
            this._totalProgress = 0;
        },
        getAttachmentFile: function(attachmentId, responseType, onSuccsess) {
             var url, fm;
             url = this.getAttachmentUrl(attachmentId);
             fm = this._fileManager.getFile(url, responseType, onSuccsess);
        }
    });
});
