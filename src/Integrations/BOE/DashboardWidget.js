/*
* See copyright file.
*/
import declare from 'dojo/_base/declare';
import domConstruct from 'dojo/dom-construct';
import array from 'dojo/_base/array';
import lang from 'dojo/_base/lang';
import RelatedViewManager from 'argos/RelatedViewManager';
import MetricWidget from '../../Views/MetricWidget';
import DateRangeWidget from './DateRangeWidget';
import _DashboardWidgetBase from './_DashboardWidgetBase';

/**
 * @class crm.Views._DashboardWidgetBase
 *
 *
 * @extends argos._RelatedViewWidgetBase
 *
 */
const __class = declare('crm.Integrations.BOE.DashboardWidget', [_DashboardWidgetBase], {
  buildView: function buildView(entry) {
    this.destroyWidgets();
    this.metricWidgets = [];
    this.rangeWidgets = [];
    this.createMetricWidgets(entry);
    this.createRangeWidgets();
    this.getQueryData();
  },
  createMetricWidgets: function createMetricWidgets(entry) {
      // Create metrics widgets and place them in the metricsNode
    const frag = document.createDocumentFragment();
    const widgetOptions = this.createMetricLayout(entry) || [];
    array.forEach(widgetOptions, function handleOptions(options) {
      if (this.hasValidOptions(options)) {
          // Check if widget has a navigate to view option
        if (options.navTo) {
          const obj = this.values.filter(this.checkForValue, options)[0];
          options.navToReportView = this.navToReportView;
          options.chartType = 'noChart';
          if (!(obj.queryIndex instanceof Array)) {
              // Get the active filter from the query args array and pass it as an option to the widget to be consumed by the navToReportView function
            options.activeFilter = this.queryArgs[obj.queryIndex][1]._activeFilter;
          }
        }
        const widget = new MetricWidget(options);
        const itemNode = domConstruct.toDom(this.metricItemTemplate.apply(options, this));
        frag.appendChild(itemNode);
        widget.placeAt(itemNode, 'last');
        this.registerWidget(widget);
      }
    }, this);
    if (frag.childNodes.length > 0) {
      domConstruct.place(frag, this.metricsNode, 'last');
    }
  },
  createRangeWidgets: function createRangeWidgets() {
    const rangeFrag = document.createDocumentFragment();
      // Check if range widgets are desired, if so create and place in rangeNode
    if (this.createRangeLayout) {
      const rangeOptions = this.createRangeLayout() || [];
      array.forEach(rangeOptions, function handleRangeOptions(options) {
        options.changeRange = this.changeRange;
        options.parent = this;
        const widget = new DateRangeWidget(options);
        const itemNode = domConstruct.toDom(this.rangeItemTemplate.apply(options, this));
        if (options.value === this.dayValue) {
          this.selectedRange = itemNode;
        }
        rangeFrag.appendChild(itemNode);
        widget.placeAt(itemNode, 'last');
      }, this);
    }
    if (rangeFrag.childNodes.length > 0) {
      if (!this.selectedRange) {
        this.selectedRange = rangeFrag.childNodes[0];
      }
      this.selectedRange.style['background-color'] = this.getSelectedColor();
      domConstruct.place(rangeFrag, this.rangeNode, 'last');
    }
  },
  rebuildWidgets: function rebuildWidgets(entry) {
      // this.destroyWidgets();
    domConstruct.empty(this.metricsNode);
    this.metricWidgets = [];
    this.rebuildValues();
    this.createMetricWidgets(entry);
    this.getQueryData();
  },
});

const rvm = new RelatedViewManager();
rvm.registerType('dashboard_widget', __class);
lang.setObject('crm.Views.DashboardWidget', __class);
export default __class;
