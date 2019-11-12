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
      this.inherited(arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9fU3BlZWRTZWFyY2hSaWdodERyYXdlckxpc3RNaXhpbi5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJpbmRleFNlY3Rpb25UZXh0IiwiX2hhc0NoYW5nZWRJbmRleFByZWZzIiwiaGFzU2V0dGluZ3MiLCJvblNob3ciLCJzZXREZWZhdWx0SW5kZXhQcmVmZXJlbmNlcyIsIm9wZW5TZXR0aW5ncyIsIkFwcCIsInZpZXdTZXR0aW5nc01vZGFsIiwib3BlbiIsInByZWZlcmVuY2VzIiwic3BlZWRTZWFjcmNoSW5kZXhlcyIsImRlZmF1bHRzIiwiZ2V0RGVmYXVsdEluZGV4UHJlZmVuY2VzIiwic3BlZWRTZWFyY2hJbmRleGVzIiwicGVyc2lzdFByZWZlcmVuY2VzIiwiaW5kZXhlcyIsImZvckVhY2giLCJpbmRleCIsInB1c2giLCJpbmRleE5hbWUiLCJlbmFibGVkIiwiX2lzSW5kZXhBY3RpdmUiLCJzZXR1cFJpZ2h0RHJhd2VyIiwiZHJhd2VyIiwiZ2V0VmlldyIsIm1peGluIiwiX2NyZWF0ZUFjdGlvbnMiLCJzZXRMYXlvdXQiLCJjcmVhdGVSaWdodERyYXdlckxheW91dCIsImdldEdyb3VwRm9yRW50cnkiLCJoaXRjaCIsImdldEdyb3VwRm9yUmlnaHREcmF3ZXJFbnRyeSIsImVudHJ5IiwicmVidWlsZFdpZGdldHMiLCJlbGVtZW50Iiwib24iLCJ1bmxvYWRSaWdodERyYXdlciIsInNuYXBwZXJPZmYiLCJvZmYiLCJfb25TZWFyY2hFeHByZXNzaW9uIiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiYWN0aW9ucyIsImluZGV4Q2xpY2tlZCIsIm9uSW5kZXhDbGlja2VkIiwicGFyYW1zIiwicHJlZnMiLCJyZXN1bHRzIiwiZmlsdGVyIiwicHJlZiIsImluZGV4bmFtZSIsImFjdGl2YXRlSW5kZXgiLCJsZW5ndGgiLCIkIiwiJHNvdXJjZSIsImF0dHIiLCJ0b1N0cmluZyIsImRhdGFQcm9wcyIsInRhZyIsInRpdGxlIiwibGF5b3V0IiwiaW5kZXhTZWN0aW9uIiwiaWQiLCJjaGlsZHJlbiIsImkiLCJoYXNPd25Qcm9wZXJ0eSIsImluZGV4UHJlZiIsIm5hbWUiLCJhY3Rpb24iLCJpbmRleGVzVGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFxQkEsTUFBTUEsV0FBVyxvQkFBWSxpQ0FBWixDQUFqQjs7QUFFQTs7Ozs7O0FBTUEsTUFBTUMsVUFBVSx1QkFBUSw0Q0FBUixFQUFzRCxnQ0FBdEQsRUFBK0U7QUFDN0Y7QUFDQUMsc0JBQWtCRixTQUFTRSxnQkFGa0U7O0FBSTdGQywyQkFBdUIsS0FKc0UsRUFJL0Q7QUFDOUJDLGlCQUFhLElBTGdGOztBQU83RkMsWUFBUSxTQUFTQSxNQUFULEdBQWtCO0FBQ3hCLFdBQUtDLDBCQUFMO0FBQ0QsS0FUNEY7QUFVN0ZDLGtCQUFjLFNBQVNBLFlBQVQsR0FBd0I7QUFDcENDLFVBQUlDLGlCQUFKLENBQXNCQyxJQUF0QjtBQUNELEtBWjRGO0FBYTdGSixnQ0FBNEIsU0FBU0EsMEJBQVQsR0FBc0M7QUFDaEUsVUFBSSxDQUFDRSxJQUFJRyxXQUFKLENBQWdCQyxtQkFBckIsRUFBMEM7QUFDeEMsWUFBTUMsV0FBVyxLQUFLQyx3QkFBTCxFQUFqQjtBQUNBTixZQUFJRyxXQUFKLENBQWdCSSxrQkFBaEIsR0FBcUNGLFFBQXJDO0FBQ0FMLFlBQUlRLGtCQUFKO0FBQ0Q7QUFDRixLQW5CNEY7QUFvQjdGRiw4QkFBMEIsU0FBU0Esd0JBQVQsR0FBb0M7QUFBQTs7QUFDNUQsVUFBTUQsV0FBVyxFQUFqQjtBQUNBLFVBQUksS0FBS0ksT0FBVCxFQUFrQjtBQUNoQixhQUFLQSxPQUFMLENBQWFDLE9BQWIsQ0FBcUIsVUFBQ0MsS0FBRCxFQUFXO0FBQzlCTixtQkFBU08sSUFBVCxDQUFjO0FBQ1pDLHVCQUFXRixNQUFNRSxTQURMO0FBRVpDLHFCQUFTLE1BQUtDLGNBQUwsQ0FBb0JKLE1BQU1FLFNBQTFCO0FBRkcsV0FBZDtBQUlELFNBTEQ7QUFNRDtBQUNELGFBQU9SLFFBQVA7QUFDRCxLQS9CNEY7QUFnQzdGVyxzQkFBa0IsU0FBU0EsZ0JBQVQsR0FBNEI7QUFBQTs7QUFDNUMsVUFBTUMsU0FBU2pCLElBQUlrQixPQUFKLENBQVksY0FBWixDQUFmO0FBQ0EsVUFBSUQsTUFBSixFQUFZO0FBQ1YsdUJBQUtFLEtBQUwsQ0FBV0YsTUFBWCxFQUFtQixLQUFLRyxjQUFMLEVBQW5CO0FBQ0FILGVBQU9JLFNBQVAsQ0FBaUIsS0FBS0MsdUJBQUwsRUFBakI7QUFDQUwsZUFBT00sZ0JBQVAsR0FBMEIsZUFBS0MsS0FBTCxDQUFXLElBQVgsRUFBaUIsU0FBU0MsMkJBQVQsQ0FBcUNDLEtBQXJDLEVBQTRDO0FBQ3JGLGlCQUFPLEtBQUtELDJCQUFMLENBQWlDQyxLQUFqQyxDQUFQO0FBQ0QsU0FGeUIsQ0FBMUI7O0FBSUEsWUFBSSxLQUFLQyxjQUFULEVBQXlCO0FBQ3ZCM0IsY0FBSUMsaUJBQUosQ0FBc0IyQixPQUF0QixDQUE4QkMsRUFBOUIsQ0FBaUMsT0FBakMsRUFBMEMsWUFBTTtBQUM5QyxnQkFBSSxPQUFLbEMscUJBQVQsRUFBZ0M7QUFDOUIscUJBQUtnQyxjQUFMO0FBQ0EscUJBQUtoQyxxQkFBTCxHQUE2QixLQUE3QjtBQUNEO0FBQ0YsV0FMRDtBQU1EO0FBQ0Y7QUFDRixLQWxENEY7QUFtRDdGbUMsdUJBQW1CLFNBQVNBLGlCQUFULEdBQTZCO0FBQzlDLFVBQU1iLFNBQVNqQixJQUFJa0IsT0FBSixDQUFZLGNBQVosQ0FBZjtBQUNBLFVBQUlELE1BQUosRUFBWTtBQUNWQSxlQUFPSSxTQUFQLENBQWlCLEVBQWpCO0FBQ0FKLGVBQU9NLGdCQUFQLEdBQTBCLFNBQVNRLFVBQVQsR0FBc0IsQ0FBRSxDQUFsRDtBQUNBL0IsWUFBSUMsaUJBQUosQ0FBc0IyQixPQUF0QixDQUE4QkksR0FBOUIsQ0FBa0MsT0FBbEM7QUFDRDtBQUNGLEtBMUQ0RjtBQTJEN0ZDLHlCQUFxQixTQUFTQSxtQkFBVCxHQUErQjtBQUNsRDtBQUNBLFdBQUtDLFNBQUwsQ0FBZUMsU0FBZjtBQUNELEtBOUQ0RjtBQStEN0ZmLG9CQUFnQixTQUFTQSxjQUFULEdBQTBCO0FBQ3hDO0FBQ0EsVUFBTWdCLFVBQVU7QUFDZEMsc0JBQWMsZUFBS2IsS0FBTCxDQUFXLElBQVgsRUFBaUIsU0FBU2MsY0FBVCxDQUF3QkMsTUFBeEIsRUFBZ0M7QUFDN0QsY0FBTUMsUUFBUXhDLElBQUlHLFdBQUosSUFBbUJILElBQUlHLFdBQUosQ0FBZ0JJLGtCQUFqRDs7QUFFQSxjQUFNa0MsVUFBVUQsTUFBTUUsTUFBTixDQUFhLFVBQUNDLElBQUQsRUFBVTtBQUNyQyxtQkFBT0EsS0FBSzlCLFNBQUwsS0FBbUIwQixPQUFPSyxTQUFqQyxDQURxQyxDQUNPO0FBQzdDLFdBRmUsQ0FBaEI7QUFHQSxlQUFLQyxhQUFMLENBQW1CTixPQUFPSyxTQUExQjtBQUNBLGNBQUlILFFBQVFLLE1BQVIsR0FBaUIsQ0FBckIsRUFBd0I7QUFDdEIsZ0JBQU1oQyxVQUFVLENBQUMsQ0FBQzJCLFFBQVEsQ0FBUixFQUFXM0IsT0FBN0I7QUFDQTJCLG9CQUFRLENBQVIsRUFBVzNCLE9BQVgsR0FBcUIsQ0FBQ0EsT0FBdEI7QUFDQWQsZ0JBQUlRLGtCQUFKO0FBQ0EsaUJBQUtiLHFCQUFMLEdBQTZCLElBQTdCO0FBQ0FvRCxjQUFFUixPQUFPUyxPQUFULEVBQWtCQyxJQUFsQixDQUF1QixjQUF2QixFQUF1QyxDQUFDLENBQUNuQyxPQUFGLEVBQVdvQyxRQUFYLEVBQXZDO0FBQ0Q7QUFDRixTQWRhO0FBREEsT0FBaEI7O0FBa0JBLGFBQU9kLE9BQVA7QUFDRCxLQXBGNEY7QUFxRjdGWCxpQ0FBNkIsU0FBU0EsMkJBQVQsQ0FBcUNDLEtBQXJDLEVBQTRDO0FBQ3ZFLFVBQUlBLE1BQU15QixTQUFOLElBQW1CekIsTUFBTXlCLFNBQU4sQ0FBZ0JQLFNBQXZDLEVBQWtEO0FBQ2hELGVBQU87QUFDTFEsZUFBSyxNQURBO0FBRUxDLGlCQUFPN0QsU0FBU0U7QUFGWCxTQUFQO0FBSUQ7QUFDRixLQTVGNEY7QUE2RjdGNEIsNkJBQXlCLFNBQVNBLHVCQUFULEdBQW1DO0FBQUE7O0FBQzFELFVBQU1nQyxTQUFTLEVBQWY7O0FBRUEsVUFBTUMsZUFBZTtBQUNuQkMsWUFBSSxTQURlO0FBRW5CQyxrQkFBVTtBQUZTLE9BQXJCO0FBSUEsVUFBTWpCLFFBQVF4QyxJQUFJRyxXQUFKLElBQW1CSCxJQUFJRyxXQUFKLENBQWdCSSxrQkFBakQ7QUFDQSxVQUFJLEtBQUtFLE9BQVQsRUFBa0I7QUFDaEIsYUFBSyxJQUFNaUQsQ0FBWCxJQUFnQixLQUFLakQsT0FBckIsRUFBOEI7QUFDNUIsY0FBSSxLQUFLQSxPQUFMLENBQWFrRCxjQUFiLENBQTRCRCxDQUE1QixDQUFKLEVBQW9DO0FBQUE7QUFDbEMsa0JBQUkvQyxRQUFRLE9BQUtGLE9BQUwsQ0FBYWlELENBQWIsQ0FBWjtBQUNBLGtCQUFNRSxZQUFZcEIsTUFBTUUsTUFBTixDQUFhLFVBQUNDLElBQUQsRUFBVTtBQUFFO0FBQ3pDLHVCQUFPQSxLQUFLOUIsU0FBTCxLQUFtQkYsTUFBTUUsU0FBaEM7QUFDRCxlQUZpQixDQUFsQjtBQUdBRixzQkFBUSxPQUFLRixPQUFMLENBQWFpRCxDQUFiLENBQVI7QUFDQSxrQkFBSS9DLE1BQU1nRCxjQUFOLENBQXFCLFdBQXJCLENBQUosRUFBdUM7QUFDckNKLDZCQUFhRSxRQUFiLENBQXNCN0MsSUFBdEIsQ0FBMkI7QUFDekJpRCx3QkFBTWxELE1BQU1FLFNBRGE7QUFFekJpRCwwQkFBUSxjQUZpQjtBQUd6QlQseUJBQU8sT0FBS1UsV0FBTCxDQUFpQnBELE1BQU1FLFNBQXZCLEtBQXFDRixNQUFNRSxTQUh6QjtBQUl6QnNDLDZCQUFXO0FBQ1RQLCtCQUFXakMsTUFBTUUsU0FEUjtBQUVUQyw2QkFBUyxDQUFDLENBQUM4QyxVQUFVLENBQVYsRUFBYTlDO0FBRmY7QUFKYyxpQkFBM0I7QUFTRDtBQWhCaUM7QUFpQm5DO0FBQ0Y7QUFDRjs7QUFFRHdDLGFBQU8xQyxJQUFQLENBQVkyQyxZQUFaO0FBQ0EsYUFBT0QsTUFBUDtBQUNEO0FBOUg0RixHQUEvRSxDQUFoQjs7b0JBaUllN0QsTyIsImZpbGUiOiJfU3BlZWRTZWFyY2hSaWdodERyYXdlckxpc3RNaXhpbi5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBfUmlnaHREcmF3ZXJCYXNlTWl4aW4gZnJvbSAnLi9fUmlnaHREcmF3ZXJCYXNlTWl4aW4nO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnc3BlZWRTZWFyY2hSaWdodERyYXdlckxpc3RNaXhpbicpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuX1NwZWVkU2VhcmNoUmlnaHREcmF3ZXJMaXN0TWl4aW5cclxuICogQGNsYXNzZGVzYyBTcGVlZHNlYXJjaCBzcGVjaWZpYyBtaXhpbiBmb3IgcmlnaHQgZHJhd2VyIGZ1bmN0aW9uYWxpdHkuXHJcbiAqIEBtaXhpbnMgY3JtLlZpZXdzLl9SaWdodERyYXdlckJhc2VNaXhpblxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5fU3BlZWRTZWFyY2hSaWdodERyYXdlckxpc3RNaXhpbicsIFtfUmlnaHREcmF3ZXJCYXNlTWl4aW5dLCB7XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgaW5kZXhTZWN0aW9uVGV4dDogcmVzb3VyY2UuaW5kZXhTZWN0aW9uVGV4dCxcclxuXHJcbiAgX2hhc0NoYW5nZWRJbmRleFByZWZzOiBmYWxzZSwgLy8gRGlydHkgZmxhZyBzbyB3ZSBrbm93IHdoZW4gdG8gcmVsb2FkIHRoZSB3aWRnZXRzXHJcbiAgaGFzU2V0dGluZ3M6IHRydWUsXHJcblxyXG4gIG9uU2hvdzogZnVuY3Rpb24gb25TaG93KCkge1xyXG4gICAgdGhpcy5zZXREZWZhdWx0SW5kZXhQcmVmZXJlbmNlcygpO1xyXG4gIH0sXHJcbiAgb3BlblNldHRpbmdzOiBmdW5jdGlvbiBvcGVuU2V0dGluZ3MoKSB7XHJcbiAgICBBcHAudmlld1NldHRpbmdzTW9kYWwub3BlbigpO1xyXG4gIH0sXHJcbiAgc2V0RGVmYXVsdEluZGV4UHJlZmVyZW5jZXM6IGZ1bmN0aW9uIHNldERlZmF1bHRJbmRleFByZWZlcmVuY2VzKCkge1xyXG4gICAgaWYgKCFBcHAucHJlZmVyZW5jZXMuc3BlZWRTZWFjcmNoSW5kZXhlcykge1xyXG4gICAgICBjb25zdCBkZWZhdWx0cyA9IHRoaXMuZ2V0RGVmYXVsdEluZGV4UHJlZmVuY2VzKCk7XHJcbiAgICAgIEFwcC5wcmVmZXJlbmNlcy5zcGVlZFNlYXJjaEluZGV4ZXMgPSBkZWZhdWx0cztcclxuICAgICAgQXBwLnBlcnNpc3RQcmVmZXJlbmNlcygpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZ2V0RGVmYXVsdEluZGV4UHJlZmVuY2VzOiBmdW5jdGlvbiBnZXREZWZhdWx0SW5kZXhQcmVmZW5jZXMoKSB7XHJcbiAgICBjb25zdCBkZWZhdWx0cyA9IFtdO1xyXG4gICAgaWYgKHRoaXMuaW5kZXhlcykge1xyXG4gICAgICB0aGlzLmluZGV4ZXMuZm9yRWFjaCgoaW5kZXgpID0+IHtcclxuICAgICAgICBkZWZhdWx0cy5wdXNoKHtcclxuICAgICAgICAgIGluZGV4TmFtZTogaW5kZXguaW5kZXhOYW1lLFxyXG4gICAgICAgICAgZW5hYmxlZDogdGhpcy5faXNJbmRleEFjdGl2ZShpbmRleC5pbmRleE5hbWUpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBkZWZhdWx0cztcclxuICB9LFxyXG4gIHNldHVwUmlnaHREcmF3ZXI6IGZ1bmN0aW9uIHNldHVwUmlnaHREcmF3ZXIoKSB7XHJcbiAgICBjb25zdCBkcmF3ZXIgPSBBcHAuZ2V0VmlldygncmlnaHRfZHJhd2VyJyk7XHJcbiAgICBpZiAoZHJhd2VyKSB7XHJcbiAgICAgIGxhbmcubWl4aW4oZHJhd2VyLCB0aGlzLl9jcmVhdGVBY3Rpb25zKCkpO1xyXG4gICAgICBkcmF3ZXIuc2V0TGF5b3V0KHRoaXMuY3JlYXRlUmlnaHREcmF3ZXJMYXlvdXQoKSk7XHJcbiAgICAgIGRyYXdlci5nZXRHcm91cEZvckVudHJ5ID0gbGFuZy5oaXRjaCh0aGlzLCBmdW5jdGlvbiBnZXRHcm91cEZvclJpZ2h0RHJhd2VyRW50cnkoZW50cnkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRHcm91cEZvclJpZ2h0RHJhd2VyRW50cnkoZW50cnkpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICh0aGlzLnJlYnVpbGRXaWRnZXRzKSB7XHJcbiAgICAgICAgQXBwLnZpZXdTZXR0aW5nc01vZGFsLmVsZW1lbnQub24oJ2Nsb3NlJywgKCkgPT4ge1xyXG4gICAgICAgICAgaWYgKHRoaXMuX2hhc0NoYW5nZWRJbmRleFByZWZzKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVidWlsZFdpZGdldHMoKTtcclxuICAgICAgICAgICAgdGhpcy5faGFzQ2hhbmdlZEluZGV4UHJlZnMgPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgdW5sb2FkUmlnaHREcmF3ZXI6IGZ1bmN0aW9uIHVubG9hZFJpZ2h0RHJhd2VyKCkge1xyXG4gICAgY29uc3QgZHJhd2VyID0gQXBwLmdldFZpZXcoJ3JpZ2h0X2RyYXdlcicpO1xyXG4gICAgaWYgKGRyYXdlcikge1xyXG4gICAgICBkcmF3ZXIuc2V0TGF5b3V0KFtdKTtcclxuICAgICAgZHJhd2VyLmdldEdyb3VwRm9yRW50cnkgPSBmdW5jdGlvbiBzbmFwcGVyT2ZmKCkge307XHJcbiAgICAgIEFwcC52aWV3U2V0dGluZ3NNb2RhbC5lbGVtZW50Lm9mZignY2xvc2UnKTtcclxuICAgIH1cclxuICB9LFxyXG4gIF9vblNlYXJjaEV4cHJlc3Npb246IGZ1bmN0aW9uIF9vblNlYXJjaEV4cHJlc3Npb24oKSB7XHJcbiAgICAvLyBUT0RPOiBEb24ndCBleHRlbmQgdGhpcyBwcml2YXRlIGZ1bmN0aW9uIC0gY29ubmVjdCB0byB0aGUgc2VhcmNoIHdpZGdldCBvblNlYXJjaEV4cHJlc3Npb24gaW5zdGVhZFxyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIF9jcmVhdGVBY3Rpb25zOiBmdW5jdGlvbiBfY3JlYXRlQWN0aW9ucygpIHtcclxuICAgIC8vIFRoZXNlIGFjdGlvbnMgd2lsbCBnZXQgbWl4ZWQgaW50byB0aGUgcmlnaHQgZHJhd2VyIHZpZXcuXHJcbiAgICBjb25zdCBhY3Rpb25zID0ge1xyXG4gICAgICBpbmRleENsaWNrZWQ6IGxhbmcuaGl0Y2godGhpcywgZnVuY3Rpb24gb25JbmRleENsaWNrZWQocGFyYW1zKSB7XHJcbiAgICAgICAgY29uc3QgcHJlZnMgPSBBcHAucHJlZmVyZW5jZXMgJiYgQXBwLnByZWZlcmVuY2VzLnNwZWVkU2VhcmNoSW5kZXhlcztcclxuXHJcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IHByZWZzLmZpbHRlcigocHJlZikgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHByZWYuaW5kZXhOYW1lID09PSBwYXJhbXMuaW5kZXhuYW1lOyAvLyB0aGUgaW5kZXggbmFtZSBpcyBsb3dlciBjYXNlZC5cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmFjdGl2YXRlSW5kZXgocGFyYW1zLmluZGV4bmFtZSk7XHJcbiAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgY29uc3QgZW5hYmxlZCA9ICEhcmVzdWx0c1swXS5lbmFibGVkO1xyXG4gICAgICAgICAgcmVzdWx0c1swXS5lbmFibGVkID0gIWVuYWJsZWQ7XHJcbiAgICAgICAgICBBcHAucGVyc2lzdFByZWZlcmVuY2VzKCk7XHJcbiAgICAgICAgICB0aGlzLl9oYXNDaGFuZ2VkSW5kZXhQcmVmcyA9IHRydWU7XHJcbiAgICAgICAgICAkKHBhcmFtcy4kc291cmNlKS5hdHRyKCdkYXRhLWVuYWJsZWQnLCAoIWVuYWJsZWQpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSksXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBhY3Rpb25zO1xyXG4gIH0sXHJcbiAgZ2V0R3JvdXBGb3JSaWdodERyYXdlckVudHJ5OiBmdW5jdGlvbiBnZXRHcm91cEZvclJpZ2h0RHJhd2VyRW50cnkoZW50cnkpIHtcclxuICAgIGlmIChlbnRyeS5kYXRhUHJvcHMgJiYgZW50cnkuZGF0YVByb3BzLmluZGV4bmFtZSkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHRhZzogJ3ZpZXcnLFxyXG4gICAgICAgIHRpdGxlOiByZXNvdXJjZS5pbmRleFNlY3Rpb25UZXh0LFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgY3JlYXRlUmlnaHREcmF3ZXJMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZVJpZ2h0RHJhd2VyTGF5b3V0KCkge1xyXG4gICAgY29uc3QgbGF5b3V0ID0gW107XHJcblxyXG4gICAgY29uc3QgaW5kZXhTZWN0aW9uID0ge1xyXG4gICAgICBpZDogJ2FjdGlvbnMnLFxyXG4gICAgICBjaGlsZHJlbjogW10sXHJcbiAgICB9O1xyXG4gICAgY29uc3QgcHJlZnMgPSBBcHAucHJlZmVyZW5jZXMgJiYgQXBwLnByZWZlcmVuY2VzLnNwZWVkU2VhcmNoSW5kZXhlcztcclxuICAgIGlmICh0aGlzLmluZGV4ZXMpIHtcclxuICAgICAgZm9yIChjb25zdCBpIGluIHRoaXMuaW5kZXhlcykge1xyXG4gICAgICAgIGlmICh0aGlzLmluZGV4ZXMuaGFzT3duUHJvcGVydHkoaSkpIHtcclxuICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuaW5kZXhlc1tpXTtcclxuICAgICAgICAgIGNvbnN0IGluZGV4UHJlZiA9IHByZWZzLmZpbHRlcigocHJlZikgPT4geyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICAgICAgICAgIHJldHVybiBwcmVmLmluZGV4TmFtZSA9PT0gaW5kZXguaW5kZXhOYW1lO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBpbmRleCA9IHRoaXMuaW5kZXhlc1tpXTtcclxuICAgICAgICAgIGlmIChpbmRleC5oYXNPd25Qcm9wZXJ0eSgnaW5kZXhOYW1lJykpIHtcclxuICAgICAgICAgICAgaW5kZXhTZWN0aW9uLmNoaWxkcmVuLnB1c2goe1xyXG4gICAgICAgICAgICAgIG5hbWU6IGluZGV4LmluZGV4TmFtZSxcclxuICAgICAgICAgICAgICBhY3Rpb246ICdpbmRleENsaWNrZWQnLFxyXG4gICAgICAgICAgICAgIHRpdGxlOiB0aGlzLmluZGV4ZXNUZXh0W2luZGV4LmluZGV4TmFtZV0gfHwgaW5kZXguaW5kZXhOYW1lLFxyXG4gICAgICAgICAgICAgIGRhdGFQcm9wczoge1xyXG4gICAgICAgICAgICAgICAgaW5kZXhuYW1lOiBpbmRleC5pbmRleE5hbWUsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiAhIWluZGV4UHJlZlswXS5lbmFibGVkLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxheW91dC5wdXNoKGluZGV4U2VjdGlvbik7XHJcbiAgICByZXR1cm4gbGF5b3V0O1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19