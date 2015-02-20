/* 
 * See copyright file.
 */

/**
 * @class Mobile.SalesLogix.Model._ModelBase
 * Model is the base class for all data models. It describes all the functions a model should support giving no implementation itself, merely a shell. The one function that `_Field` does provide that most fields leave untouched is `validate`.
 *
 * 
 * @alternateClassName _ModelBase
 */
define('Mobile/SalesLogix/Models/_ModelBase', [
    'dojo/_base/declare',
    'dojo/_base/lang'

], function(
    declare,
    lang
) {

    return declare('Mobile.SalesLogix.Models._ModelBase', null, {
        /**
         * @property {String}
         * The unique type of the model.
         */
        type: 'baseModel',
         /**
         * @property {String}
         * The unique name of the model
         */
        name: null,
        dispalyName: 'baseModel',
        displayNamePlural: 'baseModels',
        constructor: function(o) {
            lang.mixin(this, o);

        },
        init: function(){

         
        }
        
        
    });
});
