import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import List from 'argos/List';

/**
 * @class crm.Views.LeadSource.List
 *
 * @extends argos.List
 */
var __class = declare('crm.Views.LeadSource.List', [List], {
  //Templates
  itemTemplate: new Simplate([
    '<h3>{%: $.Description %}</h3>',
    '<h4>{%: $.Status %}</h4>'
  ]),

  //Localization
  titleText: 'Lead Sources',

  //View Properties
  id: 'leadsource_list',
  security: 'Entities/LeadSource/View',
  queryOrderBy: 'Description',
  querySelect: [
    'Description',
    'Status'
  ],
  resourceKind: 'leadsources',

  formatSearchQuery: function(searchQuery) {
    return string.substitute('upper(Description) like "${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  }
});

lang.setObject('Mobile.SalesLogix.Views.LeadSource.List', __class);
export default __class;
