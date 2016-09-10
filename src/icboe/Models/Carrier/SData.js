import declare from 'dojo/_base/declare';
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('icboe.Models.Carrier.SData', [Base, _SDataModelBase], {
  id: 'carrier_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'CarrierName',
      querySelect: [
        'CarrierName',
        'ErpLogicalId',
      ],
    }];
  },
});

Manager.register(MODEL_NAMES.CARRIER, MODEL_TYPES.SDATA, __class);
export default __class;
