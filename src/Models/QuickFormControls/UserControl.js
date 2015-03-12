/* 
 * See copyright file.
 */
define('crm/Models/QuickFormControls/UserControl', [
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
        getValuePropertyPath: function () {
            if( !this._valuePropertyPath){
                this._valuePropertyPath = [];
                this.controlData.DataBindings.forEach(function (binding) {
                    if ((binding.BindingType === 'Property') && (this.valueBindingProperty === binding.ControlItemName)) {
                        this._parentPropertyPath = binding.DataItemName + '.UserInfo';
                        this._valuePropertyPath.push(binding.DataItemName + '.UserInfo.FirstName');
                        this._valuePropertyPath.push(binding.DataItemName + '.UserInfo.LastName');
                    }

                }.bind(this));
            }
            return this._valuePropertyPath;
        },
       
        getParentProperty: function () {
            var property = this.getValuePropertyPath();
            if (property && (property.length > 0)) {
                 return property[0].split('.')[0];
            }
        },
        getParentPropertyPath: function () {
            var valuePath;
            if (!this._parentPropertyPath) {
                valuePath = this.getValuePropertyPath();
            }
            return this._parentPropertyPath;
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
