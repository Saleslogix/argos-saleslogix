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

import declare from 'dojo/_base/declare';
import domGeo from 'dojo/dom-geometry';
import connect from 'dojo/_base/connect';
import AttachmentManager from '../../AttachmentManager';
import Utility from '../../Utility';
import has from 'dojo/has';
import Detail from 'argos/Detail';
import _LegacySDataDetailMixin from 'argos/_LegacySDataDetailMixin';
import getResource from 'argos/I18n';
import ErrorManager from 'argos/ErrorManager';

const resource = getResource('attachmentView');
const dtFormatResource = getResource('attachmentViewDateTimeFormat');

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
  pdfDoc: null,
  pdfTotalPages: 0,
  pdfCurrentPage: 0,
  pdfIsLoading: false,
  pdfScale: 1,
  RENDER_DELAY: has('ios') < 8 ? 500 : 16 || 500, // Work around IOS7 orientation change issues
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
  pdfViewTemplate: new Simplate([
    '<div class="pdf-controls">',
    '<button type="button" class="first-page-button btn-icon">',
    '<svg role="presentation" aria-hidden="true" focusable="false" class="icon">',
    '<use xlink:href="#icon-first-page"></use>',
    '</svg>',
    '</button>',
    '<button type="button" class="prev-button btn-icon">',
    '<svg role="presentation" aria-hidden="true" focusable="false" class="icon">',
    '<use xlink:href="#icon-previous-page"></use>',
    '</svg>',
    '</button>',
    '<div class="page-stats"></div>',
    '<button type="button" class="zoom-out btn-icon">',
    '<svg role="presentation" aria-hidden="true" focusable="false" class="icon">',
    '<use xlink:href="#icon-zoom-out"></use>',
    '</svg>',
    '</button>',
    '<button type="button" class="zoom-in btn-icon">',
    '<svg role="presentation" aria-hidden="true" focusable="false" class="icon">',
    '<use xlink:href="#icon-zoom-in"></use>',
    '</svg>',
    '</button>',
    '<button type="button" class="next-button btn-icon">',
    '<svg role="presentation" aria-hidden="true" focusable="false" class="icon">',
    '<use xlink:href="#icon-next-page"></use>',
    '</svg>',
    '</button>',
    '<button type="button" class="last-page-button btn-icon">',
    '<svg role="presentation" aria-hidden="true" focusable="false" class="icon">',
    '<use xlink:href="#icon-last-page"></use>',
    '</svg>',
    '</button>',
    '</div>',
    '<div style="overflow:auto; min-height:100%;">', // min-height to fix iOS <= 9 issues with scroll
    '<canvas id="pdfViewer">',
    '</canvas>',
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
  onTransitionTo: function onTransitionTo() {
    if (this._orientationHandle) {
      return;
    }
    const _renderFn = Utility.debounce(() => {
      if (this.pdfDoc && !this.pdfIsLoading) {
        this.pdfScale = 1;
        this.renderPdfPage(this.pdfCurrentPage);
      }
    }, this.RENDER_DELAY);
    this._orientationHandle = connect.subscribe('/app/setOrientation', this, _renderFn);
    $(window).on('resize.attachment', _renderFn);
    $(window).on('applicationmenuclose.attachment', _renderFn);
    $(window).on('applicationmenuopen.attachment', _renderFn);
  },
  onTransitionAway: function onTransitionAway() {
    $(window).off('resize.attachment');
    $(window).off('applicationmenuclose.attachment');
    $(window).off('applicationmenuopen.attachment');
    connect.unsubscribe(this._orientationHandle);
    this._orientationHandle = null;
  },
  show: function show(options) {
    this.inherited(show, arguments);
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
    this.inherited(processEntry, arguments);
    this._loadAttachmentView(entry);
  },
  createRequest: function createRequest() {
    const request = this.inherited(createRequest, arguments);
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
    if (pageNumber < 1 || this.pdfDoc === null) {
      return;
    }

    if (pageNumber > this.pdfDoc.numPages) {
      return;
    }

    if (this.pdfIsLoading) {
      return;
    }

    const box = domGeo.getMarginBox(this.domNode);
    this.pdfDoc.getPage(pageNumber).then((page) => {
      const scale = this.pdfScale;
      let viewport = page.getViewport(scale);
      const canvas = document.getElementById('pdfViewer');
      const context = canvas.getContext('2d');
      const desiredWidth = box.w;
      viewport = page.getViewport(desiredWidth / viewport.width);
      canvas.height = viewport.height < box.h ? box.h : viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport,
      };

      this.pdfIsLoading = true;
      const renderTask = page.render(renderContext);
      renderTask.promise.then(() => {
        this.pdfCurrentPage = pageNumber;
        this.pdfIsLoading = false;
        this.updatePageStats();
      }, (reason) => {
        this.pdfIsLoading = false;
        const fileName = this.entry && this.entry.fileName;
        const message = `Failed to render page ${pageNumber} for PDF "${fileName}".`;
        console.error(message, reason); // eslint-disable-line
        ErrorManager.addSimpleError(message, reason);
      });
    });
  },
  updatePageStats: function updatePageStats() {
    if (!this.pdfDoc) {
      return;
    }

    const node = $('.page-stats', this.attachmentViewerNode).first();
    node.text(`${this.pdfCurrentPage} / ${this.pdfTotalPages}`);
  },
  loadPdfDocument: function loadPdfDocument(responseInfo) {
    if (this.pdfDoc !== null) {
      this.pdfDoc.destroy();
      this.pdfDoc = null;
    }

    const dataResponse = Utility.base64ArrayBuffer(responseInfo.response);
    const task = window.pdfjsLib.getDocument({ data: atob(dataResponse) });
    this.pdfIsLoading = true;
    task.promise.then((pdf) => {
      this.pdfIsLoading = false;
      this.pdfDoc = pdf;
      this.pdfCurrentPage = 1;
      this.pdfTotalPages = pdf.numPages;
      this.renderPdfPage(1);
    }, (reason) => {
      this.pdfIsLoading = false;
      const fileName = this.entry && this.entry.fileName;
      const message = `The PDF "${fileName}" failed to load.`;
      console.error(message, reason); // eslint-disable-line
      ErrorManager.addSimpleError(message, reason);
    });
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
          const attachmentid = entry.$key;

          if (fileType === '.pdf') {
            $(this.attachmentViewerNode).append(this.pdfViewTemplate.apply(data, this));
            $('.prev-button', this.attachmentViewerNode).on('click', this.onPrevClick.bind(this));
            $('.next-button', this.attachmentViewerNode).on('click', this.onNextClick.bind(this));
            $('.first-page-button', this.attachmentViewerNode).on('click', this.onFirstPageClick.bind(this));
            $('.last-page-button', this.attachmentViewerNode).on('click', this.onLastPageClick.bind(this));
            $('.zoom-in', this.attachmentViewerNode).on('click', this.onZoomInClick.bind(this));
            $('.zoom-out', this.attachmentViewerNode).on('click', this.onZoomOutClick.bind(this));
            am.getAttachmentFile(attachmentid, 'arraybuffer', (responseInfo) => {
              this.loadPdfDocument(responseInfo);
            });
          } else {
            $(this.attachmentViewerNode).append(this.attachmentViewTemplate.apply(data, this));
            const tpl = $(this.downloadingTemplate.apply(this));
            $(this.attachmentViewerNode).prepend(tpl);
            $(this.domNode).addClass('list-loading');

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

export default __class;
