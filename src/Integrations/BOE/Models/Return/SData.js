import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Integrations.BOE.Models.Return.SData', [Base, _SDataModelBase], {
  id: 'return_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'ErpDocumentDate desc, CreateDate desc',
      querySelect: [
        'ReturnNumber',
        'Status',
        'ReturnType',
        'Priority',
        'CreateDate',
        'ErpDocumentDate',
      ],
    }, {
      name: 'detail',
      querySelect: [
        'ReturnNumber',
        'Status',
        'ReturnType',
        'Priority',
        'CreateDate',
      ],
      queryInclude: [
        '$permissions',
      ],
    },
    ];
  },
});

Manager.register(MODEL_NAMES.RETURN, MODEL_TYPES.SDATA, __class);
lang.setObject('icboe.Models.Return.SData', __class);
export default __class;
