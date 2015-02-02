/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/PicklistControl', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Models/QuickFormControls/_BaseControl'

], function(
    declare,
    _BaseControl
) {
    var control = declare('Mobile.SalesLogix.Models.QuickFormControls.PicklistControl', [_BaseControl], {
        name:'picklist',
        type: 'picklist',
        valueBindingProperty: 'PickListValue',
        textBindingProperty: 'Text'

    });

    return control;
});
