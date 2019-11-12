define('crm/Views/SpeedSearchList', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', '../SpeedSearchWidget', 'argos/List', 'argos/_LegacySDataListMixin', './_SpeedSearchRightDrawerListMixin', 'argos/I18n'], function (module, exports, _declare, _lang, _string, _SpeedSearchWidget, _List, _LegacySDataListMixin2, _SpeedSearchRightDrawerListMixin2, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _string2 = _interopRequireDefault(_string);

  var _SpeedSearchWidget2 = _interopRequireDefault(_SpeedSearchWidget);

  var _List2 = _interopRequireDefault(_List);

  var _LegacySDataListMixin3 = _interopRequireDefault(_LegacySDataListMixin2);

  var _SpeedSearchRightDrawerListMixin3 = _interopRequireDefault(_SpeedSearchRightDrawerListMixin2);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  var resource = (0, _I18n2.default)('speedSearchList');

  /**
   * @class crm.Views.SpeedSearchList
   *
   *
   * @extends argos.List
   * @mixins crm.Views._SpeedSearchRightDrawerListMixin
   *
   */
  var __class = (0, _declare2.default)('crm.Views.SpeedSearchList', [_List2.default, _LegacySDataListMixin3.default, _SpeedSearchRightDrawerListMixin3.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="micro-text"><strong>{%: $.$heading %}</strong></p>', '{%! $$.fieldTemplate %}']),

    fieldTemplate: new Simplate(['<ul class="speedsearch-fields">', '{% for(var i = 0; i < $.fields.length; i++) { %}', '<li><p class="micro-text"><span>{%= $.fields[i].fieldName %}</span> {%= $.fields[i].fieldValue %}</p></li>', '{% } %}', '</ul>']),

    // Localization
    titleText: resource.titleText,

    // View Properties
    id: 'speedsearch_list',
    enableSearch: true,
    enableActions: true,
    searchWidgetClass: _SpeedSearchWidget2.default,
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
      this.inherited(arguments);
      this.currentPage = 0;
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
      var rest = void 0;

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
      this.inherited(arguments);
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
        this.set('remainingContent', _string2.default.substitute(this.remainingText, [remaining]));
      }

      $(this.domNode).toggleClass('list-has-more', this.hasMoreData());
    },
    createRequest: function createRequest() {
      var request = new Sage.SData.Client.SDataServiceOperationRequest(this.getService()).setContractName('system').setOperationName('executeSearch');
      return request;
    },
    createSearchEntry: function createSearchEntry() {
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
        success: _lang2.default.hitch(this, this.onRequestDataSuccess),
        failture: _lang2.default.hitch(this, this.onRequestDataFailure)
      });
    },
    navigateToDetailView: function navigateToDetailView(key, type) {
      var view = App.getView(type.toLowerCase() + '_detail');

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
    createIndicatorLayout: function createIndicatorLayout() {
      return this.itemIndicators || (this.itemIndicators = [{
        id: 'speadSearchIcon',
        icon: '',
        location: 'top',
        onApply: function onApply(entry, parent) {
          parent.applyActivityIndicator(entry, this);
        }
      }]);
    },
    applyActivityIndicator: function applyActivityIndicator(entry, indicator) {
      indicator.isEnabled = true;
      indicator.showIcon = false;
      indicator.label = this.indexesText[entry.type];
      indicator.valueText = this.indexesText[entry.type];
    },
    _intSearchExpressionNode: function _intSearchExpressionNode() {
      var listNode = $('#' + this.id);
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

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9TcGVlZFNlYXJjaExpc3QuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiaXRlbVRlbXBsYXRlIiwiU2ltcGxhdGUiLCJmaWVsZFRlbXBsYXRlIiwidGl0bGVUZXh0IiwiaWQiLCJlbmFibGVTZWFyY2giLCJlbmFibGVBY3Rpb25zIiwic2VhcmNoV2lkZ2V0Q2xhc3MiLCJleHBvc2UiLCJhY3RpdmVJbmRleGVzIiwiaW5kZXhlcyIsImluZGV4TmFtZSIsImluZGV4VHlwZSIsImlzU2VjdXJlIiwidHlwZXMiLCJpbmRleGVzVGV4dCIsIkFjY291bnQiLCJhY2NvdW50VGV4dCIsIkFjdGl2aXR5IiwiYWN0aXZpdHlUZXh0IiwiQ29udGFjdCIsImNvbnRhY3RUZXh0IiwiSGlzdG9yeSIsImhpc3RvcnlUZXh0IiwiTGVhZCIsImxlYWRUZXh0IiwiT3Bwb3J0dW5pdHkiLCJvcHBvcnR1bml0eVRleHQiLCJUaWNrZXQiLCJ0aWNrZXRUZXh0IiwiaXRlbUljb25CeVR5cGUiLCJjdXJyZW50UGFnZSIsImNsZWFyIiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiX2Zvcm1hdEZpZWxkTmFtZSIsImdldEl0ZW1JY29uQ2xhc3MiLCJlbnRyeSIsInR5cGUiLCJ0eXBlQ2xzIiwiY2xzIiwiaXRlbUljb25DbGFzcyIsImV4dHJhY3RUeXBlRnJvbUl0ZW0iLCJpdGVtIiwiaSIsImxlbmd0aCIsInNvdXJjZSIsImluZGV4T2YiLCJleHRyYWN0RGVzY3JpcHRvckZyb21JdGVtIiwiZGVzY3JpcHRvciIsInVpRGlzcGxheU5hbWUiLCJyZXN0Iiwic3BsaXQiLCJleHRyYWN0S2V5RnJvbUl0ZW0iLCJkaXNwbGF5TmFtZSIsImxlbiIsInN1YnN0cmluZyIsIm1vcmUiLCJoYXNNb3JlRGF0YSIsInRvdGFsIiwiZmVlZCIsInRvdGFsQ291bnQiLCJjb3VudCIsInBhZ2VTaXplIiwicHJvY2Vzc0ZlZWQiLCJfZmVlZCIsInNldCIsImZpbHRlciIsImZpZWxkIiwiZmllbGROYW1lIiwicmVzcG9uc2UiLCJub0RhdGFUZW1wbGF0ZSIsImFwcGx5IiwiaXRlbXMiLCJkb2NmcmFnIiwiZG9jdW1lbnQiLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50IiwiJGRlc2NyaXB0b3IiLCIka2V5IiwiJGhlYWRpbmciLCJzeW5vcHNpcyIsIndpbmRvdyIsInVuZXNjYXBlIiwiZmllbGRzIiwiZW50cmllcyIsInJvd05vZGUiLCIkIiwicm93VGVtcGxhdGUiLCJhcHBlbmRDaGlsZCIsImdldCIsIm9uQXBwbHlSb3dUZW1wbGF0ZSIsImNoaWxkTm9kZXMiLCJjb250ZW50Tm9kZSIsImFwcGVuZCIsInJlbWFpbmluZyIsInN1YnN0aXR1dGUiLCJyZW1haW5pbmdUZXh0IiwiZG9tTm9kZSIsInRvZ2dsZUNsYXNzIiwiY3JlYXRlUmVxdWVzdCIsInJlcXVlc3QiLCJTYWdlIiwiU0RhdGEiLCJDbGllbnQiLCJTRGF0YVNlcnZpY2VPcGVyYXRpb25SZXF1ZXN0IiwiZ2V0U2VydmljZSIsInNldENvbnRyYWN0TmFtZSIsInNldE9wZXJhdGlvbk5hbWUiLCJjcmVhdGVTZWFyY2hFbnRyeSIsImRvY1RleHRJdGVtIiwic2VhcmNoVGV4dCIsInF1ZXJ5Iiwic2VhcmNoVHlwZSIsIkFwcCIsInNwZWVkU2VhcmNoIiwibm9pc2VGaWxlIiwiaW5jbHVkZVN0ZW1taW5nIiwiaW5jbHVkZVRoZXNhdXJ1cyIsImluY2x1ZGVQaG9uaWMiLCJ1c2VGcmVxdWVudEZpbHRlciIsImdldEFjdGl2ZUluZGV4ZXMiLCJ3aGljaFBhZ2UiLCJpdGVtc1BlclBhZ2UiLCJmaWx0ZXJzIiwicmVzdWx0cyIsInNlbGYiLCJmb3JFYWNoIiwiaW5kZXgiLCJwdXNoIiwicmVxdWVzdERhdGEiLCJhZGRDbGFzcyIsImV4ZWN1dGUiLCJzdWNjZXNzIiwiaGl0Y2giLCJvblJlcXVlc3REYXRhU3VjY2VzcyIsImZhaWx0dXJlIiwib25SZXF1ZXN0RGF0YUZhaWx1cmUiLCJuYXZpZ2F0ZVRvRGV0YWlsVmlldyIsImtleSIsInZpZXciLCJnZXRWaWV3IiwidG9Mb3dlckNhc2UiLCJzaG93IiwiY3JlYXRlVG9vbExheW91dCIsInRvb2xzIiwidGJhciIsImdldEl0ZW1JY29uQWx0IiwiZ2V0SXRlbURlc2NyaXB0b3IiLCJjcmVhdGVJbmRpY2F0b3JMYXlvdXQiLCJpdGVtSW5kaWNhdG9ycyIsImljb24iLCJsb2NhdGlvbiIsIm9uQXBwbHkiLCJwYXJlbnQiLCJhcHBseUFjdGl2aXR5SW5kaWNhdG9yIiwiaW5kaWNhdG9yIiwiaXNFbmFibGVkIiwic2hvd0ljb24iLCJsYWJlbCIsInZhbHVlVGV4dCIsIl9pbnRTZWFyY2hFeHByZXNzaW9uTm9kZSIsImxpc3ROb2RlIiwiaHRtbCIsInNlYXJjaEV4cHJlc3Npb25UZW1wbGF0ZSIsInByZXBlbmQiLCJfaXNJbmRleEFjdGl2ZSIsImluZGV4Rm91bmQiLCJzZWxlY3RJbmRleCIsImUiLCJidXR0b24iLCIkc291cmNlIiwiYXR0ciIsImFjdGl2YXRlZCIsImFjdGl2YXRlSW5kZXgiLCJyZW1vdmVDbGFzcyIsInRlbXBBY3RpdmVJbmRleCIsImFJbmRleE5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUF5QkEsTUFBTUEsV0FBVyxvQkFBWSxpQkFBWixDQUFqQjs7QUFFQTs7Ozs7Ozs7QUFRQSxNQUFNQyxVQUFVLHVCQUFRLDJCQUFSLEVBQXFDLDJGQUFyQyxFQUFzRztBQUNwSDtBQUNBQyxrQkFBYyxJQUFJQyxRQUFKLENBQWEsQ0FDekIsOERBRHlCLEVBRXpCLHlCQUZ5QixDQUFiLENBRnNHOztBQU9wSEMsbUJBQWUsSUFBSUQsUUFBSixDQUFhLENBQzFCLGlDQUQwQixFQUUxQixrREFGMEIsRUFHMUIsNEdBSDBCLEVBSTFCLFNBSjBCLEVBSzFCLE9BTDBCLENBQWIsQ0FQcUc7O0FBZXBIO0FBQ0FFLGVBQVdMLFNBQVNLLFNBaEJnRzs7QUFrQnBIO0FBQ0FDLFFBQUksa0JBbkJnSDtBQW9CcEhDLGtC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QUFTQSxhQUFULENBQXVCbEssU0FBdkIsRUFBa0M7QUFDL0MsVUFBTW9LLGtCQUFrQixFQUF4QjtBQUNBLFVBQUlULGFBQWEsS0FBakI7QUFDQSxVQUFJTSxZQUFZLEtBQWhCOztBQUVBLFVBQUksS0FBS25LLGFBQUwsQ0FBbUJzQyxPQUFuQixDQUEyQnBDLFNBQTNCLElBQXdDLENBQUMsQ0FBN0MsRUFBZ0Q7QUFDOUMySixxQkFBYSxJQUFiO0FBQ0Q7QUFDRCxVQUFJQSxVQUFKLEVBQWdCO0FBQ2QsYUFBSzdKLGFBQUwsQ0FBbUJxSCxPQUFuQixDQUEyQixVQUFDa0QsVUFBRCxFQUFnQjtBQUN6QyxjQUFJQSxlQUFlckssU0FBbkIsRUFBOEI7QUFDNUJvSyw0QkFBZ0IvQyxJQUFoQixDQUFxQmdELFVBQXJCO0FBQ0Q7QUFDRixTQUpEO0FBS0EsYUFBS3ZLLGFBQUwsR0FBcUJzSyxlQUFyQjtBQUNBSCxvQkFBWSxLQUFaO0FBQ0QsT0FSRCxNQVFPO0FBQ0wsYUFBS25LLGFBQUwsQ0FBbUJ1SCxJQUFuQixDQUF3QnJILFNBQXhCO0FBQ0FpSyxvQkFBWSxJQUFaO0FBQ0Q7O0FBRUQsYUFBT0EsU0FBUDtBQUNEO0FBbFRtSCxHQUF0RyxDQUFoQjs7b0JBcVRlN0ssTyIsImZpbGUiOiJTcGVlZFNlYXJjaExpc3QuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgc3RyaW5nIGZyb20gJ2Rvam8vc3RyaW5nJztcclxuaW1wb3J0IFNwZWVkU2VhcmNoV2lkZ2V0IGZyb20gJy4uL1NwZWVkU2VhcmNoV2lkZ2V0JztcclxuaW1wb3J0IExpc3QgZnJvbSAnYXJnb3MvTGlzdCc7XHJcbmltcG9ydCBfTGVnYWN5U0RhdGFMaXN0TWl4aW4gZnJvbSAnYXJnb3MvX0xlZ2FjeVNEYXRhTGlzdE1peGluJztcclxuaW1wb3J0IF9TcGVlZFNlYXJjaFJpZ2h0RHJhd2VyTGlzdE1peGluIGZyb20gJy4vX1NwZWVkU2VhcmNoUmlnaHREcmF3ZXJMaXN0TWl4aW4nO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnc3BlZWRTZWFyY2hMaXN0Jyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5TcGVlZFNlYXJjaExpc3RcclxuICpcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuTGlzdFxyXG4gKiBAbWl4aW5zIGNybS5WaWV3cy5fU3BlZWRTZWFyY2hSaWdodERyYXdlckxpc3RNaXhpblxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5TcGVlZFNlYXJjaExpc3QnLCBbTGlzdCwgX0xlZ2FjeVNEYXRhTGlzdE1peGluLCBfU3BlZWRTZWFyY2hSaWdodERyYXdlckxpc3RNaXhpbl0sIHtcclxuICAvLyBUZW1wbGF0ZXNcclxuICBpdGVtVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+PHN0cm9uZz57JTogJC4kaGVhZGluZyAlfTwvc3Ryb25nPjwvcD4nLFxyXG4gICAgJ3slISAkJC5maWVsZFRlbXBsYXRlICV9JyxcclxuICBdKSxcclxuXHJcbiAgZmllbGRUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8dWwgY2xhc3M9XCJzcGVlZHNlYXJjaC1maWVsZHNcIj4nLFxyXG4gICAgJ3slIGZvcih2YXIgaSA9IDA7IGkgPCAkLmZpZWxkcy5sZW5ndGg7IGkrKykgeyAlfScsXHJcbiAgICAnPGxpPjxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxzcGFuPnslPSAkLmZpZWxkc1tpXS5maWVsZE5hbWUgJX08L3NwYW4+IHslPSAkLmZpZWxkc1tpXS5maWVsZFZhbHVlICV9PC9wPjwvbGk+JyxcclxuICAgICd7JSB9ICV9JyxcclxuICAgICc8L3VsPicsXHJcbiAgXSksXHJcblxyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ3NwZWVkc2VhcmNoX2xpc3QnLFxyXG4gIGVuYWJsZVNlYXJjaDogdHJ1ZSxcclxuICBlbmFibGVBY3Rpb25zOiB0cnVlLFxyXG4gIHNlYXJjaFdpZGdldENsYXNzOiBTcGVlZFNlYXJjaFdpZGdldCxcclxuICBleHBvc2U6IGZhbHNlLFxyXG4gIGFjdGl2ZUluZGV4ZXM6IFsnQWNjb3VudCcsICdDb250YWN0JywgJ0xlYWQnLCAnQWN0aXZpdHknLCAnSGlzdG9yeScsICdPcHBvcnR1bml0eScsICdUaWNrZXQnXSxcclxuICBpbmRleGVzOiBbe1xyXG4gICAgaW5kZXhOYW1lOiAnQWNjb3VudCcsXHJcbiAgICBpbmRleFR5cGU6IDEsXHJcbiAgICBpc1NlY3VyZTogdHJ1ZSxcclxuICB9LCB7XHJcbiAgICBpbmRleE5hbWU6ICdBY3Rpdml0eScsXHJcbiAgICBpbmRleFR5cGU6IDEsXHJcbiAgICBpc1NlY3VyZTogZmFsc2UsXHJcbiAgfSwge1xyXG4gICAgaW5kZXhOYW1lOiAnQ29udGFjdCcsXHJcbiAgICBpbmRleFR5cGU6IDEsXHJcbiAgICBpc1NlY3VyZTogdHJ1ZSxcclxuICB9LCB7XHJcbiAgICBpbmRleE5hbWU6ICdIaXN0b3J5JyxcclxuICAgIGluZGV4VHlwZTogMSxcclxuICAgIGlzU2VjdXJlOiBmYWxzZSxcclxuICB9LCB7XHJcbiAgICBpbmRleE5hbWU6ICdMZWFkJyxcclxuICAgIGluZGV4VHlwZTogMSxcclxuICAgIGlzU2VjdXJlOiB0cnVlLFxyXG4gIH0sIHtcclxuICAgIGluZGV4TmFtZTogJ09wcG9ydHVuaXR5JyxcclxuICAgIGluZGV4VHlwZTogMSxcclxuICAgIGlzU2VjdXJlOiB0cnVlLFxyXG4gIH0sIHtcclxuICAgIGluZGV4TmFtZTogJ1RpY2tldCcsXHJcbiAgICBpbmRleFR5cGU6IDEsXHJcbiAgICBpc1NlY3VyZTogZmFsc2UsXHJcbiAgfV0sXHJcbiAgdHlwZXM6IFsnQWNjb3VudCcsICdBY3Rpdml0eScsICdDb250YWN0JywgJ0hpc3RvcnknLCAnTGVhZCcsICdPcHBvcnR1bml0eScsICdUaWNrZXQnXSxcclxuICBpbmRleGVzVGV4dDoge1xyXG4gICAgQWNjb3VudDogcmVzb3VyY2UuYWNjb3VudFRleHQsXHJcbiAgICBBY3Rpdml0eTogcmVzb3VyY2UuYWN0aXZpdHlUZXh0LFxyXG4gICAgQ29udGFjdDogcmVzb3VyY2UuY29udGFjdFRleHQsXHJcbiAgICBIaXN0b3J5OiByZXNvdXJjZS5oaXN0b3J5VGV4dCxcclxuICAgIExlYWQ6IHJlc291cmNlLmxlYWRUZXh0LFxyXG4gICAgT3Bwb3J0dW5pdHk6IHJlc291cmNlLm9wcG9ydHVuaXR5VGV4dCxcclxuICAgIFRpY2tldDogcmVzb3VyY2UudGlja2V0VGV4dCxcclxuICB9LFxyXG4gIGl0ZW1JY29uQnlUeXBlOiB7XHJcbiAgICBDb250YWN0OiAndXNlcicsXHJcbiAgICBBY2NvdW50OiAnc3ByZWFkc2hlZXQnLFxyXG4gICAgT3Bwb3J0dW5pdHk6ICdmaW5hbmNlJyxcclxuICAgIFRpY2tldDogJ2V4cGVuc2UtcmVwb3J0JyxcclxuICAgIExlYWQ6ICdhZ2VudCcsXHJcbiAgICBBY3Rpdml0eTogJ2NhbGVuZGFyJyxcclxuICAgIEhpc3Rvcnk6ICdzZWFyY2gtcmVzdWx0cy1oaXN0b3J5JyxcclxuICB9LFxyXG4gIGN1cnJlbnRQYWdlOiBudWxsLFxyXG5cclxuICBjbGVhcjogZnVuY3Rpb24gY2xlYXIoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IDA7XHJcbiAgfSxcclxuICBfZm9ybWF0RmllbGROYW1lOiBmdW5jdGlvbiBfZm9ybWF0RmllbGROYW1lKCkge30sXHJcbiAgZ2V0SXRlbUljb25DbGFzczogZnVuY3Rpb24gZ2V0SXRlbUljb25DbGFzcyhlbnRyeSkge1xyXG4gICAgY29uc3QgdHlwZSA9IGVudHJ5ICYmIGVudHJ5LnR5cGU7XHJcbiAgICBjb25zdCB0eXBlQ2xzID0gdGhpcy5pdGVtSWNvbkJ5VHlwZVt0eXBlXTtcclxuICAgIGxldCBjbHMgPSB0aGlzLml0ZW1JY29uQ2xhc3M7XHJcbiAgICBpZiAodHlwZUNscykge1xyXG4gICAgICBjbHMgPSB0eXBlQ2xzO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjbHM7XHJcbiAgfSxcclxuICBleHRyYWN0VHlwZUZyb21JdGVtOiBmdW5jdGlvbiBleHRyYWN0VHlwZUZyb21JdGVtKGl0ZW0pIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50eXBlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoaXRlbS5zb3VyY2UuaW5kZXhPZih0aGlzLnR5cGVzW2ldKSAhPT0gLTEpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50eXBlc1tpXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH0sXHJcbiAgZXh0cmFjdERlc2NyaXB0b3JGcm9tSXRlbTogZnVuY3Rpb24gZXh0cmFjdERlc2NyaXB0b3JGcm9tSXRlbShpdGVtKSB7XHJcbiAgICBsZXQgZGVzY3JpcHRvciA9IGl0ZW0gJiYgaXRlbS51aURpc3BsYXlOYW1lO1xyXG4gICAgbGV0IHJlc3Q7XHJcblxyXG4gICAgaWYgKGRlc2NyaXB0b3IpIHtcclxuICAgICAgZGVzY3JpcHRvciA9IGRlc2NyaXB0b3Iuc3BsaXQoJzonKTtcclxuICAgICAgcmVzdCA9IGRlc2NyaXB0b3JbMV07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3Q7XHJcbiAgfSxcclxuICBleHRyYWN0S2V5RnJvbUl0ZW06IGZ1bmN0aW9uIGV4dHJhY3RLZXlGcm9tSXRlbShpdGVtKSB7XHJcbiAgICAvLyBFeHRyYWN0IHRoZSBlbnRpdHlJZCBmcm9tIHRoZSBkaXNwbGF5IG5hbWUsIHdoaWNoIGlzIHRoZSBsYXN0IDEyIGNoYXJhY3RlcnNcclxuICAgIGNvbnN0IGRpc3BsYXlOYW1lID0gaXRlbS5kaXNwbGF5TmFtZTtcclxuICAgIGlmICghZGlzcGxheU5hbWUpIHtcclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGxlbiA9IGRpc3BsYXlOYW1lLmxlbmd0aDtcclxuICAgIHJldHVybiBkaXNwbGF5TmFtZS5zdWJzdHJpbmcobGVuIC0gMTIpO1xyXG4gIH0sXHJcbiAgbW9yZTogZnVuY3Rpb24gbW9yZSgpIHtcclxuICAgIHRoaXMuY3VycmVudFBhZ2UgKz0gMTtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBoYXNNb3JlRGF0YTogZnVuY3Rpb24gaGFzTW9yZURhdGEoKSB7XHJcbiAgICBjb25zdCB0b3RhbCA9IHRoaXMuZmVlZC50b3RhbENvdW50O1xyXG4gICAgY29uc3QgY291bnQgPSAodGhpcy5jdXJyZW50UGFnZSArIDEpICogdGhpcy5wYWdlU2l6ZTtcclxuICAgIHJldHVybiBjb3VudCA8IHRvdGFsO1xyXG4gIH0sXHJcbiAgcHJvY2Vzc0ZlZWQ6IGZ1bmN0aW9uIHByb2Nlc3NGZWVkKF9mZWVkKSB7XHJcbiAgICBsZXQgZmVlZCA9IF9mZWVkO1xyXG4gICAgaWYgKCF0aGlzLmZlZWQpIHtcclxuICAgICAgdGhpcy5zZXQoJ2xpc3RDb250ZW50JywgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGZpbHRlcihmaWVsZCkge1xyXG4gICAgICByZXR1cm4gZmllbGQuZmllbGROYW1lICE9PSAnc2VjY29kZWxpc3QnICYmIGZpZWxkLmZpZWxkTmFtZSAhPT0gJ2ZpbGVuYW1lJztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmZlZWQgPSBmZWVkID0gZmVlZC5yZXNwb25zZTtcclxuXHJcbiAgICBpZiAoZmVlZC50b3RhbENvdW50ID09PSAwKSB7XHJcbiAgICAgIHRoaXMuc2V0KCdsaXN0Q29udGVudCcsIHRoaXMubm9EYXRhVGVtcGxhdGUuYXBwbHkodGhpcykpO1xyXG4gICAgfSBlbHNlIGlmIChmZWVkLml0ZW1zKSB7XHJcbiAgICAgIGNvbnN0IGRvY2ZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcblxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZlZWQuaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBlbnRyeSA9IGZlZWQuaXRlbXNbaV07XHJcbiAgICAgICAgZW50cnkudHlwZSA9IHRoaXMuZXh0cmFjdFR5cGVGcm9tSXRlbShlbnRyeSk7XHJcbiAgICAgICAgZW50cnkuJGRlc2NyaXB0b3IgPSBlbnRyeS4kZGVzY3JpcHRvciB8fCBlbnRyeS51aURpc3BsYXlOYW1lO1xyXG4gICAgICAgIGVudHJ5LiRrZXkgPSB0aGlzLmV4dHJhY3RLZXlGcm9tSXRlbShlbnRyeSk7XHJcbiAgICAgICAgZW50cnkuJGhlYWRpbmcgPSB0aGlzLmV4dHJhY3REZXNjcmlwdG9yRnJvbUl0ZW0oZW50cnkpO1xyXG4gICAgICAgIGVudHJ5LnN5bm9wc2lzID0gd2luZG93LnVuZXNjYXBlKGVudHJ5LnN5bm9wc2lzKTtcclxuICAgICAgICBlbnRyeS5maWVsZHMgPSBlbnRyeS5maWVsZHMuZmlsdGVyKGZpbHRlcik7XHJcblxyXG4gICAgICAgIHRoaXMuZW50cmllc1tlbnRyeS4ka2V5XSA9IGVudHJ5O1xyXG4gICAgICAgIGNvbnN0IHJvd05vZGUgPSAkKHRoaXMucm93VGVtcGxhdGUuYXBwbHkoZW50cnksIHRoaXMpKTtcclxuICAgICAgICBkb2NmcmFnLmFwcGVuZENoaWxkKHJvd05vZGUuZ2V0KDApKTtcclxuICAgICAgICB0aGlzLm9uQXBwbHlSb3dUZW1wbGF0ZShlbnRyeSwgcm93Tm9kZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkb2NmcmFnLmNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICQodGhpcy5jb250ZW50Tm9kZSkuYXBwZW5kKGRvY2ZyYWcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiBmZWVkLnRvdGFsQ291bnQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGNvbnN0IHJlbWFpbmluZyA9IHRoaXMuZmVlZC50b3RhbENvdW50IC0gKCh0aGlzLmN1cnJlbnRQYWdlICsgMSkgKiB0aGlzLnBhZ2VTaXplKTtcclxuICAgICAgdGhpcy5zZXQoJ3JlbWFpbmluZ0NvbnRlbnQnLCBzdHJpbmcuc3Vic3RpdHV0ZSh0aGlzLnJlbWFpbmluZ1RleHQsIFtyZW1haW5pbmddKSk7XHJcbiAgICB9XHJcblxyXG4gICAgJCh0aGlzLmRvbU5vZGUpLnRvZ2dsZUNsYXNzKCdsaXN0LWhhcy1tb3JlJywgdGhpcy5oYXNNb3JlRGF0YSgpKTtcclxuICB9LFxyXG4gIGNyZWF0ZVJlcXVlc3Q6IGZ1bmN0aW9uIGNyZWF0ZVJlcXVlc3QoKSB7XHJcbiAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhU2VydmljZU9wZXJhdGlvblJlcXVlc3QodGhpcy5nZXRTZXJ2aWNlKCkpXHJcbiAgICAgIC5zZXRDb250cmFjdE5hbWUoJ3N5c3RlbScpXHJcbiAgICAgIC5zZXRPcGVyYXRpb25OYW1lKCdleGVjdXRlU2VhcmNoJyk7XHJcbiAgICByZXR1cm4gcmVxdWVzdDtcclxuICB9LFxyXG4gIGNyZWF0ZVNlYXJjaEVudHJ5OiBmdW5jdGlvbiBjcmVhdGVTZWFyY2hFbnRyeSgpIHtcclxuICAgIGNvbnN0IGVudHJ5ID0ge1xyXG4gICAgICByZXF1ZXN0OiB7XHJcbiAgICAgICAgZG9jVGV4dEl0ZW06IC0xLFxyXG4gICAgICAgIHNlYXJjaFRleHQ6IHRoaXMucXVlcnksXHJcbiAgICAgICAgc2VhcmNoVHlwZTogQXBwLnNwZWVkU2VhcmNoLnNlYXJjaFR5cGUsXHJcbiAgICAgICAgbm9pc2VGaWxlOiAnUE1JTm9pc2UuZGF0JyxcclxuICAgICAgICBpbmNsdWRlU3RlbW1pbmc6IEFwcC5zcGVlZFNlYXJjaC5pbmNsdWRlU3RlbW1pbmcsXHJcbiAgICAgICAgaW5jbHVkZVRoZXNhdXJ1czogQXBwLnNwZWVkU2VhcmNoLmluY2x1ZGVUaGVzYXVydXMsXHJcbiAgICAgICAgaW5jbHVkZVBob25pYzogQXBwLnNwZWVkU2VhcmNoLmluY2x1ZGVQaG9uaWMsXHJcbiAgICAgICAgdXNlRnJlcXVlbnRGaWx0ZXI6IEFwcC5zcGVlZFNlYXJjaC51c2VGcmVxdWVudEZpbHRlcixcclxuICAgICAgICBpbmRleGVzOiB0aGlzLmdldEFjdGl2ZUluZGV4ZXMoKSxcclxuICAgICAgICB3aGljaFBhZ2U6IHRoaXMuY3VycmVudFBhZ2UsXHJcbiAgICAgICAgaXRlbXNQZXJQYWdlOiB0aGlzLnBhZ2VTaXplLFxyXG4gICAgICAgIGZpbHRlcnM6IG51bGwsXHJcbiAgICAgIH0sXHJcbiAgICAgIHJlc3BvbnNlOiBudWxsLFxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gZW50cnk7XHJcbiAgfSxcclxuICBnZXRBY3RpdmVJbmRleGVzOiBmdW5jdGlvbiBnZXRBY3RpdmVJbmRleGVzKCkge1xyXG4gICAgY29uc3QgcmVzdWx0cyA9IFtdO1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICB0aGlzLmFjdGl2ZUluZGV4ZXMuZm9yRWFjaCgoaW5kZXhOYW1lKSA9PiB7XHJcbiAgICAgIHNlbGYuaW5kZXhlcy5mb3JFYWNoKChpbmRleCkgPT4ge1xyXG4gICAgICAgIGlmIChpbmRleC5pbmRleE5hbWUgPT09IGluZGV4TmFtZSkge1xyXG4gICAgICAgICAgcmVzdWx0cy5wdXNoKGluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgfSxcclxuICByZXF1ZXN0RGF0YTogZnVuY3Rpb24gcmVxdWVzdERhdGEoKSB7XHJcbiAgICAkKHRoaXMuZG9tTm9kZSkuYWRkQ2xhc3MoJ2xpc3QtbG9hZGluZycpO1xyXG5cclxuICAgIGNvbnN0IHJlcXVlc3QgPSB0aGlzLmNyZWF0ZVJlcXVlc3QoKTtcclxuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5jcmVhdGVTZWFyY2hFbnRyeSgpO1xyXG5cclxuICAgIHJlcXVlc3QuZXhlY3V0ZShlbnRyeSwge1xyXG4gICAgICBzdWNjZXNzOiBsYW5nLmhpdGNoKHRoaXMsIHRoaXMub25SZXF1ZXN0RGF0YVN1Y2Nlc3MpLFxyXG4gICAgICBmYWlsdHVyZTogbGFuZy5oaXRjaCh0aGlzLCB0aGlzLm9uUmVxdWVzdERhdGFGYWlsdXJlKSxcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgbmF2aWdhdGVUb0RldGFpbFZpZXc6IGZ1bmN0aW9uIG5hdmlnYXRlVG9EZXRhaWxWaWV3KGtleSwgdHlwZSkge1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KGAke3R5cGUudG9Mb3dlckNhc2UoKX1fZGV0YWlsYCk7XHJcblxyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgdmlldy5zaG93KHtcclxuICAgICAgICBrZXksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgY3JlYXRlVG9vbExheW91dDogZnVuY3Rpb24gY3JlYXRlVG9vbExheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLnRvb2xzIHx8ICh0aGlzLnRvb2xzID0ge1xyXG4gICAgICB0YmFyOiBbXSxcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgZ2V0SXRlbUljb25BbHQ6IGZ1bmN0aW9uIGdldEl0ZW1JY29uQWx0KGVudHJ5KSB7XHJcbiAgICByZXR1cm4gZW50cnkudHlwZTtcclxuICB9LFxyXG4gIGdldEl0ZW1EZXNjcmlwdG9yOiBmdW5jdGlvbiBnZXRJdGVtRGVzY3JpcHRvcihlbnRyeSkge1xyXG4gICAgcmV0dXJuIGVudHJ5LnR5cGU7XHJcbiAgfSxcclxuICBjcmVhdGVJbmRpY2F0b3JMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUluZGljYXRvckxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLml0ZW1JbmRpY2F0b3JzIHx8ICh0aGlzLml0ZW1JbmRpY2F0b3JzID0gW3tcclxuICAgICAgaWQ6ICdzcGVhZFNlYXJjaEljb24nLFxyXG4gICAgICBpY29uOiAnJyxcclxuICAgICAgbG9jYXRpb246ICd0b3AnLFxyXG4gICAgICBvbkFwcGx5OiBmdW5jdGlvbiBvbkFwcGx5KGVudHJ5LCBwYXJlbnQpIHtcclxuICAgICAgICBwYXJlbnQuYXBwbHlBY3Rpdml0eUluZGljYXRvcihlbnRyeSwgdGhpcyk7XHJcbiAgICAgIH0sXHJcbiAgICB9XSk7XHJcbiAgfSxcclxuICBhcHBseUFjdGl2aXR5SW5kaWNhdG9yOiBmdW5jdGlvbiBhcHBseUFjdGl2aXR5SW5kaWNhdG9yKGVudHJ5LCBpbmRpY2F0b3IpIHtcclxuICAgIGluZGljYXRvci5pc0VuYWJsZWQgPSB0cnVlO1xyXG4gICAgaW5kaWNhdG9yLnNob3dJY29uID0gZmFsc2U7XHJcbiAgICBpbmRpY2F0b3IubGFiZWwgPSB0aGlzLmluZGV4ZXNUZXh0W2VudHJ5LnR5cGVdO1xyXG4gICAgaW5kaWNhdG9yLnZhbHVlVGV4dCA9IHRoaXMuaW5kZXhlc1RleHRbZW50cnkudHlwZV07XHJcbiAgfSxcclxuICBfaW50U2VhcmNoRXhwcmVzc2lvbk5vZGU6IGZ1bmN0aW9uIF9pbnRTZWFyY2hFeHByZXNzaW9uTm9kZSgpIHtcclxuICAgIGNvbnN0IGxpc3ROb2RlID0gJChgIyR7dGhpcy5pZH1gKTtcclxuICAgIGlmIChsaXN0Tm9kZVswXSkge1xyXG4gICAgICBjb25zdCBodG1sID0gdGhpcy5zZWFyY2hFeHByZXNzaW9uVGVtcGxhdGUuYXBwbHkodGhpcyk7XHJcbiAgICAgICQobGlzdE5vZGVbMF0pLnByZXBlbmQoaHRtbCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBfaXNJbmRleEFjdGl2ZTogZnVuY3Rpb24gX2lzSW5kZXhBY3RpdmUoaW5kZXhOYW1lKSB7XHJcbiAgICBsZXQgaW5kZXhGb3VuZCA9IGZhbHNlO1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlSW5kZXhlcy5pbmRleE9mKGluZGV4TmFtZSkgPiAtMSkge1xyXG4gICAgICBpbmRleEZvdW5kID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBpbmRleEZvdW5kO1xyXG4gIH0sXHJcbiAgc2VsZWN0SW5kZXg6IGZ1bmN0aW9uIHNlbGVjdEluZGV4KGUpIHtcclxuICAgIGNvbnN0IGJ1dHRvbiA9IGUuJHNvdXJjZTtcclxuICAgIGNvbnN0IGluZGV4TmFtZSA9ICQoYnV0dG9uKS5hdHRyKCdkYXRhLWluZGV4Jyk7XHJcbiAgICBjb25zdCBhY3RpdmF0ZWQgPSB0aGlzLmFjdGl2YXRlSW5kZXgoaW5kZXhOYW1lKTtcclxuICAgIGlmIChhY3RpdmF0ZWQpIHtcclxuICAgICAgJChidXR0b24pLmFkZENsYXNzKCdjYXJkLWxheW91dC1zcGVlZC1zZWFyY2gtaW5kZXgtc2VsZWN0ZWQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICQoYnV0dG9uKS5yZW1vdmVDbGFzcygnY2FyZC1sYXlvdXQtc3BlZWQtc2VhcmNoLWluZGV4LXNlbGVjdGVkJyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBhY3RpdmF0ZUluZGV4OiBmdW5jdGlvbiBhY3RpdmF0ZUluZGV4KGluZGV4TmFtZSkge1xyXG4gICAgY29uc3QgdGVtcEFjdGl2ZUluZGV4ID0gW107XHJcbiAgICBsZXQgaW5kZXhGb3VuZCA9IGZhbHNlO1xyXG4gICAgbGV0IGFjdGl2YXRlZCA9IGZhbHNlO1xyXG5cclxuICAgIGlmICh0aGlzLmFjdGl2ZUluZGV4ZXMuaW5kZXhPZihpbmRleE5hbWUpID4gLTEpIHtcclxuICAgICAgaW5kZXhGb3VuZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAoaW5kZXhGb3VuZCkge1xyXG4gICAgICB0aGlzLmFjdGl2ZUluZGV4ZXMuZm9yRWFjaCgoYUluZGV4TmFtZSkgPT4ge1xyXG4gICAgICAgIGlmIChhSW5kZXhOYW1lICE9PSBpbmRleE5hbWUpIHtcclxuICAgICAgICAgIHRlbXBBY3RpdmVJbmRleC5wdXNoKGFJbmRleE5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuYWN0aXZlSW5kZXhlcyA9IHRlbXBBY3RpdmVJbmRleDtcclxuICAgICAgYWN0aXZhdGVkID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmFjdGl2ZUluZGV4ZXMucHVzaChpbmRleE5hbWUpO1xyXG4gICAgICBhY3RpdmF0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhY3RpdmF0ZWQ7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=