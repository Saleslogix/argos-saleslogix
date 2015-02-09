/* 
 * See copyright file.
 */

/**
 * @class Sage.Platform.Mobile.Models._ModelBase
 * Model is the base class for all data models.
 *
 * 
 * @alternateClassName _ModelBase

 */
define('Mobile/SalesLogix/Models/QuickFormModel', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'Sage/Platform/Mobile/Models/_ModelBase',
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
    'Mobile/SalesLogix/Models/QuickFormControls/CurrencyControl',
    'Mobile/SalesLogix/Models/QuickFormControls/ControlManager'

], function(
    declare,
    lang,
    _ModelBase,
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
    CurrencyControl,
    controlManager
) {

    return declare('Mobile.SalesLogix.Models.QuickFormModel', [_ModelBase], {
        /**
         * @property {String}
         * The unique (within the current form) name of the model
         */
        name: 'QuickFormModel',
        dispalyName: 'Quick Form Model',
        displayNamePlural: 'Quick Form Models',
        modelData: {},
        entityType: null,
        resourceKind: null,
        select: [],
        include: [],
        layout: [],
        controlMaps:[
            {name: 'text', type: 'Sage.Platform.QuickForms.Controls.QFTextBox, Sage.Platform.QuickForms', ctor: TextControl},
            {name:'phone', type:'Sage.SalesLogix.QuickForms.QFControls.QFSLXPhone, Sage.SalesLogix.QuickForms.QFControls', ctor: PhoneControl},
            {name:'email', type:'Sage.SalesLogix.QuickForms.QFControls.QFSLXEmail, Sage.SalesLogix.QuickForms.QFControls', ctor: EmailControl},
            {name:'name', type:'Sage.SalesLogix.QuickForms.QFControls.QFSLXPersonName, Sage.SalesLogix.QuickForms.QFControls', ctor: NameControl},
            {name:'date', type:'Sage.SalesLogix.QuickForms.QFControls.QFDateTimePicker, Sage.SalesLogix.QuickForms.QFControls', ctor: DateControl},
            {name:'address', type:'Sage.SalesLogix.QuickForms.QFControls.QFSLXAddress, Sage.SalesLogix.QuickForms.QFControls', ctor: AddressControl},
            {name:'boolean', type:'Sage.Platform.QuickForms.QFControls.QFCheckBox, Sage.Platform.QuickForms.QFControls', ctor:BooleanControl},
            {name:'url', type:'Sage.SalesLogix.QuickForms.QFControls.QFSLXUrl, Sage.SalesLogix.QuickForms.QFControls', ctor:UrlControl},
            {name:'owner', type:'Sage.SalesLogix.QuickForms.QFControls.QFSLXOwner, Sage.SalesLogix.QuickForms.QFControls', ctor:OwnerControl},
            {name:'user',type:'Sage.SalesLogix.QuickForms.QFControls.QFSLXUser, Sage.SalesLogix.QuickForms.QFControls', ctor:UserControl},
            {name:'picklist',type:'Sage.SalesLogix.QuickForms.QFControls.QFSLXPickList, Sage.SalesLogix.QuickForms.QFControls', ctor:PicklistControl},
            {name:'lookup',type:'Sage.SalesLogix.QuickForms.QFControls.QFSLXLookup, Sage.SalesLogix.QuickForms.QFControls',ctor: LookupControl },
            {name:'numeric', type: 'Sage.SalesLogix.QuickForms.QFControls.QFSLXNumeric, Sage.SalesLogix.QuickForms.QFControls', ctor: NumericControl},
            {name:'currency',type:'Sage.SalesLogix.QuickForms.QFControls.QFSLXCurrency, Sage.SalesLogix.QuickForms.QFControls',ctor: CurrencyControl}
        ],
        constructor: function(o) {
            this.layout = [];
            lang.mixin(this, o);
        },
        init: function(){
            this.initModelData();
        },      
        initModelData: function () {
            this.resourceKind = this._getResourceKind();
            this.entityType = this.modelData.entity.EntityTypeName;
            this.name = this.modelData.entity.Name;
            this.initLayout();
            this.initSelect();
        },
        initLayout: function(){
            this.layout = [];
            if (this.modelData) {
                this.modelData.entity.Controls.forEach(function (control) {
                    var layout, controlModel;
                    controlModel = this.getControlModel(control);
                    if (controlModel) {
                        layout = {
                            name: controlModel.getControlId(),
                            label: controlModel.getCaption(),
                            type: controlModel.type,
                            property: controlModel.valueProperty, 
                            valueDataPath: controlModel.valueDataPath,
                            renderer: controlModel.getRenderer(),
                            column: control.Column,
                            row: control.Row,
                            tpl: controlModel.getTemplate(),
                            controlModel: controlModel
                        };
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
                    this.select.push(item.valueDataPath);
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

            //this.controlMaps.forEach(function (map) {
            //    if (map.type === control.$type) {
            //        selMap = map;
            //    }
            //});
            if (!selMap) {
                selMap = {type:'', ctor:TextControl};
            }
            return selMap;
        },
        getMainEntityName: function () {
            return this.entityType.substring(1);
        },
        getSelects:function(){
            return this.select;
        },
        getIncludes:function(){
            return null;
        },
        _getResourceKind:function(){
               
            return 'unknown';
        }
    });
});

