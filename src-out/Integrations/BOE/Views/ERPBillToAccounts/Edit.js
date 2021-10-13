define('crm/Integrations/BOE/Views/ERPBillToAccounts/Edit', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/Edit', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _Edit, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _Names2 = _interopRequireDefault(_Names);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('erpBillToAccountsEdit'); /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ERPBillToAccounts.Edit', [_Edit2.default], {
    // View Properties
    id: 'erpbilltoaccounts_edit',
    detailView: 'erpbilltoaccounts_detail',
    insertSecurity: 'Entities/ErpBillTo/Add',
    updateSecurity: 'Entities/ErpBillTo/Edit',
    resourceKind: 'erpBillToAccounts',
    titleText: resource.titleText,
    billToText: resource.billToText,
    accountText: resource.accountText,
    modelName: _Names2.default.ERPSHIPTOACCOUNT,

    init: function init() {
      this.inherited(init, arguments);
    },
    applyContext: function applyContext() {
      this.inherited(applyContext, arguments);
      if (this.options && this.options.fromContext) {
        this.fields.ErpBillTo.disable();
        this.fields.Account.disable();
        this.fields.ErpBillTo.setValue(this.options.fromContext.BillTo);
        this.fields.Account.setValue(this.options.fromContext.Context);
      } else {
        this.fields.ErpBillTo.enable();
        this.fields.Account.enable();
      }
      if (this.options && this.options.autoSave) {
        this.save();
      }
    },
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        title: this.detailsText,
        name: 'DetailsSection',
        children: [{
          label: this.billToText,
          name: 'ErpBillTo',
          property: 'ErpBillTo',
          type: 'lookup',
          emptyText: '',
          autoFocus: true,
          required: true,
          valueTextProperty: 'Name',
          view: 'erpbilltoaccount_erpbilltos'
        }, {
          label: this.accountText,
          name: 'Account',
          property: 'Account',
          type: 'lookup',
          emptyText: '',
          required: true,
          valueTextProperty: 'AccountName',
          view: 'erpbilltoaccount_accounts'
        }] }]);
    }
  });

  _lang2.default.setObject('icboe.Views.ERPBillToAccounts.Edit', __class);
  exports.default = __class;
  module.exports = exports['default'];
});