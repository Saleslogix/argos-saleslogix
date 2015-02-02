/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/EmailControl', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Models/QuickFormControls/_BaseControl',

], function(
    declare,
    _BaseControl
) {
    var control = declare('Mobile.SalesLogix.Models.QuickFormControls.EmailControl', [_BaseControl], {
        name:'email',
        type: 'email',
        valueBindingProperty: 'Text',

    });

    return control;
});
