import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Integrations.BOE.Models.ErpReceivableItem.SData', [Base, _SDataModelBase], {
  id: 'erpreceivableitem_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'CreateDate desc',
      querySelect: [
        'ErpLineNumber',
        'ErpReceivable/ErpExtId',
        'ErpInvoice/ErpExtId',
        'ProductName',
        'ErpLineTotalAmount',
        'CreateDate',
        'ErpReceivable/CurrencyCode',
      ],
    }, {
      name: 'detail',
      querySelect: [
        'ErpLineNumber',
        'ErpReceivable/ErpExtId',
        'ErpInvoice/ErpExtId',
        'Product/Name',
        'Product/Description',
        'ExtendedPrice',
        'ErpLineTotalAmount',
        'CreateDate',
        'ErpReceivable/CurrencyCode',
      ],
      queryInclude: [
        '$permissions',
      ],
    },
    ];
  },
});

Manager.register(MODEL_NAMES.ERPRECEIVABLEITEM, MODEL_TYPES.SDATA, __class);
lang.setObject('icboe.Models.ErpReceivableItem.SData', __class);
export default __class;
