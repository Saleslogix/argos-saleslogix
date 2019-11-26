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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9BY3Rpdml0eS9NeURheVJpZ2h0RHJhd2VyTGlzdE1peGluLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsImtwaVNlY3Rpb25UZXh0IiwiZmlsdGVyU2VjdGlvblRleHQiLCJfaGFzQ2hhbmdlZEtQSVByZWZzIiwiX2hhc0NoYW5nZWRLRmlsdGVyUHJlZnMiLCJoYXNTZXR0aW5ncyIsIm9uU2hvdyIsInNldERlZmF1bHRGaWx0ZXJQcmVmZXJlbmNlcyIsIm9wZW5TZXR0aW5ncyIsIkFwcCIsInZpZXdTZXR0aW5nc01vZGFsIiwib3BlbiIsInByZWZlcmVuY2VzIiwibXlEYXlGaWx0ZXJzIiwiZGVmYXVsdHMiLCJnZXREZWZhdWx0RmlsdGVyUHJlZmVyZW5jZXMiLCJwZXJzaXN0UHJlZmVyZW5jZXMiLCJmaWx0ZXJzIiwiZ2V0RmlsdGVycyIsImZpbHRlclByZWZzIiwiT2JqZWN0Iiwia2V5cyIsIm1hcCIsIm5hbWUiLCJlbmFibGVkIiwiX2N1cnJlbnRGaWx0ZXJOYW1lIiwic2V0dXBSaWdodERyYXdlciIsImRyYXdlciIsImdldFZpZXciLCJtaXhpbiIsIl9jcmVhdGVBY3Rpb25zIiwic2V0TGF5b3V0IiwiY3JlYXRlUmlnaHREcmF3ZXJMYXlvdXQiLCJnZXRHcm91cEZvckVudHJ5IiwiaGl0Y2giLCJnZXRHcm91cEZvclJpZ2h0RHJhd2VyRW50cnkiLCJlbnRyeSIsImVsZW1lbnQiLCJvbiIsIm9uU25hcHBlckNsb3NlIiwiYmluZCIsInJlZnJlc2hSaWdodERyYXdlciIsImNsZWFyIiwibGF5b3V0IiwicmVmcmVzaCIsIl9oYXNDaGFuZ2VkRmlsdGVyUHJlZnMiLCJyZWZyZXNoUmVxdWlyZWQiLCJyZWJ1aWxkV2lkZ2V0cyIsImRlc3Ryb3lXaWRnZXRzIiwidW5sb2FkUmlnaHREcmF3ZXIiLCJzbmFwcGVyT2ZmIiwib2ZmIiwiX29uU2VhcmNoRXhwcmVzc2lvbiIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImFjdGlvbnMiLCJmaWx0ZXJDbGlja2VkIiwib25GaWx0ZXJDbGlja2VkIiwicGFyYW1zIiwicHJlZnMiLCJmaWx0ZXJQcmVmIiwibGVuZ3RoIiwiZmlsdGVyIiwicHJlZiIsImZpbHRlcm5hbWUiLCJmb3JFYWNoIiwic2V0Q3VycmVudEZpbHRlciIsIiQiLCIkc291cmNlIiwiYXR0ciIsInRvU3RyaW5nIiwiY2xvc2UiLCJrcGlDbGlja2VkIiwibWV0cmljcyIsImdldE1ldHJpY3MiLCJyZXN1bHRzIiwibWV0cmljIiwidGl0bGUiLCJnZXRNZXRyaWNzQnlSZXNvdXJjZUtpbmQiLCJkYXRhUHJvcHMiLCJ0YWciLCJmaWx0ZXJTZWN0aW9uIiwiaWQiLCJjaGlsZHJlbiIsImZpbHRlck5hbWUiLCJhY3Rpb24iLCJsYWJlbCIsInB1c2giLCJrcGlTZWN0aW9uIiwibSIsImkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE1BQU1BLFdBQVcsb0JBQVksOEJBQVosQ0FBakI7O0FBRUE7Ozs7Ozs7QUFPQSxNQUFNQyxVQUFVLHVCQUFRLDhDQUFSLEVBQXdELGdDQUF4RCxFQUFpRjtBQUMvRjtBQUNBQyxvQkFBZ0JGLFNBQVNFLGNBRnNFO0FBRy9GQyx1QkFBbUJILFNBQVNHLGlCQUhtRTs7QUFLL0Y7QUFDQUMseUJBQXFCLEtBTjBFO0FBTy9GQyw2QkFBeUIsS0FQc0U7QUFRL0ZDLGlCQUFhLElBUmtGO0FBUy9GQyxZQUFRLFNBQVNBLE1BQVQsR0FBa0I7QUFDeEIsV0FBS0MsMkJBQUw7QUFDRCxLQVg4RjtBQVkvRkMsa0JBQWMsU0FBU0EsWUFBVCxHQUF3QjtBQUNwQ0MsVUFBSUMsaUJBQUosQ0FBc0JDLElBQXRCO0FBQ0QsS0FkOEY7QUFlL0ZKLGlDQUE2QixTQUFTQSwyQkFBVCxHQUF1QztBQUNsRSxVQUFJLENBQUNFLElBQUlHLFdBQUosQ0FBZ0JDLFlBQXJCLEVBQW1DO0FBQ2pDLFlBQU1DLFdBQVcsS0FBS0MsMkJBQUwsRUFBakI7QUFD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Q3hELGlCQUFPO0FBQ0xuRSwwQkFBWW1FLENBRFA7QUFFTEwsb0JBQVEsWUFGSDtBQUdMUixtQkFBT0QsT0FBT0MsS0FIVDtBQUlMRSx1QkFBVztBQUNURixxQkFBT0QsT0FBT0MsS0FETDtBQUVUckQsdUJBQVMsQ0FBQyxDQUFDb0QsT0FBT3BEO0FBRlQ7QUFKTixXQUFQO0FBU0QsU0FWUztBQUZPLE9BQW5COztBQWVBbUIsYUFBTzRDLElBQVAsQ0FBWUMsVUFBWjtBQUNBLGFBQU83QyxNQUFQO0FBQ0Q7QUF4TThGLEdBQWpGLENBQWhCOztvQkEyTWUzQyxPIiwiZmlsZSI6Ik15RGF5UmlnaHREcmF3ZXJMaXN0TWl4aW4uanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgX1JpZ2h0RHJhd2VyQmFzZU1peGluIGZyb20gJy4uL19SaWdodERyYXdlckJhc2VNaXhpbic7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdhY3Rpdml0eU15RGF5UmlnaHREcmF3ZXJMaXN0Jyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5BY3Rpdml0eS5NeURheVJpZ2h0RHJhd2VyTGlzdE1peGluXHJcbiAqXHJcbiAqXHJcbiAqIEBtaXhpbnMgY3JtLlZpZXdzLl9SaWdodERyYXdlckJhc2VNaXhpblxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5BY3Rpdml0eS5NeURheVJpZ2h0RHJhd2VyTGlzdE1peGluJywgW19SaWdodERyYXdlckJhc2VNaXhpbl0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICBrcGlTZWN0aW9uVGV4dDogcmVzb3VyY2Uua3BpU2VjdGlvblRleHQsXHJcbiAgZmlsdGVyU2VjdGlvblRleHQ6IHJlc291cmNlLmZpbHRlclNlY3Rpb25UZXh0LFxyXG5cclxuICAvLyBEaXJ0eSBmbGFncyB0byByZWZyZXNoIHRoZSBtYWludmlldyBhbmQvb3Igd2lkZ2V0c1xyXG4gIF9oYXNDaGFuZ2VkS1BJUHJlZnM6IGZhbHNlLFxyXG4gIF9oYXNDaGFuZ2VkS0ZpbHRlclByZWZzOiBmYWxzZSxcclxuICBoYXNTZXR0aW5nczogdHJ1ZSxcclxuICBvblNob3c6IGZ1bmN0aW9uIG9uU2hvdygpIHtcclxuICAgIHRoaXMuc2V0RGVmYXVsdEZpbHRlclByZWZlcmVuY2VzKCk7XHJcbiAgfSxcclxuICBvcGVuU2V0dGluZ3M6IGZ1bmN0aW9uIG9wZW5TZXR0aW5ncygpIHtcclxuICAgIEFwcC52aWV3U2V0dGluZ3NNb2RhbC5vcGVuKCk7XHJcbiAgfSxcclxuICBzZXREZWZhdWx0RmlsdGVyUHJlZmVyZW5jZXM6IGZ1bmN0aW9uIHNldERlZmF1bHRGaWx0ZXJQcmVmZXJlbmNlcygpIHtcclxuICAgIGlmICghQXBwLnByZWZlcmVuY2VzLm15RGF5RmlsdGVycykge1xyXG4gICAgICBjb25zdCBkZWZhdWx0cyA9IHRoaXMuZ2V0RGVmYXVsdEZpbHRlclByZWZlcmVuY2VzKCk7XHJcbiAgICAgIEFwcC5wcmVmZXJlbmNlcy5teURheUZpbHRlcnMgPSBkZWZhdWx0cztcclxuICAgICAgQXBwLnBlcnNpc3RQcmVmZXJlbmNlcygpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZ2V0RGVmYXVsdEZpbHRlclByZWZlcmVuY2VzOiBmdW5jdGlvbiBnZXREZWZhdWx0RmlsdGVyUHJlZmVyZW5jZXMoKSB7XHJcbiAgICBjb25zdCBmaWx0ZXJzID0gdGhpcy5nZXRGaWx0ZXJzKCk7XHJcbiAgICBjb25zdCBmaWx0ZXJQcmVmcyA9IE9iamVjdC5rZXlzKGZpbHRlcnMpXHJcbiAgICAgIC5tYXAoKG5hbWUpID0+IHtcclxuICAgICAgICBsZXQgZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50RmlsdGVyTmFtZSA9PT0gbmFtZSkge1xyXG4gICAgICAgICAgZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgbmFtZSxcclxuICAgICAgICAgIGVuYWJsZWQsXHJcbiAgICAgICAgfTtcclxuICAgICAgfSk7XHJcbiAgICByZXR1cm4gZmlsdGVyUHJlZnM7XHJcbiAgfSxcclxuICBzZXR1cFJpZ2h0RHJhd2VyOiBmdW5jdGlvbiBzZXR1cFJpZ2h0RHJhd2VyKCkge1xyXG4gICAgY29uc3QgZHJhd2VyID0gQXBwLmdldFZpZXcoJ3JpZ2h0X2RyYXdlcicpO1xyXG4gICAgaWYgKGRyYXdlcikge1xyXG4gICAgICBsYW5nLm1peGluKGRyYXdlciwgdGhpcy5fY3JlYXRlQWN0aW9ucygpKTtcclxuICAgICAgZHJhd2VyLnNldExheW91dCh0aGlzLmNyZWF0ZVJpZ2h0RHJhd2VyTGF5b3V0KCkpO1xyXG4gICAgICBkcmF3ZXIuZ2V0R3JvdXBGb3JFbnRyeSA9IGxhbmcuaGl0Y2godGhpcywgZnVuY3Rpb24gZ2V0R3JvdXBGb3JSaWdodERyYXdlckVudHJ5KGVudHJ5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0R3JvdXBGb3JSaWdodERyYXdlckVudHJ5KGVudHJ5KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBBcHAudmlld1NldHRpbmdzTW9kYWwuZWxlbWVudC5vbignY2xvc2UnLCB0aGlzLm9uU25hcHBlckNsb3NlLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgcmVmcmVzaFJpZ2h0RHJhd2VyOiBmdW5jdGlvbiByZWZyZXNoUmlnaHREcmF3ZXIoKSB7XHJcbiAgICBjb25zdCBkcmF3ZXIgPSBBcHAuZ2V0VmlldygncmlnaHRfZHJhd2VyJyk7XHJcbiAgICBpZiAoZHJhd2VyKSB7XHJcbiAgICAgIGRyYXdlci5jbGVhcigpO1xyXG4gICAgICBkcmF3ZXIubGF5b3V0ID0gbnVsbDtcclxuICAgICAgZHJhd2VyLnNldExheW91dCh0aGlzLmNyZWF0ZVJpZ2h0RHJhd2VyTGF5b3V0KCkpO1xyXG4gICAgICBkcmF3ZXIucmVmcmVzaCgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgb25TbmFwcGVyQ2xvc2U6IGZ1bmN0aW9uIG9uU25hcHBlckNsb3NlKCkge1xyXG4gICAgaWYgKHRoaXMuX2hhc0NoYW5nZWRGaWx0ZXJQcmVmcykge1xyXG4gICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgIHRoaXMucmVmcmVzaFJlcXVpcmVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgIHRoaXMuX2hhc0NoYW5nZWRGaWx0ZXJQcmVmcyA9IGZhbHNlO1xyXG4gICAgICB0aGlzLl9oYXNDaGFuZ2VkS1BJUHJlZnMgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5faGFzQ2hhbmdlZEtQSVByZWZzICYmIHRoaXMucmVidWlsZFdpZGdldHMpIHtcclxuICAgICAgdGhpcy5kZXN0cm95V2lkZ2V0cygpO1xyXG4gICAgICB0aGlzLnJlYnVpbGRXaWRnZXRzKCk7XHJcbiAgICAgIHRoaXMuX2hhc0NoYW5nZWRLUElQcmVmcyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgdW5sb2FkUmlnaHREcmF3ZXI6IGZ1bmN0aW9uIHVubG9hZFJpZ2h0RHJhd2VyKCkge1xyXG4gICAgY29uc3QgZHJhd2VyID0gQXBwLmdldFZpZXcoJ3JpZ2h0X2RyYXdlcicpO1xyXG4gICAgaWYgKGRyYXdlcikge1xyXG4gICAgICBkcmF3ZXIuc2V0TGF5b3V0KFtdKTtcclxuICAgICAgZHJhd2VyLmdldEdyb3VwRm9yRW50cnkgPSBmdW5jdGlvbiBzbmFwcGVyT2ZmKCkge307XHJcbiAgICAgIEFwcC52aWV3U2V0dGluZ3NNb2RhbC5lbGVtZW50Lm9mZignY2xvc2UnKTtcclxuICAgIH1cclxuICB9LFxyXG4gIF9vblNlYXJjaEV4cHJlc3Npb246IGZ1bmN0aW9uIF9vblNlYXJjaEV4cHJlc3Npb24oKSB7XHJcbiAgICAvLyBUT0RPOiBEb24ndCBleHRlbmQgdGhpcyBwcml2YXRlIGZ1bmN0aW9uIC0gY29ubmVjdCB0byB0aGUgc2VhcmNoIHdpZGdldCBvblNlYXJjaEV4cHJlc3Npb24gaW5zdGVhZFxyXG4gICAgdGhpcy5pbmhlcml0ZWQoX29uU2VhcmNoRXhwcmVzc2lvbiwgYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIF9jcmVhdGVBY3Rpb25zOiBmdW5jdGlvbiBfY3JlYXRlQWN0aW9ucygpIHtcclxuICAgIC8vIFRoZXNlIGFjdGlvbnMgd2lsbCBnZXQgbWl4ZWQgaW50byB0aGUgcmlnaHQgZHJhd2VyIHZpZXcuXHJcbiAgICBjb25zdCBhY3Rpb25zID0ge1xyXG4gICAgICBmaWx0ZXJDbGlja2VkOiBmdW5jdGlvbiBvbkZpbHRlckNsaWNrZWQocGFyYW1zKSB7XHJcbiAgICAgICAgY29uc3QgcHJlZnMgPSBBcHAucHJlZmVyZW5jZXMgJiYgQXBwLnByZWZlcmVuY2VzLm15RGF5RmlsdGVycztcclxuICAgICAgICBsZXQgZmlsdGVyUHJlZiA9IFtdO1xyXG4gICAgICAgIGlmIChwcmVmcy5sZW5ndGgpIHtcclxuICAgICAgICAgIGZpbHRlclByZWYgPSBwcmVmcy5maWx0ZXIoKHByZWYpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHByZWYubmFtZSA9PT0gcGFyYW1zLmZpbHRlcm5hbWU7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGZpbHRlclByZWYubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgY29uc3QgZW5hYmxlZCA9ICEhZmlsdGVyUHJlZlswXS5lbmFibGVkO1xyXG4gICAgICAgICAgZmlsdGVyUHJlZlswXS5lbmFibGVkID0gIWVuYWJsZWQ7XHJcbiAgICAgICAgICBwcmVmcy5mb3JFYWNoKChwcmVmKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChwcmVmLm5hbWUgIT09IGZpbHRlclByZWZbMF0ubmFtZSkge1xyXG4gICAgICAgICAgICAgIHByZWYuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHRoaXMuc2V0Q3VycmVudEZpbHRlcihudWxsKTtcclxuICAgICAgICAgIGlmIChmaWx0ZXJQcmVmWzBdLmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50RmlsdGVyKGZpbHRlclByZWZbMF0ubmFtZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBBcHAucGVyc2lzdFByZWZlcmVuY2VzKCk7XHJcbiAgICAgICAgICB0aGlzLl9oYXNDaGFuZ2VkRmlsdGVyUHJlZnMgPSB0cnVlO1xyXG4gICAgICAgICAgJChwYXJhbXMuJHNvdXJjZSkuYXR0cignZGF0YS1lbmFibGVkJywgKCFlbmFibGVkKVxyXG4gICAgICAgICAgICAudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICAgICAgdGhpcy5vblNuYXBwZXJDbG9zZSgpO1xyXG4gICAgICAgICAgQXBwLnZpZXdTZXR0aW5nc01vZGFsLmNsb3NlKCk7XHJcbiAgICAgICAgICB0aGlzLnJlZnJlc2hSaWdodERyYXdlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgfS5iaW5kKHRoaXMpLFxyXG4gICAgICBrcGlDbGlja2VkOiBmdW5jdGlvbiBrcGlDbGlja2VkKHBhcmFtcykge1xyXG4gICAgICAgIGNvbnN0IG1ldHJpY3MgPSB0aGlzLmdldE1ldHJpY3MoKTtcclxuICAgICAgICBsZXQgcmVzdWx0cztcclxuXHJcbiAgICAgICAgaWYgKG1ldHJpY3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgcmVzdWx0cyA9IG1ldHJpY3MuZmlsdGVyKChtZXRyaWMpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG1ldHJpYy50aXRsZSA9PT0gcGFyYW1zLnRpdGxlO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocmVzdWx0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICBjb25zdCBlbmFibGVkID0gISFyZXN1bHRzWzBdLmVuYWJsZWQ7XHJcbiAgICAgICAgICByZXN1bHRzWzBdLmVuYWJsZWQgPSAhZW5hYmxlZDtcclxuICAgICAgICAgIEFwcC5wZXJzaXN0UHJlZmVyZW5jZXMoKTtcclxuICAgICAgICAgIHRoaXMuX2hhc0NoYW5nZWRLUElQcmVmcyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgJChwYXJhbXMuJHNvdXJjZSkuYXR0cignZGF0YS1lbmFibGVkJywgKCFlbmFibGVkKS50b1N0cmluZygpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0uYmluZCh0aGlzKSxcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIGFjdGlvbnM7XHJcbiAgfSxcclxuICBnZXRNZXRyaWNzOiBmdW5jdGlvbiBnZXRNZXRyaWNzKCkge1xyXG4gICAgcmV0dXJuIEFwcC5nZXRNZXRyaWNzQnlSZXNvdXJjZUtpbmQoJ3VzZXJBY3Rpdml0aWVzJyk7XHJcbiAgfSxcclxuICBnZXRHcm91cEZvclJpZ2h0RHJhd2VyRW50cnk6IGZ1bmN0aW9uIGdldEdyb3VwRm9yUmlnaHREcmF3ZXJFbnRyeShlbnRyeSkge1xyXG4gICAgaWYgKGVudHJ5LmRhdGFQcm9wcyAmJiBlbnRyeS5kYXRhUHJvcHMuZmlsdGVybmFtZSkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHRhZzogJ3ZpZXcnLFxyXG4gICAgICAgIHRpdGxlOiByZXNvdXJjZS5maWx0ZXJTZWN0aW9uVGV4dCxcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRhZzogJ2twaScsXHJcbiAgICAgIHRpdGxlOiByZXNvdXJjZS5rcGlTZWN0aW9uVGV4dCxcclxuICAgIH07XHJcbiAgfSxcclxuICBjcmVhdGVSaWdodERyYXdlckxheW91dDogZnVuY3Rpb24gY3JlYXRlUmlnaHREcmF3ZXJMYXlvdXQoKSB7XHJcbiAgICBjb25zdCBsYXlvdXQgPSBbXTtcclxuICAgIGNvbnN0IG1ldHJpY3MgPSB0aGlzLmdldE1ldHJpY3MoKTtcclxuICAgIGNvbnN0IGZpbHRlcnMgPSB0aGlzLmdldEZpbHRlcnMoKTtcclxuICAgIGNvbnN0IGZpbHRlclNlY3Rpb24gPSB7XHJcbiAgICAgIGlkOiAnYWN0aW9ucycsXHJcbiAgICAgIGNoaWxkcmVuOiBPYmplY3Qua2V5cyhmaWx0ZXJzKVxyXG4gICAgICAgIC5tYXAoKGZpbHRlck5hbWUpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHByZWZzID0gQXBwLnByZWZlcmVuY2VzICYmIEFwcC5wcmVmZXJlbmNlcy5teURheUZpbHRlcnM7XHJcbiAgICAgICAgICBjb25zdCBmaWx0ZXJQcmVmID0gcHJlZnMuZmlsdGVyKChwcmVmKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBwcmVmLm5hbWUgPT09IGZpbHRlck5hbWU7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgZW5hYmxlZCxcclxuICAgICAgICAgIH0gPSBmaWx0ZXJQcmVmWzBdO1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmFtZTogZmlsdGVyTmFtZSxcclxuICAgICAgICAgICAgYWN0aW9uOiAnZmlsdGVyQ2xpY2tlZCcsXHJcbiAgICAgICAgICAgIHRpdGxlOiBmaWx0ZXJzW2ZpbHRlck5hbWVdLmxhYmVsIHx8IGZpbHRlck5hbWUsXHJcbiAgICAgICAgICAgIGRhdGFQcm9wczoge1xyXG4gICAgICAgICAgICAgIGZpbHRlcm5hbWU6IGZpbHRlck5hbWUsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogISFlbmFibGVkLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9KSxcclxuICAgIH07XHJcbiAgICBsYXlvdXQucHVzaChmaWx0ZXJTZWN0aW9uKTtcclxuICAgIGNvbnN0IGtwaVNlY3Rpb24gPSB7XHJcbiAgICAgIGlkOiAna3BpJyxcclxuICAgICAgY2hpbGRyZW46IG1ldHJpY3MuZmlsdGVyKG0gPT4gbS50aXRsZSkubWFwKChtZXRyaWMsIGkpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgbmFtZTogYEtQSSR7aX1gLFxyXG4gICAgICAgICAgYWN0aW9uOiAna3BpQ2xpY2tlZCcsXHJcbiAgICAgICAgICB0aXRsZTogbWV0cmljLnRpdGxlLFxyXG4gICAgICAgICAgZGF0YVByb3BzOiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBtZXRyaWMudGl0bGUsXHJcbiAgICAgICAgICAgIGVuYWJsZWQ6ICEhbWV0cmljLmVuYWJsZWQsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0pLFxyXG4gICAgfTtcclxuXHJcbiAgICBsYXlvdXQucHVzaChrcGlTZWN0aW9uKTtcclxuICAgIHJldHVybiBsYXlvdXQ7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=