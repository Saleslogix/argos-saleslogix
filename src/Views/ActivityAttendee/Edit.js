/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.Views.ActivityAttendee.Edit
 *
 * @extends Sage.Platform.Mobile.Edit
 *
 * @requires Sage.Platform.Mobile.Edit
 *
 * @requires Mobile.SalesLogix.Format
 * @requires Mobile.SalesLogix.Validator
 *
 */
define('Mobile/SalesLogix/Views/ActivityAttendee/Edit', [
    'dojo/_base/declare',
    'dojo/string',
    'Mobile/SalesLogix/Format',
    'Mobile/SalesLogix/Validator',
    'Sage/Platform/Mobile/Edit'
], function(
    declare,
    string,
    format,
    validator,
    Edit
) {
    return declare('Mobile.SalesLogix.Views.ActivityAttendee.Edit', [Edit], {
        //Localization
        isPrimaryText: 'isPrimnay',
        rolewText: 'role',
        typeText: 'type',
       
        //View Properties
        id: 'activity-attendee_edit',

        init: function() {
            this.inherited(arguments);
            //this.connect(this.fields['Country'], 'onChange', this.onCountryChange);
        },
        createLayout: function() {
            return this.layout || (this.layout = [{
                    name: 'EntityId',
                    property: 'EntityId',
                    type: 'hidden'
                }, {
                    label: this.descriptionText,
                    name: 'Description',
                    property: 'Description',
                    requireSelection: false,
                    type: 'text',
                    maxTextLength: 64,
                    validator: [
                        validator.exists,
                        validator.exceedsMaxTextLength
                    ]
                }, {
                    name: 'IsPrimary',
                    property: 'IsPrimary',
                    label: this.isPrimaryText,
                    type: 'boolean'
                }, {
                    name: 'IsAttendee',
                    property: 'IsAttendee',
                    label: this.isAttendeeText,
                    type: 'boolean'
                }, {
                    name: 'Type',
                    property: 'Type',
                    label: this.typeText,
                    type: 'text',
                    maxTextLength: 64,
                    validator: validator.exceedsMaxTextLength
                }, {
                    name: 'Name',
                    property: 'Name',
                    label: this.nameText,
                    type: 'text',
                    maxTextLength: 64,
                    validator: validator.exceedsMaxTextLength
                }, {
                    name: 'AccountName',
                    property: 'AccountName',
                    label: this.accountName,
                    type: 'text',
                    maxTextLength: 64,
                    validator: validator.exceedsMaxTextLength
                }, {
                    name: 'Company',
                    property: 'Company',
                    label: this.companyText,
                    type: 'text',
                    maxTextLength: 64,
                    validator: validator.exceedsMaxTextLength
                }, {
                    name: 'PhonNumber',
                    property: 'PhoneNumber',
                    label: this.phoneNumberText,
                    type: 'text',
                    maxTextLength: 24,
                    validator: validator.exceedsMaxTextLength
                }]);
        }
    });
});

