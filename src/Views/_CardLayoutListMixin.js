/* Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.*/

/**
 * @class Mobile.SalesLogix.Views._CardLayoutListMixin
 
 */
define('Mobile/SalesLogix/Views/_CardLayoutListMixin', [
    'dojo/_base/array',
    'dojo/_base/declare',
    'dojo/_base/event',
    'dojo/_base/lang',
    'dojo/dom-attr',
    'dojo/dom',
    'dojo/dom-construct',
    'dojo/query',
    'dojo/dom-class',
    'Sage/Platform/Mobile/Convert'

], function(
    array,
    declare,
    event,
    lang,
    domAttr,
    dom,
    domConstruct,
    query,
    domClass,
    Convert
) {

    return declare('Mobile.SalesLogix.Views._CardLayoutListMixin', null, {
        itemColorClass: 'color-default',
        itemIcon: 'content/images/icons/ContactProfile_48x48.png',
        itemIndicators:null,
        itemExts: null,
        itemTabValueProperty: '$descriptor',
        itemTabShowValue: false,
        itemTabShowGroupValue: false,
        itemIndicatorIconPath: 'content/images/icons/',
        itemIndicatorShowDisabled: true,
        itemIndicatorTemplate: new Simplate([
           '<span class="{%= $.cls %}" >',
                '{% if ($.showIcon === false) { %}',
                     '{%: $.valueText %}',
                '{% } else { %}',
                      '<img src="{%= $.indicatorIcon %}" alt="{%= $.label %}" />',
                 '{% } %}',
           '</span>'
        ]),
        itemExtTemplate: new Simplate([
            '<li data-dojo-attach-point="itemExtNode" class="card-item-ext-row"></li>'
        ]),
        itemTabTemplate: new Simplate([
            '<div class="{%: $$.getItemColorClass($) %} list-item-content-tab ">',
            '<table><tr><td>',
            '<div><span>{%: $$.getItemTabValue($) %}</span></div>',
            '</td></tr></table>',
           ' </div>'
        ]),
        itemRowContainerTemplate: new Simplate([
        '<li data-action="activateEntry" data-key="{%= $$.getItemActionKey($) %}" data-descriptor="{%: $$.getItemDescriptor($) %}"  data-color-class="{%: $$.getItemColorClass($) %}" >',
            '{%! $$.itemRowContentTemplate %}',
        '</li>'
        ]),
        itemFooterTemplate: new Simplate([
            '<div id="list-item-footer" class="list-item-footer">',
            '<div">',
            '<button data-action="selectEntry" class="footer-item-selector button ">',
            '<img src="content/images/icons/Show_Details_active_24.png" alt="Actions" >',
            '</button>',
            '</div>',
            '</div>'
        ]),
        itemRowContentTemplate: new Simplate([
           '{%! $$.itemTabTemplate %}',
            '<div id="top_item_indicators" class="list-item-indicator-content"></div>',
            '<button data-action="selectEntry" class="list-item-selector button">',
            '<img id="list-item-image_{%: $.$key %}" src="{%: $$.getItemIconSource($) %}" class="icon" />',
            '</button>',
            '<div class="list-item-content" data-snap-ignore="true">{%! $$.itemTemplate %}</div>',
            '<div id="bottom_item_indicators" class="list-item-indicator-content"></div>',
            '{%! $$.itemFooterTemplate %}'
        ]),
        postMixInProperties: function() {
            this.inherited(arguments);
            this.cls = ' card-layout';
            this.rowTemplate = new Simplate([
             '{%! $$.itemRowContainerTemplate %}'
            ]);
            this.listActionTemplate = new Simplate([
                '<li data-dojo-attach-point="actionsNode" class="card-layout actions-row  {%: $$.itemColorClass %}"></li>'
            ]),

            this.createIndicatorLayout();
        },
        startup: function() {
            this.inherited(arguments);
            this._intFooter();

        },
        _intFooter: function(){
            if (!this.actions.length) {

                this.itemFooterTemplate = new Simplate(['']);
            }
        },
        getItemActionKey: function(entry) {
            return entry.$key
        },
        getItemDescriptor: function(entry) {
            return entry.$descriptor
        },
        getItemTabValue: function(entry) {
            var value = '';

            if (this.itemTabShowValue) {
                if (this.itemTabShowGroupValue) {
                    value = entry["$groupTitle"];
                } else {
                     value = entry[this.itemTabValueProperty];
                }
            }
            return value;

        },
        getItemColorClass: function(entry) {
            return this.itemColorClass;
        },
        getItemIconSource: function(entry) {
            return this.itemIcon || this.icon || this.selectIcon
        },
        createIndicatorLayout: function() {
            return this.itemIndicators || {};
        },
        createIndicators: function(topIndicatorsNode, bottomIndicatorsNode, indicators, entry) {
            var indicatorTemplate, indicator, options, indicatorHTML, i;
            for (i = 0; i < indicators.length; i++) {
                indicator = indicators[i];

                if (indicator.onApply) {
                    try{
                        indicator.onApply(entry, this);
                    }catch(err){
                        indicator.isEnabled = false;
                    }
                }
                options = {
                    indicatorIndex: i,
                    indicatorIcon: this.itemIndicatorIconPath + indicator.icon,
                };
                indicatorTemplate = indicator.template || this.itemIndicatorTemplate;

                lang.mixin(indicator, options);

                if (indicator.isEnabled === false) {
                    indicator.indicatorIcon = this.itemIndicatorIconPath + 'disabled_' + indicator.icon
                    indicator.label = '';
                } else {
                    indicator.indicatorIcon + indicator.icon;
                }
                
                if (indicator.isEnabled === false && indicator.showIcon === false) {
                    continue;
                }
                
                if (this.itemIndicatorShowDisabled || indicator.isEnabled) {

                    if (indicator.isEnabled === false && indicator.showIcon === false) {
                        continue;
                    } else {

                        indicatorHTML = indicatorTemplate.apply(indicator, indicator.id);
                        if (indicator.location === 'top') {
                            domConstruct.place(indicatorHTML, topIndicatorsNode, 'last');
                        } else {
                            domConstruct.place(indicatorHTML, bottomIndicatorsNode, 'last');
                        }
                    }
                }
            }
        },

        onApplyRowTemplate: function(entry, rowNode) {

            this.applyRowIndicators(entry, rowNode);

        },
        applyRowIndicators:function(entry, rowNode){
            var topIndicatorsNode, bottomIndicatorsNode;
            if (this.itemIndicators && this.itemIndicators.length > 0) {
                topIndicatorsNode = query('> #top_item_indicators', rowNode);
                bottomIndicatorsNode = query('> #bottom_item_indicators', rowNode);
                if (bottomIndicatorsNode[0] && topIndicatorsNode[0]) {
                    if (bottomIndicatorsNode[0].childNodes.length === 0 && topIndicatorsNode[0].childNodes.length === 0 ) {
                        this.createIndicators(topIndicatorsNode[0], bottomIndicatorsNode[0], this._createCustomizedLayout(this.itemIndicators, 'indicators'), entry);
                    }
                }
            }
        },
        createIndicatorLayout: function() {
            return this.itemIndicators || (this.itemIndicators = [{
                id: 'Touched',
                icon: 'Touched_24x24.png',
                label: 'Touched',
                onApply: function(entry, parent) {
                    this.isEnabled = parent.hasBeenTouched(entry);
                }
            }]
            );
        },
        hasBeenTouched: function(entry) {
            var modifydDate, currentDate, seconds, hours, days;
            if (entry['ModifyDate']) {
                modifydDate = Convert.toDateFromString(entry['ModifyDate']);
                currentDate = new Date();
                seconds = Math.round((currentDate - modifydDate) / 1000);
                hours = seconds / 360;
                days = hours / 24;
                if (days <= 7) {
                    return true;
                }
            }
            return false;
        }
    });

});
