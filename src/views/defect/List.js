/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Defect");

Mobile.SalesLogix.Defect.List = Ext.extend(Sage.Platform.Mobile.List, {
    contentTemplate: new Simplate([
        '<h3>{%: $.AlternateKeyPrefix %}-{%: $.AlternateKeySuffix %}</h3>'        
    ]),
    id: 'defect_list',
    icon: 'content/images/defect_detail_24x24.gif',
    titleText: 'Defects',
    insertView: 'defect_edit',
    resourceKind: 'defects',
    querySelect: [
        'AlternateKeyPrefix',
        'AlternateKeySuffix'
    ],
    queryOrderBy: 'AlternateKeySuffix',    
    formatSearchQuery: function(query) {
        return String.format('AccountName like "%{0}%"', query);
    }
});
