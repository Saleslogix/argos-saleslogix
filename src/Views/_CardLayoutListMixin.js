import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import convert from 'argos/Convert';
import getResource from 'argos/I18n';
import itemIcon from '../../content/images/icons/man_1.png';

import moment from 'moment';

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
  itemIcon,
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
  itemRowContainerTemplate: new Simplate([`
    <li>
      <div class="widget">
        <div class="widget-header">
          <h2 class="widget-title">{%: $$.getItemDescriptor($) %}</h2>
          <button class="btn-actions" type="button">
            <span class="audible">Actions</span>
            <svg class="icon" focusable="false" aria-hidden="true" role="presentation">
              <use xlink:href="#icon-more"></use>
            </svg>
          </button>
          <ul class="popupmenu actions top">
            <li><a data-action="selectEntry">Quick Actions</a></li>
          </ul>
        </div>
        <div class="card-content" data-action="activateEntry" data-key="{%= $$.getItemActionKey($) %}" data-descriptor="{%: $$.getItemDescriptor($) %}">
          {%! $$.itemRowContentTemplate %}
        </div>
      </div>
    </li>
    `,
  ]),
  itemRowContentTemplate: new Simplate([
    '<div id="top_item_indicators" class="list-item-indicator-content"></div>',
    '<div class="list-item-content" data-snap-ignore="true">{%! $$.itemTemplate %}</div>',
    '<div id="bottom_item_indicators" class="list-item-indicator-content"></div>',
    '<div id="list-item-content-related"></div>',
  ]),
  onApplyRowTemplate: function onApplyRowTemplate() {
    if (this.options && this.options.simpleMode && (this.options.simpleMode === true)) {
      return;
    }

    this.inherited(arguments);
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
