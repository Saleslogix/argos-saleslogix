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
            return store.query(function(doc, emit){
                emit(doc._id);
            });
        }
    };
});
