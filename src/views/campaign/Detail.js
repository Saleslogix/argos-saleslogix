/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Campaign");

Mobile.SalesLogix.Campaign.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {       
    constructor: function(o) {
        Mobile.SalesLogix.Campaign.Detail.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'campaign_detail',
            title: 'Campaign',
            editor: 'campaign_edit',
            resourceKind: 'campaigns'
        });

        this.layout = [
            {name: 'CampaignName', label: 'campaignname'},
            {name: 'CampaignCode', label: 'campaigncode'},
            {name: 'StartDate', label: 'start date', renderer: Mobile.SalesLogix.Format.date},
            {name: 'AccountManager.UserInfo', label: 'acct mgr', tpl: Mobile.SalesLogix.Template.nameLF},
            {name: 'CreateUser', label: 'create user'},
            {name: 'CreateDate', label: 'create date', renderer: Mobile.SalesLogix.Format.date},
          ];
    },
    init: function() {     
        Mobile.SalesLogix.Campaign.Detail.superclass.init.call(this);   
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Campaign.Detail.superclass.createRequest.call(this);
        
        request                     
            .setQueryArgs({
                'include': 'Address,AccountManager/UserInfo',
                'select': [
                    'CampaignName',
                    'CampaignCode',
                    'StartDate',
                    'AccountManager/UserInfo/FirstName',
                    'AccountManager/UserInfo/LastName',
                    'CreateUser',
                    'CreateDate'
                  ].join(',')                  
            });     
        
        return request;                   
    } 
});