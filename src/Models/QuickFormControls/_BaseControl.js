/* 
 * See copyright file.
 */
define('crm/Models/QuickFormControls/_BaseControl', [
    'dojo/_base/declare',
    'dojo/_base/lang'
], function(
    declare,
    lang
) {
    var control = declare('crm.Models.QucikFormControls._BaseControl', null, {
        type:'text',
        valueBindingProperty: 'Text',
        controlData: {},
        caption: null,
        valueProperty: null,
        dataPropertyPath: null,

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
            this.dataPropertyPath = this.getDataBindDataPath();
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
        getParentProperty: function () {
            var dataPath = null;
            if (!this.valueProperty) {
                this.valueProperty = this.getDataBindProperty();
            }
            if (this.valueProperty) {
                dataPath = this.valueProperty.split('.');
            }
            if (dataPath) {
                return dataPath[0];
            }

        },
        getSelectPropertyPath: function () {
            return this.getDataBindDataPath();
        },
        getValuePropertyPath: function () {
            return this.getDataBindProperty();
        },
        getRenderer: function () {
            return null;
        },
        getTemplate: function () {
            return null;
        },
        getFieldControlType: function () {
            return 'text';
        },
        getFieldControlOptions: function () {
            return {};           
        },
        getValidator: function () {
            return null;
        },
        getReadOnly: function () {
            return this.controlData ? this.controlData.IsReadOnly : false;
        }
    });

    return control;
});
