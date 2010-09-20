/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Campaign");

Mobile.SalesLogix.Campaign.List = Ext.extend(Sage.Platform.Mobile.List, {
    contentTemplate: new Simplate([
        '<h3>{%: $.CampaignName %}</h3>'        
    ]),
    id: 'campaign_list',
    icon: 'content/images/campaigns_detail_24x24.gif',
    titleText: 'Campaigns',
    insertView: 'campaign_list',
    resourceKind: 'campaigns',
    querySelect: [
        'CampaignName'
    ],
    queryOrderBy: 'CampaignName',
    formatSearchQuery: function(query) {
        return String.format('CampaignName like "%{0}%"', query);
    }
});
