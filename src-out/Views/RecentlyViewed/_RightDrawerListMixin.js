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
      this.inherited(_onSearchExpression, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9SZWNlbnRseVZpZXdlZC9fUmlnaHREcmF3ZXJMaXN0TWl4aW4uanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiX2hhc0NoYW5nZWRFbnRpdHlQcmVmcyIsIl9oYXNDaGFuZ2VkS1BJUHJlZnMiLCJoYXNTZXR0aW5ncyIsIm9uU2hvdyIsInNldERlZmF1bHRFbnRpdHlQcmVmZXJlbmNlcyIsIm9wZW5TZXR0aW5ncyIsIkFwcCIsInZpZXdTZXR0aW5nc01vZGFsIiwib3BlbiIsInByZWZlcmVuY2VzIiwicmVjZW50bHlWaWV3ZWRFbnRpdHlGaWx0ZXJzIiwiZGVmYXVsdHMiLCJnZXREZWZhdWx0RW50aXR5UHJlZmVyZW5jZXMiLCJwZXJzaXN0UHJlZmVyZW5jZXMiLCJPYmplY3QiLCJrZXlzIiwiZW50aXR5TWFwcGluZ3MiLCJtYXAiLCJuYW1lIiwiZW5hYmxlZCIsInNldHVwUmlnaHREcmF3ZXIiLCJkcmF3ZXIiLCJnZXRWaWV3IiwibWl4aW4iLCJfY3JlYXRlQWN0aW9ucyIsInNldExheW91dCIsImNyZWF0ZVJpZ2h0RHJhd2VyTGF5b3V0IiwiZ2V0R3JvdXBGb3JFbnRyeSIsImhpdGNoIiwiZ2V0R3JvdXBGb3JSaWdodERyYXdlckVudHJ5IiwiZW50cnkiLCJlbGVtZW50Iiwib24iLCJjbGVhciIsInJlZnJlc2hSZXF1aXJlZCIsInJlZnJlc2giLCJyZWJ1aWxkV2lkZ2V0cyIsImRlc3Ryb3lXaWRnZXRzIiwidW5sb2FkUmlnaHREcmF3ZXIiLCJub29wIiwib2ZmIiwiX29uU2VhcmNoRXhwcmVzc2lvbiIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImFjdGlvbnMiLCJlbnRpdHlGaWx0ZXJDbGlja2VkIiwib25lbnRpdHlGaWx0ZXJDbGlja2VkIiwicGFyYW1zIiwicHJlZnMiLCJyZXN1bHRzIiwiZmlsdGVyIiwicHJlZiIsImVudGl0eW5hbWUiLCJsZW5ndGgiLCIkIiwiJHNvdXJjZSIsImF0dHIiLCJ0b1N0cmluZyIsImJpbmQiLCJrcGlDbGlja2VkIiwibWV0cmljcyIsImdldE1ldHJpY3NCeVJlc291cmNlS2luZCIsInJlc291cmNlS2luZCIsIm1ldHJpYyIsInRpdGxlIiwiZGF0YVByb3BzIiwidGFnIiwiZW50aXR5U2VjdGlvblRleHQiLCJrcGlTZWN0aW9uVGV4dCIsImxheW91dCIsImVudGl0eVNlY3Rpb24iLCJpZCIsImNoaWxkcmVuIiwiZW50aXR5TmFtZSIsImVudGl0eVByZWYiLCJhY3Rpb24iLCJlbnRpdHlUZXh0IiwicHVzaCIsImtwaVNlY3Rpb24iLCJtIiwiaSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFxQkEsTUFBTUEsV0FBVyxvQkFBWSxzQkFBWixDQUFqQjs7QUFFQTs7Ozs7OztBQU9BLE1BQU1DLFVBQVUsdUJBQVEsZ0RBQVIsRUFBMEQsZ0NBQTFELEVBQW1GOztBQUVqRztBQUNBQyw0QkFBd0IsS0FIeUU7QUFJakdDLHlCQUFxQixLQUo0RTtBQUtqR0MsaUJBQWEsSUFMb0Y7QUFNakdDLFlBQVEsU0FBU0EsTUFBVCxHQUFrQjtBQUN4QixXQUFLQywyQkFBTDtBQUNELEtBUmdHO0FBU2pHQyxrQkFBYyxTQUFTQSxZQUFULEdBQXdCO0FBQ3BDQyxVQUFJQyxpQkFBSixDQUFzQkMsSUFBdEI7QUFDRCxLQVhnRztBQVlqR0osaUNBQTZCLFNBQVNBLDJCQUFULEdBQXVDO0FBQ2xFLFVBQUksQ0FBQ0UsSUFBSUcsV0FBSixDQUFnQkMsMkJBQXJCLEVBQWtEO0FBQ2hELFlBQU1DLFdBQVcsS0FBS0MsMkJBQUwsRUFBakI7QUFDQU4sWUFBSUcsV0FBSixDQUFnQkMsMkJBQWhCLEdBQThDQyxRQUE5QztBQUNBTCxZQUFJTyxrQkFBSjtBQUNEO0FBQ0YsS0FsQmdHO0FBbUJqR0QsaUNBQTZCLFNBQVNBLDJCQUFULEdBQXVDO0FBQ2xFLGFBQU9FLE9BQU9DLElBQVAsQ0FBWSxLQUFLQyxjQUFqQixFQUNKQyxHQURJLENBQ0EsVUFBQ0MsSUFBRCxFQUFVO0FBQ2IsZUFBTztBQUNMQSxvQkFESztBQUVMQyxtQkFBUztBQUZKLFNBQVA7QUFJRCxPQU5JLENBQVA7QUFPRCxLQTNCZ0c7QUE0QmpHQyxzQkFBa0IsU0FBU0EsZ0JBQVQsR0FBNEI7QUFBQTs7QUFDNUMsVUFBTUMsU0FBU2YsSUFBSWdCLE9BQUosQ0FBWSxjQUFaLENBQWY7QUFDQSxVQUFJRCxNQUFKLEVBQVk7QUFDVix1QkFBS0UsS0FBTCxDQUFXRixNQUFYLEVBQW1CLEtBQUtHLGNBQUwsRUFBbkI7QUFDQUgsZUFBT0ksU0FBUCxDQUFpQixLQUFLQyx1QkFBTCxFQUFqQjtBQUNBTCxlQUFPTSxnQkFBUCxHQUEwQixlQUFLQyxLQUFMLENBQVcsSUFBWCxFQUFpQixTQUFTQywyQkFBVCxDQUFxQ0MsS0FBckMsRUFBNEM7QUFDckYsaUJBQU8sS0FBS0QsMkJBQUwsQ0FBaUNDLEtBQWpDLENBQVA7QUFDRCxTQUZ5QixDQUExQjs7QUFJQXhCLFlBQUlDLGlCQUFKLENBQXNCd0IsT0FBdEIsQ0FBOEJDLEVBQTlCLENBQWlDLE9BQWpDLEVBQTBDLFlBQU07QUFDOUMsY0FBSSxNQUFLaEMsc0JBQVQsRUFBaUM7QUFDL0Isa0JBQUtpQyxLQUFMO0FBQ0Esa0JBQUtDLGVBQUwsR0FBdUIsSUFBdkI7QUFDQSxrQkFBS0MsT0FBTDtBQUNBLGtCQUFLbkMsc0JBQUwsR0FBOEIsS0FBOUI7QUFDQSxrQkFBS0MsbUJBQUwsR0FBMkIsS0FBM0I7QUFDRDs7QUFFRCxjQUFJLE1BQUtBLG1CQUFMLElBQTRCLE1BQUttQyxjQUFyQyxFQUFxRDtBQUNuRCxrQkFBS0MsY0FBTDtBQUNBLGtCQUFLRCxjQUFMO0FBQ0Esa0JBQUtuQyxtQkFBTCxHQUEyQixLQUEzQjtBQUNEO0FBQ0YsU0FkRDtBQWVEO0FBQ0YsS0FyRGdHO0FBc0RqR3FDLHVCQUFtQixTQUFTQSxpQkFBVCxHQUE2QjtBQUM5QyxVQUFNakIsU0FBU2YsSUFBSWdCLE9BQUosQ0FBWSxjQUFaLENBQWY7QUFDQSxVQUFJRCxNQUFKLEVBQVk7QUFDVkEsZUFBT0ksU0FBUCxDQUFpQixFQUFqQjtBQUNBSixlQUFPTSxnQkFBUCxHQUEwQixTQUFTWSxJQUFULEdBQWdCLENBQUUsQ0FBNUM7QUFDQWpDLFlBQUlDLGlCQUFKLENBQXNCd0IsT0FBdEIsQ0FBOEJTLEdBQTlCLENBQWtDLE9BQWxDO0FBQ0Q7QUFDRixLQTdEZ0c7QUE4RGpHQyx5QkFBcUIsU0FBU0EsbUJBQVQsR0FBK0I7QUFDbEQ7QUFDQSxXQUFLQyxTQUFMLENBQWVELG1CQUFmLEVBQW9DRSxTQUFwQztBQUNELEtBakVnRztBQWtFakduQixvQkFBZ0IsU0FBU0EsY0FBVCxHQUEwQjtBQUN4QztBQUNBLFVBQU1vQixVQUFVO0FBQ2RDLDZCQUFxQixTQUFTQyxxQkFBVCxDQUErQkMsTUFBL0IsRUFBdUM7QUFDMUQsY0FBTUMsUUFBUTFDLElBQUlHLFdBQUosSUFBbUJILElBQUlHLFdBQUosQ0FBZ0JDLDJCQUFqRDs7QUFFQSxjQUFNdUMsVUFBVUQsTUFBTUUsTUFBTixDQUFhLFVBQUNDLElBQUQsRUFBVTtBQUNyQyxtQkFBT0EsS0FBS2pDLElBQUwsS0FBYzZCLE9BQU9LLFVBQTVCO0FBQ0QsV0FGZSxDQUFoQjs7QUFJQSxjQUFJSCxRQUFRSSxNQUFSLEdBQWlCLENBQXJCLEVBQXdCO0FBQ3RCLGdCQUFNbEMsVUFBVSxDQUFDLENBQUM4QixRQUFRLENBQVIsRUFBVzlCLE9BQTdCO0FBQ0E4QixvQkFBUSxDQUFSLEVBQVc5QixPQUFYLEdBQXFCLENBQUNBLE9BQXRCO0FBQ0FiLGdCQUFJTyxrQkFBSjtBQUNBLGlCQUFLYixzQkFBTCxHQUE4QixJQUE5QjtBQUNBc0QsY0FBRVAsT0FBT1EsT0FBVCxFQUFrQkMsSUFBbEIsQ0FBdUIsY0FBdkIsRUFBdUMsQ0FBQyxDQUFDckMsT0FBRixFQUNwQ3NDLFFBRG9DLEVBQXZDO0FBRUQ7QUFDRixTQWZvQixDQWVuQkMsSUFmbUIsQ0FlZCxJQWZjLENBRFA7QUFpQmRDLG9CQUFZLFNBQVNBLFVBQVQsQ0FBb0JaLE1BQXBCLEVBQTRCO0FBQ3RDLGNBQU1hLFVBQVV0RCxJQUFJdUQsd0JBQUosQ0FBNkIsS0FBS0MsWUFBbEMsQ0FBaEI7QUFDQSxjQUFJYixnQkFBSjs7QUFFQSxjQUFJVyxRQUFRUCxNQUFSLEdBQWlCLENBQXJCLEVBQXdCO0FBQ3RCSixzQkFBVVcsUUFBUVYsTUFBUixDQUFlLFVBQUNhLE1BQUQsRUFBWTtBQUNuQyxxQkFBT0EsT0FBT0MsS0FBUCxLQUFpQmpCLE9BQU9pQixLQUEvQjtBQUNELGFBRlMsQ0FBVjtBQUdEOztBQUVELGNBQUlmLFFBQVFJLE1BQVIsR0FBaUIsQ0FBckIsRUFBd0I7QUFDdEIsZ0JBQU1sQyxVQUFVLENBQUMsQ0FBQzhCLFFBQVEsQ0FBUixFQUFXOUIsT0FBN0I7QUFDQThCLG9CQUFRLENBQVIsRUFBVzlCLE9BQVgsR0FBcUIsQ0FBQ0EsT0FBdEI7QUFDQWIsZ0JBQUlPLGtCQUFKO0FBQ0EsaUJBQUtaLG1CQUFMLEdBQTJCLElBQTNCOztBQUVBcUQsY0FBRVAsT0FBT1EsT0FBVCxFQUFrQkMsSUFBbEIsQ0FBdUIsY0FBdkIsRUFBdUMsQ0FBQyxDQUFDckMsT0FBRixFQUFXc0MsUUFBWCxFQUF2QztBQUNEO0FBQ0YsU0FsQlcsQ0FrQlZDLElBbEJVLENBa0JMLElBbEJLO0FBakJFLE9BQWhCOztBQXNDQSxhQUFPZCxPQUFQO0FBQ0QsS0EzR2dHO0FBNEdqR2YsaUNBQTZCLFNBQVNBLDJCQUFULENBQXFDQyxLQUFyQyxFQUE0QztBQUN2RSxVQUFJQSxNQUFNbUMsU0FBTixJQUFtQm5DLE1BQU1tQyxTQUFOLENBQWdCYixVQUF2QyxFQUFtRDtBQUNqRCxlQUFPO0FBQ0xjLGVBQUssTUFEQTtBQUVMRixpQkFBT2xFLFNBQVNxRTtBQUZYLFNBQVA7QUFJRDs7QUFFRCxhQUFPO0FBQ0xELGFBQUssS0FEQTtBQUVMRixlQUFPbEUsU0FBU3NFO0FBRlgsT0FBUDtBQUlELEtBeEhnRztBQXlIakcxQyw2QkFBeUIsU0FBU0EsdUJBQVQsR0FBbUM7QUFBQTs7QUFDMUQsVUFBTTJDLFNBQVMsRUFBZjtBQUNBLFVBQU1DLGdCQUFnQjtBQUNwQkMsWUFBSSxTQURnQjtBQUVwQkMsa0JBQVUxRCxPQUFPQyxJQUFQLENBQVksS0FBS0MsY0FBakIsRUFDUEMsR0FETyxDQUNILFVBQUN3RCxVQUFELEVBQWdCO0FBQ25CLGNBQU16QixRQUFRMUMsSUFBSUcsV0FBSixJQUFtQkgsSUFBSUcsV0FBSixDQUFnQkMsMkJBQWpEO0FBQ0EsY0FBTWdFLGFBQWExQixNQUFNRSxNQUFOLENBQWEsVUFBQ0MsSUFBRCxFQUFVO0FBQ3hDLG1CQUFPQSxLQUFLakMsSUFBTCxLQUFjdUQsVUFBckI7QUFDRCxXQUZrQixDQUFuQjtBQUZtQixjQU1qQnRELE9BTmlCLEdBT2Z1RCxXQUFXLENBQVgsQ0FQZSxDQU1qQnZELE9BTmlCOztBQVFuQixpQkFBTztBQUNMRCxrQkFBTXVELFVBREQ7QUFFTEUsb0JBQVEscUJBRkg7QUFHTFgsbUJBQU8sT0FBS1ksVUFBTCxDQUFnQkgsVUFBaEIsS0FBK0JBLFVBSGpDO0FBSUxSLHVCQUFXO0FBQ1RiLDBCQUFZcUIsVUFESDtBQUVUdEQsdUJBQVMsQ0FBQyxDQUFDQTtBQUZGO0FBSk4sV0FBUDtBQVNELFNBbEJPO0FBRlUsT0FBdEI7O0FBdUJBa0QsYUFBT1EsSUFBUCxDQUFZUCxhQUFaOztBQUVBLFVBQU1WLFVBQVV0RCxJQUFJdUQsd0JBQUosQ0FBNkIsS0FBS0MsWUFBbEMsQ0FBaEI7O0FBRUEsVUFBTWdCLGFBQWE7QUFDakJQLFlBQUksS0FEYTtBQUVqQkMsa0JBQVVaLFFBQVFWLE1BQVIsQ0FBZTtBQUFBLGlCQUFLNkIsRUFBRWYsS0FBUDtBQUFBLFNBQWYsRUFBNkIvQyxHQUE3QixDQUFpQyxVQUFDOEMsTUFBRCxFQUFTaUIsQ0FBVCxFQUFlO0FBQ3hELGlCQUFPO0FBQ0w5RCwwQkFBWThELENBRFA7QUFFTEwsb0JBQVEsWUFGSDtBQUdMWCxtQkFBT0QsT0FBT0MsS0FIVDtBQUlMQyx1QkFBVztBQUNURCxxQkFBT0QsT0FBT0MsS0FETDtBQUVUN0MsdUJBQVMsQ0FBQyxDQUFDNEMsT0FBTzVDO0FBRlQ7QUFKTixXQUFQO0FBU0QsU0FWUztBQUZPLE9BQW5COztBQWVBa0QsYUFBT1EsSUFBUCxDQUFZQyxVQUFaO0FBQ0EsYUFBT1QsTUFBUDtBQUNEO0FBdktnRyxHQUFuRixDQUFoQjs7b0JBMEtldEUsTyIsImZpbGUiOiJfUmlnaHREcmF3ZXJMaXN0TWl4aW4uanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgX1JpZ2h0RHJhd2VyQmFzZU1peGluIGZyb20gJy4uL19SaWdodERyYXdlckJhc2VNaXhpbic7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdyaWdodERyYXdlckxpc3RNaXhpbicpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuUmVjZW50bHlWaWV3ZWQuX1JpZ2h0RHJhd2VyTGlzdE1peGluXHJcbiAqXHJcbiAqXHJcbiAqIEBtaXhpbnMgY3JtLlZpZXdzLl9SaWdodERyYXdlckJhc2VNaXhpblxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5SZWNlbnRseVZpZXdlZC5fUmlnaHREcmF3ZXJMaXN0TWl4aW4nLCBbX1JpZ2h0RHJhd2VyQmFzZU1peGluXSwge1xyXG5cclxuICAvLyBEaXJ0eSBmbGFncyB0byByZWZyZXNoIHRoZSBtYWludmlldyBhbmQvb3Igd2lkZ2V0c1xyXG4gIF9oYXNDaGFuZ2VkRW50aXR5UHJlZnM6IGZhbHNlLFxyXG4gIF9oYXNDaGFuZ2VkS1BJUHJlZnM6IGZhbHNlLFxyXG4gIGhhc1NldHRpbmdzOiB0cnVlLFxyXG4gIG9uU2hvdzogZnVuY3Rpb24gb25TaG93KCkge1xyXG4gICAgdGhpcy5zZXREZWZhdWx0RW50aXR5UHJlZmVyZW5jZXMoKTtcclxuICB9LFxyXG4gIG9wZW5TZXR0aW5nczogZnVuY3Rpb24gb3BlblNldHRpbmdzKCkge1xyXG4gICAgQXBwLnZpZXdTZXR0aW5nc01vZGFsLm9wZW4oKTtcclxuICB9LFxyXG4gIHNldERlZmF1bHRFbnRpdHlQcmVmZXJlbmNlczogZnVuY3Rpb24gc2V0RGVmYXVsdEVudGl0eVByZWZlcmVuY2VzKCkge1xyXG4gICAgaWYgKCFBcHAucHJlZmVyZW5jZXMucmVjZW50bHlWaWV3ZWRFbnRpdHlGaWx0ZXJzKSB7XHJcbiAgICAgIGNvbnN0IGRlZmF1bHRzID0gdGhpcy5nZXREZWZhdWx0RW50aXR5UHJlZmVyZW5jZXMoKTtcclxuICAgICAgQXBwLnByZWZlcmVuY2VzLnJlY2VudGx5Vmlld2VkRW50aXR5RmlsdGVycyA9IGRlZmF1bHRzO1xyXG4gICAgICBBcHAucGVyc2lzdFByZWZlcmVuY2VzKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBnZXREZWZhdWx0RW50aXR5UHJlZmVyZW5jZXM6IGZ1bmN0aW9uIGdldERlZmF1bHRFbnRpdHlQcmVmZXJlbmNlcygpIHtcclxuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmVudGl0eU1hcHBpbmdzKVxyXG4gICAgICAubWFwKChuYW1lKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0pO1xyXG4gIH0sXHJcbiAgc2V0dXBSaWdodERyYXdlcjogZnVuY3Rpb24gc2V0dXBSaWdodERyYXdlcigpIHtcclxuICAgIGNvbnN0IGRyYXdlciA9IEFwcC5nZXRWaWV3KCdyaWdodF9kcmF3ZXInKTtcclxuICAgIGlmIChkcmF3ZXIpIHtcclxuICAgICAgbGFuZy5taXhpbihkcmF3ZXIsIHRoaXMuX2NyZWF0ZUFjdGlvbnMoKSk7XHJcbiAgICAgIGRyYXdlci5zZXRMYXlvdXQodGhpcy5jcmVhdGVSaWdodERyYXdlckxheW91dCgpKTtcclxuICAgICAgZHJhd2VyLmdldEdyb3VwRm9yRW50cnkgPSBsYW5nLmhpdGNoKHRoaXMsIGZ1bmN0aW9uIGdldEdyb3VwRm9yUmlnaHREcmF3ZXJFbnRyeShlbnRyeSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEdyb3VwRm9yUmlnaHREcmF3ZXJFbnRyeShlbnRyeSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgQXBwLnZpZXdTZXR0aW5nc01vZGFsLmVsZW1lbnQub24oJ2Nsb3NlJywgKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLl9oYXNDaGFuZ2VkRW50aXR5UHJlZnMpIHtcclxuICAgICAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgICAgICAgIHRoaXMucmVmcmVzaFJlcXVpcmVkID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgICAgdGhpcy5faGFzQ2hhbmdlZEVudGl0eVByZWZzID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLl9oYXNDaGFuZ2VkS1BJUHJlZnMgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9oYXNDaGFuZ2VkS1BJUHJlZnMgJiYgdGhpcy5yZWJ1aWxkV2lkZ2V0cykge1xyXG4gICAgICAgICAgdGhpcy5kZXN0cm95V2lkZ2V0cygpO1xyXG4gICAgICAgICAgdGhpcy5yZWJ1aWxkV2lkZ2V0cygpO1xyXG4gICAgICAgICAgdGhpcy5faGFzQ2hhbmdlZEtQSVByZWZzID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIHVubG9hZFJpZ2h0RHJhd2VyOiBmdW5jdGlvbiB1bmxvYWRSaWdodERyYXdlcigpIHtcclxuICAgIGNvbnN0IGRyYXdlciA9IEFwcC5nZXRWaWV3KCdyaWdodF9kcmF3ZXInKTtcclxuICAgIGlmIChkcmF3ZXIpIHtcclxuICAgICAgZHJhd2VyLnNldExheW91dChbXSk7XHJcbiAgICAgIGRyYXdlci5nZXRHcm91cEZvckVudHJ5ID0gZnVuY3Rpb24gbm9vcCgpIHt9O1xyXG4gICAgICBBcHAudmlld1NldHRpbmdzTW9kYWwuZWxlbWVudC5vZmYoJ2Nsb3NlJyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBfb25TZWFyY2hFeHByZXNzaW9uOiBmdW5jdGlvbiBfb25TZWFyY2hFeHByZXNzaW9uKCkge1xyXG4gICAgLy8gVE9ETzogRG9uJ3QgZXh0ZW5kIHRoaXMgcHJpdmF0ZSBmdW5jdGlvbiAtIGNvbm5lY3QgdG8gdGhlIHNlYXJjaCB3aWRnZXQgb25TZWFyY2hFeHByZXNzaW9uIGluc3RlYWRcclxuICAgIHRoaXMuaW5oZXJpdGVkKF9vblNlYXJjaEV4cHJlc3Npb24sIGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBfY3JlYXRlQWN0aW9uczogZnVuY3Rpb24gX2NyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAvLyBUaGVzZSBhY3Rpb25zIHdpbGwgZ2V0IG1peGVkIGludG8gdGhlIHJpZ2h0IGRyYXdlciB2aWV3LlxyXG4gICAgY29uc3QgYWN0aW9ucyA9IHtcclxuICAgICAgZW50aXR5RmlsdGVyQ2xpY2tlZDogZnVuY3Rpb24gb25lbnRpdHlGaWx0ZXJDbGlja2VkKHBhcmFtcykge1xyXG4gICAgICAgIGNvbnN0IHByZWZzID0gQXBwLnByZWZlcmVuY2VzICYmIEFwcC5wcmVmZXJlbmNlcy5yZWNlbnRseVZpZXdlZEVudGl0eUZpbHRlcnM7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBwcmVmcy5maWx0ZXIoKHByZWYpID0+IHtcclxuICAgICAgICAgIHJldHVybiBwcmVmLm5hbWUgPT09IHBhcmFtcy5lbnRpdHluYW1lO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAocmVzdWx0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICBjb25zdCBlbmFibGVkID0gISFyZXN1bHRzWzBdLmVuYWJsZWQ7XHJcbiAgICAgICAgICByZXN1bHRzWzBdLmVuYWJsZWQgPSAhZW5hYmxlZDtcclxuICAgICAgICAgIEFwcC5wZXJzaXN0UHJlZmVyZW5jZXMoKTtcclxuICAgICAgICAgIHRoaXMuX2hhc0NoYW5nZWRFbnRpdHlQcmVmcyA9IHRydWU7XHJcbiAgICAgICAgICAkKHBhcmFtcy4kc291cmNlKS5hdHRyKCdkYXRhLWVuYWJsZWQnLCAoIWVuYWJsZWQpXHJcbiAgICAgICAgICAgIC50b1N0cmluZygpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0uYmluZCh0aGlzKSxcclxuICAgICAga3BpQ2xpY2tlZDogZnVuY3Rpb24ga3BpQ2xpY2tlZChwYXJhbXMpIHtcclxuICAgICAgICBjb25zdCBtZXRyaWNzID0gQXBwLmdldE1ldHJpY3NCeVJlc291cmNlS2luZCh0aGlzLnJlc291cmNlS2luZCk7XHJcbiAgICAgICAgbGV0IHJlc3VsdHM7XHJcblxyXG4gICAgICAgIGlmIChtZXRyaWNzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIHJlc3VsdHMgPSBtZXRyaWNzLmZpbHRlcigobWV0cmljKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXRyaWMudGl0bGUgPT09IHBhcmFtcy50aXRsZTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgY29uc3QgZW5hYmxlZCA9ICEhcmVzdWx0c1swXS5lbmFibGVkO1xyXG4gICAgICAgICAgcmVzdWx0c1swXS5lbmFibGVkID0gIWVuYWJsZWQ7XHJcbiAgICAgICAgICBBcHAucGVyc2lzdFByZWZlcmVuY2VzKCk7XHJcbiAgICAgICAgICB0aGlzLl9oYXNDaGFuZ2VkS1BJUHJlZnMgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICQocGFyYW1zLiRzb3VyY2UpLmF0dHIoJ2RhdGEtZW5hYmxlZCcsICghZW5hYmxlZCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LmJpbmQodGhpcyksXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBhY3Rpb25zO1xyXG4gIH0sXHJcbiAgZ2V0R3JvdXBGb3JSaWdodERyYXdlckVudHJ5OiBmdW5jdGlvbiBnZXRHcm91cEZvclJpZ2h0RHJhd2VyRW50cnkoZW50cnkpIHtcclxuICAgIGlmIChlbnRyeS5kYXRhUHJvcHMgJiYgZW50cnkuZGF0YVByb3BzLmVudGl0eW5hbWUpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB0YWc6ICd2aWV3JyxcclxuICAgICAgICB0aXRsZTogcmVzb3VyY2UuZW50aXR5U2VjdGlvblRleHQsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGFnOiAna3BpJyxcclxuICAgICAgdGl0bGU6IHJlc291cmNlLmtwaVNlY3Rpb25UZXh0LFxyXG4gICAgfTtcclxuICB9LFxyXG4gIGNyZWF0ZVJpZ2h0RHJhd2VyTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVSaWdodERyYXdlckxheW91dCgpIHtcclxuICAgIGNvbnN0IGxheW91dCA9IFtdO1xyXG4gICAgY29uc3QgZW50aXR5U2VjdGlvbiA9IHtcclxuICAgICAgaWQ6ICdhY3Rpb25zJyxcclxuICAgICAgY2hpbGRyZW46IE9iamVjdC5rZXlzKHRoaXMuZW50aXR5TWFwcGluZ3MpXHJcbiAgICAgICAgLm1hcCgoZW50aXR5TmFtZSkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgcHJlZnMgPSBBcHAucHJlZmVyZW5jZXMgJiYgQXBwLnByZWZlcmVuY2VzLnJlY2VudGx5Vmlld2VkRW50aXR5RmlsdGVycztcclxuICAgICAgICAgIGNvbnN0IGVudGl0eVByZWYgPSBwcmVmcy5maWx0ZXIoKHByZWYpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHByZWYubmFtZSA9PT0gZW50aXR5TmFtZTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgY29uc3Qge1xyXG4gICAgICAgICAgICBlbmFibGVkLFxyXG4gICAgICAgICAgfSA9IGVudGl0eVByZWZbMF07XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuYW1lOiBlbnRpdHlOYW1lLFxyXG4gICAgICAgICAgICBhY3Rpb246ICdlbnRpdHlGaWx0ZXJDbGlja2VkJyxcclxuICAgICAgICAgICAgdGl0bGU6IHRoaXMuZW50aXR5VGV4dFtlbnRpdHlOYW1lXSB8fCBlbnRpdHlOYW1lLFxyXG4gICAgICAgICAgICBkYXRhUHJvcHM6IHtcclxuICAgICAgICAgICAgICBlbnRpdHluYW1lOiBlbnRpdHlOYW1lLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6ICEhZW5hYmxlZCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfSksXHJcbiAgICB9O1xyXG5cclxuICAgIGxheW91dC5wdXNoKGVudGl0eVNlY3Rpb24pO1xyXG5cclxuICAgIGNvbnN0IG1ldHJpY3MgPSBBcHAuZ2V0TWV0cmljc0J5UmVzb3VyY2VLaW5kKHRoaXMucmVzb3VyY2VLaW5kKTtcclxuXHJcbiAgICBjb25zdCBrcGlTZWN0aW9uID0ge1xyXG4gICAgICBpZDogJ2twaScsXHJcbiAgICAgIGNoaWxkcmVuOiBtZXRyaWNzLmZpbHRlcihtID0+IG0udGl0bGUpLm1hcCgobWV0cmljLCBpKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIG5hbWU6IGBLUEkke2l9YCxcclxuICAgICAgICAgIGFjdGlvbjogJ2twaUNsaWNrZWQnLFxyXG4gICAgICAgICAgdGl0bGU6IG1ldHJpYy50aXRsZSxcclxuICAgICAgICAgIGRhdGFQcm9wczoge1xyXG4gICAgICAgICAgICB0aXRsZTogbWV0cmljLnRpdGxlLFxyXG4gICAgICAgICAgICBlbmFibGVkOiAhIW1ldHJpYy5lbmFibGVkLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9KSxcclxuICAgIH07XHJcblxyXG4gICAgbGF5b3V0LnB1c2goa3BpU2VjdGlvbik7XHJcbiAgICByZXR1cm4gbGF5b3V0O1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19