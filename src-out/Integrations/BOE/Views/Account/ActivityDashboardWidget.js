define('crm/Integrations/BOE/Views/Account/ActivityDashboardWidget', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'argos/Convert', 'argos/RelatedViewManager', '../../DashboardWidget', 'argos/I18n'], function (module, exports, _declare, _lang, _string, _Convert, _RelatedViewManager, _DashboardWidget, _I18n) {
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

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('activityDashboardWidget'); /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.Account.ActivityDashboardWidget', [_DashboardWidget2.default], {
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
      return 'Id eq \'' + this.parentEntry.$key + '\'';
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
          _activeFilter: 'AccountId eq "' + entry.$key + '" and ' + this.pastDays('CreateDate'),
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

      var queries = _string2.default.substitute('((' + property + ' between @${0}@ and @${1}@) or (' + property + ' between @${2}@ and @${3}@))', [_Convert2.default.toIsoStringFromDate(pastWeekStart.toDate()), _Convert2.default.toIsoStringFromDate(today.toDate()), pastWeekStart.format('YYYY-MM-DDT00:00:00[Z]'), today.format('YYYY-MM-DDT23:59:59[Z]')]);
      return queries;
    }
  });
  var rvm = new _RelatedViewManager2.default();
  rvm.registerType('account_activity_dashboard_widget', __class);
  _lang2.default.setObject('icboe.Views.Account.ActivityDashboardWidget', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0FjY291bnQvQWN0aXZpdHlEYXNoYm9hcmRXaWRnZXQuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwicmVjZW50VGV4dCIsIm15UGVuZGluZ1RleHQiLCJwZW5kaW5nVGV4dCIsImxhdGVUZXh0IiwidGl0bGVUZXh0IiwiY2F0ZWdvcnlUZXh0IiwiY29sb3IiLCJzZWxlY3RlZENvbG9yIiwiZGF5VmFsdWUiLCJvcGVuQ29kZSIsImNsb3NlZENvZGUiLCJyZXNvdXJjZUtpbmQiLCJxdWVyeVNlbGVjdCIsImdldFdoZXJlIiwicGFyZW50RW50cnkiLCIka2V5IiwiY3JlYXRlUmFuZ2VMYXlvdXQiLCJyYW5nZUxheW91dCIsInZhbHVlIiwiY3JlYXRlTWV0cmljTGF5b3V0IiwiZW50cnkiLCJtZXRyaWNMYXlvdXQiLCJuYXZUbyIsImZvcm1hdHRlciIsInRpdGxlIiwicXVlcnlBcmdzIiwiX2FjdGl2ZUZpbHRlciIsInBhc3REYXlzIiwiX2ZpbHRlck5hbWUiLCJfbWV0cmljTmFtZSIsInF1ZXJ5TmFtZSIsImFnZ3JlZ2F0ZSIsInZhbHVlVHlwZSIsInByb3BlcnR5Iiwibm93IiwibW9tZW50IiwicGFzdFdlZWtTdGFydCIsImNsb25lIiwic3VidHJhY3QiLCJzdGFydE9mIiwidG9kYXkiLCJlbmRPZiIsInF1ZXJpZXMiLCJzdWJzdGl0dXRlIiwidG9Jc29TdHJpbmdGcm9tRGF0ZSIsInRvRGF0ZSIsImZvcm1hdCIsInJ2bSIsInJlZ2lzdGVyVHlwZSIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxNQUFNQSxXQUFXLG9CQUFZLHlCQUFaLENBQWpCLEMsQ0F4QkE7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxNQUFNQyxVQUFVLHVCQUFRLDREQUFSLEVBQXNFLDJCQUF0RSxFQUF5RjtBQUN2RztBQUNBQyxnQkFBWUYsU0FBU0UsVUFGa0Y7QUFHdkdDLG1CQUFlSCxTQUFTRyxhQUgrRTtBQUl2R0MsaUJBQWFKLFNBQVNJLFdBSmlGO0FBS3ZHQyxjQUFVTCxTQUFTSyxRQUxvRjtBQU12R0MsZUFBV04sU0FBU00sU0FObUY7QUFPdkdDLGtCQUFjUCxTQUFTTyxZQVBnRjs7QUFTdkc7QUFDQUMsV0FBTyxTQVZnRztBQVd2R0MsbUJBQWUsU0FYd0Y7QUFZdkdDLGNBQVUsQ0FaNkY7O0FBY3ZHO0FBQ0FDLGNBQVUsTUFmNkY7QUFnQnZHQyxnQkFBWSxRQWhCMkY7O0FBa0J2R0Msa0JBQWMsVUFsQnlGO0FBbUJ2R0MsaUJBQWEsQ0FDWCxhQURXLENBbkIwRjtBQXNCdkdDLGNBQVUsU0FBU0EsUUFBVCxHQUFvQjtBQUM1QiwwQkFBaUIsS0FBS0MsV0FBTCxDQUFpQkMsSUFBbEM7QUFDRCxLQXhCc0c7O0FBMEJ2R0MsdUJBQW1CLFNBQVNBLGlCQUFULEdBQTZCO0FBQzlDLFVBQU1DLGNBQWMsQ0FBQztBQUNuQkMsZUFBTztBQURZLE9BQUQsRUFFakI7QUFDREEsZUFBTztBQUROLE9BRmlCLEVBSWpCO0FBQ0RBLGVBQU87QUFETixPQUppQixFQU1qQjtBQUNEQSxlQUFPO0FBRE4sT0FOaUIsQ0FBcEI7QUFTQSxhQUFPRCxXQUFQO0FBQ0QsS0FyQ3NHO0FBc0N2R0Usd0JBQW9CLFNBQVNBLGtCQUFULENBQTRCQyxLQUE1QixFQUFtQztBQUNyRCxVQUFNQyxlQUFlLENBQUM7QUFDcEJDLGVBQU8sMkJBRGE7QUFFcEJDLG1CQUFXLFdBRlM7QUFHcEJDLGVBQU8sS0FBS3hCLFVBSFE7QUFJcEJ5QixtQkFBVztBQUNUQyw0Q0FBZ0NOLE1BQU1MLElBQXRDLGNBQW1ELEtBQUtZLFFBQUwsQ0FBYyxZQUFkLENBRDFDO0FBRVRDLHVCQUFhLGNBRko7QUFHVEMsdUJBQWE7QUFISixTQUpTO0FBU3BCQyxtQkFBVyxlQVRTO0FBVXBCbkIsc0JBQWMsWUFWTTtBQVdwQm9CLG1CQUFXLEtBWFM7QUFZcEJDLG1CQUFXO0FBWlMsT0FBRCxDQUFyQjs7QUFlQSxhQUFPWCxZQUFQO0FBQ0QsS0F2RHNHO0FBd0R2R00sY0FBVSxTQUFTQSxRQUFULENBQWtCTSxRQUFsQixFQUE0QjtBQUNwQyxVQUFNQyxNQUFNQyxRQUFaOztBQUVBLFVBQU1DLGdCQUFnQkYsSUFBSUcsS0FBSixHQUFZQyxRQUFaLENBQXFCLEtBQUs5QixRQUExQixFQUFvQyxNQUFwQyxFQUE0QytCLE9BQTVDLENBQW9ELEtBQXBELENBQXRCO0FBQ0EsVUFBTUMsUUFBUU4sSUFBSUcsS0FBSixHQUFZSSxLQUFaLENBQWtCLEtBQWxCLENBQWQ7O0FBRUEsVUFBTUMsVUFBVSxpQkFBT0MsVUFBUCxRQUNUVixRQURTLHdDQUNvQ0EsUUFEcEMsbUNBRWQsQ0FDRSxrQkFBUVcsbUJBQVIsQ0FBNEJSLGNBQWNTLE1BQWQsRUFBNUIsQ0FERixFQUVFLGtCQUFRRCxtQkFBUixDQUE0QkosTUFBTUssTUFBTixFQUE1QixDQUZGLEVBR0VULGNBQWNVLE1BQWQsQ0FBcUIsd0JBQXJCLENBSEYsRUFJRU4sTUFBTU0sTUFBTixDQUFhLHdCQUFiLENBSkYsQ0FGYyxDQUFoQjtBQVNBLGFBQU9KLE9BQVA7QUFDRDtBQXhFc0csR0FBekYsQ0FBaEI7QUEwRUEsTUFBTUssTUFBTSxrQ0FBWjtBQUNBQSxNQUFJQyxZQUFKLENBQWlCLG1DQUFqQixFQUFzRGpELE9BQXREO0FBQ0EsaUJBQUtrRCxTQUFMLENBQWUsNkNBQWYsRUFBOERsRCxPQUE5RDtvQkFDZUEsTyIsImZpbGUiOiJBY3Rpdml0eURhc2hib2FyZFdpZGdldC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBzdHJpbmcgZnJvbSAnZG9qby9zdHJpbmcnO1xyXG5pbXBvcnQgY29udmVydCBmcm9tICdhcmdvcy9Db252ZXJ0JztcclxuaW1wb3J0IFJlbGF0ZWRWaWV3TWFuYWdlciBmcm9tICdhcmdvcy9SZWxhdGVkVmlld01hbmFnZXInO1xyXG5pbXBvcnQgRGFzaGJvYXJkV2lkZ2V0IGZyb20gJy4uLy4uL0Rhc2hib2FyZFdpZGdldCc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdhY3Rpdml0eURhc2hib2FyZFdpZGdldCcpO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLlZpZXdzLkFjY291bnQuQWN0aXZpdHlEYXNoYm9hcmRXaWRnZXQnLCBbRGFzaGJvYXJkV2lkZ2V0XSwge1xyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHJlY2VudFRleHQ6IHJlc291cmNlLnJlY2VudFRleHQsXHJcbiAgbXlQZW5kaW5nVGV4dDogcmVzb3VyY2UubXlQZW5kaW5nVGV4dCxcclxuICBwZW5kaW5nVGV4dDogcmVzb3VyY2UucGVuZGluZ1RleHQsXHJcbiAgbGF0ZVRleHQ6IHJlc291cmNlLmxhdGVUZXh0LFxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIGNhdGVnb3J5VGV4dDogcmVzb3VyY2UuY2F0ZWdvcnlUZXh0LFxyXG5cclxuICAvLyBPdmVycmlkZSB2YXJpYWJsZXMgZm9yIF9EYXNoYm9hcmRXaWRnZXRCYXNlXHJcbiAgY29sb3I6ICcjMzEzMjM2JyxcclxuICBzZWxlY3RlZENvbG9yOiAnIzUwNTM1YScsXHJcbiAgZGF5VmFsdWU6IDcsXHJcblxyXG4gIC8vIENvZGVzIHVzZWQgZm9yIHRoZSBzdGF0dXMgb2YgdGhlIGVudGl0eVxyXG4gIG9wZW5Db2RlOiAnT3BlbicsXHJcbiAgY2xvc2VkQ29kZTogJ0Nsb3NlZCcsXHJcblxyXG4gIHJlc291cmNlS2luZDogJ2FjY291bnRzJyxcclxuICBxdWVyeVNlbGVjdDogW1xyXG4gICAgJ0FjY291bnROYW1lJyxcclxuICBdLFxyXG4gIGdldFdoZXJlOiBmdW5jdGlvbiBnZXRXaGVyZSgpIHtcclxuICAgIHJldHVybiBgSWQgZXEgJyR7dGhpcy5wYXJlbnRFbnRyeS4ka2V5fSdgO1xyXG4gIH0sXHJcblxyXG4gIGNyZWF0ZVJhbmdlTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVSYW5nZUxheW91dCgpIHtcclxuICAgIGNvbnN0IHJhbmdlTGF5b3V0ID0gW3tcclxuICAgICAgdmFsdWU6IDcsXHJcbiAgICB9LCB7XHJcbiAgICAgIHZhbHVlOiAxNCxcclxuICAgIH0sIHtcclxuICAgICAgdmFsdWU6IDIxLFxyXG4gICAgfSwge1xyXG4gICAgICB2YWx1ZTogMzAsXHJcbiAgICB9XTtcclxuICAgIHJldHVybiByYW5nZUxheW91dDtcclxuICB9LFxyXG4gIGNyZWF0ZU1ldHJpY0xheW91dDogZnVuY3Rpb24gY3JlYXRlTWV0cmljTGF5b3V0KGVudHJ5KSB7XHJcbiAgICBjb25zdCBtZXRyaWNMYXlvdXQgPSBbe1xyXG4gICAgICBuYXZUbzogJ2FjY291bnRfbmV3cXVvdGVzX3JlbGF0ZWQnLFxyXG4gICAgICBmb3JtYXR0ZXI6ICdiaWdOdW1iZXInLFxyXG4gICAgICB0aXRsZTogdGhpcy5yZWNlbnRUZXh0LFxyXG4gICAgICBxdWVyeUFyZ3M6IHtcclxuICAgICAgICBfYWN0aXZlRmlsdGVyOiBgQWNjb3VudElkIGVxIFwiJHtlbnRyeS4ka2V5fVwiIGFuZCAke3RoaXMucGFzdERheXMoJ0NyZWF0ZURhdGUnKX1gLFxyXG4gICAgICAgIF9maWx0ZXJOYW1lOiAnQWN0aXZpdHlUeXBlJyxcclxuICAgICAgICBfbWV0cmljTmFtZTogJ0NvdW50QWN0aXZpdGllcycsXHJcbiAgICAgIH0sXHJcbiAgICAgIHF1ZXJ5TmFtZTogJ2V4ZWN1dGVNZXRyaWMnLFxyXG4gICAgICByZXNvdXJjZUtpbmQ6ICdhY3Rpdml0aWVzJyxcclxuICAgICAgYWdncmVnYXRlOiAnc3VtJyxcclxuICAgICAgdmFsdWVUeXBlOiAnY3JtL0FnZ3JlZ2F0ZScsXHJcbiAgICB9XTtcclxuXHJcbiAgICByZXR1cm4gbWV0cmljTGF5b3V0O1xyXG4gIH0sXHJcbiAgcGFzdERheXM6IGZ1bmN0aW9uIHBhc3REYXlzKHByb3BlcnR5KSB7XHJcbiAgICBjb25zdCBub3cgPSBtb21lbnQoKTtcclxuXHJcbiAgICBjb25zdCBwYXN0V2Vla1N0YXJ0ID0gbm93LmNsb25lKCkuc3VidHJhY3QodGhpcy5kYXlWYWx1ZSwgJ2RheXMnKS5zdGFydE9mKCdkYXknKTtcclxuICAgIGNvbnN0IHRvZGF5ID0gbm93LmNsb25lKCkuZW5kT2YoJ2RheScpO1xyXG5cclxuICAgIGNvbnN0IHF1ZXJpZXMgPSBzdHJpbmcuc3Vic3RpdHV0ZShcclxuICAgICAgYCgoJHtwcm9wZXJ0eX0gYmV0d2VlbiBAXFwkezB9QCBhbmQgQFxcJHsxfUApIG9yICgke3Byb3BlcnR5fSBiZXR3ZWVuIEBcXCR7Mn1AIGFuZCBAXFwkezN9QCkpYCxcclxuICAgICAgW1xyXG4gICAgICAgIGNvbnZlcnQudG9Jc29TdHJpbmdGcm9tRGF0ZShwYXN0V2Vla1N0YXJ0LnRvRGF0ZSgpKSxcclxuICAgICAgICBjb252ZXJ0LnRvSXNvU3RyaW5nRnJvbURhdGUodG9kYXkudG9EYXRlKCkpLFxyXG4gICAgICAgIHBhc3RXZWVrU3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREVDAwOjAwOjAwW1pdJyksXHJcbiAgICAgICAgdG9kYXkuZm9ybWF0KCdZWVlZLU1NLUREVDIzOjU5OjU5W1pdJyksXHJcbiAgICAgIF1cclxuICAgICk7XHJcbiAgICByZXR1cm4gcXVlcmllcztcclxuICB9LFxyXG59KTtcclxuY29uc3QgcnZtID0gbmV3IFJlbGF0ZWRWaWV3TWFuYWdlcigpO1xyXG5ydm0ucmVnaXN0ZXJUeXBlKCdhY2NvdW50X2FjdGl2aXR5X2Rhc2hib2FyZF93aWRnZXQnLCBfX2NsYXNzKTtcclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLlZpZXdzLkFjY291bnQuQWN0aXZpdHlEYXNoYm9hcmRXaWRnZXQnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19