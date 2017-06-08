import declare from 'dojo/_base/declare';
import string from 'dojo/string';
import lang from 'dojo/_base/lang';
import action from '../../Action';
import format from '../../Format';
import template from '../../Template';
import MODEL_NAMES from '../../Models/Names';
import Detail from 'argos/Detail';
import getResource from 'argos/I18n';

const resource = getResource('accountDetail');

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
  accountText: resource.accountText,
  acctMgrText: resource.acctMgrText,
  addressText: resource.addressText,
  businessDescriptionText: resource.businessDescriptionText,
  createDateText: resource.createDateText,
  createUserText: resource.createUserText,
  faxText: resource.faxText,
  importSourceText: resource.importSourceText,
  industryText: resource.industryText,
  notesText: resource.notesText,
  ownerText: resource.ownerText,
  phoneText: resource.phoneText,
  actionsText: resource.actionsText,
  relatedActivitiesText: resource.relatedActivitiesText,
  relatedContactsText: resource.relatedContactsText,
  relatedHistoriesText: resource.relatedHistoriesText,
  relatedItemsText: resource.relatedItemsText,
  relatedNotesText: resource.relatedNotesText,
  relatedOpportunitiesText: resource.relatedOpportunitiesText,
  relatedTicketsText: resource.relatedTicketsText,
  relatedAddressesText: resource.relatedAddressesText,
  relatedAttachmentText: resource.relatedAttachmentText,
  relatedAttachmentTitleText: resource.relatedAttachmentTitleText,
  statusText: resource.statusText,
  subTypeText: resource.subTypeText,
  titleText: resource.titleText,
  typeText: resource.typeText,
  webText: resource.webText,
  scheduleActivityText: resource.scheduleActivityText,
  addNoteText: resource.addNoteText,
  calledText: resource.calledText,
  entityText: resource.entityText,

  // View Properties
  id: 'account_detail',
  editView: 'account_edit',
  historyEditView: 'history_edit',
  noteEditView: 'history_edit',
  enableOffline: true,
  resourceKind: 'accounts',
  modelName: MODEL_NAMES.ACCOUNT,

  navigateToHistoryInsert: function navigateToHistoryInsert(type, entry) {
    action.navigateToHistoryInsert(entry);
  },
  recordCallToHistory: function recordCallToHistory(phoneNumber) {
    const entry = {
      Type: 'atPhoneCall',
      AccountId: this.entry.$key,
      AccountName: this.entry.AccountName,
      Description: string.substitute(this.calledText, [this.entry.AccountName]),
      UserId: App.context && App.context.user.$key,
      UserName: App.context && App.context.user.UserName,
      Duration: 15,
      CompletedDate: (new Date()),
    };

    this.navigateToHistoryInsert('atPhoneCall', entry);
    App.initiateCall(phoneNumber);
  },
  callMainPhone: function callMainPhone() {
    this.recordCallToHistory(this.entry.MainPhone);
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
  formatPicklist: function formatPicklist(property) {
    return format.picklist(this.app.picklistService, this._model, property);
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
        iconClass: 'calendar',
        action: 'scheduleActivity',
      }, {
        name: 'AddNoteAction',
        property: 'AccountName',
        label: this.addNoteText,
        iconClass: 'edit',
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
        renderer: this.formatPicklist('Status'),
      }, {
        name: 'AccountManager.UserInfo',
        property: 'AccountManager.UserInfo',
        label: this.acctMgrText,
        tpl: template.nameLF,
      }, {
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
        renderer: this.formatPicklist('Type'),
      }, {
        name: 'SubType',
        property: 'SubType',
        label: this.subTypeText,
        renderer: format.picklist(this.app.picklistService, null, null, `Account ${this.entry.Type}`),
      }, {
        name: 'Industry',
        property: 'Industry',
        label: this.industryText,
        type: 'text',
        renderer: this.formatPicklist('Industry'),
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
