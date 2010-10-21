/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.DefectSolution");

(function() {
    Mobile.SalesLogix.DefectSolution.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
        id: 'defectsolution_edit',
        notesText: 'notes',
        titleText: 'DefectSolution',
        resourceKind: 'defectsolutions',
        entityName: 'DefectSolution',
        querySelect: [
            'Notes'
        ],
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    name: 'Notes',
                    label: this.notesText,
                    type: 'text'
                }
            ]);
        }
    });
})();