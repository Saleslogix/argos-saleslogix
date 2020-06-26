define("crm/Views/History/RelatedView", ["exports", "dojo/_base/declare", "argos/RelatedViewWidget", "argos/I18n", "dojo/string", "../../Format"], function (_exports, _declare, _RelatedViewWidget, _I18n, _string, _Format) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _RelatedViewWidget = _interopRequireDefault(_RelatedViewWidget);
  _I18n = _interopRequireDefault(_I18n);
  _string = _interopRequireDefault(_string);
  _Format = _interopRequireDefault(_Format);

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
  var resource = (0, _I18n["default"])('historyRelated');

  var __class = (0, _declare["default"])('crm.Views.History.RelatedView', [_RelatedViewWidget["default"]], {
    // Localization
    regardingText: resource.regardingText,
    byText: resource.byText,
    titleText: resource.titleText,
    id: 'relatedNotes',
    detailViewId: 'history_detail',
    listViewId: 'history_related',
    listViewWhere: null,
    enabled: true,
    showTab: false,
    enableActions: false,
    showTotalInTab: false,
    hideWhenNoData: true,
    resourceKind: 'history',
    select: ['Type', 'ModifyDate', 'CompleteDate', 'UserName', 'Description', 'Notes', 'AccountName'],
    where: null,
    sort: 'ModifyDate desc',
    pageSize: 3,
    Format: _Format["default"],
    relatedItemIconTemplate: new Simplate(['<div class="user-icon">{%: crm.Format.formatUserInitial($.UserName) %}</div>']),
    relatedItemHeaderTemplate: new Simplate(['<p class="micro-text"><strong>{%: $$.getDescription($) %} </strong></p>', '{% if($.UserName) { %}', '<p class="micro-text">{%= $$.getHeader($) %}</p>', '{% } else { %}', '<p class="micro-text">{%: $$.Format.date($.ModifyDate) %}</p>', '{% } %}']),
    relatedItemDetailTemplate: new Simplate(['<div class="note-text-wrap">', '<p class="micro-text">{%: $.Notes %} ... </p>', '</div>']),
    relatedViewHeaderTemplate: new Simplate(['<div class="line-bar"></div>']),
    getDescription: function getDescription(entry) {
      return entry.Description ? entry.Description : entry.$descriptor;
    },
    getHeader: function getHeader(entry) {
      return _string["default"].substitute(this.byText, [_Format["default"].formatByUser(entry.UserName), _Format["default"].date(entry.ModifyDate)]);
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});