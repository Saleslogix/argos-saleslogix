import declare from 'dojo/_base/declare';
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('icboe.Models.ErpInvoiceItem.SData', [Base, _SDataModelBase], {
  id: 'erpinvoiceitem_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'ErpLineNumber',
      querySelect: [
        'ErpLineNumber',
        'ErpLineTotalAmount',
        'Quantity',
        'Price',
        'ProductName',
        'Description',
        'ErpInvoice/CurrencyCode',
        'ErpInvoice/InvoiceNumber',
      ],
    }, {
      name: 'detail',
      querySelect: [
        'ErpLineNumber',
        'ExtendedPrice',
        'ExtendedCost',
        'ErpLineTotalAmount',
        'ErpInvoice/InvoiceNumber',
        'SalesOrder/SalesOrderNumber',
        'UnitOfMeasure/Name',
        'ErpRequestedDeliveryDate',
        'Quantity',
        'Price',
        'ProductName',
        'Description',
        'BaseUnitPrice',
        'SalesOrderLineReference',
        'ErpUnitPricePerQuanity',
        'ErpUnitPricePerQuanityUOM',
        'ErpInvoice/CurrencyCode',
      ],
    },
    ];
  },
});

Manager.register(MODEL_NAMES.ERPINVOICEITEM, MODEL_TYPES.SDATA, __class);
export default __class;
