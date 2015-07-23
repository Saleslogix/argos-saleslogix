define('crm/Views/PickList', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'argos/List'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _argosList) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _string = _interopRequireDefault(_dojoString);

    var _List = _interopRequireDefault(_argosList);

    /**
     * @class crm.Views.PickList
     *
     *
     * @extends argos.List
     *
     */
    var __class = (0, _declare['default'])('crm.Views.PickList', [_List['default']], {
        //Templates
        itemTemplate: new Simplate(['<h3>{%: $.text %}</h3>']),

        //View Properties
        id: 'pick_list',
        expose: false,
        resourceKind: 'picklists',
        resourceProperty: 'items',
        contractName: 'system',

        activateEntry: function activateEntry(params) {
            if (this.options.keyProperty === 'text' && !this.options.singleSelect) {
                params.key = params.descriptor;
            }

            this.inherited(arguments);
        },
        show: function show(options) {
            this.set('title', options && options.title || this.title);
            if (!options.singleSelect) {
                if (options.keyProperty) {
                    this.idProperty = options.keyProperty;
                }

                if (options.textProperty) {
                    this.labelProperty = options.textProperty;
                }
            }

            this.inherited(arguments);
        },
        formatSearchQuery: function formatSearchQuery(searchQuery) {
            return _string['default'].substitute('upper(text) like "${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });

    _lang['default'].setObject('Mobile.SalesLogix.Views.PickList', __class);
    module.exports = __class;
});
