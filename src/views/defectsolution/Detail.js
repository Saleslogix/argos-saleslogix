/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.DefectSolution");

Mobile.SalesLogix.DefectSolution.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
    titleText: 'DefectSolution',
    notesText: 'notes',
    createUserText: 'create user',
    createDateText: 'create date',
    constructor: function(o) {
        Mobile.SalesLogix.DefectSolution.Detail.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'defectsolution_detail',
            title: this.titleText,
            editor: 'defectsolution_edit',
            resourceKind: 'defectsolutions'
        });

        this.layout = [
            {name: 'Notes', label: this.notesText},
            {name: 'CreateUser', label: this.createUserText},
            {name: 'CreateDate', label: this.createDateText, renderer: Mobile.SalesLogix.Format.date}
        ];
    },
    init: function() {
        Mobile.SalesLogix.DefectSolution.Detail.superclass.init.call(this);
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.DefectSolution.Detail.superclass.createRequest.call(this);

        request
            .setQueryArgs({
                'select': [
                    'Notes',
                    'CreateUser',
                    'CreateDate'
                  ]
            });

        return request;
    }
});