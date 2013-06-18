define('Mobile/SalesLogix/Views/Library/ViewLibraryFile', [
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
    'Mobile/SalesLogix/LibraryManager',
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
    LibraryManager,
    Utility,
    Detail
) {

    return declare('Mobile.SalesLogix.Views.Library.ViewLibraryFile', [Detail], {
        //Localization
        descriptionText: 'description',
        fileNameText: 'file name',
        fileDateText: 'file date',
        fileSizeText: 'file size',
        fileNotSupportedText: 'The file type is not supported for viewing.',
        fileDoesNotExistText: 'The file does not exist and can not be viewed.',
        lastRevisionDateText:'Last revision on',
        fileDateFormatText: 'ddd M/d/yy h:mm:tt',
        //View Properties
        id: 'view_library_file',
        editView: '',
        downloadingText:'Downloading library file ...',
        security: null,
        querySelect: ['fileName', 'fileSize', 'fileExists', 'status', 'modifyUser', 'createDate', 'revisionDate'],
        resourceKind: 'libraryDocuments',
        contractName: 'system',
        icon: 'content/images/icons/Library_24.png',
        orginalImageSize: { width: 0, height: 0 },
        queryInclude: ['$descriptors'],
        widgetTemplate: new Simplate([
            '<div id="{%= $.id %}" title="{%= $.titleText %}" class="overthrow detail panel {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>',
            '{%! $.loadingTemplate %}',
            '<div class="panel-content" data-dojo-attach-point="contentNode"></div>',
            '<div class="attachment-viewer-content" data-dojo-attach-point="fileViewerNode"></div>',
            '</div>'
        ]),
        fileLoadingTemplate: new Simplate([
            '<div class="list-loading-indicator">{%= $.loadingText %}</div>'
        ]),
        fileViewTemplate: new Simplate([
            '<div class="attachment-viewer-label" style="white-space:nowrap;">',
               '<label>{%= $.description + " (" + $.fileType + ")"  %}</label>',
            '</div>',
            '<div class="attachment-viewer-area">',
                   '<iframe id="file-Iframe" src="{%= $.url %}"></iframe>',
            '</div>'
        ]),
        fileViewImageTemplate: new Simplate([
           '<div class="attachment-viewer-label" style="white-space:nowrap;">',
               '<label>{%= $.description  %}</label>',
           '</div>',
           '<div class="attachment-viewer-area">',
               '<table><tr valign="middle"><td align="center">',
                 '<image id="file-image" border="1"></image>',
                 '</table></td></tr>',
           '</div>'
        ]),
        fileViewNotSupportedTemplate: new Simplate([
                '<div class="attachment-viewer-label">',
                 '{% if(! $.fileExists) { %}',
                      '<label>{%= $$.fileDoesNotExistText %}</label>',
                  '{% }else{ %}',
                      '<label>{%= $$.fileNotSupportedText %}</label>',
                 '{% } %}',
               '</div>',
                '<div class="attachment-viewer-not-supported">',
               '<h3><span>{%: $.$descriptor %}&nbsp;</span></h3>',
               '<h4><span>{%: $$.lastRevisionDateText + " (" +  Mobile.SalesLogix.Format.date($.revisionDate, $$.fileDateFormatText) + ")" %}&nbsp;</span></h4>',
               '<h4><span>{%: Mobile.SalesLogix.Format.fileSize($.fileSize) %} </span></h4>',
               '<h4><span>{%: Mobile.SalesLogix.Utility.getFileExtension($.fileName) %} </span></h4>',               
               '</div>'
        ]),

        downloadingTemplate: new Simplate([
            '<li class="list-loading-indicator"><div>{%= $.downloadingText %}</div></li>',
        ]),
        show: function(options) {
            this.inherited(arguments);
            this.fileViewerNode.innerHTML = "";
            //If this opened the second time we need to check to see if it is the same attachmnent and let the Process Entry function load the view.
            if (this.entry) {
                if (options.key === this.entry.$key) {
                    this._loadFileView(this.entry);
                }
            }
        },
        processEntry: function(entry) {
            this.inherited(arguments);
            this._loadFileView(entry);
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
             return this.tools || (this.tools = []);
        },
        _loadFileView: function(entry) {
            var data, lm, url, viewNode, tpl, dl, description, fileId ,fileType, self;

            lm = new LibraryManager();
            fileType = Utility.getFileExtension(entry.fileName);

            data = {
                fileName: entry.fileName,
                fileSize: entry.fileSize,
                fileType: fileType,
                url: '',
                description: entry.$descriptor
            };

            if (entry.fileExists) {
                if (this._isfileTypeAllowed(fileType)) {
                    if (this._isfileTypeImage(fileType)) {
                        viewNode = domConstruct.place(this.fileViewImageTemplate.apply(data, this), this.fileViewerNode, 'last');
                        tpl = this.downloadingTemplate.apply(this);
                        dl = domConstruct.place(tpl, this.fileViewerNode, 'first');
                        domClass.add(this.domNode, 'list-loading');
                        self = this;
                        fileId = entry.$key;
                        //dataurl
                        lm.getFile(fileId, 'arraybuffer', function(responseInfo) {
                            var rData, url, a, dataUrl, image;

                            rData = Utility.base64ArrayBuffer(responseInfo.response);
                            dataUrl = 'data:' + responseInfo.contentType + ';base64,' + rData;
                            image = dom.byId('file-image');
                            image.onload = function() {
                                self._orginalImageSize = { width: image.width, height: image.height };
                                self._sizeImage(self.domNode, image);
                            }
                            domAttr.set(image, 'src', dataUrl);
                            domClass.add(dl, 'display-none');
                        });
                    } else { //View file type in Iframe
                        if (this._viewImageOnly() === false) {
                            viewNode = domConstruct.place(this.fileViewTemplate.apply(data, this), this.fileViewerNode, 'last');
                            tpl = this.downloadingTemplate.apply(this);
                            dl = domConstruct.place(tpl, this.fileViewerNode, 'first');
                            domClass.add(this.domNode, 'list-loading');
                            self = this;
                            fileId = entry.$key;
                            lm.getFile(fileId, 'arraybuffer', function(responseInfo) {
                                var rData, url, a, dataUrl, iframe;

                                rData = Utility.base64ArrayBuffer(responseInfo.response);
                                dataUrl = 'data:' + responseInfo.contentType + ';base64,' + rData;
                                domClass.add(dl, 'display-none');
                                iframe = dom.byId('file-Iframe');
                                iframe.onload = function() {
                                    domClass.add(dl, 'display-none');
                                };
                                domClass.add(dl, 'display-none');
                                domAttr.set(iframe, 'src', dataUrl);
                            });
                        } else { //Only view images
                            viewNode = domConstruct.place(this.fileViewNotSupportedTemplate.apply(entry, this), this.fileViewerNode, 'last');
                        }
                    }
                } else { //File type not allowed 
                    viewNode = domConstruct.place(this.fileViewNotSupportedTemplate.apply(entry, this), this.fileViewerNode, 'last');
                }

            } else { // File Does not exist
                viewNode = domConstruct.place(this.fileViewNotSupportedTemplate.apply(entry, this), this.fileViewerNode, 'last');
            }

        },
        _isfileTypeImage: function(fileType){
            var imageType;
            fileType = fileType.substr(fileType.lastIndexOf('.') + 1).toLowerCase();
            imageTypes = { jpg: true, gif: true, png: true, bmp:true, tif:true };
            if(imageTypes[fileType]){
                return true;
            }
        },
        _isfileTypeAllowed: function(fileType) {
            var imageType;
            fileType = fileType.substr(fileType.lastIndexOf('.') + 1).toLowerCase();
            fileTypes = { exe: true, dll: true};
            if (fileTypes[fileType]) {
                return false;
            }
            return true;
        },
        _viewImageOnly: function(){
            return false;
        },
        _sizeImage: function (containerNode,image) {
            var wH, wW, iH, iW, contentBox, scale

           contentBox = domGeom.getContentBox(containerNode);
            wH = contentBox.h;
            wW = contentBox.w;
            iH = image.height;
            iW = image.width;
            scale = 1;

            if (wH > 200) {

                wH = wH - 50;
            }
            if (wW> 200) {

                wW = wW - 50;
            }
            if (wH < 50) {

                wH = 100;
            }
            if (wW < 50) {

                wW = 100;
            }
            // if the image is larger than the window
            if(iW>wW && iH>wH){
                // if the window height is lager than the width
                if (wH < wW) {
                    scale = 1-((iH - wH) / iH);
                } else { // if the window width is lager than the height
                    scale = 1-((iW - wW) / iW);
                }
            } else if (iW > wW) {// if the image  width is lager than the height
                scale =1-((iW - wW) / iW);
            }
            else if (iH > wH) {// if the image  height is lager than the width 
                 scale = 1-((iH - wH) / iH);
            } else {
               //Image is samller than view
                if (wH / iH > wW / iW) {
                    scale = 1+((wH - iH) / wH);
                } else {
                    scale = 1+((wW - iW) / wW);
                }
            }
            image.height = 0.90 *scale * iH;
            image.width = 0.90*scale * iW;

        }
    });
});

