/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Note");

(function() {
    Mobile.SalesLogix.Note.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
        id: 'note_edit',
        titleText: 'Note',
        notesText: 'notes',
        entityName: 'History',
        resourceKind: 'history',
        querySelect: [
            'Notes'
        ],
        setValues: function() {
            var relatedContext = App.queryNavigationContext(function(){return true}, 1)

            if (relatedContext.options.where)
                this.queryWhere = relatedContext.options.where;
            else
                this.queryWhere = false;
console.log(this.queryWhere)
            Mobile.SalesLogix.Note.Edit.superclass.setValues.apply(this, arguments);
        },
        createRequest: function() {
            var request = Mobile.SalesLogix.Note.Edit.superclass.createRequest.call(this);

            if (this.queryWhere)
                request.setQueryArgs({
                    'where': this.queryWhere
                });

            return request;
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {name: 'Notes', label: this.notesText, type: 'text'}
            ]);
        }
    });
})();