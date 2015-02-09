/* 
 * See copyright file.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/LookupControl', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Models/QuickFormControls/_BaseControl',
    'Mobile/SalesLogix/Models/QuickFormControls/ControlManager'
], function(
    declare,
    _BaseControl,
    ControlManager
) {
    var control = declare('Mobile.SalesLogix.Models.QuickFormControls.LookupControl', [_BaseControl], {
        name:'lookup',
        type:'Sage.SalesLogix.QuickForms.QFControls.QFSLXLookup, Sage.SalesLogix.QuickForms.QFControls',
        valueBindingProperty: 'LookupResultValue',
        textBindingProperty: 'text'

    });

    ControlManager.register('lookup', { type: 'Sage.SalesLogix.QuickForms.QFControls.QFSLXLookup, Sage.SalesLogix.QuickForms.QFControls', ctor: control });
    return control;
});
