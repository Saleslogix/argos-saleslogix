import declare from 'dojo/_base/declare';
import Base from './Base';
import _OfflineModelBase from 'argos/Models/_OfflineModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Integrations.BOE.Models.ErpAccountPerson.Offline', [Base, _OfflineModelBase], {
  id: 'erpaccountperson_offline_model',
});

Manager.register(MODEL_NAMES.ERPACCOUNTPERSON, MODEL_TYPES.OFFLINE, __class);
export default __class;
