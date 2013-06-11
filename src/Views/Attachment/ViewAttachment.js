define('Mobile/SalesLogix/Views/Attachment/ViewAttachment', [
    'dojo/_base/declare',
    'dojo/string',
    'dojo/_base/connect',
    'dojo/_base/array',
    'Mobile/SalesLogix/Format',
     'dojo/dom-construct',
    'dojo/dom-attr',
    'dojo/dom-class',
    'dojo/has',
    'dojo/dom',
    'dojo/dom-geometry',
    'Mobile/SalesLogix/AttachmentManager',
    'Mobile/SalesLogix/Utility',
    'Sage/Platform/Mobile/Detail'
], function(
    declare,
    string,
    connect,
    array,
    format,
    domConstruct,
    domAttr,
    domClass,
    has,
    dom,
    domGeom,
    AttachmentManager,
    Utility,
    Detail
) {

    return declare('Mobile.SalesLogix.Views.Attachment.ViewAttachment', [Detail], {
        //Localization
        detailsText: 'Attachment Details',
        descriptionText: 'description',
        fileNameText: 'file name',
        attachDateText: 'attachment date',
        fileSizeText: 'file size',
        userText: 'user',
        checkBrowserText: 'The browser is processing the attachment please check if it has downloaded successfully.',
        attachmentDateFormatText: 'ddd M/d/yy h:mm:tt',
        //View Properties
        id: 'view_attachment',
        editView: '',
        downloadingText:'down loading attachment ...',
        security: null,
        querySelect: ['description', 'user', 'attachDate', 'fileSize', 'fileName', 'url', 'fileExists', 'remoteStatus', 'dataType','fileType'],
        resourceKind: 'attachments',
        contractName: 'system',
        icon: 'content/images/icons/Scale_24.png',
        imageZoomed: false,
        orginalImageSize: { width: 0, height: 0 },
        queryInclude: ['$descriptors'],
        widgetTemplate: new Simplate([
            '<div id="{%= $.id %}" title="{%= $.titleText %}" class="overthrow detail panel {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>',
            '{%! $.loadingTemplate %}',
            '<div class="panel-content" data-dojo-attach-point="contentNode"></div>',
            '<div class="attachment-viewer-content" data-dojo-attach-point="attachmentViewerNode"></div>',
            '</div>'
        ]),
        attachmentLoadingTemplate: new Simplate([
            '<div class="list-loading-indicator">{%= $.loadingText %}</div>'
        ]),
        attachmentViewTemplate: new Simplate([
            '<div class="attachment-viewer-label" style="white-space:nowrap;">',
               '<label>{%= $.description %}</label>',
            '</div>',
            '<div class="attachment-viewer-area">',
                   '<iframe id="attachment-Iframe" src="{%= $.url %}"></iframe>',
            '</div>'
        ]),
        attachmentViewImageTemplate: new Simplate([
           '<div class="attachment-viewer-label" style="white-space:nowrap;">',
              '<label>{%= $.description %}</label>',
           '</div>',
           '<div class="attachment-viewer-area">',
               '<table><tr valign="middle"><td align="center">',
                 '<image id="attachment-image"></image>',
                 '</table></td></tr>',
           '</div>'
        ]),
        attachmentViewOtherTemplate: new Simplate([
                '<div class="attachment-viewer-label">',
                '<label>{%= $$.checkBrowserText %}</label>',
                '</div>'
        ]),
        downloadingTemplate: new Simplate([
            '<li class="list-loading-indicator"><div>{%= $.downloadingText %}</div></li>',
        ]),
        show: function(options) {
            this.inherited(arguments);
            this.attachmentViewerNode.innerHTML = "";
            //If this opened the second time we need to check to see if it is the same attachmnent and let the Process Entry function load the view.
            if (this.entry) {
                if (options.key === this.entry.$key) {
                    this._loadAttachmentView(this.entry);
                }
            }
        },
        processEntry: function(entry) {
            this.inherited(arguments);
            this._loadAttachmentView(entry);
        },
        createRequest: function() {
            var request = this.inherited(arguments);
            request.setQueryArg('_includeFile', 'false');
            return request;
        },
        createEntryForDelete: function(e) {
            var entry = {
                '$key': e['$key'],
                '$etag': e['$etag'],
                '$name': e['$name']
            };
            return entry;
        },
        createToolLayout: function() {
            return this.tools;
        },
        createLayout: function() {
            if (has('ios')) {
                this.tools = {
                    'tbar': [{
                        id: 'zoomAttachmnet',
                        icon: 'content/images/icons/Scale_24.png',
                        action: '_zoomAttachment',
                        title: 'zoom attachment'
                    }]
                };
            }
            return this.tools || (this.tools = []);
        },
        _loadAttachmentView: function(entry) {
            if (this._viewImageOnly()) {
                this._loadAttachmentViewImageOnly(entry);
            }
            else {
                if (has('ios')) {
                    this._loadAttachmentViewIOS(entry);
                }
                else if (has('android')) {
                    this._loadAttachmentViewAndroid(entry);
                } else {
                    this._loadAttachmentViewOther(entry);
                }
            }
        },
        _loadAttachmentViewImageOnly: function(entry) {
            var data, am, isFile, url, viewNode, tpl, dl, description, attachmentid,fileType, self;
            am = new AttachmentManager();
            
            if (entry.dataType === "R") {
                description = entry.description + ' (' + entry.fileName + ')';
                fileType = Utility.getFileExtension(entry.fileName);
                isFile = true;
            } else {
                isFile = false;
                description = entry.description + ' (' + entry.url + ')';
            }
            data = {
                fileName: entry.fileName,
                size: entry.fileSize,
                type: fileType,
                url: '',
                description: description
            };
            if (isFile) {
               fileType = Utility.getFileExtension(entry.fileName)
               if (this._isfileTypeImage(fileType)) {
                    viewNode = domConstruct.place(this.attachmentViewImageTemplate.apply(data, this), this.attachmentViewerNode, 'last');
                    self = this;
                    attachmentid = entry.$key;
                   //Blob url
                    //am.getAttachmentFile(attachmentid, 'blob', function(responseInfo) {
                    //    var blob, url, a, blobURL, image;
                    //    blob = responseInfo.response;
                    //    url = window.URL || window.webkitURL;
                    //    blobURL = url.createObjectURL(blob);
                    //    image = dom.byId('attachment-image');
                    //    image.onload = function() {
                    //        self._sizeImage(self.domNode, image);
                    //    }
                    //    domAttr.set(image, 'src', blobURL);
                        
                   // });

                   //dataurl
                    am.getAttachmentFile(attachmentid, 'arraybuffer', function(responseInfo) {
                        var rData, url, a, dataUrl, image;
                        
                        rData = Utility.base64ArrayBuffer(responseInfo.response);
                        dataUrl = 'data:' + responseInfo.contentType + ';base64,' + rData;
                        image = dom.byId('attachment-image');
                        image.onload = function() {
                            self._orginalImageSize = { width: image.width, height: image.height };
                            self._sizeImage(self.domNode, image);
                        }
                        domAttr.set(image, 'src', dataUrl);

                    });
                } else {

                }
            } else {

                url = am.getAttachmenturlByEntity(entry);
                window.open(url);
            }

        },
        _loadAttachmentViewIOS: function(entry) {
            var data, am, url, viewNode, tpl, dl, iframe, description;
            am = new AttachmentManager();
            url = am.getAttachmenturlByEntity(entry);
            if (entry.dataType === "R") {
                description = entry.description + ' (' + entry.fileName + ')';
            } else {
                description = entry.description + ' (' + entry.url + ')';
            }
            data = {
                fileName: entry.fileName,
                type: entry.type,
                size: entry.size,
                url: '',
                description: description
            };
            this.imageZoomed = false;
            viewNode = domConstruct.place(this.attachmentViewTemplate.apply(data, this), this.attachmentViewerNode, 'last');

            domClass.add(this.domNode, 'list-loading');
            tpl = this.downloadingTemplate.apply(this);
            dl = domConstruct.place(tpl, this.attachmentViewerNode, 'first');

            iframe = dom.byId('attachment-Iframe');
            domClass.add(iframe, 'attachment-viewer-min');
            iframe.onload = function() {
                domClass.add(iframe, 'attachment-viewer-min');
                domClass.add(dl, 'display-none');
            };
            domAttr.set(iframe, 'src', url);

        },
        _loadAttachmentViewAndroid: function(entry) {
            var data, am, isFile, url, viewNode, tpl, dl, iframe,description, attachmentid;
            am = new AttachmentManager();
            //url = am.getAttachmenturlByEntity(entry);
            if (entry.dataType === "R") {
                description = entry.description + ' (' + entry.fileName + ')';
                isFile = true;
            } else {
                isFile = false;
                description = entry.description + ' (' + entry.url + ')';
            }
            data = {
                fileName: entry.fileName,
                type: entry.type,
                size: entry.size,
                url: '',
                description: description
            };
            if (isFile) {
                attachmentid = entry.$key;
                //Blob url
                am.getAttachmentFile(attachmentid, 'blob', function(responseInfo) {
                    var blob, url, a, blobURL;
                    blob = responseInfo.response;
                    url = window.URL || window.webkitURL;
                    blobURL = url.createObjectURL(blob);
                    window.open(blobURL);
                });
              

            } else {

                url = am.getAttachmenturlByEntity(entry);
                window.open(url);
            }            

        },
        _loadAttachmentViewOther: function(entry) {
            var data, am, url, viewNode

            am = new AttachmentManager();
            url = am.getAttachmenturlByEntity(entry);
            data = {
                fileName: entry.fileName,
                type: entry.type,
                size: entry.size,
                url: '',
                description: entry.description + ' (' + entry.fileName + ')'
            };
            viewNode = domConstruct.place(this.attachmentViewOtherTemplate.apply(data, this), this.attachmentViewerNode, 'last');
            window.open(url);
           // ReUI.back();
        },
        _zoomAttachment: function() {

            iframe = dom.byId('attachment-Iframe');
            if (this.imageZoomed) {
                this.imageZoomed = false;
                domClass.add(iframe, 'attachment-viewer-min');
            } else {
                this.imageZoomed = true;
                domClass.remove(iframe, 'attachment-viewer-min');
            }
        },
        _isfileTypeImage: function(fileType){
            var imageType;
            fileType = fileType.split('.')[1].toLowerCase();
            imageType = { jpg: true, gif: true, png: true };
            if(imageType[fileType]){
                return true;
            }
        },
        _viewImageOnly: function(){
            return true // Add checking for SLXDataPortal Version;
        },
        _sizeImage: function (containerNode,image) {
            var wH, wW, iH, iW, contentBox, scale

           contentBox = domGeom.getContentBox(containerNode);
            wH = contentBox.h - 100;
            wW = contentBox.w -60;
            iH = image.height;
            iW = image.width;

            // if the image is smaller than the window do nothing
            if(iW>wW && iH>wH){

                if (wH < wW) {
                    scale = 1-((iH - wH) / iH);
                    image.height = scale * iH; 
                    image.width =  scale * iW;
                } else {
                    scale = 1-((iW - wW) / iW);
                    image.height = scale * iH;
                    image.width = scale * iW;
                }
            } else if (iW > wW) {
                scale =1-((iW - wW) / iW);
                image.height = scale * iH;
                image.width = scale * iW;
            }
            else if (iH > wH) {
                 scale = 1-((iH - wH) / iH);
                image.height = scale * iH;
                image.width = scale * iW;

            } else {
               //Image is samller than view so we could zoom
                if (wH / iH > wW / iW) {
                    scale = 1+((wH - iH) / wH);
                    image.height = scale * iH;
                    image.width = scale * iW;
                } else {
                    scale = 1+((wW - iW) / wW);
                    image.height = scale * iH;
                    image.width = scale * iW;
                }
            }
        }
    });
});

