import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import when from 'dojo/when';
import Deferred from 'dojo/_base/Deferred';
import SData from 'argos/Store/SData';

var __class;

/**
 * @class crm.SalesProcessUtility
 *
 * Saleslogix salesprocess utils
 *
 * @singleton
 *
 */
__class = lang.setObject('crm.SalesProcessUtility', {
  store: null,
  service: null,
  contractName: 'dynamic',
  resourceKind: 'salesProcesses',
  queryInclude: null,
  querySelect: ['Name', 'EntityId'],
  queryOrderBy: '',
  queryWhere: '',
  maxItems: 100,

  getStore: function() {
    if (!this.store) {
      this.store = this.createStore();
    }
    return this.store;
  },
  createStore: function() {
    var store, options = this.getStoreOptions();
    store = new SData(options);
    return store;
  },
  getStoreOptions: function() {
    var options = {
      service: App.getService(false),
      contractName: this.contractName,
      resourceKind: this.resourceKind,
      include: this.queryInclude,
      select: this.querySelect,
      orderBy: this.queryOrderBy,
      where: this.queryWhere,
      start: 0,
      count: this.maxItems,
      scope: this
    };
    return options;
  },
  /**
   * Returns an promise with sales process entry.
   * @param {Object} options Options for creating the request
   * @param {String} entitiyId
   *
   */
  getSalesProcessByEntityId: function(entityId) {
    var queryResults,
      deferred,
      store,
      options;

    deferred = new Deferred();
    store = this.getStore();
    options = {
      where: string.substitute('EntityId' + ' eq "${0}"', [entityId])
    };
    queryResults = store.query(null, options);
    when(queryResults, function(feed) {
      var salesProcess = null;
      if (feed && feed.length > 0) {
        salesProcess = feed[0];
      }
      deferred.resolve(salesProcess);
    }.bind(this), function(err) {
      deferred.reject(err);
    }.bind(this));
    return deferred.promise;
  }
});
export default __class;
