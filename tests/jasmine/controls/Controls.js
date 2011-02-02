describe("Controls", function() {
    it("Select Field must return proper value when enabled/disabled", function() {
        Ext.DomHelper.append('ControlsTestContainer', {
            id: '_selectContainer',
            tag: 'div',
            style: 'display: none'
        });
        
        var selectField = new Sage.Platform.Mobile.Controls.SelectField({
            label: 'select',
            type: 'select',
            view: 'select_list',
            data: [{
                '$key': 'one',
                '$descriptor': 1
            }]
        });

        selectField.renderTo(Ext.get('_selectContainer'));

        selectField.setValue('one');
        selectField.disable();
        expect(selectField.getValue()).toEqual('one');

        selectField.setValue('two');
        selectField.enable();
        expect(selectField.getValue()).toEqual('two');
    });

    it("Boolean Field must return proper value when enabled/disabled", function() {
        Ext.DomHelper.append('ControlsTestContainer', {
            id: '_booleanContainer',
            tag: 'div',
            style: 'display: none'
        });
        
        var booleanField = new Sage.Platform.Mobile.Controls.BooleanField({
            label: 'bool',
            type: 'boolean'
        });

        booleanField.renderTo(Ext.get('_booleanContainer'));

        booleanField.setValue(true);
        booleanField.disable();
        expect(booleanField.getValue()).toBeTruthy();

        booleanField.setValue(false);
        booleanField.enable();
        expect(booleanField.getValue()).toBeFalsy();
    });

    /// Defects: #1-79128
    it("Date Field must return error on inavlid date strings", function() {
        Ext.DomHelper.append('ControlsTestContainer', {
            id: '_dateContainer',
            tag: 'div',
            style: 'display: none'
        });

        var dateField = new Sage.Platform.Mobile.Controls.DateField({
                label: 'start date',
                name: 'StartDate',
                type: 'date',
                showTimePicker: true,
                formatString: 'M/d/yyyy h:mm tt',
            }),
            error;

        dateField.renderTo(Ext.get('_dateContainer'));

        dateField.setText('13/13/2011');
        //Trigger onChange manually
        dateField.onChange({}, dateField.el.dom, {});
        error = dateField.validate();
        expect(error).toEqual("Field 'start date' has Invalid date format.");

        dateField.setText('12/12/2011');
        //Trigger onChange manually
        dateField.onChange({}, dateField.el.dom, {});

        error = dateField.validate();
        expect(error).toBeFalsy();
    });

});