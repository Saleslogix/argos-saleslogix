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

        it("must check date field's value is after 01 Jan, 1900", function() {
            var startDateFld = view.fields['StartDate'],
                completedDateFld = view.fields['CompletedDate'],
                date1 = new Date(),
                date2 = new Date();
            
            date1.setYear(1900);
            date1.setMonth(0);
            date1.setDate(1);
            startDateFld.setValue(date1);
            expect(startDateFld.validate()).toBeFalsy();
            completedDateFld.setValue(date1);
            expect(completedDateFld.validate()).toBeFalsy();

            date2.setYear(1899);
            date2.setMonth(11);
            date2.setDate(31);
            startDateFld.setValue(date2);
            expect(startDateFld.validate()).not.toBeFalsy();
            completedDateFld.setValue(date2);
            expect(completedDateFld.validate()).not.toBeFalsy();
        });   
    });
});