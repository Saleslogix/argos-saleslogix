/* 
 * See copyright file.
 */

/**
 * @class Mobile.SalesLogix.Services.PicklistService
 * Service that interfaces to quick forms.
 *
 * 
 * @alternateClassName PicklistService

 */
define('crm/Services/PicklistService', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/when',
    'dojo/_base/Deferred',
    'dojo/string',
    '../Models/PicklistModel',
    './_ModelServiceBase',
    './ServiceManager'

], function(
    declare,
    lang,
    when,
    Deferred,
    string,
    PicklistModel,
    _ModelServiceBase,
    ServiceManager
) {

    var service = declare('crm.Services.PicklistService', [_ModelServiceBase], {
        /**
         * @property {String}
         * The unique (within the current form) name of the model
         */
        name: 'picklistService',
        resourceKind: 'picklists',
        contractName: 'system',
        nameProperty: 'name',
        queryInclude: ['items'],
        querySelect: [
            'Id',
            'name',
            'allowMultiples',
            'valueMustExist',
            'required',
            'alphaSorted',
            'noneEditable',
            //Include modifyDate to ensure that local storage data stays current.
            'modifyDate',
            'items/text',
            'items/code',
            'items/number'
        ],
        Model: PicklistModel,
        constructor: function(o) {
            lang.mixin(this, o);
        },
        initModelData: function () {
            var dataPromise, queryOptions;
            queryOptions = {
                orderby:'name'
            };
            console.log('Started initializing picklists');
            dataPromise = this.getModels(queryOptions);
            dataPromise.then(function (models) {
                if (models) {
                    console.log('Finished loading: (' + models.length + ') picklists');
                } 
                console.log('Finished initializing picklists');
           });
        }
    });
    ServiceManager.register('picklistService', service);
    return service;
});
