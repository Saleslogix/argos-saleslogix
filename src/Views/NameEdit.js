/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/NameEdit', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'Mobile/SalesLogix/Validator',
    'Sage/Platform/Mobile/Edit'
], function(
    declare,
    lang,
    validator,
    Edit
) {

    return declare('Mobile.SalesLogix.Views.NameEdit', [Edit], {
        //Localization
        titleText: 'Edit Name',
        firstNameText: 'first',
        middleNameText: 'middle',
        lastNameText: 'last',
        prefixText: 'prefix',
        prefixTitleText: 'Name Prefix',
        suffixText: 'suffix',
        suffixTitleText: 'Name Suffix',

        //View Properties
        id: 'name_edit',

        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    emptyText: '',
                    label: this.prefixText,
                    name: 'Prefix',
                    property: 'Prefix',
                    picklist: 'Name Prefix',
                    requireSelection: true,
                    title: this.prefixTitleText,
                    type: 'picklist'
                },
                {
                    name: 'FirstName',
                    property: 'FirstName',
                    label: this.firstNameText,
                    type: 'text',
                    maxTextLength: 32,
                    validator: validator.exceedsMaxTextLength
                },
                {
                    name: 'MiddleName',
                    property: 'MiddleName',
                    label: this.middleNameText,
                    type: 'text',
                    maxTextLength: 32,
                    validator: validator.exceedsMaxTextLength
                },
                {
                    name: 'LastName',
                    property: 'LastName',
                    label: this.lastNameText,
                    type: 'text',
                    maxTextLength: 32,
                    validator: validator.exceedsMaxTextLength
                },
                {
                    emptyText: '',
                    label: this.suffixText,
                    name: 'Suffix',
                    property: 'Suffix',
                    picklist: 'Name Suffix',
                    requireSelection: true,
                    title: this.suffixTitleText,
                    type: 'picklist'
                }
            ]);
        }
    });
});

