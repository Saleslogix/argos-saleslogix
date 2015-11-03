import declare from 'dojo/_base/declare';
import Base from './Base';
import _OfflineModelBase from 'argos/Models/_OfflineModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Models.Activity.Offline', [Base, _OfflineModelBase], {

});

Manager.register(MODEL_NAMES.ACTIVITY, MODEL_TYPES.OFFLINE, __class);
export default __class;
