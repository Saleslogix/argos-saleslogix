import declare from 'dojo/_base/declare';
import aspect from 'dojo/aspect';
import domConstruct from 'dojo/dom-construct';
// import domClass from 'dojo/dom-class';
import format from '../../Format';
import utility from 'argos/Utility';
// import Deferred from 'dojo/Deferred';
// import all from 'dojo/promise/all';
// import MODEL_TYPES from 'argos/Models/Types';
import offlineManager from 'argos/Offline/Manager';
import RelatedViewManager from 'argos/RelatedViewManager';
import _RelatedViewWidgetBase from 'argos/_RelatedViewWidgetBase';

const __class = declare('crm.Views.OfflineOptions.UsageWidget', [_RelatedViewWidgetBase], {

  totalUsageText: 'Total Storeage Usage',
  countText: 'Count',
  sizeText: 'Size',
  sizeAVGText: 'Avg.',
  clearAllText: 'Clear All',
  clearOldText: 'Clear Old',
  showUsageText: 'Show Usage',
  processingText: 'processing please wait ...',
  calculatingUsageText: 'caclulating usage please wait ...',
  clearingAllDataText: 'clearing all data please wait ...',
  clearingOldDataText: 'clearing old data please wait ...',

  cls: 'related-offline-usage-widget',
  relatedContentTemplate: new Simplate([
   '<div class="offline-usage">',
   '<button class="button actionButton" data-dojo-attach-event="onclick:onClearAllData"">{%: $$.clearAllText %}</button>',
   '<button class="button actionButton" data-dojo-attach-event="onclick:onClearOldData">{%: $$.clearOldText %}</button>',
   '<button class="button actionButton" data-dojo-attach-event="onclick:onShowUsage">{%: $$.showUsageText %}</button>',
   '<div data-dojo-attach-point="usageNode" >',
   '</div>',
  ]),
  processingTemplate: new Simplate([
   '<div>',
   '<span class="fa fa-spinner fa-spin fa-2x"></span>',
   '<h2>{%= $.message %}</h2>',
   '</span>',
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
    '</div>',
    '</div>',
  ]),
  onInit: function onInit() {
    const self = this;
    this.onLoad();
    if (this.owner) {
      aspect.after(this.owner, 'show', function after() {
        self.onRefreshView();
      });
    }
  },
  onLoad: function onLoad() {
    // this.createUI();
  },
  onShowUsage: function onShowUsage() {
    this.showProcessing(true, this.calculatingUsageText);
    this.getUsage().then((data) => {
      this.showProcessing(false);
      this.processUsage(data);
    }, () => {
      this.showProcessing(false);
    });
  },
  showProcessing: function showProcessing(show, message) {
    if (show) {
      if (this.usageNode) {
        const node = domConstruct.toDom(this.processingTemplate.apply({message: message}, this));
        domConstruct.place(node, this.usageNode, 'only');
      }
    } else {
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
    this.showProcessing(true, this.clearingAllDataText);
    offlineManager.clearData(null, null).then(() => {
      this.onShowUsage();
    }, (err) => {
      this.showError(err);
    });
  },
  onClearOldData: function onClearOldData() {
    this.showProcessing(true, this.clearingOldDataText);
    offlineManager.clearData(null, null).then(() => {
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
    totalItem.iconClass = 'fa fa-database fa-2x';
    totalItem.label = this.totalUsageText;
    totalItem.entityName = '*';
    totalItem.size = format.bigNumber(utility.getValue(usage, 'size'));
    totalItem.sizePercent = format.percent(1);
    totalItem.count = format.bigNumber(utility.getValue(usage, 'count'));
    totalItem.countPercent = format.percent(1);
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
        const itemNode = domConstruct.toDom(this.usageItemTemplate.apply(item, this));
        docfrag.appendChild(itemNode);
      } catch (err) {
        console.log(err); // eslint-disable-line
      }
    }
    domConstruct.place(docfrag, this.usageNode, 'last');
  },
  destroyUsage: function destroyUsage() {
    if (this.usageNode) {
      const node = domConstruct.toDom('<div></div>');
      domConstruct.place(node, this.usageNode, 'only');
    }
  },
  onRefreshView: function onRefreshView() {
    this.destroyUsage();
    this.onLoad();
  },
});
const rvm = new RelatedViewManager();
rvm.registerType('offlineUsageWidget', __class);
export default __class;
