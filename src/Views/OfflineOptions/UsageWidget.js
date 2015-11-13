import declare from 'dojo/_base/declare';
import aspect from 'dojo/aspect';
import domConstruct from 'dojo/dom-construct';
import format from '../../Format';
import utility from 'argos/Utility';
import offlineManager from 'argos/Offline/Manager';
import RelatedViewManager from 'argos/RelatedViewManager';
import _RelatedViewWidgetBase from 'argos/_RelatedViewWidgetBase';
import Dropdown from 'argos/Dropdown';
import BusyIndicator from 'argos/Dialogs/BusyIndicator';

const resource = window.localeContext.getEntitySync('offlineUsageWidget').attributes;

const __class = declare('crm.Views.OfflineOptions.UsageWidget', [_RelatedViewWidgetBase], {

  totalUsageText: resource.totalUsageText,
  countText: resource.countText,
  sizeText: resource.sizeText,
  sizeAVGText: resource.sizeAVGText,
  oldestText: resource.oldestText,
  newestText: resource.newestText,
  clearDataText: resource.clearDataText,
  olderThanText: resource.olderThanText,
  daysText: resource.daysText,
  showUsageText: resource.showUsageText,
  processingText: resource.processingText,
  calculatingUsageText: resource.calculatingUsageText,
  clearingDataText: resource.clearingDataText,

  cls: 'related-offline-usage-widget',
  relatedContentTemplate: new Simplate([
   '<div class="offline-usage">',
   '<span class="label"> {%: $$.olderThanText %} </span>',
   '<span data-dojo-attach-point="_olderThanNode" ></span>',
   '<span class="label"> {%: $$.daysText %} </span>',
   '<div> <button class="button actionButton" data-dojo-attach-event="onclick:onClearAllData">{%: $$.clearDataText %}</button></div>',
   '<div> <button class="button actionButton" data-dojo-attach-event="onclick:onShowUsage">{%: $$.showUsageText %}</button></div>',
   '<div data-dojo-attach-point="usageNode" >',
   '</div>',
  ]),
  errorTemplate: new Simplate([
   '<div class="error">',
   '<span class="fa fa-waring fa-2x"></span>',
   '<h2>{%= $.message %}</h2>',
   '</div>',
  ]),
  usageHeaderTemplate: new Simplate([
   '<div class="offline-usage-header">',
   '{%! $$.usageItemTemplate %}',
   '</div>',
  ]),
  usageItemTemplate: new Simplate([
    '<div class="offline-usage-item">',
    '<div class="header">',
    '<span {% if ($.iconClass) { %} class="{%= $.iconClass %}" {% } %}></span>',
    '<span class="label"> {%: $.label %}</span>',
    '</div>',
    '<div class="content">',
    '<div class="item"><div class="label">{%: $$.countText %}</div> <span class="value">{%: $.count %}</span><span class="value percent">{%: $.countPercent %}</span></div>',
    '<div class="item"><div class="label">{%: $$.sizeText %}</div> <span class="value">{%: $.size %}</span><span class="value percent">{%: $.sizePercent %}</span></div>',
    '<div class="item"><div class="label">{%: $$.sizeAVGText %}</div> <span class="value">{%: $.sizeAVG %}</span></div>',
    '<div class="bar"></div>',
    '<div class="item"><div class="label small">{%: $$.oldestText %}</div> <span class="value small">{%: $.oldestDate %}</span></div>',
    '<div class="item"><div class="label small">{%: $$.newestText %}</div> <span class="value small">{%: $.newestDate %}</span></div>',
    '</div>',
    '</div>',
  ]),
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
    };
    this._olderThanValues = offlineManager.getClearOlderThanValues();
    this.initUI();
  },
  initUI: function initUI() {
    if (!this._olderThanDropdown) {
      this._olderThanDropdown = new Dropdown({
        id: 'olderThan-dropdown ' + this.id,
        onSelect: this.olderThanSelect,
        onSelectScope: this,
      });
      this._olderThanDropdown.createList({
        items: this._olderThanValues,
        defaultValue: this._options.clearOlderThan,
      });
      domConstruct.place(this._olderThanDropdown.domNode, this._olderThanNode);
    }
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
      }, () => {
        this.showProcessing(false);
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
  showError: function showError(message) {
    if (this.usageNode) {
      const node = domConstruct.toDom(this.errorTemplate.apply({message: message}, this));
      domConstruct.place(node, this.usageNode, 'only');
    }
  },
  onClearAllData: function onClearAllData() {
    this.showProcessing(true, this.clearingDataText);
    offlineManager.clearData(this._options).then(() => {
      this.showProcessing(false);
      this.onShowUsage();
    }, (err) => {
      this.showError(err);
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
    totalItem.iconClass = 'fa fa-database fa-2x';
    totalItem.label = this.totalUsageText;
    totalItem.entityName = '*';
    totalItem.size = format.bigNumber(utility.getValue(usage, 'size'));
    totalItem.sizePercent = format.percent(1);
    totalItem.count = format.bigNumber(utility.getValue(usage, 'count'));
    totalItem.countPercent = format.percent(1);
    oldestDate = utility.getValue(usage, 'oldestDate');
    newestDate = utility.getValue(usage, 'newestDate');
    totalItem.oldestDate = (oldestDate) ? format.relativeDate(oldestDate) : '';
    totalItem.newestDate = (newestDate) ? format.relativeDate(newestDate) : '';
    const headerNode = domConstruct.toDom(this.usageHeaderTemplate.apply(totalItem, this));
    docfrag.appendChild(headerNode);
    this._selectFields = {};
    const entities = usage.entities;
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
        const itemNode = domConstruct.toDom(this.usageItemTemplate.apply(item, this));
        docfrag.appendChild(itemNode);
      } catch (err) {
        console.log(err); // eslint-disable-line
      }
    }
    domConstruct.place(docfrag, this.usageNode, 'last');
    this._showingUsage = true;
  },
  destroyUsage: function destroyUsage() {
    if (this.usageNode) {
      const node = domConstruct.toDom('<div></div>');
      domConstruct.place(node, this.usageNode, 'only');
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
    offlineManager.saveOptions(options );
  },
});
const rvm = new RelatedViewManager();
rvm.registerType('offlineUsageWidget', __class);
export default __class;


