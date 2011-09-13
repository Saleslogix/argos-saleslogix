/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.DefectProblem");

(function() {
    Mobile.SalesLogix.DefectProblem.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
        //Localization
        notesText: 'notes',
        titleText: 'DefectSolution',
        
        //View Properties
        entityName: 'DefectProblem',
        id: 'defectproblem_edit',
        querySelect: 'Notes',
        resourceKind: 'defectproblems',

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