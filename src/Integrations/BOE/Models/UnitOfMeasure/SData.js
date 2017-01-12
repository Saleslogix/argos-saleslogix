import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';
import Deferred from 'dojo/Deferred';
import when from 'dojo/when';

const __class = declare('crm.Integrations.BOE.Models.UnitOfMeasure.SData', [Base, _SDataModelBase], {
  id: 'unitofmeasure_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'Name',
      querySelect: [
        'Name',
        'Product/*',
      ],
    }, {
      name: 'detail',
      querySelect: [
        'Name',
        'Product/*',
      ],
      queryInclude: [
        '$permissions',
      ],
    },
    ];
  },
  getUnitOfMeasureFromCode: function getUnitOfMeasureFromCode(uomCode, productId) {
    let queryResults;
    const def = new Deferred();
    const queryOptions = {
      where: `Product.Id eq "${productId}"`,
    };
    if (uomCode && productId) {
      queryResults = this.getEntries(null, queryOptions);
      when(queryResults, (entries) => {
        let uof = null;
        if (entries) {
          entries.forEach((item) => {
            if (item.Name === uomCode) {
              uof = item;
            }
          });
        }
        def.resolve(uof);
      }, (err) => {
        def.reject(err);
      });
    } else {
      def.resolve(null);
    }
    return def.promise;
  },
});

Manager.register(MODEL_NAMES.UNITOFMEASURE, MODEL_TYPES.SDATA, __class);
lang.setObject('icboe.Models.UnitOfMeasure.SData', __class);
export default __class;
