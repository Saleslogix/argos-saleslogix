import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Integrations.BOE.Models.BackOfficeAccountingEntity.SData', [Base, _SDataModelBase], {
  id: 'backofficeaccountingentity_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'Name',
      querySelect: [
        'Name',
        'AcctEntityExtId',
      ],
    }, {
      name: 'detail',
      querySelect: [
        'Name',
        'AcctEntityExtId',
        'BackOffice/*',
      ],
      queryInclude: [
        '$permissions',
      ],
    }];
  },
});

Manager.register(MODEL_NAMES.BACKOFFICEACCOUNTINGENTITY, MODEL_TYPES.SDATA, __class);
lang.setObject('icboe.Models.BackOfficeAccountingEntity.SData', __class);
export default __class;
