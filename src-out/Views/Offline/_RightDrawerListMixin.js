define('crm/Views/Offline/_RightDrawerListMixin', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', '../_RightDrawerBaseMixin'], function (module, exports, _declare, _lang, _RightDrawerBaseMixin2) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _RightDrawerBaseMixin3 = _interopRequireDefault(_RightDrawerBaseMixin2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var mixinName = 'crm.Views.Offline._RightDrawerListMixin';

  /**
   * @class crm.Views._SpeedSearchRightDrawerListMixin
   * @classdesc Offline specific mixin for right drawer functionality.
   * @mixins crm.Views._RightDrawerBaseMixin
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

  var __class = (0, _declare2.default)('crm.Views.Offline._RightDrawerListMixin', [_RightDrawerBaseMixin3.default], {
    // Localization
    entitySectionText: 'Entity',
    kpiSectionText: 'KPI',
    hasSettings: true,

    // Dirty flags to refresh the mainview and/or widgets
    _hasChangedEntityPrefs: false,
    _hasChangedKPIPrefs: false,
    onShow: function onShow() {
      this.setDefaultEntityPreferences();
    },
    openSettings: function openSettings() {
      App.viewSettingsModal.open();
    },
    setDefaultEntityPreferences: function setDefaultEntityPreferences() {
      if (!App.preferences.offlineEntityFilters) {
        var defaults = this.getDefaultEntityPreferences();
        App.preferences.offlineEntityFilters = defaults;
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
            _this.rebuildWidgets();
            _this._hasChangedEntityPrefs = false;
          }

          if (_this._hasChangedKPIPrefs && _this.rebuildWidgets) {
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
          var prefs = App.preferences && App.preferences.offlineEntityFilters;

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
      var mixin = _lang2.default.getObject(mixinName);

      if (entry.dataProps && entry.dataProps.entityname) {
        return {
          tag: 'view',
          title: mixin.prototype.entitySectionText
        };
      }

      return {
        tag: 'kpi',
        title: mixin.prototype.kpiSectionText
      };
    },
    createRightDrawerLayout: function createRightDrawerLayout() {
      var _this2 = this;

      var layout = [];
      var entitySection = {
        id: 'actions',
        children: Object.keys(this.entityMappings).map(function (entityName) {
          var prefs = App.preferences && App.preferences.offlineEntityFilters;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9PZmZsaW5lL19SaWdodERyYXdlckxpc3RNaXhpbi5qcyJdLCJuYW1lcyI6WyJtaXhpbk5hbWUiLCJfX2NsYXNzIiwiZW50aXR5U2VjdGlvblRleHQiLCJrcGlTZWN0aW9uVGV4dCIsImhhc1NldHRpbmdzIiwiX2hhc0NoYW5nZWRFbnRpdHlQcmVmcyIsIl9oYXNDaGFuZ2VkS1BJUHJlZnMiLCJvblNob3ciLCJzZXREZWZhdWx0RW50aXR5UHJlZmVyZW5jZXMiLCJvcGVuU2V0dGluZ3MiLCJBcHAiLCJ2aWV3U2V0dGluZ3NNb2RhbCIsIm9wZW4iLCJwcmVmZXJlbmNlcyIsIm9mZmxpbmVFbnRpdHlGaWx0ZXJzIiwiZGVmYXVsdHMiLCJnZXREZWZhdWx0RW50aXR5UHJlZmVyZW5jZXMiLCJwZXJzaXN0UHJlZmVyZW5jZXMiLCJPYmplY3QiLCJrZXlzIiwiZW50aXR5TWFwcGluZ3MiLCJtYXAiLCJuYW1lIiwiZW5hYmxlZCIsInNldHVwUmlnaHREcmF3ZXIiLCJkcmF3ZXIiLCJnZXRWaWV3IiwibWl4aW4iLCJfY3JlYXRlQWN0aW9ucyIsInNldExheW91dCIsImNyZWF0ZVJpZ2h0RHJhd2VyTGF5b3V0IiwiZ2V0R3JvdXBGb3JFbnRyeSIsImhpdGNoIiwiZ2V0R3JvdXBGb3JSaWdodERyYXdlckVudHJ5IiwiZW50cnkiLCJlbGVtZW50Iiwib24iLCJjbGVhciIsInJlZnJlc2hSZXF1aXJlZCIsInJlZnJlc2giLCJyZWJ1aWxkV2lkZ2V0cyIsInVubG9hZFJpZ2h0RHJhd2VyIiwibm9vcCIsIm9mZiIsIl9vblNlYXJjaEV4cHJlc3Npb24iLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJhY3Rpb25zIiwiZW50aXR5RmlsdGVyQ2xpY2tlZCIsIm9uZW50aXR5RmlsdGVyQ2xpY2tlZCIsInBhcmFtcyIsInByZWZzIiwicmVzdWx0cyIsImZpbHRlciIsInByZWYiLCJlbnRpdHluYW1lIiwibGVuZ3RoIiwiJCIsIiRzb3VyY2UiLCJhdHRyIiwidG9TdHJpbmciLCJiaW5kIiwia3BpQ2xpY2tlZCIsIm1ldHJpY3MiLCJnZXRNZXRyaWNzQnlSZXNvdXJjZUtpbmQiLCJyZXNvdXJjZUtpbmQiLCJtZXRyaWMiLCJ0aXRsZSIsImdldE9iamVjdCIsImRhdGFQcm9wcyIsInRhZyIsInByb3RvdHlwZSIsImxheW91dCIsImVudGl0eVNlY3Rpb24iLCJpZCIsImNoaWxkcmVuIiwiZW50aXR5TmFtZSIsImVudGl0eVByZWYiLCJhY3Rpb24iLCJlbnRpdHlUZXh0IiwicHVzaCIsImtwaVNlY3Rpb24iLCJtIiwiaSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkEsTUFBTUEsWUFBWSx5Q0FBbEI7O0FBRUE7Ozs7OztBQXRCQTs7Ozs7Ozs7Ozs7Ozs7O0FBNEJBLE1BQU1DLFVBQVUsdUJBQVEseUNBQVIsRUFBbUQsZ0NBQW5ELEVBQTRFO0FBQzFGO0FBQ0FDLHVCQUFtQixRQUZ1RTtBQUcxRkMsb0JBQWdCLEtBSDBFO0FBSTFGQyxpQkFBYSxJQUo2RTs7QUFNMUY7QUFDQUMsNEJBQXdCLEtBUGtFO0FBUTFGQyx5QkFBcUIsS0FScUU7QUFTMUZDLFlBQVEsU0FBU0EsTUFBVCxHQUFrQjtBQUN4QixXQUFLQywyQkFBTDtBQUNELEtBWHlGO0FBWTFGQyxrQkFBYyxTQUFTQSxZQUFULEdBQXdCO0FBQ3BDQyxVQUFJQyxpQkFBSixDQUFzQkMsSUFBdEI7QUFDRCxLQWR5RjtBQWUxRkosaUNBQTZCLFNBQVNBLDJCQUFULEdBQXVDO0FBQ2xFLFVBQUksQ0FBQ0UsSUFBSUcsV0FBSixDQUFnQkMsb0JBQXJCLEVBQTJDO0FBQ3pDLFlBQU1DLFdBQVcsS0FBS0MsMkJBQUwsRUFBakI7QUFDQU4sWUFBSUcsV0FBSixDQUFnQkMsb0JBQWhCLEdBQXVDQyxRQUF2QztBQUNBTCxZQUFJTyxrQkFBSjtBQUNEO0FBQ0YsS0FyQnlGO0FBc0IxRkQsaUNBQTZCLFNBQVNBLDJCQUFULEdBQXVDO0FBQ2xFLGFBQU9FLE9BQU9DLElBQVAsQ0FBWSxLQUFLQyxj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QUFPRCxPQUFPQyxLQURMO0FBRVQ1Qyx1QkFBUyxDQUFDLENBQUMyQyxPQUFPM0M7QUFGVDtBQUpOLFdBQVA7QUFTRCxTQVZTO0FBRk8sT0FBbkI7O0FBZUFpRCxhQUFPUSxJQUFQLENBQVlDLFVBQVo7QUFDQSxhQUFPVCxNQUFQO0FBQ0Q7QUEzS3lGLEdBQTVFLENBQWhCOztvQkE4S2V2RSxPIiwiZmlsZSI6Il9SaWdodERyYXdlckxpc3RNaXhpbi5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBfUmlnaHREcmF3ZXJCYXNlTWl4aW4gZnJvbSAnLi4vX1JpZ2h0RHJhd2VyQmFzZU1peGluJztcclxuXHJcblxyXG5jb25zdCBtaXhpbk5hbWUgPSAnY3JtLlZpZXdzLk9mZmxpbmUuX1JpZ2h0RHJhd2VyTGlzdE1peGluJztcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLl9TcGVlZFNlYXJjaFJpZ2h0RHJhd2VyTGlzdE1peGluXHJcbiAqIEBjbGFzc2Rlc2MgT2ZmbGluZSBzcGVjaWZpYyBtaXhpbiBmb3IgcmlnaHQgZHJhd2VyIGZ1bmN0aW9uYWxpdHkuXHJcbiAqIEBtaXhpbnMgY3JtLlZpZXdzLl9SaWdodERyYXdlckJhc2VNaXhpblxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5PZmZsaW5lLl9SaWdodERyYXdlckxpc3RNaXhpbicsIFtfUmlnaHREcmF3ZXJCYXNlTWl4aW5dLCB7XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgZW50aXR5U2VjdGlvblRleHQ6ICdFbnRpdHknLFxyXG4gIGtwaVNlY3Rpb25UZXh0OiAnS1BJJyxcclxuICBoYXNTZXR0aW5nczogdHJ1ZSxcclxuXHJcbiAgLy8gRGlydHkgZmxhZ3MgdG8gcmVmcmVzaCB0aGUgbWFpbnZpZXcgYW5kL29yIHdpZGdldHNcclxuICBfaGFzQ2hhbmdlZEVudGl0eVByZWZzOiBmYWxzZSxcclxuICBfaGFzQ2hhbmdlZEtQSVByZWZzOiBmYWxzZSxcclxuICBvblNob3c6IGZ1bmN0aW9uIG9uU2hvdygpIHtcclxuICAgIHRoaXMuc2V0RGVmYXVsdEVudGl0eVByZWZlcmVuY2VzKCk7XHJcbiAgfSxcclxuICBvcGVuU2V0dGluZ3M6IGZ1bmN0aW9uIG9wZW5TZXR0aW5ncygpIHtcclxuICAgIEFwcC52aWV3U2V0dGluZ3NNb2RhbC5vcGVuKCk7XHJcbiAgfSxcclxuICBzZXREZWZhdWx0RW50aXR5UHJlZmVyZW5jZXM6IGZ1bmN0aW9uIHNldERlZmF1bHRFbnRpdHlQcmVmZXJlbmNlcygpIHtcclxuICAgIGlmICghQXBwLnByZWZlcmVuY2VzLm9mZmxpbmVFbnRpdHlGaWx0ZXJzKSB7XHJcbiAgICAgIGNvbnN0IGRlZmF1bHRzID0gdGhpcy5nZXREZWZhdWx0RW50aXR5UHJlZmVyZW5jZXMoKTtcclxuICAgICAgQXBwLnByZWZlcmVuY2VzLm9mZmxpbmVFbnRpdHlGaWx0ZXJzID0gZGVmYXVsdHM7XHJcbiAgICAgIEFwcC5wZXJzaXN0UHJlZmVyZW5jZXMoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGdldERlZmF1bHRFbnRpdHlQcmVmZXJlbmNlczogZnVuY3Rpb24gZ2V0RGVmYXVsdEVudGl0eVByZWZlcmVuY2VzKCkge1xyXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuZW50aXR5TWFwcGluZ3MpXHJcbiAgICAgIC5tYXAoKG5hbWUpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgbmFtZSxcclxuICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgfTtcclxuICAgICAgfSk7XHJcbiAgfSxcclxuICBzZXR1cFJpZ2h0RHJhd2VyOiBmdW5jdGlvbiBzZXR1cFJpZ2h0RHJhd2VyKCkge1xyXG4gICAgY29uc3QgZHJhd2VyID0gQXBwLmdldFZpZXcoJ3JpZ2h0X2RyYXdlcicpO1xyXG4gICAgaWYgKGRyYXdlcikge1xyXG4gICAgICBsYW5nLm1peGluKGRyYXdlciwgdGhpcy5fY3JlYXRlQWN0aW9ucygpKTtcclxuICAgICAgZHJhd2VyLnNldExheW91dCh0aGlzLmNyZWF0ZVJpZ2h0RHJhd2VyTGF5b3V0KCkpO1xyXG4gICAgICBkcmF3ZXIuZ2V0R3JvdXBGb3JFbnRyeSA9IGxhbmcuaGl0Y2godGhpcywgZnVuY3Rpb24gZ2V0R3JvdXBGb3JSaWdodERyYXdlckVudHJ5KGVudHJ5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0R3JvdXBGb3JSaWdodERyYXdlckVudHJ5KGVudHJ5KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBBcHAudmlld1NldHRpbmdzTW9kYWwuZWxlbWVudC5vbignY2xvc2UnLCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2hhc0NoYW5nZWRFbnRpdHlQcmVmcykge1xyXG4gICAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICAgICAgdGhpcy5yZWZyZXNoUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgICB0aGlzLnJlYnVpbGRXaWRnZXRzKCk7XHJcbiAgICAgICAgICB0aGlzLl9oYXNDaGFuZ2VkRW50aXR5UHJlZnMgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9oYXNDaGFuZ2VkS1BJUHJlZnMgJiYgdGhpcy5yZWJ1aWxkV2lkZ2V0cykge1xyXG4gICAgICAgICAgdGhpcy5yZWJ1aWxkV2lkZ2V0cygpO1xyXG4gICAgICAgICAgdGhpcy5faGFzQ2hhbmdlZEtQSVByZWZzID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIHVubG9hZFJpZ2h0RHJhd2VyOiBmdW5jdGlvbiB1bmxvYWRSaWdodERyYXdlcigpIHtcclxuICAgIGNvbnN0IGRyYXdlciA9IEFwcC5nZXRWaWV3KCdyaWdodF9kcmF3ZXInKTtcclxuICAgIGlmIChkcmF3ZXIpIHtcclxuICAgICAgZHJhd2VyLnNldExheW91dChbXSk7XHJcbiAgICAgIGRyYXdlci5nZXRHcm91cEZvckVudHJ5ID0gZnVuY3Rpb24gbm9vcCgpIHt9O1xyXG4gICAgICBBcHAudmlld1NldHRpbmdzTW9kYWwuZWxlbWVudC5vZmYoJ2Nsb3NlJyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBfb25TZWFyY2hFeHByZXNzaW9uOiBmdW5jdGlvbiBfb25TZWFyY2hFeHByZXNzaW9uKCkge1xyXG4gICAgLy8gVE9ETzogRG9uJ3QgZXh0ZW5kIHRoaXMgcHJpdmF0ZSBmdW5jdGlvbiAtIGNvbm5lY3QgdG8gdGhlIHNlYXJjaCB3aWRnZXQgb25TZWFyY2hFeHByZXNzaW9uIGluc3RlYWRcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBfY3JlYXRlQWN0aW9uczogZnVuY3Rpb24gX2NyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAvLyBUaGVzZSBhY3Rpb25zIHdpbGwgZ2V0IG1peGVkIGludG8gdGhlIHJpZ2h0IGRyYXdlciB2aWV3LlxyXG4gICAgY29uc3QgYWN0aW9ucyA9IHtcclxuICAgICAgZW50aXR5RmlsdGVyQ2xpY2tlZDogZnVuY3Rpb24gb25lbnRpdHlGaWx0ZXJDbGlja2VkKHBhcmFtcykge1xyXG4gICAgICAgIGNvbnN0IHByZWZzID0gQXBwLnByZWZlcmVuY2VzICYmIEFwcC5wcmVmZXJlbmNlcy5vZmZsaW5lRW50aXR5RmlsdGVycztcclxuXHJcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IHByZWZzLmZpbHRlcigocHJlZikgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHByZWYubmFtZSA9PT0gcGFyYW1zLmVudGl0eW5hbWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIGNvbnN0IGVuYWJsZWQgPSAhIXJlc3VsdHNbMF0uZW5hYmxlZDtcclxuICAgICAgICAgIHJlc3VsdHNbMF0uZW5hYmxlZCA9ICFlbmFibGVkO1xyXG4gICAgICAgICAgQXBwLnBlcnNpc3RQcmVmZXJlbmNlcygpO1xyXG4gICAgICAgICAgdGhpcy5faGFzQ2hhbmdlZEVudGl0eVByZWZzID0gdHJ1ZTtcclxuICAgICAgICAgICQocGFyYW1zLiRzb3VyY2UpLmF0dHIoJ2RhdGEtZW5hYmxlZCcsICghZW5hYmxlZClcclxuICAgICAgICAgICAgLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfS5iaW5kKHRoaXMpLFxyXG4gICAgICBrcGlDbGlja2VkOiBmdW5jdGlvbiBrcGlDbGlja2VkKHBhcmFtcykge1xyXG4gICAgICAgIGNvbnN0IG1ldHJpY3MgPSBBcHAuZ2V0TWV0cmljc0J5UmVzb3VyY2VLaW5kKHRoaXMucmVzb3VyY2VLaW5kKTtcclxuICAgICAgICBsZXQgcmVzdWx0cztcclxuXHJcbiAgICAgICAgaWYgKG1ldHJpY3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgcmVzdWx0cyA9IG1ldHJpY3MuZmlsdGVyKChtZXRyaWMpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG1ldHJpYy50aXRsZSA9PT0gcGFyYW1zLnRpdGxlO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocmVzdWx0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICBjb25zdCBlbmFibGVkID0gISFyZXN1bHRzWzBdLmVuYWJsZWQ7XHJcbiAgICAgICAgICByZXN1bHRzWzBdLmVuYWJsZWQgPSAhZW5hYmxlZDtcclxuICAgICAgICAgIEFwcC5wZXJzaXN0UHJlZmVyZW5jZXMoKTtcclxuICAgICAgICAgIHRoaXMuX2hhc0NoYW5nZWRLUElQcmVmcyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgJChwYXJhbXMuJHNvdXJjZSkuYXR0cignZGF0YS1lbmFibGVkJywgKCFlbmFibGVkKS50b1N0cmluZygpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0uYmluZCh0aGlzKSxcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIGFjdGlvbnM7XHJcbiAgfSxcclxuICBnZXRHcm91cEZvclJpZ2h0RHJhd2VyRW50cnk6IGZ1bmN0aW9uIGdldEdyb3VwRm9yUmlnaHREcmF3ZXJFbnRyeShlbnRyeSkge1xyXG4gICAgY29uc3QgbWl4aW4gPSBsYW5nLmdldE9iamVjdChtaXhpbk5hbWUpO1xyXG5cclxuICAgIGlmIChlbnRyeS5kYXRhUHJvcHMgJiYgZW50cnkuZGF0YVByb3BzLmVudGl0eW5hbWUpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB0YWc6ICd2aWV3JyxcclxuICAgICAgICB0aXRsZTogbWl4aW4ucHJvdG90eXBlLmVudGl0eVNlY3Rpb25UZXh0LFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRhZzogJ2twaScsXHJcbiAgICAgIHRpdGxlOiBtaXhpbi5wcm90b3R5cGUua3BpU2VjdGlvblRleHQsXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgY3JlYXRlUmlnaHREcmF3ZXJMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZVJpZ2h0RHJhd2VyTGF5b3V0KCkge1xyXG4gICAgY29uc3QgbGF5b3V0ID0gW107XHJcbiAgICBjb25zdCBlbnRpdHlTZWN0aW9uID0ge1xyXG4gICAgICBpZDogJ2FjdGlvbnMnLFxyXG4gICAgICBjaGlsZHJlbjogT2JqZWN0LmtleXModGhpcy5lbnRpdHlNYXBwaW5ncylcclxuICAgICAgICAubWFwKChlbnRpdHlOYW1lKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBwcmVmcyA9IEFwcC5wcmVmZXJlbmNlcyAmJiBBcHAucHJlZmVyZW5jZXMub2ZmbGluZUVudGl0eUZpbHRlcnM7XHJcbiAgICAgICAgICBjb25zdCBlbnRpdHlQcmVmID0gcHJlZnMuZmlsdGVyKChwcmVmKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBwcmVmLm5hbWUgPT09IGVudGl0eU5hbWU7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgZW5hYmxlZCxcclxuICAgICAgICAgIH0gPSBlbnRpdHlQcmVmWzBdO1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmFtZTogZW50aXR5TmFtZSxcclxuICAgICAgICAgICAgYWN0aW9uOiAnZW50aXR5RmlsdGVyQ2xpY2tlZCcsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLmVudGl0eVRleHRbZW50aXR5TmFtZV0gfHwgZW50aXR5TmFtZSxcclxuICAgICAgICAgICAgZGF0YVByb3BzOiB7XHJcbiAgICAgICAgICAgICAgZW50aXR5bmFtZTogZW50aXR5TmFtZSxcclxuICAgICAgICAgICAgICBlbmFibGVkOiAhIWVuYWJsZWQsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH0pLFxyXG4gICAgfTtcclxuXHJcbiAgICBsYXlvdXQucHVzaChlbnRpdHlTZWN0aW9uKTtcclxuXHJcbiAgICBjb25zdCBtZXRyaWNzID0gQXBwLmdldE1ldHJpY3NCeVJlc291cmNlS2luZCh0aGlzLnJlc291cmNlS2luZCk7XHJcblxyXG4gICAgY29uc3Qga3BpU2VjdGlvbiA9IHtcclxuICAgICAgaWQ6ICdrcGknLFxyXG4gICAgICBjaGlsZHJlbjogbWV0cmljcy5maWx0ZXIobSA9PiBtLnRpdGxlKS5tYXAoKG1ldHJpYywgaSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBuYW1lOiBgS1BJJHtpfWAsXHJcbiAgICAgICAgICBhY3Rpb246ICdrcGlDbGlja2VkJyxcclxuICAgICAgICAgIHRpdGxlOiBtZXRyaWMudGl0bGUsXHJcbiAgICAgICAgICBkYXRhUHJvcHM6IHtcclxuICAgICAgICAgICAgdGl0bGU6IG1ldHJpYy50aXRsZSxcclxuICAgICAgICAgICAgZW5hYmxlZDogISFtZXRyaWMuZW5hYmxlZCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSksXHJcbiAgICB9O1xyXG5cclxuICAgIGxheW91dC5wdXNoKGtwaVNlY3Rpb24pO1xyXG4gICAgcmV0dXJuIGxheW91dDtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==