import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import action from '../../Action';
import utility from 'argos/Utility';
import List from 'argos/List';
import _GroupListMixin from '../_GroupListMixin';
import _MetricListMixin from '../_MetricListMixin';
import _CardLayoutListMixin from '../_CardLayoutListMixin';
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
 * @requires crm.Views._CardLayoutListMixin
 * @requires crm.Views._RightDrawerListMixin
 *
 */
const __class = declare('crm.Views.Account.List', [List, _RightDrawerListMixin, _MetricListMixin, _CardLayoutListMixin, _GroupListMixin], {
  // Templates
  itemTemplate: new Simplate([
    '<h3>{%: $.AccountName %}</h3>',
    '<h4>{%: $.Industry %}</h4>',
    '<h4>',
    '{%: $$.joinFields(" | ", [$.Type, $.SubType]) %}',
    '</h4>',
    '<h4>{%: $.AccountManager && $.AccountManager.UserInfo ? $.AccountManager.UserInfo.UserName : "" %}',
    '{% if ($.Owner && $.Owner.OwnerDescription) { %} | {%: $.Owner.OwnerDescription %}{% } %}</h4>',
    '<h4>{%: $.WebAddress %}</h4>',
    '{% if ($.MainPhone) { %}',
    '<h4>',
    '{%: $$.phoneAbbreviationText %} <span class="href" data-action="callMain" data-key="{%: $.$key %}">{%: argos.Format.phone($.MainPhone) %}</span>',
    '</h4>',
    '{% } %}',
    '{% if ($.Fax) { %}',
    '<h4>',
    '{%: $$.faxAbbreviationText + argos.Format.phone($.Fax) %}',
    '</h4>',
    '{% } %}',
  ]),
  groupsEnabled: true,
  enableDynamicGroupLayout: true,
  groupLayoutItemTemplate: new Simplate([
    '<div style="float:left; ">',
    '<h3><span class="group-label">{%= $$.getGroupFieldLabelByName($,"AccountName") %} </span><span class="group-entry"><strong>{%= $$.getGroupFieldValueByName($,"AccountName") %}</strong></span></h2>',
    '<h4><span class="group-label">{%= $$.getGroupFieldLabelByName($,"MainPhone") %} </span><span class="group-entry">{%= $$.getGroupFieldValueByName($, "MainPhone") %}</span></h4>',
    '</div><div style="float:left;">',
    '<h4><span class="group-label">{%= $$.getGroupFieldLabelByName($,"Status") %} </span><span class="group-entry">{%= $$.getGroupFieldValueByName($, "Status") %}</span></h4>',
    '<h4><span class="group-label">{%= $$.getGroupFieldLabelByName($,"Type") %} </span><span class="group-entry">{%= $$.getGroupFieldValueByName($, "Type") %}</span></h4>',
    '</div>',
  ]),


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
  itemIconClass: 'fa fa-building-o fa-2x',
  id: 'account_list',
  security: 'Entities/Account/View',
  insertView: 'account_edit',
  insertSecurity: 'Entities/Account/Add',
  entityName: 'Account',
  allowSelection: true,
  enableActions: true,
  pageSize: 10,
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
      cls: 'fa fa-pencil fa-2x',
      label: this.editActionText,
      security: 'Entities/Account/Edit',
      action: 'navigateToEditView',
    }, {
      id: 'callMain',
      cls: 'fa fa-phone-square fa-2x',
      label: this.callMainActionText,
      enabled: action.hasProperty.bindDelegate(this, 'MainPhone'),
      fn: action.callPhone.bindDelegate(this, 'MainPhone'),
    }, {
      id: 'viewContacts',
      label: this.viewContactsActionText,
      fn: this.navigateToRelatedView.bindDelegate(this, 'contact_related', 'Account.id eq "${0}"'),
    }, {
      id: 'addNote',
      cls: 'fa fa-edit fa-2x',
      label: this.addNoteActionText,
      fn: action.addNote.bindDelegate(this),
    }, {
      id: 'addActivity',
      cls: 'fa fa-calendar fa-2x',
      label: this.addActivityActionText,
      fn: action.addActivity.bindDelegate(this),
    }, {
      id: 'addAttachment',
      cls: 'fa fa-paperclip fa-2x',
      label: this.addAttachmentActionText,
      fn: action.addAttachment.bindDelegate(this),
    }]);
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute('AccountNameUpper like "${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
});

lang.setObject('Mobile.SalesLogix.Views.Account.List', __class);
export default __class;
