describe("Activity", function() {

    describe("Complete View", function() {
        var view;
        beforeEach(function(){
            view = App.getView('activity_complete');

            view.setValues({
                'StartDate': (new Date(2010, 0, 1)),
                'Timeless': false,
                'AsScheduled': false,
                'Followup': 'none',
                'Duration': 30,
                'CarryOverNotes': false
            });
        });

        it("must set completedDate to StartDate and disabled if 'as scheduled' is true", function(){
            view.fields['AsScheduled'].setValue(true);
            // invoke callback manually
            view.onAsScheduledChange(true, view.fields['AsScheduled']);

            expect(view.fields['CompletedDate'].isDisabled()).toBeTruthy();
            expect(view.fields['CompletedDate'].getValue()).toEqual(new Date(2010, 0, 1));
        });

        it("must set completedDate to current time and enabled if 'as scheduled' is false", function(){
            view.fields['AsScheduled'].setValue(false);
            // invoke callback manually
            view.onAsScheduledChange(false, view.fields['AsScheduled']);

            expect(view.fields['CompletedDate'].isDisabled()).toBeFalsy();
            var completedDate = view.fields['CompletedDate'].getValue(),
                currentDate = new Date();

            expect(completedDate.getDate()).toEqual(currentDate.getDate());
            expect(completedDate.getMonth()).toEqual(currentDate.getMonth());
            expect(completedDate.getYear()).toEqual(currentDate.getYear());
        });

        it("must disable carryover notes if follow up is not set", function(){
            view.fields['Followup'].setValue('none');
            // invoke callback manually
            view.onFollowupChange('none', view.fields['Followup']);
            expect(view.fields['CarryOverNotes'].isDisabled()).toBeTruthy();
        });

        it("must enable carryover notes if follow up is set", function(){
            view.fields['Followup'].setValue('atToDo');
            // invoke callback manually
            view.onFollowupChange('atToDo', view.fields['atToDo']);
            expect(view.fields['CarryOverNotes'].isDisabled()).toBeFalsy();
        });
    });
});
