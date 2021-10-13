define('crm/Views/History/RelatedView', ['module', 'exports', 'dojo/_base/declare', 'argos/RelatedViewWidget', 'argos/I18n', 'dojo/string', '../../Format'], function (module, exports, _declare, _RelatedViewWidget, _I18n, _string, _Format) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _RelatedViewWidget2 = _interopRequireDefault(_RelatedViewWidget);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _string2 = _interopRequireDefault(_string);

  var _Format2 = _interopRequireDefault(_Format);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  const resource = (0, _I18n2.default)('historyRelated'); /* Copyright 2017 Infor
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

  const __class = (0, _declare2.default)('crm.Views.History.RelatedView', [_RelatedViewWidget2.default], {
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
    Format: _Format2.default,
    relatedItemIconTemplate: new Simplate(['<div class="user-icon">{%: crm.Format.formatUserInitial($.UserName) %}</div>']),
    relatedItemHeaderTemplate: new Simplate(['<p class="micro-text"><strong>{%: $$.getDescription($) %} </strong></p>', '{% if($.UserName) { %}', '<p class="micro-text">{%= $$.getHeader($) %}</p>', '{% } else { %}', '<p class="micro-text">{%: $$.Format.date($.ModifyDate) %}</p>', '{% } %}']),
    relatedItemDetailTemplate: new Simplate(['<div class="note-text-wrap">', '<p class="micro-text">{%: $.Notes %} ... </p>', '</div>']),
    relatedViewHeaderTemplate: new Simplate(['<div class="line-bar"></div>']),
    getDescription: function getDescription(entry) {
      return entry.Description ? entry.Description : entry.$descriptor;
    },
    getHeader: function getHeader(entry) {
      return _string2.default.substitute(this.byText, [_Format2.default.formatByUser(entry.UserName), _Format2.default.date(entry.ModifyDate)]);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});