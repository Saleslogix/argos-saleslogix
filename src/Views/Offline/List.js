/**
 * @class crm.Views.Offline.List
 *
 * @extends argos._ListBase
 * @requires argos._ListBase
 *
 *
 */
define('crm/Views/Offline/List', [
    'dojo/_base/declare',
    'argos/_ListBase',
    'argos/Store/PouchDB'
], function(
    declare,
    _ListBase,
    Store
    ) {

    return declare('crm.Views.Offline.List', [_ListBase], {
        id: 'offline_list',
        idProperty: 'id',
        detailView: 'offline_detail',

        titleText: 'Following',

        OFFLINE_DB_NAME: 'crm-offline',

        itemTemplate: new Simplate([
            '<h3>{%: $$.getTitle($) %}</h3>'
        ]),

        getTitle: function(entry) {
            return entry && entry.doc && entry.doc.entity && entry.doc.entity.$descriptor;
        },

        // TODO: Move to a mixin
        createStore: function() {
            return new Store({databaseName: this.OFFLINE_DB_NAME});
        },
        _buildQueryExpression: function() {
            return function(doc, emit) {
                emit(doc);
            };
        },
        _applyStateToQueryOptions: function(queryOptions) {
            queryOptions.include_docs = true;
            return queryOptions;
        }
    });
});

