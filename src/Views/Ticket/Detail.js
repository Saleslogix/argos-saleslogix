import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import format from '../../Format';
import Detail from 'argos/Detail';

/**
 * @class crm.Views.Ticket.Detail
 *
 * @extends argos.Detail
 *
 * @requires argos.ErrorManager
 *
 * @requires crm.Format
 */
const __class = declare('crm.Views.Ticket.Detail', [Detail], {
  // Localization
  accountText: 'account',
  areaText: 'area',
  assignedDateText: 'assigned date',
  assignedToText: 'assigned to',
  completedByText: 'completed by',
  categoryText: 'category',
  contactText: 'contact',
  contractText: 'contract',
  descriptionText: 'desc',
  issueText: 'issue',
  needByText: 'needed date',
  notesText: 'comments',
  phoneText: 'phone',
  actionsText: 'Quick Actions',
  relatedAttachmentText: 'Attachments',
  relatedAttachmentTitleText: 'Ticket Attachments',
  relatedActivitiesText: 'Activities',
  relatedItemsText: 'Related Items',
  resolutionText: 'resolution',
  sourceText: 'source',
  statusText: 'status',
  subjectText: 'subject',
  ticketIdText: 'ticket number',
  titleText: 'Ticket',
  urgencyText: 'urgency',
  scheduleActivityText: 'Schedule activity',
  moreDetailsText: 'More Details',
  relatedTicketActivitiesText: 'Ticket Activities',
  loadingText: 'loading...',
  entityText: 'Ticket',

  // View Properties
  id: 'ticket_detail',
  editView: 'ticket_edit',
  enableOffline: true,
  modelName: 'ticket',

  scheduleActivity: function scheduleActivity() {
    App.navigateToActivityInsertView();
  },

  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      list: true,
      title: this.actionsText,
      cls: 'action-list',
      name: 'QuickActionsSection',
      children: [{
        name: 'ScheduleActivityAction',
        property: 'TicketNumber',
        label: this.scheduleActivityText,
        iconClass: 'fa fa-calendar fa-lg',
        action: 'scheduleActivity',
      }],
    }, {
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        name: 'Account.AccountName',
        property: 'Account.AccountName',
        descriptor: 'Account.AccountName',
        label: this.accountText,
        view: 'account_detail',
        key: 'Account.$key',
      }, {
        name: 'Contact.NameLF',
        property: 'Contact.NameLF',
        descriptor: 'Contact.NameLF',
        label: this.contactText,
        view: 'contact_detail',
        key: 'Contact.$key',
      }, {
        label: this.assignedToText,
        name: 'AssignedTo.OwnerDescription',
        property: 'AssignedTo.OwnerDescription',
      }, {
        label: this.urgencyText,
        name: 'Urgency.Description',
        property: 'Urgency.Description',
      }, {
        label: this.needByText,
        name: 'NeededByDate',
        property: 'NeededByDate',
        renderer: format.date,
      }],
    }, {
      title: this.moreDetailsText,
      name: 'MoreDetailsSection',
      collapsed: true,
      children: [{
        label: this.areaText,
        name: 'Area',
        property: 'Area',
      }, {
        label: this.categoryText,
        name: 'Category',
        property: 'Category',
      }, {
        label: this.issueText,
        name: 'Issue',
        property: 'Issue',
      }, {
        label: this.subjectText,
        name: 'Subject',
        property: 'Subject',
      }, {
        label: this.descriptionText,
        name: 'TicketProblem.Notes',
        property: 'TicketProblem.Notes',
      }, {
        label: this.statusText,
        name: 'StatusCode',
        property: 'StatusCode',
      }, {
        label: this.completedByText,
        name: 'CompletedBy.OwnerDescription',
        property: 'CompletedBy.OwnerDescription',
      }, {
        label: this.contractText,
        name: 'Contract.ReferenceNumber',
        property: 'Contract.ReferenceNumber',
      }, {
        label: this.sourceText,
        name: 'ViaCode',
        property: 'ViaCode',
      }, {
        label: this.assignedDateText,
        name: 'AssignedDate',
        property: 'AssignedDate',
        renderer: format.date,
      }, {
        label: this.resolutionText,
        name: 'TicketSolution.Notes',
        property: 'TicketSolution.Notes',
      }, {
        label: this.notesText,
        name: 'Notes',
        property: 'Notes',
      }],
    }, {
      list: true,
      title: this.relatedItemsText,
      name: 'RelatedItemsSection',
      children: [{
        name: 'ActivityRelated',
        label: this.relatedActivitiesText,
        view: 'activity_related',
        where: this.formatRelatedQuery.bindDelegate(this, 'TicketId eq "${0}"'),
      }, {
        name: 'TicketActivityRelated',
        label: this.relatedTicketActivitiesText,
        view: 'ticketactivity_related',
        where: this.formatRelatedQuery.bindDelegate(this, 'Ticket.Id eq "${0}"'),
      }, {
        name: 'AttachmentRelated',
        label: this.relatedAttachmentText,
        where: this.formatRelatedQuery.bindDelegate(this, 'ticketId eq "${0}"'), // must be lower case because of feed
        view: 'ticket_attachment_related',
        title: this.relatedAttachmentTitleText,
      }],
    }]);
  },
});

lang.setObject('Mobile.SalesLogix.Views.Ticket.Detail', __class);
export default __class;
