import declare from 'dojo/_base/declare';
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('icboe.Models.ErpAccountPerson.SData', [Base, _SDataModelBase], {
  id: 'erpaccountperson_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'CreateDate desc',
      querySelect: [
        'ErpPerson/Name',
        'ErpPerson/Address/FullAddress',
        'CreateDate',
      ],
    },
    ];
  },
});

Manager.register(MODEL_NAMES.ERPACCOUNTPERSON, MODEL_TYPES.SDATA, __class);
export default __class;
