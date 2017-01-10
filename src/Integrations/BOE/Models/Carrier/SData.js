import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Integrations.BOE.Models.Carrier.SData', [Base, _SDataModelBase], {
  id: 'carrier_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'CarrierName',
      querySelect: [
        'CarrierName',
        'ErpLogicalId',
      ],
    }, {
      name: 'detail',
      querySelect: [
        'CarrierName',
        'ErpLogicalId',
      ],
      queryInclude: [
        '$permissions',
      ],
    }];
  },
});

Manager.register(MODEL_NAMES.CARRIER, MODEL_TYPES.SDATA, __class);
lang.setObject('icboe.Models.Carrier.SData', __class);
export default __class;
