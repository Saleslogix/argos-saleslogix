import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import List from 'argos/List';
import SDataStore from 'argos/Store/SData';
import getResource from 'argos/I18n';

const resource = getResource('groupsSelector');

/**
 * @class crm.Views.Groups.Selector
 *
 * @extends argos.List
 * @requires argos.List
 *
 */
const __class = declare('crm.Views.Groups.Selector', [List], {
  id: 'groups_configure',
  expose: false,
  enableSearch: false,
  icon: '',

  listViewId: 'groups_list',
  family: '',

  // Localization
  titleText: resource.titleText,

  itemTemplate: new Simplate([
    '<h3>{%: $[$$.labelProperty] %}</h3>',
  ]),

  constructor: function constructor() {
    this.tools = {
      tbar: [],
    };
  },

  activateEntry: function activateEntry(params) {
    if (this._selectionModel && this.isNavigationDisabled()) {
      this._selectionModel.toggle(params.key, this.entries[params.key] || params.descriptor, params.$source);
      if (this.options.singleSelect && this.options.singleSelectAction) {
        this.invokeSingleSelectAction();
      }
    }
  },

  createStore: function createStore() {
    if (!this.family) {
      throw new Error('The groups selector must have a family set.');
    }

    return this.createGroupStore(this.family);
  },

  createGroupStore: function createGroupStore(entityName) {
    let store = null;

    if (typeof entityName === 'string' && entityName !== '') {
      store = new SDataStore({
        service: App.services.crm,
        resourceKind: 'groups',
        contractName: 'system',
        where: `upper(family) eq '${entityName.toUpperCase()}'`,
        orderBy: 'name asc',
        include: ['layout', 'tableAliases'],
        idProperty: '$key',
        applicationName: 'slx',
        scope: this,
      });
    }

    return store;
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute('name like "${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
});

lang.setObject('Mobile.SalesLogix.Views.Groups.Selector', __class);
export default __class;
