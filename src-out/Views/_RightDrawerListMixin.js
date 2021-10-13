define('crm/Views/_RightDrawerListMixin', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/aspect', '../GroupUtility', './_RightDrawerBaseMixin', 'argos/Fields/LookupField', 'argos/I18n'], function (module, exports, _declare, _lang, _aspect, _GroupUtility, _RightDrawerBaseMixin2, _LookupField, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _aspect2 = _interopRequireDefault(_aspect);

  var _GroupUtility2 = _interopRequireDefault(_GroupUtility);

  var _RightDrawerBaseMixin3 = _interopRequireDefault(_RightDrawerBaseMixin2);

  var _LookupField2 = _interopRequireDefault(_LookupField);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  const resource = (0, _I18n2.default)('rightDrawerListMixin');

  /**
   * @class
   * @alias module:crm/Views/_RightDrawerListMixin
   * @mixin
   * @classdesc List mixin for right drawers.
   * @since 3.0
   * @mixes module:crm/Views/_RightDrawerBaseMixin
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
   * @module crm/Views/_RightDrawerListMixin
   */
  const __class = (0, _declare2.default)('crm.Views._RightDrawerListMixin', [_RightDrawerBaseMixin3.default], /** @lends module:crm/Views/_RightDrawerListMixin.prototype */{
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
        this.groupList = _GroupUtility2.default.getGroupPreferences(this.entityName);
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
      _lang2.default.mixin(drawer, this._createActions());
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
        kpiClicked: function kpiClicked(params) {
          const metrics = App.getMetricsByResourceKind(this.resourceKind);
          let results;

          if (metrics.length > 0) {
            results = metrics.filter(metric => {
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
            $(a).attr('data-enabled', ($(a).attr('data-$key') === groupId).toString());
          });

          const group = this.groupList.filter(item => {
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
            $(a).attr('data-enabled', ($(a).attr('data-name') === name).toString());
          });

          _GroupUtility2.default.setSelectedGroupLayoutTemplate(this.entityName, name);
          this._groupInitialized = false;
          this.refresh();
          App.viewSettingsModal.close();
        }.bind(this)

      };

      return actions;
    },
    _selectGroups: function _selectGroups() {
      const view = App.getView(this.groupLookupId);
      view.family = this.entityName;
      view.set('store', null);
      view.clear();
      view.refreshRequired = true;

      const field = new _LookupField2.default({
        owner: this,
        view,
        singleSelect: false,
        previousSelections: this.groupList && this.groupList.map(group => {
          return group.$key;
        })
      });

      const handle = _aspect2.default.after(field, 'complete', function afterComplete() {
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
        _GroupUtility2.default.addToGroupPreferences(items, list.entityName, true);
        const currentGroup = _GroupUtility2.default.getDefaultGroup(list.entityName);
        if (currentGroup) {
          list.setCurrentGroup(currentGroup);
        }

        handle.remove();
        self.destroy();

        if (hasDefaultGroup) {
          // We will transition back to the list, pop back open the right drawer so the user is back where they started
          const processDataHandle = _aspect2.default.after(list, 'processData', function postProcessData() {
            App.viewSettingsModal.close();
            processDataHandle.remove();
            if (this.transitionHandle) {
              this.transitionHandle.remove();
            }
          }.bind(list));
        } else {
          // Since there was no previous default group, just refresh the list (no need to toggle the right drawer)
          this.transitionHandle = _aspect2.default.after(list, 'onTransitionTo', function postOnTransitionTo() {
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
          title: resource.hashTagsSectionText
        };
      }

      if ((entry.action === 'groupClicked' || entry.action === 'groupConfigureClicked') && this.groupsEnabled) {
        return {
          tag: 'group',
          title: resource.groupsSectionText
        };
      }
      if (entry.action === 'layoutSelectedClicked' && this.groupsEnabled) {
        return {
          tag: 'layoutTemplates',
          title: resource.layoutsText
        };
      }
      return {
        tag: 'kpi',
        title: resource.kpiSectionText
      };
    },
    createRightDrawerLayout: function createRightDrawerLayout() {
      const layout = [];

      if (this.groupsEnabled) {
        const groupsSection = {
          id: 'actions',
          children: []
        };

        groupsSection.children.push({
          name: 'configureGroups',
          action: 'groupConfigureClicked',
          title: resource.configureGroupsText,
          cls: 'group-configuration',
          iconCls: 'fa fa-cog fa-fw '
        });

        const defaultGroup = _GroupUtility2.default.getDefaultGroup(this.entityName);
        if (this.groupList && this.groupList.length > 0) {
          this.groupList.forEach(group => {
            groupsSection.children.push({
              name: group.name,
              action: 'groupClicked',
              title: group.displayName,
              dataProps: {
                $key: group.$key,
                title: group.displayName,
                enabled: defaultGroup.$key === group.$key
              }
            });
          });
        }
        const layoutSection = {
          id: 'actions',
          children: []
        };
        if (this.groupTemplateLayouts && this.groupTemplateLayouts.length > 0) {
          let layoutSelected = false;
          this.groupTemplateLayouts.forEach(theLayout => {
            if (!layoutSelected) {
              layoutSelected = theLayout.name === _GroupUtility2.default.getSelectedGroupLayoutTemplate(this.entityName);
            }
            layoutSection.children.push({
              name: theLayout.name,
              action: 'layoutSelectedClicked',
              title: theLayout.displayName,
              dataProps: {
                name: theLayout.name,
                title: theLayout.displayName,
                enabled: theLayout.name === _GroupUtility2.default.getSelectedGroupLayoutTemplate(this.entityName)
              }
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
          children: []
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
                hashtag: hashTag.tag
              }
            });
          }
        }

        layout.push(hashTagsSection);
      }

      if (this.createMetricWidgetsLayout) {
        const metrics = App.getMetricsByResourceKind(this.resourceKind);

        const kpiSection = {
          id: 'kpi',
          children: []
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
                  enabled: !!metric.enabled
                }
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
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});