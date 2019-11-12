define('crm/DefaultMetrics', ['module', 'exports', 'dojo/_base/declare', 'argos/_CustomizationMixin', 'argos/I18n'], function (module, exports, _declare, _CustomizationMixin2, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _CustomizationMixin3 = _interopRequireDefault(_CustomizationMixin2);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('defaultMetrics'); /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.DefaultMetrics', [_CustomizationMixin3.default], {
    // Localiztion
    accountsText: {
      totalRevenue: resource.totalRevenue,
      averageTime: resource.averageTime,
      total: resource.totalAccounts
    },
    opportunitiesText: {
      total: resource.totalOpportunities,
      potential: resource.potential,
      montlyPotential: resource.montlyPotential
    },
    ticketsText: {
      total: resource.totalTickets,
      averageOpen: resource.averageOpen
    },
    contactsText: {
      total: resource.totalContacts
    },
    leadsText: {
      total: resource.totalLeads
    },
    historyText: {
      total: resource.totalHistory,
      duration: resource.duration
    },
    offlineText: {
      total: resource.totalRecentlyViewed
    },
    customizationSet: 'metrics',
    id: 'default_metrics',
    getDefinitions: function getDefinitions() {
      return this._createCustomizedLayout(this.createLayout(), 'definitions');
    },
    createLayout: function createLayout() {
      return [{
        resourceKind: 'userActivities',
        children: [{
          title: resource.meetings,
          queryName: 'executeMetric',
          queryArgs: {
            _filterName: 'ActivityType',
            activeFilter: "Activity.Type eq 'atAppointment'"
          },
          activityType: 'atAppointment',
          aggregate: 'sum',
          formatter: 'bigNumber',
          enabled: false
        }, {
          title: resource.calls,
          queryName: 'executeMetric',
          queryArgs: {
            _filterName: 'ActivityType',
            activeFilter: "Activity.Type eq 'atPhoneCall'"
          },
          activityType: 'atPhoneCall',
          aggregate: 'sum',
          formatter: 'bigNumber',
          enabled: false
        }, {
          title: resource.todos,
          queryName: 'executeMetric',
          queryArgs: {
            _filterName: 'ActivityType',
            activeFilter: "Activity.Type eq 'atToDo'"
          },
          activityType: 'atToDo',
          aggregate: 'sum',
          formatter: 'bigNumber',
          enabled: false
        }, {
          title: resource.personal,
          queryName: 'executeMetric',
          queryArgs: {
            _filterName: 'ActivityType',
            activeFilter: "Activity.Type eq 'atPersonal'"
          },
          activityType: 'atPersonal',
          aggregate: 'sum',
          formatter: 'bigNumber',
          enabled: false
        }]
      }, {
        resourceKind: 'accounts',
        children: [{
          title: this.accountsText.totalRevenue,
          queryName: 'executeMetric',
          queryArgs: {
            _filterName: 'AccountManager',
            _metricName: 'TotalRevenue'
          },
          chartType: 'bar',
          aggregate: 'sum',
          formatter: 'bigNumber',
          enabled: false
        }, {
          title: this.accountsText.averageTime,
          queryName: 'executeMetric',
          queryArgs: {
            _filterName: 'Type',
            _metricName: 'AverageTimeAsCustomer'
          },
          chartType: 'pie',
          aggregate: 'avg',
          formatter: 'time',
          enabled: false
        }, {
          title: this.accountsText.total,
          queryName: 'executeMetric',
          queryArgs: {
            _filterName: 'AccountManager',
            _metricName: 'CountAccounts'
          },
          chartType: 'bar',
          aggregate: 'sum',
          formatter: 'bigNumber',
          enabled: false
        }]
      }, {
        resourceKind: 'opportunities',
        children: [{
          title: this.opportunitiesText.total,
          queryName: 'executeMetric',
          queryArgs: {
            _filterName: 'AccountManager',
            _metricName: 'CountOpportunities'
          },
          chartType: 'bar',
          aggregate: 'sum',
          formatter: 'bigNumber',
          enabled: false
        }, {
          title: this.opportunitiesText.potential,
          queryName: 'executeMetric',
          queryArgs: {
            _filterName: 'AccountManager',
            _metricName: 'SumSalesPotential'
          },
          chartType: 'bar',
          aggregate: 'sum',
          formatter: 'bigNumber',
          enabled: false
        }, {
          title: this.opportunitiesText.montlyPotential,
          queryName: 'executeMetric',
          queryArgs: {
            _filterName: 'EstimatedClose',
            _metricName: 'SumSalesPotential',
            language: App.getCurrentLocale()
          },
          chartType: 'line',
          aggregate: 'avg',
          formatter: 'bigNumber',
          enabled: false
        }]
      }, {
        resourceKind: 'tickets',
        children: [{
          title: this.ticketsText.total,
          queryName: 'executeMetric',
          queryArgs: {
            _filterName: 'Category',
            _metricName: 'TicketCount'
          },
          chartType: 'bar',
          aggregate: 'sum',
          formatter: 'bigNumber',
          enabled: false
        }, {
          title: this.ticketsText.averageOpen,
          queryName: 'executeMetric',
          queryArgs: {
            _filterName: 'AssignedTo',
            _metricName: 'OpenTicketAgingAverage'
          },
          chartType: 'bar',
          aggregate: 'avg',
          formatter: 'fixedLocale',
          enabled: false
        }]
      }, {
        resourceKind: 'contacts',
        children: [{
          title: this.contactsText.total,
          queryName: 'executeMetric',
          queryArgs: {
            _filterName: 'AccountManager',
            _metricName: 'CountContacts'
          },
          chartType: 'bar',
          aggregate: 'sum',
          formatter: 'bigNumber',
          enabled: false
        }]
      }, {
        resourceKind: 'leads',
        children: [{
          title: this.leadsText.total,
          queryName: 'executeMetric',
          queryArgs: {
            _filterName: 'Owner',
            _metricName: 'CountLeads'
          },
          chartType: 'bar',
          aggregate: 'sum',
          formatter: 'bigNumber',
          enabled: false
        }]
      }, {
        resourceKind: 'history',
        children: [{
          title: this.historyText.total,
          queryName: 'executeMetric',
          queryArgs: {
            _filterName: 'Type',
            _metricName: 'CountHistory'
          },
          chartType: 'bar',
          aggregate: 'sum',
          formatter: 'bigNumber',
          enabled: false
        }, {
          title: this.historyText.duration,
          queryName: 'executeMetric',
          queryArgs: {
            _filterName: 'Type',
            _metricName: 'TotalDuration'
          },
          chartType: 'bar',
          aggregate: 'sum',
          formatter: 'bigNumber',
          enabled: false
        }]
      }, {
        resourceKind: 'offline',
        children: [{
          title: this.offlineText.total,
          chartType: 'bar',
          aggregate: 'sum',
          formatter: 'bigNumber',
          enabled: false
        }]
      }];
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EZWZhdWx0TWV0cmljcy5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJhY2NvdW50c1RleHQiLCJ0b3RhbFJldmVudWUiLCJhdmVyYWdlVGltZSIsInRvdGFsIiwidG90YWxBY2NvdW50cyIsIm9wcG9ydHVuaXRpZXNUZXh0IiwidG90YWxPcHBvcnR1bml0aWVzIiwicG90ZW50aWFsIiwibW9udGx5UG90ZW50aWFsIiwidGlja2V0c1RleHQiLCJ0b3RhbFRpY2tldHMiLCJhdmVyYWdlT3BlbiIsImNvbnRhY3RzVGV4dCIsInRvdGFsQ29udGFjdHMiLCJsZWFkc1RleHQiLCJ0b3RhbExlYWRzIiwiaGlzdG9yeVRleHQiLCJ0b3RhbEhpc3RvcnkiLCJkdXJhdGlvbiIsIm9mZmxpbmVUZXh0IiwidG90YWxSZWNlbnRseVZpZXdlZCIsImN1c3RvbWl6YXRpb25TZXQiLCJpZCIsImdldERlZmluaXRpb25zIiwiX2NyZWF0ZUN1c3RvbWl6ZWRMYXlvdXQiLCJjcmVhdGVMYXlvdXQiLCJyZXNvdXJjZUtpbmQiLCJjaGlsZHJlbiIsInRpdGxlIiwibWVldGluZ3MiLCJxdWVyeU5hbWUiLCJxdWVyeUFyZ3MiLCJfZmlsdGVyTmFtZSIsImFjdGl2ZUZpbHRlciIsImFjdGl2aXR5VHlwZSIsImFnZ3JlZ2F0ZSIsImZvcm1hdHRlciIsImVuYWJsZWQiLCJjYWxscyIsInRvZG9zIiwicGVyc29uYWwiLCJfbWV0cmljTmFtZSIsImNoYXJ0VHlwZSIsImxhbmd1YWdlIiwiQXBwIiwiZ2V0Q3VycmVudExvY2FsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkEsTUFBTUEsV0FBVyxvQkFBWSxnQkFBWixDQUFqQixDLENBbkJBOzs7Ozs7Ozs7Ozs7Ozs7QUFxQkEsTUFBTUMsVUFBVSx1QkFBUSxvQkFBUixFQUE4Qiw4QkFBOUIsRUFBcUQ7QUFDbkU7QUFDQUMsa0JBQWM7QUFDWkMsb0JBQWNILFNBQVNHLFlBRFg7QUFFWkMsbUJB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cUJBQVcsS0FQRjtBQVFUUCxxQkFBVyxLQVJGO0FBU1RDLHFCQUFXLFdBVEY7QUFVVEMsbUJBQVM7QUFWQSxTQUFELEVBV1A7QUFDRFQsaUJBQU8sS0FBS1osV0FBTCxDQUFpQkUsUUFEdkI7QUFFRFkscUJBQVcsZUFGVjtBQUdEQyxxQkFBVztBQUNUQyx5QkFBYSxNQURKO0FBRVRTLHlCQUFhO0FBRkosV0FIVjtBQU9EQyxxQkFBVyxLQVBWO0FBUURQLHFCQUFXLEtBUlY7QUFTREMscUJBQVcsV0FUVjtBQVVEQyxtQkFBUztBQVZSLFNBWE87QUFGVCxPQTdLSSxFQXNNSjtBQUNEWCxzQkFBYyxTQURiO0FBRURDLGtCQUFVLENBQUM7QUFDVEMsaUJBQU8sS0FBS1QsV0FBTCxDQUFpQmhCLEtBRGY7QUFFVHVDLHFCQUFXLEtBRkY7QUFHVFAscUJBQVcsS0FIRjtBQUlUQyxxQkFBVyxXQUpGO0FBS1RDLG1CQUFTO0FBTEEsU0FBRDtBQUZULE9BdE1JLENBQVA7QUFnTkQ7QUFuUGtFLEdBQXJELENBQWhCOztvQkFzUGV0QyxPIiwiZmlsZSI6IkRlZmF1bHRNZXRyaWNzLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IF9DdXN0b21pemF0aW9uTWl4aW4gZnJvbSAnYXJnb3MvX0N1c3RvbWl6YXRpb25NaXhpbic7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2RlZmF1bHRNZXRyaWNzJyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkRlZmF1bHRNZXRyaWNzJywgW19DdXN0b21pemF0aW9uTWl4aW5dLCB7XHJcbiAgLy8gTG9jYWxpenRpb25cclxuICBhY2NvdW50c1RleHQ6IHtcclxuICAgIHRvdGFsUmV2ZW51ZTogcmVzb3VyY2UudG90YWxSZXZlbnVlLFxyXG4gICAgYXZlcmFnZVRpbWU6IHJlc291cmNlLmF2ZXJhZ2VUaW1lLFxyXG4gICAgdG90YWw6IHJlc291cmNlLnRvdGFsQWNjb3VudHMsXHJcbiAgfSxcclxuICBvcHBvcnR1bml0aWVzVGV4dDoge1xyXG4gICAgdG90YWw6IHJlc291cmNlLnRvdGFsT3Bwb3J0dW5pdGllcyxcclxuICAgIHBvdGVudGlhbDogcmVzb3VyY2UucG90ZW50aWFsLFxyXG4gICAgbW9udGx5UG90ZW50aWFsOiByZXNvdXJjZS5tb250bHlQb3RlbnRpYWwsXHJcbiAgfSxcclxuICB0aWNrZXRzVGV4dDoge1xyXG4gICAgdG90YWw6IHJlc291cmNlLnRvdGFsVGlja2V0cyxcclxuICAgIGF2ZXJhZ2VPcGVuOiByZXNvdXJjZS5hdmVyYWdlT3BlbixcclxuICB9LFxyXG4gIGNvbnRhY3RzVGV4dDoge1xyXG4gICAgdG90YWw6IHJlc291cmNlLnRvdGFsQ29udGFjdHMsXHJcbiAgfSxcclxuICBsZWFkc1RleHQ6IHtcclxuICAgIHRvdGFsOiByZXNvdXJjZS50b3RhbExlYWRzLFxyXG4gIH0sXHJcbiAgaGlzdG9yeVRleHQ6IHtcclxuICAgIHRvdGFsOiByZXNvdXJjZS50b3RhbEhpc3RvcnksXHJcbiAgICBkdXJhdGlvbjogcmVzb3VyY2UuZHVyYXRpb24sXHJcbiAgfSxcclxuICBvZmZsaW5lVGV4dDoge1xyXG4gICAgdG90YWw6IHJlc291cmNlLnRvdGFsUmVjZW50bHlWaWV3ZWQsXHJcbiAgfSxcclxuICBjdXN0b21pemF0aW9uU2V0OiAnbWV0cmljcycsXHJcbiAgaWQ6ICdkZWZhdWx0X21ldHJpY3MnLFxyXG4gIGdldERlZmluaXRpb25zOiBmdW5jdGlvbiBnZXREZWZpbml0aW9ucygpIHtcclxuICAgIHJldHVybiB0aGlzLl9jcmVhdGVDdXN0b21pemVkTGF5b3V0KHRoaXMuY3JlYXRlTGF5b3V0KCksICdkZWZpbml0aW9ucycpO1xyXG4gIH0sXHJcbiAgY3JlYXRlTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gW3tcclxuICAgICAgcmVzb3VyY2VLaW5kOiAndXNlckFjdGl2aXRpZXMnLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICB0aXRsZTogcmVzb3VyY2UubWVldGluZ3MsXHJcbiAgICAgICAgcXVlcnlOYW1lOiAnZXhlY3V0ZU1ldHJpYycsXHJcbiAgICAgICAgcXVlcnlBcmdzOiB7XHJcbiAgICAgICAgICBfZmlsdGVyTmFtZTogJ0FjdGl2aXR5VHlwZScsXHJcbiAgICAgICAgICBhY3RpdmVGaWx0ZXI6IFwiQWN0aXZpdHkuVHlwZSBlcSAnYXRBcHBvaW50bWVudCdcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFjdGl2aXR5VHlwZTogJ2F0QXBwb2ludG1lbnQnLFxyXG4gICAgICAgIGFnZ3JlZ2F0ZTogJ3N1bScsXHJcbiAgICAgICAgZm9ybWF0dGVyOiAnYmlnTnVtYmVyJyxcclxuICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIHRpdGxlOiByZXNvdXJjZS5jYWxscyxcclxuICAgICAgICBxdWVyeU5hbWU6ICdleGVjdXRlTWV0cmljJyxcclxuICAgICAgICBxdWVyeUFyZ3M6IHtcclxuICAgICAgICAgIF9maWx0ZXJOYW1lOiAnQWN0aXZpdHlUeXBlJyxcclxuICAgICAgICAgIGFjdGl2ZUZpbHRlcjogXCJBY3Rpdml0eS5UeXBlIGVxICdhdFBob25lQ2FsbCdcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFjdGl2aXR5VHlwZTogJ2F0UGhvbmVDYWxsJyxcclxuICAgICAgICBhZ2dyZWdhdGU6ICdzdW0nLFxyXG4gICAgICAgIGZvcm1hdHRlcjogJ2JpZ051bWJlcicsXHJcbiAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICB0aXRsZTogcmVzb3VyY2UudG9kb3MsXHJcbiAgICAgICAgcXVlcnlOYW1lOiAnZXhlY3V0ZU1ldHJpYycsXHJcbiAgICAgICAgcXVlcnlBcmdzOiB7XHJcbiAgICAgICAgICBfZmlsdGVyTmFtZTogJ0FjdGl2aXR5VHlwZScsXHJcbiAgICAgICAgICBhY3RpdmVGaWx0ZXI6IFwiQWN0aXZpdHkuVHlwZSBlcSAnYXRUb0RvJ1wiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWN0aXZpdHlUeXBlOiAnYXRUb0RvJyxcclxuICAgICAgICBhZ2dyZWdhdGU6ICdzdW0nLFxyXG4gICAgICAgIGZvcm1hdHRlcjogJ2JpZ051bWJlcicsXHJcbiAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICB0aXRsZTogcmVzb3VyY2UucGVyc29uYWwsXHJcbiAgICAgICAgcXVlcnlOYW1lOiAnZXhlY3V0ZU1ldHJpYycsXHJcbiAgICAgICAgcXVlcnlBcmdzOiB7XHJcbiAgICAgICAgICBfZmlsdGVyTmFtZTogJ0FjdGl2aXR5VHlwZScsXHJcbiAgICAgICAgICBhY3RpdmVGaWx0ZXI6IFwiQWN0aXZpdHkuVHlwZSBlcSAnYXRQZXJzb25hbCdcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFjdGl2aXR5VHlwZTogJ2F0UGVyc29uYWwnLFxyXG4gICAgICAgIGFnZ3JlZ2F0ZTogJ3N1bScsXHJcbiAgICAgICAgZm9ybWF0dGVyOiAnYmlnTnVtYmVyJyxcclxuICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgfV0sXHJcbiAgICB9LCB7XHJcbiAgICAgIHJlc291cmNlS2luZDogJ2FjY291bnRzJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgdGl0bGU6IHRoaXMuYWNjb3VudHNUZXh0LnRvdGFsUmV2ZW51ZSxcclxuICAgICAgICBxdWVyeU5hbWU6ICdleGVjdXRlTWV0cmljJyxcclxuICAgICAgICBxdWVyeUFyZ3M6IHtcclxuICAgICAgICAgIF9maWx0ZXJOYW1lOiAnQWNjb3VudE1hbmFnZXInLFxyXG4gICAgICAgICAgX21ldHJpY05hbWU6ICdUb3RhbFJldmVudWUnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2hhcnRUeXBlOiAnYmFyJyxcclxuICAgICAgICBhZ2dyZWdhdGU6ICdzdW0nLFxyXG4gICAgICAgIGZvcm1hdHRlcjogJ2JpZ051bWJlcicsXHJcbiAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICB0aXRsZTogdGhpcy5hY2NvdW50c1RleHQuYXZlcmFnZVRpbWUsXHJcbiAgICAgICAgcXVlcnlOYW1lOiAnZXhlY3V0ZU1ldHJpYycsXHJcbiAgICAgICAgcXVlcnlBcmdzOiB7XHJcbiAgICAgICAgICBfZmlsdGVyTmFtZTogJ1R5cGUnLFxyXG4gICAgICAgICAgX21ldHJpY05hbWU6ICdBdmVyYWdlVGltZUFzQ3VzdG9tZXInLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2hhcnRUeXBlOiAncGllJyxcclxuICAgICAgICBhZ2dyZWdhdGU6ICdhdmcnLFxyXG4gICAgICAgIGZvcm1hdHRlcjogJ3RpbWUnLFxyXG4gICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgdGl0bGU6IHRoaXMuYWNjb3VudHNUZXh0LnRvdGFsLFxyXG4gICAgICAgIHF1ZXJ5TmFtZTogJ2V4ZWN1dGVNZXRyaWMnLFxyXG4gICAgICAgIHF1ZXJ5QXJnczoge1xyXG4gICAgICAgICAgX2ZpbHRlck5hbWU6ICdBY2NvdW50TWFuYWdlcicsXHJcbiAgICAgICAgICBfbWV0cmljTmFtZTogJ0NvdW50QWNjb3VudHMnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2hhcnRUeXBlOiAnYmFyJyxcclxuICAgICAgICBhZ2dyZWdhdGU6ICdzdW0nLFxyXG4gICAgICAgIGZvcm1hdHRlcjogJ2JpZ051bWJlcicsXHJcbiAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgIH1dLFxyXG4gICAgfSwge1xyXG4gICAgICByZXNvdXJjZUtpbmQ6ICdvcHBvcnR1bml0aWVzJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgdGl0bGU6IHRoaXMub3Bwb3J0dW5pdGllc1RleHQudG90YWwsXHJcbiAgICAgICAgcXVlcnlOYW1lOiAnZXhlY3V0ZU1ldHJpYycsXHJcbiAgICAgICAgcXVlcnlBcmdzOiB7XHJcbiAgICAgICAgICBfZmlsdGVyTmFtZTogJ0FjY291bnRNYW5hZ2VyJyxcclxuICAgICAgICAgIF9tZXRyaWNOYW1lOiAnQ291bnRPcHBvcnR1bml0aWVzJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoYXJ0VHlwZTogJ2JhcicsXHJcbiAgICAgICAgYWdncmVnYXRlOiAnc3VtJyxcclxuICAgICAgICBmb3JtYXR0ZXI6ICdiaWdOdW1iZXInLFxyXG4gICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgdGl0bGU6IHRoaXMub3Bwb3J0dW5pdGllc1RleHQucG90ZW50aWFsLFxyXG4gICAgICAgIHF1ZXJ5TmFtZTogJ2V4ZWN1dGVNZXRyaWMnLFxyXG4gICAgICAgIHF1ZXJ5QXJnczoge1xyXG4gICAgICAgICAgX2ZpbHRlck5hbWU6ICdBY2NvdW50TWFuYWdlcicsXHJcbiAgICAgICAgICBfbWV0cmljTmFtZTogJ1N1bVNhbGVzUG90ZW50aWFsJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoYXJ0VHlwZTogJ2JhcicsXHJcbiAgICAgICAgYWdncmVnYXRlOiAnc3VtJyxcclxuICAgICAgICBmb3JtYXR0ZXI6ICdiaWdOdW1iZXInLFxyXG4gICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgdGl0bGU6IHRoaXMub3Bwb3J0dW5pdGllc1RleHQubW9udGx5UG90ZW50aWFsLFxyXG4gICAgICAgIHF1ZXJ5TmFtZTogJ2V4ZWN1dGVNZXRyaWMnLFxyXG4gICAgICAgIHF1ZXJ5QXJnczoge1xyXG4gICAgICAgICAgX2ZpbHRlck5hbWU6ICdFc3RpbWF0ZWRDbG9zZScsXHJcbiAgICAgICAgICBfbWV0cmljTmFtZTogJ1N1bVNhbGVzUG90ZW50aWFsJyxcclxuICAgICAgICAgIGxhbmd1YWdlOiBBcHAuZ2V0Q3VycmVudExvY2FsZSgpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2hhcnRUeXBlOiAnbGluZScsXHJcbiAgICAgICAgYWdncmVnYXRlOiAnYXZnJyxcclxuICAgICAgICBmb3JtYXR0ZXI6ICdiaWdOdW1iZXInLFxyXG4gICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICB9XSxcclxuICAgIH0sIHtcclxuICAgICAgcmVzb3VyY2VLaW5kOiAndGlja2V0cycsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIHRpdGxlOiB0aGlzLnRpY2tldHNUZXh0LnRvdGFsLFxyXG4gICAgICAgIHF1ZXJ5TmFtZTogJ2V4ZWN1dGVNZXRyaWMnLFxyXG4gICAgICAgIHF1ZXJ5QXJnczoge1xyXG4gICAgICAgICAgX2ZpbHRlck5hbWU6ICdDYXRlZ29yeScsXHJcbiAgICAgICAgICBfbWV0cmljTmFtZTogJ1RpY2tldENvdW50JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoYXJ0VHlwZTogJ2JhcicsXHJcbiAgICAgICAgYWdncmVnYXRlOiAnc3VtJyxcclxuICAgICAgICBmb3JtYXR0ZXI6ICdiaWdOdW1iZXInLFxyXG4gICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgdGl0bGU6IHRoaXMudGlja2V0c1RleHQuYXZlcmFnZU9wZW4sXHJcbiAgICAgICAgcXVlcnlOYW1lOiAnZXhlY3V0ZU1ldHJpYycsXHJcbiAgICAgICAgcXVlcnlBcmdzOiB7XHJcbiAgICAgICAgICBfZmlsdGVyTmFtZTogJ0Fzc2lnbmVkVG8nLFxyXG4gICAgICAgICAgX21ldHJpY05hbWU6ICdPcGVuVGlja2V0QWdpbmdBdmVyYWdlJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoYXJ0VHlwZTogJ2JhcicsXHJcbiAgICAgICAgYWdncmVnYXRlOiAnYXZnJyxcclxuICAgICAgICBmb3JtYXR0ZXI6ICdmaXhlZExvY2FsZScsXHJcbiAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgIH1dLFxyXG4gICAgfSwge1xyXG4gICAgICByZXNvdXJjZUtpbmQ6ICdjb250YWN0cycsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIHRpdGxlOiB0aGlzLmNvbnRhY3RzVGV4dC50b3RhbCxcclxuICAgICAgICBxdWVyeU5hbWU6ICdleGVjdXRlTWV0cmljJyxcclxuICAgICAgICBxdWVyeUFyZ3M6IHtcclxuICAgICAgICAgIF9maWx0ZXJOYW1lOiAnQWNjb3VudE1hbmFnZXInLFxyXG4gICAgICAgICAgX21ldHJpY05hbWU6ICdDb3VudENvbnRhY3RzJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoYXJ0VHlwZTogJ2JhcicsXHJcbiAgICAgICAgYWdncmVnYXRlOiAnc3VtJyxcclxuICAgICAgICBmb3JtYXR0ZXI6ICdiaWdOdW1iZXInLFxyXG4gICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICB9XSxcclxuICAgIH0sIHtcclxuICAgICAgcmVzb3VyY2VLaW5kOiAnbGVhZHMnLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICB0aXRsZTogdGhpcy5sZWFkc1RleHQudG90YWwsXHJcbiAgICAgICAgcXVlcnlOYW1lOiAnZXhlY3V0ZU1ldHJpYycsXHJcbiAgICAgICAgcXVlcnlBcmdzOiB7XHJcbiAgICAgICAgICBfZmlsdGVyTmFtZTogJ093bmVyJyxcclxuICAgICAgICAgIF9tZXRyaWNOYW1lOiAnQ291bnRMZWFkcycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaGFydFR5cGU6ICdiYXInLFxyXG4gICAgICAgIGFnZ3JlZ2F0ZTogJ3N1bScsXHJcbiAgICAgICAgZm9ybWF0dGVyOiAnYmlnTnVtYmVyJyxcclxuICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgfV0sXHJcbiAgICB9LCB7XHJcbiAgICAgIHJlc291cmNlS2luZDogJ2hpc3RvcnknLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICB0aXRsZTogdGhpcy5oaXN0b3J5VGV4dC50b3RhbCxcclxuICAgICAgICBxdWVyeU5hbWU6ICdleGVjdXRlTWV0cmljJyxcclxuICAgICAgICBxdWVyeUFyZ3M6IHtcclxuICAgICAgICAgIF9maWx0ZXJOYW1lOiAnVHlwZScsXHJcbiAgICAgICAgICBfbWV0cmljTmFtZTogJ0NvdW50SGlzdG9yeScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaGFydFR5cGU6ICdiYXInLFxyXG4gICAgICAgIGFnZ3JlZ2F0ZTogJ3N1bScsXHJcbiAgICAgICAgZm9ybWF0dGVyOiAnYmlnTnVtYmVyJyxcclxuICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIHRpdGxlOiB0aGlzLmhpc3RvcnlUZXh0LmR1cmF0aW9uLFxyXG4gICAgICAgIHF1ZXJ5TmFtZTogJ2V4ZWN1dGVNZXRyaWMnLFxyXG4gICAgICAgIHF1ZXJ5QXJnczoge1xyXG4gICAgICAgICAgX2ZpbHRlck5hbWU6ICdUeXBlJyxcclxuICAgICAgICAgIF9tZXRyaWNOYW1lOiAnVG90YWxEdXJhdGlvbicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaGFydFR5cGU6ICdiYXInLFxyXG4gICAgICAgIGFnZ3JlZ2F0ZTogJ3N1bScsXHJcbiAgICAgICAgZm9ybWF0dGVyOiAnYmlnTnVtYmVyJyxcclxuICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgfV0sXHJcbiAgICB9LCB7XHJcbiAgICAgIHJlc291cmNlS2luZDogJ29mZmxpbmUnLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICB0aXRsZTogdGhpcy5vZmZsaW5lVGV4dC50b3RhbCxcclxuICAgICAgICBjaGFydFR5cGU6ICdiYXInLFxyXG4gICAgICAgIGFnZ3JlZ2F0ZTogJ3N1bScsXHJcbiAgICAgICAgZm9ybWF0dGVyOiAnYmlnTnVtYmVyJyxcclxuICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgfV0sXHJcbiAgICB9XTtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==