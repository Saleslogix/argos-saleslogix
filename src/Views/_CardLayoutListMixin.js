import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import domConstruct from 'dojo/dom-construct';
import query from 'dojo/query';
import convert from 'argos/Convert';
import getResource from 'argos/I18n';

const resource = getResource('cardLayoutListMixin');

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
const __class = declare('crm.Views._CardLayoutListMixin', null, {
  itemIcon: 'content/images/icons/man_1.png',
  itemIconAltText: resource.itemIconAltText,
  itemIconClass: '',
  allRecordsText: resource.allRecordsText,
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
    '</span>',
  ]),
  itemExtTemplate: new Simplate([
    '<li data-dojo-attach-point="itemExtNode" class="card-item-ext-row"></li>',
  ]),
  itemRowContainerTemplate: new Simplate([
    '<li data-action="activateEntry" data-key="{%= $$.getItemActionKey($) %}" data-descriptor="{%: $$.getItemDescriptor($) %}">',
    '{%! $$.itemRowContentTemplate %}',
    '</li>',
  ]),
  itemFooterTemplate: new Simplate([
    '<div id="list-item-footer" class="list-item-footer">',
    '</div>',
  ]),
  itemIconTemplate: new Simplate([
    '<button data-action="selectEntry" class="list-item-selector button">',
    '{% if ($$.getItemIconClass($)) { %}',
    '<span class="{%= $$.getItemIconClass($) %}"></span>',
    '{% } else { %}',
    '<img id="list-item-image_{%: $.$key %}" src="{%: $$.getItemIconSource($) %}" alt="{%: $$.getItemIconAlt($) %}" class="icon" />',
    '{% } %}',
    '</button>',
  ]),
  itemRowContentTemplate: new Simplate([
    '<div id="top_item_indicators" class="list-item-indicator-content"></div>',
    '{%! $$.itemIconTemplate %}',
    '<div class="list-item-content" data-snap-ignore="true">{%! $$.itemTemplate %}</div>',
    '<div id="bottom_item_indicators" class="list-item-indicator-content"></div>',
    '<div id="list-item-content-related"></div>',
    '{%! $$.itemFooterTemplate %}',
  ]),
  postMixInProperties: function postMixInProperties() {
    this.inherited(arguments);
    this.cls = ' card-layout';
    this.rowTemplate = new Simplate([
      '{%! $$.itemRowContainerTemplate %}',
    ]);
    this.createIndicatorLayout();
  },
  placeAt: function placeAt() {
    this.inherited(arguments);
    this._intFooter();
  },
  show: function show(options) {
    if (options && options.simpleMode && (options.simpleMode === true)) {
      this.itemFooterTemplate = new Simplate([]);
    }
    this.inherited(arguments);
  },
  _intFooter: function _intFooter() {
    if (!this.actions.length) {
      this.itemFooterTemplate = new Simplate(['']);
    }
  },
  getItemActionKey: function getItemActionKey(entry) {
    return entry.$key || entry[this.idProperty];
  },
  getItemDescriptor: function getItemDescriptor(entry) {
    return entry.$descriptor || entry[this.labelProperty];
  },
  getItemIconClass: function getItemIconClass() {
    return this.itemIconClass;
  },
  getItemIconSource: function getItemIconSource() {
    return this.itemIcon || this.icon || this.selectIcon;
  },
  getItemIconAlt: function getItemIconAlt() {
    return this.itemIconAltText;
  },
  createIndicators: function createIndicators(topIndicatorsNode, bottomIndicatorsNode, indicators, entry) {
    const self = this;
    for (let i = 0; i < indicators.length; i++) {
      const indicator = indicators[i];
      const iconPath = indicator.iconPath || self.itemIndicatorIconPath;
      if (indicator.onApply) {
        try {
          indicator.onApply(entry, self);
        } catch (err) {
          indicator.isEnabled = false;
        }
      }
      const options = {
        indicatorIndex: i,
        indicatorIcon: indicator.icon ? iconPath + indicator.icon : '',
        iconCls: indicator.cls || '',
      };

      const indicatorTemplate = indicator.template || self.itemIndicatorTemplate;

      lang.mixin(indicator, options);

      if (indicator.isEnabled === false) {
        indicator.label = '';
        if (indicator.cls) {
          indicator.iconCls = `${indicator.cls} disabled`;
        } else {
          indicator.indicatorIcon = indicator.icon ? `${iconPath}disabled_${indicator.icon}` : '';
        }
      } else {
        indicator.indicatorIcon = indicator.icon ? iconPath + indicator.icon : '';
      }

      if (indicator.isEnabled === false && indicator.showIcon === false) {
        return;
      }

      if (self.itemIndicatorShowDisabled || indicator.isEnabled) {
        if (indicator.isEnabled === false && indicator.showIcon === false) {
          return;
        }
        const indicatorHTML = indicatorTemplate.apply(indicator, indicator.id);
        if (indicator.location === 'top') {
          domConstruct.place(indicatorHTML, topIndicatorsNode, 'last');
        } else {
          domConstruct.place(indicatorHTML, bottomIndicatorsNode, 'last');
        }
      }
    }
  },
  onApplyRowTemplate: function onApplyRowTemplate(entry, rowNode) {
    if (this.options && this.options.simpleMode && (this.options.simpleMode === true)) {
      return;
    }

    this.applyRowIndicators(entry, rowNode);
    this.inherited(arguments);
  },
  applyRowIndicators: function applyRowIndicators(entry, rowNode) {
    if (this.itemIndicators && this.itemIndicators.length > 0) {
      const topIndicatorsNode = query('> #top_item_indicators', rowNode);
      const bottomIndicatorsNode = query('> #bottom_item_indicators', rowNode);
      if (bottomIndicatorsNode[0] && topIndicatorsNode[0]) {
        if (bottomIndicatorsNode[0].childNodes.length === 0 && topIndicatorsNode[0].childNodes.length === 0) {
          this.createIndicators(topIndicatorsNode[0], bottomIndicatorsNode[0], this._createCustomizedLayout(this.itemIndicators, 'indicators'), entry);
        }
      }
    }
  },
  createIndicatorLayout: function createIndicatorLayout() {
    return this.itemIndicators || (this.itemIndicators = [{
      id: 'touched',
      cls: 'fa fa-hand-o-up fa-lg',
      onApply: function onApply(entry, parent) {
        this.isEnabled = parent.hasBeenTouched(entry);
      },
    }]);
  },
  hasBeenTouched: function hasBeenTouched(entry) {
    if (entry.ModifyDate) {
      const modifiedDate = moment(convert.toDateFromString(entry.ModifyDate));
      const currentDate = moment().endOf('day');
      const weekAgo = moment().subtract(1, 'weeks');

      return modifiedDate.isAfter(weekAgo) &&
        modifiedDate.isBefore(currentDate);
    }
    return false;
  },
  requestData: function requestData() {
    if (this.searchWidget) {
      this.currentSearchExpression = this.searchWidget.getSearchExpression() || resource.allRecordsText;
    }

    this.inherited(arguments);
  },
  /**
   * Returns a rendered html snap shot of the entry.
   */
  getContextSnapShot: function getContextSnapShot(options) {
    const entry = this.entries[options.key];
    let snapShot;
    if (entry) {
      snapShot = this.itemRowContainerTemplate.apply(entry, this);
    }

    return snapShot;
  },
});

lang.setObject('Mobile.SalesLogix.Views._CardLayoutListMixin', __class);
export default __class;
