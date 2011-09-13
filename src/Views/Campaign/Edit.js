/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Campaign");

(function() {
    Mobile.SalesLogix.Campaign.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
        //Localization
        codeText: 'code',
        nameText: 'name',
        startText: 'start',
        titleText: 'Campaign',

        //View Properties
        entityName: 'Campaign',
        id: 'campaign_edit',
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
})();