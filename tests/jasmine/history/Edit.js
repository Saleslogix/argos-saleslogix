describe("History", function() {

    describe("Edit View", function() {
        var view;

        beforeEach(function(){
            this.addMatchers({
                toContainError: JASMINE_SLX_MATCHERS.toContainError
            });

            view = App.getView('history_edit');
        });
        
        /// Defects: #1-79238
        it("Completed Date must either be greater then Start Date or empty", function() {
            view.setValues({
                'StartDate': (new Date())
            });

            var errors = view.validate();
            expect(errors).toBeFalsy();

            view.setValues({
                'StartDate': (new Date()),
                'CompletedDate': (new Date()).addMinutes(-1)
            });

            errors = view.validate();
            expect(errors).not.toBeFalsy();
            expect(errors.length).toEqual(1);
            expect(errors).toContainError({
                'name': 'StartDate',
                'message': "scheduled time must preceed completed time"
            });

            view.setValues({
                'CompletedDate': (new Date())
            });

            errors = view.validate();
            expect(errors).toBeFalsy();
        });
    });
});