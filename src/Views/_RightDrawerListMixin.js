define('Mobile/SalesLogix/Views/_RightDrawerListMixin', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/dom-construct',
    'Mobile/SalesLogix/Views/_RightDrawerBaseMixin'
], function(
    declare,
    array,
    lang,
    domConstruct,
    _RightDrawerBaseMixin
) {

    return declare('Mobile.SalesLogix.Views._RightDrawerListMixin', [_RightDrawerBaseMixin], {
        //Localization
        hashTagsSectionText: 'Hash Tags',
        kpiSectionText: 'KPI',

        onShow: function() {
            var drawer = App.getView('right_drawer');
            if (drawer) {
                domConstruct.place(this.searchWidget.domNode, drawer.domNode, 'first');
            }
        },
        setupRightDrawer: function() {
            var drawer = App.getView('right_drawer');
            if (drawer) {
                lang.mixin(drawer, this._createActions());
                drawer.setLayout(this.createRightDrawerLayout());
                drawer.getGroupForEntry = lang.hitch(this, function(entry) {
                    return this.getGroupForRightDrawerEntry(entry);
                });

                domConstruct.place(this.searchWidget.domNode, drawer.domNode, 'first');
            }
        },
        unloadRightDrawer: function() {
            var drawer = App.getView('right_drawer');
            if (drawer) {
                drawer.setLayout([]);
                drawer.getGroupForEntry = function(entry) {};
                domConstruct.place(this.searchWidget.domNode, this.domNode, 'first');
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
            var hashTagsSection, hashTag, kpiSection, layout;
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
                            dataProps: {
                                'hashtag': this.hashTagQueriesText[hashTag] || hashTag,
                            }
                        });
                    }
                }
            }

            layout.push(hashTagsSection);

            kpiSection = {
                id: 'kpi',
                children: [
                    {
                        'name': 'KPISet1',
                        'action': 'kpiClicked', 
                        'title': 'Fake KPI 1'
                    },
                    {
                        'name': 'KPISet2',
                        'action': 'kpiClicked', 
                        'title': 'Fake KPI 2'
                    }
                ]
            };

            layout.push(kpiSection);

            return layout;
        }
    });
});

