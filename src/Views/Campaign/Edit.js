/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

define('Mobile/SalesLogix/Views/Campaign/Edit', ['Sage/Platform/Mobile/Edit'], function() {

    dojo.declare('Mobile.SalesLogix.Views.Campaign.Edit', [Sage.Platform.Mobile.Edit], {
        //Localization
        codeText: 'code',
        nameText: 'name',
        startText: 'start',
        titleText: 'Campaign',

        //View Properties
        entityName: 'Campaign',
        id: 'campaign_edit',
        insertSecurity: 'Entities/Campaign/Add',
        updateSecurity: 'Entities/Campaign/Edit',
        querySelect: [
            'CampaignName',
            'CampaignCode',
            'StartDate'
        ],
        resourceKind: 'campaigns',

        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    name: 'CampaignName',
                    label: this.nameText,
                    type: 'text'
                },
                {
                    name: 'CampaignCode',
                    label: this.codeText,
                    type: 'text'
                },
                {
                    name: 'StartDate',
                    label: this.startText,
                    type: 'date'
                }
            ]);
        }
    });
});