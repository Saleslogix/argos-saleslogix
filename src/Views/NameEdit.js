define('Mobile/SalesLogix/Views/NameEdit', ['Sage/Platform/Mobile/Edit'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.NameEdit', [Sage.Platform.Mobile.Edit], {
        //Localization
        firstNameText: 'first',
        middleNameText: 'middle',
        lastNameText: 'last',
        prefixText: 'prefix',
        prefixTitleText: 'Name Prefix',
        suffixText: 'suffix',
        suffixTitleText: 'Name Suffix',

        //View Properties
        id: 'name_edit',

        constructor: function(o) {
            dojo.mixin(this, o, {
                expose: false
            });

            this.layout = [
                {
                    emptyText: '',
                    label: this.prefixText,
                    name: 'Prefix',
                    picklist: 'Name Prefix',
                    requireSelection: true,
                    title: this.prefixTitleText,
                    type: 'picklist'
                },
                {
                    name: 'FirstName',
                    label: this.firstNameText,
                    type: 'text',
                    maxTextLength: 32,
                    validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
                },
                {
                    name: 'MiddleName',
                    label: this.middleNameText,
                    type: 'text',
                    maxTextLength: 32,
                    validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
                },
                {
                    name: 'LastName',
                    label: this.lastNameText,
                    type: 'text',
                    maxTextLength: 32,
                    validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
                },
                {
                    emptyText: '',
                    label: this.suffixText,
                    name: 'Suffix',
                    picklist: 'Name Suffix',
                    requireSelection: true,
                    title: this.suffixTitleText,
                    type: 'picklist'
                }
            ];
        }
    });
});