import declare from 'dojo/_base/declare';
import Deferred from 'dojo/Deferred';
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';
import ErrorManager from 'argos/ErrorManager';

const __class = declare('crm.Models.History.SData', [Base, _SDataModelBase], {
  id: 'history_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'CompletedDate desc',
      queryWhere: 'Type ne "atDatabaseChange"',
      querySelect: [
        'AccountName',
        'ContactName',
        'LeadName',
        'CompletedDate',
        'Description',
        'StartDate',
        'TimeLess',
        'Type',
        'LeadId',
        'OpportunityId',
        'OpportunityName',
        'AccountId',
        'ContactId',
        'TicketId',
        'ModifyDate',
        'Notes',
      ],
    }, {
      name: 'detail',
      querySelect: [
        'AccountId',
        'AccountName',
        'Category',
        'ModifyDate',
        'CompletedDate',
        'ContactId',
        'ContactName',
        'CompletedUser',
        'Description',
        'Duration',
        'Notes',
        'LongNotes',
        'OpportunityId',
        'OpportunityName',
        'Priority',
        'StartDate',
        'TicketId',
        'TicketNumber',
        'LeadId',
        'LeadName',
        'Timeless',
        'Type',
        'UserName',
        'UserId',
      ],
      queryInclude: [
        '$permissions',
      ],
    }];
  },
  requestCompletedUser: function requestCompletedUser(entry) {
    const def = new Deferred();
    const completedUser = entry.CompletedUser;

    if (completedUser) {
      const request = new Sage.SData.Client.SDataSingleResourceRequest(App.getService())
        .setContractName('dynamic')
        .setResourceKind('users')
        .setResourceSelector(`'${completedUser}'`)
        .setQueryArg('select', [
          'UserInfo/FirstName',
          'UserInfo/LastName',
        ].join(','));

      request.allowCacheUse = true;

      request.read({
        success: (data) => {
          def.resolve(data);
        },
        failure: (response, o) => {
          ErrorManager.addError(response, o, {}, 'failure');
          def.reject(response);
        },
      });
    } else {
      def.resolve(false);
    }

    return def.promise;
  },
  getEntry: function getEntry() {
    const results$ = this.inherited(arguments);
    return results$.then((entry) => {
      return this.requestCompletedUser(entry).then((user) => {
        if (user) {
          entry.CompletedUser = user;
        }

        return entry;
      });
    });
  },
});

Manager.register(MODEL_NAMES.HISTORY, MODEL_TYPES.SDATA, __class);
export default __class;
