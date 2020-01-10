define('crm/Views/Charts/_ChartMixin', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/_base/connect', 'dojo/dom-geometry', 'dojo/dom-attr', 'dojo/has', 'argos/_PullToRefreshMixin', 'argos/Utility', 'argos/I18n'], function (module, exports, _declare, _lang, _connect, _domGeometry, _domAttr, _has, _PullToRefreshMixin2, _Utility, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _connect2 = _interopRequireDefault(_connect);

  var _domGeometry2 = _interopRequireDefault(_domGeometry);

  var _domAttr2 = _interopRequireDefault(_domAttr);

  var _has2 = _interopRequireDefault(_has);

  var _PullToRefreshMixin3 = _interopRequireDefault(_PullToRefreshMixin2);

  var _Utility2 = _interopRequireDefault(_Utility);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('chartMixin'); /* Copyright 2017 Infor
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

  /**
   * @module crm/Views/Charts/_ChartMixin
   */


  _lang2.default.setObject('Chart.defaults.global', {
    // Boolean - Whether to animate the chart
    animation: false,

    // Number - Number of animation steps
    animationSteps: 60,

    // String - Animation easing effect
    animationEasing: 'easeOutQuart',

    // Boolean - If we should show the scale at all
    showScale: true,

    // Boolean - If we want to override with a hard coded scale
    scaleOverride: false,

    // ** Required if scaleOverride is true **
    // Number - The number of steps in a hard coded scale
    scaleSteps: null,
    // Number - The value jump in the hard coded scale
    scaleStepWidth: null,
    // Number - The scale starting value
    scaleStartValue: null,

    // String - Colour of the scale line
    scaleLineColor: 'rgba(0,0,0,.1)',

    // Number - Pixel width of the scale line
    scaleLineWidth: 1,

    // Boolean - Whether to show labels on the scale
    scaleShowLabels: true,

    // Interpolated JS string - can access value
    scaleLabel: '<%=value%>',

    // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
    scaleIntegersOnly: true,

    // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero: false,

    // String - Scale label font declaration for the scale label
    scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Scale label font size in pixels
    scaleFontSize: 12,

    // String - Scale label font weight style
    scaleFontStyle: 'normal',

    // String - Scale label font colour
    scaleFontColor: '#666',

    // Boolean - whether or not the chart should be responsive and resize when the browser does.
    responsive: false,

    // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
    maintainAspectRatio: true,

    // Boolean - Determines whether to draw tooltips on the canvas or not
    showTooltips: true,

    // Array - Array of string names to attach tooltip events
    tooltipEvents: ['touchstart', 'click'],

    // String - Tooltip background colour
    tooltipFillColor: 'rgba(0,0,0,0.8)',

    // String - Tooltip label font declaration for the scale label
    tooltipFontFamily: "'Helvetica', 'Arial', Sans-serif",

    // Number - Tooltip label font size in pixels
    tooltipFontSize: 14,

    // String - Tooltip font weight style
    tooltipFontStyle: 'normal',

    // String - Tooltip label font colour
    tooltipFontColor: '#fff',

    // String - Tooltip title font declaration for the scale label
    tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Tooltip title font size in pixels
    tooltipTitleFontSize: 14,

    // String - Tooltip title font weight style
    tooltipTitleFontStyle: 'bold',

    // String - Tooltip title font colour
    tooltipTitleFontColor: '#fff',

    // Number - pixel width of padding around tooltip text
    tooltipYPadding: 6,

    // Number - pixel width of padding around tooltip text
    tooltipXPadding: 6,

    // Number - Size of the caret on the tooltip
    tooltipCaretSize: 8,

    // Number - Pixel radius of the tooltip border
    tooltipCornerRadius: 6,

    // Number - Pixel offset from point x to tooltip edge
    tooltipXOffset: 10,

    // tooltipTemplate can be a function as well (not in the docs, see Chart.Core.js in their repo)
    tooltipTemplate: function tooltipTemplate(valuesObject) {
      // Use the formatter on the chart view, otherwise default to label: value
      var view = App.getPrimaryActiveView();
      var results = void 0;
      if (view && view.formatter) {
        results = view.formatter(valuesObject.value);
      } else {
        results = valuesObject.value;
      }

      return [valuesObject.label, results].join(': ');
    },
    // String - Template string for single tooltips
    multiTooltipTemplate: '<%= value %>',

    // Function - Will fire on animation progression.
    onAnimationProgress: function onAnimationProgress() {},

    // Function - Will fire on animation completion.
    onAnimationComplete: function onAnimationComplete() {}
  });

  /**
   * @class
   * @alias module:crm/Views/Charts/_ChartMixin
   * @mixin
   * @mixes module:argos/_PullToRefreshMixin
   *
   * @classdesc Base mixin for creating chart views.
   *
   */
  var __class = (0, _declare2.default)('crm.Views.Charts._ChartMixin', [_PullToRefreshMixin3.default], /** @lends module:crm/Views/Charts/_ChartMixin.prototype */{
    _orientationHandle: null,
    _menuOpenHandle: null,
    _menuCloseHandle: null,
    _feedData: null,

    /**
     * @property {Number} RENDER_DELAY
     * Number The re-render delay in milliseconds when the user changes device orientation.
     */
    RENDER_DELAY: (0, _has2.default)('ios') < 8 ? 500 : 16, // Work around IOS7 orientation change issues

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
    widgetTemplate: new Simplate(['<div id="{%= $.id %}" data-title="{%= $.titleText %}" class="list list-hide-search {%= $.cls %}">', '<div class="overthrow scroller" data-dojo-attach-point="scrollerNode">', '<div class="legend" data-dojo-attach-point="legendNode" data-dojo-attach-event="click: onLegendClick"></div>', '<canvas class="chart-content" data-dojo-attach-point="contentNode"></canvas>', '</div>', '</div>']),

    postCreate: function postCreate() {
      this.initPullToRefresh(this.scrollerNode);
    },
    onTransitionTo: function onTransitionTo() {
      var _this = this;

      // Render fn is debounced to prevent too many calls as a user resizes, or
      // if it fires multiple times (onresize fires on desktop browsers with /app/setOrientation)
      // Some browsers do not fire window onResize for orientation changes.
      var _renderFn = _Utility2.default.debounce(function () {
        if (_this._feedData) {
          _this.createChart(_this._feedData);
        }
      }, this.RENDER_DELAY);

      this._orientationHandle = _connect2.default.subscribe('/app/setOrientation', this, _renderFn);
      this._menuOpenHandle = _connect2.default.subscribe('/app/menuopen', this, _renderFn);
      this._menuCloseHandle = _connect2.default.subscribe('/app/menuclose', this, _renderFn);
      $(window).on('resize', _renderFn);
    },
    onTransitionAway: function onTransitionAway() {
      _connect2.default.unsubscribe(this._orientationHandle);
      _connect2.default.unsubscribe(this._menuOpenHandle);
      _connect2.default.unsubscribe(this._menuCloseHandle);
      this._feedData = null;
      this.parent = null;

      if (this.chart && this.chart.destroy) {
        this.chart.destroy();
      }
    },
    _setCanvasWidth: function _setCanvasWidth() {
      var box = _domGeometry2.default.getMarginBox(this.domNode);
      if (this.contentNode) {
        this.contentNode.width = box.w;
      }
    },
    _drawLoading: function _drawLoading() {
      var node = this.contentNode;
      var globalConfig = window.Chart.defaults.global;
      var context = node && node.getContext && node.getContext('2d');

      if (!context) {
        return;
      }

      context.clearRect(0, 0, node.width, node.height);

      var text = resource.loadingText;

      context.fillStyle = this.loadingFont;
      context.font = globalConfig.tooltipFontSize + 'px ' + globalConfig.tooltipFontFamily;

      // Center the text
      var offset = Math.floor(context.measureText(text).width / 2);
      var x = Math.floor(node.width / 2) - offset;
      var y = 20; // padding
      context.fillText(text, x, y, node.width);
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
      var app = this.app || window.App;
      app.setPrimaryTitle([this.title, this.getSearchExpression()].join(': '));
    },

    /**
     * Handles click events for the legend node. Handles opening the tooltips on the chart
     * when the item in the legend is clicked. The current legend format is as follows:
     * @since 3.3
     *
     *    @example
     *    `<div class="legend" data-dojo-attach-point="legendNode">
     *        <ul class="doughnut-legend">
     *            <li data-segment="0"><span style="background-color: someColor"></span>
     *                Tooltip Label
     *            </li>
     *        </ul>
     *    </div>`
     */
    onLegendClick: function onLegendClick(evt) {
      if (!evt || !evt.srcElement || evt.srcElement === this.legendNode || !this.chart) {
        return;
      }

      var src = evt.srcElement.tagName === 'SPAN' ? evt.srcElement.parentElement : evt.srcElement;
      var segment = parseInt(src.dataset.segment, 10);
      if (segment >= 0 && this.chart.showTooltip && this.chart.segments) {
        this.chart.showTooltip(this.chart.segments.slice(segment, segment + 1), false /* re-draw flag */);
      }
    },

    /**
     * Render a legend from the chart into the legendNode attach point.
     * @since 3.3
     */
    showLegend: function showLegend() {
      if (!this.chart || !this.chart.generateLegend || !this.legendNode) {
        return;
      }

      var html = this.chart.generateLegend();
      _domAttr2.default.set(this.legendNode, {
        innerHTML: html
      });
    },

    /**
     * @deprecated 3.3
     * Charts in 3.3 no longer use the search expression node.
     */
    getSearchExpressionHeight: function getSearchExpressionHeight() {
      var box = _domGeometry2.default.getMarginBox(this.searchExpressionNode);
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
      var store = this.parent && this.parent.store;
      return store;
    },

    /**
     * Overrides _ListBase requestData to re-render the chart on pull to refresh.
     * @since 3.3
     */
    requestData: function requestData() {
      var _this2 = this;

      var store = this.get('store');
      if (this.chart && this.chart.destroy) {
        this.chart.destroy();
      }

      this._setCanvasWidth();
      this._drawLoading();

      if (store) {
        store.query(null, {
          start: 0,
          count: this.PAGE_SIZE
        }).then(function (data) {
          _this2.createChart(data);
        }, function (e) {
          console.error(e); // eslint-disable-line
        });
      }
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});