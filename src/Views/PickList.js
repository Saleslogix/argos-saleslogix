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
  languageCode: null,
  autoClearSelection: false,
  isCardView: false,

  _onQueryComplete: function _onQueryComplete(queryResults, entries) { // eslint-disable-line
    if (this.options
          && this.options.picklistOptions
            && this.options.picklistOptions.filterByLanguage
              && this.query) {
      entries = entries.filter(entry => entry.languageCode === this.getLanguageCode());
      queryResults.total = entries.length;
    }
    this.inherited(arguments);
  },
  activateEntry: function activateEntry(params) {
    if (this.options.keyProperty === 'text' && !this.options.singleSelect) {
      params.key = params.descriptor;
    }

    this.inherited(arguments);
  },
  getLanguageCode: function getLanguageCode() {
    return this.languageCode
      || (this.options && this.options.languageCode) || App.getCurrentLocale();
  },
  getPicklistOptions: function getPicklistOptions() {
    return (this.options && this.options.picklistOptions) || this.picklistOptions || {};
  },
  getRemainingCount: function getRemainingCount() {
    // Picklists fetch all items on the first request (not based on pageSize)
    return -this.pageSize;
  },
  onTransitionAway: function onTransitionAway() {
    this.inherited(arguments);
    if (this.searchWidget) {
      this.searchWidget.clear();
      this.query = false;
      this.hasSearched = false;
    }
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
    const picklistOptions = this.getPicklistOptions();
    picklistOptions.language = picklistOptions.language || this.getLanguageCode();
    this.languageCode = (picklistOptions.language && picklistOptions.language.trim()) || this.languageCode;

    // Search, query like normal (with filtering from queryComplete)
    if (this.query) {
      return this.inherited(arguments);
    }

    return this.app.picklistService.requestPicklist(this.picklistName, picklistOptions)
      .then(result => this._onQueryComplete({ total: result && result.items.length }, result && result.items),
        err => this._onQueryError(null, err));
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `upper(text) like "${q}%"`;
  },
});

lang.setObject('Mobile.SalesLogix.Views.PickList', __class);
export default __class;
