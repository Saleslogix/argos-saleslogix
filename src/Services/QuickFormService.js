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
define('Mobile/SalesLogix/Services/QuickFormService', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/when',
    'dojo/_base/Deferred',
    'dojo/string',
    'Mobile/SalesLogix/Models/QuickFormModel',
    'Mobile/SalesLogix/Services/_ModelServiceBase',
    'Mobile/SalesLogix/Services/ServiceManager'

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

    var service = declare('Mobile.SalesLogix.Services.QuickFormService', [_ModelServiceBase], {
        /**
         * @property {String}
         * The unique (within the current form) name of the model
         */
        name: 'QuickFormService',
        resourceKind: 'forms',
        Model: QuickFormModel,
        constructor: function(o) {
            lang.mixin(this, o);
        },
        initModelData: function () {
            var dataPromise, queryOptions;
            queryOptions = {
                where: "DefinitionType eq 'Sage.Platform.QuickForms.MobileQuickFormMainDetailViewDefinition, Sage.Platform.QuickForms'"
            };
            console.log('Started initializing quickforms');
            dataPromise = this.getModels(queryOptions);
            dataPromise.then(function (models) {
                if (models) {
                    console.log('Finished loading: (' + models.length + ') quickforms');
                } 
                console.log('Finished initializing quickforms');
           });
        }
    });
    ServiceManager.register('quickFormService', service);
    return service;
});
