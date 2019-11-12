define('crm/Views/Contact/Detail', ['module', 'exports', 'dojo/_base/declare', '../../Action', '../../Format', '../../Template', '../../Models/Names', 'argos/Detail', 'argos/I18n', 'dojo/string'], function (module, exports, _declare, _Action, _Format, _Template, _Names, _Detail, _I18n, _string) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Action2 = _interopRequireDefault(_Action);

  var _Format2 = _interopRequireDefault(_Format);

  var _Template2 = _interopRequireDefault(_Template);

  var _Names2 = _interopRequireDefault(_Names);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _string2 = _interopRequireDefault(_string);

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

  var resource = (0, _I18n2.default)('contactDetail');

  /**
   * @class crm.Views.Contact.Detail
   *
   * @extends argos.Detail
   *
   * @requires crm.Format
   * @requires crm.Template
   */
  var __class = (0, _declare2.default)('crm.Views.Contact.Detail', [_Detail2.default], {
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
    modelName: _Names2.default.CONTACT,

    navigateToHistoryInsert: function navigateToHistoryInsert(type, entry) {
      this.refreshRequired = true;
      _Action2.default.navigateToHistoryInsert(entry);
    },
    recordCallToHistory: function recordCallToHistory(phoneNumber) {
      var entry = {
        $name: 'History',
        Type: 'atPhoneCall',
        ContactName: this.entry.NameLF,
        ContactId: this.entry.$key,
        AccountName: this.entry.AccountName,
        AccountId: this.entry.Account.$key,
        Description: _string2.default.substitute(this.calledText, [this.entry.Name]),
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
        Description: 'Emailed ' + this.entry.Name,
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
      App.showMapForAddress(_Format2.default.address(this.entry.Address, true, ' '));
    },
    checkAddress: function checkAddress(entry, value) {
      return !_Format2.default.address(value, true, '');
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
          renderer: _Format2.default.phone.bindDelegate(this, false)
        }, {
          name: 'CallMobilePhoneAction',
          property: 'Mobile',
          label: this.callMobileNumberText,
          action: 'callMobilePhone',
          iconClass: 'phone',
          disabled: this.checkValueExists,
          renderer: _Format2.default.phone.bindDelegate(this, false)
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
          renderer: _Format2.default.address.bindDelegate(this, true, ' ')
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
          renderer: _Format2.default.phone
        }, {
          name: 'AccountManager.UserInfo',
          property: 'AccountManager.UserInfo',
          label: this.acctMgrText,
          tpl: _Template2.default.nameLF
        }, {
          name: 'HomePhone',
          property: 'HomePhone',
          label: this.homeText,
          renderer: _Format2.default.phone
        }, {
          name: 'WebAddress',
          property: 'WebAddress',
          label: this.webText,
          renderer: _Format2.default.link
        }, {
          name: 'Title',
          property: 'Title',
          label: this.contactTitleText
        }, {
          name: 'Fax',
          property: 'Fax',
          label: this.faxText,
          renderer: _Format2.default.phone
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
          where: this.formatRelatedQuery.bindDelegate(this, 'contactId eq "${0}"'), // must be lower case because of feed
          view: 'contact_attachment_related',
          title: this.relatedAttachmentTitleText
        }]
      }]);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9Db250YWN0L0RldGFpbC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJhY2NvdW50VGV4dCIsImFjY3RNZ3JUZXh0IiwiYWRkcmVzc1RleHQiLCJjb250YWN0VGl0bGVUZXh0IiwiY3JlYXRlRGF0ZVRleHQiLCJjcmVhdGVVc2VyVGV4dCIsImVtYWlsVGV4dCIsImZheFRleHQiLCJob21lVGV4dCIsIm5hbWVUZXh0Iiwib3duZXJUZXh0IiwiYWN0aW9uc1RleHQiLCJyZWxhdGVkQWNjb3VudHNUZXh0IiwicmVsYXRlZEFjdGl2aXRpZXNUZXh0IiwicmVsYXRlZEhpc3Rvcmllc1RleHQiLCJyZWxhdGVkSXRlbXNUZXh0IiwicmVsYXRlZE5vdGVzVGV4dCIsInJlbGF0ZWRPcHBvcnR1bml0aWVzVGV4dCIsInJlbGF0ZWRUaWNrZXRzVGV4dCIsInJlbGF0ZWRBZGRyZXNzZXNUZXh0IiwicmVsYXRlZEF0dGFjaG1lbnRUZXh0IiwicmVsYXRlZEF0dGFjaG1lbnRUaXRsZVRleHQiLCJ0aXRsZVRleHQiLCJ3ZWJUZXh0Iiwid29ya1RleHQiLCJjdWlzaW5lUHJlZmVyZW5jZVRleHQiLCJjYWxsTW9iaWxlTnVtYmVyVGV4dCIsImNhbGxXb3JrTnVtYmVyVGV4dCIsImNhbGxlZFRleHQiLCJzY2hlZHVsZUFjdGl2aXR5VGV4dCIsImFkZE5vdGVUZXh0Iiwic2VuZEVtYWlsVGV4dCIsInZpZXdBZGRyZXNzVGV4dCIsImVudGl0eVRleHQiLCJpZCIsImVkaXRWaWV3IiwiaGlzdG9yeUVkaXRWaWV3Iiwibm90ZUVkaXRWaWV3IiwiZW5hYmxlT2ZmbGluZSIsInJlc291cmNlS2luZCIsIm1vZGVsTmFtZSIsIkNPTlRBQ1QiLCJuYXZpZ2F0ZVRvSGlzdG9yeUluc2VydCIsInR5cGUiLCJlbnRyeSIsInJlZnJlc2hSZXF1aXJlZCIsInJlY29yZENhbGxUb0hpc3RvcnkiLCJwaG9uZU51bWJlciIsIiRuYW1lIiwiVHlwZSIsIkNvbnRhY3ROYW1lIiwiTmFtZUxGIiwiQ29udGFjdElkIiwiJGtleSIsIkFjY291bnROYW1lIiwiQWNjb3VudElkIiwiQWNjb3VudCIsIkRlc2NyaXB0aW9uIiwic3Vic3RpdHV0ZSIsIk5hbWUiLCJVc2VySWQiLCJBcHAiLCJjb250ZXh0IiwidXNlciIsIlVzZXJOYW1lIiwiJGRlc2NyaXB0b3IiLCJEdXJhdGlvbiIsIkNvbXBsZXRlZERhdGUiLCJEYXRlIiwiaW5pdGlhdGVDYWxsIiwicmVjb3JkRW1haWxUb0hpc3RvcnkiLCJlbWFpbCIsImluaXRpYXRlRW1haWwiLCJjYWxsV29ya1Bob25lIiwiV29ya1Bob25lIiwiY2FsbE1vYmlsZVBob25lIiwiTW9iaWxlIiwic2VuZEVtYWlsIiwiRW1haWwiLCJjaGVja1ZhbHVlRXhpc3RzIiwidmFsdWUiLCJ2aWV3QWRkcmVzcyIsInNob3dNYXBGb3JBZGRyZXNzIiwiYWRkcmVzcyIsIkFkZHJlc3MiLCJjaGVja0FkZHJlc3MiLCJzY2hlZHVsZUFjdGl2aXR5IiwibmF2aWdhdGVUb0FjdGl2aXR5SW5zZXJ0VmlldyIsImFkZE5vdGUiLCJ2aWV3IiwiZ2V0VmlldyIsInNob3ciLCJ0ZW1wbGF0ZSIsImluc2VydCIsImNyZWF0ZUxheW91dCIsImxheW91dCIsImxpc3QiLCJ0aXRsZSIsImNscyIsIm5hbWUiLCJjaGlsZHJlbiIsInByb3BlcnR5IiwibGFiZWwiLCJhY3Rpb24iLCJpY29uQ2xhc3MiLCJkaXNhYmxlZCIsInJlbmRlcmVyIiwicGhvbmUiLCJiaW5kRGVsZWdhdGUiLCJ0cGwiLCJTaW1wbGF0ZSIsImRldGFpbHNUZXh0IiwiZGVzY3JpcHRvciIsImtleSIsIm5hbWVMRiIsImxpbmsiLCJ3aGVyZSIsImZvcm1hdFJlbGF0ZWRRdWVyeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxNQUFNQSxXQUFXLG9CQUFZLGVBQVosQ0FBakI7O0FBRUE7Ozs7Ozs7O0FBUUEsTUFBTUMs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QkFETDtBQUVERyxpQkFBTyxLQUFLbEYscUJBRlg7QUFHRGdHLGlCQUFPLEtBQUtDLGtCQUFMLENBQXdCVCxZQUF4QixDQUFxQyxJQUFyQyxFQUEyQyxxQkFBM0MsQ0FITixFQUd5RTtBQUMxRW5CLGdCQUFNLDRCQUpMO0FBS0RRLGlCQUFPLEtBQUs1RTtBQUxYLFNBekJPO0FBSlQsT0F2R2tDLENBQTlCLENBQVA7QUE0SUQ7QUFqUTJELEdBQTlDLENBQWhCOztvQkFvUWV0QixPIiwiZmlsZSI6IkRldGFpbC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBhY3Rpb24gZnJvbSAnLi4vLi4vQWN0aW9uJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICcuLi8uLi9Gb3JtYXQnO1xyXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi4vLi4vVGVtcGxhdGUnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vLi4vTW9kZWxzL05hbWVzJztcclxuaW1wb3J0IERldGFpbCBmcm9tICdhcmdvcy9EZXRhaWwnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcbmltcG9ydCBzdHJpbmcgZnJvbSAnZG9qby9zdHJpbmcnO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnY29udGFjdERldGFpbCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuQ29udGFjdC5EZXRhaWxcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuRGV0YWlsXHJcbiAqXHJcbiAqIEByZXF1aXJlcyBjcm0uRm9ybWF0XHJcbiAqIEByZXF1aXJlcyBjcm0uVGVtcGxhdGVcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuQ29udGFjdC5EZXRhaWwnLCBbRGV0YWlsXSwge1xyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIGFjY291bnRUZXh0OiByZXNvdXJjZS5hY2NvdW50VGV4dCxcclxuICBhY2N0TWdyVGV4dDogcmVzb3VyY2UuYWNjdE1nclRleHQsXHJcbiAgYWRkcmVzc1RleHQ6IHJlc291cmNlLmFkZHJlc3NUZXh0LFxyXG4gIGNvbnRhY3RUaXRsZVRleHQ6IHJlc291cmNlLmNvbnRhY3RUaXRsZVRleHQsXHJcbiAgY3JlYXRlRGF0ZVRleHQ6IHJlc291cmNlLmNyZWF0ZURhdGVUZXh0LFxyXG4gIGNyZWF0ZVVzZXJUZXh0OiByZXNvdXJjZS5jcmVhdGVVc2VyVGV4dCxcclxuICBlbWFpbFRleHQ6IHJlc291cmNlLmVtYWlsVGV4dCxcclxuICBmYXhUZXh0OiByZXNvdXJjZS5mYXhUZXh0LFxyXG4gIGhvbWVUZXh0OiByZXNvdXJjZS5ob21lVGV4dCxcclxuICBuYW1lVGV4dDogcmVzb3VyY2UubmFtZVRleHQsXHJcbiAgb3duZXJUZXh0OiByZXNvdXJjZS5vd25lclRleHQsXHJcbiAgYWN0aW9uc1RleHQ6IHJlc291cmNlLmFjdGlvbnNUZXh0LFxyXG4gIHJlbGF0ZWRBY2NvdW50c1RleHQ6IHJlc291cmNlLnJlbGF0ZWRBY2NvdW50c1RleHQsXHJcbiAgcmVsYXRlZEFjdGl2aXRpZXNUZXh0OiByZXNvdXJjZS5yZWxhdGVkQWN0aXZpdGllc1RleHQsXHJcbiAgcmVsYXRlZEhpc3Rvcmllc1RleHQ6IHJlc291cmNlLnJlbGF0ZWRIaXN0b3JpZXNUZXh0LFxyXG4gIHJlbGF0ZWRJdGVtc1RleHQ6IHJlc291cmNlLnJlbGF0ZWRJdGVtc1RleHQsXHJcbiAgcmVsYXRlZE5vdGVzVGV4dDogcmVzb3VyY2UucmVsYXRlZE5vdGVzVGV4dCxcclxuICByZWxhdGVkT3Bwb3J0dW5pdGllc1RleHQ6IHJlc291cmNlLnJlbGF0ZWRPcHBvcnR1bml0aWVzVGV4dCxcclxuICByZWxhdGVkVGlja2V0c1RleHQ6IHJlc291cmNlLnJlbGF0ZWRUaWNrZXRzVGV4dCxcclxuICByZWxhdGVkQWRkcmVzc2VzVGV4dDogcmVzb3VyY2UucmVsYXRlZEFkZHJlc3Nlc1RleHQsXHJcbiAgcmVsYXRlZEF0dGFjaG1lbnRUZXh0OiByZXNvdXJjZS5yZWxhdGVkQXR0YWNobWVudFRleHQsXHJcbiAgcmVsYXRlZEF0dGFjaG1lbnRUaXRsZVRleHQ6IHJlc291cmNlLnJlbGF0ZWRBdHRhY2htZW50VGl0bGVUZXh0LFxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIHdlYlRleHQ6IHJlc291cmNlLndlYlRleHQsXHJcbiAgd29ya1RleHQ6IHJlc291cmNlLndvcmtUZXh0LFxyXG4gIGN1aXNpbmVQcmVmZXJlbmNlVGV4dDogcmVzb3VyY2UuY3Vpc2luZVByZWZlcmVuY2VUZXh0LFxyXG4gIGNhbGxNb2JpbGVOdW1iZXJUZXh0OiByZXNvdXJjZS5jYWxsTW9iaWxlTnVtYmVyVGV4dCxcclxuICBjYWxsV29ya051bWJlclRleHQ6IHJlc291cmNlLmNhbGxXb3JrTnVtYmVyVGV4dCxcclxuICBjYWxsZWRUZXh0OiByZXNvdXJjZS5jYWxsZWRUZXh0LFxyXG4gIHNjaGVkdWxlQWN0aXZpdHlUZXh0OiByZXNvdXJjZS5zY2hlZHVsZUFjdGl2aXR5VGV4dCxcclxuICBhZGROb3RlVGV4dDogcmVzb3VyY2UuYWRkTm90ZVRleHQsXHJcbiAgc2VuZEVtYWlsVGV4dDogcmVzb3VyY2Uuc2VuZEVtYWlsVGV4dCxcclxuICB2aWV3QWRkcmVzc1RleHQ6IHJlc291cmNlLnZpZXdBZGRyZXNzVGV4dCxcclxuICBlbnRpdHlUZXh0OiByZXNvdXJjZS5lbnRpdHlUZXh0LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ2NvbnRhY3RfZGV0YWlsJyxcclxuICBlZGl0VmlldzogJ2NvbnRhY3RfZWRpdCcsXHJcbiAgaGlzdG9yeUVkaXRWaWV3OiAnaGlzdG9yeV9lZGl0JyxcclxuICBub3RlRWRpdFZpZXc6ICdoaXN0b3J5X2VkaXQnLFxyXG4gIGVuYWJsZU9mZmxpbmU6IHRydWUsXHJcbiAgcmVzb3VyY2VLaW5kOiAnY29udGFjdHMnLFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuQ09OVEFDVCxcclxuXHJcbiAgbmF2aWdhdGVUb0hpc3RvcnlJbnNlcnQ6IGZ1bmN0aW9uIG5hdmlnYXRlVG9IaXN0b3J5SW5zZXJ0KHR5cGUsIGVudHJ5KSB7XHJcbiAgICB0aGlzLnJlZnJlc2hSZXF1aXJlZCA9IHRydWU7XHJcbiAgICBhY3Rpb24ubmF2aWdhdGVUb0hpc3RvcnlJbnNlcnQoZW50cnkpO1xyXG4gIH0sXHJcbiAgcmVjb3JkQ2FsbFRvSGlzdG9yeTogZnVuY3Rpb24gcmVjb3JkQ2FsbFRvSGlzdG9yeShwaG9uZU51bWJlcikge1xyXG4gICAgY29uc3QgZW50cnkgPSB7XHJcbiAgICAgICRuYW1lOiAnSGlzdG9yeScsXHJcbiAgICAgIFR5cGU6ICdhdFBob25lQ2FsbCcsXHJcbiAgICAgIENvbnRhY3ROYW1lOiB0aGlzLmVudHJ5Lk5hbWVMRixcclxuICAgICAgQ29udGFjdElkOiB0aGlzLmVudHJ5LiRrZXksXHJcbiAgICAgIEFjY291bnROYW1lOiB0aGlzLmVudHJ5LkFjY291bnROYW1lLFxyXG4gICAgICBBY2NvdW50SWQ6IHRoaXMuZW50cnkuQWNjb3VudC4ka2V5LFxyXG4gICAgICBEZXNjcmlwdGlvbjogc3RyaW5nLnN1YnN0aXR1dGUodGhpcy5jYWxsZWRUZXh0LCBbdGhpcy5lbnRyeS5OYW1lXSksXHJcbiAgICAgIFVzZXJJZDogQXBwLmNvbnRleHQgJiYgQXBwLmNvbnRleHQudXNlci4ka2V5LFxyXG4gICAgICBVc2VyTmFtZTogQXBwLmNvbnRleHQgJiYgQXBwLmNvbnRleHQudXNlci4kZGVzY3JpcHRvcixcclxuICAgICAgRHVyYXRpb246IDE1LFxyXG4gICAgICBDb21wbGV0ZWREYXRlOiAobmV3IERhdGUoKSksXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMubmF2aWdhdGVUb0hpc3RvcnlJbnNlcnQoJ2F0UGhvbmVDYWxsJywgZW50cnkpO1xyXG4gICAgQXBwLmluaXRpYXRlQ2FsbChwaG9uZU51bWJlcik7XHJcbiAgfSxcclxuICByZWNvcmRFbWFpbFRvSGlzdG9yeTogZnVuY3Rpb24gcmVjb3JkRW1haWxUb0hpc3RvcnkoZW1haWwpIHtcclxuICAgIGNvbnN0IGVudHJ5ID0ge1xyXG4gICAgICAkbmFtZTogJ0hpc3RvcnknLFxyXG4gICAgICBUeXBlOiAnYXRFTWFpbCcsXHJcbiAgICAgIENvbnRhY3ROYW1lOiB0aGlzLmVudHJ5Lk5hbWVMRixcclxuICAgICAgQ29udGFjdElkOiB0aGlzLmVudHJ5LiRrZXksXHJcbiAgICAgIEFjY291bnROYW1lOiB0aGlzLmVudHJ5LkFjY291bnROYW1lLFxyXG4gICAgICBBY2NvdW50SWQ6IHRoaXMuZW50cnkuQWNjb3VudC4ka2V5LFxyXG4gICAgICBEZXNjcmlwdGlvbjogYEVtYWlsZWQgJHt0aGlzLmVudHJ5Lk5hbWV9YCxcclxuICAgICAgVXNlcklkOiBBcHAuY29udGV4dCAmJiBBcHAuY29udGV4dC51c2VyLiRrZXksXHJcbiAgICAgIFVzZXJOYW1lOiBBcHAuY29udGV4dCAmJiBBcHAuY29udGV4dC51c2VyLiRkZXNjcmlwdG9yLFxyXG4gICAgICBEdXJhdGlvbjogMTUsXHJcbiAgICAgIENvbXBsZXRlZERhdGU6IChuZXcgRGF0ZSgpKSxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5uYXZpZ2F0ZVRvSGlzdG9yeUluc2VydCgnYXRFTWFpbCcsIGVudHJ5KTtcclxuICAgIEFwcC5pbml0aWF0ZUVtYWlsKGVtYWlsKTtcclxuICB9LFxyXG4gIGNhbGxXb3JrUGhvbmU6IGZ1bmN0aW9uIGNhbGxXb3JrUGhvbmUoKSB7XHJcbiAgICB0aGlzLnJlY29yZENhbGxUb0hpc3RvcnkodGhpcy5lbnRyeS5Xb3JrUGhvbmUpO1xyXG4gIH0sXHJcbiAgY2FsbE1vYmlsZVBob25lOiBmdW5jdGlvbiBjYWxsTW9iaWxlUGhvbmUoKSB7XHJcbiAgICB0aGlzLnJlY29yZENhbGxUb0hpc3RvcnkodGhpcy5lbnRyeS5Nb2JpbGUpO1xyXG4gIH0sXHJcbiAgc2VuZEVtYWlsOiBmdW5jdGlvbiBzZW5kRW1haWwoKSB7XHJcbiAgICB0aGlzLnJlY29yZEVtYWlsVG9IaXN0b3J5KHRoaXMuZW50cnkuRW1haWwpO1xyXG4gIH0sXHJcbiAgY2hlY2tWYWx1ZUV4aXN0czogZnVuY3Rpb24gY2hlY2tWYWx1ZUV4aXN0cyhlbnRyeSwgdmFsdWUpIHtcclxuICAgIHJldHVybiAhdmFsdWU7XHJcbiAgfSxcclxuICB2aWV3QWRkcmVzczogZnVuY3Rpb24gdmlld0FkZHJlc3MoKSB7XHJcbiAgICBBcHAuc2hvd01hcEZvckFkZHJlc3MoZm9ybWF0LmFkZHJlc3ModGhpcy5lbnRyeS5BZGRyZXNzLCB0cnVlLCAnICcpKTtcclxuICB9LFxyXG4gIGNoZWNrQWRkcmVzczogZnVuY3Rpb24gY2hlY2tBZGRyZXNzKGVudHJ5LCB2YWx1ZSkge1xyXG4gICAgcmV0dXJuICFmb3JtYXQuYWRkcmVzcyh2YWx1ZSwgdHJ1ZSwgJycpO1xyXG4gIH0sXHJcbiAgc2NoZWR1bGVBY3Rpdml0eTogZnVuY3Rpb24gc2NoZWR1bGVBY3Rpdml0eSgpIHtcclxuICAgIEFwcC5uYXZpZ2F0ZVRvQWN0aXZpdHlJbnNlcnRWaWV3KCk7XHJcbiAgfSxcclxuICBhZGROb3RlOiBmdW5jdGlvbiBhZGROb3RlKCkge1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KHRoaXMubm90ZUVkaXRWaWV3KTtcclxuICAgIGlmICh2aWV3KSB7XHJcbiAgICAgIHZpZXcuc2hvdyh7XHJcbiAgICAgICAgdGVtcGxhdGU6IHt9LFxyXG4gICAgICAgIGluc2VydDogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbe1xyXG4gICAgICBsaXN0OiB0cnVlLFxyXG4gICAgICB0aXRsZTogdGhpcy5hY3Rpb25zVGV4dCxcclxuICAgICAgY2xzOiAnYWN0aW9uLWxpc3QnLFxyXG4gICAgICBuYW1lOiAnUXVpY2tBY3Rpb25zU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIG5hbWU6ICdDYWxsV29ya1Bob25lQWN0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1dvcmtQaG9uZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuY2FsbFdvcmtOdW1iZXJUZXh0LFxyXG4gICAgICAgIGFjdGlvbjogJ2NhbGxXb3JrUGhvbmUnLFxyXG4gICAgICAgIGljb25DbGFzczogJ3Bob25lJyxcclxuICAgICAgICBkaXNhYmxlZDogdGhpcy5jaGVja1ZhbHVlRXhpc3RzLFxyXG4gICAgICAgIHJlbmRlcmVyOiBmb3JtYXQucGhvbmUuYmluZERlbGVnYXRlKHRoaXMsIGZhbHNlKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdDYWxsTW9iaWxlUGhvbmVBY3Rpb24nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnTW9iaWxlJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5jYWxsTW9iaWxlTnVtYmVyVGV4dCxcclxuICAgICAgICBhY3Rpb246ICdjYWxsTW9iaWxlUGhvbmUnLFxyXG4gICAgICAgIGljb25DbGFzczogJ3Bob25lJyxcclxuICAgICAgICBkaXNhYmxlZDogdGhpcy5jaGVja1ZhbHVlRXhpc3RzLFxyXG4gICAgICAgIHJlbmRlcmVyOiBmb3JtYXQucGhvbmUuYmluZERlbGVnYXRlKHRoaXMsIGZhbHNlKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTY2hlZHVsZUFjdGl2aXR5QWN0aW9uJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5zY2hlZHVsZUFjdGl2aXR5VGV4dCxcclxuICAgICAgICBhY3Rpb246ICdzY2hlZHVsZUFjdGl2aXR5JyxcclxuICAgICAgICBpY29uQ2xhc3M6ICdjYWxlbmRhcicsXHJcbiAgICAgICAgdHBsOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgICAgICAgJ3slOiAkLkFjY291bnROYW1lICV9IC8geyU6ICQuTmFtZUxGICV9JyxcclxuICAgICAgICBdKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdBZGROb3RlQWN0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ05hbWVMRicsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYWRkTm90ZVRleHQsXHJcbiAgICAgICAgYWN0aW9uOiAnYWRkTm90ZScsXHJcbiAgICAgICAgaWNvbkNsYXNzOiAncXVpY2stZWRpdCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnU2VuZEVtYWlsQWN0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VtYWlsJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5zZW5kRW1haWxUZXh0LFxyXG4gICAgICAgIGFjdGlvbjogJ3NlbmRFbWFpbCcsXHJcbiAgICAgICAgaWNvbkNsYXNzOiAnbWFpbCcsXHJcbiAgICAgICAgZGlzYWJsZWQ6IHRoaXMuY2hlY2tWYWx1ZUV4aXN0cyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdWaWV3QWRkcmVzc0FjdGlvbicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdBZGRyZXNzJyxcclxuICAgICAgICBsYWJlbDogdGhpcy52aWV3QWRkcmVzc1RleHQsXHJcbiAgICAgICAgYWN0aW9uOiAndmlld0FkZHJlc3MnLFxyXG4gICAgICAgIGljb25DbGFzczogJ21hcC1waW4nLFxyXG4gICAgICAgIGRpc2FibGVkOiB0aGlzLmNoZWNrQWRkcmVzcyxcclxuICAgICAgICByZW5kZXJlcjogZm9ybWF0LmFkZHJlc3MuYmluZERlbGVnYXRlKHRoaXMsIHRydWUsICcgJyksXHJcbiAgICAgIH1dLFxyXG4gICAgfSwge1xyXG4gICAgICB0aXRsZTogdGhpcy5kZXRhaWxzVGV4dCxcclxuICAgICAgbmFtZTogJ0RldGFpbHNTZWN0aW9uJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbmFtZTogJ05hbWVMRicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdOYW1lTEYnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLm5hbWVUZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0FjY291bnROYW1lJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0FjY291bnROYW1lJyxcclxuICAgICAgICBkZXNjcmlwdG9yOiAnQWNjb3VudE5hbWUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFjY291bnRUZXh0LFxyXG4gICAgICAgIHZpZXc6ICdhY2NvdW50X2RldGFpbCcsXHJcbiAgICAgICAga2V5OiAnQWNjb3VudC4ka2V5JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdXb3JrUGhvbmUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnV29ya1Bob25lJyxcclxuICAgICAgICBsYWJlbDogdGhpcy53b3JrVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZm9ybWF0LnBob25lLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0FjY291bnRNYW5hZ2VyLlVzZXJJbmZvJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0FjY291bnRNYW5hZ2VyLlVzZXJJbmZvJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5hY2N0TWdyVGV4dCxcclxuICAgICAgICB0cGw6IHRlbXBsYXRlLm5hbWVMRixcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdIb21lUGhvbmUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnSG9tZVBob25lJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5ob21lVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZm9ybWF0LnBob25lLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1dlYkFkZHJlc3MnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnV2ViQWRkcmVzcycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMud2ViVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZm9ybWF0LmxpbmssXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnVGl0bGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnVGl0bGUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmNvbnRhY3RUaXRsZVRleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRmF4JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0ZheCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZmF4VGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZm9ybWF0LnBob25lLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ093bmVyLk93bmVyRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnT3duZXIuT3duZXJEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMub3duZXJUZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0N1aXNpbmVQcmVmZXJlbmNlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0N1aXNpbmVQcmVmZXJlbmNlJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5jdWlzaW5lUHJlZmVyZW5jZVRleHQsXHJcbiAgICAgIH1dLFxyXG4gICAgfSwge1xyXG4gICAgICB0aXRsZTogdGhpcy5yZWxhdGVkSXRlbXNUZXh0LFxyXG4gICAgICBuYW1lOiAnUmVsYXRlZEl0ZW1zU2VjdGlvbicsXHJcbiAgICAgIGxpc3Q6IHRydWUsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIG5hbWU6ICdBY3Rpdml0eVJlbGF0ZWQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnJlbGF0ZWRBY3Rpdml0aWVzVGV4dCxcclxuICAgICAgICB2aWV3OiAnYWN0aXZpdHlfcmVsYXRlZCcsXHJcbiAgICAgICAgd2hlcmU6IHRoaXMuZm9ybWF0UmVsYXRlZFF1ZXJ5LmJpbmREZWxlZ2F0ZSh0aGlzLCAnQ29udGFjdElkIGVxIFwiJHswfVwiJyksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnT3Bwb3J0dW5pdHlSZWxhdGVkJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5yZWxhdGVkT3Bwb3J0dW5pdGllc1RleHQsXHJcbiAgICAgICAgdmlldzogJ29wcG9ydHVuaXR5X3JlbGF0ZWQnLFxyXG4gICAgICAgIHdoZXJlOiB0aGlzLmZvcm1hdFJlbGF0ZWRRdWVyeS5iaW5kRGVsZWdhdGUodGhpcywgJ0NvbnRhY3RzLkNvbnRhY3QuSWQgZXEgXCIkezB9XCInKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdUaWNrZXRSZWxhdGVkJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5yZWxhdGVkVGlja2V0c1RleHQsXHJcbiAgICAgICAgdmlldzogJ3RpY2tldF9yZWxhdGVkJyxcclxuICAgICAgICB3aGVyZTogdGhpcy5mb3JtYXRSZWxhdGVkUXVlcnkuYmluZERlbGVnYXRlKHRoaXMsICdDb250YWN0LklkIGVxIFwiJHswfVwiJyksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnSGlzdG9yeVJlbGF0ZWQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnJlbGF0ZWRIaXN0b3JpZXNUZXh0LFxyXG4gICAgICAgIHdoZXJlOiB0aGlzLmZvcm1hdFJlbGF0ZWRRdWVyeS5iaW5kRGVsZWdhdGUodGhpcywgJ0NvbnRhY3RJZCBlcSBcIiR7MH1cIiBhbmQgVHlwZSBuZSBcImF0RGF0YWJhc2VDaGFuZ2VcIicpLFxyXG4gICAgICAgIHZpZXc6ICdoaXN0b3J5X3JlbGF0ZWQnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0FkZHJlc3Nlc1JlbGF0ZWQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnJlbGF0ZWRBZGRyZXNzZXNUZXh0LFxyXG4gICAgICAgIHdoZXJlOiB0aGlzLmZvcm1hdFJlbGF0ZWRRdWVyeS5iaW5kRGVsZWdhdGUodGhpcywgJ0VudGl0eUlkIGVxIFwiJHswfVwiJywgJ0FkZHJlc3MuRW50aXR5SWQnKSxcclxuICAgICAgICB2aWV3OiAnYWRkcmVzc19yZWxhdGVkJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdBdHRhY2htZW50UmVsYXRlZCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucmVsYXRlZEF0dGFjaG1lbnRUZXh0LFxyXG4gICAgICAgIHdoZXJlOiB0aGlzLmZvcm1hdFJlbGF0ZWRRdWVyeS5iaW5kRGVsZWdhdGUodGhpcywgJ2NvbnRhY3RJZCBlcSBcIiR7MH1cIicpLCAvLyBtdXN0IGJlIGxvd2VyIGNhc2UgYmVjYXVzZSBvZiBmZWVkXHJcbiAgICAgICAgdmlldzogJ2NvbnRhY3RfYXR0YWNobWVudF9yZWxhdGVkJyxcclxuICAgICAgICB0aXRsZTogdGhpcy5yZWxhdGVkQXR0YWNobWVudFRpdGxlVGV4dCxcclxuICAgICAgfV0sXHJcbiAgICB9XSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=