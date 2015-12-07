import declare from 'dojo/_base/declare';
import Base from './Base';
import _OfflineModelBase from 'argos/Models/_OfflineModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';
import Deferred from 'dojo/Deferred';

const __class = declare('crm.Models.Activity.Offline', [Base, _OfflineModelBase], {
  onActvitiyCompleted: function onActvitiyCompleted(entry) {
    const def = new Deferred();
    const key = (entry.$completedBasedOn) ? entry.$completedBasedOn.$key : entry.$key;
    this.deleteEntry(key);
    this.removeFromAuxiliaryEntities(key);
    def.resolve();
    return def.promise;
  },
  onEntryUpdate: function onEntryUpdate(entry) {
    const def = new Deferred();
    const key = (entry.$completedBasedOn) ? entry.$completedBasedOn.$key : entry.$key;
    this.deleteEntry(key);
    this.removeFromAuxiliaryEntities(key);
    def.resolve();
    return def.promise;
  },
});

Manager.register(MODEL_NAMES.ACTIVITY, MODEL_TYPES.OFFLINE, __class);
export default __class;
