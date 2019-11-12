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

  var resource = (0, _I18n2.default)('chartMixin');

  /**
   * @class crm.Views.Charts._ChartMixin
   * @mixins argos._PullToRefreshMixin
   *
   * @classdesc Base mixin for creating chart views.
   *
   */
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

  var __class = (0, _declare2.default)('crm.Views.Charts._ChartMixin', [_PullToRefreshMixin3.default], /** @lends crm.Views.Charts._ChartMixin# */{
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9DaGFydHMvX0NoYXJ0TWl4aW4uanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJzZXRPYmplY3QiLCJhbmltYXRpb24iLCJhbmltYXRpb25TdGVwcyIsImFuaW1hdGlvbkVhc2luZyIsInNob3dTY2FsZSIsInNjYWxlT3ZlcnJpZGUiLCJzY2FsZVN0ZXBzIiwic2NhbGVTdGVwV2lkdGgiLCJzY2FsZVN0YXJ0VmFsdWUiLCJzY2FsZUxpbmVDb2xvciIsInNjYWxlTGluZVdpZHRoIiwic2NhbGVTaG93TGFiZWxzIiwic2NhbGVMYWJlbCIsInNjYWxlSW50ZWdlcnNPbmx5Iiwic2NhbGVCZWdpbkF0WmVybyIsInNjYWxlRm9udEZhbWlseSIsInNjYWxlRm9udFNpemUiLCJzY2FsZUZvbnRTdHlsZSIsInNjYWxlRm9udENvbG9yIiwicmVzcG9uc2l2ZSIsIm1haW50YWluQXNwZWN0UmF0aW8iLCJzaG93VG9vbHRpcHMiLCJ0b29sdGlwRXZlbnRzIiwidG9vbHRpcEZpbGxDb2xvciIsInRvb2x0aXBGb250RmFtaWx5IiwidG9vbHRpcEZvbnRTaXplIiwidG9vbHRpcEZvbnRTdHlsZSIsInRvb2x0aXBGb250Q29sb3IiLCJ0b29sdGlwVGl0bGVGb250RmFtaWx5IiwidG9vbHRpcFRpdGxlRm9udFNpemUiLCJ0b29sdGlwVGl0bGVGb250U3R5bGUiLCJ0b29sdGlwVGl0bGVGb250Q29sb3IiLCJ0b29sdGlwWVBhZGRpbmciLCJ0b29sdGlwWFBhZGRpbmciLCJ0b29sdGlwQ2FyZXRTaXplIiwidG9vbHRpcENvcm5lclJhZGl1cyIsInRvb2x0aXBYT2Zmc2V0IiwidG9vbHRpcFRlbXBsYXRlIiwidmFsdWVzT2JqZWN0IiwidmlldyIsIkFwcCIsImdldFByaW1hcnlBY3RpdmVWaWV3IiwicmVzdWx0cyIsImZvcm1hdHRlciIsInZhbHVlIiwibGFiZWwiLCJqb2luIiwibXVsdGlUb29sdGlwVGVtcGxhdGUiLCJvbkFuaW1hdGlvblByb2dyZXNzIiwib25BbmltYXRpb25Db21wbGV0ZSIsIl9fY2xhc3MiLCJfb3JpZW50YXRpb25IYW5kbGUiLCJfbWVudU9wZW5IYW5kbGUiLCJfbWVudUNsb3NlSGFuZGxlIiwiX2ZlZWREYXRhIiwiUkVOREVSX0RFTEFZIiwicGFyZW50IiwidmFsIiwiUEFHRV9TSVpFIiwibG9hZGluZ0ZvbnQiLCJsb2FkaW5nVGV4dCIsIndpZGdldFRlbXBsYXRlIiwiU2ltcGxhdGUiLCJwb3N0Q3JlYXRlIiwiaW5pdFB1bGxUb1JlZnJlc2giLCJzY3JvbGxlck5vZGUiLCJvblRyYW5zaXRpb25UbyIsIl9yZW5kZXJGbiIsImRlYm91bmNlIiwiY3JlYXRlQ2hhcnQiLCJzdWJzY3JpYmUiLCIkIiwid2luZG93Iiwib24iLCJvblRyYW5zaXRpb25Bd2F5IiwidW5zdWJzY3JpYmUiLCJjaGFydCIsImRlc3Ryb3kiLCJfc2V0Q2FudmFzV2lkdGgiLCJib3giLCJnZXRNYXJnaW5Cb3giLCJkb21Ob2RlIiwiY29udGVudE5vZGUiLCJ3aWR0aCIsInciLCJfZHJhd0xvYWRpbmciLCJub2RlIiwiZ2xvYmFsQ29uZmlnIiwiQ2hhcnQiLCJkZWZhdWx0cyIsImdsb2JhbCIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwiY2xlYXJSZWN0IiwiaGVpZ2h0IiwidGV4dCIsImZpbGxTdHlsZSIsImZvbnQiLCJvZmZzZXQiLCJNYXRoIiwiZmxvb3IiLCJtZWFzdXJlVGV4dCIsIngiLCJ5IiwiZmlsbFRleHQiLCJmZWVkRGF0YSIsImdldFRhZyIsIm9wdGlvbnMiLCJyZXR1cm5UbyIsImdldFNlYXJjaEV4cHJlc3Npb24iLCJjdXJyZW50U2VhcmNoRXhwcmVzc2lvbiIsInNob3dTZWFyY2hFeHByZXNzaW9uIiwiYXBwIiwic2V0UHJpbWFyeVRpdGxlIiwidGl0bGUiLCJvbkxlZ2VuZENsaWNrIiwiZXZ0Iiwic3JjRWxlbWVudCIsImxlZ2VuZE5vZGUiLCJzcmMiLCJ0YWdOYW1lIiwicGFyZW50RWxlbWVudCIsInNlZ21lbnQiLCJwYXJzZUludCIsImRhdGFzZXQiLCJzaG93VG9vbHRpcCIsInNlZ21lbnRzIiwic2xpY2UiLCJzaG93TGVnZW5kIiwiZ2VuZXJhdGVMZWdlbmQiLCJodG1sIiwic2V0IiwiaW5uZXJIVE1MIiwiZ2V0U2VhcmNoRXhwcmVzc2lvbkhlaWdodCIsInNlYXJjaEV4cHJlc3Npb25Ob2RlIiwiaCIsIm9uUHVsbFRvUmVmcmVzaENvbXBsZXRlIiwicmVxdWVzdERhdGEiLCJyZWZyZXNoIiwiX2dldFN0b3JlQXR0ciIsImNyZWF0ZVN0b3JlIiwic3RvcmUiLCJnZXQiLCJxdWVyeSIsInN0YXJ0IiwiY291bnQiLCJ0aGVuIiwiZGF0YSIsImUiLCJjb25zb2xlIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLE1BQU1BLFdBQVcsb0JBQVksWUFBWixDQUFqQjs7QUFFQTs7Ozs7OztBQTNCQTs7Ozs7Ozs7Ozs7Ozs7O0FBa0NBLGlCQUFLQyxTQUFMLENBQWUsdUJBQWYsRUFBd0M7QUFDdEM7QUFDQUMsZUFBVyxLQUYyQjs7QUFJdEM7QUFDQUMsb0JBQWdCLEVBTHNCOztBQU90QztBQUNBQyxxQkFBaUIsY0FScUI7O0FBVXRDO0FBQ0FDLGVBQVcsSUFYMkI7O0FBYXRDO0FBQ0FDLG1CQUFlLEtBZHVCOztBQWdCdEM7QUFDQTtBQUNBQyxnQkFBWSxJQWxCMEI7QUFtQnRDO0FBQ0FDLG9CQUFnQixJQXBCc0I7QUFxQnRDO0FBQ0FDLHFCQUFpQixJQXRCcUI7O0FBd0J0QztBQUNBQyxvQkFBZ0IsZ0JBekJzQjs7QUEyQnRDO0FBQ0FDLG9CQUFnQixDQTVCc0I7O0FBOEJ0QztBQUNBQyxxQkFBaUIsSUEvQnFCOztBQWlDdEM7QUFDQUMsZ0JBQVksWUFsQzBCOztBQW9DdEM7QUFDQUMsdUJBQW1CLElBckNtQjs7QUF1Q3RDO0FBQ0FDLHNCQUFrQixLQXhDb0I7O0FBMEN0QztBQUNBQyxxQkFBaUIsb0RBM0NxQjs7QUE2Q3RDO0FBQ0FDLG1CQUFlLEVBOUN1Qjs7QUFnRHRDO0FBQ0FDLG9C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R3dGLElBSEgsQ0FHUSxVQUFDQyxJQUFELEVBQVU7QUFDaEIsaUJBQUs5RSxXQUFMLENBQWlCOEUsSUFBakI7QUFDRCxTQUxELEVBS0csVUFBQ0MsQ0FBRCxFQUFPO0FBQ1JDLGtCQUFRQyxLQUFSLENBQWNGLENBQWQsRUFEUSxDQUNVO0FBQ25CLFNBUEQ7QUFRRDtBQUNGO0FBcE53SCxHQUEzRyxDQUFoQjs7b0JBdU5lbEcsTyIsImZpbGUiOiJfQ2hhcnRNaXhpbi5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBjb25uZWN0IGZyb20gJ2Rvam8vX2Jhc2UvY29ubmVjdCc7XHJcbmltcG9ydCBkb21HZW8gZnJvbSAnZG9qby9kb20tZ2VvbWV0cnknO1xyXG5pbXBvcnQgZG9tQXR0ciBmcm9tICdkb2pvL2RvbS1hdHRyJztcclxuaW1wb3J0IGhhcyBmcm9tICdkb2pvL2hhcyc7XHJcbmltcG9ydCBfUHVsbFRvUmVmcmVzaE1peGluIGZyb20gJ2FyZ29zL19QdWxsVG9SZWZyZXNoTWl4aW4nO1xyXG5pbXBvcnQgVXRpbGl0eSBmcm9tICdhcmdvcy9VdGlsaXR5JztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnY2hhcnRNaXhpbicpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuQ2hhcnRzLl9DaGFydE1peGluXHJcbiAqIEBtaXhpbnMgYXJnb3MuX1B1bGxUb1JlZnJlc2hNaXhpblxyXG4gKlxyXG4gKiBAY2xhc3NkZXNjIEJhc2UgbWl4aW4gZm9yIGNyZWF0aW5nIGNoYXJ0IHZpZXdzLlxyXG4gKlxyXG4gKi9cclxubGFuZy5zZXRPYmplY3QoJ0NoYXJ0LmRlZmF1bHRzLmdsb2JhbCcsIHtcclxuICAvLyBCb29sZWFuIC0gV2hldGhlciB0byBhbmltYXRlIHRoZSBjaGFydFxyXG4gIGFuaW1hdGlvbjogZmFsc2UsXHJcblxyXG4gIC8vIE51bWJlciAtIE51bWJlciBvZiBhbmltYXRpb24gc3RlcHNcclxuICBhbmltYXRpb25TdGVwczogNjAsXHJcblxyXG4gIC8vIFN0cmluZyAtIEFuaW1hdGlvbiBlYXNpbmcgZWZmZWN0XHJcbiAgYW5pbWF0aW9uRWFzaW5nOiAnZWFzZU91dFF1YXJ0JyxcclxuXHJcbiAgLy8gQm9vbGVhbiAtIElmIHdlIHNob3VsZCBzaG93IHRoZSBzY2FsZSBhdCBhbGxcclxuICBzaG93U2NhbGU6IHRydWUsXHJcblxyXG4gIC8vIEJvb2xlYW4gLSBJZiB3ZSB3YW50IHRvIG92ZXJyaWRlIHdpdGggYSBoYXJkIGNvZGVkIHNjYWxlXHJcbiAgc2NhbGVPdmVycmlkZTogZmFsc2UsXHJcblxyXG4gIC8vICoqIFJlcXVpcmVkIGlmIHNjYWxlT3ZlcnJpZGUgaXMgdHJ1ZSAqKlxyXG4gIC8vIE51bWJlciAtIFRoZSBudW1iZXIgb2Ygc3RlcHMgaW4gYSBoYXJkIGNvZGVkIHNjYWxlXHJcbiAgc2NhbGVTdGVwczogbnVsbCxcclxuICAvLyBOdW1iZXIgLSBUaGUgdmFsdWUganVtcCBpbiB0aGUgaGFyZCBjb2RlZCBzY2FsZVxyXG4gIHNjYWxlU3RlcFdpZHRoOiBudWxsLFxyXG4gIC8vIE51bWJlciAtIFRoZSBzY2FsZSBzdGFydGluZyB2YWx1ZVxyXG4gIHNjYWxlU3RhcnRWYWx1ZTogbnVsbCxcclxuXHJcbiAgLy8gU3RyaW5nIC0gQ29sb3VyIG9mIHRoZSBzY2FsZSBsaW5lXHJcbiAgc2NhbGVMaW5lQ29sb3I6ICdyZ2JhKDAsMCwwLC4xKScsXHJcblxyXG4gIC8vIE51bWJlciAtIFBpeGVsIHdpZHRoIG9mIHRoZSBzY2FsZSBsaW5lXHJcbiAgc2NhbGVMaW5lV2lkdGg6IDEsXHJcblxyXG4gIC8vIEJvb2xlYW4gLSBXaGV0aGVyIHRvIHNob3cgbGFiZWxzIG9uIHRoZSBzY2FsZVxyXG4gIHNjYWxlU2hvd0xhYmVsczogdHJ1ZSxcclxuXHJcbiAgLy8gSW50ZXJwb2xhdGVkIEpTIHN0cmluZyAtIGNhbiBhY2Nlc3MgdmFsdWVcclxuICBzY2FsZUxhYmVsOiAnPCU9dmFsdWUlPicsXHJcblxyXG4gIC8vIEJvb2xlYW4gLSBXaGV0aGVyIHRoZSBzY2FsZSBzaG91bGQgc3RpY2sgdG8gaW50ZWdlcnMsIG5vdCBmbG9hdHMgZXZlbiBpZiBkcmF3aW5nIHNwYWNlIGlzIHRoZXJlXHJcbiAgc2NhbGVJbnRlZ2Vyc09ubHk6IHRydWUsXHJcblxyXG4gIC8vIEJvb2xlYW4gLSBXaGV0aGVyIHRoZSBzY2FsZSBzaG91bGQgc3RhcnQgYXQgemVybywgb3IgYW4gb3JkZXIgb2YgbWFnbml0dWRlIGRvd24gZnJvbSB0aGUgbG93ZXN0IHZhbHVlXHJcbiAgc2NhbGVCZWdpbkF0WmVybzogZmFsc2UsXHJcblxyXG4gIC8vIFN0cmluZyAtIFNjYWxlIGxhYmVsIGZvbnQgZGVjbGFyYXRpb24gZm9yIHRoZSBzY2FsZSBsYWJlbFxyXG4gIHNjYWxlRm9udEZhbWlseTogXCInSGVsdmV0aWNhIE5ldWUnLCAnSGVsdmV0aWNhJywgJ0FyaWFsJywgc2Fucy1zZXJpZlwiLFxyXG5cclxuICAvLyBOdW1iZXIgLSBTY2FsZSBsYWJlbCBmb250IHNpemUgaW4gcGl4ZWxzXHJcbiAgc2NhbGVGb250U2l6ZTogMTIsXHJcblxyXG4gIC8vIFN0cmluZyAtIFNjYWxlIGxhYmVsIGZvbnQgd2VpZ2h0IHN0eWxlXHJcbiAgc2NhbGVGb250U3R5bGU6ICdub3JtYWwnLFxyXG5cclxuICAvLyBTdHJpbmcgLSBTY2FsZSBsYWJlbCBmb250IGNvbG91clxyXG4gIHNjYWxlRm9udENvbG9yOiAnIzY2NicsXHJcblxyXG4gIC8vIEJvb2xlYW4gLSB3aGV0aGVyIG9yIG5vdCB0aGUgY2hhcnQgc2hvdWxkIGJlIHJlc3BvbnNpdmUgYW5kIHJlc2l6ZSB3aGVuIHRoZSBicm93c2VyIGRvZXMuXHJcbiAgcmVzcG9uc2l2ZTogZmFsc2UsXHJcblxyXG4gIC8vIEJvb2xlYW4gLSB3aGV0aGVyIHRvIG1haW50YWluIHRoZSBzdGFydGluZyBhc3BlY3QgcmF0aW8gb3Igbm90IHdoZW4gcmVzcG9uc2l2ZSwgaWYgc2V0IHRvIGZhbHNlLCB3aWxsIHRha2UgdXAgZW50aXJlIGNvbnRhaW5lclxyXG4gIG1haW50YWluQXNwZWN0UmF0aW86IHRydWUsXHJcblxyXG4gIC8vIEJvb2xlYW4gLSBEZXRlcm1pbmVzIHdoZXRoZXIgdG8gZHJhdyB0b29sdGlwcyBvbiB0aGUgY2FudmFzIG9yIG5vdFxyXG4gIHNob3dUb29sdGlwczogdHJ1ZSxcclxuXHJcbiAgLy8gQXJyYXkgLSBBcnJheSBvZiBzdHJpbmcgbmFtZXMgdG8gYXR0YWNoIHRvb2x0aXAgZXZlbnRzXHJcbiAgdG9vbHRpcEV2ZW50czogWyd0b3VjaHN0YXJ0JywgJ2NsaWNrJ10sXHJcblxyXG4gIC8vIFN0cmluZyAtIFRvb2x0aXAgYmFja2dyb3VuZCBjb2xvdXJcclxuICB0b29sdGlwRmlsbENvbG9yOiAncmdiYSgwLDAsMCwwLjgpJyxcclxuXHJcbiAgLy8gU3RyaW5nIC0gVG9vbHRpcCBsYWJlbCBmb250IGRlY2xhcmF0aW9uIGZvciB0aGUgc2NhbGUgbGFiZWxcclxuICB0b29sdGlwRm9udEZhbWlseTogXCInSGVsdmV0aWNhJywgJ0FyaWFsJywgU2Fucy1zZXJpZlwiLFxyXG5cclxuICAvLyBOdW1iZXIgLSBUb29sdGlwIGxhYmVsIGZvbnQgc2l6ZSBpbiBwaXhlbHNcclxuICB0b29sdGlwRm9udFNpemU6IDE0LFxyXG5cclxuICAvLyBTdHJpbmcgLSBUb29sdGlwIGZvbnQgd2VpZ2h0IHN0eWxlXHJcbiAgdG9vbHRpcEZvbnRTdHlsZTogJ25vcm1hbCcsXHJcblxyXG4gIC8vIFN0cmluZyAtIFRvb2x0aXAgbGFiZWwgZm9udCBjb2xvdXJcclxuICB0b29sdGlwRm9udENvbG9yOiAnI2ZmZicsXHJcblxyXG4gIC8vIFN0cmluZyAtIFRvb2x0aXAgdGl0bGUgZm9udCBkZWNsYXJhdGlvbiBmb3IgdGhlIHNjYWxlIGxhYmVsXHJcbiAgdG9vbHRpcFRpdGxlRm9udEZhbWlseTogXCInSGVsdmV0aWNhIE5ldWUnLCAnSGVsdmV0aWNhJywgJ0FyaWFsJywgc2Fucy1zZXJpZlwiLFxyXG5cclxuICAvLyBOdW1iZXIgLSBUb29sdGlwIHRpdGxlIGZvbnQgc2l6ZSBpbiBwaXhlbHNcclxuICB0b29sdGlwVGl0bGVGb250U2l6ZTogMTQsXHJcblxyXG4gIC8vIFN0cmluZyAtIFRvb2x0aXAgdGl0bGUgZm9udCB3ZWlnaHQgc3R5bGVcclxuICB0b29sdGlwVGl0bGVGb250U3R5bGU6ICdib2xkJyxcclxuXHJcbiAgLy8gU3RyaW5nIC0gVG9vbHRpcCB0aXRsZSBmb250IGNvbG91clxyXG4gIHRvb2x0aXBUaXRsZUZvbnRDb2xvcjogJyNmZmYnLFxyXG5cclxuICAvLyBOdW1iZXIgLSBwaXhlbCB3aWR0aCBvZiBwYWRkaW5nIGFyb3VuZCB0b29sdGlwIHRleHRcclxuICB0b29sdGlwWVBhZGRpbmc6IDYsXHJcblxyXG4gIC8vIE51bWJlciAtIHBpeGVsIHdpZHRoIG9mIHBhZGRpbmcgYXJvdW5kIHRvb2x0aXAgdGV4dFxyXG4gIHRvb2x0aXBYUGFkZGluZzogNixcclxuXHJcbiAgLy8gTnVtYmVyIC0gU2l6ZSBvZiB0aGUgY2FyZXQgb24gdGhlIHRvb2x0aXBcclxuICB0b29sdGlwQ2FyZXRTaXplOiA4LFxyXG5cclxuICAvLyBOdW1iZXIgLSBQaXhlbCByYWRpdXMgb2YgdGhlIHRvb2x0aXAgYm9yZGVyXHJcbiAgdG9vbHRpcENvcm5lclJhZGl1czogNixcclxuXHJcbiAgLy8gTnVtYmVyIC0gUGl4ZWwgb2Zmc2V0IGZyb20gcG9pbnQgeCB0byB0b29sdGlwIGVkZ2VcclxuICB0b29sdGlwWE9mZnNldDogMTAsXHJcblxyXG4gIC8vIHRvb2x0aXBUZW1wbGF0ZSBjYW4gYmUgYSBmdW5jdGlvbiBhcyB3ZWxsIChub3QgaW4gdGhlIGRvY3MsIHNlZSBDaGFydC5Db3JlLmpzIGluIHRoZWlyIHJlcG8pXHJcbiAgdG9vbHRpcFRlbXBsYXRlOiBmdW5jdGlvbiB0b29sdGlwVGVtcGxhdGUodmFsdWVzT2JqZWN0KSB7XHJcbiAgICAvLyBVc2UgdGhlIGZvcm1hdHRlciBvbiB0aGUgY2hhcnQgdmlldywgb3RoZXJ3aXNlIGRlZmF1bHQgdG8gbGFiZWw6IHZhbHVlXHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFByaW1hcnlBY3RpdmVWaWV3KCk7XHJcbiAgICBsZXQgcmVzdWx0cztcclxuICAgIGlmICh2aWV3ICYmIHZpZXcuZm9ybWF0dGVyKSB7XHJcbiAgICAgIHJlc3VsdHMgPSB2aWV3LmZvcm1hdHRlcih2YWx1ZXNPYmplY3QudmFsdWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVzdWx0cyA9IHZhbHVlc09iamVjdC52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gW3ZhbHVlc09iamVjdC5sYWJlbCwgcmVzdWx0c10uam9pbignOiAnKTtcclxuICB9LFxyXG4gIC8vIFN0cmluZyAtIFRlbXBsYXRlIHN0cmluZyBmb3Igc2luZ2xlIHRvb2x0aXBzXHJcbiAgbXVsdGlUb29sdGlwVGVtcGxhdGU6ICc8JT0gdmFsdWUgJT4nLFxyXG5cclxuICAvLyBGdW5jdGlvbiAtIFdpbGwgZmlyZSBvbiBhbmltYXRpb24gcHJvZ3Jlc3Npb24uXHJcbiAgb25BbmltYXRpb25Qcm9ncmVzczogZnVuY3Rpb24gb25BbmltYXRpb25Qcm9ncmVzcygpIHt9LFxyXG5cclxuICAvLyBGdW5jdGlvbiAtIFdpbGwgZmlyZSBvbiBhbmltYXRpb24gY29tcGxldGlvbi5cclxuICBvbkFuaW1hdGlvbkNvbXBsZXRlOiBmdW5jdGlvbiBvbkFuaW1hdGlvbkNvbXBsZXRlKCkge30sXHJcbn0pO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5DaGFydHMuX0NoYXJ0TWl4aW4nLCBbX1B1bGxUb1JlZnJlc2hNaXhpbl0sIC8qKiBAbGVuZHMgY3JtLlZpZXdzLkNoYXJ0cy5fQ2hhcnRNaXhpbiMgKi8ge1xyXG4gIF9vcmllbnRhdGlvbkhhbmRsZTogbnVsbCxcclxuICBfbWVudU9wZW5IYW5kbGU6IG51bGwsXHJcbiAgX21lbnVDbG9zZUhhbmRsZTogbnVsbCxcclxuICBfZmVlZERhdGE6IG51bGwsXHJcblxyXG4gIC8qKlxyXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBSRU5ERVJfREVMQVlcclxuICAgKiBOdW1iZXIgVGhlIHJlLXJlbmRlciBkZWxheSBpbiBtaWxsaXNlY29uZHMgd2hlbiB0aGUgdXNlciBjaGFuZ2VzIGRldmljZSBvcmllbnRhdGlvbi5cclxuICAgKi9cclxuICBSRU5ERVJfREVMQVk6IGhhcygnaW9zJykgPCA4ID8gNTAwIDogMTYsIC8vIFdvcmsgYXJvdW5kIElPUzcgb3JpZW50YXRpb24gY2hhbmdlIGlzc3Vlc1xyXG5cclxuICAvKipcclxuICAgKiBAcHJvcGVydHkge09iamVjdH0gcGFyZW50XHJcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBtZXRyaWMgd2lkZ2V0IHRoYXQgb3BlbmVkIHRoaXMgdmlldy5cclxuICAgKi9cclxuICBwYXJlbnQ6IG51bGwsXHJcblxyXG4gIGZvcm1hdHRlcjogZnVuY3Rpb24gZm9ybWF0dGVyKHZhbCkge1xyXG4gICAgcmV0dXJuIHZhbDtcclxuICB9LFxyXG5cclxuICBQQUdFX1NJWkU6IDEwMCxcclxuXHJcbiAgLyoqXHJcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9XHJcbiAgICogVGhlIGxvYWRpbmcgdGV4dCBmb250IHN0eWxlXHJcbiAgICovXHJcbiAgbG9hZGluZ0ZvbnQ6ICcjMDAwJyxcclxuXHJcbiAgLyoqXHJcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9XHJcbiAgICogTG9hZGluZyBtZXNzYWdlXHJcbiAgICovXHJcbiAgbG9hZGluZ1RleHQ6ICdsb2FkaW5nLi4uJyxcclxuXHJcbiAgLyoqXHJcbiAgICogT3ZlcnJpZGVzIFZpZXcgd2lkZ2V0VGVtcGxhdGVcclxuICAgKi9cclxuICB3aWRnZXRUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGlkPVwieyU9ICQuaWQgJX1cIiBkYXRhLXRpdGxlPVwieyU9ICQudGl0bGVUZXh0ICV9XCIgY2xhc3M9XCJsaXN0IGxpc3QtaGlkZS1zZWFyY2ggeyU9ICQuY2xzICV9XCI+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwib3ZlcnRocm93IHNjcm9sbGVyXCIgZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cInNjcm9sbGVyTm9kZVwiPicsXHJcbiAgICAnPGRpdiBjbGFzcz1cImxlZ2VuZFwiIGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJsZWdlbmROb2RlXCIgZGF0YS1kb2pvLWF0dGFjaC1ldmVudD1cImNsaWNrOiBvbkxlZ2VuZENsaWNrXCI+PC9kaXY+JyxcclxuICAgICc8Y2FudmFzIGNsYXNzPVwiY2hhcnQtY29udGVudFwiIGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJjb250ZW50Tm9kZVwiPjwvY2FudmFzPicsXHJcbiAgICAnPC9kaXY+JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gIF0pLFxyXG5cclxuICBwb3N0Q3JlYXRlOiBmdW5jdGlvbiBwb3N0Q3JlYXRlKCkge1xyXG4gICAgdGhpcy5pbml0UHVsbFRvUmVmcmVzaCh0aGlzLnNjcm9sbGVyTm9kZSk7XHJcbiAgfSxcclxuICBvblRyYW5zaXRpb25UbzogZnVuY3Rpb24gb25UcmFuc2l0aW9uVG8oKSB7XHJcbiAgICAvLyBSZW5kZXIgZm4gaXMgZGVib3VuY2VkIHRvIHByZXZlbnQgdG9vIG1hbnkgY2FsbHMgYXMgYSB1c2VyIHJlc2l6ZXMsIG9yXHJcbiAgICAvLyBpZiBpdCBmaXJlcyBtdWx0aXBsZSB0aW1lcyAob25yZXNpemUgZmlyZXMgb24gZGVza3RvcCBicm93c2VycyB3aXRoIC9hcHAvc2V0T3JpZW50YXRpb24pXHJcbiAgICAvLyBTb21lIGJyb3dzZXJzIGRvIG5vdCBmaXJlIHdpbmRvdyBvblJlc2l6ZSBmb3Igb3JpZW50YXRpb24gY2hhbmdlcy5cclxuICAgIGNvbnN0IF9yZW5kZXJGbiA9IFV0aWxpdHkuZGVib3VuY2UoKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5fZmVlZERhdGEpIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZUNoYXJ0KHRoaXMuX2ZlZWREYXRhKTtcclxuICAgICAgfVxyXG4gICAgfSwgdGhpcy5SRU5ERVJfREVMQVkpO1xyXG5cclxuICAgIHRoaXMuX29yaWVudGF0aW9uSGFuZGxlID0gY29ubmVjdC5zdWJzY3JpYmUoJy9hcHAvc2V0T3JpZW50YXRpb24nLCB0aGlzLCBfcmVuZGVyRm4pO1xyXG4gICAgdGhpcy5fbWVudU9wZW5IYW5kbGUgPSBjb25uZWN0LnN1YnNjcmliZSgnL2FwcC9tZW51b3BlbicsIHRoaXMsIF9yZW5kZXJGbik7XHJcbiAgICB0aGlzLl9tZW51Q2xvc2VIYW5kbGUgPSBjb25uZWN0LnN1YnNjcmliZSgnL2FwcC9tZW51Y2xvc2UnLCB0aGlzLCBfcmVuZGVyRm4pO1xyXG4gICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBfcmVuZGVyRm4pO1xyXG4gIH0sXHJcbiAgb25UcmFuc2l0aW9uQXdheTogZnVuY3Rpb24gb25UcmFuc2l0aW9uQXdheSgpIHtcclxuICAgIGNvbm5lY3QudW5zdWJzY3JpYmUodGhpcy5fb3JpZW50YXRpb25IYW5kbGUpO1xyXG4gICAgY29ubmVjdC51bnN1YnNjcmliZSh0aGlzLl9tZW51T3BlbkhhbmRsZSk7XHJcbiAgICBjb25uZWN0LnVuc3Vic2NyaWJlKHRoaXMuX21lbnVDbG9zZUhhbmRsZSk7XHJcbiAgICB0aGlzLl9mZWVkRGF0YSA9IG51bGw7XHJcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XHJcblxyXG4gICAgaWYgKHRoaXMuY2hhcnQgJiYgdGhpcy5jaGFydC5kZXN0cm95KSB7XHJcbiAgICAgIHRoaXMuY2hhcnQuZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgX3NldENhbnZhc1dpZHRoOiBmdW5jdGlvbiBfc2V0Q2FudmFzV2lkdGgoKSB7XHJcbiAgICBjb25zdCBib3ggPSBkb21HZW8uZ2V0TWFyZ2luQm94KHRoaXMuZG9tTm9kZSk7XHJcbiAgICBpZiAodGhpcy5jb250ZW50Tm9kZSkge1xyXG4gICAgICB0aGlzLmNvbnRlbnROb2RlLndpZHRoID0gYm94Lnc7XHJcbiAgICB9XHJcbiAgfSxcclxuICBfZHJhd0xvYWRpbmc6IGZ1bmN0aW9uIF9kcmF3TG9hZGluZygpIHtcclxuICAgIGNvbnN0IG5vZGUgPSB0aGlzLmNvbnRlbnROb2RlO1xyXG4gICAgY29uc3QgZ2xvYmFsQ29uZmlnID0gd2luZG93LkNoYXJ0LmRlZmF1bHRzLmdsb2JhbDtcclxuICAgIGNvbnN0IGNvbnRleHQgPSBub2RlICYmIG5vZGUuZ2V0Q29udGV4dCAmJiBub2RlLmdldENvbnRleHQoJzJkJyk7XHJcblxyXG4gICAgaWYgKCFjb250ZXh0KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBub2RlLndpZHRoLCBub2RlLmhlaWdodCk7XHJcblxyXG4gICAgY29uc3QgdGV4dCA9IHJlc291cmNlLmxvYWRpbmdUZXh0O1xyXG5cclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5sb2FkaW5nRm9udDtcclxuICAgIGNvbnRleHQuZm9udCA9IGAke2dsb2JhbENvbmZpZy50b29sdGlwRm9udFNpemV9cHggJHtnbG9iYWxDb25maWcudG9vbHRpcEZvbnRGYW1pbHl9YDtcclxuXHJcbiAgICAvLyBDZW50ZXIgdGhlIHRleHRcclxuICAgIGNvbnN0IG9mZnNldCA9IE1hdGguZmxvb3IoY29udGV4dC5tZWFzdXJlVGV4dCh0ZXh0KS53aWR0aCAvIDIpO1xyXG4gICAgY29uc3QgeCA9IE1hdGguZmxvb3Iobm9kZS53aWR0aCAvIDIpIC0gb2Zmc2V0O1xyXG4gICAgY29uc3QgeSA9IDIwOyAvLyBwYWRkaW5nXHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KHRleHQsIHgsIHksIG5vZGUud2lkdGgpO1xyXG4gIH0sXHJcbiAgY3JlYXRlQ2hhcnQ6IGZ1bmN0aW9uIGNyZWF0ZUNoYXJ0KGZlZWREYXRhKSB7XHJcbiAgICB0aGlzLl9mZWVkRGF0YSA9IGZlZWREYXRhO1xyXG4gIH0sXHJcbiAgZ2V0VGFnOiBmdW5jdGlvbiBnZXRUYWcoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5yZXR1cm5UbztcclxuICB9LFxyXG5cclxuICBnZXRTZWFyY2hFeHByZXNzaW9uOiBmdW5jdGlvbiBnZXRTZWFyY2hFeHByZXNzaW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuY3VycmVudFNlYXJjaEV4cHJlc3Npb247XHJcbiAgfSxcclxuXHJcbiAgc2hvd1NlYXJjaEV4cHJlc3Npb246IGZ1bmN0aW9uIHNob3dTZWFyY2hFeHByZXNzaW9uKCkge1xyXG4gICAgY29uc3QgYXBwID0gdGhpcy5hcHAgfHwgd2luZG93LkFwcDtcclxuICAgIGFwcC5zZXRQcmltYXJ5VGl0bGUoW3RoaXMudGl0bGUsIHRoaXMuZ2V0U2VhcmNoRXhwcmVzc2lvbigpXS5qb2luKCc6ICcpKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVzIGNsaWNrIGV2ZW50cyBmb3IgdGhlIGxlZ2VuZCBub2RlLiBIYW5kbGVzIG9wZW5pbmcgdGhlIHRvb2x0aXBzIG9uIHRoZSBjaGFydFxyXG4gICAqIHdoZW4gdGhlIGl0ZW0gaW4gdGhlIGxlZ2VuZCBpcyBjbGlja2VkLiBUaGUgY3VycmVudCBsZWdlbmQgZm9ybWF0IGlzIGFzIGZvbGxvd3M6XHJcbiAgICogQHNpbmNlIDMuM1xyXG4gICAqXHJcbiAgICogICAgQGV4YW1wbGVcclxuICAgKiAgICBgPGRpdiBjbGFzcz1cImxlZ2VuZFwiIGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJsZWdlbmROb2RlXCI+XHJcbiAgICogICAgICAgIDx1bCBjbGFzcz1cImRvdWdobnV0LWxlZ2VuZFwiPlxyXG4gICAqICAgICAgICAgICAgPGxpIGRhdGEtc2VnbWVudD1cIjBcIj48c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6IHNvbWVDb2xvclwiPjwvc3Bhbj5cclxuICAgKiAgICAgICAgICAgICAgICBUb29sdGlwIExhYmVsXHJcbiAgICogICAgICAgICAgICA8L2xpPlxyXG4gICAqICAgICAgICA8L3VsPlxyXG4gICAqICAgIDwvZGl2PmBcclxuICAgKi9cclxuICBvbkxlZ2VuZENsaWNrOiBmdW5jdGlvbiBvbkxlZ2VuZENsaWNrKGV2dCkge1xyXG4gICAgaWYgKCFldnQgfHwgIWV2dC5zcmNFbGVtZW50IHx8IGV2dC5zcmNFbGVtZW50ID09PSB0aGlzLmxlZ2VuZE5vZGUgfHwgIXRoaXMuY2hhcnQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNyYyA9IGV2dC5zcmNFbGVtZW50LnRhZ05hbWUgPT09ICdTUEFOJyA/IGV2dC5zcmNFbGVtZW50LnBhcmVudEVsZW1lbnQgOiBldnQuc3JjRWxlbWVudDtcclxuICAgIGNvbnN0IHNlZ21lbnQgPSBwYXJzZUludChzcmMuZGF0YXNldC5zZWdtZW50LCAxMCk7XHJcbiAgICBpZiAoc2VnbWVudCA+PSAwICYmIHRoaXMuY2hhcnQuc2hvd1Rvb2x0aXAgJiYgdGhpcy5jaGFydC5zZWdtZW50cykge1xyXG4gICAgICB0aGlzLmNoYXJ0LnNob3dUb29sdGlwKHRoaXMuY2hhcnQuc2VnbWVudHMuc2xpY2Uoc2VnbWVudCwgc2VnbWVudCArIDEpLCBmYWxzZSAvKiByZS1kcmF3IGZsYWcgKi8pO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbmRlciBhIGxlZ2VuZCBmcm9tIHRoZSBjaGFydCBpbnRvIHRoZSBsZWdlbmROb2RlIGF0dGFjaCBwb2ludC5cclxuICAgKiBAc2luY2UgMy4zXHJcbiAgICovXHJcbiAgc2hvd0xlZ2VuZDogZnVuY3Rpb24gc2hvd0xlZ2VuZCgpIHtcclxuICAgIGlmICghdGhpcy5jaGFydCB8fCAhdGhpcy5jaGFydC5nZW5lcmF0ZUxlZ2VuZCB8fCAhdGhpcy5sZWdlbmROb2RlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBodG1sID0gdGhpcy5jaGFydC5nZW5lcmF0ZUxlZ2VuZCgpO1xyXG4gICAgZG9tQXR0ci5zZXQodGhpcy5sZWdlbmROb2RlLCB7XHJcbiAgICAgIGlubmVySFRNTDogaHRtbCxcclxuICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXByZWNhdGVkIDMuM1xyXG4gICAqIENoYXJ0cyBpbiAzLjMgbm8gbG9uZ2VyIHVzZSB0aGUgc2VhcmNoIGV4cHJlc3Npb24gbm9kZS5cclxuICAgKi9cclxuICBnZXRTZWFyY2hFeHByZXNzaW9uSGVpZ2h0OiBmdW5jdGlvbiBnZXRTZWFyY2hFeHByZXNzaW9uSGVpZ2h0KCkge1xyXG4gICAgY29uc3QgYm94ID0gZG9tR2VvLmdldE1hcmdpbkJveCh0aGlzLnNlYXJjaEV4cHJlc3Npb25Ob2RlKTtcclxuICAgIHJldHVybiBib3guaDtcclxuICB9LFxyXG5cclxuICBvblB1bGxUb1JlZnJlc2hDb21wbGV0ZTogZnVuY3Rpb24gb25QdWxsVG9SZWZyZXNoQ29tcGxldGUoKSB7XHJcbiAgICB0aGlzLnJlcXVlc3REYXRhKCk7XHJcbiAgfSxcclxuICByZWZyZXNoOiBmdW5jdGlvbiByZWZyZXNoKCkge1xyXG4gICAgdGhpcy5yZXF1ZXN0RGF0YSgpO1xyXG4gIH0sXHJcbiAgX2dldFN0b3JlQXR0cjogZnVuY3Rpb24gX2dldFN0b3JlQXR0cigpIHtcclxuICAgIHJldHVybiB0aGlzLmNyZWF0ZVN0b3JlKCk7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBSZXR1cm4gYSBzdG9yZSB0aGF0IGlzIGNvbnN1bWVkIGJ5IHJlcXVlc3REYXRhLlxyXG4gICAqIEBzaW5jZSAzLjNcclxuICAgKi9cclxuICBjcmVhdGVTdG9yZTogZnVuY3Rpb24gY3JlYXRlU3RvcmUoKSB7XHJcbiAgICBjb25zdCBzdG9yZSA9IHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LnN0b3JlO1xyXG4gICAgcmV0dXJuIHN0b3JlO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIE92ZXJyaWRlcyBfTGlzdEJhc2UgcmVxdWVzdERhdGEgdG8gcmUtcmVuZGVyIHRoZSBjaGFydCBvbiBwdWxsIHRvIHJlZnJlc2guXHJcbiAgICogQHNpbmNlIDMuM1xyXG4gICAqL1xyXG4gIHJlcXVlc3REYXRhOiBmdW5jdGlvbiByZXF1ZXN0RGF0YSgpIHtcclxuICAgIGNvbnN0IHN0b3JlID0gdGhpcy5nZXQoJ3N0b3JlJyk7XHJcbiAgICBpZiAodGhpcy5jaGFydCAmJiB0aGlzLmNoYXJ0LmRlc3Ryb3kpIHtcclxuICAgICAgdGhpcy5jaGFydC5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fc2V0Q2FudmFzV2lkdGgoKTtcclxuICAgIHRoaXMuX2RyYXdMb2FkaW5nKCk7XHJcblxyXG4gICAgaWYgKHN0b3JlKSB7XHJcbiAgICAgIHN0b3JlLnF1ZXJ5KG51bGwsIHtcclxuICAgICAgICBzdGFydDogMCxcclxuICAgICAgICBjb3VudDogdGhpcy5QQUdFX1NJWkUsXHJcbiAgICAgIH0pLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICB0aGlzLmNyZWF0ZUNoYXJ0KGRhdGEpO1xyXG4gICAgICB9LCAoZSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=