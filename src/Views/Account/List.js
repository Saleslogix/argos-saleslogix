import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import action from '../../Action';
import utility from 'argos/Utility';
import List from 'argos/List';
import _GroupListMixin from '../_GroupListMixin';
import _MetricListMixin from '../_MetricListMixin';
import _RightDrawerListMixin from '../_RightDrawerListMixin';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';


const resource = getResource('accountList');

/**
 * @class crm.Views.Account.List
 *
 * @extends argos.List
 * @requires argos.List
 * @requires argos.Format
 * @requires argos.Utility
 * @requires argos.Convert
 *
 * @requires crm.Action
 * @requires crm.Views._GroupListMixin
 * @requires crm.Views._MetricListMixin
 * @requires crm.Views._RightDrawerListMixin
 *
 */
const __class = declare('crm.Views.Account.List', [List, _RightDrawerListMixin, _MetricListMixin, _GroupListMixin], {
  // Templates
  itemTemplate: new Simplate([
    '<p class="micro-text">{%: $.Industry %}</p>',
    '<p class="micro-text">',
    '{%: $$.joinFields(" | ", [$.Type, $.SubType]) %}',
    '</p>',
    '<p class="micro-text">{%: $.AccountManager && $.AccountManager.UserInfo ? $.AccountManager.UserInfo.UserName : "" %}',
    '{% if ($.Owner && $.Owner.OwnerDescription) { %} | {%: $.Owner.OwnerDescription %}{% } %}</p>',
    '<p class="micro-text">{%: $.WebAddress %}</p>',
    '{% if ($.MainPhone) { %}',
    '<p class="micro-text">',
    '{%: $$.phoneAbbreviationText %} <span class="hyperlink" data-action="callMain" data-key="{%: $.$key %}">{%: argos.Format.phone($.MainPhone) %}</span>', // TODO: Avoid global
    '</p>',
    '{% } %}',
    '{% if ($.Fax) { %}',
    '<p class="micro-text">',
    '{%: $$.faxAbbreviationText + argos.Format.phone($.Fax) %}', // TODO: Avoid global
    '</p>',
    '{% } %}',
  ]),
  groupsEnabled: true,
  enableDynamicGroupLayout: true,

  joinFields: function joinFields(sep, fields) {
    return utility.joinFields(sep, fields);
  },

  // Localization
  titleText: resource.titleText,
  activitiesText: resource.titleText,
  notesText: resource.notesText,
  scheduleText: resource.scheduleText,
  editActionText: resource.editActionText,
  callMainActionText: resource.callMainActionText,
  viewContactsActionText: resource.viewContactsActionText,
  addNoteActionText: resource.addNoteActionText,
  addActivityActionText: resource.addActivityActionText,
  addAttachmentActionText: resource.addAttachmentActionText,
  phoneAbbreviationText: resource.phoneAbbreviationText,
  faxAbbreviationText: resource.faxAbbreviationText,
  offlineText: resource.offlineText,

  // View Properties
  detailView: 'account_detail',
  itemIconClass: 'spreadsheet', // todo: replace with appropriate icon
  id: 'account_list',
  security: 'Entities/Account/View',
  insertView: 'account_edit',
  insertSecurity: 'Entities/Account/Add',
  entityName: 'Account',
  allowSelection: true,
  enableActions: true,
  offlineIds: null,
  resourceKind: 'accounts',
  modelName: MODEL_NAMES.ACCOUNT,

  callMain: function callMain(params) {
    this.invokeActionItemBy((a) => {
      return a.id === 'callMain';
    }, params.key);
  },
  createActionLayout: function createActionLayout() {
    return this.actions || (this.actions = [{
      id: 'edit',
      cls: 'edit',
      label: this.editActionText,
      security: 'Entities/Account/Edit',
      action: 'navigateToEditView',
    }, {
      id: 'callMain',
      cls: 'phone',
      label: this.callMainActionText,
      enabled: action.hasProperty.bindDelegate(this, 'MainPhone'),
      fn: action.callPhone.bindDelegate(this, 'MainPhone'),
    }, {
      id: 'viewContacts',
      label: this.viewContactsActionText,
      fn: this.navigateToRelatedView.bindDelegate(this, 'contact_related', 'Account.id eq "${0}"'),
    }, {
      id: 'addNote',
      cls: 'quick-edit',
      label: this.addNoteActionText,
      fn: action.addNote.bindDelegate(this),
    }, {
      id: 'addActivity',
      cls: 'calendar',
      label: this.addActivityActionText,
      fn: action.addActivity.bindDelegate(this),
    }, {
      id: 'addAttachment',
      cls: 'attach',
      label: this.addAttachmentActionText,
      fn: action.addAttachment.bindDelegate(this),
    }]);
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `AccountNameUpper like "${q}%"`;
  },
});

lang.setObject('Mobile.SalesLogix.Views.Account.List', __class);
export default __class;
