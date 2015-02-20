/* 
 * See copyright file.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/TextControl', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Models/QuickFormControls/_BaseControl',
    'Mobile/SalesLogix/Models/QuickFormControls/ControlManager',
    'Mobile/SalesLogix/Validator'
], function(
    declare,
    _BaseControl,
    ControlManager,
    validator
) {
    var control = declare('Mobile.SalesLogix.Models.QuickFormControls.TextControl', [_BaseControl], {
        name:'text',
        type: 'Sage.Platform.QuickForms.Controls.QFTextBox, Sage.Platform.QuickForms',
        valueBindingProperty: 'Text',
        getFieldControlType: function () {
            return 'text';
        },
        getFieldControlOptions: function () {
            var max, validator;
            validator = this.getValidator();
            max = this.getMaxTextLength();
            return {
                maxTextLength: max,
                validator: validator
            };
        },
        getMaxTextLength: function () {
            return 64;
        },
        getValidator: function () {
            return [validator.exceedsMaxTextLength, validator.notEmpty];
        }
    });
    ControlManager.register('text', { type: 'Sage.Platform.QuickForms.Controls.QFTextBox, Sage.Platform.QuickForms', ctor: control });
    return control;
});
