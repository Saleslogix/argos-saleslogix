/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Campaign");

(function() {
    Mobile.SalesLogix.Campaign.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
        id: 'campaign_edit',
        titleText: 'Campaign',
        nameText: 'name',
        codeText: 'code',
        startText: 'start',
        resourceKind: 'campaigns',
        entityName: 'Campaign',
        querySelect: [
            'CampaignName',
            'CampaignCode',
            'StartDate'
        ],
        createLayout: function() {
            return this.layout || (this.layout = [
                {name: 'CampaignName', label: this.nameText, type: 'text'},
                {name: 'CampaignCode', label: this.codeText, type: 'text'},
                {name: 'StartDate', label: this.startText, renderer: Mobile.SalesLogix.Format.date, type: 'text'}
            ]);
        }
    });
})();