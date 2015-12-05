import declare from 'dojo/_base/declare';
import Base from './Base';
import _OfflineModelBase from 'argos/Models/_OfflineModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';
import Deferred from 'dojo/Deferred';

const __class = declare('crm.Models.Activity.Offline', [Base, _OfflineModelBase], {
  processAfterCompleted: function processAfterCompleted(entry) {
    const def = new Deferred();
    const key = (entry.$completedBasedOn) ? entry.$completedBasedOn.$key : entry.$key;
    this.deleteEntry(key);

    const rvModel = App.ModelManager.getModel('RecentlyViewed', MODEL_TYPES.OFFLINE);
    const bcModel = App.ModelManager.getModel('Briefcase', MODEL_TYPES.OFFLINE);
    if (rvModel) {
      rvModel.deleteEntryByEntityContext(key, this.entityName);
    }
    if (bcModel) {
      bcModel.deleteEntryByEntityContext(key, this.entityName);
    }
    def.resolve();
    return def.promise;
  },
  processAfterUpdate: function processAfterUpdate(entry) {
    const def = new Deferred();
    const key = (entry.$completedBasedOn) ? entry.$completedBasedOn.$key : entry.$key;
    this.deleteEntry(key);
    const rvModel = App.ModelManager.getModel('RecentlyViewed', MODEL_TYPES.OFFLINE);
    const bcModel = App.ModelManager.getModel('Briefcase', MODEL_TYPES.OFFLINE);
    if (rvModel) {
      rvModel.deleteEntryByEntityContext(key, this.entityName);
    }
    if (bcModel) {
      bcModel.deleteEntryByEntityContext(key, this.entityName);
    }
    def.resolve();
    return def.promise;
  },
});

Manager.register(MODEL_NAMES.ACTIVITY, MODEL_TYPES.OFFLINE, __class);
export default __class;
