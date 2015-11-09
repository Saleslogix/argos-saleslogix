import declare from 'dojo/_base/declare';
import _OfflineModelBase from 'argos/Models/_OfflineModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import Deferred from 'dojo/Deferred';

const resource = window.localeContext.getEntitySync('autenticationModel').attributes;

const __class = declare('crm.Models.Autentication.Offline', [_OfflineModelBase], {
  entityName: 'Authentication',
  modelName: 'Authentication',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  isSystem: true,
  createEntry: function createEntity(userId) {
    const entity = {}; // need to dynamicly create Properties;
    entity.$key = 'Auth_00000000000';
    entity.$descriptor = resource.entityDisplayName;
    entity.CreateDate = moment().toDate();
    entity.ModifyDate = moment().toDate();
    entity.userId = userId;
    return entity;
  },
  hasAuthenticationChanged: function hasAuthenticationChanged(userId) {
    const def = new Deferred();
    this.getEntry('Auth_00000000000').then((entry) => {
      if (entry) {
        if (entry.userId === userId) {
          def.resolve(false);
        } else {
          def.resolve(true);
          entry.userId = userId;
          this.updateEntry(entry);
        }
      }
    }, () => {
      def.resolve(true);
      const newEntry = this.createEntry(userId);
      this.insertEntry(newEntry);
    });
    return def.promise;
  },
});

Manager.register('Authentication', MODEL_TYPES.OFFLINE, __class);
export default __class;
