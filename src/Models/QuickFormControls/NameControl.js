/* 
 * See copyright file.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/NameControl', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Format',
    'Mobile/SalesLogix/Models/QuickFormControls/_BaseControl',
    'Mobile/SalesLogix/Models/QuickFormControls/ControlManager',
    'Mobile/SalesLogix/Validator'
], function(
    declare,
    format,
    _BaseControl,
    ControlManager,
    validator
) {
    var control = declare('Mobile.SalesLogix.Models.QuickFormControls.NameControl', [_BaseControl], {
        name: 'name',
        type: 'Sage.SalesLogix.QuickForms.QFControls.QFSLXPersonName, Sage.SalesLogix.QuickForms.QFControls',
        valuePropertyBindings: {
            'NameFirst': true,
            'NameLast': true,
            'NameMiddle': true,
            'NamePrefix': true,
            'NameSuffix': true
        },
        getDataBindProperty: function () {
            var property;
            this.valueProperties = [];
            this.controlData.DataBindings.forEach(function (binding) {
                if ((binding.BindingType === 'Property') && (this.valuePropertyBindings[binding.ControlItemName])) {
                    this.valueProperties.push(binding.DataItemName);
                }

            }.bind(this));
            if (this.valueProperties.length > 0) {
                property = this.valueProperties;//[0].split('.')[0];
            }
            return property;
        },
        getDataBindDataPath: function () {
            var dataPath = null;
            if (!this.valueProperty) {
                this.valueProperty = this.getDataBindProperty();
            }
            if (this.valueProperty) {
                dataPath = this.valueProperty;//.replace('.', '/');
            }
            return dataPath;
        },
        getParentProperty: function () {
            return 'ContactName';
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

    ControlManager.register('name', { type: 'Sage.SalesLogix.QuickForms.QFControls.QFSLXPersonName, Sage.SalesLogix.QuickForms.QFControls', ctor: control });
    return control;
});
