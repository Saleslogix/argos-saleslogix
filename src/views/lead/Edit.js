/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Lead");

(function() {
    Mobile.SalesLogix.Lead.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
        id: 'lead_edit',
        accountText: 'account',
        addressText: 'address',
        businessText: 'bus desc',
        companyText: 'company',
        contactTitleText: 'title',
        emailText: 'email',
        faxText: 'fax',
        importSourceText : 'lead source',
        industryText: 'industry',
        industryTitleText: 'Industry',
        interestsText: 'interests',
        leadNameLastFirstText: 'name',
        leadOwnerText: 'owner',
        nameText: 'name',
        notesText: 'comments',
        sicCodeText: 'sic code',
        titleText: 'Lead',
        titleTitleText: 'Title',
        tollFreeText: 'toll free',
        webText: 'web',
        workText: 'phone',
        resourceKind: 'leads',
        entityName: 'Lead',
        querySelect: [
            'BusinessDescription',
            'Company',
            'Email',
            'FirstName',
            'FullAddress',
            'Industry',
            'Interests',
            'LastName',
            'LeadNameLastFirst',
            'LeadSource',
            'MiddleName',
            'Notes',
            'Prefix',
            'SICCode ',
            'Suffix',
            'Title',
            'TollFree',
            'WebAddress',
            'WorkPhone'
        ],
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    name: 'LeadNameLastFirst',
                    label: this.leadNameLastFirstText,
                    type: 'name',
                    view: 'name_edit',
                    applyTo: '',
                    formatter: Mobile.SalesLogix.Format.nameLF
                },
                {
                    name: 'Company',
                    label: this.companyText,
                    type: 'text'
                },
                {
                    name: 'WebAddress',
                    label: this.webText,
                    type: 'text'
                },
                {
                    name: 'WorkPhone',
                    label: this.workText,
                    type: 'phone'
                },
                {
                    name: 'Email',
                    label: this.emailText,
                    type: 'text'
                },
                {
                    name: 'Title',
                    label: this.contactTitleText,
                    type: 'picklist',
                    picklist: 'Title',
                    title: this.titleTitleText
                },
                {
                    name: 'Address',
                    label: this.addressText,
                    view: 'address_edit',
                    type: 'address',
                    formatter: Mobile.SalesLogix.Format.address
                },
                {
                    name: 'TollFree',
                    label: this.tollFreeText,
                    type: 'phone'
                },
                {
                    name: 'LeadSource',
                    label: this.importSourceText,
                    type: 'lookup',
                    view: 'leadsource_list',
                    textProperty: 'Description'
                },
                {
                    name: 'Interests',
                    label: this.interestsText,
                    type: 'text'
                },
                {
                    name: 'Industry',
                    label: this.industryText,
                    type: 'picklist',
                    picklist: 'Industry',
                    title: this.industryTitleText
                },
                {
                    name: 'SICCode',
                    label: this.sicCodeText,
                    type: 'text'
                },
                {
                    name: 'BusinessDescription',
                    label: this.businessText,
                    type: 'text'
                },
                {
                    name: 'Notes',
                    label: this.notesText,
                    type: 'text'
                },
                {
                    name: 'Owner',
                    label: this.leadOwnerText,
                    type: 'lookup',
                    view: 'owner_list',
                    textProperty: 'OwnerDescription'
                }
            ]);
        }
    });
})();

