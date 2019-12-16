define('crm/Views/PickList', ['module', 'exports', 'dojo/_base/declare', 'argos/List'], function (module, exports, _declare, _List) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _List2 = _interopRequireDefault(_List);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @class crm.Views.PickList
   *
   *
   * @extends argos.List
   *
   */
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

  var __class = (0, _declare2.default)('crm.Views.PickList', [_List2.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.text %}</p>']),

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

    _onQueryComplete: function _onQueryComplete(queryResults, entries) {
      var _this = this;

      // eslint-disable-line
      if (this.options && this.options.picklistOptions && this.options.picklistOptions.filterByLanguage && this.query) {
        entries = entries.filter(function (entry) {
          return entry.languageCode === _this.getLanguageCode() || typeof entry.languageCode === 'undefined' || entry.languageCode === null;
        });
        queryResults.total = entries.length;
      }
      this.inherited(_onQueryComplete, arguments);
    },
    activateEntry: function activateEntry(params) {
      if (this.options.keyProperty === 'text' && !this.options.singleSelect) {
        params.key = params.descriptor;
      }

      this.inherited(activateEntry, arguments);
    },
    getLanguageCode: function getLanguageCode() {
      return this.languageCode || this.options && this.options.languageCode || App.getCurrentLocale();
    },
    getPicklistOptions: function getPicklistOptions() {
      return this.options && this.options.picklistOptions || this.picklistOptions || {};
    },
    getRemainingCount: function getRemainingCount() {
      // Picklists fetch all items on the first request (not based on pageSize)
      return -this.pageSize;
    },
    onTransitionAway: function onTransitionAway() {
      this.inherited(onTransitionAway, arguments);
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

      this.inherited(show, arguments);
    },
    requestData: function requestData() {
      var _this2 = this;

      var picklistOptions = this.getPicklistOptions();
      picklistOptions.language = picklistOptions.language || this.getLanguageCode();
      this.languageCode = picklistOptions.language && picklistOptions.language.trim() || this.languageCode;

      // Search, query like normal (with filtering from queryComplete)
      if (this.query) {
        return this.inherited(requestData, arguments);
      }

      return this.app.picklistService.requestPicklist(this.picklistName, picklistOptions).then(function (result) {
        return _this2._onQueryComplete({ total: result && result.items.length }, result && result.items);
      }, function (err) {
        return _this2._onQueryError(null, err);
      });
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'upper(text) like "' + q + '%"';
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});