/**
 * @class Mobile.SalesLogix.OfflineManager
 *
 */
define('Mobile/SalesLogix/OfflineManager', [
    'Sage/Platform/Mobile/Store/PouchDB'
], function(
    Store
    ) {
    var store;

    store = new Store({databaseName: 'crm-offline'});

    return {
        getAllIds: function() {
            // The results from this query should just get cached/updated/stored
            // globally when the application goes offline. This will
            // prevent some timing issues with calling this async on list loads.
            return store.query(function(doc, emit){
                emit(doc._id);
            });
        },
        /**
         *
         * @param detailView Required instance of a detail view
         * @returns {window.Promise}
         */
        saveOffline: function(detailView) {
            if (!detailView) {
                return Promise.reject("A detail view must be specified.");
            }

            var doc, id = detailView.entry[detailView.idProperty || '$key'];

            // Try to fetch the previously cached doc/entity
            return store.get(id).then(function(results) {

                // Refresh the offline store with the latest info
                results._id = id;
                results.entity = detailView.entry;
                results.modifyDate = moment().toDate();
                results.resourceKind = detailView.resourceKind;
                results.storedBy = detailView.id;

                return store.put(results);

            }, function() {
                // Fetching the doc/entity failed, so we will insert a new doc instead.
                doc = {
                    _id: id,
                    entity: detailView.entry,
                    createDate: moment().toDate(),
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
        removeOffline: function(detailView) {
            if (!detailView) {
                return Promise.reject("A detail view must be specified.");
            }

            var id = detailView.entry[detailView.idProperty || '$key'];

            return store.remove(id);
        }
    };
});
