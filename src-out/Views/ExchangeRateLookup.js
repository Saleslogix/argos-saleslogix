define('crm/Views/ExchangeRateLookup', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', 'argos/_LegacySDataListMixin'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _argosList, _argos_LegacySDataListMixin) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _List = _interopRequireDefault(_argosList);

  var _LegacySDataListMixin2 = _interopRequireDefault(_argos_LegacySDataListMixin);

  /**
   * @class crm.Views.ExchangeRateLookup
   *
   *
   * @extends argos.List
   * @mixins argos._LegacySDataListMixin
   *
   */
  var __class = (0, _declare['default'])('crm.Views.ExchangeRateLookup', [_List['default'], _LegacySDataListMixin2['default']], {
    // Templates
    itemTemplate: new Simplate(['<h3>{%: $.$key %} ({%: $.Rate %})</h3>']),

    // Localization
    titleText: 'Exchange Rates',

    // View Properties
    expose: false,
    enableSearch: false,
    id: 'exchangerate_lookup',

    requestData: function requestData() {
      this.processFeed();
    },
    processFeed: function processFeed() {
      var rates = App.context && App.context.exchangeRates;
      var list = [];
      var feed = {};

      for (var prop in rates) {
        if (rates.hasOwnProperty(prop)) {
          list.push({
            '$key': prop,
            '$descriptor': prop,
            'Rate': rates[prop]
          });
        }
      }

      feed.$resources = list;

      this.inherited(arguments, [feed]);
    },
    hasMoreData: function hasMoreData() {
      return false;
    },
    refreshRequiredFor: function refreshRequiredFor() {
      return true;
    },
    formatSearchQuery: function formatSearchQuery() {}
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.ExchangeRateLookup', __class);
  module.exports = __class;
});
