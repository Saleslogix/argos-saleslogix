import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import AttachmentManager from '../../AttachmentManager';
import Utility from '../../Utility';
import Detail from 'argos/Detail';
import _LegacySDataDetailMixin from 'argos/_LegacySDataDetailMixin';
import getResource from 'argos/I18n';


const resource = getResource('attachmentView');
const dtFormatResource = getResource('attachmentViewDateTimeFormat');

/**
 * @class crm.Views.Attachment.ViewAttachment
 *
 *
 * @extends argos.Detail
 * @mixins argos.Detail
 * @mixins argos._LegacySDataDetailMixin
 *
 * @requires argos.Detail
 * @requires argos._LegacySDataDetailMixin
 *
 * @requires crm.Format
 * @requires crm.AttachmentManager
 * @requires crm.Utility
 *
 */
const __class = declare('crm.Views.Attachment.ViewAttachment', [Detail, _LegacySDataDetailMixin], {
  // Localization
  detailsText: resource.detailsText,
  descriptionText: resource.descriptionText,
  fileNameText: resource.fileNameText,
  attachDateText: resource.attachDateText,
  fileSizeText: resource.fileSizeText,
  userText: resource.userText,
  attachmentNotSupportedText: resource.attachmentNotSupportedText,
  attachmentDateFormatText: dtFormatResource.attachmentDateFormatText,
  attachmentDateFormatText24: dtFormatResource.attachmentDateFormatText24,
  downloadingText: resource.downloadingText,
  notSupportedText: resource.notSupportedText,

  // View Properties
  id: 'view_attachment',
  editView: '',
  security: null,
  isTabbed: false,
  querySelect: ['description', 'user', 'attachDate', 'fileSize', 'fileName', 'url', 'fileExists', 'remoteStatus', 'dataType'],
  resourceKind: 'attachments',
  contractName: 'system',
  orginalImageSize: {
    width: 0,
    height: 0,
  },
  queryInclude: ['$descriptors'],
  dataURL: null,
  notSupportedTemplate: new Simplate([
    '<h2>{%= $$.notSupportedText %}</h2>',
  ]),
  widgetTemplate: new Simplate([
    '<div id="{%= $.id %}" data-title="{%= $.titleText %}" class="overthrow detail panel {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>',
    '{%! $.loadingTemplate %}',
    '<div class="panel-content" data-dojo-attach-point="contentNode"></div>',
    '<div class="attachment-viewer-content" data-dojo-attach-point="attachmentViewerNode"></div>',
    '</div>',
  ]),
  attachmentLoadingTemplate: new Simplate([
    '<div class="list-loading-indicator">{%= $.loadingText %}</div>',
  ]),
  attachmentViewTemplate: new Simplate([
    '<div class="attachment-viewer-label" style="white-space:nowrap;">',
    '<label>{%= $.description + " (" + $.fileType + ")"  %}</label>',
    '</div>',
    '<div class="attachment-viewer-area">',
    '<iframe id="attachment-Iframe" src="{%= $.url %}"></iframe>',
    '</div>',
  ]),
  attachmentViewImageTemplate: new Simplate([
    '<div class="attachment-viewer-label" style="white-space:nowrap;">',
    '<label>{%= $.description + " (" + $.fileType + ")"  %}</label>',
    '</div>',
    '<div class="attachment-viewer-area">',
    '<table>',
    '<tr valign="middle">',
    '<td id="imagePlaceholder" align="center">',
    '</td>',
    '</tr>',
    '</table>',
    '</div>',
  ]),
  attachmentViewNotSupportedTemplate: new Simplate([
    '<div class="attachment-viewer-label">',
    '<label>{%= $$.attachmentNotSupportedText %}</label>',
    '</div>',
    '<div class="attachment-viewer-not-supported">',
    '<p class="listview-heading"><span>{%: $.description %}&nbsp;</span></p>',
    '<p class="micro-text"><span>({%: crm.Format.date($.attachDate, (App.is24HourClock()) ? $$.attachmentDateFormatText24 : $$.attachmentDateFormatText) %})&nbsp;</span>',
    '<span>{%: crm.Format.fileSize($.fileSize) %} </span></p>',
    '<p class="micro-text"><span>{%: crm.Utility.getFileExtension($.fileName) %} </span></p>',
    '{% if($.user) { %}',
    '<p class="micro-text"><span>{%: $.user.$descriptor  %}</span></p>',
    '{% } %}',
    '</div>',
  ]),

  downloadingTemplate: new Simplate([
    '<li class="list-loading-indicator"><div>{%= $.downloadingText %}</div></li>',
  ]),
  show: function show(options) {
    this.inherited(arguments);
    this.attachmentViewerNode.innerHTML = '';
    if (!App.supportsFileAPI()) {
      $(this.domNode).empty().append(this.notSupportedTemplate.apply({}, this));
      return;
    }

    // If this opened the second time we need to check to see if it is the same attachmnent and let the Process Entry function load the view.
    if (this.entry) {
      if (options.key === this.entry.$key) {
        this._loadAttachmentView(this.entry);
      }
    }
  },
  processEntry: function processEntry(entry) {
    this.inherited(arguments);
    this._loadAttachmentView(entry);
  },
  createRequest: function createRequest() {
    const request = this.inherited(arguments);
    request.setQueryArg('_includeFile', 'false');
    return request;
  },
  createEntryForDelete: function createEntryForDelete(e) {
    const entry = {
      $key: e.$key,
      $etag: e.$etag,
      $name: e.$name,
    };
    return entry;
  },
  createToolLayout: function createToolLayout() {
    return this.tools;
  },
  createLayout: function createLayout() {
    return this.tools || (this.tools = []);
  },
  setSrc: function setSrc(iframe, url) {
    $(iframe).attr('src', url);
  },
  _loadAttachmentView: function _loadAttachmentView(entry) {
    const am = new AttachmentManager();
    let description;
    let isFile;
    let fileType;
    let loaded;

    if (!entry.url) {
      description = entry.description;
      fileType = Utility.getFileExtension(entry.fileName);
      isFile = true;
    } else {
      isFile = false;
      description = `${entry.description} (${entry.url})`;
      fileType = 'url';
    }

    const data = {
      fileName: entry.fileName,
      fileSize: entry.fileSize,
      fileType,
      url: '',
      description,
    };

    if (isFile) {
      fileType = Utility.getFileExtension(entry.fileName);
      if (this._isfileTypeAllowed(fileType)) {
        if (this._isfileTypeImage(fileType)) {
          $(this.attachmentViewerNode).append(this.attachmentViewImageTemplate.apply(data, this));
          const tpl = $(this.downloadingTemplate.apply(this));
          $(this.attachmentViewerNode).prepend(tpl);
          $(this.domNode).addClass('list-loading');
          const self = this;
          const attachmentid = entry.$key;
          // dataurl
          am.getAttachmentFile(attachmentid, 'arraybuffer', (responseInfo) => {
            const rData = Utility.base64ArrayBuffer(responseInfo.response);
            self.dataURL = `data:${responseInfo.contentType};base64,${rData}`;

            const image = new Image();

            const loadHandler = function loadHandler() {
              if (loaded) {
                return;
              }

              self._orginalImageSize = {
                width: image.width,
                height: image.height,
              };
              self._sizeImage(self.domNode, image);
              $('#imagePlaceholder').empty().append(image);
              loaded = true;
            };

            image.onload = loadHandler;
            image.src = self.dataURL;

            if (image.complete) {
              loadHandler();
            }

            // Set download text to hidden
            $(tpl).addClass('display-none');
          });
        } else { // View file type in Iframe
          if (this._viewImageOnly() === false) {
            $(this.attachmentViewerNode).append(this.attachmentViewTemplate.apply(data, this));
            const tpl = $(this.downloadingTemplate.apply(this));
            $(this.attachmentViewerNode).prepend(tpl);
            $(this.domNode).addClass('list-loading');
            const attachmentid = entry.$key;
            am.getAttachmentFile(attachmentid, 'arraybuffer', (responseInfo) => {
              const rData = Utility.base64ArrayBuffer(responseInfo.response);
              const dataUrl = `data:${responseInfo.contentType};base64,${rData}`;
              $(tpl).addClass('display-none');
              const iframe = document.getElementById('attachment-Iframe');
              iframe.onload = function iframeOnLoad() {
                $(tpl).addClass('display-none');
              };
              $(tpl).addClass('display-none');
              this.setSrc(iframe, dataUrl);
            });
          } else { // Only view images
            $(this.attachmentViewerNode).append(this.attachmentViewNotSupportedTemplate.apply(entry, this));
          }
        }
      } else { // File type not allowed
        $(this.attachmentViewerNode).append(this.attachmentViewNotSupportedTemplate.apply(entry, this));
      }
    } else { // url Attachment
      $(this.attachmentViewerNode).append(this.attachmentViewTemplate.apply(data, this));
      const url = am.getAttachmenturlByEntity(entry);
      $(this.domNode).addClass('list-loading');
      const tpl = $(this.downloadingTemplate.apply(this));
      $(this.attachmentViewerNode).prepend(tpl);
      const iframe = document.getElementById('attachment-Iframe');
      iframe.onload = function iframeOnLoad() {
        $(tpl).addClass('display-none');
      };
      this.setSrc(iframe, url);
      $(tpl).addClass('display-none');
    }
  },
  _isfileTypeImage: function _isfileTypeImage(fileType) {
    const fType = fileType.substr(fileType.lastIndexOf('.') + 1).toLowerCase();
    let imageTypes;

    if (App.imageFileTypes) {
      imageTypes = App.imageFileTypes;
    } else {
      imageTypes = {
        jpg: true,
        gif: true,
        png: true,
        bmp: true,
        tif: true,
      };
    }

    if (imageTypes[fType]) {
      return true;
    }

    return false;
  },
  _isfileTypeAllowed: function _isfileTypeAllowed(fileType) {
    const fType = fileType.substr(fileType.lastIndexOf('.') + 1).toLowerCase();
    let fileTypes;

    if (App.nonViewableFileTypes) {
      fileTypes = App.nonViewableFileTypes;
    } else {
      fileTypes = {
        exe: true,
        dll: true,
      };
    }

    if (fileTypes[fType]) {
      return false;
    }
    return true;
  },
  _viewImageOnly: function _viewImageOnly() {
    return false;
  },
  _sizeImage: function _sizeImage(containerNode, image) {
    const contentBox = $(containerNode).parent(); // hack to get parent dimensions since child containers occupy 0 height as they are not absolute anymore
    const iH = image.height;
    const iW = image.width;
    let wH = contentBox.height();
    let wW = contentBox.width();
    let scale = 1;

    if (wH > 200) {
      wH = wH - 50;
    }

    if (wW > 200) {
      wW = wW - 50;
    }

    if (wH < 50) {
      wH = 100;
    }

    if (wW < 50) {
      wW = 100;
    }

    // if the image is larger than the window
    if (iW > wW && iH > wH) {
      // if the window height is lager than the width
      if (wH < wW) {
        scale = 1 - ((iH - wH) / iH);
      } else { // if the window width is lager than the height
        scale = 1 - ((iW - wW) / iW);
      }
    } else if (iW > wW) { // if the image  width is lager than the height
      scale = 1 - ((iW - wW) / iW);
    } else if (iH > wH) { // if the image  height is lager than the width
      scale = 1 - ((iH - wH) / iH);
    } else {
      // Image is samller than view
      if (wH / iH > wW / iW) {
        scale = 1 + ((wH - iH) / wH);
      } else {
        scale = 1 + ((wW - iW) / wW);
      }
    }
    image.height = 0.90 * scale * iH;
    image.width = 0.90 * scale * iW;
  },
});

lang.setObject('Mobile.SalesLogix.Views.Attachment.ViewAttachment', __class);
export default __class;
