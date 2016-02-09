import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import List from 'argos/List';
import getResource from 'argos/I18n';

const resource = getResource('ticketUrgencyLookup');

/**
 * @class crm.Views.Ticket.UrgencyLookup
 *
 * @extends argos.List
 */
const __class = declare('crm.Views.Ticket.UrgencyLookup', [List], {
  // Localization
  titleText: resource.titleText,

  // Templates
  itemTemplate: new Simplate([
    '<h3>{%: $.Description %}</h3>',
  ]),

  // View Properties
  id: 'urgency_list',
  queryOrderBy: 'UrgencyCode asc',
  querySelect: [
    'Description',
    'UrgencyCode',
  ],
  resourceKind: 'urgencies',

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const toUpper = searchQuery && searchQuery.toUpperCase() || '';
    const escaped = this.escapeSearchQuery(toUpper);
    return string.substitute('upper(Description) like "%${0}%"', [escaped]);
  },
});

lang.setObject('Mobile.SalesLogix.Views.Ticket.UrgencyLookup', __class);
export default __class;
