/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/UrlControl', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Models/QuickFormControls/_BaseControl',

], function(
    declare,
    _BaseControl
) {
    var control = declare('Mobile.SalesLogix.Models.QuickFormControls.UrlControl', [_BaseControl], {
        name:'url',
        type: 'url',
        valueBindingProperty: 'Text',

    });

    return control;
});
