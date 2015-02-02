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
 * @class Sage.Platform.Mobile.Models._ModelBase
 * Model is the base class for all data models.
 *
 * 
 * @alternateClassName _ModelBase

 */
define('Mobile/SalesLogix/Models/EntityModel', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'Sage/Platform/Mobile/Models/_ModelBase',   

], function(
    declare,
    lang,
    _ModelBase
    ) {

    return declare('Mobile.SalesLogix.Models.EntityModel', [_ModelBase], {
        
        
        /**
         * @property {String}
         * The unique (within the current form) name of the model
         */
        name: 'EntityModel',
        dispalyName: 'EntityModel',
        displayNamePlural: 'Entity Models',
        modelData: {},
        entityType: null,
        service: null,
        contractName:'Dynamic',
        resourceKind: null,
        resourceProperty: null,
        resourcePredicate: null,
        queryselect:null,
        idProperty: null,
        labelProperty: null,
        entityProperty: null,
        versionProperty: null,
        constructor: function(o) {
            lang.mixin(this, o);
            
        },
        init: function(){
            this.initModelData();
        },      
        initModelData: function () {
            if (this.modelData) {
                this.resourceKind = this.modelData.displayNamePlural;
            }
        }      
       
    });
});

