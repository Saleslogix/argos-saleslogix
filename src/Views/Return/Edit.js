/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Return");

(function() {
    Mobile.SalesLogix.Return.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
        //Localization
        titleText: 'Return',
        returnIdText: 'return id',
        priorityText: 'priority',
        typeText: 'type',
        regDateText: 'reg date',
        returnedByText: 'returned by',

        //View Properties
        entityName: 'Return',
        id: 'return_edit',
        querySelect: [
            'ExpectedDate',
            'Priority',
            'ReturnedBy/FullName',
            'ReturnNumber',
            'ReturnType'
        ],
        resourceKind: 'returns',

        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    label: this.returnIdText,
                    name: 'ReturnNumber',
                    type: 'text'
                },
                {
                    label: this.priorityText,
                    name: 'Priority',
                    type: 'text'
                },
                {
                    label: this.typeText,
                    name: 'ReturnType',
                    type: 'text'
                },
                {
                    label: this.regDateText,
                    name: 'ExpectedDate',
                    renderer: Mobile.SalesLogix.Format.date,
                    type: 'text'
                },
                {
                    label: this.returnedByText,
                    name: 'ReturnedBy.NameLF',
                    type: 'text'
                }
            ]);
        }
    });
})();