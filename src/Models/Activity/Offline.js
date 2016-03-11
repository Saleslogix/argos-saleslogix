import declare from 'dojo/_base/declare';
import Base from './Base';
import _OfflineModelBase from 'argos/Models/_OfflineModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';
import Deferred from 'dojo/Deferred';

const __class = declare('crm.Models.Activity.Offline', [Base, _OfflineModelBase], {
  id: 'activity_offline_model',
  onActivityCompleted: function onActivityCompleted(entry) {
    const def = new Deferred();
    const key = (entry.$completedBasedOn) ? entry.$completedBasedOn.$key : entry.$key;
    this.deleteEntry(key);
    this.removeFromAuxiliaryEntities(key);
    def.resolve();
    return def.promise;
  },
  onEntryUpdated: function onEntryUpdated(entry, orginalEntry) {
    const def = new Deferred();

    if (entry && entry.$key && orginalEntry && orginalEntry.$key) {
      if (entry.$key !== orginalEntry.$key) { // this happens when occurence is created
        this.deleteEntry(orginalEntry.$key);
        this.removeFromAuxiliaryEntities(orginalEntry.$key);
      }
    }
    def.resolve();
    return def.promise;
  },

});

Manager.register(MODEL_NAMES.ACTIVITY, MODEL_TYPES.OFFLINE, __class);
export default __class;
