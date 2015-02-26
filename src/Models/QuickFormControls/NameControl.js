/* 
 * See copyright file.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/NameControl', [
    'dojo/_base/declare',
    '../../Format',
    './_BaseControl',
    './ControlManager',
    '../../Validator'
], function(
    declare,
    format,
    _BaseControl,
    ControlManager,
    validator
) {
    var _type = 'Sage.SalesLogix.QuickForms.QFControls.QFSLXPersonName, Sage.SalesLogix.QuickForms.QFControls';
    var control = declare('crm.Models.QuickFormControls.NameControl', [_BaseControl], {
        name: 'name',
        type: _type,
        valuePropertyBindings: {
            'NameFirst': true,
            'NameLast': true,
            'NameMiddle': true,
            'NamePrefix': true,
            'NameSuffix': true
        },
        getValuePropertyPath: function () {
            var valuePath;
            if (!this._valuePropertyPath) {
                valuePath = [];
                this.controlData.DataBindings.forEach(function (binding) {
                    if ((binding.BindingType === 'Property') && (this.valuePropertyBindings[binding.ControlItemName])) {
                        valuePath.push(binding.DataItemName);
                    }

                }.bind(this));
                if (valuePath.length > 0) {
                    this._valuePropertyPath = valuePath;
                }
            }
            return this._valuePropertyPath;
        },
        getSelectPropertyPath: function () {
            var valuePath = null;
            if (!this._selectPropertyPath) {
                valuePath = this.getValuePropertyPath();
                if (valuePath) {
                    this._selectPropertyPath = valuePath;
                }
            }
            return this._selectPropertyPath;
        },
        getParentPropertyPath: function () {
            var valuePath;
            if (!this._parentPropertyPath) {
                this._parentPropertyPath = '$ContactName';
            }
            return this._parentPropertyPath;
        },
        getParentProperty: function () {
            return this.getParentPropertyPath();
        },
        getRenderer: function () {
            return format.nameLF.bindDelegate(this, false);
        },
        getFieldControlType: function () {
            return 'name';
        },
        getFieldControlOptions: function () {
            var validator;
            validator = this.getValidator();
            return {
                applyTo: '.',
                formatValue: format.nameLF,
                view: 'name_edit',
                validator: validator
            };
        },
         getValidator: function () {
             return validator.name;
        }
    });

    ControlManager.register('name', { type: _type, ctor: control });
    return control;
});
