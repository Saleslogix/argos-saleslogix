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
   * @class
   * @mixin
   * @alias module:crm/Views/Offline/_RightDrawerListMixin
   * @classdesc Offline specific mixin for right drawer functionality.
   * @mixes module:crm/Views/_RightDrawerBaseMixin
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

  /**
   * @module crm/Views/Offline/_RightDrawerListMixin
   */
  var __class = (0, _declare2.default)('crm.Views.Offline._RightDrawerListMixin', [_RightDrawerBaseMixin3.default], /** @lends module:crm/Views/Offline/_RightDrawerListMixin.prototype */{
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