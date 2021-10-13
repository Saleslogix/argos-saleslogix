define('crm/Integrations/BOE/Models/Quote/Base', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/Models/_ModelBase', '../Names', 'argos/I18n'], function (module, exports, _declare, _lang, _ModelBase2, _Names, _I18n) {
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

  const resource = (0, _I18n2.default)('quoteModel'); /* Copyright 2017 Infor
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

  const accountResource = (0, _I18n2.default)('accountModel');
  const contactResource = (0, _I18n2.default)('contactModel');
  const quoteItemsResource = (0, _I18n2.default)('quoteItemModel');
  const opportunityResource = (0, _I18n2.default)('opportunityModel');
  const salesorderResource = (0, _I18n2.default)('salesOrderModel');
  const billtoResource = (0, _I18n2.default)('erpBillToModel');
  const shiptoResource = (0, _I18n2.default)('erpShipToModel');
  const syncresultResource = (0, _I18n2.default)('syncResultModel');

  const __class = (0, _declare2.default)('crm.Integrations.BOE.Models.Quote.Base', [_ModelBase3.default], {
    contractName: 'dynamic',
    resourceKind: 'quotes',
    entityName: 'Quote',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    modelName: _Names2.default.QUOTE,
    iconClass: 'document',
    detailViewId: 'quote_detail',
    listViewId: 'quote_list',
    editViewId: 'quote_edit',
    createPicklists: function createPicklists() {
      return this.picklists || (this.picklists = [{
        name: 'SyncStatus',
        property: 'SyncStatus'
      }, {
        name: 'ErpQuoteStatus',
        property: 'ErpStatus'
      }]);
    },
    createRelationships: function createRelationships() {
      const rel = this.relationships || (this.relationships = [{
        name: 'Account',
        displayName: accountResource.entityDisplayNamePlural,
        type: 'ManyToOne',
        relatedEntity: 'Account',
        parentProperty: 'Account',
        parentPropertyType: 'object'
      }, {
        name: 'RequestedBy',
        displayName: contactResource.entityDisplayNamePlural,
        type: 'ManyToOne',
        relatedEntity: 'Contact',
        parentProperty: 'RequestedBy',
        parentPropertyType: 'object'
      }, {
        name: 'Opportunity',
        displayName: opportunityResource.entityDisplayNamePlural,
        type: 'ManyToOne',
        relatedEntity: 'Opportunity',
        parentProperty: 'Opportunity',
        parentPropertyType: 'object'
      }, {
        name: 'SalesOrder',
        displayName: salesorderResource.entityDisplayNamePlural,
        type: 'ManyToOne',
        relatedEntity: 'SalesOrder',
        parentProperty: 'SalesOrder',
        parentPropertyType: 'object'
      }, {
        name: 'BillTo',
        displayName: billtoResource.entityDisplayNamePlural,
        type: 'ManyToOne',
        relatedEntity: 'ERPBillTo',
        parentProperty: 'BillTo',
        parentPropertyType: 'object'
      }, {
        name: 'ShipTo',
        displayName: shiptoResource.entityDisplayNamePlural,
        type: 'ManyToOne',
        relatedEntity: 'ERPShipTo',
        parentProperty: 'ShipTo',
        parentPropertyType: 'object'
      }, {
        name: 'QuoteItem',
        displayName: quoteItemsResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'QuoteItem',
        relatedProperty: 'Quote',
        relatedPropertyType: 'object'
      }, {
        name: 'SyncHistory',
        displayName: syncresultResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'SyncResult',
        relatedProperty: 'EntityId',
        where: 'EntityType eq "Quote"'
      }]);
      return rel;
    }
  });
  _lang2.default.setObject('icboe.Models.Quote.Base', __class);
  exports.default = __class;
  module.exports = exports['default'];
});