define('Mobile/SalesLogix/Views/TextEdit', ['Sage/Platform/Mobile/Edit'], function() {
    dojo.declare('Mobile.SalesLogix.Views.TextEdit', [Sage.Platform.Mobile.Edit], {
        //View Properties
        id: 'text_edit',
        expose: false,
        titleText: 'Text',

        createLayout: function() {
            return this.layout || (this.layout = [{
                label: '',
                name: 'Notes',
                type: 'textarea'
            }]);
        }
    });
});