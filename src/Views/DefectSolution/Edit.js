/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

define('Mobile/SalesLogix/Views/DefectSolution/Edit', ['Sage/Platform/Mobile/Edit'], function() {

    dojo.declare('Mobile.SalesLogix.Views.DefectSolution.Edit', [Sage.Platform.Mobile.Edit], {
        id: 'defectsolution_edit',
        notesText: 'notes',
        titleText: 'DefectSolution',
        resourceKind: 'defectsolutions',
        entityName: 'DefectSolution',
        querySelect: [
            'Notes'
        ],
        createLayout: function() {
            return this.layout || (this.layout = [{
                property: 'Notes',
                label: this.notesText,
                type: 'text'
            }]);
        }
    });
});