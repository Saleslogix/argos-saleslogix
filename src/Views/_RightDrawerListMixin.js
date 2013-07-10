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
                lang.mixin(drawer, this.createActions());
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
        createActions: function() {
            // These actions will get mixed into the right drawer view.
            var actions = {
                hashTagClicked: lang.hitch(this, function(params) {
                    console.log(params.hashTag);
                }),
                kpiClicked: lang.hitch(this, function(params) {
                    console.dir(params);
                })
            };

            return actions;
        },
        getGroupForRightDrawerEntry: function(entry) {
            if (entry.hashTag) {
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
            var hashTagsSection, kpiSection, layout;
            layout = [];

            // TODO: Iterate the hash tags and push them into children
            hashTagsSection = {
                id: 'actions',
                children: [
                    {
                        'name': 'hashTag1',
                        'action': 'hashTagClicked', 
                        //'icon': 'content/images/icons/New_Contact_24x24.png',
                        'title': 'foo',
                        'hashTag': '#foo'
                    }
                ]
            };

            layout.push(hashTagsSection);

            kpiSection = {
                id: 'kpi',
                children: [
                    {
                        'name': 'KPISet1',
                        'action': 'kpiClicked', 
                        'title': 'KPI 1'
                    }
                ]
            };

            layout.push(kpiSection);

            return layout;
        }
    });
});

