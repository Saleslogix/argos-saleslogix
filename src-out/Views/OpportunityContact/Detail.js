define('crm/Views/OpportunityContact/Detail', ['module', 'exports', 'dojo/_base/declare', 'dojo/string', 'argos/Detail', 'argos/I18n', 'crm/Format', '../../Models/Names'], function (module, exports, _declare, _string, _Detail, _I18n, _Format, _Names) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _string2 = _interopRequireDefault(_string);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _Format2 = _interopRequireDefault(_Format);

  var _Names2 = _interopRequireDefault(_Names);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  var resource = (0, _I18n2.default)('opportunityContactDetail');

  var __class = (0, _declare2.default)('crm.Views.OpportunityContact.Detail', [_Detail2.default], {
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
    modelName: _Names2.default.OPPORTUNITYCONTACT,

    removeContact: function removeContact() {
      var confirmMessage = _string2.default.substitute(this.confirmDeleteText, [this.entry.Contact.NameLF]);
      if (!confirm(confirmMessage)) {
        // eslint-disable-line
        return;
      }
      this.removeEntry();
    },
    formatPicklist: function formatPicklist(property) {
      return _Format2.default.picklist(this.app.picklistService, this._model, property);
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

  exports.default = __class;
  module.exports = exports['default'];
});