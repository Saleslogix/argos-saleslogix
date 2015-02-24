/* 
 * See copyright file.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/EmailControl', [
    'dojo/_base/declare',
    './_BaseControl',
    './ControlManager'

], function(
    declare,
    _BaseControl,
    ControlManager
) {
    var _type = 'Sage.SalesLogix.QuickForms.QFControls.QFSLXEmail, Sage.SalesLogix.QuickForms.QFControls';
    var control = declare('Mobile.SalesLogix.Models.QuickFormControls.EmailControl', [_BaseControl], {
        name:'email',
        type: _type,
        valueBindingProperty: 'Text',
        getFieldControlType: function () {
            return 'text';
        }
    });

    ControlManager.register('email', { type: _type, ctor: control });
    return control;
});
