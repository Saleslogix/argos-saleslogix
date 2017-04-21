import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import connect from 'dojo/_base/connect';
import has from 'dojo/has';
import string from 'dojo/string';
import getResource from 'argos/I18n';

const resource = getResource('chartMixin');

/**
 * @class crm.Views.Charts._ChartMixin
 *
 *
 * Base mixin for creating chart views.
 *
 */

const __class = declare('crm.Views.Charts._ChartMixin', null, {
  _handle: null,
  _feedData: null,
  searchText: resource.searchText,

  /**
   * @property {Number} RENDER_DELAY
   * Number The re-render delay in milliseconds when the user changes device orientation.
   */
  RENDER_DELAY: has('ios') < 8 ? 500 : 1, // Work around IOS7 orientation change issues

  /**
   * @property {Object} parent
   * Reference to the metric widget that opened this view.
   */
  parent: null,

  formatter: function formatter(val) {
    return val;
  },

  PAGE_SIZE: 100,

  /**
   * Overrides View widgetTemplate
   */
  widgetTemplate: new Simplate([
    '<div id="{%= $.id %}" title="{%= $.titleText %}" class="list list-hide-search {%= $.cls %}">',
    '<div class="chart-container" data-dojo-attach-point="contentNode"></div>',
    '</div>',
  ]),
  onTransitionTo: function onTransitionTo() {
    this._handle = connect.subscribe('/app/setOrientation', this, function orientationChange() {
      setTimeout(() => {
        if (this._feedData) {
          this.createChart(this._feedData);
        }
      }, this.RENDER_DELAY);
    });
  },
  onTransitionAway: function onTransitionAway() {
    connect.unsubscribe(this._handle);
    this._feedData = null;
    this.parent = null;
    this.destroyChart();
  },
  createChart: function createChart(feedData) {
    this._feedData = feedData;
    this.destroyChart();
    const container = $(App.getViewContainerNode());
    const width = container.width();
    const height = container.height();
    $(this.domNode)
      .width(width)
      .height(height);
    $(this.contentNode)
      .width(width)
      .height(height);
    this.showSearchExpression();
  },
  destroyChart: function destroyChart() {
    if (this.chart) {
      $(this.contentNode).empty();
      this.chart = null;
    }
  },
  getTag: function getTag() {
    return this.options && this.options.returnTo;
  },

  getSearchExpression: function getSearchExpression() {
    const searchExpression = this.options && this.options.currentSearchExpression;

    if (searchExpression) {
      return string.substitute(this.searchText, {
        title: this.title,
        searchTerm: searchExpression,
      });
    }

    return this.title;
  },

  showSearchExpression: function showSearchExpression() {
    const app = this.app || window.App;
    app.setPrimaryTitle(this.getSearchExpression());
  },

  refresh: function refresh() {
    this.requestData();
  },
  _getStoreAttr: function _getStoreAttr() {
    return this.createStore();
  },
  /**
   * Return a store that is consumed by requestData.
   * @since 3.3
   */
  createStore: function createStore() {
    const store = this.parent && this.parent.store;
    return store;
  },

  /**
   * Overrides _ListBase requestData to re-render the chart on pull to refresh.
   * @since 3.3
   */
  requestData: function requestData() {
    const store = this.get('store');
    if (this.chart && this.chart.destroy) {
      this.chart.destroy();
    }

    if (store) {
      store.query(null, {
        start: 0,
        count: this.PAGE_SIZE,
      }).then((data) => {
        this.createChart(data);
      }, (e) => {
        console.error(e); // eslint-disable-line
      });
    }
  },
});

lang.setObject('Mobile.SalesLogix.Views.Charts._ChartMixin', __class);
export default __class;
