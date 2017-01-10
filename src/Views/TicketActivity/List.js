import declare from 'dojo/_base/declare';
import string from 'dojo/string';
import domStyle from 'dojo/dom-style';
import domGeom from 'dojo/dom-geometry';
import query from 'dojo/query';
import topic from 'dojo/topic';
import lang from 'dojo/_base/lang';
import List from 'argos/List';
import getResource from 'argos/I18n';

const resource = getResource('ticketActivityList');
const dtFormatResource = getResource('ticketActivityListDateTimeFormat');

/**
 * @class crm.Views.TicketActivity.List
 *
 * @extends argos.List
 *
 * @requires crm.Format
 */
const __class = declare('crm.Views.TicketActivity.List', [List], {
  // Templates
  itemTemplate: new Simplate([
    '<h3>{%: $.Ticket.TicketNumber %}</h3>',
    '<h4>{%: crm.Format.date($.AssignedDate, (App.is24HourClock()) ? $$.startDateFormatText24 : $$.startDateFormatText) %}</h4>',
    '<div class="note-text-item">',
    '<div class="note-text-wrap">',
    '{%: $.ActivityDescription %}',
    '</div>',
    '<div class="note-text-more"></div>',
    '</div>',
  ]),

  // Localization
  titleText: resource.titleText,
  startDateFormatText: dtFormatResource.startDateFormatText,
  startDateFormatText24: dtFormatResource.startDateFormatText24,

  // View Properties
  id: 'ticketactivity_list',
  security: 'Entities/TicketActivity/View',
  expose: false,
  detailView: 'ticketactivity_detail',
  insertView: 'ticketactivity_edit',
  queryOrderBy: 'AssignedDate asc',
  querySelect: [
    'ActivityDescription',
    'ActivityTypeCode',
    'AssignedDate',
    'CompletedDate',
    'ElapsedUnits',
    'FollowUp',
    'PublicAccessCode',
    'Rate',
    'RateTypeDescription/Amount',
    'RateTypeDescription/RateTypeCode',
    'RateTypeDescription/TypeDescription',
    'TotalFee',
    'TotalLabor',
    'TotalParts',
    'Units',
    'Ticket/Account/AccountName',
    'Ticket/TicketNumber',
    'Ticket/Contact/Name',
    'User/UserInfo/LastName',
    'User/UserInfo/FirstName',
  ],
  resourceKind: 'ticketActivities',

  _onResize: function _onResize() {
    query('.note-text-item', this.contentNode).forEach((node) => {
      const wrapNode = query('.note-text-wrap', node)[0];
      const moreNode = query('.note-text-more', node)[0];
      if (domGeom.getMarginBox(node).h < domGeom.getMarginBox(wrapNode).h) {
        domStyle.set(moreNode, 'visibility', 'visible');
      } else {
        domStyle.set(moreNode, 'visibility', 'hidden');
      }
    });
  },
  processData: function processData() {
    this.inherited(arguments);
    this._onResize();
  },
  postCreate: function postCreate() {
    this.inherited(arguments);
    this.own(topic.subscribe('/app/resize', lang.hitch(this, this._onResize)));
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute(
      'ActivityDescription like "${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]
    );
  },
});

lang.setObject('Mobile.SalesLogix.Views.TicketActivity.List', __class);
export default __class;
