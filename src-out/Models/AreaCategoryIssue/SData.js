define('crm/Models/AreaCategoryIssue/SData', ['module', 'exports', 'dojo/_base/declare', './Base', 'argos/Models/_SDataModelBase', 'argos/Models/Manager', 'argos/Models/Types', '../Names'], function (module, exports, _declare, _Base, _SDataModelBase2, _Manager, _Types, _Names) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Base2 = _interopRequireDefault(_Base);

  var _SDataModelBase3 = _interopRequireDefault(_SDataModelBase2);

  var _Manager2 = _interopRequireDefault(_Manager);

  var _Types2 = _interopRequireDefault(_Types);

  var _Names2 = _interopRequireDefault(_Names);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /* Copyright 2021 Infor
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

  function assignKeyDescriptor(values) {
    return values.filter(function (v) {
      return typeof v === 'string' && v.length > 0;
    }).map(function (v) {
      return {
        $key: v,
        $descriptor: v
      };
    });
  }

  var __class = (0, _declare2.default)('crm.Models.Integration.SData', [_Base2.default, _SDataModelBase3.default], {
    id: 'areacategoryissue_sdata_model',
    getDistinctAreas: function getDistinctAreas() {
      var request = new Sage.SData.Client.SDataServiceOperationRequest(App.getService()).setResourceKind(this.resourceKind).setOperationName('GetDistinctAreas');
      var entry = {};
      return new Promise(function (resolve, reject) {
        request.execute(entry, {
          success: function success(data) {
            var Result = data.response.Result;

            resolve(assignKeyDescriptor(Result));
          },
          failure: function failure(response) {
            reject(response);
          }
        });
      });
    },
    getDistinctAreaCategories: function getDistinctAreaCategories() {
      var area = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var request = new Sage.SData.Client.SDataServiceOperationRequest(App.getService()).setResourceKind(this.resourceKind).setOperationName('GetDistinctAreaCategories');
      var entry = {
        request: {
          area: area
        }
      };
      return new Promise(function (resolve, reject) {
        request.execute(entry, {
          success: function success(data) {
            var Result = data.response.Result;

            resolve(assignKeyDescriptor(Result));
          },
          failure: function failure(response) {
            reject(response);
          }
        });
      });
    },
    getDistinctAreaCategoryIssues: function getDistinctAreaCategoryIssues() {
      var area = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var category = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      var request = new Sage.SData.Client.SDataServiceOperationRequest(App.getService()).setResourceKind(this.resourceKind).setOperationName('GetDistinctAreaCategoryIssues');
      var entry = {
        request: {
          area: area,
          category: category
        }
      };
      return new Promise(function (resolve, reject) {
        request.execute(entry, {
          success: function success(data) {
            var Result = data.response.Result;

            resolve(assignKeyDescriptor(Result));
          },
          failure: function failure(response) {
            reject(response);
          }
        });
      });
    },
    getEntries: function getEntries(queryExpression, queryOptions) {
      var area = queryOptions.area,
          category = queryOptions.category;

      switch (queryExpression) {
        case 'area':
          return this.getDistinctAreas();
        case 'category':
          return this.getDistinctAreaCategories(area);
        case 'issue':
          return this.getDistinctAreaCategoryIssues(area, category);
        default:
          throw new Error('Invalid queryExpression');
      }
    }
  });

  _Manager2.default.register(_Names2.default.AREACATEGORYISSUE, _Types2.default.SDATA, __class);
  exports.default = __class;
  module.exports = exports['default'];
});