/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Activity");

Mobile.SalesLogix.Activity.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {       
    constructor: function(o) {
        Mobile.SalesLogix.Activity.Detail.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'activity_detail',
            title: 'Activity',
            editor: 'activity_edit',
            resourceKind: 'activities'
        });

        this.layout = [
            {name: 'Type', label: 'type'},
            {name: 'AccountName', label: 'account'},
            {name: 'StartDate', label: 'starting',renderer: Mobile.SalesLogix.Format.date},
            {name: 'EndDate', label: 'ending',renderer: Mobile.SalesLogix.Format.date},
            //{name: 'EndDate - StartDate', label: 'duration',renderer: Mobile.SalesLogix.Format.date},
            {name: 'Timeless', label: 'timeless'},
            {name: 'ContactName', label: 'name'},
            {name: 'Description', label: 'regarding'},
            {name: 'Priority', label: 'priority'},
            {name: 'Recurring', label: 'recurring'},
            {name: 'Alarm', label: 'alarm'},
            {name: 'CreateUser', label: 'create user'},
            {name: 'CreateDate', label: 'create date',renderer: Mobile.SalesLogix.Format.date},
           ];
    },
    init: function() {     
        Mobile.SalesLogix.Activity.Detail.superclass.init.call(this);   
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Activity.Detail.superclass.createRequest.call(this);
        
        request            
            .setQueryArgs({                
                //'select': 'Type,AccountName,StartDate,EndDate,EndDate - StartDate,Timeless,ContactName,Description,Priority,Recurring,Alarm,CreateUser,CreateDate'                
                'select': [
                        'Type',
                        'AccountName',
                        'StartDate',
                        'EndDate',
                        'Timeless',
                        'ContactName',
                        'Description',
                        'Priority',
                        'Recurring',
                        'Alarm',
                        'CreateUser',
                        'CreateDate'
                        ]
            });
        
        return request;            
    } 
});