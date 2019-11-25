/* Copyright 2017 Infor
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import declare from 'dojo/_base/declare';
import aspect from 'dojo/aspect';
import format from '../../Format';
import utility from 'argos/Utility';
import offlineManager from 'argos/Offline/Manager';
import RelatedViewManager from 'argos/RelatedViewManager';
import _RelatedViewWidgetBase from 'argos/_RelatedViewWidgetBase';
import Dropdown from 'argos/Dropdown';
import BusyIndicator from 'argos/Dialogs/BusyIndicator';
import ErrorManager from 'argos/ErrorManager';
import getResource from 'argos/I18n';


const resource = getResource('offlineUsageWidget');

/**
 * @class crm.Views.OfflineOptions.UsageWidget
 */
const __class = declare('crm.Views.OfflineOptions.UsageWidget', [_RelatedViewWidgetBase], /** @lends crm.Views.OfflineOptions.UsageWidget# */{

  totalUsageText: resource.totalUsageText,
  countText: resource.countText,
  sizeText: resource.sizeText,
  sizeAVGText: resource.sizeAVGText,
  oldestText: resource.oldestText,
  newestText: resource.newestText,
  clearDataText: resource.clearDataText,
  clearRecentText: resource.clearRecentText,
  clearBriefcasedText: resource.clearBriefcasedText,
  olderThanText: resource.olderThanText,
  showUsageText: resource.showUsageText,
  processingText: resource.processingText,
  calculatingUsageText: resource.calculatingUsageText,
  clearingDataText: resource.clearingDataText,
  lastClearedText: resource.lastClearedText,

  cls: 'related-offline-usage-widget',
  relatedContentTemplate: new Simplate([
    '<div class="offline-usage">',
    '<span class="label">{%: $$.olderThanText %}</span>',
    '&nbsp;<span data-dojo-attach-point="_olderThanNode" style="display:inline-block"></span>&nbsp;',
    '<div data-dojo-attach-point="_lastClearDateNode"></div>',
    '<p><button class="btn-secondary" data-dojo-attach-event="onclick:onClearAllData">{%: $$.clearDataText %}</button></p>',
    '<p><button class="btn-secondary" data-dojo-attach-event="onclick:onClearBriefcasedData">{%: $$.clearBriefcasedText %}</button></p>',
    '<p><button class="btn-secondary" data-dojo-attach-event="onclick:onClearRecentData">{%: $$.clearRecentText %}</button></p>',
    '<p><button class="btn-secondary" data-dojo-attach-event="onclick:onShowUsage">{%: $$.showUsageText %}</button></p>',
    '<div data-dojo-attach-point="usageNode" style="margin-top:2rem;">',
    '</div>',
  ]),
  errorTemplate: new Simplate([
    '<div class="error">',
    '<span class="fa fa-waring fa-2x"></span>',
    '<h2>{%= $.message %}</h2>',
    '</div>',
  ]),
  usageHeaderTemplate: new Simplate([
    '<div class="offline-usage-header twelve columns">',
    '{%! $$.usageItemTemplate %}',
    '</div>',
  ]),
  usageItemTemplate: new Simplate([
    '<div class="offline-usage-item widget">',
    '<div class="widget-header">',
    `{% if ($.iconClass) { %}
    <button type="button" class="btn-icon hide-focus">
    <svg class="icon" focusable="false" aria-hidden="true" role="presentation">
      <use xlink:href="#icon-{%= $.iconClass %}"></use>
    </svg>
    </button>
    {% } %}`,
    '<h2 class="widget-title">{%: $.label %}</h2>',
    '</div>',
    '<div class="content card-content">',
    '<div class="item"><div class="label">{%: $$.countText %}</div> <span class="value">{%: $.count %}</span><span class="value percent">{%: $.countPercent %}</span></div>',
    '<div class="item"><div class="label">{%: $$.sizeText %}</div> <span class="value">{%: $.size %}</span><span class="value percent">{%: $.sizePercent %}</span></div>',
    '<div class="item"><div class="label">{%: $$.sizeAVGText %}</div> <span class="value">{%: $.sizeAVG %}</span></div>',
    '<div class="bar"></div>',
    '<div class="item"><div class="label small">{%: $$.oldestText %}</div> <span class="value small">{%: $.oldestDate %}</span></div>',
    '<div class="item"><div class="label small">{%: $$.newestText %}</div> <span class="value small">{%: $.newestDate %}</span></div>',
    '</div>',
    '</div>',
  ]),
  lastClearDateTemplate: new Simplate([
    '<span class="label">',
    '{%: $$.lastClearedText %}',
    '</span',
    '<span class="value">',
    ' {%: $.lastClearedDate %}',
    '</span',
  ]),
  /**
   * @property {string}
   * SoHo class to be applied on multi column.
   */
  multiColumnClass: 'four',
  /**
   * @property {number}
   * Number of columns in view
   */
  multiColumnCount: 3,
  onInit: function onInit() {
    this.onLoad();
    if (this.owner) {
      aspect.after(this.owner, 'show', () => {
        this.onRefreshView();
      });

      aspect.after(this.owner, 'save', () => {
        this.onSave();
      });
    }
  },
  onLoad: function onLoad() {
    const options = offlineManager.getOptions();
    this._options = {
      clearOlderThan: options.clearOlderThan,
      lastClearedDate: options.lastClearedDate,
    };
    this._olderThanValues = offlineManager.getClearOlderThanValues();
    this.initUI(options.clearOlderThan);
  },
  initUI: function initUI(clearOlderThan) {
    if (!this._olderThanDropdown) {
      this._olderThanDropdown = new Dropdown({
        id: `olderThan-dropdown ${this.id}`,
        onSelect: this.olderThanSelect,
        onSelectScope: this,
        dropdownClass: 'input-xs',
      });
      this._olderThanDropdown.createList({
        items: this._olderThanValues,
        defaultValue: this._options.clearOlderThan,
      });
      $(this._olderThanNode).append(this._olderThanDropdown.domNode);
      this.setLastClearedDate(this._options.lastClearedDate);
    } else {
      try {
        this._olderThanDropdown.setValue(clearOlderThan);
      } catch (err) {
        // There is a wierd lifecycle error going on here, with initUI being called twice
        // TODO: Refactor
      }
    }
  },
  setLastClearedDate: function setLastClearedDate(lastClearedDate) {
    const values = {
      lastClearedDate: (lastClearedDate) ? format.relativeDate(lastClearedDate) : '',
    };
    this._options.lastClearedDate = lastClearedDate;
    const clearDateNode = this.lastClearDateTemplate.apply(values, this);
    $(this._lastClearDateNode).empty().append(clearDateNode);
  },
  olderThanSelect: function olderThanSelect() {
    this._options.clearOlderThan = this._olderThanDropdown.getValue();
  },
  onShowUsage: function onShowUsage() {
    if (this._showingUsage) {
      this.destroyUsage();
    } else {
      this.showProcessing(true, this.calculatingUsageText);
      this.getUsage().then((data) => {
        this.showProcessing(false);
        this.processUsage(data);
      }, (err) => {
        this.showError(resource.errorCalculatingText, err);
      });
    }
  },
  showProcessing: function showProcessing(show, message) {
    if (show) {
      if (this.usageNode) {
        this._indicator = new BusyIndicator({
          id: 'busyIndicator__offlineusage',
          label: message,
        });
        App.modal.disableClose = true;
        App.modal.showToolbar = false;
        App.modal.add(this._indicator);
        this._indicator.start();
      }
    } else {
      if (this._indicator) {
        this._indicator.complete(true);
        this._indicator = null;
      }
      App.modal.disableClose = false;
      App.modal.hide();

      this.destroyUsage();
    }
  },
  showError: function showError(message, error) {
    if (this.usageNode) {
      this.showProcessing(false);
      ErrorManager.addSimpleError(message, error);
      ErrorManager.showErrorDialog(null, message, () => {
        this.onRefreshView();
      });
    }
  },
  onClearAllData: function onClearAllData() {
    this.showProcessing(true, this.clearingDataText);
    offlineManager.clearAllData().then(() => {
      this.showProcessing(false);
      this.setLastClearedDate(moment().toDate());
    }, (err) => {
      this.showError(resource.errorClearingDataText, err);
    });
  },
  onClearRecentData: function onClearRecentData() {
    this.showProcessing(true, this.clearingDataText);
    offlineManager.clearRecentData(this._options.clearOlderThan).then(() => {
      this.showProcessing(false);
      this.setLastClearedDate(moment().toDate());
    }, (err) => {
      this.showError(resource.errorClearingDataText, err);
    });
  },
  onClearBriefcasedData: function onClearBriefcasedData() {
    this.showProcessing(true, this.clearingDataText);
    offlineManager.clearBriefcaseData(this._options.clearOlderThan).then(() => {
      this.showProcessing(false);
      this.setLastClearedDate(moment().toDate());
    }, (err) => {
      this.showError(resource.errorClearingDataText, err);
    });
  },
  getUsage: function getUsage() {
    return offlineManager.getUsage();
  },
  processUsage: function processUsage(usage) {
    let i;
    const docfrag = document.createDocumentFragment();
    const totalItem = {};
    let oldestDate;
    let newestDate;
    totalItem.iconClass = 'server';
    totalItem.label = this.totalUsageText;
    totalItem.entityName = '*';
    totalItem.size = format.bigNumber(utility.getValue(usage, 'size'));
    totalItem.sizePercent = format.percent(1);
    totalItem.count = format.bigNumber(utility.getValue(usage, 'count'));
    totalItem.countPercent = format.percent(1);
    totalItem.sizeAVG = format.bigNumber(utility.getValue(usage, 'sizeAVG'));
    oldestDate = utility.getValue(usage, 'oldestDate');
    newestDate = utility.getValue(usage, 'newestDate');
    totalItem.oldestDate = (oldestDate) ? format.relativeDate(oldestDate) : '';
    totalItem.newestDate = (newestDate) ? format.relativeDate(newestDate) : '';
    const headerNode = $(this.usageHeaderTemplate.apply(totalItem, this));
    const columnHeaderNode = $('<div class="row"></div>').append(headerNode);
    docfrag.appendChild(columnHeaderNode.get(0));
    this._selectFields = {};
    const entities = usage.entities;
    let row = [];
    for (i = 0; i < entities.length; i++) {
      const entity = entities[i];
      try {
        const item = {};
        item.iconClass = entity.iconClass;
        item.label = entity.description;
        item.entityName = entity.entityName;
        item.size = format.bigNumber(utility.getValue(entity, 'size'));
        item.sizePercent = format.percent(utility.getValue(entity, 'sizePercent'));
        item.sizeAVG = format.bigNumber(utility.getValue(entity, 'sizeAVG'));
        item.count = format.bigNumber(utility.getValue(entity, 'count'));
        item.countPercent = format.percent(utility.getValue(entity, 'countPercent'));
        oldestDate = utility.getValue(entity, 'oldestDate');
        newestDate = utility.getValue(entity, 'newestDate');
        item.oldestDate = (oldestDate) ? format.relativeDate(oldestDate) : '';
        item.newestDate = (newestDate) ? format.relativeDate(newestDate) : '';
        const itemNode = $(this.usageItemTemplate.apply(item, this)).get(0);

        const column = $(`<div class="${this.multiColumnClass} columns">`).append(itemNode);
        row.push(column);
        if ((i + 1) % this.multiColumnCount === 0 || i === entities.length - 1) {
          const rowTemplate = $('<div class="row"></div>');
          row.forEach((element) => {
            rowTemplate.append(element);
          });
          docfrag.appendChild(rowTemplate.get(0));
          row = [];
        }
      } catch (err) {
        console.log(err); // eslint-disable-line
      }
    }
    $(this.usageNode).append(docfrag);
    this._showingUsage = true;
  },
  destroyUsage: function destroyUsage() {
    if (this.usageNode) {
      const node = $('<div></div>');
      $(this.usageNode).empty().append(node);
      this._showingUsage = false;
    }
  },
  onRefreshView: function onRefreshView() {
    this.destroyUsage();
    this.onLoad();
  },
  destroy: function destroy() {
    if (this._olderThanDropdown) {
      this._olderThanDropdown.destroy();
    }
    this.inherited(arguments);
  },
  onSave: function onSave() {
    const options = offlineManager.getOptions();
    options.clearOlderThan = this._options.clearOlderThan;
    offlineManager.saveOptions(options);
  },

});
const rvm = new RelatedViewManager();
rvm.registerType('offlineUsageWidget', __class);
export default __class;
