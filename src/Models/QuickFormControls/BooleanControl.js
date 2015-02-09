/* 
 * See copyright file.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/BooleanControl', [
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
    var control = declare('Mobile.SalesLogix.Models.QuickFormControls.BooleanControl', [_BaseControl], {
        name:'boolean',
        type: 'Sage.Platform.QuickForms.QFControls.QFCheckBox, Sage.Platform.QuickForms.QFControls',
        valueBindingProperty: 'Checked',
        getRenderer: function () {
            return format.yesNo.bindDelegate(this, false);
        }
    });

    ControlManager.register('boolean', { type: 'Sage.Platform.QuickForms.QFControls.QFCheckBox, Sage.Platform.QuickForms.QFControls', ctor: control });
    return control;
});
