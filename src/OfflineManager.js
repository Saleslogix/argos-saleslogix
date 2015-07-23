/**
 * @class crm.OfflineManager
 *
 */
import Store from 'argos/Store/PouchDB';
import moment from 'moment';
import Deferred from 'dojo/Deferred';

var store;
store = new Store({databaseName: 'crm-offline'});

export default {
    getAllIds: function() {
        // The results from this query should just get cached/updated/stored
        // globally when the application goes offline. This will
        // prevent some timing issues with calling this async on list loads.
        return store.query(function(doc, emit) {
            emit(doc._id);
        });
    },
    /**
     *
     * @param detailView Required instance of a detail view
     * @returns {Promise}
     */
    saveOffline: function(detailView) {
        var def = new Deferred();
        if (!detailView) {
            def.reject('A detail view must be specified.');
            return def.promise;
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
        var def = new Deferred();
        if (!detailView) {
            def.reject('A detail view must be specified.');
            return def.promise;
        }

        var id = detailView.entry[detailView.idProperty || '$key'];

        return store.remove(id);
    }
};
