/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/AreaCategoryIssueLookup', [
    'dojo/_base/declare',
    'Sage/Platform/Mobile/List'
], function(
    declare,
    List
) {

    return declare('Mobile.SalesLogix.Views.AreaCategoryIssueLookup', [List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.$descriptor %}</h3>'
        ]),

        //Localization
        titleText: 'Accounts',

        //View Properties
        pageSize: 200,
        expose: false,
        enableSearch: false,
        id: 'areacategoryissue_lookup',
        queryOrderBy: 'Area,Category,Issue',
        querySelect: [
            'Area',
            'Category',
            'Issue'
        ],
        resourceKind: 'areaCategoryIssues',

        show: function(options) {
            this.active = options.where;

            options.where = false;

            this.inherited(arguments, [options]);
        },
        requestData: function() {
            if (this.cache) {
                this.processFeed();
            } else {
                this.inherited(arguments);
            }
        },
        processFeed: function(feed) {
            // assume order is preserved
            if (feed) {
                this.createCacheFrom(feed);
            }

            var use = this.cache;

            if (use && this.active && this.active['Area']) {
                use = use[this.active['Area']];
            }
            if (use && this.active && this.active['Category']) {
                use = use[this.active['Category']];
            }

            feed = this.buildFeedFrom(use);

            this.inherited(arguments, [feed]);
        },
        createCacheFrom: function(feed) {
            var feedLength = feed['$resources'].length;
            this.cache = {};

            for (var i = 0; i < feedLength; i += 1) {
                var entry = feed['$resources'][i],
                    area = this.cache[entry['Area']] || (this.cache[entry['Area']] = {}),
                    category = area[entry['Category']] || (area[entry['Category']] = {});

                category[entry['Issue']] = true;
            }
        },
        buildFeedFrom: function(segment) {
            var list = [];

            for (var n in segment) {
                list.push({
                    '$key': n,
                    '$descriptor': n
                });
            }

            return {'$resources': list};
        },
        hasMoreData: function() {
            return false; // todo: implement paging?
        },
        refreshRequiredFor: function(options) {
            return true; // todo: implement refresh detection?
        },
        formatSearchQuery: function(searchQuery) {
        }
    });
});

