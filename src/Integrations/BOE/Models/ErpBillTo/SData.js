import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Integrations.BOE.Models.ErpBillTo.SData', [Base, _SDataModelBase], {
  id: 'erpbillto_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'CreateDate desc',
      querySelect: [
        'Name',
        'Address/*',
        'CreateDate',
        'ErpBillToAccounts/*',
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
        'ErpExtId',
        'ErpLogicalId',
        'ErpAccountingEntityId',
        'Owner/OwnerDescription',
        'CustomerType',
        'PaymentTermId',
        'ErpPaymentMethod',
      ],
      queryInclude: [
        '$permissions',
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
        'CustomerType',
        'PaymentTermId',
        'ErpPaymentMethod',
      ],
      queryInclude: [
        '$permissions',
      ],
    },
    ];
  },
});

Manager.register(MODEL_NAMES.ERPBILLTO, MODEL_TYPES.SDATA, __class);
lang.setObject('icboe.Models.ErpBillTo.SData', __class);
export default __class;
