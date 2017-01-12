import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Integrations.BOE.Models.ErpShipment.SData', [Base, _SDataModelBase], {
  id: 'erpshipment_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'ErpDocumentDate desc, CreateDate desc',
      querySelect: [
        'ErpExtId',
        'ErpShipTo/Name',
        'ErpStatus',
        'ErpCarrierParty',
        'ErpDeclaredValue',
        'DatePromised',
        'ErpActualShipDate',
        'ErpActualDeliveryDate',
        'ErpPartialShipAllowed',
        'Account/AccountName',
        'CreateDate',
        'ShipmentTotalBaseAmount',
        'ShipmentTotalAmount',
        'BaseCurrencyCode',
        'CurrencyCode',
        'ErpDocumentDate',
      ],
    }, {
      name: 'detail',
      querySelect: [
        'ErpExtId',
        'Account/AccountName',
        'DatePromised',
        'ErpActualShipDate',
        'ErpActualDeliveryDate',
        'ErpCarrierParty',
        'ErpStatus',
        'ErpStatusDate',
        'ErpDocumentDate',
        'SlxLocation/Name',
        'ErpPartialShipAllowed',
        'ErpGrossWeight',
        'ErpGrossWeightUnit',
        'ErpDeclaredValue',
        'ShipmentTotalAmount',
        'ErpIncoTerm',
        'ErpShipTo/Name',
        'ErpShipTo/Address/*',
        'CurrencyCode',
        'BaseCurrencyCode',
        'ShipmentTotalBaseAmount',
      ],
      queryInclude: [
        '$permissions',
      ],
    },
    ];
  },
});

Manager.register(MODEL_NAMES.ERPSHIPMENT, MODEL_TYPES.SDATA, __class);
lang.setObject('icboe.Models.ErpShipment.SData', __class);
export default __class;
