/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Defect");

Mobile.SalesLogix.Defect.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {       
    constructor: function(o) {
        Mobile.SalesLogix.Defect.Edit.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'defect_edit',
            title: 'Defect',
            resourceKind: 'defects'
        });

        this.layout = [
            {name: 'AlternateKeyPrefix', label: 'id prefix', type: 'text'},
            {name: 'AlternateKeySuffix', label: 'id suffix', type: 'text'},
            {name: 'Area', label: 'area', type: 'text'},
            {name: 'Category', label: 'category', type: 'text'},
            {name: 'Subject', label: 'subject', type: 'text'}
           ];
    },
    init: function() {     
        Mobile.SalesLogix.Defect.Edit.superclass.init.call(this);   
    },
    createRequest: function() {
        return new Sage.SData.Client.SDataSingleResourceRequest(this.getService())            
            .setResourceKind(this.resourceKind)
            .setQueryArgs({
                'select': [
                    'AlternateKeyPrefix',
                    'AlternateKeySuffix',
                    'Area',
                    'Category',
                    'Subject'
                   ]
            })
            .setResourceSelector(String.format("'{0}'", this.entry['$key']));
    }
});