define("crm/Views/TicketActivity/List", ["exports", "dojo/_base/declare", "argos/List", "argos/I18n", "crm/Format", "../../Models/Names"], function (_exports, _declare, _List, _I18n, _Format, _Names) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _List = _interopRequireDefault(_List);
  _I18n = _interopRequireDefault(_I18n);
  _Format = _interopRequireDefault(_Format);
  _Names = _interopRequireDefault(_Names);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
  var resource = (0, _I18n["default"])('ticketActivityList');
  var dtFormatResource = (0, _I18n["default"])('ticketActivityListDateTimeFormat');

  var __class = (0, _declare["default"])('crm.Views.TicketActivity.List', [_List["default"]], {
    format: _Format["default"],
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
    modelName: _Names["default"].TICKETACTIVITY,
    resourceKind: 'ticketActivities',
    _onResize: function _onResize() {
      $('.note-text-item', this.contentNode).each(function (i, node) {
        var wrapNode = $('.note-text-wrap', node)[0];
        var moreNode = $('.note-text-more', node)[0];

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
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return "ActivityDescription like \"".concat(q, "%\"");
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});