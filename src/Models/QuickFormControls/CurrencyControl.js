/* 
 * See copyright file.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/CurrencyControl', [
    'dojo/_base/declare',
    '../../Format',
    './_BaseControl',
    './ControlManager',
    'dojo/string'

], function(
    declare,
    format,
    _BaseControl,
    ControlManager,
    string
) {
    var _type = 'Sage.SalesLogix.QuickForms.QFControls.QFSLXCurrency, Sage.SalesLogix.QuickForms.QFControls';
    var control = declare('crm.Models.QuickFormControls.CurrencyControl', [_BaseControl], {
        name: 'currency',
        type: _type,
        valueBindingProperty: 'Text',
        getFieldControlType: function () {
            return 'multiCurrency';
        },
        renderer: function (value, propertyName) {
            var result = format.bigNumber(value);
            return string.substitute(
                '<div class ="currency">${0}</div>', [result]);
        }
    });

    ControlManager.register('currency', { type:_type, ctor: control });
    return control;
});
