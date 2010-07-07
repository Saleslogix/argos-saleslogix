/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Campaign");

Mobile.SalesLogix.Campaign.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {       
    constructor: function(o) {
        Mobile.SalesLogix.Campaign.Edit.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'campaign_edit',
            title: 'Campaign',
            resourceKind: 'campaigns'
        });

        this.layout = [
            {name: 'CampaignName', label: 'campaignname', type: 'text'},
            {name: 'CampaignCode', label: 'campaigncode', type: 'text'},
            {name: 'StartDate', label: 'start date', type: 'text'},
            //{name: 'AccountManager', label: 'accountmanager', type: 'text'},
          ];
    },
    init: function() {     
        Mobile.SalesLogix.Campaign.Edit.superclass.init.call(this);   
    },
    createRequest: function() {
        return new Sage.SData.Client.SDataSingleResourceRequest(this.getService())            
            .setResourceKind(this.resourceKind)
            .setQueryArgs({
                'select': [
                    'CampaignName',
                    'CampaignCode',
                    'StartDate'//,
                    //'AccountManager'
                   ]
            })
            .setResourceSelector(String.format("'{0}'", this.entry['$key']));
    }
});