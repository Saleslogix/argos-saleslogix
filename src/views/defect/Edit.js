/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Defect");

(function() {
    Mobile.SalesLogix.Defect.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
        id: 'defect_edit',
        idPrefixText: 'id prefix',
        idSuffixText: 'id suffix',
        titleText: 'Defect',
        areaText: 'area',
        categoryText: 'category',
        subjectText: 'subject',
        resourceKind: 'defects',
        entityName: 'Defect',
        querySelect: [
            'AlternateKeyPrefix',
            'AlternateKeySuffix',
            'Area',
            'Category',
            'Subject'
        ],
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    name: 'AlternateKeyPrefix',
                    label: this.idPrefixText,
                    type: 'text'
                },
                {
                    name: 'AlternateKeySuffix',
                    label: this.idSuffixText,
                    type: 'text'
                },
                {
                    name: 'Area',
                    label: this.areaText,
                    type: 'text'
                },
                {
                    name: 'Category',
                    label: this.categoryText,
                    type: 'text'
                },
                {
                    name: 'Subject',
                    label: this.subjectText,
                    type: 'text'
                }
            ]);
        }
    });
})();