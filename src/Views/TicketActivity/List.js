import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import List from 'argos/List';
import getResource from 'argos/I18n';
import format from 'crm/Format';
import MODEL_NAMES from '../../Models/Names';

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
  format,
  // Templates
  itemTemplate: new Simplate([
    '<p class="micro-text">{%: $$.format.date($.AssignedDate, (App.is24HourClock()) ? $$.startDateFormatText24 : $$.startDateFormatText) %}</p>',
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
  labelProperty: 'Ticket.TicketNumber',
  detailView: 'ticketactivity_detail',
  insertView: 'ticketactivity_edit',
  queryOrderBy: null,
  querySelect: [],
  modelName: MODEL_NAMES.TICKETACTIVITY,
  resourceKind: 'ticketActivities',

  _onResize: function _onResize() {
    $('.note-text-item', this.contentNode).each((i, node) => {
      const wrapNode = $('.note-text-wrap', node)[0];
      const moreNode = $('.note-text-more', node)[0];
      if ($(node).height() < $(wrapNode).height()) {
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
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `ActivityDescription like "${q}%"`;
  },
});

lang.setObject('Mobile.SalesLogix.Views.TicketActivity.List', __class);
export default __class;
