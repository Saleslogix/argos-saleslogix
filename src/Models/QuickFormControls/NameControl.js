/* 
 * See copyright file.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/NameControl', [
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
    var control = declare('Mobile.SalesLogix.Models.QuickFormControls.NameControl', [_BaseControl], {
        name: 'name',
        type: 'Sage.SalesLogix.QuickForms.QFControls.QFSLXPersonName, Sage.SalesLogix.QuickForms.QFControls',
        valuePropertyBindings: {
            'NameFirst': true,
            'NameLast': true,
            'NameMiddle': true,
            'NamePrefix': true,
            'NameSuffix': true
        },
        getDataBindProperty: function () {
            var property;
            property = [];
            this.controlData.DataBindings.forEach(function (binding) {
                if ((binding.BindingType === 'Property') && (this.valuePropertyBindings[binding.ControlItemName])) {
                    property.push(binding.DataItemName);
                }

            }.bind(this));
            return property;
        },
        getRenderer: function () {
            return format.nameLF.bindDelegate(this, false);
        }
    });

    ControlManager.register('name', { type: 'Sage.SalesLogix.QuickForms.QFControls.QFSLXPersonName, Sage.SalesLogix.QuickForms.QFControls', ctor: control });
    return control;
});
