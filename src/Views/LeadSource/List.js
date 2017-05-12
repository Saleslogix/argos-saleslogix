import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import List from 'argos/List';
import getResource from 'argos/I18n';

const resource = getResource('leadSourceList');

/**
 * @class crm.Views.LeadSource.List
 *
 * @extends argos.List
 */
const __class = declare('crm.Views.LeadSource.List', [List], {
  // Templates
  itemTemplate: new Simplate([
    '<p class="micro-text">{%: $.Status %}</p>',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  id: 'leadsource_list',
  security: 'Entities/LeadSource/View',
  queryOrderBy: 'Description',
  querySelect: [
    'Description',
    'Status',
  ],
  resourceKind: 'leadsources',

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `upper(Description) like "${q}%"`;
  },
});

lang.setObject('Mobile.SalesLogix.Views.LeadSource.List', __class);
export default __class;
