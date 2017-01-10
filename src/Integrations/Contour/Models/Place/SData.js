import declare from 'dojo/_base/declare';
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Integrations.Contour.Models.Place.SData', [Base, _SDataModelBase], {
  id: 'place_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'Name',
      queryWhere: `(ThisUserOnly eq "F" or (ThisUserOnly eq "T" and UserId eq "${App.context.user.$key}"))`,
      querySelect: [
        'Name',
        'ModifyDate',
        'ThisUserOnly',
        'Address/Address1',
        'Address/Address2',
        'Address/City',
        'Address/State',
        'Address/PostalCode',
        'Address/Country',
        'Address/CountryCode',
        'Address/GeocodeProvider',
        'Address/GeocodeLatitude',
        'Address/GeocodeLongitude',
        'Address/GeocodeFailed',
      ],
    }];
  },
});

Manager.register(MODEL_NAMES.PLACE, MODEL_TYPES.SDATA, __class);
export default __class;
