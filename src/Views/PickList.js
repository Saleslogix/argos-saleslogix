import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import List from 'argos/List';

/**
 * @class crm.Views.PickList
 *
 *
 * @extends argos.List
 *
 */
const __class = declare('crm.Views.PickList', [List], {
  // Templates
  itemTemplate: new Simplate([
    '<p class="listview-heading">{%: $.text %}</p>',
  ]),

  // View Properties
  id: 'pick_list',
  expose: false,
  resourceKind: 'picklists',
  resourceProperty: 'items',
  contractName: 'system',
  pageSize: 100,
  autoClearSelection: false,
  isCardView: false,
  activateEntry: function activateEntry(params) {
    if (this.options.keyProperty === 'text' && !this.options.singleSelect) {
      params.key = params.descriptor;
    }

    this.inherited(arguments);
  },
  show: function show(options) {
    this.set('title', options && options.title || this.title);
    if (!options.singleSelect) {
      if (options.keyProperty) {
        this.idProperty = options.keyProperty;
      }

      if (options.textProperty) {
        this.labelProperty = options.textProperty;
      }
    }

    this.inherited(arguments);
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `upper(text) like "${q}%"`;
  },
});

lang.setObject('Mobile.SalesLogix.Views.PickList', __class);
export default __class;
