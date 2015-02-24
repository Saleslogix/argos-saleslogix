/* 
 * See copyright file.
 */
define('crm/Models/QuickFormControls/DateControl', [
    'dojo/_base/declare',
    '../../Format',
    './_BaseControl',
    './ControlManager',
    '../../Validator'

], function(
    declare,
    format,
    _BaseControl,
    ControlManager,
    validator
) {
    var _type = 'Sage.SalesLogix.QuickForms.QFControls.QFDateTimePicker, Sage.SalesLogix.QuickForms.QFControls';
    var control = declare('crm.Models.QuickFormControls.DateControl', [_BaseControl], {
        name:'date',
        type: _type,
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
            var validator, timeless;
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

    ControlManager.register('date', { type: _type, ctor: control });
    return control;
});
