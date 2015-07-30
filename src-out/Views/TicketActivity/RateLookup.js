define('crm/Views/TicketActivity/RateLookup', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'argos/List'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _argosList) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _string = _interopRequireDefault(_dojoString);

  var _List = _interopRequireDefault(_argosList);

  /**
   * @class crm.Views.TicketActivity.RateLookup
   *
   * @extends argos.List
   */
  var __class = (0, _declare['default'])('crm.Views.TicketActivity.RateLookup', [_List['default']], {
    //Templates
    itemTemplate: new Simplate(['<h3>{%: $.RateTypeCode %} - {%: $.Amount %}</h3>', '<h4>{%: $.TypeDescription %}</h4>']),

    //Localization
    titleText: 'Rates',

    //View Properties
    id: 'ticketactivity_ratelookup',
    expose: false,
    queryOrderBy: 'Amount asc',
    querySelect: ['Amount', 'RateTypeCode', 'TypeDescription'],
    resourceKind: 'ticketActivityRates',

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      return _string['default'].substitute('upper(RateTypeCode) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.TicketActivity.RateLookup', __class);
  module.exports = __class;
});
