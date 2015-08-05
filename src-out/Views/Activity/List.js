define('crm/Views/Activity/List', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/_base/connect', 'dojo/string', 'dojo/query', 'dojo/dom-class', '../_RightDrawerListMixin', 'argos/List', '../_CardLayoutListMixin', '../../Format', 'argos/Utility', 'argos/Convert', '../../Action', '../../Environment', 'argos/ErrorManager', 'moment'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojo_baseConnect, _dojoString, _dojoQuery, _dojoDomClass, _RightDrawerListMixin2, _argosList, _CardLayoutListMixin2, _Format, _argosUtility, _argosConvert, _Action, _Environment, _argosErrorManager, _moment) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _connect = _interopRequireDefault(_dojo_baseConnect);

  var _string = _interopRequireDefault(_dojoString);

  var _query = _interopRequireDefault(_dojoQuery);

  var _domClass = _interopRequireDefault(_dojoDomClass);

  var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

  var _List = _interopRequireDefault(_argosList);

  var _CardLayoutListMixin3 = _interopRequireDefault(_CardLayoutListMixin2);

  var _format = _interopRequireDefault(_Format);

  var _Utility = _interopRequireDefault(_argosUtility);

  var _convert = _interopRequireDefault(_argosConvert);

  var _action = _interopRequireDefault(_Action);

  var _environment = _interopRequireDefault(_Environment);

  var _ErrorManager = _interopRequireDefault(_argosErrorManager);

  var _moment2 = _interopRequireDefault(_moment);

  /**
   * @class crm.Views.Activity.List
   *
   * @extends argos.List
   * @mixins crm.Views._RightDrawerListMixin
   * @mixins crm.Views._CardLayoutListMixin
   *
   * @requires argos.List
   * @requires argos.Utility
   * @requires argos.Convert
   * @requires argos.ErrorManager
   * @requires crm.Action
   * @requires crm.Environment
   * @requires crm.Format
   * @requires crm.Views._CardLayoutListMixin
   * @requires crm.Views._RightDrawerListMixin
   *
   */
  var __class = (0, _declare['default'])('crm.Views.Activity.List', [_List['default'], _RightDrawerListMixin3['default'], _CardLayoutListMixin3['default']], {
    // Localization
    allDayText: 'Timeless',
    completeActivityText: 'Complete',
    callText: 'Call',
    calledText: 'Called',
    addAttachmentActionText: 'Add Attachment',
    overdueText: 'overdue',
    alarmText: 'alarm',
    touchedText: 'touched',
    importantText: 'important',
    recurringText: 'recurring',

    //Card View
    itemIcon: 'content/images/icons/man_1.png',

    //Templates
    //Card View
    itemRowContainerTemplate: new Simplate(['<li data-action="activateEntry" data-key="{%= $$.getItemActionKey($) %}" data-descriptor="{%: $$.getItemDescriptor($) %}" data-activity-type="{%: $.Type %}">', '{%! $$.itemRowContentTemplate %}', '</li>']),
    activityTimeTemplate: new Simplate(['{% if ($$.isTimelessToday($)) { %}', '{%: $$.allDayText %}', '{% } else { %}', '{%: crm.Format.relativeDate($.StartDate, argos.Convert.toBoolean($.Timeless)) %}', '{% } %}']),
    itemTemplate: new Simplate(['<h3>', '<span class="p-description">{%: $.Description %}</span>', '</h3>', '<h4>', '{%! $$.activityTimeTemplate %}', '</h4>', '<h4>{%! $$.nameTemplate %}</h4>']),
    nameTemplate: new Simplate(['{% if ($.ContactName) { %}', '{%: $.ContactName %} | {%: $.AccountName %}', '{% } else if ($.AccountName) { %}', '{%: $.AccountName %}', '{% } else { %}', '{%: $.LeadName %}', '{% } %}']),
    activityIndicatorIconByType: {
      'atToDo': 'fa fa-list-ul',
      'atPhoneCall': 'fa fa-phone',
      'atAppointment': 'fa fa-calendar-o',
      'atLiterature': 'fa fa-book',
      'atPersonal': 'fa fa-check-square-o',
      'atQuestion': 'fa fa-question-circle',
      'atNote': 'fa fa-file-text-o',
      'atEMail': 'fa fa-envelope'
    },
    activityTypeText: {
      'atToDo': 'To-Do',
      'atPhoneCall': 'Phone Call',
      'atAppointment': 'Meeting',
      'atLiterature': 'Lit Request',
      'atPersonal': 'Personal',
      'atQuestion': 'Question',
      'atNote': 'Note',
      'atEMail': 'Email'
    },
    //Localization
    titleText: 'Activities',

    //View Properties
    id: 'activity_list',
    security: null, //'Entities/Activity/View',
    iconClass: 'fa fa-check-square-o fa-lg',
    detailView: 'activity_detail',
    insertView: 'activity_types_list',
    historyEditView: 'history_edit',
    enableActions: true,
    queryOrderBy: 'StartDate desc',
    querySelect: ['Description', 'StartDate', 'Type', 'AccountId', 'AccountName', 'ContactId', 'ContactName', 'PhoneNumber', 'LeadId', 'LeadName', 'TicketId', 'OpportunityId', 'Leader', 'UserId', 'Timeless', 'Alarm', 'Priority', 'ModifyDate', 'RecurrenceState', 'Recurring'],
    queryInclude: ['$descriptors'],
    resourceKind: 'activities',
    contractName: 'system',
    pageSize: 105,

    hashTagQueries: {
      'alarm': 'Alarm eq true',
      'recurring': 'Recurring eq true',
      'timeless': 'Timeless eq true',
      'yesterday': function yesterday() {
        var now, yesterdayStart, yesterdayEnd, query;

        now = (0, _moment2['default'])();

        yesterdayStart = now.clone().subtract(1, 'days').startOf('day');
        yesterdayEnd = yesterdayStart.clone().endOf('day');

        query = _string['default'].substitute('((Timeless eq false and StartDate between @${0}@ and @${1}@) or (Timeless eq true and StartDate between @${2}@ and @${3}@))', [_convert['default'].toIsoStringFromDate(yesterdayStart.toDate()), _convert['default'].toIsoStringFromDate(yesterdayEnd.toDate()), yesterdayStart.format('YYYY-MM-DDT00:00:00[Z]'), yesterdayEnd.format('YYYY-MM-DDT23:59:59[Z]')]);
        return query;
      },
      'today': function today() {
        var now, todayStart, todayEnd, query;

        now = (0, _moment2['default'])();

        todayStart = now.clone().startOf('day');
        todayEnd = todayStart.clone().endOf('day');

        query = _string['default'].substitute('((Timeless eq false and StartDate between @${0}@ and @${1}@) or (Timeless eq true and StartDate between @${2}@ and @${3}@))', [_convert['default'].toIsoStringFromDate(todayStart.toDate()), _convert['default'].toIsoStringFromDate(todayEnd.toDate()), todayStart.format('YYYY-MM-DDT00:00:00[Z]'), todayEnd.format('YYYY-MM-DDT23:59:59[Z]')]);
        return query;
      },
      'this-week': function thisWeek() {
        var now, weekStartDate, weekEndDate, query;

        now = (0, _moment2['default'])();

        weekStartDate = now.clone().startOf('week');
        weekEndDate = weekStartDate.clone().endOf('week');

        query = _string['default'].substitute('((Timeless eq false and StartDate between @${0}@ and @${1}@) or (Timeless eq true and StartDate between @${2}@ and @${3}@))', [_convert['default'].toIsoStringFromDate(weekStartDate.toDate()), _convert['default'].toIsoStringFromDate(weekEndDate.toDate()), weekStartDate.format('YYYY-MM-DDT00:00:00[Z]'), weekEndDate.format('YYYY-MM-DDT23:59:59[Z]')]);
        return query;
      }
    },
    hashTagQueriesText: {
      'alarm': 'alarm',
      'recurring': 'recurring',
      'timeless': 'timeless',
      'today': 'today',
      'this-week': 'this-week',
      'yesterday': 'yesterday'
    },
    defaultSearchTerm: function defaultSearchTerm() {
      if (App.enableHashTags) {
        return '#' + this.hashTagQueriesText['this-week'];
      }

      return '';
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      return _string['default'].substitute('upper(Description) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
    },
    formatDateTime: function formatDateTime() {
      return 'StartTime';
    },
    getItemActionKey: function getItemActionKey(entry) {
      return entry.$key;
    },
    getItemDescriptor: function getItemDescriptor(entry) {
      return entry.$descriptor;
    },
    createIndicatorLayout: function createIndicatorLayout() {
      return this.itemIndicators || (this.itemIndicators = [{
        id: 'alarm',
        cls: 'fa fa-bell-o fa-lg',
        label: this.alarmText,
        onApply: function onApply(entry, parent) {
          this.isEnabled = parent.hasAlarm(entry);
        }
      }, {
        id: 'touched',
        cls: 'fa fa-hand-o-up fa-lg',
        label: this.touchedText,
        onApply: function onApply(entry, parent) {
          this.isEnabled = parent.hasBeenTouched(entry);
        }
      }, {
        id: 'important',
        cls: 'fa fa-exclamation fa-lg',
        label: this.importantText,
        onApply: function onApply(entry, parent) {
          this.isEnabled = parent.isImportant(entry);
        }
      }, {
        id: 'recurring',
        cls: 'fa fa-refresh fa-lg',
        label: this.recurringText,
        onApply: function onApply(entry, parent) {
          this.isEnabled = parent.isRecurring(entry, this);
        }
      }, {
        id: 'overdue',
        cls: 'fa fa-exclamation-circle fa-lg',
        label: this.overdueText,
        onApply: function onApply(entry, parent) {
          this.isEnabled = parent.isOverdue(entry);
        }
      }]);
    },
    hasBeenTouched: function hasBeenTouched(entry) {
      var modifiedDate, currentDate, weekAgo;
      if (entry['ModifyDate']) {
        modifiedDate = (0, _moment2['default'])(_convert['default'].toDateFromString(entry['ModifyDate']));
        currentDate = (0, _moment2['default'])().endOf('day');
        weekAgo = (0, _moment2['default'])().subtract(1, 'weeks');

        return modifiedDate.isAfter(weekAgo) && modifiedDate.isBefore(currentDate);
      }
      return false;
    },
    isImportant: function isImportant(entry) {
      if (entry['Priority']) {
        if (entry['Priority'] === 'High') {
          return true;
        }
      }
      return false;
    },
    isOverdue: function isOverdue(entry) {
      var startDate, currentDate, seconds, mins;
      if (entry['StartDate']) {
        startDate = _convert['default'].toDateFromString(entry['StartDate']);
        currentDate = new Date();
        seconds = Math.round((currentDate - startDate) / 1000);
        mins = seconds / 60;
        if (mins >= 1) {
          return true;
        }
      }
      return false;
    },
    isTimelessToday: function isTimelessToday(entry) {
      if (!entry || !entry.Timeless) {
        return false;
      }

      var start = (0, _moment2['default'])(entry.StartDate);
      return this._isTimelessToday(start);
    },
    _isTimelessToday: function _isTimelessToday(start) {
      // Start is UTC, convert it to local time so we can compare it against "now"
      start.add({
        minutes: start.zone()
      });
      return start.isAfter((0, _moment2['default'])().startOf('day')) && start.isBefore((0, _moment2['default'])().endOf('day'));
    },
    isRecurring: function isRecurring(entry) {
      if (entry['RecurrenceState']) {
        if (entry['RecurrenceState'] === 'rstOccurrence') {
          return true;
        }
      }
      return false;
    },
    hasAlarm: function hasAlarm(entry) {
      if (entry['Alarm'] === true) {
        return true;
      }
      return false;
    },
    getItemIconClass: function getItemIconClass(entry) {
      var type = entry && entry.Type;
      return this._getItemIconClass(type);
    },
    _getItemIconClass: function _getItemIconClass(type) {
      var cls = this.activityIndicatorIconByType[type];
      if (cls) {
        cls = cls + ' fa-2x';
      }

      return cls;
    },
    createActionLayout: function createActionLayout() {
      return this.actions || (this.actions = [{
        id: 'complete',
        cls: 'fa fa-check-square fa-2x',
        label: this.completeActivityText,
        enabled: function enabled(action, selection) {
          var recur,
              entry = selection && selection.data;
          if (!entry) {
            return false;
          }
          recur = false;
          if (entry['RecurrenceState'] === 'rstOccurrence') {
            recur = true;
          }

          return entry['Leader']['$key'] === App.context['user']['$key'] && !recur;
        },
        fn: (function (action, selection) {
          var entry;

          entry = selection && selection.data && selection.data;

          entry['CompletedDate'] = new Date();
          entry['Result'] = 'Complete';

          _environment['default'].refreshActivityLists();
          this.completeActivity(entry);
        }).bindDelegate(this)
      }, {
        id: 'call',
        cls: 'fa fa-phone-square fa-2x',
        label: this.callText,
        enabled: function enabled(action, selection) {
          var entry;
          entry = selection && selection.data;
          return entry && entry.PhoneNumber;
        },
        fn: (function (action, selection) {
          var entry, phone;
          entry = selection && selection.data;
          phone = entry && entry.PhoneNumber;
          if (phone) {
            this.recordCallToHistory((function () {
              App.initiateCall(phone);
            }).bindDelegate(this), entry);
          }
        }).bindDelegate(this)
      }, {
        id: 'addAttachment',
        cls: 'fa fa-paperclip fa-2x',
        label: this.addAttachmentActionText,
        fn: _action['default'].addAttachment.bindDelegate(this)
      }]);
    },
    recordCallToHistory: function recordCallToHistory(complete, entry) {
      var tempEntry = {
        '$name': 'History',
        'Type': 'atPhoneCall',
        'ContactName': entry['ContactName'],
        'ContactId': entry['ContactId'],
        'AccountName': entry['AccountName'],
        'AccountId': entry['AccountId'],
        'Description': _string['default'].substitute('${0} ${1}', [this.calledText, entry['ContactName'] || '']),
        'UserId': App.context && App.context.user['$key'],
        'UserName': App.context && App.context.user['UserName'],
        'Duration': 15,
        'CompletedDate': new Date()
      };

      this.navigateToHistoryInsert('atPhoneCall', tempEntry, complete);
    },
    navigateToHistoryInsert: function navigateToHistoryInsert(type, entry, complete) {
      var view = App.getView(this.historyEditView);
      if (view) {
        _environment['default'].refreshActivityLists();
        view.show({
          title: this.activityTypeText[type],
          template: {},
          entry: entry,
          insert: true
        }, {
          complete: complete
        });
      }
    },
    completeActivity: function completeActivity(entry) {
      var request, completeActivityEntry;

      completeActivityEntry = {
        '$name': 'ActivityComplete',
        'request': {
          'entity': {
            '$key': entry['$key']
          },
          'ActivityId': entry['$key'],
          'userId': entry['Leader']['$key'],
          'result': entry['Result'],
          'completeDate': entry['CompletedDate']
        }
      };

      request = new Sage.SData.Client.SDataServiceOperationRequest(this.getService()).setResourceKind('activities').setContractName('system').setOperationName('Complete');

      request.execute(completeActivityEntry, {
        success: function success() {
          _connect['default'].publish('/app/refresh', [{
            resourceKind: 'history'
          }]);

          this.clear();
          this.refresh();
        },
        failure: this.onRequestFailure,
        scope: this
      });
    },
    onRequestFailure: function onRequestFailure(response, o) {
      _ErrorManager['default'].addError(response, o, {}, 'failure');
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.Activity.List', __class);
  module.exports = __class;
});
