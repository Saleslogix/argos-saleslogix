describe("Address", function() {
    ///TODO: Make this test simpler
    describe("Edit View", function() {
        /// Defects: #1-79128
        it("must use entityName from parent view for 'Description' picklist", function() {
            var addressFld1 = new Sage.Platform.Mobile.Controls.AddressField(
                Ext.apply({
                    owner: App.getView('account_edit')
                },
                {
                    emptyText: '',
                    formatValue: Mobile.SalesLogix.Format.address,
                    label: 'address',
                    name: 'Address',
                    type: 'address',
                    view: 'address_edit'
                })
            );

            var addressFld2 = new Sage.Platform.Mobile.Controls.AddressField(
                Ext.apply({
                    owner: App.getView('contact_edit')
                },
                {
                    emptyText: '',
                    formatValue: Mobile.SalesLogix.Format.address,
                    label: 'address',
                    name: 'Address',
                    type: 'address',
                    view: 'address_edit'
                })
            );

            addressFld1.navigateToEditView();
            expect(App.getView('address_edit').fields['Description'].picklist()).toEqual("Address Description (Account)");
            
            addressFld2.navigateToEditView();
            expect(App.getView('address_edit').fields['Description'].picklist()).toEqual("Address Description (Contact)");
        });

        /// Defects: #1-79128
        it("must use address field's 'entityName' property if one provided for 'Description' picklist", function() {
            var addressFld = new Sage.Platform.Mobile.Controls.AddressField(
                Ext.apply({
                    owner: App.getView('account_edit')
                },
                {
                    emptyText: '',
                    formatValue: Mobile.SalesLogix.Format.address,
                    label: 'address',
                    name: 'Address',
                    type: 'address',
                    view: 'address_edit',
                    entityName: 'Contact'
                })
            );
            addressFld.navigateToEditView();
            expect(App.getView('address_edit').fields['Description'].picklist()).toEqual("Address Description (Contact)");
        });

    });
});