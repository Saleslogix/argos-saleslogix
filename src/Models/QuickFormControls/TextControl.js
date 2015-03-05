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
        getParentPropertyPath: function () {
            var valuePath;
            if (!this._parentPropertyPath) {
                valuePath = this.getValuePropertyPath();
                if (valuePath) {
                    this._parentPropertyPath = valuePath;
                }
            }
            return this._parentPropertyPath;
        },
        getFieldControlType: function () {
            if ((this.controlData.Lines) && (this.controlData.Lines > 1)) {
                return 'note';
            }

            return 'text';
        },
        getFieldControlOptions: function () {
            var max, validator;
            validator = this.getValidator();
            max = this.getMaxLength();
            return {
                maxTextLength: max,
                validator: validator,
                title: this.getCaption(),
                view: 'text_edit'
            };
        }
    });
    ControlManager.register('text', { type: _type, ctor: control });
    return control;
});
