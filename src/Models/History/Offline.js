import declare from 'dojo/_base/declare';
import Base from './Base';
import _OfflineModelBase from 'argos/Models/_OfflineModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';


const __class = declare('crm.Models.History.Offline', [Base, _OfflineModelBase], {
  id: 'history_offline_model',
  idProperty: 'StartDate',
  createOfflineNote: function createOfflineNote() {
    const entity = {}; //
    entity.$descriptor = 'offline Note';
    entity.createDate = moment().toDate();
    entity.modifyDate = moment().toDate();
    entity.description = '';
    entity.note = '';
    entity.relatedEntityId = null;
    entity.relatedEntityName = null;
    entity.relatedDescription = null;
    return entity;
  },
});


Manager.register(MODEL_NAMES.HISTORY, MODEL_TYPES.OFFLINE, __class);
export default __class;
