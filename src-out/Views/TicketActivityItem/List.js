define('crm/Views/TicketActivityItem/List', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'argos/List'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _argosList) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _string = _interopRequireDefault(_dojoString);

  var _List = _interopRequireDefault(_argosList);

  /**
   * @class crm.Views.TicketActivityItem.List
   *
   * @extends argos.List
   *
   * @requires crm.Format
   */
  var __class = (0, _declare['default'])('crm.Views.TicketActivityItem.List', [_List['default']], {
    // Templates
    itemTemplate: new Simplate(['<h3>{%: $.Product.Name %}</h3>', '<h4>{%: $.Product.ActualId %} - {%: crm.Format.currency($.ItemAmount) %}</h4>', '<h4>{%: $.ItemDescription %}</h4>']),

    // Localization
    titleText: 'Ticket Activity Parts',

    // View Properties
    id: 'ticketactivityitem_list',
    detailView: 'ticketactivityitem_detail',
    expose: false,
    querySelect: ['Product/Name', 'Product/ActualId', 'ItemDescription', 'ItemAmount'],
    resourceKind: 'ticketActivityItems',

    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {
        'tbar': []
      });
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      return _string['default'].substitute('(upper(Product.Name) like "${0}%" or upper(Product.Family) like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.TicketActivityItem.List', __class);
  module.exports = __class;
});
