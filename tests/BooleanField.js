var booleanField;
var checked;
module("Boolean Field", {
    setup: function() {
        S.open(Saleslogix.URL, function(){
            var win = FuncUnit._window;
            var config = {
                name:"status",
                onText: "Active",
                offText: "Inactive"
            };
            if (typeof checked != "undefined") config['checked'] = checked;
            booleanField = new win.Sage.Platform.Mobile.Controls.BooleanField(config);
            try {
                win.Ext.get('controls').remove();
            }
            catch (e) {}
            S.wait(1000, function() {
                win.Ext.DomHelper.append(win.Ext.getBody(), {
                    tag: 'div',
                    id: 'controls',
                    children: [
                        booleanField.apply()
                    ]
                });
                booleanField.bind(win.Ext.get('controls'));
            });

        });
    }
});

test('Boolean field properties', function() {
    expect(7);
    equal(booleanField.getValue(), "Inactive", 'Boolean field\'s value is "offText" by default.');
    
    booleanField.onClick();
    equal(booleanField.getValue(), "Active", 'Boolean field\'s value is "onText" after clicking it.');

    booleanField.setValue('Inactive');
    equal(booleanField.getValue(), "Inactive", 'Boolean field\'s value is "Inactive" after calling setValue explicitly.');

    booleanField.setValue('Active');
    equal(booleanField.getValue(), "Active", 'Boolean field\'s value is "Active" after calling setValue explicitly.');

    booleanField.clearValue();
    equal(booleanField.getValue(), "Inactive", 'Boolean field\'s value is default value after calling clearValue explicitly.');
    
    booleanField.onClick();
    equal(booleanField.isDirty(), true, 'Boolean field becomes dirty after clicking / setting its value.');

    booleanField.clearValue();
    equal(booleanField.isDirty(), false, 'Boolean field is not dirty after clearing its value.');
    
    //For the next testcase, we need to set "checked" option. 
    checked = true;
});

test('Boolean field with default "checked" property', function() {
    expect(1);
    equal(booleanField.getValue(), "Active", 'Boolean field\'s value is "Active" by default.');
});
