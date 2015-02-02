/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/OwnerControl', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Models/QuickFormControls/_BaseControl',

], function(
    declare,
    _BaseControl
) {
    var control = declare('Mobile.SalesLogix.Models.QuickFormControls.QwnerControl', [_BaseControl], {
        name: 'owner',
        type: 'owner',
        valueBindingProperty: 'LookupResultValue',
        textBindingProperty: 'text',
        //Owner.OwnerDescription
        getDataBindProperty: function () {
            var property;
            this.controlData.DataBindings.forEach(function (binding) {
                var subentity;
                if ((binding.BindingType === 'Property') && (binding.ControlItemName === this.valueBindingProperty)) {
                    property =  binding.DataItemName +'.OwnerDescription';

                }
               
            }.bind(this));
            return property;
        }
    });

    return control;
});
