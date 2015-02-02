/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/NameControl', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Format',
    'Mobile/SalesLogix/Models/QuickFormControls/_BaseControl',

], function(
    declare,
    format,
    _BaseControl
) {
    var control = declare('Mobile.SalesLogix.Models.QuickFormControls.NameControl', [_BaseControl], {
        name: 'name',
        type: 'name',
        valuePropertyBindings: {
            'NameFirst': true,
            'NameLast': true,
            'NameMiddle': true,
            'NamePrefix': true,
            'NameSuffix': true
        },
        getDataBindProperty: function () {
            var property;
            property = [];
            this.controlData.DataBindings.forEach(function (binding) {
                if ((binding.BindingType === 'Property') && (this.valuePropertyBindings[binding.ControlItemName])) {
                    property.push(binding.DataItemName);
                }

            }.bind(this));
            return property;
        },
        getRenderer: function () {
            return format.nameLF.bindDelegate(this, false);
        }
    });

    return control;
});
