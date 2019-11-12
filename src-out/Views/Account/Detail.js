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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9BY2NvdW50L0RldGFpbC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJhY2NvdW50VGV4dCIsImFjY3RNZ3JUZXh0IiwiYWRkcmVzc1RleHQiLCJidXNpbmVzc0Rlc2NyaXB0aW9uVGV4dCIsImNyZWF0ZURhdGVUZXh0IiwiY3JlYXRlVXNlclRleHQiLCJmYXhUZXh0IiwiaW1wb3J0U291cmNlVGV4dCIsImluZHVzdHJ5VGV4dCIsIm5vdGVzVGV4dCIsIm93bmVyVGV4dCIsInBob25lVGV4dCIsImFjdGlvbnNUZXh0IiwicmVsYXRlZEFjdGl2aXRpZXNUZXh0IiwicmVsYXRlZENvbnRhY3RzVGV4dCIsInJlbGF0ZWRIaXN0b3JpZXNUZXh0IiwicmVsYXRlZEl0ZW1zVGV4dCIsInJlbGF0ZWROb3Rlc1RleHQiLCJyZWxhdGVkT3Bwb3J0dW5pdGllc1RleHQiLCJyZWxhdGVkVGlja2V0c1RleHQiLCJyZWxhdGVkQWRkcmVzc2VzVGV4dCIsInJlbGF0ZWRBdHRhY2htZW50VGV4dCIsInJlbGF0ZWRBdHRhY2htZW50VGl0bGVUZXh0Iiwic3RhdHVzVGV4dCIsInN1YlR5cGVUZXh0IiwidGl0bGVUZXh0IiwidHlwZVRleHQiLCJ3ZWJUZXh0Iiwic2NoZWR1bGVBY3Rpdml0eVRleHQiLCJhZGROb3RlVGV4dCIsImNhbGxlZFRleHQiLCJlbnRpdHlUZXh0IiwiaWQiLCJlZGl0VmlldyIsImhpc3RvcnlFZGl0VmlldyIsIm5vdGVFZGl0VmlldyIsImVuYWJsZU9mZmxpbmUiLCJyZXNvdXJjZUtpbmQiLCJtb2RlbE5hbWUiLCJBQ0NPVU5UIiwibmF2aWdhdGVUb0hpc3RvcnlJbnNlcnQiLCJ0eXBlIiwiZW50cnkiLCJyZWNvcmRDYWxsVG9IaXN0b3J5IiwicGhvbmVOdW1iZXIiLCJUeXBlIiwiQWNjb3VudElkIiwiJGtleSIsIkFjY291bnROYW1lIiwiRGVzY3JpcHRpb24iLCJzdWJzdGl0dXRlIiwiVXNlcklkIiwiQXBwIiwiY29udGV4dCIsInVzZXIiLCJVc2VyTmFtZSIsIkR1cmF0aW9uIiwiQ29tcGxldGVkRGF0ZSIsIkRhdGUiLCJpbml0aWF0ZUNhbGwiLCJjYWxsTWFpblBob25lIiwiTWFpblBob25lIiwic2NoZWR1bGVBY3Rpdml0eSIsIm5hdmlnYXRlVG9BY3Rpdml0eUluc2VydFZpZXciLCJhZGROb3RlIiwidmlldyIsImdldFZpZXciLCJzaG93IiwidGVtcGxhdGUiLCJpbnNlcnQiLCJmb3JtYXRQaWNrbGlzdCIsInByb3BlcnR5IiwicGlja2xpc3QiLCJhcHAiLCJwaWNrbGlzdFNlcnZpY2UiLCJfbW9kZWwiLCJjcmVhdGVMYXlvdXQiLCJsYXlvdXQiLCJ0aXRsZSIsImxpc3QiLCJjbHMiLCJuYW1lIiwiY2hpbGRyZW4iLCJsYWJlbCIsImljb25DbGFzcyIsImFjdGlvbiIsImRldGFpbHNUZXh0IiwicmVuZGVyZXIiLCJwaG9uZSIsImJpbmREZWxlZ2F0ZSIsInRwbCIsIm5hbWVMRiIsImxpbmsiLCJhZGRyZXNzIiwid2hlcmUiLCJmb3JtYXRSZWxhdGVkUXVlcnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsTUFBTUEsV0FBVyxvQkFBWSxlQUFaLENBQWpCOztBQUVBOzs7Ozs7Ozs7O0FBVUEsTUFBTUMsVUFBVSx1QkFBUSwwQkFBUixFQUFvQyxrQkFBcEMsRUFBOEM7QUFDNUQ7QUFDQUMsaUJBQWFGLFNBQVNFLFdBRnNDO0FBRzVEQyxpQkFBYUgsU0FBU0csV0FIc0M7QUFJNURDLGlCQUFhSixTQUFTSSxXQUpzQztBQUs1REMsNkJBQXlCTCxTQUFTSyx1QkFMMEI7QUFNNURDLG9CQUFnQk4sU0FBU00sY0FObUM7QUFPNURDLG9CQUFnQlAsU0FBU08sY0FQbUM7QUFRNURDLGFBQVNSLFNBQVNRLE9BUjBDO0FBUzVEQyxzQkFBa0JULFNBQVNTLGdCQVRpQztBQVU1REMsa0JBQWNWLFNBQVNVLFlBVnFDO0FBVzVEQyxlQUFXWCxT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RSxpQkFBTyxLQUFLcEUsb0JBRlg7QUFHRCtFLGlCQUFPLEtBQUtDLGtCQUFMLENBQXdCTixZQUF4QixDQUFxQyxJQUFyQyxFQUEyQyxvREFBM0MsQ0FITjtBQUlEeEIsZ0JBQU07QUFKTCxTQXBCTyxFQXlCUDtBQUNEZ0IsZ0JBQU0sa0JBREw7QUFFREUsaUJBQU8sS0FBSy9ELG9CQUZYO0FBR0QwRSxpQkFBTyxLQUFLQyxrQkFBTCxDQUF3Qk4sWUFBeEIsQ0FBcUMsSUFBckMsRUFBMkMsb0JBQTNDLEVBQWlFLGtCQUFqRSxDQUhOO0FBSUR4QixnQkFBTTtBQUpMLFNBekJPLEVBOEJQO0FBQ0RnQixnQkFBTSxtQkFETDtBQUVERSxpQkFBTyxLQUFLOUQscUJBRlg7QUFHRHlFLGlCQUFPLEtBQUtDLGtCQUFMLENBQXdCTixZQUF4QixDQUFxQyxJQUFyQyxFQUEyQyxxQkFBM0MsQ0FITixFQUd5RTtBQUMxRXhCLGdCQUFNLDRCQUpMO0FBS0RhLGlCQUFPLEtBQUt4RDtBQUxYLFNBOUJPO0FBSlQsT0F0RmtDLENBQTlCLENBQVA7QUFnSUQ7QUFqTjJELEdBQTlDLENBQWhCOztvQkFvTmV2QixPIiwiZmlsZSI6IkRldGFpbC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBzdHJpbmcgZnJvbSAnZG9qby9zdHJpbmcnO1xyXG5pbXBvcnQgYWN0aW9uIGZyb20gJy4uLy4uL0FjdGlvbic7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnLi4vLi4vRm9ybWF0JztcclxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4uLy4uL1RlbXBsYXRlJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCBEZXRhaWwgZnJvbSAnYXJnb3MvRGV0YWlsJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYWNjb3VudERldGFpbCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuQWNjb3VudC5EZXRhaWxcclxuICpcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuRGV0YWlsXHJcbiAqIEByZXF1aXJlcyBhcmdvcy5EZXRhaWxcclxuICogQHJlcXVpcmVzIGNybS5Gb3JtYXRcclxuICogQHJlcXVpcmVzIGNybS5UZW1wbGF0ZVxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5BY2NvdW50LkRldGFpbCcsIFtEZXRhaWxdLCB7XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgYWNjb3VudFRleHQ6IHJlc291cmNlLmFjY291bnRUZXh0LFxyXG4gIGFjY3RNZ3JUZXh0OiByZXNvdXJjZS5hY2N0TWdyVGV4dCxcclxuICBhZGRyZXNzVGV4dDogcmVzb3VyY2UuYWRkcmVzc1RleHQsXHJcbiAgYnVzaW5lc3NEZXNjcmlwdGlvblRleHQ6IHJlc291cmNlLmJ1c2luZXNzRGVzY3JpcHRpb25UZXh0LFxyXG4gIGNyZWF0ZURhdGVUZXh0OiByZXNvdXJjZS5jcmVhdGVEYXRlVGV4dCxcclxuICBjcmVhdGVVc2VyVGV4dDogcmVzb3VyY2UuY3JlYXRlVXNlclRleHQsXHJcbiAgZmF4VGV4dDogcmVzb3VyY2UuZmF4VGV4dCxcclxuICBpbXBvcnRTb3VyY2VUZXh0OiByZXNvdXJjZS5pbXBvcnRTb3VyY2VUZXh0LFxyXG4gIGluZHVzdHJ5VGV4dDogcmVzb3VyY2UuaW5kdXN0cnlUZXh0LFxyXG4gIG5vdGVzVGV4dDogcmVzb3VyY2Uubm90ZXNUZXh0LFxyXG4gIG93bmVyVGV4dDogcmVzb3VyY2Uub3duZXJUZXh0LFxyXG4gIHBob25lVGV4dDogcmVzb3VyY2UucGhvbmVUZXh0LFxyXG4gIGFjdGlvbnNUZXh0OiByZXNvdXJjZS5hY3Rpb25zVGV4dCxcclxuICByZWxhdGVkQWN0aXZpdGllc1RleHQ6IHJlc291cmNlLnJlbGF0ZWRBY3Rpdml0aWVzVGV4dCxcclxuICByZWxhdGVkQ29udGFjdHNUZXh0OiByZXNvdXJjZS5yZWxhdGVkQ29udGFjdHNUZXh0LFxyXG4gIHJlbGF0ZWRIaXN0b3JpZXNUZXh0OiByZXNvdXJjZS5yZWxhdGVkSGlzdG9yaWVzVGV4dCxcclxuICByZWxhdGVkSXRlbXNUZXh0OiByZXNvdXJjZS5yZWxhdGVkSXRlbXNUZXh0LFxyXG4gIHJlbGF0ZWROb3Rlc1RleHQ6IHJlc291cmNlLnJlbGF0ZWROb3Rlc1RleHQsXHJcbiAgcmVsYXRlZE9wcG9ydHVuaXRpZXNUZXh0OiByZXNvdXJjZS5yZWxhdGVkT3Bwb3J0dW5pdGllc1RleHQsXHJcbiAgcmVsYXRlZFRpY2tldHNUZXh0OiByZXNvdXJjZS5yZWxhdGVkVGlja2V0c1RleHQsXHJcbiAgcmVsYXRlZEFkZHJlc3Nlc1RleHQ6IHJlc291cmNlLnJlbGF0ZWRBZGRyZXNzZXNUZXh0LFxyXG4gIHJlbGF0ZWRBdHRhY2htZW50VGV4dDogcmVzb3VyY2UucmVsYXRlZEF0dGFjaG1lbnRUZXh0LFxyXG4gIHJlbGF0ZWRBdHRhY2htZW50VGl0bGVUZXh0OiByZXNvdXJjZS5yZWxhdGVkQXR0YWNobWVudFRpdGxlVGV4dCxcclxuICBzdGF0dXNUZXh0OiByZXNvdXJjZS5zdGF0dXNUZXh0LFxyXG4gIHN1YlR5cGVUZXh0OiByZXNvdXJjZS5zdWJUeXBlVGV4dCxcclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICB0eXBlVGV4dDogcmVzb3VyY2UudHlwZVRleHQsXHJcbiAgd2ViVGV4dDogcmVzb3VyY2Uud2ViVGV4dCxcclxuICBzY2hlZHVsZUFjdGl2aXR5VGV4dDogcmVzb3VyY2Uuc2NoZWR1bGVBY3Rpdml0eVRleHQsXHJcbiAgYWRkTm90ZVRleHQ6IHJlc291cmNlLmFkZE5vdGVUZXh0LFxyXG4gIGNhbGxlZFRleHQ6IHJlc291cmNlLmNhbGxlZFRleHQsXHJcbiAgZW50aXR5VGV4dDogcmVzb3VyY2UuZW50aXR5VGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdhY2NvdW50X2RldGFpbCcsXHJcbiAgZWRpdFZpZXc6ICdhY2NvdW50X2VkaXQnLFxyXG4gIGhpc3RvcnlFZGl0VmlldzogJ2hpc3RvcnlfZWRpdCcsXHJcbiAgbm90ZUVkaXRWaWV3OiAnaGlzdG9yeV9lZGl0JyxcclxuICBlbmFibGVPZmZsaW5lOiB0cnVlLFxyXG4gIHJlc291cmNlS2luZDogJ2FjY291bnRzJyxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLkFDQ09VTlQsXHJcblxyXG4gIG5hdmlnYXRlVG9IaXN0b3J5SW5zZXJ0OiBmdW5jdGlvbiBuYXZpZ2F0ZVRvSGlzdG9yeUluc2VydCh0eXBlLCBlbnRyeSkge1xyXG4gICAgYWN0aW9uLm5hdmlnYXRlVG9IaXN0b3J5SW5zZXJ0KGVudHJ5KTtcclxuICB9LFxyXG4gIHJlY29yZENhbGxUb0hpc3Rvcnk6IGZ1bmN0aW9uIHJlY29yZENhbGxUb0hpc3RvcnkocGhvbmVOdW1iZXIpIHtcclxuICAgIGNvbnN0IGVudHJ5ID0ge1xyXG4gICAgICBUeXBlOiAnYXRQaG9uZUNhbGwnLFxyXG4gICAgICBBY2NvdW50SWQ6IHRoaXMuZW50cnkuJGtleSxcclxuICAgICAgQWNjb3VudE5hbWU6IHRoaXMuZW50cnkuQWNjb3VudE5hbWUsXHJcbiAgICAgIERlc2NyaXB0aW9uOiBzdHJpbmcuc3Vic3RpdHV0ZSh0aGlzLmNhbGxlZFRleHQsIFt0aGlzLmVudHJ5LkFjY291bnROYW1lXSksXHJcbiAgICAgIFVzZXJJZDogQXBwLmNvbnRleHQgJiYgQXBwLmNvbnRleHQudXNlci4ka2V5LFxyXG4gICAgICBVc2VyTmFtZTogQXBwLmNvbnRleHQgJiYgQXBwLmNvbnRleHQudXNlci5Vc2VyTmFtZSxcclxuICAgICAgRHVyYXRpb246IDE1LFxyXG4gICAgICBDb21wbGV0ZWREYXRlOiAobmV3IERhdGUoKSksXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMubmF2aWdhdGVUb0hpc3RvcnlJbnNlcnQoJ2F0UGhvbmVDYWxsJywgZW50cnkpO1xyXG4gICAgQXBwLmluaXRpYXRlQ2FsbChwaG9uZU51bWJlcik7XHJcbiAgfSxcclxuICBjYWxsTWFpblBob25lOiBmdW5jdGlvbiBjYWxsTWFpblBob25lKCkge1xyXG4gICAgdGhpcy5yZWNvcmRDYWxsVG9IaXN0b3J5KHRoaXMuZW50cnkuTWFpblBob25lKTtcclxuICB9LFxyXG4gIHNjaGVkdWxlQWN0aXZpdHk6IGZ1bmN0aW9uIHNjaGVkdWxlQWN0aXZpdHkoKSB7XHJcbiAgICBBcHAubmF2aWdhdGVUb0FjdGl2aXR5SW5zZXJ0VmlldygpO1xyXG4gIH0sXHJcbiAgYWRkTm90ZTogZnVuY3Rpb24gYWRkTm90ZSgpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyh0aGlzLm5vdGVFZGl0Vmlldyk7XHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICB2aWV3LnNob3coe1xyXG4gICAgICAgIHRlbXBsYXRlOiB7fSxcclxuICAgICAgICBpbnNlcnQ6IHRydWUsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZm9ybWF0UGlja2xpc3Q6IGZ1bmN0aW9uIGZvcm1hdFBpY2tsaXN0KHByb3BlcnR5KSB7XHJcbiAgICByZXR1cm4gZm9ybWF0LnBpY2tsaXN0KHRoaXMuYXBwLnBpY2tsaXN0U2VydmljZSwgdGhpcy5fbW9kZWwsIHByb3BlcnR5KTtcclxuICB9LFxyXG4gIGNyZWF0ZUxheW91dDogZnVuY3Rpb24gY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5b3V0IHx8ICh0aGlzLmxheW91dCA9IFt7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmFjdGlvbnNUZXh0LFxyXG4gICAgICBsaXN0OiB0cnVlLFxyXG4gICAgICBjbHM6ICdhY3Rpb24tbGlzdCcsXHJcbiAgICAgIG5hbWU6ICdRdWlja0FjdGlvbnNTZWN0aW9uJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbmFtZTogJ1NjaGVkdWxlQWN0aXZpdHlBY3Rpb24nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQWNjb3VudE5hbWUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnNjaGVkdWxlQWN0aXZpdHlUZXh0LFxyXG4gICAgICAgIGljb25DbGFzczogJ2NhbGVuZGFyJyxcclxuICAgICAgICBhY3Rpb246ICdzY2hlZHVsZUFjdGl2aXR5JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdBZGROb3RlQWN0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0FjY291bnROYW1lJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5hZGROb3RlVGV4dCxcclxuICAgICAgICBpY29uQ2xhc3M6ICdlZGl0JyxcclxuICAgICAgICBhY3Rpb246ICdhZGROb3RlJyxcclxuICAgICAgfV0sXHJcbiAgICB9LCB7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmRldGFpbHNUZXh0LFxyXG4gICAgICBuYW1lOiAnRGV0YWlsc1NlY3Rpb24nLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBuYW1lOiAnQWNjb3VudE5hbWUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQWNjb3VudE5hbWUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFjY291bnRUZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ01haW5QaG9uZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdNYWluUGhvbmUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnBob25lVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZm9ybWF0LnBob25lLmJpbmREZWxlZ2F0ZSh0aGlzLCBmYWxzZSksXHJcbiAgICAgICAgYWN0aW9uOiAnY2FsbE1haW5QaG9uZScsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnU3RhdHVzJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1N0YXR1cycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc3RhdHVzVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogdGhpcy5mb3JtYXRQaWNrbGlzdCgnU3RhdHVzJyksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQWNjb3VudE1hbmFnZXIuVXNlckluZm8nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQWNjb3VudE1hbmFnZXIuVXNlckluZm8nLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFjY3RNZ3JUZXh0LFxyXG4gICAgICAgIHRwbDogdGVtcGxhdGUubmFtZUxGLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1dlYkFkZHJlc3MnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnV2ViQWRkcmVzcycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMud2ViVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZm9ybWF0LmxpbmssXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQWRkcmVzcycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdBZGRyZXNzJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5hZGRyZXNzVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZm9ybWF0LmFkZHJlc3MuYmluZERlbGVnYXRlKHRoaXMsIGZhbHNlKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdGYXgnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRmF4JyxcclxuICAgICAgICBsYWJlbDogdGhpcy5mYXhUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmb3JtYXQucGhvbmUuYmluZERlbGVnYXRlKHRoaXMsIHRydWUpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1R5cGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnVHlwZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMudHlwZVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IHRoaXMuZm9ybWF0UGlja2xpc3QoJ1R5cGUnKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTdWJUeXBlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1N1YlR5cGUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnN1YlR5cGVUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmb3JtYXQucGlja2xpc3QodGhpcy5hcHAucGlja2xpc3RTZXJ2aWNlLCBudWxsLCBudWxsLCBgQWNjb3VudCAke3RoaXMuZW50cnkuVHlwZX1gKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdJbmR1c3RyeScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdJbmR1c3RyeScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuaW5kdXN0cnlUZXh0LFxyXG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgICByZW5kZXJlcjogdGhpcy5mb3JtYXRQaWNrbGlzdCgnSW5kdXN0cnknKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdCdXNpbmVzc0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0J1c2luZXNzRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmJ1c2luZXNzRGVzY3JpcHRpb25UZXh0LFxyXG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdMZWFkU291cmNlLkRlc2NyaXB0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0xlYWRTb3VyY2UuRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmltcG9ydFNvdXJjZVRleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnT3duZXIuT3duZXJEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdPd25lci5Pd25lckRlc2NyaXB0aW9uJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5vd25lclRleHQsXHJcbiAgICAgIH1dLFxyXG4gICAgfSwge1xyXG4gICAgICB0aXRsZTogdGhpcy5yZWxhdGVkSXRlbXNUZXh0LFxyXG4gICAgICBsaXN0OiB0cnVlLFxyXG4gICAgICBuYW1lOiAnUmVsYXRlZEl0ZW1zU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIG5hbWU6ICdBY3Rpdml0eVJlbGF0ZWQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnJlbGF0ZWRBY3Rpdml0aWVzVGV4dCxcclxuICAgICAgICB3aGVyZTogdGhpcy5mb3JtYXRSZWxhdGVkUXVlcnkuYmluZERlbGVnYXRlKHRoaXMsICdBY2NvdW50SWQgZXEgXCIkezB9XCInKSxcclxuICAgICAgICB2aWV3OiAnYWN0aXZpdHlfcmVsYXRlZCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQ29udGFjdFJlbGF0ZWQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnJlbGF0ZWRDb250YWN0c1RleHQsXHJcbiAgICAgICAgd2hlcmU6IHRoaXMuZm9ybWF0UmVsYXRlZFF1ZXJ5LmJpbmREZWxlZ2F0ZSh0aGlzLCAnQWNjb3VudC5pZCBlcSBcIiR7MH1cIicpLFxyXG4gICAgICAgIHZpZXc6ICdjb250YWN0X3JlbGF0ZWQnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ09wcG9ydHVuaXR5UmVsYXRlZCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucmVsYXRlZE9wcG9ydHVuaXRpZXNUZXh0LFxyXG4gICAgICAgIHdoZXJlOiB0aGlzLmZvcm1hdFJlbGF0ZWRRdWVyeS5iaW5kRGVsZWdhdGUodGhpcywgJ0FjY291bnQuaWQgZXEgXCIkezB9XCInKSxcclxuICAgICAgICB2aWV3OiAnb3Bwb3J0dW5pdHlfcmVsYXRlZCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnVGlja2V0UmVsYXRlZCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucmVsYXRlZFRpY2tldHNUZXh0LFxyXG4gICAgICAgIHdoZXJlOiB0aGlzLmZvcm1hdFJlbGF0ZWRRdWVyeS5iaW5kRGVsZWdhdGUodGhpcywgJ0FjY291bnQuaWQgZXEgXCIkezB9XCInKSxcclxuICAgICAgICB2aWV3OiAndGlja2V0X3JlbGF0ZWQnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0hpc3RvcnlSZWxhdGVkJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5yZWxhdGVkSGlzdG9yaWVzVGV4dCxcclxuICAgICAgICB3aGVyZTogdGhpcy5mb3JtYXRSZWxhdGVkUXVlcnkuYmluZERlbGVnYXRlKHRoaXMsICdBY2NvdW50SWQgZXEgXCIkezB9XCIgYW5kIFR5cGUgbmUgXCJhdERhdGFiYXNlQ2hhbmdlXCInKSxcclxuICAgICAgICB2aWV3OiAnaGlzdG9yeV9yZWxhdGVkJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdBZGRyZXNzZXNSZWxhdGVkJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5yZWxhdGVkQWRkcmVzc2VzVGV4dCxcclxuICAgICAgICB3aGVyZTogdGhpcy5mb3JtYXRSZWxhdGVkUXVlcnkuYmluZERlbGVnYXRlKHRoaXMsICdFbnRpdHlJZCBlcSBcIiR7MH1cIicsICdBZGRyZXNzLkVudGl0eUlkJyksXHJcbiAgICAgICAgdmlldzogJ2FkZHJlc3NfcmVsYXRlZCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQXR0YWNobWVudFJlbGF0ZWQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnJlbGF0ZWRBdHRhY2htZW50VGV4dCxcclxuICAgICAgICB3aGVyZTogdGhpcy5mb3JtYXRSZWxhdGVkUXVlcnkuYmluZERlbGVnYXRlKHRoaXMsICdhY2NvdW50SWQgZXEgXCIkezB9XCInKSwgLy8gbXVzdCBiZSBsb3dlciBjYXNlIGJlY2F1c2Ugb2YgZmVlZFxyXG4gICAgICAgIHZpZXc6ICdhY2NvdW50X2F0dGFjaG1lbnRfcmVsYXRlZCcsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMucmVsYXRlZEF0dGFjaG1lbnRUaXRsZVRleHQsXHJcbiAgICAgIH1dLFxyXG4gICAgfV0pO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19