define('crm/Views/Offline/List', ['exports', 'module', 'dojo/_base/declare', 'argos/_ListBase', 'argos/Store/PouchDB'], function (exports, module, _dojo_baseDeclare, _argos_ListBase, _argosStorePouchDB) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    /**
     * @class crm.Views.Offline.List
     *
     * @extends argos._ListBase
     * @requires argos._ListBase
     *
     *
     */

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _ListBase2 = _interopRequireDefault(_argos_ListBase);

    var _Store = _interopRequireDefault(_argosStorePouchDB);

    module.exports = (0, _declare['default'])('crm.Views.Offline.List', [_ListBase2['default']], {
        id: 'offline_list',
        idProperty: 'id',
        detailView: 'offline_detail',
        offlineSupport: true,

        titleText: 'Recently Viewed',

        OFFLINE_DB_NAME: 'crm-offline',

        itemTemplate: new Simplate(['<h3>{%: $$.getTitle($) %}</h3>']),

        getTitle: function getTitle(entry) {
            return entry && entry.doc && entry.doc.entity && entry.doc.entity.$descriptor;
        },

        // TODO: Move to a mixin
        createStore: function createStore() {
            return new _Store['default']({ databaseName: this.OFFLINE_DB_NAME });
        },
        _buildQueryExpression: function _buildQueryExpression() {
            return function (doc, emit) {
                emit(doc);
            };
        },
        _applyStateToQueryOptions: function _applyStateToQueryOptions(queryOptions) {
            queryOptions.include_docs = true;
            return queryOptions;
        }
    });
});
