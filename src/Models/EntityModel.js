/* 
 * See copyright file.
 */

/**
 * @class crm.Models._ModelBase
 * Model is the base class for all data models.
 *
 * 
 * @alternateClassName _ModelBase

 */
define('crm/Models/EntityModel', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    './_ModelBase'
], function(
    declare,
    lang,
    _ModelBase
    ) {

    return declare('crm.Models.EntityModel', [_ModelBase], {

        /**
         * @property {String}
         * The unique type of the model.
         */
        type: 'EntityModel',

        /**
         * @property {String}
         * The unique (within the current enity) name of the model.
         */
        name: null,
        /**
        * @property {String}
        * The display name of the model.
        */
        dispalyName: 'EntityModel',
        /**
        * @property {String}
        * The plural display name of the model.
        */
        displayNamePlural: 'Entity Models',
        /**
        * @property {Object}
        * The raw json meta data of the model.
        */
        modelData: {},
        /**
        * @property {String}
        * The entity name of the model.
        * For Example 'Account', 'Contact' or 'Lead'
        */
        entityNmae: null,
        /**
        * @property {String}
        * The contract name to use to request the model.
        * For Example 'dynamic' or 'system'
        */
        contractName: 'dynamic',
        /**
        * @property {String}
        * The resesourceKind.
        * For Example 'dynamic' or 'system'
        */
        resourceKind: null,

        constructor: function(o) {
            lang.mixin(this, o);

        },
        init: function(){
            this.initModelData();
        },
        initModelData: function () {
            if (this.modelData) {
                this.resourceKind = this.modelData.displayNamePlural;
            }
        }

    });
});

