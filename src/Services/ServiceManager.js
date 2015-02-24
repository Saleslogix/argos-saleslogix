/* 
 * See copyright file.
 */

/**
 * @class crm.Services.ServiceManager
 * Service Manager is a registry for all services types that are used in the application
 * @alternateClassName ServiceManager
 * @singleton
 */
define('crm/Services/ServiceManager', [
    'dojo/_base/lang',
    'dojo/promise/all',
    'dojo/when',
    'dojo/_base/Deferred'

], function(
    lang,
    all,
    when,
    Deferred
) {
    var store = {};
    return lang.setObject('crm.Services.ServiceManager', {
        /**
         * @property {Object}
         * The type map that translates string type names to constructor functions
         */
        store: store,
       
        /**
         * Retrieves a constructor for the given service name
         * @param name Unique name of the service
         * @return {Function} Constructor for the given service name
         */
        register: function (name, ctor) {
            this.store[name] = { ctor: ctor, instance: null };
            return ctor;
        },
        init: function() {

           
        },
        get: function (name) {
            var instance, service;
            instance = null;
            service = this.store[name];
            if (service) {
                if (!service.instance) {
                    service.instance = new service.ctor();
                    service.instance.init();
                } 
                instance = service.instance;
            }            
            return instance;
        }
        
    });
});
