Ext.namespace("Mobile.SalesLogix");

Mobile.SalesLogix.TextEdit = Ext.extend(Sage.Platform.Mobile.Edit, {
    //View Properties
    id: 'text_edit',
    expose: false,
    titleText: 'Text',

    createLayout: function() {
        return this.layout || (this.layout = [{
            label: '',
            name: 'Notes',
            type: 'text',
            multiline: true
        }]);
    }
});