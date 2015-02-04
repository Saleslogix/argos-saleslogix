/* Copyright (c) 2014, SalesLogix, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
    'Sage/Platform/Mobile/Services/ServiceManager'

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
            
            dataPromise = this.getModels(queryOptions);
            dataPromise.then(function (models) {
                if (models) {

                }
            });

        },
        
      
    });
    ServiceManager.register('quickFormService', service);
    return service;
});
