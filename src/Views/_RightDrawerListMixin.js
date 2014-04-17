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
    'dojo/dom-construct',
    'dojo/dom-attr',
    'dojo/dom-style',
    'dojo/aspect',
    'Mobile/SalesLogix/Views/_RightDrawerBaseMixin',
    'Sage/Platform/Mobile/Fields/LookupField'
], function(
    declare,
    array,
    lang,
    domConstruct,
    domAttr,
    domStyle,
    aspect,
    _RightDrawerBaseMixin,
    LookupField
) {

    return declare('Mobile.SalesLogix.Views._RightDrawerListMixin', [_RightDrawerBaseMixin], {
        //Localization
        hashTagsSectionText: 'Hash Tags',
        groupsSectionText: 'Groups',
        kpiSectionText: 'KPI',
        groupsModeText: 'You are currently in groups mode. Perform a search or click a hashtag to get back to entity mode.',
        configureGroupsText: 'Configure',

        _hasChangedKPIPrefs: false,// Dirty flag so we know when to reload the widgets
        groupList: null,
        DRAWER_PAGESIZE: 100,
        groupLookupId: 'groups_configure',

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
            this._restoreProps();
            this.inherited(arguments);
        },
        originalProps: null,
        _preserveProps: function() {
            this.originalProps = {};

            var original = this.originalProps;

            original.request = this.request;
            original.querySelect = this.querySelect;
            original.queryOrderBy = this.queryOrderBy;
            original.keyProperty = this.keyProperty;
            original.descriptorProperty = this.descriptorProperty;
            original.store = this.store;
            original.rowTemplate = this.rowTemplate;
            original.itemTemplate = this.itemTemplate;
            if (this.groupsNode) {
                domStyle.set(this.groupsNode, {
                    display: 'block'
                });

                this.groupsNode.innerHTML = this.groupsModeText;
            }
        },
        _restoreProps: function() {
            if (!this.originalProps) {
                return;
            }

            var original = this.originalProps;

            this.request = null;
            this.querySelect = original.querySelect;
            this.queryOrderBy = original.queryOrderBy;
            this.keyProperty = original.keyProperty;
            this.descriptorProperty = original.descriptorProperty;
            this.set('store', original.store);
            this.rowTemplate = original.rowTemplate;
            this.itemTemplate = original.itemTemplate;

            this.originalProps = null;

            this.clear(true);
            this.refreshRequired = true;
            if (this.groupsNode) {
                domStyle.set(this.groupsNode, {
                    display: 'none'
                });

                this.groupsNode.innerHTML = '';
            }
        },
        _createActions: function() {
            // These actions will get mixed into the right drawer view.
            var actions = {
                hashTagClicked: lang.hitch(this, function(params) {
                    this._restoreProps();

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
                    view.clear(true);
                    view.refreshRequired = true;

                    field = new LookupField({
                        owner: this,
                        view: view,
                        singleSelect: false
                    });

                    handle = aspect.after(field, 'complete', lang.hitch(field, function() {
                        var field = this,
                            list = this.owner,
                            groupId,
                            entry
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
                        request,
                        layout = params && params.layout && params.layout.split(','),
                        original = this.originalProps;

                    this._preserveProps();

                    // Create a custom request that the store will use to execute the group query
                    this.request = request = new Sage.SData.Client.SDataNamedQueryRequest(this.getConnection());
                    request.setQueryName('execute');
                    request.setResourceKind('groups');
                    request.setContractName('system');
                    request.getUri().setCollectionPredicate("'" + params.$key + "'");

                    this.querySelect = layout;
                    this.queryOrderBy = '';
                    this.keyProperty = params.family.toUpperCase() + 'ID';
                    this.descriptorProperty = params.family.toUpperCase();
                    this.store = null;

                    this.rowTemplate = new Simplate([
                        '<li data-action="activateEntry" data-key="{%= $[$$.keyProperty] %}" data-descriptor="{%: $[$$.descriptorProperty] %}">',
                            '<button data-action="selectEntry" class="list-item-selector button">',
                                '<img src="{%= $$.icon || $$.selectIcon %}" class="icon" />',
                            '</button>',
                            '<div class="list-item-content" data-snap-ignore="true">{%! $$.itemTemplate %}</div>',
                        '</li>'
                    ]);

                    template = array.map(array.filter(layout, function(item) { return item.toUpperCase !== (params.family.toUpperCase() + 'ID'); }), function(item) {
                        return ["<h4>", item.toUpperCase(), " : {%= $['" + item.toUpperCase() + "'] %}", "</h4>"].join('');
                    });

                    this.itemTemplate = new Simplate(template);

                    this.clear(true);
                    this.refreshRequired = true;
                    this.refresh();
                    this.toggleRightDrawer();
                })
            };

            return actions;
        },
        getGroupForRightDrawerEntry: function(entry) {
            if (entry.dataProps && entry.dataProps.hashtag) {
                return {
                    tag: 'view',
                    title: this.hashTagsSectionText
                };
            }

            if (entry.action === 'groupClicked' || entry.action === 'groupConfigureClicked') {
                return {
                    tag: 'group',
                    title: this.groupsSectionText
                }
            }

            return {
                tag: 'kpi',
                title: this.kpiSectionText
            };
        },
        createRightDrawerLayout: function() {
            var groupsSection, hashTagsSection, hashTag, kpiSection, layout, metrics, i, len, store, def, groupLayout;

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
                    group.layout = array.filter(group.layout, function(item) {
                        return item.visible && item.fieldType !== 'FixedChar';
                    });

                    groupLayout = array.map(group.layout, function(layout) {
                        return layout.alias;
                    });

                    // Try to select the entity id as well
                    groupLayout.push(group.family + 'ID');

                    groupsSection.children.push({
                        'name': group.name,
                        'action': 'groupClicked',
                        'title': group.displayName,
                        'dataProps': {
                            $key: group.$key,
                            family: group.family,
                            userId: group.userId,
                            isHidden: group.isHidden,
                            isAdHoc: group.isAdHoc,
                            layout: groupLayout.join(',')
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

            if (this.searchWidget && this.searchWidget.hashTagQueries) {
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
        }
    });
});

