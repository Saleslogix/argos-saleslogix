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

import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import List from 'argos/List';
import _RightDrawerListMixin from 'crm/Views/_RightDrawerListMixin';
import _MetricListMixin from 'crm/Views/_MetricListMixin';
import _GroupListMixin from 'crm/Views/_GroupListMixin';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';

const resource = getResource('erpContactAssociationsList');

const __class = declare('crm.Integrations.BOE.Views.ERPContactAssociations.List', [List, _RightDrawerListMixin, _MetricListMixin, _GroupListMixin], {
  // Templates
  itemTemplate: new Simplate([
    '<p class="listview-heading">{%: $.Contact.NameLF %}</p>',
    '<p class="micro-text">{%: $.Account.AccountName %}</p>',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  id: 'erpcontactassociations_list',
  detailView: 'contact_detail',
  allowSelection: true,
  enableActions: false,
  modelName: MODEL_NAMES.ERPCONTACTASSOCIATION,
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
    const contact = this.entries[key].Contact;
    const view = this.app.getView(this.detailView);
    let options = {
      descriptor: contact.NameLF, // keep for backwards compat
      title: contact.NameLF,
      key: contact.$key,
      fromContext: this,
    };

    if (additionalOptions) {
      options = lang.mixin(options, additionalOptions);
    }

    if (view) {
      view.show(options);
    }
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `upper(Contact.NameLF) like "%${q}%" or upper(Account.AccountName) like "%${q}%"`;
  },
});

lang.setObject('icboe.Views.ERPContactAssociations.List', __class);
export default __class;
