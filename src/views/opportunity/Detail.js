/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>
/// <reference path="../../Template.js"/>

Ext.namespace("Mobile.SalesLogix.Opportunity");

Mobile.SalesLogix.Opportunity.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
    titleText: 'Opportunity',
    opportunityText: 'opportunity',
    accountText: 'account',
    estCloseText: 'est. close',
    potentialText: 'potential',
    probabilityText: 'probability',
    weightedText: 'weighted',
    stageText: 'stage',
    acctMgrText: 'acct mgr',
    ownerText: 'owner',
    statusText: 'status',
    createUserText: 'create user',
    createDateText: 'create date',
    relatedItemsText: 'Related Items',
    relatedActivitiesText: 'Activities',
    relatedNotesText: 'Notes',

    constructor: function(o) {
        Mobile.SalesLogix.Opportunity.Detail.superclass.constructor.call(this);

        Ext.apply(this, o, {
        id: 'opportunity_detail',
        title: this.titleText,
        editor: 'opportunity_edit',
        resourceKind: 'opportunities'
        });

        this.layout = [
            {name: 'Description', label: this.opportunityText},
            {name: 'Account.AccountName', label: this.accountText, view: 'account_detail', key: 'Account.$key', property: true},
            {name: 'EstimatedClose', label: this.estCloseText, renderer: Mobile.SalesLogix.Format.date},
            {name: 'SalesPotential', label: this.potentialText, renderer: Mobile.SalesLogix.Format.currency},
            {name: 'CloseProbability', label: this.probabilityText},
            {name: 'Weighted', label: this.weightedText, renderer: Mobile.SalesLogix.Format.currency},
            {name: 'Stage', label: this.stageText},
            {name: 'AccountManager.UserInfo', label: this.acctMgrText, tpl: Mobile.SalesLogix.Template.nameLF},
            {name: 'Owner.OwnerDescription', label: this.ownerText},
            {name: 'Status', label: this.statusText},
            {name: 'CreateUser', label: this.createUserText},
            {name: 'CreateDate', label: this.createDateText, renderer: Mobile.SalesLogix.Format.date},

            {options: {title: this.relatedItemsText, list: true}, as: [
                {
                    view: 'activity_related',
                    where: this.formatRelatedQuery.createDelegate(this, ['OpportunityId eq "{0}"'], true),
                    label: this.relatedActivitiesText,
                    icon: 'content/images/Task_List_3D_24x24.gif'
                },
                {
                    view: 'note_related',
                    where: this.formatRelatedQuery.createDelegate(this, ['OpportunityId eq "{0}" and Type eq "atNote"'], true),
                    label: this.relatedNotesText,
                    icon: 'content/images/note_24x24.gif'
                }
            ]}
        ];
    },
    formatAccountRelatedQuery: function(entry, fmt) {
        return String.format(fmt, entry['Account']['$key']);
    },
    init: function() {
        Mobile.SalesLogix.Opportunity.Detail.superclass.init.call(this);
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Opportunity.Detail.superclass.createRequest.call(this);

        request
            .setQueryArgs({
                'include': 'Account,AccountManager,AccountManager/UserInfo',
                'select': [
                    'Description',
                    'Account/AccountName',
                    'EstimatedClose',
                    'SalesPotential',
                    'CloseProbability',
                    'Weighted',
                    'Stage',
                    'AccountManager/UserInfo/FirstName',
                    'AccountManager/UserInfo/LastName',
                    'Owner/OwnerDescription',
                    'Status',
                    'CreateDate',
                    'CreateUser'
                ].join(',')
            });

        return request;
    }
});
