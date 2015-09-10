import declare from 'dojo/_base/declare';
import string from 'dojo/string';
import all from 'dojo/promise/all';
import Deferred from 'dojo/Deferred';
import _ModelBase from 'argos/Models/_ModelBase';
import _SDataModelMixin from 'argos/Models/_SDataModelMixin';
import ErrorManager from 'argos/ErrorManager';

export default declare('crm.Models.SData.Activity', [_ModelBase, _SDataModelMixin], {
  entityName: 'Activity',
  entityDisplayName: 'Activity',
  entityDisplayNamePlural: 'Activities',
  iconClass: 'fa fa-list-ul fa-2x',
  resourceKind: 'activities',
  security: 'Entities/Activity/View',
  contractName: 'system',
  recurringActivityIdSeparator: ';',
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
    return results$.then((entry) => {
      const leader$ = this.createRequestPromise(entry.Leader.$key, [
          'UserInfo/FirstName',
          'UserInfo/LastName',
      ], 'users', 'dynamic', options);
      const recurrence$ = this.createRequestPromise(entry.$key.split(this.recurringActivityIdSeparator).shift(),
        this.querySelect,
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
