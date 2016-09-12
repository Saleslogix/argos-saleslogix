import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import List from 'argos/List';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';

const resource = getResource('backOfficeAccountingEntitiesList');

const __class = declare('crm.Integrations.BOE.Views.BackOfficeAccountingEntities.List', [List], {
  // Templates
  itemTemplate: new Simplate([
    '<h3>{%: $.Name %}</h3>',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  id: 'backofficeaccountingentities_list',
  detailView: '',
  modelName: MODEL_NAMES.BACKOFFICEACCOUNTINGENTITY,
  resourceKind: 'backOfficeAccountingEntities',
  enableActions: false,
  expose: false,
  security: 'Entities/BackOfficeAcctEntity/View',
  insertSecurity: 'Entities/BackOfficeAcctEntity/Add',

  // Card layout
  itemIconClass: '',

  // Metrics
  entityName: 'BackOfficeAccountingEntities',

  createToolLayout: function createToolLayout() {
    return this.tools || (this.tools = {
    });
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute('upper(Name) like "${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
});

lang.setObject('icboe.Views.BackOfficeAccountingEntities.List', __class);
export default __class;
