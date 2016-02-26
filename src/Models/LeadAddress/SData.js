import declare from 'dojo/_base/declare';
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPE from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Models.LeadAddress.SData', [Base, _SDataModelBase], {
  id: 'leadaddress_sdata_model',
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

Manager.register(MODEL_NAMES.LEADADDRESS, MODEL_TYPE.SDATA, __class);
export default __class;
