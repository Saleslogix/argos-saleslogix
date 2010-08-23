var phoneField;

module("PhoneField", {
    setup: function() {
        S.open(Saleslogix.URL, function(){
            var win = FuncUnit._window;
            var config = {
                name:"homePhone"
            };

            phoneField = new win.Sage.Platform.Mobile.Controls.PhoneField(config);
            try {
                win.Ext.get('controls').remove();
            }
            catch (e) {}
            S.wait(1000, function() {
                win.Ext.DomHelper.append(win.Ext.getBody(), {
                    tag: 'div',
                    id: 'controls',
                    children: [
                        phoneField.apply()
                    ]
                });
                phoneField.bind(win.Ext.get('controls'));
            });

        });
    }
});

test('Phone field properties', function() {
    expect(4);
    equal(phoneField.getValue(), "", 'Phone field\'s value is empty by default');
    
    phoneField.setValue('1234567890');
    equal(phoneField.getValue(), "1234567890", 'Phone field\'s value is "1234567890" after calling setValue with "1234567890"');

    phoneField.setValue('(123)456-7890');
    equal(phoneField.getValue(), "1234567890", 'Phone field\'s value is "1234567890" after calling setValue with "(123)456-7890"');

    phoneField.clearValue();
    equal(phoneField.getValue(), "", 'phone field\'s value is empty after calling clearValue explicitly');
});

