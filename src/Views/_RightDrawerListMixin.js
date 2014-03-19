/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
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
    'Mobile/SalesLogix/Views/_RightDrawerBaseMixin',
    'Sage/Platform/Mobile/Store/SData'
], function(
    declare,
    array,
    lang,
    domConstruct,
    domAttr,
    _RightDrawerBaseMixin,
    SDataStore
) {

    return declare('Mobile.SalesLogix.Views._RightDrawerListMixin', [_RightDrawerBaseMixin], {
        //Localization
        hashTagsSectionText: 'Hash Tags',
        groupsSectionText: 'Groups',
        kpiSectionText: 'KPI',

        _hasChangedKPIPrefs: false,// Dirty flag so we know when to reload the widgets
        groupList: null,

        onBeforeTransitionTo: function() {
            var drawer = App.getView('right_drawer');
            if (drawer) {
                domConstruct.place(this.searchWidget.domNode, drawer.domNode, 'first');
            }
        },
        setupRightDrawer: function() {
            var drawer = App.getView('right_drawer'), handle, store, def;
            if (drawer) {
                store = this.createGroupStore();
                if (store) {
                    def = store.query(null);
                    def.then(lang.hitch(this, function(data) {
                        this.groupList = data;
                        this._finishSetup(drawer);

                        // Force a refresh since we fetched this async and the user could have opened it before we loaded.
                        drawer.store = null;
                        drawer.refresh();
                        this.drawerLoaded = true;
                    }), function(e) {
                        console.error(e);
                        this._finishSetup(drawer);
                    });
                } else {
                    this._finishSetup(drawer);
                }
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
                domConstruct.place(this.searchWidget.domNode, this.domNode, 'first');
                App.snapper.off('close');
            }
        },
        _onSearchExpression: function() {
            // TODO: Don't extend this private function - connect to the search widget onSearchExpression instead
            this.inherited(arguments);
            this.toggleRightDrawer();
        },
        _createActions: function() {
            // These actions will get mixed into the right drawer view.
            var actions = {
                hashTagClicked: lang.hitch(this, function(params) {
                    if (params.hashtag) {
                        this.setSearchTerm('#' + params.hashtag);
                        this.search();
                    }
                }),
                kpiClicked: lang.hitch(this, function(params) {
                    var prefs, results, enabled;
                    prefs = App.preferences && App.preferences.metrics && App.preferences.metrics[this.resourceKind];

                    results = array.filter(prefs, function(pref) {
                        return pref.title === params.title;
                    });

                    if (results.length > 0) {
                        enabled = !!results[0].enabled;
                        results[0].enabled = !enabled;
                        App.persistPreferences();
                        this._hasChangedKPIPrefs = true;

                        domAttr.set(params.$source, 'data-enabled', (!enabled).toString());
                    }
                }),
                navigateToConfigurationView: lang.hitch(this, function() {
                    var view = App.getView(this.configurationView);
                    if (view) {
                        view.resourceKind = this.resourceKind;
                        view.entityName = this.entityName;
                        view.show({ returnTo: -1 });
                        this.toggleRightDrawer();
                    }
                }),
                groupClicked: lang.hitch(this, function(params) {
                    var template = [],
                        request,
                        layout = params && params.layout && params.layout.split(',');

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

            if (entry.action === 'groupClicked') {
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
            var groupsSection, hashTagsSection, hashTag, kpiSection, layout, prefs, i, len, store, def, groupLayout;

            layout = [];

            groupsSection = {
                id: 'actions',
                children: []
            };

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

            prefs = App.preferences && App.preferences.metrics && App.preferences.metrics[this.resourceKind];

            kpiSection = {
                id: 'kpi',
                children: []
            };

            if (prefs) {
                array.forEach(prefs, function(pref, i) {
                    if (pref.title) {
                        kpiSection.children.push({
                            'name': 'KPI' + i,
                            'action': 'kpiClicked',
                            'title': pref.title,
                            'dataProps': {
                                'title': pref.title,
                                'enabled': !!pref.enabled
                            }
                        });
                    }
                });

                layout.push(kpiSection);
            }

            return layout;
        },
        createGroupStore: function() {
            if (!this.entityName) {
                return null;
            }

            var store = new SDataStore({
                service: App.services.crm,
                resourceKind: 'groups',
                contractName: 'system',
                where: "upper(family) eq '" + this.entityName.toUpperCase() + "'",
                include: ['layout', 'tableAliases'],
                idProperty: '$key',
                applicationName: 'slx',
                scope: this
            });

            return store;
        }
    });
});

