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
        relatedHistoriesText: 'History',
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
                cls: 'tool-note',
                fn: function() {
                    App.navigateToActivityInsertView.call(App, {"id": this.id});
                },
                icon: 'content/images/icons/job_24.png',
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
                    renderer: function(value) {
                        if (!value) return '';
                        return Mobile.SalesLogix.Template.nameLF.apply(value);
                    }
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
                        icon: 'content/images/icons/job_24.png',
                        label: this.relatedActivitiesText,
                        view: 'activity_related',
                        where: this.formatRelatedQuery.createDelegate(
                            this, ['OpportunityId eq "{0}"'], true
                        )
                    },
                    {
                        icon: 'content/images/icons/note_24.png',
                        label: this.relatedNotesText,
                        view: 'note_related',
                        where: this.formatRelatedQuery.createDelegate(
                            this, ['OpportunityId eq "{0}" and Type eq "atNote"'], true
                        )
                    },
                    {
                        icon: 'content/images/icons/contact_24.png',
                        label: this.relatedContactsText,
                        view: 'contact_related',
                        where: this.formatRelatedQuery.createDelegate(
                            this, ['Opportunities.Opportunity.Id eq "{0}"'], true
                        )
                    },
                    {
                        icon: 'content/images/icons/journal_24.png',
                        label: this.relatedHistoriesText,
                        where: this.formatRelatedQuery.createDelegate(
                            this, ['OpportunityId eq "{0}" and Type ne "atNote" and Type ne "atDatabaseChange"'], true
                        ),
                        view: 'history_related'
                    }
                    ]
                }
            ]);
        }        
    });
})();