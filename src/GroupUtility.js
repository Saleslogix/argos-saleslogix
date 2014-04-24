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
    'dojo/_base/lang'
], function(
    lang
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
        }
    });
});

