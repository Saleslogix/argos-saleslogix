/* 
 * See copyright file.
 */

/**
 * @class crm.Services._ModelServiceBase
 * The base class for all services.
 *
 * 
 * @alternateClassName _ModelServiceBase

 */
define('crm/Services/_ModelServiceBase', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/when',
    'dojo/_base/Deferred',
    'dojo/string',
    'argos/Store/SData',
    '../Models/_ModelBase',
    './_ServiceBase'

], function(
    declare,
    lang,
    when,
    Deferred,
    string,
    SData,
    _ModelBase,
    _ServiceBase
) {
    var _modelRequests = [];
    return declare('crm.Services._ModelServiceBase', [_ServiceBase], {
        
        
        /**
         * @property {String}
         * The unique (within the current form) name of the service
         */
        name: 'modelServiceBase',
        Model: _ModelBase,
        nameProperty: 'Name',
        service: null,
        contractName: 'metadata',
        /**
        * @cfg {String} resourceKind
        * The SData resource kind the view is responsible for.  This will be used as the default resource kind
        * for all SData requests.
        */
        resourceKind: '',
        /**
         * @cfg {String[]}
         * A list of fields to be selected in an SData request.
         */
        querySelect: null,
        /**
         * @cfg {String[]?}
         * A list of child properties to be included in an SData request.
         */
        queryInclude: null,
        /**
         * @cfg {String}
         * A where claus to filter the  SData request.
         */
        queryWhere: '',
        /**
         * @cfg {String}
         * A orderBy clause to sort the  SData request.
         */
        queryOrderBy: '',
        /**
         * @cfg {String?/Function?}
         * The default resource property for an SData request.
         */
        resourceProperty: null,
        /**
         * @cfg {String?/Function?}
         * The default resource predicate for an SData request.
         */
        resourcePredicate: null,

        itemsProperty: '$resources',
        idProperty: '$key',
        labelProperty: '$descriptor',
        entityProperty: '$name',
        versionProperty: '$etag',
        maxItems: 500,
        queryStore: null,
        _isInitalized: false,
        _modelRequests: _modelRequests,
        constructor: function(o) {
            this.service = App.getService(false);
            lang.mixin(this, o);
        },
        init: function () {
            if (!this._isInitalized) {
                this.initModelData();
            }
            this._isInitalized = true;
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
            var request,
                queryResults,
                deferred,
                model,
                models,
                queryStore,
                queryOptions;

            deferred = new Deferred();
            model = this.store[name];
            if ((!model) || refresh) {
                models = [];
                queryStore = this.getQueryStore();
                queryOptions = {
                    where: string.substitute(this.nameProperty + ' eq "${0}"', [name]),
                };
                queryResults = queryStore.query(null, queryOptions);
                when(queryResults, function (modelFeed) {
                    if (modelFeed) {
                        modelFeed.forEach(function (modelData) {
                            if (modelData.entity) {
                                model = this.addModel(modelData.entity[this.nameProperty], modelData);
                            } else {
                                model = this.addModel(modelData[this.nameProperty], modelData);
                            }
                            models.push(model);
                        }.bind(this));
                    }
                    deferred.resolve(models[0]);
                }.bind(this), function (err) {
                    deferred.reject(err);
                }.bind(this));

            } else {
                deferred.resolve(model);
            }
            return deferred.promise;
        },
        getModels: function (queryOptions, refresh) {
            var request,
                queryResults,
                deferred,
                model,
                models,
                queryStore;

            deferred = new Deferred();
            models = [];
            if (refresh) {
                this.store = {};
            }
            for (var name in this.store) {
               models.push(this.store[name]);
            }
            if ((models.length < 1) || refresh) {
                queryOptions = {start:0, count:this.maxItems};
                queryStore = this.getQueryStore();
                queryResults = queryStore.query(null,queryOptions);
                when(queryResults, function (modelFeed) {
                    if (modelFeed) {
                        modelFeed.forEach(function (modelData) {
                            if (modelData.entity) {
                                model = this.addModel(modelData.entity[this.nameProperty], modelData);
                            } else {
                                model = this.addModel(modelData[this.nameProperty], modelData);
                            }
                            models.push(model);
                        }.bind(this));
                    }
                    deferred.resolve(models);
                }.bind(this), function (err) {
                    deferred.reject(err);
                }.bind(this));

            } else {
                deferred.resolve(models);
            }
            return deferred.promise;
        },
        getLoadedModel: function (name) {
            return this.store[name];
        },
        addModel:function(name, modelData){
            var model = this.createModel(modelData);
            console.log('Loaded ' + model.type + ':' + name);
            this.store[name] = model;
            return model;
        },
        getQueryOptions: function () {
            var options = {
                service: this.service,
                contractName: this.contractName,
                resourceKind: this.resourceKind,
                resourceProperty: this.resourceProperty,
                resourcePredicate: this.resourcePredicate,
                include: this.queryInclude,
                select: this.querySelect,
                orderBy: this.queryOrderBy,
                where: this.queryWhere,
                itemsProperty: this.itemsProperty,
                idProperty: this.idProperty,
                labelProperty: this.labelProperty,
                entityProperty: this.entityProperty,
                versionProperty: this.versionProperty,
                start: 0,
                count: this.maxItems,
                scope: this
            };
            return options;
        },
        getQueryStore: function () {
            if (!this.queryStore) {
                var  options  = this.getQueryOptions();
                this.queryStore = new SData(options);
            }
            return this.queryStore;
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
        },
        addRequest: function (name) {
            this._modelRequests.push(name);
        },
        loadRequests: function(){
            
            this._modelRequests.forEach(function (name) {
                this.getModel(name);
            }.bind(this));

        },
        
    });
});
