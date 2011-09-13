/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Defect");

(function() {
    Mobile.SalesLogix.Defect.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
        //Localization
        idPrefixText: 'id prefix',
        idSuffixText: 'id suffix',
        titleText: 'Defect',
        areaText: 'area',
        categoryText: 'category',
        subjectText: 'subject',

        //View Properties
        entityName: 'Defect',
        id: 'defect_edit',
        querySelect: [
            'AlternateKeyPrefix',
            'AlternateKeySuffix',
            'Area',
            'Category',
            'Subject'
        ],
        resourceKind: 'defects',

        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    label: this.idPrefixText,
                    name: 'AlternateKeyPrefix',
                    type: 'text'
                },
                {
                    label: this.idSuffixText,
                    name: 'AlternateKeySuffix',
                    type: 'text'
                },
                {
                    label: this.areaText,
                    name: 'Area',
                    type: 'text'
                },
                {
                    label: this.categoryText,
                    name: 'Category',
                    type: 'text'
                },
                {
                    label: this.subjectText,
                    name: 'Subject',
                    type: 'text'
                }
            ]);
        }
    });
})();