import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import format from '../../Format';
import Detail from 'argos/Detail';
import Utility from 'argos/Utility';

/**
 * @class crm.Views.Lead.Detail
 *
 * @extends argos.Detail
 *
 * @requires crm.Format
 */
const __class = declare('crm.Views.Lead.Detail', [Detail], {
  // Localization
  localeId: 'leadDetail',
  activityTypeText: {
  },
  activityTypeKeys: [
    'atPhoneCall',
    'atEMail',
  ],
  activityTypeValues: null,

  // View Properties
  id: 'lead_detail',
  editView: 'lead_edit',
  historyEditView: 'history_edit',
  noteEditView: 'history_edit',
  security: 'Entities/Lead/View',
  querySelect: [
    'Address/*',
    'BusinessDescription',
    'Company',
    'CreateDate',
    'CreateUser',
    'Email',
    'FirstName',
    'FullAddress',
    'Industry',
    'Interests',
    'LastName',
    'LeadNameLastFirst',
    'LeadSource/Description',
    'MiddleName',
    'Mobile',
    'Notes',
    'Owner/OwnerDescription',
    'Prefix',
    'SICCode',
    'Suffix',
    'Title',
    'TollFree',
    'WebAddress',
    'WorkPhone',
  ],
  resourceKind: 'leads',

  navigateToHistoryInsert: function navigateToHistoryInsert(type, entry, complete) {
    const view = App.getView(this.historyEditView);
    if (!this.activityTypeValues) {
      this.activityTypeValues = [
        this.phoneCall,
        this.email,
      ];
      Utility.extendObjectKeyValue(this.activityTypeText, this.activityTypeKeys, this.activityTypeValues);
    }
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
      '$name': 'History',
      'Type': 'atPhoneCall',
      'AccountName': this.entry.Company,
      'LeadId': this.entry.$key,
      'LeadName': this.entry.LeadNameLastFirst,
      'Description': string.substitute(this.calledText, [this.entry.LeadNameLastFirst]),
      'UserId': App.context && App.context.user.$key,
      'UserName': App.context && App.context.user.UserName,
      'Duration': 15,
      'CompletedDate': (new Date()),
    };

    this.navigateToHistoryInsert('atPhoneCall', entry, complete);
  },
  recordEmailToHistory: function recordEmailToHistory(complete) {
    const entry = {
      '$name': 'History',
      'Type': 'atEMail',
      'AccountName': this.entry.Company,
      'LeadId': this.entry.$key,
      'LeadName': this.entry.LeadNameLastFirst,
      'Description': string.substitute(this.emailedText, [this.entry.LeadNameLastFirst]),
      'UserId': App.context && App.context.user.$key,
      'UserName': App.context && App.context.user.UserName,
      'Duration': 15,
      'CompletedDate': (new Date()),
    };

    this.navigateToHistoryInsert('atEMail', entry, complete);
  },
  callWorkPhone: function callWorkPhone() {
    this.recordCallToHistory(function initiateCall() {
      App.initiateCall(this.entry.WorkPhone);
    }.bindDelegate(this));
  },
  checkWorkPhone: function checkWorkPhone(entry, value) {
    return !value;
  },
  sendEmail: function sendEmail() {
    this.recordEmailToHistory(function initiateEmail() {
      App.initiateEmail(this.entry.Email);
    }.bindDelegate(this));
  },
  checkEmail: function checkEmail(entry, value) {
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
        iconClass: 'fa fa-phone-square fa-lg',
        disabled: this.checkWorkPhone,
        renderer: format.phone.bindDelegate(this, false),
      }, {
        name: 'CheckEmailAction',
        property: 'Email',
        label: this.sendEmailText,
        action: 'sendEmail',
        iconClass: 'fa fa-envelope fa-lg',
        disabled: this.checkEmail,
      }, {
        name: 'ScheduleActivityAction',
        label: this.scheduleActivityText,
        action: 'scheduleActivity',
        iconClass: 'fa fa-calendar fa-lg',
        tpl: new Simplate([
          '{%: $.Company %} / {%: $.LeadNameLastFirst %}',
        ]),
      }, {
        name: 'AddNoteAction',
        property: 'LeadNameLastFirst',
        iconClass: 'fa fa-edit fa-lg',
        label: this.addNoteText,
        action: 'addNote',
      }, {
        name: 'ViewAddressAction',
        property: 'Address',
        label: this.viewAddressText,
        action: 'viewAddress',
        iconClass: 'fa fa-map-marker fa-lg',
        disabled: this.checkAddress,
        renderer: format.address.bindDelegate(this, [true, ' ']),
      }],
    }, {
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        label: this.nameText,
        name: 'LeadNameLastFirst',
        property: 'LeadNameLastFirst',
      }, {
        label: this.accountText,
        name: 'Company',
        property: 'Company',
      }, {
        label: this.leadTitleText,
        name: 'Title',
        property: 'Title',
      }],
    }, {
      title: this.moreDetailsText,
      name: 'MoreDetailsSection',
      collapsed: true,
      children: [{
        label: this.workText,
        name: 'WorkPhone',
        property: 'WorkPhone',
        renderer: format.phone,
      }, {
        label: this.mobileText,
        name: 'Mobile',
        property: 'Mobile',
        renderer: format.phone,
      }, {
        label: this.tollFreeText,
        name: 'TollFree',
        property: 'TollFree',
        renderer: format.phone,
      }, {
        label: this.leadSourceText,
        name: 'LeadSource.Description',
        property: 'LeadSource.Description',
      }, {
        label: this.webText,
        name: 'WebAddress',
        property: 'WebAddress',
        renderer: format.link,
      }, {
        label: this.interestsText,
        name: 'Interests',
        property: 'Interests',
      }, {
        label: this.industryText,
        name: 'Industry',
        property: 'Industry',
      }, {
        label: this.sicCodeText,
        name: 'SICCode',
        property: 'SICCode',
      }, {
        label: this.businessDescriptionText,
        name: 'BusinessDescription',
        property: 'BusinessDescription',
      }, {
        label: this.notesText,
        name: 'Notes',
        property: 'Notes',
      }, {
        label: this.ownerText,
        name: 'Owner.OwnerDescription',
        property: 'Owner.OwnerDescription',
      }],
    }, {
      list: true,
      title: this.relatedItemsText,
      name: 'RelatedItemsSection',
      children: [{
        name: 'ActivityRelated',
        label: this.relatedActivitiesText,
        view: 'activity_related',
        where: this.formatRelatedQuery.bindDelegate(this, 'LeadId eq "${0}"'),
      }, {
        name: 'HistoryRelated',
        label: this.relatedHistoriesText,
        where: this.formatRelatedQuery.bindDelegate(this, 'LeadId eq "${0}" and Type ne "atDatabaseChange"'),
        view: 'history_related',
      }, {
        name: 'AttachmentRelated',
        label: this.relatedAttachmentText,
        where: this.formatRelatedQuery.bindDelegate(this, 'leadId eq "${0}"'), // must be lower case because of feed
        view: 'lead_attachment_related',
        title: this.relatedAttachmentTitleText,
      }],
    }]);
  },
});

lang.setObject('Mobile.SalesLogix.Views.Lead.Detail', __class);
export default __class;
