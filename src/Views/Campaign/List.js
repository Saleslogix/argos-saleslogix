/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

define('Mobile/SalesLogix/Views/Campaign/List', ['Sage/Platform/Mobile/List'], function() {

    dojo.declare('Mobile.SalesLogix.Views.Campaign.List', [Sage.Platform.Mobile.List], {
        //Template
        itemTemplate: new Simplate([
            '<h3>{%: $.CampaignName %}</h3>'
        ]),

        //Localization
        titleText: 'Campaigns',

        //View Properties
        detailView: 'campaign_detail',
        icon: 'content/images/campaigns_detail_24x24.gif',
        id: 'campaign_list',
        security: 'Entities/Campaign/View',
        insertView: 'campaign_list',
        expose: false,
        queryOrderBy: 'CampaignName',
        querySelect: [
            'CampaignName'
        ],
        resourceKind: 'campaigns',

        formatSearchQuery: function(query) {
            return dojo.string.substitute('CampaignName like "%${0}%"', [query]);
        }
    });
});