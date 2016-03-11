import declare from 'dojo/_base/declare';
import Base from './Base';
import _OfflineModelBase from 'argos/Models/_OfflineModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPE from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Models.UserActivity.Offline', [Base, _OfflineModelBase], {
  id: 'useractivity_offline_model',
});

Manager.register(MODEL_NAMES.USERACTIVITY, MODEL_TYPE.OFFLINE, __class);
export default __class;
