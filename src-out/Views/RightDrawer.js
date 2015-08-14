define('crm/Views/RightDrawer', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/store/Memory', 'argos/GroupedList'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoStoreMemory, _argosGroupedList) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _Memory = _interopRequireDefault(_dojoStoreMemory);

  var _GroupedList = _interopRequireDefault(_argosGroupedList);

  /**
   * @class crm.Views.RightDrawer
   *
   *
   * @extends argos.GroupedList
   *
   */
  var __class = (0, _declare['default'])('crm.Views.RightDrawer', [_GroupedList['default']], {
    // Templates
    cls: ' contextualContent',
    rowTemplate: new Simplate(['<li class="{%: $.cls %}" data-action="{%= $.action %}"', '{% if($.dataProps) { %}', '{% for(var prop in $.dataProps) { %}', ' data-{%= prop %}="{%= $.dataProps[prop] %}"', '{% } %}', '{% } %}', '>', '{% if ($$._hasIcon($)) { %}', '<div class="list-item-static-selector {%: $.iconCls %} ">', '{% if ($.icon) { %}', '<img src="{%: $.icon %}" alt="icon" class="icon" />', '{% } %}', '</div>', '{% } %}', '<div class="list-item-content">{%! $$.itemTemplate %}</div>', '</li>']),
    _hasIcon: function _hasIcon(entry) {
      return entry.iconTemplate || entry.cls || entry.icon || entry.iconCls;
    },
    itemTemplate: new Simplate(['<h3>{%: $.title %}</h3>']),

    // View Properties
    id: 'right_drawer',
    expose: false,
    enableSearch: false,
    customizationSet: 'right_drawer',
    dataProps: null,

    hasMoreData: function hasMoreData() {
      return false;
    },
    getGroupForEntry: function getGroupForEntry() {},
    init: function init() {
      this.inherited(arguments);
      this.connect(App, 'onRegistered', this._onRegistered);
    },
    setLayout: function setLayout(layout) {
      this.layout = layout;
    },
    createLayout: function createLayout() {
      return this.layout || [];
    },
    createStore: function createStore() {
      var layout = this._createCustomizedLayout(this.createLayout());
      var list = [];

      for (var i = 0; i < layout.length; i++) {
        var section = layout[i].children;

        for (var j = 0; j < section.length; j++) {
          var row = section[j];

          if (row.security && !App.hasAccessTo(row.security)) {
            continue;
          }
          if (typeof this.query !== 'function' || this.query(row)) {
            list.push(row);
          }
        }
      }

      var store = new _Memory['default']({
        data: list
      });
      return store;
    },
    clear: function clear() {
      this.inherited(arguments);
      this.store = null;
    },
    /**
     * Override the List refresh to also clear the view (something the beforeTransitionTo handles, but we are not using)
     */
    refresh: function refresh() {
      this.clear();
      this.requestData();
    },
    show: function show() {
      if (this.onShow(this) === false) {
        return;
      }

      this.refresh();
    },
    _onRegistered: function _onRegistered() {
      this.refreshRequired = true;
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.RightDrawer', __class);
  module.exports = __class;
});
