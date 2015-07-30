import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import List from 'argos/List';

/**
 * @class crm.Views.Ticket.UrgencyLookup
 *
 * @extends argos.List
 */
var __class = declare('crm.Views.Ticket.UrgencyLookup', [List], {
  //Localization
  titleText: 'Ticket Urgency',

  //Templates
  itemTemplate: new Simplate([
    '<h3>{%: $.Description %}</h3>'
  ]),

  //View Properties
  id: 'urgency_list',
  queryOrderBy: 'UrgencyCode asc',
  querySelect: [
    'Description',
    'UrgencyCode'
  ],
  resourceKind: 'urgencies',

  formatSearchQuery: function(searchQuery) {
    var escaped, toUpper;
    toUpper = searchQuery && searchQuery.toUpperCase() || '';
    escaped = this.escapeSearchQuery(toUpper);
    return string.substitute('upper(Description) like "%${0}%"', [escaped]);
  }
});

lang.setObject('Mobile.SalesLogix.Views.Ticket.UrgencyLookup', __class);
export default __class;
