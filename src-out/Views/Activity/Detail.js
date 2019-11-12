define('crm/Views/Activity/Detail', ['module', 'exports', 'dojo/_base/declare', 'dojo/string', 'argos/Utility', 'argos/Convert', 'argos/Detail', 'argos/I18n', 'dojo/Deferred', '../../Template', '../../Format', '../../Environment', '../../Recurrence', '../../Utility', '../../Models/Names', '../../Models/Activity/ActivityTypePicklists'], function (module, exports, _declare, _string, _Utility, _Convert, _Detail, _I18n, _Deferred, _Template, _Format, _Environment, _Recurrence, _Utility3, _Names, _ActivityTypePicklists) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _string2 = _interopRequireDefault(_string);

  var _Utility2 = _interopRequireDefault(_Utility);

  var _Convert2 = _interopRequireDefault(_Convert);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _Deferred2 = _interopRequireDefault(_Deferred);

  var _Template2 = _interopRequireDefault(_Template);

  var _Format2 = _interopRequireDefault(_Format);

  var _Environment2 = _interopRequireDefault(_Environment);

  var _Recurrence2 = _interopRequireDefault(_Recurrence);

  var _Utility4 = _interopRequireDefault(_Utility3);

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

  var resource = (0, _I18n2.default)('activityDetail');
  var dtFormatResource = (0, _I18n2.default)('activityDetailDateTimeFormat');

  /**
   * @class crm.Views.Activity.Detail
   *
   *
   * @extends argos.Detail
   * @mixins argos.Detail
   *
   * @requires argos.Detail
   * @requires argos.Utility
   * @requires argos.Convert
   * @requires crm.Format
   * @requires crm.Template
   * @requires crm.Environment
   * @requires crm.Recurrence
   * @requires crm.Utility
   *
   */
  var __class = (0, _declare2.default)('crm.Views.Activity.Detail', [_Detail2.default], {
    // Localization
    actionsText: resource.actionsText,
    completeActivityText: resource.completeActivityText,
    completeOccurrenceText: resource.completeOccurrenceText,
    completeSeriesText: resource.completeSeriesText,
    locationText: resource.locationText,
    alarmText: resource.alarmText,
    alarmTimeText: resource.alarmTimeText,
    categoryText: resource.categoryText,
    durationText: resource.durationText,
    leaderText: resource.leaderText,
    longNotesText: resource.longNotesText,
    priorityText: resource.priorityText,
    regardingText: resource.regardingText,
    rolloverText: resource.rolloverText,
    startTimeText: resource.startTimeText,
    allDayText: resource.allDayText,
    timelessText: resource.timelessText,
    titleText: resource.titleText,
    typeText: resource.typeText,
    companyText: resource.companyText,
    leadText: resource.leadText,
    accountText: resource.accountText,
    contactText: resource.contactText,
    opportunityText: resource.opportunityText,
    ticketNumberText: resource.ticketNumberText,
    startDateFormatText: dtFormatResource.startDateFormatText,
    startDateFormatText24: dtFormatResource.startDateFormatText24,
    timelessDateFormatText: dtFormatResource.timelessDateFormatText,
    alarmDateFormatText: dtFormatResource.alarmDateFormatText,
    alarmDateFormatText24: dtFormatResource.alarmDateFormatText24,
    recurrenceText: resource.recurrenceText,
    confirmEditRecurrenceText: resource.confirmEditRecurrenceText,
    relatedAttachmentText: resource.relatedAttachmentText,
    relatedAttachmentTitleText: resource.relatedAttachmentTitleText,
    relatedItemsText: resource.relatedItemsText,
    phoneText: resource.phoneText,
    entityText: resource.entityText,
    activityTypeText: {
      atToDo: resource.toDoText,
      atPhoneCall: resource.phoneCallText,
      atAppointment: resource.meetingText,
      atLiterature: resource.literatureText,
      atPersonal: resource.personalText
    },

    // View Properties
    id: 'activity_detail',
    completeView: 'activity_complete',
    editView: 'activity_edit',
    security: null, // 'Entities/Activity/View',
    enableOffline: true,
    resourceKind: 'activities',
    modelName: _Names2.default.ACTIVITY,
    recurringActivityIdSeparator: ';',

    formatActivityType: function formatActivityType(val) {
      return this.activityTypeText[val] || val;
    },
    navigateToEditView: function navigateToEditView() {
      var _this = this;

      if (!this.isActivityRecurringSeries(this.entry)) {
        // normal activity
        this.onEditActivity(this.entry);
      } else {
        if (confirm(this.confirmEditRecurrenceText)) {
          // eslint-disable-line
          // edit series
          this.entry.recurrence.Leader = this.entry.Leader;
          this.onEditActivity(this.entry.recurrence);
        } else {
          // complete the occrence
          if (this.entry.RecurrenceState === 'rstOccurrence') {
            this.onEditActivity(this.entry);
          } else {
            // we need to resolve occurance
            this.getOccurance(this.entry).then(function (occurance) {
              if (occurance) {
                if (_this.entry.Leader) {
                  occurance.Leader = _this.entry.Leader;
                }
                _this.onEditActivity(occurance);
              }
            });
          }
        }
      }
    },
    getOccurance: function getOccurance(entry) {
      var def = new _Deferred2.default();
      var key = entry.$key;
      // Check to ensure we have a composite key (meaning we have the occurance, not the master)
      if (this.isActivityRecurring(entry) && key.split(this.recurringActivityIdSeparator).length !== 2) {
        // Fetch the occurance, and continue on to the complete screen
        var request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService()).setResourceKind('activities').setContractName('system').setQueryArg('where', 'id eq \'' + key + '\'').setCount(1);

        request.read({
          success: function success(feed) {
            if (feed && feed.$resources && feed.$resources.length > 0) {
              def.resolve(feed.$resources[0]);
            }
            def.reject();
          },
          scope: this
        });
      } else {
        def.reject();
      }
      return def.promise;
    },
    onEditActivity: function onEditActivity(entry) {
      var view = App.getView(this.editView);
      if (view) {
        view.show({
          entry: entry
        });
      }
    },
    navigateToCompleteView: function navigateToCompleteView(completionTitle, isSeries) {
      var view = App.getView(this.completeView);

      if (view) {
        _Environment2.default.refreshActivityLists();
        var options = {
          title: completionTitle,
          template: {}
        };

        if (isSeries) {
          this.entry.recurrence.Leader = this.entry.Leader;
          options.entry = this.entry.recurrence;
        } else {
          options.entry = this.entry;
        }

        view.show(options, {
          returnTo: -1
        });
      }
    },
    completeActivity: function completeActivity() {
      this.navigateToCompleteView(this.completeActivityText);
    },
    completeOccurrence: function completeOccurrence() {
      var entry = this.entry;
      var key = entry.$key;

      // Check to ensure we have a composite key (meaning we have the occurance, not the master)
      if (this.isActivityRecurring(entry) && key.split(this.recurringActivityIdSeparator).length !== 2) {
        // Fetch the occurance, and continue on to the complete screen
        var request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService()).setResourceKind('activities').setContractName('system').setQueryArg('where', 'id eq \'' + key + '\'').setCount(1);

        request.read({
          success: this.processOccurance,
          scope: this
        });
      } else {
        this.navigateToCompleteView(this.completeOccurrenceText);
      }
    },
    processOccurance: function processOccurance(feed) {
      if (feed && feed.$resources && feed.$resources.length > 0) {
        if (this.entry.Leader) {
          feed.$resources[0].Leader = this.entry.Leader;
        }
        this.entry = feed.$resources[0];
        this.navigateToCompleteView(this.completeOccurrenceText);
      }
    },
    completeSeries: function completeSeries() {
      this.navigateToCompleteView(this.completeSeriesText, true);
    },
    isActivityRecurring: function isActivityRecurring(entry) {
      return entry && (entry.Recurring || entry.RecurrenceState === 'rstOccurrence');
    },
    isActivityRecurringSeries: function isActivityRecurringSeries(entry) {
      return this.isActivityRecurring(entry) && !_Recurrence2.default.isAfterCompletion(entry.RecurPeriod);
    },
    isActivityForLead: function isActivityForLead(entry) {
      return entry && /^[\w]{12}$/.test(entry.LeadId);
    },
    isActivityTimeless: function isActivityTimeless(entry) {
      return entry && _Convert2.default.toBoolean(entry.Timeless);
    },
    doesActivityHaveReminder: function doesActivityHaveReminder(entry) {
      return _Convert2.default.toBoolean(entry && entry.Alarm);
    },
    checkCanComplete: function checkCanComplete(entry) {
      return !(entry && entry.AllowComplete);
    },
    formatPicklist: function formatPicklist(property) {
      return _Format2.default.picklist(this.app.picklistService, this._model, property);
    },
    formatRelatedQuery: function formatRelatedQuery(entry, fmt, property) {
      var toReturn = void 0;
      if (property === 'activityId') {
        toReturn = _string2.default.substitute(fmt, [_Utility4.default.getRealActivityId(entry.$key)]);
      } else {
        var theProperty = property || '$key';
        toReturn = _string2.default.substitute(fmt, [_Utility2.default.getValue(entry, theProperty, '')]);
      }
      return toReturn;
    },
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        list: true,
        title: this.actionsText,
        cls: 'action-list',
        name: 'QuickActionsSection',
        children: [{
          name: 'CompleteActivityAction',
          property: 'Description',
          label: this.completeActivityText,
          iconClass: 'checkbox',
          action: 'completeActivity',
          disabled: this.checkCanComplete.bind(this),
          exclude: this.isActivityRecurringSeries.bind(this),
          renderer: function renderer(value) {
            // INFORCRM-17347: The property binding for Description is not used.
            // However, if it is null/empty it will cause the action to hide.
            // We will work around this by returning a truthy string.
            if (!value) {
              return ' ';
            }

            return value;
          }
        }, {
          name: 'completeOccurrenceAction',
          property: 'StartDate',
          label: this.completeOccurrenceText,
          iconClass: 'checkbox',
          action: 'completeOccurrence',
          disabled: this.checkCanComplete.bind(this),
          renderer: _Format2.default.date.bindDelegate(this, App.is24HourClock() ? this.startDateFormatText24 : this.startDateFormatText, false),
          include: this.isActivityRecurringSeries.bind(this)
        }, {
          name: 'completeSeriesAction',
          property: 'Description',
          label: this.completeSeriesText,
          iconClass: 'checkbox',
          action: 'completeSeries',
          disabled: this.checkCanComplete.bind(this),
          include: this.isActivityRecurringSeries.bind(this)
        }]
      }, {
        title: this.detailsText,
        name: 'DetailsSection',
        children: [{
          name: 'Description',
          property: 'Description',
          label: this.regardingText,
          renderer: _Format2.default.picklist(this.app.picklistService, null, null, (0, _ActivityTypePicklists.getPicklistByActivityType)(this.entry.Type, 'Description'))
        }, {
          name: 'LongNotes',
          property: 'LongNotes',
          label: this.longNotesText
        }, {
          name: 'ContactName',
          property: 'ContactName',
          exclude: this.isActivityForLead.bind(this),
          label: this.contactText,
          view: 'contact_detail',
          key: 'ContactId',
          descriptor: 'ContactName'
        }, {
          name: 'PhoneNumber',
          property: 'PhoneNumber',
          label: this.phoneText,
          renderer: _Format2.default.phone.bindDelegate(this, true)
        }, {
          name: 'Type',
          property: 'Type',
          label: this.typeText,
          renderer: this.formatActivityType.bindDelegate(this)
        }, {
          name: 'Category',
          property: 'Category',
          label: this.categoryText,
          renderer: _Format2.default.picklist(this.app.picklistService, null, null, (0, _ActivityTypePicklists.getPicklistByActivityType)(this.entry.Type, 'Category'))
        }, {
          name: 'Location',
          property: 'Location',
          label: this.locationText
        }, {
          name: 'Priority',
          property: 'Priority',
          label: this.priorityText,
          renderer: this.formatPicklist('Priority')
        }, {
          name: 'Leader',
          property: 'Leader.UserInfo',
          label: this.leaderText,
          template: _Template2.default.nameLF
        }, {
          name: 'AccountName',
          property: 'AccountName',
          exclude: this.isActivityForLead.bind(this),
          label: this.accountText,
          view: 'account_detail',
          key: 'AccountId',
          descriptor: 'AccountName'
        }, {
          name: 'OpportunityName',
          property: 'OpportunityName',
          exclude: this.isActivityForLead.bind(this),
          label: this.opportunityText,
          view: 'opportunity_detail',
          key: 'OpportunityId',
          descriptor: 'OpportunityName'
        }, {
          name: 'TicketNumber',
          property: 'TicketNumber',
          exclude: this.isActivityForLead.bind(this),
          label: this.ticketNumberText,
          view: 'ticket_detail',
          key: 'TicketId',
          descriptor: 'TicketNumber'
        }, {
          name: 'LeadName',
          property: 'LeadName',
          include: this.isActivityForLead.bind(this),
          label: this.leadText,
          view: 'lead_detail',
          key: 'LeadId',
          descriptor: 'LeadName'
        }, {
          name: 'AccountName',
          property: 'AccountName',
          include: this.isActivityForLead.bind(this),
          label: this.companyText
        }, {
          name: 'StartDate',
          property: 'StartDate',
          label: this.startTimeText,
          renderer: _Format2.default.date.bindDelegate(this, App.is24HourClock() ? this.startDateFormatText24 : this.startDateFormatText, false),
          exclude: this.isActivityTimeless.bind(this)
        }, {
          name: 'StartDateTimeless',
          property: 'StartDate',
          label: this.allDayText,
          renderer: _Format2.default.date.bindDelegate(this, this.timelessDateFormatText, true),
          include: this.isActivityTimeless.bind(this)
        }, {
          name: 'Timeless',
          property: 'Timeless',
          label: this.timelessText,
          type: 'boolean',
          include: false
        }, {
          name: 'Duration',
          property: 'Duration',
          label: this.durationText,
          renderer: _Format2.default.timespan,
          exclude: this.isActivityTimeless.bind(this)
        }, {
          name: 'Alarm',
          property: 'Alarm',
          label: this.alarmText,
          renderer: _Format2.default.yesNo,
          exclude: this.doesActivityHaveReminder.bind(this)
        }, {
          name: 'AlarmTime',
          property: 'AlarmTime',
          label: this.alarmTimeText,
          renderer: _Format2.default.date.bindDelegate(this, App.is24HourClock() ? this.alarmDateFormatText24 : this.alarmDateFormatText, null, true),
          include: this.doesActivityHaveReminder.bind(this)
        }, {
          name: 'Rollover',
          property: 'Rollover',
          label: this.rolloverText,
          include: this.isActivityTimeless.bind(this),
          renderer: _Format2.default.yesNo
        }, {
          name: 'RecurrenceUI',
          property: 'recurrence',
          label: this.recurrenceText,
          include: this.isActivityRecurring.bind(this),
          renderer: function renderRecurrence(value) {
            return _Recurrence2.default.toString(value);
          }
        }]
      }, {
        title: this.relatedItemsText,
        list: true,
        name: 'RelatedItemsSection',
        children: [{
          name: 'AttachmentRelated',
          label: this.relatedAttachmentText,
          where: this.formatRelatedQuery.bindDelegate(this, 'activityId eq "${0}"', 'activityId'), // must be lower case because of feed
          view: 'activity_attachment_related',
          title: this.relatedAttachmentTitleText
        }]
      }]);
    },
    getOfflineIcon: function getOfflineIcon() {
      var model = this.getModel();
      return model.getIconClass(this.entry);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9BY3Rpdml0eS9EZXRhaWwuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJkdEZvcm1hdFJlc291cmNlIiwiX19jbGFzcyIsImFjdGlvbnNUZXh0IiwiY29tcGxldGVBY3Rpdml0eVRleHQiLCJjb21wbGV0ZU9jY3VycmVuY2VUZXh0IiwiY29tcGxldGVTZXJpZXNUZXh0IiwibG9jYXRpb25UZXh0IiwiYWxhcm1UZXh0IiwiYWxhcm1UaW1lVGV4dCIsImNhdGVnb3J5VGV4dCIsImR1cmF0aW9uVGV4dCIsImxlYWRlclRleHQiLCJsb25nTm90ZXNUZXh0IiwicHJpb3JpdHlUZXh0IiwicmVnYXJkaW5nVGV4dCIsInJvbGxvdmVyVGV4dCIsInN0YXJ0VGltZVRleHQiLCJhbGxEYXlUZXh0IiwidGltZWxlc3NUZXh0IiwidGl0bGVUZXh0IiwidHlwZVRleHQiLCJjb21wYW55VGV4dCIsImxlYWRUZXh0IiwiYWNjb3VudFRleHQiLCJjb250YWN0VGV4dCIsIm9wcG9ydHVuaXR5VGV4dCIsInRpY2tldE51bWJlclRleHQiLCJzdGFydERhdGVGb3JtYXRUZXh0Iiwic3RhcnREYXRlRm9ybWF0VGV4dDI0IiwidGltZWxlc3NEYXRlRm9ybWF0VGV4dCIsImFsYXJtRGF0ZUZvcm1hdFRleHQiLCJhbGFybURhdGVGb3JtYXRUZXh0MjQiLCJyZWN1cnJlbmNlVGV4dCIsImNvbmZpcm1FZGl0UmVjdXJyZW5jZVRleHQiLCJyZWxhdGVkQXR0YWNobWVudFRleHQiLCJyZWxhdGVkQXR0YWNobWVudFRpdGxlVGV4dCIsInJlbGF0ZWRJdGVtc1RleHQiLCJwaG9uZVRleHQiLCJlbnRpdHlUZXh0IiwiYWN0aXZpdHlUeXBlVGV4dCIsImF0VG9EbyIsInRvRG9UZXh0IiwiYXRQaG9uZUNhbGwiLCJwaG9uZUNhbGxUZXh0IiwiYXRBcHBvaW50bWVudCIsIm1lZXRpbmdUZXh0IiwiYXRMaXRlcmF0dXJlIiwibGl0ZXJhdHVyZVRleHQiLCJhdFBlcnNvbmFsIiwicGVyc29uYWxUZXh0IiwiaWQiLCJjb21wbGV0ZVZpZXciLCJlZGl0VmlldyIsInNlY3VyaXR5IiwiZW5hYmxlT2ZmbGluZSIsInJlc291cmNlS2luZCIsIm1vZGVsTmFtZSIsIkFDVElWSVRZIiwicmVjdXJyaW5nQWN0aXZpdHlJZFNlcGFyYXRvciIsImZvcm1hdEFjdGl2aXR5VHlwZSIsInZhbCIsIm5hdmlnYXRlVG9FZGl0VmlldyIsImlzQWN0aXZpdHlSZWN1cnJpbmdTZXJpZXMiLCJlbnRyeSIsIm9uRWRpdEFjdGl2aXR5IiwiY29uZmlybSIsInJlY3VycmVuY2UiLCJMZWFkZXIiLCJSZWN1cnJlbmNlU3RhdGUiLCJnZXRPY2N1cmFuY2UiLCJ0aGVuIiwib2NjdXJhbmNlIiwiZGVmIiwia2V5IiwiJGtleSIsImlzQWN0aXZpdHlSZWN1cnJpbmciLCJzcGxpdCIsImxlbmd0aCIsInJlcXVlc3QiLCJTYWdlIiwiU0RhdGEiLCJDbGllbnQiLCJTRGF0YVJlc291cmNlQ29sbGVjdGlvblJlcXVlc3QiLCJnZXRTZXJ2aWNlIiwic2V0UmVzb3VyY2VLaW5kIiwic2V0Q29udHJhY3ROYW1lIiwic2V0UXVlcnlBcmciLCJzZXRDb3VudCIsInJlYWQiLCJzdWNjZXNzIiwiZmVlZCIsIiRyZXNvdXJjZXMiLCJyZXNvbHZlIiwicmVqZWN0Iiwic2NvcGUiLCJwcm9taXNlIiwidmlldyIsIkFwcCIsImdldFZpZXciLCJzaG93IiwibmF2aWdhdGVUb0NvbXBsZXRlVmlldyIsImNvbXBsZXRpb25UaXRsZSIsImlzU2VyaWVzIiwicmVmcmVzaEFjdGl2aXR5TGlzdHMiLCJvcHRpb25zIiwidGl0bGUiLCJ0ZW1wbGF0ZSIsInJldHVyblRvIiwiY29tcGxldGVBY3Rpdml0eSIsImNvbXBsZXRlT2NjdXJyZW5jZSIsInByb2Nlc3NPY2N1cmFuY2UiLCJjb21wbGV0ZVNlcmllcyIsIlJlY3VycmluZyIsImlzQWZ0ZXJDb21wbGV0aW9uIiwiUmVjdXJQZXJpb2QiLCJpc0FjdGl2aXR5Rm9yTGVhZCIsInRlc3QiLCJMZWFkSWQiLCJpc0FjdGl2aXR5VGltZWxlc3MiLCJ0b0Jvb2xlYW4iLCJUaW1lbGVzcyIsImRvZXNBY3Rpdml0eUhhdmVSZW1pbmRlciIsIkFsYXJtIiwiY2hlY2tDYW5Db21wbGV0ZSIsIkFsbG93Q29tcGxldGUiLCJmb3JtYXRQaWNrbGlzdCIsInByb3BlcnR5IiwicGlja2xpc3QiLCJhcHAiLCJwaWNrbGlzdFNlcnZpY2UiLCJfbW9kZWwiLCJmb3JtYXRSZWxhdGVkUXVlcnkiLCJmbXQiLCJ0b1JldHVybiIsInN1YnN0aXR1dGUiLCJnZXRSZWFsQWN0aXZpdHlJZCIsInRoZVByb3BlcnR5IiwiZ2V0VmFsdWUiLCJjcmVhdGVMYXlvdXQiLCJsYXlvdXQiLCJsaXN0IiwiY2xzIiwibmFtZSIsImNoaWxkcmVuIiwibGFiZWwiLCJpY29uQ2xhc3MiLCJhY3Rpb24iLCJkaXNhYmxlZCIsImJpbmQiLCJleGNsdWRlIiwicmVuZGVyZXIiLCJ2YWx1ZSIsImRhdGUiLCJiaW5kRGVsZWdhdGUiLCJpczI0SG91ckNsb2NrIiwiaW5jbHVkZSIsImRldGFpbHNUZXh0IiwiVHlwZSIsImRlc2NyaXB0b3IiLCJwaG9uZSIsIm5hbWVMRiIsInR5cGUiLCJ0aW1lc3BhbiIsInllc05vIiwicmVuZGVyUmVjdXJyZW5jZSIsInRvU3RyaW5nIiwid2hlcmUiLCJnZXRPZmZsaW5lSWNvbiIsIm1vZGVsIiwiZ2V0TW9kZWwiLCJnZXRJY29uQ2xhc3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBOEJBLE1BQU1BLFdBQVcsb0JBQVksZ0JBQVosQ0FBakI7QUFDQSxNQUFNQyxtQkFBbUIsb0JBQVksOEJBQVosQ0FBekI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBLE1BQU1DLFVBQVUsdUJBQVEsMkJBQVIsRUFBcUMsa0JBQXJDLEVBQStDO0FBQzdEO0FBQ0FDLGlCQUFhSCxTQUFTRyxXQUZ1QztBQUc3REMsMEJBQXNCSixTQUFTSSxvQkFIOEI7QUFJN0RDLDRCQUF3QkwsU0FBU0ssc0JBSjRCO0FBSzdEQyx3QkFBb0JOLFNBQVNNLGtCQUxnQztBQU03REMsa0JBQWNQLFNBQVNPLFlBTnNDO0FBTzdEQyxlQUFXUixTQUFTUSxTQVB5QztBQVE3REMsbUJBQWVULFNBQVNTLGFBUnFDO0FBUzdEQyxrQkFBY1YsU0FBU1UsWUFUc0M7QUFVN0RDLGtCQUFjWCxTQUFTVyxZQVZzQztBQVc3REMsZ0JBQVlaLFNBQVNZLFVBWHdDO0FBWTdEQyxtQkFBZWIsU0FBU2EsYUFacUM7QUFhN0RDLGtCQUFjZCxTQUFTYyxZQWJzQztBQWM3REMsbUJBQWVmLFNBQVNlLGFBZHFDO0FBZTdEQyxrQkFBY2hCLFNBQVNnQixZQWZzQztBQWdCN0RDLG1CQUFlakIsU0FBU2lCLGFBaEJxQztBQWlCN0RDLGdCQUFZbEIsU0FBU2tCLFVBakJ3QztBQWtCN0RDLGtCQUFjbkIsU0FBU21CLFlBbEJzQztBQW1CN0RDLGVBQVdwQixTQUFTb0IsU0FuQnlDO0FBb0I3REMsY0FBVXJCLFNBQVNxQixRQXBCMEM7QUFxQjdEQyxpQkFBYXRCLFNBQVNzQixXQXJCdUM7QUFzQjdEQyxjQUFVdkIsU0FBU3VCLFFBdEIwQztBQXVCN0RDLGlCQUFheEIsU0FBU3dCLFdBdkJ1QztBQXdCN0RDLGlCQUFhekIsU0FBU3lCLFdBeEJ1QztBQXlCN0RDLHFCQUFpQjFCLFNBQVMwQixlQXpCbUM7QUEwQjdEQyxzQkFBa0IzQixTQUFTMkIsZ0JBMUJrQztBQTJCN0RDLHlCQUFxQjNCLGlCQUFpQjJCLG1CQTNCdUI7QUE0QjdEQywyQkFBdUI1QixpQkFBaUI0QixxQkE1QnFCO0FBNkI3REMsNEJBQXdCN0IsaUJBQWlCNkIsc0JBN0JvQjtBQThCN0RDLHlCQUFxQjlCLGlCQUFpQjhCLG1CQTlCdUI7QUErQjdEQywyQkFBdUIvQixpQkFBaUIrQixxQkEvQnFCO0FBZ0M3REMsb0JBQWdCakMsU0FBU2lDLGNBaENvQztBQWlDN0RDLCtCQUEyQmxDLFNBQVNrQyx5QkFqQ3lCO0FBa0M3REMsMkJBQXVCbkMsU0FBU21DLHFCQWxDNkI7QUFtQzdEQyxnQ0FBNEJwQyxTQUFTb0MsMEJBbkN3QjtBQW9DN0RDLHNCQUFrQnJDLFNBQVNxQyxnQkFwQ2tDO0FBcUM3REMsZUFBV3RDLFNBQVNzQyxTQXJDeUM7QUFzQzdEQyxnQkFBWXZDLFNBQVN1QyxVQXRDd0M7QUF1QzdEQyxzQkFBa0I7QUFDaEJDLGNBQVF6QyxTQUFTMEMsUUFERDtBQUVoQkMsbUJBQWEzQyxTQUFTNEMsYUFGTjtBQUdoQkMscUJBQWU3QyxTQUFTOEMsV0FIUjtBQUloQkMsb0JBQWMvQyxTQUFTZ0QsY0FKUDtBQUtoQkMsa0JBQVlqRCxTQUFTa0Q7QUFMTCxLQXZDMkM7O0FBK0M3RDtBQUNBQyxRQUFJLGlCQWhEeUQ7QUFpRDdEQyxrQkFBYyxtQkFqRCtDO0FBa0Q3REMsY0FBVSxlQWxEbUQ7QUFtRDdEQyxjQUFVLElBbkRtRCxFQW1EN0M7QUFDaEJDLG1CQUFlLElBcEQ4QztBQXFEN0RDLGtCQUFjLFlBckQrQztBQXNEN0RDLGVBQVcsZ0JBQVlDLFFBdERzQztBQXVEN0RDLGtDQUE4QixHQXZEK0I7O0FBeUQ3REMsd0JBQW9CLFNBQVNBLGtCQUFULENBQTRCQyxHQUE1QixFQUFpQztBQUNuRCxhQUFPLEtBQUtyQixnQkFBTCxDQUFzQnFCLEdBQXRCLEtBQThCQSxHQUFyQztBQUNELEtBM0Q0RDtBQTREN0RDLHdCQUFvQixTQUFTQSxrQkFBVCxHQUE4QjtBQUFBOztBQUNoRCxVQUFJLENBQUMsS0FBS0MseUJBQUwsQ0FBK0IsS0FBS0MsS0FBcEMsQ0FBTCxFQUFpRDtBQUMvQztBQUNBLGFBQUtDLGNBQUwsQ0FBb0IsS0FBS0QsS0FBekI7QUFDRCxPQUhELE1BR087QUFDTCxZQUFJRSxRQUFRLEtBQUtoQyx5QkFBYixDQUFKLEVBQTZDO0FBQUU7QUFDN0M7QUFDQSxlQUFLOEIsS0FBTCxDQUFXRyxVQUFYLENBQXNCQyxNQUF0QixHQUErQixLQUFLSixLQUFMLENBQVdJLE1BQTFDO0FBQ0EsZUFBS0gsY0FBTCxDQUFvQixLQUFLRCxLQUFMLENBQVdHLFVBQS9CO0FBQ0QsU0FKRCxNQUlPO0FBQ0w7QUFDQSxjQUFJLEtBQUtILEtBQUwsQ0FBV0ssZUFBWCxLQUErQixlQUFuQyxFQUFvRDtBQUNsRCxpQkFBS0osY0FBTCxDQUFvQixLQUFLRCxLQUF6QjtBQUNELFdBRkQsTUFFTztBQUNMO0FBQ0EsaUJBQUtNLFlBQUwsQ0FBa0IsS0FBS04sS0FBdkIsRUFBOEJPLElBQTlCLENBQ0UsVUFBQ0MsU0FBRCxFQUFlO0FBQ2Isa0JBQUlBLFNBQUosRUFBZTtBQUNiLG9CQUFJLE1BQUtSLEtBQUwsQ0FBV0ksTUFBZixFQUF1QjtBQUNyQkksNEJBQVVKLE1BQVYsR0FBbUIsTUFBS0osS0FBTCxDQUFXSSxNQUE5QjtBQUNEO0FBQ0Qsc0JBQUtILGNBQUwsQ0FBb0JPLFNBQXBCO0FBQ0Q7QUFDRixhQVJIO0FBU0Q7QUFDRjtBQUNGO0FBQ0YsS0F2RjREO0FBd0Y3REYsa0JBQWMsU0FBU0EsWUFBVCxDQUFzQk4sS0FBdEIsRUFBNkI7QUFDekMsVUFBTVMsTUFBTSx3QkFBWjtBQUNBLFVBQU1DLE1BQU1WLE1BQU1XLElBQWxCO0FBQ0E7QUFDQSxVQUFJLEtBQUtDLG1CQUFMLENBQXlCWixLQUF6QixLQUFtQ1UsSUFBSUcsS0FBSixDQUFVLEtBQUtsQiw0QkFBZixFQUNwQ21CLE1BRG9DLEtBQ3pCLENBRGQsRUFDaUI7QUFDZjtBQUNBLFlBQU1DLFVBQVUsSUFBSUMsS0FBS0MsS0FBTCxDQUFXQyxNQUFYLENBQWtCQyw4QkFBdEIsQ0FBcUQsS0FBS0MsVUFBTCxFQUFyRCxFQUNiQyxlQURhLENBQ0csWUFESCxFQUViQyxlQUZhLENBRUcsUUFGSCxFQUdiQyxXQUhhLENBR0QsT0FIQyxlQUdrQmIsR0FIbEIsU0FJYmMsUUFKYSxDQUlKLENBSkksQ0FBaEI7O0FBTUFULGdCQUFRVSxJQUFSLENBQWE7QUFDWEMsbUJBQVMsU0FBU0EsT0FBVCxDQUFpQkMsSUFBakIsRUFBdUI7QUFDOUIsZ0JBQUlBLFFBQVFBLEtBQUtDLFVBQWIsSUFBMkJELEtBQUtDLFVBQUwsQ0FBZ0JkLE1BQWhCLEdBQXlCLENBQXhELEVBQTJEO0FBQ3pETCxrQkFBSW9CLE9BQUosQ0FBWUYsS0FBS0MsVUFBTCxDQUFnQixDQUFoQixDQUFaO0FBQ0Q7QUFDRG5CLGdCQUFJcUIsTUFBSjtBQUNELFdBTlU7QUFPWEMsaUJBQU87QUFQSSxTQUFiO0FBU0QsT0FsQkQsTUFrQk87QUFDTHRCLFlBQUlxQixNQUFKO0FBQ0Q7QUFDRCxhQUFPckIsSUFBSXVCLE9BQVg7QUFDRCxLQWxINEQ7QUFtSDdEL0Isb0JBQWdCLFNBQVNBLGNBQVQsQ0FBd0JELEtBQXhCLEVBQStCO0FBQzdDLFVBQU1pQyxPQUFPQyxJQUFJQyxPQUFKLENBQVksS0FBSzlDLFFBQWpCLENBQWI7QUFDQSxVQUFJNEMsSUFBSixFQUFVO0FBQ1JBLGFBQUtHLElBQUwsQ0FBVTtBQUNScEM7QUFEUSxTQUFWO0FBR0Q7QUFDRixLQTFINEQ7QUEySDdEcUMsNEJBQXdCLFNBQVNBLHNCQUFULENBQWdDQyxlQUFoQyxFQUFpREMsUUFBakQsRUFBMkQ7QUFDakYsVUFBTU4sT0FBT0MsSUFBSUMsT0FBSixDQUFZLEtBQUsvQyxZQUFqQixDQUFiOztBQUVBLFVBQUk2QyxJQUFKLEVBQVU7QUFDUiw4QkFBWU8sb0JBQVo7QUFDQSxZQUFNQyxVQUFVO0FBQ2RDLGlCQUFPSixlQURPO0FBRWRLLG9CQUFVO0FBRkksU0FBaEI7O0FBS0EsWUFBSUosUUFBSixFQUFjO0FBQ1osZUFBS3ZDLEtBQUwsQ0FBV0csVUFBWCxDQUFzQkMsTUFBdEIsR0FBK0IsS0FBS0osS0FBTCxDQUFXSSxNQUExQztBQUNBcUMsa0JBQVF6QyxLQUFSLEdBQWdCLEtBQUtBLEtBQUwsQ0FBV0csVUFBM0I7QUFDRCxTQUhELE1BR087QUFDTHNDLGtCQUFRekMsS0FBUixHQUFnQixLQUFLQSxLQUFyQjtBQUNEOztBQUVEaUMsYUFBS0csSUFBTCxDQUFVSyxPQUFWLEVBQW1CO0FBQ2pCRyxvQkFBVSxDQUFDO0FBRE0sU0FBbkI7QUFHRDtBQUNGLEtBaEo0RDtBQWlKN0RDLHNCQUFrQixTQUFTQSxnQkFBVCxHQUE0QjtBQUM1QyxXQUFLUixzQkFBTCxDQUE0QixLQUFLakcsb0JBQWpDO0FBQ0QsS0FuSjREO0FBb0o3RDBHLHdCQUFvQixTQUFTQSxrQkFBVCxHQUE4QjtBQUNoRCxVQUFNOUMsUUFBUSxLQUFLQSxLQUFuQjtBQUNBLFVBQU1VLE1BQU1WLE1BQU1XLElBQWxCOztBQUVBO0FBQ0EsVUFBSSxLQUFLQyxtQkFBTCxDQUF5QlosS0FBekIsS0FBbUNVLElBQUlHLEtBQUosQ0FBVSxLQUFLbEIsNEJBQWYsRUFDcENtQixNQURvQyxLQUN6QixDQURkLEVBQ2lCO0FBQ2Y7QUFDQSxZQUFNQyxVQUFVLElBQUlDLEtBQUtDLEtBQUwsQ0FBV0MsTUFBWCxDQUFrQkMsOEJBQXRCLENBQXFELEtBQUtDLFVBQUwsRUFBckQsRUFDYkMsZUFEYSxDQUNHLFlBREgsRUFFYkMsZUFGYSxDQUVHLFFBRkgsRUFHYkMsV0FIYSxDQUdELE9BSEMsZUFHa0JiLEdBSGxCLFNBSWJjLFFBSmEsQ0FJSixDQUpJLENBQWhCOztBQU1BVCxnQkFBUVUsSUFBUixDQUFhO0FBQ1hDLG1CQUFTLEtBQUtxQixnQkFESDtBQUVYaEIsaUJBQU87QUFGSSxTQUFiO0FBSUQsT0FiRCxNQWFPO0FBQ0wsYUFBS00sc0JBQUwsQ0FBNEIsS0FBS2hHLHNCQUFqQztBQUNEO0FBQ0YsS0F6SzREO0FBMEs3RDBHLHNCQUFrQixTQUFTQSxnQkFBVCxDQUEwQnBCLElBQTFCLEVBQWdDO0FBQ2hELFVBQUlBLFFBQVFBLEtBQUtDLFVBQWIsSUFBMkJELEtBQUtDLFVBQUwsQ0FBZ0JkLE1BQWhCLEdBQXlCLENBQXhELEVBQTJEO0FBQ3pELFlBQUksS0FBS2QsS0FBTCxDQUFXSSxNQUFmLEVBQXVCO0FBQ3JCdUIsZUFBS0MsVUFBTCxDQUFnQixDQUFoQixFQUFtQnhCLE1BQW5CLEdBQTRCLEtBQUtKLEtBQUwsQ0FBV0ksTUFBdkM7QUFDRDtBQUNELGFBQUtKLEtBQUwsR0FBYTJCLEtBQUtDLFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FBYjtBQUNBLGFBQUtTLHNCQUFMLENBQTRCLEtBQUtoRyxzQkFBakM7QUFDRDtBQUNGLEtBbEw0RDtBQW1MN0QyRyxvQkFBZ0IsU0FBU0EsY0FBVCxHQUEwQjtBQUN4QyxXQUFLWCxzQkFBTCxDQUE0QixLQUFLL0Ysa0JBQWpDLEVBQXFELElBQXJEO0FBQ0QsS0FyTDREO0FBc0w3RHNFLHlCQUFxQixTQUFTQSxtQkFBVCxDQUE2QlosS0FBN0IsRUFBb0M7QUFDdkQsYUFBT0EsVUFBVUEsTUFBTWlELFNBQU4sSUFBbUJqRCxNQUFNSyxlQUFOLEtBQTBCLGVBQXZELENBQVA7QUFDRCxLQXhMNEQ7QUF5TDdETiwrQkFBMkIsU0FBU0EseUJBQVQsQ0FBbUNDLEtBQW5DLEVBQTBDO0FBQ25FLGFBQU8sS0FBS1ksbUJBQUwsQ0FBeUJaLEtBQXpCLEtBQW1DLENBQUMscUJBQU1rRCxpQkFBTixDQUF3QmxELE1BQU1tRCxXQUE5QixDQUEzQztBQUNELEtBM0w0RDtBQTRMN0RDLHVCQUFtQixTQUFTQSxpQkFBVCxDQUEyQnBELEtBQTNCLEVBQWtDO0FBQ25ELGFBQU9BLFNBQVMsYUFBYXFELElBQWIsQ0FBa0JyRCxNQUFNc0QsTUFBeEIsQ0FBaEI7QUFDRCxLQTlMNEQ7QUErTDdEQyx3QkFBb0IsU0FBU0Esa0JBQVQsQ0FBNEJ2RCxLQUE1QixFQUFtQztBQUNyRCxhQUFPQSxTQUFTLGtCQUFRd0QsU0FBUixDQUFrQnhELE1BQU15RCxRQUF4QixDQUFoQjtBQUNELEtBak00RDtBQWtNN0RDLDhCQUEwQixTQUFTQSx3QkFBVCxDQUFrQzFELEtBQWxDLEVBQXlDO0FBQ2pFLGFBQU8sa0JBQVF3RCxTQUFSLENBQWtCeEQsU0FBU0EsTUFBTTJELEtBQWpDLENBQVA7QUFDRCxLQXBNNEQ7QUFxTTdEQyxzQkFBa0IsU0FBU0EsZ0JBQVQsQ0FBMEI1RCxLQUExQixFQUFpQztBQUNqRCxhQUFPLEVBQUVBLFNBQVVBLE1BQU02RCxhQUFsQixDQUFQO0FBQ0QsS0F2TTREO0FBd003REMsb0JBQWdCLFNBQVNBLGNBQVQsQ0FBd0JDLFFBQXhCLEVBQWtDO0FBQ2hELGFBQU8saUJBQU9DLFFBQVAsQ0FBZ0IsS0FBS0MsR0FBTCxDQUFTQyxlQUF6QixFQUEwQyxLQUFLQyxNQUEvQyxFQUF1REosUUFBdkQsQ0FBUDtBQUNELEtBMU00RDtBQTJNN0RLLHdCQUFvQixTQUFTQSxrQkFBVCxDQUE0QnBFLEtBQTVCLEVBQW1DcUUsR0FBbkMsRUFBd0NOLFFBQXhDLEVBQWtEO0FBQ3BFLFVBQUlPLGlCQUFKO0FBQ0EsVUFBSVAsYUFBYSxZQUFqQixFQUErQjtBQUM3Qk8sbUJBQVcsaUJBQU9DLFVBQVAsQ0FBa0JGLEdBQWxCLEVBQXVCLENBQUMsa0JBQVFHLGlCQUFSLENBQTBCeEUsTUFBTVcsSUFBaEMsQ0FBRCxDQUF2QixDQUFYO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsWUFBTThELGNBQWNWLFlBQVksTUFBaEM7QUFDQU8sbUJBQVcsaUJBQU9DLFVBQVAsQ0FBa0JGLEdBQWxCLEVBQXVCLENBQUMsa0JBQWdCSyxRQUFoQixDQUF5QjFFLEtBQXpCLEVBQWdDeUUsV0FBaEMsRUFBNkMsRUFBN0MsQ0FBRCxDQUF2QixDQUFYO0FBQ0Q7QUFDRCxhQUFPSCxRQUFQO0FBQ0QsS0FwTjREO0FBcU43REssa0JBQWMsU0FBU0EsWUFBVCxHQUF3QjtBQUNwQyxhQUFPLEtBQUtDLE1BQUwsS0FBZ0IsS0FBS0EsTUFBTCxHQUFjLENBQUM7QUFDcENDLGNBQU0sSUFEOEI7QUFFcENuQyxlQUFPLEtBQUt2RyxXQUZ3QjtBQUdwQzJJLGFBQUssYUFIK0I7QUFJcENDLGNBQU0scUJBSjhCO0FBS3BDQyxrQkFBVSxDQUFDO0FBQ1RELGdCQUFNLHdCQURHO0FBRVRoQixvQkFBVSxhQUZEO0FBR1RrQixpQkFBTyxLQUFLN0ksb0JBSEg7QUFJVDhJLHFCQUFXLFVBSkY7QUFLVEMsa0JBQVEsa0JBTEM7QUFNVEMsb0JBQVUsS0FBS3hCLGdCQUFMLENBQXNCeUIsSUFBdEIsQ0FBMkIsSUFBM0IsQ0FORDtBQU9UQyxtQkFBUyxLQUFLdkYseUJBQUwsQ0FBK0JzRixJQUEvQixDQUFvQyxJQUFwQyxDQVBBO0FBUVRFLG9CQUFVLFNBQVNBLFFBQVQsQ0FBa0JDLEtBQWxCLEVBQXlCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLGdCQUFJLENBQUNBLEtBQUwsRUFBWTtBQUNWLHFCQUFPLEdBQVA7QUFDRDs7QUFFRCxtQkFBT0EsS0FBUDtBQUNEO0FBakJRLFNBQUQsRUFrQlA7QUFDRFQsZ0JBQU0sMEJBREw7QUFFRGhCLG9CQUFVLFdBRlQ7QUFHRGtCLGlCQUFPLEtBQUs1SSxzQkFIWDtBQUlENkkscUJBQVcsVUFKVjtBQUtEQyxrQkFBUSxvQkFMUDtBQU1EQyxvQkFBVSxLQUFLeEIsZ0JBQUwsQ0FBc0J5QixJQUF0QixDQUEyQixJQUEzQixDQU5UO0FBT0RFLG9CQUFVLGlCQUFPRSxJQUFQLENBQVlDLFlBQVosQ0FBeUIsSUFBekIsRUFBZ0N4RCxJQUFJeUQsYUFBSixFQUFELEdBQXdCLEtBQUs5SCxxQkFBN0IsR0FBcUQsS0FBS0QsbUJBQXpGLEVBQThHLEtBQTlHLENBUFQ7QUFRRGdJLG1CQUFTLEtBQUs3Rix5QkFBTCxDQUErQnNGLElBQS9CLENBQW9DLElBQXBDO0FBUlIsU0FsQk8sRUEyQlA7QUFDRE4sZ0JBQU0sc0JBREw7QUFFRGhCLG9CQUFVLGFBRlQ7QUFHRGtCLGlCQUFPLEtBQUszSSxrQkFIWDtBQUlENEkscUJBQVcsVUFKVjtBQUtEQyxrQkFBUSxnQkFMUDtBQU1EQyxvQkFBVSxLQUFLeEIsZ0JBQUwsQ0FBc0J5QixJQUF0QixDQUEyQixJQUEzQixDQU5UO0FBT0RPLG1CQUFTLEtBQUs3Rix5QkFBTCxDQUErQnNGLElBQS9CLENBQW9DLElBQXBDO0FBUFIsU0EzQk87QUFMMEIsT0FBRCxFQXlDbEM7QUFDRDNDLGVBQU8sS0FBS21ELFdBRFg7QUFFRGQsY0FBTSxnQkFGTDtBQUdEQyxrQkFBVSxDQUFDO0FBQ1RELGdCQUFNLGFBREc7QUFFVGhCLG9CQUFVLGFBRkQ7QUFHVGtCLGlCQUFPLEtBQUtsSSxhQUhIO0FBSVR3SSxvQkFBVSxpQkFBT3ZCLFFBQVAsQ0FBZ0IsS0FBS0MsR0FBTCxDQUFTQyxlQUF6QixFQUEwQyxJQUExQyxFQUFnRCxJQUFoRCxFQUFzRCxzREFBMEIsS0FBS2xFLEtBQUwsQ0FBVzhGLElBQXJDLEVBQTJDLGFBQTNDLENBQXREO0FBSkQsU0FBRCxFQUtQO0FBQ0RmLGdCQUFNLFdBREw7QUFFRGhCLG9CQUFVLFdBRlQ7QUFHRGtCLGlCQUFPLEtBQUtwSTtBQUhYLFNBTE8sRUFTUDtBQUNEa0ksZ0JBQU0sYUFETDtBQUVEaEIsb0JBQVUsYUFGVDtBQUdEdUIsbUJBQVMsS0FBS2xDLGlCQUFMLENBQXVCaUMsSUFBdkIsQ0FBNEIsSUFBNUIsQ0FIUjtBQUlESixpQkFBTyxLQUFLeEgsV0FKWDtBQUtEd0UsZ0JBQU0sZ0JBTEw7QUFNRHZCLGVBQUssV0FOSjtBQU9EcUYsc0JBQVk7QUFQWCxTQVRPLEVBaUJQO0FBQ0RoQixnQkFBTSxhQURMO0FBRURoQixvQkFBVSxhQUZUO0FBR0RrQixpQkFBTyxLQUFLM0csU0FIWDtBQUlEaUgsb0JBQVUsaUJBQU9TLEtBQVAsQ0FBYU4sWUFBYixDQUEwQixJQUExQixFQUFnQyxJQUFoQztBQUpULFNBakJPLEVBc0JQO0FBQ0RYLGdCQUFNLE1BREw7QUFFRGhCLG9CQUFVLE1BRlQ7QUFHRGtCLGlCQUFPLEtBQUs1SCxRQUhYO0FBSURrSSxvQkFBVSxLQUFLM0Ysa0JBQUwsQ0FBd0I4RixZQUF4QixDQUFxQyxJQUFyQztBQUpULFNBdEJPLEVBMkJQO0FBQ0RYLGdCQUFNLFVBREw7QUFFRGhCLG9CQUFVLFVBRlQ7QUFHRGtCLGlCQUFPLEtBQUt2SSxZQUhYO0FBSUQ2SSxvQkFBVSxpQkFBT3ZCLFFBQVAsQ0FBZ0IsS0FBS0MsR0FBTCxDQUFTQyxlQUF6QixFQUEwQyxJQUExQyxFQUFnRCxJQUFoRCxFQUFzRCxzREFBMEIsS0FBS2xFLEtBQUwsQ0FBVzhGLElBQXJDLEVBQTJDLFVBQTNDLENBQXREO0FBSlQsU0EzQk8sRUFnQ1A7QUFDRGYsZ0JBQU0sVUFETDtBQUVEaEIsb0JBQVUsVUFGVDtBQUdEa0IsaUJBQU8sS0FBSzFJO0FBSFgsU0FoQ08sRUFvQ1A7QUFDRHdJLGdCQUFNLFVBREw7QUFFRGhCLG9CQUFVLFVBRlQ7QUFHRGtCLGlCQUFPLEtBQUtuSSxZQUhYO0FBSUR5SSxvQkFBVSxLQUFLekIsY0FBTCxDQUFvQixVQUFwQjtBQUpULFNBcENPLEVBeUNQO0FBQ0RpQixnQkFBTSxRQURMO0FBRURoQixvQkFBVSxpQkFGVDtBQUdEa0IsaUJBQU8sS0FBS3JJLFVBSFg7QUFJRCtGLG9CQUFVLG1CQUFTc0Q7QUFKbEIsU0F6Q08sRUE4Q1A7QUFDRGxCLGdCQUFNLGFBREw7QUFFRGhCLG9CQUFVLGFBRlQ7QUFHRHVCLG1CQUFTLEtBQUtsQyxpQkFBTCxDQUF1QmlDLElBQXZCLENBQTRCLElBQTVCLENBSFI7QUFJREosaUJBQU8sS0FBS3pILFdBSlg7QUFLRHlFLGdCQUFNLGdCQUxMO0FBTUR2QixlQUFLLFdBTko7QUFPRHFGLHNCQUFZO0FBUFgsU0E5Q08sRUFzRFA7QUFDRGhCLGdCQUFNLGlCQURMO0FBRURoQixvQkFBVSxpQkFGVDtBQUdEdUIsbUJBQVMsS0FBS2xDLGlCQUFMLENBQXVCaUMsSUFBdkIsQ0FBNEIsSUFBNUIsQ0FIUjtBQUlESixpQkFBTyxLQUFLdkgsZUFKWDtBQUtEdUUsZ0JBQU0sb0JBTEw7QUFNRHZCLGVBQUssZUFOSjtBQU9EcUYsc0JBQVk7QUFQWCxTQXRETyxFQThEUDtBQUNEaEIsZ0JBQU0sY0FETDtBQUVEaEIsb0JBQVUsY0FGVDtBQUdEdUIsbUJBQVMsS0FBS2xDLGlCQUFMLENBQXVCaUMsSUFBdkIsQ0FBNEIsSUFBNUIsQ0FIUjtBQUlESixpQkFBTyxLQUFLdEgsZ0JBSlg7QUFLRHNFLGdCQUFNLGVBTEw7QUFNRHZCLGVBQUssVUFOSjtBQU9EcUYsc0JBQVk7QUFQWCxTQTlETyxFQXNFUDtBQUNEaEIsZ0JBQU0sVUFETDtBQUVEaEIsb0JBQVUsVUFGVDtBQUdENkIsbUJBQVMsS0FBS3hDLGlCQUFMLENBQXVCaUMsSUFBdkIsQ0FBNEIsSUFBNUIsQ0FIUjtBQUlESixpQkFBTyxLQUFLMUgsUUFKWDtBQUtEMEUsZ0JBQU0sYUFMTDtBQU1EdkIsZUFBSyxRQU5KO0FBT0RxRixzQkFBWTtBQVBYLFNBdEVPLEVBOEVQO0FBQ0RoQixnQkFBTSxhQURMO0FBRURoQixvQkFBVSxhQUZUO0FBR0Q2QixtQkFBUyxLQUFLeEMsaUJBQUwsQ0FBdUJpQyxJQUF2QixDQUE0QixJQUE1QixDQUhSO0FBSURKLGlCQUFPLEtBQUszSDtBQUpYLFNBOUVPLEVBbUZQO0FBQ0R5SCxnQkFBTSxXQURMO0FBRURoQixvQkFBVSxXQUZUO0FBR0RrQixpQkFBTyxLQUFLaEksYUFIWDtBQUlEc0ksb0JBQVUsaUJBQU9FLElBQVAsQ0FBWUMsWUFBWixDQUF5QixJQUF6QixFQUFnQ3hELElBQUl5RCxhQUFKLEVBQUQsR0FBd0IsS0FBSzlILHFCQUE3QixHQUFxRCxLQUFLRCxtQkFBekYsRUFBOEcsS0FBOUcsQ0FKVDtBQUtEMEgsbUJBQVMsS0FBSy9CLGtCQUFMLENBQXdCOEIsSUFBeEIsQ0FBNkIsSUFBN0I7QUFMUixTQW5GTyxFQXlGUDtBQUNETixnQkFBTSxtQkFETDtBQUVEaEIsb0JBQVUsV0FGVDtBQUdEa0IsaUJBQU8sS0FBSy9ILFVBSFg7QUFJRHFJLG9CQUFVLGlCQUFPRSxJQUFQLENBQVlDLFlBQVosQ0FBeUIsSUFBekIsRUFBK0IsS0FBSzVILHNCQUFwQyxFQUE0RCxJQUE1RCxDQUpUO0FBS0Q4SCxtQkFBUyxLQUFLckMsa0JBQUwsQ0FBd0I4QixJQUF4QixDQUE2QixJQUE3QjtBQUxSLFNBekZPLEVBK0ZQO0FBQ0ROLGdCQUFNLFVBREw7QUFFRGhCLG9CQUFVLFVBRlQ7QUFHRGtCLGlCQUFPLEtBQUs5SCxZQUhYO0FBSUQrSSxnQkFBTSxTQUpMO0FBS0ROLG1CQUFTO0FBTFIsU0EvRk8sRUFxR1A7QUFDRGIsZ0JBQU0sVUFETDtBQUVEaEIsb0JBQVUsVUFGVDtBQUdEa0IsaUJBQU8sS0FBS3RJLFlBSFg7QUFJRDRJLG9CQUFVLGlCQUFPWSxRQUpoQjtBQUtEYixtQkFBUyxLQUFLL0Isa0JBQUwsQ0FBd0I4QixJQUF4QixDQUE2QixJQUE3QjtBQUxSLFNBckdPLEVBMkdQO0FBQ0ROLGdCQUFNLE9BREw7QUFFRGhCLG9CQUFVLE9BRlQ7QUFHRGtCLGlCQUFPLEtBQUt6SSxTQUhYO0FBSUQrSSxvQkFBVSxpQkFBT2EsS0FKaEI7QUFLRGQsbUJBQVMsS0FBSzVCLHdCQUFMLENBQThCMkIsSUFBOUIsQ0FBbUMsSUFBbkM7QUFMUixTQTNHTyxFQWlIUDtBQUNETixnQkFBTSxXQURMO0FBRURoQixvQkFBVSxXQUZUO0FBR0RrQixpQkFBTyxLQUFLeEksYUFIWDtBQUlEOEksb0JBQVUsaUJBQU9FLElBQVAsQ0FBWUMsWUFBWixDQUF5QixJQUF6QixFQUFnQ3hELElBQUl5RCxhQUFKLEVBQUQsR0FBd0IsS0FBSzNILHFCQUE3QixHQUFxRCxLQUFLRCxtQkFBekYsRUFBOEcsSUFBOUcsRUFBb0gsSUFBcEgsQ0FKVDtBQUtENkgsbUJBQVMsS0FBS2xDLHdCQUFMLENBQThCMkIsSUFBOUIsQ0FBbUMsSUFBbkM7QUFMUixTQWpITyxFQXVIUDtBQUNETixnQkFBTSxVQURMO0FBRURoQixvQkFBVSxVQUZUO0FBR0RrQixpQkFBTyxLQUFLakksWUFIWDtBQUlENEksbUJBQVMsS0FBS3JDLGtCQUFMLENBQXdCOEIsSUFBeEIsQ0FBNkIsSUFBN0IsQ0FKUjtBQUtERSxvQkFBVSxpQkFBT2E7QUFMaEIsU0F2SE8sRUE2SFA7QUFDRHJCLGdCQUFNLGNBREw7QUFFRGhCLG9CQUFVLFlBRlQ7QUFHRGtCLGlCQUFPLEtBQUtoSCxjQUhYO0FBSUQySCxtQkFBUyxLQUFLaEYsbUJBQUwsQ0FBeUJ5RSxJQUF6QixDQUE4QixJQUE5QixDQUpSO0FBS0RFLG9CQUFVLFNBQVNjLGdCQUFULENBQTBCYixLQUExQixFQUFpQztBQUN6QyxtQkFBTyxxQkFBTWMsUUFBTixDQUFlZCxLQUFmLENBQVA7QUFDRDtBQVBBLFNBN0hPO0FBSFQsT0F6Q2tDLEVBa0xsQztBQUNEOUMsZUFBTyxLQUFLckUsZ0JBRFg7QUFFRHdHLGNBQU0sSUFGTDtBQUdERSxjQUFNLHFCQUhMO0FBSURDLGtCQUFVLENBQUM7QUFDVEQsZ0JBQU0sbUJBREc7QUFFVEUsaUJBQU8sS0FBSzlHLHFCQUZIO0FBR1RvSSxpQkFBTyxLQUFLbkMsa0JBQUwsQ0FBd0JzQixZQUF4QixDQUFxQyxJQUFyQyxFQUEyQyxzQkFBM0MsRUFBbUUsWUFBbkUsQ0FIRSxFQUdnRjtBQUN6RnpELGdCQUFNLDZCQUpHO0FBS1RTLGlCQUFPLEtBQUt0RTtBQUxILFNBQUQ7QUFKVCxPQWxMa0MsQ0FBOUIsQ0FBUDtBQThMRCxLQXBaNEQ7QUFxWjdEb0ksb0JBQWdCLFNBQVNBLGNBQVQsR0FBMEI7QUFDeEMsVUFBTUMsUUFBUSxLQUFLQyxRQUFMLEVBQWQ7QUFDQSxhQUFPRCxNQUFNRSxZQUFOLENBQW1CLEtBQUszRyxLQUF4QixDQUFQO0FBQ0Q7QUF4WjRELEdBQS9DLENBQWhCOztvQkEyWmU5RCxPIiwiZmlsZSI6IkRldGFpbC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBzdHJpbmcgZnJvbSAnZG9qby9zdHJpbmcnO1xyXG5pbXBvcnQgcGxhdGZvcm1VdGlsaXR5IGZyb20gJ2FyZ29zL1V0aWxpdHknO1xyXG5pbXBvcnQgY29udmVydCBmcm9tICdhcmdvcy9Db252ZXJ0JztcclxuaW1wb3J0IERldGFpbCBmcm9tICdhcmdvcy9EZXRhaWwnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcbmltcG9ydCBEZWZlcnJlZCBmcm9tICdkb2pvL0RlZmVycmVkJztcclxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4uLy4uL1RlbXBsYXRlJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICcuLi8uLi9Gb3JtYXQnO1xyXG5pbXBvcnQgZW52aXJvbm1lbnQgZnJvbSAnLi4vLi4vRW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgcmVjdXIgZnJvbSAnLi4vLi4vUmVjdXJyZW5jZSc7XHJcbmltcG9ydCB1dGlsaXR5IGZyb20gJy4uLy4uL1V0aWxpdHknO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vLi4vTW9kZWxzL05hbWVzJztcclxuaW1wb3J0IHsgZ2V0UGlja2xpc3RCeUFjdGl2aXR5VHlwZSB9IGZyb20gJy4uLy4uL01vZGVscy9BY3Rpdml0eS9BY3Rpdml0eVR5cGVQaWNrbGlzdHMnO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYWN0aXZpdHlEZXRhaWwnKTtcclxuY29uc3QgZHRGb3JtYXRSZXNvdXJjZSA9IGdldFJlc291cmNlKCdhY3Rpdml0eURldGFpbERhdGVUaW1lRm9ybWF0Jyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5BY3Rpdml0eS5EZXRhaWxcclxuICpcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuRGV0YWlsXHJcbiAqIEBtaXhpbnMgYXJnb3MuRGV0YWlsXHJcbiAqXHJcbiAqIEByZXF1aXJlcyBhcmdvcy5EZXRhaWxcclxuICogQHJlcXVpcmVzIGFyZ29zLlV0aWxpdHlcclxuICogQHJlcXVpcmVzIGFyZ29zLkNvbnZlcnRcclxuICogQHJlcXVpcmVzIGNybS5Gb3JtYXRcclxuICogQHJlcXVpcmVzIGNybS5UZW1wbGF0ZVxyXG4gKiBAcmVxdWlyZXMgY3JtLkVudmlyb25tZW50XHJcbiAqIEByZXF1aXJlcyBjcm0uUmVjdXJyZW5jZVxyXG4gKiBAcmVxdWlyZXMgY3JtLlV0aWxpdHlcclxuICpcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuQWN0aXZpdHkuRGV0YWlsJywgW0RldGFpbF0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICBhY3Rpb25zVGV4dDogcmVzb3VyY2UuYWN0aW9uc1RleHQsXHJcbiAgY29tcGxldGVBY3Rpdml0eVRleHQ6IHJlc291cmNlLmNvbXBsZXRlQWN0aXZpdHlUZXh0LFxyXG4gIGNvbXBsZXRlT2NjdXJyZW5jZVRleHQ6IHJlc291cmNlLmNvbXBsZXRlT2NjdXJyZW5jZVRleHQsXHJcbiAgY29tcGxldGVTZXJpZXNUZXh0OiByZXNvdXJjZS5jb21wbGV0ZVNlcmllc1RleHQsXHJcbiAgbG9jYXRpb25UZXh0OiByZXNvdXJjZS5sb2NhdGlvblRleHQsXHJcbiAgYWxhcm1UZXh0OiByZXNvdXJjZS5hbGFybVRleHQsXHJcbiAgYWxhcm1UaW1lVGV4dDogcmVzb3VyY2UuYWxhcm1UaW1lVGV4dCxcclxuICBjYXRlZ29yeVRleHQ6IHJlc291cmNlLmNhdGVnb3J5VGV4dCxcclxuICBkdXJhdGlvblRleHQ6IHJlc291cmNlLmR1cmF0aW9uVGV4dCxcclxuICBsZWFkZXJUZXh0OiByZXNvdXJjZS5sZWFkZXJUZXh0LFxyXG4gIGxvbmdOb3Rlc1RleHQ6IHJlc291cmNlLmxvbmdOb3Rlc1RleHQsXHJcbiAgcHJpb3JpdHlUZXh0OiByZXNvdXJjZS5wcmlvcml0eVRleHQsXHJcbiAgcmVnYXJkaW5nVGV4dDogcmVzb3VyY2UucmVnYXJkaW5nVGV4dCxcclxuICByb2xsb3ZlclRleHQ6IHJlc291cmNlLnJvbGxvdmVyVGV4dCxcclxuICBzdGFydFRpbWVUZXh0OiByZXNvdXJjZS5zdGFydFRpbWVUZXh0LFxyXG4gIGFsbERheVRleHQ6IHJlc291cmNlLmFsbERheVRleHQsXHJcbiAgdGltZWxlc3NUZXh0OiByZXNvdXJjZS50aW1lbGVzc1RleHQsXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgdHlwZVRleHQ6IHJlc291cmNlLnR5cGVUZXh0LFxyXG4gIGNvbXBhbnlUZXh0OiByZXNvdXJjZS5jb21wYW55VGV4dCxcclxuICBsZWFkVGV4dDogcmVzb3VyY2UubGVhZFRleHQsXHJcbiAgYWNjb3VudFRleHQ6IHJlc291cmNlLmFjY291bnRUZXh0LFxyXG4gIGNvbnRhY3RUZXh0OiByZXNvdXJjZS5jb250YWN0VGV4dCxcclxuICBvcHBvcnR1bml0eVRleHQ6IHJlc291cmNlLm9wcG9ydHVuaXR5VGV4dCxcclxuICB0aWNrZXROdW1iZXJUZXh0OiByZXNvdXJjZS50aWNrZXROdW1iZXJUZXh0LFxyXG4gIHN0YXJ0RGF0ZUZvcm1hdFRleHQ6IGR0Rm9ybWF0UmVzb3VyY2Uuc3RhcnREYXRlRm9ybWF0VGV4dCxcclxuICBzdGFydERhdGVGb3JtYXRUZXh0MjQ6IGR0Rm9ybWF0UmVzb3VyY2Uuc3RhcnREYXRlRm9ybWF0VGV4dDI0LFxyXG4gIHRpbWVsZXNzRGF0ZUZvcm1hdFRleHQ6IGR0Rm9ybWF0UmVzb3VyY2UudGltZWxlc3NEYXRlRm9ybWF0VGV4dCxcclxuICBhbGFybURhdGVGb3JtYXRUZXh0OiBkdEZvcm1hdFJlc291cmNlLmFsYXJtRGF0ZUZvcm1hdFRleHQsXHJcbiAgYWxhcm1EYXRlRm9ybWF0VGV4dDI0OiBkdEZvcm1hdFJlc291cmNlLmFsYXJtRGF0ZUZvcm1hdFRleHQyNCxcclxuICByZWN1cnJlbmNlVGV4dDogcmVzb3VyY2UucmVjdXJyZW5jZVRleHQsXHJcbiAgY29uZmlybUVkaXRSZWN1cnJlbmNlVGV4dDogcmVzb3VyY2UuY29uZmlybUVkaXRSZWN1cnJlbmNlVGV4dCxcclxuICByZWxhdGVkQXR0YWNobWVudFRleHQ6IHJlc291cmNlLnJlbGF0ZWRBdHRhY2htZW50VGV4dCxcclxuICByZWxhdGVkQXR0YWNobWVudFRpdGxlVGV4dDogcmVzb3VyY2UucmVsYXRlZEF0dGFjaG1lbnRUaXRsZVRleHQsXHJcbiAgcmVsYXRlZEl0ZW1zVGV4dDogcmVzb3VyY2UucmVsYXRlZEl0ZW1zVGV4dCxcclxuICBwaG9uZVRleHQ6IHJlc291cmNlLnBob25lVGV4dCxcclxuICBlbnRpdHlUZXh0OiByZXNvdXJjZS5lbnRpdHlUZXh0LFxyXG4gIGFjdGl2aXR5VHlwZVRleHQ6IHtcclxuICAgIGF0VG9EbzogcmVzb3VyY2UudG9Eb1RleHQsXHJcbiAgICBhdFBob25lQ2FsbDogcmVzb3VyY2UucGhvbmVDYWxsVGV4dCxcclxuICAgIGF0QXBwb2ludG1lbnQ6IHJlc291cmNlLm1lZXRpbmdUZXh0LFxyXG4gICAgYXRMaXRlcmF0dXJlOiByZXNvdXJjZS5saXRlcmF0dXJlVGV4dCxcclxuICAgIGF0UGVyc29uYWw6IHJlc291cmNlLnBlcnNvbmFsVGV4dCxcclxuICB9LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ2FjdGl2aXR5X2RldGFpbCcsXHJcbiAgY29tcGxldGVWaWV3OiAnYWN0aXZpdHlfY29tcGxldGUnLFxyXG4gIGVkaXRWaWV3OiAnYWN0aXZpdHlfZWRpdCcsXHJcbiAgc2VjdXJpdHk6IG51bGwsIC8vICdFbnRpdGllcy9BY3Rpdml0eS9WaWV3JyxcclxuICBlbmFibGVPZmZsaW5lOiB0cnVlLFxyXG4gIHJlc291cmNlS2luZDogJ2FjdGl2aXRpZXMnLFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuQUNUSVZJVFksXHJcbiAgcmVjdXJyaW5nQWN0aXZpdHlJZFNlcGFyYXRvcjogJzsnLFxyXG5cclxuICBmb3JtYXRBY3Rpdml0eVR5cGU6IGZ1bmN0aW9uIGZvcm1hdEFjdGl2aXR5VHlwZSh2YWwpIHtcclxuICAgIHJldHVybiB0aGlzLmFjdGl2aXR5VHlwZVRleHRbdmFsXSB8fCB2YWw7XHJcbiAgfSxcclxuICBuYXZpZ2F0ZVRvRWRpdFZpZXc6IGZ1bmN0aW9uIG5hdmlnYXRlVG9FZGl0VmlldygpIHtcclxuICAgIGlmICghdGhpcy5pc0FjdGl2aXR5UmVjdXJyaW5nU2VyaWVzKHRoaXMuZW50cnkpKSB7XHJcbiAgICAgIC8vIG5vcm1hbCBhY3Rpdml0eVxyXG4gICAgICB0aGlzLm9uRWRpdEFjdGl2aXR5KHRoaXMuZW50cnkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGNvbmZpcm0odGhpcy5jb25maXJtRWRpdFJlY3VycmVuY2VUZXh0KSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICAgICAgLy8gZWRpdCBzZXJpZXNcclxuICAgICAgICB0aGlzLmVudHJ5LnJlY3VycmVuY2UuTGVhZGVyID0gdGhpcy5lbnRyeS5MZWFkZXI7XHJcbiAgICAgICAgdGhpcy5vbkVkaXRBY3Rpdml0eSh0aGlzLmVudHJ5LnJlY3VycmVuY2UpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIGNvbXBsZXRlIHRoZSBvY2NyZW5jZVxyXG4gICAgICAgIGlmICh0aGlzLmVudHJ5LlJlY3VycmVuY2VTdGF0ZSA9PT0gJ3JzdE9jY3VycmVuY2UnKSB7XHJcbiAgICAgICAgICB0aGlzLm9uRWRpdEFjdGl2aXR5KHRoaXMuZW50cnkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyB3ZSBuZWVkIHRvIHJlc29sdmUgb2NjdXJhbmNlXHJcbiAgICAgICAgICB0aGlzLmdldE9jY3VyYW5jZSh0aGlzLmVudHJ5KS50aGVuKFxyXG4gICAgICAgICAgICAob2NjdXJhbmNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKG9jY3VyYW5jZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZW50cnkuTGVhZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgIG9jY3VyYW5jZS5MZWFkZXIgPSB0aGlzLmVudHJ5LkxlYWRlcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMub25FZGl0QWN0aXZpdHkob2NjdXJhbmNlKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZ2V0T2NjdXJhbmNlOiBmdW5jdGlvbiBnZXRPY2N1cmFuY2UoZW50cnkpIHtcclxuICAgIGNvbnN0IGRlZiA9IG5ldyBEZWZlcnJlZCgpO1xyXG4gICAgY29uc3Qga2V5ID0gZW50cnkuJGtleTtcclxuICAgIC8vIENoZWNrIHRvIGVuc3VyZSB3ZSBoYXZlIGEgY29tcG9zaXRlIGtleSAobWVhbmluZyB3ZSBoYXZlIHRoZSBvY2N1cmFuY2UsIG5vdCB0aGUgbWFzdGVyKVxyXG4gICAgaWYgKHRoaXMuaXNBY3Rpdml0eVJlY3VycmluZyhlbnRyeSkgJiYga2V5LnNwbGl0KHRoaXMucmVjdXJyaW5nQWN0aXZpdHlJZFNlcGFyYXRvcilcclxuICAgICAgLmxlbmd0aCAhPT0gMikge1xyXG4gICAgICAvLyBGZXRjaCB0aGUgb2NjdXJhbmNlLCBhbmQgY29udGludWUgb24gdG8gdGhlIGNvbXBsZXRlIHNjcmVlblxyXG4gICAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhUmVzb3VyY2VDb2xsZWN0aW9uUmVxdWVzdCh0aGlzLmdldFNlcnZpY2UoKSlcclxuICAgICAgICAuc2V0UmVzb3VyY2VLaW5kKCdhY3Rpdml0aWVzJylcclxuICAgICAgICAuc2V0Q29udHJhY3ROYW1lKCdzeXN0ZW0nKVxyXG4gICAgICAgIC5zZXRRdWVyeUFyZygnd2hlcmUnLCBgaWQgZXEgJyR7a2V5fSdgKVxyXG4gICAgICAgIC5zZXRDb3VudCgxKTtcclxuXHJcbiAgICAgIHJlcXVlc3QucmVhZCh7XHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhmZWVkKSB7XHJcbiAgICAgICAgICBpZiAoZmVlZCAmJiBmZWVkLiRyZXNvdXJjZXMgJiYgZmVlZC4kcmVzb3VyY2VzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZGVmLnJlc29sdmUoZmVlZC4kcmVzb3VyY2VzWzBdKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGRlZi5yZWplY3QoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNjb3BlOiB0aGlzLFxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRlZi5yZWplY3QoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBkZWYucHJvbWlzZTtcclxuICB9LFxyXG4gIG9uRWRpdEFjdGl2aXR5OiBmdW5jdGlvbiBvbkVkaXRBY3Rpdml0eShlbnRyeSkge1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KHRoaXMuZWRpdFZpZXcpO1xyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgdmlldy5zaG93KHtcclxuICAgICAgICBlbnRyeSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBuYXZpZ2F0ZVRvQ29tcGxldGVWaWV3OiBmdW5jdGlvbiBuYXZpZ2F0ZVRvQ29tcGxldGVWaWV3KGNvbXBsZXRpb25UaXRsZSwgaXNTZXJpZXMpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyh0aGlzLmNvbXBsZXRlVmlldyk7XHJcblxyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgZW52aXJvbm1lbnQucmVmcmVzaEFjdGl2aXR5TGlzdHMoKTtcclxuICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICB0aXRsZTogY29tcGxldGlvblRpdGxlLFxyXG4gICAgICAgIHRlbXBsYXRlOiB7fSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmIChpc1Nlcmllcykge1xyXG4gICAgICAgIHRoaXMuZW50cnkucmVjdXJyZW5jZS5MZWFkZXIgPSB0aGlzLmVudHJ5LkxlYWRlcjtcclxuICAgICAgICBvcHRpb25zLmVudHJ5ID0gdGhpcy5lbnRyeS5yZWN1cnJlbmNlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG9wdGlvbnMuZW50cnkgPSB0aGlzLmVudHJ5O1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2aWV3LnNob3cob3B0aW9ucywge1xyXG4gICAgICAgIHJldHVyblRvOiAtMSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBjb21wbGV0ZUFjdGl2aXR5OiBmdW5jdGlvbiBjb21wbGV0ZUFjdGl2aXR5KCkge1xyXG4gICAgdGhpcy5uYXZpZ2F0ZVRvQ29tcGxldGVWaWV3KHRoaXMuY29tcGxldGVBY3Rpdml0eVRleHQpO1xyXG4gIH0sXHJcbiAgY29tcGxldGVPY2N1cnJlbmNlOiBmdW5jdGlvbiBjb21wbGV0ZU9jY3VycmVuY2UoKSB7XHJcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZW50cnk7XHJcbiAgICBjb25zdCBrZXkgPSBlbnRyeS4ka2V5O1xyXG5cclxuICAgIC8vIENoZWNrIHRvIGVuc3VyZSB3ZSBoYXZlIGEgY29tcG9zaXRlIGtleSAobWVhbmluZyB3ZSBoYXZlIHRoZSBvY2N1cmFuY2UsIG5vdCB0aGUgbWFzdGVyKVxyXG4gICAgaWYgKHRoaXMuaXNBY3Rpdml0eVJlY3VycmluZyhlbnRyeSkgJiYga2V5LnNwbGl0KHRoaXMucmVjdXJyaW5nQWN0aXZpdHlJZFNlcGFyYXRvcilcclxuICAgICAgLmxlbmd0aCAhPT0gMikge1xyXG4gICAgICAvLyBGZXRjaCB0aGUgb2NjdXJhbmNlLCBhbmQgY29udGludWUgb24gdG8gdGhlIGNvbXBsZXRlIHNjcmVlblxyXG4gICAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhUmVzb3VyY2VDb2xsZWN0aW9uUmVxdWVzdCh0aGlzLmdldFNlcnZpY2UoKSlcclxuICAgICAgICAuc2V0UmVzb3VyY2VLaW5kKCdhY3Rpdml0aWVzJylcclxuICAgICAgICAuc2V0Q29udHJhY3ROYW1lKCdzeXN0ZW0nKVxyXG4gICAgICAgIC5zZXRRdWVyeUFyZygnd2hlcmUnLCBgaWQgZXEgJyR7a2V5fSdgKVxyXG4gICAgICAgIC5zZXRDb3VudCgxKTtcclxuXHJcbiAgICAgIHJlcXVlc3QucmVhZCh7XHJcbiAgICAgICAgc3VjY2VzczogdGhpcy5wcm9jZXNzT2NjdXJhbmNlLFxyXG4gICAgICAgIHNjb3BlOiB0aGlzLFxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubmF2aWdhdGVUb0NvbXBsZXRlVmlldyh0aGlzLmNvbXBsZXRlT2NjdXJyZW5jZVRleHQpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgcHJvY2Vzc09jY3VyYW5jZTogZnVuY3Rpb24gcHJvY2Vzc09jY3VyYW5jZShmZWVkKSB7XHJcbiAgICBpZiAoZmVlZCAmJiBmZWVkLiRyZXNvdXJjZXMgJiYgZmVlZC4kcmVzb3VyY2VzLmxlbmd0aCA+IDApIHtcclxuICAgICAgaWYgKHRoaXMuZW50cnkuTGVhZGVyKSB7XHJcbiAgICAgICAgZmVlZC4kcmVzb3VyY2VzWzBdLkxlYWRlciA9IHRoaXMuZW50cnkuTGVhZGVyO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZW50cnkgPSBmZWVkLiRyZXNvdXJjZXNbMF07XHJcbiAgICAgIHRoaXMubmF2aWdhdGVUb0NvbXBsZXRlVmlldyh0aGlzLmNvbXBsZXRlT2NjdXJyZW5jZVRleHQpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgY29tcGxldGVTZXJpZXM6IGZ1bmN0aW9uIGNvbXBsZXRlU2VyaWVzKCkge1xyXG4gICAgdGhpcy5uYXZpZ2F0ZVRvQ29tcGxldGVWaWV3KHRoaXMuY29tcGxldGVTZXJpZXNUZXh0LCB0cnVlKTtcclxuICB9LFxyXG4gIGlzQWN0aXZpdHlSZWN1cnJpbmc6IGZ1bmN0aW9uIGlzQWN0aXZpdHlSZWN1cnJpbmcoZW50cnkpIHtcclxuICAgIHJldHVybiBlbnRyeSAmJiAoZW50cnkuUmVjdXJyaW5nIHx8IGVudHJ5LlJlY3VycmVuY2VTdGF0ZSA9PT0gJ3JzdE9jY3VycmVuY2UnKTtcclxuICB9LFxyXG4gIGlzQWN0aXZpdHlSZWN1cnJpbmdTZXJpZXM6IGZ1bmN0aW9uIGlzQWN0aXZpdHlSZWN1cnJpbmdTZXJpZXMoZW50cnkpIHtcclxuICAgIHJldHVybiB0aGlzLmlzQWN0aXZpdHlSZWN1cnJpbmcoZW50cnkpICYmICFyZWN1ci5pc0FmdGVyQ29tcGxldGlvbihlbnRyeS5SZWN1clBlcmlvZCk7XHJcbiAgfSxcclxuICBpc0FjdGl2aXR5Rm9yTGVhZDogZnVuY3Rpb24gaXNBY3Rpdml0eUZvckxlYWQoZW50cnkpIHtcclxuICAgIHJldHVybiBlbnRyeSAmJiAvXltcXHddezEyfSQvLnRlc3QoZW50cnkuTGVhZElkKTtcclxuICB9LFxyXG4gIGlzQWN0aXZpdHlUaW1lbGVzczogZnVuY3Rpb24gaXNBY3Rpdml0eVRpbWVsZXNzKGVudHJ5KSB7XHJcbiAgICByZXR1cm4gZW50cnkgJiYgY29udmVydC50b0Jvb2xlYW4oZW50cnkuVGltZWxlc3MpO1xyXG4gIH0sXHJcbiAgZG9lc0FjdGl2aXR5SGF2ZVJlbWluZGVyOiBmdW5jdGlvbiBkb2VzQWN0aXZpdHlIYXZlUmVtaW5kZXIoZW50cnkpIHtcclxuICAgIHJldHVybiBjb252ZXJ0LnRvQm9vbGVhbihlbnRyeSAmJiBlbnRyeS5BbGFybSk7XHJcbiAgfSxcclxuICBjaGVja0NhbkNvbXBsZXRlOiBmdW5jdGlvbiBjaGVja0NhbkNvbXBsZXRlKGVudHJ5KSB7XHJcbiAgICByZXR1cm4gIShlbnRyeSAmJiAoZW50cnkuQWxsb3dDb21wbGV0ZSkpO1xyXG4gIH0sXHJcbiAgZm9ybWF0UGlja2xpc3Q6IGZ1bmN0aW9uIGZvcm1hdFBpY2tsaXN0KHByb3BlcnR5KSB7XHJcbiAgICByZXR1cm4gZm9ybWF0LnBpY2tsaXN0KHRoaXMuYXBwLnBpY2tsaXN0U2VydmljZSwgdGhpcy5fbW9kZWwsIHByb3BlcnR5KTtcclxuICB9LFxyXG4gIGZvcm1hdFJlbGF0ZWRRdWVyeTogZnVuY3Rpb24gZm9ybWF0UmVsYXRlZFF1ZXJ5KGVudHJ5LCBmbXQsIHByb3BlcnR5KSB7XHJcbiAgICBsZXQgdG9SZXR1cm47XHJcbiAgICBpZiAocHJvcGVydHkgPT09ICdhY3Rpdml0eUlkJykge1xyXG4gICAgICB0b1JldHVybiA9IHN0cmluZy5zdWJzdGl0dXRlKGZtdCwgW3V0aWxpdHkuZ2V0UmVhbEFjdGl2aXR5SWQoZW50cnkuJGtleSldKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHRoZVByb3BlcnR5ID0gcHJvcGVydHkgfHwgJyRrZXknO1xyXG4gICAgICB0b1JldHVybiA9IHN0cmluZy5zdWJzdGl0dXRlKGZtdCwgW3BsYXRmb3JtVXRpbGl0eS5nZXRWYWx1ZShlbnRyeSwgdGhlUHJvcGVydHksICcnKV0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvUmV0dXJuO1xyXG4gIH0sXHJcbiAgY3JlYXRlTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXlvdXQgfHwgKHRoaXMubGF5b3V0ID0gW3tcclxuICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgdGl0bGU6IHRoaXMuYWN0aW9uc1RleHQsXHJcbiAgICAgIGNsczogJ2FjdGlvbi1saXN0JyxcclxuICAgICAgbmFtZTogJ1F1aWNrQWN0aW9uc1NlY3Rpb24nLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBuYW1lOiAnQ29tcGxldGVBY3Rpdml0eUFjdGlvbicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuY29tcGxldGVBY3Rpdml0eVRleHQsXHJcbiAgICAgICAgaWNvbkNsYXNzOiAnY2hlY2tib3gnLFxyXG4gICAgICAgIGFjdGlvbjogJ2NvbXBsZXRlQWN0aXZpdHknLFxyXG4gICAgICAgIGRpc2FibGVkOiB0aGlzLmNoZWNrQ2FuQ29tcGxldGUuYmluZCh0aGlzKSxcclxuICAgICAgICBleGNsdWRlOiB0aGlzLmlzQWN0aXZpdHlSZWN1cnJpbmdTZXJpZXMuYmluZCh0aGlzKSxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIodmFsdWUpIHtcclxuICAgICAgICAgIC8vIElORk9SQ1JNLTE3MzQ3OiBUaGUgcHJvcGVydHkgYmluZGluZyBmb3IgRGVzY3JpcHRpb24gaXMgbm90IHVzZWQuXHJcbiAgICAgICAgICAvLyBIb3dldmVyLCBpZiBpdCBpcyBudWxsL2VtcHR5IGl0IHdpbGwgY2F1c2UgdGhlIGFjdGlvbiB0byBoaWRlLlxyXG4gICAgICAgICAgLy8gV2Ugd2lsbCB3b3JrIGFyb3VuZCB0aGlzIGJ5IHJldHVybmluZyBhIHRydXRoeSBzdHJpbmcuXHJcbiAgICAgICAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnICc7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnY29tcGxldGVPY2N1cnJlbmNlQWN0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1N0YXJ0RGF0ZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuY29tcGxldGVPY2N1cnJlbmNlVGV4dCxcclxuICAgICAgICBpY29uQ2xhc3M6ICdjaGVja2JveCcsXHJcbiAgICAgICAgYWN0aW9uOiAnY29tcGxldGVPY2N1cnJlbmNlJyxcclxuICAgICAgICBkaXNhYmxlZDogdGhpcy5jaGVja0NhbkNvbXBsZXRlLmJpbmQodGhpcyksXHJcbiAgICAgICAgcmVuZGVyZXI6IGZvcm1hdC5kYXRlLmJpbmREZWxlZ2F0ZSh0aGlzLCAoQXBwLmlzMjRIb3VyQ2xvY2soKSkgPyB0aGlzLnN0YXJ0RGF0ZUZvcm1hdFRleHQyNCA6IHRoaXMuc3RhcnREYXRlRm9ybWF0VGV4dCwgZmFsc2UpLFxyXG4gICAgICAgIGluY2x1ZGU6IHRoaXMuaXNBY3Rpdml0eVJlY3VycmluZ1Nlcmllcy5iaW5kKHRoaXMpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ2NvbXBsZXRlU2VyaWVzQWN0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5jb21wbGV0ZVNlcmllc1RleHQsXHJcbiAgICAgICAgaWNvbkNsYXNzOiAnY2hlY2tib3gnLFxyXG4gICAgICAgIGFjdGlvbjogJ2NvbXBsZXRlU2VyaWVzJyxcclxuICAgICAgICBkaXNhYmxlZDogdGhpcy5jaGVja0NhbkNvbXBsZXRlLmJpbmQodGhpcyksXHJcbiAgICAgICAgaW5jbHVkZTogdGhpcy5pc0FjdGl2aXR5UmVjdXJyaW5nU2VyaWVzLmJpbmQodGhpcyksXHJcbiAgICAgIH1dLFxyXG4gICAgfSwge1xyXG4gICAgICB0aXRsZTogdGhpcy5kZXRhaWxzVGV4dCxcclxuICAgICAgbmFtZTogJ0RldGFpbHNTZWN0aW9uJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbmFtZTogJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5yZWdhcmRpbmdUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmb3JtYXQucGlja2xpc3QodGhpcy5hcHAucGlja2xpc3RTZXJ2aWNlLCBudWxsLCBudWxsLCBnZXRQaWNrbGlzdEJ5QWN0aXZpdHlUeXBlKHRoaXMuZW50cnkuVHlwZSwgJ0Rlc2NyaXB0aW9uJykpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0xvbmdOb3RlcycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdMb25nTm90ZXMnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmxvbmdOb3Rlc1RleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQ29udGFjdE5hbWUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ29udGFjdE5hbWUnLFxyXG4gICAgICAgIGV4Y2x1ZGU6IHRoaXMuaXNBY3Rpdml0eUZvckxlYWQuYmluZCh0aGlzKSxcclxuICAgICAgICBsYWJlbDogdGhpcy5jb250YWN0VGV4dCxcclxuICAgICAgICB2aWV3OiAnY29udGFjdF9kZXRhaWwnLFxyXG4gICAgICAgIGtleTogJ0NvbnRhY3RJZCcsXHJcbiAgICAgICAgZGVzY3JpcHRvcjogJ0NvbnRhY3ROYW1lJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdQaG9uZU51bWJlcicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdQaG9uZU51bWJlcicsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucGhvbmVUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmb3JtYXQucGhvbmUuYmluZERlbGVnYXRlKHRoaXMsIHRydWUpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1R5cGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnVHlwZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMudHlwZVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IHRoaXMuZm9ybWF0QWN0aXZpdHlUeXBlLmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdDYXRlZ29yeScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdDYXRlZ29yeScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuY2F0ZWdvcnlUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmb3JtYXQucGlja2xpc3QodGhpcy5hcHAucGlja2xpc3RTZXJ2aWNlLCBudWxsLCBudWxsLCBnZXRQaWNrbGlzdEJ5QWN0aXZpdHlUeXBlKHRoaXMuZW50cnkuVHlwZSwgJ0NhdGVnb3J5JykpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0xvY2F0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0xvY2F0aW9uJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5sb2NhdGlvblRleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnUHJpb3JpdHknLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUHJpb3JpdHknLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnByaW9yaXR5VGV4dCxcclxuICAgICAgICByZW5kZXJlcjogdGhpcy5mb3JtYXRQaWNrbGlzdCgnUHJpb3JpdHknKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdMZWFkZXInLFxyXG4gICAgICAgIHByb3BlcnR5OiAnTGVhZGVyLlVzZXJJbmZvJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5sZWFkZXJUZXh0LFxyXG4gICAgICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZS5uYW1lTEYsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQWNjb3VudE5hbWUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQWNjb3VudE5hbWUnLFxyXG4gICAgICAgIGV4Y2x1ZGU6IHRoaXMuaXNBY3Rpdml0eUZvckxlYWQuYmluZCh0aGlzKSxcclxuICAgICAgICBsYWJlbDogdGhpcy5hY2NvdW50VGV4dCxcclxuICAgICAgICB2aWV3OiAnYWNjb3VudF9kZXRhaWwnLFxyXG4gICAgICAgIGtleTogJ0FjY291bnRJZCcsXHJcbiAgICAgICAgZGVzY3JpcHRvcjogJ0FjY291bnROYW1lJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdPcHBvcnR1bml0eU5hbWUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnT3Bwb3J0dW5pdHlOYW1lJyxcclxuICAgICAgICBleGNsdWRlOiB0aGlzLmlzQWN0aXZpdHlGb3JMZWFkLmJpbmQodGhpcyksXHJcbiAgICAgICAgbGFiZWw6IHRoaXMub3Bwb3J0dW5pdHlUZXh0LFxyXG4gICAgICAgIHZpZXc6ICdvcHBvcnR1bml0eV9kZXRhaWwnLFxyXG4gICAgICAgIGtleTogJ09wcG9ydHVuaXR5SWQnLFxyXG4gICAgICAgIGRlc2NyaXB0b3I6ICdPcHBvcnR1bml0eU5hbWUnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1RpY2tldE51bWJlcicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdUaWNrZXROdW1iZXInLFxyXG4gICAgICAgIGV4Y2x1ZGU6IHRoaXMuaXNBY3Rpdml0eUZvckxlYWQuYmluZCh0aGlzKSxcclxuICAgICAgICBsYWJlbDogdGhpcy50aWNrZXROdW1iZXJUZXh0LFxyXG4gICAgICAgIHZpZXc6ICd0aWNrZXRfZGV0YWlsJyxcclxuICAgICAgICBrZXk6ICdUaWNrZXRJZCcsXHJcbiAgICAgICAgZGVzY3JpcHRvcjogJ1RpY2tldE51bWJlcicsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnTGVhZE5hbWUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnTGVhZE5hbWUnLFxyXG4gICAgICAgIGluY2x1ZGU6IHRoaXMuaXNBY3Rpdml0eUZvckxlYWQuYmluZCh0aGlzKSxcclxuICAgICAgICBsYWJlbDogdGhpcy5sZWFkVGV4dCxcclxuICAgICAgICB2aWV3OiAnbGVhZF9kZXRhaWwnLFxyXG4gICAgICAgIGtleTogJ0xlYWRJZCcsXHJcbiAgICAgICAgZGVzY3JpcHRvcjogJ0xlYWROYW1lJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdBY2NvdW50TmFtZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdBY2NvdW50TmFtZScsXHJcbiAgICAgICAgaW5jbHVkZTogdGhpcy5pc0FjdGl2aXR5Rm9yTGVhZC5iaW5kKHRoaXMpLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmNvbXBhbnlUZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1N0YXJ0RGF0ZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdTdGFydERhdGUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnN0YXJ0VGltZVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZvcm1hdC5kYXRlLmJpbmREZWxlZ2F0ZSh0aGlzLCAoQXBwLmlzMjRIb3VyQ2xvY2soKSkgPyB0aGlzLnN0YXJ0RGF0ZUZvcm1hdFRleHQyNCA6IHRoaXMuc3RhcnREYXRlRm9ybWF0VGV4dCwgZmFsc2UpLFxyXG4gICAgICAgIGV4Y2x1ZGU6IHRoaXMuaXNBY3Rpdml0eVRpbWVsZXNzLmJpbmQodGhpcyksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnU3RhcnREYXRlVGltZWxlc3MnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU3RhcnREYXRlJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5hbGxEYXlUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmb3JtYXQuZGF0ZS5iaW5kRGVsZWdhdGUodGhpcywgdGhpcy50aW1lbGVzc0RhdGVGb3JtYXRUZXh0LCB0cnVlKSxcclxuICAgICAgICBpbmNsdWRlOiB0aGlzLmlzQWN0aXZpdHlUaW1lbGVzcy5iaW5kKHRoaXMpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1RpbWVsZXNzJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1RpbWVsZXNzJyxcclxuICAgICAgICBsYWJlbDogdGhpcy50aW1lbGVzc1RleHQsXHJcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxyXG4gICAgICAgIGluY2x1ZGU6IGZhbHNlLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0R1cmF0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0R1cmF0aW9uJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5kdXJhdGlvblRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZvcm1hdC50aW1lc3BhbixcclxuICAgICAgICBleGNsdWRlOiB0aGlzLmlzQWN0aXZpdHlUaW1lbGVzcy5iaW5kKHRoaXMpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0FsYXJtJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0FsYXJtJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5hbGFybVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZvcm1hdC55ZXNObyxcclxuICAgICAgICBleGNsdWRlOiB0aGlzLmRvZXNBY3Rpdml0eUhhdmVSZW1pbmRlci5iaW5kKHRoaXMpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0FsYXJtVGltZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdBbGFybVRpbWUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFsYXJtVGltZVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZvcm1hdC5kYXRlLmJpbmREZWxlZ2F0ZSh0aGlzLCAoQXBwLmlzMjRIb3VyQ2xvY2soKSkgPyB0aGlzLmFsYXJtRGF0ZUZvcm1hdFRleHQyNCA6IHRoaXMuYWxhcm1EYXRlRm9ybWF0VGV4dCwgbnVsbCwgdHJ1ZSksXHJcbiAgICAgICAgaW5jbHVkZTogdGhpcy5kb2VzQWN0aXZpdHlIYXZlUmVtaW5kZXIuYmluZCh0aGlzKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdSb2xsb3ZlcicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdSb2xsb3ZlcicsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucm9sbG92ZXJUZXh0LFxyXG4gICAgICAgIGluY2x1ZGU6IHRoaXMuaXNBY3Rpdml0eVRpbWVsZXNzLmJpbmQodGhpcyksXHJcbiAgICAgICAgcmVuZGVyZXI6IGZvcm1hdC55ZXNObyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdSZWN1cnJlbmNlVUknLFxyXG4gICAgICAgIHByb3BlcnR5OiAncmVjdXJyZW5jZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucmVjdXJyZW5jZVRleHQsXHJcbiAgICAgICAgaW5jbHVkZTogdGhpcy5pc0FjdGl2aXR5UmVjdXJyaW5nLmJpbmQodGhpcyksXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlclJlY3VycmVuY2UodmFsdWUpIHtcclxuICAgICAgICAgIHJldHVybiByZWN1ci50b1N0cmluZyh2YWx1ZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfV0sXHJcbiAgICB9LCB7XHJcbiAgICAgIHRpdGxlOiB0aGlzLnJlbGF0ZWRJdGVtc1RleHQsXHJcbiAgICAgIGxpc3Q6IHRydWUsXHJcbiAgICAgIG5hbWU6ICdSZWxhdGVkSXRlbXNTZWN0aW9uJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbmFtZTogJ0F0dGFjaG1lbnRSZWxhdGVkJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5yZWxhdGVkQXR0YWNobWVudFRleHQsXHJcbiAgICAgICAgd2hlcmU6IHRoaXMuZm9ybWF0UmVsYXRlZFF1ZXJ5LmJpbmREZWxlZ2F0ZSh0aGlzLCAnYWN0aXZpdHlJZCBlcSBcIiR7MH1cIicsICdhY3Rpdml0eUlkJyksIC8vIG11c3QgYmUgbG93ZXIgY2FzZSBiZWNhdXNlIG9mIGZlZWRcclxuICAgICAgICB2aWV3OiAnYWN0aXZpdHlfYXR0YWNobWVudF9yZWxhdGVkJyxcclxuICAgICAgICB0aXRsZTogdGhpcy5yZWxhdGVkQXR0YWNobWVudFRpdGxlVGV4dCxcclxuICAgICAgfV0sXHJcbiAgICB9XSk7XHJcbiAgfSxcclxuICBnZXRPZmZsaW5lSWNvbjogZnVuY3Rpb24gZ2V0T2ZmbGluZUljb24oKSB7XHJcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMuZ2V0TW9kZWwoKTtcclxuICAgIHJldHVybiBtb2RlbC5nZXRJY29uQ2xhc3ModGhpcy5lbnRyeSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=