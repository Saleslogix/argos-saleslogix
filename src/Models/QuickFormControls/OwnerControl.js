/* 
 * See copyright file.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/OwnerControl', [
    'dojo/_base/declare',
    '../../Template',
    './_BaseControl',
    './ControlManager',
    '../../Validator'
], function(
    declare,
    template,
    _BaseControl,
    ControlManager,
    validator
) {
    var _type =  'Sage.SalesLogix.QuickForms.QFControls.QFSLXOwner, Sage.SalesLogix.QuickForms.QFControls';
    var control = declare('crm.Models.QuickFormControls.QwnerControl', [_BaseControl], {
        name: 'owner',
        type: _type,
        valueBindingProperty: 'LookupResultValue',
        textBindingProperty: 'Text',
        getDataBindProperty: function () {
            var property;
            this.controlData.DataBindings.forEach(function (binding) {
                var subentity;
                if ((binding.BindingType === 'Property') && (binding.ControlItemName === this.valueBindingProperty)) {
                    property =  binding.DataItemName +'.OwnerDescription';

                }
               
            }.bind(this));
            return property;
        },
        getFieldControlType: function () {
            return 'lookup';
        },
        getParentProperty: function () {
            var property = this.getDataBindProperty();
            if (property) {
                return property.split('.')[0];
            }
        },
        getFieldControlOptions: function () {
            return {
                view: 'owner_list',
                textProperty: 'OwnerDescription'
            };
        }
    });

    ControlManager.register('owner', { type: _type, ctor: control });
    return control;
});
