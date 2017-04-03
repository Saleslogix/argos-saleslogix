import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import List from 'argos/List';
import getResource from 'argos/I18n';

const resource = getResource('eventList');
const dtFormatResource = getResource('eventListDateTimeFormat');

/**
 * @class crm.Views.Event.List
 *
 * @extends argos.List
 *
 * @requires crm.Format
 */
const __class = declare('crm.Views.Event.List', [List], {
  // Localization
  titleText: resource.titleText,
  eventDateFormatText: dtFormatResource.eventDateFormatText,
  eventDateFormatText24: dtFormatResource.eventDateFormatText24,
  eventText: resource.eventText,

  // Templates
  itemTemplate: new Simplate([
    '<p class="listview-heading">{%= $.Description %}</p>',
    '<p class="micro-text">',
    '{%: crm.Format.date($.StartDate, (App.is24HourClock()) ? $$.eventDateFormatText24 : $$.eventDateFormatText) %}',
    '&nbsp;-&nbsp;',
    '{%: crm.Format.date($.EndDate, (App.is24HourClock()) ? $$.eventDateFormatText24 : $$.eventDateFormatText) %}',
    '</p>',
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
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `upper(Description) like "%${q}%"`;
  },
});

lang.setObject('Mobile.SalesLogix.Views.Event.List', __class);
export default __class;
