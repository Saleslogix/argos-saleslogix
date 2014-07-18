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
        getLayout: function(group) {
            var layout;
            var i = 0;
            layout = array.filter(group.layout, function(item) {
                item.index = i++;
                return array.every(this.groupFilters, function(filter) {
                    return filter(item);
                }, this);
            }, this);
            return layout;
        },
        getColumnNames: function(layout) {
            var columns, extraSelectColumns;
            extraSelectColumns = [];
            columns = array.map(layout, function(layout) {
                if (layout.format === 'PickList Item') {
                    extraSelectColumns.push(layout.alias + 'TEXT');
                }

                if (layout.format === 'User' || layout.format === 'Owner') {
                    extraSelectColumns.push(layout.alias + 'NAME');
                }

                return layout.alias;
            });
            return columns.concat(extraSelectColumns);
        },
        setDefaultGroupPreference: function(entityName, groupName){
            App.preferences['default-group-' + entityName] = groupName;
            App.persistPreferences();
        },
        getDefaultGroupPreference: function(entityName){
            var defaultGroupName =  App.preferences['default-group-' + entityName];
            if (!defaultGroupName) {
                defaultGroupName = this.getDefaultGroupUserPreference(entityName);
            }
            return defaultGroupName;
        },
        getDefaultGroupUserPreference: function(entityName){
           var defaultGroupName = App.context.userOptions['DefaultGroup:' + entityName.toUpperCase()];
            if (defaultGroupName) {
                defaultGroupName = defaultGroupName.split(':')[1];
            }
            return defaultGroupName;
        },
        getDefaultGroup: function(entityName) {
            var groupList = App.preferences['groups-' + entityName];
            var defaultGroup = null;
            var defaultGroupName = null;

            defaultGroupName = this.getDefaultGroupPreference(entityName);

            if (groupList && groupList.length > 0) {
                array.forEach(groupList, function(group) {
                    if (group.name === defaultGroupName) {
                        defaultGroup = group;
                    }
                });

                if (!defaultGroup) {
                    defaultGroup = groupList[0];
                }
                return defaultGroup;
            }
        },
        addToGroupPreferences: function(items, entityName, overwrite) {
            var found, groupList;
            groupList = this.getGroupPreferences(entityName);
            if (!overwrite && groupList && groupList.length > 0) {
                 if (items && items.length > 0) {
                     array.forEach(items, function(item) {
                         found = -1;
                         array.forEach(groupList, function(group, i) {
                              if (group.$key === item.$key) {
                                  found = i;
                              }

                         });

                         if (found > -1) {
                             groupList[found] = item;
                         } else {
                             groupList.push(item);
                         }
                     });
                 }
             }
             else{
                 groupList = items;
             }
             App.preferences['groups-' + entityName] = groupList;
             App.persistPreferences();
        },
        getGroupPreferences: function(entityName){
            var groupList = App.preferences['groups-' + entityName];
            return groupList;
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

