define("crm/Views/Activity/MyDay", ["exports", "dojo/_base/declare", "../_RightDrawerListMixin", "../_MetricListMixin", "../../Models/Names", "./MyList", "./MyDayOffline", "argos/I18n"], function (_exports, _declare, _RightDrawerListMixin2, _MetricListMixin2, _Names, _MyList, _MyDayOffline, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _RightDrawerListMixin2 = _interopRequireDefault(_RightDrawerListMixin2);
  _MetricListMixin2 = _interopRequireDefault(_MetricListMixin2);
  _Names = _interopRequireDefault(_Names);
  _MyList = _interopRequireDefault(_MyList);
  _MyDayOffline = _interopRequireDefault(_MyDayOffline);
  _I18n = _interopRequireDefault(_I18n);

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
  var resource = (0, _I18n["default"])('activityMyDay');

  var __class = (0, _declare["default"])('crm.Views.Activity.MyDay', [_MyList["default"], _RightDrawerListMixin2["default"], _MetricListMixin2["default"]], {
    // Localization
    titleText: resource.titleText,
    // View Properties
    id: 'myday_list',
    resourceKind: 'userActivities',
    modelName: _Names["default"].USERACTIVITY,
    enableSearch: false,
    pageSize: 105,
    queryModelName: 'myday',
    enableOfflineSupport: true,
    _onRefresh: function _onRefresh(options) {
      this.inherited(_onRefresh, arguments);

      if (options.resourceKind === 'activities') {
        this.refreshRequired = true;
      }
    },
    show: function show(options) {
      if (!App.onLine) {
        this._showOfflineView(options);

        return;
      }

      this.inherited(show, arguments);
    },
    _showOfflineView: function _showOfflineView(options) {
      var view = App.getView('myday_offline_list');

      if (!view) {
        view = new _MyDayOffline["default"]();
        App.registerView(view);
      }

      view = App.getView('myday_offline_list');

      if (view) {
        view.show(options);
      }
    },
    createToolLayout: function createToolLayout() {
      this.inherited(createToolLayout, arguments);

      if (this.tools && this.tools.tbar && !this._refreshAdded && !window.App.supportsTouch()) {
        this.tools.tbar.push({
          id: 'refresh',
          svg: 'refresh',
          action: '_refreshClicked'
        });
        this._refreshAdded = true;
      }

      return this.tools;
    },
    _refreshAdded: false,
    _refreshClicked: function _refreshClicked() {
      this.clear();
      this.refreshRequired = true;
      this.refresh(); // Hook for customizers

      this.onRefreshClicked();
    },
    onRefreshClicked: function onRefreshClicked() {},
    _getCurrentQuery: function _getCurrentQuery(options) {
      var myDayQuery = this._model.getMyDayQuery();

      var optionsQuery = options && options.queryArgs && options.queryArgs.activeFilter;
      return [myDayQuery, optionsQuery].filter(function (item) {
        return !!item;
      }).join(' and ');
    },
    allowSelection: true,
    enableActions: true,
    hashTagQueriesText: {}
  });

  var _default = __class;
  _exports["default"] = _default;
});