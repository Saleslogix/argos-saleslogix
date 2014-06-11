/*
 * Copyright (c) 1997-2014, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.Views._RightDrawerListMixin
 *
 * List mixin for right drawers.
 *
 * @since 3.0
 * @mixins Mobile.SalesLogix.Views._RightDrawerBaseMixin
 *
 */
define('Mobile/SalesLogix/Views/_RightDrawerListMixin', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/json',
    'dojo/dom-construct',
    'dojo/dom-attr',
    'dojo/dom-style',
    'dojo/aspect',
    'Mobile/SalesLogix/GroupUtility',
    'Mobile/SalesLogix/Views/_RightDrawerBaseMixin',
    'Sage/Platform/Mobile/Fields/LookupField'
], function(
    declare,
    array,
    lang,
    json,
    domConstruct,
    domAttr,
    domStyle,
    aspect,
    GroupUtility,
    _RightDrawerBaseMixin,
    LookupField
) {

    var mixinName = 'Mobile.SalesLogix.Views._RightDrawerListMixin';

    return declare(mixinName, [_RightDrawerBaseMixin], {
        //Localization
        hashTagsSectionText: 'Hash Tags',
        groupsSectionText: 'Groups',
        kpiSectionText: 'KPI',
        configureGroupsText: 'Configure',

        _hasChangedKPIPrefs: false,// Dirty flag so we know when to reload the widgets
        groupList: null,
        DRAWER_PAGESIZE: 100,
        groupLookupId: 'groups_configure',
        groupsMode: false,
        currentGroupId: null,

        setupRightDrawer: function() {
            var drawer = App.getView('right_drawer');
            if (drawer) {
                drawer.pageSize = this.DRAWER_PAGESIZE;
                this.groupList = App.preferences[this.entityName];
                this._finishSetup(drawer);
            }
        },
        _finishSetup: function(drawer) {
            lang.mixin(drawer, this._createActions());
            drawer.setLayout(this.createRightDrawerLayout());
            drawer.getGroupForEntry = lang.hitch(this, function(entry) {
                return this.getGroupForRightDrawerEntry(entry);
            });

            if (this.rebuildWidgets) {
                App.snapper.on('close', lang.hitch(this, function() {
                    if (this._hasChangedKPIPrefs) {
                        this.destroyWidgets();
                        this.rebuildWidgets();
                        this._hasChangedKPIPrefs = false;
                    }
                }));
            }
        },
        unloadRightDrawer: function() {
            var drawer = App.getView('right_drawer');
            if (drawer) {
                drawer.setLayout([]);
                drawer.getGroupForEntry = function(entry) {};
                App.snapper.off('close');
            }
        },
        _onSearchExpression: function() {
            // TODO: Don't extend this private function - connect to the search widget onSearchExpression instead
            this._clearGroupMode();
            this.inherited(arguments);
        },
        originalProps: null,
        _startGroupMode: function() {
            if (this.groupsMode) {
                return;
            }

            this.originalProps = {};

            var original = this.originalProps;

            original.request = this.request ? this.request.clone() : null;
            original.querySelect = this.querySelect;
            original.queryOrderBy = this.queryOrderBy;
            original.idProperty = this.idProperty;
            original.labelProperty = this.labelProperty;
            original.store = this.store;
            original.rowTemplate = this.rowTemplate;
            original.itemTemplate = this.itemTemplate;
            original.relatedViews = this.relatedViews;

            this.groupsMode = true;

        },
        _clearGroupMode: function() {
            if (!this.groupsMode) {
                return;
            }

            var original = this.originalProps;

            this.request = original.request || null;
            this.querySelect = original.querySelect;
            this.queryOrderBy = original.queryOrderBy;
            this.idProperty = original.idProperty;
            this.labelProperty = original.labelProperty;
            this.set('store', original.store);
            this.rowTemplate = original.rowTemplate;
            this.itemTemplate = original.itemTemplate;
            this.relatedViews = original.relatedViews;

            this.originalProps = null;

            this.groupsMode = false;
            this.currentGroupId = null;
            App.setPrimaryTitle(this.get('title'));

            this.clear();
            this.refreshRequired = true;
        },
        _createActions: function() {
            // These actions will get mixed into the right drawer view.
            var actions = {
                hashTagClicked: lang.hitch(this, function(params) {
                    this._clearGroupMode();

                    if (params.hashtag) {
                        this.setSearchTerm('#' + params.hashtag);
                        this.search();
                        this.toggleRightDrawer();
                    }
                }),
                kpiClicked: lang.hitch(this, function(params) {
                    var results, enabled, metrics;

                    metrics = App.getMetricsByResourceKind(this.resourceKind);

                    if (metrics.length > 0) {
                        results = array.filter(metrics, function(metric) {
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
                }),
                groupConfigureClicked: lang.hitch(this, function() {
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
                        previousSelections: array.map(this.groupList, function(group) {
                            return group.$key;
                        })
                    });

                    handle = aspect.after(field, 'complete', lang.hitch(field, function() {
                        var field = this,
                            list = this.owner,
                            groupId,
                            entry,
                            items = [];

                        // We will get an object back where the property names are the keys (groupId's)
                        // Extract them out, and save the entry, which is the data property on the extracted object
                        for (groupId in field.currentValue) {
                            if (field.currentValue.hasOwnProperty(groupId)) {
                                entry = field.currentValue[groupId].data;
                                if (entry) {
                                    items.push(entry);
                                }
                            }
                        }

                        App.preferences[list.entityName] = items;
                        App.persistPreferences();

                        handle.remove();
                        field.destroy();
                    }));

                    field.navigateToListView();
                    this.toggleRightDrawer();
                }),
                groupClicked: lang.hitch(this, function(params) {
                    var template = [],
                        selectColumns,
                        extraSelectColumns = [],
                        group,
                        original = this.originalProps,
                        groupId;

                    this._startGroupMode();
                    groupId = params.$key;

                    group = array.filter(this.groupList, function(item) {
                        return item.$key === groupId;
                    })[0];

                    if (!group) {
                        throw new Error("Expected a group.");
                    }

                    this.currentGroupId = groupId;

                    // Set the toolbar title to the current group displayName
                    App.setPrimaryTitle(params.title);

                    group.layout = array.filter(group.layout, function(item) {
                        return array.every(GroupUtility.groupFilters, function(filter) {
                            return filter(item);
                        }, this);
                    }, this);

                    selectColumns = array.map(group.layout, function(layout) {
                        if (layout.format === 'PickList Item') {
                            extraSelectColumns.push(layout.alias + 'TEXT');
                        }

                        if (layout.format === 'User' || layout.format === 'Owner') {
                            extraSelectColumns.push(layout.alias + 'NAME');
                        }

                        return layout.alias;
                    });

                    template = array.map(group.layout, function(item) {
                        var template, jsonString;
                        jsonString = json.stringify(item);
                        template = ["<h4>", item.caption, " : {%= $$.getFormatterByLayout(" + jsonString + ")($[$$.getFieldNameByLayout(" + jsonString + ")]) %}", "</h4>"].join('');
                        return template;
                    });

                    // Create a custom request that the store will use to execute the group query
                    this.request = GroupUtility.createGroupRequest({
                        groupId: groupId,
                        connection: this.getConnection()
                    });

                    // Try to select the entity id as well
                    selectColumns.push(group.family + 'ID');
                    this.querySelect = selectColumns.concat(extraSelectColumns);

                    this.queryOrderBy = '';
                    this.idProperty = group.family.toUpperCase() + 'ID';
                    this.labelProperty = group.family.toUpperCase();

                    this.itemTemplate = new Simplate(template);

                    this.store = null;
                    this.relatedViews = [];
                    this.clear(true);
                    this.refreshRequired = true;
                    this.refresh();
                    this.toggleRightDrawer();
                })
            };

            return actions;
        },
        getFormatterByLayout: function(layoutItem) {
            return GroupUtility.getFormatterByLayout(layoutItem);
        },
        getFieldNameByLayout: function(layoutItem) {
            return GroupUtility.getFieldNameByLayout(layoutItem);
        },
        getGroupForRightDrawerEntry: function(entry) {
            var mixin = lang.getObject(mixinName);
            if (entry.dataProps && entry.dataProps.hashtag && this._hasHashTags()) {
                return {
                    tag: 'view',
                    title: mixin.prototype.hashTagsSectionText
                };
            }

            if (entry.action === 'groupClicked' || entry.action === 'groupConfigureClicked') {
                return {
                    tag: 'group',
                    title: this.groupsSectionText
                };
            }

            return {
                tag: 'kpi',
                title: mixin.prototype.kpiSectionText
            };
        },
        createRightDrawerLayout: function() {
            var groupsSection, hashTagsSection, hashTag, kpiSection, layout, metrics, i, len, store, def;

            layout = [];

            groupsSection = {
                id: 'actions',
                children: []
            };

            groupsSection.children.push({
                'name': 'configureGroups',
                'action': 'groupConfigureClicked',
                'title': this.configureGroupsText
            });

            if (this.groupList && this.groupList.length > 0) {
                array.forEach(this.groupList, function(group) {

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

            if (this.entityName) {
                layout.push(groupsSection);
            }

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

            metrics = App.getMetricsByResourceKind(this.resourceKind);

            kpiSection = {
                id: 'kpi',
                children: []
            };

            if (metrics.length > 0) {
                array.forEach(metrics, function(metric, i) {
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
        _hasHashTags: function() {
            return this.searchWidget && this.searchWidget.hashTagQueries && this.searchWidget.hashTagQueries.length > 0;
        }
    });
});

