/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.Views._SpeedSearchRightDrawerListMixin
 *
 * Speedsearch specific mixin for right drawer functionality.
 *
 * @mixins Mobile.SalesLogix.Views._RightDrawerBaseMixin
 *
 */
define('Mobile/SalesLogix/Views/_SpeedSearchRightDrawerListMixin', [
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

    var mixinName = 'Mobile.SalesLogix.Views._SpeedSearchRightDrawerListMixin';

    return declare('Mobile.SalesLogix.Views._SpeedSearchRightDrawerListMixin', [_RightDrawerBaseMixin], {
        //Localization
        indexSectionText: 'Indexes',

        _hasChangedIndexPrefs: false,// Dirty flag so we know when to reload the widgets

        onShow: function() {
            this.setDefaultIndexPreferences();
        },
        setDefaultIndexPreferences: function() {
            var defaults;
            if (!App.preferences.speedSeacrchIndexes) {
                defaults = this.getDefaultIndexPrefences();
                App.preferences.speedSearchIndexes = defaults;
                App.persistPreferences();
            }
        },
        getDefaultIndexPrefences: function() {
            var defaults = [], self = this;
            array.forEach(this.indexes, function(index) {
                defaults.push({
                    indexName: index.indexName,
                    enabled: self._isIndexActive(index.indexName)
                });
            });
            return defaults;
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
                        if (this._hasChangedIndexPrefs) {
                            this.rebuildWidgets();
                            this._hasChangedIndexPrefs = false;
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
        _onSearchExpression: function() {
            // TODO: Don't extend this private function - connect to the search widget onSearchExpression instead
            this.inherited(arguments);
        },
        _createActions: function() {
            // These actions will get mixed into the right drawer view.
            var actions = {
                indexClicked: lang.hitch(this, function(params) {
                    var prefs, results, enabled;
                    prefs = App.preferences && App.preferences.speedSearchIndexes;

                    results = array.filter(prefs, function(pref) {
                        return pref.indexName === params.indexname; //the index name is lower cased.
                    });
                    this.activateIndex(params.indexname);
                    if (results.length > 0) {
                        enabled = !!results[0].enabled;
                        results[0].enabled = !enabled;
                        App.persistPreferences();
                        this._hasChangedIndexPrefs = true;
                        domAttr.set(params.$source, 'data-enabled', (!enabled).toString());
                    }
                })
            };

            return actions;
        },
        getGroupForRightDrawerEntry: function(entry) {
            if (entry.dataProps && entry.dataProps.indexname) {
                var mixin = lang.getObject(mixinName);
                return {
                    tag: 'view',
                    title: mixin.prototype.indexSectionText
                };
            }
        },
        createRightDrawerLayout: function() {
            var indexSection, index, indexName, layout, prefs, indexPref, i;
            layout = [];

            indexSection = {
                id: 'actions',
                children: []
            };
            prefs = App.preferences && App.preferences.speedSearchIndexes;
            if (this.indexes) {
                for (i in this.indexes) {
                    index = this.indexes[i];
                    indexPref = array.filter(prefs, function(pref) {
                        return pref.indexName === index.indexName; 
                        });
                    index = this.indexes[i];
                    if (index.hasOwnProperty("indexName")) {
                        indexSection.children.push({
                            'name': index.indexName,
                            'action': 'indexClicked', 
                            'title': this.indexesText[index.indexName] || index.indexName,
                            'dataProps': {
                                'indexname': index.indexName,
                                'enabled':!!indexPref[0].enabled
                            }
                        });
                    }
                }
            }

            layout.push(indexSection);
           return layout;
        }
    });
});

