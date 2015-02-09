/* 
 * See copyright file.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/DateControl', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Format',
    'Mobile/SalesLogix/Models/QuickFormControls/_BaseControl',
        'Mobile/SalesLogix/Models/QuickFormControls/ControlManager'

], function(
    declare,
    format,
    _BaseControl,
    ControlManager
) {
    var control = declare('Mobile.SalesLogix.Models.QuickFormControls.DateControl', [_BaseControl], {
        name:'date',
        type: 'Sage.SalesLogix.QuickForms.QFControls.QFDateTimePicker, Sage.SalesLogix.QuickForms.QFControls',
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

    ControlManager.register('date', { type: 'Sage.SalesLogix.QuickForms.QFControls.QFDateTimePicker, Sage.SalesLogix.QuickForms.QFControls', ctor: control });
    return control;
});
