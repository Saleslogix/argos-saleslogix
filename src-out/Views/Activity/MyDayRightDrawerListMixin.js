define('crm/Views/Activity/MyDayRightDrawerListMixin', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', '../_RightDrawerBaseMixin', 'argos/I18n'], function (module, exports, _declare, _lang, _RightDrawerBaseMixin2, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _RightDrawerBaseMixin3 = _interopRequireDefault(_RightDrawerBaseMixin2);

  var _I18n2 = _interopRequireDefault(_I18n);

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

  var resource = (0, _I18n2.default)('activityMyDayRightDrawerList');

  /**
   * @class crm.Views.Activity.MyDayRightDrawerListMixin
   *
   *
   * @mixins crm.Views._RightDrawerBaseMixin
   *
   */
  var __class = (0, _declare2.default)('crm.Views.Activity.MyDayRightDrawerListMixin', [_RightDrawerBaseMixin3.default], {
    // Localization
    kpiSectionText: resource.kpiSectionText,
    filterSectionText: resource.filterSectionText,

    // Dirty flags to refresh the mainview and/or widgets
    _hasChangedKPIPrefs: false,
    _hasChangedKFilterPrefs: false,
    hasSettings: true,
    onShow: function onShow() {
      this.setDefaultFilterPreferences();
    },
    openSettings: function openSettings() {
      App.viewSettingsModal.open();
    },
    setDefaultFilterPreferences: function setDefaultFilterPreferences() {
      if (!App.preferences.myDayFilters) {
        var defaults = this.getDefaultFilterPreferences();
        App.preferences.myDayFilters = defaults;
        App.persistPreferences();
      }
    },
    getDefaultFilterPreferences: function getDefaultFilterPreferences() {
      var _this = this;

      var filters = this.getFilters();
      var filterPrefs = Object.keys(filters).map(function (name) {
        var enabled = false;
        if (_this._currentFilterName === name) {
          enabled = false;
        }
        return {
          name: name,
          enabled: enabled
        };
      });
      return filterPrefs;
    },
    setupRightDrawer: function setupRightDrawer() {
      var drawer = App.getView('right_drawer');
      if (drawer) {
        _lang2.default.mixin(drawer, this._createActions());
        drawer.setLayout(this.createRightDrawerLayout());
        drawer.getGroupForEntry = _lang2.default.hitch(this, function getGroupForRightDrawerEntry(entry) {
          return this.getGroupForRightDrawerEntry(entry);
        });

        App.viewSettingsModal.element.on('close', this.onSnapperClose.bind(this));
      }
    },
    refreshRightDrawer: function refreshRightDrawer() {
      var drawer = App.getView('right_drawer');
      if (drawer) {
        drawer.clear();
        drawer.layout = null;
        drawer.setLayout(this.createRightDrawerLayout());
        drawer.refresh();
      }
    },
    onSnapperClose: function onSnapperClose() {
      if (this._hasChangedFilterPrefs) {
        this.clear();
        this.refreshRequired = true;
        this.refresh();
        this._hasChangedFilterPrefs = false;
        this._hasChangedKPIPrefs = false;
      }

      if (this._hasChangedKPIPrefs && this.rebuildWidgets) {
        this.destroyWidgets();
        this.rebuildWidgets();
        this._hasChangedKPIPrefs = false;
      }
    },
    unloadRightDrawer: function unloadRightDrawer() {
      var drawer = App.getView('right_drawer');
      if (drawer) {
        drawer.setLayout([]);
        drawer.getGroupForEntry = function snapperOff() {};
        App.viewSettingsModal.element.off('close');
      }
    },
    _onSearchExpression: function _onSearchExpression() {
      // TODO: Don't extend this private function - connect to the search widget onSearchExpression instead
      this.inherited(_onSearchExpression, arguments);
    },
    _createActions: function _createActions() {
      // These actions will get mixed into the right drawer view.
      var actions = {
        filterClicked: function onFilterClicked(params) {
          var prefs = App.preferences && App.preferences.myDayFilters;
          var filterPref = [];
          if (prefs.length) {
            filterPref = prefs.filter(function (pref) {
              return pref.name === params.filtername;
            });
          }
          if (filterPref.length > 0) {
            var enabled = !!filterPref[0].enabled;
            filterPref[0].enabled = !enabled;
            prefs.forEach(function (pref) {
              if (pref.name !== filterPref[0].name) {
                pref.enabled = false;
              }
            });
            this.setCurrentFilter(null);
            if (filterPref[0].enabled) {
              this.setCurrentFilter(filterPref[0].name);
            }
            App.persistPreferences();
            this._hasChangedFilterPrefs = true;
            $(params.$source).attr('data-enabled', (!enabled).toString());

            this.onSnapperClose();
            App.viewSettingsModal.close();
            this.refreshRightDrawer();
          }
        }.bind(this),
        kpiClicked: function kpiClicked(params) {
          var metrics = this.getMetrics();
          var results = void 0;

          if (metrics.length > 0) {
            results = metrics.filter(function (metric) {
              return metric.title === params.title;
            });
          }

          if (results.length > 0) {
            var enabled = !!results[0].enabled;
            results[0].enabled = !enabled;
            App.persistPreferences();
            this._hasChangedKPIPrefs = true;

            $(params.$source).attr('data-enabled', (!enabled).toString());
          }
        }.bind(this)
      };

      return actions;
    },
    getMetrics: function getMetrics() {
      return App.getMetricsByResourceKind('userActivities');
    },
    getGroupForRightDrawerEntry: function getGroupForRightDrawerEntry(entry) {
      if (entry.dataProps && entry.dataProps.filtername) {
        return {
          tag: 'view',
          title: resource.filterSectionText
        };
      }
      return {
        tag: 'kpi',
        title: resource.kpiSectionText
      };
    },
    createRightDrawerLayout: function createRightDrawerLayout() {
      var layout = [];
      var metrics = this.getMetrics();
      var filters = this.getFilters();
      var filterSection = {
        id: 'actions',
        children: Object.keys(filters).map(function (filterName) {
          var prefs = App.preferences && App.preferences.myDayFilters;
          var filterPref = prefs.filter(function (pref) {
            return pref.name === filterName;
          });
          var enabled = filterPref[0].enabled;

          return {
            name: filterName,
            action: 'filterClicked',
            title: filters[filterName].label || filterName,
            dataProps: {
              filtername: filterName,
              enabled: !!enabled
            }
          };
        })
      };
      layout.push(filterSection);
      var kpiSection = {
        id: 'kpi',
        children: metrics.filter(function (m) {
          return m.title;
        }).map(function (metric, i) {
          return {
            name: 'KPI' + i,
            action: 'kpiClicked',
            title: metric.title,
            dataProps: {
              title: metric.title,
              enabled: !!metric.enabled
            }
          };
        })
      };

      layout.push(kpiSection);
      return layout;
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});