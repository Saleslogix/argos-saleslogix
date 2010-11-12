/// <reference path="../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix");

Mobile.SalesLogix.AreaCategoryIssueLookup = Ext.extend(Sage.Platform.Mobile.List, {
    //Templates
    contentTemplate: new Simplate([
        '<h3>{%: $.$descriptor %}</h3>'
    ]),

    //Localization
    titleText: 'Accounts',

    //View Properties
    pageSize: 200,
    expose: false,
    hideSearch: true,
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

        Mobile.SalesLogix.AreaCategoryIssueLookup.superclass.show.apply(this, arguments);
    },
    requestData: function() {
        if (this.cache)
        {
            this.processFeed();
        }
        else
        {
            Mobile.SalesLogix.AreaCategoryIssueLookup.superclass.requestData.apply(this, arguments);
        }
    },
    processFeed: function(feed) {
        // assume order is preserved
        if (feed)
        {
            this.createCacheFrom(feed);
        }

        var use = this.cache;

        if (use && this.active && this.active['Area']) use = use[this.active['Area']];
        if (use && this.active && this.active['Category']) use = use[this.active['Category']];

        feed = this.buildFeedFrom(use);

        Mobile.SalesLogix.AreaCategoryIssueLookup.superclass.processFeed.apply(this, [feed]);
    },
    createCacheFrom: function(feed) {
        this.cache = {};

        for (var i = 0; i < feed['$resources'].length; i++)
        {
            var entry = feed['$resources'][i],
                area = this.cache[entry['Area']] || (this.cache[entry['Area']] = {}),
                category = area[entry['Category']] || (area[entry['Category']] = {});

            category[entry['Issue']] = true
        }       
    },
    buildFeedFrom: function(segment) {
        var list = [];

        for (var n in segment)
        {
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
    formatSearchQuery: function(query) {
        
    }
});