import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Integrations.BOE.Models.OperatingCompany.SData', [Base, _SDataModelBase], {
  id: 'operatingcompany_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'Name',
      querySelect: [
        'EndPointURL',
        'Name',
      ],
    }, {
      name: 'detail',
      querySelect: [
        'EndPointURL',
        'Name',
      ],
      queryInclude: [
        '$permissions',
      ],
    }];
  },
});

Manager.register(MODEL_NAMES.OPERATINGCOMPANY, MODEL_TYPES.SDATA, __class);
lang.setObject('icboe.Models.OperatingCompany.SData', __class);
export default __class;
