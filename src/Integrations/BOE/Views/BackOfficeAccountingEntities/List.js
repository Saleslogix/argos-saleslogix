import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import List from 'argos/List';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';

const resource = getResource('backOfficeAccountingEntitiesList');

const __class = declare('crm.Integrations.BOE.Views.BackOfficeAccountingEntities.List', [List], {
  // Templates
  itemTemplate: new Simplate([
    '<p class="listview-heading">{%: $.Name %}</p>',
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
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `upper(Name) like "${q}%"`;
  },
});

lang.setObject('icboe.Views.BackOfficeAccountingEntities.List', __class);
export default __class;
