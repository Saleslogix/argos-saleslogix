import declare from 'dojo/_base/declare';
import ContactBase from '../ContactBase';
import _OfflineModelBase from 'argos/Models/_OfflineModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Models.Offline.Contact', [ContactBase, _OfflineModelBase], {

});

Manager.register(MODEL_NAMES.CONTACT, MODEL_TYPES.OFFLINE, __class);
export default __class;
