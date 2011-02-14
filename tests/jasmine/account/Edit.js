describe("Account", function() {

    describe("Edit View", function() {
        var view;

        beforeEach(function(){
            this.addMatchers({
                toContainError: JASMINE_SLX_MATCHERS.toContainError
            });

            view = App.getView('account_edit');
        });

        /// #1-79322
        it("must validate industry field's text for 64 char length", function() {
            var industry = view.fields['Industry'];

            industry.setValue('Advertising');
            expect(industry.validate()).toBeFalsy();

            industry.setValue('12345678901234567890123456789012345678901234567890123456789012345');
            expect(industry.validate()).not.toBeFalsy();
        });
    });
});