Ext.namespace("Mobile.SalesLogix");

Mobile.SalesLogix.NameEdit = Ext.extend(Sage.Platform.Mobile.Edit, {
    id: 'name_edit',
    prefixLabel: 'prefix',
    firstnameLabel: 'first',
    middlenameLabel: 'middle',
    lastnameLabel: 'last',
    suffixLabel: 'suffix',
    prefixTitleText: 'Name Prefix',
    suffixTitleText: 'Name Suffix',
    constructor: function(o) {
        Mobile.SalesLogix.NameEdit.superclass.constructor.call(this);

        Ext.apply(this, o, {
            expose: false
        });

        this.layout = [
            {
                name: 'Prefix',
                label: this.prefixLabel,
                type: 'picklist',
                requireSelection: true,
                picklist: 'Name Prefix',
                title: this.prefixTitleText
            },
            {
                name: 'FirstName',
                label: this.firstnameLabel,
                type: 'text'
            },
            {
                name: 'MiddleName',
                label: this.middlenameLabel,
                type: 'text'
            },
            {
                name: 'LastName',
                label: this.lastnameLabel,
                type: 'text'
            },
            {
                name: 'Suffix',
                label: this.suffixLabel,
                type: 'picklist',
                requireSelection: true,
                picklist: 'Name Suffix',
                title: this.suffixTitleText
            }
        ];
    }
});