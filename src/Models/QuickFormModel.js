/* 
 * See copyright file.
 */

/**
 * @class crm.Models.QuickFormModel
 * QuickFormModel wraps the Quick Form Model MetaData .
 *
 * 
 * @alternateClassName QuickFormModel
 * @extends crm.Models._ModelBase
 */
define('crm/Models/QuickFormModel', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    './_ModelBase',
    './QuickFormControls/ControlManager',
    './QuickFormControls/TextControl',
    './QuickFormControls/AddressControl',
    './QuickFormControls/EmailControl',
    './QuickFormControls/PhoneControl',
    './QuickFormControls/NameControl',
    './QuickFormControls/DateControl',
    './QuickFormControls/BooleanControl',
    './QuickFormControls/UrlControl',
    './QuickFormControls/OwnerControl',
    './QuickFormControls/UserControl',
    './QuickFormControls/PicklistControl',
    './QuickFormControls/LookupControl',
    './QuickFormControls/NumericControl',
    './QuickFormControls/CurrencyControl'

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

    return declare('crm.Models.QuickFormModel', [_ModelBase], {
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
        _select: null,
        /**
        * @property {Array}
        * An array of layouts that is created from the quick form metada data
        * and its control bindings durring initialization.
        */
        _layout:null,
        constructor: function(o) {
            //this._layout = [];
            //this._select = [];
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
        },
        createLayout: function(){
            this._layout = [];
            if (this.modelData) {
                this.modelData.entity.Controls.forEach(function (control) {
                    var layoutItem, controlModel, fieldControlOptions;

                    controlModel = this.getControlModel(control);
                    if (controlModel && controlModel.controlData.Visible && controlModel.controlData.Enabled) {
                        layoutItem = {
                            name: controlModel.getControlId(),
                            label: controlModel.getCaption(),
                            type: controlModel.getFieldControlType(),
                            property: controlModel.getParentProperty(),
                            parentPropertyPath: controlModel.getParentPropertyPath(),
                            valuePropertyPath: controlModel.getValuePropertyPath(),
                            selectPropertyPath: controlModel.getSelectPropertyPath(),
                            renderer: controlModel.getRenderer(),
                            column: control.Column,
                            row: control.Row,
                            tpl: controlModel.getTemplate(),
                            readonly: controlModel.getReadOnly(),
                            controlModel: controlModel
                        };
                        fieldControlOptions = controlModel.getFieldControlOptions();

                        if (fieldControlOptions) {
                            lang.mixin(layoutItem, fieldControlOptions);
                        }

                        if (layoutItem.property) {
                            this._layout.push(layoutItem);
                        }
                    }
                }.bind(this));
            }
            return this._layout;
        },
        createSelect: function () {
            var layout;
            this._select = [];
            layout = this.getLayout();
            if (layout) {
                layout.forEach(function (item) {
                    if (Array.isArray(item.selectPropertyPath)) {
                        item.selectPropertyPath.forEach(function (path) {
                            this._select.push(path);
                        }.bind(this));
                    } else {
                        this._select.push(item.selectPropertyPath);
                    }

                }.bind(this));
            }
            return this._select;
        },
        getLayout: function () {
            if (!this._layout) {
               this._layout = this.createLayout();
            }
            return this._layout;
        },
        getSelect: function () {
            if(!this._select){
               this._select = this.createSelect();
            }
            return this._select;
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
        getInclude:function(){
            return null;
        },
        _getResourceKind:function(){
            return 'unknown';
        }
    });
});

