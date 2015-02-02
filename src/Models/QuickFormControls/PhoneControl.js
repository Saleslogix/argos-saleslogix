/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/PhoneControl', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Format',
    'Mobile/SalesLogix/Models/QuickFormControls/_BaseControl'

], function(
    declare,
    format,
    _BaseControl
) {
    var control = declare('Mobile.SalesLogix.Models.QuickFormControls.PhoneControl', [_BaseControl], {
        name:'phone',
        type: 'phone',
        valueBindingProperty: 'Text',
        getRenderer: function () {
            return format.phone.bindDelegate(this, false);
        }

    });

    return control;
});
