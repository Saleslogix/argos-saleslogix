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
        attachmnetVieweTemplate: new Simplate([
               '<div class="attachment-viewer-label"><label>{%= $.description %}</label></div>',
               //'<h3><div><label>{%= $.fileName %}</div></h3>',
               '<div class="attachment-viewer-area">',
                   '<iframe id="attachment-Iframe" src="{%= $.url %}" ></iframe>',
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
            var layout, details;
            layout = this.layout || (this.layout = []);
            return layout;
        },
        _loadAttachmentView: function(entry) {
            var data, am, url, rowNode, tpl,dl, iframe;
            am = new AttachmentManager();
            url = am.getAttachmentUrl(entry.$key);
            data = {
                fileName: entry.fileName,
                type: entry.type,
                size: entry.size,
                url:url,
                description: entry.description + ' (' + entry.fileName + ')' 
            };
            rowNode = domConstruct.place(this.attachmnetVieweTemplate.apply(data, this), this.attachmentViewerNode, 'last');

            tpl = this.downloadingTemplate.apply(this);
            domClass.add(this.domNode, 'list-loading');
            dl = domConstruct.place(tpl, this.attachmentViewerNode, 'first');

            iframe = dojo.byId('attachment-Iframe');
            iframe.onload = function() {

                domClass.add(dl, 'display-none');
                if (!has('ios')) {
                    ReUI.back();
                }
            };
        }
    });
});

