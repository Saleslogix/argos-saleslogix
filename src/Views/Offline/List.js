/**
 * @class Mobile.SalesLogix.Views.Offline.List
 *
 * @extends Sage.Platform.Mobile.List
 * @requires Sage.Platform.Mobile.List
 *
 *
 */
define('Mobile/SalesLogix/Views/Offline/List', [
    'dojo/_base/declare',
    'Sage/Platform/Mobile/_ListBase',
    'Sage/Platform/Mobile/Store/PouchDB'
], function(
    declare,
    _ListBase,
    Store
    ) {

    return declare('Mobile.SalesLogix.Views.Offline.List', [_ListBase], {
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
            }
        },
        _applyStateToQueryOptions: function(queryOptions) {
            queryOptions.include_docs = true;
            return queryOptions;
        }
    });
});

