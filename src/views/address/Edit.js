/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Address");

(function() {
    Mobile.SalesLogix.Address.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
        id: 'address_edit',
        titleText: 'Address',
        descriptionText: 'description',
        isPrimaryText: 'primary',
        isMailingText: 'shipping',
        address1Text: 'address 1',
        address2Text: 'address 2',
        address3Text: 'address 3',
        cityText: 'city',
        stateText: 'state',
        postalCodeText: 'postal',
        countryText: 'country',
        salutationText: 'attention',
        cityTitleText: 'City',
        stateTitleText: 'State',
        countryTitleText: 'Country',
        descriptionTitleText: 'Description',
        formatDependentPicklist: function(dependentValue, format) {
            return String.format(format, dependentValue, this.options.entityName);
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {name: 'Description', label: this.descriptionText, type: 'picklist', picklist: this.formatDependentPicklist.createDelegate(this, ['Address Description ({1})'], true), requireSelection: false, title: this.descriptionTitleText},
                {name: 'IsPrimary', label: this.isPrimaryText, type: 'boolean'},
                {name: 'IsMailing', label: this.isMailingText, type: 'boolean'},
                {name: 'Address1', label: this.address1Text, type: 'text'},
                {name: 'Address2', label: this.address2Text, type: 'text'},
                {name: 'Address3', label: this.address3Text, type: 'text'},
                {name: 'City', label: this.cityText, type: 'picklist', picklist: 'City', requireSelection: false, title: this.cityTitleText},
                {name: 'State', label: this.stateText, type: 'picklist', picklist: 'State', requireSelection: false, title: this.stateTitleText},
                {name: 'PostalCode', label: this.postalCodeText, type: 'text'},
                {name: 'Country', label: this.countryText, type: 'picklist', picklist: 'Country', requireSelection: false, title: this.countryText},
                {name: 'Salutation', label: this.salutationText, type: 'text'},
                {name: 'EntityId', type: 'hidden', alwaysUseValue: true}
            ]);
        }
    });
})();
