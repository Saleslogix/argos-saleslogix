/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>
/// <reference path="../../Template.js"/>

Ext.namespace("Mobile.SalesLogix.Defect");

Mobile.SalesLogix.Defect.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {      
    textBlockTemplate: new Simplate([
        '<div class="row defect-text-row">',
        '<div class="defect-text-wrap">',
        '<a href="#{%= $["view"] %}" target="_related" m:context={%= $["context"] %}>{%= $["value"] %}</a>',        
        '</div>',
        '<div class="defect-text-more">more &gt;&gt;</div>',
        '</div>'
    ]),     
    constructor: function(o) {
        Mobile.SalesLogix.Defect.Detail.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'defect_detail',
            title: 'Defect',
            editor: 'defect_edit',
            resourceKind: 'defects'
        });

        this.layout = [
            {label: 'defect id', tpl: Mobile.SalesLogix.Template.alternateKeyPrefixSuffix},
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
            {options: {title: 'Problem'}, as: [
                {
                    name: 'DefectProblem.Notes',
                    wrap: this.textBlockTemplate,
                    view: 'defectproblem_detail', key: 'DefectProblem.$key'
                }
            ]},
            {options: {title: 'Solution'}, as: [
                {
                    name: 'DefectSolution.Notes',
                    wrap: this.textBlockTemplate,
                    view: 'defectsolution_detail', key: 'DefectSolution.$key'
                    
                }
            ]},
//            {options: {title: 'Related Items', list: true}, as: [
//                {
//                    view: 'defectproblem_related', 
//                    where: this.formatRelatedQuery.createDelegate(this, ['CreateUser eq "{0}"'], true),
//                    label: 'Problem',
//                    icon: 'content/images/defect_detail_24x24.gif'
//                }               
//            ]} 
        ];
    },
    init: function() {     
        Mobile.SalesLogix.Defect.Detail.superclass.init.call(this);   

        Ext.EventManager.on(window, 'resize', this.onResize, this, {buffer: 250});
    },    
    onResize: function() {  
        this.el.select('.defect-text-row').each(function(el) {
            if (el.child('.defect-text-wrap').getHeight(true) < el.child('.defect-text-wrap a').getHeight())
                el.child('.defect-text-more').show()
            else
                el.child('.defect-text-more').hide();
        });             
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Defect.Detail.superclass.createRequest.call(this);
        
        request                     
            .setQueryArgs({
                'include': 'AssignedTo,DefectProblem,DefectSolution',
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
                    'DefectProblem/Notes',
                    'DefectSolution/Notes',
                    'StatusCode',
                    'CreateUser',
                    'CreateDate'
                  ].join(',')                  
            });     
        
        return request;                   
    },
    processEntry: function(entry) {
        Mobile.SalesLogix.Defect.Detail.superclass.processEntry.call(this, entry);

        this.onResize();    
    }
});
