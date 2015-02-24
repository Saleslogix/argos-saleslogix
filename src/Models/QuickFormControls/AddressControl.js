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
        valueProperties:[],
        getDataBindProperty: function () {
            var property;
            this.valueProperties = [];
            this.controlData.DataBindings.forEach(function (binding) {
                if ((binding.BindingType === 'Property') && (this.valuePropertyBindings[binding.ControlItemName])) {
                    this.valueProperties.push(binding.DataItemName);
                }

            }.bind(this));
            if (this.valueProperties.length > 0) {
                property = this.valueProperties[0].split('.')[0];
            }
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
            return this.getDataBindProperty();
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
