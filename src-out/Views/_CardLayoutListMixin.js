/* Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.*/
/**
 * @class crm.Views._CardLayoutListMixin
 *
 * Mixin for card list layouts.
 *
 * @since 3.0
 *
 * @requires argos.Convert
 *
 */
define('crm/Views/_CardLayoutListMixin', [
    'dojo/_base/array',
    'dojo/_base/declare',
    'dojo/_base/event',
    'dojo/_base/lang',
    'dojo/dom-attr',
    'dojo/dom',
    'dojo/dom-construct',
    'dojo/query',
    'dojo/dom-class',
    'argos/Convert',
    'moment'
], function (array, declare, event, lang, domAttr, dom, domConstruct, query, domClass, convert, moment) {
    var mixinName, __class;
    mixinName = 'crm.Views._CardLayoutListMixin';
    __class = declare('crm.Views._CardLayoutListMixin', null, {
        itemIcon: 'content/images/icons/man_1.png',
        itemIconAltText: 'Contact',
        itemIconClass: '',
        allRecordsText: 'no search applied',
        itemIndicators: null,
        itemExts: null,
        itemIndicatorIconPath: 'content/images/icons/',
        itemIndicatorShowDisabled: true,
        currentSearchExpression: '',
        itemIndicatorTemplate: new Simplate([
            '<span{% if ($.iconCls) { %} class="{%= $.iconCls %}" {% } %}>',
            '{% if ($.showIcon === false) { %}',
            '{%: $.valueText %}',
            '{% } else if ($.indicatorIcon && !$.iconCls) { %}',
            '<img src="{%= $.indicatorIcon %}" alt="{%= $.label %}" />',
            '{% } %}',
            '</span>'
        ]),
        itemExtTemplate: new Simplate([
            '<li data-dojo-attach-point="itemExtNode" class="card-item-ext-row"></li>'
        ]),
        itemRowContainerTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $$.getItemActionKey($) %}" data-descriptor="{%: $$.getItemDescriptor($) %}">',
            '{%! $$.itemRowContentTemplate %}',
            '</li>'
        ]),
        itemFooterTemplate: new Simplate([
            '<div id="list-item-footer" class="list-item-footer">',
            '</div>'
        ]),
        itemIconTemplate: new Simplate([
            '<button data-action="selectEntry" class="list-item-selector button">',
            '{% if ($$.getItemIconClass($)) { %}',
            '<span class="{%= $$.getItemIconClass($) %}"></span>',
            '{% } else { %}',
            '<img id="list-item-image_{%: $.$key %}" src="{%: $$.getItemIconSource($) %}" alt="{%: $$.getItemIconAlt($) %}" class="icon" />',
            '{% } %}',
            '</button>'
        ]),
        itemRowContentTemplate: new Simplate([
            '<div id="top_item_indicators" class="list-item-indicator-content"></div>',
            '{%! $$.itemIconTemplate %}',
            '<div class="list-item-content" data-snap-ignore="true">{%! $$.itemTemplate %}</div>',
            '<div id="bottom_item_indicators" class="list-item-indicator-content"></div>',
            '<div id="list-item-content-related"></div>',
            '{%! $$.itemFooterTemplate %}'
        ]),
        postMixInProperties: function () {
            this.inherited(arguments);
            this.cls = ' card-layout';
            this.rowTemplate = new Simplate([
                '{%! $$.itemRowContainerTemplate %}'
            ]);
            this.createIndicatorLayout();
        },
        placeAt: function () {
            this.inherited(arguments);
            this._intFooter();
        },
        show: function (options) {
            if (options && options.simpleMode && (options.simpleMode === true)) {
                this.itemFooterTemplate = new Simplate([]);
            }
            this.inherited(arguments);
        },
        _intFooter: function () {
            if (!this.actions.length) {
                this.itemFooterTemplate = new Simplate(['']);
            }
        },
        getItemActionKey: function (entry) {
            return entry.$key || entry[this.idProperty];
        },
        getItemDescriptor: function (entry) {
            return entry.$descriptor || entry[this.labelProperty];
        },
        getItemIconClass: function () {
            return this.itemIconClass;
        },
        getItemIconSource: function () {
            return this.itemIcon || this.icon || this.selectIcon;
        },
        getItemIconAlt: function () {
            return this.itemIconAltText;
        },
        createIndicators: function (topIndicatorsNode, bottomIndicatorsNode, indicators, entry) {
            var indicatorTemplate, options, indicatorHTML, i, iconPath, self = this;
            for (i = 0; i < indicators.length; i++) {
                (function (indicator) {
                    iconPath = indicator.iconPath || self.itemIndicatorIconPath;
                    if (indicator.onApply) {
                        try {
                            indicator.onApply(entry, self);
                        }
                        catch (err) {
                            indicator.isEnabled = false;
                        }
                    }
                    options = {
                        indicatorIndex: i,
                        indicatorIcon: indicator.icon
                            ? iconPath + indicator.icon
                            : '',
                        iconCls: indicator.cls || ''
                    };
                    indicatorTemplate = indicator.template || self.itemIndicatorTemplate;
                    lang.mixin(indicator, options);
                    if (indicator.isEnabled === false) {
                        indicator.label = '';
                        if (indicator.cls) {
                            indicator.iconCls = indicator.cls + ' disabled';
                        }
                        else {
                            indicator.indicatorIcon = indicator.icon
                                ? iconPath + 'disabled_' + indicator.icon
                                : '';
                        }
                    }
                    else {
                        indicator.indicatorIcon = indicator.icon
                            ? iconPath + indicator.icon
                            : '';
                    }
                    if (indicator.isEnabled === false && indicator.showIcon === false) {
                        return;
                    }
                    if (self.itemIndicatorShowDisabled || indicator.isEnabled) {
                        if (indicator.isEnabled === false && indicator.showIcon === false) {
                            return;
                        }
                        else {
                            indicatorHTML = indicatorTemplate.apply(indicator, indicator.id);
                            if (indicator.location === 'top') {
                                domConstruct.place(indicatorHTML, topIndicatorsNode, 'last');
                            }
                            else {
                                domConstruct.place(indicatorHTML, bottomIndicatorsNode, 'last');
                            }
                        }
                    }
                })(indicators[i]);
            }
        },
        onApplyRowTemplate: function (entry, rowNode) {
            if (this.options && this.options.simpleMode && (this.options.simpleMode === true)) {
                return;
            }
            this.applyRowIndicators(entry, rowNode);
            this.inherited(arguments);
        },
        applyRowIndicators: function (entry, rowNode) {
            var topIndicatorsNode, bottomIndicatorsNode;
            if (this.itemIndicators && this.itemIndicators.length > 0) {
                topIndicatorsNode = query('> #top_item_indicators', rowNode);
                bottomIndicatorsNode = query('> #bottom_item_indicators', rowNode);
                if (bottomIndicatorsNode[0] && topIndicatorsNode[0]) {
                    if (bottomIndicatorsNode[0].childNodes.length === 0 && topIndicatorsNode[0].childNodes.length === 0) {
                        this.createIndicators(topIndicatorsNode[0], bottomIndicatorsNode[0], this._createCustomizedLayout(this.itemIndicators, 'indicators'), entry);
                    }
                }
            }
        },
        createIndicatorLayout: function () {
            return this.itemIndicators || (this.itemIndicators = [{
                    id: 'touched',
                    cls: 'fa fa-hand-o-up fa-lg',
                    onApply: function (entry, parent) {
                        this.isEnabled = parent.hasBeenTouched(entry);
                    }
                }]);
        },
        hasBeenTouched: function (entry) {
            var modifiedDate, currentDate, weekAgo;
            if (entry['ModifyDate']) {
                modifiedDate = moment(convert.toDateFromString(entry['ModifyDate']));
                currentDate = moment().endOf('day');
                weekAgo = moment().subtract(1, 'weeks');
                return modifiedDate.isAfter(weekAgo) &&
                    modifiedDate.isBefore(currentDate);
            }
            return false;
        },
        requestData: function () {
            var mixin = lang.getObject(mixinName);
            if (this.searchWidget) {
                this.currentSearchExpression = this.searchWidget.getSearchExpression() || mixin.prototype.allRecordsText;
            }
            this.inherited(arguments);
        },
        /**
         * Returns a rendered html snap shot of the entry.
         */
        getContextSnapShot: function (options) {
            var snapShot, entry = this.entries[options.key];
            if (entry) {
                snapShot = this.itemRowContainerTemplate.apply(entry, this);
            }
            return snapShot;
        }
    });
    lang.setObject('Mobile.SalesLogix.Views._CardLayoutListMixin', __class);
    return __class;
});
