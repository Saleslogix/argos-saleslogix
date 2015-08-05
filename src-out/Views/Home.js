define('crm/Views/Home', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/array', 'dojo/_base/lang', '../SpeedSearchWidget', 'argos/GroupedList'], function (exports, module, _dojo_baseDeclare, _dojo_baseArray, _dojo_baseLang, _SpeedSearchWidget, _argosGroupedList) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _array = _interopRequireDefault(_dojo_baseArray);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _SpeedSearchWidget2 = _interopRequireDefault(_SpeedSearchWidget);

  var _GroupedList = _interopRequireDefault(_argosGroupedList);

  /**
   * @class crm.Views.Home
   *
   *
   * @extends argos.GroupedList
   *
   */
  var __class = (0, _declare['default'])('crm.Views.Home', [_GroupedList['default']], {
    //Templates
    rowTemplate: new Simplate(['<li data-action="{%= $.action %}" {% if ($.view) { %}data-view="{%= $.view %}"{% } %}>', '<div class="list-item-static-selector">', '{% if ($.icon) { %}', '<img src="{%: $.icon %}" alt="icon" class="icon" />', '{% } %}', '</div>', '<div class="list-item-content">{%! $$.itemTemplate %}</div>', '</li>']),
    itemTemplate: new Simplate(['<h3>{%: $.title %}</h3>']),

    //Localization
    configureText: 'Configure',
    addAccountContactText: 'Add Account/Contact',
    titleText: 'Home',
    actionsText: 'Quick Actions',
    viewsText: 'Go To',

    //View Properties
    id: 'home',
    expose: false,
    enableSearch: true,
    searchWidgetClass: _SpeedSearchWidget2['default'],
    customizationSet: 'home',
    configurationView: 'configure',
    addAccountContactView: 'add_account_contact',
    searchView: 'speedsearch_list',

    navigateToView: function navigateToView(params) {
      var view = App.getView(params && params.view);
      if (view) {
        view.show();
      }
    },
    addAccountContact: function addAccountContact() {
      var view = App.getView(this.addAccountContactView);
      if (view) {
        view.show({
          insert: true
        });
      }
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var expression = new RegExp(searchQuery, 'i');

      return function (entry) {
        return expression.test(entry.title);
      };
    },
    hasMoreData: function hasMoreData() {
      return false;
    },
    getGroupForEntry: function getGroupForEntry(entry) {
      if (entry.view) {
        return {
          tag: 'view',
          title: this.viewsText
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
    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {
        tbar: [{
          id: 'configure',
          action: 'navigateToConfigurationView'
        }]
      });
    },
    createLayout: function createLayout() {
      // don't need to cache as it is only re-rendered when there is a change
      var configured, layout, visible, i, view;

      configured = _lang['default'].getObject('preferences.home.visible', false, App) || [];
      layout = [{
        id: 'actions',
        children: [{
          'name': 'AddAccountContactAction',
          'action': 'addAccountContact',
          'title': this.addAccountContactText
        }]
      }];

      visible = {
        id: 'views',
        children: []
      };

      for (i = 0; i < configured.length; i++) {
        view = App.getView(configured[i]);
        if (view) {
          visible.children.push({
            'action': 'navigateToView',
            'view': view.id,
            'icon': view.icon,
            'title': view.titleText,
            'security': view.getSecurity()
          });
        }
      }

      layout.push(visible);

      return layout;
    },
    requestData: function requestData() {
      var layout = this._createCustomizedLayout(this.createLayout()),
          i,
          j,
          row,
          section,
          list = [];

      for (i = 0; i < layout.length; i++) {
        section = layout[i].children;

        for (j = 0; j < section.length; j++) {
          row = section[j];

          if (row['security'] && !App.hasAccessTo(row['security'])) {
            continue;
          }
          if (typeof this.query !== 'function' || this.query(row)) {
            list.push(row);
          }
        }
      }

      this.processData(list);
    },

    _onSearchExpression: function _onSearchExpression(expression) {
      var view = App.getView(this.searchView);

      if (view) {
        view.show({
          query: expression
        });
      }
    },

    navigateToConfigurationView: function navigateToConfigurationView() {
      var view = App.getView(this.configurationView);
      if (view) {
        view.show();
      }
    },
    _onRegistered: function _onRegistered() {
      this.refreshRequired = true;
    },
    refreshRequiredFor: function refreshRequiredFor() {
      var visible = _lang['default'].getObject('preferences.home.visible', false, App) || [],
          i,
          shown = this.feed && this.feed['$resources'];

      if (!visible || !shown || visible.length !== shown.length) {
        return true;
      }

      for (i = 0; i < visible.length; i++) {
        if (visible[i] !== shown[i]['$key']) {
          return true;
        }
      }

      return this.inherited(arguments);
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.Home', __class);
  module.exports = __class;
});
