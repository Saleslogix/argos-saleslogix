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
      this.inherited(arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9BY3Rpdml0eS9NeURheVJpZ2h0RHJhd2VyTGlzdE1peGluLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsImtwaVNlY3Rpb25UZXh0IiwiZmlsdGVyU2VjdGlvblRleHQiLCJfaGFzQ2hhbmdlZEtQSVByZWZzIiwiX2hhc0NoYW5nZWRLRmlsdGVyUHJlZnMiLCJoYXNTZXR0aW5ncyIsIm9uU2hvdyIsInNldERlZmF1bHRGaWx0ZXJQcmVmZXJlbmNlcyIsIm9wZW5TZXR0aW5ncyIsIkFwcCIsInZpZXdTZXR0aW5nc01vZGFsIiwib3BlbiIsInByZWZlcmVuY2VzIiwibXlEYXlGaWx0ZXJzIiwiZGVmYXVsdHMiLCJnZXREZWZhdWx0RmlsdGVyUHJlZmVyZW5jZXMiLCJwZXJzaXN0UHJlZmVyZW5jZXMiLCJmaWx0ZXJzIiwiZ2V0RmlsdGVycyIsImZpbHRlclByZWZzIiwiT2JqZWN0Iiwia2V5cyIsIm1hcCIsIm5hbWUiLCJlbmFibGVkIiwiX2N1cnJlbnRGaWx0ZXJOYW1lIiwic2V0dXBSaWdodERyYXdlciIsImRyYXdlciIsImdldFZpZXciLCJtaXhpbiIsIl9jcmVhdGVBY3Rpb25zIiwic2V0TGF5b3V0IiwiY3JlYXRlUmlnaHREcmF3ZXJMYXlvdXQiLCJnZXRHcm91cEZvckVudHJ5IiwiaGl0Y2giLCJnZXRHcm91cEZvclJpZ2h0RHJhd2VyRW50cnkiLCJlbnRyeSIsImVsZW1lbnQiLCJvbiIsIm9uU25hcHBlckNsb3NlIiwiYmluZCIsInJlZnJlc2hSaWdodERyYXdlciIsImNsZWFyIiwibGF5b3V0IiwicmVmcmVzaCIsIl9oYXNDaGFuZ2VkRmlsdGVyUHJlZnMiLCJyZWZyZXNoUmVxdWlyZWQiLCJyZWJ1aWxkV2lkZ2V0cyIsImRlc3Ryb3lXaWRnZXRzIiwidW5sb2FkUmlnaHREcmF3ZXIiLCJzbmFwcGVyT2ZmIiwib2ZmIiwiX29uU2VhcmNoRXhwcmVzc2lvbiIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImFjdGlvbnMiLCJmaWx0ZXJDbGlja2VkIiwib25GaWx0ZXJDbGlja2VkIiwicGFyYW1zIiwicHJlZnMiLCJmaWx0ZXJQcmVmIiwibGVuZ3RoIiwiZmlsdGVyIiwicHJlZiIsImZpbHRlcm5hbWUiLCJmb3JFYWNoIiwic2V0Q3VycmVudEZpbHRlciIsIiQiLCIkc291cmNlIiwiYXR0ciIsInRvU3RyaW5nIiwiY2xvc2UiLCJrcGlDbGlja2VkIiwibWV0cmljcyIsImdldE1ldHJpY3MiLCJyZXN1bHRzIiwibWV0cmljIiwidGl0bGUiLCJnZXRNZXRyaWNzQnlSZXNvdXJjZUtpbmQiLCJkYXRhUHJvcHMiLCJ0YWciLCJmaWx0ZXJTZWN0aW9uIiwiaWQiLCJjaGlsZHJlbiIsImZpbHRlck5hbWUiLCJhY3Rpb24iLCJsYWJlbCIsInB1c2giLCJrcGlTZWN0aW9uIiwibSIsImkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE1BQU1BLFdBQVcsb0JBQVksOEJBQVosQ0FBakI7O0FBRUE7Ozs7Ozs7QUFPQSxNQUFNQyxVQUFVLHVCQUFRLDhDQUFSLEVBQXdELGdDQUF4RCxFQUFpRjtBQUMvRjtBQUNBQyxvQkFBZ0JGLFNBQVNFLGNBRnNFO0FBRy9GQyx1QkFBbUJILFNBQVNHLGlCQUhtRTs7QUFLL0Y7QUFDQUMseUJBQXFCLEtBTjBFO0FBTy9GQyw2QkFBeUIsS0FQc0U7QUFRL0ZDLGlCQUFhLElBUmtGO0FBUy9GQyxZQUFRLFNBQVNBLE1BQVQsR0FBa0I7QUFDeEIsV0FBS0MsMkJBQUw7QUFDRCxLQVg4RjtBQVkvRkMsa0JBQWMsU0FBU0EsWUFBVCxHQUF3QjtBQUNwQ0MsVUFBSUMsaUJBQUosQ0FBc0JDLElBQXRCO0FBQ0QsS0FkOEY7QUFlL0ZKLGlDQUE2QixTQUFTQSwyQkFBVCxHQUF1QztBQUNsRSxVQUFJLENBQUNFLElBQUlHLFdBQUosQ0FBZ0JDLFlBQXJCLEVBQW1DO0FBQ2pDLFlBQU1DLFdBQVcsS0FBS0MsMkJBQUwsRUFBakI7QUFD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bkUsMEJBQVltRSxDQURQO0FBRUxMLG9CQUFRLFlBRkg7QUFHTFIsbUJBQU9ELE9BQU9DLEtBSFQ7QUFJTEUsdUJBQVc7QUFDVEYscUJBQU9ELE9BQU9DLEtBREw7QUFFVHJELHVCQUFTLENBQUMsQ0FBQ29ELE9BQU9wRDtBQUZUO0FBSk4sV0FBUDtBQVNELFNBVlM7QUFGTyxPQUFuQjs7QUFlQW1CLGFBQU80QyxJQUFQLENBQVlDLFVBQVo7QUFDQSxhQUFPN0MsTUFBUDtBQUNEO0FBeE04RixHQUFqRixDQUFoQjs7b0JBMk1lM0MsTyIsImZpbGUiOiJNeURheVJpZ2h0RHJhd2VyTGlzdE1peGluLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IF9SaWdodERyYXdlckJhc2VNaXhpbiBmcm9tICcuLi9fUmlnaHREcmF3ZXJCYXNlTWl4aW4nO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYWN0aXZpdHlNeURheVJpZ2h0RHJhd2VyTGlzdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuQWN0aXZpdHkuTXlEYXlSaWdodERyYXdlckxpc3RNaXhpblxyXG4gKlxyXG4gKlxyXG4gKiBAbWl4aW5zIGNybS5WaWV3cy5fUmlnaHREcmF3ZXJCYXNlTWl4aW5cclxuICpcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuQWN0aXZpdHkuTXlEYXlSaWdodERyYXdlckxpc3RNaXhpbicsIFtfUmlnaHREcmF3ZXJCYXNlTWl4aW5dLCB7XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAga3BpU2VjdGlvblRleHQ6IHJlc291cmNlLmtwaVNlY3Rpb25UZXh0LFxyXG4gIGZpbHRlclNlY3Rpb25UZXh0OiByZXNvdXJjZS5maWx0ZXJTZWN0aW9uVGV4dCxcclxuXHJcbiAgLy8gRGlydHkgZmxhZ3MgdG8gcmVmcmVzaCB0aGUgbWFpbnZpZXcgYW5kL29yIHdpZGdldHNcclxuICBfaGFzQ2hhbmdlZEtQSVByZWZzOiBmYWxzZSxcclxuICBfaGFzQ2hhbmdlZEtGaWx0ZXJQcmVmczogZmFsc2UsXHJcbiAgaGFzU2V0dGluZ3M6IHRydWUsXHJcbiAgb25TaG93OiBmdW5jdGlvbiBvblNob3coKSB7XHJcbiAgICB0aGlzLnNldERlZmF1bHRGaWx0ZXJQcmVmZXJlbmNlcygpO1xyXG4gIH0sXHJcbiAgb3BlblNldHRpbmdzOiBmdW5jdGlvbiBvcGVuU2V0dGluZ3MoKSB7XHJcbiAgICBBcHAudmlld1NldHRpbmdzTW9kYWwub3BlbigpO1xyXG4gIH0sXHJcbiAgc2V0RGVmYXVsdEZpbHRlclByZWZlcmVuY2VzOiBmdW5jdGlvbiBzZXREZWZhdWx0RmlsdGVyUHJlZmVyZW5jZXMoKSB7XHJcbiAgICBpZiAoIUFwcC5wcmVmZXJlbmNlcy5teURheUZpbHRlcnMpIHtcclxuICAgICAgY29uc3QgZGVmYXVsdHMgPSB0aGlzLmdldERlZmF1bHRGaWx0ZXJQcmVmZXJlbmNlcygpO1xyXG4gICAgICBBcHAucHJlZmVyZW5jZXMubXlEYXlGaWx0ZXJzID0gZGVmYXVsdHM7XHJcbiAgICAgIEFwcC5wZXJzaXN0UHJlZmVyZW5jZXMoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGdldERlZmF1bHRGaWx0ZXJQcmVmZXJlbmNlczogZnVuY3Rpb24gZ2V0RGVmYXVsdEZpbHRlclByZWZlcmVuY2VzKCkge1xyXG4gICAgY29uc3QgZmlsdGVycyA9IHRoaXMuZ2V0RmlsdGVycygpO1xyXG4gICAgY29uc3QgZmlsdGVyUHJlZnMgPSBPYmplY3Qua2V5cyhmaWx0ZXJzKVxyXG4gICAgICAubWFwKChuYW1lKSA9PiB7XHJcbiAgICAgICAgbGV0IGVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5fY3VycmVudEZpbHRlck5hbWUgPT09IG5hbWUpIHtcclxuICAgICAgICAgIGVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICBlbmFibGVkLFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0pO1xyXG4gICAgcmV0dXJuIGZpbHRlclByZWZzO1xyXG4gIH0sXHJcbiAgc2V0dXBSaWdodERyYXdlcjogZnVuY3Rpb24gc2V0dXBSaWdodERyYXdlcigpIHtcclxuICAgIGNvbnN0IGRyYXdlciA9IEFwcC5nZXRWaWV3KCdyaWdodF9kcmF3ZXInKTtcclxuICAgIGlmIChkcmF3ZXIpIHtcclxuICAgICAgbGFuZy5taXhpbihkcmF3ZXIsIHRoaXMuX2NyZWF0ZUFjdGlvbnMoKSk7XHJcbiAgICAgIGRyYXdlci5zZXRMYXlvdXQodGhpcy5jcmVhdGVSaWdodERyYXdlckxheW91dCgpKTtcclxuICAgICAgZHJhd2VyLmdldEdyb3VwRm9yRW50cnkgPSBsYW5nLmhpdGNoKHRoaXMsIGZ1bmN0aW9uIGdldEdyb3VwRm9yUmlnaHREcmF3ZXJFbnRyeShlbnRyeSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEdyb3VwRm9yUmlnaHREcmF3ZXJFbnRyeShlbnRyeSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgQXBwLnZpZXdTZXR0aW5nc01vZGFsLmVsZW1lbnQub24oJ2Nsb3NlJywgdGhpcy5vblNuYXBwZXJDbG9zZS5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuICB9LFxyXG4gIHJlZnJlc2hSaWdodERyYXdlcjogZnVuY3Rpb24gcmVmcmVzaFJpZ2h0RHJhd2VyKCkge1xyXG4gICAgY29uc3QgZHJhd2VyID0gQXBwLmdldFZpZXcoJ3JpZ2h0X2RyYXdlcicpO1xyXG4gICAgaWYgKGRyYXdlcikge1xyXG4gICAgICBkcmF3ZXIuY2xlYXIoKTtcclxuICAgICAgZHJhd2VyLmxheW91dCA9IG51bGw7XHJcbiAgICAgIGRyYXdlci5zZXRMYXlvdXQodGhpcy5jcmVhdGVSaWdodERyYXdlckxheW91dCgpKTtcclxuICAgICAgZHJhd2VyLnJlZnJlc2goKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uU25hcHBlckNsb3NlOiBmdW5jdGlvbiBvblNuYXBwZXJDbG9zZSgpIHtcclxuICAgIGlmICh0aGlzLl9oYXNDaGFuZ2VkRmlsdGVyUHJlZnMpIHtcclxuICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICB0aGlzLnJlZnJlc2hSZXF1aXJlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICB0aGlzLl9oYXNDaGFuZ2VkRmlsdGVyUHJlZnMgPSBmYWxzZTtcclxuICAgICAgdGhpcy5faGFzQ2hhbmdlZEtQSVByZWZzID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX2hhc0NoYW5nZWRLUElQcmVmcyAmJiB0aGlzLnJlYnVpbGRXaWRnZXRzKSB7XHJcbiAgICAgIHRoaXMuZGVzdHJveVdpZGdldHMoKTtcclxuICAgICAgdGhpcy5yZWJ1aWxkV2lkZ2V0cygpO1xyXG4gICAgICB0aGlzLl9oYXNDaGFuZ2VkS1BJUHJlZnMgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG4gIHVubG9hZFJpZ2h0RHJhd2VyOiBmdW5jdGlvbiB1bmxvYWRSaWdodERyYXdlcigpIHtcclxuICAgIGNvbnN0IGRyYXdlciA9IEFwcC5nZXRWaWV3KCdyaWdodF9kcmF3ZXInKTtcclxuICAgIGlmIChkcmF3ZXIpIHtcclxuICAgICAgZHJhd2VyLnNldExheW91dChbXSk7XHJcbiAgICAgIGRyYXdlci5nZXRHcm91cEZvckVudHJ5ID0gZnVuY3Rpb24gc25hcHBlck9mZigpIHt9O1xyXG4gICAgICBBcHAudmlld1NldHRpbmdzTW9kYWwuZWxlbWVudC5vZmYoJ2Nsb3NlJyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBfb25TZWFyY2hFeHByZXNzaW9uOiBmdW5jdGlvbiBfb25TZWFyY2hFeHByZXNzaW9uKCkge1xyXG4gICAgLy8gVE9ETzogRG9uJ3QgZXh0ZW5kIHRoaXMgcHJpdmF0ZSBmdW5jdGlvbiAtIGNvbm5lY3QgdG8gdGhlIHNlYXJjaCB3aWRnZXQgb25TZWFyY2hFeHByZXNzaW9uIGluc3RlYWRcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBfY3JlYXRlQWN0aW9uczogZnVuY3Rpb24gX2NyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAvLyBUaGVzZSBhY3Rpb25zIHdpbGwgZ2V0IG1peGVkIGludG8gdGhlIHJpZ2h0IGRyYXdlciB2aWV3LlxyXG4gICAgY29uc3QgYWN0aW9ucyA9IHtcclxuICAgICAgZmlsdGVyQ2xpY2tlZDogZnVuY3Rpb24gb25GaWx0ZXJDbGlja2VkKHBhcmFtcykge1xyXG4gICAgICAgIGNvbnN0IHByZWZzID0gQXBwLnByZWZlcmVuY2VzICYmIEFwcC5wcmVmZXJlbmNlcy5teURheUZpbHRlcnM7XHJcbiAgICAgICAgbGV0IGZpbHRlclByZWYgPSBbXTtcclxuICAgICAgICBpZiAocHJlZnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICBmaWx0ZXJQcmVmID0gcHJlZnMuZmlsdGVyKChwcmVmKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBwcmVmLm5hbWUgPT09IHBhcmFtcy5maWx0ZXJuYW1lO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChmaWx0ZXJQcmVmLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIGNvbnN0IGVuYWJsZWQgPSAhIWZpbHRlclByZWZbMF0uZW5hYmxlZDtcclxuICAgICAgICAgIGZpbHRlclByZWZbMF0uZW5hYmxlZCA9ICFlbmFibGVkO1xyXG4gICAgICAgICAgcHJlZnMuZm9yRWFjaCgocHJlZikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocHJlZi5uYW1lICE9PSBmaWx0ZXJQcmVmWzBdLm5hbWUpIHtcclxuICAgICAgICAgICAgICBwcmVmLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB0aGlzLnNldEN1cnJlbnRGaWx0ZXIobnVsbCk7XHJcbiAgICAgICAgICBpZiAoZmlsdGVyUHJlZlswXS5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudEZpbHRlcihmaWx0ZXJQcmVmWzBdLm5hbWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgQXBwLnBlcnNpc3RQcmVmZXJlbmNlcygpO1xyXG4gICAgICAgICAgdGhpcy5faGFzQ2hhbmdlZEZpbHRlclByZWZzID0gdHJ1ZTtcclxuICAgICAgICAgICQocGFyYW1zLiRzb3VyY2UpLmF0dHIoJ2RhdGEtZW5hYmxlZCcsICghZW5hYmxlZClcclxuICAgICAgICAgICAgLnRvU3RyaW5nKCkpO1xyXG5cclxuICAgICAgICAgIHRoaXMub25TbmFwcGVyQ2xvc2UoKTtcclxuICAgICAgICAgIEFwcC52aWV3U2V0dGluZ3NNb2RhbC5jbG9zZSgpO1xyXG4gICAgICAgICAgdGhpcy5yZWZyZXNoUmlnaHREcmF3ZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0uYmluZCh0aGlzKSxcclxuICAgICAga3BpQ2xpY2tlZDogZnVuY3Rpb24ga3BpQ2xpY2tlZChwYXJhbXMpIHtcclxuICAgICAgICBjb25zdCBtZXRyaWNzID0gdGhpcy5nZXRNZXRyaWNzKCk7XHJcbiAgICAgICAgbGV0IHJlc3VsdHM7XHJcblxyXG4gICAgICAgIGlmIChtZXRyaWNzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIHJlc3VsdHMgPSBtZXRyaWNzLmZpbHRlcigobWV0cmljKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXRyaWMudGl0bGUgPT09IHBhcmFtcy50aXRsZTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgY29uc3QgZW5hYmxlZCA9ICEhcmVzdWx0c1swXS5lbmFibGVkO1xyXG4gICAgICAgICAgcmVzdWx0c1swXS5lbmFibGVkID0gIWVuYWJsZWQ7XHJcbiAgICAgICAgICBBcHAucGVyc2lzdFByZWZlcmVuY2VzKCk7XHJcbiAgICAgICAgICB0aGlzLl9oYXNDaGFuZ2VkS1BJUHJlZnMgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICQocGFyYW1zLiRzb3VyY2UpLmF0dHIoJ2RhdGEtZW5hYmxlZCcsICghZW5hYmxlZCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LmJpbmQodGhpcyksXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBhY3Rpb25zO1xyXG4gIH0sXHJcbiAgZ2V0TWV0cmljczogZnVuY3Rpb24gZ2V0TWV0cmljcygpIHtcclxuICAgIHJldHVybiBBcHAuZ2V0TWV0cmljc0J5UmVzb3VyY2VLaW5kKCd1c2VyQWN0aXZpdGllcycpO1xyXG4gIH0sXHJcbiAgZ2V0R3JvdXBGb3JSaWdodERyYXdlckVudHJ5OiBmdW5jdGlvbiBnZXRHcm91cEZvclJpZ2h0RHJhd2VyRW50cnkoZW50cnkpIHtcclxuICAgIGlmIChlbnRyeS5kYXRhUHJvcHMgJiYgZW50cnkuZGF0YVByb3BzLmZpbHRlcm5hbWUpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB0YWc6ICd2aWV3JyxcclxuICAgICAgICB0aXRsZTogcmVzb3VyY2UuZmlsdGVyU2VjdGlvblRleHQsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0YWc6ICdrcGknLFxyXG4gICAgICB0aXRsZTogcmVzb3VyY2Uua3BpU2VjdGlvblRleHQsXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgY3JlYXRlUmlnaHREcmF3ZXJMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZVJpZ2h0RHJhd2VyTGF5b3V0KCkge1xyXG4gICAgY29uc3QgbGF5b3V0ID0gW107XHJcbiAgICBjb25zdCBtZXRyaWNzID0gdGhpcy5nZXRNZXRyaWNzKCk7XHJcbiAgICBjb25zdCBmaWx0ZXJzID0gdGhpcy5nZXRGaWx0ZXJzKCk7XHJcbiAgICBjb25zdCBmaWx0ZXJTZWN0aW9uID0ge1xyXG4gICAgICBpZDogJ2FjdGlvbnMnLFxyXG4gICAgICBjaGlsZHJlbjogT2JqZWN0LmtleXMoZmlsdGVycylcclxuICAgICAgICAubWFwKChmaWx0ZXJOYW1lKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBwcmVmcyA9IEFwcC5wcmVmZXJlbmNlcyAmJiBBcHAucHJlZmVyZW5jZXMubXlEYXlGaWx0ZXJzO1xyXG4gICAgICAgICAgY29uc3QgZmlsdGVyUHJlZiA9IHByZWZzLmZpbHRlcigocHJlZikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcHJlZi5uYW1lID09PSBmaWx0ZXJOYW1lO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBjb25zdCB7XHJcbiAgICAgICAgICAgIGVuYWJsZWQsXHJcbiAgICAgICAgICB9ID0gZmlsdGVyUHJlZlswXTtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWU6IGZpbHRlck5hbWUsXHJcbiAgICAgICAgICAgIGFjdGlvbjogJ2ZpbHRlckNsaWNrZWQnLFxyXG4gICAgICAgICAgICB0aXRsZTogZmlsdGVyc1tmaWx0ZXJOYW1lXS5sYWJlbCB8fCBmaWx0ZXJOYW1lLFxyXG4gICAgICAgICAgICBkYXRhUHJvcHM6IHtcclxuICAgICAgICAgICAgICBmaWx0ZXJuYW1lOiBmaWx0ZXJOYW1lLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6ICEhZW5hYmxlZCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfSksXHJcbiAgICB9O1xyXG4gICAgbGF5b3V0LnB1c2goZmlsdGVyU2VjdGlvbik7XHJcbiAgICBjb25zdCBrcGlTZWN0aW9uID0ge1xyXG4gICAgICBpZDogJ2twaScsXHJcbiAgICAgIGNoaWxkcmVuOiBtZXRyaWNzLmZpbHRlcihtID0+IG0udGl0bGUpLm1hcCgobWV0cmljLCBpKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIG5hbWU6IGBLUEkke2l9YCxcclxuICAgICAgICAgIGFjdGlvbjogJ2twaUNsaWNrZWQnLFxyXG4gICAgICAgICAgdGl0bGU6IG1ldHJpYy50aXRsZSxcclxuICAgICAgICAgIGRhdGFQcm9wczoge1xyXG4gICAgICAgICAgICB0aXRsZTogbWV0cmljLnRpdGxlLFxyXG4gICAgICAgICAgICBlbmFibGVkOiAhIW1ldHJpYy5lbmFibGVkLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9KSxcclxuICAgIH07XHJcblxyXG4gICAgbGF5b3V0LnB1c2goa3BpU2VjdGlvbik7XHJcbiAgICByZXR1cm4gbGF5b3V0O1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19