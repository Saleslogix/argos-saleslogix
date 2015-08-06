define('crm/Views/ErrorLog/List', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/store/Memory', 'argos/Convert', 'argos/ErrorManager', 'argos/List'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoStoreMemory, _argosConvert, _argosErrorManager, _argosList) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _Memory = _interopRequireDefault(_dojoStoreMemory);

  var _convert = _interopRequireDefault(_argosConvert);

  var _ErrorManager = _interopRequireDefault(_argosErrorManager);

  var _List = _interopRequireDefault(_argosList);

  /**
   * @class crm.Views.ErrorLog.List
   *
   * @extends argos.List
   *
   * @requires crm.Format
   * @requires argos.ErrorManager
   */
  var __class = (0, _declare['default'])('crm.Views.ErrorLog.List', [_List['default']], {
    // Localization
    titleText: 'Error Logs',
    errorDateFormatText: 'MM/DD/YYYY hh:mm A',

    // Templates
    itemTemplate: new Simplate(['<h3>{%: crm.Format.date($.Date, $$.errorDateFormatText) %}</h3>', '<h4>{%: $.Description %}</h4>']),

    // View Properties
    id: 'errorlog_list',
    enableSearch: false,
    enablePullToRefresh: false,
    hideSearch: true,
    expose: false,
    detailView: 'errorlog_detail',

    _onRefresh: function _onRefresh(o) {
      this.inherited(arguments);
      if (o.resourceKind === 'errorlogs' || o.resourceKind === 'localStorage') {
        this.refreshRequired = true;
      }
    },
    createStore: function createStore() {
      var errorItems = _ErrorManager['default'].getAllErrors();

      errorItems.sort(function sortErrorItems(a, b) {
        a.errorDateStamp = a.errorDateStamp || a.Date;
        b.errorDateStamp = b.errorDateStamp || b.Date;
        a.Date = a.errorDateStamp;
        b.Date = b.errorDateStamp;
        var A = _convert['default'].toDateFromString(a.errorDateStamp);
        var B = _convert['default'].toDateFromString(b.errorDateStamp);

        return A.valueOf() > B.valueOf();
      });

      return new _Memory['default']({
        data: errorItems
      });
    },
    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {
        'tbar': []
      });
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.ErrorLog.List', __class);
  module.exports = __class;
});
