/* 
 * See copyright file.
 */
define('crm/Models/QuickFormControls/LinkControl', [
    'dojo/_base/declare',
    'dojo/string',
    'argos/Utility',
    './_BaseControl',
    './ControlManager'

], function(
    declare,
    string,
    utility,
    _BaseControl,
    ControlManager
) {
    var _type = 'Sage.Platform.QuickForms.QFControls.QFLink, Sage.Platform.QuickForms.QFControls';
    var control = declare('crm.Models.QuickFormControls.LinkControl', [_BaseControl], {
        name:'link',
        type: _type,
        valueBindingProperty: {
            'Text': true,
            //'EntityId': true
        },
        getFieldControlType: function () {
            return '';
        },
        getEntityName: function () {
            return 'Account';
        },
        getViewId: function () {
            return '';
        },
        renderer: function (entry, valueProperties) {
            var html,
                textProperty,
                keyProperty,
                value,
                entityName,
                entityId,
                viewId;

            textProperty = (Array.isArray(valueProperties)) ? valueProperties[0] : valueProperties;
            keyProperty = this.getParentProperty() + '.$key';
            value = utility.getValue(entry, textProperty, '');
            entityId = utility.getValue(entry, keyProperty, '');
            entityName = this.getEntityName();
            viewId = this.getViewId();
            html = string.substitute(
               '<div class ="href" data-action="invokeAction" data-name="goTo" data-viewid="${0}" data-entityname="${1}" data-entityId="${2}" data-textProperty="${4}" data-keyProperty="${5}">${3}</div>',
               [viewId, entityName, entityId, value, textProperty, keyProperty]);
            return html;
           },
    });

    ControlManager.register('link', { type: _type, ctor: control });
    return control;
});
