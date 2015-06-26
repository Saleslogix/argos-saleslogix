define('crm/Views/Product/List', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', '../../Format', 'argos/List'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _Format, _argosList) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _string = _interopRequireDefault(_dojoString);

    var _format = _interopRequireDefault(_Format);

    var _List = _interopRequireDefault(_argosList);

    /**
     * @class crm.Views.Product.List
     *
     * @extends argos.List
     *
     * @requires crm.Format
     */
    var __class = (0, _declare['default'])('crm.Views.Product.List', [_List['default']], {
        //Templates
        itemTemplate: new Simplate(['<h3>{%: $.Name %} | {%: $.Description %}</h3>', '<h4>', '{%: $.Family %}', '</h4>']),

        //Localization
        titleText: 'Products',

        //View Properties
        id: 'product_list',
        security: 'Entities/Product/View',
        queryOrderBy: 'Name',
        querySelect: ['Description', 'Name', 'Family', 'Price', 'Program', 'FixedCost'],
        resourceKind: 'products',

        formatSearchQuery: function formatSearchQuery(searchQuery) {
            return _string['default'].substitute('(upper(Name) like "${0}%" or upper(Family) like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });

    _lang['default'].setObject('Mobile.SalesLogix.Views.Product.List', __class);
    module.exports = __class;
});
