import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPE from 'argos/Models/Types';

const __class = declare('crm.Models.Offline.Contact', [_ModelBase], {
});

Manager.register('contact', MODEL_TYPE.OFFLINE, __class);
export default __class;
