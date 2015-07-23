define('crm/Views/Offline/Detail', ['exports', 'module', 'dojo/_base/declare', 'argos/_DetailBase', 'argos/Store/PouchDB'], function (exports, module, _dojo_baseDeclare, _argos_DetailBase, _argosStorePouchDB) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    /**
     * @class crm.Views.Offline.Detail
     *
     *
     * @extends argos._DetailBase
     * @requires argos._DetailBase
     *
     */

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _DetailBase2 = _interopRequireDefault(_argos_DetailBase);

    var _Store = _interopRequireDefault(_argosStorePouchDB);

    module.exports = (0, _declare['default'])('crm.Views.Offline.Detail', [_DetailBase2['default']], {
        id: 'offline_detail',
        titleText: 'Recently Viewed Detail',

        idProperty: 'id',
        offlineSupport: true,

        OFFLINE_DB_NAME: 'crm-offline',
        offlineDoc: null,
        createStore: function createStore() {
            return new _Store['default']({ databaseName: this.OFFLINE_DB_NAME });
        },
        _applyStateToGetOptions: function _applyStateToGetOptions() {},
        _buildGetExpression: function _buildGetExpression() {
            var options = this.options;
            return options && (options.id || options.key);
        },
        processEntry: function processEntry(offlineEntry) {
            var arg = arguments[0];
            this.offlineDoc = offlineEntry;

            arg = this.offlineDoc.entity;
            this.inherited(arguments);
        },
        createLayout: function createLayout() {
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
