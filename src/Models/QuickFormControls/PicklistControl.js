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
        textBindingProperty: 'Text',
        getFieldControlType: function () {
            return 'picklist';
        },
        getFieldControlOptions: function () {
                    
            return {
                maxTextLength: this.getMaxLength(),
                picklist: this.getPicklistName(),
                singleSelect: this.isSingleSelect(),
                title: this.getPicklistTitle()
            };
        },
        getMaxLength: function () {
            if (this.controlData) {
                return this.controlData.MaxLength;
            }
        },
        getValidator: function () {
            return [validator.exceedsMaxTextLength, validator.notEmpty];
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
            if (this.controlData && this.controlData.AllowMulltiples) {
                return true;
            }
            return false;
        }
        
    });

    ControlManager.register('picklist', { type: 'Sage.SalesLogix.QuickForms.QFControls.QFSLXPickList, Sage.SalesLogix.QuickForms.QFControls', ctor: control });
    return control;
});
