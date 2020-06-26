define("crm/Integrations/BOE/Modules/ContactModule", ["exports", "dojo/_base/declare", "dojo/_base/lang", "./_Module", "../Views/ERPContactAssociations/List", "../Views/Quotes/List", "../Views/SalesOrders/List", "../Views/SyncResults/List", "argos/I18n"], function (_exports, _declare, _lang, _Module2, _List, _List2, _List3, _List4, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _Module2 = _interopRequireDefault(_Module2);
  _List = _interopRequireDefault(_List);
  _List2 = _interopRequireDefault(_List2);
  _List3 = _interopRequireDefault(_List3);
  _List4 = _interopRequireDefault(_List4);
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
  var resource = (0, _I18n["default"])('contactModule');

  var __class = (0, _declare["default"])('crm.Integrations.BOE.Modules.ContactModule', [_Module2["default"]], {
    // Localization
    erpStatusText: resource.erpStatusText,
    erpContactIdText: resource.erpContactIdText,
    erpAccountAssociationsText: resource.erpAccountAssociationsText,
    relatedERPItemsText: resource.relatedERPItemsText,
    addQuoteText: resource.addQuoteText,
    addOrderText: resource.addOrderText,
    quotesText: resource.quotesText,
    ordersText: resource.ordersText,
    syncHistoryText: resource.syncHistoryText,
    init: function init() {},
    loadViews: function loadViews() {
      var am = this.applicationModule;
      am.registerView(new _List["default"]({
        id: 'contact_account_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        title: this.erpAccountAssociationsText,
        createToolLayout: function createToolLayout() {
          return this.tools;
        }
      }));
      am.registerView(new _List2["default"]({
        id: 'contact_quotes_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        queryOrderBy: 'CreateDate asc'
      }));
      am.registerView(new _List3["default"]({
        id: 'contact_salesorders_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        queryOrderBy: 'CreateDate asc'
      }));
      am.registerView(new _List4["default"]({
        id: 'contact_syncresults_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false
      }));
    },
    loadCustomizations: function loadCustomizations() {
      var am = this.applicationModule; // Row names to match in the detail and more detail sections.
      // These are the last item in the section.

      var detailRowMatch = 'AccountManager.UserInfo';
      am.registerCustomization('models/detail/querySelect', 'contact_sdata_model', {
        at: function at() {
          return true;
        },
        type: 'insert',
        where: 'after',
        value: 'ErpStatus'
      });
      am.registerCustomization('models/detail/querySelect', 'contact_sdata_model', {
        at: function at() {
          return true;
        },
        type: 'insert',
        where: 'after',
        value: 'ErpExtId'
      });
      am.registerCustomization('models/relationships', 'contact_offline_model', {
        at: function at(relationship) {
          return relationship.name === 'Tickets';
        },
        type: 'insert',
        where: 'after',
        value: [{
          name: 'AccountAssociation',
          displayName: (0, _I18n["default"])('erpContactAssociationModel').entityDisplayNamePlural,
          type: 'OneToMany',
          relatedEntity: 'ERPContactAccount',
          relatedProperty: 'Contact',
          relatedPropertyType: 'object'
        }, {
          name: 'Quote',
          displayName: (0, _I18n["default"])('quoteModel').entityDisplayNamePlural,
          type: 'OneToMany',
          relatedEntity: 'Quote',
          relatedProperty: 'Contact',
          relatedPropertyType: 'object'
        }, {
          name: 'SalesOrder',
          displayName: (0, _I18n["default"])('salesOrderModel').entityDisplayNamePlural,
          type: 'OneToMany',
          relatedEntity: 'SalesOrder',
          relatedProperty: 'Contact',
          relatedPropertyType: 'object'
        }, {
          name: 'SyncHistory',
          displayName: (0, _I18n["default"])('syncResultModel').entityDisplayNamePlural,
          type: 'OneToMany',
          relatedEntity: 'SyncResult',
          relatedProperty: 'EntityId',
          where: 'EntityType eq "Contact"'
        }]
      });
      am.registerCustomization('models/relationships', 'contact_sdata_model', {
        at: function at(relationship) {
          return relationship.name === 'Tickets';
        },
        type: 'insert',
        where: 'after',
        value: [{
          name: 'AccountAssociation',
          displayName: (0, _I18n["default"])('erpContactAssociationModel').entityDisplayNamePlural,
          type: 'OneToMany',
          relatedEntity: 'ERPContactAccount',
          relatedProperty: 'Contact',
          relatedPropertyType: 'object'
        }, {
          name: 'Quote',
          displayName: (0, _I18n["default"])('quoteModel').entityDisplayNamePlural,
          type: 'OneToMany',
          relatedEntity: 'Quote',
          relatedProperty: 'RequestedBy',
          relatedPropertyType: 'object'
        }, {
          name: 'SalesOrder',
          displayName: (0, _I18n["default"])('salesOrderModel').entityDisplayNamePlural,
          type: 'OneToMany',
          relatedEntity: 'SalesOrder',
          relatedProperty: 'RequestedBy',
          relatedPropertyType: 'object'
        }, {
          name: 'SyncHistory',
          displayName: (0, _I18n["default"])('syncResultModel').entityDisplayNamePlural,
          type: 'OneToMany',
          relatedEntity: 'SyncResult',
          relatedProperty: 'EntityId',
          where: 'EntityType eq "Contact"'
        }]
      });

      _lang["default"].extend(crm.Views.Contact.Detail, {
        _onAddQuoteClick: function _onAddQuoteClick() {
          var view = App.getView('quote_edit');
          view.show({
            detailView: 'quote_detail',
            fromContext: this,
            insert: true
          });
        },
        _onAddOrderClick: function _onAddOrderClick() {
          var view = App.getView('salesorder_edit');
          view.show({
            detailView: 'salesorder_detail',
            fromContext: this,
            insert: true
          });
        }
      });
      /*
       * Quick Actions
       */


      am.registerCustomization('detail', 'contact_detail', {
        at: function at(row) {
          return row.name === 'ViewAddressAction';
        },
        type: 'insert',
        where: 'after',
        value: [{
          name: 'AddQuote',
          property: 'NameLF',
          label: this.addQuoteText,
          iconClass: 'document',
          action: '_onAddQuoteClick',
          security: 'Entities/Quote/Add'
        }, {
          name: 'AddOrder',
          property: 'AccountName',
          label: this.addOrderText,
          iconClass: 'cart',
          action: '_onAddOrderClick',
          security: 'Entities/SalesOrder/Add'
        }]
      });
      /*
       * Details
       */

      am.registerCustomization('detail', 'contact_detail', {
        at: function at(row) {
          return row.name === detailRowMatch;
        },
        type: 'insert',
        where: 'after',
        value: [{
          label: this.erpStatusText,
          property: 'ErpStatus'
        }, {
          label: this.erpContactIdText,
          property: 'ErpExtId'
        }]
      });
      /*
       * Related Items
       */

      am.registerCustomization('detail', 'contact_detail', {
        at: function at(row) {
          return row.name === 'RelatedItemsSection';
        },
        type: 'insert',
        where: 'after',
        value: {
          title: this.relatedERPItemsText,
          list: true,
          name: 'RelatedERPItemsSection',
          enableOffline: false,
          children: [{
            name: 'AccountAssociations',
            label: this.erpAccountAssociationsText,
            where: function where(entry) {
              return "Contact.Id eq \"".concat(entry.$key, "\"");
            },
            view: 'contact_account_related'
          }, {
            name: 'Quotes',
            label: this.quotesText,
            where: function where(entry) {
              return "RequestedBy.Id eq \"".concat(entry.$key, "\"");
            },
            view: 'contact_quotes_related'
          }, {
            name: 'SalesOrders',
            label: this.ordersText,
            where: function where(entry) {
              return "RequestedBy.Id eq \"".concat(entry.$key, "\"");
            },
            view: 'contact_salesorders_related'
          }, {
            name: 'SyncHistory',
            label: this.syncHistoryText,
            where: function where(entry) {
              return "EntityType eq \"Contact\" and EntityId eq \"".concat(entry.$key, "\"");
            },
            view: 'contact_syncresults_related'
          }]
        }
      });
    },
    loadToolbars: function loadToolbars() {}
  });

  _lang["default"].setObject('icboe.Modules.ContactModule', __class);

  var _default = __class;
  _exports["default"] = _default;
});