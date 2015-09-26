import declare from 'dojo/_base/declare';
import _OfflineModelBase from 'argos/Models/_OfflineModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPE from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Models.Offline.Contact', [_OfflineModelBase], {
  entityName: 'Contact',
  entityDisplayName: 'Contact',
  entityDisplayNamePlural: 'Contacts',
  resourceKind: 'contacts',
  modelName: MODEL_NAMES.CONTACT,
});

Manager.register(MODEL_NAMES.CONTACT, MODEL_TYPE.OFFLINE, __class);
export default __class;
