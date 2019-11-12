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
   * @class crm.Views._RightDrawerListMixin
   * @classdesc List mixin for right drawers.
   * @since 3.0
   * @mixins crm.Views._RightDrawerBaseMixin
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

  var __class = (0, _declare2.default)('crm.Views._RightDrawerListMixin', [_RightDrawerBaseMixin3.default], {
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

      this.inherited(arguments);
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
        kpiClicked: function kpiClicked(params) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9fUmlnaHREcmF3ZXJMaXN0TWl4aW4uanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiaGFzaFRhZ3NTZWN0aW9uVGV4dCIsImdyb3Vwc1NlY3Rpb25UZXh0Iiwia3BpU2VjdGlvblRleHQiLCJjb25maWd1cmVHcm91cHNUZXh0IiwicmVmcmVzaEdyb3Vwc1RleHQiLCJsYXlvdXRzVGV4dCIsIl9oYXNDaGFuZ2VkS1BJUHJlZnMiLCJfaGFzaFRhZ0NsaWNrZWQiLCJncm91cExpc3QiLCJEUkFXRVJfUEFHRVNJWkUiLCJncm91cExvb2t1cElkIiwiaGFzU2V0dGluZ3MiLCJzZXR1cFJpZ2h0RHJhd2VyIiwiZHJhd2VyIiwiQXBwIiwiZ2V0VmlldyIsInBhZ2VTaXplIiwiZ2V0R3JvdXBQcmVmZXJlbmNlcyIsImVudGl0eU5hbWUiLCJfZmluaXNoU2V0dXAiLCJyZWZyZXNoUmlnaHREcmF3ZXIiLCJjbGVhciIsImxheW91dCIsInNldExheW91dCIsImNyZWF0ZVJpZ2h0RHJhd2VyTGF5b3V0IiwicmVmcmVzaCIsIm1peGluIiwiX2NyZWF0ZUFjdGlvbnMiLCJnZXRHcm91cEZvckVudHJ5IiwiZW50cnkiLCJnZXRHcm91cEZvclJpZ2h0RHJhd2VyRW50cnkiLCJiaW5kIiwicmVidWlsZFdpZGdldHMiLCJ2aWV3U2V0dGluZ3NNb2RhbCIsImVsZW1lbnQiLCJvbiIsImRlc3Ryb3lXaWRnZXRzIiwidW5sb2FkUmlnaHREcmF3ZXIiLCJvZmYiLCJfb25TZWFyY2hFeHByZXNzaW9uIiwiZ3JvdXBzTW9kZSIsIl9jbGVhckdyb3VwTW9kZSIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsIm9wZW5TZXR0aW5ncyIsIm9wZW4iLCJhY3Rpb25zIiwiaGFzaFRhZ0NsaWNrZWQiLCJwYXJhbXMiLCJoYXNodGFnIiwic3RhcnRzV2l0aCIsInNldFNlYXJjaFRlcm0iLCJzZWFyY2giLCJjbG9zZSIsImtwaUNsaWNrZWQiLCJtZXRyaWNzIiwiZ2V0TWV0cmljc0J5UmVzb3VyY2VLaW5kIiwicmVzb3VyY2VLaW5kIiwicmVzdWx0cyIsImxlbmd0aCIsImZpbHRlciIsIm1ldHJpYyIsInRpdGxlIiwidW5lc2NhcGUiLCJlbmFibGVkIiwicGVyc2lzdFByZWZlcmVuY2VzIiwiJCIsIiRzb3VyY2UiLCJhdHRyIiwidG9TdHJpbmciLCJncm91cENvbmZpZ3VyZUNsaWNrZWQiLCJfc2VsZWN0R3JvdXBzIiwiZ3JvdXBDbGlja2VkIiwiX3N0YXJ0R3JvdXBNb2RlIiwiZ3JvdXBJZCIsIiRrZXkiLCJwYXJlbnRFbGVtZW50IiwiZmluZCIsImVhY2giLCJpIiwiYSIsImdyb3VwIiwiaXRlbSIsIkVycm9yIiwic2V0Q3VycmVudEdyb3VwIiwibGF5b3V0U2VsZWN0ZWRDbGlja2VkIiwibmFtZSIsInNldFNlbGVjdGVkR3JvdXBMYXlvdXRUZW1wbGF0ZSIsIl9ncm91cEluaXRpYWxpemVkIiwidmlldyIsImZhbWlseSIsInNldCIsInJlZnJlc2hSZXF1aXJlZCIsImZpZWxkIiwib3duZXIiLCJzaW5nbGVTZWxlY3QiLCJwcmV2aW91c1NlbGVjdGlvbnMiLCJtYXAiLCJoYW5kbGUiLCJhZnRlciIsImFmdGVyQ29tcGxldGUiLCJzZWxmIiwibGlzdCIsIml0ZW1zIiwiY3VycmVudFZhbHVlIiwiaGFzT3duUHJvcGVydHkiLCJkYXRhIiwicHVzaCIsImhhc0RlZmF1bHRHcm91cCIsImFkZFRvR3JvdXBQcmVmZXJlbmNlcyIsImN1cnJlbnRHcm91cCIsImdldERlZmF1bHRHcm91cCIsInJlbW92ZSIsImRlc3Ryb3kiLCJwcm9jZXNzRGF0YUhhbmRsZSIsInBvc3RQcm9jZXNzRGF0YSIsInRyYW5zaXRpb25IYW5kbGUiLCJwb3N0T25UcmFuc2l0aW9uVG8iLCJpc1JlZnJlc2hpbmciLCJuYXZpZ2F0ZVRvTGlzdFZpZXciLCJkYXRhUHJvcHMiLCJfaGFzSGFzaFRhZ3MiLCJlbmFibGVIYXNoVGFncyIsInRhZyIsImFjdGlvbiIsImdyb3Vwc0VuYWJsZWQiLCJncm91cHNTZWN0aW9uIiwiaWQiLCJjaGlsZHJlbiIsImNscyIsImljb25DbHMiLCJkZWZhdWx0R3JvdXAiLCJmb3JFYWNoIiwiZGlzcGxheU5hbWUiLCJsYXlvdXRTZWN0aW9uIiwiZ3JvdXBUZW1wbGF0ZUxheW91dHMiLCJsYXlvdXRTZWxlY3RlZCIsInRoZUxheW91dCIsInByZWZlcmVuY2VzIiwiaGFzaFRhZ3NTZWN0aW9uIiwibGVuIiwic2VhcmNoV2lkZ2V0IiwiaGFzaFRhZ1F1ZXJpZXMiLCJoYXNoVGFnIiwia2V5IiwiY3JlYXRlTWV0cmljV2lkZ2V0c0xheW91dCIsImtwaVNlY3Rpb24iLCJlc2NhcGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsTUFBTUEsV0FBVyxvQkFBWSxzQkFBWixDQUFqQjs7QUFFQTs7Ozs7O0FBMUJBOzs7Ozs7Ozs7Ozs7Ozs7QUFnQ0EsTUFBTUMsVUFBVSx1QkFBUSxpQ0FBUixFQUEyQyxnQ0FBM0MsRUFBb0U7QUFDbEY7QUFDQUMseUJBQXFCRixTQUFTRSxtQkFGb0Q7QUFHbEZDLHVCQUFtQkgsU0FBU0csaUJBSHNEO0FBSWxGQyxvQkFBZ0JKLFNBQVNJLGNBSnlEO0FBS2xGQyx5QkFBcUJMLFNBQVNLLG1CQUxvRDtBQU1sRkMsdUJBQW1CTixTQUFTTSxpQkFOc0Q7QUFPbEZDLGlCQUFhUCxTQUFTTyxXQVA0RDs7QUFTbEZDLHlCQUFxQixLQVQ2RCxFQVN0RDtBQUM1QkMscUJBQWlCLEtBVmlFO0FBV2xGQyxlQUFXLElBWHVFO0FBWWxGQyxxQkFBaUIsR0FaaUU7QUFhbEZDLG1CQUFlLGtCQWJtRTtBQWNsRkMsaUJBQWEsSUFkcUU7O0FBZ0JsRkMsc0JBQWtCLFNBQVNBLGdCQUFULEdBQTRCO0FBQzVDLFVBQU1DLFNBQVNDLElBQUlDLE9BQUosQ0FBWSxjQUFaLENBQWY7QUFDQSxVQUFJRixNQUFKLEVBQVk7QUFDVkEsZUFBT0csUUFBUCxHQUFrQixLQUFLUCxlQUF2QjtBQUNBLGFBQUtELFNBQUwsR0FBaUIsdUJBQWFTLG1C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YyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IGFzcGVjdCBmcm9tICdkb2pvL2FzcGVjdCc7XHJcbmltcG9ydCBHcm91cFV0aWxpdHkgZnJvbSAnLi4vR3JvdXBVdGlsaXR5JztcclxuaW1wb3J0IF9SaWdodERyYXdlckJhc2VNaXhpbiBmcm9tICcuL19SaWdodERyYXdlckJhc2VNaXhpbic7XHJcbmltcG9ydCBMb29rdXBGaWVsZCBmcm9tICdhcmdvcy9GaWVsZHMvTG9va3VwRmllbGQnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgncmlnaHREcmF3ZXJMaXN0TWl4aW4nKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLl9SaWdodERyYXdlckxpc3RNaXhpblxyXG4gKiBAY2xhc3NkZXNjIExpc3QgbWl4aW4gZm9yIHJpZ2h0IGRyYXdlcnMuXHJcbiAqIEBzaW5jZSAzLjBcclxuICogQG1peGlucyBjcm0uVmlld3MuX1JpZ2h0RHJhd2VyQmFzZU1peGluXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLl9SaWdodERyYXdlckxpc3RNaXhpbicsIFtfUmlnaHREcmF3ZXJCYXNlTWl4aW5dLCB7XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgaGFzaFRhZ3NTZWN0aW9uVGV4dDogcmVzb3VyY2UuaGFzaFRhZ3NTZWN0aW9uVGV4dCxcclxuICBncm91cHNTZWN0aW9uVGV4dDogcmVzb3VyY2UuZ3JvdXBzU2VjdGlvblRleHQsXHJcbiAga3BpU2VjdGlvblRleHQ6IHJlc291cmNlLmtwaVNlY3Rpb25UZXh0LFxyXG4gIGNvbmZpZ3VyZUdyb3Vwc1RleHQ6IHJlc291cmNlLmNvbmZpZ3VyZUdyb3Vwc1RleHQsXHJcbiAgcmVmcmVzaEdyb3Vwc1RleHQ6IHJlc291cmNlLnJlZnJlc2hHcm91cHNUZXh0LFxyXG4gIGxheW91dHNUZXh0OiByZXNvdXJjZS5sYXlvdXRzVGV4dCxcclxuXHJcbiAgX2hhc0NoYW5nZWRLUElQcmVmczogZmFsc2UsIC8vIERpcnR5IGZsYWcgc28gd2Uga25vdyB3aGVuIHRvIHJlbG9hZCB0aGUgd2lkZ2V0c1xyXG4gIF9oYXNoVGFnQ2xpY2tlZDogZmFsc2UsXHJcbiAgZ3JvdXBMaXN0OiBudWxsLFxyXG4gIERSQVdFUl9QQUdFU0laRTogMTAwLFxyXG4gIGdyb3VwTG9va3VwSWQ6ICdncm91cHNfY29uZmlndXJlJyxcclxuICBoYXNTZXR0aW5nczogdHJ1ZSxcclxuXHJcbiAgc2V0dXBSaWdodERyYXdlcjogZnVuY3Rpb24gc2V0dXBSaWdodERyYXdlcigpIHtcclxuICAgIGNvbnN0IGRyYXdlciA9IEFwcC5nZXRWaWV3KCdyaWdodF9kcmF3ZXInKTtcclxuICAgIGlmIChkcmF3ZXIpIHtcclxuICAgICAgZHJhd2VyLnBhZ2VTaXplID0gdGhpcy5EUkFXRVJfUEFHRVNJWkU7XHJcbiAgICAgIHRoaXMuZ3JvdXBMaXN0ID0gR3JvdXBVdGlsaXR5LmdldEdyb3VwUHJlZmVyZW5jZXModGhpcy5lbnRpdHlOYW1lKTtcclxuICAgICAgdGhpcy5fZmluaXNoU2V0dXAoZHJhd2VyKTtcclxuICAgIH1cclxuICB9LFxyXG4gIHJlZnJlc2hSaWdodERyYXdlcjogZnVuY3Rpb24gcmVmcmVzaFJpZ2h0RHJhd2VyKCkge1xyXG4gICAgY29uc3QgZHJhd2VyID0gQXBwLmdldFZpZXcoJ3JpZ2h0X2RyYXdlcicpO1xyXG4gICAgaWYgKGRyYXdlcikge1xyXG4gICAgICBkcmF3ZXIuY2xlYXIoKTtcclxuICAgICAgZHJhd2VyLmxheW91dCA9IG51bGw7XHJcbiAgICAgIGRyYXdlci5zZXRMYXlvdXQodGhpcy5jcmVhdGVSaWdodERyYXdlckxheW91dCgpKTtcclxuICAgICAgZHJhd2VyLnJlZnJlc2goKTtcclxuICAgIH1cclxuICB9LFxyXG4gIF9maW5pc2hTZXR1cDogZnVuY3Rpb24gX2ZpbmlzaFNldHVwKGRyYXdlcikge1xyXG4gICAgbGFuZy5taXhpbihkcmF3ZXIsIHRoaXMuX2NyZWF0ZUFjdGlvbnMoKSk7XHJcbiAgICBkcmF3ZXIuc2V0TGF5b3V0KHRoaXMuY3JlYXRlUmlnaHREcmF3ZXJMYXlvdXQoKSk7XHJcbiAgICBkcmF3ZXIuZ2V0R3JvdXBGb3JFbnRyeSA9IGZ1bmN0aW9uIGdldEdyb3VwRm9yRW50cnkoZW50cnkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0R3JvdXBGb3JSaWdodERyYXdlckVudHJ5KGVudHJ5KTtcclxuICAgIH0uYmluZCh0aGlzKTtcclxuXHJcbiAgICBpZiAodGhpcy5yZWJ1aWxkV2lkZ2V0cykge1xyXG4gICAgICBBcHAudmlld1NldHRpbmdzTW9kYWwuZWxlbWVudC5vbignY2xvc2UnLCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2hhc0NoYW5nZWRLUElQcmVmcykge1xyXG4gICAgICAgICAgdGhpcy5kZXN0cm95V2lkZ2V0cygpO1xyXG5cclxuICAgICAgICAgIC8vIEhBQ0s6IERvbid0IHJlYnVpbGQgd2lkZ2V0cyBpZiBhIGhhc2h0YWcgd2FzIGNsaWNrZWQsXHJcbiAgICAgICAgICAvLyBiZWNhdXNlIHRoZSB3aWRnZXQgbWl4aW4gd2lsbCByZWJ1aWxkIG9uIGEgZGF0YSByZWZyZXNoIGFueXdheXMuXHJcbiAgICAgICAgICAvLyBUT0RPOiBGaXggbXVsdGlwbGUgY2FsbHMgdG8gcmVidWlsZFdpZGV0cygpIGF0IHRoZSBzYW1lIHRpbWUuXHJcbiAgICAgICAgICBpZiAoIXRoaXMuX2hhc2hUYWdDbGlja2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVidWlsZFdpZGdldHMoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuX2hhc0NoYW5nZWRLUElQcmVmcyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVzZXQgc3RhdGVcclxuICAgICAgICB0aGlzLl9oYXNoVGFnQ2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIHVubG9hZFJpZ2h0RHJhd2VyOiBmdW5jdGlvbiB1bmxvYWRSaWdodERyYXdlcigpIHtcclxuICAgIGNvbnN0IGRyYXdlciA9IEFwcC5nZXRWaWV3KCdyaWdodF9kcmF3ZXInKTtcclxuICAgIGlmIChkcmF3ZXIpIHtcclxuICAgICAgZHJhd2VyLnNldExheW91dChbXSk7XHJcbiAgICAgIGRyYXdlci5nZXRHcm91cEZvckVudHJ5ID0gZnVuY3Rpb24gZ2V0R3JvdXBGb3JFbnRyeSgpIHt9O1xyXG4gICAgICBBcHAudmlld1NldHRpbmdzTW9kYWwuZWxlbWVudC5vZmYoJ2Nsb3NlJyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBfb25TZWFyY2hFeHByZXNzaW9uOiBmdW5jdGlvbiBfb25TZWFyY2hFeHByZXNzaW9uKCkge1xyXG4gICAgLy8gVE9ETzogRG9uJ3QgZXh0ZW5kIHRoaXMgcHJpdmF0ZSBmdW5jdGlvbiAtIGNvbm5lY3QgdG8gdGhlIHNlYXJjaCB3aWRnZXQgb25TZWFyY2hFeHByZXNzaW9uIGluc3RlYWRcclxuICAgIGlmICh0aGlzLmdyb3Vwc01vZGUpIHtcclxuICAgICAgdGhpcy5fY2xlYXJHcm91cE1vZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgb3BlblNldHRpbmdzOiBmdW5jdGlvbiBvcGVuU2V0dGluZ3MoKSB7XHJcbiAgICBBcHAudmlld1NldHRpbmdzTW9kYWwub3BlbigpO1xyXG4gIH0sXHJcbiAgX2NyZWF0ZUFjdGlvbnM6IGZ1bmN0aW9uIF9jcmVhdGVBY3Rpb25zKCkge1xyXG4gICAgLy8gVGhlc2UgYWN0aW9ucyB3aWxsIGdldCBtaXhlZCBpbnRvIHRoZSByaWdodCBkcmF3ZXIgdmlldy5cclxuICAgIGNvbnN0IGFjdGlvbnMgPSB7XHJcbiAgICAgIGhhc2hUYWdDbGlja2VkOiBmdW5jdGlvbiBoYXNoVGFnQ2xpY2tlZChwYXJhbXMpIHtcclxuICAgICAgICBjb25zdCB7IGhhc2h0YWcgfSA9IHBhcmFtcztcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZ3JvdXBzTW9kZSkge1xyXG4gICAgICAgICAgdGhpcy5fY2xlYXJHcm91cE1vZGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChoYXNodGFnICYmIHR5cGVvZiBoYXNodGFnID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgdGhpcy5faGFzaFRhZ0NsaWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgaWYgKGhhc2h0YWcuc3RhcnRzV2l0aCgnIycpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2VhcmNoVGVybShoYXNodGFnKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2VhcmNoVGVybShgIyR7aGFzaHRhZ31gKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0aGlzLnNlYXJjaCgpO1xyXG4gICAgICAgICAgQXBwLnZpZXdTZXR0aW5nc01vZGFsLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LmJpbmQodGhpcyksXHJcbiAgICAgIGtwaUNsaWNrZWQ6IGZ1bmN0aW9uIGtwaUNsaWNrZWQocGFyYW1zKSB7XHJcbiAgICAgICAgY29uc3QgbWV0cmljcyA9IEFwcC5nZXRNZXRyaWNzQnlSZXNvdXJjZUtpbmQodGhpcy5yZXNvdXJjZUtpbmQpO1xyXG4gICAgICAgIGxldCByZXN1bHRzO1xyXG5cclxuICAgICAgICBpZiAobWV0cmljcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICByZXN1bHRzID0gbWV0cmljcy5maWx0ZXIoKG1ldHJpYykgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbWV0cmljLnRpdGxlID09PSB1bmVzY2FwZShwYXJhbXMudGl0bGUpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocmVzdWx0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICBjb25zdCBlbmFibGVkID0gISFyZXN1bHRzWzBdLmVuYWJsZWQ7XHJcbiAgICAgICAgICByZXN1bHRzWzBdLmVuYWJsZWQgPSAhZW5hYmxlZDtcclxuICAgICAgICAgIEFwcC5wZXJzaXN0UHJlZmVyZW5jZXMoKTtcclxuICAgICAgICAgIHRoaXMuX2hhc0NoYW5nZWRLUElQcmVmcyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgJChwYXJhbXMuJHNvdXJjZSkuYXR0cignZGF0YS1lbmFibGVkJywgKCFlbmFibGVkKS50b1N0cmluZygpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0uYmluZCh0aGlzKSxcclxuICAgICAgZ3JvdXBDb25maWd1cmVDbGlja2VkOiBmdW5jdGlvbiBncm91cENvbmZpZ3VyZUNsaWNrZWQoKSB7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0R3JvdXBzKCk7XHJcbiAgICAgICAgQXBwLnZpZXdTZXR0aW5nc01vZGFsLmNsb3NlKCk7XHJcbiAgICAgIH0uYmluZCh0aGlzKSxcclxuICAgICAgZ3JvdXBDbGlja2VkOiBmdW5jdGlvbiBncm91cENsaWNrZWQocGFyYW1zKSB7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRHcm91cE1vZGUoKTtcclxuICAgICAgICBjb25zdCBncm91cElkID0gcGFyYW1zLiRrZXk7XHJcblxyXG4gICAgICAgICQocGFyYW1zLiRzb3VyY2UucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KS5maW5kKCdhJykuZWFjaCgoaSwgYSkgPT4ge1xyXG4gICAgICAgICAgJChhKS5hdHRyKCdkYXRhLWVuYWJsZWQnLCAoKCQoYSkuYXR0cignZGF0YS0ka2V5JykgPT09IGdyb3VwSWQpKS50b1N0cmluZygpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgZ3JvdXAgPSB0aGlzLmdyb3VwTGlzdC5maWx0ZXIoKGl0ZW0pID0+IHtcclxuICAgICAgICAgIHJldHVybiBpdGVtLiRrZXkgPT09IGdyb3VwSWQ7XHJcbiAgICAgICAgfSlbMF07XHJcblxyXG4gICAgICAgIGlmICghZ3JvdXApIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgYSBncm91cC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRDdXJyZW50R3JvdXAoZ3JvdXApO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgIEFwcC52aWV3U2V0dGluZ3NNb2RhbC5jbG9zZSgpO1xyXG4gICAgICB9LmJpbmQodGhpcyksXHJcbiAgICAgIGxheW91dFNlbGVjdGVkQ2xpY2tlZDogZnVuY3Rpb24gbGF5b3V0U2VsZWN0ZWRDbGlja2VkKHBhcmFtcykge1xyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBwYXJhbXMubmFtZTtcclxuICAgICAgICAkKHBhcmFtcy4kc291cmNlLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCkuZmluZCgnYScpLmVhY2goKGksIGEpID0+IHtcclxuICAgICAgICAgICQoYSkuYXR0cignZGF0YS1lbmFibGVkJywgKCgkKGEpLmF0dHIoJ2RhdGEtbmFtZScpID09PSBuYW1lKSkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIEdyb3VwVXRpbGl0eS5zZXRTZWxlY3RlZEdyb3VwTGF5b3V0VGVtcGxhdGUodGhpcy5lbnRpdHlOYW1lLCBuYW1lKTtcclxuICAgICAgICB0aGlzLl9ncm91cEluaXRpYWxpemVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgQXBwLnZpZXdTZXR0aW5nc01vZGFsLmNsb3NlKCk7XHJcbiAgICAgIH0uYmluZCh0aGlzKSxcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBhY3Rpb25zO1xyXG4gIH0sXHJcbiAgX3NlbGVjdEdyb3VwczogZnVuY3Rpb24gX3NlbGVjdEdyb3VwcygpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyh0aGlzLmdyb3VwTG9va3VwSWQpO1xyXG4gICAgdmlldy5mYW1pbHkgPSB0aGlzLmVudGl0eU5hbWU7XHJcbiAgICB2aWV3LnNldCgnc3RvcmUnLCBudWxsKTtcclxuICAgIHZpZXcuY2xlYXIoKTtcclxuICAgIHZpZXcucmVmcmVzaFJlcXVpcmVkID0gdHJ1ZTtcclxuXHJcbiAgICBjb25zdCBmaWVsZCA9IG5ldyBMb29rdXBGaWVsZCh7XHJcbiAgICAgIG93bmVyOiB0aGlzLFxyXG4gICAgICB2aWV3LFxyXG4gICAgICBzaW5nbGVTZWxlY3Q6IGZhbHNlLFxyXG4gICAgICBwcmV2aW91c1NlbGVjdGlvbnM6IHRoaXMuZ3JvdXBMaXN0ICYmIHRoaXMuZ3JvdXBMaXN0Lm1hcCgoZ3JvdXApID0+IHtcclxuICAgICAgICByZXR1cm4gZ3JvdXAuJGtleTtcclxuICAgICAgfSksXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGUgPSBhc3BlY3QuYWZ0ZXIoZmllbGQsICdjb21wbGV0ZScsIGZ1bmN0aW9uIGFmdGVyQ29tcGxldGUoKSB7XHJcbiAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgICBjb25zdCBsaXN0ID0gdGhpcy5vd25lcjtcclxuICAgICAgY29uc3QgaXRlbXMgPSBbXTtcclxuXHJcbiAgICAgIC8vIFdlIHdpbGwgZ2V0IGFuIG9iamVjdCBiYWNrIHdoZXJlIHRoZSBwcm9wZXJ0eSBuYW1lcyBhcmUgdGhlIGtleXMgKGdyb3VwSWQncylcclxuICAgICAgLy8gRXh0cmFjdCB0aGVtIG91dCwgYW5kIHNhdmUgdGhlIGVudHJ5LCB3aGljaCBpcyB0aGUgZGF0YSBwcm9wZXJ0eSBvbiB0aGUgZXh0cmFjdGVkIG9iamVjdFxyXG4gICAgICBmb3IgKGNvbnN0IGdyb3VwSWQgaW4gc2VsZi5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgICBpZiAoc2VsZi5jdXJyZW50VmFsdWUuaGFzT3duUHJvcGVydHkoZ3JvdXBJZCkpIHtcclxuICAgICAgICAgIGNvbnN0IGVudHJ5ID0gc2VsZi5jdXJyZW50VmFsdWVbZ3JvdXBJZF0uZGF0YTtcclxuICAgICAgICAgIGlmIChlbnRyeSkge1xyXG4gICAgICAgICAgICBpdGVtcy5wdXNoKGVudHJ5KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGhhc0RlZmF1bHRHcm91cCA9IGxpc3QuaGFzRGVmYXVsdEdyb3VwO1xyXG4gICAgICBHcm91cFV0aWxpdHkuYWRkVG9Hcm91cFByZWZlcmVuY2VzKGl0ZW1zLCBsaXN0LmVudGl0eU5hbWUsIHRydWUpO1xyXG4gICAgICBjb25zdCBjdXJyZW50R3JvdXAgPSBHcm91cFV0aWxpdHkuZ2V0RGVmYXVsdEdyb3VwKGxpc3QuZW50aXR5TmFtZSk7XHJcbiAgICAgIGlmIChjdXJyZW50R3JvdXApIHtcclxuICAgICAgICBsaXN0LnNldEN1cnJlbnRHcm91cChjdXJyZW50R3JvdXApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBoYW5kbGUucmVtb3ZlKCk7XHJcbiAgICAgIHNlbGYuZGVzdHJveSgpO1xyXG5cclxuICAgICAgaWYgKGhhc0RlZmF1bHRHcm91cCkge1xyXG4gICAgICAgIC8vIFdlIHdpbGwgdHJhbnNpdGlvbiBiYWNrIHRvIHRoZSBsaXN0LCBwb3AgYmFjayBvcGVuIHRoZSByaWdodCBkcmF3ZXIgc28gdGhlIHVzZXIgaXMgYmFjayB3aGVyZSB0aGV5IHN0YXJ0ZWRcclxuICAgICAgICBjb25zdCBwcm9jZXNzRGF0YUhhbmRsZSA9IGFzcGVjdC5hZnRlcihsaXN0LCAncHJvY2Vzc0RhdGEnLCBmdW5jdGlvbiBwb3N0UHJvY2Vzc0RhdGEoKSB7XHJcbiAgICAgICAgICBBcHAudmlld1NldHRpbmdzTW9kYWwuY2xvc2UoKTtcclxuICAgICAgICAgIHByb2Nlc3NEYXRhSGFuZGxlLnJlbW92ZSgpO1xyXG4gICAgICAgICAgaWYgKHRoaXMudHJhbnNpdGlvbkhhbmRsZSkge1xyXG4gICAgICAgICAgICB0aGlzLnRyYW5zaXRpb25IYW5kbGUucmVtb3ZlKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKGxpc3QpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBTaW5jZSB0aGVyZSB3YXMgbm8gcHJldmlvdXMgZGVmYXVsdCBncm91cCwganVzdCByZWZyZXNoIHRoZSBsaXN0IChubyBuZWVkIHRvIHRvZ2dsZSB0aGUgcmlnaHQgZHJhd2VyKVxyXG4gICAgICAgIHRoaXMudHJhbnNpdGlvbkhhbmRsZSA9IGFzcGVjdC5hZnRlcihsaXN0LCAnb25UcmFuc2l0aW9uVG8nLCBmdW5jdGlvbiBwb3N0T25UcmFuc2l0aW9uVG8oKSB7XHJcbiAgICAgICAgICB0aGlzLnJlZnJlc2hSZXF1aXJlZCA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLmlzUmVmcmVzaGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgICBpZiAoc2VsZi50cmFuc2l0aW9uSGFuZGxlKSB7XHJcbiAgICAgICAgICAgIHNlbGYudHJhbnNpdGlvbkhhbmRsZS5yZW1vdmUoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQobGlzdCkpO1xyXG4gICAgICB9XHJcbiAgICB9LmJpbmQoZmllbGQpKTtcclxuXHJcbiAgICBmaWVsZC5uYXZpZ2F0ZVRvTGlzdFZpZXcoKTtcclxuICB9LFxyXG4gIGdldEdyb3VwRm9yUmlnaHREcmF3ZXJFbnRyeTogZnVuY3Rpb24gZ2V0R3JvdXBGb3JSaWdodERyYXdlckVudHJ5KGVudHJ5KSB7XHJcbiAgICBpZiAoZW50cnkuZGF0YVByb3BzICYmIGVudHJ5LmRhdGFQcm9wcy5oYXNodGFnICYmIHRoaXMuX2hhc0hhc2hUYWdzKCkgJiYgQXBwLmVuYWJsZUhhc2hUYWdzKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdGFnOiAndmlldycsXHJcbiAgICAgICAgdGl0bGU6IHJlc291cmNlLmhhc2hUYWdzU2VjdGlvblRleHQsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKChlbnRyeS5hY3Rpb24gPT09ICdncm91cENsaWNrZWQnIHx8IGVudHJ5LmFjdGlvbiA9PT0gJ2dyb3VwQ29uZmlndXJlQ2xpY2tlZCcpICYmIHRoaXMuZ3JvdXBzRW5hYmxlZCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHRhZzogJ2dyb3VwJyxcclxuICAgICAgICB0aXRsZTogcmVzb3VyY2UuZ3JvdXBzU2VjdGlvblRleHQsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICBpZiAoKGVudHJ5LmFjdGlvbiA9PT0gJ2xheW91dFNlbGVjdGVkQ2xpY2tlZCcpICYmIHRoaXMuZ3JvdXBzRW5hYmxlZCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHRhZzogJ2xheW91dFRlbXBsYXRlcycsXHJcbiAgICAgICAgdGl0bGU6IHJlc291cmNlLmxheW91dHNUZXh0LFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGFnOiAna3BpJyxcclxuICAgICAgdGl0bGU6IHJlc291cmNlLmtwaVNlY3Rpb25UZXh0LFxyXG4gICAgfTtcclxuICB9LFxyXG4gIGNyZWF0ZVJpZ2h0RHJhd2VyTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVSaWdodERyYXdlckxheW91dCgpIHtcclxuICAgIGNvbnN0IGxheW91dCA9IFtdO1xyXG5cclxuICAgIGlmICh0aGlzLmdyb3Vwc0VuYWJsZWQpIHtcclxuICAgICAgY29uc3QgZ3JvdXBzU2VjdGlvbiA9IHtcclxuICAgICAgICBpZDogJ2FjdGlvbnMnLFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGdyb3Vwc1NlY3Rpb24uY2hpbGRyZW4ucHVzaCh7XHJcbiAgICAgICAgbmFtZTogJ2NvbmZpZ3VyZUdyb3VwcycsXHJcbiAgICAgICAgYWN0aW9uOiAnZ3JvdXBDb25maWd1cmVDbGlja2VkJyxcclxuICAgICAgICB0aXRsZTogcmVzb3VyY2UuY29uZmlndXJlR3JvdXBzVGV4dCxcclxuICAgICAgICBjbHM6ICdncm91cC1jb25maWd1cmF0aW9uJyxcclxuICAgICAgICBpY29uQ2xzOiAnZmEgZmEtY29nIGZhLWZ3ICcsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3QgZGVmYXVsdEdyb3VwID0gR3JvdXBVdGlsaXR5LmdldERlZmF1bHRHcm91cCh0aGlzLmVudGl0eU5hbWUpO1xyXG4gICAgICBpZiAodGhpcy5ncm91cExpc3QgJiYgdGhpcy5ncm91cExpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHRoaXMuZ3JvdXBMaXN0LmZvckVhY2goKGdyb3VwKSA9PiB7XHJcbiAgICAgICAgICBncm91cHNTZWN0aW9uLmNoaWxkcmVuLnB1c2goe1xyXG4gICAgICAgICAgICBuYW1lOiBncm91cC5uYW1lLFxyXG4gICAgICAgICAgICBhY3Rpb246ICdncm91cENsaWNrZWQnLFxyXG4gICAgICAgICAgICB0aXRsZTogZ3JvdXAuZGlzcGxheU5hbWUsXHJcbiAgICAgICAgICAgIGRhdGFQcm9wczoge1xyXG4gICAgICAgICAgICAgICRrZXk6IGdyb3VwLiRrZXksXHJcbiAgICAgICAgICAgICAgdGl0bGU6IGdyb3VwLmRpc3BsYXlOYW1lLFxyXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IGRlZmF1bHRHcm91cC4ka2V5ID09PSBncm91cC4ka2V5LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgbGF5b3V0U2VjdGlvbiA9IHtcclxuICAgICAgICBpZDogJ2FjdGlvbnMnLFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgfTtcclxuICAgICAgaWYgKHRoaXMuZ3JvdXBUZW1wbGF0ZUxheW91dHMgJiYgdGhpcy5ncm91cFRlbXBsYXRlTGF5b3V0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgbGV0IGxheW91dFNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ncm91cFRlbXBsYXRlTGF5b3V0cy5mb3JFYWNoKCh0aGVMYXlvdXQpID0+IHtcclxuICAgICAgICAgIGlmICghbGF5b3V0U2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgbGF5b3V0U2VsZWN0ZWQgPSB0aGVMYXlvdXQubmFtZSA9PT0gQXBwLnByZWZlcmVuY2VzW2Bncm91cHMtc2VsZWN0ZWQtdGVtcGxhdGUtbmFtZSR7dGhpcy5lbnRpdHlOYW1lfWBdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgbGF5b3V0U2VjdGlvbi5jaGlsZHJlbi5wdXNoKHtcclxuICAgICAgICAgICAgbmFtZTogdGhlTGF5b3V0Lm5hbWUsXHJcbiAgICAgICAgICAgIGFjdGlvbjogJ2xheW91dFNlbGVjdGVkQ2xpY2tlZCcsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGVMYXlvdXQuZGlzcGxheU5hbWUsXHJcbiAgICAgICAgICAgIGRhdGFQcm9wczoge1xyXG4gICAgICAgICAgICAgIG5hbWU6IHRoZUxheW91dC5uYW1lLFxyXG4gICAgICAgICAgICAgIHRpdGxlOiB0aGVMYXlvdXQuZGlzcGxheU5hbWUsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogdGhlTGF5b3V0Lm5hbWUgPT09IEFwcC5wcmVmZXJlbmNlc1tgZ3JvdXBzLXNlbGVjdGVkLXRlbXBsYXRlLW5hbWUke3RoaXMuZW50aXR5TmFtZX1gXSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghbGF5b3V0U2VsZWN0ZWQgJiYgbGF5b3V0U2VjdGlvbi5jaGlsZHJlbi5sZW5ndGgpIHtcclxuICAgICAgICAgIGxheW91dFNlY3Rpb24uY2hpbGRyZW5bMF0uZGF0YVByb3BzLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMuZW50aXR5TmFtZSkge1xyXG4gICAgICAgIGxheW91dC5wdXNoKGdyb3Vwc1NlY3Rpb24pO1xyXG4gICAgICAgIGxheW91dC5wdXNoKGxheW91dFNlY3Rpb24pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKEFwcC5lbmFibGVIYXNoVGFncykge1xyXG4gICAgICBjb25zdCBoYXNoVGFnc1NlY3Rpb24gPSB7XHJcbiAgICAgICAgaWQ6ICdhY3Rpb25zJyxcclxuICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAodGhpcy5faGFzSGFzaFRhZ3MoKSkge1xyXG4gICAgICAgIGNvbnN0IGxlbiA9IHRoaXMuc2VhcmNoV2lkZ2V0Lmhhc2hUYWdRdWVyaWVzLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICBjb25zdCBoYXNoVGFnID0gdGhpcy5zZWFyY2hXaWRnZXQuaGFzaFRhZ1F1ZXJpZXNbaV07XHJcbiAgICAgICAgICBoYXNoVGFnc1NlY3Rpb24uY2hpbGRyZW4ucHVzaCh7XHJcbiAgICAgICAgICAgIG5hbWU6IGhhc2hUYWcua2V5LFxyXG4gICAgICAgICAgICBhY3Rpb246ICdoYXNoVGFnQ2xpY2tlZCcsXHJcbiAgICAgICAgICAgIHRpdGxlOiBoYXNoVGFnLnRhZyxcclxuICAgICAgICAgICAgZGF0YVByb3BzOiB7XHJcbiAgICAgICAgICAgICAgaGFzaHRhZzogaGFzaFRhZy50YWcsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxheW91dC5wdXNoKGhhc2hUYWdzU2VjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuY3JlYXRlTWV0cmljV2lkZ2V0c0xheW91dCkge1xyXG4gICAgICBjb25zdCBtZXRyaWNzID0gQXBwLmdldE1ldHJpY3NCeVJlc291cmNlS2luZCh0aGlzLnJlc291cmNlS2luZCk7XHJcblxyXG4gICAgICBjb25zdCBrcGlTZWN0aW9uID0ge1xyXG4gICAgICAgIGlkOiAna3BpJyxcclxuICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAobWV0cmljcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgbWV0cmljcy5mb3JFYWNoKChtZXRyaWMsIGkpID0+IHtcclxuICAgICAgICAgIGlmIChtZXRyaWMudGl0bGUpIHtcclxuICAgICAgICAgICAga3BpU2VjdGlvbi5jaGlsZHJlbi5wdXNoKHtcclxuICAgICAgICAgICAgICBuYW1lOiBgS1BJJHtpfWAsXHJcbiAgICAgICAgICAgICAgYWN0aW9uOiAna3BpQ2xpY2tlZCcsXHJcbiAgICAgICAgICAgICAgdGl0bGU6IG1ldHJpYy50aXRsZSxcclxuICAgICAgICAgICAgICBkYXRhUHJvcHM6IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBlc2NhcGUobWV0cmljLnRpdGxlKSxcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6ICEhbWV0cmljLmVuYWJsZWQsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxheW91dC5wdXNoKGtwaVNlY3Rpb24pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGxheW91dDtcclxuICB9LFxyXG4gIF9oYXNIYXNoVGFnczogZnVuY3Rpb24gX2hhc0hhc2hUYWdzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VhcmNoV2lkZ2V0ICYmIHRoaXMuc2VhcmNoV2lkZ2V0Lmhhc2hUYWdRdWVyaWVzICYmIHRoaXMuc2VhcmNoV2lkZ2V0Lmhhc2hUYWdRdWVyaWVzLmxlbmd0aCA+IDA7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=