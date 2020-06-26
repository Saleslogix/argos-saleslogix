define("crm/Integrations/BOE/Views/Account/ActivityDashboardWidget", ["exports", "dojo/_base/declare", "dojo/_base/lang", "dojo/string", "argos/Convert", "argos/RelatedViewManager", "../../DashboardWidget", "argos/I18n"], function (_exports, _declare, _lang, _string, _Convert, _RelatedViewManager, _DashboardWidget, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _string = _interopRequireDefault(_string);
  _Convert = _interopRequireDefault(_Convert);
  _RelatedViewManager = _interopRequireDefault(_RelatedViewManager);
  _DashboardWidget = _interopRequireDefault(_DashboardWidget);
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
  var resource = (0, _I18n["default"])('activityDashboardWidget');

  var __class = (0, _declare["default"])('crm.Integrations.BOE.Views.Account.ActivityDashboardWidget', [_DashboardWidget["default"]], {
    // Localization
    recentText: resource.recentText,
    myPendingText: resource.myPendingText,
    pendingText: resource.pendingText,
    lateText: resource.lateText,
    titleText: resource.titleText,
    categoryText: resource.categoryText,
    // Override variables for _DashboardWidgetBase
    color: '#313236',
    selectedColor: '#50535a',
    dayValue: 7,
    // Codes used for the status of the entity
    openCode: 'Open',
    closedCode: 'Closed',
    resourceKind: 'accounts',
    querySelect: ['AccountName'],
    getWhere: function getWhere() {
      return "Id eq '".concat(this.parentEntry.$key, "'");
    },
    createRangeLayout: function createRangeLayout() {
      var rangeLayout = [{
        value: 7
      }, {
        value: 14
      }, {
        value: 21
      }, {
        value: 30
      }];
      return rangeLayout;
    },
    createMetricLayout: function createMetricLayout(entry) {
      var metricLayout = [{
        navTo: 'account_newquotes_related',
        formatter: 'bigNumber',
        title: this.recentText,
        queryArgs: {
          _activeFilter: "AccountId eq \"".concat(entry.$key, "\" and ").concat(this.pastDays('CreateDate')),
          _filterName: 'ActivityType',
          _metricName: 'CountActivities'
        },
        queryName: 'executeMetric',
        resourceKind: 'activities',
        aggregate: 'sum',
        valueType: 'crm/Aggregate'
      }];
      return metricLayout;
    },
    pastDays: function pastDays(property) {
      var now = moment();
      var pastWeekStart = now.clone().subtract(this.dayValue, 'days').startOf('day');
      var today = now.clone().endOf('day');

      var queries = _string["default"].substitute("((".concat(property, " between @${0}@ and @${1}@) or (").concat(property, " between @${2}@ and @${3}@))"), [_Convert["default"].toIsoStringFromDate(pastWeekStart.toDate()), _Convert["default"].toIsoStringFromDate(today.toDate()), pastWeekStart.format('YYYY-MM-DDT00:00:00[Z]'), today.format('YYYY-MM-DDT23:59:59[Z]')]);

      return queries;
    }
  });

  var rvm = new _RelatedViewManager["default"]();
  rvm.registerType('account_activity_dashboard_widget', __class);

  _lang["default"].setObject('icboe.Views.Account.ActivityDashboardWidget', __class);

  var _default = __class;
  _exports["default"] = _default;
});