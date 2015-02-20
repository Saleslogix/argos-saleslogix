/* 
 * See copyright file.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/OwnerControl', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Template',
    'Mobile/SalesLogix/Models/QuickFormControls/_BaseControl',
    'Mobile/SalesLogix/Models/QuickFormControls/ControlManager',
    'Mobile/SalesLogix/Validator'
], function(
    declare,
    template,
    _BaseControl,
    ControlManager,
    validator
) {
    var control = declare('Mobile.SalesLogix.Models.QuickFormControls.QwnerControl', [_BaseControl], {
        name: 'owner',
        type: 'Sage.SalesLogix.QuickForms.QFControls.QFSLXOwner, Sage.SalesLogix.QuickForms.QFControls',
        valueBindingProperty: 'LookupResultValue',
        textBindingProperty: 'Text',
        //Owner.OwnerDescription
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
        getFieldControlOptions: function () {
            return {
                view: 'owner_list',
                textProperty: 'OwnerDescription',
                textTemplate: template.nameLF
            };
        }
    });

    ControlManager.register('owner', { type: 'Sage.SalesLogix.QuickForms.QFControls.QFSLXOwner, Sage.SalesLogix.QuickForms.QFControls', ctor: control });
    return control;
});
