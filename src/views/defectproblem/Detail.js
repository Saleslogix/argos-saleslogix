/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.DefectProblem");

Mobile.SalesLogix.DefectProblem.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {       
    constructor: function(o) {
        Mobile.SalesLogix.DefectProblem.Detail.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'defectproblem_detail',
            title: 'DefectProblem',
            editor: 'defectproblem_edit',
            resourceKind: 'defectproblems'
        });

        this.layout = [
            {name: 'Notes', label: 'notes'},
            {name: 'CreateUser', label: 'create user'},
            {name: 'CreateDate', label: 'create date', renderer: Mobile.SalesLogix.Format.date},
            ];
    },
    init: function() {     
        Mobile.SalesLogix.DefectProblem.Detail.superclass.init.call(this);   
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.DefectProblem.Detail.superclass.createRequest.call(this);
        
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