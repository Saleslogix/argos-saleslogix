define("crm/Integrations/BOE/Models/ErpInvoice/Base", ["exports", "dojo/_base/declare", "dojo/_base/lang", "argos/Models/_ModelBase", "../Names", "argos/I18n"], function (_exports, _declare, _lang, _ModelBase2, _Names, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _ModelBase2 = _interopRequireDefault(_ModelBase2);
  _Names = _interopRequireDefault(_Names);
  _I18n = _interopRequireDefault(_I18n);

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
  var resource = (0, _I18n["default"])('erpInvoiceModel');
  var accountResource = (0, _I18n["default"])('accountModel');
  var billToResource = (0, _I18n["default"])('erpBillToModel');
  var shipToResource = (0, _I18n["default"])('erpShipToModel');
  var invoiceItemResource = (0, _I18n["default"])('erpInvoiceItemModel');
  var receivableResource = (0, _I18n["default"])('erpReceivableModel');

  var __class = (0, _declare["default"])('crm.Integrations.BOE.Models.ErpInvoice.Base', [_ModelBase2["default"]], {
    contractName: 'dynamic',
    resourceKind: 'erpInvoices',
    entityName: 'ERPInvoice',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    modelName: _Names["default"].ERPINVOICE,
    iconClass: 'document',
    detailViewId: 'invoice_detail',
    listViewId: 'invoice_list',
    editViewId: '',
    createPicklists: function createPicklists() {
      return this.picklists || (this.picklists = [{
        name: 'ErpInvoiceStatus',
        property: 'ErpStatus'
      }]);
    },
    createRelationships: function createRelationships() {
      var rel = this.relationships || (this.relationships = [{
        name: 'Account',
        displayName: accountResource.entityDisplayName,
        type: 'ManyToOne',
        parentProperty: 'Account',
        parentPropertyType: 'object',
        relatedEntity: 'Account'
      }, {
        name: 'BillTo',
        displayName: billToResource.entityDisplayName,
        type: 'ManyToOne',
        parentProperty: 'ErpBillTo',
        parentPropertyType: 'object',
        relatedEntity: 'ERPBillTo'
      }, {
        name: 'ShipTo',
        displayName: shipToResource.entityDisplayName,
        type: 'ManyToOne',
        parentProperty: 'ErpShipTo',
        parentPropertyType: 'object',
        relatedEntity: 'ERPShipTo'
      }, {
        name: 'InvoiceItem',
        displayName: invoiceItemResource.entityDisplayName,
        type: 'OneToMany',
        relatedEntity: 'ERPInvoiceItem',
        relatedProperty: 'ErpInvoice',
        relatedPropertyType: 'object'
      }, {
        name: 'Receivable',
        displayName: receivableResource.entityDisplayName,
        type: 'OneToMany',
        relatedEntity: 'ERPReceivable',
        relatedProperty: 'ErpInvoice',
        relatedPropertyType: 'object'
      }]);
      return rel;
    }
  });

  _lang["default"].setObject('icboe.Models.ErpInvoice.Base', __class);

  var _default = __class;
  _exports["default"] = _default;
});