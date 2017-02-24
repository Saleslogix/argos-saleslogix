import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import domConstruct from 'dojo/dom-construct';
import domAttr from 'dojo/dom-attr';
import domClass from 'dojo/dom-class';
import has from 'dojo/has';
import dom from 'dojo/dom';
import domGeom from 'dojo/dom-geometry';
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
    '<div id="{%= $.id %}" title="{%= $.titleText %}" class="overthrow detail panel {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>',
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
    '<h3><span>{%: $.description %}&nbsp;</span></h3>',
    '<h4><span>({%: crm.Format.date($.attachDate, (App.is24HourClock()) ? $$.attachmentDateFormatText24 : $$.attachmentDateFormatText) %})&nbsp;</span>',
    '<span>{%: crm.Format.fileSize($.fileSize) %} </span></h4>',
    '<h4><span>{%: crm.Utility.getFileExtension($.fileName) %} </span></h4>',
    '{% if($.user) { %}',
    '<h4><span>{%: $.user.$descriptor  %}</span></h4>',
    '{% } %}',
    '</div>',
  ]),

  downloadingTemplate: new Simplate([
    '<li class="list-loading-indicator"><div>{%= $.downloadingText %}</div></li>',
  ]),
  show: function show(options) {
    this.inherited(arguments);
    this.attachmentViewerNode.innerHTML = '';
    if (!has('html5-file-api')) {
      domConstruct.place(this.notSupportedTemplate.apply({}, this), this.domNode, 'only');
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
          domConstruct.place(this.attachmentViewImageTemplate.apply(data, this), this.attachmentViewerNode, 'last');
          const tpl = this.downloadingTemplate.apply(this);
          const dl = domConstruct.place(tpl, this.attachmentViewerNode, 'first');
          domClass.add(this.domNode, 'list-loading');
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
              domConstruct.place(image, 'imagePlaceholder', 'only');
              loaded = true;
            };

            image.onload = loadHandler;
            image.src = self.dataURL;

            if (image.complete) {
              loadHandler();
            }

            // Set download text to hidden
            domClass.add(dl, 'display-none');
          });
        } else { // View file type in Iframe
          if (this._viewImageOnly() === false) {
            domConstruct.place(this.attachmentViewTemplate.apply(data, this), this.attachmentViewerNode, 'last');
            const tpl = this.downloadingTemplate.apply(this);
            const dl = domConstruct.place(tpl, this.attachmentViewerNode, 'first');
            domClass.add(this.domNode, 'list-loading');
            const attachmentid = entry.$key;
            am.getAttachmentFile(attachmentid, 'arraybuffer', (responseInfo) => {
              const rData = Utility.base64ArrayBuffer(responseInfo.response);
              const dataUrl = `data:${responseInfo.contentType};base64,${rData}`;
              domClass.add(dl, 'display-none');
              const iframe = dom.byId('attachment-Iframe');
              iframe.onload = function iframeOnLoad() {
                domClass.add(dl, 'display-none');
              };
              domClass.add(dl, 'display-none');
              domAttr.set(iframe, 'src', dataUrl);
            });
          } else { // Only view images
            domConstruct.place(this.attachmentViewNotSupportedTemplate.apply(entry, this), this.attachmentViewerNode, 'last');
          }
        }
      } else { // File type not allowed
        domConstruct.place(this.attachmentViewNotSupportedTemplate.apply(entry, this), this.attachmentViewerNode, 'last');
      }
    } else { // url Attachment
      domConstruct.place(this.attachmentViewTemplate.apply(data, this), this.attachmentViewerNode, 'last');
      const url = am.getAttachmenturlByEntity(entry);
      domClass.add(this.domNode, 'list-loading');
      const tpl = this.downloadingTemplate.apply(this);
      const dl = domConstruct.place(tpl, this.attachmentViewerNode, 'first');
      const iframe = dom.byId('attachment-Iframe');
      iframe.onload = function iframeOnLoad() {
        domClass.add(dl, 'display-none');
      };
      domAttr.set(iframe, 'src', url);
      domClass.add(dl, 'display-none');
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
    const contentBox = domGeom.getContentBox(containerNode);
    const iH = image.height;
    const iW = image.width;
    let wH = contentBox.h;
    let wW = contentBox.w;
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
