/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Models/QuickFormControls/_BaseControl', [
    'dojo/_base/declare',
    'dojo/_base/lang'
], function(
    declare,
    lang
) {
    var control = declare('Mobile.SalesLogix.Models.QucikFormControls._BaseControl', null, {
        type:'text',
        valueBindingProperty: 'Text',
        controlData: {},
        caption: null,
        valueProperty: null,
        valueDataPath: null,

        constructor: function (o) {
            var data = { controlData: o };
            lang.mixin(this, data);
            this.init();
        },
        getControlId: function () {
            return this.controlData.ControlId;
        },
        init: function () {
            this.caption = this.getCaption();
            this.valueProperty = this.getDataBindProperty();
            this.valueDataPath = this.getDataBindDataPath();
        },
        getCaption: function () {
            return this.controlData.Caption;
        },
        getDataBindProperty: function () {
            var property;
            this.controlData.DataBindings.forEach(function (binding) {
                var subentity;
                if ((binding.BindingType === 'Property') && (binding.ControlItemName === this.valueBindingProperty)) {
                    property = binding.DataItemName;
                }      

            }.bind(this));
            return property;
        },
        getDataBindDataPath: function () {
            var dataPath = null;
            if(!this.valueProperty){
                this.valueProperty = this.getDataBindProperty();
            } 
            if (this.valueProperty) {
               dataPath = this.valueProperty.replace('.', '/');
            }
            return dataPath;
        },
        getRenderer: function () {
            return null;
        },
        getTemplate: function () {
            return null;
        }
    });

    return control;
});
