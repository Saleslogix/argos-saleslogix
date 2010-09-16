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
            {name: 'Address.IsPrimary', label: this.isPrimaryText, type: 'boolean'},
            {name: 'Address.IsMailing', label: this.isMailingText, type: 'boolean'},
            {name: 'Address.Address1', label: this.address1Text, type: 'text'},
            {name: 'Address.Address2', label: this.address2Text, type: 'text'},
            {name: 'Address.Address3', label: this.address3Text, type: 'text'},
            {name: 'Address.City', label: this.cityText, type: 'pickup', view: 'pick_list', resourcePredicate: 'name eq "City"', title: 'City'},
            {name: 'Address.State', label: this.stateText, type: 'pickup', view: 'pick_list', resourcePredicate: 'name eq "State"', title: 'State'},
            {name: 'Address.PostalCode', label: this.postalCodeText, type: 'text'},
            {name: 'Address.Country', label: this.countryText, type: 'pickup', view: 'pick_list', resourcePredicate: 'name eq "Country"', title: 'Country'}
        ];
    }
});
