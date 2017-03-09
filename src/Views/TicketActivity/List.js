import declare from 'dojo/_base/declare';
import string from 'dojo/string';
import domGeom from 'dojo/dom-geometry';
import query from 'dojo/query';
import lang from 'dojo/_base/lang';
import List from 'argos/List';
import getResource from 'argos/I18n';
import $ from 'jquery';

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
    '<p class="listview-heading">{%: $.Ticket.TicketNumber %}</p>',
    '<p class="listview-subheading">{%: crm.Format.date($.AssignedDate, (App.is24HourClock()) ? $$.startDateFormatText24 : $$.startDateFormatText) %}</p>',
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
        $(moreNode).show();
      } else {
        $(moreNode).hide();
      }
    });
  },
  processData: function processData() {
    this.inherited(arguments);
    this._onResize();
  },
  postCreate: function postCreate() {
    this.inherited(arguments);
    $(window).on('resize', this._onResize.bind(this));
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute(
      'ActivityDescription like "${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]
    );
  },
});

lang.setObject('Mobile.SalesLogix.Views.TicketActivity.List', __class);
export default __class;
