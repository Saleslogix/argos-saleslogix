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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9fUmlnaHREcmF3ZXJMaXN0TWl4aW4uanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiaGFzaFRhZ3NTZWN0aW9uVGV4dCIsImdyb3Vwc1NlY3Rpb25UZXh0Iiwia3BpU2VjdGlvblRleHQiLCJjb25maWd1cmVHcm91cHNUZXh0IiwicmVmcmVzaEdyb3Vwc1RleHQiLCJsYXlvdXRzVGV4dCIsIl9oYXNDaGFuZ2VkS1BJUHJlZnMiLCJfaGFzaFRhZ0NsaWNrZWQiLCJncm91cExpc3QiLCJEUkFXRVJfUEFHRVNJWkUiLCJncm91cExvb2t1cElkIiwiaGFzU2V0dGluZ3MiLCJzZXR1cFJpZ2h0RHJhd2VyIiwiZHJhd2VyIiwiQXBwIiwiZ2V0VmlldyIsInBhZ2VTaXplIiwiZ2V0R3JvdXBQcmVmZXJlbmNlcyIsImVudGl0eU5hbWUiLCJfZmluaXNoU2V0dXAiLCJyZWZyZXNoUmlnaHREcmF3ZXIiLCJjbGVhciIsImxheW91dCIsInNldExheW91dCIsImNyZWF0ZVJpZ2h0RHJhd2VyTGF5b3V0IiwicmVmcmVzaCIsIm1peGluIiwiX2NyZWF0ZUFjdGlvbnMiLCJnZXRHcm91cEZvckVudHJ5IiwiZW50cnkiLCJnZXRHcm91cEZvclJpZ2h0RHJhd2VyRW50cnkiLCJiaW5kIiwicmVidWlsZFdpZGdldHMiLCJ2aWV3U2V0dGluZ3NNb2RhbCIsImVsZW1lbnQiLCJvbiIsImRlc3Ryb3lXaWRnZXRzIiwidW5sb2FkUmlnaHREcmF3ZXIiLCJvZmYiLCJfb25TZWFyY2hFeHByZXNzaW9uIiwiZ3JvdXBzTW9kZSIsIl9jbGVhckdyb3VwTW9kZSIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsIm9wZW5TZXR0aW5ncyIsIm9wZW4iLCJhY3Rpb25zIiwiaGFzaFRhZ0NsaWNrZWQiLCJwYXJhbXMiLCJoYXNodGFnIiwic3RhcnRzV2l0aCIsInNldFNlYXJjaFRlcm0iLCJzZWFyY2giLCJjbG9zZSIsImtwaUNsaWNrZWQiLCJtZXRyaWNzIiwiZ2V0TWV0cmljc0J5UmVzb3VyY2VLaW5kIiwicmVzb3VyY2VLaW5kIiwicmVzdWx0cyIsImxlbmd0aCIsImZpbHRlciIsIm1ldHJpYyIsInRpdGxlIiwidW5lc2NhcGUiLCJlbmFibGVkIiwicGVyc2lzdFByZWZlcmVuY2VzIiwiJCIsIiRzb3VyY2UiLCJhdHRyIiwidG9TdHJpbmciLCJncm91cENvbmZpZ3VyZUNsaWNrZWQiLCJfc2VsZWN0R3JvdXBzIiwiZ3JvdXBDbGlja2VkIiwiX3N0YXJ0R3JvdXBNb2RlIiwiZ3JvdXBJZCIsIiRrZXkiLCJwYXJlbnRFbGVtZW50IiwiZmluZCIsImVhY2giLCJpIiwiYSIsImdyb3VwIiwiaXRlbSIsIkVycm9yIiwic2V0Q3VycmVudEdyb3VwIiwibGF5b3V0U2VsZWN0ZWRDbGlja2VkIiwibmFtZSIsInNldFNlbGVjdGVkR3JvdXBMYXlvdXRUZW1wbGF0ZSIsIl9ncm91cEluaXRpYWxpemVkIiwidmlldyIsImZhbWlseSIsInNldCIsInJlZnJlc2hSZXF1aXJlZCIsImZpZWxkIiwib3duZXIiLCJzaW5nbGVTZWxlY3QiLCJwcmV2aW91c1NlbGVjdGlvbnMiLCJtYXAiLCJoYW5kbGUiLCJhZnRlciIsImFmdGVyQ29tcGxldGUiLCJzZWxmIiwibGlzdCIsIml0ZW1zIiwiY3VycmVudFZhbHVlIiwiaGFzT3duUHJvcGVydHkiLCJkYXRhIiwicHVzaCIsImhhc0RlZmF1bHRHcm91cCIsImFkZFRvR3JvdXBQcmVmZXJlbmNlcyIsImN1cnJlbnRHcm91cCIsImdldERlZmF1bHRHcm91cCIsInJlbW92ZSIsImRlc3Ryb3kiLCJwcm9jZXNzRGF0YUhhbmRsZSIsInBvc3RQcm9jZXNzRGF0YSIsInRyYW5zaXRpb25IYW5kbGUiLCJwb3N0T25UcmFuc2l0aW9uVG8iLCJpc1JlZnJlc2hpbmciLCJuYXZpZ2F0ZVRvTGlzdFZpZXciLCJkYXRhUHJvcHMiLCJfaGFzSGFzaFRhZ3MiLCJlbmFibGVIYXNoVGFncyIsInRhZyIsImFjdGlvbiIsImdyb3Vwc0VuYWJsZWQiLCJncm91cHNTZWN0aW9uIiwiaWQiLCJjaGlsZHJlbiIsImNscyIsImljb25DbHMiLCJkZWZhdWx0R3JvdXAiLCJmb3JFYWNoIiwiZGlzcGxheU5hbWUiLCJsYXlvdXRTZWN0aW9uIiwiZ3JvdXBUZW1wbGF0ZUxheW91dHMiLCJsYXlvdXRTZWxlY3RlZCIsInRoZUxheW91dCIsInByZWZlcmVuY2VzIiwiaGFzaFRhZ3NTZWN0aW9uIiwibGVuIiwic2VhcmNoV2lkZ2V0IiwiaGFzaFRhZ1F1ZXJpZXMiLCJoYXNoVGFnIiwia2V5IiwiY3JlYXRlTWV0cmljV2lkZ2V0c0xheW91dCIsImtwaVNlY3Rpb24iLCJlc2NhcGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsTUFBTUEsV0FBVyxvQkFBWSxzQkFBWixDQUFqQjs7QUFFQTs7Ozs7O0FBMUJBOzs7Ozs7Ozs7Ozs7Ozs7QUFnQ0EsTUFBTUMsVUFBVSx1QkFBUSxpQ0FBUixFQUEyQyxnQ0FBM0MsRUFBb0U7QUFDbEY7QUFDQUMseUJBQXFCRixTQUFTRSxtQkFGb0Q7QUFHbEZDLHVCQUFtQkgsU0FBU0csaUJBSHNEO0FBSWxGQyxvQkFBZ0JKLFNBQVNJLGNBSnlEO0FBS2xGQyx5QkFBcUJMLFNBQVNLLG1CQUxvRDtBQU1sRkMsdUJBQW1CTixTQUFTTSxpQkFOc0Q7QUFPbEZDLGlCQUFhUCxTQUFTTyxXQVA0RDs7QUFTbEZDLHlCQUFxQixLQVQ2RCxFQVN0RDtBQUM1QkMscUJBQWlCLEtBVmlFO0FBV2xGQyxlQUFXLElBWHVFO0FBWWxGQyxxQkFBaUIsR0FaaUU7QUFhbEZDLG1CQUFlLGtCQWJtRTtBQWNsRkMsaUJBQWEsSUFkcUU7O0FBZ0JsRkMsc0JBQWtCLFNBQVNBLGdCQUFULEdBQTRCO0FBQzVDLFVBQU1DLFNBQVNDLElBQUlDLE9BQUosQ0FBWSxjQUFaLENBQWY7QUFDQSxVQUFJRixNQUFKLEVBQVk7QUFDVkEsZUFBT0csUUFBUCxHQUFrQixLQUFLUCxlQUF2QjtBQUNBLGFBQUtELFNBQUwsR0FBaUIsdUJBQWFTLG1C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b3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgYXNwZWN0IGZyb20gJ2Rvam8vYXNwZWN0JztcclxuaW1wb3J0IEdyb3VwVXRpbGl0eSBmcm9tICcuLi9Hcm91cFV0aWxpdHknO1xyXG5pbXBvcnQgX1JpZ2h0RHJhd2VyQmFzZU1peGluIGZyb20gJy4vX1JpZ2h0RHJhd2VyQmFzZU1peGluJztcclxuaW1wb3J0IExvb2t1cEZpZWxkIGZyb20gJ2FyZ29zL0ZpZWxkcy9Mb29rdXBGaWVsZCc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdyaWdodERyYXdlckxpc3RNaXhpbicpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuX1JpZ2h0RHJhd2VyTGlzdE1peGluXHJcbiAqIEBjbGFzc2Rlc2MgTGlzdCBtaXhpbiBmb3IgcmlnaHQgZHJhd2Vycy5cclxuICogQHNpbmNlIDMuMFxyXG4gKiBAbWl4aW5zIGNybS5WaWV3cy5fUmlnaHREcmF3ZXJCYXNlTWl4aW5cclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuX1JpZ2h0RHJhd2VyTGlzdE1peGluJywgW19SaWdodERyYXdlckJhc2VNaXhpbl0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICBoYXNoVGFnc1NlY3Rpb25UZXh0OiByZXNvdXJjZS5oYXNoVGFnc1NlY3Rpb25UZXh0LFxyXG4gIGdyb3Vwc1NlY3Rpb25UZXh0OiByZXNvdXJjZS5ncm91cHNTZWN0aW9uVGV4dCxcclxuICBrcGlTZWN0aW9uVGV4dDogcmVzb3VyY2Uua3BpU2VjdGlvblRleHQsXHJcbiAgY29uZmlndXJlR3JvdXBzVGV4dDogcmVzb3VyY2UuY29uZmlndXJlR3JvdXBzVGV4dCxcclxuICByZWZyZXNoR3JvdXBzVGV4dDogcmVzb3VyY2UucmVmcmVzaEdyb3Vwc1RleHQsXHJcbiAgbGF5b3V0c1RleHQ6IHJlc291cmNlLmxheW91dHNUZXh0LFxyXG5cclxuICBfaGFzQ2hhbmdlZEtQSVByZWZzOiBmYWxzZSwgLy8gRGlydHkgZmxhZyBzbyB3ZSBrbm93IHdoZW4gdG8gcmVsb2FkIHRoZSB3aWRnZXRzXHJcbiAgX2hhc2hUYWdDbGlja2VkOiBmYWxzZSxcclxuICBncm91cExpc3Q6IG51bGwsXHJcbiAgRFJBV0VSX1BBR0VTSVpFOiAxMDAsXHJcbiAgZ3JvdXBMb29rdXBJZDogJ2dyb3Vwc19jb25maWd1cmUnLFxyXG4gIGhhc1NldHRpbmdzOiB0cnVlLFxyXG5cclxuICBzZXR1cFJpZ2h0RHJhd2VyOiBmdW5jdGlvbiBzZXR1cFJpZ2h0RHJhd2VyKCkge1xyXG4gICAgY29uc3QgZHJhd2VyID0gQXBwLmdldFZpZXcoJ3JpZ2h0X2RyYXdlcicpO1xyXG4gICAgaWYgKGRyYXdlcikge1xyXG4gICAgICBkcmF3ZXIucGFnZVNpemUgPSB0aGlzLkRSQVdFUl9QQUdFU0laRTtcclxuICAgICAgdGhpcy5ncm91cExpc3QgPSBHcm91cFV0aWxpdHkuZ2V0R3JvdXBQcmVmZXJlbmNlcyh0aGlzLmVudGl0eU5hbWUpO1xyXG4gICAgICB0aGlzLl9maW5pc2hTZXR1cChkcmF3ZXIpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgcmVmcmVzaFJpZ2h0RHJhd2VyOiBmdW5jdGlvbiByZWZyZXNoUmlnaHREcmF3ZXIoKSB7XHJcbiAgICBjb25zdCBkcmF3ZXIgPSBBcHAuZ2V0VmlldygncmlnaHRfZHJhd2VyJyk7XHJcbiAgICBpZiAoZHJhd2VyKSB7XHJcbiAgICAgIGRyYXdlci5jbGVhcigpO1xyXG4gICAgICBkcmF3ZXIubGF5b3V0ID0gbnVsbDtcclxuICAgICAgZHJhd2VyLnNldExheW91dCh0aGlzLmNyZWF0ZVJpZ2h0RHJhd2VyTGF5b3V0KCkpO1xyXG4gICAgICBkcmF3ZXIucmVmcmVzaCgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgX2ZpbmlzaFNldHVwOiBmdW5jdGlvbiBfZmluaXNoU2V0dXAoZHJhd2VyKSB7XHJcbiAgICBsYW5nLm1peGluKGRyYXdlciwgdGhpcy5fY3JlYXRlQWN0aW9ucygpKTtcclxuICAgIGRyYXdlci5zZXRMYXlvdXQodGhpcy5jcmVhdGVSaWdodERyYXdlckxheW91dCgpKTtcclxuICAgIGRyYXdlci5nZXRHcm91cEZvckVudHJ5ID0gZnVuY3Rpb24gZ2V0R3JvdXBGb3JFbnRyeShlbnRyeSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXRHcm91cEZvclJpZ2h0RHJhd2VyRW50cnkoZW50cnkpO1xyXG4gICAgfS5iaW5kKHRoaXMpO1xyXG5cclxuICAgIGlmICh0aGlzLnJlYnVpbGRXaWRnZXRzKSB7XHJcbiAgICAgIEFwcC52aWV3U2V0dGluZ3NNb2RhbC5lbGVtZW50Lm9uKCdjbG9zZScsICgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5faGFzQ2hhbmdlZEtQSVByZWZzKSB7XHJcbiAgICAgICAgICB0aGlzLmRlc3Ryb3lXaWRnZXRzKCk7XHJcblxyXG4gICAgICAgICAgLy8gSEFDSzogRG9uJ3QgcmVidWlsZCB3aWRnZXRzIGlmIGEgaGFzaHRhZyB3YXMgY2xpY2tlZCxcclxuICAgICAgICAgIC8vIGJlY2F1c2UgdGhlIHdpZGdldCBtaXhpbiB3aWxsIHJlYnVpbGQgb24gYSBkYXRhIHJlZnJlc2ggYW55d2F5cy5cclxuICAgICAgICAgIC8vIFRPRE86IEZpeCBtdWx0aXBsZSBjYWxscyB0byByZWJ1aWxkV2lkZXRzKCkgYXQgdGhlIHNhbWUgdGltZS5cclxuICAgICAgICAgIGlmICghdGhpcy5faGFzaFRhZ0NsaWNrZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWJ1aWxkV2lkZ2V0cygpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5faGFzQ2hhbmdlZEtQSVByZWZzID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXNldCBzdGF0ZVxyXG4gICAgICAgIHRoaXMuX2hhc2hUYWdDbGlja2VkID0gZmFsc2U7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgdW5sb2FkUmlnaHREcmF3ZXI6IGZ1bmN0aW9uIHVubG9hZFJpZ2h0RHJhd2VyKCkge1xyXG4gICAgY29uc3QgZHJhd2VyID0gQXBwLmdldFZpZXcoJ3JpZ2h0X2RyYXdlcicpO1xyXG4gICAgaWYgKGRyYXdlcikge1xyXG4gICAgICBkcmF3ZXIuc2V0TGF5b3V0KFtdKTtcclxuICAgICAgZHJhd2VyLmdldEdyb3VwRm9yRW50cnkgPSBmdW5jdGlvbiBnZXRHcm91cEZvckVudHJ5KCkge307XHJcbiAgICAgIEFwcC52aWV3U2V0dGluZ3NNb2RhbC5lbGVtZW50Lm9mZignY2xvc2UnKTtcclxuICAgIH1cclxuICB9LFxyXG4gIF9vblNlYXJjaEV4cHJlc3Npb246IGZ1bmN0aW9uIF9vblNlYXJjaEV4cHJlc3Npb24oKSB7XHJcbiAgICAvLyBUT0RPOiBEb24ndCBleHRlbmQgdGhpcyBwcml2YXRlIGZ1bmN0aW9uIC0gY29ubmVjdCB0byB0aGUgc2VhcmNoIHdpZGdldCBvblNlYXJjaEV4cHJlc3Npb24gaW5zdGVhZFxyXG4gICAgaWYgKHRoaXMuZ3JvdXBzTW9kZSkge1xyXG4gICAgICB0aGlzLl9jbGVhckdyb3VwTW9kZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaW5oZXJpdGVkKF9vblNlYXJjaEV4cHJlc3Npb24sIGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBvcGVuU2V0dGluZ3M6IGZ1bmN0aW9uIG9wZW5TZXR0aW5ncygpIHtcclxuICAgIEFwcC52aWV3U2V0dGluZ3NNb2RhbC5vcGVuKCk7XHJcbiAgfSxcclxuICBfY3JlYXRlQWN0aW9uczogZnVuY3Rpb24gX2NyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAvLyBUaGVzZSBhY3Rpb25zIHdpbGwgZ2V0IG1peGVkIGludG8gdGhlIHJpZ2h0IGRyYXdlciB2aWV3LlxyXG4gICAgY29uc3QgYWN0aW9ucyA9IHtcclxuICAgICAgaGFzaFRhZ0NsaWNrZWQ6IGZ1bmN0aW9uIGhhc2hUYWdDbGlja2VkKHBhcmFtcykge1xyXG4gICAgICAgIGNvbnN0IHsgaGFzaHRhZyB9ID0gcGFyYW1zO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5ncm91cHNNb2RlKSB7XHJcbiAgICAgICAgICB0aGlzLl9jbGVhckdyb3VwTW9kZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGhhc2h0YWcgJiYgdHlwZW9mIGhhc2h0YWcgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICB0aGlzLl9oYXNoVGFnQ2xpY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICBpZiAoaGFzaHRhZy5zdGFydHNXaXRoKCcjJykpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTZWFyY2hUZXJtKGhhc2h0YWcpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTZWFyY2hUZXJtKGAjJHtoYXNodGFnfWApO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRoaXMuc2VhcmNoKCk7XHJcbiAgICAgICAgICBBcHAudmlld1NldHRpbmdzTW9kYWwuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0uYmluZCh0aGlzKSxcclxuICAgICAga3BpQ2xpY2tlZDogZnVuY3Rpb24ga3BpQ2xpY2tlZChwYXJhbXMpIHtcclxuICAgICAgICBjb25zdCBtZXRyaWNzID0gQXBwLmdldE1ldHJpY3NCeVJlc291cmNlS2luZCh0aGlzLnJlc291cmNlS2luZCk7XHJcbiAgICAgICAgbGV0IHJlc3VsdHM7XHJcblxyXG4gICAgICAgIGlmIChtZXRyaWNzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIHJlc3VsdHMgPSBtZXRyaWNzLmZpbHRlcigobWV0cmljKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXRyaWMudGl0bGUgPT09IHVuZXNjYXBlKHBhcmFtcy50aXRsZSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIGNvbnN0IGVuYWJsZWQgPSAhIXJlc3VsdHNbMF0uZW5hYmxlZDtcclxuICAgICAgICAgIHJlc3VsdHNbMF0uZW5hYmxlZCA9ICFlbmFibGVkO1xyXG4gICAgICAgICAgQXBwLnBlcnNpc3RQcmVmZXJlbmNlcygpO1xyXG4gICAgICAgICAgdGhpcy5faGFzQ2hhbmdlZEtQSVByZWZzID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAkKHBhcmFtcy4kc291cmNlKS5hdHRyKCdkYXRhLWVuYWJsZWQnLCAoIWVuYWJsZWQpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfS5iaW5kKHRoaXMpLFxyXG4gICAgICBncm91cENvbmZpZ3VyZUNsaWNrZWQ6IGZ1bmN0aW9uIGdyb3VwQ29uZmlndXJlQ2xpY2tlZCgpIHtcclxuICAgICAgICB0aGlzLl9zZWxlY3RHcm91cHMoKTtcclxuICAgICAgICBBcHAudmlld1NldHRpbmdzTW9kYWwuY2xvc2UoKTtcclxuICAgICAgfS5iaW5kKHRoaXMpLFxyXG4gICAgICBncm91cENsaWNrZWQ6IGZ1bmN0aW9uIGdyb3VwQ2xpY2tlZChwYXJhbXMpIHtcclxuICAgICAgICB0aGlzLl9zdGFydEdyb3VwTW9kZSgpO1xyXG4gICAgICAgIGNvbnN0IGdyb3VwSWQgPSBwYXJhbXMuJGtleTtcclxuXHJcbiAgICAgICAgJChwYXJhbXMuJHNvdXJjZS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpLmZpbmQoJ2EnKS5lYWNoKChpLCBhKSA9PiB7XHJcbiAgICAgICAgICAkKGEpLmF0dHIoJ2RhdGEtZW5hYmxlZCcsICgoJChhKS5hdHRyKCdkYXRhLSRrZXknKSA9PT0gZ3JvdXBJZCkpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBncm91cCA9IHRoaXMuZ3JvdXBMaXN0LmZpbHRlcigoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGl0ZW0uJGtleSA9PT0gZ3JvdXBJZDtcclxuICAgICAgICB9KVswXTtcclxuXHJcbiAgICAgICAgaWYgKCFncm91cCkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBhIGdyb3VwLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldEN1cnJlbnRHcm91cChncm91cCk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgQXBwLnZpZXdTZXR0aW5nc01vZGFsLmNsb3NlKCk7XHJcbiAgICAgIH0uYmluZCh0aGlzKSxcclxuICAgICAgbGF5b3V0U2VsZWN0ZWRDbGlja2VkOiBmdW5jdGlvbiBsYXlvdXRTZWxlY3RlZENsaWNrZWQocGFyYW1zKSB7XHJcbiAgICAgICAgY29uc3QgbmFtZSA9IHBhcmFtcy5uYW1lO1xyXG4gICAgICAgICQocGFyYW1zLiRzb3VyY2UucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KS5maW5kKCdhJykuZWFjaCgoaSwgYSkgPT4ge1xyXG4gICAgICAgICAgJChhKS5hdHRyKCdkYXRhLWVuYWJsZWQnLCAoKCQoYSkuYXR0cignZGF0YS1uYW1lJykgPT09IG5hbWUpKS50b1N0cmluZygpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgR3JvdXBVdGlsaXR5LnNldFNlbGVjdGVkR3JvdXBMYXlvdXRUZW1wbGF0ZSh0aGlzLmVudGl0eU5hbWUsIG5hbWUpO1xyXG4gICAgICAgIHRoaXMuX2dyb3VwSW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICBBcHAudmlld1NldHRpbmdzTW9kYWwuY2xvc2UoKTtcclxuICAgICAgfS5iaW5kKHRoaXMpLFxyXG5cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIGFjdGlvbnM7XHJcbiAgfSxcclxuICBfc2VsZWN0R3JvdXBzOiBmdW5jdGlvbiBfc2VsZWN0R3JvdXBzKCkge1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KHRoaXMuZ3JvdXBMb29rdXBJZCk7XHJcbiAgICB2aWV3LmZhbWlseSA9IHRoaXMuZW50aXR5TmFtZTtcclxuICAgIHZpZXcuc2V0KCdzdG9yZScsIG51bGwpO1xyXG4gICAgdmlldy5jbGVhcigpO1xyXG4gICAgdmlldy5yZWZyZXNoUmVxdWlyZWQgPSB0cnVlO1xyXG5cclxuICAgIGNvbnN0IGZpZWxkID0gbmV3IExvb2t1cEZpZWxkKHtcclxuICAgICAgb3duZXI6IHRoaXMsXHJcbiAgICAgIHZpZXcsXHJcbiAgICAgIHNpbmdsZVNlbGVjdDogZmFsc2UsXHJcbiAgICAgIHByZXZpb3VzU2VsZWN0aW9uczogdGhpcy5ncm91cExpc3QgJiYgdGhpcy5ncm91cExpc3QubWFwKChncm91cCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBncm91cC4ka2V5O1xyXG4gICAgICB9KSxcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZSA9IGFzcGVjdC5hZnRlcihmaWVsZCwgJ2NvbXBsZXRlJywgZnVuY3Rpb24gYWZ0ZXJDb21wbGV0ZSgpIHtcclxuICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLm93bmVyO1xyXG4gICAgICBjb25zdCBpdGVtcyA9IFtdO1xyXG5cclxuICAgICAgLy8gV2Ugd2lsbCBnZXQgYW4gb2JqZWN0IGJhY2sgd2hlcmUgdGhlIHByb3BlcnR5IG5hbWVzIGFyZSB0aGUga2V5cyAoZ3JvdXBJZCdzKVxyXG4gICAgICAvLyBFeHRyYWN0IHRoZW0gb3V0LCBhbmQgc2F2ZSB0aGUgZW50cnksIHdoaWNoIGlzIHRoZSBkYXRhIHByb3BlcnR5IG9uIHRoZSBleHRyYWN0ZWQgb2JqZWN0XHJcbiAgICAgIGZvciAoY29uc3QgZ3JvdXBJZCBpbiBzZWxmLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICAgIGlmIChzZWxmLmN1cnJlbnRWYWx1ZS5oYXNPd25Qcm9wZXJ0eShncm91cElkKSkge1xyXG4gICAgICAgICAgY29uc3QgZW50cnkgPSBzZWxmLmN1cnJlbnRWYWx1ZVtncm91cElkXS5kYXRhO1xyXG4gICAgICAgICAgaWYgKGVudHJ5KSB7XHJcbiAgICAgICAgICAgIGl0ZW1zLnB1c2goZW50cnkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgaGFzRGVmYXVsdEdyb3VwID0gbGlzdC5oYXNEZWZhdWx0R3JvdXA7XHJcbiAgICAgIEdyb3VwVXRpbGl0eS5hZGRUb0dyb3VwUHJlZmVyZW5jZXMoaXRlbXMsIGxpc3QuZW50aXR5TmFtZSwgdHJ1ZSk7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRHcm91cCA9IEdyb3VwVXRpbGl0eS5nZXREZWZhdWx0R3JvdXAobGlzdC5lbnRpdHlOYW1lKTtcclxuICAgICAgaWYgKGN1cnJlbnRHcm91cCkge1xyXG4gICAgICAgIGxpc3Quc2V0Q3VycmVudEdyb3VwKGN1cnJlbnRHcm91cCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGhhbmRsZS5yZW1vdmUoKTtcclxuICAgICAgc2VsZi5kZXN0cm95KCk7XHJcblxyXG4gICAgICBpZiAoaGFzRGVmYXVsdEdyb3VwKSB7XHJcbiAgICAgICAgLy8gV2Ugd2lsbCB0cmFuc2l0aW9uIGJhY2sgdG8gdGhlIGxpc3QsIHBvcCBiYWNrIG9wZW4gdGhlIHJpZ2h0IGRyYXdlciBzbyB0aGUgdXNlciBpcyBiYWNrIHdoZXJlIHRoZXkgc3RhcnRlZFxyXG4gICAgICAgIGNvbnN0IHByb2Nlc3NEYXRhSGFuZGxlID0gYXNwZWN0LmFmdGVyKGxpc3QsICdwcm9jZXNzRGF0YScsIGZ1bmN0aW9uIHBvc3RQcm9jZXNzRGF0YSgpIHtcclxuICAgICAgICAgIEFwcC52aWV3U2V0dGluZ3NNb2RhbC5jbG9zZSgpO1xyXG4gICAgICAgICAgcHJvY2Vzc0RhdGFIYW5kbGUucmVtb3ZlKCk7XHJcbiAgICAgICAgICBpZiAodGhpcy50cmFuc2l0aW9uSGFuZGxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvbkhhbmRsZS5yZW1vdmUoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQobGlzdCkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIFNpbmNlIHRoZXJlIHdhcyBubyBwcmV2aW91cyBkZWZhdWx0IGdyb3VwLCBqdXN0IHJlZnJlc2ggdGhlIGxpc3QgKG5vIG5lZWQgdG8gdG9nZ2xlIHRoZSByaWdodCBkcmF3ZXIpXHJcbiAgICAgICAgdGhpcy50cmFuc2l0aW9uSGFuZGxlID0gYXNwZWN0LmFmdGVyKGxpc3QsICdvblRyYW5zaXRpb25UbycsIGZ1bmN0aW9uIHBvc3RPblRyYW5zaXRpb25UbygpIHtcclxuICAgICAgICAgIHRoaXMucmVmcmVzaFJlcXVpcmVkID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMuaXNSZWZyZXNoaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICAgIGlmIChzZWxmLnRyYW5zaXRpb25IYW5kbGUpIHtcclxuICAgICAgICAgICAgc2VsZi50cmFuc2l0aW9uSGFuZGxlLnJlbW92ZSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZChsaXN0KSk7XHJcbiAgICAgIH1cclxuICAgIH0uYmluZChmaWVsZCkpO1xyXG5cclxuICAgIGZpZWxkLm5hdmlnYXRlVG9MaXN0VmlldygpO1xyXG4gIH0sXHJcbiAgZ2V0R3JvdXBGb3JSaWdodERyYXdlckVudHJ5OiBmdW5jdGlvbiBnZXRHcm91cEZvclJpZ2h0RHJhd2VyRW50cnkoZW50cnkpIHtcclxuICAgIGlmIChlbnRyeS5kYXRhUHJvcHMgJiYgZW50cnkuZGF0YVByb3BzLmhhc2h0YWcgJiYgdGhpcy5faGFzSGFzaFRhZ3MoKSAmJiBBcHAuZW5hYmxlSGFzaFRhZ3MpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB0YWc6ICd2aWV3JyxcclxuICAgICAgICB0aXRsZTogcmVzb3VyY2UuaGFzaFRhZ3NTZWN0aW9uVGV4dCxcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoKGVudHJ5LmFjdGlvbiA9PT0gJ2dyb3VwQ2xpY2tlZCcgfHwgZW50cnkuYWN0aW9uID09PSAnZ3JvdXBDb25maWd1cmVDbGlja2VkJykgJiYgdGhpcy5ncm91cHNFbmFibGVkKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdGFnOiAnZ3JvdXAnLFxyXG4gICAgICAgIHRpdGxlOiByZXNvdXJjZS5ncm91cHNTZWN0aW9uVGV4dCxcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIGlmICgoZW50cnkuYWN0aW9uID09PSAnbGF5b3V0U2VsZWN0ZWRDbGlja2VkJykgJiYgdGhpcy5ncm91cHNFbmFibGVkKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdGFnOiAnbGF5b3V0VGVtcGxhdGVzJyxcclxuICAgICAgICB0aXRsZTogcmVzb3VyY2UubGF5b3V0c1RleHQsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0YWc6ICdrcGknLFxyXG4gICAgICB0aXRsZTogcmVzb3VyY2Uua3BpU2VjdGlvblRleHQsXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgY3JlYXRlUmlnaHREcmF3ZXJMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZVJpZ2h0RHJhd2VyTGF5b3V0KCkge1xyXG4gICAgY29uc3QgbGF5b3V0ID0gW107XHJcblxyXG4gICAgaWYgKHRoaXMuZ3JvdXBzRW5hYmxlZCkge1xyXG4gICAgICBjb25zdCBncm91cHNTZWN0aW9uID0ge1xyXG4gICAgICAgIGlkOiAnYWN0aW9ucycsXHJcbiAgICAgICAgY2hpbGRyZW46IFtdLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgZ3JvdXBzU2VjdGlvbi5jaGlsZHJlbi5wdXNoKHtcclxuICAgICAgICBuYW1lOiAnY29uZmlndXJlR3JvdXBzJyxcclxuICAgICAgICBhY3Rpb246ICdncm91cENvbmZpZ3VyZUNsaWNrZWQnLFxyXG4gICAgICAgIHRpdGxlOiByZXNvdXJjZS5jb25maWd1cmVHcm91cHNUZXh0LFxyXG4gICAgICAgIGNsczogJ2dyb3VwLWNvbmZpZ3VyYXRpb24nLFxyXG4gICAgICAgIGljb25DbHM6ICdmYSBmYS1jb2cgZmEtZncgJyxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjb25zdCBkZWZhdWx0R3JvdXAgPSBHcm91cFV0aWxpdHkuZ2V0RGVmYXVsdEdyb3VwKHRoaXMuZW50aXR5TmFtZSk7XHJcbiAgICAgIGlmICh0aGlzLmdyb3VwTGlzdCAmJiB0aGlzLmdyb3VwTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdGhpcy5ncm91cExpc3QuZm9yRWFjaCgoZ3JvdXApID0+IHtcclxuICAgICAgICAgIGdyb3Vwc1NlY3Rpb24uY2hpbGRyZW4ucHVzaCh7XHJcbiAgICAgICAgICAgIG5hbWU6IGdyb3VwLm5hbWUsXHJcbiAgICAgICAgICAgIGFjdGlvbjogJ2dyb3VwQ2xpY2tlZCcsXHJcbiAgICAgICAgICAgIHRpdGxlOiBncm91cC5kaXNwbGF5TmFtZSxcclxuICAgICAgICAgICAgZGF0YVByb3BzOiB7XHJcbiAgICAgICAgICAgICAgJGtleTogZ3JvdXAuJGtleSxcclxuICAgICAgICAgICAgICB0aXRsZTogZ3JvdXAuZGlzcGxheU5hbWUsXHJcbiAgICAgICAgICAgICAgZW5hYmxlZDogZGVmYXVsdEdyb3VwLiRrZXkgPT09IGdyb3VwLiRrZXksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBsYXlvdXRTZWN0aW9uID0ge1xyXG4gICAgICAgIGlkOiAnYWN0aW9ucycsXHJcbiAgICAgICAgY2hpbGRyZW46IFtdLFxyXG4gICAgICB9O1xyXG4gICAgICBpZiAodGhpcy5ncm91cFRlbXBsYXRlTGF5b3V0cyAmJiB0aGlzLmdyb3VwVGVtcGxhdGVMYXlvdXRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBsZXQgbGF5b3V0U2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmdyb3VwVGVtcGxhdGVMYXlvdXRzLmZvckVhY2goKHRoZUxheW91dCkgPT4ge1xyXG4gICAgICAgICAgaWYgKCFsYXlvdXRTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICBsYXlvdXRTZWxlY3RlZCA9IHRoZUxheW91dC5uYW1lID09PSBBcHAucHJlZmVyZW5jZXNbYGdyb3Vwcy1zZWxlY3RlZC10ZW1wbGF0ZS1uYW1lJHt0aGlzLmVudGl0eU5hbWV9YF07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBsYXlvdXRTZWN0aW9uLmNoaWxkcmVuLnB1c2goe1xyXG4gICAgICAgICAgICBuYW1lOiB0aGVMYXlvdXQubmFtZSxcclxuICAgICAgICAgICAgYWN0aW9uOiAnbGF5b3V0U2VsZWN0ZWRDbGlja2VkJyxcclxuICAgICAgICAgICAgdGl0bGU6IHRoZUxheW91dC5kaXNwbGF5TmFtZSxcclxuICAgICAgICAgICAgZGF0YVByb3BzOiB7XHJcbiAgICAgICAgICAgICAgbmFtZTogdGhlTGF5b3V0Lm5hbWUsXHJcbiAgICAgICAgICAgICAgdGl0bGU6IHRoZUxheW91dC5kaXNwbGF5TmFtZSxcclxuICAgICAgICAgICAgICBlbmFibGVkOiB0aGVMYXlvdXQubmFtZSA9PT0gQXBwLnByZWZlcmVuY2VzW2Bncm91cHMtc2VsZWN0ZWQtdGVtcGxhdGUtbmFtZSR7dGhpcy5lbnRpdHlOYW1lfWBdLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFsYXlvdXRTZWxlY3RlZCAmJiBsYXlvdXRTZWN0aW9uLmNoaWxkcmVuLmxlbmd0aCkge1xyXG4gICAgICAgICAgbGF5b3V0U2VjdGlvbi5jaGlsZHJlblswXS5kYXRhUHJvcHMuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5lbnRpdHlOYW1lKSB7XHJcbiAgICAgICAgbGF5b3V0LnB1c2goZ3JvdXBzU2VjdGlvbik7XHJcbiAgICAgICAgbGF5b3V0LnB1c2gobGF5b3V0U2VjdGlvbik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoQXBwLmVuYWJsZUhhc2hUYWdzKSB7XHJcbiAgICAgIGNvbnN0IGhhc2hUYWdzU2VjdGlvbiA9IHtcclxuICAgICAgICBpZDogJ2FjdGlvbnMnLFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmICh0aGlzLl9oYXNIYXNoVGFncygpKSB7XHJcbiAgICAgICAgY29uc3QgbGVuID0gdGhpcy5zZWFyY2hXaWRnZXQuaGFzaFRhZ1F1ZXJpZXMubGVuZ3RoO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgIGNvbnN0IGhhc2hUYWcgPSB0aGlzLnNlYXJjaFdpZGdldC5oYXNoVGFnUXVlcmllc1tpXTtcclxuICAgICAgICAgIGhhc2hUYWdzU2VjdGlvbi5jaGlsZHJlbi5wdXNoKHtcclxuICAgICAgICAgICAgbmFtZTogaGFzaFRhZy5rZXksXHJcbiAgICAgICAgICAgIGFjdGlvbjogJ2hhc2hUYWdDbGlja2VkJyxcclxuICAgICAgICAgICAgdGl0bGU6IGhhc2hUYWcudGFnLFxyXG4gICAgICAgICAgICBkYXRhUHJvcHM6IHtcclxuICAgICAgICAgICAgICBoYXNodGFnOiBoYXNoVGFnLnRhZyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgbGF5b3V0LnB1c2goaGFzaFRhZ3NTZWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5jcmVhdGVNZXRyaWNXaWRnZXRzTGF5b3V0KSB7XHJcbiAgICAgIGNvbnN0IG1ldHJpY3MgPSBBcHAuZ2V0TWV0cmljc0J5UmVzb3VyY2VLaW5kKHRoaXMucmVzb3VyY2VLaW5kKTtcclxuXHJcbiAgICAgIGNvbnN0IGtwaVNlY3Rpb24gPSB7XHJcbiAgICAgICAgaWQ6ICdrcGknLFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmIChtZXRyaWNzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBtZXRyaWNzLmZvckVhY2goKG1ldHJpYywgaSkgPT4ge1xyXG4gICAgICAgICAgaWYgKG1ldHJpYy50aXRsZSkge1xyXG4gICAgICAgICAgICBrcGlTZWN0aW9uLmNoaWxkcmVuLnB1c2goe1xyXG4gICAgICAgICAgICAgIG5hbWU6IGBLUEkke2l9YCxcclxuICAgICAgICAgICAgICBhY3Rpb246ICdrcGlDbGlja2VkJyxcclxuICAgICAgICAgICAgICB0aXRsZTogbWV0cmljLnRpdGxlLFxyXG4gICAgICAgICAgICAgIGRhdGFQcm9wczoge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGVzY2FwZShtZXRyaWMudGl0bGUpLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogISFtZXRyaWMuZW5hYmxlZCxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGF5b3V0LnB1c2goa3BpU2VjdGlvbik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbGF5b3V0O1xyXG4gIH0sXHJcbiAgX2hhc0hhc2hUYWdzOiBmdW5jdGlvbiBfaGFzSGFzaFRhZ3MoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWFyY2hXaWRnZXQgJiYgdGhpcy5zZWFyY2hXaWRnZXQuaGFzaFRhZ1F1ZXJpZXMgJiYgdGhpcy5zZWFyY2hXaWRnZXQuaGFzaFRhZ1F1ZXJpZXMubGVuZ3RoID4gMDtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==