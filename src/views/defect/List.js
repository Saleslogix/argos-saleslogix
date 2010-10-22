/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Defect");

(function() {
    Mobile.SalesLogix.Defect.List = Ext.extend(Sage.Platform.Mobile.List, {
        //Templates
        contentTemplate: new Simplate([
            '<h3>{%: $.AlternateKeyPrefix %}-{%: $.AlternateKeySuffix %}</h3>'
        ]),

        //Localization
        titleText: 'Defects',

        //View Properties
        detailView: 'defect_detail',
        icon: 'content/images/defect_detail_24x24.gif',
        id: 'defect_list',
        insertView: 'defect_edit',
        queryOrderBy: 'AlternateKeySuffix',
        querySelect: [
            'AlternateKeyPrefix',
            'AlternateKeySuffix'
        ],
        resourceKind: 'defects',

        formatSearchQuery: function(query) {
            return String.format('AccountName like "%{0}%"', query);
        }
    });
})();