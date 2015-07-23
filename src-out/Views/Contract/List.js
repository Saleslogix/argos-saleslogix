define('crm/Views/Contract/List', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'argos/List'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _argosList) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _string = _interopRequireDefault(_dojoString);

    var _List = _interopRequireDefault(_argosList);

    /**
     * @class crm.Views.Contract.List
     *
     * @extends argos.List
     */
    var __class = (0, _declare['default'])('crm.Views.Contract.List', [_List['default']], {
        //Templates
        itemTemplate: new Simplate(['<h3>{%= $.Account ? $.Account.AccountName : "" %}</h3>', '<h4>{%= $.ReferenceNumber %}</h4>']),

        //Localization
        titleText: 'Contracts',

        //View Properties
        contextView: 'context_dialog',
        detailView: 'contract_detail',
        id: 'contract_list',
        security: 'Entities/Contract/View',
        insertView: 'contract_edit',
        queryOrderBy: 'ReferenceNumber asc',
        querySelect: ['Account/AccountName', 'Contact/FullName', 'ReferenceNumber'],
        resourceKind: 'contracts',

        formatSearchQuery: function formatSearchQuery(searchQuery) {
            return _string['default'].substitute('(ReferenceNumber like "%${0}%")', [this.escapeSearchQuery(searchQuery)]);
        }
    });

    _lang['default'].setObject('Mobile.SalesLogix.Views.Contract.List', __class);
    module.exports = __class;
});
