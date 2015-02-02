/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/DateControl', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Format',
    'Mobile/SalesLogix/Models/QuickFormControls/_BaseControl',

], function(
    declare,
    format,
    _BaseControl
) {
    var control = declare('Mobile.SalesLogix.Models.QuickFormControls.DateControl', [_BaseControl], {
        name:'date',
        type: 'date',
        valueBindingProperty: 'DateTimeValue',
        dateBindingProperty: 'DisplayDate',
        timeBindingProperty: 'DisplayTime',
        dateFormatText:'MM/DD/YYYY',
        getRenderer: function () {
            if ((this.dataFormatText) && (this.dataFormatText !=='')) {
                return format.date.bindDelegate(this, this.dateFormatText, null, true);
            }
            return format.relativeDate.bindDelegate(this, true);

        }
    });

    return control;
});
