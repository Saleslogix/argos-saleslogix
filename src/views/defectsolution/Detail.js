/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.DefectSolution");

(function() {
    Mobile.SalesLogix.DefectSolution.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
        id: 'defectsolution_detail',
        editView: 'defectsolution_edit',
        titleText: 'DefectSolution',
        notesText: 'notes',
        createUserText: 'create user',
        createDateText: 'create date',
        resourceKind: 'defectsolutions',
        querySelect: [
            'Notes',
            'CreateUser',
            'CreateDate'
        ],
        createLayout: function() {
            return this.layout || (this.layout = [
                {name: 'Notes', label: this.notesText},
                {name: 'CreateUser', label: this.createUserText},
                {name: 'CreateDate', label: this.createDateText, renderer: Mobile.SalesLogix.Format.date}
            ]);
        }
    });
})();