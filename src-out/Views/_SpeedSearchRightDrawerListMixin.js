define('crm/Views/_SpeedSearchRightDrawerListMixin', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './_RightDrawerBaseMixin', 'argos/I18n'], function (module, exports, _declare, _lang, _RightDrawerBaseMixin2, _I18n) {
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

  var resource = (0, _I18n2.default)('speedSearchRightDrawerListMixin');

  /**
   * @class crm.Views._SpeedSearchRightDrawerListMixin
   * @classdesc Speedsearch specific mixin for right drawer functionality.
   * @mixins crm.Views._RightDrawerBaseMixin
   *
   */
  var __class = (0, _declare2.default)('crm.Views._SpeedSearchRightDrawerListMixin', [_RightDrawerBaseMixin3.default], {
    // Localization
    indexSectionText: resource.indexSectionText,

    _hasChangedIndexPrefs: false, // Dirty flag so we know when to reload the widgets
    hasSettings: true,

    onShow: function onShow() {
      this.setDefaultIndexPreferences();
    },
    openSettings: function openSettings() {
      App.viewSettingsModal.open();
    },
    setDefaultIndexPreferences: function setDefaultIndexPreferences() {
      if (!App.preferences.speedSeacrchIndexes) {
        var defaults = this.getDefaultIndexPrefences();
        App.preferences.speedSearchIndexes = defaults;
        App.persistPreferences();
      }
    },
    getDefaultIndexPrefences: function getDefaultIndexPrefences() {
      var _this = this;

      var defaults = [];
      if (this.indexes) {
        this.indexes.forEach(function (index) {
          defaults.push({
            indexName: index.indexName,
            enabled: _this._isIndexActive(index.indexName)
          });
        });
      }
      return defaults;
    },
    setupRightDrawer: function setupRightDrawer() {
      var _this2 = this;

      var drawer = App.getView('right_drawer');
      if (drawer) {
        _lang2.default.mixin(drawer, this._createActions());
        drawer.setLayout(this.createRightDrawerLayout());
        drawer.getGroupForEntry = _lang2.default.hitch(this, function getGroupForRightDrawerEntry(entry) {
          return this.getGroupForRightDrawerEntry(entry);
        });

        if (this.rebuildWidgets) {
          App.viewSettingsModal.element.on('close', function () {
            if (_this2._hasChangedIndexPrefs) {
              _this2.rebuildWidgets();
              _this2._hasChangedIndexPrefs = false;
            }
          });
        }
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
        indexClicked: _lang2.default.hitch(this, function onIndexClicked(params) {
          var prefs = App.preferences && App.preferences.speedSearchIndexes;

          var results = prefs.filter(function (pref) {
            return pref.indexName === params.indexname; // the index name is lower cased.
          });
          this.activateIndex(params.indexname);
          if (results.length > 0) {
            var enabled = !!results[0].enabled;
            results[0].enabled = !enabled;
            App.persistPreferences();
            this._hasChangedIndexPrefs = true;
            $(params.$source).attr('data-enabled', (!enabled).toString());
          }
        })
      };

      return actions;
    },
    getGroupForRightDrawerEntry: function getGroupForRightDrawerEntry(entry) {
      if (entry.dataProps && entry.dataProps.indexname) {
        return {
          tag: 'view',
          title: resource.indexSectionText
        };
      }
    },
    createRightDrawerLayout: function createRightDrawerLayout() {
      var _this3 = this;

      var layout = [];

      var indexSection = {
        id: 'actions',
        children: []
      };
      var prefs = App.preferences && App.preferences.speedSearchIndexes;
      if (this.indexes) {
        for (var i in this.indexes) {
          if (this.indexes.hasOwnProperty(i)) {
            (function () {
              var index = _this3.indexes[i];
              var indexPref = prefs.filter(function (pref) {
                // eslint-disable-line
                return pref.indexName === index.indexName;
              });
              index = _this3.indexes[i];
              if (index.hasOwnProperty('indexName')) {
                indexSection.children.push({
                  name: index.indexName,
                  action: 'indexClicked',
                  title: _this3.indexesText[index.indexName] || index.indexName,
                  dataProps: {
                    indexname: index.indexName,
                    enabled: !!indexPref[0].enabled
                  }
                });
              }
            })();
          }
        }
      }

      layout.push(indexSection);
      return layout;
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9fU3BlZWRTZWFyY2hSaWdodERyYXdlckxpc3RNaXhpbi5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJpbmRleFNlY3Rpb25UZXh0IiwiX2hhc0NoYW5nZWRJbmRleFByZWZzIiwiaGFzU2V0dGluZ3MiLCJvblNob3ciLCJzZXREZWZhdWx0SW5kZXhQcmVmZXJlbmNlcyIsIm9wZW5TZXR0aW5ncyIsIkFwcCIsInZpZXdTZXR0aW5nc01vZGFsIiwib3BlbiIsInByZWZlcmVuY2VzIiwic3BlZWRTZWFjcmNoSW5kZXhlcyIsImRlZmF1bHRzIiwiZ2V0RGVmYXVsdEluZGV4UHJlZmVuY2VzIiwic3BlZWRTZWFyY2hJbmRleGVzIiwicGVyc2lzdFByZWZlcmVuY2VzIiwiaW5kZXhlcyIsImZvckVhY2giLCJpbmRleCIsInB1c2giLCJpbmRleE5hbWUiLCJlbmFibGVkIiwiX2lzSW5kZXhBY3RpdmUiLCJzZXR1cFJpZ2h0RHJhd2VyIiwiZHJhd2VyIiwiZ2V0VmlldyIsIm1peGluIiwiX2NyZWF0ZUFjdGlvbnMiLCJzZXRMYXlvdXQiLCJjcmVhdGVSaWdodERyYXdlckxheW91dCIsImdldEdyb3VwRm9yRW50cnkiLCJoaXRjaCIsImdldEdyb3VwRm9yUmlnaHREcmF3ZXJFbnRyeSIsImVudHJ5IiwicmVidWlsZFdpZGdldHMiLCJlbGVtZW50Iiwib24iLCJ1bmxvYWRSaWdodERyYXdlciIsInNuYXBwZXJPZmYiLCJvZmYiLCJfb25TZWFyY2hFeHByZXNzaW9uIiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiYWN0aW9ucyIsImluZGV4Q2xpY2tlZCIsIm9uSW5kZXhDbGlja2VkIiwicGFyYW1zIiwicHJlZnMiLCJyZXN1bHRzIiwiZmlsdGVyIiwicHJlZiIsImluZGV4bmFtZSIsImFjdGl2YXRlSW5kZXgiLCJsZW5ndGgiLCIkIiwiJHNvdXJjZSIsImF0dHIiLCJ0b1N0cmluZyIsImRhdGFQcm9wcyIsInRhZyIsInRpdGxlIiwibGF5b3V0IiwiaW5kZXhTZWN0aW9uIiwiaWQiLCJjaGlsZHJlbiIsImkiLCJoYXNPd25Qcm9wZXJ0eSIsImluZGV4UHJlZiIsIm5hbWUiLCJhY3Rpb24iLCJpbmRleGVzVGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFxQkEsTUFBTUEsV0FBVyxvQkFBWSxpQ0FBWixDQUFqQjs7QUFFQTs7Ozs7O0FBTUEsTUFBTUMsVUFBVSx1QkFBUSw0Q0FBUixFQUFzRCxnQ0FBdEQsRUFBK0U7QUFDN0Y7QUFDQUMsc0JBQWtCRixTQUFTRSxnQkFGa0U7O0FBSTdGQywyQkFBdUIsS0FKc0UsRUFJL0Q7QUFDOUJDLGlCQUFhLElBTGdGOztBQU83RkMsWUFBUSxTQUFTQSxNQUFULEdBQWtCO0FBQ3hCLFdBQUtDLDBCQUFMO0FBQ0QsS0FUNEY7QUFVN0ZDLGtCQUFjLFNBQVNBLFlBQVQsR0FBd0I7QUFDcENDLFVBQUlDLGlCQUFKLENBQXNCQyxJQUF0QjtBQUNELEtBWjRGO0FBYTdGSixnQ0FBNEIsU0FBU0EsMEJBQVQsR0FBc0M7QUFDaEUsVUFBSSxDQUFDRSxJQUFJRyxXQUFKLENBQWdCQyxtQkFBckIsRUFBMEM7QUFDeEMsWUFBTUMsV0FBVyxLQUFLQyx3QkFBTCxFQUFqQjtBQUNBTixZQUFJRyxXQUFKLENBQWdCSSxrQkFBaEIsR0FBcUNGLFFBQXJDO0FBQ0FMLFlBQUlRLGtCQUFKO0FBQ0Q7QUFDRixLQW5CNEY7QUFvQjdGRiw4QkFBMEIsU0FBU0Esd0JBQVQsR0FBb0M7QUFBQTs7QUFDNUQsVUFBTUQsV0FBVyxFQUFqQjtBQUNBLFVBQUksS0FBS0ksT0FBVCxFQUFrQjtBQUNoQixhQUFLQSxPQUFMLENBQWFDLE9BQWIsQ0FBcUIsVUFBQ0MsS0FBRCxFQUFXO0FBQzlCTixtQkFBU08sSUFBVCxDQUFjO0FBQ1pDLHVCQUFXRixNQUFNRSxTQURMO0FBRVpDLHFCQUFTLE1BQUtDLGNBQUwsQ0FBb0JKLE1BQU1FLFNBQTFCO0FBRkcsV0FBZDtBQUlE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QUFQO0FBQ0Q7QUE5SDRGLEdBQS9FLENBQWhCOztvQkFpSWU3RCxPIiwiZmlsZSI6Il9TcGVlZFNlYXJjaFJpZ2h0RHJhd2VyTGlzdE1peGluLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IF9SaWdodERyYXdlckJhc2VNaXhpbiBmcm9tICcuL19SaWdodERyYXdlckJhc2VNaXhpbic7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdzcGVlZFNlYXJjaFJpZ2h0RHJhd2VyTGlzdE1peGluJyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5fU3BlZWRTZWFyY2hSaWdodERyYXdlckxpc3RNaXhpblxyXG4gKiBAY2xhc3NkZXNjIFNwZWVkc2VhcmNoIHNwZWNpZmljIG1peGluIGZvciByaWdodCBkcmF3ZXIgZnVuY3Rpb25hbGl0eS5cclxuICogQG1peGlucyBjcm0uVmlld3MuX1JpZ2h0RHJhd2VyQmFzZU1peGluXHJcbiAqXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLl9TcGVlZFNlYXJjaFJpZ2h0RHJhd2VyTGlzdE1peGluJywgW19SaWdodERyYXdlckJhc2VNaXhpbl0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICBpbmRleFNlY3Rpb25UZXh0OiByZXNvdXJjZS5pbmRleFNlY3Rpb25UZXh0LFxyXG5cclxuICBfaGFzQ2hhbmdlZEluZGV4UHJlZnM6IGZhbHNlLCAvLyBEaXJ0eSBmbGFnIHNvIHdlIGtub3cgd2hlbiB0byByZWxvYWQgdGhlIHdpZGdldHNcclxuICBoYXNTZXR0aW5nczogdHJ1ZSxcclxuXHJcbiAgb25TaG93OiBmdW5jdGlvbiBvblNob3coKSB7XHJcbiAgICB0aGlzLnNldERlZmF1bHRJbmRleFByZWZlcmVuY2VzKCk7XHJcbiAgfSxcclxuICBvcGVuU2V0dGluZ3M6IGZ1bmN0aW9uIG9wZW5TZXR0aW5ncygpIHtcclxuICAgIEFwcC52aWV3U2V0dGluZ3NNb2RhbC5vcGVuKCk7XHJcbiAgfSxcclxuICBzZXREZWZhdWx0SW5kZXhQcmVmZXJlbmNlczogZnVuY3Rpb24gc2V0RGVmYXVsdEluZGV4UHJlZmVyZW5jZXMoKSB7XHJcbiAgICBpZiAoIUFwcC5wcmVmZXJlbmNlcy5zcGVlZFNlYWNyY2hJbmRleGVzKSB7XHJcbiAgICAgIGNvbnN0IGRlZmF1bHRzID0gdGhpcy5nZXREZWZhdWx0SW5kZXhQcmVmZW5jZXMoKTtcclxuICAgICAgQXBwLnByZWZlcmVuY2VzLnNwZWVkU2VhcmNoSW5kZXhlcyA9IGRlZmF1bHRzO1xyXG4gICAgICBBcHAucGVyc2lzdFByZWZlcmVuY2VzKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBnZXREZWZhdWx0SW5kZXhQcmVmZW5jZXM6IGZ1bmN0aW9uIGdldERlZmF1bHRJbmRleFByZWZlbmNlcygpIHtcclxuICAgIGNvbnN0IGRlZmF1bHRzID0gW107XHJcbiAgICBpZiAodGhpcy5pbmRleGVzKSB7XHJcbiAgICAgIHRoaXMuaW5kZXhlcy5mb3JFYWNoKChpbmRleCkgPT4ge1xyXG4gICAgICAgIGRlZmF1bHRzLnB1c2goe1xyXG4gICAgICAgICAgaW5kZXhOYW1lOiBpbmRleC5pbmRleE5hbWUsXHJcbiAgICAgICAgICBlbmFibGVkOiB0aGlzLl9pc0luZGV4QWN0aXZlKGluZGV4LmluZGV4TmFtZSksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRlZmF1bHRzO1xyXG4gIH0sXHJcbiAgc2V0dXBSaWdodERyYXdlcjogZnVuY3Rpb24gc2V0dXBSaWdodERyYXdlcigpIHtcclxuICAgIGNvbnN0IGRyYXdlciA9IEFwcC5nZXRWaWV3KCdyaWdodF9kcmF3ZXInKTtcclxuICAgIGlmIChkcmF3ZXIpIHtcclxuICAgICAgbGFuZy5taXhpbihkcmF3ZXIsIHRoaXMuX2NyZWF0ZUFjdGlvbnMoKSk7XHJcbiAgICAgIGRyYXdlci5zZXRMYXlvdXQodGhpcy5jcmVhdGVSaWdodERyYXdlckxheW91dCgpKTtcclxuICAgICAgZHJhd2VyLmdldEdyb3VwRm9yRW50cnkgPSBsYW5nLmhpdGNoKHRoaXMsIGZ1bmN0aW9uIGdldEdyb3VwRm9yUmlnaHREcmF3ZXJFbnRyeShlbnRyeSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEdyb3VwRm9yUmlnaHREcmF3ZXJFbnRyeShlbnRyeSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKHRoaXMucmVidWlsZFdpZGdldHMpIHtcclxuICAgICAgICBBcHAudmlld1NldHRpbmdzTW9kYWwuZWxlbWVudC5vbignY2xvc2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICBpZiAodGhpcy5faGFzQ2hhbmdlZEluZGV4UHJlZnMpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWJ1aWxkV2lkZ2V0cygpO1xyXG4gICAgICAgICAgICB0aGlzLl9oYXNDaGFuZ2VkSW5kZXhQcmVmcyA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICB1bmxvYWRSaWdodERyYXdlcjogZnVuY3Rpb24gdW5sb2FkUmlnaHREcmF3ZXIoKSB7XHJcbiAgICBjb25zdCBkcmF3ZXIgPSBBcHAuZ2V0VmlldygncmlnaHRfZHJhd2VyJyk7XHJcbiAgICBpZiAoZHJhd2VyKSB7XHJcbiAgICAgIGRyYXdlci5zZXRMYXlvdXQoW10pO1xyXG4gICAgICBkcmF3ZXIuZ2V0R3JvdXBGb3JFbnRyeSA9IGZ1bmN0aW9uIHNuYXBwZXJPZmYoKSB7fTtcclxuICAgICAgQXBwLnZpZXdTZXR0aW5nc01vZGFsLmVsZW1lbnQub2ZmKCdjbG9zZScpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgX29uU2VhcmNoRXhwcmVzc2lvbjogZnVuY3Rpb24gX29uU2VhcmNoRXhwcmVzc2lvbigpIHtcclxuICAgIC8vIFRPRE86IERvbid0IGV4dGVuZCB0aGlzIHByaXZhdGUgZnVuY3Rpb24gLSBjb25uZWN0IHRvIHRoZSBzZWFyY2ggd2lkZ2V0IG9uU2VhcmNoRXhwcmVzc2lvbiBpbnN0ZWFkXHJcbiAgICB0aGlzLmluaGVyaXRlZChfb25TZWFyY2hFeHByZXNzaW9uLCBhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgX2NyZWF0ZUFjdGlvbnM6IGZ1bmN0aW9uIF9jcmVhdGVBY3Rpb25zKCkge1xyXG4gICAgLy8gVGhlc2UgYWN0aW9ucyB3aWxsIGdldCBtaXhlZCBpbnRvIHRoZSByaWdodCBkcmF3ZXIgdmlldy5cclxuICAgIGNvbnN0IGFjdGlvbnMgPSB7XHJcbiAgICAgIGluZGV4Q2xpY2tlZDogbGFuZy5oaXRjaCh0aGlzLCBmdW5jdGlvbiBvbkluZGV4Q2xpY2tlZChwYXJhbXMpIHtcclxuICAgICAgICBjb25zdCBwcmVmcyA9IEFwcC5wcmVmZXJlbmNlcyAmJiBBcHAucHJlZmVyZW5jZXMuc3BlZWRTZWFyY2hJbmRleGVzO1xyXG5cclxuICAgICAgICBjb25zdCByZXN1bHRzID0gcHJlZnMuZmlsdGVyKChwcmVmKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gcHJlZi5pbmRleE5hbWUgPT09IHBhcmFtcy5pbmRleG5hbWU7IC8vIHRoZSBpbmRleCBuYW1lIGlzIGxvd2VyIGNhc2VkLlxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuYWN0aXZhdGVJbmRleChwYXJhbXMuaW5kZXhuYW1lKTtcclxuICAgICAgICBpZiAocmVzdWx0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICBjb25zdCBlbmFibGVkID0gISFyZXN1bHRzWzBdLmVuYWJsZWQ7XHJcbiAgICAgICAgICByZXN1bHRzWzBdLmVuYWJsZWQgPSAhZW5hYmxlZDtcclxuICAgICAgICAgIEFwcC5wZXJzaXN0UHJlZmVyZW5jZXMoKTtcclxuICAgICAgICAgIHRoaXMuX2hhc0NoYW5nZWRJbmRleFByZWZzID0gdHJ1ZTtcclxuICAgICAgICAgICQocGFyYW1zLiRzb3VyY2UpLmF0dHIoJ2RhdGEtZW5hYmxlZCcsICghZW5hYmxlZCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KSxcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIGFjdGlvbnM7XHJcbiAgfSxcclxuICBnZXRHcm91cEZvclJpZ2h0RHJhd2VyRW50cnk6IGZ1bmN0aW9uIGdldEdyb3VwRm9yUmlnaHREcmF3ZXJFbnRyeShlbnRyeSkge1xyXG4gICAgaWYgKGVudHJ5LmRhdGFQcm9wcyAmJiBlbnRyeS5kYXRhUHJvcHMuaW5kZXhuYW1lKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdGFnOiAndmlldycsXHJcbiAgICAgICAgdGl0bGU6IHJlc291cmNlLmluZGV4U2VjdGlvblRleHQsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfSxcclxuICBjcmVhdGVSaWdodERyYXdlckxheW91dDogZnVuY3Rpb24gY3JlYXRlUmlnaHREcmF3ZXJMYXlvdXQoKSB7XHJcbiAgICBjb25zdCBsYXlvdXQgPSBbXTtcclxuXHJcbiAgICBjb25zdCBpbmRleFNlY3Rpb24gPSB7XHJcbiAgICAgIGlkOiAnYWN0aW9ucycsXHJcbiAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgIH07XHJcbiAgICBjb25zdCBwcmVmcyA9IEFwcC5wcmVmZXJlbmNlcyAmJiBBcHAucHJlZmVyZW5jZXMuc3BlZWRTZWFyY2hJbmRleGVzO1xyXG4gICAgaWYgKHRoaXMuaW5kZXhlcykge1xyXG4gICAgICBmb3IgKGNvbnN0IGkgaW4gdGhpcy5pbmRleGVzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5kZXhlcy5oYXNPd25Qcm9wZXJ0eShpKSkge1xyXG4gICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5pbmRleGVzW2ldO1xyXG4gICAgICAgICAgY29uc3QgaW5kZXhQcmVmID0gcHJlZnMuZmlsdGVyKChwcmVmKSA9PiB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgICAgICAgcmV0dXJuIHByZWYuaW5kZXhOYW1lID09PSBpbmRleC5pbmRleE5hbWU7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGluZGV4ID0gdGhpcy5pbmRleGVzW2ldO1xyXG4gICAgICAgICAgaWYgKGluZGV4Lmhhc093blByb3BlcnR5KCdpbmRleE5hbWUnKSkge1xyXG4gICAgICAgICAgICBpbmRleFNlY3Rpb24uY2hpbGRyZW4ucHVzaCh7XHJcbiAgICAgICAgICAgICAgbmFtZTogaW5kZXguaW5kZXhOYW1lLFxyXG4gICAgICAgICAgICAgIGFjdGlvbjogJ2luZGV4Q2xpY2tlZCcsXHJcbiAgICAgICAgICAgICAgdGl0bGU6IHRoaXMuaW5kZXhlc1RleHRbaW5kZXguaW5kZXhOYW1lXSB8fCBpbmRleC5pbmRleE5hbWUsXHJcbiAgICAgICAgICAgICAgZGF0YVByb3BzOiB7XHJcbiAgICAgICAgICAgICAgICBpbmRleG5hbWU6IGluZGV4LmluZGV4TmFtZSxcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6ICEhaW5kZXhQcmVmWzBdLmVuYWJsZWQsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGF5b3V0LnB1c2goaW5kZXhTZWN0aW9uKTtcclxuICAgIHJldHVybiBsYXlvdXQ7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=