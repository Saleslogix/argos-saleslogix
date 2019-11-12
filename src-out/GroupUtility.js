define('crm/GroupUtility', ['module', 'exports', 'dojo/_base/lang', './Format', 'argos/Format', 'argos/I18n'], function (module, exports, _lang, _Format, _Format3, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _lang2 = _interopRequireDefault(_lang);

  var _Format2 = _interopRequireDefault(_Format);

  var _Format4 = _interopRequireDefault(_Format3);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /* Copyright 2017 Infor
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var dtFormatResource = (0, _I18n2.default)('groupUtilityDateTimeFormat');

  function _createGroupRequest(o) {
    var defaultOptions = {
      connection: App.getService(false),
      groupId: '',
      resourceKind: 'groups',
      contractName: 'system',
      queryName: 'execute',
      queryArgs: null
    };

    var options = _lang2.default.mixin(defaultOptions, o);

    var request = new Sage.SData.Client.SDataNamedQueryRequest(options.connection);
    request.setQueryName(options.queryName);
    request.setResourceKind(options.resourceKind);
    request.setContractName(options.contractName);
    request.getUri().setCollectionPredicate('\'' + options.groupId + '\'');

    for (var arg in options.queryArgs) {
      if (options.queryArgs.hasOwnProperty(arg)) {
        request.setQueryArg(arg, options.queryArgs[arg]);
      }
    }

    return request;
  }

  /**
   * @class crm.GroupUtility
   * @singleton
   */
  var __class = _lang2.default.setObject('crm.GroupUtility', /** @lends crm.GroupUtility */{
    groupDateFormatText: dtFormatResource.groupDateFormatText,
    groupDateFormatText24: dtFormatResource.groupDateFormatText24,
    /**
     * Returns an SDataNamedQueryRequest setup for groups
     * @param {Object} options Options for creating the request
     * @param {String} options.groupId The id of the group the request should execute on
     * @param {Object} [options.queryArgs] Additional query arguments to set on the request
     * @param {Object} [options.connection] SData connection. Defaults to use App.getService(false)
     *
     */
    createGroupRequest: function createGroupRequest(options) {
      var defaults = {
        queryName: 'execute',
        queryArgs: {
          language: App.getCurrentLocale()
        }
      };

      return _createGroupRequest(_lang2.default.mixin(defaults, options));
    },

    /**
     * Returns an SDataNamedQueryRequest setup for group metrics
     * @param {Object} options Options for creating the request
     * @param {String} options.groupId The id of the group the request should execute on
     * @param {Object} [options.queryArgs] Additional query arguments to set on the request
     * @param {Object} [options.connection] SData connection. Defaults to use App.getService(false)
     *
     */
    createGroupMetricRequest: function createGroupMetricRequest(options) {
      var defaults = {
        queryName: 'executeMetric',
        queryArgs: {
          language: App.getCurrentLocale()
        }
      };

      return _createGroupRequest(_lang2.default.mixin(defaults, options));
    },
    /**
     * Array of functions that will filter out group layout
     */
    groupFilters: [function groupFilter(layoutItem) {
      return layoutItem.visible;
    }],
    groupFormatters: [{
      name: 'None',
      test: function testNone(layoutItem) {
        return layoutItem.format === 'None';
      },
      formatter: function formatNone(value) {
        return value;
      }
    }, {
      name: 'Phone',
      test: function testPhone(layoutItem) {
        return layoutItem.format === 'Phone';
      },
      formatter: function formatPhone(value) {
        return _Format2.default.phone(value);
      }
    }, {
      name: 'Fixed',
      options: {
        clss: 'group-fixed'
      },
      test: function testFixed(layoutItem) {
        return layoutItem.format === 'Fixed';
      },
      formatter: function formatFixed(value) {
        return _Format2.default.fixedLocale(value, 2);
      }
    }, {
      name: 'Percent',
      options: {
        clss: 'group-percent'
      },
      test: function testPercent(layoutItem) {
        return layoutItem.format === 'Percent';
      },
      formatter: function formatPercent(value) {
        return _Format2.default.percent(value, 0);
      }
    }, {
      name: 'Integer',
      test: function testInteger(layoutItem) {
        return layoutItem.format === 'Integer';
      },
      formatter: function formatInteger(value) {
        return _Format2.default.fixedLocale(value, 0);
      }
    }, {
      name: 'Currency',
      test: function testCurrency(layoutItem) {
        return layoutItem.format === 'Currency';
      },
      options: {
        clss: 'group-currency'
      },
      formatter: function formatCurrency(value) {
        return _Format2.default.currency(value);
      }
    }, {
      name: 'DateTime',
      options: {
        useRelative: true
      },
      test: function testDate(layoutItem) {
        return layoutItem.format === 'DateTime';
      },
      formatter: function formatDate(value, formatString, formatOptions) {
        if (typeof value === 'string') {
          var dateValue = moment(value);
          if (dateValue.isValid()) {
            if (formatOptions && formatOptions.useRelative) {
              return _Format2.default.relativeDate(dateValue);
            }

            return dateValue.format(formatString);
          }
        }

        return value;
      }
    }, {
      name: 'Boolean',
      test: function testBoolean(layoutItem) {
        return layoutItem.format === 'Boolean';
      },
      formatter: function formatBoolean(value) {
        var truthy = ['T', 't', 'Y', '1', '+'];

        return truthy.indexOf(value) === -1 ? _Format4.default.noText : _Format4.default.yesText;
      }
    }],
    transformDateFormatString: function transformDateFormatString(gf, defaultFormat) {
      var groupFormat = gf;
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
      DateTime: {
        name: 'DateTime'
      },
      Date: {
        name: 'DateTime'
      },
      Time: {
        name: 'DateTime'
      },
      Boolean: {
        name: 'Boolean'
      },
      BCD: {
        name: 'Currency'
      },
      Fixed: {
        name: 'Fixed'
      },
      Float: {
        name: 'Fixed'
      },
      Integer: {
        name: 'Integer'
      },
      Smallint: {
        name: 'Integer'
      },
      Largeint: {
        name: 'Integer'
      }
    },
    getFormatterByLayout: function getFormatterByLayout(layoutItem) {
      var results = void 0;
      if (layoutItem.format && layoutItem.format !== 'None') {
        results = this.groupFormatters.filter(function (formatter) {
          return formatter.name === layoutItem.format;
        });
        if (results.length === 0) {
          results = this.groupFormatters.filter(function (formatter) {
            return formatter.name === 'None';
          });
        }
      } else {
        var fieldFormatType = this.formatTypeByField[layoutItem.fieldType];
        if (!fieldFormatType) {
          fieldFormatType = {
            name: 'None',
            formatString: ''
          };
        }
        results = this.groupFormatters.filter(function (formatter) {
          return formatter.name === fieldFormatType.name;
        });
      }
      // this means there are no formatters defined.
      if (results.length === 0) {
        results.push({
          name: 'NoFormat',
          formatString: '',
          formatter: function noFormatter(value) {
            return value;
          }
        });
      }

      var fieldFormatter = {
        name: results[0].name,
        options: results[0].options,
        formatter: results[0].formatter.bind(this)
      };

      if (fieldFormatter.name === 'DateTime') {
        fieldFormatter.formatString = this.transformDateFormatString(layoutItem.formatString, App.is24HourClock() ? this.groupDateFormatText24 : this.groupDateFormatText);
      } else {
        fieldFormatter.formatString = layoutItem.formatString;
      }
      return fieldFormatter;
    },
    getLayout: function getLayout(group) {
      var _this = this;

      var i = 0;
      var layout = group.layout.filter(function (item) {
        item.index = i++;
        return _this.groupFilters.every(function (filter) {
          return filter(item);
        });
      }, this);
      return layout;
    },
    getColumnNames: function getColumnNames(layout) {
      var extraSelectColumns = [];
      var columns = layout.map(function (item) {
        if (item.format === 'PickList Item') {
          extraSelectColumns.push(item.alias + 'TEXT');
        }

        if (item.format === 'User' || item.format === 'Owner') {
          extraSelectColumns.push(item.alias + 'NAME');
        }

        return item.alias;
      });
      return columns.concat(extraSelectColumns);
    },
    setDefaultGroupPreference: function setDefaultGroupPreference(entityName, groupName) {
      App.preferences['default-group-' + entityName] = groupName;
      App.persistPreferences();
    },
    getDefaultGroupPreference: function getDefaultGroupPreference(entityName) {
      var defaultGroupName = App.preferences['default-group-' + entityName];
      if (!defaultGroupName) {
        defaultGroupName = this.getDefaultGroupUserPreference(entityName);
      }
      return defaultGroupName;
    },
    getDefaultGroupUserPreference: function getDefaultGroupUserPreference(entityName) {
      var defaultGroupName = App.context.userOptions['DefaultGroup:' + entityName.toUpperCase()];
      if (defaultGroupName) {
        defaultGroupName = defaultGroupName.split(':')[1];
      }
      return defaultGroupName;
    },
    getDefaultGroup: function getDefaultGroup(entityName) {
      var groupList = App.preferences['groups-' + entityName];
      var defaultGroup = null;
      var defaultGroupName = null;

      defaultGroupName = this.getDefaultGroupPreference(entityName);

      if (groupList && groupList.length > 0) {
        groupList.forEach(function (group) {
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
    addToGroupPreferences: function addToGroupPreferences(items, entityName, overwrite) {
      var found = void 0;
      var groupList = this.getGroupPreferences(entityName);
      if (!overwrite && groupList && groupList.length > 0) {
        if (items && items.length > 0) {
          items.forEach(function (item) {
            found = -1;
            groupList.forEach(function (group, i) {
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
    removeGroupPreferences: function removeGroupPreferences(itemKey, entityName) {
      var found = -1;
      var groupList = this.getGroupPreferences(entityName);
      if (groupList && groupList.length > 0) {
        groupList.forEach(function (group, i) {
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
    getGroupPreferences: function getGroupPreferences(entityName) {
      var groupList = App.preferences['groups-' + entityName];
      return groupList;
    },
    groupFieldNames: [{
      name: 'PickList',
      test: function testPickList(layoutItem) {
        return layoutItem.format === 'PickList Item';
      },
      fieldName: function pickListFieldName(layoutItem) {
        return layoutItem.alias.toUpperCase() + 'TEXT';
      }
    }, {
      name: 'OwnerOrUser',
      test: function testOwnerOrUser(layoutItem) {
        return layoutItem.format === 'Owner' || layoutItem.format === 'User';
      },
      fieldName: function ownerOrUserFieldName(layoutItem) {
        return layoutItem.alias.toUpperCase() + 'NAME';
      }
    }],
    getFieldNameByLayout: function getFieldNameByLayout(layoutItem) {
      // Determines what field/property name should be used in the feed for a layout item.
      // This is usually just the layout item's alias in upper case, however there are some exceptions:
      // Picklist layout items need to select the alias + 'TEXT',
      // Owner and user items need to select the alias + 'NAME'
      var results = this.groupFieldNames.filter(function (name) {
        return name.test(layoutItem);
      });

      if (results.length === 0) {
        results.push({
          fieldName: function fieldName(item) {
            return item.alias.toUpperCase();
          }
        });
      }

      return results[0].fieldName(layoutItem);
    },
    getSelectedGroupLayoutTemplate: function getSelectedGroupLayoutTemplate(entityName) {
      return App.preferences['groups-selected-template-name' + entityName];
    },
    setSelectedGroupLayoutTemplate: function setSelectedGroupLayoutTemplate(entityName, name) {
      App.preferences['groups-selected-template-name' + entityName] = name;
      App.persistPreferences();
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Hcm91cFV0aWxpdHkuanMiXSwibmFtZXMiOlsiZHRGb3JtYXRSZXNvdXJjZSIsIl9jcmVhdGVHcm91cFJlcXVlc3QiLCJvIiwiZGVmYXVsdE9wdGlvbnMiLCJjb25uZWN0aW9uIiwiQXBwIiwiZ2V0U2VydmljZSIsImdyb3VwSWQiLCJyZXNvdXJjZUtpbmQiLCJjb250cmFjdE5hbWUiLCJxdWVyeU5hbWUiLCJxdWVyeUFyZ3MiLCJvcHRpb25zIiwibWl4aW4iLCJyZXF1ZXN0IiwiU2FnZSIsIlNEYXRhIiwiQ2xpZW50IiwiU0RhdGFOYW1lZFF1ZXJ5UmVxdWVzdCIsInNldFF1ZXJ5TmFtZSIsInNldFJlc291cmNlS2luZCIsInNldENvbnRyYWN0TmFtZSIsImdldFVyaSIsInNldENvbGxlY3Rpb25QcmVkaWNhdGUiLCJhcmciLCJoYXNPd25Qcm9wZXJ0eSIsInNldFF1ZXJ5QXJnIiwiX19jbGFzcyIsInNldE9iamVjdCIsImdyb3VwRGF0ZUZvcm1hdFRleHQiLCJncm91cERhdGVGb3JtYXRUZXh0MjQiLCJjcmVhdGVHcm91cFJlcXVlc3QiLCJkZWZhdWx0cyIsImxhbmd1YWdlIiwiZ2V0Q3VycmVudExvY2FsZSIsImNyZWF0ZUdyb3VwTWV0cmljUmVxdWVzdCIsImdyb3VwRmlsdGVycyIsImdyb3VwRmlsdGVyIiwibGF5b3V0SXRlbSIsInZpc2libGUiLCJncm91cEZvcm1hdHRlcnMiLCJuYW1lIiwidGVzdCIsInRlc3ROb25lIiwiZm9ybWF0IiwiZm9ybWF0dGVyIiwiZm9ybWF0Tm9uZSIsInZhbHVlIiwidGVzdFBob25lIiwiZm9ybWF0UGhvbmUiLCJwaG9uZSIsImNsc3MiLCJ0ZXN0Rml4ZWQiLCJmb3JtYXRGaXhlZCIsImZpeGVkTG9jYWxlIiwidGVzdFBlcmNlbnQiLCJmb3JtYXRQZXJjZW50IiwicGVyY2VudCIsInRlc3RJbnRlZ2VyIiwiZm9ybWF0SW50ZWdlciIsInRlc3RDdXJyZW5jeSIsImZvcm1hdEN1cnJlbmN5IiwiY3VycmVuY3kiLCJ1c2VSZWxhdGl2ZSIsInRlc3REYXRlIiwiZm9ybWF0RGF0ZSIsImZvcm1hdFN0cmluZyIsImZvcm1hdE9wdGlvbnMiLCJkYXRlVmFsdWUiLCJtb21lbnQiLCJpc1ZhbGlkIiwicmVsYXRpdmVEYXRlIiwidGVzdEJvb2xlYW4iLCJmb3JtYXRCb29sZWFuIiwidHJ1dGh5IiwiaW5kZXhPZiIsIm5vVGV4dCIsInllc1RleHQiLCJ0cmFuc2Zvcm1EYXRlRm9ybWF0U3RyaW5nIiwiZ2YiLCJkZWZhdWx0Rm9ybWF0IiwiZ3JvdXBGb3JtYXQiLCJyZXBsYWNlIiwiZm9ybWF0VHlwZUJ5RmllbGQiLCJEYXRlVGltZSIsIkRhdGUiLCJUaW1lIiwiQm9vbGVhbiIsIkJDRCIsIkZpeGVkIiwiRmxvYXQiLCJJbnRlZ2VyIiwiU21hbGxpbnQiLCJMYXJnZWludCIsImdldEZvcm1hdHRlckJ5TGF5b3V0IiwicmVzdWx0cyIsImZpbHRlciIsImxlbmd0aCIsImZpZWxkRm9ybWF0VHlwZSIsImZpZWxkVHlwZSIsInB1c2giLCJub0Zvcm1hdHRlciIsImZpZWxkRm9ybWF0dGVyIiwiYmluZCIsImlzMjRIb3VyQ2xvY2siLCJnZXRMYXlvdXQiLCJncm91cCIsImkiLCJsYXlvdXQiLCJpdGVtIiwiaW5kZXgiLCJldmVyeSIsImdldENvbHVtbk5hbWVzIiwiZXh0cmFTZWxlY3RDb2x1bW5zIiwiY29sdW1ucyIsIm1hcCIsImFsaWFzIiwiY29uY2F0Iiwic2V0RGVmYXVsdEdyb3VwUHJlZmVyZW5jZSIsImVudGl0eU5hbWUiLCJncm91cE5hbWUiLCJwcmVmZXJlbmNlcyIsInBlcnNpc3RQcmVmZXJlbmNlcyIsImdldERlZmF1bHRHcm91cFByZWZlcmVuY2UiLCJkZWZhdWx0R3JvdXBOYW1lIiwiZ2V0RGVmYXVsdEdyb3VwVXNlclByZWZlcmVuY2UiLCJjb250ZXh0IiwidXNlck9wdGlvbnMiLCJ0b1VwcGVyQ2FzZSIsInNwbGl0IiwiZ2V0RGVmYXVsdEdyb3VwIiwiZ3JvdXBMaXN0IiwiZGVmYXVsdEdyb3VwIiwiZm9yRWFjaCIsImFkZFRvR3JvdXBQcmVmZXJlbmNlcyIsIml0ZW1zIiwib3ZlcndyaXRlIiwiZm91bmQiLCJnZXRHcm91cFByZWZlcmVuY2VzIiwiJGtleSIsInJlbW92ZUdyb3VwUHJlZmVyZW5jZXMiLCJpdGVtS2V5Iiwic3BsaWNlIiwiZ3JvdXBGaWVsZE5hbWVzIiwidGVzdFBpY2tMaXN0IiwiZmllbGROYW1lIiwicGlja0xpc3RGaWVsZE5hbWUiLCJ0ZXN0T3duZXJPclVzZXIiLCJvd25lck9yVXNlckZpZWxkTmFtZSIsImdldEZpZWxkTmFtZUJ5TGF5b3V0IiwiZ2V0U2VsZWN0ZWRHcm91cExheW91dFRlbXBsYXRlIiwic2V0U2VsZWN0ZWRHcm91cExheW91dFRlbXBsYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQXFCQSxNQUFNQSxtQkFBbUIsb0JBQVksNEJBQVosQ0FBekI7O0FBRUEsV0FBU0MsbUJBQVQsQ0FBNkJDLENBQTdCLEVBQWdDO0FBQzlCLFFBQU1DLGlCQUFpQjtBQUNyQkMsa0JBQVlDLElBQUlDLFVBQUosQ0FBZSxLQUFmLENBRFM7QUFFckJDLGVBQVMsRUFGWTtBQUdyQkMsb0JBQWMsUUFITztBQUlyQkMsb0JBQWMsUUFKTztBQUtyQkMsaUJBQVcsU0FMVTtBQU1yQkMsaUJBQVc7QUFOVSxLQUF2Qjs7QUFTQSxRQUFNQyxVQUFVLGVBQUtDLEtBQUwsQ0FBV1YsY0FBWCxFQUEyQkQsQ0FBM0IsQ0FBaEI7O0FBRUEsUUFBTVksVUFBVSxJQUFJQyxLQUFLQyxLQUFMLENBQVdDLE1BQVgsQ0FBa0JDLHNCQUF0QixDQUE2Q04sUUFBUVIsVUFBckQsQ0FBaEI7QUFDQVUsWUFBUUssWUFBUixDQUFxQlAsUUFBUUYsU0FBN0I7QUFDQUksWUFBUU0sZUFBUixDQUF3QlIsUUFBUUosWUFBaEM7QUFDQU0sWUFBUU8sZUFBUixDQUF3QlQsUUFBUUgsWUFBaEM7QUFDQUssWUFBUVEsTUFBUixHQUFpQkMsc0JBQWpCLFFBQTRDWCxRQUFRTCxPQUFwRDs7QUFFQSxTQUFLLElBQU1pQixHQUFYLElBQWtCWixRQUFRRCxTQUExQixFQUFxQztBQUNuQyxVQUFJQyxRQUFRRCxTQUFSLENBQWtCYyxjQUFsQixDQUFpQ0QsR0FBakMsQ0FBSixFQUEyQztBQUN6Q1YsZ0JBQVFZLFdBQVIsQ0FBb0JGLEdBQXBCLEVBQXlCWixRQUFRRCxTQUFSLENBQWtCYSxHQUFsQixDQUF6QjtBQUNEO0FBQ0Y7O0FBRUQsV0FBT1YsT0FBUDtBQUNEOztBQUVEOzs7O0FBSUEsTUFBTWEsVUFBVSxlQUFLQyxTQUFMLENBQWUsa0JBQWYsRUFBbUMsOEJBQThCO0FBQy9FQyx5QkFBcUI3QixpQkFBaUI2QixtQkFEeUM7QUFFL0VDLDJCQUF1QjlCLGlCQUFpQjhCLHFCQUZ1QztBQUcvRTs7Ozs7Ozs7QUFRQUMsd0JBQW9CLFNBQVNBLGtCQUFULENBQTRCbkIsT0FBNUIsRUFBcUM7QUFDdkQsVUFBTW9CLFdBQVc7QUFDZnRCLG1CQUFXLFNBREk7QUFFZkMsbUJBQVc7QUFDVHNCLG9CQUFVNUIsSUFBSTZCLGdCQUFKO0FBREQ7QUFGSSxPQUFqQjs7QUFPQSxhQUFPakMsb0JBQW9CLGVBQUtZLEtBQUwsQ0FBV21CLFFBQVgsRUFBcUJwQixPQUFyQixDQUFwQixDQUFQO0FBQ0QsS0FwQjhFOztBQXNCL0U7Ozs7Ozs7O0FBUUF1Qiw4QkFBMEIsU0FBU0Esd0JBQVQsQ0FBa0N2QixPQUFsQyxFQUEyQztBQUNuRSxVQUFNb0IsV0FBVztBQUNmdEIsbUJBQVcsZUFESTtBQUVmQyxtQkFBVztBQUNUc0Isb0JBQVU1QixJQUFJNkIsZ0JBQUo7QUFERDtBQUZJLE9BQWpCOztBQU9BLGFBQU9qQyxvQkFBb0IsZUFBS1ksS0FBTCxDQUFXbUIsUUFBWCxFQUFxQnBCLE9BQXJCLENBQXBCLENBQVA7QUFDRCxLQXZDOEU7QUF3Qy9FOzs7QUFHQXdCLGtCQUFjLENBQ1osU0FBU0MsV0FBVCxDQUFxQkMsVUFBckIsRUFBaUM7QUFDL0IsYUFBT0EsV0FBV0MsT0FBbEI7QUFDRCxLQUhXLENBM0NpRTtBQWdEL0VDLHFCQUFpQixDQUFDO0FBQ2hCQyxZQUFNLE1BRFU7QUFFaEJDLFlBQU0sU0FBU0MsUUFBVCxDQUFrQkwsVUFBbEIsRUFBOEI7QUFDbEMsZUFBT0EsV0FBV00sTUFBWCxLQUFzQixNQUE3QjtBQUNELE9BSmU7QUFLaEJDLGlCQUFXLFNBQVNDLFVBQVQsQ0FBb0JDLEtBQXBCLEVBQTJCO0FBQ3BDLGVBQU9BLEtBQVA7QUFDRDtBQVBlLEtBQUQsRUFRZDtBQUNETixZQUFNLE9BREw7QUFFREMsWUFBTSxTQUFTTSxTQUFULENBQW1CVixVQUFuQixFQUErQjtBQUNuQyxlQUFPQSxXQUFXTSxNQUFYLEtBQXNCLE9BQTdCO0FBQ0QsT0FKQTtBQUtEQyxpQkFBVyxTQUFTSSxXQUFULENBQXFCRixLQUFyQixFQUE0QjtBQUNyQyxlQUFPLGlCQUFPRyxLQUFQLENBQWFILEtBQWIsQ0FBUDtBQUNEO0FBUEEsS0FSYyxFQWdCZDtBQUNETixZQUFNLE9BREw7QUFFRDdCLGVBQVM7QUFDUHVDLGNBQU07QUFEQyxPQUZSO0FBS0RULFlBQU0sU0FBU1UsU0FBVCxDQUFtQmQsVUFBbkIsRUFBK0I7QUFDbkMsZUFBT0EsV0FBV00sTUFBWCxLQUFzQixPQUE3QjtBQUNELE9BUEE7QUFRREMsaUJBQVcsU0FBU1EsV0FBVCxDQUFxQk4sS0FBckIsRUFBNEI7QUFDckMsZUFBTyxpQkFBT08sV0FBUCxDQUFtQlAsS0FBbkIsRUFBMEIsQ0FBMUIsQ0FBUDtBQUNEO0FBVkEsS0FoQmMsRUEyQmQ7QUFDRE4sWUFBTSxTQURMO0FBRUQ3QixlQUFTO0FBQ1B1QyxjQUFNO0FBREMsT0FGUjtBQUtEVCxZQUFNLFNBQVNhLFdBQVQsQ0FBcUJqQixVQUFyQixFQUFpQztBQUNyQyxlQUFPQSxXQUFXTSxNQUFYLEtBQXNCLFNBQTdCO0FBQ0QsT0FQQTtBQVFEQyxpQkFBVyxTQUFTVyxhQUFULENBQXVCVCxLQUF2QixFQUE4QjtBQUN2QyxlQUFPLGlCQUFPVSxPQUFQLENBQWVWLEtBQWYsRUFBc0IsQ0FBdEIsQ0FBUDtBQUNEO0FBVkEsS0EzQmMsRUFzQ2Q7QUFDRE4sWUFBTSxTQURMO0FBRURDLFlBQU0sU0FBU2dCLFdBQVQsQ0FBcUJwQixVQUFyQixFQUFpQztBQUNyQyxlQUFPQSxXQUFXTSxNQUFYLEtBQXNCLFNBQTdCO0FBQ0QsT0FKQTtBQUtEQyxpQkFBVyxTQUFTYyxhQUFULENBQXVCWixLQUF2QixFQUE4QjtBQUN2QyxlQUFPLGlCQUFPTyxXQUFQLENBQW1CUCxLQUFuQixFQUEwQixDQUExQixDQUFQO0FBQ0Q7QUFQQSxLQXRDYyxFQThDZDtBQUNETixZQUFNLFVBREw7QUFFREMsWUFBTSxTQUFTa0IsWUFBVCxDQUFzQnRCLFVBQXRCLEVBQWtDO0FBQ3RDLGVBQU9BLFdBQVdNLE1BQVgsS0FBc0IsVUFBN0I7QUFDRCxPQUpBO0FBS0RoQyxlQUFTO0FBQ1B1QyxjQUFNO0FBREMsT0FMUjtBQVFETixpQkFBVyxTQUFTZ0IsY0FBVCxDQUF3QmQsS0FBeEIsRUFBK0I7QUFDeEMsZUFBTyxpQkFBT2UsUUFBUCxDQUFnQmYsS0FBaEIsQ0FBUDtBQUNEO0FBVkEsS0E5Q2MsRUF5RGQ7QUFDRE4sWUFBTSxVQURMO0FBRUQ3QixlQUFTO0FBQ1BtRCxxQkFBYTtBQUROLE9BRlI7QUFLRHJCLFlBQU0sU0FBU3NCLFFBQVQsQ0FBa0IxQixVQUFsQixFQUE4QjtBQUNsQyxlQUFPQSxXQUFXTSxNQUFYLEtBQXNCLFVBQTdCO0FBQ0QsT0FQQTtBQVFEQyxpQkFBVyxTQUFTb0IsVUFBVCxDQUFvQmxCLEtBQXBCLEVBQTJCbUIsWUFBM0IsRUFBeUNDLGFBQXpDLEVBQXdEO0FBQ2pFLFlBQUksT0FBT3BCLEtBQVAsS0FBaUIsUUFBckIsRUFBK0I7QUFDN0IsY0FBTXFCLFlBQVlDLE9BQU90QixLQUFQLENBQWxCO0FBQ0EsY0FBSXFCLFVBQVVFLE9BQVYsRUFBSixFQUF5QjtBQUN2QixnQkFBSUgsaUJBQWlCQSxjQUFjSixXQUFuQyxFQUFnRDtBQUM5QyxxQkFBTyxpQkFBT1EsWUFBUCxDQUFvQkgsU0FBcEIsQ0FBUDtBQUNEOztBQUVELG1CQUFPQSxVQUFVeEIsTUFBVixDQUFpQnNCLFlBQWpCLENBQVA7QUFDRDtBQUNGOztBQUVELGVBQU9uQixLQUFQO0FBQ0Q7QUFyQkEsS0F6RGMsRUErRWQ7QUFDRE4sWUFBTSxTQURMO0FBRURDLFlBQU0sU0FBUzhCLFdBQVQsQ0FBcUJsQyxVQUFyQixFQUFpQztBQUNyQyxlQUFPQSxXQUFXTSxNQUFYLEtBQXNCLFNBQTdCO0FBQ0QsT0FKQTtBQUtEQyxpQkFBVyxTQUFTNEIsYUFBVCxDQUF1QjFCLEtBQXZCLEVBQThCO0FBQ3ZDLFlBQU0yQixTQUFTLENBQ2IsR0FEYSxFQUViLEdBRmEsRUFHYixHQUhhLEVBSWIsR0FKYSxFQUtiLEdBTGEsQ0FBZjs7QUFRQSxlQUFPQSxPQUFPQyxPQUFQLENBQWU1QixLQUFmLE1BQTBCLENBQUMsQ0FBM0IsR0FBK0IsaUJBQVU2QixNQUF6QyxHQUFrRCxpQkFBVUMsT0FBbkU7QUFDRDtBQWZBLEtBL0VjLENBaEQ4RDtBQWdKL0VDLCtCQUEyQixTQUFTQSx5QkFBVCxDQUFtQ0MsRUFBbkMsRUFBdUNDLGFBQXZDLEVBQXNEO0FBQy9FLFVBQUlDLGNBQWNGLEVBQWxCO0FBQ0EsVUFBSUUsV0FBSixFQUFpQjtBQUNmQSxzQkFBY0EsWUFBWUMsT0FBWixDQUFvQixJQUFwQixFQUEwQixHQUExQixDQUFkO0FBQ0FELHNCQUFjQSxZQUFZQyxPQUFaLENBQW9CLElBQXBCLEVBQTBCLEdBQTFCLENBQWQ7QUFDQUQsc0JBQWNBLFlBQVlDLE9BQVosQ0FBb0IsR0FBcEIsRUFBeUIsR0FBekIsQ0FBZDtBQUNBRCxzQkFBY0EsWUFBWUMsT0FBWixDQUFvQixJQUFwQixFQUEwQixHQUExQixDQUFkO0FBQ0FELHNCQUFjQSxZQUFZQyxPQUFaLENBQW9CLElBQXBCLEVBQTBCLEdBQTFCLENBQWQ7QUFDQUQsc0JBQWNBLFlBQVlDLE9BQVosQ0FBb0IsR0FBcEIsRUFBeUIsR0FBekIsQ0FBZDtBQUNBRCxzQkFBY0EsWUFBWUMsT0FBWixDQUFvQixNQUFwQixFQUE0QixNQUE1QixDQUFkO0FBQ0FELHNCQUFjQSxZQUFZQyxPQUFaLENBQW9CLElBQXBCLEVBQTBCLE1BQTFCLENBQWQ7QUFDQSxlQUFPRCxXQUFQO0FBQ0Q7QUFDRCxhQUFPRCxhQUFQO0FBQ0QsS0E5SjhFO0FBK0ovRUcsdUJBQW1CO0FBQ2pCQyxnQkFBVTtBQUNSM0MsY0FBTTtBQURFLE9BRE87QUFJakI0QyxZQUFNO0FBQ0o1QyxjQUFNO0FBREYsT0FKVztBQU9qQjZDLFlBQU07QUFDSjdDLGNBQU07QUFERixPQVBXO0FBVWpCOEMsZUFBUztBQUNQOUMsY0FBTTtBQURDLE9BVlE7QUFhakIrQyxXQUFLO0FBQ0gvQyxjQUFNO0FBREgsT0FiWTtBQWdCakJnRCxhQUFPO0FBQ0xoRCxjQUFNO0FBREQsT0FoQlU7QUFtQmpCaUQsYUFBTztBQUNMakQsY0FBTTtBQURELE9BbkJVO0FBc0JqQmtELGVBQVM7QUFDUGxELGNBQU07QUFEQyxPQXRCUTtBQXlCakJtRCxnQkFBVTtBQUNSbkQsY0FBTTtBQURFLE9BekJPO0FBNEJqQm9ELGdCQUFVO0FBQ1JwRCxjQUFNO0FBREU7QUE1Qk8sS0EvSjREO0FBK0wvRXFELDBCQUFzQixTQUFTQSxvQkFBVCxDQUE4QnhELFVBQTlCLEVBQTBDO0FBQzlELFVBQUl5RCxnQkFBSjtBQUNBLFVBQUl6RCxXQUFXTSxNQUFYLElBQXFCTixXQUFXTSxNQUFYLEtBQXNCLE1BQS9DLEVBQXVEO0FBQ3JEbUQsa0JBQVUsS0FBS3ZELGVBQUwsQ0FBcUJ3RCxNQUFyQixDQUE0QixVQUFDbkQsU0FBRCxFQUFlO0FBQ25ELGlCQUFRQSxVQUFVSixJQUFWLEtBQW1CSCxXQUFXTSxNQUF0QztBQUNELFNBRlMsQ0FBVjtBQUdBLFlBQUltRCxRQUFRRSxNQUFSLEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCRixvQkFBVSxLQUFLdkQsZUFBTCxDQUFxQndELE1BQXJCLENBQTRCLFVBQUNuRCxTQUFELEVBQWU7QUFDbkQsbUJBQVFBLFVBQVVKLElBQVYsS0FBbUIsTUFBM0I7QUFDRCxXQUZTLENBQVY7QUFHRDtBQUNGLE9BVEQsTUFTTztBQUNMLFlBQUl5RCxrQkFBa0IsS0FBS2YsaUJBQUwsQ0FBdUI3QyxXQUFXNkQsU0FBbEMsQ0FBdEI7QUFDQSxZQUFJLENBQUNELGVBQUwsRUFBc0I7QUFDcEJBLDRCQUFrQjtBQUNoQnpELGtCQUFNLE1BRFU7QUFFaEJ5QiwwQkFBYztBQUZFLFdBQWxCO0FBSUQ7QUFDRDZCLGtCQUFVLEtBQUt2RCxlQUFMLENBQXFCd0QsTUFBckIsQ0FBNEIsVUFBQ25ELFNBQUQsRUFBZTtBQUNuRCxpQkFBUUEsVUFBVUosSUFBVixLQUFtQnlELGdCQUFnQnpELElBQTNDO0FBQ0QsU0FGUyxDQUFWO0FBR0Q7QUFDRDtBQUNBLFVBQUlzRCxRQUFRRSxNQUFSLEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCRixnQkFBUUssSUFBUixDQUFhO0FBQ1gzRCxnQkFBTSxVQURLO0FBRVh5Qix3QkFBYyxFQUZIO0FBR1hyQixxQkFBVyxTQUFTd0QsV0FBVCxDQUFxQnRELEtBQXJCLEVBQTRCO0FBQ3JDLG1CQUFPQSxLQUFQO0FBQ0Q7QUFMVSxTQUFiO0FBT0Q7O0FBRUQsVUFBTXVELGlCQUFpQjtBQUNyQjdELGNBQU1zRCxRQUFRLENBQVIsRUFBV3RELElBREk7QUFFckI3QixpQkFBU21GLFFBQVEsQ0FBUixFQUFXbkYsT0FGQztBQUdyQmlDLG1CQUFXa0QsUUFBUSxDQUFSLEVBQVdsRCxTQUFYLENBQXFCMEQsSUFBckIsQ0FBMEIsSUFBMUI7QUFIVSxPQUF2Qjs7QUFNQSxVQUFJRCxlQUFlN0QsSUFBZixLQUF3QixVQUE1QixFQUF3QztBQUN0QzZELHVCQUFlcEMsWUFBZixHQUE4QixLQUFLWSx5QkFBTCxDQUErQnhDLFdBQVc0QixZQUExQyxFQUF5RDdELElBQUltRyxhQUFKLEVBQUQsR0FBd0IsS0FBSzFFLHFCQUE3QixHQUFxRCxLQUFLRCxtQkFBbEgsQ0FBOUI7QUFDRCxPQUZELE1BRU87QUFDTHlFLHVCQUFlcEMsWUFBZixHQUE4QjVCLFdBQVc0QixZQUF6QztBQUNEO0FBQ0QsYUFBT29DLGNBQVA7QUFDRCxLQTdPOEU7QUE4Ty9FRyxlQUFXLFNBQVNBLFNBQVQsQ0FBbUJDLEtBQW5CLEVBQTBCO0FBQUE7O0FBQ25DLFVBQUlDLElBQUksQ0FBUjtBQUNBLFVBQU1DLFNBQVNGLE1BQU1FLE1BQU4sQ0FBYVosTUFBYixDQUFvQixVQUFDYSxJQUFELEVBQVU7QUFDM0NBLGFBQUtDLEtBQUwsR0FBYUgsR0FBYjtBQUNBLGVBQU8sTUFBS3ZFLFlBQUwsQ0FBa0IyRSxLQUFsQixDQUF3QixVQUFDZixNQUFELEVBQVk7QUFDekMsaUJBQU9BLE9BQU9hLElBQVAsQ0FBUDtBQUNELFNBRk0sQ0FBUDtBQUdELE9BTGMsRUFLWixJQUxZLENBQWY7QUFNQSxhQUFPRCxNQUFQO0FBQ0QsS0F2UDhFO0FBd1AvRUksb0JBQWdCLFNBQVNBLGNBQVQsQ0FBd0JKLE1BQXhCLEVBQWdDO0FBQzlDLFVBQU1LLHFCQUFxQixFQUEzQjtBQUNBLFVBQU1DLFVBQVVOLE9BQU9PLEdBQVAsQ0FBVyxVQUFDTixJQUFELEVBQVU7QUFDbkMsWUFBSUEsS0FBS2pFLE1BQUwsS0FBZ0IsZUFBcEIsRUFBcUM7QUFDbkNxRSw2QkFBbUJiLElBQW5CLENBQTJCUyxLQUFLTyxLQUFoQztBQUNEOztBQUVELFlBQUlQLEtBQUtqRSxNQUFMLEtBQWdCLE1BQWhCLElBQTBCaUUsS0FBS2pFLE1BQUwsS0FBZ0IsT0FBOUMsRUFBdUQ7QUFDckRxRSw2QkFBbUJiLElBQW5CLENBQTJCUyxLQUFLTyxLQUFoQztBQUNEOztBQUVELGVBQU9QLEtBQUtPLEtBQVo7QUFDRCxPQVZlLENBQWhCO0FBV0EsYUFBT0YsUUFBUUcsTUFBUixDQUFlSixrQkFBZixDQUFQO0FBQ0QsS0F0UThFO0FBdVEvRUssK0JBQTJCLFNBQVNBLHlCQUFULENBQW1DQyxVQUFuQyxFQUErQ0MsU0FBL0MsRUFBMEQ7QUFDbkZuSCxVQUFJb0gsV0FBSixvQkFBaUNGLFVBQWpDLElBQWlEQyxTQUFqRDtBQUNBbkgsVUFBSXFILGtCQUFKO0FBQ0QsS0ExUThFO0FBMlEvRUMsK0JBQTJCLFNBQVNBLHlCQUFULENBQW1DSixVQUFuQyxFQUErQztBQUN4RSxVQUFJSyxtQkFBbUJ2SCxJQUFJb0gsV0FBSixvQkFBaUNGLFVBQWpDLENBQXZCO0FBQ0EsVUFBSSxDQUFDSyxnQkFBTCxFQUF1QjtBQUNyQkEsMkJBQW1CLEtBQUtDLDZCQUFMLENBQW1DTixVQUFuQyxDQUFuQjtBQUNEO0FBQ0QsYUFBT0ssZ0JBQVA7QUFDRCxLQWpSOEU7QUFrUi9FQyxtQ0FBK0IsU0FBU0EsNkJBQVQsQ0FBdUNOLFVBQXZDLEVBQW1EO0FBQ2hGLFVBQUlLLG1CQUFtQnZILElBQUl5SCxPQUFKLENBQVlDLFdBQVosbUJBQXdDUixXQUFXUyxXQUFYLEVBQXhDLENBQXZCO0FBQ0EsVUFBSUosZ0JBQUosRUFBc0I7QUFDcEJBLDJCQUFtQkEsaUJBQWlCSyxLQUFqQixDQUF1QixHQUF2QixFQUE0QixDQUE1QixDQUFuQjtBQUNEO0FBQ0QsYUFBT0wsZ0JBQVA7QUFDRCxLQXhSOEU7QUF5Ui9FTSxxQkFBaUIsU0FBU0EsZUFBVCxDQUF5QlgsVUFBekIsRUFBcUM7QUFDcEQsVUFBTVksWUFBWTlILElBQUlvSCxXQUFKLGFBQTBCRixVQUExQixDQUFsQjtBQUNBLFVBQUlhLGVBQWUsSUFBbkI7QUFDQSxVQUFJUixtQkFBbUIsSUFBdkI7O0FBRUFBLHlCQUFtQixLQUFLRCx5QkFBTCxDQUErQkosVUFBL0IsQ0FBbkI7O0FBRUEsVUFBSVksYUFBYUEsVUFBVWxDLE1BQVYsR0FBbUIsQ0FBcEMsRUFBdUM7QUFDckNrQyxrQkFBVUUsT0FBVixDQUFrQixVQUFDM0IsS0FBRCxFQUFXO0FBQzNCLGNBQUlBLE1BQU1qRSxJQUFOLEtBQWVtRixnQkFBbkIsRUFBcUM7QUFDbkNRLDJCQUFlMUIsS0FBZjtBQUNEO0FBQ0YsU0FKRDs7QUFNQSxZQUFJLENBQUMwQixZQUFMLEVBQW1CO0FBQ2pCQSx5QkFBZUQsVUFBVSxDQUFWLENBQWY7QUFDRDtBQUNELGVBQU9DLFlBQVA7QUFDRDtBQUNGLEtBNVM4RTtBQTZTL0VFLDJCQUF1QixTQUFTQSxxQkFBVCxDQUErQkMsS0FBL0IsRUFBc0NoQixVQUF0QyxFQUFrRGlCLFNBQWxELEVBQTZEO0FBQ2xGLFVBQUlDLGNBQUo7QUFDQSxVQUFJTixZQUFZLEtBQUtPLG1CQUFMLENBQXlCbkIsVUFBekIsQ0FBaEI7QUFDQSxVQUFJLENBQUNpQixTQUFELElBQWNMLFNBQWQsSUFBMkJBLFVBQVVsQyxNQUFWLEdBQW1CLENBQWxELEVBQXFEO0FBQ25ELFlBQUlzQyxTQUFTQSxNQUFNdEMsTUFBTixHQUFlLENBQTVCLEVBQStCO0FBQzdCc0MsZ0JBQU1GLE9BQU4sQ0FBYyxVQUFDeEIsSUFBRCxFQUFVO0FBQ3RCNEIsb0JBQVEsQ0FBQyxDQUFUO0FBQ0FOLHNCQUFVRSxPQUFWLENBQWtCLFVBQUMzQixLQUFELEVBQVFDLENBQVIsRUFBYztBQUM5QixrQkFBSUQsTUFBTWlDLElBQU4sS0FBZTlCLEtBQUs4QixJQUF4QixFQUE4QjtBQUM1QkYsd0JBQVE5QixDQUFSO0FBQ0Q7QUFDRixhQUpEOztBQU1BLGdCQUFJOEIsUUFBUSxDQUFDLENBQWIsRUFBZ0I7QUFDZE4sd0JBQVVNLEtBQVYsSUFBbUI1QixJQUFuQjtBQUNELGFBRkQsTUFFTztBQUNMc0Isd0JBQVUvQixJQUFWLENBQWVTLElBQWY7QUFDRDtBQUNGLFdBYkQ7QUFjRDtBQUNGLE9BakJELE1BaUJPO0FBQ0xzQixvQkFBWUksS0FBWjtBQUNEOztBQUVEbEksVUFBSW9ILFdBQUosYUFBMEJGLFVBQTFCLElBQTBDWSxTQUExQztBQUNBOUgsVUFBSXFILGtCQUFKO0FBQ0QsS0F2VThFO0FBd1UvRWtCLDRCQUF3QixTQUFTQSxzQkFBVCxDQUFnQ0MsT0FBaEMsRUFBeUN0QixVQUF6QyxFQUFxRDtBQUMzRSxVQUFJa0IsUUFBUSxDQUFDLENBQWI7QUFDQSxVQUFNTixZQUFZLEtBQUtPLG1CQUFMLENBQXlCbkIsVUFBekIsQ0FBbEI7QUFDQSxVQUFJWSxhQUFhQSxVQUFVbEMsTUFBVixHQUFtQixDQUFwQyxFQUF1QztBQUNyQ2tDLGtCQUFVRSxPQUFWLENBQWtCLFVBQUMzQixLQUFELEVBQVFDLENBQVIsRUFBYztBQUM5QixjQUFJRCxNQUFNaUMsSUFBTixLQUFlRSxPQUFuQixFQUE0QjtBQUMxQkosb0JBQVE5QixDQUFSO0FBQ0Q7QUFDRixTQUpEO0FBS0Q7O0FBRUQsVUFBSThCLFFBQVEsQ0FBQyxDQUFiLEVBQWdCO0FBQ2ROLGtCQUFVVyxNQUFWLENBQWlCTCxLQUFqQixFQUF3QixDQUF4QjtBQUNBcEksWUFBSW9ILFdBQUosYUFBMEJGLFVBQTFCLElBQTBDWSxTQUExQztBQUNBOUgsWUFBSXFILGtCQUFKO0FBQ0Q7QUFDRixLQXhWOEU7QUF5Vi9FZ0IseUJBQXFCLFNBQVNBLG1CQUFULENBQTZCbkIsVUFBN0IsRUFBeUM7QUFDNUQsVUFBTVksWUFBWTlILElBQUlvSCxXQUFKLGFBQTBCRixVQUExQixDQUFsQjtBQUNBLGFBQU9ZLFNBQVA7QUFDRCxLQTVWOEU7QUE2Vi9FWSxxQkFBaUIsQ0FBQztBQUNoQnRHLFlBQU0sVUFEVTtBQUVoQkMsWUFBTSxTQUFTc0csWUFBVCxDQUFzQjFHLFVBQXRCLEVBQWtDO0FBQ3RDLGVBQU9BLFdBQVdNLE1BQVgsS0FBc0IsZUFBN0I7QUFDRCxPQUplO0FBS2hCcUcsaUJBQVcsU0FBU0MsaUJBQVQsQ0FBMkI1RyxVQUEzQixFQUF1QztBQUNoRCxlQUFVQSxXQUFXOEUsS0FBWCxDQUFpQlksV0FBakIsRUFBVjtBQUNEO0FBUGUsS0FBRCxFQVFkO0FBQ0R2RixZQUFNLGFBREw7QUFFREMsWUFBTSxTQUFTeUcsZUFBVCxDQUF5QjdHLFVBQXpCLEVBQXFDO0FBQ3pDLGVBQU9BLFdBQVdNLE1BQVgsS0FBc0IsT0FBdEIsSUFBaUNOLFdBQVdNLE1BQVgsS0FBc0IsTUFBOUQ7QUFDRCxPQUpBO0FBS0RxRyxpQkFBVyxTQUFTRyxvQkFBVCxDQUE4QjlHLFVBQTlCLEVBQTBDO0FBQ25ELGVBQVVBLFdBQVc4RSxLQUFYLENBQWlCWSxXQUFqQixFQUFWO0FBQ0Q7QUFQQSxLQVJjLENBN1Y4RDtBQThXL0VxQiwwQkFBc0IsU0FBU0Esb0JBQVQsQ0FBOEIvRyxVQUE5QixFQUEwQztBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQU15RCxVQUFVLEtBQUtnRCxlQUFMLENBQXFCL0MsTUFBckIsQ0FBNEIsVUFBQ3ZELElBQUQsRUFBVTtBQUNwRCxlQUFPQSxLQUFLQyxJQUFMLENBQVVKLFVBQVYsQ0FBUDtBQUNELE9BRmUsQ0FBaEI7O0FBSUEsVUFBSXlELFFBQVFFLE1BQVIsS0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEJGLGdCQUFRSyxJQUFSLENBQWE7QUFDWDZDLHFCQUFXLFNBQVNBLFNBQVQsQ0FBbUJwQyxJQUFuQixFQUF5QjtBQUNsQyxtQkFBT0EsS0FBS08sS0FBTCxDQUFXWSxXQUFYLEVBQVA7QUFDRDtBQUhVLFNBQWI7QUFLRDs7QUFFRCxhQUFPakMsUUFBUSxDQUFSLEVBQVdrRCxTQUFYLENBQXFCM0csVUFBckIsQ0FBUDtBQUNELEtBaFk4RTtBQWlZL0VnSCxvQ0FBZ0MsU0FBU0EsOEJBQVQsQ0FBd0MvQixVQUF4QyxFQUFvRDtBQUNsRixhQUFPbEgsSUFBSW9ILFdBQUosbUNBQWdERixVQUFoRCxDQUFQO0FBQ0QsS0FuWThFO0FBb1kvRWdDLG9DQUFnQyxTQUFTQSw4QkFBVCxDQUF3Q2hDLFVBQXhDLEVBQW9EOUUsSUFBcEQsRUFBMEQ7QUFDeEZwQyxVQUFJb0gsV0FBSixtQ0FBZ0RGLFVBQWhELElBQWdFOUUsSUFBaEU7QUFDQXBDLFVBQUlxSCxrQkFBSjtBQUNEO0FBdlk4RSxHQUFqRSxDQUFoQjs7b0JBMFllL0YsTyIsImZpbGUiOiJHcm91cFV0aWxpdHkuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJy4vRm9ybWF0JztcclxuaW1wb3J0IHNka0Zvcm1hdCBmcm9tICdhcmdvcy9Gb3JtYXQnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5cclxuY29uc3QgZHRGb3JtYXRSZXNvdXJjZSA9IGdldFJlc291cmNlKCdncm91cFV0aWxpdHlEYXRlVGltZUZvcm1hdCcpO1xyXG5cclxuZnVuY3Rpb24gX2NyZWF0ZUdyb3VwUmVxdWVzdChvKSB7XHJcbiAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XHJcbiAgICBjb25uZWN0aW9uOiBBcHAuZ2V0U2VydmljZShmYWxzZSksXHJcbiAgICBncm91cElkOiAnJyxcclxuICAgIHJlc291cmNlS2luZDogJ2dyb3VwcycsXHJcbiAgICBjb250cmFjdE5hbWU6ICdzeXN0ZW0nLFxyXG4gICAgcXVlcnlOYW1lOiAnZXhlY3V0ZScsXHJcbiAgICBxdWVyeUFyZ3M6IG51bGwsXHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgb3B0aW9ucyA9IGxhbmcubWl4aW4oZGVmYXVsdE9wdGlvbnMsIG8pO1xyXG5cclxuICBjb25zdCByZXF1ZXN0ID0gbmV3IFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhTmFtZWRRdWVyeVJlcXVlc3Qob3B0aW9ucy5jb25uZWN0aW9uKTtcclxuICByZXF1ZXN0LnNldFF1ZXJ5TmFtZShvcHRpb25zLnF1ZXJ5TmFtZSk7XHJcbiAgcmVxdWVzdC5zZXRSZXNvdXJjZUtpbmQob3B0aW9ucy5yZXNvdXJjZUtpbmQpO1xyXG4gIHJlcXVlc3Quc2V0Q29udHJhY3ROYW1lKG9wdGlvbnMuY29udHJhY3ROYW1lKTtcclxuICByZXF1ZXN0LmdldFVyaSgpLnNldENvbGxlY3Rpb25QcmVkaWNhdGUoYCcke29wdGlvbnMuZ3JvdXBJZH0nYCk7XHJcblxyXG4gIGZvciAoY29uc3QgYXJnIGluIG9wdGlvbnMucXVlcnlBcmdzKSB7XHJcbiAgICBpZiAob3B0aW9ucy5xdWVyeUFyZ3MuaGFzT3duUHJvcGVydHkoYXJnKSkge1xyXG4gICAgICByZXF1ZXN0LnNldFF1ZXJ5QXJnKGFyZywgb3B0aW9ucy5xdWVyeUFyZ3NbYXJnXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmVxdWVzdDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uR3JvdXBVdGlsaXR5XHJcbiAqIEBzaW5nbGV0b25cclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBsYW5nLnNldE9iamVjdCgnY3JtLkdyb3VwVXRpbGl0eScsIC8qKiBAbGVuZHMgY3JtLkdyb3VwVXRpbGl0eSAqL3tcclxuICBncm91cERhdGVGb3JtYXRUZXh0OiBkdEZvcm1hdFJlc291cmNlLmdyb3VwRGF0ZUZvcm1hdFRleHQsXHJcbiAgZ3JvdXBEYXRlRm9ybWF0VGV4dDI0OiBkdEZvcm1hdFJlc291cmNlLmdyb3VwRGF0ZUZvcm1hdFRleHQyNCxcclxuICAvKipcclxuICAgKiBSZXR1cm5zIGFuIFNEYXRhTmFtZWRRdWVyeVJlcXVlc3Qgc2V0dXAgZm9yIGdyb3Vwc1xyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIE9wdGlvbnMgZm9yIGNyZWF0aW5nIHRoZSByZXF1ZXN0XHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuZ3JvdXBJZCBUaGUgaWQgb2YgdGhlIGdyb3VwIHRoZSByZXF1ZXN0IHNob3VsZCBleGVjdXRlIG9uXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLnF1ZXJ5QXJnc10gQWRkaXRpb25hbCBxdWVyeSBhcmd1bWVudHMgdG8gc2V0IG9uIHRoZSByZXF1ZXN0XHJcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLmNvbm5lY3Rpb25dIFNEYXRhIGNvbm5lY3Rpb24uIERlZmF1bHRzIHRvIHVzZSBBcHAuZ2V0U2VydmljZShmYWxzZSlcclxuICAgKlxyXG4gICAqL1xyXG4gIGNyZWF0ZUdyb3VwUmVxdWVzdDogZnVuY3Rpb24gY3JlYXRlR3JvdXBSZXF1ZXN0KG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGRlZmF1bHRzID0ge1xyXG4gICAgICBxdWVyeU5hbWU6ICdleGVjdXRlJyxcclxuICAgICAgcXVlcnlBcmdzOiB7XHJcbiAgICAgICAgbGFuZ3VhZ2U6IEFwcC5nZXRDdXJyZW50TG9jYWxlKCksXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBfY3JlYXRlR3JvdXBSZXF1ZXN0KGxhbmcubWl4aW4oZGVmYXVsdHMsIG9wdGlvbnMpKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGFuIFNEYXRhTmFtZWRRdWVyeVJlcXVlc3Qgc2V0dXAgZm9yIGdyb3VwIG1ldHJpY3NcclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBPcHRpb25zIGZvciBjcmVhdGluZyB0aGUgcmVxdWVzdFxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLmdyb3VwSWQgVGhlIGlkIG9mIHRoZSBncm91cCB0aGUgcmVxdWVzdCBzaG91bGQgZXhlY3V0ZSBvblxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5xdWVyeUFyZ3NdIEFkZGl0aW9uYWwgcXVlcnkgYXJndW1lbnRzIHRvIHNldCBvbiB0aGUgcmVxdWVzdFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5jb25uZWN0aW9uXSBTRGF0YSBjb25uZWN0aW9uLiBEZWZhdWx0cyB0byB1c2UgQXBwLmdldFNlcnZpY2UoZmFsc2UpXHJcbiAgICpcclxuICAgKi9cclxuICBjcmVhdGVHcm91cE1ldHJpY1JlcXVlc3Q6IGZ1bmN0aW9uIGNyZWF0ZUdyb3VwTWV0cmljUmVxdWVzdChvcHRpb25zKSB7XHJcbiAgICBjb25zdCBkZWZhdWx0cyA9IHtcclxuICAgICAgcXVlcnlOYW1lOiAnZXhlY3V0ZU1ldHJpYycsXHJcbiAgICAgIHF1ZXJ5QXJnczoge1xyXG4gICAgICAgIGxhbmd1YWdlOiBBcHAuZ2V0Q3VycmVudExvY2FsZSgpLFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gX2NyZWF0ZUdyb3VwUmVxdWVzdChsYW5nLm1peGluKGRlZmF1bHRzLCBvcHRpb25zKSk7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBBcnJheSBvZiBmdW5jdGlvbnMgdGhhdCB3aWxsIGZpbHRlciBvdXQgZ3JvdXAgbGF5b3V0XHJcbiAgICovXHJcbiAgZ3JvdXBGaWx0ZXJzOiBbXHJcbiAgICBmdW5jdGlvbiBncm91cEZpbHRlcihsYXlvdXRJdGVtKSB7XHJcbiAgICAgIHJldHVybiBsYXlvdXRJdGVtLnZpc2libGU7XHJcbiAgICB9LFxyXG4gIF0sXHJcbiAgZ3JvdXBGb3JtYXR0ZXJzOiBbe1xyXG4gICAgbmFtZTogJ05vbmUnLFxyXG4gICAgdGVzdDogZnVuY3Rpb24gdGVzdE5vbmUobGF5b3V0SXRlbSkge1xyXG4gICAgICByZXR1cm4gbGF5b3V0SXRlbS5mb3JtYXQgPT09ICdOb25lJztcclxuICAgIH0sXHJcbiAgICBmb3JtYXR0ZXI6IGZ1bmN0aW9uIGZvcm1hdE5vbmUodmFsdWUpIHtcclxuICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfSxcclxuICB9LCB7XHJcbiAgICBuYW1lOiAnUGhvbmUnLFxyXG4gICAgdGVzdDogZnVuY3Rpb24gdGVzdFBob25lKGxheW91dEl0ZW0pIHtcclxuICAgICAgcmV0dXJuIGxheW91dEl0ZW0uZm9ybWF0ID09PSAnUGhvbmUnO1xyXG4gICAgfSxcclxuICAgIGZvcm1hdHRlcjogZnVuY3Rpb24gZm9ybWF0UGhvbmUodmFsdWUpIHtcclxuICAgICAgcmV0dXJuIGZvcm1hdC5waG9uZSh2YWx1ZSk7XHJcbiAgICB9LFxyXG4gIH0sIHtcclxuICAgIG5hbWU6ICdGaXhlZCcsXHJcbiAgICBvcHRpb25zOiB7XHJcbiAgICAgIGNsc3M6ICdncm91cC1maXhlZCcsXHJcbiAgICB9LFxyXG4gICAgdGVzdDogZnVuY3Rpb24gdGVzdEZpeGVkKGxheW91dEl0ZW0pIHtcclxuICAgICAgcmV0dXJuIGxheW91dEl0ZW0uZm9ybWF0ID09PSAnRml4ZWQnO1xyXG4gICAgfSxcclxuICAgIGZvcm1hdHRlcjogZnVuY3Rpb24gZm9ybWF0Rml4ZWQodmFsdWUpIHtcclxuICAgICAgcmV0dXJuIGZvcm1hdC5maXhlZExvY2FsZSh2YWx1ZSwgMik7XHJcbiAgICB9LFxyXG4gIH0sIHtcclxuICAgIG5hbWU6ICdQZXJjZW50JyxcclxuICAgIG9wdGlvbnM6IHtcclxuICAgICAgY2xzczogJ2dyb3VwLXBlcmNlbnQnLFxyXG4gICAgfSxcclxuICAgIHRlc3Q6IGZ1bmN0aW9uIHRlc3RQZXJjZW50KGxheW91dEl0ZW0pIHtcclxuICAgICAgcmV0dXJuIGxheW91dEl0ZW0uZm9ybWF0ID09PSAnUGVyY2VudCc7XHJcbiAgICB9LFxyXG4gICAgZm9ybWF0dGVyOiBmdW5jdGlvbiBmb3JtYXRQZXJjZW50KHZhbHVlKSB7XHJcbiAgICAgIHJldHVybiBmb3JtYXQucGVyY2VudCh2YWx1ZSwgMCk7XHJcbiAgICB9LFxyXG4gIH0sIHtcclxuICAgIG5hbWU6ICdJbnRlZ2VyJyxcclxuICAgIHRlc3Q6IGZ1bmN0aW9uIHRlc3RJbnRlZ2VyKGxheW91dEl0ZW0pIHtcclxuICAgICAgcmV0dXJuIGxheW91dEl0ZW0uZm9ybWF0ID09PSAnSW50ZWdlcic7XHJcbiAgICB9LFxyXG4gICAgZm9ybWF0dGVyOiBmdW5jdGlvbiBmb3JtYXRJbnRlZ2VyKHZhbHVlKSB7XHJcbiAgICAgIHJldHVybiBmb3JtYXQuZml4ZWRMb2NhbGUodmFsdWUsIDApO1xyXG4gICAgfSxcclxuICB9LCB7XHJcbiAgICBuYW1lOiAnQ3VycmVuY3knLFxyXG4gICAgdGVzdDogZnVuY3Rpb24gdGVzdEN1cnJlbmN5KGxheW91dEl0ZW0pIHtcclxuICAgICAgcmV0dXJuIGxheW91dEl0ZW0uZm9ybWF0ID09PSAnQ3VycmVuY3knO1xyXG4gICAgfSxcclxuICAgIG9wdGlvbnM6IHtcclxuICAgICAgY2xzczogJ2dyb3VwLWN1cnJlbmN5JyxcclxuICAgIH0sXHJcbiAgICBmb3JtYXR0ZXI6IGZ1bmN0aW9uIGZvcm1hdEN1cnJlbmN5KHZhbHVlKSB7XHJcbiAgICAgIHJldHVybiBmb3JtYXQuY3VycmVuY3kodmFsdWUpO1xyXG4gICAgfSxcclxuICB9LCB7XHJcbiAgICBuYW1lOiAnRGF0ZVRpbWUnLFxyXG4gICAgb3B0aW9uczoge1xyXG4gICAgICB1c2VSZWxhdGl2ZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICB0ZXN0OiBmdW5jdGlvbiB0ZXN0RGF0ZShsYXlvdXRJdGVtKSB7XHJcbiAgICAgIHJldHVybiBsYXlvdXRJdGVtLmZvcm1hdCA9PT0gJ0RhdGVUaW1lJztcclxuICAgIH0sXHJcbiAgICBmb3JtYXR0ZXI6IGZ1bmN0aW9uIGZvcm1hdERhdGUodmFsdWUsIGZvcm1hdFN0cmluZywgZm9ybWF0T3B0aW9ucykge1xyXG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIGNvbnN0IGRhdGVWYWx1ZSA9IG1vbWVudCh2YWx1ZSk7XHJcbiAgICAgICAgaWYgKGRhdGVWYWx1ZS5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgIGlmIChmb3JtYXRPcHRpb25zICYmIGZvcm1hdE9wdGlvbnMudXNlUmVsYXRpdmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdC5yZWxhdGl2ZURhdGUoZGF0ZVZhbHVlKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICByZXR1cm4gZGF0ZVZhbHVlLmZvcm1hdChmb3JtYXRTdHJpbmcpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfSxcclxuICB9LCB7XHJcbiAgICBuYW1lOiAnQm9vbGVhbicsXHJcbiAgICB0ZXN0OiBmdW5jdGlvbiB0ZXN0Qm9vbGVhbihsYXlvdXRJdGVtKSB7XHJcbiAgICAgIHJldHVybiBsYXlvdXRJdGVtLmZvcm1hdCA9PT0gJ0Jvb2xlYW4nO1xyXG4gICAgfSxcclxuICAgIGZvcm1hdHRlcjogZnVuY3Rpb24gZm9ybWF0Qm9vbGVhbih2YWx1ZSkge1xyXG4gICAgICBjb25zdCB0cnV0aHkgPSBbXHJcbiAgICAgICAgJ1QnLFxyXG4gICAgICAgICd0JyxcclxuICAgICAgICAnWScsXHJcbiAgICAgICAgJzEnLFxyXG4gICAgICAgICcrJyxcclxuICAgICAgXTtcclxuXHJcbiAgICAgIHJldHVybiB0cnV0aHkuaW5kZXhPZih2YWx1ZSkgPT09IC0xID8gc2RrRm9ybWF0Lm5vVGV4dCA6IHNka0Zvcm1hdC55ZXNUZXh0O1xyXG4gICAgfSxcclxuICB9XSxcclxuICB0cmFuc2Zvcm1EYXRlRm9ybWF0U3RyaW5nOiBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRlRm9ybWF0U3RyaW5nKGdmLCBkZWZhdWx0Rm9ybWF0KSB7XHJcbiAgICBsZXQgZ3JvdXBGb3JtYXQgPSBnZjtcclxuICAgIGlmIChncm91cEZvcm1hdCkge1xyXG4gICAgICBncm91cEZvcm1hdCA9IGdyb3VwRm9ybWF0LnJlcGxhY2UoJ01NJywgJ00nKTtcclxuICAgICAgZ3JvdXBGb3JtYXQgPSBncm91cEZvcm1hdC5yZXBsYWNlKCdtbScsICdNJyk7XHJcbiAgICAgIGdyb3VwRm9ybWF0ID0gZ3JvdXBGb3JtYXQucmVwbGFjZSgnbScsICdNJyk7XHJcbiAgICAgIGdyb3VwRm9ybWF0ID0gZ3JvdXBGb3JtYXQucmVwbGFjZSgnREQnLCAnRCcpO1xyXG4gICAgICBncm91cEZvcm1hdCA9IGdyb3VwRm9ybWF0LnJlcGxhY2UoJ2RkJywgJ0QnKTtcclxuICAgICAgZ3JvdXBGb3JtYXQgPSBncm91cEZvcm1hdC5yZXBsYWNlKCdkJywgJ0QnKTtcclxuICAgICAgZ3JvdXBGb3JtYXQgPSBncm91cEZvcm1hdC5yZXBsYWNlKCd5eXl5JywgJ1lZWVknKTtcclxuICAgICAgZ3JvdXBGb3JtYXQgPSBncm91cEZvcm1hdC5yZXBsYWNlKCd5eScsICdZWVlZJyk7XHJcbiAgICAgIHJldHVybiBncm91cEZvcm1hdDtcclxuICAgIH1cclxuICAgIHJldHVybiBkZWZhdWx0Rm9ybWF0O1xyXG4gIH0sXHJcbiAgZm9ybWF0VHlwZUJ5RmllbGQ6IHtcclxuICAgIERhdGVUaW1lOiB7XHJcbiAgICAgIG5hbWU6ICdEYXRlVGltZScsXHJcbiAgICB9LFxyXG4gICAgRGF0ZToge1xyXG4gICAgICBuYW1lOiAnRGF0ZVRpbWUnLFxyXG4gICAgfSxcclxuICAgIFRpbWU6IHtcclxuICAgICAgbmFtZTogJ0RhdGVUaW1lJyxcclxuICAgIH0sXHJcbiAgICBCb29sZWFuOiB7XHJcbiAgICAgIG5hbWU6ICdCb29sZWFuJyxcclxuICAgIH0sXHJcbiAgICBCQ0Q6IHtcclxuICAgICAgbmFtZTogJ0N1cnJlbmN5JyxcclxuICAgIH0sXHJcbiAgICBGaXhlZDoge1xyXG4gICAgICBuYW1lOiAnRml4ZWQnLFxyXG4gICAgfSxcclxuICAgIEZsb2F0OiB7XHJcbiAgICAgIG5hbWU6ICdGaXhlZCcsXHJcbiAgICB9LFxyXG4gICAgSW50ZWdlcjoge1xyXG4gICAgICBuYW1lOiAnSW50ZWdlcicsXHJcbiAgICB9LFxyXG4gICAgU21hbGxpbnQ6IHtcclxuICAgICAgbmFtZTogJ0ludGVnZXInLFxyXG4gICAgfSxcclxuICAgIExhcmdlaW50OiB7XHJcbiAgICAgIG5hbWU6ICdJbnRlZ2VyJyxcclxuICAgIH0sXHJcbiAgfSxcclxuICBnZXRGb3JtYXR0ZXJCeUxheW91dDogZnVuY3Rpb24gZ2V0Rm9ybWF0dGVyQnlMYXlvdXQobGF5b3V0SXRlbSkge1xyXG4gICAgbGV0IHJlc3VsdHM7XHJcbiAgICBpZiAobGF5b3V0SXRlbS5mb3JtYXQgJiYgbGF5b3V0SXRlbS5mb3JtYXQgIT09ICdOb25lJykge1xyXG4gICAgICByZXN1bHRzID0gdGhpcy5ncm91cEZvcm1hdHRlcnMuZmlsdGVyKChmb3JtYXR0ZXIpID0+IHtcclxuICAgICAgICByZXR1cm4gKGZvcm1hdHRlci5uYW1lID09PSBsYXlvdXRJdGVtLmZvcm1hdCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAocmVzdWx0cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXN1bHRzID0gdGhpcy5ncm91cEZvcm1hdHRlcnMuZmlsdGVyKChmb3JtYXR0ZXIpID0+IHtcclxuICAgICAgICAgIHJldHVybiAoZm9ybWF0dGVyLm5hbWUgPT09ICdOb25lJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCBmaWVsZEZvcm1hdFR5cGUgPSB0aGlzLmZvcm1hdFR5cGVCeUZpZWxkW2xheW91dEl0ZW0uZmllbGRUeXBlXTtcclxuICAgICAgaWYgKCFmaWVsZEZvcm1hdFR5cGUpIHtcclxuICAgICAgICBmaWVsZEZvcm1hdFR5cGUgPSB7XHJcbiAgICAgICAgICBuYW1lOiAnTm9uZScsXHJcbiAgICAgICAgICBmb3JtYXRTdHJpbmc6ICcnLFxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgcmVzdWx0cyA9IHRoaXMuZ3JvdXBGb3JtYXR0ZXJzLmZpbHRlcigoZm9ybWF0dGVyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIChmb3JtYXR0ZXIubmFtZSA9PT0gZmllbGRGb3JtYXRUeXBlLm5hbWUpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIC8vIHRoaXMgbWVhbnMgdGhlcmUgYXJlIG5vIGZvcm1hdHRlcnMgZGVmaW5lZC5cclxuICAgIGlmIChyZXN1bHRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXN1bHRzLnB1c2goe1xyXG4gICAgICAgIG5hbWU6ICdOb0Zvcm1hdCcsXHJcbiAgICAgICAgZm9ybWF0U3RyaW5nOiAnJyxcclxuICAgICAgICBmb3JtYXR0ZXI6IGZ1bmN0aW9uIG5vRm9ybWF0dGVyKHZhbHVlKSB7XHJcbiAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZmllbGRGb3JtYXR0ZXIgPSB7XHJcbiAgICAgIG5hbWU6IHJlc3VsdHNbMF0ubmFtZSxcclxuICAgICAgb3B0aW9uczogcmVzdWx0c1swXS5vcHRpb25zLFxyXG4gICAgICBmb3JtYXR0ZXI6IHJlc3VsdHNbMF0uZm9ybWF0dGVyLmJpbmQodGhpcyksXHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChmaWVsZEZvcm1hdHRlci5uYW1lID09PSAnRGF0ZVRpbWUnKSB7XHJcbiAgICAgIGZpZWxkRm9ybWF0dGVyLmZvcm1hdFN0cmluZyA9IHRoaXMudHJhbnNmb3JtRGF0ZUZvcm1hdFN0cmluZyhsYXlvdXRJdGVtLmZvcm1hdFN0cmluZywgKEFwcC5pczI0SG91ckNsb2NrKCkpID8gdGhpcy5ncm91cERhdGVGb3JtYXRUZXh0MjQgOiB0aGlzLmdyb3VwRGF0ZUZvcm1hdFRleHQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZmllbGRGb3JtYXR0ZXIuZm9ybWF0U3RyaW5nID0gbGF5b3V0SXRlbS5mb3JtYXRTdHJpbmc7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmllbGRGb3JtYXR0ZXI7XHJcbiAgfSxcclxuICBnZXRMYXlvdXQ6IGZ1bmN0aW9uIGdldExheW91dChncm91cCkge1xyXG4gICAgbGV0IGkgPSAwO1xyXG4gICAgY29uc3QgbGF5b3V0ID0gZ3JvdXAubGF5b3V0LmZpbHRlcigoaXRlbSkgPT4ge1xyXG4gICAgICBpdGVtLmluZGV4ID0gaSsrO1xyXG4gICAgICByZXR1cm4gdGhpcy5ncm91cEZpbHRlcnMuZXZlcnkoKGZpbHRlcikgPT4ge1xyXG4gICAgICAgIHJldHVybiBmaWx0ZXIoaXRlbSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSwgdGhpcyk7XHJcbiAgICByZXR1cm4gbGF5b3V0O1xyXG4gIH0sXHJcbiAgZ2V0Q29sdW1uTmFtZXM6IGZ1bmN0aW9uIGdldENvbHVtbk5hbWVzKGxheW91dCkge1xyXG4gICAgY29uc3QgZXh0cmFTZWxlY3RDb2x1bW5zID0gW107XHJcbiAgICBjb25zdCBjb2x1bW5zID0gbGF5b3V0Lm1hcCgoaXRlbSkgPT4ge1xyXG4gICAgICBpZiAoaXRlbS5mb3JtYXQgPT09ICdQaWNrTGlzdCBJdGVtJykge1xyXG4gICAgICAgIGV4dHJhU2VsZWN0Q29sdW1ucy5wdXNoKGAke2l0ZW0uYWxpYXN9VEVYVGApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaXRlbS5mb3JtYXQgPT09ICdVc2VyJyB8fCBpdGVtLmZvcm1hdCA9PT0gJ093bmVyJykge1xyXG4gICAgICAgIGV4dHJhU2VsZWN0Q29sdW1ucy5wdXNoKGAke2l0ZW0uYWxpYXN9TkFNRWApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gaXRlbS5hbGlhcztcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGNvbHVtbnMuY29uY2F0KGV4dHJhU2VsZWN0Q29sdW1ucyk7XHJcbiAgfSxcclxuICBzZXREZWZhdWx0R3JvdXBQcmVmZXJlbmNlOiBmdW5jdGlvbiBzZXREZWZhdWx0R3JvdXBQcmVmZXJlbmNlKGVudGl0eU5hbWUsIGdyb3VwTmFtZSkge1xyXG4gICAgQXBwLnByZWZlcmVuY2VzW2BkZWZhdWx0LWdyb3VwLSR7ZW50aXR5TmFtZX1gXSA9IGdyb3VwTmFtZTtcclxuICAgIEFwcC5wZXJzaXN0UHJlZmVyZW5jZXMoKTtcclxuICB9LFxyXG4gIGdldERlZmF1bHRHcm91cFByZWZlcmVuY2U6IGZ1bmN0aW9uIGdldERlZmF1bHRHcm91cFByZWZlcmVuY2UoZW50aXR5TmFtZSkge1xyXG4gICAgbGV0IGRlZmF1bHRHcm91cE5hbWUgPSBBcHAucHJlZmVyZW5jZXNbYGRlZmF1bHQtZ3JvdXAtJHtlbnRpdHlOYW1lfWBdO1xyXG4gICAgaWYgKCFkZWZhdWx0R3JvdXBOYW1lKSB7XHJcbiAgICAgIGRlZmF1bHRHcm91cE5hbWUgPSB0aGlzLmdldERlZmF1bHRHcm91cFVzZXJQcmVmZXJlbmNlKGVudGl0eU5hbWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRlZmF1bHRHcm91cE5hbWU7XHJcbiAgfSxcclxuICBnZXREZWZhdWx0R3JvdXBVc2VyUHJlZmVyZW5jZTogZnVuY3Rpb24gZ2V0RGVmYXVsdEdyb3VwVXNlclByZWZlcmVuY2UoZW50aXR5TmFtZSkge1xyXG4gICAgbGV0IGRlZmF1bHRHcm91cE5hbWUgPSBBcHAuY29udGV4dC51c2VyT3B0aW9uc1tgRGVmYXVsdEdyb3VwOiR7ZW50aXR5TmFtZS50b1VwcGVyQ2FzZSgpfWBdO1xyXG4gICAgaWYgKGRlZmF1bHRHcm91cE5hbWUpIHtcclxuICAgICAgZGVmYXVsdEdyb3VwTmFtZSA9IGRlZmF1bHRHcm91cE5hbWUuc3BsaXQoJzonKVsxXTtcclxuICAgIH1cclxuICAgIHJldHVybiBkZWZhdWx0R3JvdXBOYW1lO1xyXG4gIH0sXHJcbiAgZ2V0RGVmYXVsdEdyb3VwOiBmdW5jdGlvbiBnZXREZWZhdWx0R3JvdXAoZW50aXR5TmFtZSkge1xyXG4gICAgY29uc3QgZ3JvdXBMaXN0ID0gQXBwLnByZWZlcmVuY2VzW2Bncm91cHMtJHtlbnRpdHlOYW1lfWBdO1xyXG4gICAgbGV0IGRlZmF1bHRHcm91cCA9IG51bGw7XHJcbiAgICBsZXQgZGVmYXVsdEdyb3VwTmFtZSA9IG51bGw7XHJcblxyXG4gICAgZGVmYXVsdEdyb3VwTmFtZSA9IHRoaXMuZ2V0RGVmYXVsdEdyb3VwUHJlZmVyZW5jZShlbnRpdHlOYW1lKTtcclxuXHJcbiAgICBpZiAoZ3JvdXBMaXN0ICYmIGdyb3VwTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGdyb3VwTGlzdC5mb3JFYWNoKChncm91cCkgPT4ge1xyXG4gICAgICAgIGlmIChncm91cC5uYW1lID09PSBkZWZhdWx0R3JvdXBOYW1lKSB7XHJcbiAgICAgICAgICBkZWZhdWx0R3JvdXAgPSBncm91cDtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKCFkZWZhdWx0R3JvdXApIHtcclxuICAgICAgICBkZWZhdWx0R3JvdXAgPSBncm91cExpc3RbMF07XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGRlZmF1bHRHcm91cDtcclxuICAgIH1cclxuICB9LFxyXG4gIGFkZFRvR3JvdXBQcmVmZXJlbmNlczogZnVuY3Rpb24gYWRkVG9Hcm91cFByZWZlcmVuY2VzKGl0ZW1zLCBlbnRpdHlOYW1lLCBvdmVyd3JpdGUpIHtcclxuICAgIGxldCBmb3VuZDtcclxuICAgIGxldCBncm91cExpc3QgPSB0aGlzLmdldEdyb3VwUHJlZmVyZW5jZXMoZW50aXR5TmFtZSk7XHJcbiAgICBpZiAoIW92ZXJ3cml0ZSAmJiBncm91cExpc3QgJiYgZ3JvdXBMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgaWYgKGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICBmb3VuZCA9IC0xO1xyXG4gICAgICAgICAgZ3JvdXBMaXN0LmZvckVhY2goKGdyb3VwLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChncm91cC4ka2V5ID09PSBpdGVtLiRrZXkpIHtcclxuICAgICAgICAgICAgICBmb3VuZCA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIGlmIChmb3VuZCA+IC0xKSB7XHJcbiAgICAgICAgICAgIGdyb3VwTGlzdFtmb3VuZF0gPSBpdGVtO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ3JvdXBMaXN0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGdyb3VwTGlzdCA9IGl0ZW1zO1xyXG4gICAgfVxyXG5cclxuICAgIEFwcC5wcmVmZXJlbmNlc1tgZ3JvdXBzLSR7ZW50aXR5TmFtZX1gXSA9IGdyb3VwTGlzdDtcclxuICAgIEFwcC5wZXJzaXN0UHJlZmVyZW5jZXMoKTtcclxuICB9LFxyXG4gIHJlbW92ZUdyb3VwUHJlZmVyZW5jZXM6IGZ1bmN0aW9uIHJlbW92ZUdyb3VwUHJlZmVyZW5jZXMoaXRlbUtleSwgZW50aXR5TmFtZSkge1xyXG4gICAgbGV0IGZvdW5kID0gLTE7XHJcbiAgICBjb25zdCBncm91cExpc3QgPSB0aGlzLmdldEdyb3VwUHJlZmVyZW5jZXMoZW50aXR5TmFtZSk7XHJcbiAgICBpZiAoZ3JvdXBMaXN0ICYmIGdyb3VwTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGdyb3VwTGlzdC5mb3JFYWNoKChncm91cCwgaSkgPT4ge1xyXG4gICAgICAgIGlmIChncm91cC4ka2V5ID09PSBpdGVtS2V5KSB7XHJcbiAgICAgICAgICBmb3VuZCA9IGk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZm91bmQgPiAtMSkge1xyXG4gICAgICBncm91cExpc3Quc3BsaWNlKGZvdW5kLCAxKTtcclxuICAgICAgQXBwLnByZWZlcmVuY2VzW2Bncm91cHMtJHtlbnRpdHlOYW1lfWBdID0gZ3JvdXBMaXN0O1xyXG4gICAgICBBcHAucGVyc2lzdFByZWZlcmVuY2VzKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBnZXRHcm91cFByZWZlcmVuY2VzOiBmdW5jdGlvbiBnZXRHcm91cFByZWZlcmVuY2VzKGVudGl0eU5hbWUpIHtcclxuICAgIGNvbnN0IGdyb3VwTGlzdCA9IEFwcC5wcmVmZXJlbmNlc1tgZ3JvdXBzLSR7ZW50aXR5TmFtZX1gXTtcclxuICAgIHJldHVybiBncm91cExpc3Q7XHJcbiAgfSxcclxuICBncm91cEZpZWxkTmFtZXM6IFt7XHJcbiAgICBuYW1lOiAnUGlja0xpc3QnLFxyXG4gICAgdGVzdDogZnVuY3Rpb24gdGVzdFBpY2tMaXN0KGxheW91dEl0ZW0pIHtcclxuICAgICAgcmV0dXJuIGxheW91dEl0ZW0uZm9ybWF0ID09PSAnUGlja0xpc3QgSXRlbSc7XHJcbiAgICB9LFxyXG4gICAgZmllbGROYW1lOiBmdW5jdGlvbiBwaWNrTGlzdEZpZWxkTmFtZShsYXlvdXRJdGVtKSB7XHJcbiAgICAgIHJldHVybiBgJHtsYXlvdXRJdGVtLmFsaWFzLnRvVXBwZXJDYXNlKCl9VEVYVGA7XHJcbiAgICB9LFxyXG4gIH0sIHtcclxuICAgIG5hbWU6ICdPd25lck9yVXNlcicsXHJcbiAgICB0ZXN0OiBmdW5jdGlvbiB0ZXN0T3duZXJPclVzZXIobGF5b3V0SXRlbSkge1xyXG4gICAgICByZXR1cm4gbGF5b3V0SXRlbS5mb3JtYXQgPT09ICdPd25lcicgfHwgbGF5b3V0SXRlbS5mb3JtYXQgPT09ICdVc2VyJztcclxuICAgIH0sXHJcbiAgICBmaWVsZE5hbWU6IGZ1bmN0aW9uIG93bmVyT3JVc2VyRmllbGROYW1lKGxheW91dEl0ZW0pIHtcclxuICAgICAgcmV0dXJuIGAke2xheW91dEl0ZW0uYWxpYXMudG9VcHBlckNhc2UoKX1OQU1FYDtcclxuICAgIH0sXHJcbiAgfV0sXHJcbiAgZ2V0RmllbGROYW1lQnlMYXlvdXQ6IGZ1bmN0aW9uIGdldEZpZWxkTmFtZUJ5TGF5b3V0KGxheW91dEl0ZW0pIHtcclxuICAgIC8vIERldGVybWluZXMgd2hhdCBmaWVsZC9wcm9wZXJ0eSBuYW1lIHNob3VsZCBiZSB1c2VkIGluIHRoZSBmZWVkIGZvciBhIGxheW91dCBpdGVtLlxyXG4gICAgLy8gVGhpcyBpcyB1c3VhbGx5IGp1c3QgdGhlIGxheW91dCBpdGVtJ3MgYWxpYXMgaW4gdXBwZXIgY2FzZSwgaG93ZXZlciB0aGVyZSBhcmUgc29tZSBleGNlcHRpb25zOlxyXG4gICAgLy8gUGlja2xpc3QgbGF5b3V0IGl0ZW1zIG5lZWQgdG8gc2VsZWN0IHRoZSBhbGlhcyArICdURVhUJyxcclxuICAgIC8vIE93bmVyIGFuZCB1c2VyIGl0ZW1zIG5lZWQgdG8gc2VsZWN0IHRoZSBhbGlhcyArICdOQU1FJ1xyXG4gICAgY29uc3QgcmVzdWx0cyA9IHRoaXMuZ3JvdXBGaWVsZE5hbWVzLmZpbHRlcigobmFtZSkgPT4ge1xyXG4gICAgICByZXR1cm4gbmFtZS50ZXN0KGxheW91dEl0ZW0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHJlc3VsdHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJlc3VsdHMucHVzaCh7XHJcbiAgICAgICAgZmllbGROYW1lOiBmdW5jdGlvbiBmaWVsZE5hbWUoaXRlbSkge1xyXG4gICAgICAgICAgcmV0dXJuIGl0ZW0uYWxpYXMudG9VcHBlckNhc2UoKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0c1swXS5maWVsZE5hbWUobGF5b3V0SXRlbSk7XHJcbiAgfSxcclxuICBnZXRTZWxlY3RlZEdyb3VwTGF5b3V0VGVtcGxhdGU6IGZ1bmN0aW9uIGdldFNlbGVjdGVkR3JvdXBMYXlvdXRUZW1wbGF0ZShlbnRpdHlOYW1lKSB7XHJcbiAgICByZXR1cm4gQXBwLnByZWZlcmVuY2VzW2Bncm91cHMtc2VsZWN0ZWQtdGVtcGxhdGUtbmFtZSR7ZW50aXR5TmFtZX1gXTtcclxuICB9LFxyXG4gIHNldFNlbGVjdGVkR3JvdXBMYXlvdXRUZW1wbGF0ZTogZnVuY3Rpb24gc2V0U2VsZWN0ZWRHcm91cExheW91dFRlbXBsYXRlKGVudGl0eU5hbWUsIG5hbWUpIHtcclxuICAgIEFwcC5wcmVmZXJlbmNlc1tgZ3JvdXBzLXNlbGVjdGVkLXRlbXBsYXRlLW5hbWUke2VudGl0eU5hbWV9YF0gPSBuYW1lO1xyXG4gICAgQXBwLnBlcnNpc3RQcmVmZXJlbmNlcygpO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19