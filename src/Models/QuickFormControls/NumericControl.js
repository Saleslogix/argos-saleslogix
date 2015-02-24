/* 
 * See copyright file.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/NumericControl', [
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
    var _type = 'Sage.SalesLogix.QuickForms.QFControls.QFSLXNumeric, Sage.SalesLogix.QuickForms.QFControls';
    var control = declare('crm.Models.QuickFormControls.NumericControl', [_BaseControl], {
        name: 'numeric',
        type: _type,
        valueBindingProperty: 'Text',
        getRenderer: function () {
            return format.bigNumber.bindDelegate(this, false);
        },
        getFieldControlType: function () {
            return 'number';
        }
    });

    ControlManager.register('numeric', { type: _type, ctor: control });
    return control;
});
