import declare from 'dojo/_base/declare';
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('icboe.Models.ErpInvoice.SData', [Base, _SDataModelBase], {
  id: 'erpinvoice_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'ErpStatusDate desc',
      querySelect: [
        'InvoiceNumber',
        'Account/AccountName',
        'ERPShipTo/BuyerContact/NameLF',
        'ERPShipTo/BuyerContact/Email',
        'ERPShipTo/BuyerContact/Mobile',
        'ERPShipTo/BuyerContact/HomePhone',
        'ERPShipTo/BuyerContact/FirstName',
        'ERPShipTo/BuyerContact/LastName',
        'ERPShipTo/BuyerContact/MiddleName',
        'ErpStatusDate',
        'ModifyDate',
        'ErpStatus',
        'ErpPaymentTermId',
        'ErpTotalBaseAmount',
        'GrandTotal',
        'CurrencyCode',
        'ErpExtendedBaseAmount',
        'ErpExtendedAmount',
        'BaseCurrencyCode',
        'Owner/OwnerDescription',
        'ErpDocumentDate',
      ],
    }, {
      name: 'detail',
      querySelect: [
        'InvoiceNumber',
        'Account/AccountName',
        'GrandTotal',
        'ErpTotalBaseAmount',
        'CurrencyCode',
        'ErpExtendedBaseAmount',
        'ErpExtendedAmount',
        'BaseCurrencyCode',
        'Description',
        'ErpStatus',
        'ErpStatusDate',
        'ErpDocumentDate',
        'ErpPaymentTermId',
        'Owner/OwnerDescription',
        'ErpBillTo/Name',
        'ErpBillTo/MainPhone',
        'ErpBillTo/Address/*',
        'ErpShipTo/Name',
        'ErpShipTo/MainPhone',
        'ErpShipTo/Address/*',
      ],
    },
    ];
  },
});

Manager.register(MODEL_NAMES.ERPINVOICE, MODEL_TYPES.SDATA, __class);
export default __class;
