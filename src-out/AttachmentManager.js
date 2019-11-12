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
   * @class crm.AttachmentManager
   */
  var __class = (0, _declare2.default)('crm.AttachmentManager', null, /** @lends crm.AttachmentManager# */{
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

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BdHRhY2htZW50TWFuYWdlci5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiX2ZpbGVNYW5hZ2VyIiwiX2VudGl0eUNvbnRleHQiLCJfdXBsb2FkVXJsIiwiX2Jhc2VVcmwiLCJfYXR0YWNobWVudFRlbXBsYXRlIiwic2VydmljZU5hbWUiLCJjb250cmFjdE5hbWUiLCJyZXNvdXJjZUtpbmQiLCJxdWVyeVNlbGVjdCIsInF1ZXJ5SW5jbHVkZSIsIl9maWxlcyIsIl9maWxlRGVzY3JpcHRpb25zIiwiX2ZpbGVzVXBsb2FkZWRDb3VudCIsIl9maWxlQ291bnQiLCJfdG90YWxQcm9ncmVzcyIsIl9pc1VwbG9hZGluZyIsImNvbnN0cnVjdG9yIiwic2VydmljZSIsIkFwcCIsImdldFNlcnZpY2UiLCJvbGRDb250cmFjdE5hbWUiLCJnZXRDb250cmFjdE5hbWUiLCJzZXRDb250cmFjdE5hbWUiLCJzdHJpcFF1ZXJ5QXJncyIsImdldFVyaSIsInRvU3RyaW5nIiwiY3JlYXRlQXR0YWNobWVudHMiLCJjcmVhdGVBdHRhY2htZW50IiwiZmlsZSIsIm1peGluIiwiaGFzT3duUHJvcGVydHkiLCJkZXNjcmlwdGlvbiIsIl9nZXREZWZhdWx0RGVzY3JpcHRpb24iLCJuYW1lIiwicHVzaCIsImZpbGVOYW1lIiwidXBsb2FkRmlsZXMiLCJmaWxlbmFtZSIsInJlcGxhY2UiLCJnZXRBdHRhY2htZW50VGVtcGxhdGUiLCJyZXF1ZXN0VGVtcGxhdGUiLCJzdWNjZXNzIiwidGVtcGxhdGUiLCJvblJlcXVlc3RUZW1wbGF0ZUZhaWx1cmUiLCJnZXRBdHRhY2htZW50VXJsIiwiYXR0YWNobWVudElkIiwiZmlsZVVybCIsImdldEF0dGFjaG1lbnR1cmxCeUVudGl0eSIsImF0dGFjaG1lbnQiLCJocmVmIiwidXJsIiwiaW5kZXhPZiIsIiRrZXkiLCJfZ2V0RmlsZURlc2NyaXB0aW9uIiwiaSIsImxlbmd0aCIsIl9nZXRBdHRhY2htZW50Q29udGV4dE1peGluIiwiY29udGV4dE1peGluIiwiX2dldEF0dGFjaG1lbnRDb250ZXh0IiwiY29udGV4dERhdGEiLCJmb3VuZCIsInF1ZXJ5TmF2aWdhdGlvbkNvbnRleHQiLCJvIiwiY29udGV4dCIsIm9wdGlvbnMiLCJzb3VyY2UiLCJ0ZXN0Iiwia2V5IiwiY29udGV4dFZpZXciLCJ2aWV3IiwiZ2V0VmlldyIsImlkIiwiZW50cnkiLCJhY2NvdW50SWQiLCJhY2NvdW50TmFtZSIsIiRkZXNjcmlwdG9yIiwiY29udGFjdElkIiwiY29udGFjdE5hbWUiLCJBY2NvdW50IiwiQWNjb3VudE5hbWUiLCJvcHBvcnR1bml0eUlkIiwib3BwRGVzY3JpcHRpb24iLCJ0aWNrZXRJZCIsInRpY2tldE51bWJlciIsIkNvbnRhY3QiLCJsZWFkSWQiLCJhY3Rpdml0eUlkIiwiZ2V0UmVhbEFjdGl2aXR5SWQiLCJDb250YWN0SWQiLCJDb250YWN0TmFtZSIsIkFjY291bnRJZCIsIk9wcG9ydHVuaXR5SWQiLCJUaWNrZXRJZCIsIkxlYWRJZCIsIkFjdGl2aXR5IiwiaGlzdG9yeUlkIiwiZW50aXR5SWQiLCJlbnRpdHlOYW1lIiwiY3JlYXRlVGVtcGxhdGVSZXF1ZXN0IiwicmVxdWVzdCIsIlNhZ2UiLCJTRGF0YSIsIkNsaWVudCIsIlNEYXRhVGVtcGxhdGVSZXNvdXJjZVJlcXVlc3QiLCJzZXRSZXNvdXJjZUtpbmQiLCJzZXRRdWVyeUFyZyIsIlNEYXRhVXJpIiwiUXVlcnlBcmdOYW1lcyIsIlNlbGVjdCIsImpvaW4iLCJJbmNsdWRlIiwib25TdWNlc3MiLCJvbkZhaWx1cmUiLCJyZWFkIiwiZmFpbHVyZSIsInNjb3BlIiwib25SZXF1ZXN0VGVtcGxhdGVTdWNjZXNzIiwicHJvY2Vzc1RlbXBsYXRlRW50cnkiLCJjcmVhdGVEYXRhUmVxdWVzdCIsIlNEYXRhU2luZ2xlUmVzb3VyY2VSZXF1ZXN0Iiwic2V0UmVzb3VyY2VTZWxlY3RvciIsInJlcXVlc3REYXRhIiwiYXR0YWNobW5ldElkIiwib25SZXF1ZXN0RGF0YUZhaWx1cmUiLCJwb3AiLCJ1cGxvYWRGaWxlIiwiX3VwZGF0ZVByb2dyZXNzIiwib25TdWNjZXNzVXBsb2FkIiwib25GYWlsZWRVcGxvYWQiLCJnZXRSZXNwb25zZUhlYWRlciIsInJlIiwibWF0Y2hlcyIsIm1hdGNoIiwiYXR0YWNoRGF0ZSIsInRvSXNvU3RyaW5nRnJvbURhdGUiLCJEYXRlIiwiZGF0YVR5cGUiLCJhIiwicmVxIiwidXBkYXRlIiwib25TdWNjZXNzVXBkYXRlIiwib25GYWlsZWRVcGRhdGUiLCJyZXNwIiwiZXJyIiwiRXJyb3IiLCJfb25GYWlsZWRBZGQiLCJvblVwZGF0ZVByb2dyZXNzIiwiY3VyRmlsZVByb2dyZXNzIiwicGN0IiwibGVuZ3RoQ29tcHV0YWJsZSIsImZpbGVQZXJjZW50IiwibG9hZGVkIiwidG90YWwiLCJfcmVzZXRDb3VudHMiLCJnZXRBdHRhY2htZW50RmlsZSIsInJlc3BvbnNlVHlwZSIsIm9uU3VjY3Nlc3MiLCJnZXRGaWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkE7OztBQUdBLE1BQU1BLFVBQVUsdUJBQVEsdUJBQVIsRUFBaUMsSUFBakMsRUFBdUMsb0NBQW9DO0FBQ3pGQyxrQkFBYyxJQUQyRTtBQUV6RkMsb0JBQWdCLElBRnlFO0FBR3pGQyxnQkFBWSxFQUg2RTtBQUl6RkMsY0FBVSxFQUorRTtBQUt6RkMseUJBQXFCLEtBTG9FO0FBTXpGQyxpQkFBYSxLQU40RTtBQU96RkMsa0JBQWMsUUFQMkU7QUFRekZDLGtCQUFjLGFBUjJFO0FBU3pGQyxpQkFBYSxJQVQ0RTtBQVV6RkMsa0JBQWMsSUFWMkU7QUFXekZDLFlBQVEsSUFYaUY7QUFZekZDLHVCQUFtQixJQVpzRTtBQWF6RkMseUJBQXFCLENBYm9FO0FBY3pGQyxnQkFBWSxDQWQ2RTtBQWV6RkMsb0JBQWdCLENBZnlFO0FBZ0J6RkMsa0JBQWMsS0FoQjJFO0FBaUJ6RkMsaUJBQWEsU0FBU0EsV0FBVCxHQUF1QjtBQUNsQyxXQUFLUixXQUFMLEdBQW1CLEVBQW5CO0FBQ0EsV0FBS0MsWUFBTCxHQUFvQixFQUFw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SSxNQUFoQixHQUF5QkosZ0JBQWdCSyxLQUExQyxHQUFtRCxHQUF2RTtBQUNBSixjQUFNRSxXQUFOO0FBQ0QsT0FIRCxNQUdPLElBQUlILGVBQUosRUFBcUI7QUFDMUJDLGNBQU1ELGVBQU47QUFDRDtBQUNELFdBQUtySSxjQUFMLEdBQXNCc0ksR0FBdEI7O0FBRUEsVUFBSUEsTUFBTSxFQUFWLEVBQWM7QUFDWixZQUFJLEtBQUtGLGdCQUFULEVBQTJCO0FBQ3pCLGVBQUtBLGdCQUFMLENBQXNCRSxHQUF0QjtBQUNEO0FBQ0YsT0FKRCxNQUlPO0FBQ0wsYUFBS0ssWUFBTDtBQUNBLFlBQUksS0FBS1AsZ0JBQVQsRUFBMkI7QUFDekIsZUFBS0EsZ0JBQUwsQ0FBc0IsTUFBdEI7QUFDRDtBQUNGO0FBQ0YsS0E3VXdGO0FBOFV6Rk8sa0JBQWMsU0FBU0EsWUFBVCxHQUF3QjtBQUNwQyxXQUFLNUksVUFBTCxHQUFrQixDQUFsQjtBQUNBLFdBQUtELG1CQUFMLEdBQTJCLENBQTNCO0FBQ0EsV0FBS0csWUFBTCxHQUFvQixLQUFwQjtBQUNBLFdBQUtELGNBQUwsR0FBc0IsQ0FBdEI7QUFDRCxLQW5Wd0Y7QUFvVnpGNEksdUJBQW1CLFNBQVNBLGlCQUFULENBQTJCN0csWUFBM0IsRUFBeUM4RyxZQUF6QyxFQUF1REMsVUFBdkQsRUFBbUU7QUFDcEYsVUFBTTFHLE1BQU0sS0FBS04sZ0JBQUwsQ0FBc0JDLFlBQXRCLENBQVo7QUFDQSxXQUFLN0MsWUFBTCxDQUFrQjZKLE9BQWxCLENBQTBCM0csR0FBMUIsRUFBK0J5RyxZQUEvQixFQUE2Q0MsVUFBN0M7QUFDRDtBQXZWd0YsR0FBM0UsQ0FBaEIsQyxDQXhCQTs7Ozs7Ozs7Ozs7Ozs7O29CQWtYZTdKLE8iLCJmaWxlIjoiQXR0YWNobWVudE1hbmFnZXIuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgRmlsZU1hbmFnZXIgZnJvbSAnLi9GaWxlTWFuYWdlcic7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBjb252ZXJ0IGZyb20gJ2FyZ29zL0NvbnZlcnQnO1xyXG5pbXBvcnQgdXRpbGl0eSBmcm9tICcuL1V0aWxpdHknO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uQXR0YWNobWVudE1hbmFnZXJcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uQXR0YWNobWVudE1hbmFnZXInLCBudWxsLCAvKiogQGxlbmRzIGNybS5BdHRhY2htZW50TWFuYWdlciMgKi97XHJcbiAgX2ZpbGVNYW5hZ2VyOiBudWxsLFxyXG4gIF9lbnRpdHlDb250ZXh0OiBudWxsLFxyXG4gIF91cGxvYWRVcmw6ICcnLFxyXG4gIF9iYXNlVXJsOiAnJyxcclxuICBfYXR0YWNobWVudFRlbXBsYXRlOiBmYWxzZSxcclxuICBzZXJ2aWNlTmFtZTogZmFsc2UsXHJcbiAgY29udHJhY3ROYW1lOiAnc3lzdGVtJyxcclxuICByZXNvdXJjZUtpbmQ6ICdhdHRhY2htZW50cycsXHJcbiAgcXVlcnlTZWxlY3Q6IG51bGwsXHJcbiAgcXVlcnlJbmNsdWRlOiBudWxsLFxyXG4gIF9maWxlczogbnVsbCxcclxuICBfZmlsZURlc2NyaXB0aW9uczogbnVsbCxcclxuICBfZmlsZXNVcGxvYWRlZENvdW50OiAwLFxyXG4gIF9maWxlQ291bnQ6IDAsXHJcbiAgX3RvdGFsUHJvZ3Jlc3M6IDAsXHJcbiAgX2lzVXBsb2FkaW5nOiBmYWxzZSxcclxuICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24gY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnF1ZXJ5U2VsZWN0ID0gW107XHJcbiAgICB0aGlzLnF1ZXJ5SW5jbHVkZSA9IFtdO1xyXG4gICAgdGhpcy5fZmlsZXMgPSBbXTtcclxuICAgIHRoaXMuX2ZpbGVEZXNjcmlwdGlvbnMgPSBbXTtcclxuICAgIHRoaXMuX2ZpbGVNYW5hZ2VyID0gbmV3IEZpbGVNYW5hZ2VyKCk7XHJcbiAgICBjb25zdCBzZXJ2aWNlID0gQXBwLmdldFNlcnZpY2UodGhpcy5zZXJ2aWNlTmFtZSk7XHJcbiAgICBjb25zdCBvbGRDb250cmFjdE5hbWUgPSBzZXJ2aWNlLmdldENvbnRyYWN0TmFtZSgpO1xyXG4gICAgc2VydmljZS5zZXRDb250cmFjdE5hbWUodGhpcy5jb250cmFjdE5hbWUpO1xyXG4gICAgdGhpcy5fYmFzZVVybCA9IHV0aWxpdHkuc3RyaXBRdWVyeUFyZ3Moc2VydmljZS5nZXRVcmkoKS50b1N0cmluZygpKTtcclxuICAgIHRoaXMuX3VwbG9hZFVybCA9IGAke3RoaXMuX2Jhc2VVcmx9L2F0dGFjaG1lbnRzL2ZpbGVgO1xyXG4gICAgc2VydmljZS5zZXRDb250cmFjdE5hbWUob2xkQ29udHJhY3ROYW1lKTtcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7QXJyYXl9IGZpbGVzXHJcbiAgICovXHJcbiAgY3JlYXRlQXR0YWNobWVudHM6IGZ1bmN0aW9uIGNyZWF0ZUF0dGFjaG1lbnRzKCkge30sXHJcbiAgY3JlYXRlQXR0YWNobWVudDogZnVuY3Rpb24gY3JlYXRlQXR0YWNobWVudChmaWxlLCBtaXhpbikge1xyXG4gICAgaWYgKCFtaXhpbi5oYXNPd25Qcm9wZXJ0eSgnZGVzY3JpcHRpb24nKSkge1xyXG4gICAgICBtaXhpbi5kZXNjcmlwdGlvbiA9IHRoaXMuX2dldERlZmF1bHREZXNjcmlwdGlvbihmaWxlLm5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2ZpbGVzLnB1c2goZmlsZSk7XHJcbiAgICB0aGlzLl9maWxlRGVzY3JpcHRpb25zLnB1c2goe1xyXG4gICAgICBmaWxlTmFtZTogZmlsZS5uYW1lLFxyXG4gICAgICBkZXNjcmlwdGlvbjogbWl4aW4uZGVzY3JpcHRpb24sXHJcbiAgICB9KTtcclxuICAgIHRoaXMudXBsb2FkRmlsZXMoKTtcclxuICB9LFxyXG4gIF9nZXREZWZhdWx0RGVzY3JpcHRpb246IGZ1bmN0aW9uIF9nZXREZWZhdWx0RGVzY3JpcHRpb24oZmlsZW5hbWUpIHtcclxuICAgIHJldHVybiBmaWxlbmFtZS5yZXBsYWNlKC9cXC5bXFx3XSovLCAnJyk7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gICAqL1xyXG4gIGdldEF0dGFjaG1lbnRUZW1wbGF0ZTogZnVuY3Rpb24gZ2V0QXR0YWNobWVudFRlbXBsYXRlKCkge1xyXG4gICAgdGhpcy5yZXF1ZXN0VGVtcGxhdGUoZnVuY3Rpb24gc3VjY2Vzcyh0ZW1wbGF0ZSkge1xyXG4gICAgICB0aGlzLl9hdHRhY2htZW50VGVtcGxhdGUgPSB0ZW1wbGF0ZTtcclxuICAgICAgdGhpcy51cGxvYWRGaWxlcygpO1xyXG4gICAgfSxcclxuICAgIHRoaXMub25SZXF1ZXN0VGVtcGxhdGVGYWlsdXJlXHJcbiAgICApO1xyXG4gIH0sXHJcbiAgZ2V0QXR0YWNobWVudFVybDogZnVuY3Rpb24gZ2V0QXR0YWNobWVudFVybChhdHRhY2htZW50SWQpIHtcclxuICAgIGNvbnN0IGZpbGVVcmwgPSBgJHt0aGlzLl9iYXNlVXJsfS9hdHRhY2htZW50cygnJHthdHRhY2htZW50SWR9JykvZmlsZWA7XHJcbiAgICByZXR1cm4gZmlsZVVybDtcclxuICB9LFxyXG4gIGdldEF0dGFjaG1lbnR1cmxCeUVudGl0eTogZnVuY3Rpb24gZ2V0QXR0YWNobWVudHVybEJ5RW50aXR5KGF0dGFjaG1lbnQpIHtcclxuICAgIGxldCBocmVmO1xyXG4gICAgaWYgKGF0dGFjaG1lbnQudXJsKSB7XHJcbiAgICAgIGhyZWYgPSBhdHRhY2htZW50LnVybCB8fCAnJztcclxuICAgICAgaHJlZiA9IChocmVmLmluZGV4T2YoJ2h0dHAnKSA8IDApID8gYGh0dHA6Ly8ke2hyZWZ9YCA6IGhyZWY7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBocmVmID0gYCR7dGhpcy5fYmFzZVVybH0vYXR0YWNobWVudHMoJyR7YXR0YWNobWVudC4ka2V5fScpL2ZpbGVgO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGhyZWY7XHJcbiAgfSxcclxuICBfZ2V0RmlsZURlc2NyaXB0aW9uOiBmdW5jdGlvbiBfZ2V0RmlsZURlc2NyaXB0aW9uKGZpbGVOYW1lKSB7XHJcbiAgICBsZXQgZGVzY3JpcHRpb24gPSB0aGlzLl9nZXREZWZhdWx0RGVzY3JpcHRpb24oZmlsZU5hbWUpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9maWxlRGVzY3JpcHRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChmaWxlTmFtZSA9PT0gdGhpcy5fZmlsZURlc2NyaXB0aW9uc1tpXS5maWxlTmFtZSkge1xyXG4gICAgICAgIGRlc2NyaXB0aW9uID0gdGhpcy5fZmlsZURlc2NyaXB0aW9uc1tpXS5kZXNjcmlwdGlvbjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKChkZXNjcmlwdGlvbiA9PT0gbnVsbCkgfHwgKGRlc2NyaXB0aW9uID09PSAnJykpIHtcclxuICAgICAgZGVzY3JpcHRpb24gPSB0aGlzLl9nZXREZWZhdWx0RGVzY3JpcHRpb24oZmlsZU5hbWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRlc2NyaXB0aW9uO1xyXG4gIH0sXHJcbiAgX2dldEF0dGFjaG1lbnRDb250ZXh0TWl4aW46IGZ1bmN0aW9uIF9nZXRBdHRhY2htZW50Q29udGV4dE1peGluKCkge1xyXG4gICAgY29uc3QgY29udGV4dE1peGluID0gdGhpcy5fZ2V0QXR0YWNobWVudENvbnRleHQoKTtcclxuICAgIHJldHVybiBjb250ZXh0TWl4aW47XHJcbiAgfSxcclxuICBfZ2V0QXR0YWNobWVudENvbnRleHQ6IGZ1bmN0aW9uIF9nZXRBdHRhY2htZW50Q29udGV4dCgpIHtcclxuICAgIGxldCBjb250ZXh0RGF0YSA9IHt9O1xyXG4gICAgY29uc3QgZm91bmQgPSBBcHAucXVlcnlOYXZpZ2F0aW9uQ29udGV4dCgobykgPT4ge1xyXG4gICAgICBjb25zdCBjb250ZXh0ID0gKG8ub3B0aW9ucyAmJiBvLm9wdGlvbnMuc291cmNlKSB8fCBvO1xyXG4gICAgICBpZiAoL14oYWNjb3VudHN8Y29udGFjdHN8b3Bwb3J0dW5pdGllc3x0aWNrZXRzfGxlYWRzfGFjdGl2aXRpZXN8aGlzdG9yeXx1c2VyQWN0aXZpdGllcykkLy50ZXN0KGNvbnRleHQucmVzb3VyY2VLaW5kKSAmJiBjb250ZXh0LmtleSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGNvbnRleHRWaWV3ID0gKGZvdW5kICYmIGZvdW5kLm9wdGlvbnMgJiYgZm91bmQub3B0aW9ucy5zb3VyY2UpIHx8IGZvdW5kO1xyXG4gICAgaWYgKGNvbnRleHRWaWV3KSB7XHJcbiAgICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyhjb250ZXh0Vmlldy5pZCk7XHJcbiAgICAgIGNvbnN0IGVudHJ5ID0gY29udGV4dFZpZXcuZW50cnkgfHwgKHZpZXcgJiYgdmlldy5lbnRyeSkgfHwgY29udGV4dFZpZXc7XHJcblxyXG4gICAgICBpZiAoIWVudHJ5IHx8ICFlbnRyeS4ka2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzd2l0Y2ggKGNvbnRleHRWaWV3LnJlc291cmNlS2luZCkge1xyXG4gICAgICAgIGNhc2UgJ2FjY291bnRzJzpcclxuICAgICAgICAgIGNvbnRleHREYXRhID0ge1xyXG4gICAgICAgICAgICBhY2NvdW50SWQ6IGVudHJ5LiRrZXksXHJcbiAgICAgICAgICAgIGFjY291bnROYW1lOiBlbnRyeS4kZGVzY3JpcHRvcixcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdjb250YWN0cyc6XHJcbiAgICAgICAgICBjb250ZXh0RGF0YSA9IHtcclxuICAgICAgICAgICAgY29udGFjdElkOiBlbnRyeS4ka2V5LFxyXG4gICAgICAgICAgICBjb250YWN0TmFtZTogZW50cnkuJGRlc2NyaXB0b3IsXHJcbiAgICAgICAgICAgIGFjY291bnRJZDogZW50cnkuQWNjb3VudC4ka2V5LFxyXG4gICAgICAgICAgICBhY2NvdW50TmFtZTogZW50cnkuQWNjb3VudC5BY2NvdW50TmFtZSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdvcHBvcnR1bml0aWVzJzpcclxuICAgICAgICAgIGNvbnRleHREYXRhID0ge1xyXG4gICAgICAgICAgICBvcHBvcnR1bml0eUlkOiBlbnRyeS4ka2V5LFxyXG4gICAgICAgICAgICBvcHBEZXNjcmlwdGlvbjogZW50cnkuJGRlc2NyaXB0b3IsXHJcbiAgICAgICAgICAgIGFjY291bnRJZDogZW50cnkuQWNjb3VudC4ka2V5LFxyXG4gICAgICAgICAgICBhY2NvdW50TmFtZTogZW50cnkuQWNjb3VudC5BY2NvdW50TmFtZSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICd0aWNrZXRzJzpcclxuICAgICAgICAgIGNvbnRleHREYXRhID0ge1xyXG4gICAgICAgICAgICB0aWNrZXRJZDogZW50cnkuJGtleSxcclxuICAgICAgICAgICAgdGlja2V0TnVtYmVyOiBlbnRyeS4kZGVzY3JpcHRvcixcclxuICAgICAgICAgICAgYWNjb3VudElkOiBlbnRyeS5BY2NvdW50LiRrZXksXHJcbiAgICAgICAgICAgIGFjY291bnROYW1lOiBlbnRyeS5BY2NvdW50LkFjY291bnROYW1lLFxyXG4gICAgICAgICAgICBjb250YWN0SWQ6IGVudHJ5LkNvbnRhY3QuJGtleSxcclxuICAgICAgICAgICAgY29udGFjdE5hbWU6IGVudHJ5LkNvbnRhY3QuJGRlc2NyaXB0b3IsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnbGVhZHMnOlxyXG4gICAgICAgICAgY29udGV4dERhdGEgPSB7XHJcbiAgICAgICAgICAgIGxlYWRJZDogZW50cnkuJGtleSxcclxuICAgICAgICAgICAgYWNjb3VudE5hbWU6IGVudHJ5LiRkZXNjcmlwdG9yLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ2FjdGl2aXRpZXMnOlxyXG4gICAgICAgICAgY29udGV4dERhdGEgPSB7XHJcbiAgICAgICAgICAgIGFjdGl2aXR5SWQ6IHV0aWxpdHkuZ2V0UmVhbEFjdGl2aXR5SWQoZW50cnkuJGtleSksXHJcbiAgICAgICAgICAgIGNvbnRhY3RJZDogZW50cnkuQ29udGFjdElkLFxyXG4gICAgICAgICAgICBjb250YWN0TmFtZTogZW50cnkuQ29udGFjdE5hbWUsXHJcbiAgICAgICAgICAgIGFjY291bnRJZDogZW50cnkuQWNjb3VudElkLFxyXG4gICAgICAgICAgICBhY2NvdW50TmFtZTogZW50cnkuQWNjb3VudE5hbWUsXHJcbiAgICAgICAgICAgIG9wcG9ydHVuaXR5SWQ6IGVudHJ5Lk9wcG9ydHVuaXR5SWQsXHJcbiAgICAgICAgICAgIHRpY2tldElkOiBlbnRyeS5UaWNrZXRJZCxcclxuICAgICAgICAgICAgbGVhZElkOiBlbnRyeS5MZWFkSWQsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAndXNlckFjdGl2aXRpZXMnOlxyXG4gICAgICAgICAgY29udGV4dERhdGEgPSB7XHJcbiAgICAgICAgICAgIGFjdGl2aXR5SWQ6IHV0aWxpdHkuZ2V0UmVhbEFjdGl2aXR5SWQoZW50cnkuQWN0aXZpdHkuJGtleSksXHJcbiAgICAgICAgICAgIGNvbnRhY3RJZDogZW50cnkuQWN0aXZpdHkuQ29udGFjdElkLFxyXG4gICAgICAgICAgICBjb250YWN0TmFtZTogZW50cnkuQWN0aXZpdHkuQ29udGFjdE5hbWUsXHJcbiAgICAgICAgICAgIGFjY291bnRJZDogZW50cnkuQWN0aXZpdHkuQWNjb3VudElkLFxyXG4gICAgICAgICAgICBhY2NvdW50TmFtZTogZW50cnkuQWN0aXZpdHkuQWNjb3VudE5hbWUsXHJcbiAgICAgICAgICAgIG9wcG9ydHVuaXR5SWQ6IGVudHJ5LkFjdGl2aXR5Lk9wcG9ydHVuaXR5SWQsXHJcbiAgICAgICAgICAgIHRpY2tldElkOiBlbnRyeS5BY3Rpdml0eS5UaWNrZXRJZCxcclxuICAgICAgICAgICAgbGVhZElkOiBlbnRyeS5BY3Rpdml0eS5MZWFkSWQsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnaGlzdG9yeSc6XHJcbiAgICAgICAgICBjb250ZXh0RGF0YSA9IHtcclxuICAgICAgICAgICAgaGlzdG9yeUlkOiBlbnRyeS4ka2V5LFxyXG4gICAgICAgICAgICBjb250YWN0SWQ6IGVudHJ5LkNvbnRhY3RJZCxcclxuICAgICAgICAgICAgY29udGFjdE5hbWU6IGVudHJ5LkNvbnRhY3ROYW1lLFxyXG4gICAgICAgICAgICBhY2NvdW50SWQ6IGVudHJ5LkFjY291bnRJZCxcclxuICAgICAgICAgICAgYWNjb3VudE5hbWU6IGVudHJ5LkFjY291bnROYW1lLFxyXG4gICAgICAgICAgICBvcHBvcnR1bml0eUlkOiBlbnRyeS5PcHBvcnR1bml0eUlkLFxyXG4gICAgICAgICAgICB0aWNrZXRJZDogZW50cnkuVGlja2V0SWQsXHJcbiAgICAgICAgICAgIGxlYWRJZDogZW50cnkuTGVhZElkLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBjb250ZXh0RGF0YSA9IHtcclxuICAgICAgICAgICAgZW50aXR5SWQ6IGVudHJ5LiRrZXksXHJcbiAgICAgICAgICAgIGVudGl0eU5hbWU6IGNvbnRleHRWaWV3LmlkLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogZW50cnkuJGRlc2NyaXB0b3IsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjb250ZXh0RGF0YTtcclxuICB9LFxyXG4gIGdldFNlcnZpY2U6IGZ1bmN0aW9uIGdldFNlcnZpY2UoKSB7XHJcbiAgICByZXR1cm4gQXBwLmdldFNlcnZpY2UodGhpcy5zZXJ2aWNlTmFtZSk7IC8qIGlmIGZhbHNlIGlzIHBhc3NlZCwgdGhlIGRlZmF1bHQgc2VydmljZSB3aWxsIGJlIHJldHVybmVkICovXHJcbiAgfSxcclxuICBjcmVhdGVUZW1wbGF0ZVJlcXVlc3Q6IGZ1bmN0aW9uIGNyZWF0ZVRlbXBsYXRlUmVxdWVzdCgpIHtcclxuICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgU2FnZS5TRGF0YS5DbGllbnQuU0RhdGFUZW1wbGF0ZVJlc291cmNlUmVxdWVzdCh0aGlzLmdldFNlcnZpY2UoKSk7XHJcbiAgICByZXF1ZXN0LnNldFJlc291cmNlS2luZCh0aGlzLnJlc291cmNlS2luZCk7XHJcbiAgICByZXF1ZXN0LnNldENvbnRyYWN0TmFtZSh0aGlzLmNvbnRyYWN0TmFtZSk7XHJcbiAgICByZXF1ZXN0LnNldFF1ZXJ5QXJnKFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhVXJpLlF1ZXJ5QXJnTmFtZXMuU2VsZWN0LCB0aGlzLnF1ZXJ5U2VsZWN0LmpvaW4oJywnKSk7XHJcbiAgICByZXF1ZXN0LnNldFF1ZXJ5QXJnKFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhVXJpLlF1ZXJ5QXJnTmFtZXMuSW5jbHVkZSwgdGhpcy5xdWVyeUluY2x1ZGUuam9pbignLCcpKTtcclxuICAgIHJldHVybiByZXF1ZXN0O1xyXG4gIH0sXHJcbiAgcmVxdWVzdFRlbXBsYXRlOiBmdW5jdGlvbiByZXF1ZXN0VGVtcGxhdGUob25TdWNlc3MsIG9uRmFpbHVyZSkge1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IHRoaXMuY3JlYXRlVGVtcGxhdGVSZXF1ZXN0KCk7XHJcbiAgICBpZiAocmVxdWVzdCkge1xyXG4gICAgICByZXF1ZXN0LnJlYWQoe1xyXG4gICAgICAgIHN1Y2Nlc3M6IG9uU3VjZXNzLFxyXG4gICAgICAgIGZhaWx1cmU6IG9uRmFpbHVyZSxcclxuICAgICAgICBzY29wZTogdGhpcyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBvblJlcXVlc3RUZW1wbGF0ZUZhaWx1cmU6IGZ1bmN0aW9uIG9uUmVxdWVzdFRlbXBsYXRlRmFpbHVyZSgpIHt9LFxyXG4gIG9uUmVxdWVzdFRlbXBsYXRlU3VjY2VzczogZnVuY3Rpb24gb25SZXF1ZXN0VGVtcGxhdGVTdWNjZXNzKGVudHJ5KSB7XHJcbiAgICB0aGlzLnByb2Nlc3NUZW1wbGF0ZUVudHJ5KGVudHJ5KTtcclxuICB9LFxyXG4gIGNyZWF0ZURhdGFSZXF1ZXN0OiBmdW5jdGlvbiBjcmVhdGVEYXRhUmVxdWVzdChpZCkge1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBTYWdlLlNEYXRhLkNsaWVudC5TRGF0YVNpbmdsZVJlc291cmNlUmVxdWVzdCh0aGlzLmdldFNlcnZpY2UoKSk7XHJcbiAgICByZXF1ZXN0LnNldFJlc291cmNlS2luZCh0aGlzLnJlc291cmNlS2luZCk7XHJcbiAgICByZXF1ZXN0LnNldENvbnRyYWN0TmFtZSh0aGlzLmNvbnRyYWN0TmFtZSk7XHJcbiAgICByZXF1ZXN0LnNldFJlc291cmNlU2VsZWN0b3IoYCcke2lkfSdgKTtcclxuXHJcbiAgICByZXF1ZXN0LnNldFF1ZXJ5QXJnKFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhVXJpLlF1ZXJ5QXJnTmFtZXMuU2VsZWN0LCB0aGlzLnF1ZXJ5U2VsZWN0LmpvaW4oJywnKSk7XHJcbiAgICByZXF1ZXN0LnNldFF1ZXJ5QXJnKFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhVXJpLlF1ZXJ5QXJnTmFtZXMuSW5jbHVkZSwgdGhpcy5xdWVyeUluY2x1ZGUuam9pbignLCcpKTtcclxuICAgIHJlcXVlc3Quc2V0UXVlcnlBcmcoJ19pbmNsdWRlRmlsZScsICdmYWxzZScpO1xyXG4gICAgcmV0dXJuIHJlcXVlc3Q7XHJcbiAgfSxcclxuICByZXF1ZXN0RGF0YTogZnVuY3Rpb24gcmVxdWVzdERhdGEoYXR0YWNobW5ldElkLCBvblN1Y2Vzcywgb25GYWlsdXJlKSB7XHJcbiAgICBjb25zdCByZXF1ZXN0ID0gdGhpcy5jcmVhdGVEYXRhUmVxdWVzdChhdHRhY2htbmV0SWQpO1xyXG4gICAgaWYgKHJlcXVlc3QpIHtcclxuICAgICAgcmVxdWVzdC5yZWFkKHtcclxuICAgICAgICBzdWNjZXNzOiBvblN1Y2VzcyxcclxuICAgICAgICBmYWlsdXJlOiBvbkZhaWx1cmUsXHJcbiAgICAgICAgc2NvcGU6IHRoaXMsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHJlc3BvbnNlXHJcbiAgICogQHBhcmFtIG9cclxuICAgKi9cclxuICBvblJlcXVlc3REYXRhRmFpbHVyZTogZnVuY3Rpb24gb25SZXF1ZXN0RGF0YUZhaWx1cmUoKSB7fSxcclxuICB1cGxvYWRGaWxlczogZnVuY3Rpb24gdXBsb2FkRmlsZXMoKSB7XHJcbiAgICB0aGlzLl9pc1VwbG9hZGluZyA9IHRydWU7XHJcbiAgICB0aGlzLl9maWxlQ291bnQgPSB0aGlzLl9maWxlcy5sZW5ndGg7XHJcbiAgICB3aGlsZSAodGhpcy5fZmlsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCBmaWxlID0gdGhpcy5fZmlsZXMucG9wKCk7XHJcbiAgICAgIHRoaXMuX2ZpbGVNYW5hZ2VyLnVwbG9hZEZpbGUoZmlsZSxcclxuICAgICAgICB0aGlzLl91cGxvYWRVcmwsXHJcbiAgICAgICAgdGhpcy5fdXBkYXRlUHJvZ3Jlc3MsXHJcbiAgICAgICAgdGhpcy5vblN1Y2Nlc3NVcGxvYWQsXHJcbiAgICAgICAgdGhpcy5vbkZhaWxlZFVwbG9hZCxcclxuICAgICAgICB0aGlzKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uU3VjY2Vzc1VwbG9hZDogZnVuY3Rpb24gb25TdWNjZXNzVXBsb2FkKHJlcXVlc3QpIHtcclxuICAgIC8vIHRoZSBpZCBvZiB0aGUgbmV3IGF0dGFjaG1lbnQgaXMgYnVyaWVkIGluIHRoZSBMb2NhdGlvbiByZXNwb25zZSBoZWFkZXIuLi5cclxuICAgIGNvbnN0IHVybCA9IHJlcXVlc3QuZ2V0UmVzcG9uc2VIZWFkZXIoJ0xvY2F0aW9uJyk7XHJcbiAgICBjb25zdCByZSA9IC8nXFx3KycvZztcclxuICAgIGNvbnN0IG1hdGNoZXMgPSB1cmwubWF0Y2gocmUpO1xyXG5cclxuICAgIGlmIChtYXRjaGVzKSB7XHJcbiAgICAgIGNvbnN0IGlkID0gbWF0Y2hlc1swXS5yZXBsYWNlKC8nL2csICcnKTtcclxuICAgICAgLy8gbm93IHRoYXQgd2UgaGF2ZSB0aGUgaWQsIHdlIGNhbiBmZXRjaCBpdCB1c2luZyB0aGUgU2luZ2xlRW50cnlTRGF0YVN0b3JlXHJcbiAgICAgIHRoaXMucmVxdWVzdERhdGEoaWQsIGZ1bmN0aW9uIHN1Y2Nlc3MoYXR0YWNobWVudCkge1xyXG4gICAgICAgIGNvbnN0IG1peGluID0gdGhpcy5fZ2V0QXR0YWNobWVudENvbnRleHRNaXhpbihhdHRhY2htZW50LmZpbGVOYW1lKTtcclxuICAgICAgICBpZiAobWl4aW4pIHtcclxuICAgICAgICAgIGF0dGFjaG1lbnQuYXR0YWNoRGF0ZSA9IGNvbnZlcnQudG9Jc29TdHJpbmdGcm9tRGF0ZShuZXcgRGF0ZSgpKTtcclxuICAgICAgICAgIGF0dGFjaG1lbnQuZGF0YVR5cGUgPSAnUic7XHJcbiAgICAgICAgICBhdHRhY2htZW50LmRlc2NyaXB0aW9uID0gdGhpcy5fZ2V0RmlsZURlc2NyaXB0aW9uKGF0dGFjaG1lbnQuZmlsZU5hbWUpO1xyXG4gICAgICAgICAgY29uc3QgYSA9IGxhbmcubWl4aW4oYXR0YWNobWVudCwgbWl4aW4pO1xyXG4gICAgICAgICAgY29uc3QgcmVxID0gdGhpcy5jcmVhdGVEYXRhUmVxdWVzdChpZCk7XHJcbiAgICAgICAgICBpZiAocmVxKSB7XHJcbiAgICAgICAgICAgIHJlcS51cGRhdGUoYSwge1xyXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IHRoaXMub25TdWNjZXNzVXBkYXRlLFxyXG4gICAgICAgICAgICAgIGZhaWx1cmU6IHRoaXMub25GYWlsZWRVcGRhdGUsXHJcbiAgICAgICAgICAgICAgc2NvcGU6IHRoaXMsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgdGhpcy5vblJlcXVlc3REYXRhRmFpbHVyZVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgb25GYWlsZWRVcGxvYWQ6IGZ1bmN0aW9uIG9uRmFpbGVkVXBsb2FkKHJlc3ApIHtcclxuICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcignRmFpbGVkIHRvIHVwbG9hZC4nKTtcclxuICAgIGVyci5yZXNwID0gcmVzcDtcclxuICAgIHRocm93IGVycjtcclxuICB9LFxyXG4gIF9vbkZhaWxlZEFkZDogZnVuY3Rpb24gX29uRmFpbGVkQWRkKHJlc3ApIHtcclxuICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcignRmFpbGVkIHRvIHNhdmUuJyk7XHJcbiAgICBlcnIucmVzcCA9IHJlc3A7XHJcbiAgICB0aHJvdyBlcnI7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBAcGFyYW0gYXR0YWNobWVudFxyXG4gICAqL1xyXG4gIG9uU3VjY2Vzc1VwZGF0ZTogZnVuY3Rpb24gb25TdWNjZXNzVXBkYXRlKCkge30sXHJcbiAgb25GYWlsZWRVcGRhdGU6IGZ1bmN0aW9uIG9uRmFpbGVkVXBkYXRlKHJlc3ApIHtcclxuICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcignRmFpbGVkIHRvIHVwZGF0ZS4nKTtcclxuICAgIGVyci5yZXNwID0gcmVzcDtcclxuICAgIHRocm93IGVycjtcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBwZXJjZW50XHJcbiAgICovXHJcbiAgb25VcGRhdGVQcm9ncmVzczogZnVuY3Rpb24gb25VcGRhdGVQcm9ncmVzcygpIHt9LFxyXG4gIF91cGRhdGVQcm9ncmVzczogZnVuY3Rpb24gX3VwZGF0ZVByb2dyZXNzKGN1ckZpbGVQcm9ncmVzcykge1xyXG4gICAgbGV0IHBjdCA9IHRoaXMuX3RvdGFsUHJvZ3Jlc3M7XHJcblxyXG4gICAgaWYgKGN1ckZpbGVQcm9ncmVzcyAmJiBjdXJGaWxlUHJvZ3Jlc3MubGVuZ3RoQ29tcHV0YWJsZSkge1xyXG4gICAgICBjb25zdCBmaWxlUGVyY2VudCA9IChjdXJGaWxlUHJvZ3Jlc3MubG9hZGVkIC8gY3VyRmlsZVByb2dyZXNzLnRvdGFsKSAqIDEwMDtcclxuICAgICAgcGN0ID0gZmlsZVBlcmNlbnQ7XHJcbiAgICB9IGVsc2UgaWYgKGN1ckZpbGVQcm9ncmVzcykge1xyXG4gICAgICBwY3QgPSBjdXJGaWxlUHJvZ3Jlc3M7XHJcbiAgICB9XHJcbiAgICB0aGlzLl90b3RhbFByb2dyZXNzID0gcGN0O1xyXG5cclxuICAgIGlmIChwY3QgPCA5OSkge1xyXG4gICAgICBpZiAodGhpcy5vblVwZGF0ZVByb2dyZXNzKSB7XHJcbiAgICAgICAgdGhpcy5vblVwZGF0ZVByb2dyZXNzKHBjdCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX3Jlc2V0Q291bnRzKCk7XHJcbiAgICAgIGlmICh0aGlzLm9uVXBkYXRlUHJvZ3Jlc3MpIHtcclxuICAgICAgICB0aGlzLm9uVXBkYXRlUHJvZ3Jlc3MoMTAwLjAwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgX3Jlc2V0Q291bnRzOiBmdW5jdGlvbiBfcmVzZXRDb3VudHMoKSB7XHJcbiAgICB0aGlzLl9maWxlQ291bnQgPSAwO1xyXG4gICAgdGhpcy5fZmlsZXNVcGxvYWRlZENvdW50ID0gMDtcclxuICAgIHRoaXMuX2lzVXBsb2FkaW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLl90b3RhbFByb2dyZXNzID0gMDtcclxuICB9LFxyXG4gIGdldEF0dGFjaG1lbnRGaWxlOiBmdW5jdGlvbiBnZXRBdHRhY2htZW50RmlsZShhdHRhY2htZW50SWQsIHJlc3BvbnNlVHlwZSwgb25TdWNjc2Vzcykge1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5nZXRBdHRhY2htZW50VXJsKGF0dGFjaG1lbnRJZCk7XHJcbiAgICB0aGlzLl9maWxlTWFuYWdlci5nZXRGaWxlKHVybCwgcmVzcG9uc2VUeXBlLCBvblN1Y2NzZXNzKTtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==