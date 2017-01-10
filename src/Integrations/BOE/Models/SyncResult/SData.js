import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Integrations.BOE.Models.SyncResult.SData', [Base, _SDataModelBase], {
  id: 'syncresult_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'ModifyDate',
      querySelect: [
        'EntityId',
        'EntityType',
        'HttpStatus',
        'RunName',
        'User/UserName',
        'SyncedTo/Name',
        'SyncedFrom/Name',
        'ErrorMessage',
        'Stamp',
      ],
    }, {
      name: 'detail',
      querySelect: [
        'EntityId',
        'EntityType',
        'HttpStatus',
        'RunName',
        'User/UserName',
        'SyncedTo/Name',
        'SyncedFrom/Name',
        'ErrorMessage',
        'Stamp',
      ],
      queryInclude: [
        '$permissions',
      ],
    },
    ];
  },
});

Manager.register(MODEL_NAMES.SYNCRESULT, MODEL_TYPES.SDATA, __class);
lang.setObject('icboe.Models.SyncResult.SData', __class);
export default __class;
