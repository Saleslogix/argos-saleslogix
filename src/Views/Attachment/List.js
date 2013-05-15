define('Mobile/SalesLogix/Views/Attachment/List', [
    'dojo/_base/declare',
    'dojo/string',
    'dojo/has',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/List'
], function(
    declare,
    string,
    has,
    format,
    List
) {

    return declare('Mobile.SalesLogix.Views.Attachment.List', [List], {
        //Templates
        rowTemplate: new Simplate([
            '<li data-action="xactivateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}">',
                '<button data-action="selectEntry" class="list-item-selector button">',
                    '<img src="{%= $$.icon || $$.selectIcon %}" class="icon" />',
                '</button>',
                '<div class="list-item-content">{%! $$.itemTemplate %}</div>',
            '</li>'
        ]),
        itemTemplate: new Simplate([
           '{% if ($.dataType === "R") { %}',
            '<div class="list-item-static-selector">',
                    '<img src="{%=  $$.icon  %}" class="icon" />',
             '</div>',
           '<div class="list-item-content">{%! $$.fileTemplate %}</div>',
           '{% } else { %}',
            '<div class="list-item-static-selector">',
                    '<img src="{%=  $$.iconurl  %}" class="icon" />',
             '</div>',
           '<div class="list-item-content">{%! $$.urlTemplate %}</div>',
           '{% } %}',
        ]),
        fileTemplate: new Simplate([
            '<a href="{%: Mobile.SalesLogix.Utility.getAttachmentRef($) %}" title="{%: $.$descriptor %}">{%: $.$descriptor %}</a>',
             '<h4><span>({%: Mobile.SalesLogix.Format.date($.attachDate, $$.attachmentDateFormatText) %})&nbsp;</span>',
            '<span>{%: Mobile.SalesLogix.Format.fileSize($.fileSize) %} </span></h4>',
            '<h4><span>{%: Mobile.SalesLogix.Utility.getFileExtension($.fileName) %} </span></h4>',
            '{% if($.user) { %}',
                '<h4><span>{%: $.user.$descriptor  %}</span></h4>',
            '{% } %}'
        ]),
        urlTemplate: new Simplate([
            '<a href="{%: Mobile.SalesLogix.Utility.getAttachmentRef($) %}" target="_blank" title="{%: $.url %}">{%: $.$descriptor %}</a>',
            '<h4>',
                '<span>({%: Mobile.SalesLogix.Format.date($.attachDate, $$.attachmentDateFormatText) %})&nbsp;</span>',
                '<span>URL:{%: $.url %})&nbsp;</span>',
            '</h4>',
            '{% if($.user) { %}',
            '<h4><span>{%: $.user.$descriptor  %}</span></h4>',
            '{% } %}'
        ]),

        //Localization
        titleText: 'Attachments',
        attachmentDateFormatText: 'ddd M/d/yy h:mm:tt',

        //View Properties       
        id: 'attachment_list',
        security: null,
        //detailView: 'attachment_detail',
        insertView: 'attachment_Add',
        icon: 'content/images/icons/Attachment_24.png',
        iconurl: 'content/images/icons/Attachment_URL_24.png',
        queryOrderBy: 'attachDate desc',
        querySelect:  ['description', 'user', 'attachDate', 'fileSize', 'fileName', 'url', 'fileExists', 'remoteStatus', 'dataType'],
        resourceKind: 'attachments',
        contractName: 'system',
        queryInclude: ['$descriptors'],

        createToolLayout: function() {
            if (!has('html5-file-api')) {
                this.insertView = null;
            } else {
                return this.inherited(arguments);
            }
        },
        createRequest: function() {
            var request = this.inherited(arguments);
            request.setQueryArg('_includeFile', 'false');
            return request;
        },
        formatSearchQuery: function(searchQuery) {
            return string.substitute('upper(description) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        },
        getLink: function(attachment) {
            if (attachment['url']) {
                var href = attachment['url'] || '';
                href = (href.indexOf('http') < 0) ? 'http://' + href : href;
                return string.substitute('<a href="${0}" target="_blank" title="${1}">${2}</a>', [href, attachment['url'], attachment['$descriptor']]);
            } else {
                if (attachment['fileExists']) {
                    return string.substitute('<a href="javascript: Sage.Utility.File.Attachment.getAttachment(\'${0}\');" title="${1}">${1}</a>',
                        [attachment['$key'], attachment['$descriptor']]);
                } else {
                    return attachment['$descriptor'];
                }
            }
        }
    });
});

