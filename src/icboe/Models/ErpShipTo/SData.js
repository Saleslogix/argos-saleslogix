import declare from 'dojo/_base/declare';
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('icboe.Models.ErpShipTo.SData', [Base, _SDataModelBase], {
  id: 'erpshipto_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'CreateDate desc',
      querySelect: [
        'Name',
        'Address/*',
        'CreateDate',
        'ErpShipToAccounts/*',
      ],
    }, {
      name: 'detail',
      querySelect: [
        'Name',
        'Fax',
        'MainPhone',
        'Email',
        'Address/*',
        'ErpStatus',
        'SyncStatus',
        'ErpLogicalId',
        'ErpAccountingEntityId',
        'Owner/OwnerDescription',
        'ErpCustomerType',
        'PaymentTermId',
        'ErpPaymentMethod',
      ],
    }, {
      name: 'edit',
      querySelect: [
        'Name',
        'Fax',
        'MainPhone',
        'Email',
        'Address/*',
        'ErpStatus',
        'SyncStatus',
        'ErpLogicalId',
        'ErpAccountingEntityId',
        'Owner/OwnerDescription',
        'ErpCustomerType',
        'PaymentTermId',
        'ErpPaymentMethod',
      ],
    },
    ];
  },
});

Manager.register(MODEL_NAMES.ERPSHIPTO, MODEL_TYPES.SDATA, __class);
export default __class;
