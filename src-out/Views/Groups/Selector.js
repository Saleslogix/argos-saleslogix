define('crm/Views/Groups/Selector', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'argos/List', 'argos/Store/SData'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _argosList, _argosStoreSData) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _string = _interopRequireDefault(_dojoString);

    var _List = _interopRequireDefault(_argosList);

    var _SDataStore = _interopRequireDefault(_argosStoreSData);

    /**
     * @class crm.Views.Groups.Selector
     *
     * @extends argos.List
     * @requires argos.List
     *
     */
    var __class = (0, _declare['default'])('crm.Views.Groups.Selector', [_List['default']], {
        id: 'groups_configure',
        expose: false,
        enableSearch: false,
        icon: '',

        listViewId: 'groups_list',
        family: '',

        //Localization
        titleText: 'Groups Lookup',

        itemTemplate: new Simplate(['<h3>{%: $[$$.labelProperty] %}</h3>']),

        constructor: function constructor() {
            this.tools = { tbar: [] };
        },

        activateEntry: function activateEntry(params) {
            var key;

            key = params.key;

            if (this._selectionModel && this.isNavigationDisabled()) {
                this._selectionModel.toggle(params.key, this.entries[params.key] || params.descriptor, params.$source);
                if (this.options.singleSelect && this.options.singleSelectAction) {
                    this.invokeSingleSelectAction();
                }
            }
        },

        createStore: function createStore() {
            if (!this.family) {
                throw new Error('The groups selector must have a family set.');
            }

            return this.createGroupStore(this.family);
        },

        createGroupStore: function createGroupStore(entityName) {
            var store = null;

            if (typeof entityName === 'string' && entityName !== '') {
                store = new _SDataStore['default']({
                    service: App.services.crm,
                    resourceKind: 'groups',
                    contractName: 'system',
                    where: 'upper(family) eq \'' + entityName.toUpperCase() + '\'',
                    orderBy: 'name asc',
                    include: ['layout', 'tableAliases'],
                    idProperty: '$key',
                    applicationName: 'slx',
                    scope: this
                });
            }

            return store;
        },
        formatSearchQuery: function formatSearchQuery(searchQuery) {
            return _string['default'].substitute('name like "${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });

    _lang['default'].setObject('Mobile.SalesLogix.Views.Groups.Selector', __class);
    module.exports = __class;
});
