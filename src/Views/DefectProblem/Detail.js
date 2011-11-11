/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

define('Mobile/SalesLogix/Views/DefectProblem/Detail', ['Sage/Platform/Mobile/Detail'], function() {

    dojo.declare('Mobile.SalesLogix.Views.DefectProblem.Detail', [Sage.Platform.Mobile.Detail], {
        //Localization
        createDateText: 'create date',
        createUserText: 'create user',
        notesText: 'notes',
        titleText: 'DefectProblem',

        //View Properties
        editView: 'defectproblem_edit',
        id: 'defectproblem_detail',
        querySelect: [
            'CreateDate',
            'CreateUser',
            'Notes'
        ],
        resourceKind: 'defectproblems',

        createLayout: function() {
            return this.layout || (this.layout = [{
                label: this.notesText,
                property: 'Notes'
            },
            {
                label: this.createUserText,
                property: 'CreateUser'
            },
            {
                label: this.createDateText,
                property: 'CreateDate',
                renderer: Mobile.SalesLogix.Format.date
            }]);
        }
    });
});