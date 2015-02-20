/* 
 * See copyright file.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/UrlControl', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Models/QuickFormControls/_BaseControl',
    'Mobile/SalesLogix/Models/QuickFormControls/ControlManager'

], function(
    declare,
    _BaseControl,
    ControlManager
) {
    var control = declare('Mobile.SalesLogix.Models.QuickFormControls.UrlControl', [_BaseControl], {
        name:'url',
        type: 'Sage.SalesLogix.QuickForms.QFControls.QFSLXUrl, Sage.SalesLogix.QuickForms.QFControls',
        valueBindingProperty: 'Text',
        getFieldControlType: function () {
            return 'url';
        }
    });

    ControlManager.register('url', { type: 'Sage.SalesLogix.QuickForms.QFControls.QFSLXUrl, Sage.SalesLogix.QuickForms.QFControls', ctor: control });
    return control;
});
