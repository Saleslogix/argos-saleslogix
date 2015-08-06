import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import List from 'argos/List';

/**
 * @class crm.Views.Event.List
 *
 * @extends argos.List
 *
 * @requires crm.Format
 */
const __class = declare('crm.Views.Event.List', [List], {
  // Localization
  titleText: 'Events',
  eventDateFormatText: 'M/D/YYYY',
  eventText: 'Event',

  // Templates
  itemTemplate: new Simplate([
    '<h3>{%= $.Description %}</h3>',
    '<h4>',
    '{%: crm.Format.date($.StartDate, $$.eventDateFormatText) %}',
    '&nbsp;-&nbsp;',
    '{%: crm.Format.date($.EndDate, $$.eventDateFormatText) %}',
    '</h4>',
  ]),

  // View Properties
  id: 'event_list',
  security: null, // 'Entities/Event/View',
  detailView: 'event_detail',
  insertView: 'event_edit',
  queryOrderBy: 'StartDate asc',
  queryWhere: null,
  querySelect: [
    'Description',
    'StartDate',
    'EndDate',
    'UserId',
    'Type',
  ],
  resourceKind: 'events',

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute('upper(Description) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
});

lang.setObject('Mobile.SalesLogix.Views.Event.List', __class);
export default __class;
