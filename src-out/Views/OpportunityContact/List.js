define('crm/Views/OpportunityContact/List', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'argos/List'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _argosList) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _string = _interopRequireDefault(_dojoString);

  var _List = _interopRequireDefault(_argosList);

  /**
   * @class crm.Views.OpportunityContact.List
   *
   * @extends argos.List
   */
  var __class = (0, _declare['default'])('crm.Views.OpportunityContact.List', [_List['default']], {
    //Template
    itemTemplate: new Simplate(['<h3 class="{% if ($.IsPrimary) { %} primary {% } %}">{%: $.Contact.NameLF %}</h3>', '<h4 class="{% if ($.IsPrimary) { %} primary {% } %}">', '{% if ($.SalesRole) { %}', '{%: $.SalesRole %} | ', '{% } %}', '{%: $.Contact.Title %}</h4>']),

    //Localization
    titleText: 'Opportunity Contacts',
    selectTitleText: 'Select Contact',
    activitiesText: 'Activities',
    notesText: 'Notes',
    scheduleText: 'Schedule',

    //View Properties
    id: 'opportunitycontact_list',
    detailView: 'opportunitycontact_detail',
    selectView: 'contact_related',
    insertView: 'opportunitycontact_edit',
    security: 'Entities/Contact/View',
    queryOrderBy: 'Contact.NameLF',
    expose: false,
    querySelect: ['Contact/Account/AccountName', 'Contact/AccountName', 'SalesRole', 'IsPrimary', 'Contact/NameLF', 'Contact/Title'],
    resourceKind: 'opportunityContacts',

    complete: function complete() {
      var view = App.getPrimaryActiveView(),
          context,
          selections,
          selectionKey,
          selectionModel = view && view.get('selectionModel'),
          entry;
      if (!selectionModel) {
        return;
      }

      if (selectionModel.getSelectionCount() === 0 && view.options.allowEmptySelection) {
        ReUI.back();
      }

      context = App.isNavigationFromResourceKind(['opportunities']);
      selections = selectionModel.getSelections();

      for (selectionKey in selections) {
        if (selections.hasOwnProperty(selectionKey)) {
          entry = {
            'Opportunity': {
              '$key': context.key
            },
            'Contact': view.entries[selectionKey]
          };
        }
      }

      if (entry) {
        this.navigateToInsertView(entry);
      }
    },
    createNavigationOptions: function createNavigationOptions() {
      var options = {
        query: this.expandExpression(this.options.prefilter),
        selectionOnly: true,
        singleSelect: true,
        singleSelectAction: 'complete',
        allowEmptySelection: false,
        enableActions: false,
        title: this.selectTitleText,
        select: ['Account/AccountName', 'AccountName', 'NameLF', 'Title'],
        tools: {
          tbar: [{
            id: 'complete',
            fn: this.complete,
            cls: 'invisible',
            scope: this
          }, {
            id: 'cancel',
            side: 'left',
            fn: ReUI.back,
            scope: ReUI
          }]
        }
      };
      return options;
    },
    navigateToInsertView: function navigateToInsertView(entry) {
      var view = App.getView(this.insertView),
          options = {
        entry: entry,
        insert: true
      };
      if (view && options) {
        view.show(options, {
          returnTo: -1
        });
      }
    },
    navigateToSelectView: function navigateToSelectView() {
      var view = App.getView(this.selectView),
          options = this.createNavigationOptions();
      if (view && options) {
        view.show(options);
      }
    },
    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {
        'tbar': [{
          id: 'associate',
          cls: 'fa fa-plus fa-fw fa-lg',
          action: 'navigateToSelectView',
          security: App.getViewSecurity(this.insertView, 'insert')
        }]
      });
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      return _string['default'].substitute('(upper(Contact.NameLF) like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.OpportunityContact.List', __class);
  module.exports = __class;
});
