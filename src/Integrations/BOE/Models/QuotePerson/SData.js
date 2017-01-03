import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Integrations.BOE.Models.QuotePerson.SData', [Base, _SDataModelBase], {
  id: 'quoteperson_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      querySelect: [
        'Person/Name',
        'Quote/QuoteNumber',
      ],
    }, {
      name: 'detail',
      querySelect: [
        'Person/Name',
        'Quote/QuoteNumber',
      ],
      queryInclude: [
        '$permissions',
      ],
    }];
  },
});

Manager.register(MODEL_NAMES.QUOTEPERSON, MODEL_TYPES.SDATA, __class);
lang.setObject('icboe.Models.QuotePerson.SData', __class);
export default __class;
