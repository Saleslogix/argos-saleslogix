import declare from 'dojo/_base/declare';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPE from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Models.SData.Address', [_SDataModelBase], {
  resourceKind: 'addresses',
  entityName: 'Address',
  entityDisplayName: 'Address',
  entityDisplayNamePlural: 'Addresses',
  modelName: 'Address',
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

Manager.register('Address', MODEL_TYPE.SDATA, __class);
export default __class;
