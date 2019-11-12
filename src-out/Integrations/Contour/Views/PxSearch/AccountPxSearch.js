define('crm/Integrations/Contour/Views/PxSearch/AccountPxSearch', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'Mobile/SalesLogix/Action', 'Sage/Platform/Mobile/SearchWidget', 'argos/Utility', 'argos/List', '../../../../Format', 'argos/_LegacySDataListMixin', 'argos/I18n', 'argos/ErrorManager'], function (module, exports, _declare, _lang, _string, _Action, _SearchWidget, _Utility, _List, _Format, _LegacySDataListMixin, _I18n, _ErrorManager) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _string2 = _interopRequireDefault(_string);

  var _Action2 = _interopRequireDefault(_Action);

  var _SearchWidget2 = _interopRequireDefault(_SearchWidget);

  var _Utility2 = _interopRequireDefault(_Utility);

  var _List2 = _interopRequireDefault(_List);

  var _Format2 = _interopRequireDefault(_Format);

  var _LegacySDataListMixin2 = _interopRequireDefault(_LegacySDataListMixin);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _ErrorManager2 = _interopRequireDefault(_ErrorManager);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('acctPxSearch'); /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.Integrations.Contour.Views.PxSearch.AccountPxSearch', [_List2.default, _LegacySDataListMixin2.default], {
    // Localization strings
    accountsNearMeText: resource.accountsNearMeText,
    addActivityActionText: resource.addActivityActionText,
    addAttachmentActionText: resource.addAttachmentActionText,
    addNoteActionText: resource.addNoteActionText,
    callMainActionText: resource.callMainActionText,
    currentLocationErrorText: resource.currentLocationErrorText,
    editActionText: resource.editActionText,
    faxAbbreviationText: resource.faxAbbreviationText,
    kilometerAbbrevText: resource.kilometerAbbrevText,
    mileAbbrevText: resource.mileAbbrevText,
    phoneAbbreviationText: resource.phoneAbbreviationText,
    titleText: resource.titleText,
    viewContactsActionText: resource.viewContactsActionText,
    accountTypeText: resource.accountTypeText,

    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.AccountName %}</p>', '<p class="micro-text">{%: this.formatDecimal($.Distance) %} {%: this.distanceText() %}</p>', '<p class="micro-text">', '{%: $$.joinFields(" | ", [$.Type, $.SubType]) %}', '</p>', '<p class="micro-text">{%: $.AccountManager && $.AccountManager.UserInfo ? $.AccountManager.UserInfo.UserName : "" %} | {%: $.Owner.OwnerDescription %}</p>', '{% if ($.MainPhone) { %}', '<p class="micro-text">', '{%: $$.phoneAbbreviationText %} <span class="hyperlink" data-action="callMain" data-key="{%: $.$key %}">{%: argos.Format.phone($.MainPhone) %}</span>', // TODO: Avoid global
    '</p>', '{% } %}']),
    itemRowContentTemplate: new Simplate(['<div id="top_item_indicators" class="list-item-indicator-content"></div>', '<div class="list-item-content">{%! $$.itemTemplate %}</div>']),

    formatDecimal: function formatDecimal(n) {
      return _Format2.default.fixedLocale(n, 2);
    },
    distanceText: function distanceText() {
      return App.isCurrentRegionMetric() ? this.kilometerAbbrevText : this.mileAbbrevText;
    },
    distanceCalc: function distanceCalc(gLat, gLon) {
      var conv = App.isCurrentRegionMetric() ? 1.609344 : 1;
      return conv * Math.sqrt(Math.pow(69.1 * (gLat - this.lat), 2) + Math.pow(53.0 * (gLon - this.lon), 2));
    },

    joinFields: function joinFields(sep, fields) {
      return _Utility2.default.joinFields(sep, fields);
    },

    // Add a search template for account type dropdown
    searchWidget: new _SearchWidget2.default({
      class: 'list-search',
      widgetTemplate: new Simplate(['<div class="search-widget" style="display: none;">', // hide the stock search stuff
      '<div class="table-layout">', '<div><input type="text" name="query" class="query" autocorrect="off" autocapitalize="off" data-dojo-attach-point="queryNode" data-dojo-attach-event="onfocus:_onFocus,onblur:_onBlur,onkeypress:_onKeyPress" /></div>', '<div class="hasButton"><button class="clear-button" data-dojo-attach-event="onclick: _onClearClick"></button></div>', '<div class="hasButton"><button class="subHeaderButton searchButton" data-dojo-attach-event="click: search">{%= $.searchText %}</button></div>', '</div>', '<label data-dojo-attach-point="labelNode">{%= $.searchText %}</label>', '</div>', '<div>$$.accountTypeText<select id="queryType" style="font-size: 16px"></select></div>'])
    }),

    // View Properties
    detailView: 'account_detail',
    itemIconClass: 'spreadsheet', // todo: replace with appropriate icon
    id: 'pxSearch_Accounts',
    security: 'Contour/Map/Account',
    entityName: 'Account',
    allowSelection: true,
    enableActions: true,
    pageSize: 100,
    offlineIds: null,
    resourceKind: 'accounts',
    enableSearch: true,
    editView: 'account_edit',
    editSecurity: 'Entities/Account/Edit',
    relatedViews: {},
    maxDistance: 500,

    lat: null, // latitude
    lon: null, // longitude

    createRequest: function createRequest() {
      var request = new Sage.SData.Client.SDataBaseRequest(this.getService());
      var pageSize = this.pageSize;
      var startIndex = this.feed && this.feed.$startIndex > 0 && this.feed.$itemsPerPage > 0 ? this.feed.$startIndex + this.feed.$itemsPerPage : 1;
      request.uri.setPathSegment(0, 'slx');
      request.uri.setPathSegment(1, 'dynamic');
      request.uri.setPathSegment(2, '-');
      request.uri.setPathSegment(3, 'accounts');
      request.uri.setQueryArg('format', 'JSON');
      request.uri.setQueryArg('select', 'AccountName,Industry,Type,SubType,AccountManager/UserInfo/UserName,Address/GeocodeLatitude,Address/GeocodeLongitude,Owner/OwnerDescription,WebAddress,MainPhone,Fax');
      request.uri.setQueryArg('where', 'Type eq "' + (this.acctType ? this.acctType : 'Customer') + '" and ' + this._requestDistanceCalc());
      request.uri.setStartIndex(startIndex);
      request.uri.setCount(pageSize);
      return request;
    },
    _requestDistanceCalc: function _requestDistanceCalc() {
      var conv = App.isCurrentRegionMetric() ? 1.609344 : 1;
      return '((' + conv + ' mul sqrt((((69.1 mul (Address.GeocodeLatitude-(' + this.lat + ')))) mul (69.1 mul (Address.GeocodeLatitude-(' + this.lat + '))))+((53 mul (Address.GeocodeLongitude-(' + this.lon + '))) mul (53 mul (Address.GeocodeLongitude-(' + this.lon + ')))))) lt ' + this.maxDistance + ')';
    },

    requestData: function requestData() {
      this.loadAccountTypes();
      $(this.domNode).addClass('list-loading');

      if (this.lat && this.lon) {
        var request = this.createRequest();
        request.service.readFeed(request, {
          success: this.onRequestDataSuccess,
          failure: this.onRequestDataFailure,
          aborted: this.onRequestDataAborted,
          scope: this
        });
      } else {
        navigator.geolocation.getCurrentPosition(_lang2.default.hitch(this, 'geoLocationReceived'), _lang2.default.hitch(this, 'geoLocationError'), {
          enableHighAccuracy: true
        });
      }
    },
    // custom request data success method to insert our "me" at the front
    onRequestDataSuccess: function onRequestDataSuccess(feed) {
      var feedResources = feed.$resources;
      if (feedResources) {
        for (var i = 0; i < feed.$resources.length; i++) {
          var entry = feed.$resources[i];
          entry.Distance = this.distanceCalc(entry.Address.GeocodeLatitude, entry.Address.GeocodeLongitude);
        }

        // Sort by distance ASC
        feed.$resources.sort(function (a, b) {
          return a.Distance > b.Distance ? 1 : -1;
        });
      }
      this.processFeed(feed);
      $(this.domNode).removeClass('list-loading');
    },
    processFeed: function processFeed(_feed) {
      var feed = _feed;
      if (!this.feed) {
        this.set('listContent', '');
      }

      this.feed = feed;

      if (this.feed.$totalResults === 0) {
        this.set('listContent', this.noDataTemplate.apply(this));
      } else if (feed.$resources) {
        var docfrag = document.createDocumentFragment();
        for (var i = 0; i < feed.$resources.length; i++) {
          var entry = feed.$resources[i];
          entry.$descriptor = entry.$descriptor || feed.$descriptor;
          this.entries[entry.$key] = entry;
          var rowNode = $(this.rowTemplate.apply(entry, this)).get(0);
          docfrag.appendChild(rowNode);
          this.onApplyRowTemplate(entry, rowNode);
          if (this.relatedViews.length > 0) {
            this.onProcessRelatedViews(entry, rowNode, feed);
          }
        }

        if (docfrag.childNodes.length > 0) {
          $(this.contentNode).append(docfrag);
        }
      }

      if (typeof this.feed.$totalResults !== 'undefined') {
        var remaining = this.feed.$totalResults - (this.feed.$startIndex + this.feed.$itemsPerPage - 1);
        this.set('remainingContent', _string2.default.substitute(this.remainingText, [remaining]));
      }

      $(this.domNode).toggleClass('list-has-more', this.hasMoreData());

      if (this.options.allowEmptySelection) {
        $(this.domNode).addClass('list-has-empty-opt');
      }

      this._loadPreviousSelections();
    },
    geoLocationError: function geoLocationError(positionError) {
      App.toast.add({ title: this.currentLocationErrorText, message: positionError.message });
      $(this.domNode).removeClass('list-loading');
      this.set('listContent', '');
      _ErrorManager2.default.addSimpleError('Geolocation error.', positionError.message);
    },
    geoLocationReceived: function geoLocationReceived(position) {
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;
      this.requestData();
    },
    options: {},
    // always refresh
    refreshRequiredFor: function refreshRequiredFor(options) {
      if (!options) {
        // if no options were passed in, then we are searching from an account
        this.lat = null;
        this.lon = null;
        this.options.title = this.accountsNearMeText;
      }
      return true;
    },
    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {
        tbar: []
      });
    },
    init: function init() {
      this.startup();
      this.initConnects();
      this.titleEl = document.getElementById('pageTitle');
      this.inherited(arguments);
    },
    loadAccountTypes: function loadAccountTypes() {
      this.queryTypeEl = document.getElementById('queryType');
      this.queryTypeEl.onchange = _lang2.default.hitch(this, 'onAccountTypeChange'); // this.;
      var request = new Sage.SData.Client.SDataResourceCollectionRequest(App.getService()).setResourceKind('picklists').setContractName('system');
      var uri = request.getUri();
      uri.setPathSegment(Sage.SData.Client.SDataUri.ResourcePropertyIndex, 'items');
      uri.setCollectionPredicate('name eq "Account Type"');
      request.allowCacheUse = true;
      request.read({
        success: this.onAccountTypeLoad,
        failure: function failure() {
          console.error('failed to load account type'); // eslint-disable-line
        },

        scope: this
      });
    },
    onAccountTypeChange: function onAccountTypeChange() {
      this.acctType = this.queryTypeEl.value;
      this.clear();
      this.requestData();
    },
    onAccountTypeLoad: function onAccountTypeLoad(data) {
      if (this.queryTypeEl.options && this.queryTypeEl.options.length > 0) {
        return;
      }

      for (var i = 0; i < data.$resources.length; i++) {
        this.queryTypeEl.options[i] = new Option(data.$resources[i].text, data.$resources[i].text, true, false);
        if (this.queryTypeEl.options[i].value === 'Customer') {
          this.queryTypeEl.options[i].selected = 'True';
        }
      }
    },
    formatSearchQuery: function formatSearchQuery(qry) {
      return 'AccountName like "' + this.escapeSearchQuery(qry) + '%"';
    },
    createActionLayout: function createActionLayout() {
      return this.actions || (this.actions = [{
        id: 'callMain',
        cls: 'phone',
        label: this.callMainActionText,
        enabled: _Action2.default.hasProperty.bindDelegate(this, 'MainPhone'),
        fn: _Action2.default.callPhone.bindDelegate(this, 'MainPhone')
      }, {
        id: 'addNote',
        cls: 'edit',
        label: this.addNoteActionText,
        fn: _Action2.default.addNote.bindDelegate(this)
      }, {
        id: 'addActivity',
        cls: 'calendar',
        label: this.addActivityActionText,
        fn: _Action2.default.addActivity.bindDelegate(this)
      }, {
        id: 'addAttachment',
        cls: 'attach',
        label: this.addAttachmentActionText,
        fn: _Action2.default.addAttachment.bindDelegate(this)
      }]);
    },
    callMain: function callMain(params) {
      this.invokeActionItemBy(function (a) {
        return a.id === 'callMain';
      }, params.key);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQ29udG91ci9WaWV3cy9QeFNlYXJjaC9BY2NvdW50UHhTZWFyY2guanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiYWNjb3VudHNOZWFyTWVUZXh0IiwiYWRkQWN0aXZpdHlBY3Rpb25UZXh0IiwiYWRkQXR0YWNobWVudEFjdGlvblRleHQiLCJhZGROb3RlQWN0aW9uVGV4dCIsImNhbGxNYWluQWN0aW9uVGV4dCIsImN1cnJlbnRMb2NhdGlvbkVycm9yVGV4dCIsImVkaXRBY3Rpb25UZXh0IiwiZmF4QWJicmV2aWF0aW9uVGV4dCIsImtpbG9tZXRlckFiYnJldlRleHQiLCJtaWxlQWJicmV2VGV4dCIsInBob25lQWJicmV2aWF0aW9uVGV4dCIsInRpdGxlVGV4dCIsInZpZXdDb250YWN0c0FjdGlvblRleHQiLCJhY2NvdW50VHlwZVRleHQiLCJpdGVtVGVtcGxhdGUiLCJTaW1wbGF0ZSIsIml0ZW1Sb3dDb250ZW50VGVtcGxhdGUiLCJmb3JtYXREZWNpbWFsIiwibiIsImZpeGVkTG9jYWxlIiwiZGlzdGFuY2VUZXh0IiwiQXBwIiwiaXNDdXJyZW50UmVnaW9uTWV0cmljIiwiZGlzdGFuY2VDYWxjIiwiZ0xhdCIsImdMb24iLCJjb252IiwiTWF0aCIsInNxcnQiLCJwb3ciLCJsYXQiLCJsb24iLCJqb2luRmllbGRzIiwic2VwIiwiZmllbGRzIiwic2VhcmNoV2lkZ2V0IiwiY2xhc3MiLCJ3aWRnZXRUZW1wbGF0ZSIsImRldGFpbFZpZXciLCJpdGVtSWNvbkNsYXNzIiwiaWQiLCJzZWN1cml0eSIsImVudGl0eU5hbWUiLCJhbGxvd1NlbGVjdGlvbiIsImVuYWJsZUFjdGlvbnMiLCJwYWdlU2l6ZSIsIm9mZmxpbmVJZHMiLCJyZXNvdXJjZUtpbmQiLCJlbmFibGVTZWFyY2giLCJlZGl0VmlldyIsImVkaXRTZWN1cml0eSIsInJlbGF0ZWRWaWV3cyIsIm1heERpc3RhbmNlIiwiY3JlYXRlUmVxdWVzdCIsInJlcXVlc3QiLCJTYWdlIiwiU0RhdGEiLCJDbGllbnQiLCJTRGF0YUJhc2VSZXF1ZXN0IiwiZ2V0U2VydmljZSIsInN0YXJ0SW5kZXgiLCJmZWVkIiwiJHN0YXJ0SW5kZXgiLCIkaXRlbXNQZXJQYWdlIiwidXJpIiwic2V0UGF0aFNlZ21lbnQiLCJzZXRRdWVyeUFyZyIsImFjY3RUeXBlIiwiX3JlcXVlc3REaXN0YW5jZUNhbGMiLCJzZXRTdGFydEluZGV4Iiwic2V0Q291bnQiLCJyZXF1ZXN0RGF0YSIsImxvYWRBY2NvdW50VHlwZXMiLCIkIiwiZG9tTm9kZSIsImFkZENsYXNzIiwic2VydmljZSIsInJlYWRGZWVkIiwic3VjY2VzcyIsIm9uUmVxdWVzdERhdGFTdWNjZXNzIiwiZmFpbHVyZSIsIm9uUmVxdWVzdERhdGFGYWlsdXJlIiwiYWJvcnRlZCIsIm9uUmVxdWVzdERhdGFBYm9ydGVkIiwic2NvcGUiLCJuYXZpZ2F0b3IiLCJnZW9sb2NhdGlvbiIsImdldEN1cnJlbnRQb3NpdGlvbiIsImhpdGNoIiwiZW5hYmxlSGlnaEFjY3VyYWN5IiwiZmVlZFJlc291cmNlcyIsIiRyZXNvdXJjZXMiLCJpIiwibGVuZ3RoIiwiZW50cnkiLCJEaXN0YW5jZSIsIkFkZHJlc3MiLCJHZW9jb2RlTGF0aXR1ZGUiLCJHZW9jb2RlTG9uZ2l0dWRlIiwic29ydCIsImEiLCJiIiwicHJvY2Vzc0ZlZWQiLCJyZW1vdmVDbGFzcyIsIl9mZWVkIiwic2V0IiwiJHRvdGFsUmVzdWx0cyIsIm5vRGF0YVRlbXBsYXRlIiwiYXBwbHkiLCJkb2NmcmFnIiwiZG9jdW1lbnQiLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50IiwiJGRlc2NyaXB0b3IiLCJlbnRyaWVzIiwiJGtleSIsInJvd05vZGUiLCJyb3dUZW1wbGF0ZSIsImdldCIsImFwcGVuZENoaWxkIiwib25BcHBseVJvd1RlbXBsYXRlIiwib25Qcm9jZXNzUmVsYXRlZFZpZXdzIiwiY2hpbGROb2RlcyIsImNvbnRlbnROb2RlIiwiYXBwZW5kIiwicmVtYWluaW5nIiwic3Vic3RpdHV0ZSIsInJlbWFpbmluZ1RleHQiLCJ0b2dnbGVDbGFzcyIsImhhc01vcmVEYXRhIiwib3B0aW9ucyIsImFsbG93RW1wdHlTZWxlY3Rpb24iLCJfbG9hZFByZXZpb3VzU2VsZWN0aW9ucyIsImdlb0xvY2F0aW9uRXJyb3IiLCJwb3NpdGlvbkVycm9yIiwidG9hc3QiLCJhZGQiLCJ0aXRsZSIsIm1lc3NhZ2UiLCJhZGRTaW1wbGVFcnJvciIsImdlb0xvY2F0aW9uUmVjZWl2ZWQiLCJwb3NpdGlvbiIsImNvb3JkcyIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwicmVmcmVzaFJlcXVpcmVkRm9yIiwiY3JlYXRlVG9vbExheW91dCIsInRvb2xzIiwidGJhciIsImluaXQiLCJzdGFydHVwIiwiaW5pdENvbm5lY3RzIiwidGl0bGVFbCIsImdldEVsZW1lbnRCeUlkIiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwicXVlcnlUeXBlRWwiLCJvbmNoYW5nZSIsIlNEYXRhUmVzb3VyY2VDb2xsZWN0aW9uUmVxdWVzdCIsInNldFJlc291cmNlS2luZCIsInNldENvbnRyYWN0TmFtZSIsImdldFVyaSIsIlNEYXRhVXJpIiwiUmVzb3VyY2VQcm9wZXJ0eUluZGV4Iiwic2V0Q29sbGVjdGlvblByZWRpY2F0ZSIsImFsbG93Q2FjaGVVc2UiLCJyZWFkIiwib25BY2NvdW50VHlwZUxvYWQiLCJjb25zb2xlIiwiZXJyb3IiLCJvbkFjY291bnRUeXBlQ2hhbmdlIiwidmFsdWUiLCJjbGVhciIsImRhdGEiLCJPcHRpb24iLCJ0ZXh0Iiwic2VsZWN0ZWQiLCJmb3JtYXRTZWFyY2hRdWVyeSIsInFyeSIsImVzY2FwZVNlYXJjaFF1ZXJ5IiwiY3JlYXRlQWN0aW9uTGF5b3V0IiwiYWN0aW9ucyIsImNscyIsImxhYmVsIiwiZW5hYmxlZCIsImhhc1Byb3BlcnR5IiwiYmluZERlbGVnYXRlIiwiZm4iLCJjYWxsUGhvbmUiLCJhZGROb3RlIiwiYWRkQWN0aXZpdHkiLCJhZGRBdHRhY2htZW50IiwiY2FsbE1haW4i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RTVELEVBQUYsS0FBUyxVQUFoQjtBQUNELE9BRkQsRUFFR3dKLE9BQU9FLEdBRlY7QUFHRDtBQTVSeUcsR0FBNUYsQ0FBaEI7O29CQStSZW5NLE8iLCJmaWxlIjoiQWNjb3VudFB4U2VhcmNoLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IHN0cmluZyBmcm9tICdkb2pvL3N0cmluZyc7XHJcbmltcG9ydCBhY3Rpb24gZnJvbSAnTW9iaWxlL1NhbGVzTG9naXgvQWN0aW9uJztcclxuaW1wb3J0IFNlYXJjaFdpZGdldCBmcm9tICdTYWdlL1BsYXRmb3JtL01vYmlsZS9TZWFyY2hXaWRnZXQnO1xyXG5pbXBvcnQgdXRpbGl0eSBmcm9tICdhcmdvcy9VdGlsaXR5JztcclxuaW1wb3J0IExpc3QgZnJvbSAnYXJnb3MvTGlzdCc7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnLi4vLi4vLi4vLi4vRm9ybWF0JztcclxuaW1wb3J0IF9MZWdhY3lMaXN0QmFzZSBmcm9tICdhcmdvcy9fTGVnYWN5U0RhdGFMaXN0TWl4aW4nO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcbmltcG9ydCBFcnJvck1hbmFnZXIgZnJvbSAnYXJnb3MvRXJyb3JNYW5hZ2VyJztcclxuXHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdhY2N0UHhTZWFyY2gnKTtcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkNvbnRvdXIuVmlld3MuUHhTZWFyY2guQWNjb3VudFB4U2VhcmNoJywgW0xpc3QsIF9MZWdhY3lMaXN0QmFzZV0sIHtcclxuICAvLyBMb2NhbGl6YXRpb24gc3RyaW5nc1xyXG4gIGFjY291bnRzTmVhck1lVGV4dDogcmVzb3VyY2UuYWNjb3VudHNOZWFyTWVUZXh0LFxyXG4gIGFkZEFjdGl2aXR5QWN0aW9uVGV4dDogcmVzb3VyY2UuYWRkQWN0aXZpdHlBY3Rpb25UZXh0LFxyXG4gIGFkZEF0dGFjaG1lbnRBY3Rpb25UZXh0OiByZXNvdXJjZS5hZGRBdHRhY2htZW50QWN0aW9uVGV4dCxcclxuICBhZGROb3RlQWN0aW9uVGV4dDogcmVzb3VyY2UuYWRkTm90ZUFjdGlvblRleHQsXHJcbiAgY2FsbE1haW5BY3Rpb25UZXh0OiByZXNvdXJjZS5jYWxsTWFpbkFjdGlvblRleHQsXHJcbiAgY3VycmVudExvY2F0aW9uRXJyb3JUZXh0OiByZXNvdXJjZS5jdXJyZW50TG9jYXRpb25FcnJvclRleHQsXHJcbiAgZWRpdEFjdGlvblRleHQ6IHJlc291cmNlLmVkaXRBY3Rpb25UZXh0LFxyXG4gIGZheEFiYnJldmlhdGlvblRleHQ6IHJlc291cmNlLmZheEFiYnJldmlhdGlvblRleHQsXHJcbiAga2lsb21ldGVyQWJicmV2VGV4dDogcmVzb3VyY2Uua2lsb21ldGVyQWJicmV2VGV4dCxcclxuICBtaWxlQWJicmV2VGV4dDogcmVzb3VyY2UubWlsZUFiYnJldlRleHQsXHJcbiAgcGhvbmVBYmJyZXZpYXRpb25UZXh0OiByZXNvdXJjZS5waG9uZUFiYnJldmlhdGlvblRleHQsXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgdmlld0NvbnRhY3RzQWN0aW9uVGV4dDogcmVzb3VyY2Uudmlld0NvbnRhY3RzQWN0aW9uVGV4dCxcclxuICBhY2NvdW50VHlwZVRleHQ6IHJlc291cmNlLmFjY291bnRUeXBlVGV4dCxcclxuXHJcbiAgLy8gVGVtcGxhdGVzXHJcbiAgaXRlbVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxwIGNsYXNzPVwibGlzdHZpZXctaGVhZGluZ1wiPnslOiAkLkFjY291bnROYW1lICV9PC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+eyU6IHRoaXMuZm9ybWF0RGVjaW1hbCgkLkRpc3RhbmNlKSAlfSB7JTogdGhpcy5kaXN0YW5jZVRleHQoKSAlfTwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPicsXHJcbiAgICAneyU6ICQkLmpvaW5GaWVsZHMoXCIgfCBcIiwgWyQuVHlwZSwgJC5TdWJUeXBlXSkgJX0nLFxyXG4gICAgJzwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPnslOiAkLkFjY291bnRNYW5hZ2VyICYmICQuQWNjb3VudE1hbmFnZXIuVXNlckluZm8gPyAkLkFjY291bnRNYW5hZ2VyLlVzZXJJbmZvLlVzZXJOYW1lIDogXCJcIiAlfSB8IHslOiAkLk93bmVyLk93bmVyRGVzY3JpcHRpb24gJX08L3A+JyxcclxuICAgICd7JSBpZiAoJC5NYWluUGhvbmUpIHsgJX0nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPicsXHJcbiAgICAneyU6ICQkLnBob25lQWJicmV2aWF0aW9uVGV4dCAlfSA8c3BhbiBjbGFzcz1cImh5cGVybGlua1wiIGRhdGEtYWN0aW9uPVwiY2FsbE1haW5cIiBkYXRhLWtleT1cInslOiAkLiRrZXkgJX1cIj57JTogYXJnb3MuRm9ybWF0LnBob25lKCQuTWFpblBob25lKSAlfTwvc3Bhbj4nLCAvLyBUT0RPOiBBdm9pZCBnbG9iYWxcclxuICAgICc8L3A+JyxcclxuICAgICd7JSB9ICV9JyxcclxuICBdKSxcclxuICBpdGVtUm93Q29udGVudFRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxkaXYgaWQ9XCJ0b3BfaXRlbV9pbmRpY2F0b3JzXCIgY2xhc3M9XCJsaXN0LWl0ZW0taW5kaWNhdG9yLWNvbnRlbnRcIj48L2Rpdj4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJsaXN0LWl0ZW0tY29udGVudFwiPnslISAkJC5pdGVtVGVtcGxhdGUgJX08L2Rpdj4nLFxyXG4gIF0pLFxyXG5cclxuICAvLyBGdW5jdGlvbnNcclxuICBmb3JtYXREZWNpbWFsKG4pIHtcclxuICAgIHJldHVybiBmb3JtYXQuZml4ZWRMb2NhbGUobiwgMik7XHJcbiAgfSxcclxuICBkaXN0YW5jZVRleHQoKSB7XHJcbiAgICByZXR1cm4gQXBwLmlzQ3VycmVudFJlZ2lvbk1ldHJpYygpID8gdGhpcy5raWxvbWV0ZXJBYmJyZXZUZXh0IDogdGhpcy5taWxlQWJicmV2VGV4dDtcclxuICB9LFxyXG4gIGRpc3RhbmNlQ2FsYyhnTGF0LCBnTG9uKSB7XHJcbiAgICBjb25zdCBjb252ID0gQXBwLmlzQ3VycmVudFJlZ2lvbk1ldHJpYygpID8gMS42MDkzNDQgOiAxO1xyXG4gICAgcmV0dXJuIGNvbnYgKiBNYXRoLnNxcnQoXHJcbiAgICAgIE1hdGgucG93KCg2OS4xICogKGdMYXQgLSB0aGlzLmxhdCkpLCAyKSArXHJcbiAgICAgIE1hdGgucG93KCg1My4wICogKGdMb24gLSB0aGlzLmxvbikpLCAyKVxyXG4gICAgKTtcclxuICB9LFxyXG4gIGpvaW5GaWVsZHM6IGZ1bmN0aW9uIGpvaW5GaWVsZHMoc2VwLCBmaWVsZHMpIHtcclxuICAgIHJldHVybiB1dGlsaXR5LmpvaW5GaWVsZHMoc2VwLCBmaWVsZHMpO1xyXG4gIH0sXHJcblxyXG4gIC8vIEFkZCBhIHNlYXJjaCB0ZW1wbGF0ZSBmb3IgYWNjb3VudCB0eXBlIGRyb3Bkb3duXHJcbiAgc2VhcmNoV2lkZ2V0OiBuZXcgU2VhcmNoV2lkZ2V0KHtcclxuICAgIGNsYXNzOiAnbGlzdC1zZWFyY2gnLFxyXG4gICAgd2lkZ2V0VGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAgICc8ZGl2IGNsYXNzPVwic2VhcmNoLXdpZGdldFwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj4nLCAvLyBoaWRlIHRoZSBzdG9jayBzZWFyY2ggc3R1ZmZcclxuICAgICAgJzxkaXYgY2xhc3M9XCJ0YWJsZS1sYXlvdXRcIj4nLFxyXG4gICAgICAnPGRpdj48aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwicXVlcnlcIiBjbGFzcz1cInF1ZXJ5XCIgYXV0b2NvcnJlY3Q9XCJvZmZcIiBhdXRvY2FwaXRhbGl6ZT1cIm9mZlwiIGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJxdWVyeU5vZGVcIiBkYXRhLWRvam8tYXR0YWNoLWV2ZW50PVwib25mb2N1czpfb25Gb2N1cyxvbmJsdXI6X29uQmx1cixvbmtleXByZXNzOl9vbktleVByZXNzXCIgLz48L2Rpdj4nLFxyXG4gICAgICAnPGRpdiBjbGFzcz1cImhhc0J1dHRvblwiPjxidXR0b24gY2xhc3M9XCJjbGVhci1idXR0b25cIiBkYXRhLWRvam8tYXR0YWNoLWV2ZW50PVwib25jbGljazogX29uQ2xlYXJDbGlja1wiPjwvYnV0dG9uPjwvZGl2PicsXHJcbiAgICAgICc8ZGl2IGNsYXNzPVwiaGFzQnV0dG9uXCI+PGJ1dHRvbiBjbGFzcz1cInN1YkhlYWRlckJ1dHRvbiBzZWFyY2hCdXR0b25cIiBkYXRhLWRvam8tYXR0YWNoLWV2ZW50PVwiY2xpY2s6IHNlYXJjaFwiPnslPSAkLnNlYXJjaFRleHQgJX08L2J1dHRvbj48L2Rpdj4nLFxyXG4gICAgICAnPC9kaXY+JyxcclxuICAgICAgJzxsYWJlbCBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwibGFiZWxOb2RlXCI+eyU9ICQuc2VhcmNoVGV4dCAlfTwvbGFiZWw+JyxcclxuICAgICAgJzwvZGl2PicsXHJcbiAgICAgICc8ZGl2PiQkLmFjY291bnRUeXBlVGV4dDxzZWxlY3QgaWQ9XCJxdWVyeVR5cGVcIiBzdHlsZT1cImZvbnQtc2l6ZTogMTZweFwiPjwvc2VsZWN0PjwvZGl2PicsIC8vIGFkZCBvdXIgb3duIHNlYXJjaCBzdHVmZlxyXG4gICAgXSksXHJcbiAgfSksXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGRldGFpbFZpZXc6ICdhY2NvdW50X2RldGFpbCcsXHJcbiAgaXRlbUljb25DbGFzczogJ3NwcmVhZHNoZWV0JywgLy8gdG9kbzogcmVwbGFjZSB3aXRoIGFwcHJvcHJpYXRlIGljb25cclxuICBpZDogJ3B4U2VhcmNoX0FjY291bnRzJyxcclxuICBzZWN1cml0eTogJ0NvbnRvdXIvTWFwL0FjY291bnQnLFxyXG4gIGVudGl0eU5hbWU6ICdBY2NvdW50JyxcclxuICBhbGxvd1NlbGVjdGlvbjogdHJ1ZSxcclxuICBlbmFibGVBY3Rpb25zOiB0cnVlLFxyXG4gIHBhZ2VTaXplOiAxMDAsXHJcbiAgb2ZmbGluZUlkczogbnVsbCxcclxuICByZXNvdXJjZUtpbmQ6ICdhY2NvdW50cycsXHJcbiAgZW5hYmxlU2VhcmNoOiB0cnVlLFxyXG4gIGVkaXRWaWV3OiAnYWNjb3VudF9lZGl0JyxcclxuICBlZGl0U2VjdXJpdHk6ICdFbnRpdGllcy9BY2NvdW50L0VkaXQnLFxyXG4gIHJlbGF0ZWRWaWV3czoge30sXHJcbiAgbWF4RGlzdGFuY2U6IDUwMCxcclxuXHJcbiAgbGF0OiBudWxsLCAvLyBsYXRpdHVkZVxyXG4gIGxvbjogbnVsbCwgLy8gbG9uZ2l0dWRlXHJcblxyXG4gIGNyZWF0ZVJlcXVlc3Q6IGZ1bmN0aW9uIGNyZWF0ZVJlcXVlc3QoKSB7XHJcbiAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhQmFzZVJlcXVlc3QodGhpcy5nZXRTZXJ2aWNlKCkpO1xyXG4gICAgY29uc3QgcGFnZVNpemUgPSB0aGlzLnBhZ2VTaXplO1xyXG4gICAgY29uc3Qgc3RhcnRJbmRleCA9IHRoaXMuZmVlZCAmJiB0aGlzLmZlZWQuJHN0YXJ0SW5kZXggPiAwICYmIHRoaXMuZmVlZC4kaXRlbXNQZXJQYWdlID4gMCA/IHRoaXMuZmVlZC4kc3RhcnRJbmRleCArIHRoaXMuZmVlZC4kaXRlbXNQZXJQYWdlIDogMTtcclxuICAgIHJlcXVlc3QudXJpLnNldFBhdGhTZWdtZW50KDAsICdzbHgnKTtcclxuICAgIHJlcXVlc3QudXJpLnNldFBhdGhTZWdtZW50KDEsICdkeW5hbWljJyk7XHJcbiAgICByZXF1ZXN0LnVyaS5zZXRQYXRoU2VnbWVudCgyLCAnLScpO1xyXG4gICAgcmVxdWVzdC51cmkuc2V0UGF0aFNlZ21lbnQoMywgJ2FjY291bnRzJyk7XHJcbiAgICByZXF1ZXN0LnVyaS5zZXRRdWVyeUFyZygnZm9ybWF0JywgJ0pTT04nKTtcclxuICAgIHJlcXVlc3QudXJpLnNldFF1ZXJ5QXJnKCdzZWxlY3QnLCAnQWNjb3VudE5hbWUsSW5kdXN0cnksVHlwZSxTdWJUeXBlLEFjY291bnRNYW5hZ2VyL1VzZXJJbmZvL1VzZXJOYW1lLEFkZHJlc3MvR2VvY29kZUxhdGl0dWRlLEFkZHJlc3MvR2VvY29kZUxvbmdpdHVkZSxPd25lci9Pd25lckRlc2NyaXB0aW9uLFdlYkFkZHJlc3MsTWFpblBob25lLEZheCcpO1xyXG4gICAgcmVxdWVzdC51cmkuc2V0UXVlcnlBcmcoJ3doZXJlJywgYFR5cGUgZXEgXCIke3RoaXMuYWNjdFR5cGUgPyB0aGlzLmFjY3RUeXBlIDogJ0N1c3RvbWVyJ31cIiBhbmQgJHt0aGlzLl9yZXF1ZXN0RGlzdGFuY2VDYWxjKCl9YCk7XHJcbiAgICByZXF1ZXN0LnVyaS5zZXRTdGFydEluZGV4KHN0YXJ0SW5kZXgpO1xyXG4gICAgcmVxdWVzdC51cmkuc2V0Q291bnQocGFnZVNpemUpO1xyXG4gICAgcmV0dXJuIHJlcXVlc3Q7XHJcbiAgfSxcclxuICBfcmVxdWVzdERpc3RhbmNlQ2FsYygpIHtcclxuICAgIGNvbnN0IGNvbnYgPSBBcHAuaXNDdXJyZW50UmVnaW9uTWV0cmljKCkgPyAxLjYwOTM0NCA6IDE7XHJcbiAgICByZXR1cm4gYCgoJHtjb252fSBtdWwgc3FydCgoKCg2OS4xIG11bCAoQWRkcmVzcy5HZW9jb2RlTGF0aXR1ZGUtKCR7dGhpcy5sYXR9KSkpKSBtdWwgKDY5LjEgbXVsIChBZGRyZXNzLkdlb2NvZGVMYXRpdHVkZS0oJHt0aGlzLmxhdH0pKSkpKygoNTMgbXVsIChBZGRyZXNzLkdlb2NvZGVMb25naXR1ZGUtKCR7dGhpcy5sb259KSkpIG11bCAoNTMgbXVsIChBZGRyZXNzLkdlb2NvZGVMb25naXR1ZGUtKCR7dGhpcy5sb259KSkpKSkpIGx0ICR7dGhpcy5tYXhEaXN0YW5jZX0pYDtcclxuICB9LFxyXG4gIHJlcXVlc3REYXRhOiBmdW5jdGlvbiByZXF1ZXN0RGF0YSgpIHtcclxuICAgIHRoaXMubG9hZEFjY291bnRUeXBlcygpO1xyXG4gICAgJCh0aGlzLmRvbU5vZGUpLmFkZENsYXNzKCdsaXN0LWxvYWRpbmcnKTtcclxuXHJcbiAgICBpZiAodGhpcy5sYXQgJiYgdGhpcy5sb24pIHtcclxuICAgICAgY29uc3QgcmVxdWVzdCA9IHRoaXMuY3JlYXRlUmVxdWVzdCgpO1xyXG4gICAgICByZXF1ZXN0LnNlcnZpY2UucmVhZEZlZWQocmVxdWVzdCwge1xyXG4gICAgICAgIHN1Y2Nlc3M6IHRoaXMub25SZXF1ZXN0RGF0YVN1Y2Nlc3MsXHJcbiAgICAgICAgZmFpbHVyZTogdGhpcy5vblJlcXVlc3REYXRhRmFpbHVyZSxcclxuICAgICAgICBhYm9ydGVkOiB0aGlzLm9uUmVxdWVzdERhdGFBYm9ydGVkLFxyXG4gICAgICAgIHNjb3BlOiB0aGlzLFxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24obGFuZy5oaXRjaCh0aGlzLCAnZ2VvTG9jYXRpb25SZWNlaXZlZCcpLCBsYW5nLmhpdGNoKHRoaXMsICdnZW9Mb2NhdGlvbkVycm9yJyksIHtcclxuICAgICAgICBlbmFibGVIaWdoQWNjdXJhY3k6IHRydWUsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8gY3VzdG9tIHJlcXVlc3QgZGF0YSBzdWNjZXNzIG1ldGhvZCB0byBpbnNlcnQgb3VyIFwibWVcIiBhdCB0aGUgZnJvbnRcclxuICBvblJlcXVlc3REYXRhU3VjY2VzczogZnVuY3Rpb24gb25SZXF1ZXN0RGF0YVN1Y2Nlc3MoZmVlZCkge1xyXG4gICAgY29uc3QgZmVlZFJlc291cmNlcyA9IGZlZWQuJHJlc291cmNlcztcclxuICAgIGlmIChmZWVkUmVzb3VyY2VzKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmVlZC4kcmVzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgZW50cnkgPSBmZWVkLiRyZXNvdXJjZXNbaV07XHJcbiAgICAgICAgZW50cnkuRGlzdGFuY2UgPSB0aGlzLmRpc3RhbmNlQ2FsYyhlbnRyeS5BZGRyZXNzLkdlb2NvZGVMYXRpdHVkZSwgZW50cnkuQWRkcmVzcy5HZW9jb2RlTG9uZ2l0dWRlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gU29ydCBieSBkaXN0YW5jZSBBU0NcclxuICAgICAgZmVlZC4kcmVzb3VyY2VzLnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgICByZXR1cm4gYS5EaXN0YW5jZSA+IGIuRGlzdGFuY2UgPyAxIDogLTE7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5wcm9jZXNzRmVlZChmZWVkKTtcclxuICAgICQodGhpcy5kb21Ob2RlKS5yZW1vdmVDbGFzcygnbGlzdC1sb2FkaW5nJyk7XHJcbiAgfSxcclxuICBwcm9jZXNzRmVlZDogZnVuY3Rpb24gcHJvY2Vzc0ZlZWQoX2ZlZWQpIHtcclxuICAgIGNvbnN0IGZlZWQgPSBfZmVlZDtcclxuICAgIGlmICghdGhpcy5mZWVkKSB7XHJcbiAgICAgIHRoaXMuc2V0KCdsaXN0Q29udGVudCcsICcnKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmZlZWQgPSBmZWVkO1xyXG5cclxuICAgIGlmICh0aGlzLmZlZWQuJHRvdGFsUmVzdWx0cyA9PT0gMCkge1xyXG4gICAgICB0aGlzLnNldCgnbGlzdENvbnRlbnQnLCB0aGlzLm5vRGF0YVRlbXBsYXRlLmFwcGx5KHRoaXMpKTtcclxuICAgIH0gZWxzZSBpZiAoZmVlZC4kcmVzb3VyY2VzKSB7XHJcbiAgICAgIGNvbnN0IGRvY2ZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmVlZC4kcmVzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgZW50cnkgPSBmZWVkLiRyZXNvdXJjZXNbaV07XHJcbiAgICAgICAgZW50cnkuJGRlc2NyaXB0b3IgPSBlbnRyeS4kZGVzY3JpcHRvciB8fCBmZWVkLiRkZXNjcmlwdG9yO1xyXG4gICAgICAgIHRoaXMuZW50cmllc1tlbnRyeS4ka2V5XSA9IGVudHJ5O1xyXG4gICAgICAgIGNvbnN0IHJvd05vZGUgPSAkKHRoaXMucm93VGVtcGxhdGUuYXBwbHkoZW50cnksIHRoaXMpKS5nZXQoMCk7XHJcbiAgICAgICAgZG9jZnJhZy5hcHBlbmRDaGlsZChyb3dOb2RlKTtcclxuICAgICAgICB0aGlzLm9uQXBwbHlSb3dUZW1wbGF0ZShlbnRyeSwgcm93Tm9kZSk7XHJcbiAgICAgICAgaWYgKHRoaXMucmVsYXRlZFZpZXdzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIHRoaXMub25Qcm9jZXNzUmVsYXRlZFZpZXdzKGVudHJ5LCByb3dOb2RlLCBmZWVkKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkb2NmcmFnLmNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICQodGhpcy5jb250ZW50Tm9kZSkuYXBwZW5kKGRvY2ZyYWcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmZlZWQuJHRvdGFsUmVzdWx0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgY29uc3QgcmVtYWluaW5nID0gdGhpcy5mZWVkLiR0b3RhbFJlc3VsdHMgLSAodGhpcy5mZWVkLiRzdGFydEluZGV4ICsgdGhpcy5mZWVkLiRpdGVtc1BlclBhZ2UgLSAxKTtcclxuICAgICAgdGhpcy5zZXQoJ3JlbWFpbmluZ0NvbnRlbnQnLCBzdHJpbmcuc3Vic3RpdHV0ZSh0aGlzLnJlbWFpbmluZ1RleHQsIFtyZW1haW5pbmddKSk7XHJcbiAgICB9XHJcblxyXG4gICAgJCh0aGlzLmRvbU5vZGUpLnRvZ2dsZUNsYXNzKCdsaXN0LWhhcy1tb3JlJywgdGhpcy5oYXNNb3JlRGF0YSgpKTtcclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmFsbG93RW1wdHlTZWxlY3Rpb24pIHtcclxuICAgICAgJCh0aGlzLmRvbU5vZGUpLmFkZENsYXNzKCdsaXN0LWhhcy1lbXB0eS1vcHQnKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9sb2FkUHJldmlvdXNTZWxlY3Rpb25zKCk7XHJcbiAgfSxcclxuICBnZW9Mb2NhdGlvbkVycm9yOiBmdW5jdGlvbiBnZW9Mb2NhdGlvbkVycm9yKHBvc2l0aW9uRXJyb3IpIHtcclxuICAgIEFwcC50b2FzdC5hZGQoeyB0aXRsZTogdGhpcy5jdXJyZW50TG9jYXRpb25FcnJvclRleHQsIG1lc3NhZ2U6IHBvc2l0aW9uRXJyb3IubWVzc2FnZSB9KTtcclxuICAgICQodGhpcy5kb21Ob2RlKS5yZW1vdmVDbGFzcygnbGlzdC1sb2FkaW5nJyk7XHJcbiAgICB0aGlzLnNldCgnbGlzdENvbnRlbnQnLCAnJyk7XHJcbiAgICBFcnJvck1hbmFnZXIuYWRkU2ltcGxlRXJyb3IoJ0dlb2xvY2F0aW9uIGVycm9yLicsIHBvc2l0aW9uRXJyb3IubWVzc2FnZSk7XHJcbiAgfSxcclxuICBnZW9Mb2NhdGlvblJlY2VpdmVkOiBmdW5jdGlvbiBnZW9Mb2NhdGlvblJlY2VpdmVkKHBvc2l0aW9uKSB7XHJcbiAgICB0aGlzLmxhdCA9IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZTtcclxuICAgIHRoaXMubG9uID0gcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZTtcclxuICAgIHRoaXMucmVxdWVzdERhdGEoKTtcclxuICB9LFxyXG4gIG9wdGlvbnM6IHt9LFxyXG4gIC8vIGFsd2F5cyByZWZyZXNoXHJcbiAgcmVmcmVzaFJlcXVpcmVkRm9yOiBmdW5jdGlvbiByZWZyZXNoUmVxdWlyZWRGb3Iob3B0aW9ucykge1xyXG4gICAgaWYgKCFvcHRpb25zKSB7IC8vIGlmIG5vIG9wdGlvbnMgd2VyZSBwYXNzZWQgaW4sIHRoZW4gd2UgYXJlIHNlYXJjaGluZyBmcm9tIGFuIGFjY291bnRcclxuICAgICAgdGhpcy5sYXQgPSBudWxsO1xyXG4gICAgICB0aGlzLmxvbiA9IG51bGw7XHJcbiAgICAgIHRoaXMub3B0aW9ucy50aXRsZSA9IHRoaXMuYWNjb3VudHNOZWFyTWVUZXh0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSxcclxuICBjcmVhdGVUb29sTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVUb29sTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudG9vbHMgfHwgKHRoaXMudG9vbHMgPSB7XHJcbiAgICAgIHRiYXI6IFtdLFxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgdGhpcy5zdGFydHVwKCk7XHJcbiAgICB0aGlzLmluaXRDb25uZWN0cygpO1xyXG4gICAgdGhpcy50aXRsZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhZ2VUaXRsZScpO1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIGxvYWRBY2NvdW50VHlwZXM6IGZ1bmN0aW9uIGxvYWRBY2NvdW50VHlwZXMoKSB7XHJcbiAgICB0aGlzLnF1ZXJ5VHlwZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3F1ZXJ5VHlwZScpO1xyXG4gICAgdGhpcy5xdWVyeVR5cGVFbC5vbmNoYW5nZSA9IGxhbmcuaGl0Y2godGhpcywgJ29uQWNjb3VudFR5cGVDaGFuZ2UnKTsgLy8gdGhpcy47XHJcbiAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhUmVzb3VyY2VDb2xsZWN0aW9uUmVxdWVzdChBcHAuZ2V0U2VydmljZSgpKVxyXG4gICAgICAuc2V0UmVzb3VyY2VLaW5kKCdwaWNrbGlzdHMnKVxyXG4gICAgICAuc2V0Q29udHJhY3ROYW1lKCdzeXN0ZW0nKTtcclxuICAgIGNvbnN0IHVyaSA9IHJlcXVlc3QuZ2V0VXJpKCk7XHJcbiAgICB1cmkuc2V0UGF0aFNlZ21lbnQoU2FnZS5TRGF0YS5DbGllbnQuU0RhdGFVcmkuUmVzb3VyY2VQcm9wZXJ0eUluZGV4LCAnaXRlbXMnKTtcclxuICAgIHVyaS5zZXRDb2xsZWN0aW9uUHJlZGljYXRlKCduYW1lIGVxIFwiQWNjb3VudCBUeXBlXCInKTtcclxuICAgIHJlcXVlc3QuYWxsb3dDYWNoZVVzZSA9IHRydWU7XHJcbiAgICByZXF1ZXN0LnJlYWQoe1xyXG4gICAgICBzdWNjZXNzOiB0aGlzLm9uQWNjb3VudFR5cGVMb2FkLFxyXG4gICAgICBmYWlsdXJlKCkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2ZhaWxlZCB0byBsb2FkIGFjY291bnQgdHlwZScpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICAgIH0sXHJcbiAgICAgIHNjb3BlOiB0aGlzLFxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBvbkFjY291bnRUeXBlQ2hhbmdlOiBmdW5jdGlvbiBvbkFjY291bnRUeXBlQ2hhbmdlKCkge1xyXG4gICAgdGhpcy5hY2N0VHlwZSA9IHRoaXMucXVlcnlUeXBlRWwudmFsdWU7XHJcbiAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICB0aGlzLnJlcXVlc3REYXRhKCk7XHJcbiAgfSxcclxuICBvbkFjY291bnRUeXBlTG9hZDogZnVuY3Rpb24gb25BY2NvdW50VHlwZUxvYWQoZGF0YSkge1xyXG4gICAgaWYgKHRoaXMucXVlcnlUeXBlRWwub3B0aW9ucyAmJiB0aGlzLnF1ZXJ5VHlwZUVsLm9wdGlvbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLiRyZXNvdXJjZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdGhpcy5xdWVyeVR5cGVFbC5vcHRpb25zW2ldID0gbmV3IE9wdGlvbihkYXRhLiRyZXNvdXJjZXNbaV0udGV4dCwgZGF0YS4kcmVzb3VyY2VzW2ldLnRleHQsIHRydWUsIGZhbHNlKTtcclxuICAgICAgaWYgKHRoaXMucXVlcnlUeXBlRWwub3B0aW9uc1tpXS52YWx1ZSA9PT0gJ0N1c3RvbWVyJykge1xyXG4gICAgICAgIHRoaXMucXVlcnlUeXBlRWwub3B0aW9uc1tpXS5zZWxlY3RlZCA9ICdUcnVlJztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZm9ybWF0U2VhcmNoUXVlcnk6IGZ1bmN0aW9uIGZvcm1hdFNlYXJjaFF1ZXJ5KHFyeSkge1xyXG4gICAgcmV0dXJuIGBBY2NvdW50TmFtZSBsaWtlIFwiJHt0aGlzLmVzY2FwZVNlYXJjaFF1ZXJ5KHFyeSl9JVwiYDtcclxuICB9LFxyXG4gIGNyZWF0ZUFjdGlvbkxheW91dDogZnVuY3Rpb24gY3JlYXRlQWN0aW9uTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYWN0aW9ucyB8fCAodGhpcy5hY3Rpb25zID0gW3tcclxuICAgICAgaWQ6ICdjYWxsTWFpbicsXHJcbiAgICAgIGNsczogJ3Bob25lJyxcclxuICAgICAgbGFiZWw6IHRoaXMuY2FsbE1haW5BY3Rpb25UZXh0LFxyXG4gICAgICBlbmFibGVkOiBhY3Rpb24uaGFzUHJvcGVydHkuYmluZERlbGVnYXRlKHRoaXMsICdNYWluUGhvbmUnKSxcclxuICAgICAgZm46IGFjdGlvbi5jYWxsUGhvbmUuYmluZERlbGVnYXRlKHRoaXMsICdNYWluUGhvbmUnKSxcclxuICAgIH0sIHtcclxuICAgICAgaWQ6ICdhZGROb3RlJyxcclxuICAgICAgY2xzOiAnZWRpdCcsXHJcbiAgICAgIGxhYmVsOiB0aGlzLmFkZE5vdGVBY3Rpb25UZXh0LFxyXG4gICAgICBmbjogYWN0aW9uLmFkZE5vdGUuYmluZERlbGVnYXRlKHRoaXMpLFxyXG4gICAgfSwge1xyXG4gICAgICBpZDogJ2FkZEFjdGl2aXR5JyxcclxuICAgICAgY2xzOiAnY2FsZW5kYXInLFxyXG4gICAgICBsYWJlbDogdGhpcy5hZGRBY3Rpdml0eUFjdGlvblRleHQsXHJcbiAgICAgIGZuOiBhY3Rpb24uYWRkQWN0aXZpdHkuYmluZERlbGVnYXRlKHRoaXMpLFxyXG4gICAgfSwge1xyXG4gICAgICBpZDogJ2FkZEF0dGFjaG1lbnQnLFxyXG4gICAgICBjbHM6ICdhdHRhY2gnLFxyXG4gICAgICBsYWJlbDogdGhpcy5hZGRBdHRhY2htZW50QWN0aW9uVGV4dCxcclxuICAgICAgZm46IGFjdGlvbi5hZGRBdHRhY2htZW50LmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgIH1dKTtcclxuICB9LFxyXG4gIGNhbGxNYWluOiBmdW5jdGlvbiBjYWxsTWFpbihwYXJhbXMpIHtcclxuICAgIHRoaXMuaW52b2tlQWN0aW9uSXRlbUJ5KChhKSA9PiB7XHJcbiAgICAgIHJldHVybiBhLmlkID09PSAnY2FsbE1haW4nO1xyXG4gICAgfSwgcGFyYW1zLmtleSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=