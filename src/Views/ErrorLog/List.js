/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.Views.ErrorLog.List
 *
 * @extends Sage.Platform.Mobile.List
 *
 * @requires Mobile.SalesLogix.Format
 * @requires Sage.Platform.Mobile.ErrorManager
 */
define('Mobile/SalesLogix/Views/ErrorLog/List', [
    'dojo/_base/declare',
    'dojo/store/Memory',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/Convert',
    'Sage/Platform/Mobile/ErrorManager',
    'Sage/Platform/Mobile/List'
], function(
    declare,
    Memory,
    format,
    convert,
    ErrorManager,
    List
) {

    return declare('Mobile.SalesLogix.Views.ErrorLog.List', [List], {
        //Localization
        titleText: 'Error Logs',
        errorDateFormatText: 'MM/DD/YYYY hh:mm A',

        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: Mobile.SalesLogix.Format.date($.errorDateStamp, $$.errorDateFormatText) %}</h3>',
            '<h4>{%: $.serverResponse && $.serverResponse.statusText || "" %}</h4>'
        ]),

        //View Properties
        id: 'errorlog_list',
        enableSearch: false,
        hideSearch: true,
        expose: false,
        detailView: 'errorlog_detail',

        _onRefresh: function(o) {
            this.inherited(arguments);
            if (o.resourceKind === 'errorlogs' || o.resourceKind === 'localStorage') {
                this.refreshRequired = true;
            }
        },
        createStore: function() {
            var errorItems = ErrorManager.getAllErrors();
            console.dir(errorItems);

            errorItems.sort(function(a, b) {
                a.errorDateStamp = a.errorDateStamp || a['Date'];
                b.errorDateStamp = b.errorDateStamp || b['Date'];
                a['Date'] = a.errorDateStamp;
                b['Date'] = b.errorDateStamp;
                var A = convert.toDateFromString(a.errorDateStamp),
                    B = convert.toDateFromString(b.errorDateStamp);

                return A.valueOf() > B.valueOf();
            });

            console.dir(errorItems);
            return new Memory({data: errorItems});
        },
        createToolLayout: function() {
            return this.tools || (this.tools = {
                'tbar': []
            });
        }
    });
});

