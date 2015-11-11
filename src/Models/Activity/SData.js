import declare from 'dojo/_base/declare';
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import string from 'dojo/string';
import all from 'dojo/promise/all';
import Deferred from 'dojo/Deferred';
import ErrorManager from 'argos/ErrorManager';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Models.Activity.SData', [Base, _SDataModelBase], {
  createQueryModels: function createQueryModels() {
    return [{
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
    return results$.then((entry) => {
      const leader$ = this.createRequestPromise(entry.Leader.$key, [
          'UserInfo/FirstName',
          'UserInfo/LastName',
      ], 'users', 'dynamic', options);
      const queryModel = this._getQueryModelByName('detail');
      const recurrence$ = this.createRequestPromise(entry.$key.split(this.recurringActivityIdSeparator).shift(),
        queryModel.querySelect,
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
  completeActivity: function completeActivity(entry) {
    const completeActivityEntry = {
      '$name': 'ActivityComplete',
      'request': {
        'entity': {
          '$key': entry.$key,
        },
        'ActivityId': entry.$key,
        'userId': entry.Leader.$key,
        'result': entry.Result,
        'completeDate': entry.CompletedDate,
      },
    };

    const request = new Sage.SData.Client.SDataServiceOperationRequest(App.getService())
      .setResourceKind(this.resourceKind)
      .setContractName(this.contractName)
      .setOperationName('Complete');
    const def = new Deferred();

    request.execute(completeActivityEntry, {
      success: function success() { // Can we get back the history to add to the Offline?
        const oModel = App.ModelManager.getModel(this.modelName, MODEL_TYPES.OFFLINE);
        if (oModel) {
          try {
            oModel.deleteEntry(entry.$key);
            // Todo add observable or event to remove delete items out of brifecase and recently viewed areas.
            const rvModel = App.ModelManager.getModel('RecentlyViewed', MODEL_TYPES.OFFLINE);
            const bcModel = App.ModelManager.getModel('Briefcase', MODEL_TYPES.OFFLINE);
            if (rvModel) {
              rvModel.deleteEntryByEntityContext(entry.$key, this.entityName);
            }
            if (bcModel) {
              bcModel.deleteEntryByEntityContext(entry.$key, this.entityName);
            }
          } catch(err) {
            console.log(err); // eslint-disable-line
          }
        }

        def.resolve();
      },
      failure: function failure(err) {
        def.reject(err);
      },
      scope: this,
    });
    return def.promise;
  },
});

Manager.register(MODEL_NAMES.ACTIVITY, MODEL_TYPES.SDATA, __class);
export default __class;
