define('Mobile/SalesLogix/Views/Attachment/List', [
    'dojo/_base/declare',
    'dojo/string',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/List'
], function(
    declare,
    string,
    format,
    List
) {

    return declare('Mobile.SalesLogix.Views.Attachment.List', [List], {
        //Templates
        itemTemplate: new Simplate([
           '{% if ($.dataType === "R") { %}',
            '<div class="list-item-static-selector">',
                    '<img src="{%=  $$.icon  %}" class="icon" />',
             '</div>',
           '<div class="list-item-content">{%! $$.fileTemplate %}</div>',
           '{% } else { %}',
           '<div class="list-item-content">{%! $$.urlTemplate %}</div>',
           '{% } %}',
        ]),
        fileTemplate: new Simplate([
            '<h3>{%: $.description %}</h3>',
            '<h4><span>{%: $.fileName %}&nbsp;</span></h4>',
            '<h4><span>({%: Mobile.SalesLogix.Format.date($.attachDate, $$.attachmentDateFormatText) %})&nbsp;</span>',
            '<span>{%: Mobile.SalesLogix.Format.fileSize($.fileSize) %} </span></h4>',
            '{% if($.user) { %}',
                '<h4><span>{%: $.user.$descriptor  %}</span></h4>',
            '{% } %}'
        ]),
        urlTemplate: new Simplate([
            '<h3>{%: $.description %}</h3>',
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
        detailView: 'attachment_detail',
        insertView: 'attachment_Add',
        icon: 'content/images/icons/attachment_24.png',
        queryOrderBy: 'attachDate desc',
        querySelect:  ['description', 'user', 'attachDate', 'fileSize', 'fileName', 'url', 'fileExists', 'remoteStatus', 'dataType'],
        resourceKind: 'attachments',
        contractName: 'system',
        queryInclude: ['$descriptors'],
        //include=$descriptors
        //allowSelection: true,
        //enableActions: true,
        createRequest: function() {
            var request = this.inherited(arguments);
            request.setQueryArg('_includeFile', 'false');
            return request;
        },
        formatSearchQuery: function(searchQuery) {
            return '';
            //return string.substitute('(upper(Product.Name) like "${0}%" or upper(Product.Family) like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
});

