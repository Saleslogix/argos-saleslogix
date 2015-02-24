/* 
 * See copyright file.
 */

/**
 * @class Mobile.SalesLogix.Services._ServiceBase
 * The base class for all services.
 *
 * 
 * @alternateClassName _ServiceBase

 */
define('crm/Services/_ServiceBase', [
    'dojo/_base/declare',
    'dojo/_base/lang'

], function(
    declare,
    lang
) {
    var store = {};
    return declare('crm.Services._ServiceBase', null, {
        
        store: store,
        
        /**
         * @property {String}
         * The unique (within the current form) name of the service
         */
        name: 'baseService',
        
        constructor: function(o) {
            lang.mixin(this, o);
        },
        init: function () {
            
        }       
        
    });
});
