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
    'Sage/Platform/Mobile/FileManager',
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
        _filesUploadedCount: 0,
        _fileCount: 0,
        _totalProgress: 0,
        _isUploading:false,
        constructor: function() {
            var service, oldContractName;
            this.querySelect = [];
            this.queryInclude = [];
            this._files = [];
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
        _getAttachmentContextMixin: function(fileName) {
            var contextMixin;
            contextMixin = this._getAttachmentContext();
            return contextMixin;
        },
        _getAttachmentContext: function() {
            var contextView;
            var view;
            var entry;
            var contextData = {};
            var found;
            found = App.queryNavigationContext(function(o) {
                var context = (o.options && o.options.source) || o;
                if (/^(accounts|contacts|opportunities|tickets|leads|activities)$/.test(context.resourceKind) && context.key) {
                    return true;
                }
                return false;
            });
            contextView = (found && found.options && found.options.source) || found;
            if (contextView) {
                view = App.getView(contextView.id),
                entry = contextView.entry || (view && view.entry) || contextView;

                if (!entry || !entry['$key']) {
                    return null;
                }

                switch (contextView.resourceKind) {
                    case 'accounts':
                        contextData = { accountId: entry['$key'], accountName: entry['$descriptor'] };
                        break;
                    case 'contacts':
                        contextData = { contactId: entry['$key'], contactName: entry['$descriptor'], accountId: entry['AccountId'], accountName: entry['AccountName'] };
                        break;
                    case 'opportunities':
                        contextData = { opportuntityId: entry['$key'], description: entry['$descriptor'], accountId: entry['AccountId'], accountName: entry['AccountName'] };
                        break;
                    case 'tickets':
                        contextData = { ticketId: entry['$key'], ticketNumber: entry['$descriptor'], accountId: entry['AccountId'], accountName: entry['AccountName'] };
                        break;
                    case 'leads':
                        contextData = { leadId: entry['$key'], accountName: entry['$descriptor'] };
                        break;
                    case 'activites':
                        contextData = { actviityId: entry['$key'], contactId: entry['ContactId'], contactName: entry['ContactName'], accountId: entry['AccountId'], accountName: entry['AccountName'] };
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
            // alert(string.substitute(this.requestErrorText, [response, o]));
            // ErrorManager.addError(response, o, this.options, 'failure');
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
            // alert(string.substitute(this.requestErrorText, [response, o]));
            // ErrorManager.addError(response, o, this.options, 'failure');
        },
        onRequestDataFailure: function(response, o) {
            // alert(string.substitute(this.requestErrorText, [response, o]));
            // ErrorManager.addError(response, o, this.options, 'failure');
        },
        uploadFiles: function() {
            this._isUploading = true;
            this._fileCount = this._files.length;
            while (this._files.length > 0) {
                var file = this._files.pop();
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
            var url = request.getResponseHeader('Location');
            var re = /\'\w+\'/g;
            var matches = url.match(re);
            if (matches) {
                var id = matches[0].replace(/\'/g, '');
                //now that we have the id, we can fetch it using the SingleEntrySDataStore
                this.requestData(id, function(attachment) {
                    var mixin = this._getAttachmentContextMixin(attachment.fileName);
                    if (mixin) {
                        attachment.attachDate = convert.toIsoStringFromDate(new Date());
                        attachment.dataType = 'R';
                        attachment.description = this._getDefaultDescription(attachment.fileName);
                        attachment = lang.mixin(attachment, mixin);
                        var request = this.createDataRequest(id);
                        if (request){
                            request.update(attachment, {
                                success: this.onSuccessUpdate,
                                failure: this._onFailedUpdate,
                                scope: this
                            });
                        }
                    }
                    //clean up in case they upload the same file again to another entity or something
                    //delete (this._mixinsByName[attachment.fileName]);
                
                },
                    this.onRequestDataFailure
                );
               
            }
            // this._filesUploadedCount = this._filesUploadedCount + 1;
            // this._updateProgress((this._fileCount < 1) ? 100 : (this._filesUploadedCount / this._fileCount) * 100);
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
            //console.log('progress obj: %o', curFileProgress);
            var pct = this._totalProgress;
            //console.log('pct: ' + pct);
            if (curFileProgress && curFileProgress.lengthComputable) {
                var thisFilePercent = (curFileProgress.loaded / curFileProgress.total) * 100;
                pct += Math.round(thisFilePercent / this._fileCount);
            } else if (curFileProgress) {
                pct = curFileProgress;
            }
            this._totalProgress = pct;
            //console.log('now calculated pct: ' + pct);
            if (pct < 99) {
                // dialogs.showProgressBar({
                //     pct: pct,
                //     title: this.percentComplete
                // });
            } else {
                //  dialogs.closeProgressBar();
                this._resetCounts();

            }
        },
        _resetCounts: function() {
            this._fileCount = 0;
            this._filesUploadedCount = 0;
            this._isUploading = false;
            this._totalProgress = 0;
        },
        getAttachmentFile: function(attachmentId, onSuccsess) {
            var url = this.getAttachmentUrl(attachmentId);
            var fm = this._fileManager.getFile(url, onSuccsess);
        }
    });
});
