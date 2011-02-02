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
});