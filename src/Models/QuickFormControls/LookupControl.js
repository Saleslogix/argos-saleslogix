/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/LookupControl', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Models/QuickFormControls/_BaseControl',

], function(
    declare,
    _BaseControl
) {
    var control = declare('Mobile.SalesLogix.Models.QuickFormControls.LookupControl', [_BaseControl], {
        name:'lookup',
        type: 'lookup',
        valueBindingProperty: 'LookupResultValue',
        textBindingProperty: 'text'

    });

    return control;
});
