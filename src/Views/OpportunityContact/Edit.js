/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/OpportunityContact/Edit', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/Utility',
    'Sage/Platform/Mobile/Edit'
], function(
    declare,
    format,
    utility,
    Edit
) {

    return declare('Mobile.SalesLogix.Views.OpportunityContact.Edit', [Edit], {
        //Localization
        titleText: 'Edit Opp. Contact',
        nameText: 'name',
        accountNameText: 'account',
        contactTitleText: 'title',
        salesRoleText: 'role',
        salesRoleTitleText: 'Role',
        personalBenefitsText: 'personal ben.',
        strategyText: 'strategy',
        issuesText: 'issues',
        standingText: 'standing',
        standingTitleText: 'Standing',
        contactText: 'Contact',
        competitorPrefText: 'competitor pref',

        //View Properties
        entityName: 'OpportunityContact',
        id: 'opportunitycontact_edit',
        insertSecurity: 'Entities/Contact/Add',
        updateSecurity: 'Entities/Contact/Edit',
        querySelect: [
            'Contact/Account/AccountName',
            'Contact/NameLF',
            'Contact/Title'
        ],
        resourceKind: 'opportunityContacts',

        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    title: this.contactText,
                    name: 'ContactSection',
                    children: [
                        {
                            formatValue: format.nameLF,
                            label: this.nameText,
                            name: 'ContactName',
                            type: 'text',
                            property: 'Contact.NameLF',
                            readonly: true,
                            exclude: true
                        },
                        {
                            label: this.accountNameText,
                            name: 'ContactAccountName',
                            property: 'Contact.AccountName',
                            type: 'text',
                            readonly: true,
                            exclude: true
                        },
                        {
                            label: this.contactTitleText,
                            name: 'ContactTitle',
                            property: 'Contact.Title',
                            type: 'text',
                            readonly: true,
                            exclude: true
                        }
                    ]
                },
                {
                    label: this.salesRoleText,
                    name: 'SalesRole',
                    property: 'SalesRole',
                    type: 'picklist',
                    title: this.salesRoleTitleText,
                    picklist: 'Role'
                },
                {
                    label: this.standingText,
                    name: 'Standing',
                    property: 'Standing',
                    type: 'picklist',
                    title: this.standingTitleText,
                    picklist: 'Standing'
                },
                {
                    label: this.personalBenefitsText,
                    name: 'PersonalBenefits',
                    property: 'PersonalBenefits',
                    type: 'text'
                }, {
                    label: this.competitorPrefText,
                    name: 'Competitors',
                    property: 'Competitors',
                    textProperty: 'CompetitorName',
                    view: 'competitor_related',
                    type: 'lookup'
                },
                {
                    label: this.strategyText,
                    name: 'Strategy',
                    property: 'Strategy',
                    type: 'textarea'
                },
                {
                    label: this.issuesText,
                    name: 'Issues',
                    property: 'Issues',
                    type: 'textarea'
                },
                {
                    name: 'OpportunityKey',
                    property: 'Opportunity.$key',
                    type: 'hidden',
                    include: true
                },
                {
                    name: 'ContactKey',
                    property: 'Contact.$key',
                    type: 'hidden',
                    include: true
                }
            ]);
        }
    });
});

