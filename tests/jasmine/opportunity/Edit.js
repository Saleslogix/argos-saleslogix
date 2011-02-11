describe("Opportunity", function() {

    describe("Edit View", function() {
        var view;

        beforeEach(function(){
            this.addMatchers({
                toContainError: JASMINE_SLX_MATCHERS.toContainError
            });
            view = App.getView('opportunity_edit');

            spyOn(view, 'applyContext');
        });
        
        it("must validate for mandatory fields 'opportunity' and 'account'", function() {
            var errors = view.validate();

            expect(errors).not.toBeFalsy();
            expect(errors.length).toEqual(6);
            expect(errors).toContainError({
                'name': 'Account',
                'message': "The field 'acct' must have a value."
            });
            expect(errors).toContainError({
                'name': 'Description',
                'message': "The field 'opportunity' must contain some text."
            });
            expect(errors).toContainError({
                'name': 'EstimatedClose',
                'message': "The field 'est close' must have a value."
            });
            expect(errors).toContainError({
                'name': 'SalesPotential',
                'message': "The value '' is not a valid currency number."
            });
            expect(errors).toContainError({
                'name': 'Owner',
                'message': "The field 'owner' must have a value."
            });
            expect(errors).toContainError({
                'name': 'CloseProbability',
                'message': "The value 'null' is not a valid number."
            });
        });

        it("must validate 'CloseProbability' for number", function() {
            var closeProbability = view.fields['CloseProbability'];

            closeProbability.setValue('1');
            expect(closeProbability.validate()).toBeFalsy();

            closeProbability.setValue('a');
            expect(closeProbability.validate()).not.toBeFalsy();

            closeProbability.setValue('12.1');
            expect(closeProbability.validate()).not.toBeFalsy();
        });
    });
});