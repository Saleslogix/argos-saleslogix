/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.Note");

(function() {
    Mobile.SalesLogix.Note.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
        //Localization
        fbarHomeTitleText: 'home',
        notesText: 'notes',
        titleText: 'Note',

        //View Properties
        editView: 'note_edit',
        id: 'note_detail',
        querySelect: [
            'Notes'
        ],        
        resourceKind: 'history',

        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    label: this.notesText,
                    name: 'Notes'
                }
            ]);
        }
    });
})();