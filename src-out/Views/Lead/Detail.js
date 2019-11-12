define('crm/Views/Lead/Detail', ['module', 'exports', 'dojo/_base/declare', 'dojo/string', '../../Action', '../../Format', '../../Models/Names', 'argos/Detail', 'argos/I18n'], function (module, exports, _declare, _string, _Action, _Format, _Names, _Detail, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _string2 = _interopRequireDefault(_string);

  var _Action2 = _interopRequireDefault(_Action);

  var _Format2 = _interopRequireDefault(_Format);

  var _Names2 = _interopRequireDefault(_Names);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('leadDetail');

  /**
   * @class crm.Views.Lead.Detail
   *
   * @extends argos.Detail
   *
   * @requires crm.Format
   */
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

  var __class = (0, _declare2.default)('crm.Views.Lead.Detail', [_Detail2.default], {
    // Localization
    accountText: resource.accountText,
    addressText: resource.addressText,
    businessDescriptionText: resource.businessDescriptionText,
    createDateText: resource.createDateText,
    createUserText: resource.createUserText,
    eMailText: resource.eMailText,
    leadSourceText: resource.leadSourceText,
    industryText: resource.industryText,
    interestsText: resource.interestsText,
    leadTitleText: resource.leadTitleText,
    nameText: resource.nameText,
    notesText: resource.notesText,
    ownerText: resource.ownerText,
    relatedActivitiesText: resource.relatedActivitiesText,
    relatedHistoriesText: resource.relatedHistoriesText,
    relatedItemsText: resource.relatedItemsText,
    relatedNotesText: resource.relatedNotesText,
    relatedAttachmentText: resource.relatedAttachmentText,
    relatedAttachmentTitleText: resource.relatedAttachmentTitleText,
    sicCodeText: resource.sicCodeText,
    titleText: resource.titleText,
    tollFreeText: resource.tollFreeText,
    mobileText: resource.mobileText,
    webText: resource.webText,
    workText: resource.workText,
    actionsText: resource.actionsText,
    callWorkNumberText: resource.callWorkNumberText,
    scheduleActivityText: resource.scheduleActivityText,
    addNoteText: resource.addNoteText,
    sendEmailText: resource.sendEmailText,
    viewAddressText: resource.viewAddressText,
    calledText: resource.calledText,
    emailedText: resource.emailedText,
    entityText: resource.entityText,

    // View Properties
    id: 'lead_detail',
    editView: 'lead_edit',
    historyEditView: 'history_edit',
    noteEditView: 'history_edit',
    enableOffline: true,
    resourceKind: 'leads',
    modelName: _Names2.default.LEAD,

    navigateToHistoryInsert: function navigateToHistoryInsert(type, entry) {
      this.refreshRequired = true;
      _Action2.default.navigateToHistoryInsert(entry);
    },
    recordCallToHistory: function recordCallToHistory(phoneNumber) {
      var entry = {
        $name: 'History',
        Type: 'atPhoneCall',
        AccountName: this.entry.Company,
        LeadId: this.entry.$key,
        LeadName: this.entry.LeadNameLastFirst,
        Description: _string2.default.substitute(this.calledText, [this.entry.LeadNameFirstLast]),
        UserId: App.context && App.context.user.$key,
        UserName: App.context && App.context.user.UserName,
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
        AccountName: this.entry.Company,
        LeadId: this.entry.$key,
        LeadName: this.entry.LeadNameLastFirst,
        Description: _string2.default.substitute(this.emailedText, [this.entry.LeadNameLastFirst]),
        UserId: App.context && App.context.user.$key,
        UserName: App.context && App.context.user.UserName,
        Duration: 15,
        CompletedDate: new Date()
      };

      this.navigateToHistoryInsert('atEMail', entry);
      App.initiateEmail(email);
    },
    callWorkPhone: function callWorkPhone() {
      this.recordCallToHistory(this.entry.WorkPhone);
    },
    checkWorkPhone: function checkWorkPhone(entry, value) {
      return !value;
    },
    sendEmail: function sendEmail() {
      this.recordEmailToHistory(this.entry.Email);
    },
    checkEmail: function checkEmail(entry, value) {
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
    formatPicklist: function formatPicklist(property) {
      return _Format2.default.picklist(this.app.picklistService, this._model, property);
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
          disabled: this.checkWorkPhone,
          renderer: _Format2.default.phone.bindDelegate(this, false)
        }, {
          name: 'CheckEmailAction',
          property: 'Email',
          label: this.sendEmailText,
          action: 'sendEmail',
          iconClass: 'mail',
          disabled: this.checkEmail
        }, {
          name: 'ScheduleActivityAction',
          label: this.scheduleActivityText,
          action: 'scheduleActivity',
          iconClass: 'calendar',
          tpl: new Simplate(['{%: $.Company %} / {%: $.LeadNameLastFirst %}'])
        }, {
          name: 'AddNoteAction',
          property: 'LeadNameLastFirst',
          iconClass: 'quick-edit',
          label: this.addNoteText,
          action: 'addNote'
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
          label: this.nameText,
          name: 'LeadNameLastFirst',
          property: 'LeadNameLastFirst'
        }, {
          label: this.accountText,
          name: 'Company',
          property: 'Company'
        }, {
          label: this.leadTitleText,
          name: 'Title',
          property: 'Title',
          renderer: this.formatPicklist('Title')
        }, {
          label: this.workText,
          name: 'WorkPhone',
          property: 'WorkPhone',
          renderer: _Format2.default.phone
        }, {
          label: this.mobileText,
          name: 'Mobile',
          property: 'Mobile',
          renderer: _Format2.default.phone
        }, {
          label: this.tollFreeText,
          name: 'TollFree',
          property: 'TollFree',
          renderer: _Format2.default.phone
        }, {
          label: this.leadSourceText,
          name: 'LeadSource.Description',
          property: 'LeadSource.Description'
        }, {
          label: this.webText,
          name: 'WebAddress',
          property: 'WebAddress',
          renderer: _Format2.default.link
        }, {
          label: this.interestsText,
          name: 'Interests',
          property: 'Interests'
        }, {
          label: this.industryText,
          name: 'Industry',
          property: 'Industry',
          renderer: this.formatPicklist('Industry')
        }, {
          label: this.sicCodeText,
          name: 'SICCode',
          property: 'SICCode'
        }, {
          label: this.businessDescriptionText,
          name: 'BusinessDescription',
          property: 'BusinessDescription'
        }, {
          label: this.notesText,
          name: 'Notes',
          property: 'Notes'
        }, {
          label: this.ownerText,
          name: 'Owner.OwnerDescription',
          property: 'Owner.OwnerDescription'
        }]
      }, {
        list: true,
        title: this.relatedItemsText,
        name: 'RelatedItemsSection',
        children: [{
          name: 'ActivityRelated',
          label: this.relatedActivitiesText,
          view: 'activity_related',
          where: this.formatRelatedQuery.bindDelegate(this, 'LeadId eq "${0}"')
        }, {
          name: 'HistoryRelated',
          label: this.relatedHistoriesText,
          where: this.formatRelatedQuery.bindDelegate(this, 'LeadId eq "${0}" and Type ne "atDatabaseChange"'),
          view: 'history_related'
        }, {
          name: 'AttachmentRelated',
          label: this.relatedAttachmentText,
          where: this.formatRelatedQuery.bindDelegate(this, 'leadId eq "${0}"'), // must be lower case because of feed
          view: 'lead_attachment_related',
          title: this.relatedAttachmentTitleText
        }]
      }]);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9MZWFkL0RldGFpbC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJhY2NvdW50VGV4dCIsImFkZHJlc3NUZXh0IiwiYnVzaW5lc3NEZXNjcmlwdGlvblRleHQiLCJjcmVhdGVEYXRlVGV4dCIsImNyZWF0ZVVzZXJUZXh0IiwiZU1haWxUZXh0IiwibGVhZFNvdXJjZVRleHQiLCJpbmR1c3RyeVRleHQiLCJpbnRlcmVzdHNUZXh0IiwibGVhZFRpdGxlVGV4dCIsIm5hbWVUZXh0Iiwibm90ZXNUZXh0Iiwib3duZXJUZXh0IiwicmVsYXRlZEFjdGl2aXRpZXNUZXh0IiwicmVsYXRlZEhpc3Rvcmllc1RleHQiLCJyZWxhdGVkSXRlbXNUZXh0IiwicmVsYXRlZE5vdGVzVGV4dCIsInJlbGF0ZWRBdHRhY2htZW50VGV4dCIsInJlbGF0ZWRBdHRhY2htZW50VGl0bGVUZXh0Iiwic2ljQ29kZVRleHQiLCJ0aXRsZVRleHQiLCJ0b2xsRnJlZVRleHQiLCJtb2JpbGVUZXh0Iiwid2ViVGV4dCIsIndvcmtUZXh0IiwiYWN0aW9uc1RleHQiLCJjYWxsV29ya051bWJlclRleHQiLCJzY2hlZHVsZUFjdGl2aXR5VGV4dCIsImFkZE5vdGVUZXh0Iiwic2VuZEVtYWlsVGV4dCIsInZpZXdBZGRyZXNzVGV4dCIsImNhbGxlZFRleHQiLCJlbWFpbGVkVGV4dCIsImVudGl0eVRleHQiLCJpZCIsImVkaXRWaWV3IiwiaGlzdG9yeUVkaXRWaWV3Iiwibm90ZUVkaXRWaWV3IiwiZW5hYmxlT2ZmbGluZSIsInJlc291cmNlS2luZCIsIm1vZGVsTmFtZSIsIkxFQUQiLCJuYXZpZ2F0ZVRvSGlzdG9yeUluc2VydCIsInR5cGUiLCJlbnRyeSIsInJlZnJlc2hSZXF1aXJlZCIsInJlY29yZENhbGxUb0hpc3RvcnkiLCJwaG9uZU51bWJlciIsIiRuYW1lIiwiVHlwZSIsIkFjY291bnROYW1lIiwiQ29tcGFueSIsIkxlYWRJZCIsIiRrZXkiLCJMZWFkTmFtZSIsIkxlYWROYW1lTGFzdEZpcnN0IiwiRGVzY3JpcHRpb24iLCJzdWJzdGl0dXRlIiwiTGVhZE5hbWVGaXJzdExhc3QiLCJVc2VySWQiLCJBcHAiLCJjb250ZXh0IiwidXNlciIsIlVzZXJOYW1lIiwiRHVyYXRpb24iLCJDb21wbGV0ZWREYXRlIiwiRGF0ZSIsImluaXRpYXRlQ2FsbCIsInJlY29yZEVtYWlsVG9IaXN0b3J5IiwiZW1haWwiLCJpbml0aWF0ZUVtYWlsIiwiY2FsbFdvcmtQaG9uZSIsIldvcmtQaG9uZSIsImNoZWNrV29ya1Bob25lIiwidmFsdWUiLCJzZW5kRW1haWwiLCJFbWFpbCIsImNoZWNrRW1haWwiLCJ2aWV3QWRkcmVzcyIsInNob3dNYXBGb3JBZGRyZXNzIiwiYWRkcmVzcyIsIkFkZHJlc3MiLCJjaGVja0FkZHJlc3MiLCJzY2hlZHVsZUFjdGl2aXR5IiwibmF2aWdhdGVUb0FjdGl2aXR5SW5zZXJ0VmlldyIsImFkZE5vdGUiLCJ2aWV3IiwiZ2V0VmlldyIsInNob3ciLCJ0ZW1wbGF0ZSIsImluc2VydCIsImZvcm1hdFBpY2tsaXN0IiwicHJvcGVydHkiLCJwaWNrbGlzdCIsImFwcCIsInBpY2tsaXN0U2VydmljZSIsIl9tb2RlbCIsImNyZWF0ZUxheW91dCIsImxheW91dCIsImxpc3QiLCJ0aXRsZSIsImNscyIsIm5hbWUiLCJjaGlsZHJlbiIsImxhYmVsIiwiYWN0aW9uIiwiaWNvbkNsYXNzIiwiZGlzYWJsZWQiLCJyZW5kZXJlciIsInBob25lIiwiYmluZERlbGVnYXRlIiwidHBsIiwiU2ltcGxhdGUiLCJkZXRhaWxzVGV4dCIsImxpbmsiLCJ3aGVyZSIsImZvcm1hdFJlbGF0ZWRRdWVyeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxNQUFNQSxXQUFXLG9CQUFZLFlBQVosQ0FBakI7O0FBRUE7Ozs7Ozs7QUF6QkE7Ozs7Ozs7Ozs7Ozs7OztBQWdDQSxNQUFNQyxVQUFVLHVCQUFRLHVCQUFSLEVBQWlDLGtCQUFqQyxFQUEyQztBQUN6RDtBQUNBQyxpQkFBYUYsU0FBU0UsV0FGbUM7QUFHekRDLGlCQUFhSCxTQUFTRyxXQUhtQztBQUl6REMsNkJBQXlCSixTQUFTSSx1QkFKdUI7QUFLekRDLG9CQUFnQkwsU0FBU0ssY0FMZ0M7QUFNekRDLG9CQUFnQk4sU0FBU00sY0FOZ0M7QUFPekRDLGVBQVdQLFNBQVNPLFNBUHFDO0FBUXpEQyxvQkFBZ0JSLFNBQVNRLGNBUmdDO0FBU3pEQyxrQkFBY1QsU0FBU1MsWUFUa0M7QUFVekRDLG1CQUFlVixTQUFTVSxhQVZpQztBQVd6REMsbUJBQWVYLFNBQVNXLGFBWGlDO0FBWXpEQyxjQUFVWixTQUFTWSxRQVpzQztBQWF6REMsZUFBV2IsU0FBU2EsU0FicUM7QUFjekRDLGVBQVdkLFNBQVNjLFNBZHFDO0FBZXpEQywyQkFBdUJmLFNBQVNlLHFCQWZ5QjtBQWdCekRDLDBCQUFzQmhCLFNBQVNnQixvQkFoQjBCO0FBaUJ6REMsc0JBQWtCakIsU0FBU2lCLGdCQWpCOEI7QUFrQnpEQyxzQkFBa0JsQixTQUFTa0IsZ0JBbEI4QjtBQW1CekRDLDJCQUF1Qm5CLFNBQVNtQixxQkFuQnlCO0FBb0J6REMsZ0NBQTRCcEIsU0FBU29CLDBCQXBCb0I7QUFxQnpEQyxpQkFBYXJCLFNBQVNxQixXQXJCbUM7QUFzQnpEQyxlQUFXdEIsU0FBU3NCLFNBdEJxQztBQXVCekRDLGtCQUFjdkIsU0FBU3VCLFlBdkJrQztBQXdCekRDLGdCQUFZeEIsU0FBU3dCLFVBeEJvQztBQXlCekRDLGFBQVN6QixTQUFTeUIsT0F6QnVDO0FBMEJ6REMsY0FBVTFCLFNBQVMwQixRQTFCc0M7QUEyQnpEQyxpQkFBYTNCLFNBQVMyQixXQTNCbUM7QUE0QnpEQyx3QkFBb0I1QixTQUFTNEIsa0JBNUI0QjtBQTZCekRDLDBCQUFzQjdCLFNBQVM2QixvQkE3QjBCO0FBOEJ6REMsaUJBQWE5QixTQUFTOEIsV0E5Qm1DO0FBK0J6REMsbUJBQWUvQixTQUFTK0IsYUEvQmlDO0FBZ0N6REMscUJBQWlCaEMsU0FBU2dDLGVBaEMrQjtBQWlDekRDLGdCQUFZakMsU0FBU2lDLFVBakNvQztBQWtDekRDLGlCQUFhbEMsU0FBU2tDLFdBbENtQztBQW1DekRDLGdCQUFZbkMsU0FBU21DLFVBbkNvQzs7QUFxQ3pEO0FBQ0FDLFFBQUksYUF0Q3FEO0FBdUN6REMsY0FBVSxXQXZDK0M7QUF3Q3pEQyxxQkFBaUIsY0F4Q3dDO0FBeUN6REMsa0JBQWMsY0F6QzJDO0FBMEN6REMsbUJBQWUsSUExQzBDO0FBMkN6REMsa0JBQWMsT0EzQzJDO0FBNEN6REMsZUFBVyxnQkFBWUMsSUE1Q2tDOztBQThDekRDLDZCQUF5QixTQUFTQSx1QkFBVCxDQUFpQ0MsSUFBakMsRUFBdUNDLEtBQXZDLEVBQThDO0FBQ3JFLFdBQUtDLGVBQUwsR0FBdUIsSUFBdkI7QUFDQSx1QkFBT0gsdUJBQVAsQ0FBK0JFLEtBQS9CO0FBQ0QsS0FqRHdEO0FBa0R6REUseUJBQXFCLFNBQVNBLG1CQUFULENBQTZCQyxXQUE3QixFQUEwQztBQUM3RCxVQUFNSCxRQUFRO0FBQ1pJLGVBQU8sU0FESztBQUVaQyxjQUFNLGFBRk07QUFHWkMscUJBQWEsS0FBS04sS0FBTCxDQUFXTyxPQUhaO0FBSVpDLGdCQUFRLEtBQUtSLEtBQUwsQ0FBV1MsSUFKUDtBQUtaQyxrQkFBVSxLQUFLVixLQUFMLENBQVdXLGlCQUxUO0FBTVpDLHFCQUFhLGlCQUFPQyxVQUFQLENBQWtCLEtBQUsxQixVQUF2QixFQUFtQyxDQUFDLEtBQUthLEtBQUwsQ0FBV2MsaUJBQVosQ0FBbkMsQ0FORDtBQU9aQyxnQkFBUUMsSUFBSUMsT0FBSixJQUFlRCxJQUFJQyxPQUFKLENBQVlDLElBQVosQ0FBaUJULElBUDVCO0FBUVpVLGtCQUFVSCxJQUFJQyxPQUFKLElBQWVELElBQUlDLE9BQUosQ0FBWUMsSUFBWixDQUFpQkMsUUFSOUI7QUFTWkMsa0JBQVUsRUFURTtBQVVaQyx1QkFBZ0IsSUFBSUMsSUFBSjtBQVZKLE9BQWQ7O0FBYUEsV0FBS3hCLHVCQUFMLENBQTZCLGFBQTdCLEVBQTRDRSxLQUE1QztBQUNBZ0IsVUFBSU8sWUFBSixDQUFpQnBCLFdBQWpCO0FBQ0QsS0FsRXdEO0FBbUV6RHFCLDBCQUFzQixTQUFTQSxvQkFBVCxDQUE4QkMsS0FBOUIsRUFBcUM7QUFDekQsVUFBTXpCLFFBQVE7QUFDWkksZUFBTyxTQURLO0FBRVpDLGNBQU0sU0FGTTtBQUdaQyxxQkFBYSxLQUFLTixLQUFMLENBQVdPLE9BSFo7QUFJWkMsZ0JBQVEsS0FBS1IsS0FBTCxDQUFXUyxJQUpQO0FBS1pDLGtCQUFVLEtBQUtWLEtBQUwsQ0FBV1csaUJBTFQ7QUFNWkMscUJBQWEsaUJBQU9DLFVBQVAsQ0FBa0IsS0FBS3pCLFdBQXZCLEVBQW9DLENBQUMsS0FBS1ksS0FBTCxDQUFXVyxpQkFBWixDQUFwQyxDQU5EO0FBT1pJLGdCQUFRQyxJQUFJQyxPQUFKLElBQWVELElBQUlDLE9BQUosQ0FBWUMsSUFBWixDQUFpQlQsSUFQNUI7QUFRWlUsa0JBQVVILElBQUlDLE9BQUosSUFBZUQsSUFBSUMsT0FBSixDQUFZQyxJQUFaLENBQWlCQyxRQVI5QjtBQVNaQyxrQkFBVSxFQVRFO0FBVVpDLHVCQUFnQixJQUFJQyxJQUFKO0FBVkosT0FBZDs7QUFhQSxXQUFLeEIsdUJBQUwsQ0FBNkIsU0FBN0IsRUFBd0NFLEtBQXhDO0FBQ0FnQixVQUFJVSxhQUFKLENBQWtCRCxLQUFsQjtBQUNELEtBbkZ3RDtBQW9GekRFLG1CQUFlLFNBQVNBLGFBQVQsR0FBeUI7QUFDdEMsV0FBS3pCLG1CQUFMLENBQXlCLEtBQUtGLEtBQUwsQ0FBVzRCLFNBQXBDO0FBQ0QsS0F0RndEO0FBdUZ6REMsb0JBQWdCLFNBQVNBLGNBQVQsQ0FBd0I3QixLQUF4QixFQUErQjhCLEtBQS9CLEVBQXNDO0FBQ3BELGFBQU8sQ0FBQ0EsS0FBUjtBQUNELEtBekZ3RDtBQTBGekRDLGVBQVcsU0FBU0EsU0FBVCxHQUFxQjtBQUM5QixXQUFLUCxvQkFBTCxDQUEwQixLQUFLeEIsS0FBTCxDQUFXZ0MsS0FBckM7QUFDRCxLQTVGd0Q7QUE2RnpEQyxnQkFBWSxTQUFTQSxVQUFULENBQW9CakMsS0FBcEIsRUFBMkI4QixLQUEzQixFQUFrQztBQUM1QyxhQUFPLENBQUNBLEtBQVI7QUFDRCxLQS9Gd0Q7QUFnR3pESSxpQkFBYSxTQUFTQSxXQUFULEdBQXVCO0FBQ2xDbEIsVUFBSW1CLGlCQUFKLENBQXNCLGlCQUFPQyxPQUFQLENBQWUsS0FBS3BDLEtBQUwsQ0FBV3FDLE9BQTFCLEVBQW1DLElBQW5DLEVBQXlDLEdBQXpDLENBQXRCO0FBQ0QsS0FsR3dEO0FBbUd6REMsa0JBQWMsU0FBU0EsWUFBVCxDQUFzQnRDLEtBQXRCLEVBQTZCOEIsS0FBN0IsRUFBb0M7QUFDaEQsYUFBTyxDQUFDLGlCQUFPTSxPQUFQLENBQWVOLEtBQWYsRUFBc0IsSUFBdEIsRUFBNEIsRUFBNUIsQ0FBUjtBQUNELEtBckd3RDtBQXNHekRTLHNCQUFrQixTQUFTQSxnQkFBVCxHQUE0QjtBQUM1Q3ZCLFVBQUl3Qiw0QkFBSjtBQUNELEtBeEd3RDtBQXlHekRDLGFBQVMsU0FBU0EsT0FBVCxHQUFtQjtBQUMxQixVQUFNQyxPQUFPMUIsSUFBSTJCLE9BQUosQ0FBWSxLQUFLbEQsWUFBakIsQ0FBYjtBQUNBLFVBQUlpRCxJQUFKLEVBQVU7QUFDUkEsYUFBS0UsSUFBTCxDQUFVO0FBQ1JDLG9CQUFVLEVBREY7QUFFUkMsa0JBQVE7QUFGQSxTQUFWO0FBSUQ7QUFDRixLQWpId0Q7QUFrSHpEQyxvQkFBZ0IsU0FBU0EsY0FBVCxDQUF3QkMsUUFBeEIsRUFBa0M7QUFDaEQsYUFBTyxpQkFBT0MsUUFBUCxDQUFnQixLQUFLQyxHQUFMLENBQVNDLGVBQXpCLEVBQTBDLEtBQUtDLE1BQS9DLEVBQXVESixRQUF2RCxDQUFQO0FBQ0QsS0FwSHdEO0FBcUh6REssa0JBQWMsU0FBU0EsWUFBVCxHQUF3QjtBQUNwQyxhQUFPLEtBQUtDLE1BQUwsS0FBZ0IsS0FBS0EsTUFBTCxHQUFjLENBQUM7QUFDcENDLGNBQU0sSUFEOEI7QUFFcENDLGVBQU8sS0FBSzNFLFdBRndCO0FBR3BDNEUsYUFBSyxhQUgrQjtBQUlwQ0MsY0FBTSxxQkFKOEI7QUFLcENDLGtCQUFVLENBQUM7QUFDVEQsZ0JBQU0scUJBREc7QUFFVFYsb0JBQVUsV0FGRDtBQUdUWSxpQkFBTyxLQUFLOUUsa0JBSEg7QUFJVCtFLGtCQUFRLGVBSkM7QUFLVEMscUJBQVcsT0FMRjtBQU1UQyxvQkFBVSxLQUFLbEMsY0FOTjtBQU9UbUMsb0JBQVUsaUJBQU9DLEtBQVAsQ0FBYUMsWUFBYixDQUEwQixJQUExQixFQUFnQyxLQUFoQztBQVBELFNBQUQsRUFRUDtBQUNEUixnQkFBTSxrQkFETDtBQUVEVixvQkFBVSxPQUZUO0FBR0RZLGlCQUFPLEtBQUszRSxhQUhYO0FBSUQ0RSxrQkFBUSxXQUpQO0FBS0RDLHFCQUFXLE1BTFY7QUFNREMsb0JBQVUsS0FBSzlCO0FBTmQsU0FSTyxFQWVQO0FBQ0R5QixnQkFBTSx3QkFETDtBQUVERSxpQkFBTyxLQUFLN0Usb0JBRlg7QUFHRDhFLGtCQUFRLGtCQUhQO0FBSURDLHFCQUFXLFVBSlY7QUFLREssZUFBSyxJQUFJQyxRQUFKLENBQWEsQ0FDaEIsK0NBRGdCLENBQWI7QUFMSixTQWZPLEVBdUJQO0FBQ0RWLGdCQUFNLGVBREw7QUFFRFYsb0JBQVUsbUJBRlQ7QUFHRGMscUJBQVcsWUFIVjtBQUlERixpQkFBTyxLQUFLNUUsV0FKWDtBQUtENkUsa0JBQVE7QUFMUCxTQXZCTyxFQTZCUDtBQUNESCxnQkFBTSxtQkFETDtBQUVEVixvQkFBVSxTQUZUO0FBR0RZLGlCQUFPLEtBQUsxRSxlQUhYO0FBSUQyRSxrQkFBUSxhQUpQO0FBS0RDLHFCQUFXLFNBTFY7QUFNREMsb0JBQVUsS0FBS3pCLFlBTmQ7QUFPRDBCLG9CQUFVLGlCQUFPNUIsT0FBUCxDQUFlOEIsWUFBZixDQUE0QixJQUE1QixFQUFrQyxJQUFsQyxFQUF3QyxHQUF4QztBQVBULFNBN0JPO0FBTDBCLE9BQUQsRUEyQ2xDO0FBQ0RWLGVBQU8sS0FBS2EsV0FEWDtBQUVEWCxjQUFNLGdCQUZMO0FBR0RDLGtCQUFVLENBQUM7QUFDVEMsaUJBQU8sS0FBSzlGLFFBREg7QUFFVDRGLGdCQUFNLG1CQUZHO0FBR1RWLG9CQUFVO0FBSEQsU0FBRCxFQUlQO0FBQ0RZLGlCQUFPLEtBQUt4RyxXQURYO0FBRURzRyxnQkFBTSxTQUZMO0FBR0RWLG9CQUFVO0FBSFQsU0FKTyxFQVFQO0FBQ0RZLGlCQUFPLEtBQUsvRixhQURYO0FBRUQ2RixnQkFBTSxPQUZMO0FBR0RWLG9CQUFVLE9BSFQ7QUFJRGdCLG9CQUFVLEtBQUtqQixjQUFMLENBQW9CLE9BQXBCO0FBSlQsU0FSTyxFQWFQO0FBQ0RhLGlCQUFPLEtBQUtoRixRQURYO0FBRUQ4RSxnQkFBTSxXQUZMO0FBR0RWLG9CQUFVLFdBSFQ7QUFJRGdCLG9CQUFVLGlCQUFPQztBQUpoQixTQWJPLEVBa0JQO0FBQ0RMLGlCQUFPLEtBQUtsRixVQURYO0FBRURnRixnQkFBTSxRQUZMO0FBR0RWLG9CQUFVLFFBSFQ7QUFJRGdCLG9CQUFVLGlCQUFPQztBQUpoQixTQWxCTyxFQXVCUDtBQUNETCxpQkFBTyxLQUFLbkYsWUFEWDtBQUVEaUYsZ0JBQU0sVUFGTDtBQUdEVixvQkFBVSxVQUhUO0FBSURnQixvQkFBVSxpQkFBT0M7QUFKaEIsU0F2Qk8sRUE0QlA7QUFDREwsaUJBQU8sS0FBS2xHLGNBRFg7QUFFRGdHLGdCQUFNLHdCQUZMO0FBR0RWLG9CQUFVO0FBSFQsU0E1Qk8sRUFnQ1A7QUFDRFksaUJBQU8sS0FBS2pGLE9BRFg7QUFFRCtFLGdCQUFNLFlBRkw7QUFHRFYsb0JBQVUsWUFIVDtBQUlEZ0Isb0JBQVUsaUJBQU9NO0FBSmhCLFNBaENPLEVBcUNQO0FBQ0RWLGlCQUFPLEtBQUtoRyxhQURYO0FBRUQ4RixnQkFBTSxXQUZMO0FBR0RWLG9CQUFVO0FBSFQsU0FyQ08sRUF5Q1A7QUFDRFksaUJBQU8sS0FBS2pHLFlBRFg7QUFFRCtGLGdCQUFNLFVBRkw7QUFHRFYsb0JBQVUsVUFIVDtBQUlEZ0Isb0JBQVUsS0FBS2pCLGNBQUwsQ0FBb0IsVUFBcEI7QUFKVCxTQXpDTyxFQThDUDtBQUNEYSxpQkFBTyxLQUFLckYsV0FEWDtBQUVEbUYsZ0JBQU0sU0FGTDtBQUdEVixvQkFBVTtBQUhULFNBOUNPLEVBa0RQO0FBQ0RZLGlCQUFPLEtBQUt0Ryx1QkFEWDtBQUVEb0csZ0JBQU0scUJBRkw7QUFHRFYsb0JBQVU7QUFIVCxTQWxETyxFQXNEUDtBQUNEWSxpQkFBTyxLQUFLN0YsU0FEWDtBQUVEMkYsZ0JBQU0sT0FGTDtBQUdEVixvQkFBVTtBQUhULFNBdERPLEVBMERQO0FBQ0RZLGlCQUFPLEtBQUs1RixTQURYO0FBRUQwRixnQkFBTSx3QkFGTDtBQUdEVixvQkFBVTtBQUhULFNBMURPO0FBSFQsT0EzQ2tDLEVBNkdsQztBQUNETyxjQUFNLElBREw7QUFFREMsZUFBTyxLQUFLckYsZ0JBRlg7QUFHRHVGLGNBQU0scUJBSEw7QUFJREMsa0JBQVUsQ0FBQztBQUNURCxnQkFBTSxpQkFERztBQUVURSxpQkFBTyxLQUFLM0YscUJBRkg7QUFHVHlFLGdCQUFNLGtCQUhHO0FBSVQ2QixpQkFBTyxLQUFLQyxrQkFBTCxDQUF3Qk4sWUFBeEIsQ0FBcUMsSUFBckMsRUFBMkMsa0JBQTNDO0FBSkUsU0FBRCxFQUtQO0FBQ0RSLGdCQUFNLGdCQURMO0FBRURFLGlCQUFPLEtBQUsxRixvQkFGWDtBQUdEcUcsaUJBQU8sS0FBS0Msa0JBQUwsQ0FBd0JOLFlBQXhCLENBQXFDLElBQXJDLEVBQTJDLGlEQUEzQyxDQUhOO0FBSUR4QixnQkFBTTtBQUpMLFNBTE8sRUFVUDtBQUNEZ0IsZ0JBQU0sbUJBREw7QUFFREUsaUJBQU8sS0FBS3ZGLHFCQUZYO0FBR0RrRyxpQkFBTyxLQUFLQyxrQkFBTCxDQUF3Qk4sWUFBeEIsQ0FBcUMsSUFBckMsRUFBMkMsa0JBQTNDLENBSE4sRUFHc0U7QUFDdkV4QixnQkFBTSx5QkFKTDtBQUtEYyxpQkFBTyxLQUFLbEY7QUFMWCxTQVZPO0FBSlQsT0E3R2tDLENBQTlCLENBQVA7QUFtSUQ7QUF6UHdELEdBQTNDLENBQWhCOztvQkE0UGVuQixPIiwiZmlsZSI6IkRldGFpbC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBzdHJpbmcgZnJvbSAnZG9qby9zdHJpbmcnO1xyXG5pbXBvcnQgYWN0aW9uIGZyb20gJy4uLy4uL0FjdGlvbic7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnLi4vLi4vRm9ybWF0JztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCBEZXRhaWwgZnJvbSAnYXJnb3MvRGV0YWlsJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnbGVhZERldGFpbCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuTGVhZC5EZXRhaWxcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuRGV0YWlsXHJcbiAqXHJcbiAqIEByZXF1aXJlcyBjcm0uRm9ybWF0XHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLkxlYWQuRGV0YWlsJywgW0RldGFpbF0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICBhY2NvdW50VGV4dDogcmVzb3VyY2UuYWNjb3VudFRleHQsXHJcbiAgYWRkcmVzc1RleHQ6IHJlc291cmNlLmFkZHJlc3NUZXh0LFxyXG4gIGJ1c2luZXNzRGVzY3JpcHRpb25UZXh0OiByZXNvdXJjZS5idXNpbmVzc0Rlc2NyaXB0aW9uVGV4dCxcclxuICBjcmVhdGVEYXRlVGV4dDogcmVzb3VyY2UuY3JlYXRlRGF0ZVRleHQsXHJcbiAgY3JlYXRlVXNlclRleHQ6IHJlc291cmNlLmNyZWF0ZVVzZXJUZXh0LFxyXG4gIGVNYWlsVGV4dDogcmVzb3VyY2UuZU1haWxUZXh0LFxyXG4gIGxlYWRTb3VyY2VUZXh0OiByZXNvdXJjZS5sZWFkU291cmNlVGV4dCxcclxuICBpbmR1c3RyeVRleHQ6IHJlc291cmNlLmluZHVzdHJ5VGV4dCxcclxuICBpbnRlcmVzdHNUZXh0OiByZXNvdXJjZS5pbnRlcmVzdHNUZXh0LFxyXG4gIGxlYWRUaXRsZVRleHQ6IHJlc291cmNlLmxlYWRUaXRsZVRleHQsXHJcbiAgbmFtZVRleHQ6IHJlc291cmNlLm5hbWVUZXh0LFxyXG4gIG5vdGVzVGV4dDogcmVzb3VyY2Uubm90ZXNUZXh0LFxyXG4gIG93bmVyVGV4dDogcmVzb3VyY2Uub3duZXJUZXh0LFxyXG4gIHJlbGF0ZWRBY3Rpdml0aWVzVGV4dDogcmVzb3VyY2UucmVsYXRlZEFjdGl2aXRpZXNUZXh0LFxyXG4gIHJlbGF0ZWRIaXN0b3JpZXNUZXh0OiByZXNvdXJjZS5yZWxhdGVkSGlzdG9yaWVzVGV4dCxcclxuICByZWxhdGVkSXRlbXNUZXh0OiByZXNvdXJjZS5yZWxhdGVkSXRlbXNUZXh0LFxyXG4gIHJlbGF0ZWROb3Rlc1RleHQ6IHJlc291cmNlLnJlbGF0ZWROb3Rlc1RleHQsXHJcbiAgcmVsYXRlZEF0dGFjaG1lbnRUZXh0OiByZXNvdXJjZS5yZWxhdGVkQXR0YWNobWVudFRleHQsXHJcbiAgcmVsYXRlZEF0dGFjaG1lbnRUaXRsZVRleHQ6IHJlc291cmNlLnJlbGF0ZWRBdHRhY2htZW50VGl0bGVUZXh0LFxyXG4gIHNpY0NvZGVUZXh0OiByZXNvdXJjZS5zaWNDb2RlVGV4dCxcclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICB0b2xsRnJlZVRleHQ6IHJlc291cmNlLnRvbGxGcmVlVGV4dCxcclxuICBtb2JpbGVUZXh0OiByZXNvdXJjZS5tb2JpbGVUZXh0LFxyXG4gIHdlYlRleHQ6IHJlc291cmNlLndlYlRleHQsXHJcbiAgd29ya1RleHQ6IHJlc291cmNlLndvcmtUZXh0LFxyXG4gIGFjdGlvbnNUZXh0OiByZXNvdXJjZS5hY3Rpb25zVGV4dCxcclxuICBjYWxsV29ya051bWJlclRleHQ6IHJlc291cmNlLmNhbGxXb3JrTnVtYmVyVGV4dCxcclxuICBzY2hlZHVsZUFjdGl2aXR5VGV4dDogcmVzb3VyY2Uuc2NoZWR1bGVBY3Rpdml0eVRleHQsXHJcbiAgYWRkTm90ZVRleHQ6IHJlc291cmNlLmFkZE5vdGVUZXh0LFxyXG4gIHNlbmRFbWFpbFRleHQ6IHJlc291cmNlLnNlbmRFbWFpbFRleHQsXHJcbiAgdmlld0FkZHJlc3NUZXh0OiByZXNvdXJjZS52aWV3QWRkcmVzc1RleHQsXHJcbiAgY2FsbGVkVGV4dDogcmVzb3VyY2UuY2FsbGVkVGV4dCxcclxuICBlbWFpbGVkVGV4dDogcmVzb3VyY2UuZW1haWxlZFRleHQsXHJcbiAgZW50aXR5VGV4dDogcmVzb3VyY2UuZW50aXR5VGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdsZWFkX2RldGFpbCcsXHJcbiAgZWRpdFZpZXc6ICdsZWFkX2VkaXQnLFxyXG4gIGhpc3RvcnlFZGl0VmlldzogJ2hpc3RvcnlfZWRpdCcsXHJcbiAgbm90ZUVkaXRWaWV3OiAnaGlzdG9yeV9lZGl0JyxcclxuICBlbmFibGVPZmZsaW5lOiB0cnVlLFxyXG4gIHJlc291cmNlS2luZDogJ2xlYWRzJyxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLkxFQUQsXHJcblxyXG4gIG5hdmlnYXRlVG9IaXN0b3J5SW5zZXJ0OiBmdW5jdGlvbiBuYXZpZ2F0ZVRvSGlzdG9yeUluc2VydCh0eXBlLCBlbnRyeSkge1xyXG4gICAgdGhpcy5yZWZyZXNoUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgYWN0aW9uLm5hdmlnYXRlVG9IaXN0b3J5SW5zZXJ0KGVudHJ5KTtcclxuICB9LFxyXG4gIHJlY29yZENhbGxUb0hpc3Rvcnk6IGZ1bmN0aW9uIHJlY29yZENhbGxUb0hpc3RvcnkocGhvbmVOdW1iZXIpIHtcclxuICAgIGNvbnN0IGVudHJ5ID0ge1xyXG4gICAgICAkbmFtZTogJ0hpc3RvcnknLFxyXG4gICAgICBUeXBlOiAnYXRQaG9uZUNhbGwnLFxyXG4gICAgICBBY2NvdW50TmFtZTogdGhpcy5lbnRyeS5Db21wYW55LFxyXG4gICAgICBMZWFkSWQ6IHRoaXMuZW50cnkuJGtleSxcclxuICAgICAgTGVhZE5hbWU6IHRoaXMuZW50cnkuTGVhZE5hbWVMYXN0Rmlyc3QsXHJcbiAgICAgIERlc2NyaXB0aW9uOiBzdHJpbmcuc3Vic3RpdHV0ZSh0aGlzLmNhbGxlZFRleHQsIFt0aGlzLmVudHJ5LkxlYWROYW1lRmlyc3RMYXN0XSksXHJcbiAgICAgIFVzZXJJZDogQXBwLmNvbnRleHQgJiYgQXBwLmNvbnRleHQudXNlci4ka2V5LFxyXG4gICAgICBVc2VyTmFtZTogQXBwLmNvbnRleHQgJiYgQXBwLmNvbnRleHQudXNlci5Vc2VyTmFtZSxcclxuICAgICAgRHVyYXRpb246IDE1LFxyXG4gICAgICBDb21wbGV0ZWREYXRlOiAobmV3IERhdGUoKSksXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMubmF2aWdhdGVUb0hpc3RvcnlJbnNlcnQoJ2F0UGhvbmVDYWxsJywgZW50cnkpO1xyXG4gICAgQXBwLmluaXRpYXRlQ2FsbChwaG9uZU51bWJlcik7XHJcbiAgfSxcclxuICByZWNvcmRFbWFpbFRvSGlzdG9yeTogZnVuY3Rpb24gcmVjb3JkRW1haWxUb0hpc3RvcnkoZW1haWwpIHtcclxuICAgIGNvbnN0IGVudHJ5ID0ge1xyXG4gICAgICAkbmFtZTogJ0hpc3RvcnknLFxyXG4gICAgICBUeXBlOiAnYXRFTWFpbCcsXHJcbiAgICAgIEFjY291bnROYW1lOiB0aGlzLmVudHJ5LkNvbXBhbnksXHJcbiAgICAgIExlYWRJZDogdGhpcy5lbnRyeS4ka2V5LFxyXG4gICAgICBMZWFkTmFtZTogdGhpcy5lbnRyeS5MZWFkTmFtZUxhc3RGaXJzdCxcclxuICAgICAgRGVzY3JpcHRpb246IHN0cmluZy5zdWJzdGl0dXRlKHRoaXMuZW1haWxlZFRleHQsIFt0aGlzLmVudHJ5LkxlYWROYW1lTGFzdEZpcnN0XSksXHJcbiAgICAgIFVzZXJJZDogQXBwLmNvbnRleHQgJiYgQXBwLmNvbnRleHQudXNlci4ka2V5LFxyXG4gICAgICBVc2VyTmFtZTogQXBwLmNvbnRleHQgJiYgQXBwLmNvbnRleHQudXNlci5Vc2VyTmFtZSxcclxuICAgICAgRHVyYXRpb246IDE1LFxyXG4gICAgICBDb21wbGV0ZWREYXRlOiAobmV3IERhdGUoKSksXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMubmF2aWdhdGVUb0hpc3RvcnlJbnNlcnQoJ2F0RU1haWwnLCBlbnRyeSk7XHJcbiAgICBBcHAuaW5pdGlhdGVFbWFpbChlbWFpbCk7XHJcbiAgfSxcclxuICBjYWxsV29ya1Bob25lOiBmdW5jdGlvbiBjYWxsV29ya1Bob25lKCkge1xyXG4gICAgdGhpcy5yZWNvcmRDYWxsVG9IaXN0b3J5KHRoaXMuZW50cnkuV29ya1Bob25lKTtcclxuICB9LFxyXG4gIGNoZWNrV29ya1Bob25lOiBmdW5jdGlvbiBjaGVja1dvcmtQaG9uZShlbnRyeSwgdmFsdWUpIHtcclxuICAgIHJldHVybiAhdmFsdWU7XHJcbiAgfSxcclxuICBzZW5kRW1haWw6IGZ1bmN0aW9uIHNlbmRFbWFpbCgpIHtcclxuICAgIHRoaXMucmVjb3JkRW1haWxUb0hpc3RvcnkodGhpcy5lbnRyeS5FbWFpbCk7XHJcbiAgfSxcclxuICBjaGVja0VtYWlsOiBmdW5jdGlvbiBjaGVja0VtYWlsKGVudHJ5LCB2YWx1ZSkge1xyXG4gICAgcmV0dXJuICF2YWx1ZTtcclxuICB9LFxyXG4gIHZpZXdBZGRyZXNzOiBmdW5jdGlvbiB2aWV3QWRkcmVzcygpIHtcclxuICAgIEFwcC5zaG93TWFwRm9yQWRkcmVzcyhmb3JtYXQuYWRkcmVzcyh0aGlzLmVudHJ5LkFkZHJlc3MsIHRydWUsICcgJykpO1xyXG4gIH0sXHJcbiAgY2hlY2tBZGRyZXNzOiBmdW5jdGlvbiBjaGVja0FkZHJlc3MoZW50cnksIHZhbHVlKSB7XHJcbiAgICByZXR1cm4gIWZvcm1hdC5hZGRyZXNzKHZhbHVlLCB0cnVlLCAnJyk7XHJcbiAgfSxcclxuICBzY2hlZHVsZUFjdGl2aXR5OiBmdW5jdGlvbiBzY2hlZHVsZUFjdGl2aXR5KCkge1xyXG4gICAgQXBwLm5hdmlnYXRlVG9BY3Rpdml0eUluc2VydFZpZXcoKTtcclxuICB9LFxyXG4gIGFkZE5vdGU6IGZ1bmN0aW9uIGFkZE5vdGUoKSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcodGhpcy5ub3RlRWRpdFZpZXcpO1xyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgdmlldy5zaG93KHtcclxuICAgICAgICB0ZW1wbGF0ZToge30sXHJcbiAgICAgICAgaW5zZXJ0OiB0cnVlLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIGZvcm1hdFBpY2tsaXN0OiBmdW5jdGlvbiBmb3JtYXRQaWNrbGlzdChwcm9wZXJ0eSkge1xyXG4gICAgcmV0dXJuIGZvcm1hdC5waWNrbGlzdCh0aGlzLmFwcC5waWNrbGlzdFNlcnZpY2UsIHRoaXMuX21vZGVsLCBwcm9wZXJ0eSk7XHJcbiAgfSxcclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbe1xyXG4gICAgICBsaXN0OiB0cnVlLFxyXG4gICAgICB0aXRsZTogdGhpcy5hY3Rpb25zVGV4dCxcclxuICAgICAgY2xzOiAnYWN0aW9uLWxpc3QnLFxyXG4gICAgICBuYW1lOiAnUXVpY2tBY3Rpb25zU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIG5hbWU6ICdDYWxsV29ya1Bob25lQWN0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1dvcmtQaG9uZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuY2FsbFdvcmtOdW1iZXJUZXh0LFxyXG4gICAgICAgIGFjdGlvbjogJ2NhbGxXb3JrUGhvbmUnLFxyXG4gICAgICAgIGljb25DbGFzczogJ3Bob25lJyxcclxuICAgICAgICBkaXNhYmxlZDogdGhpcy5jaGVja1dvcmtQaG9uZSxcclxuICAgICAgICByZW5kZXJlcjogZm9ybWF0LnBob25lLmJpbmREZWxlZ2F0ZSh0aGlzLCBmYWxzZSksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQ2hlY2tFbWFpbEFjdGlvbicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFbWFpbCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc2VuZEVtYWlsVGV4dCxcclxuICAgICAgICBhY3Rpb246ICdzZW5kRW1haWwnLFxyXG4gICAgICAgIGljb25DbGFzczogJ21haWwnLFxyXG4gICAgICAgIGRpc2FibGVkOiB0aGlzLmNoZWNrRW1haWwsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnU2NoZWR1bGVBY3Rpdml0eUFjdGlvbicsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc2NoZWR1bGVBY3Rpdml0eVRleHQsXHJcbiAgICAgICAgYWN0aW9uOiAnc2NoZWR1bGVBY3Rpdml0eScsXHJcbiAgICAgICAgaWNvbkNsYXNzOiAnY2FsZW5kYXInLFxyXG4gICAgICAgIHRwbDogbmV3IFNpbXBsYXRlKFtcclxuICAgICAgICAgICd7JTogJC5Db21wYW55ICV9IC8geyU6ICQuTGVhZE5hbWVMYXN0Rmlyc3QgJX0nLFxyXG4gICAgICAgIF0pLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0FkZE5vdGVBY3Rpb24nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnTGVhZE5hbWVMYXN0Rmlyc3QnLFxyXG4gICAgICAgIGljb25DbGFzczogJ3F1aWNrLWVkaXQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFkZE5vdGVUZXh0LFxyXG4gICAgICAgIGFjdGlvbjogJ2FkZE5vdGUnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1ZpZXdBZGRyZXNzQWN0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0FkZHJlc3MnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnZpZXdBZGRyZXNzVGV4dCxcclxuICAgICAgICBhY3Rpb246ICd2aWV3QWRkcmVzcycsXHJcbiAgICAgICAgaWNvbkNsYXNzOiAnbWFwLXBpbicsXHJcbiAgICAgICAgZGlzYWJsZWQ6IHRoaXMuY2hlY2tBZGRyZXNzLFxyXG4gICAgICAgIHJlbmRlcmVyOiBmb3JtYXQuYWRkcmVzcy5iaW5kRGVsZWdhdGUodGhpcywgdHJ1ZSwgJyAnKSxcclxuICAgICAgfV0sXHJcbiAgICB9LCB7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmRldGFpbHNUZXh0LFxyXG4gICAgICBuYW1lOiAnRGV0YWlsc1NlY3Rpb24nLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBsYWJlbDogdGhpcy5uYW1lVGV4dCxcclxuICAgICAgICBuYW1lOiAnTGVhZE5hbWVMYXN0Rmlyc3QnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnTGVhZE5hbWVMYXN0Rmlyc3QnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYWNjb3VudFRleHQsXHJcbiAgICAgICAgbmFtZTogJ0NvbXBhbnknLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ29tcGFueScsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5sZWFkVGl0bGVUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdUaXRsZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdUaXRsZScsXHJcbiAgICAgICAgcmVuZGVyZXI6IHRoaXMuZm9ybWF0UGlja2xpc3QoJ1RpdGxlJyksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy53b3JrVGV4dCxcclxuICAgICAgICBuYW1lOiAnV29ya1Bob25lJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1dvcmtQaG9uZScsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZvcm1hdC5waG9uZSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLm1vYmlsZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ01vYmlsZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdNb2JpbGUnLFxyXG4gICAgICAgIHJlbmRlcmVyOiBmb3JtYXQucGhvbmUsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy50b2xsRnJlZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ1RvbGxGcmVlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1RvbGxGcmVlJyxcclxuICAgICAgICByZW5kZXJlcjogZm9ybWF0LnBob25lLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMubGVhZFNvdXJjZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0xlYWRTb3VyY2UuRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnTGVhZFNvdXJjZS5EZXNjcmlwdGlvbicsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy53ZWJUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdXZWJBZGRyZXNzJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1dlYkFkZHJlc3MnLFxyXG4gICAgICAgIHJlbmRlcmVyOiBmb3JtYXQubGluayxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmludGVyZXN0c1RleHQsXHJcbiAgICAgICAgbmFtZTogJ0ludGVyZXN0cycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdJbnRlcmVzdHMnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuaW5kdXN0cnlUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdJbmR1c3RyeScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdJbmR1c3RyeScsXHJcbiAgICAgICAgcmVuZGVyZXI6IHRoaXMuZm9ybWF0UGlja2xpc3QoJ0luZHVzdHJ5JyksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5zaWNDb2RlVGV4dCxcclxuICAgICAgICBuYW1lOiAnU0lDQ29kZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdTSUNDb2RlJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmJ1c2luZXNzRGVzY3JpcHRpb25UZXh0LFxyXG4gICAgICAgIG5hbWU6ICdCdXNpbmVzc0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0J1c2luZXNzRGVzY3JpcHRpb24nLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMubm90ZXNUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdOb3RlcycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdOb3RlcycsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5vd25lclRleHQsXHJcbiAgICAgICAgbmFtZTogJ093bmVyLk93bmVyRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnT3duZXIuT3duZXJEZXNjcmlwdGlvbicsXHJcbiAgICAgIH1dLFxyXG4gICAgfSwge1xyXG4gICAgICBsaXN0OiB0cnVlLFxyXG4gICAgICB0aXRsZTogdGhpcy5yZWxhdGVkSXRlbXNUZXh0LFxyXG4gICAgICBuYW1lOiAnUmVsYXRlZEl0ZW1zU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIG5hbWU6ICdBY3Rpdml0eVJlbGF0ZWQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnJlbGF0ZWRBY3Rpdml0aWVzVGV4dCxcclxuICAgICAgICB2aWV3OiAnYWN0aXZpdHlfcmVsYXRlZCcsXHJcbiAgICAgICAgd2hlcmU6IHRoaXMuZm9ybWF0UmVsYXRlZFF1ZXJ5LmJpbmREZWxlZ2F0ZSh0aGlzLCAnTGVhZElkIGVxIFwiJHswfVwiJyksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnSGlzdG9yeVJlbGF0ZWQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnJlbGF0ZWRIaXN0b3JpZXNUZXh0LFxyXG4gICAgICAgIHdoZXJlOiB0aGlzLmZvcm1hdFJlbGF0ZWRRdWVyeS5iaW5kRGVsZWdhdGUodGhpcywgJ0xlYWRJZCBlcSBcIiR7MH1cIiBhbmQgVHlwZSBuZSBcImF0RGF0YWJhc2VDaGFuZ2VcIicpLFxyXG4gICAgICAgIHZpZXc6ICdoaXN0b3J5X3JlbGF0ZWQnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0F0dGFjaG1lbnRSZWxhdGVkJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5yZWxhdGVkQXR0YWNobWVudFRleHQsXHJcbiAgICAgICAgd2hlcmU6IHRoaXMuZm9ybWF0UmVsYXRlZFF1ZXJ5LmJpbmREZWxlZ2F0ZSh0aGlzLCAnbGVhZElkIGVxIFwiJHswfVwiJyksIC8vIG11c3QgYmUgbG93ZXIgY2FzZSBiZWNhdXNlIG9mIGZlZWRcclxuICAgICAgICB2aWV3OiAnbGVhZF9hdHRhY2htZW50X3JlbGF0ZWQnLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLnJlbGF0ZWRBdHRhY2htZW50VGl0bGVUZXh0LFxyXG4gICAgICB9XSxcclxuICAgIH1dKTtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==