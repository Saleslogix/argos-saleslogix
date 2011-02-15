describe("Address", function() {
    ///TODO: Make this test simpler
    describe("Edit View", function() {
        beforeEach(function(){
            this.addMatchers({
                toContainError: JASMINE_SLX_MATCHERS.toContainError
            });
        });

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

        /// Defects: #1-79329
        it("must validate address field's 'description' for 64 char length", function() {
            var view = App.getView('address_edit'),
                errors = view.validate();

            view.fields['Description'].setValue('');
            expect(errors).not.toBeFalsy();
            expect(errors).toContainError({
                'name': 'Description',
                'message': "The field 'description' must have a value."
            });

            view.fields['Description'].setValue('Office');
            errors = view.validate();
            expect(errors).toBeFalsy();

            view.fields['Description'].setValue('12345678901234567890123456789012345678901234567890123456789012345');
            errors = view.validate();
            expect(errors).not.toBeFalsy();
            expect(errors).toContainError({
                'name': 'Description',
                'message': "The field 'description' value exceeds the allowed limit in length."
            });
        });

    });
});