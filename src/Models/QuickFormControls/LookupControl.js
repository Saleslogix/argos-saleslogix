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
