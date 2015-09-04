import declare from 'dojo/_base/declare';
import string from 'dojo/string';
import lang from 'dojo/_base/lang';
import format from '../../Format';
import template from '../../Template';
import Detail from 'argos/Detail';
import AccountModel from '../../Models/Account';

/**
 * @class crm.Views.Account.Detail
 *
 *
 * @extends argos.Detail
 * @requires argos.Detail
 * @requires crm.Format
 * @requires crm.Template
 *
 */
const __class = declare('crm.Views.Account.Detail', [Detail], {
  // Localization
  accountText: 'account',
  acctMgrText: 'acct mgr',
  addressText: 'address',
  businessDescriptionText: 'bus desc',
  createDateText: 'create date',
  createUserText: 'create user',
  faxText: 'fax',
  importSourceText: 'lead source',
  industryText: 'industry',
  notesText: 'notes',
  ownerText: 'owner',
  phoneCallHistoryTitle: 'Phone Call',
  phoneText: 'phone',
  activityTypeText: {
    'atPhoneCall': 'Phone Call',
  },
  actionsText: 'Quick Actions',
  relatedActivitiesText: 'Activities',
  relatedContactsText: 'Contacts',
  relatedHistoriesText: 'Notes/History',
  relatedItemsText: 'Related Items',
  relatedNotesText: 'Notes',
  relatedOpportunitiesText: 'Opportunities',
  relatedTicketsText: 'Tickets',
  relatedAddressesText: 'Addresses',
  relatedAttachmentText: 'Attachments',
  relatedAttachmentTitleText: 'Account Attachments',
  statusText: 'status',
  subTypeText: 'subtype',
  titleText: 'Account',
  typeText: 'type',
  webText: 'web',
  scheduleActivityText: 'Schedule activity',
  addNoteText: 'Add note',
  moreDetailsText: 'More Details',
  calledText: 'Called ${0}',
  entityText: 'Account',

  // View Properties
  id: 'account_detail',
  editView: 'account_edit',
  historyEditView: 'history_edit',
  noteEditView: 'history_edit',
  enableOffline: true,
  getModel: function getModel() {
    const model = new AccountModel();
    return model;
  },

  navigateToHistoryInsert: function navigateToHistoryInsert(type, entry, complete) {
    const view = App.getView(this.historyEditView);
    if (view) {
      this.refreshRequired = true;

      view.show({
        title: this.activityTypeText[type],
        template: {},
        entry: entry,
        insert: true,
      }, {
        complete: complete,
      });
    }
  },
  recordCallToHistory: function recordCallToHistory(complete) {
    const entry = {
      'Type': 'atPhoneCall',
      'AccountId': this.entry.$key,
      'AccountName': this.entry.AccountName,
      'Description': string.substitute(this.calledText, [this.entry.AccountName]),
      'UserId': App.context && App.context.user.$key,
      'UserName': App.context && App.context.user.UserName,
      'Duration': 15,
      'CompletedDate': (new Date()),
    };

    this.navigateToHistoryInsert('atPhoneCall', entry, complete);
  },
  callMainPhone: function callMainPhone() {
    this.recordCallToHistory(lang.hitch(this, function initiateCall() {
      App.initiateCall(this.entry.MainPhone);
    }));
  },
  scheduleActivity: function scheduleActivity() {
    App.navigateToActivityInsertView();
  },
  addNote: function addNote() {
    const view = App.getView(this.noteEditView);
    if (view) {
      view.show({
        template: {},
        insert: true,
      });
    }
  },
  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      title: this.actionsText,
      list: true,
      cls: 'action-list',
      name: 'QuickActionsSection',
      children: [{
        name: 'ScheduleActivityAction',
        property: 'AccountName',
        label: this.scheduleActivityText,
        iconClass: 'fa fa-calendar fa-lg',
        action: 'scheduleActivity',
      }, {
        name: 'AddNoteAction',
        property: 'AccountName',
        label: this.addNoteText,
        iconClass: 'fa fa-edit fa-lg',
        action: 'addNote',
      }],
    }, {
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        name: 'AccountName',
        property: 'AccountName',
        label: this.accountText,
      }, {
        name: 'MainPhone',
        property: 'MainPhone',
        label: this.phoneText,
        renderer: format.phone.bindDelegate(this, false),
        action: 'callMainPhone',
      }, {
        name: 'Status',
        property: 'Status',
        label: this.statusText,
      }, {
        name: 'AccountManager.UserInfo',
        property: 'AccountManager.UserInfo',
        label: this.acctMgrText,
        tpl: template.nameLF,
      }],
    }, {
      title: this.moreDetailsText,
      name: 'MoreDetailsSection',
      collapsed: true,
      children: [{
        name: 'WebAddress',
        property: 'WebAddress',
        label: this.webText,
        renderer: format.link,
      }, {
        name: 'Address',
        property: 'Address',
        label: this.addressText,
        renderer: format.address.bindDelegate(this, false),
      }, {
        name: 'Fax',
        property: 'Fax',
        label: this.faxText,
        renderer: format.phone.bindDelegate(this, true),
      }, {
        name: 'Type',
        property: 'Type',
        label: this.typeText,
      }, {
        name: 'SubType',
        property: 'SubType',
        label: this.subTypeText,
      }, {
        name: 'Industry',
        property: 'Industry',
        label: this.industryText,
        type: 'text',
      }, {
        name: 'BusinessDescription',
        property: 'BusinessDescription',
        label: this.businessDescriptionText,
        type: 'text',
      }, {
        name: 'LeadSource.Description',
        property: 'LeadSource.Description',
        label: this.importSourceText,
      }, {
        name: 'Owner.OwnerDescription',
        property: 'Owner.OwnerDescription',
        label: this.ownerText,
      }],
    }, {
      title: this.relatedItemsText,
      list: true,
      name: 'RelatedItemsSection',
      children: [{
        name: 'ActivityRelated',
        label: this.relatedActivitiesText,
        where: this.formatRelatedQuery.bindDelegate(this, 'AccountId eq "${0}"'),
        view: 'activity_related',
      }, {
        name: 'ContactRelated',
        label: this.relatedContactsText,
        where: this.formatRelatedQuery.bindDelegate(this, 'Account.id eq "${0}"'),
        view: 'contact_related',
      }, {
        name: 'OpportunityRelated',
        label: this.relatedOpportunitiesText,
        where: this.formatRelatedQuery.bindDelegate(this, 'Account.id eq "${0}"'),
        view: 'opportunity_related',
      }, {
        name: 'TicketRelated',
        label: this.relatedTicketsText,
        where: this.formatRelatedQuery.bindDelegate(this, 'Account.id eq "${0}"'),
        view: 'ticket_related',
      }, {
        name: 'HistoryRelated',
        label: this.relatedHistoriesText,
        where: this.formatRelatedQuery.bindDelegate(this, 'AccountId eq "${0}" and Type ne "atDatabaseChange"'),
        view: 'history_related',
      }, {
        name: 'AddressesRelated',
        label: this.relatedAddressesText,
        where: this.formatRelatedQuery.bindDelegate(this, 'EntityId eq "${0}"', 'Address.EntityId'),
        view: 'address_related',
      }, {
        name: 'AttachmentRelated',
        label: this.relatedAttachmentText,
        where: this.formatRelatedQuery.bindDelegate(this, 'accountId eq "${0}"'), // must be lower case because of feed
        view: 'account_attachment_related',
        title: this.relatedAttachmentTitleText,
      }],
    }]);
  },
});

lang.setObject('Mobile.SalesLogix.Views.Account.Detail', __class);
export default __class;
