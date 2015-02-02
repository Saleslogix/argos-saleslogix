/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/BooleanControl', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Format',
    'Mobile/SalesLogix/Models/QuickFormControls/_BaseControl',

], function(
    declare,
    format,
    _BaseControl
) {
    var control = declare('Mobile.SalesLogix.Models.QuickFormControls.BooleanControl', [_BaseControl], {
        name:'boolean',
        type: 'boolean',
        valueBindingProperty: 'Checked',
        getRenderer: function () {
            return format.yesNo.bindDelegate(this, false);
        }
    });

    return control;
});
