import lang from 'dojo/_base/lang';
import declare from 'dojo/_base/declare';
import string from 'dojo/string';
import format from '../../Format';
import convert from 'argos/Convert';
import action from '../../Action';
import List from 'argos/List';
import _RightDrawerListMixin from '../_RightDrawerListMixin';
import _MetricListMixin from '../_MetricListMixin';
import _CardLayoutListMixin from '../_CardLayoutListMixin';
import getResource from 'argos/I18n';

const resource = getResource('historyList');
const hashTagResource = getResource('historyListHashTags');
const dtFormatResource = getResource('historyListDateTimeFormat');

/**
 * @class crm.Views.History.List
 *
 * @extends argos.List
 * @mixins crm.Views._RightDrawerListMixin
 * @mixins crm.Views._MetricListMixin
 * @mixins crm.Views._GroupListMixin
 * @mixins crm.Views._CardLayoutListMixin
 *
 * @requires argos.Convert
 *
 * @requires crm.Format
 * @requires crm.Action
 *
 * @requires moment
 */
const __class = declare('crm.Views.History.List', [List, _RightDrawerListMixin, _MetricListMixin, _CardLayoutListMixin], {
  // Templates
  itemTemplate: new Simplate([
    '<h3>',
    '{% if ($.Type === "atNote") { %}',
    '{%: $$.formatDate($.ModifyDate) %}',
    '{% } else { %}',
    '{%: $$.formatDate($.CompletedDate) %}',
    '{% } %}',
    '</h3>',
    '<h4>{%= $$.nameTemplate.apply($) %}</h4>',
    '{% if($.Description) { %}',
    '<h4>{%: $$.regardingText + $.Description %}</h4>',
    '{% } %}',
    '<div class="note-text-item">',
    '<div class="note-text-wrap">',
    '{%: $.Notes %}',
    '</div>',
    '</div>',
  ]),
  nameTemplate: new Simplate([
    '{% if ($.LeadName && $.AccountName) { %}',
    '{%: $.LeadName %} | {%: $.AccountName %}',
    '{% } else if ($.LeadName) { %}',
    '{%: $.LeadName %}',
    '{% } else if ($.ContactName && $.AccountName) { %}',
    '{%: $.ContactName %} | {%: $.AccountName %}',
    '{% } else if ($.ContactName) { %}',
    '{%: $.ContactName %}',
    '{% } else { %}',
    '{%: $.AccountName %}',
    '{% } %}',
  ]),

  // Localization
  hourMinuteFormatText: dtFormatResource.hourMinuteFormatText,
  hourMinuteFormatText24: dtFormatResource.hourMinuteFormatText24,
  dateFormatText: dtFormatResource.dateFormatText,
  titleText: resource.titleText,
  viewAccountActionText: resource.viewAccountActionText,
  viewOpportunityActionText: resource.viewOpportunityActionText,
  viewContactActionText: resource.viewContactActionText,
  addAttachmentActionText: resource.addAttachmentActionText,
  regardingText: resource.regardingText,
  activityTypeText: {
    atToDo: resource.toDo,
    atPhoneCall: resource.phoneCall,
    atAppointment: resource.meeting,
    atLiterature: resource.literature,
    atPersonal: resource.personal,
    atQuestion: resource.question,
    atEMail: resource.email,
  },
  hashTagQueriesText: {
    'my-history': hashTagResource.myHistoryHash,
    note: hashTagResource.noteHash,
    phonecall: hashTagResource.phoneCallHash,
    meeting: hashTagResource.meetingHash,
    personal: hashTagResource.personalHash,
    email: hashTagResource.emailHash,
  },

  // View Properties
  detailView: 'history_detail',
  itemIconClass: 'fa fa-archive fa-2x',
  id: 'history_list',
  security: null, // 'Entities/History/View',
  existsRE: /^[\w]{12}$/,
  insertView: 'history_edit',
  queryOrderBy: 'CompletedDate desc',
  querySelect: [
    'AccountName',
    'ContactName',
    'LeadName',
    'CompletedDate',
    'Description',
    'StartDate',
    'TimeLess',
    'Type',
    'LeadId',
    'OpportunityId',
    'OpportunityName',
    'AccountId',
    'ContactId',
    'TicketId',
    'ModifyDate',
    'Notes',

  ],
  queryWhere: 'Type ne "atDatabaseChange"',
  resourceKind: 'history',
  entityName: 'History',
  hashTagQueries: {
    'my-history': function myHistory() {
      return `UserId eq "${App.context.user.$key}"`;
    },
    note: 'Type eq "atNote"',
    phonecall: 'Type eq "atPhoneCall"',
    meeting: 'Type eq "atAppointment"',
    personal: 'Type eq "atPersonal"',
    email: 'Type eq "atEMail"',
  },
  activityIndicatorIconByType: {
    atToDo: 'fa fa-list-ul fa-2x',
    atPhoneCall: 'fa fa-phone fa-2x',
    atAppointment: 'fa fa-calendar-o fa-2x',
    atLiterature: 'fa fa-book fa-2x',
    atPersonal: 'fa fa-check-square-o fa-2x',
    atQuestion: 'fa fa-question-circle fa-2x',
    atNote: 'fa fa-file-text-o fa-2x',
    atEMail: 'fa fa-envelope fa-2x',
  },
  allowSelection: true,
  enableActions: true,

  createActionLayout: function createActionLayout() {
    return this.actions || (this.actions = [{
      id: 'viewAccount',
      label: this.viewAccountActionText,
      enabled: action.hasProperty.bindDelegate(this, 'AccountId'),
      fn: action.navigateToEntity.bindDelegate(this, {
        view: 'account_detail',
        keyProperty: 'AccountId',
        textProperty: 'AccountName',
      }),
    }, {
      id: 'viewOpportunity',
      label: this.viewOpportunityActionText,
      enabled: action.hasProperty.bindDelegate(this, 'OpportunityId'),
      fn: action.navigateToEntity.bindDelegate(this, {
        view: 'opportunity_detail',
        keyProperty: 'OpportunityId',
        textProperty: 'OpportunityName',
      }),
    }, {
      id: 'viewContact',
      label: this.viewContactActionText,
      action: 'navigateToContactOrLead',
      enabled: this.hasContactOrLead,
    }, {
      id: 'addAttachment',
      cls: 'fa fa-paperclip fa-2x',
      label: this.addAttachmentActionText,
      fn: action.addAttachment.bindDelegate(this),
    }]);
  },
  hasContactOrLead: function hasContactOrLead(theAction, selection) {
    return (selection.data.ContactId) || (selection.data.LeadId);
  },
  navigateToContactOrLead: function navigateToContactOrLead(theAction, selection) {
    const entity = this.resolveContactOrLeadEntity(selection.data);
    let viewId;
    let options;

    switch (entity) {
      case 'Contact':
        viewId = 'contact_detail';
        options = {
          key: selection.data.ContactId,
          descriptor: selection.data.ContactName,
        };
        break;
      case 'Lead':
        viewId = 'lead_detail';
        options = {
          key: selection.data.LeadId,
          descriptor: selection.data.LeadName,
        };
        break;
      default:
    }

    const view = App.getView(viewId);

    if (view && options) {
      view.show(options);
    }
  },
  resolveContactOrLeadEntity: function resolveContactOrLeadEntity(entry) {
    const exists = this.existsRE;

    if (entry) {
      if (exists.test(entry.LeadId)) {
        return 'Lead';
      }
      if (exists.test(entry.ContactId)) {
        return 'Contact';
      }
    }
  },
  formatDate: function formatDate(date) {
    const startDate = moment(convert.toDateFromString(date));
    const nextDate = startDate.clone().add({
      hours: 24,
    });
    let fmt = this.dateFormatText;

    if (startDate.valueOf() < nextDate.valueOf() && startDate.valueOf() > moment().startOf('day').valueOf()) {
      fmt = (App.is24HourClock()) ? this.hourMinuteFormatText24 : this.hourMinuteFormatText;
    }

    return format.date(startDate.toDate(), fmt);
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute('upper(Description) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
  createIndicatorLayout: function createIndicatorLayout() {
    return this.itemIndicators || (this.itemIndicators = [{
      id: 'touched',
      cls: 'fa fa-hand-o-up fa-lg',
      label: 'Touched',
      onApply: function onApply(entry, parent) {
        this.isEnabled = parent.hasBeenTouched(entry);
      },
    }]);
  },
  getItemIconClass: function getItemIconClass(entry) {
    const type = entry && entry.Type;
    return this._getItemIconClass(type);
  },
  _getItemIconClass: function _getItemIconClass(type) {
    let cls = this.activityIndicatorIconByType[type];
    if (!cls) {
      cls = this.itemIconClass;
    }

    return cls;
  },
  init: function init() {
    this.inherited(arguments);
  },
});

lang.setObject('Mobile.SalesLogix.Views.History.List', __class);
export default __class;
