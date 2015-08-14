define('crm/Views/Settings', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/_base/connect', './_CardLayoutListMixin', 'argos/List'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojo_baseConnect, _CardLayoutListMixin2, _argosList) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _connect = _interopRequireDefault(_dojo_baseConnect);

  var _CardLayoutListMixin3 = _interopRequireDefault(_CardLayoutListMixin2);

  var _List = _interopRequireDefault(_argosList);

  /**
   * @class crm.Views.Settings
   *
   *
   * @extends argos.List
   *
   */
  var __class = (0, _declare['default'])('crm.Views.Settings', [_List['default'], _CardLayoutListMixin3['default']], {
    // Templates
    itemIconTemplate: new Simplate(['<button data-action="{%= $.action %}" {% if ($.view) { %}data-view="{%= $.view %}"{% } %} class="list-item-selector button visible">', '{% if ($$.getItemIconClass($)) { %}', '<span class="{%= $$.getItemIconClass($) %}"></span>', '{% } else { %}', '<img id="list-item-image_{%: $.$key %}" src="{%: $$.getItemIconSource($) %}" alt="{%: $$.getItemIconAlt($) %}" class="icon" />', '{% } %}', '</button>']),

    itemTemplate: new Simplate(['<h3 data-action="{%= $.action %}">{%: $.title %}</h3>']),

    itemRowContainerTemplate: new Simplate(['<li data-action="{%= $.action %}" {% if ($.view) { %}data-view="{%= $.view %}"{% } %}>', '{%! $$.itemRowContentTemplate %}', '</li>']),

    // Localization
    clearLocalStorageTitleText: 'Clear Storage',
    clearAuthenticationTitleText: 'Clear Saved Credentials',
    errorLogTitleText: 'View Error Logs',
    localStorageClearedText: 'Local storage cleared successfully.',
    credentialsClearedText: 'Saved credentials cleared successfully.',
    titleText: 'Settings',

    // View Properties
    id: 'settings',
    expose: false,
    enableSearch: false,
    enablePullToRefresh: false,
    selectionOnly: true,
    allowSelection: false,
    actions: null,
    actionOrder: ['clearAuthentication', 'clearLocalStorage', 'viewErrorLogs'],
    createActions: function createActions() {
      this.actions = {
        'clearLocalStorage': {
          title: this.clearLocalStorageTitleText,
          cls: 'fa fa-database fa-2x'
        },
        'clearAuthentication': {
          title: this.clearAuthenticationTitleText,
          cls: 'fa fa-unlock fa-2x'
        },
        'viewErrorLogs': {
          title: this.errorLogTitleText,
          cls: 'fa fa-list-alt fa-2x'
        }
      };
    },
    getItemIconClass: function getItemIconClass(entry) {
      return entry.cls;
    },
    createIndicatorLayout: function createIndicatorLayout() {
      return this.itemIndicators || (this.itemIndicators = []);
    },
    viewErrorLogs: function viewErrorLogs() {
      var view = App.getView('errorlog_list');
      if (view) {
        view.show();
      }
    },
    clearLocalStorage: function clearLocalStorage() {
      if (window.localStorage) {
        window.localStorage.clear();
      }

      _connect['default'].publish('/app/refresh', [{
        resourceKind: 'localStorage'
      }]);

      alert(this.localStorageClearedText); // eslint-disable-line
    },
    clearAuthentication: function clearAuthentication() {
      if (window.localStorage) {
        window.localStorage.removeItem('credentials');
      }

      alert(this.credentialsClearedText); // eslint-disable-line
    },
    hasMoreData: function hasMoreData() {
      return false;
    },
    requestData: function requestData() {
      var list = [];

      for (var i = 0; i < this.actionOrder.length; i++) {
        var action = this.actions[this.actionOrder[i]];
        if (action) {
          list.push({
            action: this.actionOrder[i],
            title: action.title,
            icon: action.icon,
            cls: action.cls
          });
        }
      }

      this.processData(list);
    },
    init: function init() {
      this.inherited(arguments);
      this.createActions();
    },
    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {
        tbar: []
      });
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.Settings', __class);
  module.exports = __class;
});
