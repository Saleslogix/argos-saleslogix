import declare from 'dojo/_base/declare';
import string from 'dojo/string';
import lang from 'dojo/_base/lang';
import query from 'dojo/query';
import domClass from 'dojo/dom-class';
import format from '../../Format';
import ErrorManager from 'argos/ErrorManager';
import template from '../../Template';
import Detail from 'argos/Detail';
import getResource from 'argos/I18n';

const resource = getResource('historyDetail');

/**
 * @class crm.Views.History.Detail
 *
 * @extends argos.Detail
 *
 * @requires argos.ErrorManager
 *
 * @requires crm.Format
 * @requires crm.Template
 */
const __class = declare('crm.Views.History.Detail', [Detail], {
  // Templates
  createUserTemplate: template.nameLF,

  // Localization
  categoryText: resource.categoryText,
  completedText: resource.completedText,
  durationText: resource.durationText,
  leaderText: resource.leaderText,
  longNotesText: resource.longNotesText,
  notesText: resource.notesText,
  priorityText: resource.priorityText,
  regardingText: resource.regardingText,
  completedByText: resource.completedByText,
  scheduledText: resource.scheduledText,
  timelessText: resource.timelessText,
  companyText: resource.companyText,
  leadText: resource.leadText,
  titleText: resource.titleText,
  accountText: resource.accountText,
  contactText: resource.contactText,
  opportunityText: resource.opportunityText,
  ticketNumberText: resource.ticketNumberText,
  moreDetailsText: resource.moreDetailsText,
  relatedItemsText: resource.relatedItemsText,
  relatedAttachmentText: resource.relatedAttachmentText,
  relatedAttachmentTitleText: resource.relatedAttachmentTitleText,
  modifiedText: resource.modifiedText,
  typeText: resource.typeText,
  entityText: resource.entityText,
  activityTypeText: {
    'atToDo': resource.toDo,
    'atPhoneCall': resource.phoneCall,
    'atAppointment': resource.meeting,
    'atLiterature': resource.literature,
    'atPersonal': resource.personal,
    'atQuestion': resource.question,
    'atEMail': resource.email,
  },
  // View Properties
  id: 'history_detail',
  existsRE: /^[\w]{12}$/,
  editView: 'history_edit',
  dateFormatText: 'M/D/YYYY h:mm:ss A',
  resourceKind: 'history',
  security: null, // 'Entities/History/View',
  querySelect: [
    'AccountId',
    'AccountName',
    'Category',
    'ModifyDate',
    'CompletedDate',
    'ContactId',
    'ContactName',
    'CompletedUser',
    'Description',
    'Duration',
    'Notes',
    'LongNotes',
    'OpportunityId',
    'OpportunityName',
    'Priority',
    'StartDate',
    'TicketId',
    'TicketNumber',
    'LeadId',
    'LeadName',
    'Timeless',
    'Type',
    'UserName',
    'UserId',
  ],

  formatActivityType: function formatActivityType(val) {
    return this.activityTypeText[val] || val;
  },
  isHistoryForLead: function isHistoryForLead(entry) {
    return this.existsRE.test(entry && entry.LeadId);
  },
  isHistoryForActivity: function isHistoryForActivity(entry) {
    return this.existsRE.test(entry && entry.ActivityId);
  },
  isHistoryOfType: function isHistoryOfType(entry, type) {
    return entry && (entry.Type === type);
  },
  provideText: function provideText(entry) {
    return entry && (entry.LongNotes || entry.Notes);
  },
  requestCompletedUser: function requestCompletedUser(entry) {
    const completedUser = entry.CompletedUser;

    if (completedUser) {
      const request = new Sage.SData.Client.SDataSingleResourceRequest(this.getService())
        .setResourceKind('users')
        .setResourceSelector(string.substitute("'${0}'", [completedUser]))
        .setQueryArg('select', [
          'UserInfo/FirstName',
          'UserInfo/LastName',
        ].join(','));

      request.allowCacheUse = true;

      return request;
    }
  },
  requestCodeData: function requestCodeData(row, node, value, entry) {
    const request = this.requestCompletedUser(entry);
    if (request) {
      request.read({
        success: lang.hitch(this, this.onRequestCodeDataSuccess, row, node, value, entry),
        failure: this.onRequestCodeDataFailure,
        scope: this,
      });
    } else {
      this.onCodeDataNull();
    }
  },
  onRequestCodeDataSuccess: function onRequestCodeDataSuccess(row, node, value, entry, data) {
    const codeText = entry[row.property];
    this.setNodeText(node, this.createUserTemplate.apply(data.UserInfo));
    this.entry[row.name] = codeText;
  },
  onRequestCodeDataFailure: function onRequestCodeDataFailure(response, o) {
    const rowNode = query('[data-property="CompletedUser"]');
    if (rowNode) {
      this.setNodeText(rowNode[0], this.entry.UserName);
    }

    ErrorManager.addError(response, o, this.options, 'failure');
  },
  onCodeDataNull: function onCodeDataNull() {
    const rowNode = query('[data-property="CompletedUser"]');
    if (rowNode) {
      this.setNodeText(rowNode[0], '');
    }
  },
  setNodeText: function setNodeText(node, value) {
    domClass.remove(node, 'content-loading');

    query('span', node).text(value);
  },
  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      title: this.notesText,
      name: 'NotesSection',
      children: [{
        name: 'LongNotes',
        property: 'LongNotes',
        encode: false,
        label: this.longNotesText,
        provider: this.provideText.bindDelegate(this),
        use: template.noteDetailProperty,
      }],
    }, {
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        name: 'StartDate',
        property: 'StartDate',
        label: this.scheduledText,
        renderer: format.date.bindDelegate(this, this.dateFormatText),
        exclude: this.isHistoryOfType.bindDelegate(this, 'atNote'),
      }, {
        name: 'CompletedDate',
        property: 'CompletedDate',
        label: this.completedText,
        renderer: format.date.bindDelegate(this, this.dateFormatText),
        exclude: this.isHistoryOfType.bindDelegate(this, 'atNote'),
      }, {
        name: 'ModifyDate',
        property: 'ModifyDate',
        label: this.modifiedText,
        renderer: format.date.bindDelegate(this, this.dateFormatText),
        include: this.isHistoryOfType.bindDelegate(this, 'atNote'),
      }, {
        name: 'Description',
        property: 'Description',
        label: this.regardingText,
      }, {
        name: 'CompletedUser',
        property: 'CompletedUser',
        label: this.completedByText,
        value: this.loadingText,
        cls: 'content-loading',
        onCreate: this.requestCodeData.bindDelegate(this),
      }, {
        name: 'AccountName',
        property: 'AccountName',
        exclude: this.isHistoryForLead.bind(this),
        label: this.accountText,
        view: 'account_detail',
        key: 'AccountId',
        descriptor: 'AccountName',
      }, {
        name: 'ContactName',
        property: 'ContactName',
        exclude: this.isHistoryForLead.bind(this),
        label: this.contactText,
        view: 'contact_detail',
        key: 'ContactId',
        descriptor: 'ContactName',
      }, {
        name: 'OpportunityName',
        property: 'OpportunityName',
        exclude: this.isHistoryForLead.bind(this),
        label: this.opportunityText,
        view: 'opportunity_detail',
        key: 'OpportunityId',
        descriptor: 'OpportunityName',
      }, {
        name: 'TicketNumber',
        property: 'TicketNumber',
        exclude: this.isHistoryForLead.bind(this),
        label: this.ticketNumberText,
        view: 'ticket_detail',
        key: 'TicketId',
        descriptor: 'TicketNumber',
      }, {
        name: 'LeadName',
        property: 'LeadName',
        include: this.isHistoryForLead.bind(this),
        label: this.leadText,
        view: 'lead_detail',
        key: 'LeadId',
        descriptor: 'LeadName',
      }, {
        name: 'AccountName',
        property: 'AccountName',
        include: this.isHistoryForLead.bind(this),
        label: this.companyText,
      }],
    }, {
      title: this.relatedItemsText,
      list: true,
      name: 'RelatedItemsSection',
      children: [{
        name: 'AttachmentRelated',
        label: this.relatedAttachmentText,
        where: this.formatRelatedQuery.bindDelegate(this, 'historyId eq "${0}"'), // must be lower case because of feed
        view: 'history_attachment_related',
        title: this.relatedAttachmentTitleText,
      }],
    }]);
  },
});

lang.setObject('Mobile.SalesLogix.Views.History.Detail', __class);
export default __class;
