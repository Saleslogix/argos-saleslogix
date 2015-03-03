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
        getFieldControlType: function () {
            return 'number';
        },
        getTemplate: function () {
            return null;
        },
        renderer: function(value, propertyName) {
            var result = format.bigNumber(scope, value);
            return string.substitute(
                '<div class ="qfcontrol number">${0}</div>', [result]);
        }
    });

    ControlManager.register('numeric', { type: _type, ctor: control });
    return control;
});
