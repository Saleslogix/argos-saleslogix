define('crm/AttachmentManager', ['module', 'exports', './FileManager', 'dojo/_base/lang', 'dojo/_base/declare', 'argos/Convert', './Utility'], function (module, exports, _FileManager, _lang, _declare, _Convert, _Utility) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _FileManager2 = _interopRequireDefault(_FileManager);

  var _lang2 = _interopRequireDefault(_lang);

  var _declare2 = _interopRequireDefault(_declare);

  var _Convert2 = _interopRequireDefault(_Convert);

  var _Utility2 = _interopRequireDefault(_Utility);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @class
   * @alias module:crm/AttachmentManager
   */
  var __class = (0, _declare2.default)('crm.AttachmentManager', null, /** @lends module:crm/AttachmentManager.prototype */{
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
    _isUploading: false,
    constructor: function constructor() {
      this.querySelect = [];
      this.queryInclude = [];
      this._files = [];
      this._fileDescriptions = [];
      this._fileManager = new _FileManager2.default();
      var service = App.getService(this.serviceName);
      var oldContractName = service.getContractName();
      service.setContractName(this.contractName);
      this._baseUrl = _Utility2.default.stripQueryArgs(service.getUri().toString());
      this._uploadUrl = this._baseUrl + '/attachments/file';
      service.setContractName(oldContractName);
    },
    /**
     * @param {Array} files
     */
    createAttachments: function createAttachments() {},
    createAttachment: function createAttachment(file, mixin) {
      if (!mixin.hasOwnProperty('description')) {
        mixin.description = this._getDefaultDescription(file.name);
      }

      this._files.push(file);
      this._fileDescriptions.push({
        fileName: file.name,
        description: mixin.description
      });
      this.uploadFiles();
    },
    _getDefaultDescription: function _getDefaultDescription(filename) {
      return filename.replace(/\.[\w]*/, '');
    },
    /**
     * @param {Function} callback
     */
    getAttachmentTemplate: function getAttachmentTemplate() {
      this.requestTemplate(function success(template) {
        this._attachmentTemplate = template;
        this.uploadFiles();
      }, this.onRequestTemplateFailure);
    },
    getAttachmentUrl: function getAttachmentUrl(attachmentId) {
      var fileUrl = this._baseUrl + '/attachments(\'' + attachmentId + '\')/file';
      return fileUrl;
    },
    getAttachmenturlByEntity: function getAttachmenturlByEntity(attachment) {
      var href = void 0;
      if (attachment.url) {
        href = attachment.url || '';
        href = href.indexOf('http') < 0 ? 'http://' + href : href;
      } else {
        href = this._baseUrl + '/attachments(\'' + attachment.$key + '\')/file';
      }
      return href;
    },
    _getFileDescription: function _getFileDescription(fileName) {
      var description = this._getDefaultDescription(fileName);
      for (var i = 0; i < this._fileDescriptions.length; i++) {
        if (fileName === this._fileDescriptions[i].fileName) {
          description = this._fileDescriptions[i].description;
        }
      }
      if (description === null || description === '') {
        description = this._getDefaultDescription(fileName);
      }
      return description;
    },
    _getAttachmentContextMixin: function _getAttachmentContextMixin() {
      var contextMixin = this._getAttachmentContext();
      return contextMixin;
    },
    _getAttachmentContext: function _getAttachmentContext() {
      var contextData = {};
      var found = App.queryNavigationContext(function (o) {
        var context = o.options && o.options.source || o;
        if (/^(accounts|contacts|opportunities|tickets|leads|activities|history|userActivities)$/.test(context.resourceKind) && context.key) {
          return true;
        }
        return false;
      });

      var contextView = found && found.options && found.options.source || found;
      if (contextView) {
        var view = App.getView(contextView.id);
        var entry = contextView.entry || view && view.entry || contextView;

        if (!entry || !entry.$key) {
          return {};
        }

        switch (contextView.resourceKind) {
          case 'accounts':
            contextData = {
              accountId: entry.$key,
              accountName: entry.$descriptor
            };
            break;
          case 'contacts':
            contextData = {
              contactId: entry.$key,
              contactName: entry.$descriptor,
              accountId: entry.Account.$key,
              accountName: entry.Account.AccountName
            };
            break;
          case 'opportunities':
            contextData = {
              opportunityId: entry.$key,
              oppDescription: entry.$descriptor,
              accountId: entry.Account.$key,
              accountName: entry.Account.AccountName
            };
            break;
          case 'tickets':
            contextData = {
              ticketId: entry.$key,
              ticketNumber: entry.$descriptor,
              accountId: entry.Account.$key,
              accountName: entry.Account.AccountName,
              contactId: entry.Contact.$key,
              contactName: entry.Contact.$descriptor
            };
            break;
          case 'leads':
            contextData = {
              leadId: entry.$key,
              accountName: entry.$descriptor
            };
            break;
          case 'activities':
            contextData = {
              activityId: _Utility2.default.getRealActivityId(entry.$key),
              contactId: entry.ContactId,
              contactName: entry.ContactName,
              accountId: entry.AccountId,
              accountName: entry.AccountName,
              opportunityId: entry.OpportunityId,
              ticketId: entry.TicketId,
              leadId: entry.LeadId
            };
            break;
          case 'userActivities':
            contextData = {
              activityId: _Utility2.default.getRealActivityId(entry.Activity.$key),
              contactId: entry.Activity.ContactId,
              contactName: entry.Activity.ContactName,
              accountId: entry.Activity.AccountId,
              accountName: entry.Activity.AccountName,
              opportunityId: entry.Activity.OpportunityId,
              ticketId: entry.Activity.TicketId,
              leadId: entry.Activity.LeadId
            };
            break;
          case 'history':
            contextData = {
              historyId: entry.$key,
              contactId: entry.ContactId,
              contactName: entry.ContactName,
              accountId: entry.AccountId,
              accountName: entry.AccountName,
              opportunityId: entry.OpportunityId,
              ticketId: entry.TicketId,
              leadId: entry.LeadId
            };
            break;
          default:
            contextData = {
              entityId: entry.$key,
              entityName: contextView.id,
              description: entry.$descriptor
            };
            break;
        }
      }
      return contextData;
    },
    getService: function getService() {
      return App.getService(this.serviceName); /* if false is passed, the default service will be returned */
    },
    createTemplateRequest: function createTemplateRequest() {
      var request = new Sage.SData.Client.SDataTemplateResourceRequest(this.getService());
      request.setResourceKind(this.resourceKind);
      request.setContractName(this.contractName);
      request.setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Select, this.querySelect.join(','));
      request.setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Include, this.queryInclude.join(','));
      return request;
    },
    requestTemplate: function requestTemplate(onSucess, onFailure) {
      var request = this.createTemplateRequest();
      if (request) {
        request.read({
          success: onSucess,
          failure: onFailure,
          scope: this
        });
      }
    },
    onRequestTemplateFailure: function onRequestTemplateFailure() {},
    onRequestTemplateSuccess: function onRequestTemplateSuccess(entry) {
      this.processTemplateEntry(entry);
    },
    createDataRequest: function createDataRequest(id) {
      var request = new Sage.SData.Client.SDataSingleResourceRequest(this.getService());
      request.setResourceKind(this.resourceKind);
      request.setContractName(this.contractName);
      request.setResourceSelector('\'' + id + '\'');

      request.setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Select, this.querySelect.join(','));
      request.setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Include, this.queryInclude.join(','));
      request.setQueryArg('_includeFile', 'false');
      return request;
    },
    requestData: function requestData(attachmnetId, onSucess, onFailure) {
      var request = this.createDataRequest(attachmnetId);
      if (request) {
        request.read({
          success: onSucess,
          failure: onFailure,
          scope: this
        });
      }
    },
    /**
     * @param response
     * @param o
     */
    onRequestDataFailure: function onRequestDataFailure() {},
    uploadFiles: function uploadFiles() {
      this._isUploading = true;
      this._fileCount = this._files.length;
      while (this._files.length > 0) {
        var file = this._files.pop();
        this._fileManager.uploadFile(file, this._uploadUrl, this._updateProgress, this.onSuccessUpload, this.onFailedUpload, this);
      }
    },
    onSuccessUpload: function onSuccessUpload(request) {
      // the id of the new attachment is buried in the Location response header...
      var url = request.getResponseHeader('Location');
      var re = /'\w+'/g;
      var matches = url.match(re);

      if (matches) {
        var id = matches[0].replace(/'/g, '');
        // now that we have the id, we can fetch it using the SingleEntrySDataStore
        this.requestData(id, function success(attachment) {
          var mixin = this._getAttachmentContextMixin(attachment.fileName);
          if (mixin) {
            attachment.attachDate = _Convert2.default.toIsoStringFromDate(new Date());
            attachment.dataType = 'R';
            attachment.description = this._getFileDescription(attachment.fileName);
            var a = _lang2.default.mixin(attachment, mixin);
            var req = this.createDataRequest(id);
            if (req) {
              req.update(a, {
                success: this.onSuccessUpdate,
                failure: this.onFailedUpdate,
                scope: this
              });
            }
          }
        }, this.onRequestDataFailure);
      }
    },
    onFailedUpload: function onFailedUpload(resp) {
      var err = new Error('Failed to upload.');
      err.resp = resp;
      throw err;
    },
    _onFailedAdd: function _onFailedAdd(resp) {
      var err = new Error('Failed to save.');
      err.resp = resp;
      throw err;
    },
    /**
     * @param attachment
     */
    onSuccessUpdate: function onSuccessUpdate() {},
    onFailedUpdate: function onFailedUpdate(resp) {
      var err = new Error('Failed to update.');
      err.resp = resp;
      throw err;
    },
    /**
     * @param percent
     */
    onUpdateProgress: function onUpdateProgress() {},
    _updateProgress: function _updateProgress(curFileProgress) {
      var pct = this._totalProgress;

      if (curFileProgress && curFileProgress.lengthComputable) {
        var filePercent = curFileProgress.loaded / curFileProgress.total * 100;
        pct = filePercent;
      } else if (curFileProgress) {
        pct = curFileProgress;
      }
      this._totalProgress = pct;

      if (pct < 99) {
        if (this.onUpdateProgress) {
          this.onUpdateProgress(pct);
        }
      } else {
        this._resetCounts();
        if (this.onUpdateProgress) {
          this.onUpdateProgress(100.00);
        }
      }
    },
    _resetCounts: function _resetCounts() {
      this._fileCount = 0;
      this._filesUploadedCount = 0;
      this._isUploading = false;
      this._totalProgress = 0;
    },
    getAttachmentFile: function getAttachmentFile(attachmentId, responseType, onSuccsess) {
      var url = this.getAttachmentUrl(attachmentId);
      this._fileManager.getFile(url, responseType, onSuccsess);
    }
  }); /* Copyright 2017 Infor
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *    http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */

  /**
  * @module crm/AttachmentManager
  */
  exports.default = __class;
  module.exports = exports['default'];
});