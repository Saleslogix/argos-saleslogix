Ext.namespace("Mobile.SalesLogix");

Mobile.SalesLogix.NoteEdit = Ext.extend(Sage.Platform.Mobile.Edit, {
    //View Properties
    id: 'text_edit',

    constructor: function(o) {
        Mobile.SalesLogix.NoteEdit.superclass.constructor.call(this);

        Ext.apply(this, o, {
            expose: false
        });

        this.layout = [
            {
                label: ' ',
                name: 'Notes',
                type: 'text',
                multiline: true
            }
        ];
    }
});