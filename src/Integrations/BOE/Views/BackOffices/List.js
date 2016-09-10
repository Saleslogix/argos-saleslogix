import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import List from 'argos/List';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';

const resource = getResource('backOfficesList');

const __class = declare('crm.Integrations.BOE.Views.BackOffices.List', [List], {
  // Templates
  itemTemplate: new Simplate([
    '<h3>{%: $.BackOfficeName %}</h3>',
    '<h4>{%: $.LogicalId %}</h4>',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  id: 'backoffices_list',
  detailView: '',
  modelName: MODEL_NAMES.BACKOFFICE,
  resourceKind: 'backOffices',
  enableActions: false,
  expose: false,
  security: 'Entities/BackOffice/View',
  insertSecurity: 'Entities/BackOffice/Add',

  // Card layout
  itemIconClass: '',

  // Metrics
  entityName: 'BackOffice',

  createToolLayout: function createToolLayout() {
    return this.tools || (this.tools = {
    });
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute('upper(BackOfficeName) like "${0}%" or upper(LogicalId) like "${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
});

lang.setObject('icboe.Views.BackOffices.List', __class);
export default __class;
