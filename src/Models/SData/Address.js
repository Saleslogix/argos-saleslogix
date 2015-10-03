import declare from 'dojo/_base/declare';
import AddressBase from '../AddressBase';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Models.SData.Address', [AddressBase, _SDataModelBase], {
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

Manager.register('Address', MODEL_TYPES.SDATA, __class);
export default __class;
