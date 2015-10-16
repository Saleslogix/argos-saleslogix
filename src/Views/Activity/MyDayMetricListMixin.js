import declare from 'dojo/_base/declare';
import array from 'dojo/_base/array';
import lang from 'dojo/_base/lang';
import MyDayMetricWidget from './MyDayMetricWidget';
import _MetricListMixin from '../_MetricListMixin';
/**
 * @class crm.Views.Activity.MyDayMetricListMixin
 *
 * Mixin for adding KPI widgets to list views.
 *
 * @since 3.0
 *
 * @requires crm.Views.MetricWidget
 * @ crm.Views._MetricListMixin
 *
 */
const __class = declare('crm.Views.Activity.MyDayMetricListMixin', _MetricListMixin, {

  metricWidgetCtor: MyDayMetricWidget,

  createMetricWidgetsLayout: function createMetricWidgetsLayout() {
    let metrics = [];
    let filtered = [];

    metrics = App.getMetricsByResourceKind('userActivities');

    if (metrics.length > 0) {
      filtered = array.filter(metrics, function enableFilteredItems(item) {
        return item.enabled;
      });
    }

    return lang.clone(filtered);
  },
});
export default __class;
