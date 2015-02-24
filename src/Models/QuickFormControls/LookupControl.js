/* 
 * See copyright file.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/LookupControl', [
    'dojo/_base/declare',
    './_BaseControl',
    './ControlManager'
], function(
    declare,
    _BaseControl,
    ControlManager
) {
    var _type = 'Sage.SalesLogix.QuickForms.QFControls.QFSLXLookup, Sage.SalesLogix.QuickForms.QFControls';
    var control = declare('crm.Models.QuickFormControls.LookupControl', [_BaseControl], {
        name:'lookup',
        type: _type,
        valueBindingProperty: 'LookupResultValue',
        textBindingProperty: 'text',
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
            var property = this.getDataBindProperty();
            if (property) {
                return property.split('.')[0];
            }
        },
        getFieldControlType: function () {
            return 'lookup';
        },
        getFieldControlOptions: function () {
            return {
                view: 'lookup_list',
                textProperty: this.getTextProperty(),
            };
        },
        getTextProperty: function () {
            if (this.controlData.LookupBindingMode === 'Object') {
                return '$descriptor';
            }
            return this.getParentProperty();
        }
    });
    
    ControlManager.register('lookup', { type: _type, ctor: control });
    return control;
});
