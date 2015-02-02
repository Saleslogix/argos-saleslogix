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
        controlData:{},
        constructor: function (o) {
            var data = { controlData: o };
            lang.mixin(this, data);
        },
        getControlId: function () {
            return this.controlData.ControlId;
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
        getRenderer: function () {
            return null;
        },
        getTemplate: function () {
            return null;
        }
    });

    return control;
});
