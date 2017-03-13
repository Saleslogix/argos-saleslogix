import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import List from 'argos/List';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';

const resource = getResource('carriersList');

const __class = declare('crm.Integrations.BOE.Views.Carriers.List', [List], {
  // Templates
  itemTemplate: new Simplate([
    '<p class="listview-heading">{%: $.CarrierName %}</p>',
    '<p class="micro-text">{%: $.LogicalId %}</p>',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  id: 'carriers_list',
  detailView: '',
  modelName: MODEL_NAMES.CARRIER,
  resourceKind: 'carriers',
  enableActions: false,
  expose: false,
  security: 'Entities/Carrier/View',
  insertSecurity: 'Entities/Carrier/Add',

  // Card layout
  itemIconClass: '',

  // Metrics
  entityName: 'Carrier',

  createToolLayout: function createToolLayout() {
    return this.tools || (this.tools = {
    });
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute('upper(CarrierName) like "${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
});

lang.setObject('icboe.Views.Carriers.List', __class);
export default __class;
