define('crm/Integrations/BOE/Views/ERPContactAssociations/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', 'crm/Views/_RightDrawerListMixin', 'crm/Views/_MetricListMixin', 'crm/Views/_GroupListMixin', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _List, _RightDrawerListMixin2, _MetricListMixin2, _GroupListMixin2, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _List2 = _interopRequireDefault(_List);

  var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

  var _MetricListMixin3 = _interopRequireDefault(_MetricListMixin2);

  var _GroupListMixin3 = _interopRequireDefault(_GroupListMixin2);

  var _Names2 = _interopRequireDefault(_Names);

  var _I18n2 = _interopRequireDefault(_I18n);

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

  var resource = (0, _I18n2.default)('erpContactAssociationsList');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ERPContactAssociations.List', [_List2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default, _GroupListMixin3.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.Contact.NameLF %}</p>', '<p class="micro-text">{%: $.Account.AccountName %}</p>']),

    // Localization
    titleText: resource.titleText,

    // View Properties
    id: 'erpcontactassociations_list',
    detailView: 'contact_detail',
    allowSelection: true,
    enableActions: false,
    modelName: _Names2.default.ERPCONTACTASSOCIATION,
    resourceKind: 'erpContactAccounts',
    security: 'Entities/Contact/View',
    insertSecurity: 'Entities/Contact/Add',

    // Card layout
    itemIconClass: 'spreadsheet',

    // Groups
    enableDynamicGroupLayout: true,
    groupsEnabled: true,

    /**
     * Override _ListBase function - Navigates to the defined `this.detailView` passing the params as navigation options.
     * @param {String} key Key of the entry to be shown in detail
     * @param {String} descriptor Description of the entry, will be used as the top toolbar title text
     * @param {Object} additionalOptions Additional options to be passed into the next view
     * @ignore
     */
    navigateToDetailView: function navigateToDetailView(key, descriptor, additionalOptions) {
      // Ignore ContactAssociation and navigate to contact detail view
      var contact = this.entries[key].Contact;
      var view = this.app.getView(this.detailView);
      var options = {
        descriptor: contact.NameLF, // keep for backwards compat
        title: contact.NameLF,
        key: contact.$key,
        fromContext: this
      };

      if (additionalOptions) {
        options = _lang2.default.mixin(options, additionalOptions);
      }

      if (view) {
        view.show(options);
      }
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'upper(Contact.NameLF) like "%' + q + '%" or upper(Account.AccountName) like "%' + q + '%"';
    }
  });

  _lang2.default.setObject('icboe.Views.ERPContactAssociations.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});