define('crm/SalesProcessUtility', ['exports', 'module', 'dojo/_base/lang', 'dojo/string', 'dojo/when', 'dojo/_base/Deferred', 'argos/Store/SData'], function (exports, module, _dojo_baseLang, _dojoString, _dojoWhen, _dojo_baseDeferred, _argosStoreSData) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _string = _interopRequireDefault(_dojoString);

  var _when = _interopRequireDefault(_dojoWhen);

  var _Deferred = _interopRequireDefault(_dojo_baseDeferred);

  var _SData = _interopRequireDefault(_argosStoreSData);

  var __class;

  /**
   * @class crm.SalesProcessUtility
   *
   * Saleslogix salesprocess utils
   *
   * @singleton
   *
   */
  __class = _lang['default'].setObject('crm.SalesProcessUtility', {
    store: null,
    service: null,
    contractName: 'dynamic',
    resourceKind: 'salesProcesses',
    queryInclude: null,
    querySelect: ['Name', 'EntityId'],
    queryOrderBy: '',
    queryWhere: '',
    maxItems: 100,

    getStore: function getStore() {
      if (!this.store) {
        this.store = this.createStore();
      }
      return this.store;
    },
    createStore: function createStore() {
      var store,
          options = this.getStoreOptions();
      store = new _SData['default'](options);
      return store;
    },
    getStoreOptions: function getStoreOptions() {
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
    getSalesProcessByEntityId: function getSalesProcessByEntityId(entityId) {
      var queryResults, deferred, store, options;

      deferred = new _Deferred['default']();
      store = this.getStore();
      options = {
        where: _string['default'].substitute('EntityId' + ' eq "${0}"', [entityId])
      };
      queryResults = store.query(null, options);
      (0, _when['default'])(queryResults, (function (feed) {
        var salesProcess = null;
        if (feed && feed.length > 0) {
          salesProcess = feed[0];
        }
        deferred.resolve(salesProcess);
      }).bind(this), (function (err) {
        deferred.reject(err);
      }).bind(this));
      return deferred.promise;
    }
  });
  module.exports = __class;
});
