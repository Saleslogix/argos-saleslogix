describe("Lead", function() {

    describe("Edit View", function() {
        var view;

        beforeEach(function(){
            this.addMatchers({
                toContainError: JASMINE_SLX_MATCHERS.toContainError
            });
            view = App.getView('lead_edit');

            spyOn(view, 'applyContext');
        });
        
        it("must validate for mandatory fields 'name' and 'lead source'", function() {
            var errors = view.validate();

            expect(errors).not.toBeFalsy();
            expect(errors.length).toEqual(2);
            expect(errors).toContainError({
                'name': 'LeadNameLastFirst',
                'message': "The field 'name' must have a first and last name specified."
            });
            expect(errors).toContainError({
                'name': 'LeadSource',
                'message': "The field 'lead source' must have a value."
            });
        });

        /// Defects: #1-78666		
        it("must validate phone field for maximum input of 32 chars", function() {
            view.setValues({
                'FirstName': 'John',
                'LastName': 'Abbot',
                'MiddleName': '',
                'Prefix': '',
                'Suffix': '',
                'LeadSource': {
                    '$key': 'email',
                    '$descriptor': 'E-Mail'
                },
                'WorkPhone': '123456789012345678901234567890123',
                'TollFree': '123456789012345678901234567890123'
            });
            
            var errors = view.validate();

            expect(errors).not.toBeFalsy();
            expect(errors.length).toEqual(2);
            expect(errors).toContainError({
                'name': 'WorkPhone',
                'message': "The field 'phone' value exceeds the allowed limit in length."
            });
            expect(errors).toContainError({
                'name': 'TollFree',
                'message': "The field 'toll free' value exceeds the allowed limit in length."
            });
        });

        it("must validate title and industry fields for maximum input of 64 chars", function() {
            view.setValues({
                'FirstName': 'John',
                'LastName': 'Abbot',
                'MiddleName': '',
                'Prefix': '',
                'Suffix': '',
                'LeadSource': {
                    '$key': 'email',
                    '$descriptor': 'E-Mail'
                },
                'WorkPhone': '1234567890',
                'TollFree': '1234567890'
                'Title': '12345678901234567890123456789012345678901234567890123456789012345',
                'Industry': '12345678901234567890123456789012345678901234567890123456789012345'
            });

            var errors = view.validate();

            expect(errors).not.toBeFalsy();
            expect(errors.length).toEqual(2);
            expect(errors).toContainError({
                'name': 'Title',
                'message': "The field 'title' value exceeds the allowed limit in length."
            });
            expect(errors).toContainError({
                'name': 'Industry',
                'message': "The field 'industry' value exceeds the allowed limit in length."
            });
        });
    });
});