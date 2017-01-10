import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import List from 'argos/List';
import getResource from 'argos/I18n';

const resource = getResource('opportunityContactList');

/**
 * @class crm.Views.OpportunityContact.List
 *
 * @extends argos.List
 */
const __class = declare('crm.Views.OpportunityContact.List', [List], {
  // Template
  itemTemplate: new Simplate([
    '<h3 class="{% if ($.IsPrimary) { %} primary {% } %}">{%: $.Contact.NameLF %}</h3>',
    '<h4 class="{% if ($.IsPrimary) { %} primary {% } %}">',
    '{% if ($.SalesRole) { %}',
    '{%: $.SalesRole %} | ',
    '{% } %}',
    '{%: $.Contact.Title %}</h4>',
  ]),

  // Localization
  titleText: resource.titleText,
  selectTitleText: resource.selectTitleText,
  activitiesText: resource.activitiesText,
  notesText: resource.notesText,
  scheduleText: resource.scheduleText,

  // View Properties
  id: 'opportunitycontact_list',
  detailView: 'opportunitycontact_detail',
  selectView: 'contact_related',
  insertView: 'opportunitycontact_edit',
  security: 'Entities/Contact/View',
  queryOrderBy: 'Contact.NameLF',
  expose: false,
  querySelect: [
    'Contact/Account/AccountName',
    'Contact/AccountName',
    'SalesRole',
    'IsPrimary',
    'Contact/NameLF',
    'Contact/Title',
  ],
  resourceKind: 'opportunityContacts',

  complete: function complete() {
    const view = App.getPrimaryActiveView();
    const selectionModel = view && view.get('selectionModel');
    let entry;

    if (!selectionModel) {
      return;
    }

    if (selectionModel.getSelectionCount() === 0 && view.options.allowEmptySelection) {
      ReUI.back();
    }

    const context = App.isNavigationFromResourceKind(['opportunities']);
    const selections = selectionModel.getSelections();

    for (const selectionKey in selections) {
      if (selections.hasOwnProperty(selectionKey)) {
        entry = {
          Opportunity: {
            $key: context.key,
          },
          Contact: view.entries[selectionKey],
        };
      }
    }

    if (entry) {
      this.navigateToInsertView(entry);
    }
  },
  createNavigationOptions: function createNavigationOptions() {
    const options = {
      query: this.expandExpression(this.options.prefilter),
      selectionOnly: true,
      singleSelect: true,
      singleSelectAction: 'complete',
      allowEmptySelection: false,
      enableActions: false,
      title: this.selectTitleText,
      select: [
        'Account/AccountName',
        'AccountName',
        'NameLF',
        'Title',
      ],
      tools: {
        tbar: [{
          id: 'complete',
          fn: this.complete,
          cls: 'invisible',
          scope: this,
        }, {
          id: 'cancel',
          side: 'left',
          fn: ReUI.back,
          scope: ReUI,
        }],
      },
    };
    return options;
  },
  navigateToInsertView: function navigateToInsertView(entry) {
    const view = App.getView(this.insertView);
    const options = {
      entry,
      insert: true,
    };
    if (view && options) {
      view.show(options, {
        returnTo: -1,
      });
    }
  },
  navigateToSelectView: function navigateToSelectView() {
    const view = App.getView(this.selectView);
    const options = this.createNavigationOptions();
    if (view && options) {
      view.show(options);
    }
  },
  createToolLayout: function createToolLayout() {
    return this.tools || (this.tools = {
      tbar: [{
        id: 'associate',
        cls: 'fa fa-plus fa-fw fa-lg',
        action: 'navigateToSelectView',
        security: App.getViewSecurity(this.insertView, 'insert'),
      }],
    });
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute('(upper(Contact.NameLF) like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
});

lang.setObject('Mobile.SalesLogix.Views.OpportunityContact.List', __class);
export default __class;
