/* 
 * See copyright file.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/DateControl', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Format',
    'Mobile/SalesLogix/Models/QuickFormControls/_BaseControl',
    'Mobile/SalesLogix/Models/QuickFormControls/ControlManager',
    'Mobile/SalesLogix/Validator'

], function(
    declare,
    format,
    _BaseControl,
    ControlManager,
    validator
) {
    var control = declare('Mobile.SalesLogix.Models.QuickFormControls.DateControl', [_BaseControl], {
        name:'date',
        type: 'Sage.SalesLogix.QuickForms.QFControls.QFDateTimePicker, Sage.SalesLogix.QuickForms.QFControls',
        valueBindingProperty: 'DateTimeValue',
        dateBindingProperty: 'DisplayDate',
        timeBindingProperty: 'DisplayTime',
        dateFormatTimelessText: 'MM/DD/YYYY',
        dateFormatText: 'M/D/YYYY h:mm A',
        getRenderer: function () {
            if ((this.dataFormatText) && (this.dataFormatText !=='')) {
                return format.date.bindDelegate(this, this.dateFormatText, null, true);
            }
            return format.relativeDate.bindDelegate(this, true);

        },
        getFieldControlType: function () {
            return 'date';
        },
        getFieldControlOptions: function () {
            var max, validator, timeless;
            validator = this.getValidator();
            timeless = this.getIsTimeless();
            return {
                timeless: timeless,
                showTimePicker: !timeless,
                dateFormatText: this.startingFormatText,
                minValue: (new Date(1900, 0, 1)),
                validator: validator
            };
        },
        getValidator: function () {
            return [
            validator.exists,
            validator.isDateInRange
            ];
        },
        getIsIimeless: function(){
            return false;
        },
        getDateFormat: function(){
            if(this.getIsTimeless()){
                return this.dateFormatTimelessText;
            }
            return  this.dateFormatText;
        }
    });

    ControlManager.register('date', { type: 'Sage.SalesLogix.QuickForms.QFControls.QFDateTimePicker, Sage.SalesLogix.QuickForms.QFControls', ctor: control });
    return control;
});
