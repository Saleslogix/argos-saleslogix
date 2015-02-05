/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/TextControl', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Models/QuickFormControls/_BaseControl'

], function(
    declare,
    _BaseControl
) {
    var control = declare('Mobile.SalesLogix.Models.QuickFormControls.TextControl', [_BaseControl], {
        name:'text',
        type: 'text',
        valueBindingProperty: 'Text',

    });

    return control;
});