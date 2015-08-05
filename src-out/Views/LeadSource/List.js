define('crm/Views/LeadSource/List', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'argos/List'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _argosList) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _string = _interopRequireDefault(_dojoString);

  var _List = _interopRequireDefault(_argosList);

  /**
   * @class crm.Views.LeadSource.List
   *
   * @extends argos.List
   */
  var __class = (0, _declare['default'])('crm.Views.LeadSource.List', [_List['default']], {
    //Templates
    itemTemplate: new Simplate(['<h3>{%: $.Description %}</h3>', '<h4>{%: $.Status %}</h4>']),

    //Localization
    titleText: 'Lead Sources',

    //View Properties
    id: 'leadsource_list',
    security: 'Entities/LeadSource/View',
    queryOrderBy: 'Description',
    querySelect: ['Description', 'Status'],
    resourceKind: 'leadsources',

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      return _string['default'].substitute('upper(Description) like "${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.LeadSource.List', __class);
  module.exports = __class;
});
