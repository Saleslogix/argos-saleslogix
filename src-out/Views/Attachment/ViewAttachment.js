define('crm/Views/Attachment/ViewAttachment', ['module', 'exports', 'dojo/_base/declare', 'dojo/dom-geometry', 'dojo/_base/connect', '../../AttachmentManager', '../../Utility', 'dojo/has', 'argos/Detail', 'argos/_LegacySDataDetailMixin', 'argos/I18n', 'argos/ErrorManager'], function (module, exports, _declare, _domGeometry, _connect, _AttachmentManager, _Utility, _has, _Detail, _LegacySDataDetailMixin2, _I18n, _ErrorManager) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _domGeometry2 = _interopRequireDefault(_domGeometry);

  var _connect2 = _interopRequireDefault(_connect);

  var _AttachmentManager2 = _interopRequireDefault(_AttachmentManager);

  var _Utility2 = _interopRequireDefault(_Utility);

  var _has2 = _interopRequireDefault(_has);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _LegacySDataDetailMixin3 = _interopRequireDefault(_LegacySDataDetailMixin2);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _ErrorManager2 = _interopRequireDefault(_ErrorManager);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  var resource = (0, _I18n2.default)('attachmentView');
  var dtFormatResource = (0, _I18n2.default)('attachmentViewDateTimeFormat');

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
  var __class = (0, _declare2.default)('crm.Views.Attachment.ViewAttachment', [_Detail2.default, _LegacySDataDetailMixin3.default], {
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
    RENDER_DELAY: (0, _has2.default)('ios') < 8 ? 500 : 16 || 500, // Work around IOS7 orientation change issues
    notSupportedTemplate: new Simplate(['<h2>{%= $$.notSupportedText %}</h2>']),
    widgetTemplate: new Simplate(['<div id="{%= $.id %}" data-title="{%= $.titleText %}" class="overthrow detail panel {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>', '{%! $.loadingTemplate %}', '<div class="panel-content" data-dojo-attach-point="contentNode"></div>', '<div class="attachment-viewer-content" data-dojo-attach-point="attachmentViewerNode"></div>', '</div>']),
    attachmentLoadingTemplate: new Simplate(['<div class="list-loading-indicator">{%= $.loadingText %}</div>']),
    attachmentViewTemplate: new Simplate(['<div class="attachment-viewer-label" style="white-space:nowrap;">', '<label>{%= $.description + " (" + $.fileType + ")"  %}</label>', '</div>', '<div class="attachment-viewer-area">', '<iframe id="attachment-Iframe" src="{%= $.url %}"></iframe>', '</div>']),
    pdfViewTemplate: new Simplate(['<div class="pdf-controls">', '<button type="button" class="first-page-button btn-icon">', '<svg role="presentation" aria-hidden="true" focusable="false" class="icon">', '<use xlink:href="#icon-first-page"></use>', '</svg>', '</button>', '<button type="button" class="prev-button btn-icon">', '<svg role="presentation" aria-hidden="true" focusable="false" class="icon">', '<use xlink:href="#icon-previous-page"></use>', '</svg>', '</button>', '<div class="page-stats"></div>', '<button type="button" class="zoom-out btn-icon">', '<svg role="presentation" aria-hidden="true" focusable="false" class="icon">', '<use xlink:href="#icon-zoom-out"></use>', '</svg>', '</button>', '<button type="button" class="zoom-in btn-icon">', '<svg role="presentation" aria-hidden="true" focusable="false" class="icon">', '<use xlink:href="#icon-zoom-in"></use>', '</svg>', '</button>', '<button type="button" class="next-button btn-icon">', '<svg role="presentation" aria-hidden="true" focusable="false" class="icon">', '<use xlink:href="#icon-next-page"></use>', '</svg>', '</button>', '<button type="button" class="last-page-button btn-icon">', '<svg role="presentation" aria-hidden="true" focusable="false" class="icon">', '<use xlink:href="#icon-last-page"></use>', '</svg>', '</button>', '</div>', '<div style="overflow:auto; min-height:100%;">', // min-height to fix iOS <= 9 issues with scroll
    '<canvas id="pdfViewer">', '</canvas>', '</div>']),
    attachmentViewImageTemplate: new Simplate(['<div class="attachment-viewer-label" style="white-space:nowrap;">', '<label>{%= $.description + " (" + $.fileType + ")"  %}</label>', '</div>', '<div class="attachment-viewer-area">', '<table>', '<tr valign="middle">', '<td id="imagePlaceholder" align="center">', '</td>', '</tr>', '</table>', '</div>']),
    attachmentViewNotSupportedTemplate: new Simplate(['<div class="attachment-viewer-label">', '<label>{%= $$.attachmentNotSupportedText %}</label>', '</div>', '<div class="attachment-viewer-not-supported">', '<p class="listview-heading"><span>{%: $.description %}&nbsp;</span></p>', '<p class="micro-text"><span>({%: crm.Format.date($.attachDate, (App.is24HourClock()) ? $$.attachmentDateFormatText24 : $$.attachmentDateFormatText) %})&nbsp;</span>', '<span>{%: crm.Format.fileSize($.fileSize) %} </span></p>', '<p class="micro-text"><span>{%: crm.Utility.getFileExtension($.fileName) %} </span></p>', '{% if($.user) { %}', '<p class="micro-text"><span>{%: $.user.$descriptor  %}</span></p>', '{% } %}', '</div>']),

    downloadingTemplate: new Simplate(['<li class="list-loading-indicator"><div>{%= $.downloadingText %}</div></li>']),
    onTransitionTo: function onTransitionTo() {
      var _this = this;

      if (this._orientationHandle) {
        return;
      }
      var _renderFn = _Utility2.default.debounce(function () {
        if (_this.pdfDoc && !_this.pdfIsLoading) {
          _this.pdfScale = 1;
          _this.renderPdfPage(_this.pdfCurrentPage);
        }
      }, this.RENDER_DELAY);
      this._orientationHandle = _connect2.default.subscribe('/app/setOrientation', this, _renderFn);
      $(window).on('resize.attachment', _renderFn);
      $(window).on('applicationmenuclose.attachment', _renderFn);
      $(window).on('applicationmenuopen.attachment', _renderFn);
    },
    onTransitionAway: function onTransitionAway() {
      $(window).off('resize.attachment');
      $(window).off('applicationmenuclose.attachment');
      $(window).off('applicationmenuopen.attachment');
      _connect2.default.unsubscribe(this._orientationHandle);
      this._orientationHandle = null;
    },
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
      var request = this.inherited(arguments);
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

      var box = _domGeometry2.default.getMarginBox(this.domNode);
      this.pdfDoc.getPage(pageNumber).then(function (page) {
        var scale = _this2.pdfScale;
        var viewport = page.getViewport(scale);
        var canvas = document.getElementById('pdfViewer');
        var context = canvas.getContext('2d');
        var desiredWidth = box.w;
        viewport = page.getViewport(desiredWidth / viewport.width);
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
          var message = 'Failed to render page ' + pageNumber + ' for PDF "' + fileName + '".';
          console.error(message, reason); // eslint-disable-line
          _ErrorManager2.default.addSimpleError(message, reason);
        });
      });
    },
    updatePageStats: function updatePageStats() {
      if (!this.pdfDoc) {
        return;
      }

      var node = $('.page-stats', this.attachmentViewerNode).first();
      node.text(this.pdfCurrentPage + ' / ' + this.pdfTotalPages);
    },
    loadPdfDocument: function loadPdfDocument(responseInfo) {
      var _this3 = this;

      if (this.pdfDoc !== null) {
        this.pdfDoc.destroy();
        this.pdfDoc = null;
      }

      var dataResponse = _Utility2.default.base64ArrayBuffer(responseInfo.response);
      var task = window.pdfjsLib.getDocument({ data: atob(dataResponse) });
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
        var message = 'The PDF "' + fileName + '" failed to load.';
        console.error(message, reason); // eslint-disable-line
        _ErrorManager2.default.addSimpleError(message, reason);
      });
    },
    _loadAttachmentView: function _loadAttachmentView(entry) {
      var _this4 = this;

      var am = new _AttachmentManager2.default();
      var description = void 0;
      var isFile = void 0;
      var fileType = void 0;
      var loaded = void 0;

      if (!entry.url) {
        description = entry.description;
        fileType = _Utility2.default.getFileExtension(entry.fileName);
        isFile = true;
      } else {
        isFile = false;
        description = entry.description + ' (' + entry.url + ')';
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
        fileType = _Utility2.default.getFileExtension(entry.fileName);
        if (this._isfileTypeAllowed(fileType)) {
          if (this._isfileTypeImage(fileType)) {
            $(this.attachmentViewerNode).append(this.attachmentViewImageTemplate.apply(data, this));
            var tpl = $(this.downloadingTemplate.apply(this));
            $(this.attachmentViewerNode).prepend(tpl);
            $(this.domNode).addClass('list-loading');
            var self = this;
            var attachmentid = entry.$key;
            // dataurl
            am.getAttachmentFile(attachmentid, 'arraybuffer', function (responseInfo) {
              var rData = _Utility2.default.base64ArrayBuffer(responseInfo.response);
              self.dataURL = 'data:' + responseInfo.contentType + ';base64,' + rData;

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
              }

              // Set download text to hidden
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
                var rData = _Utility2.default.base64ArrayBuffer(responseInfo.response);
                var dataUrl = 'data:' + responseInfo.contentType + ';base64,' + rData;
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
      var imageTypes = void 0;

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
      var fileTypes = void 0;

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

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9BdHRhY2htZW50L1ZpZXdBdHRhY2htZW50LmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiZHRGb3JtYXRSZXNvdXJjZSIsIl9fY2xhc3MiLCJkZXRhaWxzVGV4dCIsImRlc2NyaXB0aW9uVGV4dCIsImZpbGVOYW1lVGV4dCIsImF0dGFjaERhdGVUZXh0IiwiZmlsZVNpemVUZXh0IiwidXNlclRleHQiLCJhdHRhY2htZW50Tm90U3VwcG9ydGVkVGV4dCIsImF0dGFjaG1lbnREYXRlRm9ybWF0VGV4dCIsImF0dGFjaG1lbnREYXRlRm9ybWF0VGV4dDI0IiwiZG93bmxvYWRpbmdUZXh0Iiwibm90U3VwcG9ydGVkVGV4dCIsImlkIiwiZWRpdFZpZXciLCJzZWN1cml0eSIsImlzVGFiYmVkIiwicXVlcnlTZWxlY3QiLCJyZXNvdXJjZUtpbmQiLCJjb250cmFjdE5hbWUiLCJvcmdpbmFsSW1hZ2VTaXplIiwid2lkdGgiLCJoZWlnaHQiLCJxdWVyeUluY2x1ZGUiLCJkYXRhVVJMIiwicGRmRG9jIiwicGRmVG90YWxQYWdlcyIsInBkZkN1cnJlbnRQYWdlIiwicGRmSXNMb2FkaW5nIiwicGRmU2NhbGUiLCJSRU5ERVJfREVMQVkiLCJub3RTdXBwb3J0ZWRUZW1wbGF0ZSIsIlNpbXBsYXRlIiwid2lkZ2V0VGVtcGxhdGUiLCJhdHRhY2htZW50TG9hZGluZ1RlbXBsYXRlIiwiYXR0YWNobWVudFZpZXdUZW1wbGF0ZSIsInBkZlZpZXdUZW1wbGF0ZSIsImF0dGFjaG1lbnRWaWV3SW1hZ2VUZW1wbGF0ZSIsImF0dGFjaG1lbnRWaWV3Tm90U3VwcG9ydGVkVGVtcGxhdGUiLCJkb3dubG9hZGluZ1RlbXBsYXRlIiwib25UcmFuc2l0aW9uVG8iLCJfb3JpZW50YXRpb25IYW5kbGUiLCJfcmVuZGVyRm4iLCJkZWJvdW5jZSIsInJlbmRlclBkZlBhZ2UiLCJzdWJzY3JpYmUiLCIkIiwid2luZG93Iiwib24iLCJvblRyYW5zaXRpb25Bd2F5Iiwib2ZmIiwidW5zdWJzY3JpYmUiLCJzaG93Iiwib3B0aW9ucyIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImF0dGFjaG1lbnRWaWV3ZXJOb2RlIiwiaW5uZXJIVE1MIiwiQXBwIiwic3VwcG9ydHNGaWxlQVBJIiwiZG9tTm9kZSIsImVtcHR5IiwiYXBwZW5kIiwiYXBwbHkiLCJlbnRyeSIsImtleSIsIiRrZXkiLCJfbG9hZEF0dGFjaG1lbnRWaWV3IiwicHJvY2Vzc0VudHJ5IiwiY3JlYXRlUmVxdWVzdCIsInJlcXVlc3QiLCJzZXRRdWVyeUFyZyIsImNyZWF0ZUVudHJ5Rm9yRGVsZXRlIiwiZSIsIiRldGFnIiwiJG5hbWUiLCJjcmVhdGVUb29sTGF5b3V0IiwidG9vbHMiLCJjcmVhdGVMYXlvdXQiLCJzZXRTcmMiLCJpZnJhbWUiLCJ1cmwiLCJhdHRyIiwib25GaXJzdFBhZ2VDbGljayIsIm9uUHJldkNsaWNrIiwib25OZXh0Q2xpY2siLCJvbkxhc3RQYWdlQ2xpY2siLCJvblpvb21PdXRDbGljayIsIm9uWm9vbUluQ2xpY2siLCJwYWdlTnVtYmVyIiwibnVtUGFnZXMiLCJib3giLCJnZXRNYXJnaW5Cb3giLCJnZXRQYWdlIiwidGhlbiIsInBhZ2UiLCJzY2FsZSIsInZpZXdwb3J0IiwiZ2V0Vmlld3BvcnQiLCJjYW52YXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY29udGV4dCIsImdldENvbnRleHQiLCJkZXNpcmVkV2lkdGgiLCJ3IiwiaCIsInJlbmRlckNvbnRleHQiLCJjYW52YXNDb250ZXh0IiwicmVuZGVyVGFzayIsInJlbmRlciIsInByb21pc2UiLCJ1cGRhdGVQYWdlU3RhdHMiLCJyZWFzb24iLCJmaWxlTmFtZSIsIm1lc3NhZ2UiLCJjb25zb2xlIiwiZXJyb3IiLCJhZGRTaW1wbGVFcnJvciIsIm5vZGUiLCJmaXJzdCIsInRleHQiLCJsb2FkUGRmRG9jdW1lbnQiLCJyZXNwb25zZUluZm8iLCJkZXN0cm95IiwiZGF0YVJlc3BvbnNlIiwiYmFzZTY0QXJyYXlCdWZmZXIiLCJyZXNwb25zZSIsInRhc2siLCJwZGZqc0xpYiIsImdldERvY3VtZW50IiwiZGF0YSIsImF0b2IiLCJwZGYiLCJhbSIsImRlc2NyaXB0aW9uIiwiaXNGaWxlIiwiZmlsZVR5cGUiLCJsb2FkZWQiLCJnZXRGaWxlRXh0ZW5zaW9uIiwiZmlsZVNpemUiLCJfaXNmaWxlVHlwZUFsbG93ZWQiLCJfaXNmaWxlVHlwZUltYWdlIiwidHBsIiwicHJlcGVuZCIsImFkZENsYXNzIiwic2VsZiIsImF0dGFjaG1lbnRpZCIsImdldEF0dGFjaG1lbnRGaWxlIiwickRhdGEiLCJjb250ZW50VHlwZSIsImltYWdlIiwiSW1hZ2UiLCJsb2FkSGFuZGxlciIsIl9vcmdpbmFsSW1hZ2VTaXplIiwiX3NpemVJbWFnZSIsIm9ubG9hZCIsInNyYyIsImNvbXBsZXRlIiwiYmluZCIsImRhdGFVcmwiLCJpZnJhbWVPbkxvYWQiLCJnZXRBdHRhY2htZW50dXJsQnlFbnRpdHkiLCJmVHlwZSIsInN1YnN0ciIsImxhc3RJbmRleE9mIiwidG9Mb3dlckNhc2UiLCJpbWFnZVR5cGVzIiwiaW1hZ2VGaWxlVHlwZXMiLCJqcGciLCJnaWYiLCJwbmciLCJibXAiLCJ0aWYiLCJmaWxlVHlwZXMiLCJub25WaWV3YWJsZUZpbGVUeXBlcyIsImV4ZSIsImRsbCIsIl92aWV3SW1hZ2VPbmx5IiwiY29udGFpbmVyTm9kZSIsImNvbnRlbnRCb3giLCJwYXJlbnQiLCJpSCIsImlXIiwid0giLCJ3VyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsTUFBTUEsV0FBVyxvQkFBWSxnQkFBWixDQUFqQjtBQUNBLE1BQU1DLG1CQUFtQixvQkFBWSw4QkFBWixDQUF6Qjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQSxNQUFNQyxVQUFVLHVCQUFRLHFDQUFSLEVBQStDLG9EQUEvQyxFQUFrRjtBQUNoRztBQUNBQyxpQkFBYUgsU0FBU0csV0FGMEU7QUFHaEdDLHFCQUFpQkosU0FBU0ks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YUFBSyxHQUFMO0FBQ0Q7O0FBRUQ7QUFDQSxVQUFJRixLQUFLRSxFQUFMLElBQVdILEtBQUtFLEVBQXBCLEVBQXdCO0FBQ3RCO0FBQ0EsWUFBSUEsS0FBS0MsRUFBVCxFQUFhO0FBQ1h6RixrQkFBUSxJQUFLLENBQUNzRixLQUFLRSxFQUFOLElBQVlGLEVBQXpCO0FBQ0QsU0FGRCxNQUVPO0FBQUU7QUFDUHRGLGtCQUFRLElBQUssQ0FBQ3VGLEtBQUtFLEVBQU4sSUFBWUYsRUFBekI7QUFDRDtBQUNGLE9BUEQsTUFPTyxJQUFJQSxLQUFLRSxFQUFULEVBQWE7QUFBRTtBQUNwQnpGLGdCQUFRLElBQUssQ0FBQ3VGLEtBQUtFLEVBQU4sSUFBWUYsRUFBekI7QUFDRCxPQUZNLE1BRUEsSUFBSUQsS0FBS0UsRUFBVCxFQUFhO0FBQUU7QUFDcEJ4RixnQkFBUSxJQUFLLENBQUNzRixLQUFLRSxFQUFOLElBQVlGLEVBQXpCO0FBQ0QsT0FGTSxNQUVBO0FBQ0w7QUFDQSxZQUFJRSxLQUFLRixFQUFMLEdBQVVHLEtBQUtGLEVBQW5CLEVBQXVCO0FBQ3JCdkYsa0JBQVEsSUFBSyxDQUFDd0YsS0FBS0YsRUFBTixJQUFZRSxFQUF6QjtBQUNELFNBRkQsTUFFTztBQUNMeEYsa0JBQVEsSUFBSyxDQUFDeUYsS0FBS0YsRUFBTixJQUFZRSxFQUF6QjtBQUNEO0FBQ0Y7QUFDRGxDLFlBQU1qSSxNQUFOLEdBQWUsT0FBTzBFLEtBQVAsR0FBZXNGLEVBQTlCO0FBQ0EvQixZQUFNbEksS0FBTixHQUFjLE9BQU8yRSxLQUFQLEdBQWV1RixFQUE3QjtBQUNEO0FBOWYrRixHQUFsRixDQUFoQjs7b0JBaWdCZXRMLE8iLCJmaWxlIjoiVmlld0F0dGFjaG1lbnQuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgZG9tR2VvIGZyb20gJ2Rvam8vZG9tLWdlb21ldHJ5JztcclxuaW1wb3J0IGNvbm5lY3QgZnJvbSAnZG9qby9fYmFzZS9jb25uZWN0JztcclxuaW1wb3J0IEF0dGFjaG1lbnRNYW5hZ2VyIGZyb20gJy4uLy4uL0F0dGFjaG1lbnRNYW5hZ2VyJztcclxuaW1wb3J0IFV0aWxpdHkgZnJvbSAnLi4vLi4vVXRpbGl0eSc7XHJcbmltcG9ydCBoYXMgZnJvbSAnZG9qby9oYXMnO1xyXG5pbXBvcnQgRGV0YWlsIGZyb20gJ2FyZ29zL0RldGFpbCc7XHJcbmltcG9ydCBfTGVnYWN5U0RhdGFEZXRhaWxNaXhpbiBmcm9tICdhcmdvcy9fTGVnYWN5U0RhdGFEZXRhaWxNaXhpbic7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuaW1wb3J0IEVycm9yTWFuYWdlciBmcm9tICdhcmdvcy9FcnJvck1hbmFnZXInO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYXR0YWNobWVudFZpZXcnKTtcclxuY29uc3QgZHRGb3JtYXRSZXNvdXJjZSA9IGdldFJlc291cmNlKCdhdHRhY2htZW50Vmlld0RhdGVUaW1lRm9ybWF0Jyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5BdHRhY2htZW50LlZpZXdBdHRhY2htZW50XHJcbiAqXHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkRldGFpbFxyXG4gKiBAbWl4aW5zIGFyZ29zLkRldGFpbFxyXG4gKiBAbWl4aW5zIGFyZ29zLl9MZWdhY3lTRGF0YURldGFpbE1peGluXHJcbiAqXHJcbiAqIEByZXF1aXJlcyBhcmdvcy5EZXRhaWxcclxuICogQHJlcXVpcmVzIGFyZ29zLl9MZWdhY3lTRGF0YURldGFpbE1peGluXHJcbiAqXHJcbiAqIEByZXF1aXJlcyBjcm0uRm9ybWF0XHJcbiAqIEByZXF1aXJlcyBjcm0uQXR0YWNobWVudE1hbmFnZXJcclxuICogQHJlcXVpcmVzIGNybS5VdGlsaXR5XHJcbiAqXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLkF0dGFjaG1lbnQuVmlld0F0dGFjaG1lbnQnLCBbRGV0YWlsLCBfTGVnYWN5U0RhdGFEZXRhaWxNaXhpbl0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICBkZXRhaWxzVGV4dDogcmVzb3VyY2UuZGV0YWlsc1RleHQsXHJcbiAgZGVzY3JpcHRpb25UZXh0OiByZXNvdXJjZS5kZXNjcmlwdGlvblRleHQsXHJcbiAgZmlsZU5hbWVUZXh0OiByZXNvdXJjZS5maWxlTmFtZVRleHQsXHJcbiAgYXR0YWNoRGF0ZVRleHQ6IHJlc291cmNlLmF0dGFjaERhdGVUZXh0LFxyXG4gIGZpbGVTaXplVGV4dDogcmVzb3VyY2UuZmlsZVNpemVUZXh0LFxyXG4gIHVzZXJUZXh0OiByZXNvdXJjZS51c2VyVGV4dCxcclxuICBhdHRhY2htZW50Tm90U3VwcG9ydGVkVGV4dDogcmVzb3VyY2UuYXR0YWNobWVudE5vdFN1cHBvcnRlZFRleHQsXHJcbiAgYXR0YWNobWVudERhdGVGb3JtYXRUZXh0OiBkdEZvcm1hdFJlc291cmNlLmF0dGFjaG1lbnREYXRlRm9ybWF0VGV4dCxcclxuICBhdHRhY2htZW50RGF0ZUZvcm1hdFRleHQyNDogZHRGb3JtYXRSZXNvdXJjZS5hdHRhY2htZW50RGF0ZUZvcm1hdFRleHQyNCxcclxuICBkb3dubG9hZGluZ1RleHQ6IHJlc291cmNlLmRvd25sb2FkaW5nVGV4dCxcclxuICBub3RTdXBwb3J0ZWRUZXh0OiByZXNvdXJjZS5ub3RTdXBwb3J0ZWRUZXh0LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ3ZpZXdfYXR0YWNobWVudCcsXHJcbiAgZWRpdFZpZXc6ICcnLFxyXG4gIHNlY3VyaXR5OiBudWxsLFxyXG4gIGlzVGFiYmVkOiBmYWxzZSxcclxuICBxdWVyeVNlbGVjdDogWydkZXNjcmlwdGlvbicsICd1c2VyJywgJ2F0dGFjaERhdGUnLCAnZmlsZVNpemUnLCAnZmlsZU5hbWUnLCAndXJsJywgJ2ZpbGVFeGlzdHMnLCAncmVtb3RlU3RhdHVzJywgJ2RhdGFUeXBlJ10sXHJcbiAgcmVzb3VyY2VLaW5kOiAnYXR0YWNobWVudHMnLFxyXG4gIGNvbnRyYWN0TmFtZTogJ3N5c3RlbScsXHJcbiAgb3JnaW5hbEltYWdlU2l6ZToge1xyXG4gICAgd2lkdGg6IDAsXHJcbiAgICBoZWlnaHQ6IDAsXHJcbiAgfSxcclxuICBxdWVyeUluY2x1ZGU6IFsnJGRlc2NyaXB0b3JzJ10sXHJcbiAgZGF0YVVSTDogbnVsbCxcclxuICBwZGZEb2M6IG51bGwsXHJcbiAgcGRmVG90YWxQYWdlczogMCxcclxuICBwZGZDdXJyZW50UGFnZTogMCxcclxuICBwZGZJc0xvYWRpbmc6IGZhbHNlLFxyXG4gIHBkZlNjYWxlOiAxLFxyXG4gIFJFTkRFUl9ERUxBWTogaGFzKCdpb3MnKSA8IDggPyA1MDAgOiAxNiB8fCA1MDAsIC8vIFdvcmsgYXJvdW5kIElPUzcgb3JpZW50YXRpb24gY2hhbmdlIGlzc3Vlc1xyXG4gIG5vdFN1cHBvcnRlZFRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxoMj57JT0gJCQubm90U3VwcG9ydGVkVGV4dCAlfTwvaDI+JyxcclxuICBdKSxcclxuICB3aWRnZXRUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGlkPVwieyU9ICQuaWQgJX1cIiBkYXRhLXRpdGxlPVwieyU9ICQudGl0bGVUZXh0ICV9XCIgY2xhc3M9XCJvdmVydGhyb3cgZGV0YWlsIHBhbmVsIHslPSAkLmNscyAlfVwiIHslIGlmICgkLnJlc291cmNlS2luZCkgeyAlfWRhdGEtcmVzb3VyY2Uta2luZD1cInslPSAkLnJlc291cmNlS2luZCAlfVwieyUgfSAlfT4nLFxyXG4gICAgJ3slISAkLmxvYWRpbmdUZW1wbGF0ZSAlfScsXHJcbiAgICAnPGRpdiBjbGFzcz1cInBhbmVsLWNvbnRlbnRcIiBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwiY29udGVudE5vZGVcIj48L2Rpdj4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJhdHRhY2htZW50LXZpZXdlci1jb250ZW50XCIgZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cImF0dGFjaG1lbnRWaWV3ZXJOb2RlXCI+PC9kaXY+JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gIF0pLFxyXG4gIGF0dGFjaG1lbnRMb2FkaW5nVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGRpdiBjbGFzcz1cImxpc3QtbG9hZGluZy1pbmRpY2F0b3JcIj57JT0gJC5sb2FkaW5nVGV4dCAlfTwvZGl2PicsXHJcbiAgXSksXHJcbiAgYXR0YWNobWVudFZpZXdUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGNsYXNzPVwiYXR0YWNobWVudC12aWV3ZXItbGFiZWxcIiBzdHlsZT1cIndoaXRlLXNwYWNlOm5vd3JhcDtcIj4nLFxyXG4gICAgJzxsYWJlbD57JT0gJC5kZXNjcmlwdGlvbiArIFwiIChcIiArICQuZmlsZVR5cGUgKyBcIilcIiAgJX08L2xhYmVsPicsXHJcbiAgICAnPC9kaXY+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwiYXR0YWNobWVudC12aWV3ZXItYXJlYVwiPicsXHJcbiAgICAnPGlmcmFtZSBpZD1cImF0dGFjaG1lbnQtSWZyYW1lXCIgc3JjPVwieyU9ICQudXJsICV9XCI+PC9pZnJhbWU+JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gIF0pLFxyXG4gIHBkZlZpZXdUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGNsYXNzPVwicGRmLWNvbnRyb2xzXCI+JyxcclxuICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImZpcnN0LXBhZ2UtYnV0dG9uIGJ0bi1pY29uXCI+JyxcclxuICAgICc8c3ZnIHJvbGU9XCJwcmVzZW50YXRpb25cIiBhcmlhLWhpZGRlbj1cInRydWVcIiBmb2N1c2FibGU9XCJmYWxzZVwiIGNsYXNzPVwiaWNvblwiPicsXHJcbiAgICAnPHVzZSB4bGluazpocmVmPVwiI2ljb24tZmlyc3QtcGFnZVwiPjwvdXNlPicsXHJcbiAgICAnPC9zdmc+JyxcclxuICAgICc8L2J1dHRvbj4nLFxyXG4gICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwicHJldi1idXR0b24gYnRuLWljb25cIj4nLFxyXG4gICAgJzxzdmcgcm9sZT1cInByZXNlbnRhdGlvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGZvY3VzYWJsZT1cImZhbHNlXCIgY2xhc3M9XCJpY29uXCI+JyxcclxuICAgICc8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1wcmV2aW91cy1wYWdlXCI+PC91c2U+JyxcclxuICAgICc8L3N2Zz4nLFxyXG4gICAgJzwvYnV0dG9uPicsXHJcbiAgICAnPGRpdiBjbGFzcz1cInBhZ2Utc3RhdHNcIj48L2Rpdj4nLFxyXG4gICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiem9vbS1vdXQgYnRuLWljb25cIj4nLFxyXG4gICAgJzxzdmcgcm9sZT1cInByZXNlbnRhdGlvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGZvY3VzYWJsZT1cImZhbHNlXCIgY2xhc3M9XCJpY29uXCI+JyxcclxuICAgICc8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi16b29tLW91dFwiPjwvdXNlPicsXHJcbiAgICAnPC9zdmc+JyxcclxuICAgICc8L2J1dHRvbj4nLFxyXG4gICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiem9vbS1pbiBidG4taWNvblwiPicsXHJcbiAgICAnPHN2ZyByb2xlPVwicHJlc2VudGF0aW9uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgZm9jdXNhYmxlPVwiZmFsc2VcIiBjbGFzcz1cImljb25cIj4nLFxyXG4gICAgJzx1c2UgeGxpbms6aHJlZj1cIiNpY29uLXpvb20taW5cIj48L3VzZT4nLFxyXG4gICAgJzwvc3ZnPicsXHJcbiAgICAnPC9idXR0b24+JyxcclxuICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIm5leHQtYnV0dG9uIGJ0bi1pY29uXCI+JyxcclxuICAgICc8c3ZnIHJvbGU9XCJwcmVzZW50YXRpb25cIiBhcmlhLWhpZGRlbj1cInRydWVcIiBmb2N1c2FibGU9XCJmYWxzZVwiIGNsYXNzPVwiaWNvblwiPicsXHJcbiAgICAnPHVzZSB4bGluazpocmVmPVwiI2ljb24tbmV4dC1wYWdlXCI+PC91c2U+JyxcclxuICAgICc8L3N2Zz4nLFxyXG4gICAgJzwvYnV0dG9uPicsXHJcbiAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJsYXN0LXBhZ2UtYnV0dG9uIGJ0bi1pY29uXCI+JyxcclxuICAgICc8c3ZnIHJvbGU9XCJwcmVzZW50YXRpb25cIiBhcmlhLWhpZGRlbj1cInRydWVcIiBmb2N1c2FibGU9XCJmYWxzZVwiIGNsYXNzPVwiaWNvblwiPicsXHJcbiAgICAnPHVzZSB4bGluazpocmVmPVwiI2ljb24tbGFzdC1wYWdlXCI+PC91c2U+JyxcclxuICAgICc8L3N2Zz4nLFxyXG4gICAgJzwvYnV0dG9uPicsXHJcbiAgICAnPC9kaXY+JyxcclxuICAgICc8ZGl2IHN0eWxlPVwib3ZlcmZsb3c6YXV0bzsgbWluLWhlaWdodDoxMDAlO1wiPicsIC8vIG1pbi1oZWlnaHQgdG8gZml4IGlPUyA8PSA5IGlzc3VlcyB3aXRoIHNjcm9sbFxyXG4gICAgJzxjYW52YXMgaWQ9XCJwZGZWaWV3ZXJcIj4nLFxyXG4gICAgJzwvY2FudmFzPicsXHJcbiAgICAnPC9kaXY+JyxcclxuICBdKSxcclxuICBhdHRhY2htZW50Vmlld0ltYWdlVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGRpdiBjbGFzcz1cImF0dGFjaG1lbnQtdmlld2VyLWxhYmVsXCIgc3R5bGU9XCJ3aGl0ZS1zcGFjZTpub3dyYXA7XCI+JyxcclxuICAgICc8bGFiZWw+eyU9ICQuZGVzY3JpcHRpb24gKyBcIiAoXCIgKyAkLmZpbGVUeXBlICsgXCIpXCIgICV9PC9sYWJlbD4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgICAnPGRpdiBjbGFzcz1cImF0dGFjaG1lbnQtdmlld2VyLWFyZWFcIj4nLFxyXG4gICAgJzx0YWJsZT4nLFxyXG4gICAgJzx0ciB2YWxpZ249XCJtaWRkbGVcIj4nLFxyXG4gICAgJzx0ZCBpZD1cImltYWdlUGxhY2Vob2xkZXJcIiBhbGlnbj1cImNlbnRlclwiPicsXHJcbiAgICAnPC90ZD4nLFxyXG4gICAgJzwvdHI+JyxcclxuICAgICc8L3RhYmxlPicsXHJcbiAgICAnPC9kaXY+JyxcclxuICBdKSxcclxuICBhdHRhY2htZW50Vmlld05vdFN1cHBvcnRlZFRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxkaXYgY2xhc3M9XCJhdHRhY2htZW50LXZpZXdlci1sYWJlbFwiPicsXHJcbiAgICAnPGxhYmVsPnslPSAkJC5hdHRhY2htZW50Tm90U3VwcG9ydGVkVGV4dCAlfTwvbGFiZWw+JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJhdHRhY2htZW50LXZpZXdlci1ub3Qtc3VwcG9ydGVkXCI+JyxcclxuICAgICc8cCBjbGFzcz1cImxpc3R2aWV3LWhlYWRpbmdcIj48c3Bhbj57JTogJC5kZXNjcmlwdGlvbiAlfSZuYnNwOzwvc3Bhbj48L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj48c3Bhbj4oeyU6IGNybS5Gb3JtYXQuZGF0ZSgkLmF0dGFjaERhdGUsIChBcHAuaXMyNEhvdXJDbG9jaygpKSA/ICQkLmF0dGFjaG1lbnREYXRlRm9ybWF0VGV4dDI0IDogJCQuYXR0YWNobWVudERhdGVGb3JtYXRUZXh0KSAlfSkmbmJzcDs8L3NwYW4+JyxcclxuICAgICc8c3Bhbj57JTogY3JtLkZvcm1hdC5maWxlU2l6ZSgkLmZpbGVTaXplKSAlfSA8L3NwYW4+PC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+PHNwYW4+eyU6IGNybS5VdGlsaXR5LmdldEZpbGVFeHRlbnNpb24oJC5maWxlTmFtZSkgJX0gPC9zcGFuPjwvcD4nLFxyXG4gICAgJ3slIGlmKCQudXNlcikgeyAlfScsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+PHNwYW4+eyU6ICQudXNlci4kZGVzY3JpcHRvciAgJX08L3NwYW4+PC9wPicsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgICAnPC9kaXY+JyxcclxuICBdKSxcclxuXHJcbiAgZG93bmxvYWRpbmdUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8bGkgY2xhc3M9XCJsaXN0LWxvYWRpbmctaW5kaWNhdG9yXCI+PGRpdj57JT0gJC5kb3dubG9hZGluZ1RleHQgJX08L2Rpdj48L2xpPicsXHJcbiAgXSksXHJcbiAgb25UcmFuc2l0aW9uVG86IGZ1bmN0aW9uIG9uVHJhbnNpdGlvblRvKCkge1xyXG4gICAgaWYgKHRoaXMuX29yaWVudGF0aW9uSGFuZGxlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IF9yZW5kZXJGbiA9IFV0aWxpdHkuZGVib3VuY2UoKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5wZGZEb2MgJiYgIXRoaXMucGRmSXNMb2FkaW5nKSB7XHJcbiAgICAgICAgdGhpcy5wZGZTY2FsZSA9IDE7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJQZGZQYWdlKHRoaXMucGRmQ3VycmVudFBhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9LCB0aGlzLlJFTkRFUl9ERUxBWSk7XHJcbiAgICB0aGlzLl9vcmllbnRhdGlvbkhhbmRsZSA9IGNvbm5lY3Quc3Vic2NyaWJlKCcvYXBwL3NldE9yaWVudGF0aW9uJywgdGhpcywgX3JlbmRlckZuKTtcclxuICAgICQod2luZG93KS5vbigncmVzaXplLmF0dGFjaG1lbnQnLCBfcmVuZGVyRm4pO1xyXG4gICAgJCh3aW5kb3cpLm9uKCdhcHBsaWNhdGlvbm1lbnVjbG9zZS5hdHRhY2htZW50JywgX3JlbmRlckZuKTtcclxuICAgICQod2luZG93KS5vbignYXBwbGljYXRpb25tZW51b3Blbi5hdHRhY2htZW50JywgX3JlbmRlckZuKTtcclxuICB9LFxyXG4gIG9uVHJhbnNpdGlvbkF3YXk6IGZ1bmN0aW9uIG9uVHJhbnNpdGlvbkF3YXkoKSB7XHJcbiAgICAkKHdpbmRvdykub2ZmKCdyZXNpemUuYXR0YWNobWVudCcpO1xyXG4gICAgJCh3aW5kb3cpLm9mZignYXBwbGljYXRpb25tZW51Y2xvc2UuYXR0YWNobWVudCcpO1xyXG4gICAgJCh3aW5kb3cpLm9mZignYXBwbGljYXRpb25tZW51b3Blbi5hdHRhY2htZW50Jyk7XHJcbiAgICBjb25uZWN0LnVuc3Vic2NyaWJlKHRoaXMuX29yaWVudGF0aW9uSGFuZGxlKTtcclxuICAgIHRoaXMuX29yaWVudGF0aW9uSGFuZGxlID0gbnVsbDtcclxuICB9LFxyXG4gIHNob3c6IGZ1bmN0aW9uIHNob3cob3B0aW9ucykge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICAgIHRoaXMuYXR0YWNobWVudFZpZXdlck5vZGUuaW5uZXJIVE1MID0gJyc7XHJcbiAgICBpZiAoIUFwcC5zdXBwb3J0c0ZpbGVBUEkoKSkge1xyXG4gICAgICAkKHRoaXMuZG9tTm9kZSkuZW1wdHkoKS5hcHBlbmQodGhpcy5ub3RTdXBwb3J0ZWRUZW1wbGF0ZS5hcHBseSh7fSwgdGhpcykpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSWYgdGhpcyBvcGVuZWQgdGhlIHNlY29uZCB0aW1lIHdlIG5lZWQgdG8gY2hlY2sgdG8gc2VlIGlmIGl0IGlzIHRoZSBzYW1lIGF0dGFjaG1uZW50IGFuZCBsZXQgdGhlIFByb2Nlc3MgRW50cnkgZnVuY3Rpb24gbG9hZCB0aGUgdmlldy5cclxuICAgIGlmICh0aGlzLmVudHJ5KSB7XHJcbiAgICAgIGlmIChvcHRpb25zLmtleSA9PT0gdGhpcy5lbnRyeS4ka2V5KSB7XHJcbiAgICAgICAgdGhpcy5fbG9hZEF0dGFjaG1lbnRWaWV3KHRoaXMuZW50cnkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBwcm9jZXNzRW50cnk6IGZ1bmN0aW9uIHByb2Nlc3NFbnRyeShlbnRyeSkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICAgIHRoaXMuX2xvYWRBdHRhY2htZW50VmlldyhlbnRyeSk7XHJcbiAgfSxcclxuICBjcmVhdGVSZXF1ZXN0OiBmdW5jdGlvbiBjcmVhdGVSZXF1ZXN0KCkge1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICByZXF1ZXN0LnNldFF1ZXJ5QXJnKCdfaW5jbHVkZUZpbGUnLCAnZmFsc2UnKTtcclxuICAgIHJldHVybiByZXF1ZXN0O1xyXG4gIH0sXHJcbiAgY3JlYXRlRW50cnlGb3JEZWxldGU6IGZ1bmN0aW9uIGNyZWF0ZUVudHJ5Rm9yRGVsZXRlKGUpIHtcclxuICAgIGNvbnN0IGVudHJ5ID0ge1xyXG4gICAgICAka2V5OiBlLiRrZXksXHJcbiAgICAgICRldGFnOiBlLiRldGFnLFxyXG4gICAgICAkbmFtZTogZS4kbmFtZSxcclxuICAgIH07XHJcbiAgICByZXR1cm4gZW50cnk7XHJcbiAgfSxcclxuICBjcmVhdGVUb29sTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVUb29sTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudG9vbHM7XHJcbiAgfSxcclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLnRvb2xzIHx8ICh0aGlzLnRvb2xzID0gW10pO1xyXG4gIH0sXHJcbiAgc2V0U3JjOiBmdW5jdGlvbiBzZXRTcmMoaWZyYW1lLCB1cmwpIHtcclxuICAgICQoaWZyYW1lKS5hdHRyKCdzcmMnLCB1cmwpO1xyXG4gIH0sXHJcbiAgb25GaXJzdFBhZ2VDbGljazogZnVuY3Rpb24gb25GaXJzdFBhZ2VDbGljaygpIHtcclxuICAgIGlmICh0aGlzLnBkZklzTG9hZGluZykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZW5kZXJQZGZQYWdlKDEpO1xyXG4gIH0sXHJcbiAgb25QcmV2Q2xpY2s6IGZ1bmN0aW9uIG9uUHJldkNsaWNrKCkge1xyXG4gICAgaWYgKHRoaXMucGRmSXNMb2FkaW5nKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlbmRlclBkZlBhZ2UodGhpcy5wZGZDdXJyZW50UGFnZSAtIDEpO1xyXG4gIH0sXHJcbiAgb25OZXh0Q2xpY2s6IGZ1bmN0aW9uIG9uTmV4dENsaWNrKCkge1xyXG4gICAgaWYgKHRoaXMucGRmSXNMb2FkaW5nKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlbmRlclBkZlBhZ2UodGhpcy5wZGZDdXJyZW50UGFnZSArIDEpO1xyXG4gIH0sXHJcbiAgb25MYXN0UGFnZUNsaWNrOiBmdW5jdGlvbiBvbkxhc3RQYWdlQ2xpY2soKSB7XHJcbiAgICBpZiAodGhpcy5wZGZJc0xvYWRpbmcpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyUGRmUGFnZSh0aGlzLnBkZlRvdGFsUGFnZXMpO1xyXG4gIH0sXHJcbiAgb25ab29tT3V0Q2xpY2s6IGZ1bmN0aW9uIG9uWm9vbU91dENsaWNrKCkge1xyXG4gICAgaWYgKHRoaXMucGRmSXNMb2FkaW5nIHx8IHRoaXMucGRmU2NhbGUgPj0gMS41KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMucGRmU2NhbGUgKz0gMC4yNTtcclxuICAgIHRoaXMucmVuZGVyUGRmUGFnZSh0aGlzLnBkZkN1cnJlbnRQYWdlKTtcclxuICB9LFxyXG4gIG9uWm9vbUluQ2xpY2s6IGZ1bmN0aW9uIG9uWm9vbUluQ2xpY2soKSB7XHJcbiAgICBpZiAodGhpcy5wZGZJc0xvYWRpbmcgfHwgdGhpcy5wZGZTY2FsZSA8PSAwLjI1KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMucGRmU2NhbGUgLT0gMC4yNTtcclxuICAgIHRoaXMucmVuZGVyUGRmUGFnZSh0aGlzLnBkZkN1cnJlbnRQYWdlKTtcclxuICB9LFxyXG4gIHJlbmRlclBkZlBhZ2U6IGZ1bmN0aW9uIHJlbmRlclBkZlBhZ2UocGFnZU51bWJlcikge1xyXG4gICAgaWYgKHBhZ2VOdW1iZXIgPCAxIHx8IHRoaXMucGRmRG9jID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocGFnZU51bWJlciA+IHRoaXMucGRmRG9jLm51bVBhZ2VzKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5wZGZJc0xvYWRpbmcpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJveCA9IGRvbUdlby5nZXRNYXJnaW5Cb3godGhpcy5kb21Ob2RlKTtcclxuICAgIHRoaXMucGRmRG9jLmdldFBhZ2UocGFnZU51bWJlcikudGhlbigocGFnZSkgPT4ge1xyXG4gICAgICBjb25zdCBzY2FsZSA9IHRoaXMucGRmU2NhbGU7XHJcbiAgICAgIGxldCB2aWV3cG9ydCA9IHBhZ2UuZ2V0Vmlld3BvcnQoc2NhbGUpO1xyXG4gICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGRmVmlld2VyJyk7XHJcbiAgICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgY29uc3QgZGVzaXJlZFdpZHRoID0gYm94Lnc7XHJcbiAgICAgIHZpZXdwb3J0ID0gcGFnZS5nZXRWaWV3cG9ydChkZXNpcmVkV2lkdGggLyB2aWV3cG9ydC53aWR0aCk7XHJcbiAgICAgIGNhbnZhcy5oZWlnaHQgPSB2aWV3cG9ydC5oZWlnaHQgPCBib3guaCA/IGJveC5oIDogdmlld3BvcnQuaGVpZ2h0O1xyXG4gICAgICBjYW52YXMud2lkdGggPSB2aWV3cG9ydC53aWR0aDtcclxuXHJcbiAgICAgIGNvbnN0IHJlbmRlckNvbnRleHQgPSB7XHJcbiAgICAgICAgY2FudmFzQ29udGV4dDogY29udGV4dCxcclxuICAgICAgICB2aWV3cG9ydCxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHRoaXMucGRmSXNMb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgY29uc3QgcmVuZGVyVGFzayA9IHBhZ2UucmVuZGVyKHJlbmRlckNvbnRleHQpO1xyXG4gICAgICByZW5kZXJUYXNrLnByb21pc2UudGhlbigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wZGZDdXJyZW50UGFnZSA9IHBhZ2VOdW1iZXI7XHJcbiAgICAgICAgdGhpcy5wZGZJc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVBhZ2VTdGF0cygpO1xyXG4gICAgICB9LCAocmVhc29uKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wZGZJc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICBjb25zdCBmaWxlTmFtZSA9IHRoaXMuZW50cnkgJiYgdGhpcy5lbnRyeS5maWxlTmFtZTtcclxuICAgICAgICBjb25zdCBtZXNzYWdlID0gYEZhaWxlZCB0byByZW5kZXIgcGFnZSAke3BhZ2VOdW1iZXJ9IGZvciBQREYgXCIke2ZpbGVOYW1lfVwiLmA7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlLCByZWFzb24pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICAgICAgRXJyb3JNYW5hZ2VyLmFkZFNpbXBsZUVycm9yKG1lc3NhZ2UsIHJlYXNvbik7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICB1cGRhdGVQYWdlU3RhdHM6IGZ1bmN0aW9uIHVwZGF0ZVBhZ2VTdGF0cygpIHtcclxuICAgIGlmICghdGhpcy5wZGZEb2MpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5vZGUgPSAkKCcucGFnZS1zdGF0cycsIHRoaXMuYXR0YWNobWVudFZpZXdlck5vZGUpLmZpcnN0KCk7XHJcbiAgICBub2RlLnRleHQoYCR7dGhpcy5wZGZDdXJyZW50UGFnZX0gLyAke3RoaXMucGRmVG90YWxQYWdlc31gKTtcclxuICB9LFxyXG4gIGxvYWRQZGZEb2N1bWVudDogZnVuY3Rpb24gbG9hZFBkZkRvY3VtZW50KHJlc3BvbnNlSW5mbykge1xyXG4gICAgaWYgKHRoaXMucGRmRG9jICE9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMucGRmRG9jLmRlc3Ryb3koKTtcclxuICAgICAgdGhpcy5wZGZEb2MgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRhdGFSZXNwb25zZSA9IFV0aWxpdHkuYmFzZTY0QXJyYXlCdWZmZXIocmVzcG9uc2VJbmZvLnJlc3BvbnNlKTtcclxuICAgIGNvbnN0IHRhc2sgPSB3aW5kb3cucGRmanNMaWIuZ2V0RG9jdW1lbnQoeyBkYXRhOiBhdG9iKGRhdGFSZXNwb25zZSkgfSk7XHJcbiAgICB0aGlzLnBkZklzTG9hZGluZyA9IHRydWU7XHJcbiAgICB0YXNrLnByb21pc2UudGhlbigocGRmKSA9PiB7XHJcbiAgICAgIHRoaXMucGRmSXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgIHRoaXMucGRmRG9jID0gcGRmO1xyXG4gICAgICB0aGlzLnBkZkN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgdGhpcy5wZGZUb3RhbFBhZ2VzID0gcGRmLm51bVBhZ2VzO1xyXG4gICAgICB0aGlzLnJlbmRlclBkZlBhZ2UoMSk7XHJcbiAgICB9LCAocmVhc29uKSA9PiB7XHJcbiAgICAgIHRoaXMucGRmSXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgIGNvbnN0IGZpbGVOYW1lID0gdGhpcy5lbnRyeSAmJiB0aGlzLmVudHJ5LmZpbGVOYW1lO1xyXG4gICAgICBjb25zdCBtZXNzYWdlID0gYFRoZSBQREYgXCIke2ZpbGVOYW1lfVwiIGZhaWxlZCB0byBsb2FkLmA7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSwgcmVhc29uKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICBFcnJvck1hbmFnZXIuYWRkU2ltcGxlRXJyb3IobWVzc2FnZSwgcmVhc29uKTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgX2xvYWRBdHRhY2htZW50VmlldzogZnVuY3Rpb24gX2xvYWRBdHRhY2htZW50VmlldyhlbnRyeSkge1xyXG4gICAgY29uc3QgYW0gPSBuZXcgQXR0YWNobWVudE1hbmFnZXIoKTtcclxuICAgIGxldCBkZXNjcmlwdGlvbjtcclxuICAgIGxldCBpc0ZpbGU7XHJcbiAgICBsZXQgZmlsZVR5cGU7XHJcbiAgICBsZXQgbG9hZGVkO1xyXG5cclxuICAgIGlmICghZW50cnkudXJsKSB7XHJcbiAgICAgIGRlc2NyaXB0aW9uID0gZW50cnkuZGVzY3JpcHRpb247XHJcbiAgICAgIGZpbGVUeXBlID0gVXRpbGl0eS5nZXRGaWxlRXh0ZW5zaW9uKGVudHJ5LmZpbGVOYW1lKTtcclxuICAgICAgaXNGaWxlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlzRmlsZSA9IGZhbHNlO1xyXG4gICAgICBkZXNjcmlwdGlvbiA9IGAke2VudHJ5LmRlc2NyaXB0aW9ufSAoJHtlbnRyeS51cmx9KWA7XHJcbiAgICAgIGZpbGVUeXBlID0gJ3VybCc7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGF0YSA9IHtcclxuICAgICAgZmlsZU5hbWU6IGVudHJ5LmZpbGVOYW1lLFxyXG4gICAgICBmaWxlU2l6ZTogZW50cnkuZmlsZVNpemUsXHJcbiAgICAgIGZpbGVUeXBlLFxyXG4gICAgICB1cmw6ICcnLFxyXG4gICAgICBkZXNjcmlwdGlvbixcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGlzRmlsZSkge1xyXG4gICAgICBmaWxlVHlwZSA9IFV0aWxpdHkuZ2V0RmlsZUV4dGVuc2lvbihlbnRyeS5maWxlTmFtZSk7XHJcbiAgICAgIGlmICh0aGlzLl9pc2ZpbGVUeXBlQWxsb3dlZChmaWxlVHlwZSkpIHtcclxuICAgICAgICBpZiAodGhpcy5faXNmaWxlVHlwZUltYWdlKGZpbGVUeXBlKSkge1xyXG4gICAgICAgICAgJCh0aGlzLmF0dGFjaG1lbnRWaWV3ZXJOb2RlKS5hcHBlbmQodGhpcy5hdHRhY2htZW50Vmlld0ltYWdlVGVtcGxhdGUuYXBwbHkoZGF0YSwgdGhpcykpO1xyXG4gICAgICAgICAgY29uc3QgdHBsID0gJCh0aGlzLmRvd25sb2FkaW5nVGVtcGxhdGUuYXBwbHkodGhpcykpO1xyXG4gICAgICAgICAgJCh0aGlzLmF0dGFjaG1lbnRWaWV3ZXJOb2RlKS5wcmVwZW5kKHRwbCk7XHJcbiAgICAgICAgICAkKHRoaXMuZG9tTm9kZSkuYWRkQ2xhc3MoJ2xpc3QtbG9hZGluZycpO1xyXG4gICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICBjb25zdCBhdHRhY2htZW50aWQgPSBlbnRyeS4ka2V5O1xyXG4gICAgICAgICAgLy8gZGF0YXVybFxyXG4gICAgICAgICAgYW0uZ2V0QXR0YWNobWVudEZpbGUoYXR0YWNobWVudGlkLCAnYXJyYXlidWZmZXInLCAocmVzcG9uc2VJbmZvKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJEYXRhID0gVXRpbGl0eS5iYXNlNjRBcnJheUJ1ZmZlcihyZXNwb25zZUluZm8ucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBzZWxmLmRhdGFVUkwgPSBgZGF0YToke3Jlc3BvbnNlSW5mby5jb250ZW50VHlwZX07YmFzZTY0LCR7ckRhdGF9YDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBsb2FkSGFuZGxlciA9IGZ1bmN0aW9uIGxvYWRIYW5kbGVyKCkge1xyXG4gICAgICAgICAgICAgIGlmIChsb2FkZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIHNlbGYuX29yZ2luYWxJbWFnZVNpemUgPSB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogaW1hZ2Uud2lkdGgsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGltYWdlLmhlaWdodCxcclxuICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgIHNlbGYuX3NpemVJbWFnZShzZWxmLmRvbU5vZGUsIGltYWdlKTtcclxuICAgICAgICAgICAgICAkKCcjaW1hZ2VQbGFjZWhvbGRlcicpLmVtcHR5KCkuYXBwZW5kKGltYWdlKTtcclxuICAgICAgICAgICAgICBsb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaW1hZ2Uub25sb2FkID0gbG9hZEhhbmRsZXI7XHJcbiAgICAgICAgICAgIGltYWdlLnNyYyA9IHNlbGYuZGF0YVVSTDtcclxuXHJcbiAgICAgICAgICAgIGlmIChpbWFnZS5jb21wbGV0ZSkge1xyXG4gICAgICAgICAgICAgIGxvYWRIYW5kbGVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFNldCBkb3dubG9hZCB0ZXh0IHRvIGhpZGRlblxyXG4gICAgICAgICAgICAkKHRwbCkuYWRkQ2xhc3MoJ2Rpc3BsYXktbm9uZScpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHsgLy8gVmlldyBmaWxlIHR5cGUgaW4gSWZyYW1lXHJcbiAgICAgICAgICBjb25zdCBhdHRhY2htZW50aWQgPSBlbnRyeS4ka2V5O1xyXG5cclxuICAgICAgICAgIGlmIChmaWxlVHlwZSA9PT0gJy5wZGYnKSB7XHJcbiAgICAgICAgICAgICQodGhpcy5hdHRhY2htZW50Vmlld2VyTm9kZSkuYXBwZW5kKHRoaXMucGRmVmlld1RlbXBsYXRlLmFwcGx5KGRhdGEsIHRoaXMpKTtcclxuICAgICAgICAgICAgJCgnLnByZXYtYnV0dG9uJywgdGhpcy5hdHRhY2htZW50Vmlld2VyTm9kZSkub24oJ2NsaWNrJywgdGhpcy5vblByZXZDbGljay5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgJCgnLm5leHQtYnV0dG9uJywgdGhpcy5hdHRhY2htZW50Vmlld2VyTm9kZSkub24oJ2NsaWNrJywgdGhpcy5vbk5leHRDbGljay5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgJCgnLmZpcnN0LXBhZ2UtYnV0dG9uJywgdGhpcy5hdHRhY2htZW50Vmlld2VyTm9kZSkub24oJ2NsaWNrJywgdGhpcy5vbkZpcnN0UGFnZUNsaWNrLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAkKCcubGFzdC1wYWdlLWJ1dHRvbicsIHRoaXMuYXR0YWNobWVudFZpZXdlck5vZGUpLm9uKCdjbGljaycsIHRoaXMub25MYXN0UGFnZUNsaWNrLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAkKCcuem9vbS1pbicsIHRoaXMuYXR0YWNobWVudFZpZXdlck5vZGUpLm9uKCdjbGljaycsIHRoaXMub25ab29tSW5DbGljay5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgJCgnLnpvb20tb3V0JywgdGhpcy5hdHRhY2htZW50Vmlld2VyTm9kZSkub24oJ2NsaWNrJywgdGhpcy5vblpvb21PdXRDbGljay5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgYW0uZ2V0QXR0YWNobWVudEZpbGUoYXR0YWNobWVudGlkLCAnYXJyYXlidWZmZXInLCAocmVzcG9uc2VJbmZvKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5sb2FkUGRmRG9jdW1lbnQocmVzcG9uc2VJbmZvKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKHRoaXMuYXR0YWNobWVudFZpZXdlck5vZGUpLmFwcGVuZCh0aGlzLmF0dGFjaG1lbnRWaWV3VGVtcGxhdGUuYXBwbHkoZGF0YSwgdGhpcykpO1xyXG4gICAgICAgICAgICBjb25zdCB0cGwgPSAkKHRoaXMuZG93bmxvYWRpbmdUZW1wbGF0ZS5hcHBseSh0aGlzKSk7XHJcbiAgICAgICAgICAgICQodGhpcy5hdHRhY2htZW50Vmlld2VyTm9kZSkucHJlcGVuZCh0cGwpO1xyXG4gICAgICAgICAgICAkKHRoaXMuZG9tTm9kZSkuYWRkQ2xhc3MoJ2xpc3QtbG9hZGluZycpO1xyXG5cclxuICAgICAgICAgICAgYW0uZ2V0QXR0YWNobWVudEZpbGUoYXR0YWNobWVudGlkLCAnYXJyYXlidWZmZXInLCAocmVzcG9uc2VJbmZvKSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc3QgckRhdGEgPSBVdGlsaXR5LmJhc2U2NEFycmF5QnVmZmVyKHJlc3BvbnNlSW5mby5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgY29uc3QgZGF0YVVybCA9IGBkYXRhOiR7cmVzcG9uc2VJbmZvLmNvbnRlbnRUeXBlfTtiYXNlNjQsJHtyRGF0YX1gO1xyXG4gICAgICAgICAgICAgICQodHBsKS5hZGRDbGFzcygnZGlzcGxheS1ub25lJyk7XHJcbiAgICAgICAgICAgICAgY29uc3QgaWZyYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F0dGFjaG1lbnQtSWZyYW1lJyk7XHJcbiAgICAgICAgICAgICAgaWZyYW1lLm9ubG9hZCA9IGZ1bmN0aW9uIGlmcmFtZU9uTG9hZCgpIHtcclxuICAgICAgICAgICAgICAgICQodHBsKS5hZGRDbGFzcygnZGlzcGxheS1ub25lJyk7XHJcbiAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAkKHRwbCkuYWRkQ2xhc3MoJ2Rpc3BsYXktbm9uZScpO1xyXG4gICAgICAgICAgICAgIHRoaXMuc2V0U3JjKGlmcmFtZSwgZGF0YVVybCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHsgLy8gRmlsZSB0eXBlIG5vdCBhbGxvd2VkXHJcbiAgICAgICAgJCh0aGlzLmF0dGFjaG1lbnRWaWV3ZXJOb2RlKS5hcHBlbmQodGhpcy5hdHRhY2htZW50Vmlld05vdFN1cHBvcnRlZFRlbXBsYXRlLmFwcGx5KGVudHJ5LCB0aGlzKSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7IC8vIHVybCBBdHRhY2htZW50XHJcbiAgICAgICQodGhpcy5hdHRhY2htZW50Vmlld2VyTm9kZSkuYXBwZW5kKHRoaXMuYXR0YWNobWVudFZpZXdUZW1wbGF0ZS5hcHBseShkYXRhLCB0aGlzKSk7XHJcbiAgICAgIGNvbnN0IHVybCA9IGFtLmdldEF0dGFjaG1lbnR1cmxCeUVudGl0eShlbnRyeSk7XHJcbiAgICAgICQodGhpcy5kb21Ob2RlKS5hZGRDbGFzcygnbGlzdC1sb2FkaW5nJyk7XHJcbiAgICAgIGNvbnN0IHRwbCA9ICQodGhpcy5kb3dubG9hZGluZ1RlbXBsYXRlLmFwcGx5KHRoaXMpKTtcclxuICAgICAgJCh0aGlzLmF0dGFjaG1lbnRWaWV3ZXJOb2RlKS5wcmVwZW5kKHRwbCk7XHJcbiAgICAgIGNvbnN0IGlmcmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhdHRhY2htZW50LUlmcmFtZScpO1xyXG4gICAgICBpZnJhbWUub25sb2FkID0gZnVuY3Rpb24gaWZyYW1lT25Mb2FkKCkge1xyXG4gICAgICAgICQodHBsKS5hZGRDbGFzcygnZGlzcGxheS1ub25lJyk7XHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuc2V0U3JjKGlmcmFtZSwgdXJsKTtcclxuICAgICAgJCh0cGwpLmFkZENsYXNzKCdkaXNwbGF5LW5vbmUnKTtcclxuICAgIH1cclxuICB9LFxyXG4gIF9pc2ZpbGVUeXBlSW1hZ2U6IGZ1bmN0aW9uIF9pc2ZpbGVUeXBlSW1hZ2UoZmlsZVR5cGUpIHtcclxuICAgIGNvbnN0IGZUeXBlID0gZmlsZVR5cGUuc3Vic3RyKGZpbGVUeXBlLmxhc3RJbmRleE9mKCcuJykgKyAxKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgbGV0IGltYWdlVHlwZXM7XHJcblxyXG4gICAgaWYgKEFwcC5pbWFnZUZpbGVUeXBlcykge1xyXG4gICAgICBpbWFnZVR5cGVzID0gQXBwLmltYWdlRmlsZVR5cGVzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaW1hZ2VUeXBlcyA9IHtcclxuICAgICAgICBqcGc6IHRydWUsXHJcbiAgICAgICAgZ2lmOiB0cnVlLFxyXG4gICAgICAgIHBuZzogdHJ1ZSxcclxuICAgICAgICBibXA6IHRydWUsXHJcbiAgICAgICAgdGlmOiB0cnVlLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpbWFnZVR5cGVzW2ZUeXBlXSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSxcclxuICBfaXNmaWxlVHlwZUFsbG93ZWQ6IGZ1bmN0aW9uIF9pc2ZpbGVUeXBlQWxsb3dlZChmaWxlVHlwZSkge1xyXG4gICAgY29uc3QgZlR5cGUgPSBmaWxlVHlwZS5zdWJzdHIoZmlsZVR5cGUubGFzdEluZGV4T2YoJy4nKSArIDEpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBsZXQgZmlsZVR5cGVzO1xyXG5cclxuICAgIGlmIChBcHAubm9uVmlld2FibGVGaWxlVHlwZXMpIHtcclxuICAgICAgZmlsZVR5cGVzID0gQXBwLm5vblZpZXdhYmxlRmlsZVR5cGVzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZmlsZVR5cGVzID0ge1xyXG4gICAgICAgIGV4ZTogdHJ1ZSxcclxuICAgICAgICBkbGw6IHRydWUsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGZpbGVUeXBlc1tmVHlwZV0pIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSxcclxuICBfdmlld0ltYWdlT25seTogZnVuY3Rpb24gX3ZpZXdJbWFnZU9ubHkoKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSxcclxuICBfc2l6ZUltYWdlOiBmdW5jdGlvbiBfc2l6ZUltYWdlKGNvbnRhaW5lck5vZGUsIGltYWdlKSB7XHJcbiAgICBjb25zdCBjb250ZW50Qm94ID0gJChjb250YWluZXJOb2RlKS5wYXJlbnQoKTsgLy8gaGFjayB0byBnZXQgcGFyZW50IGRpbWVuc2lvbnMgc2luY2UgY2hpbGQgY29udGFpbmVycyBvY2N1cHkgMCBoZWlnaHQgYXMgdGhleSBhcmUgbm90IGFic29sdXRlIGFueW1vcmVcclxuICAgIGNvbnN0IGlIID0gaW1hZ2UuaGVpZ2h0O1xyXG4gICAgY29uc3QgaVcgPSBpbWFnZS53aWR0aDtcclxuICAgIGxldCB3SCA9IGNvbnRlbnRCb3guaGVpZ2h0KCk7XHJcbiAgICBsZXQgd1cgPSBjb250ZW50Qm94LndpZHRoKCk7XHJcbiAgICBsZXQgc2NhbGUgPSAxO1xyXG5cclxuICAgIGlmICh3SCA+IDIwMCkge1xyXG4gICAgICB3SCA9IHdIIC0gNTA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHdXID4gMjAwKSB7XHJcbiAgICAgIHdXID0gd1cgLSA1MDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAod0ggPCA1MCkge1xyXG4gICAgICB3SCA9IDEwMDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAod1cgPCA1MCkge1xyXG4gICAgICB3VyA9IDEwMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiB0aGUgaW1hZ2UgaXMgbGFyZ2VyIHRoYW4gdGhlIHdpbmRvd1xyXG4gICAgaWYgKGlXID4gd1cgJiYgaUggPiB3SCkge1xyXG4gICAgICAvLyBpZiB0aGUgd2luZG93IGhlaWdodCBpcyBsYWdlciB0aGFuIHRoZSB3aWR0aFxyXG4gICAgICBpZiAod0ggPCB3Vykge1xyXG4gICAgICAgIHNjYWxlID0gMSAtICgoaUggLSB3SCkgLyBpSCk7XHJcbiAgICAgIH0gZWxzZSB7IC8vIGlmIHRoZSB3aW5kb3cgd2lkdGggaXMgbGFnZXIgdGhhbiB0aGUgaGVpZ2h0XHJcbiAgICAgICAgc2NhbGUgPSAxIC0gKChpVyAtIHdXKSAvIGlXKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChpVyA+IHdXKSB7IC8vIGlmIHRoZSBpbWFnZSAgd2lkdGggaXMgbGFnZXIgdGhhbiB0aGUgaGVpZ2h0XHJcbiAgICAgIHNjYWxlID0gMSAtICgoaVcgLSB3VykgLyBpVyk7XHJcbiAgICB9IGVsc2UgaWYgKGlIID4gd0gpIHsgLy8gaWYgdGhlIGltYWdlICBoZWlnaHQgaXMgbGFnZXIgdGhhbiB0aGUgd2lkdGhcclxuICAgICAgc2NhbGUgPSAxIC0gKChpSCAtIHdIKSAvIGlIKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIEltYWdlIGlzIHNhbWxsZXIgdGhhbiB2aWV3XHJcbiAgICAgIGlmICh3SCAvIGlIID4gd1cgLyBpVykge1xyXG4gICAgICAgIHNjYWxlID0gMSArICgod0ggLSBpSCkgLyB3SCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2NhbGUgPSAxICsgKCh3VyAtIGlXKSAvIHdXKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaW1hZ2UuaGVpZ2h0ID0gMC45MCAqIHNjYWxlICogaUg7XHJcbiAgICBpbWFnZS53aWR0aCA9IDAuOTAgKiBzY2FsZSAqIGlXO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19