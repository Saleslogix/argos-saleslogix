/* Copyright 2017 Infor
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import SpeedSearchWidget from '../SpeedSearchWidget';
import List from 'argos/List';
import _LegacySDataListMixin from 'argos/_LegacySDataListMixin';
import _SpeedSearchRightDrawerListMixin from './_SpeedSearchRightDrawerListMixin';
import { setSearchTerm } from '../actions/speedsearch';
import getResource from 'argos/I18n';

const resource = getResource('speedSearchList');

const __class = declare('crm.Views.SpeedSearchList', [List, _LegacySDataListMixin, _SpeedSearchRightDrawerListMixin], {
  // Templates
  itemTemplate: new Simplate([
    '<p class="micro-text"><strong>{%: $.$heading %}</strong></p>',
    '{%! $$.fieldTemplate %}',
  ]),

  fieldTemplate: new Simplate([
    '<ul class="speedsearch-fields">',
    '{% for(var i = 0; i < $.fields.length; i++) { %}',
    '<li><p class="micro-text"><span>{%= $.fields[i].fieldName %}</span> {%= $.fields[i].fieldValue %}</p></li>',
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
    Contact: 'user',
    Account: 'spreadsheet',
    Opportunity: 'finance',
    Ticket: 'expense-report',
    Lead: 'agent',
    Activity: 'calendar',
    History: 'search-results-history',
  },
  currentPage: null,

  clear: function clear() {
    this.inherited(clear, arguments);
    this.currentPage = 0;
    if (this.appStore) {
      this.appStore.dispatch(setSearchTerm(''));
    }
  },
  _formatFieldName: function _formatFieldName() {},
  getItemIconClass: function getItemIconClass(entry) {
    const type = entry && entry.type;
    const typeCls = this.itemIconByType[type];
    let cls = this.itemIconClass;
    if (typeCls) {
      cls = typeCls;
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
    this.inherited(more, arguments);
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
        entry.fields = entry.fields.filter(filter);

        this.entries[entry.$key] = entry;
        const rowNode = $(this.rowTemplate.apply(entry, this));
        docfrag.appendChild(rowNode.get(0));
        this.onApplyRowTemplate(entry, rowNode);
      }

      if (docfrag.childNodes.length > 0) {
        $(this.contentNode).append(docfrag);
      }
    }

    if (typeof feed.totalCount !== 'undefined') {
      const remaining = this.feed.totalCount - ((this.currentPage + 1) * this.pageSize);
      this.set('remainingContent', string.substitute(this.remainingText, [remaining]));
    }

    $(this.domNode).toggleClass('list-has-more', this.hasMoreData());
  },
  createRequest: function createRequest() {
    const request = new Sage.SData.Client.SDataServiceOperationRequest(this.getService())
      .setContractName('system')
      .setOperationName('executeSearch');
    return request;
  },
  createSearchEntry: function createSearchEntry() {
    this.appStore.dispatch(setSearchTerm(this.query));
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
    this.activeIndexes.forEach((indexName) => {
      self.indexes.forEach((index) => {
        if (index.indexName === indexName) {
          results.push(index);
        }
      });
    });

    return results;
  },
  requestData: function requestData() {
    $(this.domNode).addClass('list-loading');

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
    const listNode = $(`#${this.id}`);
    if (listNode[0]) {
      const html = this.searchExpressionTemplate.apply(this);
      $(listNode[0]).prepend(html);
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
    const indexName = $(button).attr('data-index');
    const activated = this.activateIndex(indexName);
    if (activated) {
      $(button).addClass('card-layout-speed-search-index-selected');
    } else {
      $(button).removeClass('card-layout-speed-search-index-selected');
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
      this.activeIndexes.forEach((aIndexName) => {
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

export default __class;
