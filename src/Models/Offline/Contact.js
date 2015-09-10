import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPE from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Models.Offline.Contact', [_ModelBase], {
});

Manager.register(MODEL_NAMES.CONTACT, MODEL_TYPE.OFFLINE, __class);
export default __class;
