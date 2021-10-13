define('crm/Views/TicketActivity/List', ['module', 'exports', 'dojo/_base/declare', 'argos/List', 'argos/I18n', 'crm/Format', '../../Models/Names'], function (module, exports, _declare, _List, _I18n, _Format, _Names) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _List2 = _interopRequireDefault(_List);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _Format2 = _interopRequireDefault(_Format);

  var _Names2 = _interopRequireDefault(_Names);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  const resource = (0, _I18n2.default)('ticketActivityList'); /* Copyright 2017 Infor
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

  const dtFormatResource = (0, _I18n2.default)('ticketActivityListDateTimeFormat');

  const __class = (0, _declare2.default)('crm.Views.TicketActivity.List', [_List2.default], {
    format: _Format2.default,
    // Templates
    itemTemplate: new Simplate(['<p class="micro-text">{%: $$.format.date($.AssignedDate, (App.is24HourClock()) ? $$.startDateFormatText24 : $$.startDateFormatText) %}</p>', '<div class="note-text-item">', '<div class="note-text-wrap">', '{%: $.ActivityDescription %}', '</div>', '<div class="note-text-more"></div>', '</div>']),

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
    modelName: _Names2.default.TICKETACTIVITY,
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
      this.inherited(processData, arguments);
      this._onResize();
    },
    postCreate: function postCreate() {
      this.inherited(postCreate, arguments);
      $(window).on('resize', this._onResize.bind(this));
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      const q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return `ActivityDescription like "${q}%"`;
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});