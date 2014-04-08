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
        titleText: 'Edit Attendee',
        isPrimaryText: 'is primnay',
        isAttendeeText: 'is attendee',
        roleNameText: 'role',
        typeText: 'type',
        nameText: 'name',
        accountNameText: 'account name',
        companyText: 'company',
        phoneNumberText: 'phone',
        emailText: 'email',
        timeZoneText: 'time zone',
        //View Properties
        id: 'activity_attendee_edit',
        detailView: 'activity_detail',
        entityName: 'ActivityAttendee',
        contractName: 'dynamic',
        resourceKind: 'activityAttendees',
        querySelect: ['EntityType',
                       'Description',
                       'ModifyDate',
                       'EntityId',
                       'IsPrimary',
                       'IsAttendee',
                       'RoleName',
                       'Name',
                       'AccountId',
                       'AccountName',
                       'Comppany',
                       'PhoneNumber',
                       'Email',
                       'TimeZone'
        ],
        init: function() {
            this.inherited(arguments);
            //this.connect(this.fields['Country'], 'onChange', this.onCountryChange);
        },
        setValues: function(values) {
            this.inherited(arguments);
            if (values['EntityType'] === 'Contact') {
                this.fields['AccountName'].show();
                this.fields['Company'].hide();
            } else {
                this.fields['AccountName'].hide();
                this.fields['Company'].show();
            }
            this.fields['AccountName'].disable();
            this.fields['IsPrimary'].disable();
            this.fields['EntityType'].disable();
            this.fields['Name'].disable();
            this.fields['TimeZone'].disable();
            this.fields['PhonNumber'].disable();
            this.fields['Email'].disable();
        },
        createLayout: function() {
            return this.layout || (this.layout = [{
                    name: 'EntityId',
                    property: 'EntityId',
                    type: 'hidden'
                },{
                    name: 'AccountId',
                    property: 'AccountId',
                    type: 'hidden'
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
                },{
                    label: this.roleNameText,
                    name: 'RoleName',
                    property: 'RoleName',
                    picklist: 'Attendee Role',
                    title: this.roleNameTitleText,
                    type: 'picklist',
                    maxTextLength: 64,
                    validator: validator.exceedsMaxTextLength
                }, {
                    name: 'EntityType',
                    property: 'EntityType',
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
                    label: this.accountNameText,
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
                },{
                   name: 'Email',
                   property: 'Eamil',
                   label: this.emailText,
                   type: 'text',
                   maxTextLength: 128,
                   validator: validator.exceedsMaxTextLength
                }, {
                    name: 'TimeZone',
                    property: 'TimeZone',
                    label: this.timeZoneText,
                    type: 'text',
                    maxTextLength: 64,
                    validator: validator.exceedsMaxTextLength
                }]);
        }
    });
});

