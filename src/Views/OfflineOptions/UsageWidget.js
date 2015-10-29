import declare from 'dojo/_base/declare';
import aspect from 'dojo/aspect';
import domConstruct from 'dojo/dom-construct';
import format from '../../Format';
import utility from 'argos/Utility';
import Deferred from 'dojo/Deferred';
import all from 'dojo/promise/all';
import MODEL_TYPES from 'argos/Models/Types';
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

  cls: 'related-offline-usage-widget',
  contextCls: null,
  usageHeaderTemplate: new Simplate([
   '<div class="offline-usage">',
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
    '<div>',
    '<button data-entityname="{%: $.entityName %}" class="button actionButton">{%: $$.clearAllText %}</button>',
    '<button data-entityname="{%: $.entityName %}" class="button actionButton">{%: $$.clearOldText %}</button>',
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
    return this.getUsage().then((data) => {
      this._onGetComplete(data);
    }, (err) => {
      this._onGetError(err);
    });
  },
  getUsage: function getUsage() {
    return offlineManager.getUsage();
  },
  getUsage2: function getUsage2() {
    const def = new Deferred();
    let usageRequests = [];
    this.models = App.ModelManager.getModels(MODEL_TYPES.OFFLINE).filter((model) => {
      if (model && (model.entityName !== 'RecentlyViewed') && (model.entityName !== 'Briefcase')) {
        return model;
      }
    });
    usageRequests = this.models.map((model) => {
      return model.getUsage();
    });
    if (usageRequests.length > 0) {
      all(usageRequests).then((results) => {
        const usage = {};
        usage.entities = results;
        def.resolve(usage);
      }, (err) => {
        def.reject(err);
      });
    } else {
      def.resolve();
    }
    return def.promise;
  },
  _onGetComplete: function _onGetComplete(data) {
    this.processUsage(data);
  },
  _onGetError: function _onGetComplete() {
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
    domConstruct.place(docfrag, this.containerNode, 'last');
  },
  onRefreshView: function onRefreshView() {
    if (this.containerNode) {
      const node = domConstruct.toDom('<div></div>');
      domConstruct.place(node, this.containerNode, 'only');
      this.onLoad();
    }
  },
});
const rvm = new RelatedViewManager();
rvm.registerType('offlineUsageWidget', __class);
export default __class;
