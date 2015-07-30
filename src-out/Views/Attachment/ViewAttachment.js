define('crm/Views/Attachment/ViewAttachment', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'dojo/_base/connect', 'dojo/_base/array', '../../Format', 'dojo/dom-construct', 'dojo/dom-attr', 'dojo/dom-class', 'dojo/has', 'dojo/dom', 'dojo/dom-geometry', '../../AttachmentManager', '../../Utility', 'argos/Detail', 'argos/_LegacySDataDetailMixin'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _dojo_baseConnect, _dojo_baseArray, _Format, _dojoDomConstruct, _dojoDomAttr, _dojoDomClass, _dojoHas, _dojoDom, _dojoDomGeometry, _AttachmentManager, _Utility, _argosDetail, _argos_LegacySDataDetailMixin) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _string = _interopRequireDefault(_dojoString);

  var _connect = _interopRequireDefault(_dojo_baseConnect);

  var _array = _interopRequireDefault(_dojo_baseArray);

  var _format = _interopRequireDefault(_Format);

  var _domConstruct = _interopRequireDefault(_dojoDomConstruct);

  var _domAttr = _interopRequireDefault(_dojoDomAttr);

  var _domClass = _interopRequireDefault(_dojoDomClass);

  var _has = _interopRequireDefault(_dojoHas);

  var _dom = _interopRequireDefault(_dojoDom);

  var _domGeom = _interopRequireDefault(_dojoDomGeometry);

  var _AttachmentManager2 = _interopRequireDefault(_AttachmentManager);

  var _Utility2 = _interopRequireDefault(_Utility);

  var _Detail = _interopRequireDefault(_argosDetail);

  var _LegacySDataDetailMixin2 = _interopRequireDefault(_argos_LegacySDataDetailMixin);

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
  var __class = (0, _declare['default'])('crm.Views.Attachment.ViewAttachment', [_Detail['default'], _LegacySDataDetailMixin2['default']], {
    //Localization
    detailsText: 'Attachment Details',
    descriptionText: 'description',
    fileNameText: 'file name',
    attachDateText: 'attachment date',
    fileSizeText: 'file size',
    userText: 'user',
    attachmentNotSupportedText: 'The attachment type is not supported for viewing.',
    attachmentDateFormatText: 'ddd M/D/YYYY h:mm a',
    downloadingText: 'Downloading attachment ...',
    notSupportedText: 'Viewing attachments is not supported by your device.',

    //View Properties
    id: 'view_attachment',
    editView: '',
    security: null,
    querySelect: ['description', 'user', 'attachDate', 'fileSize', 'fileName', 'url', 'fileExists', 'remoteStatus', 'dataType'],
    resourceKind: 'attachments',
    contractName: 'system',
    orginalImageSize: {
      width: 0,
      height: 0
    },
    queryInclude: ['$descriptors'],
    dataURL: null,
    notSupportedTemplate: new Simplate(['<h2>{%= $$.notSupportedText %}</h2>']),
    widgetTemplate: new Simplate(['<div id="{%= $.id %}" title="{%= $.titleText %}" class="overthrow detail panel {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>', '{%! $.loadingTemplate %}', '<div class="panel-content" data-dojo-attach-point="contentNode"></div>', '<div class="attachment-viewer-content" data-dojo-attach-point="attachmentViewerNode"></div>', '</div>']),
    attachmentLoadingTemplate: new Simplate(['<div class="list-loading-indicator">{%= $.loadingText %}</div>']),
    attachmentViewTemplate: new Simplate(['<div class="attachment-viewer-label" style="white-space:nowrap;">', '<label>{%= $.description + " (" + $.fileType + ")"  %}</label>', '</div>', '<div class="attachment-viewer-area">', '<iframe id="attachment-Iframe" src="{%= $.url %}"></iframe>', '</div>']),
    attachmentViewImageTemplate: new Simplate(['<div class="attachment-viewer-label" style="white-space:nowrap;">', '<label>{%= $.description + " (" + $.fileType + ")"  %}</label>', '</div>', '<div class="attachment-viewer-area">', '<table>', '<tr valign="middle">', '<td id="imagePlaceholder" align="center">', '</td>', '</tr>', '</table>', '</div>']),
    attachmentViewNotSupportedTemplate: new Simplate(['<div class="attachment-viewer-label">', '<label>{%= $$.attachmentNotSupportedText %}</label>', '</div>', '<div class="attachment-viewer-not-supported">', '<h3><span>{%: $.description %}&nbsp;</span></h3>', '<h4><span>({%: crm.Format.date($.attachDate, $$.attachmentDateFormatText) %})&nbsp;</span>', '<span>{%: crm.Format.fileSize($.fileSize) %} </span></h4>', '<h4><span>{%: crm.Utility.getFileExtension($.fileName) %} </span></h4>', '{% if($.user) { %}', '<h4><span>{%: $.user.$descriptor  %}</span></h4>', '{% } %}', '</div>']),

    downloadingTemplate: new Simplate(['<li class="list-loading-indicator"><div>{%= $.downloadingText %}</div></li>']),
    show: function show(options) {
      this.inherited(arguments);
      this.attachmentViewerNode.innerHTML = '';
      if (!(0, _has['default'])('html5-file-api')) {
        _domConstruct['default'].place(this.notSupportedTemplate.apply({}, this), this.domNode, 'only');
        return;
      }

      //If this opened the second time we need to check to see if it is the same attachmnent and let the Process Entry function load the view.
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
      var request = this.inherited(arguments);
      request.setQueryArg('_includeFile', 'false');
      return request;
    },
    createEntryForDelete: function createEntryForDelete(e) {
      var entry = {
        '$key': e['$key'],
        '$etag': e['$etag'],
        '$name': e['$name']
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
      var data, am, isFile, url, viewNode, tpl, dl, description, attachmentid, fileType, self, iframe;

      am = new _AttachmentManager2['default']();

      if (!entry.url) {
        description = entry.description;
        fileType = _Utility2['default'].getFileExtension(entry.fileName);
        isFile = true;
      } else {
        isFile = false;
        description = entry.description + ' (' + entry.url + ')';
        fileType = 'url';
      }

      data = {
        fileName: entry.fileName,
        fileSize: entry.fileSize,
        fileType: fileType,
        url: '',
        description: description
      };

      if (isFile) {
        fileType = _Utility2['default'].getFileExtension(entry.fileName);
        if (this._isfileTypeAllowed(fileType)) {
          if (this._isfileTypeImage(fileType)) {
            viewNode = _domConstruct['default'].place(this.attachmentViewImageTemplate.apply(data, this), this.attachmentViewerNode, 'last');
            tpl = this.downloadingTemplate.apply(this);
            dl = _domConstruct['default'].place(tpl, this.attachmentViewerNode, 'first');
            _domClass['default'].add(this.domNode, 'list-loading');
            self = this;
            attachmentid = entry.$key;
            //dataurl
            am.getAttachmentFile(attachmentid, 'arraybuffer', function (responseInfo) {
              var rData, image, loadHandler, loaded;

              rData = _Utility2['default'].base64ArrayBuffer(responseInfo.response);
              self.dataURL = 'data:' + responseInfo.contentType + ';base64,' + rData;

              image = new Image();

              loadHandler = function () {
                if (loaded) {
                  return;
                }

                self._orginalImageSize = {
                  width: image.width,
                  height: image.height
                };
                self._sizeImage(self.domNode, image);
                _domConstruct['default'].place(image, 'imagePlaceholder', 'only');
                loaded = true;
              };

              image.onload = loadHandler;
              image.src = self.dataURL;

              if (image.complete) {
                loadHandler();
              }

              // Set download text to hidden
              _domClass['default'].add(dl, 'display-none');
            });
          } else {
            //View file type in Iframe
            if (this._viewImageOnly() === false) {
              viewNode = _domConstruct['default'].place(this.attachmentViewTemplate.apply(data, this), this.attachmentViewerNode, 'last');
              tpl = this.downloadingTemplate.apply(this);
              dl = _domConstruct['default'].place(tpl, this.attachmentViewerNode, 'first');
              _domClass['default'].add(this.domNode, 'list-loading');
              self = this;
              attachmentid = entry.$key;
              am.getAttachmentFile(attachmentid, 'arraybuffer', function (responseInfo) {
                var rData, dataUrl, iframe;

                rData = _Utility2['default'].base64ArrayBuffer(responseInfo.response);
                dataUrl = 'data:' + responseInfo.contentType + ';base64,' + rData;
                _domClass['default'].add(dl, 'display-none');
                iframe = _dom['default'].byId('attachment-Iframe');
                iframe.onload = function () {
                  _domClass['default'].add(dl, 'display-none');
                };
                _domClass['default'].add(dl, 'display-none');
                _domAttr['default'].set(iframe, 'src', dataUrl);
              });
            } else {
              //Only view images
              viewNode = _domConstruct['default'].place(this.attachmentViewNotSupportedTemplate.apply(entry, this), this.attachmentViewerNode, 'last');
            }
          }
        } else {
          //File type not allowed
          viewNode = _domConstruct['default'].place(this.attachmentViewNotSupportedTemplate.apply(entry, this), this.attachmentViewerNode, 'last');
        }
      } else {
        // url Attachment
        viewNode = _domConstruct['default'].place(this.attachmentViewTemplate.apply(data, this), this.attachmentViewerNode, 'last');
        url = am.getAttachmenturlByEntity(entry);
        _domClass['default'].add(this.domNode, 'list-loading');
        tpl = this.downloadingTemplate.apply(this);
        dl = _domConstruct['default'].place(tpl, this.attachmentViewerNode, 'first');
        iframe = _dom['default'].byId('attachment-Iframe');
        iframe.onload = function () {
          _domClass['default'].add(dl, 'display-none');
        };
        _domAttr['default'].set(iframe, 'src', url);
        _domClass['default'].add(dl, 'display-none');
      }
    },
    _isfileTypeImage: function _isfileTypeImage(fileType) {
      var imageTypes;

      fileType = fileType.substr(fileType.lastIndexOf('.') + 1).toLowerCase();
      if (App.imageFileTypes) {
        imageTypes = App.imageFileTypes;
      } else {
        imageTypes = {
          jpg: true,
          gif: true,
          png: true,
          bmp: true,
          tif: true
        };
      }

      if (imageTypes[fileType]) {
        return true;
      }

      return false;
    },
    _isfileTypeAllowed: function _isfileTypeAllowed(fileType) {
      var fileTypes;

      fileType = fileType.substr(fileType.lastIndexOf('.') + 1).toLowerCase();
      if (App.nonViewableFileTypes) {
        fileTypes = App.nonViewableFileTypes;
      } else {
        fileTypes = {
          exe: true,
          dll: true
        };
      }

      if (fileTypes[fileType]) {
        return false;
      }
      return true;
    },
    _viewImageOnly: function _viewImageOnly() {
      return false;
    },
    _sizeImage: function _sizeImage(containerNode, image) {
      var wH, wW, iH, iW, contentBox, scale;

      contentBox = _domGeom['default'].getContentBox(containerNode);
      wH = contentBox.h;
      wW = contentBox.w;
      iH = image.height;
      iW = image.width;
      scale = 1;

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
          scale = 1 - (iH - wH) / iH;
        } else {
          // if the window width is lager than the height
          scale = 1 - (iW - wW) / iW;
        }
      } else if (iW > wW) {
        // if the image  width is lager than the height
        scale = 1 - (iW - wW) / iW;
      } else if (iH > wH) {
        // if the image  height is lager than the width
        scale = 1 - (iH - wH) / iH;
      } else {
        //Image is samller than view
        if (wH / iH > wW / iW) {
          scale = 1 + (wH - iH) / wH;
        } else {
          scale = 1 + (wW - iW) / wW;
        }
      }
      image.height = 0.90 * scale * iH;
      image.width = 0.90 * scale * iW;
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.Attachment.ViewAttachment', __class);
  module.exports = __class;
});
