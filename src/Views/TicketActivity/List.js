/* Copyright 2017 Infor
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import declare from 'dojo/_base/declare';
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

export default __class;
