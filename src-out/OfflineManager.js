define('crm/OfflineManager', ['exports', 'module', 'argos/Store/PouchDB', 'moment', 'dojo/Deferred'], function (exports, module, _argosStorePouchDB, _moment, _dojoDeferred) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  /**
   * @class crm.OfflineManager
   *
   */

  var _Store = _interopRequireDefault(_argosStorePouchDB);

  var _moment2 = _interopRequireDefault(_moment);

  var _Deferred = _interopRequireDefault(_dojoDeferred);

  var store = new _Store['default']({
    databaseName: 'crm-offline'
  });

  module.exports = {
    getAllIds: function getAllIds() {
      // The results from this query should just get cached/updated/stored
      // globally when the application goes offline. This will
      // prevent some timing issues with calling this async on list loads.
      return store.query(function queryFn(doc, emit) {
        emit(doc._id);
      });
    },
    /**
     *
     * @param view Required instance of a detail view
     * @returns {Promise}
     */
    saveOffline: function saveOffline(view) {
      var def = new _Deferred['default']();
      if (!view) {
        def.reject('A detail view must be specified.');
        return def.promise;
      }

      var model = view.getModel();
      var id = view.entry[view.idProperty || '$key'];
      var doc = undefined;

      // Try to fetch the previously cached doc/entity
      return store.get(id).then(function querySuccess(results) {
        // Refresh the offline store with the latest info
        results.entity = view.entry;
        results.modifyDate = (0, _moment2['default'])().toDate();
        results.entityName = model.entityName;

        return store.put(results);
      }, function queryError() {
        // Fetching the doc/entity failed, so we will insert a new doc instead.
        doc = {
          _id: id,
          entity: view.entry,
          createDate: (0, _moment2['default'])().toDate(),
          resourceKind: this.resourceKind,
          storedBy: view.id,
          entityName: model.entityName
        };

        return store.add(doc);
      });
    },
    /**
     *
     * @param view
     * @returns {window.Promise}
     */
    removeOffline: function removeOffline(view) {
      var def = new _Deferred['default']();
      if (!view) {
        def.reject('A detail view must be specified.');
        return def.promise;
      }

      var id = view.entry[view.idProperty || '$key'];

      return store.remove(id);
    }
  };
});
