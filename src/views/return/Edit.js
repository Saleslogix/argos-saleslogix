/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Return");

(function() {
    Mobile.SalesLogix.Return.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
        id: 'return_edit',
        titleText: 'Return',
        returnIdText: 'return id',
        priorityText: 'priority',
        typeText: 'type',
        regDateText: 'reg date',
        returnedByText: 'returned by',
        resourceKind: 'returns',
        entityName: 'Return',
        querySelect: [
            'ExpectedDate',
            'Priority',
            'ReturnedBy/FullName',
            'ReturnNumber',
            'ReturnType'
        ],
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    name: 'ReturnNumber',
                    label: this.returnIdText,
                    type: 'text'
                },
                {
                    name: 'Priority',
                    label: this.priorityText,
                    type: 'text'
                },
                {
                    name: 'ReturnType',
                    label: this.typeText,
                    type: 'text'
                },
                {
                    name: 'ExpectedDate',
                    label: this.regDateText,
                    renderer: Mobile.SalesLogix.Format.date,
                    type: 'text'
                },
                {
                    name: 'ReturnedBy.NameLF',
                    label: this.returnedByText,
                    type: 'text'
                }
            ]);
        }
    });
})();