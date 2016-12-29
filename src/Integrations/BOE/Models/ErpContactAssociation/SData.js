import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Integrations.BOE.Models.ErpContactAssociation.SData', [Base, _SDataModelBase], {
  id: 'erpcontactassociation_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'CreateDate desc',
      querySelect: [
        'Contact/NameLF',
        'Account/AccountName',
        'CreateDate',
      ],
    }, {
      name: 'detail',
      querySelect: [
        'Contact/NameLF',
        'Account/AccountName',
        'CreateDate',
      ],
      queryInclude: [
        '$permissions',
      ],
    },
    ];
  },
});

Manager.register(MODEL_NAMES.ERPCONTACTASSOCIATION, MODEL_TYPES.SDATA, __class);
lang.setObject('icboe.Models.ErpContactAssociation.SData', __class);
export default __class;
