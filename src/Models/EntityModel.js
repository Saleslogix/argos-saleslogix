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
define('Mobile/SalesLogix/Models/EntityModel', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'Sage/Platform/Mobile/Models/_ModelBase'
], function(
    declare,
    lang,
    _ModelBase
    ) {

    return declare('Mobile.SalesLogix.Models.EntityModel', [_ModelBase], {
        /**
         * @property {String}
         * The unique (within the current form) name of the model
         */
        name: 'EntityModel',
        dispalyName: 'EntityModel',
        displayNamePlural: 'Entity Models',
        modelData: {},
        entityType: null,
        service: null,
        contractName:'dynamic',
        resourceKind: null,
        resourceProperty: null,
        resourcePredicate: null,
        queryselect:null,
        idProperty: null,
        labelProperty: null,
        entityProperty: null,
        versionProperty: null,
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

