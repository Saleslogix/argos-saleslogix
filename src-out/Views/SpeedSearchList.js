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
      this.inherited(clear, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9TcGVlZFNlYXJjaExpc3QuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiaXRlbVRlbXBsYXRlIiwiU2ltcGxhdGUiLCJmaWVsZFRlbXBsYXRlIiwidGl0bGVUZXh0IiwiaWQiLCJlbmFibGVTZWFyY2giLCJlbmFibGVBY3Rpb25zIiwic2VhcmNoV2lkZ2V0Q2xhc3MiLCJleHBvc2UiLCJhY3RpdmVJbmRleGVzIiwiaW5kZXhlcyIsImluZGV4TmFtZSIsImluZGV4VHlwZSIsImlzU2VjdXJlIiwidHlwZXMiLCJpbmRleGVzVGV4dCIsIkFjY291bnQiLCJhY2NvdW50VGV4dCIsIkFjdGl2aXR5IiwiYWN0aXZpdHlUZXh0IiwiQ29udGFjdCIsImNvbnRhY3RUZXh0IiwiSGlzdG9yeSIsImhpc3RvcnlUZXh0IiwiTGVhZCIsImxlYWRUZXh0IiwiT3Bwb3J0dW5pdHkiLCJvcHBvcnR1bml0eVRleHQiLCJUaWNrZXQiLCJ0aWNrZXRUZXh0IiwiaXRlbUljb25CeVR5cGUiLCJjdXJyZW50UGFnZSIsImNsZWFyIiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiX2Zvcm1hdEZpZWxkTmFtZSIsImdldEl0ZW1JY29uQ2xhc3MiLCJlbnRyeSIsInR5cGUiLCJ0eXBlQ2xzIiwiY2xzIiwiaXRlbUljb25DbGFzcyIsImV4dHJhY3RUeXBlRnJvbUl0ZW0iLCJpdGVtIiwiaSIsImxlbmd0aCIsInNvdXJjZSIsImluZGV4T2YiLCJleHRyYWN0RGVzY3JpcHRvckZyb21JdGVtIiwiZGVzY3JpcHRvciIsInVpRGlzcGxheU5hbWUiLCJyZXN0Iiwic3BsaXQiLCJleHRyYWN0S2V5RnJvbUl0ZW0iLCJkaXNwbGF5TmFtZSIsImxlbiIsInN1YnN0cmluZyIsIm1vcmUiLCJoYXNNb3JlRGF0YSIsInRvdGFsIiwiZmVlZCIsInRvdGFsQ291bnQiLCJjb3VudCIsInBhZ2VTaXplIiwicHJvY2Vzc0ZlZWQiLCJfZmVlZCIsInNldCIsImZpbHRlciIsImZpZWxkIiwiZmllbGROYW1lIiwicmVzcG9uc2UiLCJub0RhdGFUZW1wbGF0ZSIsImFwcGx5IiwiaXRlbXMiLCJkb2NmcmFnIiwiZG9jdW1lbnQiLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50IiwiJGRlc2NyaXB0b3IiLCIka2V5IiwiJGhlYWRpbmciLCJzeW5vcHNpcyIsIndpbmRvdyIsInVuZXNjYXBlIiwiZmllbGRzIiwiZW50cmllcyIsInJvd05vZGUiLCIkIiwicm93VGVtcGxhdGUiLCJhcHBlbmRDaGlsZCIsImdldCIsIm9uQXBwbHlSb3dUZW1wbGF0ZSIsImNoaWxkTm9kZXMiLCJjb250ZW50Tm9kZSIsImFwcGVuZCIsInJlbWFpbmluZyIsInN1YnN0aXR1dGUiLCJyZW1haW5pbmdUZXh0IiwiZG9tTm9kZSIsInRvZ2dsZUNsYXNzIiwiY3JlYXRlUmVxdWVzdCIsInJlcXVlc3QiLCJTYWdlIiwiU0RhdGEiLCJDbGllbnQiLCJTRGF0YVNlcnZpY2VPcGVyYXRpb25SZXF1ZXN0IiwiZ2V0U2VydmljZSIsInNldENvbnRyYWN0TmFtZSIsInNldE9wZXJhdGlvbk5hbWUiLCJjcmVhdGVTZWFyY2hFbnRyeSIsImRvY1RleHRJdGVtIiwic2VhcmNoVGV4dCIsInF1ZXJ5Iiwic2VhcmNoVHlwZSIsIkFwcCIsInNwZWVkU2VhcmNoIiwibm9pc2VGaWxlIiwiaW5jbHVkZVN0ZW1taW5nIiwiaW5jbHVkZVRoZXNhdXJ1cyIsImluY2x1ZGVQaG9uaWMiLCJ1c2VGcmVxdWVudEZpbHRlciIsImdldEFjdGl2ZUluZGV4ZXMiLCJ3aGljaFBhZ2UiLCJpdGVtc1BlclBhZ2UiLCJmaWx0ZXJzIiwicmVzdWx0cyIsInNlbGYiLCJmb3JFYWNoIiwiaW5kZXgiLCJwdXNoIiwicmVxdWVzdERhdGEiLCJhZGRDbGFzcyIsImV4ZWN1dGUiLCJzdWNjZXNzIiwiaGl0Y2giLCJvblJlcXVlc3REYXRhU3VjY2VzcyIsImZhaWx0dXJlIiwib25SZXF1ZXN0RGF0YUZhaWx1cmUiLCJuYXZpZ2F0ZVRvRGV0YWlsVmlldyIsImtleSIsInZpZXciLCJnZXRWaWV3IiwidG9Mb3dlckNhc2UiLCJzaG93IiwiY3JlYXRlVG9vbExheW91dCIsInRvb2xzIiwidGJhciIsImdldEl0ZW1JY29uQWx0IiwiZ2V0SXRlbURlc2NyaXB0b3IiLCJjcmVhdGVJbmRpY2F0b3JMYXlvdXQiLCJpdGVtSW5kaWNhdG9ycyIsImljb24iLCJsb2NhdGlvbiIsIm9uQXBwbHkiLCJwYXJlbnQiLCJhcHBseUFjdGl2aXR5SW5kaWNhdG9yIiwiaW5kaWNhdG9yIiwiaXNFbmFibGVkIiwic2hvd0ljb24iLCJsYWJlbCIsInZhbHVlVGV4dCIsIl9pbnRTZWFyY2hFeHByZXNzaW9uTm9kZSIsImxpc3ROb2RlIiwiaHRtbCIsInNlYXJjaEV4cHJlc3Npb25UZW1wbGF0ZSIsInByZXBlbmQiLCJfaXNJbmRleEFjdGl2ZSIsImluZGV4Rm91bmQiLCJzZWxlY3RJbmRleCIsImUiLCJidXR0b24iLCIkc291cmNlIiwiYXR0ciIsImFjdGl2YXRlZCIsImFjdGl2YXRlSW5kZXgiLCJyZW1vdmVDbGFzcyIsInRlbXBBY3RpdmVJbmRleCIsImFJbmRleE5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUF5QkEsTUFBTUEsV0FBVyxvQkFBWSxpQkFBWixDQUFqQjs7QUFFQTs7Ozs7Ozs7QUFRQSxNQUFNQyxVQUFVLHVCQUFRLDJCQUFSLEVBQXFDLDJGQUFyQyxFQUFzRztBQUNwSDtBQUNBQyxrQkFBYyxJQUFJQyxRQUFKLENBQWEsQ0FDekIsOERBRHlCLEVBRXpCLHlCQUZ5QixDQUFiLENBRnNHOztBQU9wSEMsbUJBQWUsSUFBSUQsUUFBSixDQUFhLENBQzFCLGlDQUQwQixFQUUxQixrREFGMEIsRUFHMUIsNEdBSDBCLEVBSTFCLFNBSjBCLEVBSzFCLE9BTDBCLENBQWIsQ0FQcUc7O0FBZXBIO0FBQ0FFLGVBQVdMLFNBQVNLLFNBaEJnRzs7QUFrQnBIO0FBQ0FDLFFBQUksa0JBbkJnSDtBQW9CcEhDLGtCQUFjLElBcEJzRztBQXFCcEhDLG1CQUFlLElBckJxRztBQXNCcEhDLGtEQXRCb0g7QUF1QnBIQyxZQUFRLEtBdkI0RztBQXdCcEhDLG1CQUFlLENBQUMsU0FBRCxFQUFZLFNBQVosRUFBdUIsTUFBdkIsRUFBK0IsVUFBL0IsRUFBMkMsU0FBM0MsRUFBc0QsYUFBdEQsRUFBcUUsUUFBckUsQ0F4QnFHO0FBeUJwSEMsYUFBUyxDQUFDO0FBQ1JDLGlCQUFXLFNBREg7QUFFUkMsaUJBQVcsQ0FGSDtBQUdSQyxnQkFBVTtBQUhGLEtBQUQsRUFJTjtBQUNERixpQkFBVyxVQURWO0FBRURDLGlCQUFXLENBRlY7QUFHREMsZ0JBQVU7QUFIVCxLQUpNLEVBUU47QUFDREYsaUJBQVcsU0FEVjtBQUVEQyxpQkFBVyxDQUZWO0FBR0RDLGdCQUFVO0FBSFQsS0FSTSxFQVlOO0FBQ0RGLGlCQUFXLFNBRFY7QUFFREMsaUJBQVcsQ0FGVjtBQUdEQyxnQkFBVTtBQUhULEtBWk0sRUFnQk47QUFDREYsaUJBQVcsTUFEVjtBQUVEQyxpQkFBVyxDQUZWO0FBR0RDLGdCQUFVO0FBSFQsS0FoQk0sRUFvQk47QUFDREYsaUJBQVcsYUFEVjtBQUVEQyxpQkFBVyxDQUZWO0FBR0RDLGdCQUFVO0FBSFQsS0FwQk0sRUF3Qk47QUFDREYsaUJBQVcsUUFEVjtBQUVEQyxpQkFBVyxDQUZWO0FBR0RDLGdCQUFVO0FBSFQsS0F4Qk0sQ0F6QjJHO0FBc0RwSEMsV0FBTyxDQUFDLFNBQUQsRUFBWSxVQUFaLEVBQXdCLFNBQXhCLEVBQW1DLFNBQW5DLEVBQThDLE1BQTlDLEVBQXNELGFBQXRELEVBQXFFLFFBQXJFLENBdEQ2RztBQXVEcEhDLGlCQUFhO0FBQ1hDLGVBQVNsQixTQUFTbUIsV0FEUDtBQUVYQyxnQkFBVXBCLFNBQVNxQixZQUZSO0FBR1hDLGVBQVN0QixTQUFTdUIsV0FIUDtBQUlYQyxlQUFTeEIsU0FBU3lCLFdBSlA7QUFLWEMsWUFBTTFCLFNBQVMyQixRQUxKO0FBTVhDLG1CQUFhNUIsU0FBUzZCLGVBTlg7QUFPWEMsY0FBUTlCLFNBQVMrQjtBQVBOLEtBdkR1RztBQWdFcEhDLG9CQUFnQjtBQUNkVixlQUFTLE1BREs7QUFFZEosZUFBUyxhQUZLO0FBR2RVLG1CQUFhLFNBSEM7QUFJZEUsY0FBUSxnQkFKTTtBQUtkSixZQUFNLE9BTFE7QUFNZE4sZ0JBQVUsVUFOSTtBQU9kSSxlQUFTO0FBUEssS0FoRW9HO0FBeUVwSFMsaUJBQWEsSUF6RXVHOztBQTJFcEhDLFdBQU8sU0FBU0EsS0FBVCxHQUFpQjtBQUN0QixXQUFLQyxTQUFMLENBQWVELEtBQWYsRUFBc0JFLFNBQXRCO0FBQ0EsV0FBS0gsV0FBTCxHQUFtQixDQUFuQjtBQUNELEtBOUVtSDtBQStFcEhJLHNCQUFrQixTQUFTQSxnQkFBVCxHQUE0QixDQUFFLENBL0VvRTtBQWdGcEhDLHNCQUFrQixTQUFTQSxnQkFBVCxDQUEwQkMsS0FBMUIsRUFBaUM7QUFDakQsVUFBTUMsT0FBT0QsU0FBU0EsTUFBTUMsSUFBNUI7QUFDQSxVQUFNQyxVQUFVLEtBQUtULGNBQUwsQ0FBb0JRLElBQXBCLENBQWhCO0FBQ0EsVUFBSUUsTUFBTSxLQUFLQyxhQUFmO0FBQ0EsVUFBSUYsT0FBSixFQUFhO0FBQ1hDLGNBQU1ELE9BQU47QUFDRDs7QUFFRCxhQUFPQyxHQUFQO0FBQ0QsS0F6Rm1IO0FBMEZwSEUseUJBQXFCLFNBQVNBLG1CQUFULENBQTZCQyxJQUE3QixFQUFtQztBQUN0RCxXQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSSxLQUFLOUIsS0FBTCxDQUFXK0IsTUFBL0IsRUFBdUNELEdBQXZDLEVBQTRDO0FBQzFDLFlBQUlELEtBQUtHLE1BQUwsQ0FBWUMsT0FBWixDQUFvQixLQUFLakMsS0FBTCxDQUFXOEIsQ0FBWCxDQUFwQixNQUF1QyxDQUFDLENBQTVDLEVBQStDO0FBQzdDLGlCQUFPLEtBQUs5QixLQUFMLENBQVc4QixDQUFYLENBQVA7QUFDRDtBQUNGOztBQUVELGFBQU8sSUFBUDtBQUNELEtBbEdtSDtBQW1HcEhJLCtCQUEyQixTQUFTQSx5QkFBVCxDQUFtQ0wsSUFBbkMsRUFBeUM7QUFDbEUsVUFBSU0sYUFBYU4sUUFBUUEsS0FBS08sYUFBOUI7QUFDQSxVQUFJQyxhQUFKOztBQUVBLFVBQUlGLFVBQUosRUFBZ0I7QUFDZEEscUJBQWFBLFdBQVdHLEtBQVgsQ0FBaUIsR0FBakIsQ0FBYjtBQUNBRCxlQUFPRixXQUFXLENBQVgsQ0FBUDtBQUNEOztBQUVELGFBQU9FLElBQVA7QUFDRCxLQTdHbUg7QUE4R3BIRSx3QkFBb0IsU0FBU0Esa0JBQVQsQ0FBNEJWLElBQTVCLEVBQWtDO0FBQ3BEO0FBQ0EsVUFBTVcsY0FBY1gsS0FBS1csV0FBekI7QUFDQSxVQUFJLENBQUNBLFdBQUwsRUFBa0I7QUFDaEIsZUFBTyxFQUFQO0FBQ0Q7O0FBRUQsVUFBTUMsTUFBTUQsWUFBWVQsTUFBeEI7QUFDQSxhQUFPUyxZQUFZRSxTQUFaLENBQXNCRCxNQUFNLEVBQTVCLENBQVA7QUFDRCxLQXZIbUg7QUF3SHBIRSxVQUFNLFNBQVNBLElBQVQsR0FBZ0I7QUFDcEIsV0FBSzFCLFdBQUwsSUFBb0IsQ0FBcEI7QUFDQSxXQUFLRSxTQUFMLENBQWV3QixJQUFmLEVBQXFCdkIsU0FBckI7QUFDRCxLQTNIbUg7QUE0SHBId0IsaUJBQWEsU0FBU0EsV0FBVCxHQUF1QjtBQUNsQyxVQUFNQyxRQUFRLEtBQUtDLElBQUwsQ0FBVUMsVUFBeEI7QUFDQSxVQUFNQyxRQUFRLENBQUMsS0FBSy9CLFdBQUwsR0FBbUIsQ0FBcEIsSUFBeUIsS0FBS2dDLFFBQTVDO0FBQ0EsYUFBT0QsUUFBUUgsS0FBZjtBQUNELEtBaEltSDtBQWlJcEhLLGlCQUFhLFNBQVNBLFdBQVQsQ0FBcUJDLEtBQXJCLEVBQTRCO0FBQ3ZDLFVBQUlMLE9BQU9LLEtBQVg7QUFDQSxVQUFJLENBQUMsS0FBS0wsSUFBVixFQUFnQjtBQUNkLGFBQUtNLEdBQUwsQ0FBUyxhQUFULEVBQXdCLEVBQXhCO0FBQ0Q7O0FBRUQsZUFBU0MsTUFBVCxDQUFnQkMsS0FBaEIsRUFBdUI7QUFDckIsZUFBT0EsTUFBTUMsU0FBTixLQUFvQixhQUFwQixJQUFxQ0QsTUFBTUMsU0FBTixLQUFvQixVQUFoRTtBQUNEOztBQUVELFdBQUtULElBQUwsR0FBWUEsT0FBT0EsS0FBS1UsUUFBeEI7O0FBRUEsVUFBSVYsS0FBS0MsVUFBTCxLQUFvQixDQUF4QixFQUEyQjtBQUN6QixhQUFLSyxHQUFMLENBQVMsYUFBVCxFQUF3QixLQUFLSyxjQUFMLENBQW9CQyxLQUFwQixDQUEwQixJQUExQixDQUF4QjtBQUNELE9BRkQsTUFFTyxJQUFJWixLQUFLYSxLQUFULEVBQWdCO0FBQ3JCLFlBQU1DLFVBQVVDLFNBQVNDLHNCQUFULEVBQWhCOztBQUVBLGFBQUssSUFBSWhDLElBQUksQ0FBYixFQUFnQkEsSUFBSWdCLEtBQUthLEtBQUwsQ0FBVzVCLE1BQS9CLEVBQXVDRCxHQUF2QyxFQUE0QztBQUMxQyxjQUFNUCxRQUFRdUIsS0FBS2EsS0FBTCxDQUFXN0IsQ0FBWCxDQUFkO0FBQ0FQLGdCQUFNQyxJQUFOLEdBQWEsS0FBS0ksbUJBQUwsQ0FBeUJMLEtBQXpCLENBQWI7QUFDQUEsZ0JBQU13QyxXQUFOLEdBQW9CeEMsTUFBTXdDLFdBQU4sSUFBcUJ4QyxNQUFNYSxhQUEvQztBQUNBYixnQkFBTXlDLElBQU4sR0FBYSxLQUFLekIsa0JBQUwsQ0FBd0JoQixLQUF4QixDQUFiO0FBQ0FBLGdCQUFNMEMsUUFBTixHQUFpQixLQUFLL0IseUJBQUwsQ0FBK0JYLEtBQS9CLENBQWpCO0FBQ0FBLGdCQUFNMkMsUUFBTixHQUFpQkMsT0FBT0MsUUFBUCxDQUFnQjdDLE1BQU0yQyxRQUF0QixDQUFqQjtBQUNBM0MsZ0JBQU04QyxNQUFOLEdBQWU5QyxNQUFNOEMsTUFBTixDQUFhaEIsTUFBYixDQUFvQkEsTUFBcEIsQ0FBZjs7QUFFQSxlQUFLaUIsT0FBTCxDQUFhL0MsTUFBTXlDLElBQW5CLElBQTJCekMsS0FBM0I7QUFDQSxjQUFNZ0QsVUFBVUMsRUFBRSxLQUFLQyxXQUFMLENBQWlCZixLQUFqQixDQUF1Qm5DLEtBQXZCLEVBQThCLElBQTlCLENBQUYsQ0FBaEI7QUFDQXFDLGtCQUFRYyxXQUFSLENBQW9CSCxRQUFRSSxHQUFSLENBQVksQ0FBWixDQUFwQjtBQUNBLGVBQUtDLGtCQUFMLENBQXdCckQsS0FBeEIsRUFBK0JnRCxPQUEvQjtBQUNEOztBQUVELFlBQUlYLFFBQVFpQixVQUFSLENBQW1COUMsTUFBbkIsR0FBNEIsQ0FBaEMsRUFBbUM7QUFDakN5QyxZQUFFLEtBQUtNLFdBQVAsRUFBb0JDLE1BQXBCLENBQTJCbkIsT0FBM0I7QUFDRDtBQUNGOztBQUVELFVBQUksT0FBT2QsS0FBS0MsVUFBWixLQUEyQixXQUEvQixFQUE0QztBQUMxQyxZQUFNaUMsWUFBWSxLQUFLbEMsSUFBTCxDQUFVQyxVQUFWLEdBQXdCLENBQUMsS0FBSzlCLFdBQUwsR0FBbUIsQ0FBcEIsSUFBeUIsS0FBS2dDLFFBQXhFO0FBQ0EsYUFBS0csR0FBTCxDQUFTLGtCQUFULEVBQTZCLGlCQUFPNkIsVUFBUCxDQUFrQixLQUFLQyxhQUF2QixFQUFzQyxDQUFDRixTQUFELENBQXRDLENBQTdCO0FBQ0Q7O0FBRURSLFFBQUUsS0FBS1csT0FBUCxFQUFnQkMsV0FBaEIsQ0FBNEIsZUFBNUIsRUFBNkMsS0FBS3hDLFdBQUwsRUFBN0M7QUFDRCxLQTVLbUg7QUE2S3BIeUMsbUJBQWUsU0FBU0EsYUFBVCxHQUF5QjtBQUN0QyxVQUFNQyxVQUFVLElBQUlDLEtBQUtDLEtBQUwsQ0FBV0MsTUFBWCxDQUFrQkMsNEJBQXRCLENBQW1ELEtBQUtDLFVBQUwsRUFBbkQsRUFDYkMsZUFEYSxDQUNHLFFBREgsRUFFYkMsZ0JBRmEsQ0FFSSxlQUZKLENBQWhCO0FBR0EsYUFBT1AsT0FBUDtBQUNELEtBbExtSDtBQW1McEhRLHVCQUFtQixTQUFTQSxpQkFBVCxHQUE2QjtBQUM5QyxVQUFNdkUsUUFBUTtBQUNaK0QsaUJBQVM7QUFDUFMsdUJBQWEsQ0FBQyxDQURQO0FBRVBDLHNCQUFZLEtBQUtDLEtBRlY7QUFHUEMsc0JBQVlDLElBQUlDLFdBQUosQ0FBZ0JGLFVBSHJCO0FBSVBHLHFCQUFXLGNBSko7QUFLUEMsMkJBQWlCSCxJQUFJQyxXQUFKLENBQWdCRSxlQUwxQjtBQU1QQyw0QkFBa0JKLElBQUlDLFdBQUosQ0FBZ0JHLGdCQU4zQjtBQU9QQyx5QkFBZUwsSUFBSUMsV0FBSixDQUFnQkksYUFQeEI7QUFRUEMsNkJBQW1CTixJQUFJQyxXQUFKLENBQWdCSyxpQkFSNUI7QUFTUDdHLG1CQUFTLEtBQUs4RyxnQkFBTCxFQVRGO0FBVVBDLHFCQUFXLEtBQUsxRixXQVZUO0FBV1AyRix3QkFBYyxLQUFLM0QsUUFYWjtBQVlQNEQsbUJBQVM7QUFaRixTQURHO0FBZVpyRCxrQkFBVTtBQWZFLE9BQWQ7O0FBa0JBLGFBQU9qQyxLQUFQO0FBQ0QsS0F2TW1IO0FBd01wSG1GLHNCQUFrQixTQUFTQSxnQkFBVCxHQUE0QjtBQUM1QyxVQUFNSSxVQUFVLEVBQWhCO0FBQ0EsVUFBTUMsT0FBTyxJQUFiO0FBQ0EsV0FBS3BILGFBQUwsQ0FBbUJxSCxPQUFuQixDQUEyQixVQUFDbkgsU0FBRCxFQUFlO0FBQ3hDa0gsYUFBS25ILE9BQUwsQ0FBYW9ILE9BQWIsQ0FBcUIsVUFBQ0MsS0FBRCxFQUFXO0FBQzlCLGNBQUlBLE1BQU1wSCxTQUFOLEtBQW9CQSxTQUF4QixFQUFtQztBQUNqQ2lILG9CQUFRSSxJQUFSLENBQWFELEtBQWI7QUFDRDtBQUNGLFNBSkQ7QUFLRCxPQU5EOztBQVFBLGFBQU9ILE9BQVA7QUFDRCxLQXBObUg7QUFxTnBISyxpQkFBYSxTQUFTQSxXQUFULEdBQXVCO0FBQ2xDM0MsUUFBRSxLQUFLVyxPQUFQLEVBQWdCaUMsUUFBaEIsQ0FBeUIsY0FBekI7O0FBRUEsVUFBTTlCLFVBQVUsS0FBS0QsYUFBTCxFQUFoQjtBQUNBLFVBQU05RCxRQUFRLEtBQUt1RSxpQkFBTCxFQUFkOztBQUVBUixjQUFRK0IsT0FBUixDQUFnQjlGLEtBQWhCLEVBQXVCO0FBQ3JCK0YsaUJBQVMsZUFBS0MsS0FBTCxDQUFXLElBQVgsRUFBaUIsS0FBS0Msb0JBQXRCLENBRFk7QUFFckJDLGtCQUFVLGVBQUtGLEtBQUwsQ0FBVyxJQUFYLEVBQWlCLEtBQUtHLG9CQUF0QjtBQUZXLE9BQXZCO0FBSUQsS0EvTm1IO0FBZ09wSEMsMEJBQXNCLFNBQVNBLG9CQUFULENBQThCQyxHQUE5QixFQUFtQ3BHLElBQW5DLEVBQXlDO0FBQzdELFVBQU1xRyxPQUFPMUIsSUFBSTJCLE9BQUosQ0FBZXRHLEtBQUt1RyxXQUFMLEVBQWYsYUFBYjs7QUFFQSxVQUFJRixJQUFKLEVBQVU7QUFDUkEsYUFBS0csSUFBTCxDQUFVO0FBQ1JKO0FBRFEsU0FBVjtBQUdEO0FBQ0YsS0F4T21IO0FBeU9wSEssc0JBQWtCLFNBQVNBLGdCQUFULEdBQTRCO0FBQzVDLGFBQU8sS0FBS0MsS0FBTCxLQUFlLEtBQUtBLEtBQUwsR0FBYTtBQUNqQ0MsY0FBTTtBQUQyQixPQUE1QixDQUFQO0FBR0QsS0E3T21IO0FBOE9wSEMsb0JBQWdCLFNBQVNBLGNBQVQsQ0FBd0I3RyxLQUF4QixFQUErQjtBQUM3QyxhQUFPQSxNQUFNQyxJQUFiO0FBQ0QsS0FoUG1IO0FBaVBwSDZHLHVCQUFtQixTQUFTQSxpQkFBVCxDQUEyQjlHLEtBQTNCLEVBQWtDO0FBQ25ELGFBQU9BLE1BQU1DLElBQWI7QUFDRCxLQW5QbUg7QUFvUHBIOEcsMkJBQXVCLFNBQVNBLHFCQUFULEdBQWlDO0FBQ3RELGFBQU8sS0FBS0MsY0FBTCxLQUF3QixLQUFLQSxjQUFMLEdBQXNCLENBQUM7QUFDcERqSixZQUFJLGlCQURnRDtBQUVwRGtKLGNBQU0sRUFGOEM7QUFHcERDLGtCQUFVLEtBSDBDO0FBSXBEQyxpQkFBUyxTQUFTQSxPQUFULENBQWlCbkgsS0FBakIsRUFBd0JvSCxNQUF4QixFQUFnQztBQUN2Q0EsaUJBQU9DLHNCQUFQLENBQThCckgsS0FBOUIsRUFBcUMsSUFBckM7QUFDRDtBQU5tRCxPQUFELENBQTlDLENBQVA7QUFRRCxLQTdQbUg7QUE4UHBIcUgsNEJBQXdCLFNBQVNBLHNCQUFULENBQWdDckgsS0FBaEMsRUFBdUNzSCxTQUF2QyxFQUFrRDtBQUN4RUEsZ0JBQVVDLFNBQVYsR0FBc0IsSUFBdEI7QUFDQUQsZ0JBQVVFLFFBQVYsR0FBcUIsS0FBckI7QUFDQUYsZ0JBQVVHLEtBQVYsR0FBa0IsS0FBSy9JLFdBQUwsQ0FBaUJzQixNQUFNQyxJQUF2QixDQUFsQjtBQUNBcUgsZ0JBQVVJLFNBQVYsR0FBc0IsS0FBS2hKLFdBQUwsQ0FBaUJzQixNQUFNQyxJQUF2QixDQUF0QjtBQUNELEtBblFtSDtBQW9RcEgwSCw4QkFBMEIsU0FBU0Esd0JBQVQsR0FBb0M7QUFDNUQsVUFBTUMsV0FBVzNFLFFBQU0sS0FBS2xGLEVBQVgsQ0FBakI7QUFDQSxVQUFJNkosU0FBUyxDQUFULENBQUosRUFBaUI7QUFDZixZQUFNQyxPQUFPLEtBQUtDLHdCQUFMLENBQThCM0YsS0FBOUIsQ0FBb0MsSUFBcEMsQ0FBYjtBQUNBYyxVQUFFMkUsU0FBUyxDQUFULENBQUYsRUFBZUcsT0FBZixDQUF1QkYsSUFBdkI7QUFDRDtBQUNGLEtBMVFtSDtBQTJRcEhHLG9CQUFnQixTQUFTQSxjQUFULENBQXdCMUosU0FBeEIsRUFBbUM7QUFDakQsVUFBSTJKLGFBQWEsS0FBakI7QUFDQSxVQUFJLEtBQUs3SixhQUFMLENBQW1Cc0MsT0FBbkIsQ0FBMkJwQyxTQUEzQixJQUF3QyxDQUFDLENBQTdDLEVBQWdEO0FBQzlDMkoscUJBQWEsSUFBYjtBQUNEO0FBQ0QsYUFBT0EsVUFBUDtBQUNELEtBalJtSDtBQWtScEhDLGlCQUFhLFNBQVNBLFdBQVQsQ0FBcUJDLENBQXJCLEVBQXdCO0FBQ25DLFVBQU1DLFNBQVNELEVBQUVFLE9BQWpCO0FBQ0EsVUFBTS9KLFlBQVkyRSxFQUFFbUYsTUFBRixFQUFVRSxJQUFWLENBQWUsWUFBZixDQUFsQjtBQUNBLFVBQU1DLFlBQVksS0FBS0MsYUFBTCxDQUFtQmxLLFNBQW5CLENBQWxCO0FBQ0EsVUFBSWlLLFNBQUosRUFBZTtBQUNidEYsVUFBRW1GLE1BQUYsRUFBVXZDLFFBQVYsQ0FBbUIseUNBQW5CO0FBQ0QsT0FGRCxNQUVPO0FBQ0w1QyxVQUFFbUYsTUFBRixFQUFVSyxXQUFWLENBQXNCLHlDQUF0QjtBQUNEO0FBQ0YsS0EzUm1IO0FBNFJwSEQsbUJBQWUsU0FBU0EsYUFBVCxDQUF1QmxLLFNBQXZCLEVBQWtDO0FBQy9DLFVBQU1vSyxrQkFBa0IsRUFBeEI7QUFDQSxVQUFJVCxhQUFhLEtBQWpCO0FBQ0EsVUFBSU0sWUFBWSxLQUFoQjs7QUFFQSxVQUFJLEtBQUtuSyxhQUFMLENBQW1Cc0MsT0FBbkIsQ0FBMkJwQyxTQUEzQixJQUF3QyxDQUFDLENBQTdDLEVBQWdEO0FBQzlDMkoscUJBQWEsSUFBYjtBQUNEO0FBQ0QsVUFBSUEsVUFBSixFQUFnQjtBQUNkLGFBQUs3SixhQUFMLENBQW1CcUgsT0FBbkIsQ0FBMkIsVUFBQ2tELFVBQUQsRUFBZ0I7QUFDekMsY0FBSUEsZUFBZXJLLFNBQW5CLEVBQThCO0FBQzVCb0ssNEJBQWdCL0MsSUFBaEIsQ0FBcUJnRCxVQUFyQjtBQUNEO0FBQ0YsU0FKRDtBQUtBLGFBQUt2SyxhQUFMLEdBQXFCc0ssZUFBckI7QUFDQUgsb0JBQVksS0FBWjtBQUNELE9BUkQsTUFRTztBQUNMLGFBQUtuSyxhQUFMLENBQW1CdUgsSUFBbkIsQ0FBd0JySCxTQUF4QjtBQUNBaUssb0JBQVksSUFBWjtBQUNEOztBQUVELGFBQU9BLFNBQVA7QUFDRDtBQWxUbUgsR0FBdEcsQ0FBaEI7O29CQXFUZTdLLE8iLCJmaWxlIjoiU3BlZWRTZWFyY2hMaXN0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IHN0cmluZyBmcm9tICdkb2pvL3N0cmluZyc7XHJcbmltcG9ydCBTcGVlZFNlYXJjaFdpZGdldCBmcm9tICcuLi9TcGVlZFNlYXJjaFdpZGdldCc7XHJcbmltcG9ydCBMaXN0IGZyb20gJ2FyZ29zL0xpc3QnO1xyXG5pbXBvcnQgX0xlZ2FjeVNEYXRhTGlzdE1peGluIGZyb20gJ2FyZ29zL19MZWdhY3lTRGF0YUxpc3RNaXhpbic7XHJcbmltcG9ydCBfU3BlZWRTZWFyY2hSaWdodERyYXdlckxpc3RNaXhpbiBmcm9tICcuL19TcGVlZFNlYXJjaFJpZ2h0RHJhd2VyTGlzdE1peGluJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3NwZWVkU2VhcmNoTGlzdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuU3BlZWRTZWFyY2hMaXN0XHJcbiAqXHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkxpc3RcclxuICogQG1peGlucyBjcm0uVmlld3MuX1NwZWVkU2VhcmNoUmlnaHREcmF3ZXJMaXN0TWl4aW5cclxuICpcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuU3BlZWRTZWFyY2hMaXN0JywgW0xpc3QsIF9MZWdhY3lTRGF0YUxpc3RNaXhpbiwgX1NwZWVkU2VhcmNoUmlnaHREcmF3ZXJMaXN0TWl4aW5dLCB7XHJcbiAgLy8gVGVtcGxhdGVzXHJcbiAgaXRlbVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxzdHJvbmc+eyU6ICQuJGhlYWRpbmcgJX08L3N0cm9uZz48L3A+JyxcclxuICAgICd7JSEgJCQuZmllbGRUZW1wbGF0ZSAlfScsXHJcbiAgXSksXHJcblxyXG4gIGZpZWxkVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPHVsIGNsYXNzPVwic3BlZWRzZWFyY2gtZmllbGRzXCI+JyxcclxuICAgICd7JSBmb3IodmFyIGkgPSAwOyBpIDwgJC5maWVsZHMubGVuZ3RoOyBpKyspIHsgJX0nLFxyXG4gICAgJzxsaT48cCBjbGFzcz1cIm1pY3JvLXRleHRcIj48c3Bhbj57JT0gJC5maWVsZHNbaV0uZmllbGROYW1lICV9PC9zcGFuPiB7JT0gJC5maWVsZHNbaV0uZmllbGRWYWx1ZSAlfTwvcD48L2xpPicsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgICAnPC91bD4nLFxyXG4gIF0pLFxyXG5cclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdzcGVlZHNlYXJjaF9saXN0JyxcclxuICBlbmFibGVTZWFyY2g6IHRydWUsXHJcbiAgZW5hYmxlQWN0aW9uczogdHJ1ZSxcclxuICBzZWFyY2hXaWRnZXRDbGFzczogU3BlZWRTZWFyY2hXaWRnZXQsXHJcbiAgZXhwb3NlOiBmYWxzZSxcclxuICBhY3RpdmVJbmRleGVzOiBbJ0FjY291bnQnLCAnQ29udGFjdCcsICdMZWFkJywgJ0FjdGl2aXR5JywgJ0hpc3RvcnknLCAnT3Bwb3J0dW5pdHknLCAnVGlja2V0J10sXHJcbiAgaW5kZXhlczogW3tcclxuICAgIGluZGV4TmFtZTogJ0FjY291bnQnLFxyXG4gICAgaW5kZXhUeXBlOiAxLFxyXG4gICAgaXNTZWN1cmU6IHRydWUsXHJcbiAgfSwge1xyXG4gICAgaW5kZXhOYW1lOiAnQWN0aXZpdHknLFxyXG4gICAgaW5kZXhUeXBlOiAxLFxyXG4gICAgaXNTZWN1cmU6IGZhbHNlLFxyXG4gIH0sIHtcclxuICAgIGluZGV4TmFtZTogJ0NvbnRhY3QnLFxyXG4gICAgaW5kZXhUeXBlOiAxLFxyXG4gICAgaXNTZWN1cmU6IHRydWUsXHJcbiAgfSwge1xyXG4gICAgaW5kZXhOYW1lOiAnSGlzdG9yeScsXHJcbiAgICBpbmRleFR5cGU6IDEsXHJcbiAgICBpc1NlY3VyZTogZmFsc2UsXHJcbiAgfSwge1xyXG4gICAgaW5kZXhOYW1lOiAnTGVhZCcsXHJcbiAgICBpbmRleFR5cGU6IDEsXHJcbiAgICBpc1NlY3VyZTogdHJ1ZSxcclxuICB9LCB7XHJcbiAgICBpbmRleE5hbWU6ICdPcHBvcnR1bml0eScsXHJcbiAgICBpbmRleFR5cGU6IDEsXHJcbiAgICBpc1NlY3VyZTogdHJ1ZSxcclxuICB9LCB7XHJcbiAgICBpbmRleE5hbWU6ICdUaWNrZXQnLFxyXG4gICAgaW5kZXhUeXBlOiAxLFxyXG4gICAgaXNTZWN1cmU6IGZhbHNlLFxyXG4gIH1dLFxyXG4gIHR5cGVzOiBbJ0FjY291bnQnLCAnQWN0aXZpdHknLCAnQ29udGFjdCcsICdIaXN0b3J5JywgJ0xlYWQnLCAnT3Bwb3J0dW5pdHknLCAnVGlja2V0J10sXHJcbiAgaW5kZXhlc1RleHQ6IHtcclxuICAgIEFjY291bnQ6IHJlc291cmNlLmFjY291bnRUZXh0LFxyXG4gICAgQWN0aXZpdHk6IHJlc291cmNlLmFjdGl2aXR5VGV4dCxcclxuICAgIENvbnRhY3Q6IHJlc291cmNlLmNvbnRhY3RUZXh0LFxyXG4gICAgSGlzdG9yeTogcmVzb3VyY2UuaGlzdG9yeVRleHQsXHJcbiAgICBMZWFkOiByZXNvdXJjZS5sZWFkVGV4dCxcclxuICAgIE9wcG9ydHVuaXR5OiByZXNvdXJjZS5vcHBvcnR1bml0eVRleHQsXHJcbiAgICBUaWNrZXQ6IHJlc291cmNlLnRpY2tldFRleHQsXHJcbiAgfSxcclxuICBpdGVtSWNvbkJ5VHlwZToge1xyXG4gICAgQ29udGFjdDogJ3VzZXInLFxyXG4gICAgQWNjb3VudDogJ3NwcmVhZHNoZWV0JyxcclxuICAgIE9wcG9ydHVuaXR5OiAnZmluYW5jZScsXHJcbiAgICBUaWNrZXQ6ICdleHBlbnNlLXJlcG9ydCcsXHJcbiAgICBMZWFkOiAnYWdlbnQnLFxyXG4gICAgQWN0aXZpdHk6ICdjYWxlbmRhcicsXHJcbiAgICBIaXN0b3J5OiAnc2VhcmNoLXJlc3VsdHMtaGlzdG9yeScsXHJcbiAgfSxcclxuICBjdXJyZW50UGFnZTogbnVsbCxcclxuXHJcbiAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoY2xlYXIsIGFyZ3VtZW50cyk7XHJcbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gMDtcclxuICB9LFxyXG4gIF9mb3JtYXRGaWVsZE5hbWU6IGZ1bmN0aW9uIF9mb3JtYXRGaWVsZE5hbWUoKSB7fSxcclxuICBnZXRJdGVtSWNvbkNsYXNzOiBmdW5jdGlvbiBnZXRJdGVtSWNvbkNsYXNzKGVudHJ5KSB7XHJcbiAgICBjb25zdCB0eXBlID0gZW50cnkgJiYgZW50cnkudHlwZTtcclxuICAgIGNvbnN0IHR5cGVDbHMgPSB0aGlzLml0ZW1JY29uQnlUeXBlW3R5cGVdO1xyXG4gICAgbGV0IGNscyA9IHRoaXMuaXRlbUljb25DbGFzcztcclxuICAgIGlmICh0eXBlQ2xzKSB7XHJcbiAgICAgIGNscyA9IHR5cGVDbHM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNscztcclxuICB9LFxyXG4gIGV4dHJhY3RUeXBlRnJvbUl0ZW06IGZ1bmN0aW9uIGV4dHJhY3RUeXBlRnJvbUl0ZW0oaXRlbSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnR5cGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChpdGVtLnNvdXJjZS5pbmRleE9mKHRoaXMudHlwZXNbaV0pICE9PSAtMSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnR5cGVzW2ldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfSxcclxuICBleHRyYWN0RGVzY3JpcHRvckZyb21JdGVtOiBmdW5jdGlvbiBleHRyYWN0RGVzY3JpcHRvckZyb21JdGVtKGl0ZW0pIHtcclxuICAgIGxldCBkZXNjcmlwdG9yID0gaXRlbSAmJiBpdGVtLnVpRGlzcGxheU5hbWU7XHJcbiAgICBsZXQgcmVzdDtcclxuXHJcbiAgICBpZiAoZGVzY3JpcHRvcikge1xyXG4gICAgICBkZXNjcmlwdG9yID0gZGVzY3JpcHRvci5zcGxpdCgnOicpO1xyXG4gICAgICByZXN0ID0gZGVzY3JpcHRvclsxXTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdDtcclxuICB9LFxyXG4gIGV4dHJhY3RLZXlGcm9tSXRlbTogZnVuY3Rpb24gZXh0cmFjdEtleUZyb21JdGVtKGl0ZW0pIHtcclxuICAgIC8vIEV4dHJhY3QgdGhlIGVudGl0eUlkIGZyb20gdGhlIGRpc3BsYXkgbmFtZSwgd2hpY2ggaXMgdGhlIGxhc3QgMTIgY2hhcmFjdGVyc1xyXG4gICAgY29uc3QgZGlzcGxheU5hbWUgPSBpdGVtLmRpc3BsYXlOYW1lO1xyXG4gICAgaWYgKCFkaXNwbGF5TmFtZSkge1xyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbGVuID0gZGlzcGxheU5hbWUubGVuZ3RoO1xyXG4gICAgcmV0dXJuIGRpc3BsYXlOYW1lLnN1YnN0cmluZyhsZW4gLSAxMik7XHJcbiAgfSxcclxuICBtb3JlOiBmdW5jdGlvbiBtb3JlKCkge1xyXG4gICAgdGhpcy5jdXJyZW50UGFnZSArPSAxO1xyXG4gICAgdGhpcy5pbmhlcml0ZWQobW9yZSwgYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIGhhc01vcmVEYXRhOiBmdW5jdGlvbiBoYXNNb3JlRGF0YSgpIHtcclxuICAgIGNvbnN0IHRvdGFsID0gdGhpcy5mZWVkLnRvdGFsQ291bnQ7XHJcbiAgICBjb25zdCBjb3VudCA9ICh0aGlzLmN1cnJlbnRQYWdlICsgMSkgKiB0aGlzLnBhZ2VTaXplO1xyXG4gICAgcmV0dXJuIGNvdW50IDwgdG90YWw7XHJcbiAgfSxcclxuICBwcm9jZXNzRmVlZDogZnVuY3Rpb24gcHJvY2Vzc0ZlZWQoX2ZlZWQpIHtcclxuICAgIGxldCBmZWVkID0gX2ZlZWQ7XHJcbiAgICBpZiAoIXRoaXMuZmVlZCkge1xyXG4gICAgICB0aGlzLnNldCgnbGlzdENvbnRlbnQnLCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZmlsdGVyKGZpZWxkKSB7XHJcbiAgICAgIHJldHVybiBmaWVsZC5maWVsZE5hbWUgIT09ICdzZWNjb2RlbGlzdCcgJiYgZmllbGQuZmllbGROYW1lICE9PSAnZmlsZW5hbWUnO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZmVlZCA9IGZlZWQgPSBmZWVkLnJlc3BvbnNlO1xyXG5cclxuICAgIGlmIChmZWVkLnRvdGFsQ291bnQgPT09IDApIHtcclxuICAgICAgdGhpcy5zZXQoJ2xpc3RDb250ZW50JywgdGhpcy5ub0RhdGFUZW1wbGF0ZS5hcHBseSh0aGlzKSk7XHJcbiAgICB9IGVsc2UgaWYgKGZlZWQuaXRlbXMpIHtcclxuICAgICAgY29uc3QgZG9jZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmVlZC5pdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGVudHJ5ID0gZmVlZC5pdGVtc1tpXTtcclxuICAgICAgICBlbnRyeS50eXBlID0gdGhpcy5leHRyYWN0VHlwZUZyb21JdGVtKGVudHJ5KTtcclxuICAgICAgICBlbnRyeS4kZGVzY3JpcHRvciA9IGVudHJ5LiRkZXNjcmlwdG9yIHx8IGVudHJ5LnVpRGlzcGxheU5hbWU7XHJcbiAgICAgICAgZW50cnkuJGtleSA9IHRoaXMuZXh0cmFjdEtleUZyb21JdGVtKGVudHJ5KTtcclxuICAgICAgICBlbnRyeS4kaGVhZGluZyA9IHRoaXMuZXh0cmFjdERlc2NyaXB0b3JGcm9tSXRlbShlbnRyeSk7XHJcbiAgICAgICAgZW50cnkuc3lub3BzaXMgPSB3aW5kb3cudW5lc2NhcGUoZW50cnkuc3lub3BzaXMpO1xyXG4gICAgICAgIGVudHJ5LmZpZWxkcyA9IGVudHJ5LmZpZWxkcy5maWx0ZXIoZmlsdGVyKTtcclxuXHJcbiAgICAgICAgdGhpcy5lbnRyaWVzW2VudHJ5LiRrZXldID0gZW50cnk7XHJcbiAgICAgICAgY29uc3Qgcm93Tm9kZSA9ICQodGhpcy5yb3dUZW1wbGF0ZS5hcHBseShlbnRyeSwgdGhpcykpO1xyXG4gICAgICAgIGRvY2ZyYWcuYXBwZW5kQ2hpbGQocm93Tm9kZS5nZXQoMCkpO1xyXG4gICAgICAgIHRoaXMub25BcHBseVJvd1RlbXBsYXRlKGVudHJ5LCByb3dOb2RlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGRvY2ZyYWcuY2hpbGROb2Rlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgJCh0aGlzLmNvbnRlbnROb2RlKS5hcHBlbmQoZG9jZnJhZyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIGZlZWQudG90YWxDb3VudCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgY29uc3QgcmVtYWluaW5nID0gdGhpcy5mZWVkLnRvdGFsQ291bnQgLSAoKHRoaXMuY3VycmVudFBhZ2UgKyAxKSAqIHRoaXMucGFnZVNpemUpO1xyXG4gICAgICB0aGlzLnNldCgncmVtYWluaW5nQ29udGVudCcsIHN0cmluZy5zdWJzdGl0dXRlKHRoaXMucmVtYWluaW5nVGV4dCwgW3JlbWFpbmluZ10pKTtcclxuICAgIH1cclxuXHJcbiAgICAkKHRoaXMuZG9tTm9kZSkudG9nZ2xlQ2xhc3MoJ2xpc3QtaGFzLW1vcmUnLCB0aGlzLmhhc01vcmVEYXRhKCkpO1xyXG4gIH0sXHJcbiAgY3JlYXRlUmVxdWVzdDogZnVuY3Rpb24gY3JlYXRlUmVxdWVzdCgpIHtcclxuICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgU2FnZS5TRGF0YS5DbGllbnQuU0RhdGFTZXJ2aWNlT3BlcmF0aW9uUmVxdWVzdCh0aGlzLmdldFNlcnZpY2UoKSlcclxuICAgICAgLnNldENvbnRyYWN0TmFtZSgnc3lzdGVtJylcclxuICAgICAgLnNldE9wZXJhdGlvbk5hbWUoJ2V4ZWN1dGVTZWFyY2gnKTtcclxuICAgIHJldHVybiByZXF1ZXN0O1xyXG4gIH0sXHJcbiAgY3JlYXRlU2VhcmNoRW50cnk6IGZ1bmN0aW9uIGNyZWF0ZVNlYXJjaEVudHJ5KCkge1xyXG4gICAgY29uc3QgZW50cnkgPSB7XHJcbiAgICAgIHJlcXVlc3Q6IHtcclxuICAgICAgICBkb2NUZXh0SXRlbTogLTEsXHJcbiAgICAgICAgc2VhcmNoVGV4dDogdGhpcy5xdWVyeSxcclxuICAgICAgICBzZWFyY2hUeXBlOiBBcHAuc3BlZWRTZWFyY2guc2VhcmNoVHlwZSxcclxuICAgICAgICBub2lzZUZpbGU6ICdQTUlOb2lzZS5kYXQnLFxyXG4gICAgICAgIGluY2x1ZGVTdGVtbWluZzogQXBwLnNwZWVkU2VhcmNoLmluY2x1ZGVTdGVtbWluZyxcclxuICAgICAgICBpbmNsdWRlVGhlc2F1cnVzOiBBcHAuc3BlZWRTZWFyY2guaW5jbHVkZVRoZXNhdXJ1cyxcclxuICAgICAgICBpbmNsdWRlUGhvbmljOiBBcHAuc3BlZWRTZWFyY2guaW5jbHVkZVBob25pYyxcclxuICAgICAgICB1c2VGcmVxdWVudEZpbHRlcjogQXBwLnNwZWVkU2VhcmNoLnVzZUZyZXF1ZW50RmlsdGVyLFxyXG4gICAgICAgIGluZGV4ZXM6IHRoaXMuZ2V0QWN0aXZlSW5kZXhlcygpLFxyXG4gICAgICAgIHdoaWNoUGFnZTogdGhpcy5jdXJyZW50UGFnZSxcclxuICAgICAgICBpdGVtc1BlclBhZ2U6IHRoaXMucGFnZVNpemUsXHJcbiAgICAgICAgZmlsdGVyczogbnVsbCxcclxuICAgICAgfSxcclxuICAgICAgcmVzcG9uc2U6IG51bGwsXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBlbnRyeTtcclxuICB9LFxyXG4gIGdldEFjdGl2ZUluZGV4ZXM6IGZ1bmN0aW9uIGdldEFjdGl2ZUluZGV4ZXMoKSB7XHJcbiAgICBjb25zdCByZXN1bHRzID0gW107XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIHRoaXMuYWN0aXZlSW5kZXhlcy5mb3JFYWNoKChpbmRleE5hbWUpID0+IHtcclxuICAgICAgc2VsZi5pbmRleGVzLmZvckVhY2goKGluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYgKGluZGV4LmluZGV4TmFtZSA9PT0gaW5kZXhOYW1lKSB7XHJcbiAgICAgICAgICByZXN1bHRzLnB1c2goaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0cztcclxuICB9LFxyXG4gIHJlcXVlc3REYXRhOiBmdW5jdGlvbiByZXF1ZXN0RGF0YSgpIHtcclxuICAgICQodGhpcy5kb21Ob2RlKS5hZGRDbGFzcygnbGlzdC1sb2FkaW5nJyk7XHJcblxyXG4gICAgY29uc3QgcmVxdWVzdCA9IHRoaXMuY3JlYXRlUmVxdWVzdCgpO1xyXG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmNyZWF0ZVNlYXJjaEVudHJ5KCk7XHJcblxyXG4gICAgcmVxdWVzdC5leGVjdXRlKGVudHJ5LCB7XHJcbiAgICAgIHN1Y2Nlc3M6IGxhbmcuaGl0Y2godGhpcywgdGhpcy5vblJlcXVlc3REYXRhU3VjY2VzcyksXHJcbiAgICAgIGZhaWx0dXJlOiBsYW5nLmhpdGNoKHRoaXMsIHRoaXMub25SZXF1ZXN0RGF0YUZhaWx1cmUpLFxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBuYXZpZ2F0ZVRvRGV0YWlsVmlldzogZnVuY3Rpb24gbmF2aWdhdGVUb0RldGFpbFZpZXcoa2V5LCB0eXBlKSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcoYCR7dHlwZS50b0xvd2VyQ2FzZSgpfV9kZXRhaWxgKTtcclxuXHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICB2aWV3LnNob3coe1xyXG4gICAgICAgIGtleSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBjcmVhdGVUb29sTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVUb29sTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudG9vbHMgfHwgKHRoaXMudG9vbHMgPSB7XHJcbiAgICAgIHRiYXI6IFtdLFxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBnZXRJdGVtSWNvbkFsdDogZnVuY3Rpb24gZ2V0SXRlbUljb25BbHQoZW50cnkpIHtcclxuICAgIHJldHVybiBlbnRyeS50eXBlO1xyXG4gIH0sXHJcbiAgZ2V0SXRlbURlc2NyaXB0b3I6IGZ1bmN0aW9uIGdldEl0ZW1EZXNjcmlwdG9yKGVudHJ5KSB7XHJcbiAgICByZXR1cm4gZW50cnkudHlwZTtcclxuICB9LFxyXG4gIGNyZWF0ZUluZGljYXRvckxheW91dDogZnVuY3Rpb24gY3JlYXRlSW5kaWNhdG9yTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaXRlbUluZGljYXRvcnMgfHwgKHRoaXMuaXRlbUluZGljYXRvcnMgPSBbe1xyXG4gICAgICBpZDogJ3NwZWFkU2VhcmNoSWNvbicsXHJcbiAgICAgIGljb246ICcnLFxyXG4gICAgICBsb2NhdGlvbjogJ3RvcCcsXHJcbiAgICAgIG9uQXBwbHk6IGZ1bmN0aW9uIG9uQXBwbHkoZW50cnksIHBhcmVudCkge1xyXG4gICAgICAgIHBhcmVudC5hcHBseUFjdGl2aXR5SW5kaWNhdG9yKGVudHJ5LCB0aGlzKTtcclxuICAgICAgfSxcclxuICAgIH1dKTtcclxuICB9LFxyXG4gIGFwcGx5QWN0aXZpdHlJbmRpY2F0b3I6IGZ1bmN0aW9uIGFwcGx5QWN0aXZpdHlJbmRpY2F0b3IoZW50cnksIGluZGljYXRvcikge1xyXG4gICAgaW5kaWNhdG9yLmlzRW5hYmxlZCA9IHRydWU7XHJcbiAgICBpbmRpY2F0b3Iuc2hvd0ljb24gPSBmYWxzZTtcclxuICAgIGluZGljYXRvci5sYWJlbCA9IHRoaXMuaW5kZXhlc1RleHRbZW50cnkudHlwZV07XHJcbiAgICBpbmRpY2F0b3IudmFsdWVUZXh0ID0gdGhpcy5pbmRleGVzVGV4dFtlbnRyeS50eXBlXTtcclxuICB9LFxyXG4gIF9pbnRTZWFyY2hFeHByZXNzaW9uTm9kZTogZnVuY3Rpb24gX2ludFNlYXJjaEV4cHJlc3Npb25Ob2RlKCkge1xyXG4gICAgY29uc3QgbGlzdE5vZGUgPSAkKGAjJHt0aGlzLmlkfWApO1xyXG4gICAgaWYgKGxpc3ROb2RlWzBdKSB7XHJcbiAgICAgIGNvbnN0IGh0bWwgPSB0aGlzLnNlYXJjaEV4cHJlc3Npb25UZW1wbGF0ZS5hcHBseSh0aGlzKTtcclxuICAgICAgJChsaXN0Tm9kZVswXSkucHJlcGVuZChodG1sKTtcclxuICAgIH1cclxuICB9LFxyXG4gIF9pc0luZGV4QWN0aXZlOiBmdW5jdGlvbiBfaXNJbmRleEFjdGl2ZShpbmRleE5hbWUpIHtcclxuICAgIGxldCBpbmRleEZvdW5kID0gZmFsc2U7XHJcbiAgICBpZiAodGhpcy5hY3RpdmVJbmRleGVzLmluZGV4T2YoaW5kZXhOYW1lKSA+IC0xKSB7XHJcbiAgICAgIGluZGV4Rm91bmQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGluZGV4Rm91bmQ7XHJcbiAgfSxcclxuICBzZWxlY3RJbmRleDogZnVuY3Rpb24gc2VsZWN0SW5kZXgoZSkge1xyXG4gICAgY29uc3QgYnV0dG9uID0gZS4kc291cmNlO1xyXG4gICAgY29uc3QgaW5kZXhOYW1lID0gJChidXR0b24pLmF0dHIoJ2RhdGEtaW5kZXgnKTtcclxuICAgIGNvbnN0IGFjdGl2YXRlZCA9IHRoaXMuYWN0aXZhdGVJbmRleChpbmRleE5hbWUpO1xyXG4gICAgaWYgKGFjdGl2YXRlZCkge1xyXG4gICAgICAkKGJ1dHRvbikuYWRkQ2xhc3MoJ2NhcmQtbGF5b3V0LXNwZWVkLXNlYXJjaC1pbmRleC1zZWxlY3RlZCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJChidXR0b24pLnJlbW92ZUNsYXNzKCdjYXJkLWxheW91dC1zcGVlZC1zZWFyY2gtaW5kZXgtc2VsZWN0ZWQnKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGFjdGl2YXRlSW5kZXg6IGZ1bmN0aW9uIGFjdGl2YXRlSW5kZXgoaW5kZXhOYW1lKSB7XHJcbiAgICBjb25zdCB0ZW1wQWN0aXZlSW5kZXggPSBbXTtcclxuICAgIGxldCBpbmRleEZvdW5kID0gZmFsc2U7XHJcbiAgICBsZXQgYWN0aXZhdGVkID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKHRoaXMuYWN0aXZlSW5kZXhlcy5pbmRleE9mKGluZGV4TmFtZSkgPiAtMSkge1xyXG4gICAgICBpbmRleEZvdW5kID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChpbmRleEZvdW5kKSB7XHJcbiAgICAgIHRoaXMuYWN0aXZlSW5kZXhlcy5mb3JFYWNoKChhSW5kZXhOYW1lKSA9PiB7XHJcbiAgICAgICAgaWYgKGFJbmRleE5hbWUgIT09IGluZGV4TmFtZSkge1xyXG4gICAgICAgICAgdGVtcEFjdGl2ZUluZGV4LnB1c2goYUluZGV4TmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5hY3RpdmVJbmRleGVzID0gdGVtcEFjdGl2ZUluZGV4O1xyXG4gICAgICBhY3RpdmF0ZWQgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYWN0aXZlSW5kZXhlcy5wdXNoKGluZGV4TmFtZSk7XHJcbiAgICAgIGFjdGl2YXRlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGFjdGl2YXRlZDtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==