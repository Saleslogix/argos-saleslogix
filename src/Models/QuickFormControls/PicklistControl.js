/* 
 * See copyright file.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/PicklistControl', [
    'dojo/_base/declare',
    './_BaseControl',
    './ControlManager',
    '../../Validator'
], function(
    declare,
    _BaseControl,
    ControlManager,
    validator
) {
    var _type = 'Sage.SalesLogix.QuickForms.QFControls.QFSLXPickList, Sage.SalesLogix.QuickForms.QFControls';
    var control = declare('crm.Models.QuickFormControls.PicklistControl', [_BaseControl], {
        name:'picklist',
        type: _type,
        valueBindingProperty: 'PickListValue',
        textBindingProperty: 'Text',
        getFieldControlType: function () {
            return 'picklist';
        },
        getFieldControlOptions: function () {
                    
            return {
                maxTextLength: this.getMaxLength(),
                picklist: this.getPicklistName(),
                singleSelect: this.isSingleSelect(),
                requireSelection: this.isRequired(),
                title: this.getPicklistTitle(),
                validator: this.getValidator()
            };
        },
        getPicklistName: function () {
            if (this.controlData) {
                return this.controlData.PickListName;
            }
        },
        getPicklistTitle: function () {
            if (this.controlData) {
                return this.controlData.Caption;
            }
        },
        isSingleSelect: function () {
            if (this.controlData && this.controlData.AllowMultiples) {
                return false;
            }
            return true;
        },
        isRequired: function () {
            if (this.controlData && this.controlData.Required) {
                return true;
            }
            return false;
        }
        
    });

    ControlManager.register('picklist', { type: _type, ctor: control });
    return control;
});
