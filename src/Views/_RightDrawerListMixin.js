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
 * @module crm/Views/_RightDrawerListMixin
 */
import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import aspect from 'dojo/aspect';
import GroupUtility from '../GroupUtility';
import _RightDrawerBaseMixin from './_RightDrawerBaseMixin';
import LookupField from 'argos/Fields/LookupField';
import getResource from 'argos/I18n';


const resource = getResource('rightDrawerListMixin');

/**
 * @class
 * @alias module:crm/Views/_RightDrawerListMixin
 * @mixin
 * @classdesc List mixin for right drawers.
 * @since 3.0
 * @mixes module:crm/Views/_RightDrawerBaseMixin
 */
const __class = declare('crm.Views._RightDrawerListMixin', [_RightDrawerBaseMixin], /** @lends module:crm/Views/_RightDrawerListMixin.prototype */{
  // Localization
  hashTagsSectionText: resource.hashTagsSectionText,
  groupsSectionText: resource.groupsSectionText,
  kpiSectionText: resource.kpiSectionText,
  configureGroupsText: resource.configureGroupsText,
  refreshGroupsText: resource.refreshGroupsText,
  layoutsText: resource.layoutsText,

  _hasChangedKPIPrefs: false, // Dirty flag so we know when to reload the widgets
  _hashTagClicked: false,
  groupList: null,
  DRAWER_PAGESIZE: 100,
  groupLookupId: 'groups_configure',
  hasSettings: true,

  setupRightDrawer: function setupRightDrawer() {
    const drawer = App.getView('right_drawer');
    if (drawer) {
      drawer.pageSize = this.DRAWER_PAGESIZE;
      this.groupList = GroupUtility.getGroupPreferences(this.entityName);
      this._finishSetup(drawer);
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
  _finishSetup: function _finishSetup(drawer) {
    lang.mixin(drawer, this._createActions());
    drawer.setLayout(this.createRightDrawerLayout());
    drawer.getGroupForEntry = function getGroupForEntry(entry) {
      return this.getGroupForRightDrawerEntry(entry);
    }.bind(this);

    if (this.rebuildWidgets) {
      App.viewSettingsModal.element.on('close', () => {
        if (this._hasChangedKPIPrefs) {
          this.destroyWidgets();

          // HACK: Don't rebuild widgets if a hashtag was clicked,
          // because the widget mixin will rebuild on a data refresh anyways.
          // TODO: Fix multiple calls to rebuildWidets() at the same time.
          if (!this._hashTagClicked) {
            this.rebuildWidgets();
          }
          this._hasChangedKPIPrefs = false;
        }

        // Reset state
        this._hashTagClicked = false;
      });
    }
  },
  unloadRightDrawer: function unloadRightDrawer() {
    const drawer = App.getView('right_drawer');
    if (drawer) {
      drawer.setLayout([]);
      drawer.getGroupForEntry = function getGroupForEntry() {};
      App.viewSettingsModal.element.off('close');
    }
  },
  _onSearchExpression: function _onSearchExpression() {
    // TODO: Don't extend this private function - connect to the search widget onSearchExpression instead
    if (this.groupsMode) {
      this._clearGroupMode();
    }

    this.inherited(_onSearchExpression, arguments);
  },
  openSettings: function openSettings() {
    App.viewSettingsModal.open();
  },
  _createActions: function _createActions() {
    // These actions will get mixed into the right drawer view.
    const actions = {
      hashTagClicked: function hashTagClicked(params) {
        const { hashtag } = params;

        if (this.groupsMode) {
          this._clearGroupMode();
        }

        if (hashtag && typeof hashtag === 'string') {
          this._hashTagClicked = true;
          if (hashtag.startsWith('#')) {
            this.setSearchTerm(hashtag);
          } else {
            this.setSearchTerm(`#${hashtag}`);
          }

          this.search();
          App.viewSettingsModal.close();
        }
      }.bind(this),
      kpiClicked: function kpiClicked(params, evt) {
        const metrics = App.getMetricsByResourceKind(this.resourceKind);
        let results;

        if (metrics.length > 0) {
          results = metrics.filter((metric) => {
            return metric.title === unescape(params.title);
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
      groupConfigureClicked: function groupConfigureClicked() {
        this._selectGroups();
        App.viewSettingsModal.close();
      }.bind(this),
      groupClicked: function groupClicked(params) {
        this._startGroupMode();
        const groupId = params.$key;

        $(params.$source.parentElement.parentElement).find('a').each((i, a) => {
          $(a).attr('data-enabled', (($(a).attr('data-$key') === groupId)).toString());
        });

        const group = this.groupList.filter((item) => {
          return item.$key === groupId;
        })[0];

        if (!group) {
          throw new Error('Expected a group.');
        }
        this.setCurrentGroup(group);
        this.refresh();
        App.viewSettingsModal.close();
      }.bind(this),
      layoutSelectedClicked: function layoutSelectedClicked(params) {
        const name = params.name;
        $(params.$source.parentElement.parentElement).find('a').each((i, a) => {
          $(a).attr('data-enabled', (($(a).attr('data-name') === name)).toString());
        });

        GroupUtility.setSelectedGroupLayoutTemplate(this.entityName, name);
        this._groupInitialized = false;
        this.refresh();
        App.viewSettingsModal.close();
      }.bind(this),

    };

    return actions;
  },
  _selectGroups: function _selectGroups() {
    const view = App.getView(this.groupLookupId);
    view.family = this.entityName;
    view.set('store', null);
    view.clear();
    view.refreshRequired = true;

    const field = new LookupField({
      owner: this,
      view,
      singleSelect: false,
      previousSelections: this.groupList && this.groupList.map((group) => {
        return group.$key;
      }),
    });

    const handle = aspect.after(field, 'complete', function afterComplete() {
      const self = this;
      const list = this.owner;
      const items = [];

      // We will get an object back where the property names are the keys (groupId's)
      // Extract them out, and save the entry, which is the data property on the extracted object
      for (const groupId in self.currentValue) {
        if (self.currentValue.hasOwnProperty(groupId)) {
          const entry = self.currentValue[groupId].data;
          if (entry) {
            items.push(entry);
          }
        }
      }

      const hasDefaultGroup = list.hasDefaultGroup;
      GroupUtility.addToGroupPreferences(items, list.entityName, true);
      const currentGroup = GroupUtility.getDefaultGroup(list.entityName);
      if (currentGroup) {
        list.setCurrentGroup(currentGroup);
      }

      handle.remove();
      self.destroy();

      if (hasDefaultGroup) {
        // We will transition back to the list, pop back open the right drawer so the user is back where they started
        const processDataHandle = aspect.after(list, 'processData', function postProcessData() {
          App.viewSettingsModal.close();
          processDataHandle.remove();
          if (this.transitionHandle) {
            this.transitionHandle.remove();
          }
        }.bind(list));
      } else {
        // Since there was no previous default group, just refresh the list (no need to toggle the right drawer)
        this.transitionHandle = aspect.after(list, 'onTransitionTo', function postOnTransitionTo() {
          this.refreshRequired = true;
          this.isRefreshing = false;
          this.clear();
          this.refresh();
          if (self.transitionHandle) {
            self.transitionHandle.remove();
          }
        }.bind(list));
      }
    }.bind(field));

    field.navigateToListView();
  },
  getGroupForRightDrawerEntry: function getGroupForRightDrawerEntry(entry) {
    if (entry.dataProps && entry.dataProps.hashtag && this._hasHashTags() && App.enableHashTags) {
      return {
        tag: 'view',
        title: resource.hashTagsSectionText,
      };
    }

    if ((entry.action === 'groupClicked' || entry.action === 'groupConfigureClicked') && this.groupsEnabled) {
      return {
        tag: 'group',
        title: resource.groupsSectionText,
      };
    }
    if ((entry.action === 'layoutSelectedClicked') && this.groupsEnabled) {
      return {
        tag: 'layoutTemplates',
        title: resource.layoutsText,
      };
    }
    return {
      tag: 'kpi',
      title: resource.kpiSectionText,
    };
  },
  createRightDrawerLayout: function createRightDrawerLayout() {
    const layout = [];

    if (this.groupsEnabled) {
      const groupsSection = {
        id: 'actions',
        children: [],
      };

      groupsSection.children.push({
        name: 'configureGroups',
        action: 'groupConfigureClicked',
        title: resource.configureGroupsText,
        cls: 'group-configuration',
        iconCls: 'fa fa-cog fa-fw ',
      });

      const defaultGroup = GroupUtility.getDefaultGroup(this.entityName);
      if (this.groupList && this.groupList.length > 0) {
        this.groupList.forEach((group) => {
          groupsSection.children.push({
            name: group.name,
            action: 'groupClicked',
            title: group.displayName,
            dataProps: {
              $key: group.$key,
              title: group.displayName,
              enabled: defaultGroup.$key === group.$key,
            },
          });
        });
      }
      const layoutSection = {
        id: 'actions',
        children: [],
      };
      if (this.groupTemplateLayouts && this.groupTemplateLayouts.length > 0) {
        let layoutSelected = false;
        this.groupTemplateLayouts.forEach((theLayout) => {
          if (!layoutSelected) {
            layoutSelected = theLayout.name === App.preferences[`groups-selected-template-name${this.entityName}`];
          }
          layoutSection.children.push({
            name: theLayout.name,
            action: 'layoutSelectedClicked',
            title: theLayout.displayName,
            dataProps: {
              name: theLayout.name,
              title: theLayout.displayName,
              enabled: theLayout.name === App.preferences[`groups-selected-template-name${this.entityName}`],
            },
          });
        });
        if (!layoutSelected && layoutSection.children.length) {
          layoutSection.children[0].dataProps.enabled = true;
        }
      }

      if (this.entityName) {
        layout.push(groupsSection);
        layout.push(layoutSection);
      }
    }

    if (App.enableHashTags) {
      const hashTagsSection = {
        id: 'actions',
        children: [],
      };

      if (this._hasHashTags()) {
        const len = this.searchWidget.hashTagQueries.length;
        for (let i = 0; i < len; i++) {
          const hashTag = this.searchWidget.hashTagQueries[i];
          hashTagsSection.children.push({
            name: hashTag.key,
            action: 'hashTagClicked',
            title: hashTag.tag,
            dataProps: {
              hashtag: hashTag.tag,
            },
          });
        }
      }

      layout.push(hashTagsSection);
    }

    if (this.createMetricWidgetsLayout) {
      const metrics = App.getMetricsByResourceKind(this.resourceKind);

      const kpiSection = {
        id: 'kpi',
        children: [],
      };

      if (metrics.length > 0) {
        metrics.forEach((metric, i) => {
          if (metric.title) {
            kpiSection.children.push({
              name: `KPI${i}`,
              action: 'kpiClicked',
              title: metric.title,
              dataProps: {
                title: escape(metric.title),
                enabled: !!metric.enabled,
              },
            });
          }
        });

        layout.push(kpiSection);
      }
    }

    return layout;
  },
  _hasHashTags: function _hasHashTags() {
    return this.searchWidget && this.searchWidget.hashTagQueries && this.searchWidget.hashTagQueries.length > 0;
  },
});

export default __class;
