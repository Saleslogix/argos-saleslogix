define("crm/Integrations/BOE/Models/UnitOfMeasure/SData", ["exports", "dojo/_base/declare", "dojo/_base/lang", "./Base", "argos/Models/_SDataModelBase", "argos/Models/Manager", "argos/Models/Types", "../Names", "dojo/Deferred", "dojo/when"], function (_exports, _declare, _lang, _Base, _SDataModelBase2, _Manager, _Types, _Names, _Deferred, _when) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _Base = _interopRequireDefault(_Base);
  _SDataModelBase2 = _interopRequireDefault(_SDataModelBase2);
  _Manager = _interopRequireDefault(_Manager);
  _Types = _interopRequireDefault(_Types);
  _Names = _interopRequireDefault(_Names);
  _Deferred = _interopRequireDefault(_Deferred);
  _when = _interopRequireDefault(_when);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
  var __class = (0, _declare["default"])('crm.Integrations.BOE.Models.UnitOfMeasure.SData', [_Base["default"], _SDataModelBase2["default"]], {
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
      var queryResults;
      var def = new _Deferred["default"]();
      var queryOptions = {
        where: "Product.Id eq \"".concat(productId, "\"")
      };

      if (uomCode && productId) {
        queryResults = this.getEntries(null, queryOptions);
        (0, _when["default"])(queryResults, function (entries) {
          var uof = null;

          if (entries) {
            entries.forEach(function (item) {
              if (item.Name === uomCode) {
                uof = item;
              }
            });
          }

          def.resolve(uof);
        }, function (err) {
          def.reject(err);
        });
      } else {
        def.resolve(null);
      }

      return def.promise;
    }
  });

  _Manager["default"].register(_Names["default"].UNITOFMEASURE, _Types["default"].SDATA, __class);

  _lang["default"].setObject('icboe.Models.UnitOfMeasure.SData', __class);

  var _default = __class;
  _exports["default"] = _default;
});