define('crm/Views/_RightDrawerListMixin', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/array', 'dojo/_base/lang', 'dojo/dom-attr', 'dojo/aspect', '../GroupUtility', './_RightDrawerBaseMixin', 'argos/Fields/LookupField'], function (exports, module, _dojo_baseDeclare, _dojo_baseArray, _dojo_baseLang, _dojoDomAttr, _dojoAspect, _GroupUtility, _RightDrawerBaseMixin2, _argosFieldsLookupField) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _array = _interopRequireDefault(_dojo_baseArray);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _domAttr = _interopRequireDefault(_dojoDomAttr);

  var _aspect = _interopRequireDefault(_dojoAspect);

  var _GroupUtility2 = _interopRequireDefault(_GroupUtility);

  var _RightDrawerBaseMixin3 = _interopRequireDefault(_RightDrawerBaseMixin2);

  var _LookupField = _interopRequireDefault(_argosFieldsLookupField);

  var mixinName = 'crm.Views._RightDrawerListMixin';

  /**
   * @class crm.Views._RightDrawerListMixin
   *
   * List mixin for right drawers.
   *
   * @since 3.0
   * @mixins crm.Views._RightDrawerBaseMixin
   *
   */
  var __class = (0, _declare['default'])('crm.Views._RightDrawerListMixin', [_RightDrawerBaseMixin3['default']], {
    // Localization
    hashTagsSectionText: 'Hash Tags',
    groupsSectionText: 'Groups',
    kpiSectionText: 'KPI',
    configureGroupsText: 'Configure',
    refreshGroupsText: 'Refresh',
    layoutsText: 'Layouts',

    _hasChangedKPIPrefs: false, // Dirty flag so we know when to reload the widgets
    groupList: null,
    DRAWER_PAGESIZE: 100,
    groupLookupId: 'groups_configure',

    setupRightDrawer: function setupRightDrawer() {
      var drawer = App.getView('right_drawer');
      if (drawer) {
        drawer.pageSize = this.DRAWER_PAGESIZE;
        this.groupList = _GroupUtility2['default'].getGroupPreferences(this.entityName);
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
      _lang['default'].mixin(drawer, this._createActions());
      drawer.setLayout(this.createRightDrawerLayout());
      drawer.getGroupForEntry = (function getGroupForEntry(entry) {
        return this.getGroupForRightDrawerEntry(entry);
      }).bind(this);

      if (this.rebuildWidgets) {
        App.snapper.on('close', (function onCloseofSnapper() {
          if (this._hasChangedKPIPrefs) {
            this.destroyWidgets();
            this.rebuildWidgets();
            this._hasChangedKPIPrefs = false;
          }
        }).bind(this));
      }
    },
    unloadRightDrawer: function unloadRightDrawer() {
      var drawer = App.getView('right_drawer');
      if (drawer) {
        drawer.setLayout([]);
        drawer.getGroupForEntry = function getGroupForEntry() {};
        App.snapper.off('close');
      }
    },
    _onSearchExpression: function _onSearchExpression() {
      // TODO: Don't extend this private function - connect to the search widget onSearchExpression instead
      if (this.groupsMode) {
        this._clearGroupMode();
      }

      this.inherited(arguments);
    },
    _createActions: function _createActions() {
      // These actions will get mixed into the right drawer view.
      var actions = {
        hashTagClicked: (function hashTagClicked(params) {
          if (this.groupsMode) {
            this._clearGroupMode();
          }

          if (params.hashtag) {
            this.setSearchTerm('#' + params.hashtag);
            this.search();
            this.toggleRightDrawer();
          }
        }).bind(this),
        kpiClicked: (function kpiClicked(params) {
          var metrics = App.getMetricsByResourceKind(this.resourceKind);
          var results = undefined;

          if (metrics.length > 0) {
            results = _array['default'].filter(metrics, function setMetricTitle(metric) {
              return metric.title === params.title;
            });
          }

          if (results.length > 0) {
            var enabled = !!results[0].enabled;
            results[0].enabled = !enabled;
            App.persistPreferences();
            this._hasChangedKPIPrefs = true;

            _domAttr['default'].set(params.$source, 'data-enabled', (!enabled).toString());
          }
        }).bind(this),
        groupConfigureClicked: (function groupConfigureClicked() {
          this._selectGroups();
          this.toggleRightDrawer();
        }).bind(this),
        groupClicked: (function groupClicked(params) {
          this._startGroupMode();
          var groupId = params.$key;

          var group = _array['default'].filter(this.groupList, function setItemKey(item) {
            return item.$key === groupId;
          })[0];

          if (!group) {
            throw new Error('Expected a group.');
          }
          this.setCurrentGroup(group);
          this.refresh();
          this.toggleRightDrawer();
        }).bind(this),
        layoutSelectedClicked: (function layoutSelectedClicked(params) {
          var name = params.name;
          _GroupUtility2['default'].setSelectedGroupLayoutTemplate(this.entityName, name);
          this._groupInitalized = false;
          this.refresh();
          this.toggleRightDrawer();
        }).bind(this)

      };

      return actions;
    },
    _selectGroups: function _selectGroups() {
      var view = App.getView(this.groupLookupId);
      view.family = this.entityName;
      view.set('store', null);
      view.clear();
      view.refreshRequired = true;

      var field = new _LookupField['default']({
        owner: this,
        view: view,
        singleSelect: false,
        previousSelections: _array['default'].map(this.groupList, function getGroupKey(group) {
          return group.$key;
        })
      });

      var handle = _aspect['default'].after(field, 'complete', (function afterComplete() {
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
        _GroupUtility2['default'].addToGroupPreferences(items, list.entityName, true);
        var currentGroup = _GroupUtility2['default'].getDefaultGroup(list.entityName);
        if (currentGroup) {
          list.setCurrentGroup(currentGroup);
        }

        handle.remove();
        self.destroy();

        if (hasDefaultGroup) {
          // We will transition back to the list, pop back open the right drawer so the user is back where they started
          _aspect['default'].after(list, 'processData', (function postProcessData() {
            this.toggleRightDrawer();
            this.transitionHandle.remove();
          }).bind(list));
        } else {
          // Since there was no previous default group, just refresh the list (no need to toggle the right drawer)
          _aspect['default'].after(list, 'onTransitionTo', (function postOnTransitionTo() {
            this.refreshRequired = true;
            this.clear();
            this.refresh();
            this.transitionHandle.remove();
          }).bind(list));
        }
      }).bind(field));

      field.navigateToListView();
    },
    getGroupForRightDrawerEntry: function getGroupForRightDrawerEntry(entry) {
      var mixin = _lang['default'].getObject(mixinName);
      if (entry.dataProps && entry.dataProps.hashtag && this._hasHashTags() && App.enableHashTags) {
        return {
          tag: 'view',
          title: mixin.prototype.hashTagsSectionText
        };
      }

      if ((entry.action === 'groupClicked' || entry.action === 'groupConfigureClicked') && this.groupsEnabled) {
        return {
          tag: 'group',
          title: mixin.prototype.groupsSectionText
        };
      }
      if (entry.action === 'layoutSelectedClicked' && this.groupsEnabled) {
        return {
          tag: 'layoutTemplates',
          title: mixin.prototype.layoutsText
        };
      }
      return {
        tag: 'kpi',
        title: mixin.prototype.kpiSectionText
      };
    },
    createRightDrawerLayout: function createRightDrawerLayout() {
      var _this = this;

      var mixin = _lang['default'].getObject(mixinName);
      var layout = [];

      if (this.groupsEnabled) {
        (function () {
          var groupsSection = {
            id: 'actions',
            children: []
          };

          groupsSection.children.push({
            'name': 'configureGroups',
            'action': 'groupConfigureClicked',
            'title': mixin.prototype.configureGroupsText,
            'cls': 'group-configuration',
            'iconCls': 'fa fa-cog fa-fw '
          });

          if (_this.groupList && _this.groupList.length > 0) {
            _array['default'].forEach(_this.groupList, function setGroupSection(group) {
              groupsSection.children.push({
                'name': group.name,
                'action': 'groupClicked',
                'title': group.displayName,
                'dataProps': {
                  $key: group.$key,
                  'title': group.displayName
                }
              });
            });
          }
          var layoutSection = {
            id: 'actions',
            children: []
          };
          if (_this.groupTemplateLayouts && _this.groupTemplateLayouts.length > 0) {
            _array['default'].forEach(_this.groupTemplateLayouts, function setGroupLayout(theLayout) {
              layoutSection.children.push({
                'name': theLayout.name,
                'action': 'layoutSelectedClicked',
                'title': theLayout.displayName,
                'dataProps': {
                  'name': theLayout.name,
                  'title': theLayout.displayName
                }
              });
            });
          }

          if (_this.entityName) {
            layout.push(groupsSection);
            layout.push(layoutSection);
          }
        })();
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
              'name': hashTag.key,
              'action': 'hashTagClicked',
              'title': hashTag.tag,
              'dataProps': {
                'hashtag': hashTag.tag
              }
            });
          }
        }

        layout.push(hashTagsSection);
      }

      var metrics = App.getMetricsByResourceKind(this.resourceKind);

      var kpiSection = {
        id: 'kpi',
        children: []
      };

      if (metrics.length > 0) {
        _array['default'].forEach(metrics, function setMetric(metric, i) {
          if (metric.title) {
            kpiSection.children.push({
              'name': 'KPI' + i,
              'action': 'kpiClicked',
              'title': metric.title,
              'dataProps': {
                'title': metric.title,
                'enabled': !!metric.enabled
              }
            });
          }
        });

        layout.push(kpiSection);
      }

      return layout;
    },
    _hasHashTags: function _hasHashTags() {
      return this.searchWidget && this.searchWidget.hashTagQueries && this.searchWidget.hashTagQueries.length > 0;
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views._RightDrawerListMixin', __class);
  module.exports = __class;
});
