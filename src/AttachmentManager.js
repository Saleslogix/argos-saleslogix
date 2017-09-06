import FileManager from './FileManager';
import lang from 'dojo/_base/lang';
import declare from 'dojo/_base/declare';
import convert from 'argos/Convert';
import utility from './Utility';

/**
 * @class crm.AttachmentManager
 */
const __class = declare('crm.AttachmentManager', null, /** @lends crm.AttachmentManager# */{
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
    this._fileManager = new FileManager();
    const service = App.getService(this.serviceName);
    const oldContractName = service.getContractName();
    service.setContractName(this.contractName);
    this._baseUrl = utility.stripQueryArgs(service.getUri().toString());
    this._uploadUrl = `${this._baseUrl}/attachments/file`;
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
      description: mixin.description,
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
    },
      this.onRequestTemplateFailure
    );
  },
  getAttachmentUrl: function getAttachmentUrl(attachmentId) {
    const fileUrl = `${this._baseUrl}/attachments('${attachmentId}')/file`;
    return fileUrl;
  },
  getAttachmenturlByEntity: function getAttachmenturlByEntity(attachment) {
    let href;
    if (attachment.url) {
      href = attachment.url || '';
      href = (href.indexOf('http') < 0) ? `http://${href}` : href;
    } else {
      href = `${this._baseUrl}/attachments('${attachment.$key}')/file`;
    }
    return href;
  },
  _getFileDescription: function _getFileDescription(fileName) {
    let description = this._getDefaultDescription(fileName);
    for (let i = 0; i < this._fileDescriptions.length; i++) {
      if (fileName === this._fileDescriptions[i].fileName) {
        description = this._fileDescriptions[i].description;
      }
    }
    if ((description === null) || (description === '')) {
      description = this._getDefaultDescription(fileName);
    }
    return description;
  },
  _getAttachmentContextMixin: function _getAttachmentContextMixin() {
    const contextMixin = this._getAttachmentContext();
    return contextMixin;
  },
  _getAttachmentContext: function _getAttachmentContext() {
    let contextData = {};
    const found = App.queryNavigationContext((o) => {
      const context = (o.options && o.options.source) || o;
      if (/^(accounts|contacts|opportunities|tickets|leads|activities|history|userActivities)$/.test(context.resourceKind) && context.key) {
        return true;
      }
      return false;
    });

    const contextView = (found && found.options && found.options.source) || found;
    if (contextView) {
      const view = App.getView(contextView.id);
      const entry = contextView.entry || (view && view.entry) || contextView;

      if (!entry || !entry.$key) {
        return {};
      }

      switch (contextView.resourceKind) {
        case 'accounts':
          contextData = {
            accountId: entry.$key,
            accountName: entry.$descriptor,
          };
          break;
        case 'contacts':
          contextData = {
            contactId: entry.$key,
            contactName: entry.$descriptor,
            accountId: entry.Account.$key,
            accountName: entry.Account.AccountName,
          };
          break;
        case 'opportunities':
          contextData = {
            opportunityId: entry.$key,
            oppDescription: entry.$descriptor,
            accountId: entry.Account.$key,
            accountName: entry.Account.AccountName,
          };
          break;
        case 'tickets':
          contextData = {
            ticketId: entry.$key,
            ticketNumber: entry.$descriptor,
            accountId: entry.Account.$key,
            accountName: entry.Account.AccountName,
            contactId: entry.Contact.$key,
            contactName: entry.Contact.$descriptor,
          };
          break;
        case 'leads':
          contextData = {
            leadId: entry.$key,
            accountName: entry.$descriptor,
          };
          break;
        case 'activities':
          contextData = {
            activityId: utility.getRealActivityId(entry.$key),
            contactId: entry.ContactId,
            contactName: entry.ContactName,
            accountId: entry.AccountId,
            accountName: entry.AccountName,
            opportunityId: entry.OpportunityId,
            ticketId: entry.TicketId,
            leadId: entry.LeadId,
          };
          break;
        case 'userActivities':
          contextData = {
            activityId: utility.getRealActivityId(entry.Activity.$key),
            contactId: entry.Activity.ContactId,
            contactName: entry.Activity.ContactName,
            accountId: entry.Activity.AccountId,
            accountName: entry.Activity.AccountName,
            opportunityId: entry.Activity.OpportunityId,
            ticketId: entry.Activity.TicketId,
            leadId: entry.Activity.LeadId,
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
            leadId: entry.LeadId,
          };
          break;
        default:
          contextData = {
            entityId: entry.$key,
            entityName: contextView.id,
            description: entry.$descriptor,
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
    const request = new Sage.SData.Client.SDataTemplateResourceRequest(this.getService());
    request.setResourceKind(this.resourceKind);
    request.setContractName(this.contractName);
    request.setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Select, this.querySelect.join(','));
    request.setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Include, this.queryInclude.join(','));
    return request;
  },
  requestTemplate: function requestTemplate(onSucess, onFailure) {
    const request = this.createTemplateRequest();
    if (request) {
      request.read({
        success: onSucess,
        failure: onFailure,
        scope: this,
      });
    }
  },
  onRequestTemplateFailure: function onRequestTemplateFailure() {},
  onRequestTemplateSuccess: function onRequestTemplateSuccess(entry) {
    this.processTemplateEntry(entry);
  },
  createDataRequest: function createDataRequest(id) {
    const request = new Sage.SData.Client.SDataSingleResourceRequest(this.getService());
    request.setResourceKind(this.resourceKind);
    request.setContractName(this.contractName);
    request.setResourceSelector(`'${id}'`);

    request.setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Select, this.querySelect.join(','));
    request.setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Include, this.queryInclude.join(','));
    request.setQueryArg('_includeFile', 'false');
    return request;
  },
  requestData: function requestData(attachmnetId, onSucess, onFailure) {
    const request = this.createDataRequest(attachmnetId);
    if (request) {
      request.read({
        success: onSucess,
        failure: onFailure,
        scope: this,
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
      const file = this._files.pop();
      this._fileManager.uploadFile(file,
        this._uploadUrl,
        this._updateProgress,
        this.onSuccessUpload,
        this.onFailedUpload,
        this);
    }
  },
  onSuccessUpload: function onSuccessUpload(request) {
    // the id of the new attachment is buried in the Location response header...
    const url = request.getResponseHeader('Location');
    const re = /'\w+'/g;
    const matches = url.match(re);

    if (matches) {
      const id = matches[0].replace(/'/g, '');
      // now that we have the id, we can fetch it using the SingleEntrySDataStore
      this.requestData(id, function success(attachment) {
        const mixin = this._getAttachmentContextMixin(attachment.fileName);
        if (mixin) {
          attachment.attachDate = convert.toIsoStringFromDate(new Date());
          attachment.dataType = 'R';
          attachment.description = this._getFileDescription(attachment.fileName);
          const a = lang.mixin(attachment, mixin);
          const req = this.createDataRequest(id);
          if (req) {
            req.update(a, {
              success: this.onSuccessUpdate,
              failure: this.onFailedUpdate,
              scope: this,
            });
          }
        }
      },
        this.onRequestDataFailure
      );
    }
  },
  onFailedUpload: function onFailedUpload(resp) {
    const err = new Error('Failed to upload.');
    err.resp = resp;
    throw err;
  },
  _onFailedAdd: function _onFailedAdd(resp) {
    const err = new Error('Failed to save.');
    err.resp = resp;
    throw err;
  },
  /**
   * @param attachment
   */
  onSuccessUpdate: function onSuccessUpdate() {},
  onFailedUpdate: function onFailedUpdate(resp) {
    const err = new Error('Failed to update.');
    err.resp = resp;
    throw err;
  },
  /**
   * @param percent
   */
  onUpdateProgress: function onUpdateProgress() {},
  _updateProgress: function _updateProgress(curFileProgress) {
    let pct = this._totalProgress;

    if (curFileProgress && curFileProgress.lengthComputable) {
      const filePercent = (curFileProgress.loaded / curFileProgress.total) * 100;
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
    const url = this.getAttachmentUrl(attachmentId);
    this._fileManager.getFile(url, responseType, onSuccsess);
  },
});

lang.setObject('Mobile.SalesLogix.AttachmentManager', __class);
export default __class;
