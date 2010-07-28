/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Note");

Mobile.SalesLogix.Note.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
    titleText: 'Note',
    notesText: 'notes',
    constructor: function(o) {
        Mobile.SalesLogix.Note.Edit.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'note_edit',
            title: this.titleText,
            resourceKind: 'history'
        });

        this.layout = [
            {name: 'Notes', label: this.notesText, type: 'text'}
           ];
    },
    init: function() {
        Mobile.SalesLogix.Note.Edit.superclass.init.call(this);
    },
    createRequest: function() {
        return new Sage.SData.Client.SDataSingleResourceRequest(this.getService())
            .setResourceKind(this.resourceKind)
            .setQueryArgs({
                'select': [
                    'Notes'
                    ]
            })
            .setResourceSelector(String.format("'{0}'", this.entry['$key']));
    }
});
