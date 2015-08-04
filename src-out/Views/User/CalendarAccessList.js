define('crm/Views/User/CalendarAccessList', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'argos/List'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _argosList) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _string = _interopRequireDefault(_dojoString);

  var _List = _interopRequireDefault(_argosList);

  /**
   * @class crm.Views.User.CalendarAccessList
   *
   * @extends argos.List
   */
  var __class = (0, _declare['default'])('crm.Views.User.CalendarAccessList', [_List['default']], {
    //Templates
    itemTemplate: new Simplate(['<h3>{%: $.Name %}</h3>', '<h4>{%: $.SubType %}</h4>']),

    //Localization
    titleText: 'Activity Resources',

    //View Properties
    id: 'calendar_access_list',
    queryOrderBy: 'Name',

    queryWhere: function queryWhere() {
      return "AllowAdd AND (AccessId eq 'EVERYONE' or AccessId eq '" + App.context.user.$key + "') AND Type eq 'User'";
    },
    querySelect: ['Name', 'SubType', 'AccessId', 'ResourceId'],
    resourceKind: 'activityresourceviews',

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      return _string['default'].substitute('upper(Name) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.User.CalendarAccessList', __class);
  module.exports = __class;
});
