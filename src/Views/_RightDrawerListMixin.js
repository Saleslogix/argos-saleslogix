define('Mobile/SalesLogix/Views/_RightDrawerListMixin', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/dom-construct',
    'dojo/dom-attr',
    'dojo/aspect',
    'Mobile/SalesLogix/Views/_RightDrawerBaseMixin'
], function(
    declare,
    array,
    lang,
    domConstruct,
    domAttr,
    aspect,
    _RightDrawerBaseMixin
) {

    return declare('Mobile.SalesLogix.Views._RightDrawerListMixin', [_RightDrawerBaseMixin], {
        //Localization
        hashTagsSectionText: 'Hash Tags',
        kpiSectionText: 'KPI',
        _snapperCloseHandle: null,

        onShow: function() {
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

                domConstruct.place(this.searchWidget.domNode, drawer.domNode, 'first');

                if (this.rebuildWidgets) {
                    this._snapperCloseHandle = aspect.after(App.snapper, 'close', lang.hitch(this, function() {
                        this.rebuildWidgets();
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
                if (this._snapperCloseHandle) {
                    this._snapperCloseHandle.remove();
                }
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
                        return pref.metricTitleText === params.title;
                    });

                    if (results.length > 0) {
                        enabled = !!results[0].enabled;
                        results[0].enabled = !enabled;
                        App.persistPreferences();

                        domAttr.set(params.$source, 'data-enabled', (!enabled).toString());
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
            var hashTagsSection, hashTag, kpiSection, layout, prefs;
            layout = [];

            hashTagsSection = {
                id: 'actions',
                children: []
            };

            if (this.hashTagQueries) {
                for (hashTag in this.hashTagQueries) {
                    if (this.hashTagQueries.hasOwnProperty(hashTag)) {
                        hashTagsSection.children.push({
                            'name': hashTag,
                            'action': 'hashTagClicked', 
                            'title': this.hashTagQueriesText[hashTag] || hashTag,
                            'dataProps': {
                                'hashtag': this.hashTagQueriesText[hashTag] || hashTag,
                            }
                        });
                    }
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
                    kpiSection.children.push({
                        'name': 'KPI' + i,
                        'action': 'kpiClicked',
                        'title': pref.metricTitleText,
                        'dataProps': {
                            'title': pref.metricTitleText,
                            'enabled': !!pref.enabled
                        }
                    });
                });

                layout.push(kpiSection);
            }


            return layout;
        }
    });
});

