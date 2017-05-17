import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import action from '../../Action';
import format from '../../Format';
import template from '../../Template';
import MODEL_NAMES from '../../Models/Names';
import Detail from 'argos/Detail';
import getResource from 'argos/I18n';

const resource = getResource('contactDetail');

/**
 * @class crm.Views.Contact.Detail
 *
 * @extends argos.Detail
 *
 * @requires crm.Format
 * @requires crm.Template
 */
const __class = declare('crm.Views.Contact.Detail', [Detail], {
  // Localization
  accountText: resource.accountText,
  acctMgrText: resource.acctMgrText,
  addressText: resource.addressText,
  contactTitleText: resource.contactTitleText,
  createDateText: resource.createDateText,
  createUserText: resource.createUserText,
  emailText: resource.emailText,
  faxText: resource.faxText,
  homeText: resource.homeText,
  nameText: resource.nameText,
  ownerText: resource.ownerText,
  actionsText: resource.actionsText,
  relatedAccountsText: resource.relatedAccountsText,
  relatedActivitiesText: resource.relatedActivitiesText,
  relatedHistoriesText: resource.relatedHistoriesText,
  relatedItemsText: resource.relatedItemsText,
  relatedNotesText: resource.relatedNotesText,
  relatedOpportunitiesText: resource.relatedOpportunitiesText,
  relatedTicketsText: resource.relatedTicketsText,
  relatedAddressesText: resource.relatedAddressesText,
  relatedAttachmentText: resource.relatedAttachmentText,
  relatedAttachmentTitleText: resource.relatedAttachmentTitleText,
  titleText: resource.titleText,
  webText: resource.webText,
  workText: resource.workText,
  cuisinePreferenceText: resource.cuisinePreferenceText,
  callMobileNumberText: resource.callMobileNumberText,
  callWorkNumberText: resource.callWorkNumberText,
  calledText: resource.calledText,
  scheduleActivityText: resource.scheduleActivityText,
  addNoteText: resource.addNoteText,
  sendEmailText: resource.sendEmailText,
  viewAddressText: resource.viewAddressText,
  entityText: resource.entityText,

  // View Properties
  id: 'contact_detail',
  editView: 'contact_edit',
  historyEditView: 'history_edit',
  noteEditView: 'history_edit',
  enableOffline: true,
  resourceKind: 'contacts',
  modelName: MODEL_NAMES.CONTACT,

  navigateToHistoryInsert: function navigateToHistoryInsert(type, entry, complete) {
    this.refreshRequired = true;
    action.navigateToHistoryInsert(entry, complete);
  },
  recordCallToHistory: function recordCallToHistory(complete) {
    const entry = {
      $name: 'History',
      Type: 'atPhoneCall',
      ContactName: this.entry.NameLF,
      ContactId: this.entry.$key,
      AccountName: this.entry.AccountName,
      AccountId: this.entry.Account.$key,
      Description: `${this.calledText} ${this.entry.NameLF}`,
      UserId: App.context && App.context.user.$key,
      UserName: App.context && App.context.user.$descriptor,
      Duration: 15,
      CompletedDate: (new Date()),
    };

    this.navigateToHistoryInsert('atPhoneCall', entry, complete);
  },
  recordEmailToHistory: function recordEmailToHistory(complete) {
    const entry = {
      $name: 'History',
      Type: 'atEMail',
      ContactName: this.entry.NameLF,
      ContactId: this.entry.$key,
      AccountName: this.entry.AccountName,
      AccountId: this.entry.Account.$key,
      Description: `Emailed ${this.entry.NameLF}`,
      UserId: App.context && App.context.user.$key,
      UserName: App.context && App.context.user.$descriptor,
      Duration: 15,
      CompletedDate: (new Date()),
    };

    this.navigateToHistoryInsert('atEMail', entry, complete);
  },
  callWorkPhone: function callWorkPhone() {
    this.recordCallToHistory(function initiateCall() {
      App.initiateCall(this.entry.WorkPhone);
    }.bindDelegate(this));
  },
  callMobilePhone: function callMobilePhone() {
    this.recordCallToHistory(function initiateCall() {
      App.initiateCall(this.entry.Mobile);
    }.bindDelegate(this));
  },
  sendEmail: function sendEmail() {
    this.recordEmailToHistory(function initiateEmail() {
      App.initiateEmail(this.entry.Email);
    }.bindDelegate(this));
  },
  checkValueExists: function checkValueExists(entry, value) {
    return !value;
  },
  viewAddress: function viewAddress() {
    App.showMapForAddress(format.address(this.entry.Address, true, ' '));
  },
  checkAddress: function checkAddress(entry, value) {
    return !format.address(value, true, '');
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
      list: true,
      title: this.actionsText,
      cls: 'action-list',
      name: 'QuickActionsSection',
      children: [{
        name: 'CallWorkPhoneAction',
        property: 'WorkPhone',
        label: this.callWorkNumberText,
        action: 'callWorkPhone',
        iconClass: 'phone',
        disabled: this.checkValueExists,
        renderer: format.phone.bindDelegate(this, false),
      }, {
        name: 'CallMobilePhoneAction',
        property: 'Mobile',
        label: this.callMobileNumberText,
        action: 'callMobilePhone',
        iconClass: 'phone',
        disabled: this.checkValueExists,
        renderer: format.phone.bindDelegate(this, false),
      }, {
        name: 'ScheduleActivityAction',
        label: this.scheduleActivityText,
        action: 'scheduleActivity',
        iconClass: 'calendar',
        tpl: new Simplate([
          '{%: $.AccountName %} / {%: $.NameLF %}',
        ]),
      }, {
        name: 'AddNoteAction',
        property: 'NameLF',
        label: this.addNoteText,
        action: 'addNote',
        iconClass: 'quick-edit',
      }, {
        name: 'SendEmailAction',
        property: 'Email',
        label: this.sendEmailText,
        action: 'sendEmail',
        iconClass: 'mail',
        disabled: this.checkValueExists,
      }, {
        name: 'ViewAddressAction',
        property: 'Address',
        label: this.viewAddressText,
        action: 'viewAddress',
        iconClass: 'map-pin',
        disabled: this.checkAddress,
        renderer: format.address.bindDelegate(this, true, ' '),
      }],
    }, {
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        name: 'NameLF',
        property: 'NameLF',
        label: this.nameText,
      }, {
        name: 'AccountName',
        property: 'AccountName',
        descriptor: 'AccountName',
        label: this.accountText,
        view: 'account_detail',
        key: 'Account.$key',
      }, {
        name: 'WorkPhone',
        property: 'WorkPhone',
        label: this.workText,
        renderer: format.phone,
      }, {
        name: 'AccountManager.UserInfo',
        property: 'AccountManager.UserInfo',
        label: this.acctMgrText,
        tpl: template.nameLF,
      }, {
        name: 'HomePhone',
        property: 'HomePhone',
        label: this.homeText,
        renderer: format.phone,
      }, {
        name: 'WebAddress',
        property: 'WebAddress',
        label: this.webText,
        renderer: format.link,
      }, {
        name: 'Title',
        property: 'Title',
        label: this.contactTitleText,
      }, {
        name: 'Fax',
        property: 'Fax',
        label: this.faxText,
        renderer: format.phone,
      }, {
        name: 'Owner.OwnerDescription',
        property: 'Owner.OwnerDescription',
        label: this.ownerText,
      }, {
        name: 'CuisinePreference',
        property: 'CuisinePreference',
        label: this.cuisinePreferenceText,
      }],
    }, {
      title: this.relatedItemsText,
      name: 'RelatedItemsSection',
      list: true,
      children: [{
        name: 'ActivityRelated',
        label: this.relatedActivitiesText,
        view: 'activity_related',
        where: this.formatRelatedQuery.bindDelegate(this, 'ContactId eq "${0}"'),
      }, {
        name: 'OpportunityRelated',
        label: this.relatedOpportunitiesText,
        view: 'opportunity_related',
        where: this.formatRelatedQuery.bindDelegate(this, 'Contacts.Contact.Id eq "${0}"'),
      }, {
        name: 'TicketRelated',
        label: this.relatedTicketsText,
        view: 'ticket_related',
        where: this.formatRelatedQuery.bindDelegate(this, 'Contact.Id eq "${0}"'),
      }, {
        name: 'HistoryRelated',
        label: this.relatedHistoriesText,
        where: this.formatRelatedQuery.bindDelegate(this, 'ContactId eq "${0}" and Type ne "atDatabaseChange"'),
        view: 'history_related',
      }, {
        name: 'AddressesRelated',
        label: this.relatedAddressesText,
        where: this.formatRelatedQuery.bindDelegate(this, 'EntityId eq "${0}"', 'Address.EntityId'),
        view: 'address_related',
      }, {
        name: 'AttachmentRelated',
        label: this.relatedAttachmentText,
        where: this.formatRelatedQuery.bindDelegate(this, 'contactId eq "${0}"'), // must be lower case because of feed
        view: 'contact_attachment_related',
        title: this.relatedAttachmentTitleText,
      }],
    }]);
  },
});

lang.setObject('Mobile.SalesLogix.Views.Contact.Detail', __class);
export default __class;
