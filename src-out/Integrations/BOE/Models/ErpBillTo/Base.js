define('crm/Integrations/BOE/Models/ErpBillTo/Base', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/Models/_ModelBase', '../Names', 'argos/I18n'], function (module, exports, _declare, _lang, _ModelBase2, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _ModelBase3 = _interopRequireDefault(_ModelBase2);

  var _Names2 = _interopRequireDefault(_Names);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('erpBillToModel');
  // const accountResource = getResource('accountModel');
  // const shiptoResource = getResource('erpShipToModel');
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

  var quoteResource = (0, _I18n2.default)('quoteModel');
  var salesorderResource = (0, _I18n2.default)('salesOrderModel');
  var invoiceResource = (0, _I18n2.default)('erpInvoiceModel');
  var returnResource = (0, _I18n2.default)('returnModel');
  var syncresultResource = (0, _I18n2.default)('syncResultModel');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.ErpBillTo.Base', [_ModelBase3.default], {
    contractName: 'dynamic',
    resourceKind: 'erpBillTos',
    entityName: 'ERPBillTo',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    modelName: _Names2.default.ERPBILLTO,
    iconClass: '',
    detailViewId: 'erpbillto_detail',
    listViewId: 'erpbillto_list',
    editViewId: '',
    createPicklists: function createPicklists() {
      return this.picklists || (this.picklists = [{
        name: 'SyncStatus',
        property: 'SyncStatus'
      }]);
    },
    createRelationships: function createRelationships() {
      var rel = this.relationships || (this.relationships = [
      // TODO: Update with ManyToMany relationship when available in core.
      // {
      //   name: 'Account',
      //   displayName: accountResource.entityDisplayName,
      //   type: 'ManyToMany',
      //   relatedEntity: 'Account',
      //   relatedProperty: 'ErpBillToAccounts.ErpBillTo',
      //   relatedPropertyType: 'object',
      // }, {
      //   name: 'ShipTo',
      //   displayName: shiptoResource.entityDisplayName,
      //   type: 'ManyToMany',
      //   relatedEntity: 'ERPShipTo',
      //   relatedProperty: 'ErpBillToShipTos.ErpBillTo',
      //   relatedPropertyType: 'object',
      // },
      {
        name: 'Quote',
        displayName: quoteResource.entityDisplayName,
        type: 'OneToMany',
        relatedEntity: 'Quote',
        relatedProperty: 'BillTo',
        relatedPropertyType: 'object'
      }, {
        name: 'SalesOrder',
        displayName: salesorderResource.entityDisplayName,
        type: 'OneToMany',
        relatedEntity: 'SalesOrder',
        relatedProperty: 'ErpBillTo',
        relatedPropertyType: 'object'
      }, {
        name: 'Invoice',
        displayName: invoiceResource.entityDisplayName,
        type: 'ManyToOne',
        relatedEntity: 'ERPInvoice',
        relatedProperty: 'ErpBillTo',
        relatedPropertyType: 'object'
      }, {
        name: 'Return',
        displayName: returnResource.entityDisplayName,
        type: 'ManyToOne',
        relatedEntity: 'Return',
        relatedProperty: 'ErpBillTo',
        relatedPropertyType: 'object'
      }, {
        name: 'SyncHistory',
        displayName: syncresultResource.entityDisplayName,
        type: 'OneToMany',
        relatedEntity: 'SyncResult',
        relatedProperty: 'EntityId',
        where: 'EntityType eq "ERPBillTo"'
      }]);
      return rel;
    }
  });
  _lang2.default.setObject('icboe.Models.ErpBillTo.Base', __class);
  exports.default = __class;
  module.exports = exports['default'];
});