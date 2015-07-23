define('crm/OfflineManager', ['exports', 'module', 'argos/Store/PouchDB', 'moment', 'dojo/Deferred'], function (exports, module, _argosStorePouchDB, _moment, _dojoDeferred) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    /**
     * @class crm.OfflineManager
     *
     */

    var _Store = _interopRequireDefault(_argosStorePouchDB);

    var _moment2 = _interopRequireDefault(_moment);

    var _Deferred = _interopRequireDefault(_dojoDeferred);

    var store;
    store = new _Store['default']({ databaseName: 'crm-offline' });

    module.exports = {
        getAllIds: function getAllIds() {
            // The results from this query should just get cached/updated/stored
            // globally when the application goes offline. This will
            // prevent some timing issues with calling this async on list loads.
            return store.query(function (doc, emit) {
                emit(doc._id);
            });
        },
        /**
         *
         * @param detailView Required instance of a detail view
         * @returns {Promise}
         */
        saveOffline: function saveOffline(detailView) {
            var def = new _Deferred['default']();
            if (!detailView) {
                def.reject('A detail view must be specified.');
                return def.promise;
            }

            var doc,
                id = detailView.entry[detailView.idProperty || '$key'];

            // Try to fetch the previously cached doc/entity
            return store.get(id).then(function (results) {

                // Refresh the offline store with the latest info
                results._id = id;
                results.entity = detailView.entry;
                results.modifyDate = (0, _moment2['default'])().toDate();
                results.resourceKind = detailView.resourceKind;
                results.storedBy = detailView.id;

                return store.put(results);
            }, function () {
                // Fetching the doc/entity failed, so we will insert a new doc instead.
                doc = {
                    _id: id,
                    entity: detailView.entry,
                    createDate: (0, _moment2['default'])().toDate(),
                    resourceKind: this.resourceKind,
                    storedBy: detailView.id
                };

                return store.add(doc);
            });
        },
        /**
         *
         * @param detailView
         * @returns {window.Promise}
         */
        removeOffline: function removeOffline(detailView) {
            var def = new _Deferred['default']();
            if (!detailView) {
                def.reject('A detail view must be specified.');
                return def.promise;
            }

            var id = detailView.entry[detailView.idProperty || '$key'];

            return store.remove(id);
        }
    };
});
