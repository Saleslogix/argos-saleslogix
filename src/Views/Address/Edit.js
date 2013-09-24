/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/Address/Edit', [
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
    return declare('Mobile.SalesLogix.Views.Address.Edit', [Edit], {
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
        /**
         * Each locale key contains an array of field names to be hidden
         * Set to null to skip and leave all fields visible
         */
        localeFieldHidden: {
            "en-US": null,
            "en-GB": ['State'],
            "fr-FR": ['State'],
            "de-DE": ['State'],
            "it-IT": null,
            "ru-RU": ['State']
        },

        //View Properties
        id: 'address_edit',

        init: function() {
            this.inherited(arguments);
            this.connect(this.fields['Country'], 'onChange', this.onCountryChange);
        },
        onCountryChange: function(value, field) {
            var locale = format.countryCultures[value] || 'en-US';
            this.hideFieldsForLocale(locale);
        },
        /**
         * Hides from view the field names defined in localeFieldHidden for the given locale
         * Doing so enables a user to enter an address
         * @param locale Localization string (Ex: 'en-US' or 'de-DE')
         */
        hideFieldsForLocale: function(locale) {
            var fieldsToHide = this.localeFieldHidden[locale];
            if (!fieldsToHide) {
                return;
            }

            for (var i = 0; i < fieldsToHide.length; i++) {
                var field = this.fields[fieldsToHide[i]];
                if (field) {
                    field.hide();
                }
            }
        },
        formatDependentPicklist: function(format) {
            return string.substitute(format, [this.options.entityName]);
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
                    picklist: this.formatDependentPicklist.bindDelegate(
                        this, 'Address Description (${0})', true
                    ),
                    requireSelection: false,
                    title: this.descriptionTitleText,
                    type: 'picklist',
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
                    name: 'IsMailing',
                    property: 'IsMailing',
                    label: this.isMailingText,
                    type: 'boolean'
                }, {
                    name: 'Address1',
                    property: 'Address1',
                    label: this.address1Text,
                    type: 'text',
                    maxTextLength: 64,
                    validator: validator.exceedsMaxTextLength
                }, {
                    name: 'Address2',
                    property: 'Address2',
                    label: this.address2Text,
                    type: 'text',
                    maxTextLength: 64,
                    validator: validator.exceedsMaxTextLength
                }, {
                    name: 'Address3',
                    property: 'Address3',
                    label: this.address3Text,
                    type: 'text',
                    maxTextLength: 64,
                    validator: validator.exceedsMaxTextLength
                }, {
                    label: this.cityText,
                    name: 'City',
                    property: 'City',
                    picklist: 'City',
                    requireSelection: false,
                    title: this.cityTitleText,
                    type: 'picklist',
                    maxTextLength: 32,
                    validator: validator.exceedsMaxTextLength
                }, {
                    label: this.stateText,
                    name: 'State',
                    property: 'State',
                    picklist: 'State',
                    requireSelection: false,
                    title: this.stateTitleText,
                    type: 'picklist',
                    maxTextLength: 32,
                    validator: validator.exceedsMaxTextLength
                }, {
                    name: 'PostalCode',
                    property: 'PostalCode',
                    label: this.postalCodeText,
                    type: 'text',
                    maxTextLength: 24,
                    validator: validator.exceedsMaxTextLength
                }, {
                    label: this.countryText,
                    name: 'Country',
                    property: 'Country',
                    picklist: 'Country',
                    requireSelection: false,
                    title: this.countryTitleText,
                    type: 'picklist',
                    maxTextLength: 64,
                    validator: validator.exceedsMaxTextLength
                }, {
                    label: this.salutationText,
                    name: 'Salutation',
                    property: 'Salutation',
                    type: 'text',
                    maxTextLength: 64,
                    validator: validator.exceedsMaxTextLength
                }]);
        }
    });
});

