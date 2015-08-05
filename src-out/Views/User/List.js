define('crm/Views/User/List', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'argos/List'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _argosList) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _string = _interopRequireDefault(_dojoString);

  var _List = _interopRequireDefault(_argosList);

  /**
   * @class crm.Views.User.List
   *
   * @extends argos.List
   */
  var __class = (0, _declare['default'])('crm.Views.User.List', [_List['default']], {
    //Templates
    itemTemplate: new Simplate(['<h3>{%: $.UserInfo.LastName %}, {%: $.UserInfo.FirstName %}</h3>', '<h4>{%: $.UserInfo.Title %}</h4>']),

    //Localization
    titleText: 'Users',

    //View Properties
    id: 'user_list',
    queryOrderBy: 'UserInfo.LastName asc, UserInfo.FirstName asc',

    // Excluded types for the queryWhere
    // Type:
    // 3 - WebViewer
    // 5 - Retired
    // 6 - Template
    // 7 - AddOn
    queryWhere: 'Enabled eq true and (Type ne 3 AND Type ne 5 AND Type ne 6 AND Type ne 7)',
    querySelect: ['UserInfo/FirstName', 'UserInfo/LastName', 'UserInfo/Title', 'UserInfo/UserName'],
    resourceKind: 'users',

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      return _string['default'].substitute('upper(UserInfo.UserName) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.User.List', __class);
  module.exports = __class;
});
