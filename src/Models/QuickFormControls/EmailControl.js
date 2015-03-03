/* 
 * See copyright file.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/EmailControl', [
    'dojo/_base/declare',
    'dojo/string',
    './_BaseControl',
    './ControlManager'

], function(
    declare,
    string,
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
        },
        renderer: function (value, propertyName) {
        return string.substitute(
            '<div class ="email" data-action="invokeAction" data-name="sendEmail" data-propertyname="' + propertyName + '">${0}</div>', [value]);
    }
    });

    ControlManager.register('email', { type: _type, ctor: control });
    return control;
});
