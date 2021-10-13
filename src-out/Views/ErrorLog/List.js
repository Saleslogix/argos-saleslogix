define('crm/Views/ErrorLog/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/store/Memory', 'argos/Convert', 'argos/ErrorManager', 'argos/_ListBase', 'argos/I18n'], function (module, exports, _declare, _Memory, _Convert, _ErrorManager, _ListBase, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Memory2 = _interopRequireDefault(_Memory);

  var _Convert2 = _interopRequireDefault(_Convert);

  var _ErrorManager2 = _interopRequireDefault(_ErrorManager);

  var _ListBase2 = _interopRequireDefault(_ListBase);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  var resource = (0, _I18n2.default)('errorLogList');
  var dtFormatResource = (0, _I18n2.default)('errorLogListDateTimeFormat');

  var __class = (0, _declare2.default)('crm.Views.ErrorLog.List', [_ListBase2.default], {
    // Localization
    titleText: resource.titleText,
    errorDateFormatText: dtFormatResource.errorDateFormatText,
    errorDateFormatText24: dtFormatResource.errorDateFormatText24,

    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: crm.Format.date($.Date, (App.is24HourClock()) ? $$.errorDateFormatText24 : $$.errorDateFormatText) %}</p>']),

    // View Properties
    id: 'errorlog_list',
    enableSearch: false,
    enablePullToRefresh: false,
    hideSearch: true,
    expose: false,
    detailView: 'errorlog_detail',
    idProperty: '$key',
    labelProperty: 'Description',

    _onRefresh: function _onRefresh(o) {
      this.inherited(_onRefresh, arguments);
      if (o.resourceKind === 'errorlogs' || o.resourceKind === 'localStorage') {
        this.refreshRequired = true;
      }
    },
    createStore: function createStore() {
      var errorItems = _ErrorManager2.default.getAllErrors();

      errorItems.sort(function (a, b) {
        a.errorDateStamp = a.errorDateStamp || a.Date;
        b.errorDateStamp = b.errorDateStamp || b.Date;
        a.Date = a.errorDateStamp;
        b.Date = b.errorDateStamp;
        var A = _Convert2.default.toDateFromString(a.errorDateStamp);
        var B = _Convert2.default.toDateFromString(b.errorDateStamp);

        return A.valueOf() > B.valueOf();
      });

      return new _Memory2.default({
        data: errorItems,
        idProperty: this.idProperty
      });
    },
    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {
        tbar: []
      });
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});