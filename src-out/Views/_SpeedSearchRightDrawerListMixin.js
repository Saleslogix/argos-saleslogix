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