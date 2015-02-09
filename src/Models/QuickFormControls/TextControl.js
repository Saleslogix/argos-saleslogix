/* 
 * See copyright file.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/TextControl', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Models/QuickFormControls/_BaseControl',
    'Mobile/SalesLogix/Models/QuickFormControls/ControlManager'
], function(
    declare,
    _BaseControl,
    ControlManager
) {
    var control = declare('Mobile.SalesLogix.Models.QuickFormControls.TextControl', [_BaseControl], {
        name:'text',
        type: 'Sage.Platform.QuickForms.Controls.QFTextBox, Sage.Platform.QuickForms',
        valueBindingProperty: 'Text',

    });
    ControlManager.register('text', { type: 'Sage.Platform.QuickForms.Controls.QFTextBox, Sage.Platform.QuickForms', ctor: control });
    return control;
});
