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

        /// Defects: #1-79329
        it("must validate 'address 1' field for maximum input of 64 chars", function() {
            var view = App.getView('address_edit');

            view.fields['Address1'].setValue('12345678901234567890123456789012345678901234567890123456789012345');
            errors = view.validate();
            expect(errors).not.toBeFalsy();
            expect(errors).toContainError({
                'name': 'Address1',
                'message': "The field 'address 1' value exceeds the allowed limit in length."
            });
        });

        /// Defects: #1-79329
        it("must validate 'address 2' field for maximum input of 64 chars", function() {
            var view = App.getView('address_edit');

            view.fields['Address2'].setValue('12345678901234567890123456789012345678901234567890123456789012345');
            errors = view.validate();
            expect(errors).not.toBeFalsy();
            expect(errors).toContainError({
                'name': 'Address2',
                'message': "The field 'address 2' value exceeds the allowed limit in length."
            });
        });

        /// Defects: #1-79329
        it("must validate 'address 3' field for maximum input of 64 chars", function() {
            var view = App.getView('address_edit');

            view.fields['Address3'].setValue('12345678901234567890123456789012345678901234567890123456789012345');
            errors = view.validate();
            expect(errors).not.toBeFalsy();
            expect(errors).toContainError({
                'name': 'Address3',
                'message': "The field 'address 3' value exceeds the allowed limit in length."
            });
        });

        /// Defects: #1-79329
        it("must validate 'attention' field for maximum input of 64 chars", function() {
            var view = App.getView('address_edit');

            view.fields['Salutation'].setValue('12345678901234567890123456789012345678901234567890123456789012345');
            errors = view.validate();
            expect(errors).not.toBeFalsy();
            expect(errors).toContainError({
                'name': 'Salutation',
                'message': "The field 'attention' value exceeds the allowed limit in length."
            });
        });

        /// Defects: #1-79329
        it("must validate 'city' field for maximum input of 32 chars", function() {
            var view = App.getView('address_edit');

            view.fields['City'].setValue('123456789012345678901234567890123');
            errors = view.validate();
            expect(errors).not.toBeFalsy();
            expect(errors).toContainError({
                'name': 'City',
                'message': "The field 'city' value exceeds the allowed limit in length."
            });
        });

        /// Defects: #1-79329
        it("must validate 'state' field for maximum input of 32 chars", function() {
            var view = App.getView('address_edit');

            view.fields['State'].setValue('123456789012345678901234567890123');
            errors = view.validate();
            expect(errors).not.toBeFalsy();
            expect(errors).toContainError({
                'name': 'State',
                'message': "The field 'state' value exceeds the allowed limit in length."
            });
        });

        /// Defects: #1-79329
        it("must validate 'country' field  for maximum input of 32 chars", function() {
            var view = App.getView('address_edit');

            view.fields['Country'].setValue('123456789012345678901234567890123');
            errors = view.validate();
            expect(errors).not.toBeFalsy();
            expect(errors).toContainError({
                'name': 'Country',
                'message': "The field 'country' value exceeds the allowed limit in length."
            });
        });

        /// Defects: #1-79329
        it("must validate 'postal' field  for maximum input of 24 chars", function() {
            var view = App.getView('address_edit');

            view.fields['PostalCode'].setValue('123456789012345678901234567890123');
            errors = view.validate();
            expect(errors).not.toBeFalsy();
            expect(errors).toContainError({
                'name': 'PostalCode',
                'message': "The field 'postal' value exceeds the allowed limit in length."
            });
        });
    });
});