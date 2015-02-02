/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/AddressControl', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Format',
    'Mobile/SalesLogix/Models/QuickFormControls/_BaseControl'

], function(
    declare,
    format,
    _BaseControl
) {
    var control = declare('Mobile.SalesLogix.Models.QuickFormControls.AddressControl', [_BaseControl], {
        name: 'address',
        type: 'address',
        valuePropertyBindings: {
            'AddressDesc1': true,
            'AddressDesc2': true,
            'AddressDesc3': true,
            'AddressDesc4': true,
            'AddressCity': true,
            'AddressState': true,
            'AddressZip': true,
            'AddressCountry': true
        },
        valueProperties:[],
        getDataBindProperty: function () {
            var property;
            this.valueProperties = [];
            this.controlData.DataBindings.forEach(function (binding) {
                if ((binding.BindingType === 'Property') && (this.valuePropertyBindings[binding.ControlItemName])) {
                    this.valueProperties.push(binding.DataItemName);
                }

            }.bind(this));
            if (this.valueProperties.length > 0) {
                property = this.valueProperties[0].split('.')[0];
            }
            return property;
        },
        getRenderer: function () {
             return format.address.bindDelegate(this, false);
        }

    });

    return control;
});
