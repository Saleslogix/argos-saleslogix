import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import List from 'argos/List';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';

const resource = getResource('locationsList');

const __class = declare('crm.Integrations.BOE.Views.Locations.List', [List], {
  // Templates
  itemTemplate: new Simplate([
    '<h4>{%: $.Name %}</h4>',
    '<h3>{%: $.Description %}</h3>',
    '<h4>{%: $.ErpStatus %}</h4>',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  id: 'locations_list',
  detailView: '',
  modelName: MODEL_NAMES.LOCATION,
  resourceKind: 'slxLocations',
  enableActions: false,
  expose: false,

  // Card layout
  itemIconClass: '',

  // Metrics
  entityName: 'Location',

  createToolLayout: function createToolLayout() {
    return this.tools || (this.tools = {
    });
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute('upper(Description) like "${0}%" or upper(ErpLogicalId) like "${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
});

lang.setObject('icboe.Views.Locations.List', __class);
export default __class;
