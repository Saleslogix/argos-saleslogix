/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.Opportunity");

(function() {
    Mobile.SalesLogix.Opportunity.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
        id: 'opportunity_detail',
        editView: 'opportunity_edit',
        titleText: 'Opportunity',
        opportunityText: 'opportunity',
        accountText: 'acct',
        acctMgrText: 'acct mgr',
        estCloseText: 'est close',
        potentialText: 'sales potential',
        statusText: 'status',
        typeText: 'type',
        ownerText: 'owner',        
        probabilityText: 'close prob',
        importSourceText: 'lead source',
        relatedItemsText: 'Related Items',
        relatedActivitiesText: 'Activities',
        relatedNotesText: 'Notes',
        relatedContactsText: 'Contacts',
        resourceKind: 'opportunities',
        queryInclude: [
            'Account',
            'AccountManager',
            'AccountManager/UserInfo',
            'LeadSource'
        ],
        querySelect: [
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
            'Type',
            'LeadSource/Description'
        ],
        formatAccountRelatedQuery: function(entry, fmt) {
            return String.format(fmt, entry['Account']['$key']);
        },
        init: function() {
            Mobile.SalesLogix.Opportunity.Detail.superclass.init.call(this);

            this.tools.fbar = [{
                name: 'home',
                title: 'home',
                cls: 'tool-note',
                icon: 'content/images/welcome_32x32.gif',
                fn: App.navigateToHomeView,
                scope: this
            },{
                name: 'schedule',
                title: 'schedule',
                cls: 'tool-note',
                icon: 'content/images/Schdedule_To_Do_32x32.gif',
                fn: App.navigateToActivityInsertView,
                scope: this
            }];
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {name: 'Description', label: this.opportunityText},
                {name: 'Account.AccountName', label: this.accountText, view: 'account_detail', key: 'Account.$key', property: true},
                {name: 'AccountManager.UserInfo', label: this.acctMgrText, tpl: Mobile.SalesLogix.Template.nameLF},
                {name: 'EstimatedClose', label: this.estCloseText, renderer: Mobile.SalesLogix.Format.date},
                {name: 'SalesPotential', label: this.potentialText, renderer: Mobile.SalesLogix.Format.currency},
                {name: 'Status', label: this.statusText},
                {name: 'Type', label: this.typeText},
                {name: 'LeadSource.Description', label: this.importSourceText},
                {name: 'CloseProbability', label: this.probabilityText},
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
                        icon: 'content/images/Note_24x24.gif'
                    },
                    {
                        view: 'contact_related',
                        where: this.formatRelatedQuery.createDelegate(this, ['OpportunityId eq "{0}"'], true),
                        label: this.relatedContactsText,
                        icon: 'content/images/Contacts_24x24.gif'
                    }
                ]}
            ]);
        }        
    });
})();
