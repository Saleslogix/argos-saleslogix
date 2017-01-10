import declare from 'dojo/_base/declare';
import _OfflineModelBase from 'argos/Models/_OfflineModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import Deferred from 'dojo/Deferred';
import convert from 'argos/Convert';
import getResource from 'argos/I18n';

const resource = getResource('autenticationModel');

const __class = declare('crm.Models.Autentication.Offline', [_OfflineModelBase], {
  id: 'auth_offline_model',
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
    entity.UserId = userId;
    return entity;
  },
  initAuthentication: function initAuthentication(userId) {
    const def = new Deferred();
    const result = {
      entry: null,
      hasUserChanged: false,
      hasAuthenticatedToday: false,
    };
    this.getEntry('Auth_00000000000').then((entry) => {
      if (entry) {
        if (entry.UserId === userId) {
          result.hasUserChanged = false;
          result.hasAuthenticatedToday = this._hasAuthenticatedToday(entry);
        } else {
          result.hasUserChanged = true;
          result.hasAuthenticatedToday = false;
          entry.UserId = userId;
        }
        entry.ModifyDate = moment().toDate();
        result.entry = entry;
      }
      def.resolve(result);
    }, () => {
      const newEntry = this.createEntry(userId);
      this.insertEntry(newEntry);
      result.hasUserChanged = true;
      result.hasAuthenticatedToday = false;
      result.entry = newEntry;
      def.resolve(result);
    });
    return def.promise;
  },
  _hasAuthenticatedToday: function _hasAuthenticatedToday(entry) {
    if (entry.ModifyDate) {
      const currentDate = moment();
      const authDate = moment(convert.toDateFromString(entry.ModifyDate));
      if (authDate.isAfter(currentDate.startOf('day')) && authDate.isBefore(moment().endOf('day'))) {
        return true;
      }
    }
    return false;
  },
});

Manager.register('Authentication', MODEL_TYPES.OFFLINE, __class);
export default __class;
