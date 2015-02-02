/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/NumericControl', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Format',
    'Mobile/SalesLogix/Models/QuickFormControls/_BaseControl',

], function(
    declare,
    format,
    _BaseControl
) {
    var control = declare('Mobile.SalesLogix.Models.QuickFormControls.NumericControl', [_BaseControl], {
        name: 'numeric',
        type: 'numeric',
        valueBindingProperty: 'Text',
        getRenderer: function () {
            return format.bigNumber.bindDelegate(this, false);
        }
    });

    return control;
});
