/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

define('Mobile/SalesLogix/Views/OpportunityContact/Detail', ['Sage/Platform/Mobile/Detail'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.OpportunityContact.Detail', [Sage.Platform.Mobile.Detail], {
        //Localization
        titleText: 'Opportunity Contact',
        accountText: 'account',
        contactTitleText: 'title',
        nameText: 'contact',
        moreDetailsText: 'More Details',
        salesRoleText: 'role',
        strategyText: 'strategy',
        personalBenefitsText: 'personal ben.',
        standingText: 'standing',
        issuesText: 'issues',

        //View Properties
        id: 'opportunitycontact_detail',
        editView: 'opportunitycontact_edit',
        security: 'Entities/Contact/View',
        querySelect: [
            'Opportunity/Description',
            'Contact/Account/AccountName',
            'Contact/AccountName',
            'SalesRole',
            'Contact/NameLF',
            'Contact/Title',
            'IsPrimary',
            'Issues',
            'PersonalBenefits',
            'Standing',
            'Strategy'
        ],
        resourceKind: 'opportunityContacts',

        createLayout: function() {
            return this.layout || (this.layout = [
            {
                title: this.detailsText,
                name: 'DetailsSection',
                children: [{
                    name: 'NameLF',
                    property: 'Contact.NameLF',
                    label: this.nameText,
                    view: 'contact_detail',
                    key: 'Contact.$key',
                    descriptor: 'Contact.NameLF'
                },{
                    name: 'AccountName',
                    property: 'Contact.AccountName',
                    descriptor: 'AccountName',
                    label: this.accountText,
                    view: 'account_detail',
                    key: 'Contact.Account.$key'
                },{
                    name: 'Title',
                    property: 'Contact.Title',
                    label: this.contactTitleText
                },{
                    name: 'SalesRole',
                    property: 'SalesRole',
                    label: this.salesRoleText
                }]
            },{
                title: this.moreDetailsText,
                name: 'MoreDetailsSection',
                collapsed: true,
                children: [{
                    name: 'Standing',
                    property: 'Standing',
                    label: this.standingText
                },{
                    name: 'Strategy',
                    property: 'Strategy',
                    label: this.strategyText
                },{
                    name: 'Issues',
                    property: 'Issues',
                    label: this.issuesText
                },{
                    name: 'PersonalBenefits',
                    property: 'PersonalBenefits',
                    label: this.personalBenefitsText
                }]
            }]);
        }
    });
});