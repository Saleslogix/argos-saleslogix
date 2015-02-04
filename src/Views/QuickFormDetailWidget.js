/* Copyright (c) 2010, Sage Software, Inc. All rights reserved.
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


define('Mobile/SalesLogix/Views/QuickFormDetailWidget', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/event',
    'dojo/on',
    'dojo/string',
    'dojo/dom-class',
    'dojo/when',
    'dojo/_base/Deferred',
    'dojo/dom-construct',
    'dojo/query',
    'dojo/dom-attr',
    'dojo/_base/connect',
    'dojo/_base/array',
    'Sage/Platform/Mobile/Utility',
    'Sage/Platform/Mobile/Format',
    'dijit/_Widget',
    'Sage/Platform/Mobile/_Templated',
    'Sage/Platform/Mobile/RelatedViewManager',
    'Sage/Platform/Mobile/RelatedViewDetailWidget'


], function(
    declare,
    lang,
    event,
    on,
    string,
    domClass,
    when,
    Deferred,
    domConstruct,
    query,
    domAttr,
    connect,
    array,
    Utility,
    format,
    _Widget,
    _Templated,
    RelatedViewManager,
    RelatedViewDetailWidget
) {
    var quickFormView = declare('Mobile.SalesLogix.Views.QuickFormDetailWidget', [RelatedViewDetailWidget], {
        owner: null,
        id: 'quickform-related-detail-view',
        icon: 'content/images/icons/ContactProfile_48x48.png',
        iconClass: 'fa fa-building-o fa-2x',
        rows: 3,
        quickFormName: null,
        quickFormModel: null,
        quickFormService: null,
        constructor: function(options) {
            lang.mixin(this, options);
            this._subscribes = [];
            this._subscribes.push(connect.subscribe('/app/refresh', this, this._onAppRefresh));
        },
        postCreate:function(){
                      
        },        
        onInit: function(options) {
            this._isInitLoad = true;
            this.quickFormService = App.serviceManager.get('quickFormService');
            this.entityService = App.serviceManager.get('entityService');
            this.onLoad();
        },
        onLoad: function () {
            var promise;

            if (!this.loadingNode) {
                this.loadingNode = domConstruct.toDom(this.loadingTemplate.apply(this));
                domConstruct.place(this.loadingNode, this.contentNode, 'last', this);
            }
            domClass.toggle(this.loadingNode, 'loading');

            if (this.quickFormService) {
                if ((!this.quickFormName) && (this.owner.entityName)) {
                    this.quickFormName = this.owner.entityName + "MobileDetail";
                }
                if (this.quickFormName) {
                    promise = this.quickFormService.getModel(this.quickFormName);
                    promise.then(function (formModel) {
                        if (formModel) {
                            domClass.toggle(this.loadingNode, 'loading');
                            this.processFormModel(formModel);
                            //domClass.toggle(this.loadingNode, 'loading');
                        }
                    }.bind(this));
                }
            }
            
        },
        processFormModel: function(formModel){
            var promise, queryOptions;
            this.quickFormModel = formModel;
            this.layout = formModel.layout;
            this.formModel = formModel;
            if (!this.entityName) {
                this.entityName = formModel.getMainEntityName();
            }
            queryOptions = {
                select: formModel.getSelects(),
                include: formModel.getIncludes()
            };

            if (this.owner.entry) {
                promise = this.entityService.getEntityById(this.entityName, this.owner.entry.$key, queryOptions);
                promise.then(function (entity) {
                    this.entry = entity;
                    if (entity) {
                        domClass.toggle(this.loadingNode, 'loading');
                        this.processEntry(entity);
                    }
                }.bind(this));
            }
        },       
        getQuerySelect:function(){
        
        
        }
        
    });
    var rvm = new RelatedViewManager();
    rvm.registerType('quickFormDetail', quickFormView);
    return quickFormView;
});
