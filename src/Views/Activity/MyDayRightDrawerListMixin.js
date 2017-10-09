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

import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _RightDrawerBaseMixin from '../_RightDrawerBaseMixin';
import getResource from 'argos/I18n';


const resource = getResource('activityMyDayRightDrawerList');

/**
 * @class crm.Views.Activity.MyDayRightDrawerListMixin
 *
 *
 * @mixins crm.Views._RightDrawerBaseMixin
 *
 */
const __class = declare('crm.Views.Activity.MyDayRightDrawerListMixin', [_RightDrawerBaseMixin], {
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
      const defaults = this.getDefaultFilterPreferences();
      App.preferences.myDayFilters = defaults;
      App.persistPreferences();
    }
  },
  getDefaultFilterPreferences: function getDefaultFilterPreferences() {
    const filters = this.getFilters();
    const filterPrefs = Object.keys(filters)
      .map((name) => {
        let enabled = false;
        if (this._currentFilterName === name) {
          enabled = false;
        }
        return {
          name,
          enabled,
        };
      });
    return filterPrefs;
  },
  setupRightDrawer: function setupRightDrawer() {
    const drawer = App.getView('right_drawer');
    if (drawer) {
      lang.mixin(drawer, this._createActions());
      drawer.setLayout(this.createRightDrawerLayout());
      drawer.getGroupForEntry = lang.hitch(this, function getGroupForRightDrawerEntry(entry) {
        return this.getGroupForRightDrawerEntry(entry);
      });

      App.viewSettingsModal.element.on('close', this.onSnapperClose.bind(this));
    }
  },
  refreshRightDrawer: function refreshRightDrawer() {
    const drawer = App.getView('right_drawer');
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
    const drawer = App.getView('right_drawer');
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
    const actions = {
      filterClicked: function onFilterClicked(params) {
        const prefs = App.preferences && App.preferences.myDayFilters;
        let filterPref = [];
        if (prefs.length) {
          filterPref = prefs.filter((pref) => {
            return pref.name === params.filtername;
          });
        }
        if (filterPref.length > 0) {
          const enabled = !!filterPref[0].enabled;
          filterPref[0].enabled = !enabled;
          prefs.forEach((pref) => {
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
          $(params.$source).attr('data-enabled', (!enabled)
            .toString());

          this.onSnapperClose();
          App.viewSettingsModal.close();
          this.refreshRightDrawer();
        }
      }.bind(this),
      kpiClicked: function kpiClicked(params) {
        const metrics = this.getMetrics();
        let results;

        if (metrics.length > 0) {
          results = metrics.filter((metric) => {
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
      }.bind(this),
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
        title: resource.filterSectionText,
      };
    }
    return {
      tag: 'kpi',
      title: resource.kpiSectionText,
    };
  },
  createRightDrawerLayout: function createRightDrawerLayout() {
    const layout = [];
    const metrics = this.getMetrics();
    const filters = this.getFilters();
    const filterSection = {
      id: 'actions',
      children: Object.keys(filters)
        .map((filterName) => {
          const prefs = App.preferences && App.preferences.myDayFilters;
          const filterPref = prefs.filter((pref) => {
            return pref.name === filterName;
          });
          const {
            enabled,
          } = filterPref[0];
          return {
            name: filterName,
            action: 'filterClicked',
            title: filters[filterName].label || filterName,
            dataProps: {
              filtername: filterName,
              enabled: !!enabled,
            },
          };
        }),
    };
    layout.push(filterSection);
    const kpiSection = {
      id: 'kpi',
      children: metrics.filter(m => m.title).map((metric, i) => {
        return {
          name: `KPI${i}`,
          action: 'kpiClicked',
          title: metric.title,
          dataProps: {
            title: metric.title,
            enabled: !!metric.enabled,
          },
        };
      }),
    };

    layout.push(kpiSection);
    return layout;
  },
});

export default __class;
