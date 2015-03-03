/* 
 * See copyright file.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/TextControl', [
    'dojo/_base/declare',
    './_BaseControl',
    './ControlManager',
    '../../Validator'
], function(
    declare,
    _BaseControl,
    ControlManager,
    validator
) {
    var _type = 'Sage.Platform.QuickForms.Controls.QFTextBox, Sage.Platform.QuickForms';
    var control = declare('crm.Models.QuickFormControls.TextControl', [_BaseControl], {
        name:'text',
        type: _type,
        valueBindingProperty: 'Text',
        getFieldControlType: function () {
            return 'text';
        },
        getFieldControlOptions: function () {
            var max, validator;
            validator = this.getValidator();
            max = this.getMaxLength();
            return {
                maxTextLength: max,
                validator: validator
            };
        },
        //getMaxLength: function () {
        //    return 64;
        //}
    });
    ControlManager.register('text', { type: _type, ctor: control });
    return control;
});
