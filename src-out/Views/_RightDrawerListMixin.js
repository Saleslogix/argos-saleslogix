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

  var resource = (0, _I18n2.default)('rightDrawerListMixin');

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
  var __class = (0, _declare2.default)('crm.Views._RightDrawerListMixin', [_RightDrawerBaseMixin3.default], /** @lends module:crm/Views/_RightDrawerListMixin.prototype */{
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
      var drawer = App.getView('right_drawer');
      if (drawer) {
        drawer.pageSize = this.DRAWER_PAGESIZE;
        this.groupList = _GroupUtility2.default.getGroupPreferences(this.entityName);
        this._finishSetup(drawer);
      }
    },
    refreshRightDrawer: function refreshRightDrawer() {
      var drawer = App.getView('right_drawer');
      if (drawer) {
        drawer.clear();
        drawer.layout = null;
        drawer.setLayout(this.createRightDrawerLayout());
        drawer.refresh();
      }
    },
    _finishSetup: function _finishSetup(drawer) {
      var _this = this;

      _lang2.default.mixin(drawer, this._createActions());
      drawer.setLayout(this.createRightDrawerLayout());
      drawer.getGroupForEntry = function getGroupForEntry(entry) {
        return this.getGroupForRightDrawerEntry(entry);
      }.bind(this);

      if (this.rebuildWidgets) {
        App.viewSettingsModal.element.on('close', function () {
          if (_this._hasChangedKPIPrefs) {
            _this.destroyWidgets();

            // HACK: Don't rebuild widgets if a hashtag was clicked,
            // because the widget mixin will rebuild on a data refresh anyways.
            // TODO: Fix multiple calls to rebuildWidets() at the same time.
            if (!_this._hashTagClicked) {
              _this.rebuildWidgets();
            }
            _this._hasChangedKPIPrefs = false;
          }

          // Reset state
          _this._hashTagClicked = false;
        });
      }
    },
    unloadRightDrawer: function unloadRightDrawer() {
      var drawer = App.getView('right_drawer');
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
      var actions = {
        hashTagClicked: function hashTagClicked(params) {
          var hashtag = params.hashtag;


          if (this.groupsMode) {
            this._clearGroupMode();
          }

          if (hashtag && typeof hashtag === 'string') {
            this._hashTagClicked = true;
            if (hashtag.startsWith('#')) {
              this.setSearchTerm(hashtag);
            } else {
              this.setSearchTerm('#' + hashtag);
            }

            this.search();
            App.viewSettingsModal.close();
          }
        }.bind(this),
        kpiClicked: function kpiClicked(params, evt) {
          var metrics = App.getMetricsByResourceKind(this.resourceKind);
          var results = void 0;

          if (metrics.length > 0) {
            results = metrics.filter(function (metric) {
              return metric.title === unescape(params.title);
            });
          }

          if (results.length > 0) {
            var enabled = !!results[0].enabled;
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
          var groupId = params.$key;

          $(params.$source.parentElement.parentElement).find('a').each(function (i, a) {
            $(a).attr('data-enabled', ($(a).attr('data-$key') === groupId).toString());
          });

          var group = this.groupList.filter(function (item) {
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
          var name = params.name;
          $(params.$source.parentElement.parentElement).find('a').each(function (i, a) {
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
      var view = App.getView(this.groupLookupId);
      view.family = this.entityName;
      view.set('store', null);
      view.clear();
      view.refreshRequired = true;

      var field = new _LookupField2.default({
        owner: this,
        view: view,
        singleSelect: false,
        previousSelections: this.groupList && this.groupList.map(function (group) {
          return group.$key;
        })
      });

      var handle = _aspect2.default.after(field, 'complete', function afterComplete() {
        var self = this;
        var list = this.owner;
        var items = [];

        // We will get an object back where the property names are the keys (groupId's)
        // Extract them out, and save the entry, which is the data property on the extracted object
        for (var groupId in self.currentValue) {
          if (self.currentValue.hasOwnProperty(groupId)) {
            var entry = self.currentValue[groupId].data;
            if (entry) {
              items.push(entry);
            }
          }
        }

        var hasDefaultGroup = list.hasDefaultGroup;
        _GroupUtility2.default.addToGroupPreferences(items, list.entityName, true);
        var currentGroup = _GroupUtility2.default.getDefaultGroup(list.entityName);
        if (currentGroup) {
          list.setCurrentGroup(currentGroup);
        }

        handle.remove();
        self.destroy();

        if (hasDefaultGroup) {
          // We will transition back to the list, pop back open the right drawer so the user is back where they started
          var processDataHandle = _aspect2.default.after(list, 'processData', function postProcessData() {
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
      var _this2 = this;

      var layout = [];

      if (this.groupsEnabled) {
        var groupsSection = {
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

        var defaultGroup = _GroupUtility2.default.getDefaultGroup(this.entityName);
        if (this.groupList && this.groupList.length > 0) {
          this.groupList.forEach(function (group) {
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
        var layoutSection = {
          id: 'actions',
          children: []
        };
        if (this.groupTemplateLayouts && this.groupTemplateLayouts.length > 0) {
          var layoutSelected = false;
          this.groupTemplateLayouts.forEach(function (theLayout) {
            if (!layoutSelected) {
              layoutSelected = theLayout.name === App.preferences['groups-selected-template-name' + _this2.entityName];
            }
            layoutSection.children.push({
              name: theLayout.name,
              action: 'layoutSelectedClicked',
              title: theLayout.displayName,
              dataProps: {
                name: theLayout.name,
                title: theLayout.displayName,
                enabled: theLayout.name === App.preferences['groups-selected-template-name' + _this2.entityName]
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
        var hashTagsSection = {
          id: 'actions',
          children: []
        };

        if (this._hasHashTags()) {
          var len = this.searchWidget.hashTagQueries.length;
          for (var i = 0; i < len; i++) {
            var hashTag = this.searchWidget.hashTagQueries[i];
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
        var metrics = App.getMetricsByResourceKind(this.resourceKind);

        var kpiSection = {
          id: 'kpi',
          children: []
        };

        if (metrics.length > 0) {
          metrics.forEach(function (metric, i) {
            if (metric.title) {
              kpiSection.children.push({
                name: 'KPI' + i,
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