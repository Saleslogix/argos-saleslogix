import declare from 'dojo/_base/declare';
import string from 'dojo/string';
import all from 'dojo/promise/all';
import Deferred from 'dojo/Deferred';
import _ModelBase from 'argos/_ModelBase';
import _SDataModelMixin from 'argos/_SDataModelMixin';
import ErrorManager from 'argos/ErrorManager';

export default declare('crm.Models.Activity', [_ModelBase, _SDataModelMixin], {
  entityName: 'Activity',
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
});
