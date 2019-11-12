define('crm/Views/RecentlyViewed/_RightDrawerListMixin', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', '../_RightDrawerBaseMixin', 'argos/I18n'], function (module, exports, _declare, _lang, _RightDrawerBaseMixin2, _I18n) {
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

  var resource = (0, _I18n2.default)('rightDrawerListMixin');

  /**
   * @class crm.Views.RecentlyViewed._RightDrawerListMixin
   *
   *
   * @mixins crm.Views._RightDrawerBaseMixin
   *
   */
  var __class = (0, _declare2.default)('crm.Views.RecentlyViewed._RightDrawerListMixin', [_RightDrawerBaseMixin3.default], {

    // Dirty flags to refresh the mainview and/or widgets
    _hasChangedEntityPrefs: false,
    _hasChangedKPIPrefs: false,
    hasSettings: true,
    onShow: function onShow() {
      this.setDefaultEntityPreferences();
    },
    openSettings: function openSettings() {
      App.viewSettingsModal.open();
    },
    setDefaultEntityPreferences: function setDefaultEntityPreferences() {
      if (!App.preferences.recentlyViewedEntityFilters) {
        var defaults = this.getDefaultEntityPreferences();
        App.preferences.recentlyViewedEntityFilters = defaults;
        App.persistPreferences();
      }
    },
    getDefaultEntityPreferences: function getDefaultEntityPreferences() {
      return Object.keys(this.entityMappings).map(function (name) {
        return {
          name: name,
          enabled: true
        };
      });
    },
    setupRightDrawer: function setupRightDrawer() {
      var _this = this;

      var drawer = App.getView('right_drawer');
      if (drawer) {
        _lang2.default.mixin(drawer, this._createActions());
        drawer.setLayout(this.createRightDrawerLayout());
        drawer.getGroupForEntry = _lang2.default.hitch(this, function getGroupForRightDrawerEntry(entry) {
          return this.getGroupForRightDrawerEntry(entry);
        });

        App.viewSettingsModal.element.on('close', function () {
          if (_this._hasChangedEntityPrefs) {
            _this.clear();
            _this.refreshRequired = true;
            _this.refresh();
            _this._hasChangedEntityPrefs = false;
            _this._hasChangedKPIPrefs = false;
          }

          if (_this._hasChangedKPIPrefs && _this.rebuildWidgets) {
            _this.destroyWidgets();
            _this.rebuildWidgets();
            _this._hasChangedKPIPrefs = false;
          }
        });
      }
    },
    unloadRightDrawer: function unloadRightDrawer() {
      var drawer = App.getView('right_drawer');
      if (drawer) {
        drawer.setLayout([]);
        drawer.getGroupForEntry = function noop() {};
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
        entityFilterClicked: function onentityFilterClicked(params) {
          var prefs = App.preferences && App.preferences.recentlyViewedEntityFilters;

          var results = prefs.filter(function (pref) {
            return pref.name === params.entityname;
          });

          if (results.length > 0) {
            var enabled = !!results[0].enabled;
            results[0].enabled = !enabled;
            App.persistPreferences();
            this._hasChangedEntityPrefs = true;
            $(params.$source).attr('data-enabled', (!enabled).toString());
          }
        }.bind(this),
        kpiClicked: function kpiClicked(params) {
          var metrics = App.getMetricsByResourceKind(this.resourceKind);
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
    getGroupForRightDrawerEntry: function getGroupForRightDrawerEntry(entry) {
      if (entry.dataProps && entry.dataProps.entityname) {
        return {
          tag: 'view',
          title: resource.entitySectionText
        };
      }

      return {
        tag: 'kpi',
        title: resource.kpiSectionText
      };
    },
    createRightDrawerLayout: function createRightDrawerLayout() {
      var _this2 = this;

      var layout = [];
      var entitySection = {
        id: 'actions',
        children: Object.keys(this.entityMappings).map(function (entityName) {
          var prefs = App.preferences && App.preferences.recentlyViewedEntityFilters;
          var entityPref = prefs.filter(function (pref) {
            return pref.name === entityName;
          });
          var enabled = entityPref[0].enabled;

          return {
            name: entityName,
            action: 'entityFilterClicked',
            title: _this2.entityText[entityName] || entityName,
            dataProps: {
              entityname: entityName,
              enabled: !!enabled
            }
          };
        })
      };

      layout.push(entitySection);

      var metrics = App.getMetricsByResourceKind(this.resourceKind);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9SZWNlbnRseVZpZXdlZC9fUmlnaHREcmF3ZXJMaXN0TWl4aW4uanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiX2hhc0NoYW5nZWRFbnRpdHlQcmVmcyIsIl9oYXNDaGFuZ2VkS1BJUHJlZnMiLCJoYXNTZXR0aW5ncyIsIm9uU2hvdyIsInNldERlZmF1bHRFbnRpdHlQcmVmZXJlbmNlcyIsIm9wZW5TZXR0aW5ncyIsIkFwcCIsInZpZXdTZXR0aW5nc01vZGFsIiwib3BlbiIsInByZWZlcmVuY2VzIiwicmVjZW50bHlWaWV3ZWRFbnRpdHlGaWx0ZXJzIiwiZGVmYXVsdHMiLCJnZXREZWZhdWx0RW50aXR5UHJlZmVyZW5jZXMiLCJwZXJzaXN0UHJlZmVyZW5jZXMiLCJPYmplY3QiLCJrZXlzIiwiZW50aXR5TWFwcGluZ3MiLCJtYXAiLCJuYW1lIiwiZW5hYmxlZCIsInNldHVwUmlnaHREcmF3ZXIiLCJkcmF3ZXIiLCJnZXRWaWV3IiwibWl4aW4iLCJfY3JlYXRlQWN0aW9ucyIsInNldExheW91dCIsImNyZWF0ZVJpZ2h0RHJhd2VyTGF5b3V0IiwiZ2V0R3JvdXBGb3JFbnRyeSIsImhpdGNoIiwiZ2V0R3JvdXBGb3JSaWdodERyYXdlckVudHJ5IiwiZW50cnkiLCJlbGVtZW50Iiwib24iLCJjbGVhciIsInJlZnJlc2hSZXF1aXJlZCIsInJlZnJlc2giLCJyZWJ1aWxkV2lkZ2V0cyIsImRlc3Ryb3lXaWRnZXRzIiwidW5sb2FkUmlnaHREcmF3ZXIiLCJub29wIiwib2ZmIiwiX29uU2VhcmNoRXhwcmVzc2lvbiIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImFjdGlvbnMiLCJlbnRpdHlGaWx0ZXJDbGlja2VkIiwib25lbnRpdHlGaWx0ZXJDbGlja2VkIiwicGFyYW1zIiwicHJlZnMiLCJyZXN1bHRzIiwiZmlsdGVyIiwicHJlZiIsImVudGl0eW5hbWUiLCJsZW5ndGgiLCIkIiwiJHNvdXJjZSIsImF0dHIiLCJ0b1N0cmluZyIsImJpbmQiLCJrcGlDbGlja2VkIiwibWV0cmljcyIsImdldE1ldHJpY3NCeVJlc291cmNlS2luZCIsInJlc291cmNlS2luZCIsIm1ldHJpYyIsInRpdGxlIiwiZGF0YVByb3BzIiwidGFnIiwiZW50aXR5U2VjdGlvblRleHQiLCJrcGlTZWN0aW9uVGV4dCIsImxheW91dCIsImVudGl0eVNlY3Rpb24iLCJpZCIsImNoaWxkcmVuIiwiZW50aXR5TmFtZSIsImVudGl0eVByZWYiLCJhY3Rpb24iLCJlbnRpdHlUZXh0IiwicHVzaCIsImtwaVNlY3Rpb24iLCJtIiwiaSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFxQkEsTUFBTUEsV0FBVyxvQkFBWSxzQkFBWixDQUFqQjs7QUFFQTs7Ozs7OztBQU9BLE1BQU1DLFVBQVUsdUJBQVEsZ0RBQVIsRUFBMEQsZ0NBQTFELEVBQW1GOztBQUVqRztBQUNBQyw0QkFBd0IsS0FIeUU7QUFJakdDLHlCQUFxQixLQUo0RTtBQUtqR0MsaUJBQWEsSUFMb0Y7QUFNakdDLFlBQVEsU0FBU0EsTUFBVCxHQUFrQjtBQUN4QixXQUFLQywyQkFBTDtBQUNELEtBUmdHO0FBU2pHQyxrQkFBYyxTQUFTQSxZQUFULEdBQXdCO0FBQ3BDQyxVQUFJQyxpQkFBSixDQUFzQkMsSUFBdEI7QUFDRCxLQVhnRztBQVlqR0osaUNBQTZCLFNBQVNBLDJCQUFULEdBQXVDO0FBQ2xFLFVBQUksQ0FBQ0UsSUFBSUcsV0FBSixDQUFnQkMsMkJBQXJCLEVBQWtEO0FBQ2hELFlBQU1DLFdBQVcsS0FBS0MsMkJBQUwsRUFBakI7QUFDQU4sWUFBSUcsV0FBSixDQUFnQkMsMkJBQWhCLEdBQThDQyxRQUE5QztBQUNBTCxZQUFJTyxrQkFBSjtBQUNEO0FBQ0YsS0FsQmdHO0FBbUJqR0QsaUNBQTZCLFNBQVNBLDJCQUFULEdBQXVDO0FBQ2xFLGFBQU9FLE9BQU9DLElBQVAsQ0FBWSxLQUFLQyxjQUFqQixFQUNKQyxHQURJLENBQ0EsVUFBQ0MsSUFBRCxFQUFVO0FBQ2IsZUFBTztBQUNMQSxvQkFESztBQUVMQyxtQkFBUztBQUZKLFNBQVA7QUFJRCxPQU5JLENBQVA7QUFPRCxLQTNCZ0c7QUE0QmpHQyxzQkFBa0IsU0FBU0EsZ0JBQVQsR0FBNEI7QUFBQTs7QUFDNUMsVUFBTUMsU0FBU2YsSUFBSWdCLE9BQUosQ0FBWSxjQUFaLENBQWY7QUFDQSxVQUFJRCxNQUFKLEVBQVk7QUFDVix1QkFBS0UsS0FBTCxDQUFXRixNQUFYLEVBQW1CLEtBQUtHLGNBQUwsRUFBbkI7QUFDQUgsZUFBT0ksU0FBUCxDQUFpQixLQUFLQyx1QkFBTCxFQUFqQjtBQUNBTCxlQUFPTSxnQkFBUCxHQUEwQixlQUFLQyxLQUFMLENBQVcsSUFBWCxFQUFpQixTQUFTQywyQkFBVCxDQUFxQ0MsS0FBckMsRUFBNEM7QUFDckYsaUJBQU8sS0FBS0QsMkJBQUwsQ0FBaUNDLEtBQWpDLENBQVA7QUFDRCxTQUZ5QixDQUExQjs7QUFJQXhCLFlBQUlDLGlCQUFKLENBQXNCd0IsT0FBdEIsQ0FBOEJDLEVBQTlCLENBQWlDLE9BQWpDLEVBQTBDLFlBQU07QUFDOUMsY0FBSSxNQUFLaEMsc0JBQVQsRUFBaUM7QUFDL0Isa0JBQUtpQyxLQUFMO0FBQ0Esa0JBQUtDLGVBQUwsR0FBdUIsSUFBdkI7QUFDQSxrQkFBS0MsT0FBTDtBQUNBLGtCQUFLbkMsc0JBQUwsR0FBOEIsS0FBOUI7QUFDQSxrQkFBS0MsbUJBQUwsR0FBMkIsS0FBM0I7QUFDRDs7QUFFRCxjQUFJLE1BQUtBLG1CQUFMLElBQTRCLE1BQUttQyxjQUFyQyxFQUFxRDtBQUNuRCxrQkFBS0MsY0FBTDtBQUNBLGtCQUFLRCxjQUFMO0FBQ0Esa0JBQUtuQyxtQkFBTCxHQUEyQixLQUEzQjtBQUNEO0FBQ0YsU0FkRDtBQWVEO0FBQ0YsS0FyRGdHO0FBc0RqR3FDLHVCQUFtQixTQUFTQSxpQkFBVCxHQUE2QjtBQUM5QyxVQUFNakIsU0FBU2YsSUFBSWdCLE9BQUosQ0FBWSxjQUFaLENBQWY7QUFDQSxVQUFJRCxNQUFKLEVBQVk7QUFDVkEsZUFBT0ksU0FBUCxDQUFpQixFQUFqQjtBQUNBSixlQUFPTSxnQkFBUCxHQUEwQixTQUFTWSxJQUFULEdBQWdCLENBQUUsQ0FBNUM7QUFDQWpDLFlBQUlDLGlCQUFKLENBQXNCd0IsT0FBdEIsQ0FBOEJTLEdBQTlCLENBQWtDLE9BQWxDO0FBQ0Q7QUFDRixLQTdEZ0c7QUE4RGpHQyx5QkFBcUIsU0FBU0EsbUJBQVQsR0FBK0I7QUFDbEQ7QUFDQSxXQUFLQyxTQUFMLENBQWVDLFNBQWY7QUFDRCxLQWpFZ0c7QUFrRWpHbkIsb0JBQWdCLFNBQVNBLGNBQVQsR0FBMEI7QUFDeEM7QUFDQSxVQUFNb0IsVUFBVTtBQUNkQyw2QkFBcUIsU0FBU0MscUJBQVQsQ0FBK0JDLE1BQS9CLEVBQXVDO0FBQzFELGNBQU1DLFFBQVExQyxJQUFJRyxXQUFKLElBQW1CSCxJQUFJRyxXQUFKLENBQWdCQywyQkFBakQ7O0FBRUEsY0FBTXVDLFVBQVVELE1BQU1FLE1BQU4sQ0FBYSxVQUFDQyxJQUFELEVBQVU7QUFDckMsbUJBQU9BLEtBQUtqQyxJQUFMLEtBQWM2QixPQUFPSyxVQUE1QjtBQUNELFdBRmUsQ0FBaEI7O0FBSUEsY0FBSUgsUUFBUUksTUFBUixHQUFpQixDQUFyQixFQUF3QjtBQUN0QixnQkFBTWxDLFVBQVUsQ0FBQyxDQUFDOEIsUUFBUSxDQUFSLEVBQVc5QixPQUE3QjtBQUNBOEIsb0JBQVEsQ0FBUixFQUFXOUIsT0FBWCxHQUFxQixDQUFDQSxPQUF0QjtBQUNBYixnQkFBSU8sa0JBQUo7QUFDQSxpQkFBS2Isc0JBQUwsR0FBOEIsSUFBOUI7QUFDQXNELGNBQUVQLE9BQU9RLE9BQVQsRUFBa0JDLElBQWxCLENBQXVCLGNBQXZCLEVBQXVDLENBQUMsQ0FBQ3JDLE9BQUYsRUFDcENzQyxRQURvQyxFQUF2QztBQUVEO0FBQ0YsU0Fmb0IsQ0FlbkJDLElBZm1CLENBZWQsSUFmYyxDQURQO0FBaUJkQyxvQkFBWSxTQUFTQSxVQUFULENBQW9CWixNQUFwQixFQUE0QjtBQUN0QyxjQUFNYSxVQUFVdEQsSUFBSXVELHdCQUFKLENBQTZCLEtBQUtDLFlBQWxDLENBQWhCO0FBQ0EsY0FBSWIsZ0JBQUo7O0FBRUEsY0FBSVcsUUFBUVAsTUFBUixHQUFpQixDQUFyQixFQUF3QjtBQUN0Qkosc0JBQVVXLFFBQVFWLE1BQVIsQ0FBZSxVQUFDYSxNQUFELEVBQVk7QUFDbkMscUJBQU9BLE9BQU9DLEtBQVAsS0FBaUJqQixPQUFPaUIsS0FBL0I7QUFDRCxhQUZTLENBQVY7QUFHRDs7QUFFRCxjQUFJZixRQUFRSSxNQUFSLEdBQWlCLENBQXJCLEVBQXdCO0FBQ3RCLGdCQUFNbEMsVUFBVSxDQUFDLENBQUM4QixRQUFRLENBQVIsRUFBVzlCLE9BQTdCO0FBQ0E4QixvQkFBUSxDQUFSLEVBQVc5QixPQUFYLEdBQXFCLENBQUNBLE9BQXRCO0FBQ0FiLGdCQUFJTyxrQkFBSjtBQUNBLGlCQUFLWixtQkFBTCxHQUEyQixJQUEzQjs7QUFFQXFELGNBQUVQLE9BQU9RLE9BQVQsRUFBa0JDLElBQWxCLENBQXVCLGNBQXZCLEVBQXVDLENBQUMsQ0FBQ3JDLE9BQUYsRUFBV3NDLFFBQVgsRUFBdkM7QUFDRDtBQUNGLFNBbEJXLENBa0JWQyxJQWxCVSxDQWtCTCxJQWxCSztBQWpCRSxPQUFoQjs7QUFzQ0EsYUFBT2QsT0FBUDtBQUNELEtBM0dnRztBQTRHakdmLGlDQUE2QixTQUFTQSwyQkFBVCxDQUFxQ0MsS0FBckMsRUFBNEM7QUFDdkUsVUFBSUEsTUFBTW1DLFNBQU4sSUFBbUJuQyxNQUFNbUMsU0FBTixDQUFnQmIsVUFBdkMsRUFBbUQ7QUFDakQsZUFBTztBQUNMYyxlQUFLLE1BREE7QUFFTEYsaUJBQU9sRSxTQUFTcUU7QUFGWCxTQUFQO0FBSUQ7O0FBRUQsYUFBTztBQUNMRCxhQUFLLEtBREE7QUFFTEYsZUFBT2xFLFNBQVNzRTtBQUZYLE9BQVA7QUFJRCxLQXhIZ0c7QUF5SGpHMUMsNkJBQXlCLFNBQVNBLHVCQUFULEdBQW1DO0FBQUE7O0FBQzFELFVBQU0yQyxTQUFTLEVBQWY7QUFDQSxVQUFNQyxnQkFBZ0I7QUFDcEJDLFlBQUksU0FEZ0I7QUFFcEJDLGtCQUFVMUQsT0FBT0MsSUFBUCxDQUFZLEtBQUtDLGNBQWpCLEVBQ1BDLEdBRE8sQ0FDSCxVQUFDd0QsVUFBRCxFQUFnQjtBQUNuQixjQUFNekIsUUFBUTFDLElBQUlHLFdBQUosSUFBbUJILElBQUlHLFdBQUosQ0FBZ0JDLDJCQUFqRDtBQUNBLGNBQU1nRSxhQUFhMUIsTUFBTUUsTUFBTixDQUFhLFVBQUNDLElBQUQsRUFBVTtBQUN4QyxtQkFBT0EsS0FBS2pDLElBQUwsS0FBY3VELFVBQXJCO0FBQ0QsV0FGa0IsQ0FBbkI7QUFGbUIsY0FNakJ0RCxPQU5pQixHQU9mdUQsV0FBVyxDQUFYLENBUGUsQ0FNakJ2RCxPQU5pQjs7QUFRbkIsaUJBQU87QUFDTEQsa0JBQU11RCxVQUREO0FBRUxFLG9CQUFRLHFCQUZIO0FBR0xYLG1CQUFPLE9BQUtZLFVBQUwsQ0FBZ0JILFVBQWhCLEtBQStCQSxVQUhqQztBQUlMUix1QkFBVztBQUNUYiwwQkFBWXFCLFVBREg7QUFFVHRELHVCQUFTLENBQUMsQ0FBQ0E7QUFGRjtBQUpOLFdBQVA7QUFTRCxTQWxCTztBQUZVLE9BQXRCOztBQXVCQWtELGFBQU9RLElBQVAsQ0FBWVAsYUFBWjs7QUFFQSxVQUFNVixVQUFVdEQsSUFBSXVELHdCQUFKLENBQTZCLEtBQUtDLFlBQWxDLENBQWhCOztBQUVBLFVBQU1nQixhQUFhO0FBQ2pCUCxZQUFJLEtBRGE7QUFFakJDLGtCQUFVWixRQUFRVixNQUFSLENBQWU7QUFBQSxpQkFBSzZCLEVBQUVmLEtBQVA7QUFBQSxTQUFmLEVBQTZCL0MsR0FBN0IsQ0FBaUMsVUFBQzhDLE1BQUQsRUFBU2lCLENBQVQsRUFBZTtBQUN4RCxpQkFBTztBQUNMOUQsMEJBQVk4RCxDQURQO0FBRUxMLG9CQUFRLFlBRkg7QUFHTFgsbUJBQU9ELE9BQU9DLEtBSFQ7QUFJTEMsdUJBQVc7QUFDVEQscUJBQU9ELE9BQU9DLEtBREw7QUFFVDdDLHVCQUFTLENBQUMsQ0FBQzRDLE9BQU81QztBQUZUO0FBSk4sV0FBUDtBQVNELFNBVlM7QUFGTyxPQUFuQjs7QUFlQWtELGFBQU9RLElBQVAsQ0FBWUMsVUFBWjtBQUNBLGFBQU9ULE1BQVA7QUFDRDtBQXZLZ0csR0FBbkYsQ0FBaEI7O29CQTBLZXRFLE8iLCJmaWxlIjoiX1JpZ2h0RHJhd2VyTGlzdE1peGluLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IF9SaWdodERyYXdlckJhc2VNaXhpbiBmcm9tICcuLi9fUmlnaHREcmF3ZXJCYXNlTWl4aW4nO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgncmlnaHREcmF3ZXJMaXN0TWl4aW4nKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLlJlY2VudGx5Vmlld2VkLl9SaWdodERyYXdlckxpc3RNaXhpblxyXG4gKlxyXG4gKlxyXG4gKiBAbWl4aW5zIGNybS5WaWV3cy5fUmlnaHREcmF3ZXJCYXNlTWl4aW5cclxuICpcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuUmVjZW50bHlWaWV3ZWQuX1JpZ2h0RHJhd2VyTGlzdE1peGluJywgW19SaWdodERyYXdlckJhc2VNaXhpbl0sIHtcclxuXHJcbiAgLy8gRGlydHkgZmxhZ3MgdG8gcmVmcmVzaCB0aGUgbWFpbnZpZXcgYW5kL29yIHdpZGdldHNcclxuICBfaGFzQ2hhbmdlZEVudGl0eVByZWZzOiBmYWxzZSxcclxuICBfaGFzQ2hhbmdlZEtQSVByZWZzOiBmYWxzZSxcclxuICBoYXNTZXR0aW5nczogdHJ1ZSxcclxuICBvblNob3c6IGZ1bmN0aW9uIG9uU2hvdygpIHtcclxuICAgIHRoaXMuc2V0RGVmYXVsdEVudGl0eVByZWZlcmVuY2VzKCk7XHJcbiAgfSxcclxuICBvcGVuU2V0dGluZ3M6IGZ1bmN0aW9uIG9wZW5TZXR0aW5ncygpIHtcclxuICAgIEFwcC52aWV3U2V0dGluZ3NNb2RhbC5vcGVuKCk7XHJcbiAgfSxcclxuICBzZXREZWZhdWx0RW50aXR5UHJlZmVyZW5jZXM6IGZ1bmN0aW9uIHNldERlZmF1bHRFbnRpdHlQcmVmZXJlbmNlcygpIHtcclxuICAgIGlmICghQXBwLnByZWZlcmVuY2VzLnJlY2VudGx5Vmlld2VkRW50aXR5RmlsdGVycykge1xyXG4gICAgICBjb25zdCBkZWZhdWx0cyA9IHRoaXMuZ2V0RGVmYXVsdEVudGl0eVByZWZlcmVuY2VzKCk7XHJcbiAgICAgIEFwcC5wcmVmZXJlbmNlcy5yZWNlbnRseVZpZXdlZEVudGl0eUZpbHRlcnMgPSBkZWZhdWx0cztcclxuICAgICAgQXBwLnBlcnNpc3RQcmVmZXJlbmNlcygpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZ2V0RGVmYXVsdEVudGl0eVByZWZlcmVuY2VzOiBmdW5jdGlvbiBnZXREZWZhdWx0RW50aXR5UHJlZmVyZW5jZXMoKSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5lbnRpdHlNYXBwaW5ncylcclxuICAgICAgLm1hcCgobmFtZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBuYW1lLFxyXG4gICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICB9O1xyXG4gICAgICB9KTtcclxuICB9LFxyXG4gIHNldHVwUmlnaHREcmF3ZXI6IGZ1bmN0aW9uIHNldHVwUmlnaHREcmF3ZXIoKSB7XHJcbiAgICBjb25zdCBkcmF3ZXIgPSBBcHAuZ2V0VmlldygncmlnaHRfZHJhd2VyJyk7XHJcbiAgICBpZiAoZHJhd2VyKSB7XHJcbiAgICAgIGxhbmcubWl4aW4oZHJhd2VyLCB0aGlzLl9jcmVhdGVBY3Rpb25zKCkpO1xyXG4gICAgICBkcmF3ZXIuc2V0TGF5b3V0KHRoaXMuY3JlYXRlUmlnaHREcmF3ZXJMYXlvdXQoKSk7XHJcbiAgICAgIGRyYXdlci5nZXRHcm91cEZvckVudHJ5ID0gbGFuZy5oaXRjaCh0aGlzLCBmdW5jdGlvbiBnZXRHcm91cEZvclJpZ2h0RHJhd2VyRW50cnkoZW50cnkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRHcm91cEZvclJpZ2h0RHJhd2VyRW50cnkoZW50cnkpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIEFwcC52aWV3U2V0dGluZ3NNb2RhbC5lbGVtZW50Lm9uKCdjbG9zZScsICgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5faGFzQ2hhbmdlZEVudGl0eVByZWZzKSB7XHJcbiAgICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgICB0aGlzLnJlZnJlc2hSZXF1aXJlZCA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICAgIHRoaXMuX2hhc0NoYW5nZWRFbnRpdHlQcmVmcyA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5faGFzQ2hhbmdlZEtQSVByZWZzID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5faGFzQ2hhbmdlZEtQSVByZWZzICYmIHRoaXMucmVidWlsZFdpZGdldHMpIHtcclxuICAgICAgICAgIHRoaXMuZGVzdHJveVdpZGdldHMoKTtcclxuICAgICAgICAgIHRoaXMucmVidWlsZFdpZGdldHMoKTtcclxuICAgICAgICAgIHRoaXMuX2hhc0NoYW5nZWRLUElQcmVmcyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICB1bmxvYWRSaWdodERyYXdlcjogZnVuY3Rpb24gdW5sb2FkUmlnaHREcmF3ZXIoKSB7XHJcbiAgICBjb25zdCBkcmF3ZXIgPSBBcHAuZ2V0VmlldygncmlnaHRfZHJhd2VyJyk7XHJcbiAgICBpZiAoZHJhd2VyKSB7XHJcbiAgICAgIGRyYXdlci5zZXRMYXlvdXQoW10pO1xyXG4gICAgICBkcmF3ZXIuZ2V0R3JvdXBGb3JFbnRyeSA9IGZ1bmN0aW9uIG5vb3AoKSB7fTtcclxuICAgICAgQXBwLnZpZXdTZXR0aW5nc01vZGFsLmVsZW1lbnQub2ZmKCdjbG9zZScpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgX29uU2VhcmNoRXhwcmVzc2lvbjogZnVuY3Rpb24gX29uU2VhcmNoRXhwcmVzc2lvbigpIHtcclxuICAgIC8vIFRPRE86IERvbid0IGV4dGVuZCB0aGlzIHByaXZhdGUgZnVuY3Rpb24gLSBjb25uZWN0IHRvIHRoZSBzZWFyY2ggd2lkZ2V0IG9uU2VhcmNoRXhwcmVzc2lvbiBpbnN0ZWFkXHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgX2NyZWF0ZUFjdGlvbnM6IGZ1bmN0aW9uIF9jcmVhdGVBY3Rpb25zKCkge1xyXG4gICAgLy8gVGhlc2UgYWN0aW9ucyB3aWxsIGdldCBtaXhlZCBpbnRvIHRoZSByaWdodCBkcmF3ZXIgdmlldy5cclxuICAgIGNvbnN0IGFjdGlvbnMgPSB7XHJcbiAgICAgIGVudGl0eUZpbHRlckNsaWNrZWQ6IGZ1bmN0aW9uIG9uZW50aXR5RmlsdGVyQ2xpY2tlZChwYXJhbXMpIHtcclxuICAgICAgICBjb25zdCBwcmVmcyA9IEFwcC5wcmVmZXJlbmNlcyAmJiBBcHAucHJlZmVyZW5jZXMucmVjZW50bHlWaWV3ZWRFbnRpdHlGaWx0ZXJzO1xyXG5cclxuICAgICAgICBjb25zdCByZXN1bHRzID0gcHJlZnMuZmlsdGVyKChwcmVmKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gcHJlZi5uYW1lID09PSBwYXJhbXMuZW50aXR5bmFtZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgY29uc3QgZW5hYmxlZCA9ICEhcmVzdWx0c1swXS5lbmFibGVkO1xyXG4gICAgICAgICAgcmVzdWx0c1swXS5lbmFibGVkID0gIWVuYWJsZWQ7XHJcbiAgICAgICAgICBBcHAucGVyc2lzdFByZWZlcmVuY2VzKCk7XHJcbiAgICAgICAgICB0aGlzLl9oYXNDaGFuZ2VkRW50aXR5UHJlZnMgPSB0cnVlO1xyXG4gICAgICAgICAgJChwYXJhbXMuJHNvdXJjZSkuYXR0cignZGF0YS1lbmFibGVkJywgKCFlbmFibGVkKVxyXG4gICAgICAgICAgICAudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LmJpbmQodGhpcyksXHJcbiAgICAgIGtwaUNsaWNrZWQ6IGZ1bmN0aW9uIGtwaUNsaWNrZWQocGFyYW1zKSB7XHJcbiAgICAgICAgY29uc3QgbWV0cmljcyA9IEFwcC5nZXRNZXRyaWNzQnlSZXNvdXJjZUtpbmQodGhpcy5yZXNvdXJjZUtpbmQpO1xyXG4gICAgICAgIGxldCByZXN1bHRzO1xyXG5cclxuICAgICAgICBpZiAobWV0cmljcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICByZXN1bHRzID0gbWV0cmljcy5maWx0ZXIoKG1ldHJpYykgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbWV0cmljLnRpdGxlID09PSBwYXJhbXMudGl0bGU7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIGNvbnN0IGVuYWJsZWQgPSAhIXJlc3VsdHNbMF0uZW5hYmxlZDtcclxuICAgICAgICAgIHJlc3VsdHNbMF0uZW5hYmxlZCA9ICFlbmFibGVkO1xyXG4gICAgICAgICAgQXBwLnBlcnNpc3RQcmVmZXJlbmNlcygpO1xyXG4gICAgICAgICAgdGhpcy5faGFzQ2hhbmdlZEtQSVByZWZzID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAkKHBhcmFtcy4kc291cmNlKS5hdHRyKCdkYXRhLWVuYWJsZWQnLCAoIWVuYWJsZWQpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfS5iaW5kKHRoaXMpLFxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gYWN0aW9ucztcclxuICB9LFxyXG4gIGdldEdyb3VwRm9yUmlnaHREcmF3ZXJFbnRyeTogZnVuY3Rpb24gZ2V0R3JvdXBGb3JSaWdodERyYXdlckVudHJ5KGVudHJ5KSB7XHJcbiAgICBpZiAoZW50cnkuZGF0YVByb3BzICYmIGVudHJ5LmRhdGFQcm9wcy5lbnRpdHluYW1lKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdGFnOiAndmlldycsXHJcbiAgICAgICAgdGl0bGU6IHJlc291cmNlLmVudGl0eVNlY3Rpb25UZXh0LFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRhZzogJ2twaScsXHJcbiAgICAgIHRpdGxlOiByZXNvdXJjZS5rcGlTZWN0aW9uVGV4dCxcclxuICAgIH07XHJcbiAgfSxcclxuICBjcmVhdGVSaWdodERyYXdlckxheW91dDogZnVuY3Rpb24gY3JlYXRlUmlnaHREcmF3ZXJMYXlvdXQoKSB7XHJcbiAgICBjb25zdCBsYXlvdXQgPSBbXTtcclxuICAgIGNvbnN0IGVudGl0eVNlY3Rpb24gPSB7XHJcbiAgICAgIGlkOiAnYWN0aW9ucycsXHJcbiAgICAgIGNoaWxkcmVuOiBPYmplY3Qua2V5cyh0aGlzLmVudGl0eU1hcHBpbmdzKVxyXG4gICAgICAgIC5tYXAoKGVudGl0eU5hbWUpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHByZWZzID0gQXBwLnByZWZlcmVuY2VzICYmIEFwcC5wcmVmZXJlbmNlcy5yZWNlbnRseVZpZXdlZEVudGl0eUZpbHRlcnM7XHJcbiAgICAgICAgICBjb25zdCBlbnRpdHlQcmVmID0gcHJlZnMuZmlsdGVyKChwcmVmKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBwcmVmLm5hbWUgPT09IGVudGl0eU5hbWU7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgZW5hYmxlZCxcclxuICAgICAgICAgIH0gPSBlbnRpdHlQcmVmWzBdO1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmFtZTogZW50aXR5TmFtZSxcclxuICAgICAgICAgICAgYWN0aW9uOiAnZW50aXR5RmlsdGVyQ2xpY2tlZCcsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLmVudGl0eVRleHRbZW50aXR5TmFtZV0gfHwgZW50aXR5TmFtZSxcclxuICAgICAgICAgICAgZGF0YVByb3BzOiB7XHJcbiAgICAgICAgICAgICAgZW50aXR5bmFtZTogZW50aXR5TmFtZSxcclxuICAgICAgICAgICAgICBlbmFibGVkOiAhIWVuYWJsZWQsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH0pLFxyXG4gICAgfTtcclxuXHJcbiAgICBsYXlvdXQucHVzaChlbnRpdHlTZWN0aW9uKTtcclxuXHJcbiAgICBjb25zdCBtZXRyaWNzID0gQXBwLmdldE1ldHJpY3NCeVJlc291cmNlS2luZCh0aGlzLnJlc291cmNlS2luZCk7XHJcblxyXG4gICAgY29uc3Qga3BpU2VjdGlvbiA9IHtcclxuICAgICAgaWQ6ICdrcGknLFxyXG4gICAgICBjaGlsZHJlbjogbWV0cmljcy5maWx0ZXIobSA9PiBtLnRpdGxlKS5tYXAoKG1ldHJpYywgaSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBuYW1lOiBgS1BJJHtpfWAsXHJcbiAgICAgICAgICBhY3Rpb246ICdrcGlDbGlja2VkJyxcclxuICAgICAgICAgIHRpdGxlOiBtZXRyaWMudGl0bGUsXHJcbiAgICAgICAgICBkYXRhUHJvcHM6IHtcclxuICAgICAgICAgICAgdGl0bGU6IG1ldHJpYy50aXRsZSxcclxuICAgICAgICAgICAgZW5hYmxlZDogISFtZXRyaWMuZW5hYmxlZCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSksXHJcbiAgICB9O1xyXG5cclxuICAgIGxheW91dC5wdXNoKGtwaVNlY3Rpb24pO1xyXG4gICAgcmV0dXJuIGxheW91dDtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==