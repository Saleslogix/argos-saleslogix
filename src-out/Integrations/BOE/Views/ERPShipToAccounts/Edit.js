define("crm/Integrations/BOE/Views/ERPShipToAccounts/Edit", ["exports", "dojo/_base/declare", "dojo/_base/lang", "argos/Edit", "../../Models/Names", "argos/I18n"], function (_exports, _declare, _lang, _Edit, _Names, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _Edit = _interopRequireDefault(_Edit);
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
  var resource = (0, _I18n["default"])('erpShipToAccountsEdit');

  var __class = (0, _declare["default"])('crm.Integrations.BOE.Views.ERPShipToAccounts.Edit', [_Edit["default"]], {
    // View Properties
    id: 'erpshiptoaccount_edit',
    detailView: 'erpshiptoaccount_detail',
    insertSecurity: 'Entities/ErpShipTo/Add',
    updateSecurity: 'Entities/ErpShipTo/Edit',
    resourceKind: 'erpShipToAccounts',
    titleText: resource.titleText,
    shipToText: resource.shipToText,
    accountText: resource.accountText,
    modelName: _Names["default"].ERPSHIPTOACCOUNT,
    init: function init() {
      this.inherited(init, arguments);
    },
    applyContext: function applyContext() {
      this.inherited(applyContext, arguments);

      if (this.options && this.options.fromContext) {
        this.fields.ErpShipTo.disable();
        this.fields.Account.disable();
        this.fields.ErpShipTo.setValue(this.options.fromContext.ShipTo);
        this.fields.Account.setValue(this.options.fromContext.Context);
      } else {
        this.fields.ErpShipTo.enable();
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
          label: this.shipToText,
          name: 'ErpShipTo',
          property: 'ErpShipTo',
          type: 'lookup',
          emptyText: '',
          autoFocus: true,
          required: true,
          valueTextProperty: 'Name',
          view: 'erpshiptoaccount_erpshiptos'
        }, {
          label: this.accountText,
          name: 'Account',
          property: 'Account',
          type: 'lookup',
          emptyText: '',
          required: true,
          valueTextProperty: 'AccountName',
          view: 'erpshiptoaccount_accounts'
        }]
      }]);
    }
  });

  _lang["default"].setObject('icboe.Views.ERPShipToAccounts.Edit', __class);

  var _default = __class;
  _exports["default"] = _default;
});