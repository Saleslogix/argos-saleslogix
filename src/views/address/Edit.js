/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Address");

(function() {
    Mobile.SalesLogix.Address.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
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
            return String.format(format, this.options.entityName);
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    name: 'EntityId',
                    type: 'hidden'
                },
                {
                    label: this.descriptionText,
                    name: 'Description',
                    picklist: this.formatDependentPicklist.createDelegate(
                        this, ['Address Description ({0})'], true
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
                    label: this.isPrimaryText,
                    type: 'boolean'
                },
                {
                    name: 'IsMailing',
                    label: this.isMailingText,
                    type: 'boolean'
                },
                {
                    name: 'Address1',
                    label: this.address1Text,
                    type: 'text'
                },
                {
                    name: 'Address2',
                    label: this.address2Text,
                    type: 'text'
                },
                {
                    name: 'Address3',
                    label: this.address3Text,
                    type: 'text'
                },
                {
                    label: this.cityText,
                    name: 'City',
                    picklist: 'City',
                    requireSelection: false,
                    title: this.cityTitleText,
                    type: 'picklist'
                },
                {
                    label: this.stateText,
                    name: 'State',
                    picklist: 'State',
                    requireSelection: false,
                    title: this.stateTitleText,
                    type: 'picklist'
                },
                {
                    name: 'PostalCode',
                    label: this.postalCodeText,
                    type: 'text'
                },
                {
                    label: this.countryText,
                    name: 'Country',
                    picklist: 'Country',
                    requireSelection: false,
                    title: this.countryTitleText,
                    type: 'picklist'
                },
                {
                    name: 'Salutation',
                    label: this.salutationText,
                    type: 'text'
                }
            ]);
        }
    });
})();