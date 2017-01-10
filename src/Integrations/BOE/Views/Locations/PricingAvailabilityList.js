import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import List from 'argos/List';
import format from 'crm/Format';
import convert from 'argos/Convert';
import getResource from 'argos/I18n';

const resource = getResource('locationsPricingAvailabilityList');

const __class = declare('crm.Integrations.BOE.Views.Locations.PricingAvailabilityList', [List], {
  // Templates
  itemTemplate: new Simplate([
    '<h4><label class="group-label">{%: $$.warehouseText %}: </label>{%: $.SlxLocation %}</h4>',
    '<h3><label class="group-label">{%: $$.availableToPromiseDateText %}: </label>{%: $$.formatATPDate($.ATPDate) %}</h3>',
    '<h3><label class="group-label">{%: $$.availableText %}: </label>{%: $.AvailableQuantity %}</h3>',
    '<h4>{%: $.UnitOfMeasure %}</h4>',
  ]),

  // Localization
  titleText: resource.titleText,
  warehouseText: resource.warehouseText,
  availableText: resource.availableText,
  availableToPromiseDateText: resource.availableToPromiseDateText,

  // View Properties
  id: 'locations_pricingAvailabilityList',
  detailView: '',
  enableActions: false,
  expose: false,
  pricingAvailabilityResult: null,
  requestType: null,
  entityType: null,
  parentEntity: null,
  selectionOnly: true,
  allowEmptySelection: false,
  continuousScrolling: false,
  simpleMode: true,
  negateHistory: true,
  pageSize: 500,
  singleSelect: true,
  singleSelectAction: 'complete',

  // Card layout
  itemIconClass: '',

  createToolLayout: function createToolLayout() {
    return this.tools || (this.tools = {
      tbar: [{
        id: 'complete',
        cls: 'invisible',
        fn: this.onSelectWarehouse,
        scope: this,
      }, {
        id: 'cancel',
        side: 'left',
        cls: 'fa fa-ban fa-fw fa-lg',
        fn: ReUI.back,
        scope: ReUI,
      },
      ] });
  },
  show: function show() {
    this.inherited(arguments);
    if (!this.options) {
      this.options = {};
    }
    this.options.singleSelect = true;
    this.options.singleSelectAction = 'complete';
  },
  onSelectWarehouse: function onSelectWarehouse() {
    const selection = this.getSelectedWarehouse();
    this.processWarehouse(selection).then(() => {
      ReUI.back();
    });
  },
  getSelectedWarehouse: function getSelectedWarehouse() {
    const selections = this.get('selectionModel').getSelections();
    let selection = null;
    if (this.options.singleSelect) {
      for (const selectionKey in selections) {
        if (selections.hasOwnProperty(selectionKey)) {
          selection = selections[selectionKey].data;
          break;
        }
      }
    }
    return selection;
  },
  processWarehouse: function processWarehouse(warehouse) {
    const promise = new Promise((resolve) => {
      resolve(warehouse);
    });
    return promise;
  },
  getAvailability: function getAvailability() {
    const promise = new Promise((resolve) => {
      resolve([]);
    });
    return promise;
  },
  onTransitionAway: function onTransitionAway() {
    this.refreshRequired = true;
    this.inherited(arguments);
  },
  requestData: function requestData() {
    this.getAvailability().then((entries) => {
      this._onQueryComplete({ total: entries.length ? entries.length : 0 }, entries);
    }, () => {
      this._onQueryComplete({ total: 0 }, []);
    });
  },
  formatATPDate: function formatATPDate(atpDate) {
    let value = '';
    if (convert.isDateString(atpDate)) {
      value = convert.toDateFromString(atpDate);
      return format.date(value);
    }
    return value;
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute('upper(Description) like "${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
});

lang.setObject('icboe.Views.Locations.PricingAvailabilityList', __class);
export default __class;
