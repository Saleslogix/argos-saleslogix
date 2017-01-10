import declare from 'dojo/_base/declare';
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Models.Integration.SData', [Base, _SDataModelBase], {
  id: 'integration_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryWhere: 'Enabled eq true',
      querySelect: [
        'Name',
        'Enabled',
        'Version',
      ],
    }];
  },
});

Manager.register(MODEL_NAMES.INTEGRATION, MODEL_TYPES.SDATA, __class);
export default __class;
