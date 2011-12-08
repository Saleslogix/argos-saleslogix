/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

define('Mobile/SalesLogix/Views/ErrorLog/List', ['Sage/Platform/Mobile/List'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.ErrorLog.List', [Sage.Platform.Mobile.List], {
        //Localization
        titleText: 'Error Logs',
        errorDateFormatText: 'MM/dd/yyyy hh:mm tt',

        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: Mobile.SalesLogix.Format.date($.errorDateStamp, $$.errorDateFormatText) %}</h3>',
            '<h4>{%: $.serverResponse.statusText || "" %}</h4>'
        ]),

        //View Properties
        id: 'errorlog_list',
        enableSearch: false,
        hideSearch: true,
        expose: false,
        detailView: 'errorlog_detail',

        init: function() {
            this.inherited(arguments);
            dojo.connect(Sage.Platform.Mobile.ErrorManager, 'onErrorAdd', this, '_onRefresh');
            dojo.connect(Mobile.SalesLogix.Views.Settings, 'clearLocalStorage', this, '_onRefresh');
        },
        
        _onRefresh: function(){
            this.inherited(arguments);
            this.refreshRequired = true;
        },

        requestData: function(){
            var errorItems = Sage.Platform.Mobile.ErrorManager.getAllErrors(),
                C = Sage.Platform.Mobile.Convert;

            errorItems.sort(function(a, b){
               var A = C.toDateFromString(a.errorDateStamp), B = C.toDateFromString(b.errorDateStamp);
               return B.compareTo(A); // new -> old
            });

            this.processFeed({
                '$resources': errorItems,
                '$totalResults': errorItems.length,
                '$startIndex':1,
                '$itemsPerPage':20
            });
        },

        createToolLayout: function() {
            return this.tools || (this.tools = {
                'tbar': []
            });
        }
    });
});