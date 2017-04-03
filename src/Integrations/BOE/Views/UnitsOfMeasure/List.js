import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import List from 'argos/List';
import format from 'crm/Format';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';

const resource = getResource('unitsOfMeasureList');

const __class = declare('crm.Integrations.BOE.Views.UnitsOfMeasure.List', [List], {
  formatter: format,
  // Templates
  itemTemplate: new Simplate([
    '<p class="listview-heading">{%: $.Name %}</p>',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  id: 'unitofmeasure_list',
  detailView: '',
  modelName: MODEL_NAMES.UNITOFMEASURE,
  resourceKind: 'unitsOfMeasure',
  enableActions: false,
  expose: false,

  // Card layout
  itemIconClass: '',

  // Metrics
  entityName: 'Unit of Measure',

  createToolLayout: function createToolLayout() {
    return this.tools || (this.tools = {
    });
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `upper(Name) like "${q}%"`;
  },
});

lang.setObject('icboe.Views.UnitsOfMeasure.List', __class);
export default __class;
