define('crm/Integrations/BOE/Models/UnitOfMeasure/SData', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './Base', 'argos/Models/_SDataModelBase', 'argos/Models/Manager', 'argos/Models/Types', '../Names', 'dojo/Deferred', 'dojo/when'], function (module, exports, _declare, _lang, _Base, _SDataModelBase2, _Manager, _Types, _Names, _Deferred, _when) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Base2 = _interopRequireDefault(_Base);

  var _SDataModelBase3 = _interopRequireDefault(_SDataModelBase2);

  var _Manager2 = _interopRequireDefault(_Manager);

  var _Types2 = _interopRequireDefault(_Types);

  var _Names2 = _interopRequireDefault(_Names);

  var _Deferred2 = _interopRequireDefault(_Deferred);

  var _when2 = _interopRequireDefault(_when);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  const __class = (0, _declare2.default)('crm.Integrations.BOE.Models.UnitOfMeasure.SData', [_Base2.default, _SDataModelBase3.default], {
    id: 'unitofmeasure_sdata_model',
    createQueryModels: function createQueryModels() {
      return [{
        name: 'list',
        queryOrderBy: 'Name',
        querySelect: ['Name', 'Product/*']
      }, {
        name: 'detail',
        querySelect: ['Name', 'Product/*'],
        queryInclude: ['$permissions']
      }];
    },
    getUnitOfMeasureFromCode: function getUnitOfMeasureFromCode(uomCode, productId) {
      let queryResults;
      const def = new _Deferred2.default();
      const queryOptions = {
        where: `Product.Id eq "${productId}"`
      };
      if (uomCode && productId) {
        queryResults = this.getEntries(null, queryOptions);
        (0, _when2.default)(queryResults, entries => {
          let uof = null;
          if (entries) {
            entries.forEach(item => {
              if (item.Name === uomCode) {
                uof = item;
              }
            });
          }
          def.resolve(uof);
        }, err => {
          def.reject(err);
        });
      } else {
        def.resolve(null);
      }
      return def.promise;
    }
  }); /* Copyright 2017 Infor
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

  _Manager2.default.register(_Names2.default.UNITOFMEASURE, _Types2.default.SDATA, __class);
  _lang2.default.setObject('icboe.Models.UnitOfMeasure.SData', __class);
  exports.default = __class;
  module.exports = exports['default'];
});