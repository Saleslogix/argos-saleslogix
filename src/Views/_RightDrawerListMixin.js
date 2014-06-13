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

    var mixinName = 'Mobile.SalesLogix.Views._RightDrawerListMixin';

    return declare('Mobile.SalesLogix.Views._RightDrawerListMixin', [_RightDrawerBaseMixin], {
        //Localization
        hashTagsSectionText: 'Hash Tags',
        kpiSectionText: 'KPI',

        _hasChangedKPIPrefs: false,// Dirty flag so we know when to reload the widgets

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
                App.snapper.off('close');
            }
        },
        _createActions: function() {
            // These actions will get mixed into the right drawer view.
            var actions = {
                hashTagClicked: lang.hitch(this, function(params) {
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
            var mixin = lang.getObject(mixinName);
            if (entry.dataProps && entry.dataProps.hashtag) {
                return {
                    tag: 'view',
                    title: mixin.prototype.hashTagsSectionText
                };
            }

            return {
                tag: 'kpi',
                title: mixin.prototype.kpiSectionText
            };
        },
        createRightDrawerLayout: function() {
            var hashTagsSection, hashTag, kpiSection, layout, i, len, metrics;
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

