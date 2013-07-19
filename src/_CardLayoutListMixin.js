/* Copyright © 1997-2013, SalesLogix, NA., LLC. All rights reserved.
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
 * @class Mobile.SalesLogix._CardLayoutListMixin
 
 */
define('Mobile/SalesLogix/_CardLayoutListMixin', [
    'dojo/_base/array',
    'dojo/_base/declare',
    'dojo/_base/event',
    'dojo/_base/lang',
    'dojo/dom-attr',
    'dojo/dom',
    'dojo/dom-construct',
    'dojo/query',

], function(
    array,
    declare,
    event,
    lang,
    domAttr,
    dom,
    domConstruct,
    query
) {

    return declare('Mobile.SalesLogix._CardLayoutListMixin', null, {
        itemColorClass:'color-default',
        itemIndicators:null,
        itemExts: null,
        itemIndicatorTemplate: new Simplate([
           '<span>',
                '<img src="{%= $.icon %}" alt="{%= $.label %}" />',
           '</span>'
        ]),
        itemExtTemplate: new Simplate([
            '<li data-dojo-attach-point="itemExtNode" class="card-item-ext-row"></li>'
        ]),
        itemTabTemplate: new Simplate([
            '<div class="{%! $$.itemColorClassTemplate %} list-item-content-tab ">',
            '<table><tr><td>',
            '<div><span>{%! $$.itemTabValueTemplate %}</span></div>',
            '</td></tr></table>',
           ' </div>'
        ]),
        itemColorClassTemplate: new Simplate([
           '{%: $$.itemColorClass %}'
        ]),
        itemTabValueTemplate: new Simplate([
           '{%: $.$descriptor %}'
        ]),
        itemIconSourceTemplate: new Simplate([
          '{%: $$.icon || $$.selectIcon %}'
        ]),
        postMixInProperties: function() {
            this.cls = ' card-layout';
            this.rowTemplate = new Simplate([
               '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}">',
                  '{%! $$.itemTabTemplate %}',
                  '<button data-action="selectEntry" class="list-item-selector button">',
                       '<img id="list_item_image_{%: $.$key %}"  src="{%! $$.itemIconSourceTemplate %}" class="icon" />',
                   '</button>',
                   '<div class="list-item-content" data-snap-ignore="true">{%! $$.itemTemplate %}</div>',
                   '<div id="item_Indicators" class="list-item-indicator-content"></div>',
                //     '<div class="card-list-item-ext-content" >{%! $$.itemExtTemplate %}</div>',
               '</li>'
            ]);
            this.createIndicatorLayout();
        },

        createIndicatorLayout: function() {
            return this.itemIndicators || {};
        },
        createIndicators: function(indicatorsNode, indicators, entry) {
            var indicatorTemplate, indicator, options;
            for (var i = 0; i < indicators.length; i++) {
                indicator = indicators[i];
                if (indicator.onApply) {
                    indicator.onApply(entry, indicator);
                }
                options = {
                    indicatorIndex: i,
                };
                indicatorTemplate = indicator.template || this.itemIndicatorTemplate;

                lang.mixin(indicator, options);

                domConstruct.place(indicatorTemplate.apply(indicator, indicator.id), indicatorsNode, 'last');
            }
        },

        onApplyRowTemplate: function(entry, rowNode) {

            this.applyRowIndicators(entry, rowNode);
            //this.applyRowExt(entry);

        },
        applyRowIndicators:function(entry, rowNode){
            var indicatorsNode;
            if (this.itemIndicators) {
                indicatorsNode = query('> #item_Indicators',rowNode);
                if (indicatorsNode[0]) {
                    if (indicatorsNode[0].childNodes.length === 0 && this.itemIndicators.length > 0) {
                        this.createIndicators(indicatorsNode[0], this._createCustomizedLayout(this.itemIndicators, 'indicators'), entry);
                    }
                }
            }
        },
        applyRowExt:function(entry){
            if(this.rowExts){

            }
        },
    });

});
