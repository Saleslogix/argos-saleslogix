/* 
 * See copyright file.
 */
define('crm/Models/QuickFormControls/AddressControl', [
    'dojo/_base/declare',
    '../../Format',
    './_BaseControl',
    './ControlManager'
], function(
    declare,
    format,
    _BaseControl,
    ControlManager
) {
    var _type = 'Sage.SalesLogix.QuickForms.QFControls.QFSLXAddress, Sage.SalesLogix.QuickForms.QFControls';
    var control = declare('crm.Models.QuickFormControls.AddressControl', [_BaseControl], {
        name: 'address',
        type: _type,
        valuePropertyBindings: {
            'AddressDesc1': true,
            'AddressDesc2': true,
            'AddressDesc3': true,
            'AddressDesc4': true,
            'AddressCity': true,
            'AddressState': true,
            'AddressZip': true,
            'AddressCountry': true
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
                    this._valuePropertyPath = valuePath[0].split('.')[0];
                }
            }
            return this._valuePropertyPath;
        },
        getSelectPropertyPath: function () {
            var valuePath = null;
            if (!this._selectPropertyPath) {
                valuePath = this.getValuePropertyPath();
                if (valuePath) {
                    this._selectPropertyPath = valuePath.replace('.', '/') + '/*';
                }
            }
            return this._selectPropertyPath;
        },
        getParentProperty: function () {
            return this.getValuePropertyPath();
        },
        getRenderer: function () {
             return format.address.bindDelegate(this, false);
        },
        getFieldControlType: function () {
            return 'address';
        },
        getFieldControlOptions: function () {
            return {
                emptyText: '',
                formatValue: format.address.bindDelegate(this, [true], true),
                view: 'address_edit'
            };
        }

    });

    ControlManager.register('address', { type: _type, ctor: control });
    return control;
});
