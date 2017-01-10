import declare from 'dojo/_base/declare';
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Models.Address.SData', [Base, _SDataModelBase], {
  id: 'address_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      querySelect: [],
    }, {
      name: 'detail',
      querySelect: [],
    }];
  },
});

Manager.register(MODEL_NAMES.ADDRESS, MODEL_TYPES.SDATA, __class);
export default __class;
