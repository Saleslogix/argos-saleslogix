/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.Opportunity");

(function() {
    Mobile.SalesLogix.Opportunity.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
        //Localization
        accountText: 'acct',
        acctMgrText: 'acct mgr',
        estCloseText: 'est close',
        fbarHomeTitleText: 'home',
        fbarScheduleTitleText: 'schedule',
        importSourceText: 'lead source',
        opportunityText: 'opportunity',
        ownerText: 'owner',        
        potentialText: 'sales potential',
        probabilityText: 'close prob',
        relatedActivitiesText: 'Activities',
        relatedContactsText: 'Contacts',
        relatedItemsText: 'Related Items',
        relatedNotesText: 'Notes',
        statusText: 'status',
        titleText: 'Opportunity',
        typeText: 'type',

        //View Properties
        editView: 'opportunity_edit',
        id: 'opportunity_detail',
        querySelect: [
            'Account/AccountName',
            'AccountManager/UserInfo/FirstName',
            'AccountManager/UserInfo/LastName',
            'CloseProbability',
            'Description',
            'EstimatedClose',
            'LeadSource/Description',
            'Owner/OwnerDescription',
            'SalesPotential',
            'Stage',
            'Status',
            'Type',
            'Weighted'
        ],
        resourceKind: 'opportunities',

        formatAccountRelatedQuery: function(entry, fmt) {
            return String.format(fmt, entry['Account']['$key']);
        },
        init: function() {
            Mobile.SalesLogix.Opportunity.Detail.superclass.init.call(this);

            this.tools.fbar = [{
                name: 'home',
                title: this.fbarHomeTitleText,
                cls: 'tool-note',
                icon: 'content/images/welcome_32x32.gif',
                fn: App.navigateToHomeView,
                scope: this
            },
            {
                cls: 'tool-note',
                fn: App.navigateToActivityInsertView,
                icon: 'content/images/Schdedule_To_Do_32x32.gif',
                name: 'schedule',
                scope: this,
                title: this.fbarScheduleTitleText
            }];
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    label: this.opportunityText,
                    name: 'Description'
                },
                {
                    label: this.accountText,
                    key: 'Account.$key',
                    name: 'Account.AccountName',
                    property: true,
                    view: 'account_detail'
                },
                {
                    label: this.acctMgrText,
                    name: 'AccountManager.UserInfo',
                    tpl: Mobile.SalesLogix.Template.nameLF
                },
                {
                    label: this.estCloseText,
                    name: 'EstimatedClose',
                    renderer: Mobile.SalesLogix.Format.date
                },
                {
                    label: this.potentialText,
                    name: 'SalesPotential',
                    renderer: Mobile.SalesLogix.Format.currency
                },
                {
                    label: this.statusText,
                    name: 'Status'
                },
                {
                    label: this.typeText,
                    name: 'Type'
                },
                {
                    label: this.importSourceText,
                    name: 'LeadSource.Description'
                },
                {
                    label: this.probabilityText,
                    name: 'CloseProbability'
                },
                {
                    options: {
                        list: true,
                        title: this.relatedItemsText
                    },
                    as: [{
                        icon: 'content/images/Task_List_3D_24x24.gif',
                        label: this.relatedActivitiesText,
                        view: 'activity_related',
                        where: this.formatRelatedQuery.createDelegate(
                            this, ['OpportunityId eq "{0}"'], true
                        ),
                    },
                    {
                        icon: 'content/images/Note_24x24.gif',
                        label: this.relatedNotesText,
                        view: 'note_related',
                        where: this.formatRelatedQuery.createDelegate(
                            this, ['OpportunityId eq "{0}" and Type eq "atNote"'], true
                        )
                    },
                    {
                        icon: 'content/images/Contacts_24x24.gif',
                        label: this.relatedContactsText,
                        view: 'contact_related',
                        where: this.formatRelatedQuery.createDelegate(
                            this, ['OpportunityId eq "{0}"'], true
                        )
                    }]
                }
            ]);
        }        
    });
})();