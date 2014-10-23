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
        titleText: 'Following Detail',

        idProperty: 'id',

        OFFLINE_DB_NAME: 'crm-offline',
        offlineDoc: null,
        createStore: function() {
            return new Store({databaseName: this.OFFLINE_DB_NAME});
        },
        _applyStateToGetOptions: function(getOptions) {
        },
        _buildGetExpression: function() {
            var options = this.options;
            return options && (options.id || options.key);
        },
        processEntry: function(offlineEntry) {
            this.offlineDoc = offlineEntry;

            arguments[0] = this.offlineDoc.entity;
            this.inherited(arguments);
        },
        createLayout: function() {
            var views, view, i, len, createLayoutFn, layout;
            views = App.getViews();
            len = views.length;

            for (i = 0; i < len; i++) {
                view = views[i];
                if (view.id === this.offlineDoc.storedBy && view.createLayout) {
                    createLayoutFn = view.createLayout;
                    break;
                }
            }

            view.entry = this.entry.entity;
            layout = createLayoutFn.apply(view);

            // TODO: Filter the layout to exclude rows we don't want (Quick actions, relatted items, etc)?
            return layout;
        }
    });
});

