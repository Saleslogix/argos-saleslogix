/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

define('Mobile/SalesLogix/Views/Address/Edit', ['Sage/Platform/Mobile/Edit'], function() {
    return dojo.declare('Mobile.SalesLogix.Views.Address.Edit', [Sage.Platform.Mobile.Edit], {
        //Localization
        address1Text: 'address 1',
        address2Text: 'address 2',
        address3Text: 'address 3',
        cityText: 'city',
        cityTitleText: 'City',
        countryText: 'country',
        countryTitleText: 'Country',
        descriptionText: 'description',
        descriptionTitleText: 'Description',
        isMailingText: 'shipping',
        isPrimaryText: 'primary',
        postalCodeText: 'postal',
        salutationText: 'attention',
        stateText: 'state',
        stateTitleText: 'State',
        titleText: 'Address',

        //View Properties
        id: 'address_edit',

        formatDependentPicklist: function(format) {
            return dojo.string.substitute(format, [this.options.entityName]);
        },
        createLayout: function() {
            return this.layout || (this.layout = [{
                name: 'EntityId',
                property: 'EntityId',
                type: 'hidden'
            },
            {
                label: this.descriptionText,
                name: 'Description',
                property: 'Description',
                picklist: this.formatDependentPicklist.bindDelegate(
                    this, 'Address Description (${0})', true
                ),
                requireSelection: false,
                title: this.descriptionTitleText,
                type: 'picklist',
                maxTextLength: 64,
                validator: [
                    Mobile.SalesLogix.Validator.exists,
                    Mobile.SalesLogix.Validator.exceedsMaxTextLength
                ]
            },
            {
                name: 'IsPrimary',
                property: 'IsPrimary',
                label: this.isPrimaryText,
                type: 'boolean'
            },
            {
                name: 'IsMailing',
                property: 'IsMailing',
                label: this.isMailingText,
                type: 'boolean'
            },
            {
                name: 'Address1',
                property: 'Address1',
                label: this.address1Text,
                type: 'text',
                maxTextLength: 64,
                validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
            },
            {
                name: 'Address2',
                property: 'Address2',
                label: this.address2Text,
                type: 'text',
                maxTextLength: 64,
                validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
            },
            {
                name: 'Address3',
                property: 'Address3',
                label: this.address3Text,
                type: 'text',
                maxTextLength: 64,
                validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
            },
            {
                label: this.cityText,
                name: 'City',
                property: 'City',
                picklist: 'City',
                requireSelection: false,
                title: this.cityTitleText,
                type: 'picklist',
                maxTextLength: 32,
                validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
            },
            {
                label: this.stateText,
                name: 'State',
                property: 'State',
                picklist: 'State',
                requireSelection: false,
                title: this.stateTitleText,
                type: 'picklist',
                maxTextLength: 32,
                validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
            },
            {
                name: 'PostalCode',
                property: 'PostalCode',
                label: this.postalCodeText,
                type: 'text',
                maxTextLength: 24,
                validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
            },
            {
                label: this.countryText,
                name: 'Country',
                property: 'Country',
                picklist: 'Country',
                requireSelection: false,
                title: this.countryTitleText,
                type: 'picklist',
                maxTextLength: 32,
                validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
            },
            {
                label: this.salutationText,
                name: 'Salutation',
                property: 'Salutation',
                type: 'text',
                maxTextLength: 64,
                validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
            }]);
        }
    });
});