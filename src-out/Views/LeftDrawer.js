define('crm/Views/LeftDrawer', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/array', 'dojo/_base/lang', 'dojo/store/Memory', '../SpeedSearchWidget', 'argos/GroupedList'], function (exports, module, _dojo_baseDeclare, _dojo_baseArray, _dojo_baseLang, _dojoStoreMemory, _SpeedSearchWidget, _argosGroupedList) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _array = _interopRequireDefault(_dojo_baseArray);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _Memory = _interopRequireDefault(_dojoStoreMemory);

  var _SpeedSearchWidget2 = _interopRequireDefault(_SpeedSearchWidget);

  var _GroupedList = _interopRequireDefault(_argosGroupedList);

  /**
   * @class crm.Views.LeftDrawer
   *
   *
   * @extends argos.GroupedList
   *
   */
  var __class = (0, _declare['default'])('crm.Views.LeftDrawer', [_GroupedList['default']], {
    // Templates
    cls: ' contextualContent',
    rowTemplate: new Simplate(['<li data-action="{%= $.action %}" {% if ($.view) { %}data-view="{%= $.view %}"{% } %}>', '{% if ($$._hasIcon($)) { %}', '<div class="list-item-static-selector">', '{% if ($.iconTemplate) { %}', '{%! $.iconTemplate %}', '{% } else if ($.cls) { %}', '<div class="{%: $.cls %}"></div>', '{% } else if ($.icon) { %}', '<img src="{%: $.icon %}" alt="icon" class="icon" />', '{% } %}', '</div>', '{% } %}', '<div class="list-item-content">{%! $$.itemTemplate %}</div>', '</li>']),
    _hasIcon: function _hasIcon(entry) {
      return entry.iconTemplate || entry.cls || entry.icon;
    },
    itemTemplate: new Simplate(['<h3>{%: $.title %}</h3>']),

    // Localization
    configureText: 'Configure Menu',
    addAccountContactText: 'Add Account/Contact',
    titleText: 'Main Menu',
    actionsText: 'Quick Actions',
    viewsText: 'Go To',
    footerText: 'Other',
    settingsText: 'Settings',
    helpText: 'Help',
    logOutText: 'Log Out',
    logOutConfirmText: 'Are you sure you want to log out?',

    // View Properties
    id: 'left_drawer',
    expose: false,
    enableSearch: true,
    searchWidgetClass: _SpeedSearchWidget2['default'],
    customizationSet: 'left_drawer',

    settingsView: 'settings',
    helpView: 'help',
    configurationView: 'configure',
    addAccountContactView: 'add_account_contact',
    searchView: 'speedsearch_list',

    logOut: function logOut() {
      var sure = window.confirm(this.logOutConfirmText); // eslint-disable-line
      if (sure) {
        App.logOut();
      }
    },
    loadAndNavigateToView: function loadAndNavigateToView(params) {
      var view = App.getView(params && params.view);
      this.navigateToView(view);
    },
    navigateToView: function navigateToView(view) {
      App.snapper.close();
      if (view) {
        view.show();
      }
    },
    addAccountContact: function addAccountContact() {
      App.snapper.close();
      var view = App.getView('add_account_contact');
      if (view) {
        view.show({
          insert: true
        });
      }
    },
    navigateToConfigurationView: function navigateToConfigurationView() {
      var view = App.getView(this.configurationView);
      this.navigateToView(view);
    },
    navigateToSettingsView: function navigateToSettingsView() {
      var view = App.getView(this.settingsView);
      this.navigateToView(view);
    },
    navigateToHelpView: function navigateToHelpView() {
      var view = App.getView(this.helpView);
      this.navigateToView(view);
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var expression = new RegExp(searchQuery, 'i');

      return function testExpression(entry) {
        return expression.test(entry.title);
      };
    },
    hasMoreData: function hasMoreData() {
      return false;
    },
    getGroupForEntry: function getGroupForEntry(entry) {
      var footerItems = ['ConfigureMenu', 'SettingsAction', 'HelpAction', 'Logout'];

      if (entry.view) {
        return {
          tag: 'view',
          title: this.viewsText
        };
      }

      if (_array['default'].indexOf(footerItems, entry.name) >= 0) {
        return {
          tag: 'footer',
          title: this.footerText
        };
      }

      return {
        tag: 'action',
        title: this.actionsText
      };
    },
    init: function init() {
      this.inherited(arguments);
      this.connect(App, 'onRegistered', this._onRegistered);
    },
    createLayout: function createLayout() {
      if (this.layout) {
        return this.layout;
      }

      var layout = [];

      var quickActions = {
        id: 'actions',
        children: [{
          'name': 'AddAccountContactAction',
          'action': 'addAccountContact',
          'title': this.addAccountContactText
        }]
      };

      layout.push(quickActions);

      var goTo = {
        id: 'views',
        children: []
      };

      var configured = _lang['default'].getObject('preferences.home.visible', false, window.App);
      for (var i = 0; i < configured.length; i++) {
        var view = App.getView(configured[i]);
        if (view) {
          goTo.children.push({
            'action': 'loadAndNavigateToView',
            'view': view.id,
            'title': view.titleText,
            'security': view.getSecurity(),
            'offlineSupport': view.offlineSupport
          });
        }
      }

      layout.push(goTo);

      var footer = {
        id: 'footer',
        children: [{
          'name': 'ConfigureMenu',
          'action': 'navigateToConfigurationView',
          'title': this.configureText,
          'offlineSupport': true
        }, {
          'name': 'SettingsAction',
          'action': 'navigateToSettingsView',
          'title': this.settingsText,
          'offlineSupport': true
        }, {
          'name': 'HelpAction',
          'action': 'navigateToHelpView',
          'title': this.helpText,
          'offlineSupport': true
        }, {
          'name': 'Logout',
          'action': 'logOut',
          'title': this.logOutText,
          'offlineSupport': false
        }]
      };

      layout.push(footer);

      return layout;
    },
    createStore: function createStore() {
      var layout = this._createCustomizedLayout(this.createLayout());
      var list = [];
      var total = 0;
      var section = undefined;

      for (var i = 0; i < layout.length; i++) {
        section = layout[i].children;

        for (var j = 0; j < section.length; j++) {
          total = total + 1;
          var row = section[j];
          row.$key = total;

          if (row.security && !App.hasAccessTo(row.security)) {
            continue;
          }

          if (!App.isOnline() && !row.offlineSupport) {
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
      store.idProperty = '$key';
      return store;
    },
    /**
     * Override the List refresh to also clear the view (something the beforeTransitionTo handles, but we are not using)
     */
    refresh: function refresh() {
      this.clear();
      this.requestData();
    },
    clear: function clear() {
      this.inherited(arguments);
      this.layout = null;
      this.store = null;
    },
    show: function show() {
      if (this.onShow(this) === false) {
        return;
      }

      this.refresh();
    },
    refreshRequiredFor: function refreshRequiredFor() {
      var visible = _lang['default'].getObject('preferences.home.visible', false, App) || [];
      var shown = this.feed && this.feed.$resources;

      if (!visible || !shown || visible.length !== shown.length) {
        return true;
      }

      for (var i = 0; i < visible.length; i++) {
        if (visible[i] !== shown[i].$key) {
          return true;
        }
      }

      return this.inherited(arguments);
    },
    _onRegistered: function _onRegistered() {
      this.refreshRequired = true;
    },
    _onSearchExpression: function _onSearchExpression(expression) {
      var view = App.getView(this.searchView);
      var current = App.getPrimaryActiveView();

      if (view) {
        // If the speedsearch list is not our current view, show it first
        if (view.id !== current.id) {
          view.show({
            query: expression
          });
        }

        // Set the search term on the list and call search.
        // This will keep the search terms on each widget in sync.
        setTimeout(function () {
          view.setSearchTerm(expression);
          if (current && current.id === view.id) {
            view.search();
          }
        }, 10);
      }

      App.snapper.close();
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.LeftDrawer', __class);
  module.exports = __class;
});
