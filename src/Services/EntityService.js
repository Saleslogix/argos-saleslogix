/* 
 * See copyright file.
 */

/**
 * @class Mobile.SalesLogix.Services.EntityService
 * Service that interfaces to enity models.
 *
 * 
 * @alternateClassName EntityService

 */
define('Mobile/SalesLogix/Services/EntityService', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/when',
    'dojo/_base/Deferred',
    'dojo/string',
    'Sage/Platform/Mobile/Store/SData',
    'Mobile/SalesLogix/Models/EntityModel',
    'Mobile/SalesLogix/Services/_ModelServiceBase',
    'Sage/Platform/Mobile/Services/ServiceManager'

], function(
    declare,
    lang,
    when,
    Deferred,
    string,
    SData,
    EntityModel,
    _ModelServiceBase,
    ServiceManager
) {
    var service = declare('Mobile.SalesLogix.Services.EntityService', [_ModelServiceBase], {
                    
        /**
         * @property {String}
         * The unique (within the current form) name of the model
         */
        name: 'EntityService',
        resourceKind: 'entities',
        Model: EntityModel,
        constructor: function (o) {
            lang.mixin(this, o);

        },
        getEntityById: function (entityName, entityId, queryOptions) {
            var promise, entityStore, request, queryResults, deferred, model;
            deferred = new Deferred();
            promise = this.getModel(entityName);         
            promise.then(function (model) {
                if (model) {
                    entityStore = this.getEntityStore(model);
                    queryResults = entityStore.get(entityId, queryOptions);
                    when(queryResults, function (entityFeed) {
                        var entity, odef = deferred;
                        entity = queryResults.results[0];                        
                        deferred.resolve(entity);                        
                    }.bind(this), function (err) {
                        deferred.reject(err);
                    }.bind(this));
                }
            }.bind(this));
           
            return deferred.promise;
        },
        getEntityStore: function (entityModel, queryOptions) {
            var store, modelOptions; 
            modelOptions = {
                service: this.service,
                contractName: entityModel.contractName,
                resourceKind: entityModel.resourceKind,
                resourceProperty: entityModel.resourceProperty,
                resourcePredicate: entityModel.resourcePredicate,
                select: entityModel.querySelect,
                idProperty: entityModel.primaryKey,
                labelProperty: entityModel.labelProperty,
                entityProperty: entityModel.entityProperty,
                versionProperty: entityModel.versionProperty,
                scope: this
            };
            modelOptions = lang.mixin(modelOptions, queryOptions);
            store = new SData(modelOptions);
            return store;
        }
       
    });
    ServiceManager.register('entityService', service);
    return service;
});
