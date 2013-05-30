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
    //'dojo/on',
    // 'dojo/_base/lang',
    'Mobile/SalesLogix/AttachmentManager',
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
    //on,
    //lang,
    AttachmentManager,
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
        attachmentDateFormatText: 'ddd M/d/yy h:mm:tt',
        //View Properties
        id: 'view_attachment',
        editView: '',
        downloadingText:'down loading attachment ...',
        security: null,
        querySelect: ['description', 'user', 'attachDate', 'fileSize', 'fileName', 'url', 'fileExists', 'remoteStatus', 'dataType'],
        resourceKind: 'attachments',
        contractName: 'system',
        icon: 'content/images/icons/Scale_24.png',
        imageZoomed: false,
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
        attachmentVieweTemplate: new Simplate([
            '<div class="attachment-viewer-label" style="white-space:nowrap;"  >',
           //   '<button data-action="_zoomAttachment" class="list-item-selector button">',
           //         '<img src="{%= $$.icon || $$.selectIcon %}" class="icon" text="zoom" />',
           //    '</button>',
               '<label>{%= $.description %}</label>',
            '</div>',
               //'<h3><div><label>{%= $.fileName %}</div></h3>',
            '<div class="attachment-viewer-area">',
                   '<iframe id="attachment-Iframe" src="{%= $.url %}"></iframe>',
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
            if (has('ios')) {
                this._loadAttachmentViewIOS(entry);
            }
            else if (has('android')) {
                this._loadAttachmentViewAndroid(entry);
            } else {
                this._loadAttachmentViewOther(entry);
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
            viewNode = domConstruct.place(this.attachmentVieweTemplate.apply(data, this), this.attachmentViewerNode, 'last');
            
           /* iframe = domConstruct.create("iframe");
            domAttr.set(iframe, 'id', 'attachment-Iframe');
            on(iframe, "onload", lang.hitch(this, this._onAttachmentLoad));
            domConstruct.place(iframe, this.attachmentViewerNode, 'last');
            domAttr.set(iframe, 'src', url);
            */

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
            var data, am, url, viewNode, tpl, dl, iframe;
            am = new AttachmentManager();
            url = am.getAttachmenturlByEntity(entry);
            data = {
                fileName: entry.fileName,
                type: entry.type,
                size: entry.size,
                url: '',
                description: entry.description + ' (' + entry.fileName + ')'
            };
            this.imageZoomed = false;
            viewNode = domConstruct.place(this.attachmentVieweTemplate.apply(data, this), this.attachmentViewerNode, 'last');

            /* iframe = domConstruct.create("iframe");
             domAttr.set(iframe, 'id', 'attachment-Iframe');
             on(iframe, "onload", lang.hitch(this, this._onAttachmentLoad));
             domConstruct.place(iframe, this.attachmentViewerNode, 'last');
             domAttr.set(iframe, 'src', url);
             */

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
        _loadAttachmentViewOther: function(entry) {
            var data, am, url

            am = new AttachmentManager();
            url = am.getAttachmenturlByEntity(entry);
            data = {
                fileName: entry.fileName,
                type: entry.type,
                size: entry.size,
                url: '',
                description: entry.description + ' (' + entry.fileName + ')'
            };

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
        }
    });
});

