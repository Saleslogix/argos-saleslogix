/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Defect");

Mobile.SalesLogix.Defect.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
    idPrefixText: 'id prefix',
    idSuffixText: 'id suffix',
    titleText: 'Defect',
    areaText: 'area',
    categoryText: 'category',
    subjectText: 'subject',

    constructor: function(o) {
        Mobile.SalesLogix.Defect.Edit.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'defect_edit',
            title: this.titleText,
            resourceKind: 'defects',
            entityName: 'Defect'
        });

        this.layout = [
            {name: 'AlternateKeyPrefix', label: this.idPrefixText, type: 'text'},
            {name: 'AlternateKeySuffix', label: this.idSuffixText, type: 'text'},
            {name: 'Area', label: this.areaText, type: 'text'},
            {name: 'Category', label: this.categoryText, type: 'text'},
            {name: 'Subject', label: this.subjectText, type: 'text'},
           ];
    },
    init: function() {
        Mobile.SalesLogix.Defect.Edit.superclass.init.call(this);
    },
    createRequest: function() {
        return Mobile.SalesLogix.Defect.Edit.superclass.createRequest.call(this)
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
    }
});