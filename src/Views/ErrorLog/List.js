/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class crm.Views.ErrorLog.List
 *
 * @extends argos.List
 *
 * @requires crm.Format
 * @requires argos.ErrorManager
 */
define('crm/Views/ErrorLog/List', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/store/Memory',
    'crm/Format',
    'argos/Convert',
    'argos/ErrorManager',
    'argos/List'
], function(
    declare,
    lang,
    Memory,
    format,
    convert,
    ErrorManager,
    List
) {

    var __class = declare('crm.Views.ErrorLog.List', [List], {
        //Localization
        titleText: 'Error Logs',
        errorDateFormatText: 'MM/DD/YYYY hh:mm A',

        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: crm.Format.date($.Date, $$.errorDateFormatText) %}</h3>',
            '<h4>{%: $.Description %}</h4>'
        ]),

        //View Properties
        id: 'errorlog_list',
        enableSearch: false,
        enablePullToRefresh: false,
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

            errorItems.sort(function(a, b) {
                a.errorDateStamp = a.errorDateStamp || a['Date'];
                b.errorDateStamp = b.errorDateStamp || b['Date'];
                a['Date'] = a.errorDateStamp;
                b['Date'] = b.errorDateStamp;
                var A = convert.toDateFromString(a.errorDateStamp),
                    B = convert.toDateFromString(b.errorDateStamp);

                return A.valueOf() > B.valueOf();
            });

            return new Memory({data: errorItems});
        },
        createToolLayout: function() {
            return this.tools || (this.tools = {
                'tbar': []
            });
        }
    });

    lang.setObject('Mobile.SalesLogix.Views.ErrorLog.List', __class);
    return __class;
});

