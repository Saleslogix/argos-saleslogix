/* 
 * See copyright file.
 */
define('crm/Models/QuickFormControls/_BaseControl', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    '../../Validator'
], function(
    declare,
    lang,
    validator
) {
    var control = declare('crm.Models.QucikFormControls._BaseControl', null, {
        type:'text',
        valueBindingProperty: 'Text',
        controlData: {},
        caption: null,
        _valuePropertyPath: null,
        _selectPropertyPath: null,
        _parentPropertyPath: null,
        _parentProperty: null,
        renderer: null,
        constructor: function (o) {
            var data = { controlData: o };
            lang.mixin(this, data);
            this.init();
        },
        getControlId: function () {
            return this.controlData.ControlId;
        },
        init: function () {
            this.caption = this.getCaption();
        },
        getCaption: function () {
            return this.controlData.Caption;
        },
        getValuePropertyPath: function () {
            if (!this._valuePropertyPath) {
                if (this.valueBindingProperty && typeof this.valueBindingProperty === "object") {
                    this._valuePropertyPath = [];
                    this.controlData.DataBindings.forEach(function (binding) {
                        if ((binding.BindingType === 'Property') && (this.valueBindingProperty[binding.ControlItemName])) {
                            this._valuePropertyPath.push(binding.DataItemName);
                        }

                    }.bind(this));

                } else {
                    this.controlData.DataBindings.forEach(function (binding) {
                        if ((binding.BindingType === 'Property') && (binding.ControlItemName === this.valueBindingProperty)) {
                            this._valuePropertyPath = binding.DataItemName;
                        }

                    }.bind(this));
                }
            }

            return this._valuePropertyPath;
        },
        getParentProperty: function () {
            return this.getParentPropertyPath();
        },
        getParentPropertyPath: function () {
            var valuePath;
            if (!this._parentPropertyPath) {
                valuePath = this.getValuePropertyPath();
                if (valuePath) {
                    if (Array.isArray(valuePath)) {
                        this._parentPropertyPath = valuePath[0].split('.')[0];
                    } else {
                        this._parentPropertyPath = valuePath.split('.')[0];
                    }
                }
            }
            return this._parentPropertyPath;
        },
        getSelectPropertyPath: function () {
            var valuePath = null;
            if (!this._selectPropertyPath) {
                valuePath = this.getValuePropertyPath();
                if (valuePath) {
                    if (Array.isArray(valuePath)) {
                        this._selectPropertyPath = [];
                        valuePath.forEach(function (path) {
                            this._selectPropertyPath.push(path.replace(/\./g, '/'));
                        }.bind(this));
                       
                    } else {
                        this._selectPropertyPath = valuePath.replace(/\./g, '/');
                    }
                }
            }
            return this._selectPropertyPath;
        },
        getRenderer: function () {
            if (this.renderer) {
               return  this.renderer.bind(this);
            }
            return null;
        },
        getTemplate: function () {
            return null;
        },
        getFieldControlType: function () {
            return 'text';
        },
        getFieldControlOptions: function () {
            return {
                 validator: this.getValidator()
            };
        },
        getValidator: function () {
            var validators = [];
            if (this.controlData) {
                if (this.controlData.Required) {
                    validators.push(validator.notEmpty);
                }
                if (this.getMaxLength() > -1) {
                    validators.push(validator.exceedsMaxTextLength);
                }
            }
            return validators;
        },
        getMaxLength: function () {
            var max = (this.controlData)? this.controlData.MaxLength: null;
            if (max < 0) {
                max = 0;
            }
            return max;
        },
        getReadOnly: function () {
            return this.controlData ? this.controlData.IsReadOnly : false;
        }
    });

    return control;
});
