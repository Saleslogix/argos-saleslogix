/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Campaign");

(function() {
    Mobile.SalesLogix.Campaign.List = Ext.extend(Sage.Platform.Mobile.List, {
        //Template
        contentTemplate: new Simplate([
            '<h3>{%: $.CampaignName %}</h3>'
        ]),

        //Localization
        titleText: 'Campaigns',

        //View Properties
        detailView: 'campaign_detail',
        icon: 'content/images/campaigns_detail_24x24.gif',
        id: 'campaign_list',
        insertView: 'campaign_list',
        queryOrderBy: 'CampaignName',
        querySelect: [
            'CampaignName'
        ],
        resourceKind: 'campaigns',

        formatSearchQuery: function(query) {
            return String.format('CampaignName like "%{0}%"', query);
        }
    });
})();