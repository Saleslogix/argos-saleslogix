import declare from 'dojo/_base/declare';
import Base from './Base';
import _OfflineModelBase from 'argos/Models/_OfflineModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';


const __class = declare('crm.Models.History.Offline', [Base, _OfflineModelBase], {
  id: 'history_offline_model',
  deleteEntry: function deleteEntry(entry) {
    return new Promise((resolve, reject) => {
      const store = this.getStore();
      store.query((doc, emit) => {
        if (doc.entityName === this.entityName && doc.entity && doc.entity.entityId === null || typeof doc.entity.entityId === 'undefined') {
          if (doc.entity.Text === entry.LongNotes) {
            emit(doc);
          }
        }
      }).then((docs) => {
        if (docs && docs.length === 1) {
          const doc = docs[0];
          this._removeDoc(doc.key).then((result) => {
            this.onEntryDelete(entry);
            resolve(result);
          }, (err) => {
            reject(err);
          });
        } else {
          reject('No entry to delete.');
        }
      }, (err) => {
        reject(err);
      });
    });
  },
});


Manager.register(MODEL_NAMES.HISTORY, MODEL_TYPES.OFFLINE, __class);
export default __class;
