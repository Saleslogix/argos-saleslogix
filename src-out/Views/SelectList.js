define('crm/Views/SelectList', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/store/Memory', 'argos/List'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoStoreMemory, _argosList) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _Memory = _interopRequireDefault(_dojoStoreMemory);

  var _List = _interopRequireDefault(_argosList);

  /**
   * @class crm.Views.SelectList
   *
   *
   * @extends argos.List
   *
   */
  var __class = (0, _declare['default'])('crm.Views.SelectList', [_List['default']], {
    // Templates
    itemTemplate: new Simplate(['<h3>{%: $.$descriptor %}</h3>']),

    // View Properties
    id: 'select_list',
    expose: false,
    enablePullToRefresh: false,

    refreshRequiredFor: function refreshRequiredFor(options) {
      if (this.options) {
        return options ? this.options.data !== options.data : false;
      }
      return true;
    },
    hasMoreData: function hasMoreData() {
      return false;
    },
    requestData: function requestData() {
      this.store = null;
      this.inherited(arguments);
    },
    createStore: function createStore() {
      // caller is responsible for passing in a well-structured feed object.
      var data = this.expandExpression(this.options && this.options.data && this.options.data.$resources);
      var store = new _Memory['default']({
        data: data
      });
      store.idProperty = '$key';
      return store;
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.SelectList', __class);
  module.exports = __class;
});
