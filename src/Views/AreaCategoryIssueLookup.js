define('Mobile/SalesLogix/Views/AreaCategoryIssueLookup', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/Deferred',
    'dojo/store/util/QueryResults',
    'Argos/Store/SData',
    'Argos/List',
    'Argos/_SDataListMixin'
], function(
    declare,
    lang,
    Deferred,
    QueryResults,
    SData,
    List,
    _SDataListMixin
) {
    var Store = declare([SData], {
        resourceKind: 'areaCategoryIssues',
        cache: null,
        query: function(query, queryOptions) {
            var cached = this._fromCache(query, queryOptions);
            if (cached) return QueryResults(cached);

            var completeQueryOptions = {
                    count: 200,
                    select: ['Area', 'Category', 'Issue'],
                    sort: 'Area,Category,Issue'
                },
                queryResults = this.inherited(arguments, [null, completeQueryOptions]),
                queryDeferred = new Deferred();

            Deferred.when(queryResults,
                lang.hitch(this, this._onQueryComplete, queryDeferred, query, queryOptions),
                lang.hitch(this, this._onQueryError, queryDeferred)
            );

            return QueryResults(queryDeferred);
        },
        _onQueryComplete: function(deferred, query, queryOptions, items) {
            this._buildCache(items);

            var result = this._fromCache(query, queryOptions);

            deferred.total = result.length;
            deferred.resolve(result);
        },
        _onQueryError: function(deferred, error) {
            deferred.reject(error);
        },
        _buildCache: function(items) {
            this.cache = {};

            for (var i = 0; i < items.length; i += 1)
            {
                var item = items[i],
                area = this.cache[item['Area']] || (this.cache[item['Area']] = {}),
                category = area[item['Category']] || (area[item['Category']] = {});

                category[item['Issue']] = true
            }
        },
        _fromCache: function(query, queryOptions) {
            if (!this.cache) return null;

            var use = this.cache;

            if (use && query && query['Area']) use = use[query['Area']];
            if (use && query && query['Category']) use = use[query['Category']];

            var result = [];

            for (var n in use)
            {
                result.push({
                    '$key': n,
                    '$descriptor': n
                });
            }

            return result;
        }
    });

    return declare('Mobile.SalesLogix.Views.AreaCategoryIssueLookup', [List, _SDataListMixin], {
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

        createStore: function() {
            return new Store({
                service: this.getConnection()
            });
        },

        _buildQueryExpression: function() {
            var query = {},
                options = this.options;

            if (options.area) query['Area'] = options.area;
            if (options.category) query['Category'] = options.category;

            return query;
        },

        refreshRequiredFor: function(options) {
            if (this.options)
            {
                if (options)
                {
                    if (this.expandExpression(this.options.area) != this.expandExpression(options.area)) return true;
                    if (this.expandExpression(this.options.category) != this.expandExpression(options.category)) return true;
                }

                return false;
            }
            else
                return this.inherited(arguments);
        },
        formatSearchQuery: function(searchQuery) {

        }
    });
});