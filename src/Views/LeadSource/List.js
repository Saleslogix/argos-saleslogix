import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
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
    '<p class="listview-heading">{%: $.Description %}</p>',
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
    return string.substitute('upper(Description) like "${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
});

lang.setObject('Mobile.SalesLogix.Views.LeadSource.List', __class);
export default __class;
