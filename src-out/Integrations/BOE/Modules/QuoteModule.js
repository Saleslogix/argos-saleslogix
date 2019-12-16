define('crm/Integrations/BOE/Modules/QuoteModule', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './_Module', '../../../Views/Attachment/List', '../Views/BackOffices/List', '../Views/BackOfficeAccountingEntities/List', '../Views/ERPBillTos/List', '../Views/Carriers/List', '../Views/Locations/List', '../Views/QuotePersons/List', '../Views/QuoteLines/Detail', '../Views/QuoteLines/List', '../Views/Quotes/Detail', '../Views/Quotes/Edit', '../Views/Quotes/List', '../Views/ERPShipTos/List', '../Views/SyncResults/List', '../Models/Quote/Offline', '../Models/Quote/SData'], function (module, exports, _declare, _lang, _Module2, _List, _List3, _List5, _List7, _List9, _List11, _List13, _Detail, _List15, _Detail3, _Edit, _List17, _List19, _List21) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Module3 = _interopRequireDefault(_Module2);

  var _List2 = _interopRequireDefault(_List);

  var _List4 = _interopRequireDefault(_List3);

  var _List6 = _interopRequireDefault(_List5);

  var _List8 = _interopRequireDefault(_List7);

  var _List10 = _interopRequireDefault(_List9);

  var _List12 = _interopRequireDefault(_List11);

  var _List14 = _interopRequireDefault(_List13);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _List16 = _interopRequireDefault(_List15);

  var _Detail4 = _interopRequireDefault(_Detail3);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _List18 = _interopRequireDefault(_List17);

  var _List20 = _interopRequireDefault(_List19);

  var _List22 = _interopRequireDefault(_List21);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Modules.QuoteModule', [_Module3.default], {
    defaultViews: ['quote_list'],
    init: function init() {
      App.picklistService.registerPicklistToView('SyncStatus', 'quote_detail');
      App.picklistService.registerPicklistToView('ErpQuoteStatus', 'quote_detail');
    },
    loadViews: function loadViews() {
      var am = this.applicationModule;

      am.registerView(new _Detail4.default());
      am.registerView(new _Edit2.default());

      am.registerView(new _List10.default({
        id: 'quote_carriers'
      }));

      am.registerView(new _List2.default({
        id: 'quote_attachments_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      am.registerView(new _List14.default({
        id: 'quotepersons_related',
        hasSettings: false,
        expose: false
      }));

      am.registerView(new _List16.default({
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
              quoteItemView.getListCount({ where: 'Quote.$key eq "' + this.options.selectedEntry.$key + '"' }).then(function (result) {
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

      am.registerView(new _List8.default({
        id: 'quote_billTos_related',
        hasSettings: false,
        expose: false,
        groupsEnabled: false
      }));

      am.registerView(new _List20.default({
        id: 'quote_shipTos_related',
        hasSettings: false,
        expose: false,
        groupsEnabled: false
      }));

      am.registerView(new _List4.default({
        id: 'quote_backoffice_related',
        hasSettings: false,
        groupsEnabled: false
      }));

      am.registerView(new _List6.default({
        id: 'quote_backofficeaccountingentity_related',
        hasSettings: false,
        groupsEnabled: false
      }));

      am.registerView(new _List12.default({
        id: 'quote_location_list',
        hasSettings: false
      }));

      am.registerView(new _List12.default({
        id: 'quote_warehouse_list',
        hasSettings: false
      }));

      am.registerView(new _List22.default({
        id: 'quote_syncresult_related',
        hasSettings: false
      }));

      am.registerView(new _Detail2.default());

      am.registerView(new _List18.default());
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

  _lang2.default.setObject('icboe.Modules.QuoteModule', __class);
  exports.default = __class;
  module.exports = exports['default'];
});