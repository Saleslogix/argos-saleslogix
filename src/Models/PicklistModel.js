/* 
 * See copyright file.
 */

/**
 * @class crm.Models.PicklistModel
 *  *
 * 
 * @alternateClassName _ModelBase

 */
define('crm/Models/PicklistModel', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    './_ModelBase'
], function(
    declare,
    lang,
    _ModelBase
    ) {

    return declare('crm.Models.PicklistModel', [_ModelBase], {

        /**
         * @property {String}
         * The unique type of the model.
         */
        type: 'PicklistModel',

        /**
         * @property {String}
         * The unique (within the current picklist) name of the model.
         */
        name: null,
        /**
        * @property {String}
        * The display name of the model.
        */
        dispalyName: 'PicklistModel',
        /**
        * @property {String}
        * The plural display name of the model.
        */
        displayNamePlural: 'PicklistModels',
        /**
        * @property {Object}
        * The raw json meta data of the model.
        */
        modelData: {},
        /**
        * @property {String}
        * The picklist name of the model.
        * For Example 'Account Status', 'AccountType' 
        */
        entityName: null,
        /**
        * @property {String}
        * The contract name to use to request the model.
        * For Example 'dynamic' or 'system'
        */
        contractName: 'system',
        /**
        * @property {String}
        * The resesourceKind.
        * For Example 'dynamic' or 'system'
        */
        resourceKind: 'picklists',
        constructor: function(o) {
            this.modelData = {};
            //this.name = o.name;
            lang.mixin(this, o);

        },
        init: function(){
            this.initModelData();
        },
        initModelData: function () {
            if (this.modelData) {
                //this.
            }
        },
        getValueByCode: function (code) {
            var value = '<Not Found>',
                items = this.getItems();
            items.forEach(function (item) {
                if (item.code === code) {
                    value = item.Text;
                }
            }.bind(this));
            return value;
        },
        getValueById: function (Id) {
            var value ='<Not Found>',
                items = this.getItems();
            items.forEach(function(item){
                if (item.$key === Id) {
                    value = item.text;
                }
            }.bind(this));
            return value;
        },
        getItems: function () {
            var items = [];
            if (this.modelData && this.modelData.items && this.modelData.items.$resources) {
                items = this.modelData.items.$resources;
            }
            return items
        }
    });
});

