/*
 * Copyright (c) 1997-2014, SalesLogix, NA., LLC. All rights reserved.
 */
/**
 * @class crm.Views._RightDrawerListMixin
 *
 * List mixin for right drawers.
 *
 * @since 3.0
 * @mixins crm.Views._RightDrawerBaseMixin
 *
 */
define('crm/Views/_RightDrawerListMixin', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/json',
    'dojo/dom-construct',
    'dojo/dom-attr',
    'dojo/dom-style',
    'dojo/aspect',
    '../GroupUtility',
    './_RightDrawerBaseMixin',
    'argos/Fields/LookupField'
], function (declare, array, lang, json, domConstruct, domAttr, domStyle, aspect, GroupUtility, _RightDrawerBaseMixin, LookupField) {
    var mixinName, __class;
    mixinName = 'crm.Views._RightDrawerListMixin';
    __class = declare('crm.Views._RightDrawerListMixin', [_RightDrawerBaseMixin], {
        //Localization
        hashTagsSectionText: 'Hash Tags',
        groupsSectionText: 'Groups',
        kpiSectionText: 'KPI',
        configureGroupsText: 'Configure',
        refreshGroupsText: 'Refresh',
        layoutsText: 'Layouts',
        _hasChangedKPIPrefs: false,
        groupList: null,
        DRAWER_PAGESIZE: 100,
        groupLookupId: 'groups_configure',
        setupRightDrawer: function () {
            var drawer = App.getView('right_drawer');
            if (drawer) {
                drawer.pageSize = this.DRAWER_PAGESIZE;
                this.groupList = GroupUtility.getGroupPreferences(this.entityName);
                this._finishSetup(drawer);
            }
        },
        refreshRightDrawer: function () {
            var drawer = App.getView('right_drawer');
            if (drawer) {
                drawer.clear();
                drawer.layout = null;
                drawer.setLayout(this.createRightDrawerLayout());
                drawer.refresh();
            }
        },
        _finishSetup: function (drawer) {
            lang.mixin(drawer, this._createActions());
            drawer.setLayout(this.createRightDrawerLayout());
            drawer.getGroupForEntry = function (entry) {
                return this.getGroupForRightDrawerEntry(entry);
            }.bind(this);
            if (this.rebuildWidgets) {
                App.snapper.on('close', function () {
                    if (this._hasChangedKPIPrefs) {
                        this.destroyWidgets();
                        this.rebuildWidgets();
                        this._hasChangedKPIPrefs = false;
                    }
                }.bind(this));
            }
        },
        unloadRightDrawer: function () {
            var drawer = App.getView('right_drawer');
            if (drawer) {
                drawer.setLayout([]);
                drawer.getGroupForEntry = function () { };
                App.snapper.off('close');
            }
        },
        _onSearchExpression: function () {
            // TODO: Don't extend this private function - connect to the search widget onSearchExpression instead
            if (this.groupsMode) {
                this._clearGroupMode();
            }
            this.inherited(arguments);
        },
        _createActions: function () {
            // These actions will get mixed into the right drawer view.
            var actions = {
                hashTagClicked: function (params) {
                    if (this.groupsMode) {
                        this._clearGroupMode();
                    }
                    if (params.hashtag) {
                        this.setSearchTerm('#' + params.hashtag);
                        this.search();
                        this.toggleRightDrawer();
                    }
                }.bind(this),
                kpiClicked: function (params) {
                    var results, enabled, metrics;
                    metrics = App.getMetricsByResourceKind(this.resourceKind);
                    if (metrics.length > 0) {
                        results = array.filter(metrics, function (metric) {
                            return metric.title === params.title;
                        });
                    }
                    if (results.length > 0) {
                        enabled = !!results[0].enabled;
                        results[0].enabled = !enabled;
                        App.persistPreferences();
                        this._hasChangedKPIPrefs = true;
                        domAttr.set(params.$source, 'data-enabled', (!enabled).toString());
                    }
                }.bind(this),
                groupConfigureClicked: function () {
                    this._selectGroups();
                    this.toggleRightDrawer();
                }.bind(this),
                groupClicked: function (params) {
                    var group, groupId;
                    this._startGroupMode();
                    groupId = params.$key;
                    group = array.filter(this.groupList, function (item) {
                        return item.$key === groupId;
                    })[0];
                    if (!group) {
                        throw new Error('Expected a group.');
                    }
                    this.setCurrentGroup(group);
                    this.refresh();
                    this.toggleRightDrawer();
                }.bind(this),
                layoutSelectedClicked: function (params) {
                    var name = params.name;
                    GroupUtility.setSelectedGroupLayoutTemplate(this.entityName, name);
                    this._groupInitalized = false;
                    this.refresh();
                    this.toggleRightDrawer();
                }.bind(this)
            };
            return actions;
        },
        _selectGroups: function () {
            var field, handle, view;
            view = App.getView(this.groupLookupId);
            view.family = this.entityName;
            view.set('store', null);
            view.clear();
            view.refreshRequired = true;
            field = new LookupField({
                owner: this,
                view: view,
                singleSelect: false,
                previousSelections: array.map(this.groupList, function (group) {
                    return group.$key;
                })
            });
            handle = aspect.after(field, 'complete', function () {
                var self = this, list = this.owner, groupId, entry, currentGroup, items = [], transitionHandle, hasDefaultGroup;
                // We will get an object back where the property names are the keys (groupId's)
                // Extract them out, and save the entry, which is the data property on the extracted object
                for (groupId in self.currentValue) {
                    if (self.currentValue.hasOwnProperty(groupId)) {
                        entry = self.currentValue[groupId].data;
                        if (entry) {
                            items.push(entry);
                        }
                    }
                }
                hasDefaultGroup = list.hasDefaultGroup;
                GroupUtility.addToGroupPreferences(items, list.entityName, true);
                currentGroup = GroupUtility.getDefaultGroup(list.entityName);
                if (currentGroup) {
                    list.setCurrentGroup(currentGroup);
                }
                handle.remove();
                self.destroy();
                if (hasDefaultGroup) {
                    // We will transition back to the list, pop back open the right drawer so the user is back where they started
                    transitionHandle = aspect.after(list, 'processData', function () {
                        this.toggleRightDrawer();
                        transitionHandle.remove();
                    }.bind(list));
                }
                else {
                    // Since there was no previous default group, just refresh the list (no need to toggle the right drawer)
                    transitionHandle = aspect.after(list, 'onTransitionTo', function () {
                        this.refreshRequired = true;
                        this.clear();
                        this.refresh();
                        transitionHandle.remove();
                    }.bind(list));
                }
            }.bind(field));
            field.navigateToListView();
        },
        getGroupForRightDrawerEntry: function (entry) {
            var mixin = lang.getObject(mixinName);
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
            if ((entry.action === 'layoutSelectedClicked') && this.groupsEnabled) {
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
        createRightDrawerLayout: function () {
            var groupsSection, layoutSection, hashTagsSection, hashTag, kpiSection, layout, metrics, i, len, mixin = lang.getObject(mixinName);
            layout = [];
            if (this.groupsEnabled) {
                groupsSection = {
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
                if (this.groupList && this.groupList.length > 0) {
                    array.forEach(this.groupList, function (group) {
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
                layoutSection = {
                    id: 'actions',
                    children: []
                };
                if (this.groupTemplateLayouts && this.groupTemplateLayouts.length > 0) {
                    array.forEach(this.groupTemplateLayouts, function (layout) {
                        layoutSection.children.push({
                            'name': layout.name,
                            'action': 'layoutSelectedClicked',
                            'title': layout.displayName,
                            'dataProps': {
                                'name': layout.name,
                                'title': layout.displayName
                            }
                        });
                    });
                }
                if (this.entityName) {
                    layout.push(groupsSection);
                    layout.push(layoutSection);
                }
            }
            if (App.enableHashTags) {
                hashTagsSection = {
                    id: 'actions',
                    children: []
                };
                if (this._hasHashTags()) {
                    len = this.searchWidget.hashTagQueries.length;
                    for (i = 0; i < len; i++) {
                        hashTag = this.searchWidget.hashTagQueries[i];
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
            metrics = App.getMetricsByResourceKind(this.resourceKind);
            kpiSection = {
                id: 'kpi',
                children: []
            };
            if (metrics.length > 0) {
                array.forEach(metrics, function (metric, i) {
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
        _hasHashTags: function () {
            return this.searchWidget && this.searchWidget.hashTagQueries && this.searchWidget.hashTagQueries.length > 0;
        }
    });
    lang.setObject('Mobile.SalesLogix.Views._RightDrawerListMixin', __class);
    return __class;
});
