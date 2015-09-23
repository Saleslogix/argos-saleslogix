import declare from 'dojo/_base/declare';
import string from 'dojo/string';
import all from 'dojo/promise/all';
import Deferred from 'dojo/Deferred';
import _ModelBase from 'argos/Models/_ModelBase';
import _SDataModelMixin from 'argos/Models/_SDataModelMixin';
import ErrorManager from 'argos/ErrorManager';
import convert from 'argos/Convert';
import Manager from 'argos/Models/Manager';
import MODEL_TYPE from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Models.SData.Activity', [_ModelBase, _SDataModelMixin], {
  entityName: 'Activity',
  entityDisplayName: 'Activity',
  entityDisplayNamePlural: 'Activities',
  iconClass: 'fa fa-list-ul fa-2x',
  resourceKind: 'activities',
  contractName: 'system',
  recurringActivityIdSeparator: ';',
  activityIndicatorIconByType: {
    'atToDo': 'fa fa-list-ul',
    'atPhoneCall': 'fa fa-phone',
    'atAppointment': 'fa fa-calendar-o',
    'atLiterature': 'fa fa-book',
    'atPersonal': 'fa fa-check-square-o',
    'atQuestion': 'fa fa-question-circle',
    'atNote': 'fa fa-file-text-o',
    'atEMail': 'fa fa-envelope',
  },
  activityTypeText: {
    'atToDo': 'To-Do',
    'atPhoneCall': 'Phone Call',
    'atAppointment': 'Meeting',
    'atLiterature': 'Lit Request',
    'atPersonal': 'Personal',
    'atQuestion': 'Question',
    'atNote': 'Note',
    'atEMail': 'Email',
  },
  createLayout: function createLayout() {
    return [{
      name: 'myday',
      queryWhere: function queryWhere() {
        const now = moment();
        const todayStart = now.clone().startOf('day');
        const todayEnd = todayStart.clone().endOf('day');

        const theQuery = string.substitute(
          '((Activity.Timeless eq false and Activity.StartDate between @${0}@ and @${1}@) or (Activity.Timeless eq true and Activity.StartDate between @${2}@ and @${3}@))', [
            convert.toIsoStringFromDate(todayStart.toDate()),
            convert.toIsoStringFromDate(todayEnd.toDate()),
            todayStart.format('YYYY-MM-DDT00:00:00[Z]'),
            todayEnd.format('YYYY-MM-DDT23:59:59[Z]'),
          ]
        );
        const userQuery = string.substitute('(User.Id eq "${0}" and Status ne "asDeclned" and Activity.Type ne "atLiterature")', [App.context.user.$key]);

        return [userQuery, theQuery].join(' and ');
      },
      queryOrderBy: 'Activity.StartDate desc',
      querySelect: [
        'Alarm',
        'AlarmTime',
        'Status',
        'Activity/Description',
        'Activity/StartDate',
        'Activity/EndDate',
        'Activity/Type',
        'Activity/AccountName',
        'Activity/AccountId',
        'Activity/ContactId',
        'Activity/ContactName',
        'Activity/Leader',
        'Activity/LeadName',
        'Activity/LeadId',
        'Activity/OpportunityId',
        'Activity/TicketId',
        'Activity/UserId',
        'Activity/Timeless',
        'Activity/PhoneNumber',
        'Activity/Recurring',
        'Activity/Alarm',
        'Activity/ModifyDate',
        'Activity/Priority',
      ],
      resourceKind: 'userActivities',
    }, {
      name: 'list',
      queryOrderBy: 'StartDate desc',
      querySelect: [
        'Description',
        'StartDate',
        'Type',
        'AccountId',
        'AccountName',
        'ContactId',
        'ContactName',
        'PhoneNumber',
        'LeadId',
        'LeadName',
        'TicketId',
        'OpportunityId',
        'Leader',
        'UserId',
        'Timeless',
        'Alarm',
        'Priority',
        'ModifyDate',
        'RecurrenceState',
        'Recurring',
      ],
      queryInclude: [
        '$descriptors',
      ],
      resourceKind: 'activities',
      contractName: 'system',
    }, {
      name: 'detail',
      querySelect: [
        'AccountId',
        'AccountName',
        'Alarm',
        'AlarmTime',
        'Category',
        'Company',
        'ContactId',
        'ContactName',
        'Description',
        'Duration',
        'Leader/$key',
        'LeadId',
        'LeadName',
        'Location',
        'LongNotes',
        'OpportunityId',
        'OpportunityName',
        'PhoneNumber',
        'Priority',
        'Rollover',
        'StartDate',
        'EndDate',
        'TicketId',
        'TicketNumber',
        'Timeless',
        'Type',
        'Recurring',
        'RecurPeriod',
        'RecurPeriodSpec',
        'RecurIterations',
        'RecurrenceState',
        'AllowAdd',
        'AllowEdit',
        'AllowDelete',
        'AllowComplete',
      ],
    }, {
      name: 'edit',
    }];
  },
  createRequestPromise: function createRequestPromise(key, querySelect, resourceKind, contractName, options) {
    const request = new Sage.SData.Client.SDataSingleResourceRequest(App.getService())
      .setResourceKind(resourceKind)
      .setResourceSelector(string.substitute("'${0}'", [key]))
      .setContractName(contractName)
      .setQueryArg('select', querySelect.join(','));
    const def = new Deferred();

    request.read({
      success: (data) => {
        def.resolve(data);
      },
      failure: (response, o) => {
        ErrorManager.addError(response, o, options, 'failure');
        def.reject(response);
      },
    });
    return def.promise;
  },
  getEntry: function getEntry(options) {
    const results$ = this.inherited(arguments);
    const layout = this._getLayoutByName('detail');
    return results$.then((entry) => {
      const leader$ = this.createRequestPromise(entry.Leader.$key, [
          'UserInfo/FirstName',
          'UserInfo/LastName',
      ], 'users', 'dynamic', options);
      const recurrence$ = this.createRequestPromise(entry.$key.split(this.recurringActivityIdSeparator).shift(),
        layout.querySelect,
        this.resourceKind,
        this.contractName,
        options);

      return all([leader$, recurrence$])
        .then(([leader, recurrence]) => {
          entry.Leader = leader;
          entry.recurrence = recurrence;
          return entry;
        });
    });
  },
  getMyDayQuery: function getMyDayQuery() {
    const layout = this._getLayoutByName('myday');
    return layout && layout.queryWhere();
  },
  getMyDayEntries: function getEntries(query, options) { // eslint-disable-line
    const store = this.createStore('myday');
    return store.query(this.buildQueryExpression(query, options), this.getOptions(options));
  },
  getIconClass: function getIconClass(entry) {
    let cls = this.iconClass;
    if (entry && entry.Type) {
      cls = this.activityIndicatorIconByType[entry.Type];
      if (cls) {
        cls = cls + ' fa-2x';
      }
    }
    return cls;
  },
  getTypeText: function getTypeText(entry) {
    let name = '';
    if (entry && entry.Type) {
      name = this.activityTypeText[entry.Type];
    }
    return name;
  },
});

Manager.register(MODEL_NAMES.ACTIVITY, MODEL_TYPE.SDATA, __class);
export default __class;
