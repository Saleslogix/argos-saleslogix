define('crm/Views/ProductProgram/List', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'crm/Format', 'argos/List'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _crmFormat, _argosList) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _string = _interopRequireDefault(_dojoString);

    var _format = _interopRequireDefault(_crmFormat);

    var _List = _interopRequireDefault(_argosList);

    /**
     * @class crm.Views.ProductProgram.List
     *
     * @extends argos.List
     *
     * @requires crm.Format
     */
    var __class = (0, _declare['default'])('crm.Views.ProductProgram.List', [_List['default']], {
        //Templates
        itemTemplate: new Simplate(['<h3>{%: $.Program %}</h3>', '<h4>', '{%: $.Price %}', '</h4>']),

        //Localization
        titleText: 'Product Programs',

        //View Properties
        id: 'productprogram_list',
        security: 'Entities/ProductProgram/View',
        queryOrderBy: 'Program',
        querySelect: ['DefaultProgram', 'Program', 'Price'],
        resourceKind: 'productPrograms',

        formatSearchQuery: function formatSearchQuery(searchQuery) {
            return _string['default'].substitute('(upper(Program) like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });

    _lang['default'].setObject('Mobile.SalesLogix.Views.ProductProgram.List', __class);
    module.exports = __class;
});
