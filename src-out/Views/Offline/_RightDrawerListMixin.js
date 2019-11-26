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
      this.inherited(_onSearchExpression, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9PZmZsaW5lL19SaWdodERyYXdlckxpc3RNaXhpbi5qcyJdLCJuYW1lcyI6WyJtaXhpbk5hbWUiLCJfX2NsYXNzIiwiZW50aXR5U2VjdGlvblRleHQiLCJrcGlTZWN0aW9uVGV4dCIsImhhc1NldHRpbmdzIiwiX2hhc0NoYW5nZWRFbnRpdHlQcmVmcyIsIl9oYXNDaGFuZ2VkS1BJUHJlZnMiLCJvblNob3ciLCJzZXREZWZhdWx0RW50aXR5UHJlZmVyZW5jZXMiLCJvcGVuU2V0dGluZ3MiLCJBcHAiLCJ2aWV3U2V0dGluZ3NNb2RhbCIsIm9wZW4iLCJwcmVmZXJlbmNlcyIsIm9mZmxpbmVFbnRpdHlGaWx0ZXJzIiwiZGVmYXVsdHMiLCJnZXREZWZhdWx0RW50aXR5UHJlZmVyZW5jZXMiLCJwZXJzaXN0UHJlZmVyZW5jZXMiLCJPYmplY3QiLCJrZXlzIiwiZW50aXR5TWFwcGluZ3MiLCJtYXAiLCJuYW1lIiwiZW5hYmxlZCIsInNldHVwUmlnaHREcmF3ZXIiLCJkcmF3ZXIiLCJnZXRWaWV3IiwibWl4aW4iLCJfY3JlYXRlQWN0aW9ucyIsInNldExheW91dCIsImNyZWF0ZVJpZ2h0RHJhd2VyTGF5b3V0IiwiZ2V0R3JvdXBGb3JFbnRyeSIsImhpdGNoIiwiZ2V0R3JvdXBGb3JSaWdodERyYXdlckVudHJ5IiwiZW50cnkiLCJlbGVtZW50Iiwib24iLCJjbGVhciIsInJlZnJlc2hSZXF1aXJlZCIsInJlZnJlc2giLCJyZWJ1aWxkV2lkZ2V0cyIsInVubG9hZFJpZ2h0RHJhd2VyIiwibm9vcCIsIm9mZiIsIl9vblNlYXJjaEV4cHJlc3Npb24iLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJhY3Rpb25zIiwiZW50aXR5RmlsdGVyQ2xpY2tlZCIsIm9uZW50aXR5RmlsdGVyQ2xpY2tlZCIsInBhcmFtcyIsInByZWZzIiwicmVzdWx0cyIsImZpbHRlciIsInByZWYiLCJlbnRpdHluYW1lIiwibGVuZ3RoIiwiJCIsIiRzb3VyY2UiLCJhdHRyIiwidG9TdHJpbmciLCJiaW5kIiwia3BpQ2xpY2tlZCIsIm1ldHJpY3MiLCJnZXRNZXRyaWNzQnlSZXNvdXJjZUtpbmQiLCJyZXNvdXJjZUtpbmQiLCJtZXRyaWMiLCJ0aXRsZSIsImdldE9iamVjdCIsImRhdGFQcm9wcyIsInRhZyIsInByb3RvdHlwZSIsImxheW91dCIsImVudGl0eVNlY3Rpb24iLCJpZCIsImNoaWxkcmVuIiwiZW50aXR5TmFtZSIsImVudGl0eVByZWYiLCJhY3Rpb24iLCJlbnRpdHlUZXh0IiwicHVzaCIsImtwaVNlY3Rpb24iLCJtIiwiaSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkEsTUFBTUEsWUFBWSx5Q0FBbEI7O0FBRUE7Ozs7OztBQXRCQTs7Ozs7Ozs7Ozs7Ozs7O0FBNEJBLE1BQU1DLFVBQVUsdUJBQVEseUNBQVIsRUFBbUQsZ0NBQW5ELEVBQTRFO0FBQzFGO0FBQ0FDLHVCQUFtQixRQUZ1RTtBQUcxRkMsb0JBQWdCLEtBSDBFO0FBSTFGQyxpQkFBYSxJQUo2RTs7QUFNMUY7QUFDQUMsNEJBQXdCLEtBUGtFO0FBUTFGQyx5QkFBcUIsS0FScUU7QUFTMUZDLFlBQVEsU0FBU0EsTUFBVCxHQUFrQjtBQUN4QixXQUFLQywyQkFBTDtBQUNELEtBWHlGO0FBWTFGQyxrQkFBYyxTQUFTQSxZQUFULEdBQXdCO0FBQ3BDQyxVQUFJQyxpQkFBSixDQUFzQkMsSUFBdEI7QUFDRCxLQWR5RjtBQWUxRkosaUNBQTZCLFNBQVNBLDJCQUFULEdBQXVDO0FBQ2xFLFVBQUksQ0FBQ0UsSUFBSUcsV0FBSixDQUFnQkMsb0JBQXJCLEVBQTJDO0FBQ3pDLFlBQU1DLFdBQVcsS0FBS0MsMkJBQUwsRUFBakI7QUFDQU4sWUFBSUcsV0FBSixDQUFnQkMsb0JBQWhCLEdBQXVDQyxRQUF2QztBQUNBTCxZQUFJTyxrQkFBSjtBQUNEO0FBQ0YsS0FyQnlGO0FBc0IxRkQsaUNBQTZCLFNBQVNBLDJCQUFULEdBQXVDO0FBQ2xFLGFBQU9FLE9BQU9DLElBQVAsQ0FBWSxLQUFLQyxj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dUJBQVc7QUFDVEYscUJBQU9ELE9BQU9DLEtBREw7QUFFVDVDLHVCQUFTLENBQUMsQ0FBQzJDLE9BQU8zQztBQUZUO0FBSk4sV0FBUDtBQVNELFNBVlM7QUFGTyxPQUFuQjs7QUFlQWlELGFBQU9RLElBQVAsQ0FBWUMsVUFBWjtBQUNBLGFBQU9ULE1BQVA7QUFDRDtBQTNLeUYsR0FBNUUsQ0FBaEI7O29CQThLZXZFLE8iLCJmaWxlIjoiX1JpZ2h0RHJhd2VyTGlzdE1peGluLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IF9SaWdodERyYXdlckJhc2VNaXhpbiBmcm9tICcuLi9fUmlnaHREcmF3ZXJCYXNlTWl4aW4nO1xyXG5cclxuXHJcbmNvbnN0IG1peGluTmFtZSA9ICdjcm0uVmlld3MuT2ZmbGluZS5fUmlnaHREcmF3ZXJMaXN0TWl4aW4nO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuX1NwZWVkU2VhcmNoUmlnaHREcmF3ZXJMaXN0TWl4aW5cclxuICogQGNsYXNzZGVzYyBPZmZsaW5lIHNwZWNpZmljIG1peGluIGZvciByaWdodCBkcmF3ZXIgZnVuY3Rpb25hbGl0eS5cclxuICogQG1peGlucyBjcm0uVmlld3MuX1JpZ2h0RHJhd2VyQmFzZU1peGluXHJcbiAqXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLk9mZmxpbmUuX1JpZ2h0RHJhd2VyTGlzdE1peGluJywgW19SaWdodERyYXdlckJhc2VNaXhpbl0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICBlbnRpdHlTZWN0aW9uVGV4dDogJ0VudGl0eScsXHJcbiAga3BpU2VjdGlvblRleHQ6ICdLUEknLFxyXG4gIGhhc1NldHRpbmdzOiB0cnVlLFxyXG5cclxuICAvLyBEaXJ0eSBmbGFncyB0byByZWZyZXNoIHRoZSBtYWludmlldyBhbmQvb3Igd2lkZ2V0c1xyXG4gIF9oYXNDaGFuZ2VkRW50aXR5UHJlZnM6IGZhbHNlLFxyXG4gIF9oYXNDaGFuZ2VkS1BJUHJlZnM6IGZhbHNlLFxyXG4gIG9uU2hvdzogZnVuY3Rpb24gb25TaG93KCkge1xyXG4gICAgdGhpcy5zZXREZWZhdWx0RW50aXR5UHJlZmVyZW5jZXMoKTtcclxuICB9LFxyXG4gIG9wZW5TZXR0aW5nczogZnVuY3Rpb24gb3BlblNldHRpbmdzKCkge1xyXG4gICAgQXBwLnZpZXdTZXR0aW5nc01vZGFsLm9wZW4oKTtcclxuICB9LFxyXG4gIHNldERlZmF1bHRFbnRpdHlQcmVmZXJlbmNlczogZnVuY3Rpb24gc2V0RGVmYXVsdEVudGl0eVByZWZlcmVuY2VzKCkge1xyXG4gICAgaWYgKCFBcHAucHJlZmVyZW5jZXMub2ZmbGluZUVudGl0eUZpbHRlcnMpIHtcclxuICAgICAgY29uc3QgZGVmYXVsdHMgPSB0aGlzLmdldERlZmF1bHRFbnRpdHlQcmVmZXJlbmNlcygpO1xyXG4gICAgICBBcHAucHJlZmVyZW5jZXMub2ZmbGluZUVudGl0eUZpbHRlcnMgPSBkZWZhdWx0cztcclxuICAgICAgQXBwLnBlcnNpc3RQcmVmZXJlbmNlcygpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZ2V0RGVmYXVsdEVudGl0eVByZWZlcmVuY2VzOiBmdW5jdGlvbiBnZXREZWZhdWx0RW50aXR5UHJlZmVyZW5jZXMoKSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5lbnRpdHlNYXBwaW5ncylcclxuICAgICAgLm1hcCgobmFtZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBuYW1lLFxyXG4gICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICB9O1xyXG4gICAgICB9KTtcclxuICB9LFxyXG4gIHNldHVwUmlnaHREcmF3ZXI6IGZ1bmN0aW9uIHNldHVwUmlnaHREcmF3ZXIoKSB7XHJcbiAgICBjb25zdCBkcmF3ZXIgPSBBcHAuZ2V0VmlldygncmlnaHRfZHJhd2VyJyk7XHJcbiAgICBpZiAoZHJhd2VyKSB7XHJcbiAgICAgIGxhbmcubWl4aW4oZHJhd2VyLCB0aGlzLl9jcmVhdGVBY3Rpb25zKCkpO1xyXG4gICAgICBkcmF3ZXIuc2V0TGF5b3V0KHRoaXMuY3JlYXRlUmlnaHREcmF3ZXJMYXlvdXQoKSk7XHJcbiAgICAgIGRyYXdlci5nZXRHcm91cEZvckVudHJ5ID0gbGFuZy5oaXRjaCh0aGlzLCBmdW5jdGlvbiBnZXRHcm91cEZvclJpZ2h0RHJhd2VyRW50cnkoZW50cnkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRHcm91cEZvclJpZ2h0RHJhd2VyRW50cnkoZW50cnkpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIEFwcC52aWV3U2V0dGluZ3NNb2RhbC5lbGVtZW50Lm9uKCdjbG9zZScsICgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5faGFzQ2hhbmdlZEVudGl0eVByZWZzKSB7XHJcbiAgICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgICB0aGlzLnJlZnJlc2hSZXF1aXJlZCA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICAgIHRoaXMucmVidWlsZFdpZGdldHMoKTtcclxuICAgICAgICAgIHRoaXMuX2hhc0NoYW5nZWRFbnRpdHlQcmVmcyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2hhc0NoYW5nZWRLUElQcmVmcyAmJiB0aGlzLnJlYnVpbGRXaWRnZXRzKSB7XHJcbiAgICAgICAgICB0aGlzLnJlYnVpbGRXaWRnZXRzKCk7XHJcbiAgICAgICAgICB0aGlzLl9oYXNDaGFuZ2VkS1BJUHJlZnMgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgdW5sb2FkUmlnaHREcmF3ZXI6IGZ1bmN0aW9uIHVubG9hZFJpZ2h0RHJhd2VyKCkge1xyXG4gICAgY29uc3QgZHJhd2VyID0gQXBwLmdldFZpZXcoJ3JpZ2h0X2RyYXdlcicpO1xyXG4gICAgaWYgKGRyYXdlcikge1xyXG4gICAgICBkcmF3ZXIuc2V0TGF5b3V0KFtdKTtcclxuICAgICAgZHJhd2VyLmdldEdyb3VwRm9yRW50cnkgPSBmdW5jdGlvbiBub29wKCkge307XHJcbiAgICAgIEFwcC52aWV3U2V0dGluZ3NNb2RhbC5lbGVtZW50Lm9mZignY2xvc2UnKTtcclxuICAgIH1cclxuICB9LFxyXG4gIF9vblNlYXJjaEV4cHJlc3Npb246IGZ1bmN0aW9uIF9vblNlYXJjaEV4cHJlc3Npb24oKSB7XHJcbiAgICAvLyBUT0RPOiBEb24ndCBleHRlbmQgdGhpcyBwcml2YXRlIGZ1bmN0aW9uIC0gY29ubmVjdCB0byB0aGUgc2VhcmNoIHdpZGdldCBvblNlYXJjaEV4cHJlc3Npb24gaW5zdGVhZFxyXG4gICAgdGhpcy5pbmhlcml0ZWQoX29uU2VhcmNoRXhwcmVzc2lvbiwgYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIF9jcmVhdGVBY3Rpb25zOiBmdW5jdGlvbiBfY3JlYXRlQWN0aW9ucygpIHtcclxuICAgIC8vIFRoZXNlIGFjdGlvbnMgd2lsbCBnZXQgbWl4ZWQgaW50byB0aGUgcmlnaHQgZHJhd2VyIHZpZXcuXHJcbiAgICBjb25zdCBhY3Rpb25zID0ge1xyXG4gICAgICBlbnRpdHlGaWx0ZXJDbGlja2VkOiBmdW5jdGlvbiBvbmVudGl0eUZpbHRlckNsaWNrZWQocGFyYW1zKSB7XHJcbiAgICAgICAgY29uc3QgcHJlZnMgPSBBcHAucHJlZmVyZW5jZXMgJiYgQXBwLnByZWZlcmVuY2VzLm9mZmxpbmVFbnRpdHlGaWx0ZXJzO1xyXG5cclxuICAgICAgICBjb25zdCByZXN1bHRzID0gcHJlZnMuZmlsdGVyKChwcmVmKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gcHJlZi5uYW1lID09PSBwYXJhbXMuZW50aXR5bmFtZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgY29uc3QgZW5hYmxlZCA9ICEhcmVzdWx0c1swXS5lbmFibGVkO1xyXG4gICAgICAgICAgcmVzdWx0c1swXS5lbmFibGVkID0gIWVuYWJsZWQ7XHJcbiAgICAgICAgICBBcHAucGVyc2lzdFByZWZlcmVuY2VzKCk7XHJcbiAgICAgICAgICB0aGlzLl9oYXNDaGFuZ2VkRW50aXR5UHJlZnMgPSB0cnVlO1xyXG4gICAgICAgICAgJChwYXJhbXMuJHNvdXJjZSkuYXR0cignZGF0YS1lbmFibGVkJywgKCFlbmFibGVkKVxyXG4gICAgICAgICAgICAudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LmJpbmQodGhpcyksXHJcbiAgICAgIGtwaUNsaWNrZWQ6IGZ1bmN0aW9uIGtwaUNsaWNrZWQocGFyYW1zKSB7XHJcbiAgICAgICAgY29uc3QgbWV0cmljcyA9IEFwcC5nZXRNZXRyaWNzQnlSZXNvdXJjZUtpbmQodGhpcy5yZXNvdXJjZUtpbmQpO1xyXG4gICAgICAgIGxldCByZXN1bHRzO1xyXG5cclxuICAgICAgICBpZiAobWV0cmljcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICByZXN1bHRzID0gbWV0cmljcy5maWx0ZXIoKG1ldHJpYykgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbWV0cmljLnRpdGxlID09PSBwYXJhbXMudGl0bGU7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIGNvbnN0IGVuYWJsZWQgPSAhIXJlc3VsdHNbMF0uZW5hYmxlZDtcclxuICAgICAgICAgIHJlc3VsdHNbMF0uZW5hYmxlZCA9ICFlbmFibGVkO1xyXG4gICAgICAgICAgQXBwLnBlcnNpc3RQcmVmZXJlbmNlcygpO1xyXG4gICAgICAgICAgdGhpcy5faGFzQ2hhbmdlZEtQSVByZWZzID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAkKHBhcmFtcy4kc291cmNlKS5hdHRyKCdkYXRhLWVuYWJsZWQnLCAoIWVuYWJsZWQpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfS5iaW5kKHRoaXMpLFxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gYWN0aW9ucztcclxuICB9LFxyXG4gIGdldEdyb3VwRm9yUmlnaHREcmF3ZXJFbnRyeTogZnVuY3Rpb24gZ2V0R3JvdXBGb3JSaWdodERyYXdlckVudHJ5KGVudHJ5KSB7XHJcbiAgICBjb25zdCBtaXhpbiA9IGxhbmcuZ2V0T2JqZWN0KG1peGluTmFtZSk7XHJcblxyXG4gICAgaWYgKGVudHJ5LmRhdGFQcm9wcyAmJiBlbnRyeS5kYXRhUHJvcHMuZW50aXR5bmFtZSkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHRhZzogJ3ZpZXcnLFxyXG4gICAgICAgIHRpdGxlOiBtaXhpbi5wcm90b3R5cGUuZW50aXR5U2VjdGlvblRleHQsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGFnOiAna3BpJyxcclxuICAgICAgdGl0bGU6IG1peGluLnByb3RvdHlwZS5rcGlTZWN0aW9uVGV4dCxcclxuICAgIH07XHJcbiAgfSxcclxuICBjcmVhdGVSaWdodERyYXdlckxheW91dDogZnVuY3Rpb24gY3JlYXRlUmlnaHREcmF3ZXJMYXlvdXQoKSB7XHJcbiAgICBjb25zdCBsYXlvdXQgPSBbXTtcclxuICAgIGNvbnN0IGVudGl0eVNlY3Rpb24gPSB7XHJcbiAgICAgIGlkOiAnYWN0aW9ucycsXHJcbiAgICAgIGNoaWxkcmVuOiBPYmplY3Qua2V5cyh0aGlzLmVudGl0eU1hcHBpbmdzKVxyXG4gICAgICAgIC5tYXAoKGVudGl0eU5hbWUpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHByZWZzID0gQXBwLnByZWZlcmVuY2VzICYmIEFwcC5wcmVmZXJlbmNlcy5vZmZsaW5lRW50aXR5RmlsdGVycztcclxuICAgICAgICAgIGNvbnN0IGVudGl0eVByZWYgPSBwcmVmcy5maWx0ZXIoKHByZWYpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHByZWYubmFtZSA9PT0gZW50aXR5TmFtZTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgY29uc3Qge1xyXG4gICAgICAgICAgICBlbmFibGVkLFxyXG4gICAgICAgICAgfSA9IGVudGl0eVByZWZbMF07XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuYW1lOiBlbnRpdHlOYW1lLFxyXG4gICAgICAgICAgICBhY3Rpb246ICdlbnRpdHlGaWx0ZXJDbGlja2VkJyxcclxuICAgICAgICAgICAgdGl0bGU6IHRoaXMuZW50aXR5VGV4dFtlbnRpdHlOYW1lXSB8fCBlbnRpdHlOYW1lLFxyXG4gICAgICAgICAgICBkYXRhUHJvcHM6IHtcclxuICAgICAgICAgICAgICBlbnRpdHluYW1lOiBlbnRpdHlOYW1lLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6ICEhZW5hYmxlZCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfSksXHJcbiAgICB9O1xyXG5cclxuICAgIGxheW91dC5wdXNoKGVudGl0eVNlY3Rpb24pO1xyXG5cclxuICAgIGNvbnN0IG1ldHJpY3MgPSBBcHAuZ2V0TWV0cmljc0J5UmVzb3VyY2VLaW5kKHRoaXMucmVzb3VyY2VLaW5kKTtcclxuXHJcbiAgICBjb25zdCBrcGlTZWN0aW9uID0ge1xyXG4gICAgICBpZDogJ2twaScsXHJcbiAgICAgIGNoaWxkcmVuOiBtZXRyaWNzLmZpbHRlcihtID0+IG0udGl0bGUpLm1hcCgobWV0cmljLCBpKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIG5hbWU6IGBLUEkke2l9YCxcclxuICAgICAgICAgIGFjdGlvbjogJ2twaUNsaWNrZWQnLFxyXG4gICAgICAgICAgdGl0bGU6IG1ldHJpYy50aXRsZSxcclxuICAgICAgICAgIGRhdGFQcm9wczoge1xyXG4gICAgICAgICAgICB0aXRsZTogbWV0cmljLnRpdGxlLFxyXG4gICAgICAgICAgICBlbmFibGVkOiAhIW1ldHJpYy5lbmFibGVkLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9KSxcclxuICAgIH07XHJcblxyXG4gICAgbGF5b3V0LnB1c2goa3BpU2VjdGlvbik7XHJcbiAgICByZXR1cm4gbGF5b3V0O1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19