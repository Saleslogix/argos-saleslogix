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

  /**
   * @module crm/Views/RecentlyViewed/_RightDrawerListMixin
   */
  const resource = (0, _I18n2.default)('rightDrawerListMixin');

  /**
   * @class
   * @alias module:crm/Views/RecentlyViewed/_RightDrawerListMixin
   * @mixin
   * @mixes module:crm/Views/_RightDrawerBaseMixin
   *
   */
  const __class = (0, _declare2.default)('crm.Views.RecentlyViewed._RightDrawerListMixin', [_RightDrawerBaseMixin3.default], /** @lends module:crm/Views/RecentlyViewed/_RightDrawerListMixin.prototype */{

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
        const defaults = this.getDefaultEntityPreferences();
        App.preferences.recentlyViewedEntityFilters = defaults;
        App.persistPreferences();
      }
    },
    getDefaultEntityPreferences: function getDefaultEntityPreferences() {
      return Object.keys(this.entityMappings).map(name => {
        return {
          name,
          enabled: true
        };
      });
    },
    setupRightDrawer: function setupRightDrawer() {
      const drawer = App.getView('right_drawer');
      if (drawer) {
        _lang2.default.mixin(drawer, this._createActions());
        drawer.setLayout(this.createRightDrawerLayout());
        drawer.getGroupForEntry = _lang2.default.hitch(this, function getGroupForRightDrawerEntry(entry) {
          return this.getGroupForRightDrawerEntry(entry);
        });

        App.viewSettingsModal.element.on('close', () => {
          if (this._hasChangedEntityPrefs) {
            this.clear();
            this.refreshRequired = true;
            this.refresh();
            this._hasChangedEntityPrefs = false;
            this._hasChangedKPIPrefs = false;
          }

          if (this._hasChangedKPIPrefs && this.rebuildWidgets) {
            this.destroyWidgets();
            this.rebuildWidgets();
            this._hasChangedKPIPrefs = false;
          }
        });
      }
    },
    unloadRightDrawer: function unloadRightDrawer() {
      const drawer = App.getView('right_drawer');
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
      const actions = {
        entityFilterClicked: function onentityFilterClicked(params) {
          const prefs = App.preferences && App.preferences.recentlyViewedEntityFilters;

          const results = prefs.filter(pref => {
            return pref.name === params.entityname;
          });

          if (results.length > 0) {
            const enabled = !!results[0].enabled;
            results[0].enabled = !enabled;
            App.persistPreferences();
            this._hasChangedEntityPrefs = true;
            $(params.$source).attr('data-enabled', (!enabled).toString());
          }
        }.bind(this),
        kpiClicked: function kpiClicked(params) {
          const metrics = App.getMetricsByResourceKind(this.resourceKind);
          let results;

          if (metrics.length > 0) {
            results = metrics.filter(metric => {
              return metric.title === params.title;
            });
          }

          if (results.length > 0) {
            const enabled = !!results[0].enabled;
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
      const layout = [];
      const entitySection = {
        id: 'actions',
        children: Object.keys(this.entityMappings).map(entityName => {
          const prefs = App.preferences && App.preferences.recentlyViewedEntityFilters;
          const entityPref = prefs.filter(pref => {
            return pref.name === entityName;
          });
          const {
            enabled
          } = entityPref[0];
          return {
            name: entityName,
            action: 'entityFilterClicked',
            title: this.entityText[entityName] || entityName,
            dataProps: {
              entityname: entityName,
              enabled: !!enabled
            }
          };
        })
      };

      layout.push(entitySection);

      const metrics = App.getMetricsByResourceKind(this.resourceKind);

      const kpiSection = {
        id: 'kpi',
        children: metrics.filter(m => m.title).map((metric, i) => {
          return {
            name: `KPI${i}`,
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