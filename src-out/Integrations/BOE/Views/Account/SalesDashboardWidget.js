define('crm/Integrations/BOE/Views/Account/SalesDashboardWidget', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'argos/Convert', 'argos/RelatedViewManager', '../../DashboardWidget', 'argos/I18n', 'crm/Format', 'crm/Aggregate', 'icboe/Aggregate'], function (module, exports, _declare, _lang, _string, _Convert, _RelatedViewManager, _DashboardWidget, _I18n, _Format, _Aggregate, _Aggregate3) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _string2 = _interopRequireDefault(_string);

  var _Convert2 = _interopRequireDefault(_Convert);

  var _RelatedViewManager2 = _interopRequireDefault(_RelatedViewManager);

  var _DashboardWidget2 = _interopRequireDefault(_DashboardWidget);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _Format2 = _interopRequireDefault(_Format);

  var _Aggregate2 = _interopRequireDefault(_Aggregate);

  var _Aggregate4 = _interopRequireDefault(_Aggregate3);

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

  var resource = (0, _I18n2.default)('salesDashboardWidget');

  /**
   * @class crm.Integrations.BOE.Views.Account.SalesDashboardWidget
   */
  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.Account.SalesDashboardWidget', [_DashboardWidget2.default], /** @lends crm.Integrations.BOE.Views.Account.SalesDashboardWidget# */{
    // Localization
    recentRevenueText: resource.recentRevenueText,
    recentCostText: resource.recentCostText,
    recentProfitText: resource.recentProfitText,
    recentMarginText: resource.recentMarginText,
    yoyRevenueText: resource.yoyRevenueText,
    yoyProfitText: resource.yoyProfitText,
    yoyMarginText: resource.yoyMarginText,
    titleText: resource.titleText,
    categoryText: resource.categoryText,

    // Override variables for _DashboardWidgetBase
    color: '#313236',
    selectedColor: '#50535a',
    dayValue: 90,
    yearDays: 365,
    queriedOnce: false,

    // Codes for the status picklist of the entity
    openCode: 'Open',
    pendingCode: 'Pending',
    partialPaidCode: 'PartialPaid',
    paidCode: 'Paid',
    closedCode: 'Closed',
    canceledCode: 'Canceled',

    formatModule: _Format2.default,
    /**
       * Values for the metrics
       * name: valueNeeded by the widget,
       * aggregate: function to aggregate the value,
       * aggregateModule: path to the file holding the aggregate function,
       * value: set to null (will hold the value once queried),
       * queryIndex: the index of the query based on how it was added to queryArgs in the setQueryArgs function,
       * dateDependent: bool to let the base know whether to refresh the value on a range change
       */
    values: [{
      name: 'revenue',
      aggregate: 'sum',
      aggregateModule: _Aggregate2.default,
      value: null,
      queryIndex: 0,
      dateDependent: true
    }, {
      name: 'cost',
      aggregate: 'sum',
      aggregateModule: _Aggregate2.default,
      value: null,
      queryIndex: 1,
      dateDependent: true
    }, {
      name: 'profit',
      aggregate: 'calcProfit',
      aggregateModule: _Aggregate4.default,
      value: null,
      queryIndex: [0, 1],
      dateDependent: true
    }, {
      name: 'margin',
      aggregate: 'calcMargin',
      aggregateModule: _Aggregate4.default,
      value: null,
      queryIndex: [0, 1],
      dateDependent: true
    }, {
      name: 'yoyRevenue',
      aggregate: 'calcYoYRevenue',
      aggregateModule: _Aggregate4.default,
      value: null,
      queryIndex: [2, 3],
      dateDependent: false
    }, {
      name: 'yoyProfit',
      aggregate: 'calcYoYProfit',
      aggregateModule: _Aggregate4.default,
      value: null,
      queryIndex: [2, 3, 4, 5],
      dateDependent: false
    }, {
      name: 'yoyMargin',
      aggregate: 'calcYoYMargin',
      aggregateModule: _Aggregate4.default,
      value: null,
      queryIndex: [2, 3, 4, 5],
      dateDependent: true
    }],

    resourceKind: 'accounts',
    querySelect: ['AccountName'],
    queryArgs: null,
    getWhere: function getWhere() {
      return 'Id eq \'' + this.parentEntry.$key + '\'';
    },
    getBaseQuery: function getBaseQuery(entry) {
      var query = '(Account.Id eq "' + entry.$key + '" and (ErpStatus eq "' + this.openCode + '" or ErpStatus eq "' + this.partialPaidCode + '" or ErpStatus eq "' + this.pendingCode + '" or ErpStatus eq "' + this.paidCode + '"))';
      return query;
    },
    createRangeLayout: function createRangeLayout() {
      var rangeLayout = [{
        value: 30
      }, {
        value: 60
      }, {
        value: 90
      }, {
        value: 180
      }, {
        value: 365
      }];
      return rangeLayout;
    },
    createMetricLayout: function createMetricLayout(entry) {
      this.setQueryArgs(entry);

      /**
         * Format of metric layout:
         * formatter: value,
         * formatModule: module to load that contains the value,
         * title: title of the widget,
         * valueNeeded: value that the widget consumes
       */
      var metricLayout = [{
        formatter: 'bigNumber',
        formatModule: this.formatModule,
        title: this.recentRevenueText,
        valueNeeded: 'revenue',
        decorator: 'positiveTrend'
      }, {
        formatter: 'bigNumber',
        formatModule: this.formatModule,
        title: this.recentProfitText,
        valueNeeded: 'profit',
        decorator: 'positiveTrend'
      }, {
        formatter: 'percent',
        formatModule: this.formatModule,
        title: this.recentMarginText,
        valueNeeded: 'margin',
        decorator: 'positiveTrend'
      }, {
        formatter: 'percent',
        formatModule: this.formatModule,
        title: this.yoyRevenueText,
        valueNeeded: 'yoyRevenue',
        decorator: 'positiveTrend'
      }, {
        formatter: 'percent',
        formatModule: this.formatModule,
        title: this.yoyProfitText,
        valueNeeded: 'yoyProfit',
        decorator: 'positiveTrend'
      }, {
        formatter: 'percent',
        formatModule: this.formatModule,
        title: this.yoyMarginText,
        valueNeeded: 'yoyMargin',
        decorator: 'positiveTrend'
      }];

      return metricLayout;
    },
    setQueryArgs: function setQueryArgs(entry) {
      // This function builds the query args array in an order that matches the queryIndex values needed by the values array
      this.queryArgs = [];
      this.queryArgs.push(['erpInvoices', {
        _activeFilter: this.getBaseQuery(entry) + ' and ' + this.pastDays('ErpDocumentDate', this.dayValue, null),
        _filterName: 'ErpStatus',
        _metricName: 'SumGrandTotal'
      }], ['erpInvoices', {
        _activeFilter: this.getBaseQuery(entry) + ' and ' + this.pastDays('ErpDocumentDate', this.dayValue, null),
        _filterName: 'ErpStatus',
        _metricName: 'SumExtendedCost'
      }]);

      if (!this.queriedOnce) {
        this.queryArgs.push(['erpInvoices', {
          _activeFilter: this.getBaseQuery(entry) + ' and ' + this.pastDays('ErpDocumentDate', this.yearDays, null),
          _filterName: 'ErpStatus',
          _metricName: 'SumGrandTotal'
        }], ['erpInvoices', {
          _activeFilter: this.getBaseQuery(entry) + ' and ' + this.pastDays('ErpDocumentDate', 2 * this.yearDays, this.yearDays),
          _filterName: 'ErpStatus',
          _metricName: 'SumGrandTotal'
        }], ['erpInvoices', {
          _activeFilter: this.getBaseQuery(entry) + ' and ' + this.pastDays('ErpDocumentDate', this.yearDays, null),
          _filterName: 'ErpStatus',
          _metricName: 'SumExtendedCost'
        }], ['erpInvoices', {
          _activeFilter: this.getBaseQuery(entry) + ' and ' + this.pastDays('ErpDocumentDate', 2 * this.yearDays, this.yearDays),
          _filterName: 'ErpStatus',
          _metricName: 'SumExtendedCost'
        }]);
      }
      this.queriedOnce = true;
    },
    pastDays: function pastDays(property, from, to) {
      var now = moment();

      var pastWeekStart = now.clone().subtract(from, 'days').startOf('day');
      var today = void 0;

      if (!to) {
        today = now.clone().endOf('day');
      } else {
        today = now.clone().subtract(to, 'days').endOf('day');
      }

      var query = _string2.default.substitute('((' + property + ' between @${0}@ and @${1}@) or (' + property + ' between @${2}@ and @${3}@))', [_Convert2.default.toIsoStringFromDate(pastWeekStart.toDate()), _Convert2.default.toIsoStringFromDate(today.toDate()), pastWeekStart.format('YYYY-MM-DDT00:00:00[Z]'), today.format('YYYY-MM-DDT23:59:59[Z]')]);
      return query;
    }
  });
  var rvm = new _RelatedViewManager2.default();
  rvm.registerType('account_sales_dashboard_widget', __class);
  _lang2.default.setObject('icboe.Views.Account.SalesDashboardWidget', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0FjY291bnQvU2FsZXNEYXNoYm9hcmRXaWRnZXQuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwicmVjZW50UmV2ZW51ZVRleHQiLCJyZWNlbnRDb3N0VGV4dCIsInJlY2VudFByb2ZpdFRleHQiLCJyZWNlbnRNYXJnaW5UZXh0IiwieW95UmV2ZW51ZVRleHQiLCJ5b3lQcm9maXRUZXh0IiwieW95TWFyZ2luVGV4dCIsInRpdGxlVGV4dCIsImNhdGVnb3J5VGV4dCIsImNvbG9yIiwic2VsZWN0ZWRDb2xvciIsImRheVZhbHVlIiwieWVhckRheXMiLCJxdWVyaWVkT25jZSIsIm9wZW5Db2RlIiwicGVuZGluZ0NvZGUiLCJwYXJ0aWFsUGFpZENvZGUiLCJwYWlkQ29kZSIsImNsb3NlZENvZGUiLCJjYW5jZWxlZENvZGUiLCJmb3JtYXRNb2R1bGUiLCJ2YWx1ZXMiLCJuYW1lIiwiYWdncmVnYXRlIiwiYWdncmVnYXRlTW9kdWxlIiwidmFsdWUiLCJxdWVyeUluZGV4IiwiZGF0ZURlcGVuZGVudCIsInJlc291cmNlS2luZCIsInF1ZXJ5U2VsZWN0IiwicXVlcnlBcmdzIiwiZ2V0V2hlcmUiLCJwYXJlbnRFbnRyeSIsIiRrZXkiLCJnZXRCYXNlUXVlcnkiLCJlbnRyeSIsInF1ZXJ5IiwiY3JlYXRlUmFuZ2VMYXlvdXQiLCJyYW5nZUxheW91dCIsImNyZWF0ZU1ldHJpY0xheW91dCIsInNldFF1ZXJ5QXJncyIsIm1ldHJpY0xheW91dCIsImZvcm1hdHRlciIsInRpdGxlIiwidmFsdWVOZWVkZWQiLCJkZWNvcmF0b3IiLCJwdXNoIiwiX2FjdGl2ZUZpbHRlciIsInBhc3REYXlzIiwiX2ZpbHRlck5hbWUiLCJfbWV0cmljTmFtZSIsInByb3BlcnR5IiwiZnJvbSIsInRvIiwibm93IiwibW9tZW50IiwicGFzdFdlZWtTdGFydCIsImNsb25lIiwic3VidHJhY3QiLCJzdGFydE9mIiwidG9kYXkiLCJlbmRPZiIsInN1YnN0aXR1dGUiLCJ0b0lzb1N0cmluZ0Zyb21EYXRlIiwidG9EYXRlIiwiZm9ybWF0IiwicnZtIiwicmVnaXN0ZXJUeXBlIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQTJCQSxNQUFNQSxXQUFXLG9CQUFZLHNCQUFaLENBQWpCOztBQUVBOzs7QUFHQSxNQUFNQyxVQUFVLHVCQUFRLHlEQUFSLEVBQW1FLDJCQUFuRSxFQUFzRixzRUFBc0U7QUFDMUs7QUFDQUMsdUJBQW1CRixTQUFTRSxpQkFGOEk7QUFHMUtDLG9CQUFnQkgsU0FBU0csY0FIaUo7QUFJMUtDLHNCQUFrQkosU0FBU0ksZ0JBSitJO0FBSzFLQyxzQkFBa0JMLFNBQVNLLGdCQUwrSTtBQU0xS0Msb0JBQWdCTixTQUFTTSxjQU5pSjtBQU8xS0MsbUJBQWVQLFNBQVNPLGFBUGtKO0FBUTFLQyxtQkFBZVIsU0FBU1EsYUFSa0o7QUFTMUtDLGVBQVdULFNBQVNTLFNBVHNKO0FBVTFLQyxrQkFBY1YsU0FBU1UsWUFWbUo7O0FBWTFLO0FBQ0FDLFdBQU8sU0FibUs7QUFjMUtDLG1CQUFlLFNBZDJKO0FBZTFLQyxjQUFVLEVBZmdLO0FBZ0IxS0MsY0FBVSxHQWhCZ0s7QUFpQjFLQyxpQkFBYSxLQWpCNko7O0FBbUIxSztBQUNBQyxjQUFVLE1BcEJnSztBQXFCMUtDLGlCQUFhLFNBckI2SjtBQXNCMUtDLHFCQUFpQixhQXRCeUo7QUF1QjFLQyxjQUFVLE1BdkJnSztBQXdCMUtDLGdCQUFZLFFBeEI4SjtBQXlCMUtDLGtCQUFjLFVBekI0Sjs7QUEyQjFLQyxrQ0EzQjBLO0FBNEIxSzs7Ozs7Ozs7O0FBU0FDLFlBQVEsQ0FBQztBQUNQQyxZQUFNLFNBREM7QUFFUEMsaUJBQVcsS0FGSjtBQUdQQywwQ0FITztBQUlQQyxhQUFPLElBSkE7QUFLUEMsa0JBQVksQ0FMTDtBQU1QQyxxQkFBZTtBQU5SLEtBQUQsRUFPTDtBQUNE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TixJQUFyQixFQUEyQixNQUEzQixFQUFtQ08sT0FBbkMsQ0FBMkMsS0FBM0MsQ0FBdEI7QUFDQSxVQUFJQyxjQUFKOztBQUVBLFVBQUksQ0FBQ1AsRUFBTCxFQUFTO0FBQ1BPLGdCQUFRTixJQUFJRyxLQUFKLEdBQVlJLEtBQVosQ0FBa0IsS0FBbEIsQ0FBUjtBQUNELE9BRkQsTUFFTztBQUNMRCxnQkFBUU4sSUFBSUcsS0FBSixHQUFZQyxRQUFaLENBQXFCTCxFQUFyQixFQUF5QixNQUF6QixFQUFpQ1EsS0FBakMsQ0FBdUMsS0FBdkMsQ0FBUjtBQUNEOztBQUVELFVBQU16QixRQUFRLGlCQUFPMEIsVUFBUCxRQUNQWCxRQURPLHdDQUNzQ0EsUUFEdEMsbUNBRVosQ0FDRSxrQkFBUVksbUJBQVIsQ0FBNEJQLGNBQWNRLE1BQWQsRUFBNUIsQ0FERixFQUVFLGtCQUFRRCxtQkFBUixDQUE0QkgsTUFBTUksTUFBTixFQUE1QixDQUZGLEVBR0VSLGNBQWNTLE1BQWQsQ0FBcUIsd0JBQXJCLENBSEYsRUFJRUwsTUFBTUssTUFBTixDQUFhLHdCQUFiLENBSkYsQ0FGWSxDQUFkO0FBU0EsYUFBTzdCLEtBQVA7QUFDRDtBQTlPeUssR0FBNUosQ0FBaEI7QUFnUEEsTUFBTThCLE1BQU0sa0NBQVo7QUFDQUEsTUFBSUMsWUFBSixDQUFpQixnQ0FBakIsRUFBbURwRSxPQUFuRDtBQUNBLGlCQUFLcUUsU0FBTCxDQUFlLDBDQUFmLEVBQTJEckUsT0FBM0Q7b0JBQ2VBLE8iLCJmaWxlIjoiU2FsZXNEYXNoYm9hcmRXaWRnZXQuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgc3RyaW5nIGZyb20gJ2Rvam8vc3RyaW5nJztcclxuaW1wb3J0IGNvbnZlcnQgZnJvbSAnYXJnb3MvQ29udmVydCc7XHJcbmltcG9ydCBSZWxhdGVkVmlld01hbmFnZXIgZnJvbSAnYXJnb3MvUmVsYXRlZFZpZXdNYW5hZ2VyJztcclxuaW1wb3J0IERhc2hib2FyZFdpZGdldCBmcm9tICcuLi8uLi9EYXNoYm9hcmRXaWRnZXQnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnY3JtL0Zvcm1hdCc7XHJcbmltcG9ydCBhZ2dyZWdhdGUgZnJvbSAnY3JtL0FnZ3JlZ2F0ZSc7XHJcbmltcG9ydCBpY2JvZWFnZ3JlZ2F0ZSBmcm9tICdpY2JvZS9BZ2dyZWdhdGUnO1xyXG5cclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3NhbGVzRGFzaGJvYXJkV2lkZ2V0Jyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5JbnRlZ3JhdGlvbnMuQk9FLlZpZXdzLkFjY291bnQuU2FsZXNEYXNoYm9hcmRXaWRnZXRcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5WaWV3cy5BY2NvdW50LlNhbGVzRGFzaGJvYXJkV2lkZ2V0JywgW0Rhc2hib2FyZFdpZGdldF0sIC8qKiBAbGVuZHMgY3JtLkludGVncmF0aW9ucy5CT0UuVmlld3MuQWNjb3VudC5TYWxlc0Rhc2hib2FyZFdpZGdldCMgKi97XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgcmVjZW50UmV2ZW51ZVRleHQ6IHJlc291cmNlLnJlY2VudFJldmVudWVUZXh0LFxyXG4gIHJlY2VudENvc3RUZXh0OiByZXNvdXJjZS5yZWNlbnRDb3N0VGV4dCxcclxuICByZWNlbnRQcm9maXRUZXh0OiByZXNvdXJjZS5yZWNlbnRQcm9maXRUZXh0LFxyXG4gIHJlY2VudE1hcmdpblRleHQ6IHJlc291cmNlLnJlY2VudE1hcmdpblRleHQsXHJcbiAgeW95UmV2ZW51ZVRleHQ6IHJlc291cmNlLnlveVJldmVudWVUZXh0LFxyXG4gIHlveVByb2ZpdFRleHQ6IHJlc291cmNlLnlveVByb2ZpdFRleHQsXHJcbiAgeW95TWFyZ2luVGV4dDogcmVzb3VyY2UueW95TWFyZ2luVGV4dCxcclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBjYXRlZ29yeVRleHQ6IHJlc291cmNlLmNhdGVnb3J5VGV4dCxcclxuXHJcbiAgLy8gT3ZlcnJpZGUgdmFyaWFibGVzIGZvciBfRGFzaGJvYXJkV2lkZ2V0QmFzZVxyXG4gIGNvbG9yOiAnIzMxMzIzNicsXHJcbiAgc2VsZWN0ZWRDb2xvcjogJyM1MDUzNWEnLFxyXG4gIGRheVZhbHVlOiA5MCxcclxuICB5ZWFyRGF5czogMzY1LFxyXG4gIHF1ZXJpZWRPbmNlOiBmYWxzZSxcclxuXHJcbiAgLy8gQ29kZXMgZm9yIHRoZSBzdGF0dXMgcGlja2xpc3Qgb2YgdGhlIGVudGl0eVxyXG4gIG9wZW5Db2RlOiAnT3BlbicsXHJcbiAgcGVuZGluZ0NvZGU6ICdQZW5kaW5nJyxcclxuICBwYXJ0aWFsUGFpZENvZGU6ICdQYXJ0aWFsUGFpZCcsXHJcbiAgcGFpZENvZGU6ICdQYWlkJyxcclxuICBjbG9zZWRDb2RlOiAnQ2xvc2VkJyxcclxuICBjYW5jZWxlZENvZGU6ICdDYW5jZWxlZCcsXHJcblxyXG4gIGZvcm1hdE1vZHVsZTogZm9ybWF0LFxyXG4gIC8qKlxyXG4gICAgICogVmFsdWVzIGZvciB0aGUgbWV0cmljc1xyXG4gICAgICogbmFtZTogdmFsdWVOZWVkZWQgYnkgdGhlIHdpZGdldCxcclxuICAgICAqIGFnZ3JlZ2F0ZTogZnVuY3Rpb24gdG8gYWdncmVnYXRlIHRoZSB2YWx1ZSxcclxuICAgICAqIGFnZ3JlZ2F0ZU1vZHVsZTogcGF0aCB0byB0aGUgZmlsZSBob2xkaW5nIHRoZSBhZ2dyZWdhdGUgZnVuY3Rpb24sXHJcbiAgICAgKiB2YWx1ZTogc2V0IHRvIG51bGwgKHdpbGwgaG9sZCB0aGUgdmFsdWUgb25jZSBxdWVyaWVkKSxcclxuICAgICAqIHF1ZXJ5SW5kZXg6IHRoZSBpbmRleCBvZiB0aGUgcXVlcnkgYmFzZWQgb24gaG93IGl0IHdhcyBhZGRlZCB0byBxdWVyeUFyZ3MgaW4gdGhlIHNldFF1ZXJ5QXJncyBmdW5jdGlvbixcclxuICAgICAqIGRhdGVEZXBlbmRlbnQ6IGJvb2wgdG8gbGV0IHRoZSBiYXNlIGtub3cgd2hldGhlciB0byByZWZyZXNoIHRoZSB2YWx1ZSBvbiBhIHJhbmdlIGNoYW5nZVxyXG4gICAgICovXHJcbiAgdmFsdWVzOiBbe1xyXG4gICAgbmFtZTogJ3JldmVudWUnLFxyXG4gICAgYWdncmVnYXRlOiAnc3VtJyxcclxuICAgIGFnZ3JlZ2F0ZU1vZHVsZTogYWdncmVnYXRlLFxyXG4gICAgdmFsdWU6IG51bGwsXHJcbiAgICBxdWVyeUluZGV4OiAwLFxyXG4gICAgZGF0ZURlcGVuZGVudDogdHJ1ZSxcclxuICB9LCB7XHJcbiAgICBuYW1lOiAnY29zdCcsXHJcbiAgICBhZ2dyZWdhdGU6ICdzdW0nLFxyXG4gICAgYWdncmVnYXRlTW9kdWxlOiBhZ2dyZWdhdGUsXHJcbiAgICB2YWx1ZTogbnVsbCxcclxuICAgIHF1ZXJ5SW5kZXg6IDEsXHJcbiAgICBkYXRlRGVwZW5kZW50OiB0cnVlLFxyXG4gIH0sIHtcclxuICAgIG5hbWU6ICdwcm9maXQnLFxyXG4gICAgYWdncmVnYXRlOiAnY2FsY1Byb2ZpdCcsXHJcbiAgICBhZ2dyZWdhdGVNb2R1bGU6IGljYm9lYWdncmVnYXRlLFxyXG4gICAgdmFsdWU6IG51bGwsXHJcbiAgICBxdWVyeUluZGV4OiBbMCwgMV0sXHJcbiAgICBkYXRlRGVwZW5kZW50OiB0cnVlLFxyXG4gIH0sIHtcclxuICAgIG5hbWU6ICdtYXJnaW4nLFxyXG4gICAgYWdncmVnYXRlOiAnY2FsY01hcmdpbicsXHJcbiAgICBhZ2dyZWdhdGVNb2R1bGU6IGljYm9lYWdncmVnYXRlLFxyXG4gICAgdmFsdWU6IG51bGwsXHJcbiAgICBxdWVyeUluZGV4OiBbMCwgMV0sXHJcbiAgICBkYXRlRGVwZW5kZW50OiB0cnVlLFxyXG4gIH0sIHtcclxuICAgIG5hbWU6ICd5b3lSZXZlbnVlJyxcclxuICAgIGFnZ3JlZ2F0ZTogJ2NhbGNZb1lSZXZlbnVlJyxcclxuICAgIGFnZ3JlZ2F0ZU1vZHVsZTogaWNib2VhZ2dyZWdhdGUsXHJcbiAgICB2YWx1ZTogbnVsbCxcclxuICAgIHF1ZXJ5SW5kZXg6IFsyLCAzXSxcclxuICAgIGRhdGVEZXBlbmRlbnQ6IGZhbHNlLFxyXG4gIH0sIHtcclxuICAgIG5hbWU6ICd5b3lQcm9maXQnLFxyXG4gICAgYWdncmVnYXRlOiAnY2FsY1lvWVByb2ZpdCcsXHJcbiAgICBhZ2dyZWdhdGVNb2R1bGU6IGljYm9lYWdncmVnYXRlLFxyXG4gICAgdmFsdWU6IG51bGwsXHJcbiAgICBxdWVyeUluZGV4OiBbMiwgMywgNCwgNV0sXHJcbiAgICBkYXRlRGVwZW5kZW50OiBmYWxzZSxcclxuICB9LCB7XHJcbiAgICBuYW1lOiAneW95TWFyZ2luJyxcclxuICAgIGFnZ3JlZ2F0ZTogJ2NhbGNZb1lNYXJnaW4nLFxyXG4gICAgYWdncmVnYXRlTW9kdWxlOiBpY2JvZWFnZ3JlZ2F0ZSxcclxuICAgIHZhbHVlOiBudWxsLFxyXG4gICAgcXVlcnlJbmRleDogWzIsIDMsIDQsIDVdLFxyXG4gICAgZGF0ZURlcGVuZGVudDogdHJ1ZSxcclxuICB9XSxcclxuXHJcbiAgcmVzb3VyY2VLaW5kOiAnYWNjb3VudHMnLFxyXG4gIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAnQWNjb3VudE5hbWUnLFxyXG4gIF0sXHJcbiAgcXVlcnlBcmdzOiBudWxsLFxyXG4gIGdldFdoZXJlOiBmdW5jdGlvbiBnZXRXaGVyZSgpIHtcclxuICAgIHJldHVybiBgSWQgZXEgJyR7dGhpcy5wYXJlbnRFbnRyeS4ka2V5fSdgO1xyXG4gIH0sXHJcbiAgZ2V0QmFzZVF1ZXJ5OiBmdW5jdGlvbiBnZXRCYXNlUXVlcnkoZW50cnkpIHtcclxuICAgIGNvbnN0IHF1ZXJ5ID0gYChBY2NvdW50LklkIGVxIFwiJHtlbnRyeS4ka2V5fVwiIGFuZCAoRXJwU3RhdHVzIGVxIFwiJHt0aGlzLm9wZW5Db2RlfVwiIG9yIEVycFN0YXR1cyBlcSBcIiR7dGhpcy5wYXJ0aWFsUGFpZENvZGV9XCIgb3IgRXJwU3RhdHVzIGVxIFwiJHt0aGlzLnBlbmRpbmdDb2RlfVwiIG9yIEVycFN0YXR1cyBlcSBcIiR7dGhpcy5wYWlkQ29kZX1cIikpYDtcclxuICAgIHJldHVybiBxdWVyeTtcclxuICB9LFxyXG4gIGNyZWF0ZVJhbmdlTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVSYW5nZUxheW91dCgpIHtcclxuICAgIGNvbnN0IHJhbmdlTGF5b3V0ID0gW3tcclxuICAgICAgdmFsdWU6IDMwLFxyXG4gICAgfSwge1xyXG4gICAgICB2YWx1ZTogNjAsXHJcbiAgICB9LCB7XHJcbiAgICAgIHZhbHVlOiA5MCxcclxuICAgIH0sIHtcclxuICAgICAgdmFsdWU6IDE4MCxcclxuICAgIH0sIHtcclxuICAgICAgdmFsdWU6IDM2NSxcclxuICAgIH1dO1xyXG4gICAgcmV0dXJuIHJhbmdlTGF5b3V0O1xyXG4gIH0sXHJcbiAgY3JlYXRlTWV0cmljTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVNZXRyaWNMYXlvdXQoZW50cnkpIHtcclxuICAgIHRoaXMuc2V0UXVlcnlBcmdzKGVudHJ5KTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICogRm9ybWF0IG9mIG1ldHJpYyBsYXlvdXQ6XHJcbiAgICAgICAqIGZvcm1hdHRlcjogdmFsdWUsXHJcbiAgICAgICAqIGZvcm1hdE1vZHVsZTogbW9kdWxlIHRvIGxvYWQgdGhhdCBjb250YWlucyB0aGUgdmFsdWUsXHJcbiAgICAgICAqIHRpdGxlOiB0aXRsZSBvZiB0aGUgd2lkZ2V0LFxyXG4gICAgICAgKiB2YWx1ZU5lZWRlZDogdmFsdWUgdGhhdCB0aGUgd2lkZ2V0IGNvbnN1bWVzXHJcbiAgICAgKi9cclxuICAgIGNvbnN0IG1ldHJpY0xheW91dCA9IFt7XHJcbiAgICAgIGZvcm1hdHRlcjogJ2JpZ051bWJlcicsXHJcbiAgICAgIGZvcm1hdE1vZHVsZTogdGhpcy5mb3JtYXRNb2R1bGUsXHJcbiAgICAgIHRpdGxlOiB0aGlzLnJlY2VudFJldmVudWVUZXh0LFxyXG4gICAgICB2YWx1ZU5lZWRlZDogJ3JldmVudWUnLFxyXG4gICAgICBkZWNvcmF0b3I6ICdwb3NpdGl2ZVRyZW5kJyxcclxuICAgIH0sIHtcclxuICAgICAgZm9ybWF0dGVyOiAnYmlnTnVtYmVyJyxcclxuICAgICAgZm9ybWF0TW9kdWxlOiB0aGlzLmZvcm1hdE1vZHVsZSxcclxuICAgICAgdGl0bGU6IHRoaXMucmVjZW50UHJvZml0VGV4dCxcclxuICAgICAgdmFsdWVOZWVkZWQ6ICdwcm9maXQnLFxyXG4gICAgICBkZWNvcmF0b3I6ICdwb3NpdGl2ZVRyZW5kJyxcclxuICAgIH0sIHtcclxuICAgICAgZm9ybWF0dGVyOiAncGVyY2VudCcsXHJcbiAgICAgIGZvcm1hdE1vZHVsZTogdGhpcy5mb3JtYXRNb2R1bGUsXHJcbiAgICAgIHRpdGxlOiB0aGlzLnJlY2VudE1hcmdpblRleHQsXHJcbiAgICAgIHZhbHVlTmVlZGVkOiAnbWFyZ2luJyxcclxuICAgICAgZGVjb3JhdG9yOiAncG9zaXRpdmVUcmVuZCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIGZvcm1hdHRlcjogJ3BlcmNlbnQnLFxyXG4gICAgICBmb3JtYXRNb2R1bGU6IHRoaXMuZm9ybWF0TW9kdWxlLFxyXG4gICAgICB0aXRsZTogdGhpcy55b3lSZXZlbnVlVGV4dCxcclxuICAgICAgdmFsdWVOZWVkZWQ6ICd5b3lSZXZlbnVlJyxcclxuICAgICAgZGVjb3JhdG9yOiAncG9zaXRpdmVUcmVuZCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIGZvcm1hdHRlcjogJ3BlcmNlbnQnLFxyXG4gICAgICBmb3JtYXRNb2R1bGU6IHRoaXMuZm9ybWF0TW9kdWxlLFxyXG4gICAgICB0aXRsZTogdGhpcy55b3lQcm9maXRUZXh0LFxyXG4gICAgICB2YWx1ZU5lZWRlZDogJ3lveVByb2ZpdCcsXHJcbiAgICAgIGRlY29yYXRvcjogJ3Bvc2l0aXZlVHJlbmQnLFxyXG4gICAgfSwge1xyXG4gICAgICBmb3JtYXR0ZXI6ICdwZXJjZW50JyxcclxuICAgICAgZm9ybWF0TW9kdWxlOiB0aGlzLmZvcm1hdE1vZHVsZSxcclxuICAgICAgdGl0bGU6IHRoaXMueW95TWFyZ2luVGV4dCxcclxuICAgICAgdmFsdWVOZWVkZWQ6ICd5b3lNYXJnaW4nLFxyXG4gICAgICBkZWNvcmF0b3I6ICdwb3NpdGl2ZVRyZW5kJyxcclxuICAgIH1dO1xyXG5cclxuICAgIHJldHVybiBtZXRyaWNMYXlvdXQ7XHJcbiAgfSxcclxuICBzZXRRdWVyeUFyZ3M6IGZ1bmN0aW9uIHNldFF1ZXJ5QXJncyhlbnRyeSkge1xyXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBidWlsZHMgdGhlIHF1ZXJ5IGFyZ3MgYXJyYXkgaW4gYW4gb3JkZXIgdGhhdCBtYXRjaGVzIHRoZSBxdWVyeUluZGV4IHZhbHVlcyBuZWVkZWQgYnkgdGhlIHZhbHVlcyBhcnJheVxyXG4gICAgdGhpcy5xdWVyeUFyZ3MgPSBbXTtcclxuICAgIHRoaXMucXVlcnlBcmdzLnB1c2goW1xyXG4gICAgICAnZXJwSW52b2ljZXMnLFxyXG4gICAgICB7XHJcbiAgICAgICAgX2FjdGl2ZUZpbHRlcjogYCR7dGhpcy5nZXRCYXNlUXVlcnkoZW50cnkpfSBhbmQgJHt0aGlzLnBhc3REYXlzKCdFcnBEb2N1bWVudERhdGUnLCB0aGlzLmRheVZhbHVlLCBudWxsKX1gLFxyXG4gICAgICAgIF9maWx0ZXJOYW1lOiAnRXJwU3RhdHVzJyxcclxuICAgICAgICBfbWV0cmljTmFtZTogJ1N1bUdyYW5kVG90YWwnLFxyXG4gICAgICB9LFxyXG4gICAgXSwgW1xyXG4gICAgICAnZXJwSW52b2ljZXMnLFxyXG4gICAgICB7XHJcbiAgICAgICAgX2FjdGl2ZUZpbHRlcjogYCR7dGhpcy5nZXRCYXNlUXVlcnkoZW50cnkpfSBhbmQgJHt0aGlzLnBhc3REYXlzKCdFcnBEb2N1bWVudERhdGUnLCB0aGlzLmRheVZhbHVlLCBudWxsKX1gLFxyXG4gICAgICAgIF9maWx0ZXJOYW1lOiAnRXJwU3RhdHVzJyxcclxuICAgICAgICBfbWV0cmljTmFtZTogJ1N1bUV4dGVuZGVkQ29zdCcsXHJcbiAgICAgIH0sXHJcbiAgICBdKTtcclxuXHJcbiAgICBpZiAoIXRoaXMucXVlcmllZE9uY2UpIHtcclxuICAgICAgdGhpcy5xdWVyeUFyZ3MucHVzaChbXHJcbiAgICAgICAgJ2VycEludm9pY2VzJyxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBfYWN0aXZlRmlsdGVyOiBgJHt0aGlzLmdldEJhc2VRdWVyeShlbnRyeSl9IGFuZCAke3RoaXMucGFzdERheXMoJ0VycERvY3VtZW50RGF0ZScsIHRoaXMueWVhckRheXMsIG51bGwpfWAsXHJcbiAgICAgICAgICBfZmlsdGVyTmFtZTogJ0VycFN0YXR1cycsXHJcbiAgICAgICAgICBfbWV0cmljTmFtZTogJ1N1bUdyYW5kVG90YWwnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sIFtcclxuICAgICAgICAnZXJwSW52b2ljZXMnLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIF9hY3RpdmVGaWx0ZXI6IGAke3RoaXMuZ2V0QmFzZVF1ZXJ5KGVudHJ5KX0gYW5kICR7dGhpcy5wYXN0RGF5cygnRXJwRG9jdW1lbnREYXRlJywgMiAqIHRoaXMueWVhckRheXMsIHRoaXMueWVhckRheXMpfWAsXHJcbiAgICAgICAgICBfZmlsdGVyTmFtZTogJ0VycFN0YXR1cycsXHJcbiAgICAgICAgICBfbWV0cmljTmFtZTogJ1N1bUdyYW5kVG90YWwnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sIFtcclxuICAgICAgICAnZXJwSW52b2ljZXMnLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIF9hY3RpdmVGaWx0ZXI6IGAke3RoaXMuZ2V0QmFzZVF1ZXJ5KGVudHJ5KX0gYW5kICR7dGhpcy5wYXN0RGF5cygnRXJwRG9jdW1lbnREYXRlJywgdGhpcy55ZWFyRGF5cywgbnVsbCl9YCxcclxuICAgICAgICAgIF9maWx0ZXJOYW1lOiAnRXJwU3RhdHVzJyxcclxuICAgICAgICAgIF9tZXRyaWNOYW1lOiAnU3VtRXh0ZW5kZWRDb3N0JyxcclxuICAgICAgICB9LFxyXG4gICAgICBdLCBbXHJcbiAgICAgICAgJ2VycEludm9pY2VzJyxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBfYWN0aXZlRmlsdGVyOiBgJHt0aGlzLmdldEJhc2VRdWVyeShlbnRyeSl9IGFuZCAke3RoaXMucGFzdERheXMoJ0VycERvY3VtZW50RGF0ZScsIDIgKiB0aGlzLnllYXJEYXlzLCB0aGlzLnllYXJEYXlzKX1gLFxyXG4gICAgICAgICAgX2ZpbHRlck5hbWU6ICdFcnBTdGF0dXMnLFxyXG4gICAgICAgICAgX21ldHJpY05hbWU6ICdTdW1FeHRlbmRlZENvc3QnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5xdWVyaWVkT25jZSA9IHRydWU7XHJcbiAgfSxcclxuICBwYXN0RGF5czogZnVuY3Rpb24gcGFzdERheXMocHJvcGVydHksIGZyb20sIHRvKSB7XHJcbiAgICBjb25zdCBub3cgPSBtb21lbnQoKTtcclxuXHJcbiAgICBjb25zdCBwYXN0V2Vla1N0YXJ0ID0gbm93LmNsb25lKCkuc3VidHJhY3QoZnJvbSwgJ2RheXMnKS5zdGFydE9mKCdkYXknKTtcclxuICAgIGxldCB0b2RheTtcclxuXHJcbiAgICBpZiAoIXRvKSB7XHJcbiAgICAgIHRvZGF5ID0gbm93LmNsb25lKCkuZW5kT2YoJ2RheScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9kYXkgPSBub3cuY2xvbmUoKS5zdWJ0cmFjdCh0bywgJ2RheXMnKS5lbmRPZignZGF5Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcXVlcnkgPSBzdHJpbmcuc3Vic3RpdHV0ZShcclxuICAgICAgYCgoJHtwcm9wZXJ0eX0gYmV0d2VlbiBAXFwkezB9QCBhbmQgQFxcJHsxfUApIG9yICgke3Byb3BlcnR5fSBiZXR3ZWVuIEBcXCR7Mn1AIGFuZCBAXFwkezN9QCkpYCxcclxuICAgICAgW1xyXG4gICAgICAgIGNvbnZlcnQudG9Jc29TdHJpbmdGcm9tRGF0ZShwYXN0V2Vla1N0YXJ0LnRvRGF0ZSgpKSxcclxuICAgICAgICBjb252ZXJ0LnRvSXNvU3RyaW5nRnJvbURhdGUodG9kYXkudG9EYXRlKCkpLFxyXG4gICAgICAgIHBhc3RXZWVrU3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREVDAwOjAwOjAwW1pdJyksXHJcbiAgICAgICAgdG9kYXkuZm9ybWF0KCdZWVlZLU1NLUREVDIzOjU5OjU5W1pdJyksXHJcbiAgICAgIF1cclxuICAgICk7XHJcbiAgICByZXR1cm4gcXVlcnk7XHJcbiAgfSxcclxufSk7XHJcbmNvbnN0IHJ2bSA9IG5ldyBSZWxhdGVkVmlld01hbmFnZXIoKTtcclxucnZtLnJlZ2lzdGVyVHlwZSgnYWNjb3VudF9zYWxlc19kYXNoYm9hcmRfd2lkZ2V0JywgX19jbGFzcyk7XHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5WaWV3cy5BY2NvdW50LlNhbGVzRGFzaGJvYXJkV2lkZ2V0JywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==