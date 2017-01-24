import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Integrations.BOE.Models.Location.SData', [Base, _SDataModelBase], {
  id: 'slxlocation_sdata_model',
  createQueryModels: function createQueryModels() {
    // Unable to order by Description
    return [{
      name: 'list',
      queryOrderBy: 'Name',
      queryWhere: 'LocationType eq "Warehouse"',
      querySelect: [
        'Name',
        'Description',
        'ErpLogicalId',
        'ErpAccountingEntityId',
        'ErpStatus',
        'ErpExtId',
        'LocationType',
      ],
    }, {
      name: 'detail',
      querySelect: [
        'Name',
        'Description',
        'ErpLogicalId',
        'ErpAccountingEntityId',
        'ErpStatus',
        'ErpExtId',
        'LocationType',
      ],
      queryInclude: [
        '$permissions',
      ],
    }];
  },
});

Manager.register(MODEL_NAMES.LOCATION, MODEL_TYPES.SDATA, __class);
lang.setObject('icboe.Models.Location.SData', __class);
export default __class;
