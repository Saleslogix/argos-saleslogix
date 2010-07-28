/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Campaign");

Mobile.SalesLogix.Campaign.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
    titleText: 'Campaign',
    nameText: 'name',
    codeText: 'code',
    startText: 'start',
    constructor: function(o) {
        Mobile.SalesLogix.Campaign.Edit.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'campaign_edit',
            title: this.titleText,
            resourceKind: 'campaigns'
        });

        this.layout = [
            {name: 'CampaignName', label: this.nameText, type: 'text'},
            {name: 'CampaignCode', label: this.codeText, type: 'text'},
            {name: 'StartDate', label: this.startText, renderer: Mobile.SalesLogix.Format.date, type: 'text'}
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
                    'StartDate'
                   ]
            })
            .setResourceSelector(String.format("'{0}'", this.entry['$key']));
    }
});