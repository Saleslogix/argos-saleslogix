/**
 * @class Mobile.SalesLogix.Views.Offline.Detail
 *
 *
 * @extends Sage.Platform.Mobile.Detail
 * @requires Sage.Platform.Mobile.Detail
 *
 */
define('Mobile/SalesLogix/Views/Offline/Detail', [
    'dojo/_base/declare',
    'Sage/Platform/Mobile/_DetailBase',
    'Sage/Platform/Mobile/Store/PouchDB'
], function(
    declare,
    _DetailBase,
    Store
    ) {

    return declare('Mobile.SalesLogix.Views.Offline.Detail', [_DetailBase], {
        id: 'offline_detail',
        titleText: 'Offline Detail',

        idProperty: 'id',

        OFFLINE_DB_NAME: 'crm-offline',
        createStore: function() {
            return new Store({databaseName: this.OFFLINE_DB_NAME});
        },
        _applyStateToGetOptions: function(getOptions) {
        },
        _buildGetExpression: function() {
            var options = this.options;
            return options && (options.id || options.key);
        }
    });
});

