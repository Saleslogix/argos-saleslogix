describe("Activity", function() {

    describe("Edit View", function() {
        var view;

        beforeEach(function(){
            view = App.getView('activity_edit');

            spyOn(view, 'applyContext');

            view.setValues({
                'StartDate': (new Date(1295942400000)),
                'Timeless': false,
                'Alarm': true,
                'AlarmTime': (new Date(1295941500000)),
                "Rollover": false,
                'Duration': 30
            });
        });
        
        it("must disable duration for timeless activity", function(){
            view.fields['Timeless'].setValue(true);
            // invoke callback manually
            view.onTimelessChange(true, view.fields['Timeless']);

            expect(view.fields['Duration'].isDisabled()).toBeTruthy();

            view.fields['Timeless'].setValue(false);
            // invoke callback manually
            view.onTimelessChange(false, view.fields['Timeless']);

            expect(view.fields['Duration'].isDisabled()).toBeFalsy();
        });

        it("must enable rollover for timeless activity", function(){
            view.fields['Timeless'].setValue(true);
            // invoke callback manually
            view.onTimelessChange(true, view.fields['Timeless']);
            expect(view.fields['Rollover'].isDisabled()).toBeFalsy();

            view.fields['Timeless'].setValue(false);
            // invoke callback manually
            view.onTimelessChange(false, view.fields['Timeless']);
            expect(view.fields['Rollover'].isDisabled()).toBeTruthy();
        });

        it("must enable reminder if alarm is enabled", function(){
            view.fields['Alarm'].setValue(true);
            // invoke callback manually
            view.onAlarmChange(true, view.fields['Alarm']);
            expect(view.fields['Reminder'].isDisabled()).toBeFalsy();

            view.fields['Alarm'].setValue(false);
            // invoke callback manually
            view.onAlarmChange(false, view.fields['Alarm']);
            expect(view.fields['Reminder'].isDisabled()).toBeTruthy();
        });

        /// #1-79035
        it("must show text value in disabled fields", function() {
            view.fields['Duration'].disable();
            view.fields['Reminder'].disable();

            expect(view.fields['Duration'].isDisabled()).toBeTruthy();
            expect(view.fields['Reminder'].isDisabled()).toBeTruthy();
            expect(view.fields['Duration'].getText()).toEqual('30 minutes');
            expect(view.fields['Reminder'].getText()).toEqual('15 minutes');
        });

        it("must have AlarmTime set if Reminder is dirty", function() {
            view.fields['Reminder'].setValue(30);
            view.fields['Alarm'].setValue(true);
            // invoke callback manually
            view.onAlarmChange(false, view.fields['Alarm']);

            var values = view.getValues();

            expect(values).not.toBeFalsy();
            expect(values['AlarmTime']).toBeDefined();
        });

        it("must validate regarding, priority and category text for 64 char length", function() {
            var description = view.fields['Description'],
                priority = view.fields['Priority'],
                category = view.fields['Category'];

            description.setValue('Breakfast Meeting');
            expect(description.validate()).toBeFalsy();

            description.setValue('12345678901234567890123456789012345678901234567890123456789012345');
            expect(description.validate()).not.toBeFalsy();

            priority.setValue('High');
            expect(priority.validate()).toBeFalsy();

            priority.setValue('12345678901234567890123456789012345678901234567890123456789012345');
            expect(priority.validate()).not.toBeFalsy();

            category.setValue('Training');
            expect(category.validate()).toBeFalsy();

            category.setValue('12345678901234567890123456789012345678901234567890123456789012345');
            expect(category.validate()).not.toBeFalsy();
        });
    });
});