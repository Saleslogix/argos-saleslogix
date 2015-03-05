/* 
 * See copyright file.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/PhoneControl', [
    'dojo/_base/declare',
    'dojo/string',
    '../../Format',
    './_BaseControl',
    './ControlManager'
], function(
    declare,
    string,
    format,
    _BaseControl,
    ControlManager
) {
    var _type = 'Sage.SalesLogix.QuickForms.QFControls.QFSLXPhone, Sage.SalesLogix.QuickForms.QFControls';
    var control = declare('crm.Models.QuickFormControls.PhoneControl', [_BaseControl], {
        name: 'phone',
        type: _type,
        valueBindingProperty: 'Text',
        getFieldControlType: function () {
            return 'phone';
        },
        renderer: function (value, propertyName) {
            var result = format.phone(value);
            if (!result) {
                result = '';
            }
            return string.substitute(
                '<div class ="phone" data-action="invokeAction" data-name="callPhone" data-propertyname="' + propertyName + '">${0}</div>', [result]);
        }
    });

    ControlManager.register('phone', { type: _type, ctor: control });
    return control;
});
