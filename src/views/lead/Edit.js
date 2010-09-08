/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>
//Rajkumar. G 05-07-2010
Ext.namespace("Mobile.SalesLogix.Lead");

Mobile.SalesLogix.Lead.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
    titleText: 'Lead',
    leadnamelastfirstText: 'name',
    nameText: 'name',
    accountText: 'account',
    workText: 'phone',
    emailText: 'email',
    webText: 'web',
    companyText: 'Company',
    tollfreetext: 'toll free',
    faxText: 'fax',
    addressText: 'address',
    titlText: 'title',
    leadownerText: 'owner',
    notesText: 'comments',
    businessText: 'bus desc',
    cityText: 'sic code',
    industryText: 'industry',
    interestsText: 'interests',
    importText : 'lead source',
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
            {name: 'Title', label: this.titlText, type: 'pickup', view: 'pick_list', resourcePredicate: 'name eq "Title"', title: 'Title'},
            {name: 'Address.FullAddress', label: this.addressText, type: 'text'},
            {name: 'TollFree', label: this.tollfreetext, type: 'phone', validator: Mobile.SalesLogix.Validator.isPhoneNumber, validationTrigger: 'keyup'},
            {name: 'ImportSource', label: this.importText, type: 'text'},
            {name: 'Interests', label: this.interestsText, type: 'text'},
            {name: 'Industry', label: this.industryText, type: 'pickup', view: 'pick_list', resourcePredicate: 'name eq "Industry"', title: 'Industry'},
            {name: 'City', label: this.cityText, type: 'pickup', view: 'pick_list', resourcePredicate: 'name eq "City"', title: 'City'},
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
//Rajkumar. G 05-07-2010
