/* 
 * See copyright file.
 */
define('crm/Models/QuickFormControls/BooleanControl', [
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
    var _type = 'Sage.Platform.QuickForms.QFControls.QFCheckBox, Sage.Platform.QuickForms.QFControls';
    var control = declare('crm.Models.QuickFormControls.BooleanControl', [_BaseControl], {
        name:'boolean',
        type: _type,
        valueBindingProperty: 'Checked',
        getRenderer: function () {
            return format.yesNo.bindDelegate(this, false);
        },
        getFieldControlType: function () {
            return 'boolean';
        }
    });

    ControlManager.register('boolean', { type: _type, ctor: control });
    return control;
});
