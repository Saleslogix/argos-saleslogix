import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
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
    '<h3>{%: $.text %}</h3>',
  ]),

  // View Properties
  id: 'pick_list',
  expose: false,
  resourceKind: 'picklists',
  resourceProperty: 'items',
  contractName: 'system',
  pageSize: 100,
  languageCode: null,
  autoClearSelection: false,

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
  requestData: function requestData() {
    const picklistOptions = (this.options && this.options.picklistOptions) || this.picklistOptions;
    const languageCode = (this.options && this.options.languageCode)
      || this.languageCode || App.getCurrentLocale();
    const picklist = this.app.picklistService.getPicklistByName(this.picklistName, languageCode);
    if (picklist) {
      return this._onQueryComplete({ total: picklist.items.length }, picklist.items);
    }
    return this.app.picklistService.requestPicklist(this.picklistName, picklistOptions)
      .then(result => this._onQueryComplete({ total: result && result.items.length }, result && result.items),
        err => this._onQueryError(null, err));
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute('upper(text) like "${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
});

lang.setObject('Mobile.SalesLogix.Views.PickList', __class);
export default __class;
