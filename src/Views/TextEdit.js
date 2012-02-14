define('Mobile/SalesLogix/Views/TextEdit', ['Sage/Platform/Mobile/Edit'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.TextEdit', [Sage.Platform.Mobile.Edit], {
        //View Properties
        id: 'text_edit',
        expose: false,
        titleText: 'Text',

        createLayout: function() {
            return this.layout || (this.layout = [{
                label: '',
                cls: 'note-text-row',
                name: 'Notes',
                type: 'textarea'
            }]);
        }
    });
});