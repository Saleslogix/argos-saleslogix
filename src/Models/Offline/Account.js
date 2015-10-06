import declare from 'dojo/_base/declare';
import AccountBase from '../AccountBase';
import _OfflineModelBase from 'argos/Models/_OfflineModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Models.Offline.Account', [AccountBase, _OfflineModelBase], {

});

Manager.register(MODEL_NAMES.ACCOUNT, MODEL_TYPES.OFFLINE, __class);
export default __class;
