define('crm/Views/History/Detail', ['module', 'exports', 'dojo/_base/declare', '../../Format', '../../Template', 'argos/Detail', 'argos/I18n', '../../Models/Names'], function (module, exports, _declare, _Format, _Template, _Detail, _I18n, _Names) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Format2 = _interopRequireDefault(_Format);

  var _Template2 = _interopRequireDefault(_Template);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _Names2 = _interopRequireDefault(_Names);

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

  var resource = (0, _I18n2.default)('historyDetail');
  var dtFormatResource = (0, _I18n2.default)('historyDetailDateTimeFormat');

  /**
   * @class crm.Views.History.Detail
   *
   * @extends argos.Detail
   *
   *
   * @requires crm.Format
   * @requires crm.Template
   */
  var __class = (0, _declare2.default)('crm.Views.History.Detail', [_Detail2.default], {
    // Templates
    createUserTemplate: _Template2.default.nameLF,

    // Localization
    categoryText: resource.categoryText,
    completedText: resource.completedText,
    durationText: resource.durationText,
    leaderText: resource.leaderText,
    longNotesText: resource.longNotesText,
    notesText: resource.notesText,
    priorityText: resource.priorityText,
    regardingText: resource.regardingText,
    completedByText: resource.completedByText,
    scheduledText: resource.scheduledText,
    timelessText: resource.timelessText,
    companyText: resource.companyText,
    leadText: resource.leadText,
    titleText: resource.titleText,
    accountText: resource.accountText,
    contactText: resource.contactText,
    opportunityText: resource.opportunityText,
    ticketNumberText: resource.ticketNumberText,
    relatedItemsText: resource.relatedItemsText,
    relatedAttachmentText: resource.relatedAttachmentText,
    relatedAttachmentTitleText: resource.relatedAttachmentTitleText,
    modifiedText: resource.modifiedText,
    typeText: resource.typeText,
    entityText: resource.entityText,
    activityTypeText: {
      atToDo: resource.toDo,
      atPhoneCall: resource.phoneCall,
      atAppointment: resource.meeting,
      atLiterature: resource.literature,
      atPersonal: resource.personal,
      atQuestion: resource.question,
      atEMail: resource.email
    },
    // View Properties
    id: 'history_detail',
    existsRE: /^[\w]{12}$/,
    editView: 'history_edit',
    dateFormatText: dtFormatResource.dateFormatText,
    dateFormatText24: dtFormatResource.dateFormatText24,
    resourceKind: 'history',
    modelName: _Names2.default.HISTORY,
    security: null, // 'Entities/History/View',

    formatActivityType: function formatActivityType(val) {
      return this.activityTypeText[val] || val;
    },
    isHistoryForLead: function isHistoryForLead(entry) {
      return this.existsRE.test(entry && entry.LeadId);
    },
    isHistoryForActivity: function isHistoryForActivity(entry) {
      return this.existsRE.test(entry && entry.ActivityId);
    },
    isHistoryOfType: function isHistoryOfType(entry, type) {
      return entry && entry.Type === type;
    },
    provideText: function provideText(entry) {
      return entry && (entry.LongNotes || entry.Notes);
    },
    formatPicklist: function formatPicklist(property) {
      return _Format2.default.picklist(this.app.picklistService, this._model, property);
    },
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        title: this.notesText,
        name: 'NotesSection',
        children: [{
          name: 'LongNotes',
          property: 'LongNotes',
          encode: false,
          label: this.longNotesText,
          provider: this.provideText.bindDelegate(this),
          use: _Template2.default.noteDetailProperty
        }]
      }, {
        title: this.detailsText,
        name: 'DetailsSection',
        children: [{
          name: 'StartDate',
          property: 'StartDate',
          label: this.scheduledText,
          renderer: _Format2.default.date.bindDelegate(this, App.is24HourClock() ? this.dateFormatText24 : this.dateFormatText),
          exclude: this.isHistoryOfType.bindDelegate(this, 'atNote')
        }, {
          name: 'CompletedDate',
          property: 'CompletedDate',
          label: this.completedText,
          renderer: _Format2.default.date.bindDelegate(this, App.is24HourClock() ? this.dateFormatText24 : this.dateFormatText),
          exclude: this.isHistoryOfType.bindDelegate(this, 'atNote')
        }, {
          name: 'ModifyDate',
          property: 'ModifyDate',
          label: this.modifiedText,
          renderer: _Format2.default.date.bindDelegate(this, App.is24HourClock() ? this.dateFormatText24 : this.dateFormatText),
          include: this.isHistoryOfType.bindDelegate(this, 'atNote')
        }, {
          name: 'Description',
          property: 'Description',
          label: this.regardingText,
          renderer: this.formatPicklist('Description')
        }, {
          name: 'CompletedUser',
          property: 'CompletedUser.UserInfo',
          label: this.completedByText,
          template: _Template2.default.nameLF
        }, {
          name: 'AccountName',
          property: 'AccountName',
          exclude: this.isHistoryForLead.bind(this),
          label: this.accountText,
          view: 'account_detail',
          key: 'AccountId',
          descriptor: 'AccountName'
        }, {
          name: 'ContactName',
          property: 'ContactName',
          exclude: this.isHistoryForLead.bind(this),
          label: this.contactText,
          view: 'contact_detail',
          key: 'ContactId',
          descriptor: 'ContactName'
        }, {
          name: 'OpportunityName',
          property: 'OpportunityName',
          exclude: this.isHistoryForLead.bind(this),
          label: this.opportunityText,
          view: 'opportunity_detail',
          key: 'OpportunityId',
          descriptor: 'OpportunityName'
        }, {
          name: 'TicketNumber',
          property: 'TicketNumber',
          exclude: this.isHistoryForLead.bind(this),
          label: this.ticketNumberText,
          view: 'ticket_detail',
          key: 'TicketId',
          descriptor: 'TicketNumber'
        }, {
          name: 'LeadName',
          property: 'LeadName',
          include: this.isHistoryForLead.bind(this),
          label: this.leadText,
          view: 'lead_detail',
          key: 'LeadId',
          descriptor: 'LeadName'
        }, {
          name: 'AccountName',
          property: 'AccountName',
          include: this.isHistoryForLead.bind(this),
          label: this.companyText
        }]
      }, {
        title: this.relatedItemsText,
        list: true,
        name: 'RelatedItemsSection',
        children: [{
          name: 'AttachmentRelated',
          label: this.relatedAttachmentText,
          where: this.formatRelatedQuery.bindDelegate(this, 'historyId eq "${0}"'), // must be lower case because of feed
          view: 'history_attachment_related',
          title: this.relatedAttachmentTitleText
        }]
      }]);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9IaXN0b3J5L0RldGFpbC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsImR0Rm9ybWF0UmVzb3VyY2UiLCJfX2NsYXNzIiwiY3JlYXRlVXNlclRlbXBsYXRlIiwibmFtZUxGIiwiY2F0ZWdvcnlUZXh0IiwiY29tcGxldGVkVGV4dCIsImR1cmF0aW9uVGV4dCIsImxlYWRlclRleHQiLCJsb25nTm90ZXNUZXh0Iiwibm90ZXNUZXh0IiwicHJpb3JpdHlUZXh0IiwicmVnYXJkaW5nVGV4dCIsImNvbXBsZXRlZEJ5VGV4dCIsInNjaGVkdWxlZFRleHQiLCJ0aW1lbGVzc1RleHQiLCJjb21wYW55VGV4dCIsImxlYWRUZXh0IiwidGl0bGVUZXh0IiwiYWNjb3VudFRleHQiLCJjb250YWN0VGV4dCIsIm9wcG9ydHVuaXR5VGV4dCIsInRpY2tldE51bWJlclRleHQiLCJyZWxhdGVkSXRlbXNUZXh0IiwicmVsYXRlZEF0dGFjaG1lbnRUZXh0IiwicmVsYXRlZEF0dGFjaG1lbnRUaXRsZVRleHQiLCJtb2RpZmllZFRleHQiLCJ0eXBlVGV4dCIsImVudGl0eVRleHQiLCJhY3Rpdml0eVR5cGVUZXh0IiwiYXRUb0RvIiwidG9EbyIsImF0UGhvbmVDYWxsIiwicGhvbmVDYWxsIiwiYXRBcHBvaW50bWVudCIsIm1lZXRpbmciLCJhdExpdGVyYXR1cmUiLCJsaXRlcmF0dXJlIiwiYXRQZXJzb25hbCIsInBlcnNvbmFsIiwiYXRRdWVzdGlvbiIsInF1ZXN0aW9uIiwiYXRFTWFpbCIsImVtYWlsIiwiaWQiLCJleGlzdHNSRSIsImVkaXRWaWV3IiwiZGF0ZUZvcm1hdFRleHQiLCJkYXRlRm9ybWF0VGV4dDI0IiwicmVzb3VyY2VLaW5kIiwibW9kZWxOYW1lIiwiSElTVE9SWSIsInNlY3VyaXR5IiwiZm9ybWF0QWN0aXZpdHlUeXBlIiwidmFsIiwiaXNIaXN0b3J5Rm9yTGVhZCIsImVudHJ5IiwidGVzdCIsIkxlYWRJZCIsImlzSGlzdG9yeUZvckFjdGl2aXR5IiwiQWN0aXZpdHlJZCIsImlzSGlzdG9yeU9mVHlwZSIsInR5cGUiLCJUeXBlIiwicHJvdmlkZVRleHQiLCJMb25nTm90ZXMiLCJOb3RlcyIsImZvcm1hdFBpY2tsaXN0IiwicHJvcGVydHkiLCJwaWNrbGlzdCIsImFwcCIsInBpY2tsaXN0U2VydmljZSIsIl9tb2RlbCIsImNyZWF0ZUxheW91dCIsImxheW91dCIsInRpdGxlIiwibmFtZSIsImNoaWxkcmVuIiwiZW5jb2RlIiwibGFiZWwiLCJwcm92aWRlciIsImJpbmREZWxlZ2F0ZSIsInVzZSIsIm5vdGVEZXRhaWxQcm9wZXJ0eSIsImRldGFpbHNUZXh0IiwicmVuZGVyZXIiLCJkYXRlIiwiQXBwIiwiaXMyNEhvdXJDbG9jayIsImV4Y2x1ZGUiLCJpbmNsdWRlIiwidGVtcGxhdGUiLCJiaW5kIiwidmlldyIsImtleSIsImRlc2NyaXB0b3IiLCJsaXN0Iiwid2hlcmUiLCJmb3JtYXRSZWxhdGVkUXVlcnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxNQUFNQSxXQUFXLG9CQUFZLGVBQVosQ0FBakI7QUFDQSxNQUFNQyxtQkFBbUIsb0JBQVksNkJBQVosQ0FBekI7O0FBRUE7Ozs7Ozs7OztBQVNBLE1BQU1DLFVBQVUsdUJBQVEsMEJBQVIsRUFBb0Msa0JBQXBDLEVBQThDO0FBQzVEO0FBQ0FDLHdCQUFvQixtQkFBU0MsTUFGK0I7O0FBSTVEO0FBQ0FDLGtCQUFjTCxTQUFTSyxZQUxxQztBQU01REMsbUJBQWVOLFNBQVNNLGFBTm9DO0FBTzVEQyxrQkFBY1AsU0FBU08sWUFQcUM7QUFRNURDLGdCQUFZUixTQUFTUSxVQVJ1QztBQVM1REMsbUJBQWVULFNBQVNTLGFBVG9DO0FBVTVEQyxlQUFXVixTQUFTVSxTQVZ3QztBQVc1REMsa0JBQWNYLFNBQVNXLFlBWHFDO0FBWTVEQyxtQkFBZVosU0FBU1ksYUFab0M7QUFhNURDLHFCQUFpQmIsU0FBU2EsZUFia0M7QUFjNURDLG1C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QUFPREMsc0JBQVk7QUFQWCxTQXBETyxFQTREUDtBQUNEbkIsZ0JBQU0sVUFETDtBQUVEUixvQkFBVSxVQUZUO0FBR0RzQixtQkFBUyxLQUFLbkMsZ0JBQUwsQ0FBc0JxQyxJQUF0QixDQUEyQixJQUEzQixDQUhSO0FBSURiLGlCQUFPLEtBQUs5RCxRQUpYO0FBS0Q0RSxnQkFBTSxhQUxMO0FBTURDLGVBQUssUUFOSjtBQU9EQyxzQkFBWTtBQVBYLFNBNURPLEVBb0VQO0FBQ0RuQixnQkFBTSxhQURMO0FBRURSLG9CQUFVLGFBRlQ7QUFHRHNCLG1CQUFTLEtBQUtuQyxnQkFBTCxDQUFzQnFDLElBQXRCLENBQTJCLElBQTNCLENBSFI7QUFJRGIsaUJBQU8sS0FBSy9EO0FBSlgsU0FwRU87QUFIVCxPQVhrQyxFQXdGbEM7QUFDRDJELGVBQU8sS0FBS3BELGdCQURYO0FBRUR5RSxjQUFNLElBRkw7QUFHRHBCLGNBQU0scUJBSEw7QUFJREMsa0JBQVUsQ0FBQztBQUNURCxnQkFBTSxtQkFERztBQUVURyxpQkFBTyxLQUFLdkQscUJBRkg7QUFHVHlFLGlCQUFPLEtBQUtDLGtCQUFMLENBQXdCakIsWUFBeEIsQ0FBcUMsSUFBckMsRUFBMkMscUJBQTNDLENBSEUsRUFHaUU7QUFDMUVZLGdCQUFNLDRCQUpHO0FBS1RsQixpQkFBTyxLQUFLbEQ7QUFMSCxTQUFEO0FBSlQsT0F4RmtDLENBQTlCLENBQVA7QUFvR0Q7QUF2SzJELEdBQTlDLENBQWhCOztvQkEwS2V2QixPIiwiZmlsZSI6IkRldGFpbC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnLi4vLi4vRm9ybWF0JztcclxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4uLy4uL1RlbXBsYXRlJztcclxuaW1wb3J0IERldGFpbCBmcm9tICdhcmdvcy9EZXRhaWwnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi8uLi9Nb2RlbHMvTmFtZXMnO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnaGlzdG9yeURldGFpbCcpO1xyXG5jb25zdCBkdEZvcm1hdFJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2hpc3RvcnlEZXRhaWxEYXRlVGltZUZvcm1hdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuSGlzdG9yeS5EZXRhaWxcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuRGV0YWlsXHJcbiAqXHJcbiAqXHJcbiAqIEByZXF1aXJlcyBjcm0uRm9ybWF0XHJcbiAqIEByZXF1aXJlcyBjcm0uVGVtcGxhdGVcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuSGlzdG9yeS5EZXRhaWwnLCBbRGV0YWlsXSwge1xyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIGNyZWF0ZVVzZXJUZW1wbGF0ZTogdGVtcGxhdGUubmFtZUxGLFxyXG5cclxuICAvLyBMb2NhbGl6YXRpb25cclxuICBjYXRlZ29yeVRleHQ6IHJlc291cmNlLmNhdGVnb3J5VGV4dCxcclxuICBjb21wbGV0ZWRUZXh0OiByZXNvdXJjZS5jb21wbGV0ZWRUZXh0LFxyXG4gIGR1cmF0aW9uVGV4dDogcmVzb3VyY2UuZHVyYXRpb25UZXh0LFxyXG4gIGxlYWRlclRleHQ6IHJlc291cmNlLmxlYWRlclRleHQsXHJcbiAgbG9uZ05vdGVzVGV4dDogcmVzb3VyY2UubG9uZ05vdGVzVGV4dCxcclxuICBub3Rlc1RleHQ6IHJlc291cmNlLm5vdGVzVGV4dCxcclxuICBwcmlvcml0eVRleHQ6IHJlc291cmNlLnByaW9yaXR5VGV4dCxcclxuICByZWdhcmRpbmdUZXh0OiByZXNvdXJjZS5yZWdhcmRpbmdUZXh0LFxyXG4gIGNvbXBsZXRlZEJ5VGV4dDogcmVzb3VyY2UuY29tcGxldGVkQnlUZXh0LFxyXG4gIHNjaGVkdWxlZFRleHQ6IHJlc291cmNlLnNjaGVkdWxlZFRleHQsXHJcbiAgdGltZWxlc3NUZXh0OiByZXNvdXJjZS50aW1lbGVzc1RleHQsXHJcbiAgY29tcGFueVRleHQ6IHJlc291cmNlLmNvbXBhbnlUZXh0LFxyXG4gIGxlYWRUZXh0OiByZXNvdXJjZS5sZWFkVGV4dCxcclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBhY2NvdW50VGV4dDogcmVzb3VyY2UuYWNjb3VudFRleHQsXHJcbiAgY29udGFjdFRleHQ6IHJlc291cmNlLmNvbnRhY3RUZXh0LFxyXG4gIG9wcG9ydHVuaXR5VGV4dDogcmVzb3VyY2Uub3Bwb3J0dW5pdHlUZXh0LFxyXG4gIHRpY2tldE51bWJlclRleHQ6IHJlc291cmNlLnRpY2tldE51bWJlclRleHQsXHJcbiAgcmVsYXRlZEl0ZW1zVGV4dDogcmVzb3VyY2UucmVsYXRlZEl0ZW1zVGV4dCxcclxuICByZWxhdGVkQXR0YWNobWVudFRleHQ6IHJlc291cmNlLnJlbGF0ZWRBdHRhY2htZW50VGV4dCxcclxuICByZWxhdGVkQXR0YWNobWVudFRpdGxlVGV4dDogcmVzb3VyY2UucmVsYXRlZEF0dGFjaG1lbnRUaXRsZVRleHQsXHJcbiAgbW9kaWZpZWRUZXh0OiByZXNvdXJjZS5tb2RpZmllZFRleHQsXHJcbiAgdHlwZVRleHQ6IHJlc291cmNlLnR5cGVUZXh0LFxyXG4gIGVudGl0eVRleHQ6IHJlc291cmNlLmVudGl0eVRleHQsXHJcbiAgYWN0aXZpdHlUeXBlVGV4dDoge1xyXG4gICAgYXRUb0RvOiByZXNvdXJjZS50b0RvLFxyXG4gICAgYXRQaG9uZUNhbGw6IHJlc291cmNlLnBob25lQ2FsbCxcclxuICAgIGF0QXBwb2ludG1lbnQ6IHJlc291cmNlLm1lZXRpbmcsXHJcbiAgICBhdExpdGVyYXR1cmU6IHJlc291cmNlLmxpdGVyYXR1cmUsXHJcbiAgICBhdFBlcnNvbmFsOiByZXNvdXJjZS5wZXJzb25hbCxcclxuICAgIGF0UXVlc3Rpb246IHJlc291cmNlLnF1ZXN0aW9uLFxyXG4gICAgYXRFTWFpbDogcmVzb3VyY2UuZW1haWwsXHJcbiAgfSxcclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ2hpc3RvcnlfZGV0YWlsJyxcclxuICBleGlzdHNSRTogL15bXFx3XXsxMn0kLyxcclxuICBlZGl0VmlldzogJ2hpc3RvcnlfZWRpdCcsXHJcbiAgZGF0ZUZvcm1hdFRleHQ6IGR0Rm9ybWF0UmVzb3VyY2UuZGF0ZUZvcm1hdFRleHQsXHJcbiAgZGF0ZUZvcm1hdFRleHQyNDogZHRGb3JtYXRSZXNvdXJjZS5kYXRlRm9ybWF0VGV4dDI0LFxyXG4gIHJlc291cmNlS2luZDogJ2hpc3RvcnknLFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuSElTVE9SWSxcclxuICBzZWN1cml0eTogbnVsbCwgLy8gJ0VudGl0aWVzL0hpc3RvcnkvVmlldycsXHJcblxyXG4gIGZvcm1hdEFjdGl2aXR5VHlwZTogZnVuY3Rpb24gZm9ybWF0QWN0aXZpdHlUeXBlKHZhbCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYWN0aXZpdHlUeXBlVGV4dFt2YWxdIHx8IHZhbDtcclxuICB9LFxyXG4gIGlzSGlzdG9yeUZvckxlYWQ6IGZ1bmN0aW9uIGlzSGlzdG9yeUZvckxlYWQoZW50cnkpIHtcclxuICAgIHJldHVybiB0aGlzLmV4aXN0c1JFLnRlc3QoZW50cnkgJiYgZW50cnkuTGVhZElkKTtcclxuICB9LFxyXG4gIGlzSGlzdG9yeUZvckFjdGl2aXR5OiBmdW5jdGlvbiBpc0hpc3RvcnlGb3JBY3Rpdml0eShlbnRyeSkge1xyXG4gICAgcmV0dXJuIHRoaXMuZXhpc3RzUkUudGVzdChlbnRyeSAmJiBlbnRyeS5BY3Rpdml0eUlkKTtcclxuICB9LFxyXG4gIGlzSGlzdG9yeU9mVHlwZTogZnVuY3Rpb24gaXNIaXN0b3J5T2ZUeXBlKGVudHJ5LCB0eXBlKSB7XHJcbiAgICByZXR1cm4gZW50cnkgJiYgKGVudHJ5LlR5cGUgPT09IHR5cGUpO1xyXG4gIH0sXHJcbiAgcHJvdmlkZVRleHQ6IGZ1bmN0aW9uIHByb3ZpZGVUZXh0KGVudHJ5KSB7XHJcbiAgICByZXR1cm4gZW50cnkgJiYgKGVudHJ5LkxvbmdOb3RlcyB8fCBlbnRyeS5Ob3Rlcyk7XHJcbiAgfSxcclxuICBmb3JtYXRQaWNrbGlzdDogZnVuY3Rpb24gZm9ybWF0UGlja2xpc3QocHJvcGVydHkpIHtcclxuICAgIHJldHVybiBmb3JtYXQucGlja2xpc3QodGhpcy5hcHAucGlja2xpc3RTZXJ2aWNlLCB0aGlzLl9tb2RlbCwgcHJvcGVydHkpO1xyXG4gIH0sXHJcbiAgY3JlYXRlTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXlvdXQgfHwgKHRoaXMubGF5b3V0ID0gW3tcclxuICAgICAgdGl0bGU6IHRoaXMubm90ZXNUZXh0LFxyXG4gICAgICBuYW1lOiAnTm90ZXNTZWN0aW9uJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbmFtZTogJ0xvbmdOb3RlcycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdMb25nTm90ZXMnLFxyXG4gICAgICAgIGVuY29kZTogZmFsc2UsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMubG9uZ05vdGVzVGV4dCxcclxuICAgICAgICBwcm92aWRlcjogdGhpcy5wcm92aWRlVGV4dC5iaW5kRGVsZWdhdGUodGhpcyksXHJcbiAgICAgICAgdXNlOiB0ZW1wbGF0ZS5ub3RlRGV0YWlsUHJvcGVydHksXHJcbiAgICAgIH1dLFxyXG4gICAgfSwge1xyXG4gICAgICB0aXRsZTogdGhpcy5kZXRhaWxzVGV4dCxcclxuICAgICAgbmFtZTogJ0RldGFpbHNTZWN0aW9uJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbmFtZTogJ1N0YXJ0RGF0ZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdTdGFydERhdGUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnNjaGVkdWxlZFRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZvcm1hdC5kYXRlLmJpbmREZWxlZ2F0ZSh0aGlzLCAoQXBwLmlzMjRIb3VyQ2xvY2soKSkgPyB0aGlzLmRhdGVGb3JtYXRUZXh0MjQgOiB0aGlzLmRhdGVGb3JtYXRUZXh0KSxcclxuICAgICAgICBleGNsdWRlOiB0aGlzLmlzSGlzdG9yeU9mVHlwZS5iaW5kRGVsZWdhdGUodGhpcywgJ2F0Tm90ZScpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0NvbXBsZXRlZERhdGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ29tcGxldGVkRGF0ZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuY29tcGxldGVkVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZm9ybWF0LmRhdGUuYmluZERlbGVnYXRlKHRoaXMsIChBcHAuaXMyNEhvdXJDbG9jaygpKSA/IHRoaXMuZGF0ZUZvcm1hdFRleHQyNCA6IHRoaXMuZGF0ZUZvcm1hdFRleHQpLFxyXG4gICAgICAgIGV4Y2x1ZGU6IHRoaXMuaXNIaXN0b3J5T2ZUeXBlLmJpbmREZWxlZ2F0ZSh0aGlzLCAnYXROb3RlJyksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnTW9kaWZ5RGF0ZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdNb2RpZnlEYXRlJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5tb2RpZmllZFRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZvcm1hdC5kYXRlLmJpbmREZWxlZ2F0ZSh0aGlzLCAoQXBwLmlzMjRIb3VyQ2xvY2soKSkgPyB0aGlzLmRhdGVGb3JtYXRUZXh0MjQgOiB0aGlzLmRhdGVGb3JtYXRUZXh0KSxcclxuICAgICAgICBpbmNsdWRlOiB0aGlzLmlzSGlzdG9yeU9mVHlwZS5iaW5kRGVsZWdhdGUodGhpcywgJ2F0Tm90ZScpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5yZWdhcmRpbmdUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiB0aGlzLmZvcm1hdFBpY2tsaXN0KCdEZXNjcmlwdGlvbicpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0NvbXBsZXRlZFVzZXInLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ29tcGxldGVkVXNlci5Vc2VySW5mbycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuY29tcGxldGVkQnlUZXh0LFxyXG4gICAgICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZS5uYW1lTEYsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQWNjb3VudE5hbWUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQWNjb3VudE5hbWUnLFxyXG4gICAgICAgIGV4Y2x1ZGU6IHRoaXMuaXNIaXN0b3J5Rm9yTGVhZC5iaW5kKHRoaXMpLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFjY291bnRUZXh0LFxyXG4gICAgICAgIHZpZXc6ICdhY2NvdW50X2RldGFpbCcsXHJcbiAgICAgICAga2V5OiAnQWNjb3VudElkJyxcclxuICAgICAgICBkZXNjcmlwdG9yOiAnQWNjb3VudE5hbWUnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0NvbnRhY3ROYW1lJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0NvbnRhY3ROYW1lJyxcclxuICAgICAgICBleGNsdWRlOiB0aGlzLmlzSGlzdG9yeUZvckxlYWQuYmluZCh0aGlzKSxcclxuICAgICAgICBsYWJlbDogdGhpcy5jb250YWN0VGV4dCxcclxuICAgICAgICB2aWV3OiAnY29udGFjdF9kZXRhaWwnLFxyXG4gICAgICAgIGtleTogJ0NvbnRhY3RJZCcsXHJcbiAgICAgICAgZGVzY3JpcHRvcjogJ0NvbnRhY3ROYW1lJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdPcHBvcnR1bml0eU5hbWUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnT3Bwb3J0dW5pdHlOYW1lJyxcclxuICAgICAgICBleGNsdWRlOiB0aGlzLmlzSGlzdG9yeUZvckxlYWQuYmluZCh0aGlzKSxcclxuICAgICAgICBsYWJlbDogdGhpcy5vcHBvcnR1bml0eVRleHQsXHJcbiAgICAgICAgdmlldzogJ29wcG9ydHVuaXR5X2RldGFpbCcsXHJcbiAgICAgICAga2V5OiAnT3Bwb3J0dW5pdHlJZCcsXHJcbiAgICAgICAgZGVzY3JpcHRvcjogJ09wcG9ydHVuaXR5TmFtZScsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnVGlja2V0TnVtYmVyJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1RpY2tldE51bWJlcicsXHJcbiAgICAgICAgZXhjbHVkZTogdGhpcy5pc0hpc3RvcnlGb3JMZWFkLmJpbmQodGhpcyksXHJcbiAgICAgICAgbGFiZWw6IHRoaXMudGlja2V0TnVtYmVyVGV4dCxcclxuICAgICAgICB2aWV3OiAndGlja2V0X2RldGFpbCcsXHJcbiAgICAgICAga2V5OiAnVGlja2V0SWQnLFxyXG4gICAgICAgIGRlc2NyaXB0b3I6ICdUaWNrZXROdW1iZXInLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0xlYWROYW1lJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0xlYWROYW1lJyxcclxuICAgICAgICBpbmNsdWRlOiB0aGlzLmlzSGlzdG9yeUZvckxlYWQuYmluZCh0aGlzKSxcclxuICAgICAgICBsYWJlbDogdGhpcy5sZWFkVGV4dCxcclxuICAgICAgICB2aWV3OiAnbGVhZF9kZXRhaWwnLFxyXG4gICAgICAgIGtleTogJ0xlYWRJZCcsXHJcbiAgICAgICAgZGVzY3JpcHRvcjogJ0xlYWROYW1lJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdBY2NvdW50TmFtZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdBY2NvdW50TmFtZScsXHJcbiAgICAgICAgaW5jbHVkZTogdGhpcy5pc0hpc3RvcnlGb3JMZWFkLmJpbmQodGhpcyksXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuY29tcGFueVRleHQsXHJcbiAgICAgIH1dLFxyXG4gICAgfSwge1xyXG4gICAgICB0aXRsZTogdGhpcy5yZWxhdGVkSXRlbXNUZXh0LFxyXG4gICAgICBsaXN0OiB0cnVlLFxyXG4gICAgICBuYW1lOiAnUmVsYXRlZEl0ZW1zU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIG5hbWU6ICdBdHRhY2htZW50UmVsYXRlZCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucmVsYXRlZEF0dGFjaG1lbnRUZXh0LFxyXG4gICAgICAgIHdoZXJlOiB0aGlzLmZvcm1hdFJlbGF0ZWRRdWVyeS5iaW5kRGVsZWdhdGUodGhpcywgJ2hpc3RvcnlJZCBlcSBcIiR7MH1cIicpLCAvLyBtdXN0IGJlIGxvd2VyIGNhc2UgYmVjYXVzZSBvZiBmZWVkXHJcbiAgICAgICAgdmlldzogJ2hpc3RvcnlfYXR0YWNobWVudF9yZWxhdGVkJyxcclxuICAgICAgICB0aXRsZTogdGhpcy5yZWxhdGVkQXR0YWNobWVudFRpdGxlVGV4dCxcclxuICAgICAgfV0sXHJcbiAgICB9XSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=