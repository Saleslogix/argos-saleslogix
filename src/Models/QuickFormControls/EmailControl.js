/* 
 * See copyright file.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/EmailControl', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Models/QuickFormControls/_BaseControl',
        'Mobile/SalesLogix/Models/QuickFormControls/ControlManager'

], function(
    declare,
    _BaseControl,
    ControlManager
) {
    var control = declare('Mobile.SalesLogix.Models.QuickFormControls.EmailControl', [_BaseControl], {
        name:'email',
        type: 'Sage.SalesLogix.QuickForms.QFControls.QFSLXEmail, Sage.SalesLogix.QuickForms.QFControls',
        valueBindingProperty: 'Text',

    });

    ControlManager.register('email', { type: 'Sage.SalesLogix.QuickForms.QFControls.QFSLXEmail, Sage.SalesLogix.QuickForms.QFControls', ctor: control });
    return control;
});
