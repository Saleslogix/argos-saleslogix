/*
 * Copyright (c) 1997-2014, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.GroupUtility
 *
 * Saleslogix group based utils
 *
 * @singleton
 *
 */
define('Mobile/SalesLogix/GroupUtility', [
    'dojo/_base/lang',
    'dojo/_base/array',
    './Format',
    'moment'
], function(
    lang,
    array,
    format,
    moment
) {
    var _createGroupRequest = function(options) {
        var request, defaultOptions, arg;

        defaultOptions = {
            connection: App.getService(false),
            groupId: '',
            resourceKind: 'groups',
            contractName: 'system',
            queryName: 'execute',
            queryArgs: null
        };

        options = lang.mixin(defaultOptions, options);

        request = new Sage.SData.Client.SDataNamedQueryRequest(options.connection);
        request.setQueryName(options.queryName);
        request.setResourceKind(options.resourceKind);
        request.setContractName(options.contractName);
        request.getUri().setCollectionPredicate("'" + options.groupId + "'");

        for (arg in options.queryArgs) {
            request.setQueryArg(arg, options.queryArgs[arg]);
        }

        return request;
    };

    return lang.setObject('Mobile.SalesLogix.GroupUtility', {
        groupDateFormatText: 'M/D/YYYY h:mm:ss a',
        /**
         * Returns an SDataNamedQueryRequest setup for groups
         * @param {Object} options Options for creating the request
         * @param {String} options.groupId The id of the group the request should execute on
         * @param {Object} [options.queryArgs] Additional query arguments to set on the request
         * @param {Object} [options.connection] SData connection. Defaults to use App.getService(false)
         *
         */
        createGroupRequest: function (options) {
            var defaults = {
                queryName: 'execute'
            };

            return _createGroupRequest(lang.mixin(defaults, options));
        },

        /**
         * Returns an SDataNamedQueryRequest setup for group metrics
         * @param {Object} options Options for creating the request
         * @param {String} options.groupId The id of the group the request should execute on
         * @param {Object} [options.queryArgs] Additional query arguments to set on the request
         * @param {Object} [options.connection] SData connection. Defaults to use App.getService(false)
         *
         */
        createGroupMetricRequest: function (options) {
            var defaults = {
                queryName: 'executeMetric'
            };

            return _createGroupRequest(lang.mixin(defaults, options));
        },
        /**
         * Array of functions that will filter out group layout
         */
        groupFilters: [
            function(layoutItem) {
                return layoutItem.visible;
            }
        ],
        groupFormatters: [
            {
                name: 'NoFormat',
                test: function(layoutItem) {
                    return layoutItem.format === 'None';
                },
                formatter: function(value) {
                    return value;
                }
            },
            {
                name: 'Phone',
                test: function(layoutItem) {
                    return layoutItem.format === 'Phone';
                },
                formatter: function(value) {
                    return format.phone(value);
                }
            },
            {
                name: 'Fixed',
                test: function(layoutItem) {
                    return layoutItem.format === 'Fixed';
                },
                formatter: function(value) {
                    return format.fixed(value);
                }
            },
            {
                name: 'DateTime',
                test: function(layoutItem) {
                    return layoutItem.format === 'DateTime';
                },
                formatter: function(value) {
                    return moment(value).format(this.groupDateFormatText);
                }
            }
        ],
        getFormatterByLayout: function(layoutItem) {
            var results = array.filter(this.groupFormatters, function(formatter) {
                return formatter.test(layoutItem);
            });

            if (results.length === 0) {
                results.push({
                    formatter: function(value) {
                    return value;
                }});
            }

            return lang.hitch(this, results[0].formatter);
        },
        groupFieldNames: [
            {
                name: 'PickList',
                test: function(layoutItem) {
                    return layoutItem.format === 'PickList Item';
                },
                fieldName: function(layoutItem) {
                    return layoutItem.alias.toUpperCase() + 'TEXT';
                }
            },
            {
                name: 'OwnerOrUser',
                test: function(layoutItem) {
                    return layoutItem.format === 'Owner' || layoutItem.format === 'User';
                },
                fieldName: function(layoutItem) {
                    return layoutItem.alias.toUpperCase() + 'NAME';
                }
            }
        ],
        getFieldNameByLayout: function(layoutItem) {
            // Determines what field/property name should be used in the feed for a layout item.
            // This is usually just the layout item's alias in upper case, however there are some exceptions:
            // Picklist layout items need to select the alias + 'TEXT',
            // Owner and user items need to select the alias + 'NAME'
            var results = array.filter(this.groupFieldNames, function(name) {
                return name.test(layoutItem);
            });

            if (results.length === 0) {
                results.push({
                    fieldName: function(layoutItem) {
                    return layoutItem.alias.toUpperCase();
                }});
            }

            return results[0].fieldName(layoutItem);
        }
    });
});

