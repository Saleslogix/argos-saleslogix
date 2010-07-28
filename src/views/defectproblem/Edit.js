/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.DefectProblem");

Mobile.SalesLogix.DefectProblem.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
    titleText: 'DefectSolution',
    notesText: 'notes',
    constructor: function(o) {
        Mobile.SalesLogix.DefectProblem.Edit.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'defectproblem_edit',
            title: this.titleText,
            resourceKind: 'defectproblems'
        });

        this.layout = [
            {name: 'Notes', label: this.notesText, type: 'text'}
        ];
    },
    init: function() {
        Mobile.SalesLogix.DefectProblem.Edit.superclass.init.call(this);
    },
    createRequest: function() {
        return new Sage.SData.Client.SDataSingleResourceRequest(this.getService())
            .setResourceKind(this.resourceKind)
            .setQueryArgs({
                'select': [
                    'Notes'
                    ]
            })
            .setResourceSelector(String.format("'{0}'", this.entry['$key']));
    }
});