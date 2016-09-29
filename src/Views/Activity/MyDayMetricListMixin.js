import declare from 'dojo/_base/declare';
import array from 'dojo/_base/array';
import lang from 'dojo/_base/lang';
import MyDayMetricWidget from './MyDayMetricWidget';
import _MetricListMixin from '../_MetricListMixin';
/**
 * @class crm.Views.Activity.MyDayMetricListMixin
 *
 *
 * @requires crm.Views.MetricWidget
 * @extends crm.Views._MetricListMixin
 *
 */
const __class = declare('crm.Views.Activity.MyDayMetricListMixin', [_MetricListMixin], {

  metricWidgetCtor: MyDayMetricWidget,
  _applyStateToWidgetOptions: function _applyStateToWidgetOptions(widgetOptions) {
    const options = widgetOptions;
    options.parent = this;
    return options;
  },
  createMetricWidgetsLayout: function createMetricWidgetsLayout() {
    let metrics = [];
    let filtered = [];

    metrics = App.getMetricsByResourceKind('userActivities');

    if (metrics.length > 0) {
      filtered = array.filter(metrics, (item) => {
        return item.enabled;
      });
    }

    return lang.clone(filtered);
  },
});
export default __class;
