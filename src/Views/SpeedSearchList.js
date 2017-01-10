import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import array from 'dojo/_base/array';
import domClass from 'dojo/dom-class';
import domConstruct from 'dojo/dom-construct';
import string from 'dojo/string';
import query from 'dojo/query';
import domAttr from 'dojo/dom-attr';
import SpeedSearchWidget from '../SpeedSearchWidget';
import List from 'argos/List';
import _LegacySDataListMixin from 'argos/_LegacySDataListMixin';
import _SpeedSearchRightDrawerListMixin from './_SpeedSearchRightDrawerListMixin';
import _CardLayoutListMixin from './_CardLayoutListMixin';
import getResource from 'argos/I18n';

const resource = getResource('speedSearchList');

/**
 * @class crm.Views.SpeedSearchList
 *
 *
 * @extends argos.List
 * @mixins crm.Views._SpeedSearchRightDrawerListMixin
 * @mixins crm.Views._CardLayoutListMixin
 *
 */
const __class = declare('crm.Views.SpeedSearchList', [List, _LegacySDataListMixin, _SpeedSearchRightDrawerListMixin, _CardLayoutListMixin], {
  // Templates
  itemTemplate: new Simplate([
    '<h4><strong>{%: $.$heading %}</strong></h4>',
    '{%! $$.fieldTemplate %}',
  ]),

  fieldTemplate: new Simplate([
    '<ul class="speedsearch-fields">',
    '{% for(var i = 0; i < $.fields.length; i++) { %}',
    '<li><h4><span>{%= $.fields[i].fieldName %}</span> {%= $.fields[i].fieldValue %}</h4></li>',
    '{% } %}',
    '</ul>',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  id: 'speedsearch_list',
  enableSearch: true,
  enableActions: true,
  searchWidgetClass: SpeedSearchWidget,
  expose: false,
  activeIndexes: ['Account', 'Contact', 'Lead', 'Activity', 'History', 'Opportunity', 'Ticket'],
  indexes: [{
    indexName: 'Account',
    indexType: 1,
    isSecure: true,
  }, {
    indexName: 'Activity',
    indexType: 1,
    isSecure: false,
  }, {
    indexName: 'Contact',
    indexType: 1,
    isSecure: true,
  }, {
    indexName: 'History',
    indexType: 1,
    isSecure: false,
  }, {
    indexName: 'Lead',
    indexType: 1,
    isSecure: true,
  }, {
    indexName: 'Opportunity',
    indexType: 1,
    isSecure: true,
  }, {
    indexName: 'Ticket',
    indexType: 1,
    isSecure: false,
  }],
  types: ['Account', 'Activity', 'Contact', 'History', 'Lead', 'Opportunity', 'Ticket'],
  indexesText: {
    Account: resource.accountText,
    Activity: resource.activityText,
    Contact: resource.contactText,
    History: resource.historyText,
    Lead: resource.leadText,
    Opportunity: resource.opportunityText,
    Ticket: resource.ticketText,
  },
  itemIconByType: {
    Contact: 'fa-user',
    Account: 'fa-building-o',
    Opportunity: 'fa-money',
    Ticket: 'fa-clipboard',
    Lead: 'fa-filter',
    Activity: 'fa-calendar-o',
    History: 'fa-history',
  },
  currentPage: null,

  clear: function clear() {
    this.inherited(arguments);
    this.currentPage = 0;
  },
  _formatFieldName: function _formatFieldName() {},
  getItemIconClass: function getItemIconClass(entry) {
    const type = entry && entry.type;
    const typeCls = this.itemIconByType[type];
    let cls = this.itemIconClass;
    if (typeCls) {
      cls = typeCls;
    }

    if (cls) {
      cls = `fa ${cls} fa-2x`;
    }

    return cls;
  },
  extractTypeFromItem: function extractTypeFromItem(item) {
    for (let i = 0; i < this.types.length; i++) {
      if (item.source.indexOf(this.types[i]) !== -1) {
        return this.types[i];
      }
    }

    return null;
  },
  extractDescriptorFromItem: function extractDescriptorFromItem(item) {
    let descriptor = item && item.uiDisplayName;
    let rest;

    if (descriptor) {
      descriptor = descriptor.split(':');
      rest = descriptor[1];
    }

    return rest;
  },
  extractKeyFromItem: function extractKeyFromItem(item) {
    // Extract the entityId from the display name, which is the last 12 characters
    const displayName = item.displayName;
    if (!displayName) {
      return '';
    }

    const len = displayName.length;
    return displayName.substring(len - 12);
  },
  more: function more() {
    this.currentPage += 1;
    this.inherited(arguments);
  },
  hasMoreData: function hasMoreData() {
    const total = this.feed.totalCount;
    const count = (this.currentPage + 1) * this.pageSize;
    return count < total;
  },
  processFeed: function processFeed(_feed) {
    let feed = _feed;
    if (!this.feed) {
      this.set('listContent', '');
    }

    function filter(field) {
      return field.fieldName !== 'seccodelist' && field.fieldName !== 'filename';
    }

    this.feed = feed = feed.response;

    if (feed.totalCount === 0) {
      this.set('listContent', this.noDataTemplate.apply(this));
    } else if (feed.items) {
      const docfrag = document.createDocumentFragment();

      for (let i = 0; i < feed.items.length; i++) {
        const entry = feed.items[i];
        entry.type = this.extractTypeFromItem(entry);
        entry.$descriptor = entry.$descriptor || entry.uiDisplayName;
        entry.$key = this.extractKeyFromItem(entry);
        entry.$heading = this.extractDescriptorFromItem(entry);
        entry.synopsis = window.unescape(entry.synopsis);
        entry.fields = array.filter(entry.fields, filter);

        this.entries[entry.$key] = entry;
        const rowNode = domConstruct.toDom(this.rowTemplate.apply(entry, this));
        docfrag.appendChild(rowNode);
        this.onApplyRowTemplate(entry, rowNode);
      }

      if (docfrag.childNodes.length > 0) {
        domConstruct.place(docfrag, this.contentNode, 'last');
      }
    }

    if (typeof feed.totalCount !== 'undefined') {
      const remaining = this.feed.totalCount - ((this.currentPage + 1) * this.pageSize);
      this.set('remainingContent', string.substitute(this.remainingText, [remaining]));
    }

    domClass.toggle(this.domNode, 'list-has-more', this.hasMoreData());
  },
  createRequest: function createRequest() {
    const request = new Sage.SData.Client.SDataServiceOperationRequest(this.getService())
      .setContractName('system')
      .setOperationName('executeSearch');
    return request;
  },
  createSearchEntry: function createSearchEntry() {
    const entry = {
      request: {
        docTextItem: -1,
        searchText: this.query,
        searchType: App.speedSearch.searchType,
        noiseFile: 'PMINoise.dat',
        includeStemming: App.speedSearch.includeStemming,
        includeThesaurus: App.speedSearch.includeThesaurus,
        includePhonic: App.speedSearch.includePhonic,
        useFrequentFilter: App.speedSearch.useFrequentFilter,
        indexes: this.getActiveIndexes(),
        whichPage: this.currentPage,
        itemsPerPage: this.pageSize,
        filters: null,
      },
      response: null,
    };

    return entry;
  },
  getActiveIndexes: function getActiveIndexes() {
    const results = [];
    const self = this;
    array.forEach(this.activeIndexes, (indexName) => {
      array.forEach(self.indexes, (index) => {
        if (index.indexName === indexName) {
          results.push(index);
        }
      });
    });

    return results;
  },
  requestData: function requestData() {
    domClass.add(this.domNode, 'list-loading');

    const request = this.createRequest();
    const entry = this.createSearchEntry();

    request.execute(entry, {
      success: lang.hitch(this, this.onRequestDataSuccess),
      failture: lang.hitch(this, this.onRequestDataFailure),
    });
  },
  navigateToDetailView: function navigateToDetailView(key, type) {
    const view = App.getView(`${type.toLowerCase()}_detail`);

    if (view) {
      view.show({
        key,
      });
    }
  },
  createToolLayout: function createToolLayout() {
    return this.tools || (this.tools = {
      tbar: [],
    });
  },
  getItemIconAlt: function getItemIconAlt(entry) {
    return entry.type;
  },
  getItemDescriptor: function getItemDescriptor(entry) {
    return entry.type;
  },
  createIndicatorLayout: function createIndicatorLayout() {
    return this.itemIndicators || (this.itemIndicators = [{
      id: 'speadSearchIcon',
      icon: '',
      location: 'top',
      onApply: function onApply(entry, parent) {
        parent.applyActivityIndicator(entry, this);
      },
    }]);
  },
  applyActivityIndicator: function applyActivityIndicator(entry, indicator) {
    indicator.isEnabled = true;
    indicator.showIcon = false;
    indicator.label = this.indexesText[entry.type];
    indicator.valueText = this.indexesText[entry.type];
  },
  _intSearchExpressionNode: function _intSearchExpressionNode() {
    const listNode = query(`#${this.id}`);
    if (listNode[0]) {
      const html = this.searchExpressionTemplate.apply(this);
      domConstruct.place(html, listNode[0], 'first');
    }
  },
  _isIndexActive: function _isIndexActive(indexName) {
    let indexFound = false;
    if (this.activeIndexes.indexOf(indexName) > -1) {
      indexFound = true;
    }
    return indexFound;
  },
  selectIndex: function selectIndex(e) {
    const button = e.$source;
    const indexName = domAttr.get(button, 'data-index');
    const activated = this.activateIndex(indexName);
    if (activated) {
      domClass.add(button, 'card-layout-speed-search-index-selected');
    } else {
      domClass.remove(button, 'card-layout-speed-search-index-selected');
    }
  },
  activateIndex: function activateIndex(indexName) {
    const tempActiveIndex = [];
    let indexFound = false;
    let activated = false;

    if (this.activeIndexes.indexOf(indexName) > -1) {
      indexFound = true;
    }
    if (indexFound) {
      array.forEach(this.activeIndexes, (aIndexName) => {
        if (aIndexName !== indexName) {
          tempActiveIndex.push(aIndexName);
        }
      });
      this.activeIndexes = tempActiveIndex;
      activated = false;
    } else {
      this.activeIndexes.push(indexName);
      activated = true;
    }

    return activated;
  },
});

lang.setObject('Mobile.SalesLogix.Views.SpeedSearchList', __class);
export default __class;
