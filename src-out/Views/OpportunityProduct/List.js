define('crm/Views/OpportunityProduct/List', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'argos/List'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _argosList) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _string = _interopRequireDefault(_dojoString);

  var _List = _interopRequireDefault(_argosList);

  /**
   * @class crm.Views.OpportunityProduct.List
   *
   * @extends argos.List
   *
   * @requires crm.Format
   */
  var __class = (0, _declare['default'])('crm.Views.OpportunityProduct.List', [_List['default']], {
    // Templates
    itemTemplate: new Simplate(['<h3>{%: $.Product.Name %}</h3>', '<h4>', '{% if ($.Product) { %} {%: $.Product.Family %} | {% } %}', '{%: $.Program %} | {%: crm.Format.currency($.Price) %}', '</h4>', '<h4>', '{%: $.Quantity %} x {%: crm.Format.currency($.CalculatedPrice) %} ', '({%: crm.Format.percent($.Discount) %}) = ', '<strong>', '{% if (App.hasMultiCurrency()) { %}', '{%: crm.Format.multiCurrency($.ExtendedPrice, App.getBaseExchangeRate().code) %}', '{% } else { %}', '{%: crm.Format.currency($.ExtendedPrice) %}', '{% } %}', '</strong>', '</h4>']),

    // Localization
    titleText: 'Products',

    // View Properties
    id: 'opportunityproduct_list',
    security: 'Entities/Opportunity/View',
    detailView: 'opportunityproduct_detail',
    insertView: 'opportunityproduct_edit',
    queryOrderBy: 'Sort',
    querySelect: ['Product/Name', 'Product/Family', 'Program', 'Price', 'Discount', 'CalculatedPrice', 'Quantity', 'ExtendedPrice'],
    resourceKind: 'opportunityproducts',
    allowSelection: true,
    enableActions: true,

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      return _string['default'].substitute('(upper(Product.Name) like "${0}%" or upper(Product.Family) like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.OpportunityProduct.List', __class);
  module.exports = __class;
});
