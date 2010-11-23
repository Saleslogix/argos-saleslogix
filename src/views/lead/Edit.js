/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Lead");

(function() {
    Mobile.SalesLogix.Lead.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
        //Localization
        accountText: 'account',
        addressText: 'address',
        businessText: 'bus desc',
        businessTitleText: 'Business Description',
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
        notesTitleText: 'Comments',
        sicCodeText: 'sic code',
        titleText: 'Lead',
        titleTitleText: 'Title',
        tollFreeText: 'toll free',
        webText: 'web',
        workText: 'phone',

        //View Properties
        entityName: 'Lead',
        id: 'lead_edit',
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
        resourceKind: 'leads',

        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    applyTo: '',
                    formatValue: Mobile.SalesLogix.Format.nameLF,
                    label: this.leadNameLastFirstText,
                    name: 'LeadNameLastFirst',
                    type: 'name',
                    validator: Mobile.SalesLogix.Validator.name,
                    view: 'name_edit'
                },
                {
                    label: this.companyText,
                    name: 'Company',
                    type: 'text'
                },
                {
                    label: this.webText,
                    name: 'WebAddress',
                    type: 'text'
                },
                {
                    label: this.workText,
                    name: 'WorkPhone',
                    type: 'phone'
                },
                {
                    label: this.emailText,
                    name: 'Email',
                    type: 'text'
                },
                {
                    label: this.contactTitleText,
                    name: 'Title',
                    picklist: 'Title',
                    title: this.titleTitleText,
                    type: 'picklist'
                },
                {
                    emptyText: '',
                    formatValue: Mobile.SalesLogix.Format.address,
                    label: this.addressText,
                    name: 'Address',
                    type: 'address',
                    view: 'address_edit'
                },
                {
                    label: this.tollFreeText,
                    name: 'TollFree',
                    type: 'phone'
                },
                {
                    label: this.importSourceText,
                    name: 'LeadSource',
                    view: 'leadsource_list',
                    textProperty: 'Description',
                    type: 'lookup',
                    validator: Mobile.SalesLogix.Validator.exists
                },
                {
                    label: this.interestsText,
                    name: 'Interests',
                    type: 'text'
                },
                {
                    label: this.industryText,
                    name: 'Industry',
                    picklist: 'Industry',
                    title: this.industryTitleText,
                    type: 'picklist'
                },
                {
                    label: this.sicCodeText,
                    name: 'SICCode',
                    type: 'text'
                },
                {
                    label: this.businessText,
                    name: 'BusinessDescription',
                    noteProperty: false,
                    title: this.businessTitleText,
                    type: 'note',
                    view: 'text_edit'
                },
                {
                    label: this.notesText,
                    name: 'Notes',
                    noteProperty: false,
                    title: this.notesTitleText,
                    type: 'note',
                    view: 'text_edit'
                },
                {
                    label: this.leadOwnerText,
                    name: 'Owner',
                    textProperty: 'OwnerDescription',
                    type: 'lookup',
                    view: 'owner_list'
                }
            ]);
        }
    });
})();