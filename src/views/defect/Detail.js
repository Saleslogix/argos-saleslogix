/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Defect");

Mobile.SalesLogix.Defect.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {       
    constructor: function(o) {
        Mobile.SalesLogix.Defect.Detail.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'defect_detail',
            title: 'Defect',
            editor: 'defect_edit',
            resourceKind: 'defects'
        });

        this.layout = [
            {name: ('AlternateKeyPrefix' , '-' , 'AlternateKeySuffix'), label: 'defect id'},
            {name: 'PriorityCode', label: 'priority'},
            {name: 'SeverityCode', label: 'severity'},
            {name: 'Area', label: 'area'},
            {name: 'Category', label: 'category'},
            {name: 'Subject', label: 'subject'}, 
            {name: 'RecordedDate', label: 'report date', renderer: Mobile.SalesLogix.Format.date},
            {name: 'AssignedTo.OwnerDescription', label: 'assigned'}, 
            {name: 'StatusCode', label: 'status'},
            {name: 'CreateUser', label: 'create user'},
            {name: 'CreateDate', label: 'create date', renderer: Mobile.SalesLogix.Format.date},
            {options: {title: 'Related Items', list: true}, as: [
                {
                    view: 'defectproblem_related', 
                    where: this.formatRelatedQuery.createDelegate(this, ['CreateUser eq "{0}"'], true),
                    label: 'Problem',
                    icon: 'content/images/defect_detail_24x24.gif'
                },
               
            ]} 
        ];
    },
    init: function() {     
        Mobile.SalesLogix.Defect.Detail.superclass.init.call(this);   
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Defect.Detail.superclass.createRequest.call(this);
        
        request                     
            .setQueryArgs({
                'include': 'defects,AssignedTo',
                'select': [
                    'AlternateKeyPrefix',
                    'AlternateKeySuffix',
                    'PriorityCode',
                    'SeverityCode',
                    'Area',
                    'Category',
                    'Subject',
                    'RecordedDate',
                    'AssignedTo/OwnerDescription',
                    'StatusCode',
                    'CreateUser',
                    'CreateDate',
                  ].join(',')                  
            });     
        
        return request;                   
    } 
});