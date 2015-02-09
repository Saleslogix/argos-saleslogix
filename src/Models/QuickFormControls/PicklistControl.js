/* 
 * See copyright file.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/PicklistControl', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Models/QuickFormControls/_BaseControl',
    'Mobile/SalesLogix/Models/QuickFormControls/ControlManager'
], function(
    declare,
    _BaseControl,
    ControlManager
) {
    var control = declare('Mobile.SalesLogix.Models.QuickFormControls.PicklistControl', [_BaseControl], {
        name:'picklist',
        type: 'Sage.SalesLogix.QuickForms.QFControls.QFSLXPickList, Sage.SalesLogix.QuickForms.QFControls',
        valueBindingProperty: 'PickListValue',
        textBindingProperty: 'Text'

    });

    ControlManager.register('picklist', { type: 'Sage.SalesLogix.QuickForms.QFControls.QFSLXPickList, Sage.SalesLogix.QuickForms.QFControls', ctor: control });
    return control;
});
