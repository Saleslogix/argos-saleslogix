import declare from 'dojo/_base/declare';
import UserActivityBase from '../UserActivityBase';
import _OfflineModelBase from 'argos/Models/_OfflineModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPE from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Models.Offline.UserActivity', [UserActivityBase, _OfflineModelBase], {

});

Manager.register(MODEL_NAMES.USERACTIVITY, MODEL_TYPE.OFFLINE, __class);
export default __class;
