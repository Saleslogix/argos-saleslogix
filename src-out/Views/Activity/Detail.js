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

  const resource = (0, _I18n2.default)('activityDetail');
  const dtFormatResource = (0, _I18n2.default)('activityDetailDateTimeFormat');

  const __class = (0, _declare2.default)('crm.Views.Activity.Detail', [_Detail2.default], {
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
    relatedAttendeeText: resource.relatedAttendeeText,
    relatedAttendeeTitleText: resource.relatedAttendeeTitleText,
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
            this.getOccurance(this.entry).then(occurance => {
              if (occurance) {
                if (this.entry.Leader) {
                  occurance.Leader = this.entry.Leader;
                }
                this.onEditActivity(occurance);
              }
            });
          }
        }
      }
    },
    getOccurance: function getOccurance(entry) {
      const def = new _Deferred2.default();
      const key = entry.$key;
      // Check to ensure we have a composite key (meaning we have the occurance, not the master)
      if (this.isActivityRecurring(entry) && key.split(this.recurringActivityIdSeparator).length !== 2) {
        // Fetch the occurance, and continue on to the complete screen
        const request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService()).setResourceKind('activities').setContractName('system').setQueryArg('where', `id eq '${key}'`).setCount(1);

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
      const view = App.getView(this.editView);
      if (view) {
        view.show({
          entry
        });
      }
    },
    navigateToCompleteView: function navigateToCompleteView(completionTitle, isSeries) {
      const view = App.getView(this.completeView);

      if (view) {
        _Environment2.default.refreshActivityLists();
        const options = {
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
      const entry = this.entry;
      const key = entry.$key;

      // Check to ensure we have a composite key (meaning we have the occurance, not the master)
      if (this.isActivityRecurring(entry) && key.split(this.recurringActivityIdSeparator).length !== 2) {
        // Fetch the occurance, and continue on to the complete screen
        const request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService()).setResourceKind('activities').setContractName('system').setQueryArg('where', `id eq '${key}'`).setCount(1);

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
      let toReturn;
      if (property === 'activityId') {
        toReturn = _string2.default.substitute(fmt, [_Utility4.default.getRealActivityId(entry.$key)]);
      } else {
        const theProperty = property || '$key';
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
          include: function includeContactName(entry) {
            // Only show contact if we have a different lead and contact name
            if (entry.ContactName === entry.LeadName) {
              return false;
            }

            return true;
          },
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
          name: 'AttendeeRelated',
          label: this.relatedAttendeeText,
          where: this.formatRelatedQuery.bindDelegate(this, 'Activity.Id eq "${0}"', 'activityId'), // must be lower case because of feed
          view: 'activity_attendee_related',
          title: this.relatedAttendeeTitleText
        }, {
          name: 'AttachmentRelated',
          label: this.relatedAttachmentText,
          where: this.formatRelatedQuery.bindDelegate(this, 'activityId eq "${0}"', 'activityId'), // must be lower case because of feed
          view: 'activity_attachment_related',
          title: this.relatedAttachmentTitleText
        }]
      }]);
    },
    getOfflineIcon: function getOfflineIcon() {
      const model = this.getModel();
      return model.getIconClass(this.entry);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});