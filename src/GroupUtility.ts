/*
 * Copyright (c) 1997-2014, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class crm.GroupUtility
 *
 * Saleslogix group based utils
 *
 * @singleton
 *
 */
define('crm/GroupUtility', [
    'dojo/_base/lang',
    'dojo/_base/array',
    './Format',
    'argos/Format',
    'moment'
], function(
    lang,
    array,
    format,
    sdkFormat,
    moment
) {
    var _createGroupRequest,
        __class;

    _createGroupRequest = function(options) {
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
            if (options.queryArgs.hasOwnProperty(arg)) {
                request.setQueryArg(arg, options.queryArgs[arg]);
            }
        }

        return request;
    };

    __class = lang.setObject('crm.GroupUtility', {
        groupDateFormatText: 'M/D/YYYY h:mm:ss a',
        /**
         * Returns an SDataNamedQueryRequest setup for groups
         * @param {Object} options Options for creating the request
         * @param {String} options.groupId The id of the group the request should execute on
         * @param {Object} [options.queryArgs] Additional query arguments to set on the request
         * @param {Object} [options.connection] SData connection. Defaults to use App.getService(false)
         *
         */
        createGroupRequest: function(options) {
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
        createGroupMetricRequest: function(options) {
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
                name: 'None',
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
                options: {
                    clss: 'group-fixed'
                },
                test: function(layoutItem) {
                    return layoutItem.format === 'Fixed';
                },
                formatter: function(value) {
                    return format.fixedLocale(value, 2);
                }
            },
            {
                name: 'Percent',
                options: {
                    clss: 'group-percent'
                },
                test: function(layoutItem) {
                    return layoutItem.format === 'Percent';
                },
                formatter: function(value) {
                    return format.percent(value, 0);
                }
            },
            {
                name: 'Integer',
                test: function(layoutItem) {
                    return layoutItem.format === 'Integer';
                },
                formatter: function(value) {
                    return format.fixedLocale(value, 0);
                }
            },
            {
                name: 'Currency',
                test: function(layoutItem) {
                    return layoutItem.format === 'Currency';
                },
                options: {
                    clss: 'group-currency'
                },
                formatter: function(value) {
                    return format.currency(value);
                }
            },
            {
                name: 'DateTime',
                options: {
                    useRelative: true
                },
                test: function(layoutItem) {
                    return layoutItem.format === 'DateTime';
                },
                formatter: function(value, formatString, formatOptions) {
                    var dateValue;

                    if (typeof value === 'string') {
                        dateValue = moment(value);
                        if (dateValue.isValid()) {
                            if (formatOptions && formatOptions.useRelative) {
                                return format.relativeDate(dateValue);
                            }

                            return dateValue.format(formatString);
                        }
                    }

                    return value;
                }
            },
            {
                name: 'Boolean',
                test: function(layoutItem) {
                    return layoutItem.format === 'Boolean';
                },
                formatter: function(value) {
                    var truthy = [
                        'T',
                        't',
                        'Y',
                        '1',
                        '+'
                    ];

                    return array.indexOf(truthy, value) === -1 ? sdkFormat.noText : sdkFormat.yesText;
                }
            }
        ],
        transformDateFormatString: function(groupFormat, defaultFormat) {
            if (groupFormat) {
                groupFormat = groupFormat.replace('MM', 'M');
                groupFormat = groupFormat.replace('mm', 'M');
                groupFormat = groupFormat.replace('m', 'M');
                groupFormat = groupFormat.replace('DD', 'D');
                groupFormat = groupFormat.replace('dd', 'D');
                groupFormat = groupFormat.replace('d', 'D');
                groupFormat = groupFormat.replace('yyyy', 'YYYY');
                groupFormat = groupFormat.replace('yy', 'YYYY');
                return groupFormat;
            }
            return defaultFormat;
        },
        formatTypeByField: {
            'DateTime': { name: 'DateTime'},
            'Date': { name: 'DateTime'},
            'Time': { name: 'DateTime'},
            'Boolean': {name:'Boolean'},
            'BCD': { name: 'Currency'},
            'Fixed': { name: 'Fixed' },
            'Float': { name: 'Fixed' },
            'Integer': { name: 'Integer' },
            'Smallint': { name: 'Integer' },
            'Largeint': { name: 'Integer' }
        },
        getFormatterByLayout: function(layoutItem) {
            var fieldFormatter, fieldFormatType, results;

            if (layoutItem.format && layoutItem.format !== 'None') {
                results = array.filter(this.groupFormatters, function(formatter) {
                    return (formatter.name === layoutItem.format);
                });
                if (results.length === 0) {
                    results = array.filter(this.groupFormatters, function(formatter) {
                        return (formatter.name === 'None');
                    });
                }
            }
            else {
                fieldFormatType = this.formatTypeByField[layoutItem.fieldType];
                if (!fieldFormatType) {
                    fieldFormatType = { name: 'None', formatString: '' };
                }
                results = array.filter(this.groupFormatters, function(formatter) {
                    return (formatter.name === fieldFormatType.name);
                });
            }
            //this means there are no formatters defined.
            if (results.length === 0) {
                results.push({
                    name: 'NoFormat',
                    formatString: '',
                    formatter: function(value) {
                        return value;
                    }
                });
            }

            fieldFormatter = {
                name: results[0]['name'],
                options: results[0]['options'],
                formatter: results[0]['formatter'].bind(this)
            };

            if (fieldFormatter.name === 'DateTime') {
                fieldFormatter.formatString = this.transformDateFormatString(layoutItem.formatString, this.groupDateFormatText);
            } else {
                fieldFormatter.formatString = layoutItem.formatString;
            }
            return fieldFormatter;
        },
        getLayout: function(group) {
            var layout,
                i;

            i = 0;
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
        setDefaultGroupPreference: function(entityName, groupName) {
            App.preferences['default-group-' + entityName] = groupName;
            App.persistPreferences();
        },
        getDefaultGroupPreference: function(entityName) {
            var defaultGroupName =  App.preferences['default-group-' + entityName];
            if (!defaultGroupName) {
                defaultGroupName = this.getDefaultGroupUserPreference(entityName);
            }
            return defaultGroupName;
        },
        getDefaultGroupUserPreference: function(entityName) {
            var defaultGroupName = App.context.userOptions['DefaultGroup:' + entityName.toUpperCase()];
            if (defaultGroupName) {
                defaultGroupName = defaultGroupName.split(':')[1];
            }
            return defaultGroupName;
        },
        getDefaultGroup: function(entityName) {
            var groupList,
                defaultGroup,
                defaultGroupName;

            groupList = App.preferences['groups-' + entityName];
            defaultGroup = null;
            defaultGroupName = null;

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
            } else {
                groupList = items;
            }

            App.preferences['groups-' + entityName] = groupList;
            App.persistPreferences();
        },
        removeGroupPreferences: function(itemKey, entityName) {
            var found, groupList;
            found = -1;
            groupList = this.getGroupPreferences(entityName);
            if (groupList && groupList.length > 0) {
                array.forEach(groupList, function(group, i) {
                    if (group.$key === itemKey) {
                        found = i;
                    }
                });
            }

            if (found > -1) {
                groupList.splice(found, 1);
                App.preferences['groups-' + entityName] = groupList;
                App.persistPreferences();
            }
        },
        getGroupPreferences: function(entityName) {
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
        },
        getSelectedGroupLayoutTemplate: function(entityName) {
            return App.preferences['groups-selected-template-name' + entityName];
        },
        setSelectedGroupLayoutTemplate: function(entityName, name) {

            App.preferences['groups-selected-template-name' + entityName] = name;
            App.persistPreferences();
        }
    });

    lang.setObject('Mobile.SalesLogix.GroupUtility', __class);
    return __class;
});

