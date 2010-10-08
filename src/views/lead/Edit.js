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
        titleText: 'Lead',
        leadNameLastFirstText: 'name',
        nameText: 'name',
        accountText: 'account',
        workText: 'phone',
        emailText: 'email',
        webText: 'web',
        companyText: 'company',
        tollFreeText: 'toll free',
        faxText: 'fax',
        addressText: 'address',
        contactTitleText: 'title',
        leadOwnerText: 'owner',
        notesText: 'comments',
        businessText: 'bus desc',
        sicCodeText: 'sic code',
        industryText: 'industry',
        interestsText: 'interests',
        importSourceText : 'lead source',
        titleTitleText: 'Title',
        industryTitleText: 'Industry',
        resourceKind: 'leads',
        entityName: 'Lead',
        querySelect: [
            'LeadNameLastFirst',
            'FirstName',
            'LastName',
            'Company',
            'WorkPhone',
            'Email',
            'WebAddress',
            'Title',
            'FullAddress',
            'TollFree',
            'ImportSource',
            'Interests',
            'Industry',
            'SICCode ',
            'BusinessDescription',
            'Notes'
        ],
        createLayout: function() {
            return this.layout || (this.layout = [
                {name: 'LeadNameLastFirst', label: this.leadNameLastFirstText, type: 'text'},
                {name: 'Company', label: this.companyText, type: 'text'},
                {name: 'WebAddress', label: this.webText, type: 'text'},
                {name: 'WorkPhone', label: this.workText, type: 'phone'},
                {name: 'Email', label: this.emailText, type: 'text'},
                {name: 'Title', label: this.contactTitleText, type: 'picklist', picklist: 'Title', title: this.titleTitleText},
                {name: 'Address', label: this.addressText, view: 'address_edit', type: 'address', resourceKind: 'leads'},
                {name: 'TollFree', label: this.tollFreeText, type: 'phone'},
                {name: 'LeadSource', label: this.importSourceText, type: 'lookup', view: 'leadsource_list', textProperty: 'Description'},
                {name: 'Interests', label: this.interestsText, type: 'text'},
                {name: 'Industry', label: this.industryText, type: 'picklist', picklist: 'Industry', title: this.industryTitleText},
                {name: 'SICCode', label: this.sicCodeText, type: 'text'},
                {name: 'BusinessDescription', label: this.businessText, type: 'text'},
                {name: 'Notes', label: this.notesText, type: 'text'},
                {name: 'Owner', label: this.leadOwnerText, type: 'lookup', view: 'owner_list', textProperty: 'OwnerDescription'}
            ]);
        }
    });
})();

