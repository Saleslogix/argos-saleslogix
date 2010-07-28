/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Return");

Mobile.SalesLogix.Return.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
    titleText: 'Return',
    returnIdText: 'return id',
    priorityText: 'priority',
    typeText: 'type',
    regDateText: 'reg date',
    returnedByText: 'returned by',
    constructor: function(o) {
        Mobile.SalesLogix.Return.Edit.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'return_edit',
            title: this.titleText,
            resourceKind: 'returns'
        });

        this.layout = [
            {name: 'ReturnNumber', label: this.returnIdText, type: 'text'},
            {name: 'Priority', label: this.priorityText, type: 'text'},
            {name: 'ReturnType', label: this.typeText, type: 'text'},
            {name: 'ExpectedDate', label: this.regDateText, renderer: Mobile.SalesLogix.Format.date, type: 'text'},
            {name: 'ReturnedBy.NameLF', label: this.returnedByText, type: 'text'},

        ];
    },
    init: function() {
        Mobile.SalesLogix.Return.Edit.superclass.init.call(this);
    },
    createRequest: function() {
        return new Sage.SData.Client.SDataSingleResourceRequest(this.getService())
            .setResourceKind(this.resourceKind)
            .setQueryArgs({
                'include': 'ReturnedBy',
                'select': [
                    'ReturnNumber',
                    'Priority',
                    'ReturnType',
                    'ExpectedDate',
                    'ReturnedBy/FullName'
                  ].join(',')
            })
            .setResourceSelector(String.format("'{0}'", this.entry['$key']));
    }
});