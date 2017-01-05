import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Integrations.BOE.Models.ErpShipToAccount.SData', [Base, _SDataModelBase], {
  id: 'erpshiptoaccount_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'CreateDate desc',
      querySelect: [
        'ErpShipTo/Name',
        'ErpShipTo/Address/FullAddress',
        'CreateDate',
      ],
    }, {
      name: 'detail',
      querySelect: [
        'ErpShipTo/Name',
        'ErpShipTo/Address/*',
        'ErpShipTo/ErpStatus',
        'ErpShipTo/MainPhone',
        'ErpShipTo/Fax',
        'ErpShipTo/Email',
        'ErpShipTo/PaymentTermId',
        'ErpShipTo/CarrierName',
      ],
      queryInclude: [
        '$permissions',
      ],
    },
    ];
  },
});

Manager.register(MODEL_NAMES.ERPSHIPTOACCOUNT, MODEL_TYPES.SDATA, __class);
lang.setObject('icboe.Models.ErpShipToAccount.SData', __class);
export default __class;
