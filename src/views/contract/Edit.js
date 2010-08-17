/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Contract");

Mobile.SalesLogix.Contract.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
    titleText: 'Contract',
    refNumText: 'refNum',
    quantityText: 'quantity',
    activeText: 'active',
    constructor: function(o) {
        Mobile.SalesLogix.Contract.Edit.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'contract_edit',
            title: this.titleText,
            resourceKind: 'contracts',
            entityName: 'Contract'
        });

        this.layout = [
            {name: 'ReferenceNumber', label: this.refNumText, type: 'text'},
            {name: 'Period', label: this.quantityText, validator: Mobile.SalesLogix.Validator.isDecimal, validationTrigger: 'keyup', type: 'text'},
            {name: 'IsActive', label: this.activeText, type: 'boolean', onText: 'true', offText: 'false'},

        ];
    },
    init: function() {
        Mobile.SalesLogix.Contract.Edit.superclass.init.call(this);
    },
    createRequest: function() {
        return Mobile.SalesLogix.Contract.Edit.superclass.createRequest.call(this)
            .setResourceKind(this.resourceKind)
           .setQueryArgs({
                'include': 'Account,Address,AccountManager,AccountManager/UserInfo',
                'select': [
                      'ReferenceNumber',
                      'Account/AccountName',
                      'Contact/FullName',
                      'ServiceCode',
                      'TypeCode',
                      'Period',
                      'Remaining',
                      'StartDate',
                      'EndingDate',
                      'IsActive',
                      'CreateUser',
                      'CreateDate'
                ].join(',')
            })
    }
});
