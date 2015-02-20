/* 
 * See copyright file.
 */

/**
 * @class Mobile.SalesLogix.Models.QuickFormModel
 * QuickFormModel wraps the Quick Form Model MetaData .
 *
 * 
 * @alternateClassName QuickFormModel
 * @extends Mobile.SalesLogix.Models._ModelBase
 */
define('Mobile/SalesLogix/Models/QuickFormModel', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'Mobile/SalesLogix/Models/_ModelBase',
    'Mobile/SalesLogix/Models/QuickFormControls/ControlManager',
    'Mobile/SalesLogix/Models/QuickFormControls/TextControl',
    'Mobile/SalesLogix/Models/QuickFormControls/AddressControl',
    'Mobile/SalesLogix/Models/QuickFormControls/EmailControl',
    'Mobile/SalesLogix/Models/QuickFormControls/PhoneControl',
    'Mobile/SalesLogix/Models/QuickFormControls/NameControl',
    'Mobile/SalesLogix/Models/QuickFormControls/DateControl',
    'Mobile/SalesLogix/Models/QuickFormControls/BooleanControl',
    'Mobile/SalesLogix/Models/QuickFormControls/UrlControl',
    'Mobile/SalesLogix/Models/QuickFormControls/OwnerControl',
    'Mobile/SalesLogix/Models/QuickFormControls/UserControl',
    'Mobile/SalesLogix/Models/QuickFormControls/PicklistControl',
    'Mobile/SalesLogix/Models/QuickFormControls/LookupControl',
    'Mobile/SalesLogix/Models/QuickFormControls/NumericControl',
    'Mobile/SalesLogix/Models/QuickFormControls/CurrencyControl'

], function(
    declare,
    lang,
    _ModelBase,
    controlManager,
    TextControl,
    AddressControl,
    EmailControl,
    PhoneControl,
    NameControl,
    DateControl,
    BooleanControl,
    UrlControl,
    OwnerControl,
    UserControl,
    PicklistControl,
    LookupControl,
    NumericControl,
    CurrencyControl

) {

    return declare('Mobile.SalesLogix.Models.QuickFormModel', [_ModelBase], {
        /**
         * @property {String}
         * The unique type of model.
         */
        type: 'QuickFormModel',
        /**
        * @property {String}
        * The unique (within the current form) name of the quick form model.
        */
        name: null,
        /**
         * @property {String}
         * The entity type name that the form was bound to, 
         * for example "IAccount" or "IContact" 
         */
        entityTypeName: null,
        /**
        * @property {String}
        * The resourceKind that is related to the entity type that form is bound to,
        * for example "accounts" or "contacts".
        */
        resourceKind: null,
        /**
        * @property {Array}
        * An array of the properties that is created from the quick form metadata 
        * and its bindings durring initialization.
        */
        select: null,
        /**
        * @property {Array}
        * An array of layouts that is created from the quick form metada data
        * and its control bindings durring initialization.
        */
        layout:null,
        constructor: function(o) {
            this.layout = [];
            this.select = [];
            this.modelData = {};
            lang.mixin(this, o);
        },
        /**
         * Called from QuickFormService when after an instance is created.
         * Titem using the currently selected row as context by passing the action instance the selected row to the
         * action items `enabled` property.
         * @param {Object} selection 
         */
        init: function(){
            this.initModelData();
        },      
        initModelData: function () {
            this.resourceKind = this._getResourceKind();
            this.entityTypeName = this.modelData.entity.EntityTypeName;
            this.name = this.modelData.entity.Name;
            this.initLayout();
            this.initSelect();
        },
        initLayout: function(){
            this.layout = [];
            if (this.modelData) {
                this.modelData.entity.Controls.forEach(function (control) {
                    var layout, controlModel, fieldControlOptions;

                    controlModel = this.getControlModel(control);
                    if ((controlModel) && (controlModel.controlData.Visible)) {
                        layout = {
                            name: controlModel.getControlId(),
                            label: controlModel.getCaption(),
                            type: controlModel.getFieldControlType(),
                            property: controlModel.getParentProperty(),
                            valuePropertyPath:controlModel.getValuePropertyPath(),
                            selectPropertyPath:controlModel.getSelectPropertyPath(),
                            renderer: controlModel.getRenderer(),
                            column: control.Column,
                            row: control.Row,
                            tpl: controlModel.getTemplate(),
                            readonly: controlModel.getReadOnly(),
                            controlModel: controlModel
                        };
                        if (!layout.readonly) {
                            fieldControlOptions = controlModel.getFieldControlOptions();
                            lang.mixin(layout, fieldControlOptions);
                        }

                        if (layout.property) {
                            this.layout.push(layout);
                        }
                    }
                }.bind(this));
            }
        },
        initSelect: function () {
            this.select = [];
            if (this.layout) {
                this.layout.forEach(function (item) {
                    this.select.push(item.selectPropertyPath);
                }.bind(this));
            }
        },
        getControlModel: function (control) {
            var controlMap, controlModel;
            try{
                controlMap = this.getControlMap(control);
                controlModel = new controlMap.ctor(control);
            } catch (error) {

            }
            return controlModel;
        },
        getControlMap: function(control){
            var selMap;
            selMap = controlManager.getByType(control.$type);
            if (!selMap) {
                selMap = {type:'', ctor:TextControl};
            }
            return selMap;
        },
        getMainEntityName: function () {
            return this.entityTypeName.substring(1);
        },
        getSelect:function(){
            return this.select;
        },
        getInclude:function(){
            return null;
        },
        _getResourceKind:function(){
               
            return 'unknown';
        }
    });
});

