define('Mobile/SalesLogix/Views/Library/List', [
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

    return declare('Mobile.SalesLogix.Views.Library.List', [List], {
        //Templates
        rowTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}">',
                '<button data-action="selectEntry" class="list-item-selector button">',
                    '<img src="{%= $$.icon || $$.selectIcon %}" class="icon" />',
                '</button>',
                '<div class="list-item-content">{%! $$.itemTemplate %}</div>',
            '</li>'
        ]),
        itemTemplate: new Simplate([
           
            '<div class="list-item-static-selector">',
                    '<img src="{%=  $$.icon  %}" class="icon" />',
             '</div>',
           '<div class="list-item-content">{%! $$.fileTemplate %}</div>'
           
        ]),
        fileTemplate: new Simplate([
            '<h3><span>{%: $.$descriptor %}&nbsp;</span></h3>',
            '<h4><span>{%: $$.lastRevisionDateText + " (" +  Mobile.SalesLogix.Format.date($.revisionDate, $$.fileDateFormatText) + ")" %}&nbsp;</span></h4>',
            '<h4><span>{%: Mobile.SalesLogix.Format.fileSize($.fileSize) %} </span></h4>',
            '<h4><span>{%: Mobile.SalesLogix.Utility.getFileExtension($.fileName) %} </span></h4>',
            '{% if(! $.fileExists) { %}',
                '<h5><span>{%: $$.fileDoesNotExistText  %}</span></h5>',
            '{% } %}',
        ]),
       
        //Localization
        lastRevisionDateText: 'Last Revision',
        fileDoesNotExistText: 'File does not exist',
        titleText: 'Library',
        fileDateFormatText: 'ddd M/d/yy h:mm:tt',

        //View Properties       
        id: 'Library_list',
        security: null,
        detailView: 'view_library_file',
        insertView: 'add_library_file',
        icon: 'content/images/icons/library_24.png',
        queryOrderBy: 'fileName desc',
        querySelect: ['fileName', 'fileSize', 'fileExists', 'status', 'modifyUser', 'createDate', 'revisionDate', 'found'],
        resourceKind: 'libraryDocuments',
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
        queryWhere: function() {
            return string.substitute('found eq "${0}"', ['true']);
       },

        formatSearchQuery: function(searchQuery) {
            var where;
            where = string.substitute('upper(fileName) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
            return where;
        }
        
    });
});

