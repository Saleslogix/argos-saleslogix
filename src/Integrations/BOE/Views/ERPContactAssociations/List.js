import declare from 'dojo/_base/declare';
import string from 'dojo/string';
import lang from 'dojo/_base/lang';
import List from 'argos/List';
import _CardLayoutListMixin from 'crm/Views/_CardLayoutListMixin';
import _RightDrawerListMixin from 'crm/Views/_RightDrawerListMixin';
import _MetricListMixin from 'crm/Views/_MetricListMixin';
import _GroupListMixin from 'crm/Views/_GroupListMixin';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';

const resource = getResource('erpContactAssociationsList');

const __class = declare('crm.Integrations.BOE.Views.ERPContactAssociations.List', [List, _RightDrawerListMixin, _MetricListMixin, _CardLayoutListMixin, _GroupListMixin], {
  // Templates
  itemTemplate: new Simplate([
    '<h3>{%: $.Contact.NameLF %}</h3>',
    '<h4>{%: $.Account.AccountName %}</h4>',
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
  itemIconClass: 'fa fa-building-o fa-2x',

  // Groups
  enableDynamicGroupLayout: true,
  groupsEnabled: true,

  /**
   * Override _ListBase function - Navigates to the defined `this.detailView` passing the params as navigation options.
   * @param {String} key Key of the entry to be shown in detail
   * @param {String} descriptor Description of the entry, will be used as the top toolbar title text
   * @param {Object} additionalOptions Additional options to be passed into the next view
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
    return string.substitute('upper(Contact.NameLF) like "%${0}%" or upper(Account.AccountName) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
});

lang.setObject('icboe.Views.ERPContactAssociations.List', __class);
export default __class;
