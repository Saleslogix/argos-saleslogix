/* 
 * See copyright file.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/AddressControl', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Format',
    'Mobile/SalesLogix/Models/QuickFormControls/_BaseControl',
    'Mobile/SalesLogix/Models/QuickFormControls/ControlManager'
], function(
    declare,
    format,
    _BaseControl,
    ControlManager
) {
    var control = declare('Mobile.SalesLogix.Models.QuickFormControls.AddressControl', [_BaseControl], {
        name: 'address',
        type: 'Sage.SalesLogix.QuickForms.QFControls.QFSLXAddress, Sage.SalesLogix.QuickForms.QFControls',
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
        getRenderer: function () {
             return format.address.bindDelegate(this, false);
        }

    });

    ControlManager.register('address', { type: 'Sage.SalesLogix.QuickForms.QFControls.QFSLXAddress, Sage.SalesLogix.QuickForms.QFControls', ctor: control });
    return control;
});
