/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class crm.Views.AreaCategoryIssueLookup
 *
 *
 * @extends argos.List
 * @mixins argos._LegacySDataListMixin
 *
 */
define('crm/Views/AreaCategoryIssueLookup', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'argos/List',
    'argos/_LegacySDataListMixin'
], function(
    declare,
    lang,
    List,
    _LegacySDataListMixin
) {

    var __class = declare('crm.Views.AreaCategoryIssueLookup', [List, _LegacySDataListMixin], {
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
        enablePullToRefresh: false,
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
            var feedLength,
                i,
                entry,
                area,
                category;

            feedLength = feed['$resources'].length;
            this.cache = {};

            for (i = 0; i < feedLength; i += 1) {
                entry = feed['$resources'][i];
                area = this.cache[entry['Area']] || (this.cache[entry['Area']] = {});
                category = area[entry['Category']] || (area[entry['Category']] = {});

                category[entry['Issue']] = true;
            }
        },
        buildFeedFrom: function(segment) {
            var list = [], n;

            for (n in segment) {
                if (segment.hasOwnProperty(n)) {
                    list.push({
                        '$key': n,
                        '$descriptor': n
                    });
                }
            }

            return {'$resources': list};
        },
        hasMoreData: function() {
            return false; // todo: implement paging?
        },
        refreshRequiredFor: function() {
            return true; // todo: implement refresh detection?
        },
        formatSearchQuery: function() {
        }
    });

    lang.setObject('Mobile.SalesLogix.Views.AreaCategoryIssueLookup', __class);
    return __class;
});

