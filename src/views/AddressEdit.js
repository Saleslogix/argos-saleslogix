Ext.namespace("Mobile.SalesLogix");

Mobile.SalesLogix.AddressEdit = Ext.extend(Sage.Platform.Mobile.Edit, {
    isPrimaryText: 'primary',
    isMailingText: 'shipping',
    address1Text: 'address 1',
    address2Text: 'address 2',
    address3Text: 'address 3',
    cityText: 'city',
    stateText: 'state',
    postalCodeText: 'postal',
    countryText: 'country',
    constructor: function(o) {
        Mobile.SalesLogix.AddressEdit.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'address_edit',
            expose: false
        });

        this.layout = [
            {name: 'IsPrimary', label: this.isPrimaryText, type: 'boolean', alwaysUseValue: true},
            {name: 'IsMailing', label: this.isMailingText, type: 'boolean', alwaysUseValue: true},
            {name: 'Address1', label: this.address1Text, type: 'text', alwaysUseValue: true},
            {name: 'Address2', label: this.address2Text, type: 'text', alwaysUseValue: true},
            {name: 'Address3', label: this.address3Text, type: 'text', alwaysUseValue: true},
            {name: 'City', label: this.cityText, type: 'pickup', view: 'add_city_pick_list', resourcePredicate: 'name eq "City"', title: 'City', alwaysUseValue: true},
            {name: 'State', label: this.stateText, type: 'pickup', view: 'add_state_pick_list', resourcePredicate: 'name eq "State"', title: 'State', alwaysUseValue: true},
            {name: 'PostalCode', label: this.postalCodeText, type: 'text', alwaysUseValue: true},
            {name: 'Country', label: this.countryText, type: 'pickup', view: 'add_country_pick_list', resourcePredicate: 'name eq "Country"', title: 'Country', alwaysUseValue: true},
            {name: 'Description', type: 'hidden'},
            {name: 'EntityId', type: 'hidden'}
        ];
    }
});
