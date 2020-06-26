define("crm/Views/Contact/Detail", ["exports", "dojo/_base/declare", "../../Action", "../../Format", "../../Template", "../../Models/Names", "argos/Detail", "argos/I18n", "dojo/string"], function (_exports, _declare, _Action, _Format, _Template, _Names, _Detail, _I18n, _string) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _Action = _interopRequireDefault(_Action);
  _Format = _interopRequireDefault(_Format);
  _Template = _interopRequireDefault(_Template);
  _Names = _interopRequireDefault(_Names);
  _Detail = _interopRequireDefault(_Detail);
  _I18n = _interopRequireDefault(_I18n);
  _string = _interopRequireDefault(_string);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  /* Copyright 2017 Infor
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  var resource = (0, _I18n["default"])('contactDetail');

  var __class = (0, _declare["default"])('crm.Views.Contact.Detail', [_Detail["default"]], {
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
    modelName: _Names["default"].CONTACT,
    navigateToHistoryInsert: function navigateToHistoryInsert(type, entry) {
      this.refreshRequired = true;

      _Action["default"].navigateToHistoryInsert(entry);
    },
    recordCallToHistory: function recordCallToHistory(phoneNumber) {
      var entry = {
        $name: 'History',
        Type: 'atPhoneCall',
        ContactName: this.entry.NameLF,
        ContactId: this.entry.$key,
        AccountName: this.entry.AccountName,
        AccountId: this.entry.Account.$key,
        Description: _string["default"].substitute(this.calledText, [this.entry.Name]),
        UserId: App.context && App.context.user.$key,
        UserName: App.context && App.context.user.$descriptor,
        Duration: 15,
        CompletedDate: new Date()
      };
      this.navigateToHistoryInsert('atPhoneCall', entry);
      App.initiateCall(phoneNumber);
    },
    recordEmailToHistory: function recordEmailToHistory(email) {
      var entry = {
        $name: 'History',
        Type: 'atEMail',
        ContactName: this.entry.NameLF,
        ContactId: this.entry.$key,
        AccountName: this.entry.AccountName,
        AccountId: this.entry.Account.$key,
        Description: "Emailed ".concat(this.entry.Name),
        UserId: App.context && App.context.user.$key,
        UserName: App.context && App.context.user.$descriptor,
        Duration: 15,
        CompletedDate: new Date()
      };
      this.navigateToHistoryInsert('atEMail', entry);
      App.initiateEmail(email);
    },
    callWorkPhone: function callWorkPhone() {
      this.recordCallToHistory(this.entry.WorkPhone);
    },
    callMobilePhone: function callMobilePhone() {
      this.recordCallToHistory(this.entry.Mobile);
    },
    sendEmail: function sendEmail() {
      this.recordEmailToHistory(this.entry.Email);
    },
    checkValueExists: function checkValueExists(entry, value) {
      return !value;
    },
    viewAddress: function viewAddress() {
      App.showMapForAddress(_Format["default"].address(this.entry.Address, true, ' '));
    },
    checkAddress: function checkAddress(entry, value) {
      return !_Format["default"].address(value, true, '');
    },
    scheduleActivity: function scheduleActivity() {
      App.navigateToActivityInsertView();
    },
    addNote: function addNote() {
      var view = App.getView(this.noteEditView);

      if (view) {
        view.show({
          template: {},
          insert: true
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
          renderer: _Format["default"].phone.bindDelegate(this, false)
        }, {
          name: 'CallMobilePhoneAction',
          property: 'Mobile',
          label: this.callMobileNumberText,
          action: 'callMobilePhone',
          iconClass: 'phone',
          disabled: this.checkValueExists,
          renderer: _Format["default"].phone.bindDelegate(this, false)
        }, {
          name: 'ScheduleActivityAction',
          label: this.scheduleActivityText,
          action: 'scheduleActivity',
          iconClass: 'calendar',
          tpl: new Simplate(['{%: $.AccountName %} / {%: $.NameLF %}'])
        }, {
          name: 'AddNoteAction',
          property: 'NameLF',
          label: this.addNoteText,
          action: 'addNote',
          iconClass: 'quick-edit'
        }, {
          name: 'SendEmailAction',
          property: 'Email',
          label: this.sendEmailText,
          action: 'sendEmail',
          iconClass: 'mail',
          disabled: this.checkValueExists
        }, {
          name: 'ViewAddressAction',
          property: 'Address',
          label: this.viewAddressText,
          action: 'viewAddress',
          iconClass: 'map-pin',
          disabled: this.checkAddress,
          renderer: _Format["default"].address.bindDelegate(this, true, ' ')
        }]
      }, {
        title: this.detailsText,
        name: 'DetailsSection',
        children: [{
          name: 'NameLF',
          property: 'NameLF',
          label: this.nameText
        }, {
          name: 'AccountName',
          property: 'AccountName',
          descriptor: 'AccountName',
          label: this.accountText,
          view: 'account_detail',
          key: 'Account.$key'
        }, {
          name: 'WorkPhone',
          property: 'WorkPhone',
          label: this.workText,
          renderer: _Format["default"].phone
        }, {
          name: 'AccountManager.UserInfo',
          property: 'AccountManager.UserInfo',
          label: this.acctMgrText,
          tpl: _Template["default"].nameLF
        }, {
          name: 'HomePhone',
          property: 'HomePhone',
          label: this.homeText,
          renderer: _Format["default"].phone
        }, {
          name: 'WebAddress',
          property: 'WebAddress',
          label: this.webText,
          renderer: _Format["default"].link
        }, {
          name: 'Title',
          property: 'Title',
          label: this.contactTitleText
        }, {
          name: 'Fax',
          property: 'Fax',
          label: this.faxText,
          renderer: _Format["default"].phone
        }, {
          name: 'Owner.OwnerDescription',
          property: 'Owner.OwnerDescription',
          label: this.ownerText
        }, {
          name: 'CuisinePreference',
          property: 'CuisinePreference',
          label: this.cuisinePreferenceText
        }]
      }, {
        title: this.relatedItemsText,
        name: 'RelatedItemsSection',
        list: true,
        children: [{
          name: 'ActivityRelated',
          label: this.relatedActivitiesText,
          view: 'activity_related',
          where: this.formatRelatedQuery.bindDelegate(this, 'ContactId eq "${0}"')
        }, {
          name: 'OpportunityRelated',
          label: this.relatedOpportunitiesText,
          view: 'opportunity_related',
          where: this.formatRelatedQuery.bindDelegate(this, 'Contacts.Contact.Id eq "${0}"')
        }, {
          name: 'TicketRelated',
          label: this.relatedTicketsText,
          view: 'ticket_related',
          where: this.formatRelatedQuery.bindDelegate(this, 'Contact.Id eq "${0}"')
        }, {
          name: 'HistoryRelated',
          label: this.relatedHistoriesText,
          where: this.formatRelatedQuery.bindDelegate(this, 'ContactId eq "${0}" and Type ne "atDatabaseChange"'),
          view: 'history_related'
        }, {
          name: 'AddressesRelated',
          label: this.relatedAddressesText,
          where: this.formatRelatedQuery.bindDelegate(this, 'EntityId eq "${0}"', 'Address.EntityId'),
          view: 'address_related'
        }, {
          name: 'AttachmentRelated',
          label: this.relatedAttachmentText,
          where: this.formatRelatedQuery.bindDelegate(this, 'contactId eq "${0}"'),
          // must be lower case because of feed
          view: 'contact_attachment_related',
          title: this.relatedAttachmentTitleText
        }]
      }]);
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});