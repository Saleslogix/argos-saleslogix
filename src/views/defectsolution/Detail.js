/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.DefectSolution");

(function() {
    Mobile.SalesLogix.DefectSolution.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
        //Localization
        createDateText: 'create date',
        createUserText: 'create user',
        notesText: 'notes',
        titleText: 'DefectSolution',

        //View Properties
        editView: 'defectsolution_edit',
        id: 'defectsolution_detail',
        querySelect: [
            'CreateDate',
            'CreateUser',
            'Notes'
        ],
        resourceKind: 'defectsolutions',

        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    label: this.notesText,
                    name: 'Notes'
                },
                {
                    label: this.createUserText,
                    name: 'CreateUser'
                },
                {
                    label: this.createDateText,
                    name: 'CreateDate',
                    renderer: Mobile.SalesLogix.Format.date
                }
            ]);
        }
    });
})();