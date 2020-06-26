define("crm/Views/OpportunityContact/Detail", ["exports", "dojo/_base/declare", "dojo/string", "argos/Detail", "argos/I18n", "crm/Format", "../../Models/Names"], function (_exports, _declare, _string, _Detail, _I18n, _Format, _Names) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _string = _interopRequireDefault(_string);
  _Detail = _interopRequireDefault(_Detail);
  _I18n = _interopRequireDefault(_I18n);
  _Format = _interopRequireDefault(_Format);
  _Names = _interopRequireDefault(_Names);

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
  var resource = (0, _I18n["default"])('opportunityContactDetail');

  var __class = (0, _declare["default"])('crm.Views.OpportunityContact.Detail', [_Detail["default"]
  /* , _LegacySDataDetailMixin */
  ], {
    // Localization
    titleText: resource.titleText,
    accountText: resource.accountText,
    contactTitleText: resource.contactTitleText,
    nameText: resource.nameText,
    salesRoleText: resource.salesRoleText,
    strategyText: resource.strategyText,
    personalBenefitsText: resource.personalBenefitsText,
    standingText: resource.standingText,
    issuesText: resource.issuesText,
    competitorNameText: resource.competitorNameText,
    removeContactTitleText: resource.removeContactTitleText,
    confirmDeleteText: resource.confirmDeleteText,
    contactText: resource.contactText,
    entityText: resource.entityText,
    // View Properties
    id: 'opportunitycontact_detail',
    editView: 'opportunitycontact_edit',
    security: 'Entities/Contact/View',
    querySelect: [],
    resourceKind: 'opportunityContacts',
    modelName: _Names["default"].OPPORTUNITYCONTACT,
    removeContact: function removeContact() {
      var confirmMessage = _string["default"].substitute(this.confirmDeleteText, [this.entry.Contact.NameLF]);

      if (!confirm(confirmMessage)) {
        // eslint-disable-line
        return;
      }

      this.removeEntry();
    },
    formatPicklist: function formatPicklist(property) {
      return _Format["default"].picklist(this.app.picklistService, this._model, property);
    },
    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {
        tbar: [{
          id: 'edit',
          title: this.editText,
          action: 'navigateToEditView',
          svg: 'edit',
          security: App.getViewSecurity(this.editView, 'update')
        }, {
          id: 'removeContact',
          svg: 'close',
          action: 'removeContact',
          title: this.removeContactTitleText
        }]
      });
    },
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        title: this.contactText,
        name: 'DetailsSection',
        children: [{
          name: 'NameLF',
          property: 'Contact.NameLF',
          label: this.nameText,
          view: 'contact_detail',
          key: 'Contact.$key',
          descriptor: 'Contact.NameLF'
        }, {
          name: 'AccountName',
          property: 'Contact.AccountName',
          descriptor: 'AccountName',
          label: this.accountText,
          view: 'account_detail',
          key: 'Contact.Account.$key'
        }, {
          name: 'Title',
          property: 'Contact.Title',
          label: this.contactTitleText
        }, {
          name: 'SalesRole',
          property: 'SalesRole',
          label: this.salesRoleText,
          renderer: this.formatPicklist('SalesRole')
        }, {
          name: 'Standing',
          property: 'Standing',
          label: this.standingText,
          renderer: this.formatPicklist('Standing')
        }, {
          name: 'PersonalBenefits',
          property: 'PersonalBenefits',
          label: this.personalBenefitsText
        }, {
          name: 'CompetitorName',
          property: 'Competitors.CompetitorName',
          label: this.competitorNameText
        }, {
          name: 'Strategy',
          property: 'Strategy',
          label: this.strategyText
        }, {
          name: 'Issues',
          property: 'Issues',
          label: this.issuesText
        }]
      }]);
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});