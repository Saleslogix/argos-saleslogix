define("crm/Integrations/BOE/Modules/QuoteModule", ["exports", "dojo/_base/declare", "dojo/_base/lang", "./_Module", "../../../Views/Attachment/List", "../Views/BackOffices/List", "../Views/BackOfficeAccountingEntities/List", "../Views/ERPBillTos/List", "../Views/Carriers/List", "../Views/Locations/List", "../Views/QuotePersons/List", "../Views/QuoteLines/Detail", "../Views/QuoteLines/List", "../Views/Quotes/Detail", "../Views/Quotes/Edit", "../Views/Quotes/List", "../Views/ERPShipTos/List", "../Views/SyncResults/List", "../Models/Quote/Offline", "../Models/Quote/SData"], function (_exports, _declare, _lang, _Module2, _List, _List2, _List3, _List4, _List5, _List6, _List7, _Detail, _List8, _Detail2, _Edit, _List9, _List10, _List11, _Offline, _SData) {
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
  _List5 = _interopRequireDefault(_List5);
  _List6 = _interopRequireDefault(_List6);
  _List7 = _interopRequireDefault(_List7);
  _Detail = _interopRequireDefault(_Detail);
  _List8 = _interopRequireDefault(_List8);
  _Detail2 = _interopRequireDefault(_Detail2);
  _Edit = _interopRequireDefault(_Edit);
  _List9 = _interopRequireDefault(_List9);
  _List10 = _interopRequireDefault(_List10);
  _List11 = _interopRequireDefault(_List11);

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
  var __class = (0, _declare["default"])('crm.Integrations.BOE.Modules.QuoteModule', [_Module2["default"]], {
    defaultViews: ['quote_list'],
    init: function init() {
      App.picklistService.registerPicklistToView('SyncStatus', 'quote_detail');
      App.picklistService.registerPicklistToView('ErpQuoteStatus', 'quote_detail');
    },
    loadViews: function loadViews() {
      var am = this.applicationModule;
      am.registerView(new _Detail2["default"]());
      am.registerView(new _Edit["default"]());
      am.registerView(new _List5["default"]({
        id: 'quote_carriers'
      }));
      am.registerView(new _List["default"]({
        id: 'quote_attachments_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      am.registerView(new _List7["default"]({
        id: 'quotepersons_related',
        hasSettings: false,
        expose: false
      }));
      am.registerView(new _List8["default"]({
        id: 'quote_lines_related',
        hasSettings: false,
        expose: false,
        addLineItems: function addLineItems() {
          var _this = this;

          if (!this.options.selectedEntry.ErpLogicalId) {
            App.modal.createSimpleDialog({
              title: 'alert',
              content: this.accountingEntityRequiredText,
              getContent: function getContent() {
                return;
              }
            }).then(function () {
              var quoteEdit = App.getView('quote_edit');

              if (quoteEdit) {
                var options = {
                  entry: _this.options.selectedEntry,
                  fromContext: _this.options.fromContext
                };
                quoteEdit.show(options);
              }
            });
            return;
          }

          var view = App.getView('quote_line_edit');

          if (view) {
            var quoteItemView = App.getView('quote_lines_related');
            var count = 0;

            if (quoteItemView) {
              quoteItemView.getListCount({
                where: "Quote.$key eq \"".concat(this.options.selectedEntry.$key, "\"")
              }).then(function (result) {
                count = result;
              });
            }

            var options = {
              insert: true,
              context: {
                Quote: this.options.selectedEntry,
                CurrentCount: count
              }
            };
            this.refreshRequired = true;
            view.show(options);
          } // TODO: direct to line items list view and allow multi-select. On save will attach items to quote product and update the quote.

        },
        createToolLayout: function createToolLayout() {
          return this.tools || (this.tools = {
            tbar: [{
              id: 'new',
              svg: 'add',
              action: 'addLineItems',
              security: this.app.getViewSecurity(this.insertView, 'insert')
            }]
          });
        }
      }));
      am.registerView(new _List4["default"]({
        id: 'quote_billTos_related',
        hasSettings: false,
        expose: false,
        groupsEnabled: false
      }));
      am.registerView(new _List10["default"]({
        id: 'quote_shipTos_related',
        hasSettings: false,
        expose: false,
        groupsEnabled: false
      }));
      am.registerView(new _List2["default"]({
        id: 'quote_backoffice_related',
        hasSettings: false,
        groupsEnabled: false
      }));
      am.registerView(new _List3["default"]({
        id: 'quote_backofficeaccountingentity_related',
        hasSettings: false,
        groupsEnabled: false
      }));
      am.registerView(new _List6["default"]({
        id: 'quote_location_list',
        hasSettings: false
      }));
      am.registerView(new _List6["default"]({
        id: 'quote_warehouse_list',
        hasSettings: false
      }));
      am.registerView(new _List11["default"]({
        id: 'quote_syncresult_related',
        hasSettings: false
      }));
      am.registerView(new _Detail["default"]());
      am.registerView(new _List9["default"]());
    },
    loadCustomizations: function loadCustomizations() {
      var am = this.applicationModule;
      am.registerCustomization('list/tools', 'quotepersons_related', {
        at: function at(tool) {
          return tool.id === 'new';
        },
        type: 'remove'
      });
    },
    loadToolbars: function loadToolbars() {}
  });

  _lang["default"].setObject('icboe.Modules.QuoteModule', __class);

  var _default = __class;
  _exports["default"] = _default;
});