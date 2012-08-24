define('Mobile/SalesLogix/Views/ErrorLog/List', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/Convert',
    'Sage/Platform/Mobile/ErrorManager',
    'Sage/Platform/Mobile/List',
    'Sage/Platform/Mobile/_SDataListMixin'
], function(
    declare,
    array,
    format,
    convert,
    ErrorManager,
    List,
    _SDataListMixin
) {

    return declare('Mobile.SalesLogix.Views.ErrorLog.List', [List, _SDataListMixin], {
        //Localization
        titleText: 'Error Logs',
        errorDateFormatText: 'MM/DD/YYYY hh:mm A',

        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: moment($.Date).format($$.errorDateFormatText) %}</h3>',
            '<h4>{%: $.Description %}</h4>'
        ]),

        //View Properties
        id: 'errorlog_list',
        enableSearch: false,
        hideSearch: true,
        expose: false,
        detailView: 'errorlog_detail',

        _onRefresh: function(o) {
            this.inherited(arguments);
            if (o.resourceKind === 'errorlogs' || o.resourceKind === 'localStorage')
            {
                this.refreshRequired = true;
            }
        },

        _requestData: function() {
            var errorItems = ErrorManager.getAllErrors();

            errorItems.sort(function(a, b) {
               var A = new Date(a.Date).getTime(),
                   B = new Date(b.Date).getTime();

               return B > A;
            });

            this._onQueryComplete({total: errorItems.length}, errorItems);
        },

        createToolLayout: function() {
            return this.tools || (this.tools = {
                'tbar': []
            });
        }
    });
});