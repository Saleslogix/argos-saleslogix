/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/_RightDrawerListMixin', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/dom-construct',
    'dojo/dom-attr',
    'Mobile/SalesLogix/Views/_RightDrawerBaseMixin'
], function(
    declare,
    array,
    lang,
    domConstruct,
    domAttr,
    _RightDrawerBaseMixin
) {

    return declare('Mobile.SalesLogix.Views._RightDrawerListMixin', [_RightDrawerBaseMixin], {
        //Localization
        hashTagsSectionText: 'Hash Tags',
        kpiSectionText: 'KPI',

        _hasChangedKPIPrefs: false,// Dirty flag so we know when to reload the widgets

        onBeforeTransitionTo: function() {
            var drawer = App.getView('right_drawer');
            if (drawer) {
                domConstruct.place(this.searchWidget.domNode, drawer.domNode, 'first');
            }
        },
        setupRightDrawer: function() {
            var drawer = App.getView('right_drawer'), handle;
            if (drawer) {
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

            return {
                tag: 'kpi',
                title: this.kpiSectionText
            };
        },
        createRightDrawerLayout: function() {
            var hashTagsSection, hashTag, kpiSection, layout, prefs, i, len;
            layout = [];

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
        }
    });
});

