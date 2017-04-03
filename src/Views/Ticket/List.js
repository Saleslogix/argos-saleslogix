import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import array from 'dojo/_base/array';
import action from '../../Action';
import List from 'argos/List';
import _GroupListMixin from '../_GroupListMixin';
import _MetricListMixin from '../_MetricListMixin';
import _RightDrawerListMixin from '../_RightDrawerListMixin';
import getResource from 'argos/I18n';

const resource = getResource('ticketList');

/**
 * @class crm.Views.Ticket.List
 *
 * @extends argos.List
 * @mixins crm.Views._RightDrawerListMixin
 * @mixins crm.Views._MetricListMixin
 * @mixins crm.Views._GroupListMixin
 *
 * @requires crm.Action
 * @requires crm.Format
 */
const __class = declare('crm.Views.Ticket.List', [List, _RightDrawerListMixin, _MetricListMixin, _GroupListMixin], {
  // Templates
  itemTemplate: new Simplate([
    '<p class="listview-heading">{%: $.TicketNumber %}</p>',
    '<p class="micro-text">{%: $.Subject %}</p>',
    '{% if(($.Account) && (!$.Contact)) { %}',
    '<p class="micro-text">{%: $$.viewContactActionText + ": " + $.Account.AccountName %}</p>',
    '{% } %}',
    '{% if(($.Account) && ($.Contact)) { %}',
    '<p class="micro-text">{%: $$.viewContactActionText + ": " + $.Contact.NameLF + " | " + $.Account.AccountName %}</p>',
    '{% } %}',
    '<p class="micro-text"> {%: $.AssignedTo ? ($$.assignedToText + $.AssignedTo.OwnerDescription) : this.notAssignedText %}</p>',
    '{% if($.Urgency) { %}',
    '<p class="micro-text">{%: $$.urgencyText + $.Urgency.Description %}</p>',
    '{% } %}',
    '{% if($.Area) { %}',
    '<p class="micro-text">{%: $$._areaCategoryIssueText($) %}</p>',
    '{% } %}',
    '{% if($.CreateDate) { %}',
    '<p class="micro-text">{%: $$.createdOnText %}  {%: crm.Format.relativeDate($.CreateDate) %}</p>',
    '{% } %}',
    '{% if($.ModifyDate) { %}',
    '<p class="micro-text">{%: $$.modifiedText %}  {%: crm.Format.relativeDate($.ModifyDate) %}</p>',
    '{% } %}',
    '{% if($.NeededByDate) { %}',
    '<p class="micro-text">{%: $$.neededByText %}  {%: crm.Format.relativeDate($.NeededByDate) %}</p>',
    '{% } %}',
  ]),

  _areaCategoryIssueText: function _areaCategoryIssueText(feedItem) {
    const results = [feedItem.Area, feedItem.Category, feedItem.Issue];
    return array.filter(results, (item) => {
      return item !== '' && typeof item !== 'undefined' && item !== null;
    }).join(' > ');
  },

  // Localization
  titleText: resource.titleText,
  activitiesText: resource.activitiesText,
  scheduleText: resource.scheduleText,
  notAssignedText: resource.notAssignedText,
  editActionText: resource.editActionText,
  viewAccountActionText: resource.viewAccountActionText,
  viewContactActionText: resource.viewContactActionText,
  addNoteActionText: resource.addNoteActionText,
  addActivityActionText: resource.addActivityActionText,
  addAttachmentActionText: resource.addAttachmentActionText,
  assignedToText: resource.assignedToText,
  urgencyText: resource.urgencyText,
  createdOnText: resource.createdOnText,
  modifiedText: resource.modifiedText,
  neededByText: resource.neededByText,

  // View Properties
  detailView: 'ticket_detail',
  itemIconClass: 'expense-report',
  id: 'ticket_list',
  security: 'Entities/Ticket/View',
  insertView: 'ticket_edit',
  queryOrderBy: 'TicketNumber',
  querySelect: [
    'Account/AccountName',
    'Account/MainPhone',
    'Area',
    'Category',
    'Issue',
    'AssignedTo/OwnerDescription',
    'Contact/NameLF',
    'Contact/WorkPhone',
    'ReceivedDate',
    'StatusCode',
    'Subject',
    'TicketNumber',
    'UrgencyCode',
    'Urgency/Description',
    'ModifyDate',
    'CreateDate',
    'NeededByDate',
  ],
  resourceKind: 'tickets',
  entityName: 'Ticket',
  groupsEnabled: true,
  allowSelection: true,
  enableActions: true,

  createActionLayout: function createActionLayout() {
    return this.actions || (this.actions = [{
      id: 'edit',
      cls: 'fa fa-pencil fa-2x',
      label: this.editActionText,
      action: 'navigateToEditView',
      security: 'Entities/Ticket/Edit',
    }, {
      id: 'viewAccount',
      label: this.viewAccountActionText,
      enabled: action.hasProperty.bindDelegate(this, 'Account.$key'),
      fn: action.navigateToEntity.bindDelegate(this, {
        view: 'account_detail',
        keyProperty: 'Account.$key',
        textProperty: 'Account.AccountName',
      }),
    }, {
      id: 'viewContact',
      label: this.viewContactActionText,
      enabled: action.hasProperty.bindDelegate(this, 'Contact.$key'),
      fn: action.navigateToEntity.bindDelegate(this, {
        view: 'contact_detail',
        keyProperty: 'Contact.$key',
        textProperty: 'Contact.NameLF',
      }),
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
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `TicketNumber like "${q}%" or AlternateKeySuffix like "${q}%" or upper(Subject) like "${q}%" or Account.AccountNameUpper like "${q}%"`;
  },
});

lang.setObject('Mobile.SalesLogix.Views.Ticket.List', __class);
export default __class;
