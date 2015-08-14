define('crm/Views/Competitor/List', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'argos/List'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _argosList) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _string = _interopRequireDefault(_dojoString);

  var _List = _interopRequireDefault(_argosList);

  /**
   * @class crm.Views.Competitor.List
   *
   * @extends argos.List
   *
   * @requires argos.List
   *
   */
  var __class = (0, _declare['default'])('crm.Views.Competitor.List', [_List['default']], {
    // Templates
    itemTemplate: new Simplate(['<h3>{%= $.CompetitorName %}</h3>', '{% if ($.WebAddress) { %}<h4>{%= $.WebAddress %}</h4>{% } %}']),

    // Localization
    titleText: 'Competitors',

    // View Properties
    detailView: 'competitor_detail',
    id: 'competitor_list',
    security: 'Entities/Competitor/View',
    insertView: 'competitor_edit',
    queryOrderBy: 'CompetitorName asc',
    querySelect: ['CompetitorName', 'WebAddress'],
    resourceKind: 'competitors',

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      return _string['default'].substitute('(CompetitorName like "%${0}%")', [this.escapeSearchQuery(searchQuery)]);
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.Competitor.List', __class);
  module.exports = __class;
});
