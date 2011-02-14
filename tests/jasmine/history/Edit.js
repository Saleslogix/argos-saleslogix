describe("History", function() {

    describe("Edit View", function() {
        var view;

        beforeEach(function(){
            this.addMatchers({
                toContainError: JASMINE_SLX_MATCHERS.toContainError
            });

            view = App.getView('history_edit');
        });

        /// #1-79323
        it("must validate priority and category field's text for 64 char length", function() {
            var priority = view.fields['Priority'],
                category = view.fields['Category'];

            priority.setValue('High');
            expect(priority.validate()).toBeFalsy();

            priority.setValue('12345678901234567890123456789012345678901234567890123456789012345');
            expect(priority.validate()).not.toBeFalsy();

            category.setValue('Sales');
            expect(category.validate()).toBeFalsy();

            category.setValue('12345678901234567890123456789012345678901234567890123456789012345');
            expect(category.validate()).not.toBeFalsy();
        });
    });
});