/* 
 * See copyright file.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/UrlControl', [
    'dojo/_base/declare',
    './_BaseControl',
    './ControlManager'

], function(
    declare,
    _BaseControl,
    ControlManager
) {
    var _type = 'Sage.SalesLogix.QuickForms.QFControls.QFSLXUrl, Sage.SalesLogix.QuickForms.QFControls';
    var control = declare('crm.Models.QuickFormControls.UrlControl', [_BaseControl], {
        name:'url',
        type: _type,
        valueBindingProperty: 'Text',
        getFieldControlType: function () {
            return 'url';
        }
    });

    ControlManager.register('url', { type: _type, ctor: control });
    return control;
});
