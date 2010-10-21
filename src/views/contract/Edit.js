/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Contract");

(function() {
    Mobile.SalesLogix.Contract.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
        id: 'contract_edit',
        titleText: 'Contract',
        refNumText: 'refNum',
        quantityText: 'quantity',
        activeText: 'active',
        resourceKind: 'contracts',
        entityName: 'Contract',
        querySelect: [
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
        ],
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    name: 'ReferenceNumber',
                    label: this.refNumText,
                    type: 'text'
                },
                {
                    name: 'Period',
                    label: this.quantityText,
                    validator: Mobile.SalesLogix.Validator.isDecimal,
                    validationTrigger: 'keyup',
                    type: 'text'
                },
                {
                    name: 'IsActive',
                    label: this.activeText,
                    type: 'text'
                }
            ]);
        }
    });
})();
