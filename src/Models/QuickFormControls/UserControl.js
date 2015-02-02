/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/UserControl', [
    'dojo/_base/declare',
     'Mobile/SalesLogix/Template',
     'Mobile/SalesLogix/Format',
    'Mobile/SalesLogix/Models/QuickFormControls/_BaseControl',

], function(
    declare,
    template,
    format,
    _BaseControl
) {
    var control = declare('Mobile.SalesLogix.Models.QuickFormControls.UserControl', [_BaseControl], {
        name: 'user',
        type: 'user',
        valueBindingProperty: 'LookupResultValue',
        textBindingProperty: 'text',
        getDataBindProperty: function () {
            var property;
            //this.valueProperties = [];
            this.controlData.DataBindings.forEach(function (binding) {
                if ((binding.BindingType === 'Property') && (this.valueBindingProperty === binding.ControlItemName)) {
                    property = binding.DataItemName + '.UserInfo';
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
