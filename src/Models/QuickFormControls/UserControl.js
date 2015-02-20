/* 
 * See copyright file.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/UserControl', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Template',
    'Mobile/SalesLogix/Format',
    'Mobile/SalesLogix/Models/QuickFormControls/_BaseControl',
    'Mobile/SalesLogix/Models/QuickFormControls/ControlManager',
    'Mobile/SalesLogix/Validator'
], function(
    declare,
    template,
    format,
    _BaseControl,
    ControlManager,
    validator
) {
    var control = declare('Mobile.SalesLogix.Models.QuickFormControls.UserControl', [_BaseControl], {
        name: 'user',
        type: 'Sage.SalesLogix.QuickForms.QFControls.QFSLXUser, Sage.SalesLogix.QuickForms.QFControls',
        valueBindingProperty: 'LookupResultValue',
        textBindingProperty: 'text',
        getDataBindProperty: function () {
            var property;
            //this.valueProperties = [];
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

    ControlManager.register('user', { type: 'Sage.SalesLogix.QuickForms.QFControls.QFSLXUser, Sage.SalesLogix.QuickForms.QFControls', ctor: control });
    return control;
});
