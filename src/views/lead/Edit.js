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
    firstNameText: 'first',
    lastNameText: 'last',
    accountText: 'account',
    workText: 'work',
    eMailText: 'e-mail',
    webText: 'web',
    constructor: function(o) {
        Mobile.SalesLogix.Lead.Edit.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'lead_edit',
            title: this.titleText,
            resourceKind: 'leads',
            entityName: 'Lead'
        });

        this.layout = [
            {name: 'FirstName', label: this.firstNameText, type: 'text'},
            {name: 'LastName',  label: this.lastNameText, type: 'text'},
            {name: 'Company', label: this.accountText, type: 'text'},
            {name: 'WorkPhone', label: this.workText, type: 'text'},
            {name: 'Email', label: this.eMailText, type: 'text'},
            {name: 'WebAddress', label: this.webText, type: 'text'}
        ];
    },
    init: function() {
        Mobile.SalesLogix.Lead.Edit.superclass.init.call(this);
    },
    createRequest: function() {
        return Mobile.SalesLogix.Lead.Edit.superclass.createRequest.call(this)
            .setResourceKind(this.resourceKind)
            .setQueryArgs({
                'include': 'Account,Address,AccountManager,AccountManager/UserInfo,Owner',
                'select': [
		    'FirstName',
                    'LastName',
                    'Company',
                    'WorkPhone',
                    'Email',
                    'WebAddress'
                ].join(',')
            })
    }
});
//Rajkumar. G 05-07-2010
