/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.Note");

(function() {
    Mobile.SalesLogix.Note.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
        id: 'note_detail',
        editView: 'note_edit',
        titleText: 'Note',
        notesText: 'notes',
        resourceKind: 'history',
        querySelect: [
            'Notes'
        ],        
        init: function() {
            Mobile.SalesLogix.Note.Detail.superclass.init.call(this);

            this.tools.fbar = [{
                name: 'home',
                title: 'home',
                cls: 'tool-note',
                icon: 'content/images/welcome_32x32.gif',
                fn: App.goHome,
                scope: this
            }];
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {name: 'Notes', label: this.notesText}
            ]);
        }
    });
})();
