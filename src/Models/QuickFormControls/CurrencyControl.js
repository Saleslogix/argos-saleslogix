/* 
 * See copyright file.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/CurrencyControl', [
    'dojo/_base/declare',
    '../../Format',
    './_BaseControl',
    './ControlManager'

], function(
    declare,
    format,
    _BaseControl,
    ControlManager
) {
    var _type = 'Sage.SalesLogix.QuickForms.QFControls.QFSLXCurrency, Sage.SalesLogix.QuickForms.QFControls';
    var control = declare('crm.Models.QuickFormControls.CurrencyControl', [_BaseControl], {
        name: 'currency',
        type: _type,
        valueBindingProperty: 'Text',
        getRenderer: function () {
            return format.bigNumber.bindDelegate(this, false);
        },
        getFieldControlType: function () {
            return 'multiCurrency';
        }
    });

    ControlManager.register('currency', { type:_type, ctor: control });
    return control;
});
