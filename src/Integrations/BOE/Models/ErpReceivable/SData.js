import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Integrations.BOE.Models.ErpReceivable.SData', [Base, _SDataModelBase], {
  id: 'erpreceivable_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'ErpDocumentDate desc, CreateDate desc',
      querySelect: [
        'ErpExtId',
        'Account/AccountName',
        'ErpInvoice/InvoiceNumber',
        'ReceivableAmount',
        'ReceivedAmount',
        'ReceivableBaseAmount',
        'ReceivedBaseAmount',
        'ErpStatus',
        'ErpStatusDate',
        'CreateDate',
        'CurrencyCode',
        'BaseCurrencyCode',
        'ErpDocumentDate',
      ],
    }, {
      name: 'detail',
      querySelect: [
        'ErpExtId',
        'Account/AccountName',
        'ErpInvoiceNumber',
        'ReceivableAmount',
        'ReceivedAmount',
        'ReceivableBaseAmount',
        'ReceivedBaseAmount',
        'ErpStatus',
        'ErpStatusDate',
        'ErpPaymentTermId',
        'ErpBillTo/Name',
        'ErpBillTo/Address/*',
        'ErpShipTo/Name',
        'ErpShipTo/Address/*',
        'ErpPayFrom/Address/*',
        'ErpInvoice/*',
        'CreateDate',
        'CurrencyCode',
        'ErpDocumentDate',
        'BaseCurrencyCode',
      ],
      queryInclude: [
        '$permissions',
      ],
    },
    ];
  },
});

Manager.register(MODEL_NAMES.ERPRECEIVABLE, MODEL_TYPES.SDATA, __class);
lang.setObject('icboe.Models.ErpReceivable.SData', __class);
export default __class;
