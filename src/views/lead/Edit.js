/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Lead");

Mobile.SalesLogix.Lead.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
    titleText: 'Lead',
    leadnamelastfirstText: 'name',
    nameText: 'name',
    accountText: 'account',
    workText: 'phone',
    emailText: 'email',
    webText: 'web',
    companyText: 'company',
    tollfreetext: 'toll free',
    faxText: 'fax',
    addressText: 'address',
    contactTitleText: 'title',
    leadownerText: 'owner',
    notesText: 'comments',
    businessText: 'bus desc',
    siccodeText: 'sic code',
    industryText: 'industry',
    interestsText: 'interests',
    importSourceText : 'lead source',
    constructor: function(o) {
        Mobile.SalesLogix.Lead.Edit.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'lead_edit',
            title: this.titleText,
            resourceKind: 'leads',
            entityName: 'Lead'
        });

        this.layout = [
            {name: 'LeadNameLastFirst', label: this.leadnamelastfirstText, type: 'text'},
            {name: 'Company', label: this.companyText, type: 'text'},
            {name: 'WebAddress', label: this.webText, type: 'text'},
            {name: 'WorkPhone', label: this.workText, type: 'phone', validator: Mobile.SalesLogix.Validator.isPhoneNumber, validationTrigger: 'keyup'},
            {name: 'Email', label: this.emailText, type: 'text'},
            {name: 'Title', label: this.contactTitleText, type: 'picklist', view: 'pick_list', resourcePredicate: 'name eq "Title"', title: 'Title'},
            {name: 'Address', label: this.addressText, view: 'address_edit', type: 'address', resourceKind: 'leads', title: 'Address', renderer: function(value){return Mobile.SalesLogix.Format.address(value, true)}},
            {name: 'TollFree', label: this.tollfreetext, type: 'phone', validator: Mobile.SalesLogix.Validator.isPhoneNumber, validationTrigger: 'keyup'},
            {name: 'LeadSource', label: this.importSourceText, type: 'lookup', view: 'leadsource_list', keyProperty: '$key', textProperty: 'Description'},
            {name: 'Interests', label: this.interestsText, type: 'text'},
            {name: 'Industry', label: this.industryText, type: 'picklist', view: 'pick_list', resourcePredicate: 'name eq "Industry"', title: 'Industry'},
            {name: 'SICCode', label: this.siccodeText, type: 'text'},
            {name: 'BusinessDescription', label: this.businessText, type: 'text'},
            {name: 'Notes', label: this.notesText, type: 'text'},
            {name: 'Owner', label: this.leadownerText, type: 'lookup', view: 'owner_list', keyProperty: '$key', textProperty: 'OwnerDescription'},
        ];
    },
    init: function() {
        Mobile.SalesLogix.Lead.Edit.superclass.init.call(this);
    },
    createRequest: function() {
        return Mobile.SalesLogix.Lead.Edit.superclass.createRequest.call(this)
            .setResourceKind(this.resourceKind)
            .setQueryArgs({
                'select': [
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
                    'Notes',
                ].join(',')
            })
    }
});

