var textField;

module("Text Field", {
    setup: function() {
        S.open(Saleslogix.URL, function(){
            var win = FuncUnit._window;
            var config = {
                name:"firstName"
            };

            textField = new win.Sage.Platform.Mobile.Controls.TextField(config);
            try {
                win.Ext.get('controls').remove();
            }
            catch (e) {}
            S.wait(1000, function() {
                win.Ext.DomHelper.append(win.Ext.getBody(), {
                    tag: 'div',
                    id: 'controls',
                    children: [
                        textField.apply()
                    ]
                });
                textField.bind(win.Ext.get('controls'));
            });

        });
    }
});

test('Text field properties', function() {
    expect(3);
    equal(textField.getValue(), "", 'Text field\'s value is empty by default');
    
    textField.setValue('John Doe');
    equal(textField.getValue(), "John Doe", 'Text field\'s value is "John Doe" after calling setValue with "John Doe"');

    textField.clearValue();
    equal(textField.getValue(), "", 'text field\'s value is empty after calling clearValue explicitly');
});

