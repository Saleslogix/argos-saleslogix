/* 
 * See copyright file.
 */

/**
 * @class Mobile.SalesLogix.Services._ModelServiceBase
 * The base class for all services.
 *
 * 
 * @alternateClassName _ModelServiceBase

 */
define('Mobile/SalesLogix/Services/_ModelServiceBase', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/when',
    'dojo/_base/Deferred',
    'dojo/string',
    'Mobile/SalesLogix/Models/_ModelBase',
    'Mobile/SalesLogix/Services/_ServiceBase'

], function(
    declare,
    lang,
    when,
    Deferred,
    string,
    _ModelBase,
    _ServiceBase
) {

    return declare('Mobile.SalesLogix.Services._ModelServiceBase', [_ServiceBase], {
        
        
        /**
         * @property {String}
         * The unique (within the current form) name of the service
         */
        name: 'modelServiceBase',
        service: null,
        Model: _ModelBase,
        nameProperty: 'Name',
        resourceKind: null,
        contractName:'metadata',
        constructor: function(o) {
            this.service = App.getService(false);
            lang.mixin(this, o);
        },
        init: function () {
            this.initModelData();
        },
        initModelData: function () {
            var dataPromise;
            dataPromise = this.getModels();
            dataPromise.then(function (models) {
                if (models) {
                }
            });
        },
        getModel: function (name, refresh) {
            var request, queryResults, deferred, model;
            deferred = new Deferred();
            model = this.store[name];
            if ((!model) || refresh) {
                request = this.getModelRequest(name);
                queryResults = request.read({
                    success: function (modelData) {
                        model = this.addModel(name, modelData);
                        deferred.resolve(model);
                    }.bind(this),
                    failure: function (err) {
                        deferred.reject(err);
                    }.bind(this)
                });

            } else {
                deferred.resolve(model);
            }
            return deferred.promise;
        },
        getModels: function (queryOptions, refresh) {
            var request, queryResults, deferred, models;
            deferred = new Deferred();
            models = [];
            if (refresh) {
                this.store = {};
            }
            for (var name in this.store) {
               models.push(this.store[name]);
            }
            if ((models.length < 1)||refresh) {
                request = this.getModelsRequest(queryOptions);
                queryResults = request.read({
                    success: function (result) {
                        var model, modelData;
                        if(result.$resources){
                            result.$resources.forEach(function(modelData){
                                model = this.addModel(modelData.entity[this.nameProperty], modelData);
                                models.push(model);
                            }.bind(this));
                        }
                        deferred.resolve(models);
                    }.bind(this),
                    failure: function (err) {
                        deferred.reject(err);
                    }.bind(this)
                });

            } else {
                deferred.resolve(models);
            }
            return deferred.promise;
        },
        addModel:function(name, modelData){
            var model = this.createModel(modelData);
            console.log('Loaded ' + model.type + ' model: ' + model.name);
            this.store[name] = model;
            return model;
        },
        getModelRequest: function (name) {
            var request;
            request = new Sage.SData.Client.SDataSingleResourceRequest(this.service)
                     .setResourceKind(this.resourceKind)
                     .setContractName(this.contractName)
                     .setResourceSelector(string.substitute('"${0}"', [name]))
                     .setQueryArg('language', App.currentCulture != 'iv' ? App.currentCulture : '')
                     .setQueryArg('_indented', 'true');
            return request;

        },
        getModelsRequest: function (queryOptions) {
            var request;
            request = new Sage.SData.Client.SDataResourceCollectionRequest(this.service);
            request.setResourceKind(this.resourceKind);
            request.setContractName(this.contractName);
            request.setQueryArg('_indented', 'true');
            request.setQueryArg('language', App.currentCulture != 'iv' ? App.currentCulture : '');
            if ((queryOptions)&&(queryOptions.where)) {
                request.setQueryArg('where', queryOptions.where);
            }
            return request;

        },
        createModel: function (modelData) {
            var model = new this.Model({ modelData: modelData });
            model.init();
            return model;
        },
        isModelLoaded: function (name) {
            if (this.store[name]) {
                return true;
            }
            return false;
        }
        
        
    });
});
