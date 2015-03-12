/* 
 * See copyright file.
 */
define('crm/Models/QuickFormControls/PicklistControl', [
    'dojo/_base/declare',
    'dojo/string',
    '../../Format',
    './_BaseControl',
    './ControlManager',
    '../../Validator'
], function(
    declare,
    string,
    format,
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
        },
        getMode:function(){
            if (this.controlData.StorageMode) {
                return this.controlData.StorageMode;
            }
            return 'Text';
        },
        getValue: function (value) {
            var result, mode = this.getMode();
            if (mode === 'Code') {
                return this.getValueByCode(value);
            }
            if(mode === 'ID'){
                return this.getValueById(value);
            }
            return value;
        },
        getValueByCode: function(code){
            var value = code,
                pklModel = this.getPicklistModel();
            if (pklModel) {
                value = pklModel.getValueByCode(code);
            }
            return value;
        },
        getValueById:function(Id){
            var result,
                pklModel = this.getPicklistModel();
            result = Id;
            if (pklModel) {
                result = pklModel.getValueById(Id);
            }
            return result;
        },
        renderer: function (value, propertyName) {
            var result = this.getValue(value);
            if (!result) {
                result = '';
            }
            return result;
        },
        getPicklistModel: function () {
            var model, pkls;
            pkls = App.serviceManager.get('picklistService');
            if (pkls) {
                model = pkls.getLoadedModel(this.getPicklistName());
            }
            return model;
        }

        
    });

    ControlManager.register('picklist', { type: _type, ctor: control });
    return control;
});
