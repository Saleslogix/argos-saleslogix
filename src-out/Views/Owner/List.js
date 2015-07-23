define('crm/Views/Owner/List', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'dojo/_base/array', 'argos/List'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _dojo_baseArray, _argosList) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _string = _interopRequireDefault(_dojoString);

    var _array = _interopRequireDefault(_dojo_baseArray);

    var _List = _interopRequireDefault(_argosList);

    /**
     * @class crm.Views.Owner.List
     *
     * @extends argos.List
     */
    var __class = (0, _declare['default'])('crm.Views.Owner.List', [_List['default']], {
        //Templates
        itemTemplate: new Simplate(['<h3>{%: $.OwnerDescription %}</h3>']),

        //Localization
        titleText: 'Owners',

        //View Properties
        id: 'owner_list',
        security: 'Entities/Owner/View',
        queryOrderBy: 'OwnerDescription',
        querySelect: ['OwnerDescription', 'User/Enabled', 'User/Type', 'Type'],
        queryWhere: 'Type ne "Department"',
        resourceKind: 'owners',

        formatSearchQuery: function formatSearchQuery(searchQuery) {
            return _string['default'].substitute('upper(OwnerDescription) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        },
        processData: function processData(items) {
            if (items) {
                items = _array['default'].filter(items, function (item) {
                    return this._userEnabled(item) && this._isCorrectType(item);
                }, this);
            }

            this.inherited(arguments);
        },
        _userEnabled: function _userEnabled(item) {
            // If User is null, it is probably a team
            if (item.User === null || item.User.Enabled) {
                return true;
            }

            return false;
        },
        _isCorrectType: function _isCorrectType(item) {
            // If user is null, it is probably a team
            if (item.User === null) {
                return true;
            }

            // Filter out WebViewer, Retired, Template and AddOn users like the user list does
            return item.User.Type !== 3 && item.User.Type !== 5 && item.User.Type !== 6 && item.User.Type !== 7;
        }
    });

    _lang['default'].setObject('Mobile.SalesLogix.Views.Owner.List', __class);
    module.exports = __class;
});
