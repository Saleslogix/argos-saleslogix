import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import List from 'argos/List';
import format from 'crm/Format';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';

const resource = getResource('unitsOfMeasureList');

const __class = declare('crm.Integrations.BOE.Views.UnitsOfMeasure.List', [List], {
  formatter: format,
  // Templates
  itemTemplate: new Simplate([
    '<h3>{%: $.Name %}</h3>',
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
    return string.substitute('upper(Name) like "${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
});

lang.setObject('icboe.Views.UnitsOfMeasure.List', __class);
export default __class;
