import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import connect from 'dojo/_base/connect';
import domGeo from 'dojo/dom-geometry';
import domAttr from 'dojo/dom-attr';
import has from 'dojo/has';
import _PullToRefreshMixin from 'argos/_PullToRefreshMixin';
import getResource from 'argos/I18n';

const resource = getResource('chartMixin');

/**
 * @class crm.Views.Charts._ChartMixin
 *
 * @mixins argos._PullToRefreshMixin
 * @requires argos._PullToRefreshMixin
 *
 * Base mixin for creating chart views.
 *
 */

const __class = declare('crm.Views.Charts._ChartMixin', [_PullToRefreshMixin], {
  _handle: null,
  _feedData: null,

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
   * @property {String}
   * The loading text font style
   */
  loadingFont: '#000',

  /**
   * @property {String}
   * Loading message
   */
  loadingText: 'loading...',

  /**
   * Overrides View widgetTemplate
   */
  widgetTemplate: new Simplate([
    '<div id="{%= $.id %}" title="{%= $.titleText %}" class="list list-hide-search {%= $.cls %}">',
    '<div class="overthrow scroller" data-dojo-attach-point="scrollerNode">',
    '<div class="chart-content" data-dojo-attach-point="contentNode"></div>',
    '</div>',
    '</div>',
  ]),

  postCreate: function postCreate() {
    this.initPullToRefresh(this.scrollerNode);
  },
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

    if (this.chart && this.chart.destroy) {
      this.chart.destroy();
    }
  },
  _setCanvasWidth: function _setCanvasWidth() {
    const box = domGeo.getMarginBox(this.domNode);
    if (this.contentNode) {
      this.contentNode.width = box.w;
    }
  },
  createChart: function createChart(feedData) {
    this._feedData = feedData;
  },
  getTag: function getTag() {
    return this.options && this.options.returnTo;
  },

  getSearchExpression: function getSearchExpression() {
    return this.options && this.options.currentSearchExpression;
  },

  showSearchExpression: function showSearchExpression() {
    const app = this.app || window.App;
    app.setPrimaryTitle([this.title, this.getSearchExpression()].join(': '));
  },

  /**
   * @deprecated 3.3
   * Charts in 3.3 no longer use the search expression node.
   */
  getSearchExpressionHeight: function getSearchExpressionHeight() {
    const box = domGeo.getMarginBox(this.searchExpressionNode);
    return box.h;
  },

  onPullToRefreshComplete: function onPullToRefreshComplete() {
    this.requestData();
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

    this._setCanvasWidth();

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
