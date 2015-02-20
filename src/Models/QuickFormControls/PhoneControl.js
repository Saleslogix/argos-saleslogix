/* 
 * See copyright file.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/PhoneControl', [
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
    var control = declare('Mobile.SalesLogix.Models.QuickFormControls.PhoneControl', [_BaseControl], {
        name:'phone',
        type:'Sage.SalesLogix.QuickForms.QFControls.QFSLXPhone, Sage.SalesLogix.QuickForms.QFControls',
        valueBindingProperty: 'Text',
        getRenderer: function () {
            return format.phone.bindDelegate(this, false);
        },
        getFieldControlType: function () {
            return 'phone';
        }

    });

    ControlManager.register('phone', { type: 'Sage.SalesLogix.QuickForms.QFControls.QFSLXPhone, Sage.SalesLogix.QuickForms.QFControls', ctor: control });
    return control;
});
