define('crm/Views/Account/Detail', ['module', 'exports', 'dojo/_base/declare', 'dojo/string', '../../Action', '../../Format', '../../Template', '../../Models/Names', 'argos/Detail', 'argos/I18n'], function (module, exports, _declare, _string, _Action, _Format, _Template, _Names, _Detail, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _string2 = _interopRequireDefault(_string);

  var _Action2 = _interopRequireDefault(_Action);

  var _Format2 = _interopRequireDefault(_Format);

  var _Template2 = _interopRequireDefault(_Template);

  var _Names2 = _interopRequireDefault(_Names);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  var resource = (0, _I18n2.default)('accountDetail');

  var __class = (0, _declare2.default)('crm.Views.Account.Detail', [_Detail2.default], {
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
    addTicketText: resource.addTicketText,

    // View Properties
    id: 'account_detail',
    editView: 'account_edit',
    historyEditView: 'history_edit',
    noteEditView: 'history_edit',
    enableOffline: true,
    resourceKind: 'accounts',
    modelName: _Names2.default.ACCOUNT,

    navigateToHistoryInsert: function navigateToHistoryInsert(type, entry) {
      _Action2.default.navigateToHistoryInsert(entry);
    },
    recordCallToHistory: function recordCallToHistory(phoneNumber) {
      var entry = {
        Type: 'atPhoneCall',
        AccountId: this.entry.$key,
        AccountName: this.entry.AccountName,
        Description: _string2.default.substitute(this.calledText, [this.entry.AccountName]),
        UserId: App.context && App.context.user.$key,
        UserName: App.context && App.context.user.UserName,
        Duration: 15,
        CompletedDate: new Date()
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
      var view = App.getView(this.noteEditView);
      if (view) {
        view.show({
          template: {},
          insert: true
        });
      }
    },
    addTicket: function addNote() {
      var view = App.getView('ticket_edit');
      if (view) {
        view.show({
          template: {},
          insert: true
        });
      }
    },
    formatPicklist: function formatPicklist(property) {
      return _Format2.default.picklist(this.app.picklistService, this._model, property);
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
          action: 'scheduleActivity'
        }, {
          name: 'AddNoteAction',
          property: 'AccountName',
          label: this.addNoteText,
          iconClass: 'edit',
          action: 'addNote'
        }, {
          name: 'AddTicketAction',
          property: 'AccountName',
          label: this.addTicketText,
          iconClass: 'edit',
          action: 'addTicket'
        }]
      }, {
        title: this.detailsText,
        name: 'DetailsSection',
        children: [{
          name: 'AccountName',
          property: 'AccountName',
          label: this.accountText
        }, {
          name: 'MainPhone',
          property: 'MainPhone',
          label: this.phoneText,
          renderer: _Format2.default.phone.bindDelegate(this, false),
          action: 'callMainPhone'
        }, {
          name: 'Status',
          property: 'Status',
          label: this.statusText,
          renderer: this.formatPicklist('Status')
        }, {
          name: 'AccountManager.UserInfo',
          property: 'AccountManager.UserInfo',
          label: this.acctMgrText,
          tpl: _Template2.default.nameLF
        }, {
          name: 'WebAddress',
          property: 'WebAddress',
          label: this.webText,
          renderer: _Format2.default.link
        }, {
          name: 'Address',
          property: 'Address',
          label: this.addressText,
          renderer: _Format2.default.address.bindDelegate(this, false)
        }, {
          name: 'Fax',
          property: 'Fax',
          label: this.faxText,
          renderer: _Format2.default.phone.bindDelegate(this, true)
        }, {
          name: 'Type',
          property: 'Type',
          label: this.typeText,
          renderer: this.formatPicklist('Type')
        }, {
          name: 'SubType',
          property: 'SubType',
          label: this.subTypeText,
          renderer: _Format2.default.picklist(this.app.picklistService, null, null, 'Account ' + this.entry.Type)
        }, {
          name: 'Industry',
          property: 'Industry',
          label: this.industryText,
          type: 'text',
          renderer: this.formatPicklist('Industry')
        }, {
          name: 'BusinessDescription',
          property: 'BusinessDescription',
          label: this.businessDescriptionText,
          type: 'text'
        }, {
          name: 'LeadSource.Description',
          property: 'LeadSource.Description',
          label: this.importSourceText
        }, {
          name: 'Owner.OwnerDescription',
          property: 'Owner.OwnerDescription',
          label: this.ownerText
        }]
      }, {
        title: this.relatedItemsText,
        list: true,
        name: 'RelatedItemsSection',
        children: [{
          name: 'ActivityRelated',
          label: this.relatedActivitiesText,
          where: this.formatRelatedQuery.bindDelegate(this, 'AccountId eq "${0}"'),
          view: 'activity_related'
        }, {
          name: 'ContactRelated',
          label: this.relatedContactsText,
          where: this.formatRelatedQuery.bindDelegate(this, 'Account.id eq "${0}"'),
          view: 'contact_related'
        }, {
          name: 'OpportunityRelated',
          label: this.relatedOpportunitiesText,
          where: this.formatRelatedQuery.bindDelegate(this, 'Account.id eq "${0}"'),
          view: 'opportunity_related'
        }, {
          name: 'TicketRelated',
          label: this.relatedTicketsText,
          where: this.formatRelatedQuery.bindDelegate(this, 'Account.id eq "${0}"'),
          view: 'ticket_related'
        }, {
          name: 'HistoryRelated',
          label: this.relatedHistoriesText,
          where: this.formatRelatedQuery.bindDelegate(this, 'AccountId eq "${0}" and Type ne "atDatabaseChange"'),
          view: 'history_related'
        }, {
          name: 'AddressesRelated',
          label: this.relatedAddressesText,
          where: this.formatRelatedQuery.bindDelegate(this, 'EntityId eq "${0}"', 'Address.EntityId'),
          view: 'address_related'
        }, {
          name: 'AttachmentRelated',
          label: this.relatedAttachmentText,
          where: this.formatRelatedQuery.bindDelegate(this, 'accountId eq "${0}"'), // must be lower case because of feed
          view: 'account_attachment_related',
          title: this.relatedAttachmentTitleText
        }]
      }]);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});