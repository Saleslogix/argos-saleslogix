import declare from 'dojo/_base/declare';
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('icboe.Models.ErpShipmentItem.SData', [Base, _SDataModelBase], {
  id: 'erpshipmentitem_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'CreateDate desc',
      querySelect: [
        'ErpLineNumber',
        'ErpShipment/ErpExtId',
        'ProductName',
        'ErpShippedQuantity',
        'ErpShippedUOM',
        'SalesOrder/SalesOrderNumber',
      ],
    }, {
      name: 'detail',
      querySelect: [
        'Description',
        'ErpLineNumber',
        'ErpShipment/ErpExtId',
        'SalesOrder/SalesOrderNumber',
        'ProductName',
        'ErpShippedQuantity',
        'ErpOrderQuantity',
        'ErpBackOrderedQuantity',
        'ErpBackOrderedUOM',
        'ErpShippedUOM',
        'ErpUPCId',
        'ErpOrderUOM',
      ],
    },
    ];
  },
});

Manager.register(MODEL_NAMES.ERPSHIPMENTITEM, MODEL_TYPES.SDATA, __class);
export default __class;
