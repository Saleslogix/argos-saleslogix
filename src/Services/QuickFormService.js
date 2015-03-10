/* 
 * See copyright file.
 */

/**
 * @class Mobile.SalesLogix.Services.QuickFormService
 * Service that interfaces to quick forms.
 *
 * 
 * @alternateClassName QuickFormService

 */
define('crm/Services/QuickFormService', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/when',
    'dojo/_base/Deferred',
    'dojo/string',
    '../Models/QuickFormModel',
    './_ModelServiceBase',
    './ServiceManager'

], function(
    declare,
    lang,
    when,
    Deferred,
    string,
    QuickFormModel,
    _ModelServiceBase,
    ServiceManager
) {

    var service = declare('crm.Services.QuickFormService', [_ModelServiceBase], {
        /**
         * @property {String}
         * The unique (within the current form) name of the model
         */
        name: 'QuickFormService',
        resourceKind: 'forms',
        queryWhere: "DefinitionType eq 'Sage.Platform.QuickForms.MobileQuickFormMainDetailViewDefinition, Sage.Platform.QuickForms'",
        queryOrderBy: 'name asc',
        Model: QuickFormModel,
        constructor: function(o) {
            lang.mixin(this, o);
        },
        initModelData: function () {
            var dataPromise, queryOptions;
            console.log('Started initializing quickforms');
            dataPromise = this.getModels(queryOptions);
            dataPromise.then(function (models) {
                if (models) {
                    console.log('Finished loading: (' + models.length + ') quickforms');
                }

                var pkls = App.serviceManager.get('picklistService');
                if (pkls) {
                    models.forEach(function (model) {
                        var picklists = model.getPicklistNames();
                        if (picklists) {
                            picklists.forEach(function (name) {
                                pkls.addRequest(name);
                            }.bind(this));
                        }
                    }.bind(this));
                    pkls.loadRequests();
                }
                console.log('Finished initializing quickforms');
           });
        },
        isFormLoaded: function (formName) {
          return  this.isModelLoaded(formName);
        }
        
    });
    ServiceManager.register('quickFormService', service);
    return service;
});
