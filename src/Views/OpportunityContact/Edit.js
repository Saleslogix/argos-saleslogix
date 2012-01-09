/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

define('Mobile/SalesLogix/Views/OpportunityContact/Edit', ['Sage/Platform/Mobile/Edit', 'Sage/Platform/Mobile/Utility'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.OpportunityContact.Edit', [Sage.Platform.Mobile.Edit], {
        //Localization
        titleText: 'Opportunity Contact',
        nameText: 'name',
        accountNameText: 'account',
        contactTitleText: 'title',
        salesRoleText: 'role',

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
            return this.layout || (this.layout = [{
                formatValue: Mobile.SalesLogix.Format.nameLF,
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
            },
            {
                label: this.salesRoleText,
                name: 'SalesRole',
                property: 'SalesRole',
                type: 'picklist',
                picklist: 'Role'
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