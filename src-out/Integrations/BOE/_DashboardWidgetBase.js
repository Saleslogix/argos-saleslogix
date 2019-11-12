define('crm/Integrations/BOE/_DashboardWidgetBase', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/when', 'dojo/promise/all', 'dojo/_base/Deferred', '../../Format', '../../Aggregate', 'argos/Convert', 'argos/RelatedViewManager', 'argos/_RelatedViewWidgetBase', 'argos/Store/SData', './Utility', 'argos/I18n', 'dojo/string'], function (module, exports, _declare, _lang, _when, _all, _Deferred, _Format, _Aggregate, _Convert, _RelatedViewManager, _RelatedViewWidgetBase2, _SData, _Utility, _I18n, _string) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _when2 = _interopRequireDefault(_when);

  var _all2 = _interopRequireDefault(_all);

  var _Deferred2 = _interopRequireDefault(_Deferred);

  var _Format2 = _interopRequireDefault(_Format);

  var _Aggregate2 = _interopRequireDefault(_Aggregate);

  var _Convert2 = _interopRequireDefault(_Convert);

  var _RelatedViewManager2 = _interopRequireDefault(_RelatedViewManager);

  var _RelatedViewWidgetBase3 = _interopRequireDefault(_RelatedViewWidgetBase2);

  var _SData2 = _interopRequireDefault(_SData);

  var _Utility2 = _interopRequireDefault(_Utility);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _string2 = _interopRequireDefault(_string);

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

  var resource = (0, _I18n2.default)('dashboardWidgetBase');

  /**
   * @class crm.Integrations.BOE._DashboardWidgetBase
   * @extends argos._RelatedViewWidgetBase
   */
  var __class = (0, _declare2.default)('crm.Integrations.BOE._DashboardWidgetBase', [_RelatedViewWidgetBase3.default], /** @lends crm.Integrations.BOE._DashboardWidgetBase# */{
    owner: null,
    id: 'dashboard-widget-base',
    titleText: resource.titleText,
    categoryText: resource.categoryText,
    color: '#4b5656',
    selectedColor: '#4b1212',
    metricWidgets: null,
    metricLayout: null,
    rangeLayout: null,
    store: null,
    service: null,
    selectedRange: null,
    values: null,
    formatter: _Format2.default.bigNumber,
    contractName: 'dynamic',
    autoLoad: false,
    isLoaded: false,
    enabled: false,
    /**
    * @cfg {String} resourceKind
    * The SData resource kind the view is responsible for.  This will be used as the default resource kind
    * for all SData requests.
    */
    resourceKind: null,
    /**
     * @cfg {String[]}
     * A list of fields to be selected in an SData request.
     */
    querySelect: null,
    /**
     * @cfg {String[]?}
     * A list of child properties to be included in an SData request.
     */
    queryInclude: null,
    queryName: null,
    /**
     * @cfg {String}
     * A where clause to filter the  SData request.
     */
    queryWhere: '',
    /**
     * @cfg {String}
     * A orderBy clause to sort the  SData request.
     */
    queryOrderBy: '',
    /**
     * @cfg {String?/Function?}
     * The default resource property for an SData request.
     */
    resourceProperty: null,
    /**
     * @cfg {String?/Function?}
     * The default resource predicate for an SData request.
     */
    resourcePredicate: null,
    applicationName: null,
    itemsProperty: '$resources',
    idProperty: '$key',
    labelProperty: '$descriptor',
    entityProperty: '$name',
    versionProperty: '$etag',
    maxItems: 500,
    pageSize: 100,
    dayValue: 7,
    decorators: null,
    relatedContentTemplate: new Simplate(['{% if($.enabled) { %}', '{%! $$.dashboardTemplate %}', '{% } %}']),
    dashboardTemplate: new Simplate(['<div class="dashboard-widget">', '{%! $$.dashboardHeaderTemplateStart %}', '<div class="node-container accordion-pane">', '{%! $$.dashboardRangeTemplate %}', '<div data-dojo-attach-point="metricsNode" class="dashboard-metric-list"></div>', '</div>', '</div>', '{%! $$.dashboardHeaderTemplateEnd %}']),
    dashboardIconTemplate: new Simplate(['{% if($.titleText) { %}', '<span class="dashboard-icon round info badge" style="background-color:{%= $$.getColor($) %}" >', '{%: $$.getAbrv($) %}', '</span>', '{% } %}']),
    dashboardHeaderTemplateEnd: new Simplate(['{% if($.titleText || $.categoryText) { %}', '</div>', '{% } %}']),
    dashboardHeaderTemplateStart: new Simplate(['{% if($.titleText || $.categoryText) { %}', '<div class="dashboard-header accordion" data-dojo-attach-point="dashboardHeaderNode">\n      <div class="accordion-header is-selected">\n        <a href="#" class="dashboard-header-text">\n        {%! $$.dashboardIconTemplate %}\n        {% if($.titleText) { %}\n          <div class="dashboard-title">{%: ($.titleText) %} {%: $$.getFormattedCurrencyCodeForTitle() %}</div>\n        {% } %}\n        {% if($.categoryText) { %}\n         <div class="dashboard-category">{%: ($.categoryText) %}</div>\n        {% } %}\n        </a>\n      </div>\n    ', '{% } %}']),
    dashboardRangeTemplate: new Simplate(['{% if($.createRangeLayout) { %}', '<div data-dojo-attach-point="rangeNode" class="dashboard-range-list"></div>', '{% } %}']),
    rangeItemTemplate: new Simplate(['<div class="dashboard-range-item" style="background-color:{%= $$.getColor($) %}">', '</div>']),
    metricItemTemplate: new Simplate(['<div class="dashboard-metric-item {%: $.cls %}" style="background-color:{%= $$.getMetricColor($) %}">', '</div>']),
    nodataTemplate: new Simplate(['<div class="dashboard-nodatafound">', '{%: $.message %}', '</div>']),
    onInit: function onInit() {
      this.service = App.getService(false);
      if (this.autoLoad && this.enabled) {
        this.onLoad();
      }
    },
    hasParentEntry: function hasParentEntry() {
      return this.parentEntry ? true : false;
    },
    onLoad: function onLoad() {
      var _this = this;

      var promise = void 0;
      if (!this.enabled) {
        return promise;
      }
      this.rebuildValues();

      if (!this.loadingNode) {
        this.loadingNode = $(this.loadingTemplate.apply(this));
      }
      if (this.hasParentEntry()) {
        promise = this.getData();
        promise.then(function (data) {
          if (data && data.length > 0) {
            _this.entry = data[0];
            _this.processEntry(_this.entry);
          } else {
            _this.buildNoDataView({ message: 'no data found' });
          }
        }, function (data) {
          _this.buildErrorView(data);
        });
      } else {
        this.buildErrorView({});
      }
      this.isLoaded = true;
      $(this.dashboardHeaderNode).accordion();
    },
    processEntry: function processEntry(entry) {
      this.buildView(entry);
    },
    getData: function getData() {
      var deferred = new _Deferred2.default();
      var store = this.getStore();

      if (store) {
        var queryOptions = {};
        var queryResults = store.query(null, queryOptions);
        (0, _when2.default)(queryResults, function (feed) {
          deferred.resolve(feed);
        }, function (err) {
          deferred.reject({ message: 'error:' + err });
        });
        return deferred.promise;
      }
      deferred.reject({ message: 'no data found' });
      return deferred.promise;
    },
    getFormattedCurrencyCodeForTitle: function getFormattedCurrencyCodeForTitle() {
      var result = '';
      var baseCurrencyCode = _Utility2.default.getBaseCurrencyCode();

      if (baseCurrencyCode) {
        result = '(' + baseCurrencyCode + ')';
      }

      return result;
    },
    getQueryData: function getQueryData() {
      var _this2 = this;

      var queryOptions = {
        count: this.pageSize,
        start: 0
      };
      var queryResults = [];
      var store = this.getQueryStore();

      store.forEach(function (storeInstance) {
        queryResults.push(storeInstance.query(null, queryOptions));
      }, this);

      // Maintain the query order in the data from the resolve
      (0, _all2.default)(queryResults).then(function (results) {
        if (results.length > 1) {
          _this2.sendValues(results);
        } else {
          _this2.sendValues(results[0]);
        }
      });
    },
    registerWidget: function registerWidget(widget) {
      this.metricWidgets.push(widget);
    },
    sendValues: function sendValues(results) {
      var _this3 = this;

      this.metricWidgets.forEach(function (widget) {
        var obj = _this3.values.filter(_this3.checkForValue, widget)[0];
        var valueFn = void 0;
        var values = void 0;
        var valueIndex = [];
        if (!obj.value) {
          if (obj.aggregate) {
            if (obj.aggregateModule) {
              valueFn = obj.aggregateModule[obj.aggregate];
            } else {
              valueFn = _Aggregate2.default[obj.aggregate];
            }
          }
          if (!(obj.queryIndex instanceof Array)) {
            // Single query, so get the single index value from the results
            valueIndex.push(obj.queryIndex);
            values = results[obj.queryIndex];
            (0, _when2.default)(valueFn, function (fn) {
              _this3.applyValue(widget, fn, values, valueIndex, obj);
            }, function onError(error) {
              this._onQueryError(error, widget);
            });
          } else {
            // Multi query, so pull the indices and add them to a result array to pass to the aggregate function
            values = [];
            for (var j = 0; j < obj.queryIndex.length; j++) {
              values.push(results[obj.queryIndex[j]]);
              valueIndex.push(obj.queryIndex[j]);
            }
            (0, _when2.default)(valueFn, function (fn) {
              _this3.applyValue(widget, fn, values, valueIndex, obj);
            }, function onError(error) {
              this._onQueryError(error, widget);
            });
          }
        } else {
          _this3.applyValue(widget, null, null, valueIndex, obj);
        }
      });
    },
    applyValue: function applyValue(widget, valueFn, values, valueIndex, obj) {
      var _this4 = this;

      var formatterFn = void 0;

      // Sales dashboard widget is using formatModule, but all of the others are using formatterModule. Accept both so overrides happen correctly.
      if (widget.formatterModule && widget.formatter || widget.formatModule && widget.formatter) {
        var module = widget.formatterModule || widget.formatModule;
        formatterFn = module[widget.formatter];
      }

      if (valueFn) {
        // If there is a function to call, call it and apply that value to the obj.value
        obj.value = _Utility2.default.aggregateLookup[obj.aggregate](valueFn, widget, values); // fn.call(widget, result);

        // lets set the color on the widget.
        this.applyDecorator(obj.value, widget);
      }

      // get the formatter
      (0, _when2.default)(formatterFn, function (func) {
        if (typeof func === 'function') {
          widget.formatter = func;
        }
      });

      // Apply the value to the widget itself by passing obj.value (from the values array) to the value property of the widget
      if (obj.count) {
        this._getCountValue(widget, obj).then(function (result) {
          if (result >= 0) {
            obj.countValue = result;
          }
          _this4.applyDataToWidget(widget, obj);
        });
      } else {
        this.applyDataToWidget(widget, obj);
      }
    },
    applyDecorator: function applyDecorator(value, widget) {
      if (widget.decorator) {
        if (typeof widget.decorator === 'function') {
          widget.decorator(value, widget);
        } else {
          var decorators = this.getDecorators();
          var decorator = decorators[widget.decorator];
          if (decorator && decorator.fn) {
            decorator.fn.call(decorator, value, widget);
          }
        }
      }
    },
    getDecorators: function getDecorators() {
      if (!this.decorators) {
        this.decorators = {
          positiveTrend: {
            positiveValueColor: 'green',
            negativeValueColor: 'red',
            fn: function fn(value, metricWidget) {
              if (value > 0) {
                metricWidget.setValueColor(this.positiveValueColor);
              } else {
                metricWidget.setValueColor(this.negativeValueColor);
              }
            }
          },
          negativeTrend: {
            positiveValueColor: 'red',
            negativeValueColor: 'green',
            fn: function fn(value, metricWidget) {
              if (value > 0) {
                metricWidget.setValueColor(this.positiveValueColor);
              } else {
                metricWidget.setValueColor(this.negativeValueColor);
              }
            }
          }
        };
      }
      return this.decorators;
    },
    checkForValue: function checkForValue(value) {
      return value.name === this.valueNeeded;
    },
    _onQueryError: function _onQueryError(error, widget) {
      $(widget.metricDetailNode).replaceWith(widget.itemTemplate.apply({ value: error }, widget));
    },
    _getCountValue: function _getCountValue(widget, obj) {
      var def = new _Deferred2.default();
      var queryArg = this.queryArgs && this.queryArgs[obj.queryIndex] ? this.queryArgs[obj.queryIndex] : null;
      if (!queryArg) {
        def.resolved(-1);
        return def.promise;
      }

      var queryOptions = {
        count: 1,
        start: 0,
        select: ['$key'],
        where: queryArg[1]._activeFilter
      };

      var store = new _SData2.default({
        service: App.services.crm,
        contractName: 'dynamic',
        resourceKind: queryArg[0], // resourcekind;
        scope: this
      });

      var queryResults = store.query(null, queryOptions);
      (0, _when2.default)(queryResults, function () {
        def.resolve(queryResults.total);
      }, function (error) {
        console.warn(error); //eslint-disable-line
        def.reject(error);
      });
      return def.promise;
    },
    applyDataToWidget: function applyDataToWidget(widget, data) {
      $(widget.metricDetailNode).empty();
      if (!data.error) {
        if (data.count && data.countValue >= 0) {
          $(widget.metricDetailNode).prepend($('<span class="metric-count">' + _string2.default.substitute(data.countTitle ? _Format2.default.encode(data.countTitle) : _Format2.default.encode(widget.countTitle), [_Format2.default.encode(data.countValue)]) + '</span>'));
        }
      }

      $(widget.metricDetailNode).prepend(widget.itemTemplate.apply({ value: data.value }, widget));
    },
    navToReportView: function navToReportView() {
      var view = void 0;

      if (this.navTo) {
        view = App.getView(this.navTo);
      } else {
        if (this.chartType) {
          view = App.getView(this.chartTypeMapping[this.chartType]);
          view.formatter = this.formatter;
        }
      }

      if (view) {
        view.parent = this;
        view.show({ returnTo: this.returnToId, titleText: this.titleText, where: this.activeFilter });
      }
    },
    changeRange: function changeRange() {
      var view = this.parent;
      view.dayValue = this.value;
      // Change the previously selected range color back to what it was and the new selected range color to selected
      view.selectedRange.style['background-color'] = view.getColor();
      view.selectedRange = this.domNode.parentNode;
      view.selectedRange.style['background-color'] = view.getSelectedColor();
      view.rebuildWidgets(view.entry);
    },
    buildView: function buildView() {},
    buildNoDataView: function buildNoDataView(entry) {
      var frag = document.createDocumentFragment();
      var node = $(this.nodataTemplate.apply(entry, this));
      frag.appendChild(node);
      if (frag.childNodes.length > 0) {
        $(this.metricsNode).append(frag);
      }
    },
    getAbrv: function getAbrv() {
      var abrv = '';
      abrv = _Format2.default.formatUserInitial(this.titleText);
      return abrv;
    },
    getColor: function getColor() {
      return this.color;
    },
    getMetricColor: function getMetricColor() {
      return this.metricColor ? this.metricColor : '';
    },
    getSelectedColor: function getSelectedColor() {
      return this.selectedColor;
    },
    getStore: function getStore() {
      var store = new _SData2.default({
        service: this.service,
        contractName: this.contractName,
        resourceKind: this.resourceKind,
        resourceProperty: this.resourceProperty,
        resourcePredicate: this.resourcePredicate,
        include: this.queryInclude,
        select: this.querySelect,
        orderBy: this.queryOrderBy,
        where: this.getWhere(),
        itemsProperty: this.itemsProperty,
        idProperty: this.idProperty,
        labelProperty: this.labelProperty,
        entityProperty: this.entityProperty,
        versionProperty: this.versionProperty,
        start: 0,
        count: this.maxItems,
        scope: this
      });
      return store;
    },
    getWhere: function getWhere() {
      return this.queryWhere;
    },
    getQueryStore: function getQueryStore() {
      var store = [];

      if (!(this.queryArgs instanceof Array) && this.queryArgs) {
        this.queryArgs = [this.queryArgs];
      }
      if (!this.queryName) {
        this.queryName = 'executeMetric';
      }

      this.queryArgs.forEach(function createStore(arg) {
        store.push(new _SData2.default({
          request: this.request,
          service: App.services.crm,
          resourceKind: arg[0],
          resourcePredicate: this.resourcePredicate,
          contractName: this.contractName,
          queryName: this.queryName,
          queryArgs: arg[1],
          orderBy: this.queryOrderBy,
          idProperty: this.idProperty,
          applicationName: this.applicationName,
          scope: this
        }));
      }, this);

      return store;
    },
    rebuildWidgets: function rebuildWidgets() {},
    rebuildValues: function rebuildValues() {
      // TODO: add in functionality to check if value is dependent on datetime (i.e. rangeValue dependent) and force it to update if necessary
      for (var z = 0; z < this.values.length; z++) {
        this.values[z].value = null;
        if (this.values[z].count >= 0) {
          this.values[z].count = true;
        }
      }
    },
    /**
     * Sets up the date range search query based upon the from and to value (can use this.dayValue which is set by the range nodes)
     * @params {string, int, int} Property to be searched for, the days ago from the current, and days up to (from current)
     */
    pastDays: function pastDays(property, from, to) {
      var now = moment();
      var pastWeekStart = now.clone().subtract(from, 'days').startOf('day');
      var today = void 0;

      if (!to) {
        today = now.clone().endOf('day');
      } else {
        today = now.clone().subtract(to, 'days').endOf('day');
      }

      var query = '((' + property + ' between @' + _Convert2.default.toIsoStringFromDate(pastWeekStart.toDate()) + '@ and @' + _Convert2.default.toIsoStringFromDate(today.toDate()) + '@) or (' + property + ' between @' + pastWeekStart.format('YYYY-MM-DDT00:00:00[Z]') + '@ and @' + today.format('YYYY-MM-DDT23:59:59[Z]') + '@))';
      return query;
    },
    /**
     * Sets up the date range search query based on the this.dayValue and searches between that many days ago and today
     * @params {string} Property to be searched for
     */
    pastDaysLt: function pastDaysLt(property) {
      var now = moment();
      var pastDay = now.clone().subtract(this.dayValue, 'days').startOf('day');

      var query = '(' + property + ' lt @' + _Convert2.default.toIsoStringFromDate(pastDay.toDate()) + '@ or (' + property + ' lt @' + pastDay.format('YYYY-MM-DDT00:00:00[Z]') + '@))';
      return query;
    },
    hasValidOptions: function hasValidOptions(options) {
      return options && options.valueNeeded;
    },
    hasValueOptions: function hasValueOptions(options) {
      return options && options.value;
    },
    destroyWidgets: function destroyWidgets() {
      if (this.metricWidgets) {
        this.metricWidgets.forEach(function (widget) {
          widget.destroy();
        });
      }
    },
    toggleView: function toggleView(evt) {
      this.onToggleView();
      evt.stopPropagation();
    },
    onToggleView: function onToggleView(forceOpen) {
      if (!this.isLoaded) {
        this.onLoad();
      }
      $(this.dashboardHeaderNode).toggleClass(this.collapsedClass, forceOpen);
    }
  });

  var rvm = new _RelatedViewManager2.default();
  rvm.registerType('dashboard_widget_base', __class);
  _lang2.default.setObject('crm.Views._DashboardWidgetBase', __class);
  _lang2.default.setObject('icboe._DashboardWidgetBase', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL19EYXNoYm9hcmRXaWRnZXRCYXNlLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsIm93bmVyIiwiaWQiLCJ0aXRsZVRleHQiLCJjYXRlZ29yeVRleHQiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJtZXRyaWNXaWRnZXRzIiwibWV0cmljTGF5b3V0IiwicmFuZ2VMYXlvdXQiLCJzdG9yZSIsInNlcnZpY2UiLCJzZWxlY3RlZFJhbmdlIiwidmFsdWVzIiwiZm9ybWF0dGVyIiwiYmlnTnVtYmVyIiwiY29udHJhY3ROYW1lIiwiYXV0b0xvYWQiLCJpc0xvYWRlZCIsImVuYWJsZWQiLCJyZXNvdXJjZUtpbmQiLCJxdWVyeVNlbGVjdCIsInF1ZXJ5SW5jbHVkZSIsInF1ZXJ5TmFtZSIsInF1ZXJ5V2hlcmUiLCJxdWVyeU9yZGVyQnkiLCJyZXNvdXJjZVByb3BlcnR5IiwicmVzb3VyY2VQcmVkaWNhdGUiLCJhcHBsaWNhdGlvbk5hbWUiLCJpdGVtc1Byb3BlcnR5IiwiaWRQcm9wZXJ0eSIsImxhYmVsUHJvcGVydHkiLCJlbnRpdHlQcm9wZXJ0eSIsInZlcnNpb25Qcm9wZXJ0eSIsIm1heEl0ZW1zIiwicGFnZVNpemUiLCJkYXlWYWx1ZSIsImRlY29yYXRvcnMiLCJyZWxhdGVkQ29udGVudFRlbXBsYXRlIiwiU2ltcGxhdGUiLCJkYXNoYm9hcmRUZW1wbGF0ZSIsImRhc2hib2FyZEljb25UZW1wbGF0ZSIsImRhc2hib2FyZEhlYWRlclRlbXBsYXRlRW5kIiwiZGFzaGJvYXJkSGVhZGVyVGVtcGxhdGVTdGFydCIsImRhc2hib2FyZFJhbmdlVGVtcGxhdGUiLCJyYW5nZUl0ZW1UZW1wbGF0ZSIsIm1ldHJpY0l0ZW1UZW1wbGF0ZSIsIm5vZGF0YVRlbXBsYXRlIiwib25Jbml0IiwiQXBwIiwiZ2V0U2VydmljZSIsIm9uTG9hZCIsImhhc1BhcmVudEVudHJ5IiwicGFyZW50RW50cnkiLCJwcm9taXNlIiwicmVidWlsZFZhbHVlcyIsImxvYWRpbmdOb2RlIiwiJCIsImxvYWRpbmdUZW1wbGF0ZSIsImFwcGx5IiwiZ2V0RGF0YSIsInRoZW4iLCJkYXRhIiwibGVuZ3RoIiwiZW50cnkiLCJwcm9jZXNzRW50cnkiLCJidWlsZE5vRGF0YVZpZXciLCJtZXNzYWdlIiwiYnVpbGRFcnJvclZpZXciLCJkYXNoYm9hcmRIZWFkZXJOb2RlIiwiYWNjb3JkaW9uIiwiYnVpbGRWaWV3IiwiZGVmZXJyZWQiLCJnZXRTdG9yZSIsInF1ZXJ5T3B0aW9ucyIsInF1ZXJ5UmVzdWx0cyIsInF1ZXJ5IiwiZmVlZCIsInJlc29sdmUiLCJlcnIiLCJyZWplY3QiLCJnZXRGb3JtYXR0ZWRDdXJyZW5jeUNvZGVGb3JUaXRsZSIsInJlc3VsdCIsImJhc2VDdXJyZW5jeUNvZGUiLCJnZXRCYXNlQ3VycmVuY3lDb2RlIiwiZ2V0UXVlcnlEYXRhIiwiY291bnQiLCJzdGFydCIsImdldFF1ZXJ5U3RvcmUiLCJmb3JFYWNoIiwic3RvcmVJbnN0YW5jZSIsInB1c2giLCJyZXN1bHRzIiwic2VuZFZhbHVlcyIsInJlZ2lzdGVyV2lkZ2V0Iiwid2lkZ2V0Iiwib2JqIiwiZmlsdGVyIiwiY2hlY2tGb3JWYWx1ZSIsInZhbHVlRm4iLCJ2YWx1ZUluZGV4IiwidmFsdWUiLCJhZ2dyZWdhdGUiLCJhZ2dyZWdhdGVNb2R1bGUiLCJxdWVyeUluZGV4IiwiQXJyYXkiLCJmbiIsImFwcGx5VmFsdWUiLCJvbkVycm9yIiwiZXJyb3IiLCJfb25RdWVyeUVycm9yIiwiaiIsImZvcm1hdHRlckZuIiwiZm9ybWF0dGVyTW9kdWxlIiwiZm9ybWF0TW9kdWxlIiwibW9kdWxlIiwiYWdncmVnYXRlTG9va3VwIiwiYXBwbHlEZWNvcmF0b3IiLCJmdW5jIiwiX2dldENvdW50VmFsdWUiLCJjb3VudFZhbHVlIiwiYXBwbHlEYXRhVG9XaWRnZXQiLCJkZWNvcmF0b3IiLCJnZXREZWNvcmF0b3JzIiwiY2FsbCIsInBvc2l0aXZlVHJlbmQiLCJwb3NpdGl2ZVZhbHVlQ29sb3IiLCJuZWdhdGl2ZVZhbHVlQ29sb3IiLCJtZXRyaWNXaWRnZXQiLCJzZXRWYWx1ZUNvbG9yIiwibmVnYXRpdmVUcmVuZCIsIm5hbWUiLCJ2YWx1ZU5lZWRlZCIsIm1ldHJpY0RldGFpbE5vZGUiLCJyZXBsYWNlV2l0aCIsIml0ZW1UZW1wbGF0ZSIsImRlZiIsInF1ZXJ5QXJnIiwicXVlcnlBcmdzIiwicmVzb2x2ZWQiLCJzZWxlY3QiLCJ3aGVyZSIsIl9hY3RpdmVGaWx0ZXIiLCJzZXJ2aWNlcyIsImNybSIsInNjb3BlIiwidG90YWwiLCJjb25zb2xlIiwid2FybiIsImVtcHR5IiwicHJlcGVuZCIsInN1YnN0aXR1dGUiLCJjb3VudFRpdGxlIiwiZW5jb2RlIiwibmF2VG9SZXBvcnRWaWV3IiwidmlldyIsIm5hdlRvIiwiZ2V0VmlldyIsImNoYXJ0VHlwZSIsImNoYXJ0VHlwZU1hcHBpbmciLCJwYXJlbnQiLCJzaG93IiwicmV0dXJuVG8iLCJyZXR1cm5Ub0lkIiwiYWN0aXZlRmlsdGVyIiwiY2hhbmdlUmFuZ2UiLCJzdHlsZSIsImdldENvbG9yIiwiZG9tTm9kZSIsInBhcmVudE5vZGUiLCJnZXRTZWxlY3RlZENvbG9yIiwicmVidWlsZFdpZGdldHMiLCJmcmFnIiwiZG9jdW1lbnQiLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50Iiwibm9kZSIsImFwcGVuZENoaWxkIiwiY2hpbGROb2RlcyIsIm1ldHJpY3NOb2RlIiwiYXBwZW5kIiwiZ2V0QWJydiIsImFicnYiLCJmb3JtYXRVc2VySW5pdGlhbCIsImdldE1ldHJpY0NvbG9yIiwibWV0cmljQ29sb3IiLCJpbmNsdWRlIiwib3JkZXJCeSIsImdldFdoZXJlIiwiY3JlYXRlU3RvcmUiLCJhcmciLCJyZXF1ZXN0IiwieiIsInBhc3REYXlzIiwicHJvcGVydHkiLCJmcm9tIiwidG8iLCJub3ciLCJtb21lbnQiLCJwYXN0V2Vla1N0YXJ0IiwiY2xvbmUiLCJzdWJ0cmFjdCIsInN0YXJ0T2YiLCJ0b2RheSIsImVuZE9mIiwidG9Jc29TdHJpbmdGcm9tRGF0ZSIsInRvRGF0ZSIsImZvcm1hdCIsInBhc3REYXlzTHQiLCJwYXN0RGF5IiwiaGFzVmFsaWRPcHRpb25zIiwib3B0aW9ucyIsImhhc1ZhbHVlT3B0aW9ucyIsImRlc3Ryb3lXaWRnZXRzIiwiZGVzdHJveSIsInRvZ2dsZVZpZXciLCJldnQiLCJvblRvZ2dsZVZpZXciLCJzdG9wUHJvcGFnYXRpb24iLCJmb3JjZU9wZW4iLCJ0b2dnbGVDbGFzcyIsImNvbGxhcHNlZENsYXNzIiwicnZtIiwicmVnaXN0ZXJUeXBlIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBK0JBLE1BQU1BLFdBQVcsb0JBQVkscUJBQVosQ0FBakI7O0FBRUE7Ozs7QUFJQSxNQUFNQyxVQUFVLHVCQUFRLDJDQUFSLEVBQXFELGlDQUFyRCxFQUErRSx3REFBd0Q7QUFDckpDLFdBQU8sSUFEOEk7QUFFckpDLFFBQUksdUJBRmlKO0FBR3JKQyxlQUFXSixTQUFTSSxTQUhpSTtBQUlySkMsa0JBQWNMLFNBQVNLLFlBSjhIO0FBS3JKQyxXQUFPLFNBTDhJO0FBTXJKQyxtQkFBZSxTQU5zSTtBQU9ySkMsbUJBQWUsSUFQc0k7QUFRckpDLGtCQUFjLElBUnVJO0FBU3JKQyxpQkFBYSxJQVR3STtBQVVySkMsV0FBTyxJQVY4STtBQVdySkMsYUFBUyxJQVg0STtBQVlySkMsbUJBQWUsSUFac0k7QUFhckpDLFlBQVEsSUFiNkk7QUFjckpDLGVBQVcsaUJBQVVDLFNBZGdJO0FBZXJKQyxrQkFBYyxTQWZ1STtBQWdCckpDLGNBQVUsS0FoQjJJO0FBaUJySkMsY0FBVSxLQWpCMkk7QUFrQnJKQyxhQUFTLEtBbEI0STtBQW1Ccko7Ozs7O0FBS0FDLGtCQUFjLElBeEJ1STtBQXlCcko7Ozs7QUFJQUMsaUJBQWEsSUE3QndJO0FBOEJySjs7OztBQUlBQyxrQkFBYyxJQWxDdUk7QUFtQ3JKQyxlQUFXLElBbkMwSTtBQW9Dcko7Ozs7QUFJQUMsZ0JBQVksRUF4Q3lJO0FBeUNySjs7OztBQUlBQyxrQkFBYyxFQTdDdUk7QUE4Q3JKOzs7O0FBSUFDLHNCQUFrQixJQWxEbUk7QUFtRHJKOzs7O0FBSUFDLHVCQUFtQixJQXZEa0k7QUF3RHJKQyxxQkFBaUIsSUF4RG9JO0FBeURySkMsbUJBQWUsWUF6RHNJO0FBMERySkMsZ0JBQVksTUExRHlJO0FBMkRySkMsbUJBQWUsYUEzRHNJO0FBNERySkMsb0JBQWdCLE9BNURxSTtBQTZEckpDLHFCQUFpQixPQTdEb0k7QUE4RHJKQyxjQUFVLEdBOUQySTtBQStEckpDLGNBQVUsR0EvRDJJO0FBZ0VySkMsY0FBVSxDQWhFMkk7QUFpRXJKQyxnQkFBWSxJQWpFeUk7QUFrRXJKQyw0QkFBd0IsSUFBSUMsUUFBSixDQUFhLENBQ25DLHVCQURtQyxFQUVuQyw2QkFGbUMsRUFHbkMsU0FIbUMsQ0FBYixDQWxFNkg7QUF1RXJKQyx1QkFBbUIsSUFBSUQsUUFBSixDQUFhLENBQzlCLGdDQUQ4QixFQUU5Qix3Q0FGOEIsRUFHOUIsNkNBSDhCLEVBSTlCLGtDQUo4QixFQUs5QixnRkFMOEIsRUFNOUIsUUFOOEIsRUFPOUIsUUFQOEIsRUFROUIsc0NBUjhCLENBQWIsQ0F2RWtJO0FBaUZySkUsMkJBQXVCLElBQUlGLFFBQUosQ0FBYSxDQUNsQyx5QkFEa0MsRUFFbEMsZ0dBRmtDLEVBR2xDLHNCQUhrQyxFQUlsQyxTQUprQyxFQUtsQyxTQUxrQyxDQUFiLENBakY4SDtBQXdGckpHLGdDQUE0QixJQUFJSCxRQUFKLENBQWEsQ0FDdkMsMkNBRHVDLEVBRXZDLFFBRnVDLEVBR3ZDLFNBSHVDLENBQWIsQ0F4RnlIO0FBNkZySkksa0NBQThCLElBQUlKLFFBQUosQ0FBYSxDQUN6QywyQ0FEeUMsMmlCQWV6QyxTQWZ5QyxDQUFiLENBN0Z1SDtBQThHckpLLDRCQUF3QixJQUFJTCxRQUFKLENBQWEsQ0FDbkMsaUNBRG1DLEVBRW5DLDZFQUZtQyxFQUduQyxTQUhtQyxDQUFiLENBOUc2SDtBQW1IckpNLHVCQUFtQixJQUFJTixRQUFKLENBQWEsQ0FDOUIsbUZBRDhCLEVBRTlCLFFBRjhCLENBQWIsQ0FuSGtJO0FBdUhySk8sd0JBQW9CLElBQUlQLFFBQUosQ0FBYSxDQUMvQix1R0FEK0IsRUFFL0IsUUFGK0IsQ0FBYixDQXZIaUk7QUEySHJKUSxvQkFBZ0IsSUFBSVIsUUFBSixDQUFhLENBQzNCLHFDQUQyQixFQUUzQixrQkFGMkIsRUFHM0IsUUFIMkIsQ0FBYixDQTNIcUk7QUFnSXJKUyxZQUFRLFNBQVNBLE1BQVQsR0FBa0I7QUFDeEIsV0FBS3JDLE9BQUwsR0FBZXNDLElBQUlDLFVBQUosQ0FBZSxLQUFmLENBQWY7QUFDQSxVQUFJLEtBQUtqQyxRQUFMLElBQWlCLEtBQUtFLE9BQTFCLEVBQW1DO0FBQ2pDLGFBQUtnQyxNQUFMO0FBQ0Q7QUFDRixLQXJJb0o7QUFzSXJKQyxvQkFBZ0IsU0FBU0EsY0FBVCxHQUEwQjtBQUN4QyxhQUFRLEtBQUtDLFdBQU4sR0FBcUIsSUFBckIsR0FBNEIsS0FBbkM7QUFDRCxLQXhJb0o7QUF5SXJKRixZQUFRLFNBQVNBLE1BQVQsR0FBa0I7QUFBQTs7QUFDeEIsVUFBSUcsZ0JBQUo7QUFDQSxVQUFJLENBQUMsS0FBS25DLE9BQVYsRUFBbUI7QUFDakIsZUFBT21DLE9BQVA7QUFDRDtBQUNELFdBQUtDLGFBQUw7O0FBRUEsVUFBSSxDQUFDLEtBQUtDLFdBQVYsRUFBdUI7QUFDckIsYUFBS0EsV0FBTCxHQUFtQkMsRUFBRSxLQUFLQyxlQUFMLENBQXFCQyxLQUFyQixDQUEyQixJQUEzQixDQUFGLENBQW5CO0FBQ0Q7QUFDRCxVQUFJLEtBQUtQLGNBQUwsRUFBSixFQUEyQjtBQUN6QkUsa0JBQVUsS0FBS00sT0FBTCxFQUFWO0FBQ0FOLGdCQUFRTyxJQUFSLENBQWEsVUFBQ0MsSUFBRCxFQUFVO0FBQ3JCLGNBQUlBLFFBQVFBLEtBQUtDLE1BQUwsR0FBYyxDQUExQixFQUE2QjtBQUMzQixrQkFBS0MsS0FBTCxHQUFhRixLQUFLLENBQUwsQ0FBYjtBQUNBLGtCQUFLRyxZQUFMLENBQWtCLE1BQUtELEtBQXZCO0FBQ0QsV0FIRCxNQUdPO0FBQ0wsa0JBQUtFLGVBQUwsQ0FBcUIsRUFBRUMsU0FBUyxlQUFYLEVBQXJCO0FBQ0Q7QUFDRixTQVBELEVBT0csVUFBQ0wsSUFBRCxFQUFVO0FBQ1gsZ0JBQUtNLGNBQUwsQ0FBb0JOLElBQXBCO0FBQ0QsU0FURDtBQVVELE9BWkQsTUFZTztBQUNMLGFBQUtNLGNBQUwsQ0FBb0IsRUFBcEI7QUFDRDtBQUNELFdBQUtsRCxRQUFMLEdBQWdCLElBQWhCO0FBQ0F1QyxRQUFFLEtBQUtZLG1CQUFQLEVBQTRCQyxTQUE1QjtBQUNELEtBcEtvSjtBQXFLckpMLGtCQUFjLFNBQVNBLFlBQVQsQ0FBc0JELEtBQXRCLEVBQTZCO0FBQ3pDLFdBQUtPLFNBQUwsQ0FBZVAsS0FBZjtBQUNELEtBdktvSjtBQXdLckpKLGFBQVMsU0FBU0EsT0FBVCxHQUFtQjtBQUMxQixVQUFNWSxXQUFXLHdCQUFqQjtBQUNBLFVBQU05RCxRQUFRLEtBQUsrRCxRQUFMLEVBQWQ7O0FBRUEsVUFBSS9ELEtBQUosRUFBVztBQUNULFlBQU1nRSxlQUFlLEVBQXJCO0FBQ0EsWUFBTUMsZUFBZWpFLE1BQU1rRSxLQUFOLENBQVksSUFBWixFQUFrQkYsWUFBbEIsQ0FBckI7QUFDQSw0QkFBS0MsWUFBTCxFQUFtQixVQUFDRSxJQUFELEVBQVU7QUFDM0JMLG1CQUFTTSxPQUFULENBQWlCRCxJQUFqQjtBQUNELFNBRkQsRUFFRyxVQUFDRSxHQUFELEVBQVM7QUFDVlAsbUJBQVNRLE1BQVQsQ0FBZ0IsRUFBRWIsb0JBQWtCWSxHQUFwQixFQUFoQjtBQUNELFNBSkQ7QUFLQSxlQUFPUCxTQUFTbEIsT0FBaEI7QUFDRDtBQUNEa0IsZUFBU1EsTUFBVCxDQUFnQixFQUFFYixTQUFTLGVBQVgsRUFBaEI7QUFDQSxhQUFPSyxTQUFTbEIsT0FBaEI7QUFDRCxLQXhMb0o7QUF5THJKMkIsc0NBQWtDLFNBQVNBLGdDQUFULEdBQTRDO0FBQzVFLFVBQUlDLFNBQVMsRUFBYjtBQUNBLFVBQU1DLG1CQUFtQixrQkFBUUMsbUJBQVIsRUFBekI7O0FBRUEsVUFBSUQsZ0JBQUosRUFBc0I7QUFDcEJELHVCQUFhQyxnQkFBYjtBQUNEOztBQUVELGFBQU9ELE1BQVA7QUFDRCxLQWxNb0o7QUFtTXJKRyxrQkFBYyxTQUFTQSxZQUFULEdBQXdCO0FBQUE7O0FBQ3BDLFVBQU1YLGVBQWU7QUFDbkJZLGVBQU8sS0FBS25ELFFBRE87QUFFbkJvRCxlQUFPO0FBRlksT0FBckI7QUFJQSxVQUFNWixlQUFlLEVBQXJCO0FBQ0EsVUFBTWpFLFFBQVEsS0FBSzhFLGFBQUwsRUFBZDs7QUFFQTlFLFlBQU0rRSxPQUFOLENBQWMsVUFBQ0MsYUFBRCxFQUFtQjtBQUMvQmYscUJBQWFnQixJQUFiLENBQWtCRCxjQUFjZCxLQUFkLENBQW9CLElBQXBCLEVBQTBCRixZQUExQixDQUFsQjtBQUNELE9BRkQsRUFFRyxJQUZIOztBQUlBO0FBQ0EseUJBQUlDLFlBQUosRUFBa0JkLElBQWxCLENBQXVCLFVBQUMrQixPQUFELEVBQWE7QUFDbEMsWUFBSUEsUUFBUTdCLE1BQVIsR0FBaUIsQ0FBckIsRUFBd0I7QUFDdEIsaUJBQUs4QixVQUFMLENBQWdCRCxPQUFoQjtBQUNELFNBRkQsTUFFTztBQUNMLGlCQUFLQyxVQUFMLENBQWdCRCxRQUFRLENBQVIsQ0FBaEI7QUFDRDtBQUNGLE9BTkQ7QUFPRCxLQXZOb0o7QUF3TnJKRSxvQkFBZ0IsU0FBU0EsY0FBVCxDQUF3QkMsTUFBeEIsRUFBZ0M7QUFDOUMsV0FBS3hGLGFBQUwsQ0FBbUJvRixJQUFuQixDQUF3QkksTUFBeEI7QUFDRCxLQTFOb0o7QUEyTnJKRixnQkFBWSxTQUFTQSxVQUFULENBQW9CRCxPQUFwQixFQUE2QjtBQUFBOztBQUN2QyxXQUFLckYsYUFBTCxDQUFtQmtGLE9BQW5CLENBQTJCLFVBQUNNLE1BQUQsRUFBWTtBQUNyQyxZQUFNQyxNQUFNLE9BQUtuRixNQUFMLENBQVlvRixNQUFaLENBQW1CLE9BQUtDLGFBQXhCLEVBQXVDSCxNQUF2QyxFQUErQyxDQUEvQyxDQUFaO0FBQ0EsWUFBSUksZ0JBQUo7QUFDQSxZQUFJdEYsZUFBSjtBQUNBLFlBQU11RixhQUFhLEVBQW5CO0FBQ0EsWUFBSSxDQUFDSixJQUFJSyxLQUFULEVBQWdCO0FBQ2QsY0FBSUwsSUFBSU0sU0FBUixFQUFtQjtBQUNqQixnQkFBSU4sSUFBSU8sZUFBUixFQUF5QjtBQUN2Qkosd0JBQVVILElBQUlPLGVBQUosQ0FBb0JQLElBQUlNLFNBQXhCLENBQVY7QUFDRCxhQUZELE1BRU87QUFDTEgsd0JBQVUsb0JBQWFILElBQUlNLFNBQWpCLENBQVY7QUFDRDtBQUNGO0FBQ0QsY0FBSSxFQUFFTixJQUFJUSxVQUFKLFlBQTBCQyxLQUE1QixDQUFKLEVBQXdDO0FBQ3RDO0FBQ0FMLHVCQUFXVCxJQUFYLENBQWdCSyxJQUFJUSxVQUFwQjtBQUNBM0YscUJBQVMrRSxRQUFRSSxJQUFJUSxVQUFaLENBQVQ7QUFDQSxnQ0FBS0wsT0FBTCxFQUFjLFVBQUNPLEVBQUQsRUFBUTtBQUNwQixxQkFBS0MsVUFBTCxDQUFnQlosTUFBaEIsRUFBd0JXLEVBQXhCLEVBQTRCN0YsTUFBNUIsRUFBb0N1RixVQUFwQyxFQUFnREosR0FBaEQ7QUFDRCxhQUZELEVBRUcsU0FBU1ksT0FBVCxDQUFpQkMsS0FBakIsRUFBd0I7QUFDekIsbUJBQUtDLGFBQUwsQ0FBbUJELEtBQW5CLEVBQTBCZCxNQUExQjtBQUNELGFBSkQ7QUFLRCxXQVRELE1BU087QUFDTDtBQUNBbEYscUJBQVMsRUFBVDtBQUNBLGlCQUFLLElBQUlrRyxJQUFJLENBQWIsRUFBZ0JBLElBQUlmLElBQUlRLFVBQUosQ0FBZXpDLE1BQW5DLEVBQTJDZ0QsR0FBM0MsRUFBZ0Q7QUFDOUNsRyxxQkFBTzhFLElBQVAsQ0FBWUMsUUFBUUksSUFBSVEsVUFBSixDQUFlTyxDQUFmLENBQVIsQ0FBWjtBQUNBWCx5QkFBV1QsSUFBWCxDQUFnQkssSUFBSVEsVUFBSixDQUFlTyxDQUFmLENBQWhCO0FBQ0Q7QUFDRCxnQ0FBS1osT0FBTCxFQUFjLFVBQUNPLEVBQUQsRUFBUTtBQUNwQixxQkFBS0MsVUFBTCxDQUFnQlosTUFBaEIsRUFBd0JXLEVBQXhCLEVBQTRCN0YsTUFBNUIsRUFBb0N1RixVQUFwQyxFQUFnREosR0FBaEQ7QUFDRCxhQUZELEVBRUcsU0FBU1ksT0FBVCxDQUFpQkMsS0FBakIsRUFBd0I7QUFDekIsbUJBQUtDLGFBQUwsQ0FBbUJELEtBQW5CLEVBQTBCZCxNQUExQjtBQUNELGFBSkQ7QUFLRDtBQUNGLFNBOUJELE1BOEJPO0FBQ0wsaUJBQUtZLFVBQUwsQ0FBZ0JaLE1BQWhCLEVBQXdCLElBQXhCLEVBQThCLElBQTlCLEVBQW9DSyxVQUFwQyxFQUFnREosR0FBaEQ7QUFDRDtBQUNGLE9BdENEO0FBdUNELEtBblFvSjtBQW9RckpXLGdCQUFZLFNBQVNBLFVBQVQsQ0FBb0JaLE1BQXBCLEVBQTRCSSxPQUE1QixFQUFxQ3RGLE1BQXJDLEVBQTZDdUYsVUFBN0MsRUFBeURKLEdBQXpELEVBQThEO0FBQUE7O0FBQ3hFLFVBQUlnQixvQkFBSjs7QUFFQTtBQUNBLFVBQUtqQixPQUFPa0IsZUFBUCxJQUEwQmxCLE9BQU9qRixTQUFsQyxJQUFpRGlGLE9BQU9tQixZQUFQLElBQXVCbkIsT0FBT2pGLFNBQW5GLEVBQStGO0FBQzdGLFlBQU1xRyxTQUFTcEIsT0FBT2tCLGVBQVAsSUFBMEJsQixPQUFPbUIsWUFBaEQ7QUFDQUYsc0JBQWNHLE9BQU9wQixPQUFPakYsU0FBZCxDQUFkO0FBQ0Q7O0FBRUQsVUFBSXFGLE9BQUosRUFBYTtBQUNYO0FBQ0FILFlBQUlLLEtBQUosR0FBWSxrQkFBUWUsZUFBUixDQUF3QnBCLElBQUlNLFNBQTVCLEVBQXVDSCxPQUF2QyxFQUFnREosTUFBaEQsRUFBd0RsRixNQUF4RCxDQUFaLENBRlcsQ0FFa0U7O0FBRTdFO0FBQ0EsYUFBS3dHLGNBQUwsQ0FBb0JyQixJQUFJSyxLQUF4QixFQUErQk4sTUFBL0I7QUFDRDs7QUFFRDtBQUNBLDBCQUFLaUIsV0FBTCxFQUFrQixVQUFDTSxJQUFELEVBQVU7QUFDMUIsWUFBSSxPQUFPQSxJQUFQLEtBQWdCLFVBQXBCLEVBQWdDO0FBQzlCdkIsaUJBQU9qRixTQUFQLEdBQW1Cd0csSUFBbkI7QUFDRDtBQUNGLE9BSkQ7O0FBTUE7QUFDQSxVQUFJdEIsSUFBSVYsS0FBUixFQUFlO0FBQ2IsYUFBS2lDLGNBQUwsQ0FBb0J4QixNQUFwQixFQUE0QkMsR0FBNUIsRUFBaUNuQyxJQUFqQyxDQUFzQyxVQUFDcUIsTUFBRCxFQUFZO0FBQ2hELGNBQUlBLFVBQVUsQ0FBZCxFQUFpQjtBQUNmYyxnQkFBSXdCLFVBQUosR0FBaUJ0QyxNQUFqQjtBQUNEO0FBQ0QsaUJBQUt1QyxpQkFBTCxDQUF1QjFCLE1BQXZCLEVBQStCQyxHQUEvQjtBQUNELFNBTEQ7QUFNRCxPQVBELE1BT087QUFDTCxhQUFLeUIsaUJBQUwsQ0FBdUIxQixNQUF2QixFQUErQkMsR0FBL0I7QUFDRDtBQUNGLEtBdlNvSjtBQXdTckpxQixvQkFBZ0IsU0FBU0EsY0FBVCxDQUF3QmhCLEtBQXhCLEVBQStCTixNQUEvQixFQUF1QztBQUNyRCxVQUFJQSxPQUFPMkIsU0FBWCxFQUFzQjtBQUNwQixZQUFJLE9BQU8zQixPQUFPMkIsU0FBZCxLQUE0QixVQUFoQyxFQUE0QztBQUMxQzNCLGlCQUFPMkIsU0FBUCxDQUFpQnJCLEtBQWpCLEVBQXdCTixNQUF4QjtBQUNELFNBRkQsTUFFTztBQUNMLGNBQU0xRCxhQUFhLEtBQUtzRixhQUFMLEVBQW5CO0FBQ0EsY0FBTUQsWUFBWXJGLFdBQVcwRCxPQUFPMkIsU0FBbEIsQ0FBbEI7QUFDQSxjQUFJQSxhQUFhQSxVQUFVaEIsRUFBM0IsRUFBK0I7QUFDN0JnQixzQkFBVWhCLEVBQVYsQ0FBYWtCLElBQWIsQ0FBa0JGLFNBQWxCLEVBQTZCckIsS0FBN0IsRUFBb0NOLE1BQXBDO0FBQ0Q7QUFDRjtBQUNGO0FBQ0YsS0FwVG9KO0FBcVRySjRCLG1CQUFlLFNBQVNBLGFBQVQsR0FBeUI7QUFDdEMsVUFBSSxDQUFDLEtBQUt0RixVQUFWLEVBQXNCO0FBQ3BCLGFBQUtBLFVBQUwsR0FBa0I7QUFDaEJ3Rix5QkFBZTtBQUNiQyxnQ0FBb0IsT0FEUDtBQUViQyxnQ0FBb0IsS0FGUDtBQUdickIsZ0JBQUksU0FBU0EsRUFBVCxDQUFZTCxLQUFaLEVBQW1CMkIsWUFBbkIsRUFBaUM7QUFDbkMsa0JBQUkzQixRQUFRLENBQVosRUFBZTtBQUNiMkIsNkJBQWFDLGFBQWIsQ0FBMkIsS0FBS0gsa0JBQWhDO0FBQ0QsZUFGRCxNQUVPO0FBQ0xFLDZCQUFhQyxhQUFiLENBQTJCLEtBQUtGLGtCQUFoQztBQUNEO0FBQ0Y7QUFUWSxXQURDO0FBWWhCRyx5QkFBZTtBQUNiSixnQ0FBb0IsS0FEUDtBQUViQyxnQ0FBb0IsT0FGUDtBQUdickIsZ0JBQUksU0FBU0EsRUFBVCxDQUFZTCxLQUFaLEVBQW1CMkIsWUFBbkIsRUFBaUM7QUFDbkMsa0JBQUkzQixRQUFRLENBQVosRUFBZTtBQUNiMkIsNkJBQWFDLGFBQWIsQ0FBMkIsS0FBS0gsa0JBQWhDO0FBQ0QsZUFGRCxNQUVPO0FBQ0xFLDZCQUFhQyxhQUFiLENBQTJCLEtBQUtGLGtCQUFoQztBQUNEO0FBQ0Y7QUFUWTtBQVpDLFNBQWxCO0FBd0JEO0FBQ0QsYUFBTyxLQUFLMUYsVUFBWjtBQUNELEtBalZvSjtBQWtWcko2RCxtQkFBZSxTQUFTQSxhQUFULENBQXVCRyxLQUF2QixFQUE4QjtBQUMzQyxhQUFPQSxNQUFNOEIsSUFBTixLQUFlLEtBQUtDLFdBQTNCO0FBQ0QsS0FwVm9KO0FBcVZySnRCLG1CQUFlLFNBQVNBLGFBQVQsQ0FBdUJELEtBQXZCLEVBQThCZCxNQUE5QixFQUFzQztBQUNuRHRDLFFBQUVzQyxPQUFPc0MsZ0JBQVQsRUFBMkJDLFdBQTNCLENBQXVDdkMsT0FBT3dDLFlBQVAsQ0FBb0I1RSxLQUFwQixDQUEwQixFQUFFMEMsT0FBT1EsS0FBVCxFQUExQixFQUE0Q2QsTUFBNUMsQ0FBdkM7QUFDRCxLQXZWb0o7QUF3VnJKd0Isb0JBQWdCLFNBQVNBLGNBQVQsQ0FBd0J4QixNQUF4QixFQUFnQ0MsR0FBaEMsRUFBcUM7QUFDbkQsVUFBTXdDLE1BQU0sd0JBQVo7QUFDQSxVQUFNQyxXQUFZLEtBQUtDLFNBQUwsSUFBa0IsS0FBS0EsU0FBTCxDQUFlMUMsSUFBSVEsVUFBbkIsQ0FBbkIsR0FBcUQsS0FBS2tDLFNBQUwsQ0FBZTFDLElBQUlRLFVBQW5CLENBQXJELEdBQXNGLElBQXZHO0FBQ0EsVUFBSSxDQUFDaUMsUUFBTCxFQUFlO0FBQ2JELFlBQUlHLFFBQUosQ0FBYSxDQUFDLENBQWQ7QUFDQSxlQUFPSCxJQUFJbEYsT0FBWDtBQUNEOztBQUVELFVBQU1vQixlQUFlO0FBQ25CWSxlQUFPLENBRFk7QUFFbkJDLGVBQU8sQ0FGWTtBQUduQnFELGdCQUFRLENBQUMsTUFBRCxDQUhXO0FBSW5CQyxlQUFPSixTQUFTLENBQVQsRUFBWUs7QUFKQSxPQUFyQjs7QUFPQSxVQUFNcEksUUFBUSxvQkFBVTtBQUN0QkMsaUJBQVNzQyxJQUFJOEYsUUFBSixDQUFhQyxHQURBO0FBRXRCaEksc0JBQWMsU0FGUTtBQUd0Qkksc0JBQWNxSCxTQUFTLENBQVQsQ0FIUSxFQUdLO0FBQzNCUSxlQUFPO0FBSmUsT0FBVixDQUFkOztBQU9BLFVBQU10RSxlQUFlakUsTUFBTWtFLEtBQU4sQ0FBWSxJQUFaLEVBQWtCRixZQUFsQixDQUFyQjtBQUNBLDBCQUFLQyxZQUFMLEVBQW1CLFlBQU07QUFDdkI2RCxZQUFJMUQsT0FBSixDQUFZSCxhQUFhdUUsS0FBekI7QUFDRCxPQUZELEVBRUcsVUFBQ3JDLEtBQUQsRUFBVztBQUNac0MsZ0JBQVFDLElBQVIsQ0FBYXZDLEtBQWIsRUFEWSxDQUNTO0FBQ3JCMkIsWUFBSXhELE1BQUosQ0FBVzZCLEtBQVg7QUFDRCxPQUxEO0FBTUEsYUFBTzJCLElBQUlsRixPQUFYO0FBQ0QsS0F0WG9KO0FBdVhySm1FLHVCQUFtQixTQUFTQSxpQkFBVCxDQUEyQjFCLE1BQTNCLEVBQW1DakMsSUFBbkMsRUFBeUM7QUFDMURMLFFBQUVzQyxPQUFPc0MsZ0JBQVQsRUFBMkJnQixLQUEzQjtBQUNBLFVBQUksQ0FBQ3ZGLEtBQUsrQyxLQUFWLEVBQWlCO0FBQ2YsWUFBSS9DLEtBQUt3QixLQUFMLElBQWV4QixLQUFLMEQsVUFBTCxJQUFtQixDQUF0QyxFQUEwQztBQUN4Qy9ELFlBQUVzQyxPQUFPc0MsZ0JBQVQsRUFBMkJpQixPQUEzQixDQUFtQzdGLGtDQUFnQyxpQkFBTzhGLFVBQVAsQ0FBa0J6RixLQUFLMEYsVUFBTCxHQUFrQixpQkFBVUMsTUFBVixDQUFpQjNGLEtBQUswRixVQUF0QixDQUFsQixHQUFzRCxpQkFBVUMsTUFBVixDQUFpQjFELE9BQU95RCxVQUF4QixDQUF4RSxFQUE2RyxDQUFDLGlCQUFVQyxNQUFWLENBQWlCM0YsS0FBSzBELFVBQXRCLENBQUQsQ0FBN0csQ0FBaEMsYUFBbkM7QUFDRDtBQUNGOztBQUVEL0QsUUFBRXNDLE9BQU9zQyxnQkFBVCxFQUEyQmlCLE9BQTNCLENBQW1DdkQsT0FBT3dDLFlBQVAsQ0FBb0I1RSxLQUFwQixDQUEwQixFQUFFMEMsT0FBT3ZDLEtBQUt1QyxLQUFkLEVBQTFCLEVBQWlETixNQUFqRCxDQUFuQztBQUNELEtBaFlvSjtBQWlZckoyRCxxQkFBaUIsU0FBU0EsZUFBVCxHQUEyQjtBQUMxQyxVQUFJQyxhQUFKOztBQUVBLFVBQUksS0FBS0MsS0FBVCxFQUFnQjtBQUNkRCxlQUFPMUcsSUFBSTRHLE9BQUosQ0FBWSxLQUFLRCxLQUFqQixDQUFQO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsWUFBSSxLQUFLRSxTQUFULEVBQW9CO0FBQ2xCSCxpQkFBTzFHLElBQUk0RyxPQUFKLENBQVksS0FBS0UsZ0JBQUwsQ0FBc0IsS0FBS0QsU0FBM0IsQ0FBWixDQUFQO0FBQ0FILGVBQUs3SSxTQUFMLEdBQWlCLEtBQUtBLFNBQXRCO0FBQ0Q7QUFDRjs7QUFFRCxVQUFJNkksSUFBSixFQUFVO0FBQ1JBLGFBQUtLLE1BQUwsR0FBYyxJQUFkO0FBQ0FMLGFBQUtNLElBQUwsQ0FBVSxFQUFFQyxVQUFVLEtBQUtDLFVBQWpCLEVBQTZCaEssV0FBVyxLQUFLQSxTQUE3QyxFQUF3RDBJLE9BQU8sS0FBS3VCLFlBQXBFLEVBQVY7QUFDRDtBQUNGLEtBalpvSjtBQWtackpDLGlCQUFhLFNBQVNBLFdBQVQsR0FBdUI7QUFDbEMsVUFBTVYsT0FBTyxLQUFLSyxNQUFsQjtBQUNBTCxXQUFLdkgsUUFBTCxHQUFnQixLQUFLaUUsS0FBckI7QUFDQTtBQUNBc0QsV0FBSy9JLGFBQUwsQ0FBbUIwSixLQUFuQixDQUF5QixrQkFBekIsSUFBK0NYLEtBQUtZLFFBQUwsRUFBL0M7QUFDQVosV0FBSy9JLGFBQUwsR0FBcUIsS0FBSzRKLE9BQUwsQ0FBYUMsVUFBbEM7QUFDQWQsV0FBSy9JLGFBQUwsQ0FBbUIwSixLQUFuQixDQUF5QixrQkFBekIsSUFBK0NYLEtBQUtlLGdCQUFMLEVBQS9DO0FBQ0FmLFdBQUtnQixjQUFMLENBQW9CaEIsS0FBSzNGLEtBQXpCO0FBQ0QsS0ExWm9KO0FBMlpySk8sZUFBVyxTQUFTQSxTQUFULEdBQXFCLENBQUUsQ0EzWm1IO0FBNFpySkwscUJBQWlCLFNBQVNBLGVBQVQsQ0FBeUJGLEtBQXpCLEVBQWdDO0FBQy9DLFVBQU00RyxPQUFPQyxTQUFTQyxzQkFBVCxFQUFiO0FBQ0EsVUFBTUMsT0FBT3RILEVBQUUsS0FBS1YsY0FBTCxDQUFvQlksS0FBcEIsQ0FBMEJLLEtBQTFCLEVBQWlDLElBQWpDLENBQUYsQ0FBYjtBQUNBNEcsV0FBS0ksV0FBTCxDQUFpQkQsSUFBakI7QUFDQSxVQUFJSCxLQUFLSyxVQUFMLENBQWdCbEgsTUFBaEIsR0FBeUIsQ0FBN0IsRUFBZ0M7QUFDOUJOLFVBQUUsS0FBS3lILFdBQVAsRUFBb0JDLE1BQXBCLENBQTJCUCxJQUEzQjtBQUNEO0FBQ0YsS0FuYW9KO0FBb2FySlEsYUFBUyxTQUFTQSxPQUFULEdBQW1CO0FBQzFCLFVBQUlDLE9BQU8sRUFBWDtBQUNBQSxhQUFPLGlCQUFVQyxpQkFBVixDQUE0QixLQUFLbkwsU0FBakMsQ0FBUDtBQUNBLGFBQU9rTCxJQUFQO0FBQ0QsS0F4YW9KO0FBeWFySmQsY0FBVSxTQUFTQSxRQUFULEdBQW9CO0FBQzVCLGFBQU8sS0FBS2xLLEtBQVo7QUFDRCxLQTNhb0o7QUE0YXJKa0wsb0JBQWdCLFNBQVNBLGNBQVQsR0FBMEI7QUFDeEMsYUFBUSxLQUFLQyxXQUFOLEdBQXFCLEtBQUtBLFdBQTFCLEdBQXdDLEVBQS9DO0FBQ0QsS0E5YW9KO0FBK2FySmQsc0JBQWtCLFNBQVNBLGdCQUFULEdBQTRCO0FBQzVDLGFBQU8sS0FBS3BLLGFBQVo7QUFDRCxLQWpib0o7QUFrYnJKbUUsY0FBVSxTQUFTQSxRQUFULEdBQW9CO0FBQzVCLFVBQU0vRCxRQUFRLG9CQUFVO0FBQ3RCQyxpQkFBUyxLQUFLQSxPQURRO0FBRXRCSyxzQkFBYyxLQUFLQSxZQUZHO0FBR3RCSSxzQkFBYyxLQUFLQSxZQUhHO0FBSXRCTSwwQkFBa0IsS0FBS0EsZ0JBSkQ7QUFLdEJDLDJCQUFtQixLQUFLQSxpQkFMRjtBQU10QjhKLGlCQUFTLEtBQUtuSyxZQU5RO0FBT3RCc0gsZ0JBQVEsS0FBS3ZILFdBUFM7QUFRdEJxSyxpQkFBUyxLQUFLakssWUFSUTtBQVN0Qm9ILGVBQU8sS0FBSzhDLFFBQUwsRUFUZTtBQVV0QjlKLHVCQUFlLEtBQUtBLGFBVkU7QUFXdEJDLG9CQUFZLEtBQUtBLFVBWEs7QUFZdEJDLHVCQUFlLEtBQUtBLGFBWkU7QUFhdEJDLHdCQUFnQixLQUFLQSxjQWJDO0FBY3RCQyx5QkFBaUIsS0FBS0EsZUFkQTtBQWV0QnNELGVBQU8sQ0FmZTtBQWdCdEJELGVBQU8sS0FBS3BELFFBaEJVO0FBaUJ0QitHLGVBQU87QUFqQmUsT0FBVixDQUFkO0FBbUJBLGFBQU92SSxLQUFQO0FBQ0QsS0F2Y29KO0FBd2NySmlMLGNBQVUsU0FBU0EsUUFBVCxHQUFvQjtBQUM1QixhQUFPLEtBQUtuSyxVQUFaO0FBQ0QsS0ExY29KO0FBMmNySmdFLG1CQUFlLFNBQVNBLGFBQVQsR0FBeUI7QUFDdEMsVUFBTTlFLFFBQVEsRUFBZDs7QUFFQSxVQUFJLEVBQUUsS0FBS2dJLFNBQUwsWUFBMEJqQyxLQUE1QixLQUFzQyxLQUFLaUMsU0FBL0MsRUFBMEQ7QUFDeEQsYUFBS0EsU0FBTCxHQUFpQixDQUFDLEtBQUtBLFNBQU4sQ0FBakI7QUFDRDtBQUNELFVBQUksQ0FBQyxLQUFLbkgsU0FBVixFQUFxQjtBQUNuQixhQUFLQSxTQUFMLEdBQWlCLGVBQWpCO0FBQ0Q7O0FBRUQsV0FBS21ILFNBQUwsQ0FBZWpELE9BQWYsQ0FBdUIsU0FBU21HLFdBQVQsQ0FBcUJDLEdBQXJCLEVBQTBCO0FBQy9DbkwsY0FBTWlGLElBQU4sQ0FBVyxvQkFBVTtBQUNuQm1HLG1CQUFTLEtBQUtBLE9BREs7QUFFbkJuTCxtQkFBU3NDLElBQUk4RixRQUFKLENBQWFDLEdBRkg7QUFHbkI1SCx3QkFBY3lLLElBQUksQ0FBSixDQUhLO0FBSW5CbEssNkJBQW1CLEtBQUtBLGlCQUpMO0FBS25CWCx3QkFBYyxLQUFLQSxZQUxBO0FBTW5CTyxxQkFBVyxLQUFLQSxTQU5HO0FBT25CbUgscUJBQVdtRCxJQUFJLENBQUosQ0FQUTtBQVFuQkgsbUJBQVMsS0FBS2pLLFlBUks7QUFTbkJLLHNCQUFZLEtBQUtBLFVBVEU7QUFVbkJGLDJCQUFpQixLQUFLQSxlQVZIO0FBV25CcUgsaUJBQU87QUFYWSxTQUFWLENBQVg7QUFhRCxPQWRELEVBY0csSUFkSDs7QUFnQkEsYUFBT3ZJLEtBQVA7QUFDRCxLQXRlb0o7QUF1ZXJKaUssb0JBQWdCLFNBQVNBLGNBQVQsR0FBMEIsQ0FBRSxDQXZleUc7QUF3ZXJKcEgsbUJBQWUsU0FBU0EsYUFBVCxHQUF5QjtBQUN0QztBQUNBLFdBQUssSUFBSXdJLElBQUksQ0FBYixFQUFnQkEsSUFBSSxLQUFLbEwsTUFBTCxDQUFZa0QsTUFBaEMsRUFBd0NnSSxHQUF4QyxFQUE2QztBQUMzQyxhQUFLbEwsTUFBTCxDQUFZa0wsQ0FBWixFQUFlMUYsS0FBZixHQUF1QixJQUF2QjtBQUNBLFlBQUksS0FBS3hGLE1BQUwsQ0FBWWtMLENBQVosRUFBZXpHLEtBQWYsSUFBd0IsQ0FBNUIsRUFBK0I7QUFDN0IsZUFBS3pFLE1BQUwsQ0FBWWtMLENBQVosRUFBZXpHLEtBQWYsR0FBdUIsSUFBdkI7QUFDRDtBQUNGO0FBQ0YsS0FoZm9KO0FBaWZySjs7OztBQUlBMEcsY0FBVSxTQUFTQSxRQUFULENBQWtCQyxRQUFsQixFQUE0QkMsSUFBNUIsRUFBa0NDLEVBQWxDLEVBQXNDO0FBQzlDLFVBQU1DLE1BQU1DLFFBQVo7QUFDQSxVQUFNQyxnQkFBZ0JGLElBQUlHLEtBQUosR0FBWUMsUUFBWixDQUFxQk4sSUFBckIsRUFBMkIsTUFBM0IsRUFBbUNPLE9BQW5DLENBQTJDLEtBQTNDLENBQXRCO0FBQ0EsVUFBSUMsY0FBSjs7QUFFQSxVQUFJLENBQUNQLEVBQUwsRUFBUztBQUNQTyxnQkFBUU4sSUFBSUcsS0FBSixHQUFZSSxLQUFaLENBQWtCLEtBQWxCLENBQVI7QUFDRCxPQUZELE1BRU87QUFDTEQsZ0JBQVFOLElBQUlHLEtBQUosR0FBWUMsUUFBWixDQUFxQkwsRUFBckIsRUFBeUIsTUFBekIsRUFBaUNRLEtBQWpDLENBQXVDLEtBQXZDLENBQVI7QUFDRDs7QUFFRCxVQUFNL0gsZUFBYXFILFFBQWIsa0JBQWtDLGtCQUFRVyxtQkFBUixDQUE0Qk4sY0FBY08sTUFBZCxFQUE1QixDQUFsQyxlQUErRixrQkFBUUQsbUJBQVIsQ0FBNEJGLE1BQU1HLE1BQU4sRUFBNUIsQ0FBL0YsZUFBb0paLFFBQXBKLGtCQUF5S0ssY0FBY1EsTUFBZCxDQUFxQix3QkFBckIsQ0FBekssZUFBaU9KLE1BQU1JLE1BQU4sQ0FBYSx3QkFBYixDQUFqTyxRQUFOO0FBQ0EsYUFBT2xJLEtBQVA7QUFDRCxLQWxnQm9KO0FBbWdCcko7Ozs7QUFJQW1JLGdCQUFZLFNBQVNBLFVBQVQsQ0FBb0JkLFFBQXBCLEVBQThCO0FBQ3hDLFVBQU1HLE1BQU1DLFFBQVo7QUFDQSxVQUFNVyxVQUFVWixJQUFJRyxLQUFKLEdBQVlDLFFBQVosQ0FBcUIsS0FBS3BLLFFBQTFCLEVBQW9DLE1BQXBDLEVBQTRDcUssT0FBNUMsQ0FBb0QsS0FBcEQsQ0FBaEI7O0FBRUEsVUFBTTdILGNBQVlxSCxRQUFaLGFBQTRCLGtCQUFRVyxtQkFBUixDQUE0QkksUUFBUUgsTUFBUixFQUE1QixDQUE1QixjQUFrRlosUUFBbEYsYUFBa0dlLFFBQVFGLE1BQVIsQ0FBZSx3QkFBZixDQUFsRyxRQUFOO0FBQ0EsYUFBT2xJLEtBQVA7QUFDRCxLQTdnQm9KO0FBOGdCckpxSSxxQkFBaUIsU0FBU0EsZUFBVCxDQUF5QkMsT0FBekIsRUFBa0M7QUFDakQsYUFBT0EsV0FDQUEsUUFBUTlFLFdBRGY7QUFFRCxLQWpoQm9KO0FBa2hCckorRSxxQkFBaUIsU0FBU0EsZUFBVCxDQUF5QkQsT0FBekIsRUFBa0M7QUFDakQsYUFBT0EsV0FDQUEsUUFBUTdHLEtBRGY7QUFFRCxLQXJoQm9KO0FBc2hCckorRyxvQkFBZ0IsU0FBU0EsY0FBVCxHQUEwQjtBQUN4QyxVQUFJLEtBQUs3TSxhQUFULEVBQXdCO0FBQ3RCLGFBQUtBLGFBQUwsQ0FBbUJrRixPQUFuQixDQUEyQixVQUFDTSxNQUFELEVBQVk7QUFDckNBLGlCQUFPc0gsT0FBUDtBQUNELFNBRkQ7QUFHRDtBQUNGLEtBNWhCb0o7QUE2aEJySkMsZ0JBQVksU0FBU0EsVUFBVCxDQUFvQkMsR0FBcEIsRUFBeUI7QUFDbkMsV0FBS0MsWUFBTDtBQUNBRCxVQUFJRSxlQUFKO0FBQ0QsS0FoaUJvSjtBQWlpQnJKRCxrQkFBYyxTQUFTQSxZQUFULENBQXNCRSxTQUF0QixFQUFpQztBQUM3QyxVQUFJLENBQUMsS0FBS3hNLFFBQVYsRUFBb0I7QUFDbEIsYUFBS2lDLE1BQUw7QUFDRDtBQUNETSxRQUFFLEtBQUtZLG1CQUFQLEVBQTRCc0osV0FBNUIsQ0FBd0MsS0FBS0MsY0FBN0MsRUFBNkRGLFNBQTdEO0FBQ0Q7QUF0aUJvSixHQUF2SSxDQUFoQjs7QUF5aUJBLE1BQU1HLE1BQU0sa0NBQVo7QUFDQUEsTUFBSUMsWUFBSixDQUFpQix1QkFBakIsRUFBMEM5TixPQUExQztBQUNBLGlCQUFLK04sU0FBTCxDQUFlLGdDQUFmLEVBQWlEL04sT0FBakQ7QUFDQSxpQkFBSytOLFNBQUwsQ0FBZSw0QkFBZixFQUE2Qy9OLE9BQTdDO29CQUNlQSxPIiwiZmlsZSI6Il9EYXNoYm9hcmRXaWRnZXRCYXNlLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IHdoZW4gZnJvbSAnZG9qby93aGVuJztcclxuaW1wb3J0IGFsbCBmcm9tICdkb2pvL3Byb21pc2UvYWxsJztcclxuaW1wb3J0IERlZmVycmVkIGZyb20gJ2Rvam8vX2Jhc2UvRGVmZXJyZWQnO1xyXG5pbXBvcnQgY3JtRm9ybWF0IGZyb20gJy4uLy4uL0Zvcm1hdCc7XHJcbmltcG9ydCBjcm1BZ2dyZWdhdGUgZnJvbSAnLi4vLi4vQWdncmVnYXRlJztcclxuaW1wb3J0IGNvbnZlcnQgZnJvbSAnYXJnb3MvQ29udmVydCc7XHJcbmltcG9ydCBSZWxhdGVkVmlld01hbmFnZXIgZnJvbSAnYXJnb3MvUmVsYXRlZFZpZXdNYW5hZ2VyJztcclxuaW1wb3J0IF9SZWxhdGVkVmlld1dpZGdldEJhc2UgZnJvbSAnYXJnb3MvX1JlbGF0ZWRWaWV3V2lkZ2V0QmFzZSc7XHJcbmltcG9ydCBTRGF0YSBmcm9tICdhcmdvcy9TdG9yZS9TRGF0YSc7XHJcbmltcG9ydCBVdGlsaXR5IGZyb20gJy4vVXRpbGl0eSc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuaW1wb3J0IHN0cmluZyBmcm9tICdkb2pvL3N0cmluZyc7XHJcblxyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnZGFzaGJvYXJkV2lkZ2V0QmFzZScpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uSW50ZWdyYXRpb25zLkJPRS5fRGFzaGJvYXJkV2lkZ2V0QmFzZVxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5fUmVsYXRlZFZpZXdXaWRnZXRCYXNlXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuX0Rhc2hib2FyZFdpZGdldEJhc2UnLCBbX1JlbGF0ZWRWaWV3V2lkZ2V0QmFzZV0sIC8qKiBAbGVuZHMgY3JtLkludGVncmF0aW9ucy5CT0UuX0Rhc2hib2FyZFdpZGdldEJhc2UjICove1xyXG4gIG93bmVyOiBudWxsLFxyXG4gIGlkOiAnZGFzaGJvYXJkLXdpZGdldC1iYXNlJyxcclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBjYXRlZ29yeVRleHQ6IHJlc291cmNlLmNhdGVnb3J5VGV4dCxcclxuICBjb2xvcjogJyM0YjU2NTYnLFxyXG4gIHNlbGVjdGVkQ29sb3I6ICcjNGIxMjEyJyxcclxuICBtZXRyaWNXaWRnZXRzOiBudWxsLFxyXG4gIG1ldHJpY0xheW91dDogbnVsbCxcclxuICByYW5nZUxheW91dDogbnVsbCxcclxuICBzdG9yZTogbnVsbCxcclxuICBzZXJ2aWNlOiBudWxsLFxyXG4gIHNlbGVjdGVkUmFuZ2U6IG51bGwsXHJcbiAgdmFsdWVzOiBudWxsLFxyXG4gIGZvcm1hdHRlcjogY3JtRm9ybWF0LmJpZ051bWJlcixcclxuICBjb250cmFjdE5hbWU6ICdkeW5hbWljJyxcclxuICBhdXRvTG9hZDogZmFsc2UsXHJcbiAgaXNMb2FkZWQ6IGZhbHNlLFxyXG4gIGVuYWJsZWQ6IGZhbHNlLFxyXG4gIC8qKlxyXG4gICogQGNmZyB7U3RyaW5nfSByZXNvdXJjZUtpbmRcclxuICAqIFRoZSBTRGF0YSByZXNvdXJjZSBraW5kIHRoZSB2aWV3IGlzIHJlc3BvbnNpYmxlIGZvci4gIFRoaXMgd2lsbCBiZSB1c2VkIGFzIHRoZSBkZWZhdWx0IHJlc291cmNlIGtpbmRcclxuICAqIGZvciBhbGwgU0RhdGEgcmVxdWVzdHMuXHJcbiAgKi9cclxuICByZXNvdXJjZUtpbmQ6IG51bGwsXHJcbiAgLyoqXHJcbiAgICogQGNmZyB7U3RyaW5nW119XHJcbiAgICogQSBsaXN0IG9mIGZpZWxkcyB0byBiZSBzZWxlY3RlZCBpbiBhbiBTRGF0YSByZXF1ZXN0LlxyXG4gICAqL1xyXG4gIHF1ZXJ5U2VsZWN0OiBudWxsLFxyXG4gIC8qKlxyXG4gICAqIEBjZmcge1N0cmluZ1tdP31cclxuICAgKiBBIGxpc3Qgb2YgY2hpbGQgcHJvcGVydGllcyB0byBiZSBpbmNsdWRlZCBpbiBhbiBTRGF0YSByZXF1ZXN0LlxyXG4gICAqL1xyXG4gIHF1ZXJ5SW5jbHVkZTogbnVsbCxcclxuICBxdWVyeU5hbWU6IG51bGwsXHJcbiAgLyoqXHJcbiAgICogQGNmZyB7U3RyaW5nfVxyXG4gICAqIEEgd2hlcmUgY2xhdXNlIHRvIGZpbHRlciB0aGUgIFNEYXRhIHJlcXVlc3QuXHJcbiAgICovXHJcbiAgcXVlcnlXaGVyZTogJycsXHJcbiAgLyoqXHJcbiAgICogQGNmZyB7U3RyaW5nfVxyXG4gICAqIEEgb3JkZXJCeSBjbGF1c2UgdG8gc29ydCB0aGUgIFNEYXRhIHJlcXVlc3QuXHJcbiAgICovXHJcbiAgcXVlcnlPcmRlckJ5OiAnJyxcclxuICAvKipcclxuICAgKiBAY2ZnIHtTdHJpbmc/L0Z1bmN0aW9uP31cclxuICAgKiBUaGUgZGVmYXVsdCByZXNvdXJjZSBwcm9wZXJ0eSBmb3IgYW4gU0RhdGEgcmVxdWVzdC5cclxuICAgKi9cclxuICByZXNvdXJjZVByb3BlcnR5OiBudWxsLFxyXG4gIC8qKlxyXG4gICAqIEBjZmcge1N0cmluZz8vRnVuY3Rpb24/fVxyXG4gICAqIFRoZSBkZWZhdWx0IHJlc291cmNlIHByZWRpY2F0ZSBmb3IgYW4gU0RhdGEgcmVxdWVzdC5cclxuICAgKi9cclxuICByZXNvdXJjZVByZWRpY2F0ZTogbnVsbCxcclxuICBhcHBsaWNhdGlvbk5hbWU6IG51bGwsXHJcbiAgaXRlbXNQcm9wZXJ0eTogJyRyZXNvdXJjZXMnLFxyXG4gIGlkUHJvcGVydHk6ICcka2V5JyxcclxuICBsYWJlbFByb3BlcnR5OiAnJGRlc2NyaXB0b3InLFxyXG4gIGVudGl0eVByb3BlcnR5OiAnJG5hbWUnLFxyXG4gIHZlcnNpb25Qcm9wZXJ0eTogJyRldGFnJyxcclxuICBtYXhJdGVtczogNTAwLFxyXG4gIHBhZ2VTaXplOiAxMDAsXHJcbiAgZGF5VmFsdWU6IDcsXHJcbiAgZGVjb3JhdG9yczogbnVsbCxcclxuICByZWxhdGVkQ29udGVudFRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJ3slIGlmKCQuZW5hYmxlZCkgeyAlfScsXHJcbiAgICAneyUhICQkLmRhc2hib2FyZFRlbXBsYXRlICV9JyxcclxuICAgICd7JSB9ICV9JyxcclxuICBdKSxcclxuICBkYXNoYm9hcmRUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGNsYXNzPVwiZGFzaGJvYXJkLXdpZGdldFwiPicsXHJcbiAgICAneyUhICQkLmRhc2hib2FyZEhlYWRlclRlbXBsYXRlU3RhcnQgJX0nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJub2RlLWNvbnRhaW5lciBhY2NvcmRpb24tcGFuZVwiPicsXHJcbiAgICAneyUhICQkLmRhc2hib2FyZFJhbmdlVGVtcGxhdGUgJX0nLFxyXG4gICAgJzxkaXYgZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cIm1ldHJpY3NOb2RlXCIgY2xhc3M9XCJkYXNoYm9hcmQtbWV0cmljLWxpc3RcIj48L2Rpdj4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgICAnPC9kaXY+JyxcclxuICAgICd7JSEgJCQuZGFzaGJvYXJkSGVhZGVyVGVtcGxhdGVFbmQgJX0nLFxyXG4gIF0pLFxyXG4gIGRhc2hib2FyZEljb25UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICd7JSBpZigkLnRpdGxlVGV4dCkgeyAlfScsXHJcbiAgICAnPHNwYW4gY2xhc3M9XCJkYXNoYm9hcmQtaWNvbiByb3VuZCBpbmZvIGJhZGdlXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOnslPSAkJC5nZXRDb2xvcigkKSAlfVwiID4nLFxyXG4gICAgJ3slOiAkJC5nZXRBYnJ2KCQpICV9JyxcclxuICAgICc8L3NwYW4+JyxcclxuICAgICd7JSB9ICV9JyxcclxuICBdKSxcclxuICBkYXNoYm9hcmRIZWFkZXJUZW1wbGF0ZUVuZDogbmV3IFNpbXBsYXRlKFtcclxuICAgICd7JSBpZigkLnRpdGxlVGV4dCB8fCAkLmNhdGVnb3J5VGV4dCkgeyAlfScsXHJcbiAgICAnPC9kaXY+JyxcclxuICAgICd7JSB9ICV9JyxcclxuICBdKSxcclxuICBkYXNoYm9hcmRIZWFkZXJUZW1wbGF0ZVN0YXJ0OiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJ3slIGlmKCQudGl0bGVUZXh0IHx8ICQuY2F0ZWdvcnlUZXh0KSB7ICV9JyxcclxuICAgIGA8ZGl2IGNsYXNzPVwiZGFzaGJvYXJkLWhlYWRlciBhY2NvcmRpb25cIiBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwiZGFzaGJvYXJkSGVhZGVyTm9kZVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYWNjb3JkaW9uLWhlYWRlciBpcy1zZWxlY3RlZFwiPlxyXG4gICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJkYXNoYm9hcmQtaGVhZGVyLXRleHRcIj5cclxuICAgICAgICB7JSEgJCQuZGFzaGJvYXJkSWNvblRlbXBsYXRlICV9XHJcbiAgICAgICAgeyUgaWYoJC50aXRsZVRleHQpIHsgJX1cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXNoYm9hcmQtdGl0bGVcIj57JTogKCQudGl0bGVUZXh0KSAlfSB7JTogJCQuZ2V0Rm9ybWF0dGVkQ3VycmVuY3lDb2RlRm9yVGl0bGUoKSAlfTwvZGl2PlxyXG4gICAgICAgIHslIH0gJX1cclxuICAgICAgICB7JSBpZigkLmNhdGVnb3J5VGV4dCkgeyAlfVxyXG4gICAgICAgICA8ZGl2IGNsYXNzPVwiZGFzaGJvYXJkLWNhdGVnb3J5XCI+eyU6ICgkLmNhdGVnb3J5VGV4dCkgJX08L2Rpdj5cclxuICAgICAgICB7JSB9ICV9XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgXSksXHJcbiAgZGFzaGJvYXJkUmFuZ2VUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICd7JSBpZigkLmNyZWF0ZVJhbmdlTGF5b3V0KSB7ICV9JyxcclxuICAgICc8ZGl2IGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJyYW5nZU5vZGVcIiBjbGFzcz1cImRhc2hib2FyZC1yYW5nZS1saXN0XCI+PC9kaXY+JyxcclxuICAgICd7JSB9ICV9JyxcclxuICBdKSxcclxuICByYW5nZUl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGNsYXNzPVwiZGFzaGJvYXJkLXJhbmdlLWl0ZW1cIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6eyU9ICQkLmdldENvbG9yKCQpICV9XCI+JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gIF0pLFxyXG4gIG1ldHJpY0l0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGNsYXNzPVwiZGFzaGJvYXJkLW1ldHJpYy1pdGVtIHslOiAkLmNscyAlfVwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjp7JT0gJCQuZ2V0TWV0cmljQ29sb3IoJCkgJX1cIj4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgXSksXHJcbiAgbm9kYXRhVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGRpdiBjbGFzcz1cImRhc2hib2FyZC1ub2RhdGFmb3VuZFwiPicsXHJcbiAgICAneyU6ICQubWVzc2FnZSAlfScsXHJcbiAgICAnPC9kaXY+JyxcclxuICBdKSxcclxuICBvbkluaXQ6IGZ1bmN0aW9uIG9uSW5pdCgpIHtcclxuICAgIHRoaXMuc2VydmljZSA9IEFwcC5nZXRTZXJ2aWNlKGZhbHNlKTtcclxuICAgIGlmICh0aGlzLmF1dG9Mb2FkICYmIHRoaXMuZW5hYmxlZCkge1xyXG4gICAgICB0aGlzLm9uTG9hZCgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgaGFzUGFyZW50RW50cnk6IGZ1bmN0aW9uIGhhc1BhcmVudEVudHJ5KCkge1xyXG4gICAgcmV0dXJuICh0aGlzLnBhcmVudEVudHJ5KSA/IHRydWUgOiBmYWxzZTtcclxuICB9LFxyXG4gIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xyXG4gICAgbGV0IHByb21pc2U7XHJcbiAgICBpZiAoIXRoaXMuZW5hYmxlZCkge1xyXG4gICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgIH1cclxuICAgIHRoaXMucmVidWlsZFZhbHVlcygpO1xyXG5cclxuICAgIGlmICghdGhpcy5sb2FkaW5nTm9kZSkge1xyXG4gICAgICB0aGlzLmxvYWRpbmdOb2RlID0gJCh0aGlzLmxvYWRpbmdUZW1wbGF0ZS5hcHBseSh0aGlzKSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5oYXNQYXJlbnRFbnRyeSgpKSB7XHJcbiAgICAgIHByb21pc2UgPSB0aGlzLmdldERhdGEoKTtcclxuICAgICAgcHJvbWlzZS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICB0aGlzLmVudHJ5ID0gZGF0YVswXTtcclxuICAgICAgICAgIHRoaXMucHJvY2Vzc0VudHJ5KHRoaXMuZW50cnkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmJ1aWxkTm9EYXRhVmlldyh7IG1lc3NhZ2U6ICdubyBkYXRhIGZvdW5kJyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIChkYXRhKSA9PiB7XHJcbiAgICAgICAgdGhpcy5idWlsZEVycm9yVmlldyhkYXRhKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmJ1aWxkRXJyb3JWaWV3KHt9KTtcclxuICAgIH1cclxuICAgIHRoaXMuaXNMb2FkZWQgPSB0cnVlO1xyXG4gICAgJCh0aGlzLmRhc2hib2FyZEhlYWRlck5vZGUpLmFjY29yZGlvbigpO1xyXG4gIH0sXHJcbiAgcHJvY2Vzc0VudHJ5OiBmdW5jdGlvbiBwcm9jZXNzRW50cnkoZW50cnkpIHtcclxuICAgIHRoaXMuYnVpbGRWaWV3KGVudHJ5KTtcclxuICB9LFxyXG4gIGdldERhdGE6IGZ1bmN0aW9uIGdldERhdGEoKSB7XHJcbiAgICBjb25zdCBkZWZlcnJlZCA9IG5ldyBEZWZlcnJlZCgpO1xyXG4gICAgY29uc3Qgc3RvcmUgPSB0aGlzLmdldFN0b3JlKCk7XHJcblxyXG4gICAgaWYgKHN0b3JlKSB7XHJcbiAgICAgIGNvbnN0IHF1ZXJ5T3B0aW9ucyA9IHt9O1xyXG4gICAgICBjb25zdCBxdWVyeVJlc3VsdHMgPSBzdG9yZS5xdWVyeShudWxsLCBxdWVyeU9wdGlvbnMpO1xyXG4gICAgICB3aGVuKHF1ZXJ5UmVzdWx0cywgKGZlZWQpID0+IHtcclxuICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGZlZWQpO1xyXG4gICAgICB9LCAoZXJyKSA9PiB7XHJcbiAgICAgICAgZGVmZXJyZWQucmVqZWN0KHsgbWVzc2FnZTogYGVycm9yOiR7ZXJyfWAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgIH1cclxuICAgIGRlZmVycmVkLnJlamVjdCh7IG1lc3NhZ2U6ICdubyBkYXRhIGZvdW5kJyB9KTtcclxuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gIH0sXHJcbiAgZ2V0Rm9ybWF0dGVkQ3VycmVuY3lDb2RlRm9yVGl0bGU6IGZ1bmN0aW9uIGdldEZvcm1hdHRlZEN1cnJlbmN5Q29kZUZvclRpdGxlKCkge1xyXG4gICAgbGV0IHJlc3VsdCA9ICcnO1xyXG4gICAgY29uc3QgYmFzZUN1cnJlbmN5Q29kZSA9IFV0aWxpdHkuZ2V0QmFzZUN1cnJlbmN5Q29kZSgpO1xyXG5cclxuICAgIGlmIChiYXNlQ3VycmVuY3lDb2RlKSB7XHJcbiAgICAgIHJlc3VsdCA9IGAoJHtiYXNlQ3VycmVuY3lDb2RlfSlgO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfSxcclxuICBnZXRRdWVyeURhdGE6IGZ1bmN0aW9uIGdldFF1ZXJ5RGF0YSgpIHtcclxuICAgIGNvbnN0IHF1ZXJ5T3B0aW9ucyA9IHtcclxuICAgICAgY291bnQ6IHRoaXMucGFnZVNpemUsXHJcbiAgICAgIHN0YXJ0OiAwLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHF1ZXJ5UmVzdWx0cyA9IFtdO1xyXG4gICAgY29uc3Qgc3RvcmUgPSB0aGlzLmdldFF1ZXJ5U3RvcmUoKTtcclxuXHJcbiAgICBzdG9yZS5mb3JFYWNoKChzdG9yZUluc3RhbmNlKSA9PiB7XHJcbiAgICAgIHF1ZXJ5UmVzdWx0cy5wdXNoKHN0b3JlSW5zdGFuY2UucXVlcnkobnVsbCwgcXVlcnlPcHRpb25zKSk7XHJcbiAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAvLyBNYWludGFpbiB0aGUgcXVlcnkgb3JkZXIgaW4gdGhlIGRhdGEgZnJvbSB0aGUgcmVzb2x2ZVxyXG4gICAgYWxsKHF1ZXJ5UmVzdWx0cykudGhlbigocmVzdWx0cykgPT4ge1xyXG4gICAgICBpZiAocmVzdWx0cy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgdGhpcy5zZW5kVmFsdWVzKHJlc3VsdHMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc2VuZFZhbHVlcyhyZXN1bHRzWzBdKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICByZWdpc3RlcldpZGdldDogZnVuY3Rpb24gcmVnaXN0ZXJXaWRnZXQod2lkZ2V0KSB7XHJcbiAgICB0aGlzLm1ldHJpY1dpZGdldHMucHVzaCh3aWRnZXQpO1xyXG4gIH0sXHJcbiAgc2VuZFZhbHVlczogZnVuY3Rpb24gc2VuZFZhbHVlcyhyZXN1bHRzKSB7XHJcbiAgICB0aGlzLm1ldHJpY1dpZGdldHMuZm9yRWFjaCgod2lkZ2V0KSA9PiB7XHJcbiAgICAgIGNvbnN0IG9iaiA9IHRoaXMudmFsdWVzLmZpbHRlcih0aGlzLmNoZWNrRm9yVmFsdWUsIHdpZGdldClbMF07XHJcbiAgICAgIGxldCB2YWx1ZUZuO1xyXG4gICAgICBsZXQgdmFsdWVzO1xyXG4gICAgICBjb25zdCB2YWx1ZUluZGV4ID0gW107XHJcbiAgICAgIGlmICghb2JqLnZhbHVlKSB7XHJcbiAgICAgICAgaWYgKG9iai5hZ2dyZWdhdGUpIHtcclxuICAgICAgICAgIGlmIChvYmouYWdncmVnYXRlTW9kdWxlKSB7XHJcbiAgICAgICAgICAgIHZhbHVlRm4gPSBvYmouYWdncmVnYXRlTW9kdWxlW29iai5hZ2dyZWdhdGVdO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFsdWVGbiA9IGNybUFnZ3JlZ2F0ZVtvYmouYWdncmVnYXRlXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEob2JqLnF1ZXJ5SW5kZXggaW5zdGFuY2VvZiBBcnJheSkpIHtcclxuICAgICAgICAgIC8vIFNpbmdsZSBxdWVyeSwgc28gZ2V0IHRoZSBzaW5nbGUgaW5kZXggdmFsdWUgZnJvbSB0aGUgcmVzdWx0c1xyXG4gICAgICAgICAgdmFsdWVJbmRleC5wdXNoKG9iai5xdWVyeUluZGV4KTtcclxuICAgICAgICAgIHZhbHVlcyA9IHJlc3VsdHNbb2JqLnF1ZXJ5SW5kZXhdO1xyXG4gICAgICAgICAgd2hlbih2YWx1ZUZuLCAoZm4pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hcHBseVZhbHVlKHdpZGdldCwgZm4sIHZhbHVlcywgdmFsdWVJbmRleCwgb2JqKTtcclxuICAgICAgICAgIH0sIGZ1bmN0aW9uIG9uRXJyb3IoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5fb25RdWVyeUVycm9yKGVycm9yLCB3aWRnZXQpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIE11bHRpIHF1ZXJ5LCBzbyBwdWxsIHRoZSBpbmRpY2VzIGFuZCBhZGQgdGhlbSB0byBhIHJlc3VsdCBhcnJheSB0byBwYXNzIHRvIHRoZSBhZ2dyZWdhdGUgZnVuY3Rpb25cclxuICAgICAgICAgIHZhbHVlcyA9IFtdO1xyXG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBvYmoucXVlcnlJbmRleC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICB2YWx1ZXMucHVzaChyZXN1bHRzW29iai5xdWVyeUluZGV4W2pdXSk7XHJcbiAgICAgICAgICAgIHZhbHVlSW5kZXgucHVzaChvYmoucXVlcnlJbmRleFtqXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB3aGVuKHZhbHVlRm4sIChmbikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFwcGx5VmFsdWUod2lkZ2V0LCBmbiwgdmFsdWVzLCB2YWx1ZUluZGV4LCBvYmopO1xyXG4gICAgICAgICAgfSwgZnVuY3Rpb24gb25FcnJvcihlcnJvcikge1xyXG4gICAgICAgICAgICB0aGlzLl9vblF1ZXJ5RXJyb3IoZXJyb3IsIHdpZGdldCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5hcHBseVZhbHVlKHdpZGdldCwgbnVsbCwgbnVsbCwgdmFsdWVJbmRleCwgb2JqKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBhcHBseVZhbHVlOiBmdW5jdGlvbiBhcHBseVZhbHVlKHdpZGdldCwgdmFsdWVGbiwgdmFsdWVzLCB2YWx1ZUluZGV4LCBvYmopIHtcclxuICAgIGxldCBmb3JtYXR0ZXJGbjtcclxuXHJcbiAgICAvLyBTYWxlcyBkYXNoYm9hcmQgd2lkZ2V0IGlzIHVzaW5nIGZvcm1hdE1vZHVsZSwgYnV0IGFsbCBvZiB0aGUgb3RoZXJzIGFyZSB1c2luZyBmb3JtYXR0ZXJNb2R1bGUuIEFjY2VwdCBib3RoIHNvIG92ZXJyaWRlcyBoYXBwZW4gY29ycmVjdGx5LlxyXG4gICAgaWYgKCh3aWRnZXQuZm9ybWF0dGVyTW9kdWxlICYmIHdpZGdldC5mb3JtYXR0ZXIpIHx8ICh3aWRnZXQuZm9ybWF0TW9kdWxlICYmIHdpZGdldC5mb3JtYXR0ZXIpKSB7XHJcbiAgICAgIGNvbnN0IG1vZHVsZSA9IHdpZGdldC5mb3JtYXR0ZXJNb2R1bGUgfHwgd2lkZ2V0LmZvcm1hdE1vZHVsZTtcclxuICAgICAgZm9ybWF0dGVyRm4gPSBtb2R1bGVbd2lkZ2V0LmZvcm1hdHRlcl07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHZhbHVlRm4pIHtcclxuICAgICAgLy8gSWYgdGhlcmUgaXMgYSBmdW5jdGlvbiB0byBjYWxsLCBjYWxsIGl0IGFuZCBhcHBseSB0aGF0IHZhbHVlIHRvIHRoZSBvYmoudmFsdWVcclxuICAgICAgb2JqLnZhbHVlID0gVXRpbGl0eS5hZ2dyZWdhdGVMb29rdXBbb2JqLmFnZ3JlZ2F0ZV0odmFsdWVGbiwgd2lkZ2V0LCB2YWx1ZXMpOyAvLyBmbi5jYWxsKHdpZGdldCwgcmVzdWx0KTtcclxuXHJcbiAgICAgIC8vIGxldHMgc2V0IHRoZSBjb2xvciBvbiB0aGUgd2lkZ2V0LlxyXG4gICAgICB0aGlzLmFwcGx5RGVjb3JhdG9yKG9iai52YWx1ZSwgd2lkZ2V0KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBnZXQgdGhlIGZvcm1hdHRlclxyXG4gICAgd2hlbihmb3JtYXR0ZXJGbiwgKGZ1bmMpID0+IHtcclxuICAgICAgaWYgKHR5cGVvZiBmdW5jID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgd2lkZ2V0LmZvcm1hdHRlciA9IGZ1bmM7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEFwcGx5IHRoZSB2YWx1ZSB0byB0aGUgd2lkZ2V0IGl0c2VsZiBieSBwYXNzaW5nIG9iai52YWx1ZSAoZnJvbSB0aGUgdmFsdWVzIGFycmF5KSB0byB0aGUgdmFsdWUgcHJvcGVydHkgb2YgdGhlIHdpZGdldFxyXG4gICAgaWYgKG9iai5jb3VudCkge1xyXG4gICAgICB0aGlzLl9nZXRDb3VudFZhbHVlKHdpZGdldCwgb2JqKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICBpZiAocmVzdWx0ID49IDApIHtcclxuICAgICAgICAgIG9iai5jb3VudFZhbHVlID0gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFwcGx5RGF0YVRvV2lkZ2V0KHdpZGdldCwgb2JqKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmFwcGx5RGF0YVRvV2lkZ2V0KHdpZGdldCwgb2JqKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGFwcGx5RGVjb3JhdG9yOiBmdW5jdGlvbiBhcHBseURlY29yYXRvcih2YWx1ZSwgd2lkZ2V0KSB7XHJcbiAgICBpZiAod2lkZ2V0LmRlY29yYXRvcikge1xyXG4gICAgICBpZiAodHlwZW9mIHdpZGdldC5kZWNvcmF0b3IgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICB3aWRnZXQuZGVjb3JhdG9yKHZhbHVlLCB3aWRnZXQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGRlY29yYXRvcnMgPSB0aGlzLmdldERlY29yYXRvcnMoKTtcclxuICAgICAgICBjb25zdCBkZWNvcmF0b3IgPSBkZWNvcmF0b3JzW3dpZGdldC5kZWNvcmF0b3JdO1xyXG4gICAgICAgIGlmIChkZWNvcmF0b3IgJiYgZGVjb3JhdG9yLmZuKSB7XHJcbiAgICAgICAgICBkZWNvcmF0b3IuZm4uY2FsbChkZWNvcmF0b3IsIHZhbHVlLCB3aWRnZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZ2V0RGVjb3JhdG9yczogZnVuY3Rpb24gZ2V0RGVjb3JhdG9ycygpIHtcclxuICAgIGlmICghdGhpcy5kZWNvcmF0b3JzKSB7XHJcbiAgICAgIHRoaXMuZGVjb3JhdG9ycyA9IHtcclxuICAgICAgICBwb3NpdGl2ZVRyZW5kOiB7XHJcbiAgICAgICAgICBwb3NpdGl2ZVZhbHVlQ29sb3I6ICdncmVlbicsXHJcbiAgICAgICAgICBuZWdhdGl2ZVZhbHVlQ29sb3I6ICdyZWQnLFxyXG4gICAgICAgICAgZm46IGZ1bmN0aW9uIGZuKHZhbHVlLCBtZXRyaWNXaWRnZXQpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID4gMCkge1xyXG4gICAgICAgICAgICAgIG1ldHJpY1dpZGdldC5zZXRWYWx1ZUNvbG9yKHRoaXMucG9zaXRpdmVWYWx1ZUNvbG9yKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBtZXRyaWNXaWRnZXQuc2V0VmFsdWVDb2xvcih0aGlzLm5lZ2F0aXZlVmFsdWVDb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBuZWdhdGl2ZVRyZW5kOiB7XHJcbiAgICAgICAgICBwb3NpdGl2ZVZhbHVlQ29sb3I6ICdyZWQnLFxyXG4gICAgICAgICAgbmVnYXRpdmVWYWx1ZUNvbG9yOiAnZ3JlZW4nLFxyXG4gICAgICAgICAgZm46IGZ1bmN0aW9uIGZuKHZhbHVlLCBtZXRyaWNXaWRnZXQpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID4gMCkge1xyXG4gICAgICAgICAgICAgIG1ldHJpY1dpZGdldC5zZXRWYWx1ZUNvbG9yKHRoaXMucG9zaXRpdmVWYWx1ZUNvbG9yKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBtZXRyaWNXaWRnZXQuc2V0VmFsdWVDb2xvcih0aGlzLm5lZ2F0aXZlVmFsdWVDb2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmRlY29yYXRvcnM7XHJcbiAgfSxcclxuICBjaGVja0ZvclZhbHVlOiBmdW5jdGlvbiBjaGVja0ZvclZhbHVlKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gdmFsdWUubmFtZSA9PT0gdGhpcy52YWx1ZU5lZWRlZDtcclxuICB9LFxyXG4gIF9vblF1ZXJ5RXJyb3I6IGZ1bmN0aW9uIF9vblF1ZXJ5RXJyb3IoZXJyb3IsIHdpZGdldCkge1xyXG4gICAgJCh3aWRnZXQubWV0cmljRGV0YWlsTm9kZSkucmVwbGFjZVdpdGgod2lkZ2V0Lml0ZW1UZW1wbGF0ZS5hcHBseSh7IHZhbHVlOiBlcnJvciB9LCB3aWRnZXQpKTtcclxuICB9LFxyXG4gIF9nZXRDb3VudFZhbHVlOiBmdW5jdGlvbiBfZ2V0Q291bnRWYWx1ZSh3aWRnZXQsIG9iaikge1xyXG4gICAgY29uc3QgZGVmID0gbmV3IERlZmVycmVkKCk7XHJcbiAgICBjb25zdCBxdWVyeUFyZyA9ICh0aGlzLnF1ZXJ5QXJncyAmJiB0aGlzLnF1ZXJ5QXJnc1tvYmoucXVlcnlJbmRleF0pID8gdGhpcy5xdWVyeUFyZ3Nbb2JqLnF1ZXJ5SW5kZXhdIDogbnVsbDtcclxuICAgIGlmICghcXVlcnlBcmcpIHtcclxuICAgICAgZGVmLnJlc29sdmVkKC0xKTtcclxuICAgICAgcmV0dXJuIGRlZi5wcm9taXNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHF1ZXJ5T3B0aW9ucyA9IHtcclxuICAgICAgY291bnQ6IDEsXHJcbiAgICAgIHN0YXJ0OiAwLFxyXG4gICAgICBzZWxlY3Q6IFsnJGtleSddLFxyXG4gICAgICB3aGVyZTogcXVlcnlBcmdbMV0uX2FjdGl2ZUZpbHRlcixcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgc3RvcmUgPSBuZXcgU0RhdGEoe1xyXG4gICAgICBzZXJ2aWNlOiBBcHAuc2VydmljZXMuY3JtLFxyXG4gICAgICBjb250cmFjdE5hbWU6ICdkeW5hbWljJyxcclxuICAgICAgcmVzb3VyY2VLaW5kOiBxdWVyeUFyZ1swXSwgLy8gcmVzb3VyY2VraW5kO1xyXG4gICAgICBzY29wZTogdGhpcyxcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHF1ZXJ5UmVzdWx0cyA9IHN0b3JlLnF1ZXJ5KG51bGwsIHF1ZXJ5T3B0aW9ucyk7XHJcbiAgICB3aGVuKHF1ZXJ5UmVzdWx0cywgKCkgPT4ge1xyXG4gICAgICBkZWYucmVzb2x2ZShxdWVyeVJlc3VsdHMudG90YWwpO1xyXG4gICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUud2FybihlcnJvcik7IC8vZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICBkZWYucmVqZWN0KGVycm9yKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGRlZi5wcm9taXNlO1xyXG4gIH0sXHJcbiAgYXBwbHlEYXRhVG9XaWRnZXQ6IGZ1bmN0aW9uIGFwcGx5RGF0YVRvV2lkZ2V0KHdpZGdldCwgZGF0YSkge1xyXG4gICAgJCh3aWRnZXQubWV0cmljRGV0YWlsTm9kZSkuZW1wdHkoKTtcclxuICAgIGlmICghZGF0YS5lcnJvcikge1xyXG4gICAgICBpZiAoZGF0YS5jb3VudCAmJiAoZGF0YS5jb3VudFZhbHVlID49IDApKSB7XHJcbiAgICAgICAgJCh3aWRnZXQubWV0cmljRGV0YWlsTm9kZSkucHJlcGVuZCgkKGA8c3BhbiBjbGFzcz1cIm1ldHJpYy1jb3VudFwiPiR7c3RyaW5nLnN1YnN0aXR1dGUoZGF0YS5jb3VudFRpdGxlID8gY3JtRm9ybWF0LmVuY29kZShkYXRhLmNvdW50VGl0bGUpIDogY3JtRm9ybWF0LmVuY29kZSh3aWRnZXQuY291bnRUaXRsZSksIFtjcm1Gb3JtYXQuZW5jb2RlKGRhdGEuY291bnRWYWx1ZSldKX08L3NwYW4+YCkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgJCh3aWRnZXQubWV0cmljRGV0YWlsTm9kZSkucHJlcGVuZCh3aWRnZXQuaXRlbVRlbXBsYXRlLmFwcGx5KHsgdmFsdWU6IGRhdGEudmFsdWUgfSwgd2lkZ2V0KSk7XHJcbiAgfSxcclxuICBuYXZUb1JlcG9ydFZpZXc6IGZ1bmN0aW9uIG5hdlRvUmVwb3J0VmlldygpIHtcclxuICAgIGxldCB2aWV3O1xyXG5cclxuICAgIGlmICh0aGlzLm5hdlRvKSB7XHJcbiAgICAgIHZpZXcgPSBBcHAuZ2V0Vmlldyh0aGlzLm5hdlRvKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0aGlzLmNoYXJ0VHlwZSkge1xyXG4gICAgICAgIHZpZXcgPSBBcHAuZ2V0Vmlldyh0aGlzLmNoYXJ0VHlwZU1hcHBpbmdbdGhpcy5jaGFydFR5cGVdKTtcclxuICAgICAgICB2aWV3LmZvcm1hdHRlciA9IHRoaXMuZm9ybWF0dGVyO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgdmlldy5wYXJlbnQgPSB0aGlzO1xyXG4gICAgICB2aWV3LnNob3coeyByZXR1cm5UbzogdGhpcy5yZXR1cm5Ub0lkLCB0aXRsZVRleHQ6IHRoaXMudGl0bGVUZXh0LCB3aGVyZTogdGhpcy5hY3RpdmVGaWx0ZXIgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBjaGFuZ2VSYW5nZTogZnVuY3Rpb24gY2hhbmdlUmFuZ2UoKSB7XHJcbiAgICBjb25zdCB2aWV3ID0gdGhpcy5wYXJlbnQ7XHJcbiAgICB2aWV3LmRheVZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgIC8vIENoYW5nZSB0aGUgcHJldmlvdXNseSBzZWxlY3RlZCByYW5nZSBjb2xvciBiYWNrIHRvIHdoYXQgaXQgd2FzIGFuZCB0aGUgbmV3IHNlbGVjdGVkIHJhbmdlIGNvbG9yIHRvIHNlbGVjdGVkXHJcbiAgICB2aWV3LnNlbGVjdGVkUmFuZ2Uuc3R5bGVbJ2JhY2tncm91bmQtY29sb3InXSA9IHZpZXcuZ2V0Q29sb3IoKTtcclxuICAgIHZpZXcuc2VsZWN0ZWRSYW5nZSA9IHRoaXMuZG9tTm9kZS5wYXJlbnROb2RlO1xyXG4gICAgdmlldy5zZWxlY3RlZFJhbmdlLnN0eWxlWydiYWNrZ3JvdW5kLWNvbG9yJ10gPSB2aWV3LmdldFNlbGVjdGVkQ29sb3IoKTtcclxuICAgIHZpZXcucmVidWlsZFdpZGdldHModmlldy5lbnRyeSk7XHJcbiAgfSxcclxuICBidWlsZFZpZXc6IGZ1bmN0aW9uIGJ1aWxkVmlldygpIHt9LFxyXG4gIGJ1aWxkTm9EYXRhVmlldzogZnVuY3Rpb24gYnVpbGROb0RhdGFWaWV3KGVudHJ5KSB7XHJcbiAgICBjb25zdCBmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgY29uc3Qgbm9kZSA9ICQodGhpcy5ub2RhdGFUZW1wbGF0ZS5hcHBseShlbnRyeSwgdGhpcykpO1xyXG4gICAgZnJhZy5hcHBlbmRDaGlsZChub2RlKTtcclxuICAgIGlmIChmcmFnLmNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAkKHRoaXMubWV0cmljc05vZGUpLmFwcGVuZChmcmFnKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGdldEFicnY6IGZ1bmN0aW9uIGdldEFicnYoKSB7XHJcbiAgICBsZXQgYWJydiA9ICcnO1xyXG4gICAgYWJydiA9IGNybUZvcm1hdC5mb3JtYXRVc2VySW5pdGlhbCh0aGlzLnRpdGxlVGV4dCk7XHJcbiAgICByZXR1cm4gYWJydjtcclxuICB9LFxyXG4gIGdldENvbG9yOiBmdW5jdGlvbiBnZXRDb2xvcigpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbG9yO1xyXG4gIH0sXHJcbiAgZ2V0TWV0cmljQ29sb3I6IGZ1bmN0aW9uIGdldE1ldHJpY0NvbG9yKCkge1xyXG4gICAgcmV0dXJuICh0aGlzLm1ldHJpY0NvbG9yKSA/IHRoaXMubWV0cmljQ29sb3IgOiAnJztcclxuICB9LFxyXG4gIGdldFNlbGVjdGVkQ29sb3I6IGZ1bmN0aW9uIGdldFNlbGVjdGVkQ29sb3IoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZENvbG9yO1xyXG4gIH0sXHJcbiAgZ2V0U3RvcmU6IGZ1bmN0aW9uIGdldFN0b3JlKCkge1xyXG4gICAgY29uc3Qgc3RvcmUgPSBuZXcgU0RhdGEoe1xyXG4gICAgICBzZXJ2aWNlOiB0aGlzLnNlcnZpY2UsXHJcbiAgICAgIGNvbnRyYWN0TmFtZTogdGhpcy5jb250cmFjdE5hbWUsXHJcbiAgICAgIHJlc291cmNlS2luZDogdGhpcy5yZXNvdXJjZUtpbmQsXHJcbiAgICAgIHJlc291cmNlUHJvcGVydHk6IHRoaXMucmVzb3VyY2VQcm9wZXJ0eSxcclxuICAgICAgcmVzb3VyY2VQcmVkaWNhdGU6IHRoaXMucmVzb3VyY2VQcmVkaWNhdGUsXHJcbiAgICAgIGluY2x1ZGU6IHRoaXMucXVlcnlJbmNsdWRlLFxyXG4gICAgICBzZWxlY3Q6IHRoaXMucXVlcnlTZWxlY3QsXHJcbiAgICAgIG9yZGVyQnk6IHRoaXMucXVlcnlPcmRlckJ5LFxyXG4gICAgICB3aGVyZTogdGhpcy5nZXRXaGVyZSgpLFxyXG4gICAgICBpdGVtc1Byb3BlcnR5OiB0aGlzLml0ZW1zUHJvcGVydHksXHJcbiAgICAgIGlkUHJvcGVydHk6IHRoaXMuaWRQcm9wZXJ0eSxcclxuICAgICAgbGFiZWxQcm9wZXJ0eTogdGhpcy5sYWJlbFByb3BlcnR5LFxyXG4gICAgICBlbnRpdHlQcm9wZXJ0eTogdGhpcy5lbnRpdHlQcm9wZXJ0eSxcclxuICAgICAgdmVyc2lvblByb3BlcnR5OiB0aGlzLnZlcnNpb25Qcm9wZXJ0eSxcclxuICAgICAgc3RhcnQ6IDAsXHJcbiAgICAgIGNvdW50OiB0aGlzLm1heEl0ZW1zLFxyXG4gICAgICBzY29wZTogdGhpcyxcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHN0b3JlO1xyXG4gIH0sXHJcbiAgZ2V0V2hlcmU6IGZ1bmN0aW9uIGdldFdoZXJlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucXVlcnlXaGVyZTtcclxuICB9LFxyXG4gIGdldFF1ZXJ5U3RvcmU6IGZ1bmN0aW9uIGdldFF1ZXJ5U3RvcmUoKSB7XHJcbiAgICBjb25zdCBzdG9yZSA9IFtdO1xyXG5cclxuICAgIGlmICghKHRoaXMucXVlcnlBcmdzIGluc3RhbmNlb2YgQXJyYXkpICYmIHRoaXMucXVlcnlBcmdzKSB7XHJcbiAgICAgIHRoaXMucXVlcnlBcmdzID0gW3RoaXMucXVlcnlBcmdzXTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5xdWVyeU5hbWUpIHtcclxuICAgICAgdGhpcy5xdWVyeU5hbWUgPSAnZXhlY3V0ZU1ldHJpYyc7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5xdWVyeUFyZ3MuZm9yRWFjaChmdW5jdGlvbiBjcmVhdGVTdG9yZShhcmcpIHtcclxuICAgICAgc3RvcmUucHVzaChuZXcgU0RhdGEoe1xyXG4gICAgICAgIHJlcXVlc3Q6IHRoaXMucmVxdWVzdCxcclxuICAgICAgICBzZXJ2aWNlOiBBcHAuc2VydmljZXMuY3JtLFxyXG4gICAgICAgIHJlc291cmNlS2luZDogYXJnWzBdLFxyXG4gICAgICAgIHJlc291cmNlUHJlZGljYXRlOiB0aGlzLnJlc291cmNlUHJlZGljYXRlLFxyXG4gICAgICAgIGNvbnRyYWN0TmFtZTogdGhpcy5jb250cmFjdE5hbWUsXHJcbiAgICAgICAgcXVlcnlOYW1lOiB0aGlzLnF1ZXJ5TmFtZSxcclxuICAgICAgICBxdWVyeUFyZ3M6IGFyZ1sxXSxcclxuICAgICAgICBvcmRlckJ5OiB0aGlzLnF1ZXJ5T3JkZXJCeSxcclxuICAgICAgICBpZFByb3BlcnR5OiB0aGlzLmlkUHJvcGVydHksXHJcbiAgICAgICAgYXBwbGljYXRpb25OYW1lOiB0aGlzLmFwcGxpY2F0aW9uTmFtZSxcclxuICAgICAgICBzY29wZTogdGhpcyxcclxuICAgICAgfSkpO1xyXG4gICAgfSwgdGhpcyk7XHJcblxyXG4gICAgcmV0dXJuIHN0b3JlO1xyXG4gIH0sXHJcbiAgcmVidWlsZFdpZGdldHM6IGZ1bmN0aW9uIHJlYnVpbGRXaWRnZXRzKCkge30sXHJcbiAgcmVidWlsZFZhbHVlczogZnVuY3Rpb24gcmVidWlsZFZhbHVlcygpIHtcclxuICAgIC8vIFRPRE86IGFkZCBpbiBmdW5jdGlvbmFsaXR5IHRvIGNoZWNrIGlmIHZhbHVlIGlzIGRlcGVuZGVudCBvbiBkYXRldGltZSAoaS5lLiByYW5nZVZhbHVlIGRlcGVuZGVudCkgYW5kIGZvcmNlIGl0IHRvIHVwZGF0ZSBpZiBuZWNlc3NhcnlcclxuICAgIGZvciAobGV0IHogPSAwOyB6IDwgdGhpcy52YWx1ZXMubGVuZ3RoOyB6KyspIHtcclxuICAgICAgdGhpcy52YWx1ZXNbel0udmFsdWUgPSBudWxsO1xyXG4gICAgICBpZiAodGhpcy52YWx1ZXNbel0uY291bnQgPj0gMCkge1xyXG4gICAgICAgIHRoaXMudmFsdWVzW3pdLmNvdW50ID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogU2V0cyB1cCB0aGUgZGF0ZSByYW5nZSBzZWFyY2ggcXVlcnkgYmFzZWQgdXBvbiB0aGUgZnJvbSBhbmQgdG8gdmFsdWUgKGNhbiB1c2UgdGhpcy5kYXlWYWx1ZSB3aGljaCBpcyBzZXQgYnkgdGhlIHJhbmdlIG5vZGVzKVxyXG4gICAqIEBwYXJhbXMge3N0cmluZywgaW50LCBpbnR9IFByb3BlcnR5IHRvIGJlIHNlYXJjaGVkIGZvciwgdGhlIGRheXMgYWdvIGZyb20gdGhlIGN1cnJlbnQsIGFuZCBkYXlzIHVwIHRvIChmcm9tIGN1cnJlbnQpXHJcbiAgICovXHJcbiAgcGFzdERheXM6IGZ1bmN0aW9uIHBhc3REYXlzKHByb3BlcnR5LCBmcm9tLCB0bykge1xyXG4gICAgY29uc3Qgbm93ID0gbW9tZW50KCk7XHJcbiAgICBjb25zdCBwYXN0V2Vla1N0YXJ0ID0gbm93LmNsb25lKCkuc3VidHJhY3QoZnJvbSwgJ2RheXMnKS5zdGFydE9mKCdkYXknKTtcclxuICAgIGxldCB0b2RheTtcclxuXHJcbiAgICBpZiAoIXRvKSB7XHJcbiAgICAgIHRvZGF5ID0gbm93LmNsb25lKCkuZW5kT2YoJ2RheScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9kYXkgPSBub3cuY2xvbmUoKS5zdWJ0cmFjdCh0bywgJ2RheXMnKS5lbmRPZignZGF5Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcXVlcnkgPSBgKCgke3Byb3BlcnR5fSBiZXR3ZWVuIEAke2NvbnZlcnQudG9Jc29TdHJpbmdGcm9tRGF0ZShwYXN0V2Vla1N0YXJ0LnRvRGF0ZSgpKX1AIGFuZCBAJHtjb252ZXJ0LnRvSXNvU3RyaW5nRnJvbURhdGUodG9kYXkudG9EYXRlKCkpfUApIG9yICgke3Byb3BlcnR5fSBiZXR3ZWVuIEAke3Bhc3RXZWVrU3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREVDAwOjAwOjAwW1pdJyl9QCBhbmQgQCR7dG9kYXkuZm9ybWF0KCdZWVlZLU1NLUREVDIzOjU5OjU5W1pdJyl9QCkpYDtcclxuICAgIHJldHVybiBxdWVyeTtcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIFNldHMgdXAgdGhlIGRhdGUgcmFuZ2Ugc2VhcmNoIHF1ZXJ5IGJhc2VkIG9uIHRoZSB0aGlzLmRheVZhbHVlIGFuZCBzZWFyY2hlcyBiZXR3ZWVuIHRoYXQgbWFueSBkYXlzIGFnbyBhbmQgdG9kYXlcclxuICAgKiBAcGFyYW1zIHtzdHJpbmd9IFByb3BlcnR5IHRvIGJlIHNlYXJjaGVkIGZvclxyXG4gICAqL1xyXG4gIHBhc3REYXlzTHQ6IGZ1bmN0aW9uIHBhc3REYXlzTHQocHJvcGVydHkpIHtcclxuICAgIGNvbnN0IG5vdyA9IG1vbWVudCgpO1xyXG4gICAgY29uc3QgcGFzdERheSA9IG5vdy5jbG9uZSgpLnN1YnRyYWN0KHRoaXMuZGF5VmFsdWUsICdkYXlzJykuc3RhcnRPZignZGF5Jyk7XHJcblxyXG4gICAgY29uc3QgcXVlcnkgPSBgKCR7cHJvcGVydHl9IGx0IEAke2NvbnZlcnQudG9Jc29TdHJpbmdGcm9tRGF0ZShwYXN0RGF5LnRvRGF0ZSgpKX1AIG9yICgke3Byb3BlcnR5fSBsdCBAJHtwYXN0RGF5LmZvcm1hdCgnWVlZWS1NTS1ERFQwMDowMDowMFtaXScpfUApKWA7XHJcbiAgICByZXR1cm4gcXVlcnk7XHJcbiAgfSxcclxuICBoYXNWYWxpZE9wdGlvbnM6IGZ1bmN0aW9uIGhhc1ZhbGlkT3B0aW9ucyhvcHRpb25zKSB7XHJcbiAgICByZXR1cm4gb3B0aW9uc1xyXG4gICAgICAgICYmIG9wdGlvbnMudmFsdWVOZWVkZWQ7XHJcbiAgfSxcclxuICBoYXNWYWx1ZU9wdGlvbnM6IGZ1bmN0aW9uIGhhc1ZhbHVlT3B0aW9ucyhvcHRpb25zKSB7XHJcbiAgICByZXR1cm4gb3B0aW9uc1xyXG4gICAgICAgICYmIG9wdGlvbnMudmFsdWU7XHJcbiAgfSxcclxuICBkZXN0cm95V2lkZ2V0czogZnVuY3Rpb24gZGVzdHJveVdpZGdldHMoKSB7XHJcbiAgICBpZiAodGhpcy5tZXRyaWNXaWRnZXRzKSB7XHJcbiAgICAgIHRoaXMubWV0cmljV2lkZ2V0cy5mb3JFYWNoKCh3aWRnZXQpID0+IHtcclxuICAgICAgICB3aWRnZXQuZGVzdHJveSgpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIHRvZ2dsZVZpZXc6IGZ1bmN0aW9uIHRvZ2dsZVZpZXcoZXZ0KSB7XHJcbiAgICB0aGlzLm9uVG9nZ2xlVmlldygpO1xyXG4gICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIH0sXHJcbiAgb25Ub2dnbGVWaWV3OiBmdW5jdGlvbiBvblRvZ2dsZVZpZXcoZm9yY2VPcGVuKSB7XHJcbiAgICBpZiAoIXRoaXMuaXNMb2FkZWQpIHtcclxuICAgICAgdGhpcy5vbkxvYWQoKTtcclxuICAgIH1cclxuICAgICQodGhpcy5kYXNoYm9hcmRIZWFkZXJOb2RlKS50b2dnbGVDbGFzcyh0aGlzLmNvbGxhcHNlZENsYXNzLCBmb3JjZU9wZW4pO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuY29uc3QgcnZtID0gbmV3IFJlbGF0ZWRWaWV3TWFuYWdlcigpO1xyXG5ydm0ucmVnaXN0ZXJUeXBlKCdkYXNoYm9hcmRfd2lkZ2V0X2Jhc2UnLCBfX2NsYXNzKTtcclxubGFuZy5zZXRPYmplY3QoJ2NybS5WaWV3cy5fRGFzaGJvYXJkV2lkZ2V0QmFzZScsIF9fY2xhc3MpO1xyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuX0Rhc2hib2FyZFdpZGdldEJhc2UnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19