/* 
 * See copyright file.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/PhoneControl', [
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
    var _type = 'Sage.SalesLogix.QuickForms.QFControls.QFSLXPhone, Sage.SalesLogix.QuickForms.QFControls';
    var control = declare('crm.Models.QuickFormControls.PhoneControl', [_BaseControl], {
        name: 'phone',
        type: _type,
        valueBindingProperty: 'Text',
        getRenderer: function () {
            return format.phone.bindDelegate(this, false);
        },
        getFieldControlType: function () {
            return 'phone';
        }

    });

    ControlManager.register('phone', { type: _type, ctor: control });
    return control;
});
