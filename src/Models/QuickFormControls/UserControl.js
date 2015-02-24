/* 
 * See copyright file.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/UserControl', [
    'dojo/_base/declare',
    '../../Template',
    '../../Format',
    './_BaseControl',
    './ControlManager',
    '../../Validator'
], function(
    declare,
    template,
    format,
    _BaseControl,
    ControlManager,
    validator
) {
    var _type = 'Sage.SalesLogix.QuickForms.QFControls.QFSLXUser, Sage.SalesLogix.QuickForms.QFControls';
    var control = declare('crm.Models.QuickFormControls.UserControl', [_BaseControl], {
        name: 'user',
        type: _type,
        valueBindingProperty: 'LookupResultValue',
        textBindingProperty: 'text',
        getDataBindProperty: function () {
            var property;
            this.controlData.DataBindings.forEach(function (binding) {
                if ((binding.BindingType === 'Property') && (this.valueBindingProperty === binding.ControlItemName)) {
                    property = binding.DataItemName + '.UserInfo';
                }

            }.bind(this));
            return property;
        },
        getDataBindDataPath: function () {
            var dataPath = null;
            if (!this.valueProperty) {
                this.valueProperty = this.getDataBindProperty();
            }
            if (this.valueProperty) {
                dataPath = this.valueProperty.replace('.', '/') + '/*';
            }
            return dataPath;
        },
        getParentProperty: function () {
            var property = this.getDataBindProperty();
            if (property) {
                return property.split('.')[0];
            }
        },
        getRenderer: function () {
            return format.nameLF.bindDelegate(this, false);
        },
        getFieldControlType: function () {
            return 'lookup';
        },
        getFieldControlOptions: function () {
            return {
                view: 'user_list',
                textProperty: 'UserInfo',
                textTemplate: template.nameLF
            };
        }
    });

    ControlManager.register('user', { type: _type, ctor: control });
    return control;
});
