define('crm/Views/Ticket/UrgencyLookup', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'argos/List'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _argosList) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _string = _interopRequireDefault(_dojoString);

  var _List = _interopRequireDefault(_argosList);

  /**
   * @class crm.Views.Ticket.UrgencyLookup
   *
   * @extends argos.List
   */
  var __class = (0, _declare['default'])('crm.Views.Ticket.UrgencyLookup', [_List['default']], {
    //Localization
    titleText: 'Ticket Urgency',

    //Templates
    itemTemplate: new Simplate(['<h3>{%: $.Description %}</h3>']),

    //View Properties
    id: 'urgency_list',
    queryOrderBy: 'UrgencyCode asc',
    querySelect: ['Description', 'UrgencyCode'],
    resourceKind: 'urgencies',

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var escaped, toUpper;
      toUpper = searchQuery && searchQuery.toUpperCase() || '';
      escaped = this.escapeSearchQuery(toUpper);
      return _string['default'].substitute('upper(Description) like "%${0}%"', [escaped]);
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.Ticket.UrgencyLookup', __class);
  module.exports = __class;
});
