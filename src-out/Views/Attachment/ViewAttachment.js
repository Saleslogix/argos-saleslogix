define("crm/Views/Attachment/ViewAttachment", ["exports", "dojo/_base/declare", "dojo/dom-geometry", "../../AttachmentManager", "../../Utility", "dojo/has", "argos/Detail", "argos/_LegacySDataDetailMixin", "argos/I18n", "argos/ErrorManager"], function (_exports, _declare, _domGeometry, _AttachmentManager, _Utility, _has, _Detail, _LegacySDataDetailMixin2, _I18n, _ErrorManager) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _domGeometry = _interopRequireDefault(_domGeometry);
  _AttachmentManager = _interopRequireDefault(_AttachmentManager);
  _Utility = _interopRequireDefault(_Utility);
  _has = _interopRequireDefault(_has);
  _Detail = _interopRequireDefault(_Detail);
  _LegacySDataDetailMixin2 = _interopRequireDefault(_LegacySDataDetailMixin2);
  _I18n = _interopRequireDefault(_I18n);
  _ErrorManager = _interopRequireDefault(_ErrorManager);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  /* Copyright 2017 Infor
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
  var resource = (0, _I18n["default"])('attachmentView');
  var dtFormatResource = (0, _I18n["default"])('attachmentViewDateTimeFormat');

  var __class = (0, _declare["default"])('crm.Views.Attachment.ViewAttachment', [_Detail["default"], _LegacySDataDetailMixin2["default"]], {
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
      height: 0
    },
    queryInclude: ['$descriptors'],
    dataURL: null,
    pdfDoc: null,
    pdfTotalPages: 0,
    pdfCurrentPage: 0,
    pdfIsLoading: false,
    pdfScale: 1,
    RENDER_DELAY: (0, _has["default"])('ios') < 8 ? 500 : 32 || 500,
    // Work around IOS7 orientation change issues
    notSupportedTemplate: new Simplate(['<h2>{%= $$.notSupportedText %}</h2>']),
    widgetTemplate: new Simplate(['<div id="{%= $.id %}" data-title="{%= $.titleText %}" class="overthrow detail panel {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>', '{%! $.loadingTemplate %}', '<div class="panel-content" data-dojo-attach-point="contentNode"></div>', '<div class="attachment-viewer-content" data-dojo-attach-point="attachmentViewerNode"></div>', '</div>']),
    attachmentLoadingTemplate: new Simplate(['<div class="list-loading-indicator">{%= $.loadingText %}</div>']),
    attachmentViewTemplate: new Simplate(['<div class="attachment-viewer-label" style="white-space:nowrap;">', '<label>{%= $.description + " (" + $.fileType + ")"  %}</label>', '</div>', '<div class="attachment-viewer-area">', '<iframe id="attachment-Iframe" src="{%= $.url %}"></iframe>', '</div>']),
    pdfViewTemplate: new Simplate(['<div class="pdf-controls">', '<button type="button" class="first-page-button btn-icon">', '<svg role="presentation" aria-hidden="true" focusable="false" class="icon">', '<use xlink:href="#icon-first-page"></use>', '</svg>', '</button>', '<button type="button" class="prev-button btn-icon">', '<svg role="presentation" aria-hidden="true" focusable="false" class="icon">', '<use xlink:href="#icon-previous-page"></use>', '</svg>', '</button>', '<div class="page-stats"></div>', '<button type="button" class="zoom-out btn-icon">', '<svg role="presentation" aria-hidden="true" focusable="false" class="icon">', '<use xlink:href="#icon-zoom-out"></use>', '</svg>', '</button>', '<button type="button" class="zoom-in btn-icon">', '<svg role="presentation" aria-hidden="true" focusable="false" class="icon">', '<use xlink:href="#icon-zoom-in"></use>', '</svg>', '</button>', '<button type="button" class="next-button btn-icon">', '<svg role="presentation" aria-hidden="true" focusable="false" class="icon">', '<use xlink:href="#icon-next-page"></use>', '</svg>', '</button>', '<button type="button" class="last-page-button btn-icon">', '<svg role="presentation" aria-hidden="true" focusable="false" class="icon">', '<use xlink:href="#icon-last-page"></use>', '</svg>', '</button>', '</div>', '<div style="overflow:auto; min-height:100%;">', // min-height to fix iOS <= 9 issues with scroll
    '<canvas id="pdfViewer">', '</canvas>', '</div>']),
    attachmentViewImageTemplate: new Simplate(['<div class="attachment-viewer-label" style="white-space:nowrap;">', '<label>{%= $.description + " (" + $.fileType + ")"  %}</label>', '</div>', '<div class="attachment-viewer-area">', '<table>', '<tr valign="middle">', '<td id="imagePlaceholder" align="center">', '</td>', '</tr>', '</table>', '</div>']),
    attachmentViewNotSupportedTemplate: new Simplate(['<div class="attachment-viewer-label">', '<label>{%= $$.attachmentNotSupportedText %}</label>', '</div>', '<div class="attachment-viewer-not-supported">', '<p class="listview-heading"><span>{%: $.description %}&nbsp;</span></p>', '<p class="micro-text"><span>({%: crm.Format.date($.attachDate, (App.is24HourClock()) ? $$.attachmentDateFormatText24 : $$.attachmentDateFormatText) %})&nbsp;</span>', '<span>{%: crm.Format.fileSize($.fileSize) %} </span></p>', '<p class="micro-text"><span>{%: crm.Utility.getFileExtension($.fileName) %} </span></p>', '{% if($.user) { %}', '<p class="micro-text"><span>{%: $.user.$descriptor  %}</span></p>', '{% } %}', '</div>']),
    downloadingTemplate: new Simplate(['<li class="list-loading-indicator"><div>{%= $.downloadingText %}</div></li>']),
    renderPdf: function getRenderFunction() {
      if (this.pdfDoc && !this.pdfIsLoading) {
        this.pdfScale = 1;
        this.renderPdfPage(this.pdfCurrentPage);
      }
    },
    onTransitionTo: function onTransitionTo() {
      var _this = this;

      var _renderFn = _Utility["default"].debounce(function () {
        return _this.renderPdf();
      }, this.RENDER_DELAY);

      $(window).on('resize.attachment', _renderFn);
      $(window).on('applicationmenuclose.attachment', _renderFn);
      $(window).on('applicationmenuopen.attachment', _renderFn);
    },
    onTransitionAway: function onTransitionAway() {
      $(window).off('resize.attachment');
      $(window).off('applicationmenuclose.attachment');
      $(window).off('applicationmenuopen.attachment');
    },
    show: function show(options) {
      this.inherited(show, arguments);
      this.attachmentViewerNode.innerHTML = '';

      if (!App.supportsFileAPI()) {
        $(this.domNode).empty().append(this.notSupportedTemplate.apply({}, this));
        return;
      } // If this opened the second time we need to check to see if it is the same attachmnent and let the Process Entry function load the view.


      if (this.entry) {
        if (options.key === this.entry.$key) {
          this._loadAttachmentView(this.entry);
        }
      }
    },
    processEntry: function processEntry(entry) {
      this.inherited(processEntry, arguments);

      this._loadAttachmentView(entry);
    },
    createRequest: function createRequest() {
      var request = this.inherited(createRequest, arguments);
      request.setQueryArg('_includeFile', 'false');
      return request;
    },
    createEntryForDelete: function createEntryForDelete(e) {
      var entry = {
        $key: e.$key,
        $etag: e.$etag,
        $name: e.$name
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
    onFirstPageClick: function onFirstPageClick() {
      if (this.pdfIsLoading) {
        return;
      }

      this.renderPdfPage(1);
    },
    onPrevClick: function onPrevClick() {
      if (this.pdfIsLoading) {
        return;
      }

      this.renderPdfPage(this.pdfCurrentPage - 1);
    },
    onNextClick: function onNextClick() {
      if (this.pdfIsLoading) {
        return;
      }

      this.renderPdfPage(this.pdfCurrentPage + 1);
    },
    onLastPageClick: function onLastPageClick() {
      if (this.pdfIsLoading) {
        return;
      }

      this.renderPdfPage(this.pdfTotalPages);
    },
    onZoomOutClick: function onZoomOutClick() {
      if (this.pdfIsLoading || this.pdfScale >= 1.5) {
        return;
      }

      this.pdfScale += 0.25;
      this.renderPdfPage(this.pdfCurrentPage);
    },
    onZoomInClick: function onZoomInClick() {
      if (this.pdfIsLoading || this.pdfScale <= 0.25) {
        return;
      }

      this.pdfScale -= 0.25;
      this.renderPdfPage(this.pdfCurrentPage);
    },
    renderPdfPage: function renderPdfPage(pageNumber) {
      var _this2 = this;

      if (pageNumber < 1 || this.pdfDoc === null) {
        return;
      }

      if (pageNumber > this.pdfDoc.numPages) {
        return;
      }

      if (this.pdfIsLoading) {
        return;
      }

      var box = _domGeometry["default"].getMarginBox(this.domNode);

      this.pdfDoc.getPage(pageNumber).then(function (page) {
        var scale = _this2.pdfScale;
        var viewport = page.getViewport({
          scale: scale
        });
        var canvas = document.getElementById('pdfViewer');
        var context = canvas.getContext('2d');
        var desiredWidth = box.w;
        viewport = page.getViewport({
          scale: desiredWidth / viewport.width
        });
        canvas.height = viewport.height < box.h ? box.h : viewport.height;
        canvas.width = viewport.width;
        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        _this2.pdfIsLoading = true;
        var renderTask = page.render(renderContext);
        renderTask.promise.then(function () {
          _this2.pdfCurrentPage = pageNumber;
          _this2.pdfIsLoading = false;

          _this2.updatePageStats();
        }, function (reason) {
          _this2.pdfIsLoading = false;
          var fileName = _this2.entry && _this2.entry.fileName;
          var message = "Failed to render page ".concat(pageNumber, " for PDF \"").concat(fileName, "\".");
          console.error(message, reason); // eslint-disable-line

          _ErrorManager["default"].addSimpleError(message, reason);
        });
      });
    },
    updatePageStats: function updatePageStats() {
      if (!this.pdfDoc) {
        return;
      }

      var node = $('.page-stats', this.attachmentViewerNode).first();
      node.text("".concat(this.pdfCurrentPage, " / ").concat(this.pdfTotalPages));
    },
    loadPdfDocument: function loadPdfDocument(responseInfo) {
      var _this3 = this;

      if (this.pdfDoc !== null) {
        this.pdfDoc.destroy();
        this.pdfDoc = null;
      }

      var dataResponse = _Utility["default"].base64ArrayBuffer(responseInfo.response);

      var task = window.pdfjsLib.getDocument({
        data: atob(dataResponse)
      });
      this.pdfIsLoading = true;
      task.promise.then(function (pdf) {
        _this3.pdfIsLoading = false;
        _this3.pdfDoc = pdf;
        _this3.pdfCurrentPage = 1;
        _this3.pdfTotalPages = pdf.numPages;

        _this3.renderPdfPage(1);
      }, function (reason) {
        _this3.pdfIsLoading = false;
        var fileName = _this3.entry && _this3.entry.fileName;
        var message = "The PDF \"".concat(fileName, "\" failed to load.");
        console.error(message, reason); // eslint-disable-line

        _ErrorManager["default"].addSimpleError(message, reason);
      });
    },
    _loadAttachmentView: function _loadAttachmentView(entry) {
      var _this4 = this;

      var am = new _AttachmentManager["default"]();
      var description;
      var isFile;
      var fileType;
      var loaded;

      if (!entry.url) {
        description = entry.description;
        fileType = _Utility["default"].getFileExtension(entry.fileName);
        isFile = true;
      } else {
        isFile = false;
        description = "".concat(entry.description, " (").concat(entry.url, ")");
        fileType = 'url';
      }

      var data = {
        fileName: entry.fileName,
        fileSize: entry.fileSize,
        fileType: fileType,
        url: '',
        description: description
      };

      if (isFile) {
        fileType = _Utility["default"].getFileExtension(entry.fileName);

        if (this._isfileTypeAllowed(fileType)) {
          if (this._isfileTypeImage(fileType)) {
            $(this.attachmentViewerNode).append(this.attachmentViewImageTemplate.apply(data, this));
            var tpl = $(this.downloadingTemplate.apply(this));
            $(this.attachmentViewerNode).prepend(tpl);
            $(this.domNode).addClass('list-loading');
            var self = this;
            var attachmentid = entry.$key; // dataurl

            am.getAttachmentFile(attachmentid, 'arraybuffer', function (responseInfo) {
              var rData = _Utility["default"].base64ArrayBuffer(responseInfo.response);

              self.dataURL = "data:".concat(responseInfo.contentType, ";base64,").concat(rData);
              var image = new Image();

              var loadHandler = function loadHandler() {
                if (loaded) {
                  return;
                }

                self._orginalImageSize = {
                  width: image.width,
                  height: image.height
                };

                self._sizeImage(self.domNode, image);

                $('#imagePlaceholder').empty().append(image);
                loaded = true;
              };

              image.onload = loadHandler;
              image.src = self.dataURL;

              if (image.complete) {
                loadHandler();
              } // Set download text to hidden


              $(tpl).addClass('display-none');
            });
          } else {
            // View file type in Iframe
            var _attachmentid = entry.$key;

            if (fileType === '.pdf') {
              $(this.attachmentViewerNode).append(this.pdfViewTemplate.apply(data, this));
              $('.prev-button', this.attachmentViewerNode).on('click', this.onPrevClick.bind(this));
              $('.next-button', this.attachmentViewerNode).on('click', this.onNextClick.bind(this));
              $('.first-page-button', this.attachmentViewerNode).on('click', this.onFirstPageClick.bind(this));
              $('.last-page-button', this.attachmentViewerNode).on('click', this.onLastPageClick.bind(this));
              $('.zoom-in', this.attachmentViewerNode).on('click', this.onZoomInClick.bind(this));
              $('.zoom-out', this.attachmentViewerNode).on('click', this.onZoomOutClick.bind(this));
              am.getAttachmentFile(_attachmentid, 'arraybuffer', function (responseInfo) {
                _this4.loadPdfDocument(responseInfo);
              });
            } else {
              $(this.attachmentViewerNode).append(this.attachmentViewTemplate.apply(data, this));

              var _tpl = $(this.downloadingTemplate.apply(this));

              $(this.attachmentViewerNode).prepend(_tpl);
              $(this.domNode).addClass('list-loading');
              am.getAttachmentFile(_attachmentid, 'arraybuffer', function (responseInfo) {
                var rData = _Utility["default"].base64ArrayBuffer(responseInfo.response);

                var dataUrl = "data:".concat(responseInfo.contentType, ";base64,").concat(rData);
                $(_tpl).addClass('display-none');
                var iframe = document.getElementById('attachment-Iframe');

                iframe.onload = function iframeOnLoad() {
                  $(_tpl).addClass('display-none');
                };

                $(_tpl).addClass('display-none');

                _this4.setSrc(iframe, dataUrl);
              });
            }
          }
        } else {
          // File type not allowed
          $(this.attachmentViewerNode).append(this.attachmentViewNotSupportedTemplate.apply(entry, this));
        }
      } else {
        // url Attachment
        $(this.attachmentViewerNode).append(this.attachmentViewTemplate.apply(data, this));
        var url = am.getAttachmenturlByEntity(entry);
        $(this.domNode).addClass('list-loading');

        var _tpl2 = $(this.downloadingTemplate.apply(this));

        $(this.attachmentViewerNode).prepend(_tpl2);
        var iframe = document.getElementById('attachment-Iframe');

        iframe.onload = function iframeOnLoad() {
          $(_tpl2).addClass('display-none');
        };

        this.setSrc(iframe, url);
        $(_tpl2).addClass('display-none');
      }
    },
    _isfileTypeImage: function _isfileTypeImage(fileType) {
      var fType = fileType.substr(fileType.lastIndexOf('.') + 1).toLowerCase();
      var imageTypes;

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

      if (imageTypes[fType]) {
        return true;
      }

      return false;
    },
    _isfileTypeAllowed: function _isfileTypeAllowed(fileType) {
      var fType = fileType.substr(fileType.lastIndexOf('.') + 1).toLowerCase();
      var fileTypes;

      if (App.nonViewableFileTypes) {
        fileTypes = App.nonViewableFileTypes;
      } else {
        fileTypes = {
          exe: true,
          dll: true
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
      var contentBox = $(containerNode).parent(); // hack to get parent dimensions since child containers occupy 0 height as they are not absolute anymore

      var iH = image.height;
      var iW = image.width;
      var wH = contentBox.height();
      var wW = contentBox.width();
      var scale = 1;

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
      } // if the image is larger than the window


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
        // Image is samller than view
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

  var _default = __class;
  _exports["default"] = _default;
});