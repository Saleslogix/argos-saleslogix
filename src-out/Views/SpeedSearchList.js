define("crm/Views/SpeedSearchList", ["exports", "dojo/_base/declare", "dojo/_base/lang", "dojo/string", "../SpeedSearchWidget", "argos/List", "argos/_LegacySDataListMixin", "./_SpeedSearchRightDrawerListMixin", "../actions/speedsearch", "argos/I18n"], function (_exports, _declare, _lang, _string, _SpeedSearchWidget, _List, _LegacySDataListMixin2, _SpeedSearchRightDrawerListMixin2, _speedsearch, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _string = _interopRequireDefault(_string);
  _SpeedSearchWidget = _interopRequireDefault(_SpeedSearchWidget);
  _List = _interopRequireDefault(_List);
  _LegacySDataListMixin2 = _interopRequireDefault(_LegacySDataListMixin2);
  _SpeedSearchRightDrawerListMixin2 = _interopRequireDefault(_SpeedSearchRightDrawerListMixin2);
  _I18n = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
  var resource = (0, _I18n["default"])('speedSearchList');

  var __class = (0, _declare["default"])('crm.Views.SpeedSearchList', [_List["default"], _LegacySDataListMixin2["default"], _SpeedSearchRightDrawerListMixin2["default"]], {
    // Templates
    itemTemplate: new Simplate(['<p class="micro-text"><strong>{%: $.$heading %}</strong></p>', '{%! $$.fieldTemplate %}']),
    fieldTemplate: new Simplate(['<ul class="speedsearch-fields">', '{% for(var i = 0; i < $.fields.length; i++) { %}', '<li><p class="micro-text"><span>{%= $.fields[i].fieldName %}</span> {%= $.fields[i].fieldValue %}</p></li>', '{% } %}', '</ul>']),
    // Localization
    titleText: resource.titleText,
    // View Properties
    id: 'speedsearch_list',
    enableSearch: true,
    enableActions: true,
    searchWidgetClass: _SpeedSearchWidget["default"],
    expose: false,
    activeIndexes: ['Account', 'Contact', 'Lead', 'Activity', 'History', 'Opportunity', 'Ticket'],
    indexes: [{
      indexName: 'Account',
      indexType: 1,
      isSecure: true
    }, {
      indexName: 'Activity',
      indexType: 1,
      isSecure: false
    }, {
      indexName: 'Contact',
      indexType: 1,
      isSecure: true
    }, {
      indexName: 'History',
      indexType: 1,
      isSecure: false
    }, {
      indexName: 'Lead',
      indexType: 1,
      isSecure: true
    }, {
      indexName: 'Opportunity',
      indexType: 1,
      isSecure: true
    }, {
      indexName: 'Ticket',
      indexType: 1,
      isSecure: false
    }],
    types: ['Account', 'Activity', 'Contact', 'History', 'Lead', 'Opportunity', 'Ticket'],
    indexesText: {
      Account: resource.accountText,
      Activity: resource.activityText,
      Contact: resource.contactText,
      History: resource.historyText,
      Lead: resource.leadText,
      Opportunity: resource.opportunityText,
      Ticket: resource.ticketText
    },
    itemIconByType: {
      Contact: 'user',
      Account: 'spreadsheet',
      Opportunity: 'finance',
      Ticket: 'expense-report',
      Lead: 'agent',
      Activity: 'calendar',
      History: 'search-results-history'
    },
    currentPage: null,
    clear: function clear() {
      this.inherited(clear, arguments);
      this.currentPage = 0;

      if (this.appStore) {
        this.appStore.dispatch((0, _speedsearch.setSearchTerm)(''));
      }
    },
    _formatFieldName: function _formatFieldName() {},
    getItemIconClass: function getItemIconClass(entry) {
      var type = entry && entry.type;
      var typeCls = this.itemIconByType[type];
      var cls = this.itemIconClass;

      if (typeCls) {
        cls = typeCls;
      }

      return cls;
    },
    extractTypeFromItem: function extractTypeFromItem(item) {
      for (var i = 0; i < this.types.length; i++) {
        if (item.source.indexOf(this.types[i]) !== -1) {
          return this.types[i];
        }
      }

      return null;
    },
    extractDescriptorFromItem: function extractDescriptorFromItem(item) {
      var descriptor = item && item.uiDisplayName;
      var rest;

      if (descriptor) {
        descriptor = descriptor.split(':');
        rest = descriptor[1];
      }

      return rest;
    },
    extractKeyFromItem: function extractKeyFromItem(item) {
      // Extract the entityId from the display name, which is the last 12 characters
      var displayName = item.displayName;

      if (!displayName) {
        return '';
      }

      var len = displayName.length;
      return displayName.substring(len - 12);
    },
    more: function more() {
      this.currentPage += 1;
      this.inherited(more, arguments);
    },
    hasMoreData: function hasMoreData() {
      var total = this.feed.totalCount;
      var count = (this.currentPage + 1) * this.pageSize;
      return count < total;
    },
    processFeed: function processFeed(_feed) {
      var feed = _feed;

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
        var docfrag = document.createDocumentFragment();

        for (var i = 0; i < feed.items.length; i++) {
          var entry = feed.items[i];
          entry.type = this.extractTypeFromItem(entry);
          entry.$descriptor = entry.$descriptor || entry.uiDisplayName;
          entry.$key = this.extractKeyFromItem(entry);
          entry.$heading = this.extractDescriptorFromItem(entry);
          entry.synopsis = window.unescape(entry.synopsis);
          entry.fields = entry.fields.filter(filter);
          this.entries[entry.$key] = entry;
          var rowNode = $(this.rowTemplate.apply(entry, this));
          docfrag.appendChild(rowNode.get(0));
          this.onApplyRowTemplate(entry, rowNode);
        }

        if (docfrag.childNodes.length > 0) {
          $(this.contentNode).append(docfrag);
        }
      }

      if (typeof feed.totalCount !== 'undefined') {
        var remaining = this.feed.totalCount - (this.currentPage + 1) * this.pageSize;
        this.set('remainingContent', _string["default"].substitute(this.remainingText, [remaining]));
      }

      $(this.domNode).toggleClass('list-has-more', this.hasMoreData());
    },
    createRequest: function createRequest() {
      var request = new Sage.SData.Client.SDataServiceOperationRequest(this.getService()).setContractName('system').setOperationName('executeSearch');
      return request;
    },
    createSearchEntry: function createSearchEntry() {
      this.appStore.dispatch((0, _speedsearch.setSearchTerm)(this.query));
      var entry = {
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
          filters: null
        },
        response: null
      };
      return entry;
    },
    getActiveIndexes: function getActiveIndexes() {
      var results = [];
      var self = this;
      this.activeIndexes.forEach(function (indexName) {
        self.indexes.forEach(function (index) {
          if (index.indexName === indexName) {
            results.push(index);
          }
        });
      });
      return results;
    },
    requestData: function requestData() {
      $(this.domNode).addClass('list-loading');
      var request = this.createRequest();
      var entry = this.createSearchEntry();
      request.execute(entry, {
        success: _lang["default"].hitch(this, this.onRequestDataSuccess),
        failture: _lang["default"].hitch(this, this.onRequestDataFailure)
      });
    },
    navigateToDetailView: function navigateToDetailView(key, type) {
      var view = App.getView("".concat(type.toLowerCase(), "_detail"));

      if (view) {
        view.show({
          key: key
        });
      }
    },
    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {
        tbar: []
      });
    },
    getItemIconAlt: function getItemIconAlt(entry) {
      return entry.type;
    },
    getItemDescriptor: function getItemDescriptor(entry) {
      return entry.type;
    },
    _intSearchExpressionNode: function _intSearchExpressionNode() {
      var listNode = $("#".concat(this.id));

      if (listNode[0]) {
        var html = this.searchExpressionTemplate.apply(this);
        $(listNode[0]).prepend(html);
      }
    },
    _isIndexActive: function _isIndexActive(indexName) {
      var indexFound = false;

      if (this.activeIndexes.indexOf(indexName) > -1) {
        indexFound = true;
      }

      return indexFound;
    },
    selectIndex: function selectIndex(e) {
      var button = e.$source;
      var indexName = $(button).attr('data-index');
      var activated = this.activateIndex(indexName);

      if (activated) {
        $(button).addClass('card-layout-speed-search-index-selected');
      } else {
        $(button).removeClass('card-layout-speed-search-index-selected');
      }
    },
    activateIndex: function activateIndex(indexName) {
      var tempActiveIndex = [];
      var indexFound = false;
      var activated = false;

      if (this.activeIndexes.indexOf(indexName) > -1) {
        indexFound = true;
      }

      if (indexFound) {
        this.activeIndexes.forEach(function (aIndexName) {
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
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});