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

        it("must set Duration to false for Timeless activity", function() {
            view.fields['Timeless'].setValue(true);
            // invoke callback manually
            view.onTimelessChange(true, view.fields['Timeless']);

            var values = view.getValues();

            expect(values['Duration']).toBeDefined();
            expect(values['Duration']).toBeFalsy();
        });

        it("must set Rollover to false for Timed activity", function() {
            view.fields['Timeless'].setValue(false);
            view.fields['Rollover'].setValue(true);
            // invoke callback manually
            view.onTimelessChange(true, view.fields['Timeless']);

            var values = view.getValues();

            expect(values['Rollover']).toBeDefined();
            expect(values['Rollover']).toBeFalsy();
        });

        it("must set AlarmTime to StartDate if Alarm is not set", function() {
            view.fields['Alarm'].setValue(false);
            // invoke callback manually
            view.onAlarmChange(false, view.fields['Alarm']);

            var values = view.getValues();

            expect(values['AlarmTime']).toEqual(view.fields['StartDate'].getValue());
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

    });
});