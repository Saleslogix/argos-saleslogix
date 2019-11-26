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
      this.inherited(init, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQ29udG91ci9WaWV3cy9QeFNlYXJjaC9BY2NvdW50UHhTZWFyY2guanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiYWNjb3VudHNOZWFyTWVUZXh0IiwiYWRkQWN0aXZpdHlBY3Rpb25UZXh0IiwiYWRkQXR0YWNobWVudEFjdGlvblRleHQiLCJhZGROb3RlQWN0aW9uVGV4dCIsImNhbGxNYWluQWN0aW9uVGV4dCIsImN1cnJlbnRMb2NhdGlvbkVycm9yVGV4dCIsImVkaXRBY3Rpb25UZXh0IiwiZmF4QWJicmV2aWF0aW9uVGV4dCIsImtpbG9tZXRlckFiYnJldlRleHQiLCJtaWxlQWJicmV2VGV4dCIsInBob25lQWJicmV2aWF0aW9uVGV4dCIsInRpdGxlVGV4dCIsInZpZXdDb250YWN0c0FjdGlvblRleHQiLCJhY2NvdW50VHlwZVRleHQiLCJpdGVtVGVtcGxhdGUiLCJTaW1wbGF0ZSIsIml0ZW1Sb3dDb250ZW50VGVtcGxhdGUiLCJmb3JtYXREZWNpbWFsIiwibiIsImZpeGVkTG9jYWxlIiwiZGlzdGFuY2VUZXh0IiwiQXBwIiwiaXNDdXJyZW50UmVnaW9uTWV0cmljIiwiZGlzdGFuY2VDYWxjIiwiZ0xhdCIsImdMb24iLCJjb252IiwiTWF0aCIsInNxcnQiLCJwb3ciLCJsYXQiLCJsb24iLCJqb2luRmllbGRzIiwic2VwIiwiZmllbGRzIiwic2VhcmNoV2lkZ2V0IiwiY2xhc3MiLCJ3aWRnZXRUZW1wbGF0ZSIsImRldGFpbFZpZXciLCJpdGVtSWNvbkNsYXNzIiwiaWQiLCJzZWN1cml0eSIsImVudGl0eU5hbWUiLCJhbGxvd1NlbGVjdGlvbiIsImVuYWJsZUFjdGlvbnMiLCJwYWdlU2l6ZSIsIm9mZmxpbmVJZHMiLCJyZXNvdXJjZUtpbmQiLCJlbmFibGVTZWFyY2giLCJlZGl0VmlldyIsImVkaXRTZWN1cml0eSIsInJlbGF0ZWRWaWV3cyIsIm1heERpc3RhbmNlIiwiY3JlYXRlUmVxdWVzdCIsInJlcXVlc3QiLCJTYWdlIiwiU0RhdGEiLCJDbGllbnQiLCJTRGF0YUJhc2VSZXF1ZXN0IiwiZ2V0U2VydmljZSIsInN0YXJ0SW5kZXgiLCJmZWVkIiwiJHN0YXJ0SW5kZXgiLCIkaXRlbXNQZXJQYWdlIiwidXJpIiwic2V0UGF0aFNlZ21lbnQiLCJzZXRRdWVyeUFyZyIsImFjY3RUeXBlIiwiX3JlcXVlc3REaXN0YW5jZUNhbGMiLCJzZXRTdGFydEluZGV4Iiwic2V0Q291bnQiLCJyZXF1ZXN0RGF0YSIsImxvYWRBY2NvdW50VHlwZXMiLCIkIiwiZG9tTm9kZSIsImFkZENsYXNzIiwic2VydmljZSIsInJlYWRGZWVkIiwic3VjY2VzcyIsIm9uUmVxdWVzdERhdGFTdWNjZXNzIiwiZmFpbHVyZSIsIm9uUmVxdWVzdERhdGFGYWlsdXJlIiwiYWJvcnRlZCIsIm9uUmVxdWVzdERhdGFBYm9ydGVkIiwic2NvcGUiLCJuYXZpZ2F0b3IiLCJnZW9sb2NhdGlvbiIsImdldEN1cnJlbnRQb3NpdGlvbiIsImhpdGNoIiwiZW5hYmxlSGlnaEFjY3VyYWN5IiwiZmVlZFJlc291cmNlcyIsIiRyZXNvdXJjZXMiLCJpIiwibGVuZ3RoIiwiZW50cnkiLCJEaXN0YW5jZSIsIkFkZHJlc3MiLCJHZW9jb2RlTGF0aXR1ZGUiLCJHZW9jb2RlTG9uZ2l0dWRlIiwic29ydCIsImEiLCJiIiwicHJvY2Vzc0ZlZWQiLCJyZW1vdmVDbGFzcyIsIl9mZWVkIiwic2V0IiwiJHRvdGFsUmVzdWx0cyIsIm5vRGF0YVRlbXBsYXRlIiwiYXBwbHkiLCJkb2NmcmFnIiwiZG9jdW1lbnQiLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50IiwiJGRlc2NyaXB0b3IiLCJlbnRyaWVzIiwiJGtleSIsInJvd05vZGUiLCJyb3dUZW1wbGF0ZSIsImdldCIsImFwcGVuZENoaWxkIiwib25BcHBseVJvd1RlbXBsYXRlIiwib25Qcm9jZXNzUmVsYXRlZFZpZXdzIiwiY2hpbGROb2RlcyIsImNvbnRlbnROb2RlIiwiYXBwZW5kIiwicmVtYWluaW5nIiwic3Vic3RpdHV0ZSIsInJlbWFpbmluZ1RleHQiLCJ0b2dnbGVDbGFzcyIsImhhc01vcmVEYXRhIiwib3B0aW9ucyIsImFsbG93RW1wdHlTZWxlY3Rpb24iLCJfbG9hZFByZXZpb3VzU2VsZWN0aW9ucyIsImdlb0xvY2F0aW9uRXJyb3IiLCJwb3NpdGlvbkVycm9yIiwidG9hc3QiLCJhZGQiLCJ0aXRsZSIsIm1lc3NhZ2UiLCJhZGRTaW1wbGVFcnJvciIsImdlb0xvY2F0aW9uUmVjZWl2ZWQiLCJwb3NpdGlvbiIsImNvb3JkcyIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwicmVmcmVzaFJlcXVpcmVkRm9yIiwiY3JlYXRlVG9vbExheW91dCIsInRvb2xzIiwidGJhciIsImluaXQiLCJzdGFydHVwIiwiaW5pdENvbm5lY3RzIiwidGl0bGVFbCIsImdldEVsZW1lbnRCeUlkIiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwicXVlcnlUeXBlRWwiLCJvbmNoYW5nZSIsIlNEYXRhUmVzb3VyY2VDb2xsZWN0aW9uUmVxdWVzdCIsInNldFJlc291cmNlS2luZCIsInNldENvbnRyYWN0TmFtZSIsImdldFVyaSIsIlNEYXRhVXJpIiwiUmVzb3VyY2VQcm9wZXJ0eUluZGV4Iiwic2V0Q29sbGVjdGlvblByZWRpY2F0ZSIsImFsbG93Q2FjaGVVc2UiLCJyZWFkIiwib25BY2NvdW50VHlwZUxvYWQiLCJjb25zb2xlIiwiZXJyb3IiLCJvbkFjY291bnRUeXBlQ2hhbmdlIiwidmFsdWUiLCJjbGVhciIsImRhdGEiLCJPcHRpb24iLCJ0ZXh0Iiwic2VsZWN0ZWQiLCJmb3JtYXRTZWFyY2hRdWVyeSIsInFyeSIsImVzY2FwZVNlYXJjaFF1ZXJ5IiwiY3JlYXRlQWN0aW9uTGF5b3V0IiwiYWN0aW9ucyIsImNscyIsImxhYmVsIiwiZW5hYmxlZCIsImhhc1Byb3BlcnR5IiwiYmluZERlbGVnYXRlIiwiZm4iLCJjYWxsUGhvbmUiLCJhZGROb3RlIiwiYWRkQWN0aXZpdHkiLCJhZGRBdHRhY2htZW50IiwiY2FsbE1haW4iLCJwYXJhbXMiLCJpbnZva2VBY3Rpb25JdGVtQnkiLCJrZXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRCQSxNQUFNQSxXQUFXLG9CQUFZLGNBQVosQ0FBakIsQyxDQTVCQTs7Ozs7Ozs7Ozs7Ozs7O0FBOEJBLE1BQU1DLFVBQVUsdUJBQVEseURBQVIsRUFBbUUsZ0RBQW5FLEVBQTRGO0FBQzFHO0FBQ0FDLHdCQUFvQkYsU0FBU0Usa0JBRjZFO0FBRzFHQywyQkFBdUJILFNBQVNHLHFCQUgwRTtBQUkxR0MsNkJBQXlCSixTQUFTSSx1QkFKd0U7QUFLMUdDLHVCQUFtQkwsU0FBU0ssaUJBTDhFO0FBTTFHQyx3QkFBb0JOLFNBQVNNLGtCQU42RTtBQU8xR0MsOEJBQTBCUCxTQUFTTyx3QkFQdUU7QUFRMUdDLG9CQUFnQlIsU0FBU1EsY0FSaUY7QUFTMUdDLHlCQUFxQlQsU0FBU1MsbUJBVDRFO0FBVTFHQyx5QkFBcUJWLFNBQVNVLG1CQVY0RTtBQVcxR0Msb0JBQWdCWCxTQUFTVyxjQVhpRjtBQVkxR0MsMkJBQXVCWixTQUFTWSxxQkFaMEU7QUFhMUdDLGVBQVdiLFNBQVNhLFNBYnNGO0FBYzFHQyw0QkFBd0JkLFNBQVNjLHNCQWR5RTtBQWUxR0MscUJBQWlCZixTQUFTZSxlQWZnRjs7QUFpQjFHO0FBQ0FDLGtCQUFjLElBQUlDLFFBQUosQ0FBYSxDQUN6QixzREFEeUIsRUFFekIsNEZBRnlCLEVBR3pCLHdCQUh5QixFQUl6QixrREFKeUIsRUFLekIsTUFMeUIsRUFNekIsNEpBTnlCLEVBT3pCLDBCQVB5QixFQVF6Qix3QkFSeUIsRUFTekIsdUpBVHlCLEVBU2dJO0FBQ3pKLFVBVnlCLEVBV3pCLFNBWHlCLENBQWIsQ0FsQjRGO0FBK0IxR0MsNEJBQXdCLElBQUlELFFBQUosQ0FBYSxDQUNuQywwRUFEbUMsRUFFbkMsNkRBRm1DLENBQWIsQ0EvQmtGOztBQXFDMUdFLGlCQXJDMEcseUJBcUM1RkMsQ0FyQzRGLEVBcUN6RjtBQUNmLGFBQU8saUJBQU9DLFdBQVAsQ0FBbUJELENBQW5CLEVBQXNCLENBQXRCLENBQVA7QUFDRCxLQXZDeUc7QUF3QzFHRSxnQkF4QzBHLDBCQXdDM0Y7QUFDYixhQUFPQyxJQUFJQyxxQkFBSixLQUE4QixLQUFLZCxtQkFBbkMsR0FBeUQsS0FBS0MsY0FBckU7QUFDRCxLQTFDeUc7QUEyQzFHYyxnQkEzQzBHLHdCQTJDN0ZDLElBM0M2RixFQTJDdkZDLElBM0N1RixFQTJDakY7QUFDdkIsVUFBTUMsT0FBT0wsSUFBSUMscUJBQUosS0FBOEIsUUFBOUIsR0FBeUMsQ0FBdEQ7QUFDQSxhQUFPSSxPQUFPQyxLQUFLQyxJQUFMLENBQ1pELEtBQUtFLEdBQUwsQ0FBVSxRQUFRTCxPQUFPLEtBQUtNLEdBQXBCLENBQVYsRUFBcUMsQ0FBckMsSUFDQUgsS0FBS0UsR0FBTCxDQUFVLFFBQVFKLE9BQU8sS0FBS00sR0FBcEIsQ0FBVixFQUFxQyxDQUFyQyxDQUZZLENBQWQ7QUFJRCxLQWpEeUc7O0FBa0QxR0MsZ0JBQVksU0FBU0EsVUFBVCxDQUFvQkMsR0FBcEIsRUFBeUJDLE1BQXpCLEVBQWlDO0FBQzNDLGFBQU8sa0JBQVFGLFVBQVIsQ0FBbUJDLEdBQW5CLEVBQXdCQyxNQUF4QixDQUFQO0FBQ0QsS0FwRHlHOztBQXNEMUc7QUFDQUMsa0JBQWMsMkJBQWlCO0FBQzdCQyxhQUFPLGFBRHNCO0FBRTdCQyxzQkFBZ0IsSUFBSXRCLFFBQUosQ0FBYSxDQUMzQixvREFEMkIsRUFDMkI7QUFDdEQsa0NBRjJCLEVBRzNCLHVOQUgyQixFQUkzQixxSEFKMkIsRUFLM0IsK0lBTDJCLEVBTTNCLFFBTjJCLEVBTzNCLHVFQVAyQixFQVEzQixRQVIyQixFQVMzQix1RkFUMkIsQ0FBYjtBQUZhLEtBQWpCLENBdkQ0Rjs7QUFzRTFHO0FBQ0F1QixnQkFBWSxnQkF2RThGO0FBd0UxR0MsbUJBQWUsYUF4RTJGLEVBd0U1RTtBQUM5QkMsUUFBSSxtQkF6RXNHO0FBMEUxR0MsY0FBVSxxQkExRWdHO0FBMkUxR0MsZ0JBQVksU0EzRThGO0FBNEUxR0Msb0JBQWdCLElBNUUwRjtBQTZFMUdDLG1CQUFlLElBN0UyRjtBQThFMUdDLGNBQVUsR0E5RWdHO0FBK0UxR0MsZ0JBQVksSUEvRThGO0FBZ0YxR0Msa0JBQWMsVUFoRjRGO0FBaUYxR0Msa0JBQWMsSUFqRjRGO0FBa0YxR0MsY0FBVSxjQWxGZ0c7QUFtRjFHQyxrQkFBYyx1QkFuRjRGO0FBb0YxR0Msa0JBQWMsRUFwRjRGO0FBcUYxR0MsaUJBQWEsR0FyRjZGOztBQXVGMUd0QixTQUFLLElBdkZxRyxFQXVGL0Y7QUFDWEMsU0FBSyxJQXhGcUcsRUF3Ri9GOztBQUVYc0IsbUJBQWUsU0FBU0EsYUFBVCxHQUF5QjtBQUN0QyxVQUFNQyxVQUFVLElBQUlDLEtBQUtDLEtBQUwsQ0FBV0MsTUFBWCxDQUFrQkMsZ0JBQXRCLENBQXVDLEtBQUtDLFVBQUwsRUFBdkMsQ0FBaEI7QUFDQSxVQUFNZCxXQUFXLEtBQUtBLFFBQXRCO0FBQ0EsVUFBTWUsYUFBYSxLQUFLQyxJQUFMLElBQWEsS0FBS0EsSUFBTCxDQUFVQyxXQUFWLEdBQXdCLENBQXJDLElBQTBDLEtBQUtELElBQUwsQ0FBVUUsYUFBVixHQUEwQixDQUFwRSxHQUF3RSxLQUFLRixJQUFMLENBQVVDLFdBQVYsR0FBd0IsS0FBS0QsSUFBTCxDQUFVRSxhQUExRyxHQUEwSCxDQUE3STtBQUNBVCxjQUFRVSxHQUFSLENBQVlDLGNBQVosQ0FBMkIsQ0FBM0IsRUFBOEIsS0FBOUI7QUFDQVgsY0FBUVUsR0FBUixDQUFZQyxjQUFaLENBQTJCLENBQTNCLEVBQThCLFNBQTlCO0FBQ0FYLGNBQVFVLEdBQVIsQ0FBWUMsY0FBWixDQUEyQixDQUEzQixFQUE4QixHQUE5QjtBQUNBWCxjQUFRVSxHQUFSLENBQVlDLGNBQVosQ0FBMkIsQ0FBM0IsRUFBOEIsVUFBOUI7QUFDQVgsY0FBUVUsR0FBUixDQUFZRSxXQUFaLENBQXdCLFFBQXhCLEVBQWtDLE1BQWxDO0FBQ0FaLGNBQVFVLEdBQVIsQ0FBWUUsV0FBWixDQUF3QixRQUF4QixFQUFrQyxxS0FBbEM7QUFDQVosY0FBUVUsR0FBUixDQUFZRSxXQUFaLENBQXdCLE9BQXhCLGlCQUE2QyxLQUFLQyxRQUFMLEdBQWdCLEtBQUtBLFFBQXJCLEdBQWdDLFVBQTdFLGVBQWdHLEtBQUtDLG9CQUFMLEVBQWhHO0FBQ0FkLGNBQVFVLEdBQVIsQ0FBWUssYUFBWixDQUEwQlQsVUFBMUI7QUFDQU4sY0FBUVUsR0FBUixDQUFZTSxRQUFaLENBQXFCekIsUUFBckI7QUFDQSxhQUFPUyxPQUFQO0FBQ0QsS0F4R3lHO0FBeUcxR2Msd0JBekcwRyxrQ0F5R25GO0FBQ3JCLFVBQU0xQyxPQUFPTCxJQUFJQyxxQkFBSixLQUE4QixRQUE5QixHQUF5QyxDQUF0RDtBQUNBLG9CQUFZSSxJQUFaLHdEQUFtRSxLQUFLSSxHQUF4RSxxREFBMkgsS0FBS0EsR0FBaEksaURBQStLLEtBQUtDLEdBQXBMLG1EQUFxTyxLQUFLQSxHQUExTyxrQkFBMFAsS0FBS3FCLFdBQS9QO0FBQ0QsS0E1R3lHOztBQTZHMUdtQixpQkFBYSxTQUFTQSxXQUFULEdBQXVCO0FBQ2xDLFdBQUtDLGdCQUFMO0FBQ0FDLFFBQUUsS0FBS0MsT0FBUCxFQUFnQkMsUUFBaEIsQ0FBeUIsY0FBekI7O0FBRUEsVUFBSSxLQUFLN0MsR0FBTCxJQUFZLEtBQUtDLEdBQXJCLEVBQTBCO0FBQ3hCLFlBQU11QixVQUFVLEtBQUtELGFBQUwsRUFBaEI7QUFDQUMsZ0JBQVFzQixPQUFSLENBQWdCQyxRQUFoQixDQUF5QnZCLE9BQXpCLEVBQWtDO0FBQ2hDd0IsbUJBQVMsS0FBS0Msb0JBRGtCO0FBRWhDQyxtQkFBUyxLQUFLQyxvQkFGa0I7QUFHaENDLG1CQUFTLEtBQUtDLG9CQUhrQjtBQUloQ0MsaUJBQU87QUFKeUIsU0FBbEM7QUFNRCxPQVJELE1BUU87QUFDTEMsa0JBQVVDLFdBQVYsQ0FBc0JDLGtCQUF0QixDQUF5QyxlQUFLQyxLQUFMLENBQVcsSUFBWCxFQUFpQixxQkFBakIsQ0FBekMsRUFBa0YsZUFBS0EsS0FBTCxDQUFXLElBQVgsRUFBaUIsa0JBQWpCLENBQWxGLEVBQXdIO0FBQ3RIQyw4QkFBb0I7QUFEa0csU0FBeEg7QUFHRDtBQUNGLEtBOUh5RztBQStIMUc7QUFDQVYsMEJBQXNCLFNBQVNBLG9CQUFULENBQThCbEIsSUFBOUIsRUFBb0M7QUFDeEQsVUFBTTZCLGdCQUFnQjdCLEtBQUs4QixVQUEzQjtBQUNBLFVBQUlELGFBQUosRUFBbUI7QUFDakIsYUFBSyxJQUFJRSxJQUFJLENBQWIsRUFBZ0JBLElBQUkvQixLQUFLOEIsVUFBTCxDQUFnQkUsTUFBcEMsRUFBNENELEdBQTVDLEVBQWlEO0FBQy9DLGNBQU1FLFFBQVFqQyxLQUFLOEIsVUFBTCxDQUFnQkMsQ0FBaEIsQ0FBZDtBQUNBRSxnQkFBTUMsUUFBTixHQUFpQixLQUFLeEUsWUFBTCxDQUFrQnVFLE1BQU1FLE9BQU4sQ0FBY0MsZUFBaEMsRUFBaURILE1BQU1FLE9BQU4sQ0FBY0UsZ0JBQS9ELENBQWpCO0FBQ0Q7O0FBRUQ7QUFDQXJDLGFBQUs4QixVQUFMLENBQWdCUSxJQUFoQixDQUFxQixVQUFDQyxDQUFELEVBQUlDLENBQUosRUFBVTtBQUM3QixpQkFBT0QsRUFBRUwsUUFBRixHQUFhTSxFQUFFTixRQUFmLEdBQTBCLENBQTFCLEdBQThCLENBQUMsQ0FBdEM7QUFDRCxTQUZEO0FBR0Q7QUFDRCxXQUFLTyxXQUFMLENBQWlCekMsSUFBakI7QUFDQVksUUFBRSxLQUFLQyxPQUFQLEVBQWdCNkIsV0FBaEIsQ0FBNEIsY0FBNUI7QUFDRCxLQS9JeUc7QUFnSjFHRCxpQkFBYSxTQUFTQSxXQUFULENBQXFCRSxLQUFyQixFQUE0QjtBQUN2QyxVQUFNM0MsT0FBTzJDLEtBQWI7QUFDQSxVQUFJLENBQUMsS0FBSzNDLElBQVYsRUFBZ0I7QUFDZCxhQUFLNEMsR0FBTCxDQUFTLGFBQVQsRUFBd0IsRUFBeEI7QUFDRDs7QUFFRCxXQUFLNUMsSUFBTCxHQUFZQSxJQUFaOztBQUVBLFVBQUksS0FBS0EsSUFBTCxDQUFVNkMsYUFBVixLQUE0QixDQUFoQyxFQUFtQztBQUNqQyxhQUFLRCxHQUFMLENBQVMsYUFBVCxFQUF3QixLQUFLRSxjQUFMLENBQW9CQyxLQUFwQixDQUEwQixJQUExQixDQUF4QjtBQUNELE9BRkQsTUFFTyxJQUFJL0MsS0FBSzhCLFVBQVQsRUFBcUI7QUFDMUIsWUFBTWtCLFVBQVVDLFNBQVNDLHNCQUFULEVBQWhCO0FBQ0EsYUFBSyxJQUFJbkIsSUFBSSxDQUFiLEVBQWdCQSxJQUFJL0IsS0FBSzhCLFVBQUwsQ0FBZ0JFLE1BQXBDLEVBQTRDRCxHQUE1QyxFQUFpRDtBQUMvQyxjQUFNRSxRQUFRakMsS0FBSzhCLFVBQUwsQ0FBZ0JDLENBQWhCLENBQWQ7QUFDQUUsZ0JBQU1rQixXQUFOLEdBQW9CbEIsTUFBTWtCLFdBQU4sSUFBcUJuRCxLQUFLbUQsV0FBOUM7QUFDQSxlQUFLQyxPQUFMLENBQWFuQixNQUFNb0IsSUFBbkIsSUFBMkJwQixLQUEzQjtBQUNBLGNBQU1xQixVQUFVMUMsRUFBRSxLQUFLMkMsV0FBTCxDQUFpQlIsS0FBakIsQ0FBdUJkLEtBQXZCLEVBQThCLElBQTlCLENBQUYsRUFBdUN1QixHQUF2QyxDQUEyQyxDQUEzQyxDQUFoQjtBQUNBUixrQkFBUVMsV0FBUixDQUFvQkgsT0FBcEI7QUFDQSxlQUFLSSxrQkFBTCxDQUF3QnpCLEtBQXhCLEVBQStCcUIsT0FBL0I7QUFDQSxjQUFJLEtBQUtoRSxZQUFMLENBQWtCMEMsTUFBbEIsR0FBMkIsQ0FBL0IsRUFBa0M7QUFDaEMsaUJBQUsyQixxQkFBTCxDQUEyQjFCLEtBQTNCLEVBQWtDcUIsT0FBbEMsRUFBMkN0RCxJQUEzQztBQUNEO0FBQ0Y7O0FBRUQsWUFBSWdELFFBQVFZLFVBQVIsQ0FBbUI1QixNQUFuQixHQUE0QixDQUFoQyxFQUFtQztBQUNqQ3BCLFlBQUUsS0FBS2lELFdBQVAsRUFBb0JDLE1BQXBCLENBQTJCZCxPQUEzQjtBQUNEO0FBQ0Y7O0FBRUQsVUFBSSxPQUFPLEtBQUtoRCxJQUFMLENBQVU2QyxhQUFqQixLQUFtQyxXQUF2QyxFQUFvRDtBQUNsRCxZQUFNa0IsWUFBWSxLQUFLL0QsSUFBTCxDQUFVNkMsYUFBVixJQUEyQixLQUFLN0MsSUFBTCxDQUFVQyxXQUFWLEdBQXdCLEtBQUtELElBQUwsQ0FBVUUsYUFBbEMsR0FBa0QsQ0FBN0UsQ0FBbEI7QUFDQSxhQUFLMEMsR0FBTCxDQUFTLGtCQUFULEVBQTZCLGlCQUFPb0IsVUFBUCxDQUFrQixLQUFLQyxhQUF2QixFQUFzQyxDQUFDRixTQUFELENBQXRDLENBQTdCO0FBQ0Q7O0FBRURuRCxRQUFFLEtBQUtDLE9BQVAsRUFBZ0JxRCxXQUFoQixDQUE0QixlQUE1QixFQUE2QyxLQUFLQyxXQUFMLEVBQTdDOztBQUVBLFVBQUksS0FBS0MsT0FBTCxDQUFhQyxtQkFBakIsRUFBc0M7QUFDcEN6RCxVQUFFLEtBQUtDLE9BQVAsRUFBZ0JDLFFBQWhCLENBQXlCLG9CQUF6QjtBQUNEOztBQUVELFdBQUt3RCx1QkFBTDtBQUNELEtBekx5RztBQTBMMUdDLHNCQUFrQixTQUFTQSxnQkFBVCxDQUEwQkMsYUFBMUIsRUFBeUM7QUFDekRoSCxVQUFJaUgsS0FBSixDQUFVQyxHQUFWLENBQWMsRUFBRUMsT0FBTyxLQUFLbkksd0JBQWQsRUFBd0NvSSxTQUFTSixjQUFjSSxPQUEvRCxFQUFkO0FBQ0FoRSxRQUFFLEtBQUtDLE9BQVAsRUFBZ0I2QixXQUFoQixDQUE0QixjQUE1QjtBQUNBLFdBQUtFLEdBQUwsQ0FBUyxhQUFULEVBQXdCLEVBQXhCO0FBQ0EsNkJBQWFpQyxjQUFiLENBQTRCLG9CQUE1QixFQUFrREwsY0FBY0ksT0FBaEU7QUFDRCxLQS9MeUc7QUFnTTFHRSx5QkFBcUIsU0FBU0EsbUJBQVQsQ0FBNkJDLFFBQTdCLEVBQXVDO0FBQzFELFdBQUs5RyxHQUFMLEdBQVc4RyxTQUFTQyxNQUFULENBQWdCQyxRQUEzQjtBQUNBLFdBQUsvRyxHQUFMLEdBQVc2RyxTQUFTQyxNQUFULENBQWdCRSxTQUEzQjtBQUNBLFdBQUt4RSxXQUFMO0FBQ0QsS0FwTXlHO0FBcU0xRzBELGFBQVMsRUFyTWlHO0FBc00xRztBQUNBZSx3QkFBb0IsU0FBU0Esa0JBQVQsQ0FBNEJmLE9BQTVCLEVBQXFDO0FBQ3ZELFVBQUksQ0FBQ0EsT0FBTCxFQUFjO0FBQUU7QUFDZCxhQUFLbkcsR0FBTCxHQUFXLElBQVg7QUFDQSxhQUFLQyxHQUFMLEdBQVcsSUFBWDtBQUNBLGFBQUtrRyxPQUFMLENBQWFPLEtBQWIsR0FBcUIsS0FBS3hJLGtCQUExQjtBQUNEO0FBQ0QsYUFBTyxJQUFQO0FBQ0QsS0E5TXlHO0FBK00xR2lKLHNCQUFrQixTQUFTQSxnQkFBVCxHQUE0QjtBQUM1QyxhQUFPLEtBQUtDLEtBQUwsS0FBZSxLQUFLQSxLQUFMLEdBQWE7QUFDakNDLGNBQU07QUFEMkIsT0FBNUIsQ0FBUDtBQUdELEtBbk55RztBQW9OMUdDLFVBQU0sU0FBU0EsSUFBVCxHQUFnQjtBQUNwQixXQUFLQyxPQUFMO0FBQ0EsV0FBS0MsWUFBTDtBQUNBLFdBQUtDLE9BQUwsR0FBZXpDLFNBQVMwQyxjQUFULENBQXdCLFdBQXhCLENBQWY7QUFDQSxXQUFLQyxTQUFMLENBQWVMLElBQWYsRUFBcUJNLFNBQXJCO0FBQ0QsS0F6TnlHO0FBME4xR2xGLHNCQUFrQixTQUFTQSxnQkFBVCxHQUE0QjtBQUM1QyxXQUFLbUYsV0FBTCxHQUFtQjdDLFNBQVMwQyxjQUFULENBQXdCLFdBQXhCLENBQW5CO0FBQ0EsV0FBS0csV0FBTCxDQUFpQkMsUUFBakIsR0FBNEIsZUFBS3BFLEtBQUwsQ0FBVyxJQUFYLEVBQWlCLHFCQUFqQixDQUE1QixDQUY0QyxDQUV5QjtBQUNyRSxVQUFNbEMsVUFBVSxJQUFJQyxLQUFLQyxLQUFMLENBQVdDLE1BQVgsQ0FBa0JvRyw4QkFBdEIsQ0FBcUR4SSxJQUFJc0MsVUFBSixFQUFyRCxFQUNibUcsZUFEYSxDQUNHLFdBREgsRUFFYkMsZUFGYSxDQUVHLFFBRkgsQ0FBaEI7QUFHQSxVQUFNL0YsTUFBTVYsUUFBUTBHLE1BQVIsRUFBWjtBQUNBaEcsVUFBSUMsY0FBSixDQUFtQlYsS0FBS0MsS0FBTCxDQUFXQyxNQUFYLENBQWtCd0csUUFBbEIsQ0FBMkJDLHFCQUE5QyxFQUFxRSxPQUFyRTtBQUNBbEcsVUFBSW1HLHNCQUFKLENBQTJCLHdCQUEzQjtBQUNBN0csY0FBUThHLGFBQVIsR0FBd0IsSUFBeEI7QUFDQTlHLGNBQVErRyxJQUFSLENBQWE7QUFDWHZGLGlCQUFTLEtBQUt3RixpQkFESDtBQUVYdEYsZUFGVyxxQkFFRDtBQUNSdUYsa0JBQVFDLEtBQVIsQ0FBYyw2QkFBZCxFQURRLENBQ3NDO0FBQy9DLFNBSlU7O0FBS1hwRixlQUFPO0FBTEksT0FBYjtBQU9ELEtBM095RztBQTRPMUdxRix5QkFBcUIsU0FBU0EsbUJBQVQsR0FBK0I7QUFDbEQsV0FBS3RHLFFBQUwsR0FBZ0IsS0FBS3dGLFdBQUwsQ0FBaUJlLEtBQWpDO0FBQ0EsV0FBS0MsS0FBTDtBQUNBLFdBQUtwRyxXQUFMO0FBQ0QsS0FoUHlHO0FBaVAxRytGLHVCQUFtQixTQUFTQSxpQkFBVCxDQUEyQk0sSUFBM0IsRUFBaUM7QUFDbEQsVUFBSSxLQUFLakIsV0FBTCxDQUFpQjFCLE9BQWpCLElBQTRCLEtBQUswQixXQUFMLENBQWlCMUIsT0FBakIsQ0FBeUJwQyxNQUF6QixHQUFrQyxDQUFsRSxFQUFxRTtBQUNuRTtBQUNEOztBQUVELFdBQUssSUFBSUQsSUFBSSxDQUFiLEVBQWdCQSxJQUFJZ0YsS0FBS2pGLFVBQUwsQ0FBZ0JFLE1BQXBDLEVBQTRDRCxHQUE1QyxFQUFpRDtBQUMvQyxhQUFLK0QsV0FBTCxDQUFpQjFCLE9BQWpCLENBQXlCckMsQ0FBekIsSUFBOEIsSUFBSWlGLE1BQUosQ0FBV0QsS0FBS2pGLFVBQUwsQ0FBZ0JDLENBQWhCLEVBQW1Ca0YsSUFBOUIsRUFBb0NGLEtBQUtqRixVQUFMLENBQWdCQyxDQUFoQixFQUFtQmtGLElBQXZELEVBQTZELElBQTdELEVBQW1FLEtBQW5FLENBQTlCO0FBQ0EsWUFBSSxLQUFLbkIsV0FBTCxDQUFpQjFCLE9BQWpCLENBQXlCckMsQ0FBekIsRUFBNEI4RSxLQUE1QixLQUFzQyxVQUExQyxFQUFzRDtBQUNwRCxlQUFLZixXQUFMLENBQWlCMUIsT0FBakIsQ0FBeUJyQyxDQUF6QixFQUE0Qm1GLFFBQTVCLEdBQXVDLE1BQXZDO0FBQ0Q7QUFDRjtBQUNGLEtBNVB5RztBQTZQMUdDLHVCQUFtQixTQUFTQSxpQkFBVCxDQUEyQkMsR0FBM0IsRUFBZ0M7QUFDakQsb0NBQTRCLEtBQUtDLGlCQUFMLENBQXVCRCxHQUF2QixDQUE1QjtBQUNELEtBL1B5RztBQWdRMUdFLHdCQUFvQixTQUFTQSxrQkFBVCxHQUE4QjtBQUNoRCxhQUFPLEtBQUtDLE9BQUwsS0FBaUIsS0FBS0EsT0FBTCxHQUFlLENBQUM7QUFDdEM1SSxZQUFJLFVBRGtDO0FBRXRDNkksYUFBSyxPQUZpQztBQUd0Q0MsZUFBTyxLQUFLbEwsa0JBSDBCO0FBSXRDbUwsaUJBQVMsaUJBQU9DLFdBQVAsQ0FBbUJDLFlBQW5CLENBQWdDLElBQWhDLEVBQXNDLFdBQXRDLENBSjZCO0FBS3RDQyxZQUFJLGlCQUFPQyxTQUFQLENBQWlCRixZQUFqQixDQUE4QixJQUE5QixFQUFvQyxXQUFwQztBQUxrQyxPQUFELEVBTXBDO0FBQ0RqSixZQUFJLFNBREg7QUFFRDZJLGFBQUssTUFGSjtBQUdEQyxlQUFPLEtBQUtuTCxpQkFIWDtBQUlEdUwsWUFBSSxpQkFBT0UsT0FBUCxDQUFlSCxZQUFmLENBQTRCLElBQTVCO0FBSkgsT0FOb0MsRUFXcEM7QUFDRGpKLFlBQUksYUFESDtBQUVENkksYUFBSyxVQUZKO0FBR0RDLGVBQU8sS0FBS3JMLHFCQUhYO0FBSUR5TCxZQUFJLGlCQUFPRyxXQUFQLENBQW1CSixZQUFuQixDQUFnQyxJQUFoQztBQUpILE9BWG9DLEVBZ0JwQztBQUNEakosWUFBSSxlQURIO0FBRUQ2SSxhQUFLLFFBRko7QUFHREMsZUFBTyxLQUFLcEwsdUJBSFg7QUFJRHdMLFlBQUksaUJBQU9JLGFBQVAsQ0FBcUJMLFlBQXJCLENBQWtDLElBQWxDO0FBSkgsT0FoQm9DLENBQWhDLENBQVA7QUFzQkQsS0F2UnlHO0FBd1IxR00sY0FBVSxTQUFTQSxRQUFULENBQWtCQyxNQUFsQixFQUEwQjtBQUNsQyxXQUFLQyxrQkFBTCxDQUF3QixVQUFDN0YsQ0FBRCxFQUFPO0FBQzdCLGVBQU9BLEVBQUU1RCxFQUFGLEtBQVMsVUFBaEI7QUFDRCxPQUZELEVBRUd3SixPQUFPRSxHQUZWO0FBR0Q7QUE1UnlHLEdBQTVGLENBQWhCOztvQkErUmVuTSxPIiwiZmlsZSI6IkFjY291bnRQeFNlYXJjaC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBzdHJpbmcgZnJvbSAnZG9qby9zdHJpbmcnO1xyXG5pbXBvcnQgYWN0aW9uIGZyb20gJ01vYmlsZS9TYWxlc0xvZ2l4L0FjdGlvbic7XHJcbmltcG9ydCBTZWFyY2hXaWRnZXQgZnJvbSAnU2FnZS9QbGF0Zm9ybS9Nb2JpbGUvU2VhcmNoV2lkZ2V0JztcclxuaW1wb3J0IHV0aWxpdHkgZnJvbSAnYXJnb3MvVXRpbGl0eSc7XHJcbmltcG9ydCBMaXN0IGZyb20gJ2FyZ29zL0xpc3QnO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJy4uLy4uLy4uLy4uL0Zvcm1hdCc7XHJcbmltcG9ydCBfTGVnYWN5TGlzdEJhc2UgZnJvbSAnYXJnb3MvX0xlZ2FjeVNEYXRhTGlzdE1peGluJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5pbXBvcnQgRXJyb3JNYW5hZ2VyIGZyb20gJ2FyZ29zL0Vycm9yTWFuYWdlcic7XHJcblxyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYWNjdFB4U2VhcmNoJyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5Db250b3VyLlZpZXdzLlB4U2VhcmNoLkFjY291bnRQeFNlYXJjaCcsIFtMaXN0LCBfTGVnYWN5TGlzdEJhc2VdLCB7XHJcbiAgLy8gTG9jYWxpemF0aW9uIHN0cmluZ3NcclxuICBhY2NvdW50c05lYXJNZVRleHQ6IHJlc291cmNlLmFjY291bnRzTmVhck1lVGV4dCxcclxuICBhZGRBY3Rpdml0eUFjdGlvblRleHQ6IHJlc291cmNlLmFkZEFjdGl2aXR5QWN0aW9uVGV4dCxcclxuICBhZGRBdHRhY2htZW50QWN0aW9uVGV4dDogcmVzb3VyY2UuYWRkQXR0YWNobWVudEFjdGlvblRleHQsXHJcbiAgYWRkTm90ZUFjdGlvblRleHQ6IHJlc291cmNlLmFkZE5vdGVBY3Rpb25UZXh0LFxyXG4gIGNhbGxNYWluQWN0aW9uVGV4dDogcmVzb3VyY2UuY2FsbE1haW5BY3Rpb25UZXh0LFxyXG4gIGN1cnJlbnRMb2NhdGlvbkVycm9yVGV4dDogcmVzb3VyY2UuY3VycmVudExvY2F0aW9uRXJyb3JUZXh0LFxyXG4gIGVkaXRBY3Rpb25UZXh0OiByZXNvdXJjZS5lZGl0QWN0aW9uVGV4dCxcclxuICBmYXhBYmJyZXZpYXRpb25UZXh0OiByZXNvdXJjZS5mYXhBYmJyZXZpYXRpb25UZXh0LFxyXG4gIGtpbG9tZXRlckFiYnJldlRleHQ6IHJlc291cmNlLmtpbG9tZXRlckFiYnJldlRleHQsXHJcbiAgbWlsZUFiYnJldlRleHQ6IHJlc291cmNlLm1pbGVBYmJyZXZUZXh0LFxyXG4gIHBob25lQWJicmV2aWF0aW9uVGV4dDogcmVzb3VyY2UucGhvbmVBYmJyZXZpYXRpb25UZXh0LFxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIHZpZXdDb250YWN0c0FjdGlvblRleHQ6IHJlc291cmNlLnZpZXdDb250YWN0c0FjdGlvblRleHQsXHJcbiAgYWNjb3VudFR5cGVUZXh0OiByZXNvdXJjZS5hY2NvdW50VHlwZVRleHQsXHJcblxyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIGl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8cCBjbGFzcz1cImxpc3R2aWV3LWhlYWRpbmdcIj57JTogJC5BY2NvdW50TmFtZSAlfTwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPnslOiB0aGlzLmZvcm1hdERlY2ltYWwoJC5EaXN0YW5jZSkgJX0geyU6IHRoaXMuZGlzdGFuY2VUZXh0KCkgJX08L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj4nLFxyXG4gICAgJ3slOiAkJC5qb2luRmllbGRzKFwiIHwgXCIsIFskLlR5cGUsICQuU3ViVHlwZV0pICV9JyxcclxuICAgICc8L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj57JTogJC5BY2NvdW50TWFuYWdlciAmJiAkLkFjY291bnRNYW5hZ2VyLlVzZXJJbmZvID8gJC5BY2NvdW50TWFuYWdlci5Vc2VySW5mby5Vc2VyTmFtZSA6IFwiXCIgJX0gfCB7JTogJC5Pd25lci5Pd25lckRlc2NyaXB0aW9uICV9PC9wPicsXHJcbiAgICAneyUgaWYgKCQuTWFpblBob25lKSB7ICV9JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj4nLFxyXG4gICAgJ3slOiAkJC5waG9uZUFiYnJldmlhdGlvblRleHQgJX0gPHNwYW4gY2xhc3M9XCJoeXBlcmxpbmtcIiBkYXRhLWFjdGlvbj1cImNhbGxNYWluXCIgZGF0YS1rZXk9XCJ7JTogJC4ka2V5ICV9XCI+eyU6IGFyZ29zLkZvcm1hdC5waG9uZSgkLk1haW5QaG9uZSkgJX08L3NwYW4+JywgLy8gVE9ETzogQXZvaWQgZ2xvYmFsXHJcbiAgICAnPC9wPicsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgXSksXHJcbiAgaXRlbVJvd0NvbnRlbnRUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGlkPVwidG9wX2l0ZW1faW5kaWNhdG9yc1wiIGNsYXNzPVwibGlzdC1pdGVtLWluZGljYXRvci1jb250ZW50XCI+PC9kaXY+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwibGlzdC1pdGVtLWNvbnRlbnRcIj57JSEgJCQuaXRlbVRlbXBsYXRlICV9PC9kaXY+JyxcclxuICBdKSxcclxuXHJcbiAgLy8gRnVuY3Rpb25zXHJcbiAgZm9ybWF0RGVjaW1hbChuKSB7XHJcbiAgICByZXR1cm4gZm9ybWF0LmZpeGVkTG9jYWxlKG4sIDIpO1xyXG4gIH0sXHJcbiAgZGlzdGFuY2VUZXh0KCkge1xyXG4gICAgcmV0dXJuIEFwcC5pc0N1cnJlbnRSZWdpb25NZXRyaWMoKSA/IHRoaXMua2lsb21ldGVyQWJicmV2VGV4dCA6IHRoaXMubWlsZUFiYnJldlRleHQ7XHJcbiAgfSxcclxuICBkaXN0YW5jZUNhbGMoZ0xhdCwgZ0xvbikge1xyXG4gICAgY29uc3QgY29udiA9IEFwcC5pc0N1cnJlbnRSZWdpb25NZXRyaWMoKSA/IDEuNjA5MzQ0IDogMTtcclxuICAgIHJldHVybiBjb252ICogTWF0aC5zcXJ0KFxyXG4gICAgICBNYXRoLnBvdygoNjkuMSAqIChnTGF0IC0gdGhpcy5sYXQpKSwgMikgK1xyXG4gICAgICBNYXRoLnBvdygoNTMuMCAqIChnTG9uIC0gdGhpcy5sb24pKSwgMilcclxuICAgICk7XHJcbiAgfSxcclxuICBqb2luRmllbGRzOiBmdW5jdGlvbiBqb2luRmllbGRzKHNlcCwgZmllbGRzKSB7XHJcbiAgICByZXR1cm4gdXRpbGl0eS5qb2luRmllbGRzKHNlcCwgZmllbGRzKTtcclxuICB9LFxyXG5cclxuICAvLyBBZGQgYSBzZWFyY2ggdGVtcGxhdGUgZm9yIGFjY291bnQgdHlwZSBkcm9wZG93blxyXG4gIHNlYXJjaFdpZGdldDogbmV3IFNlYXJjaFdpZGdldCh7XHJcbiAgICBjbGFzczogJ2xpc3Qtc2VhcmNoJyxcclxuICAgIHdpZGdldFRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgICAnPGRpdiBjbGFzcz1cInNlYXJjaC13aWRnZXRcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+JywgLy8gaGlkZSB0aGUgc3RvY2sgc2VhcmNoIHN0dWZmXHJcbiAgICAgICc8ZGl2IGNsYXNzPVwidGFibGUtbGF5b3V0XCI+JyxcclxuICAgICAgJzxkaXY+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInF1ZXJ5XCIgY2xhc3M9XCJxdWVyeVwiIGF1dG9jb3JyZWN0PVwib2ZmXCIgYXV0b2NhcGl0YWxpemU9XCJvZmZcIiBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwicXVlcnlOb2RlXCIgZGF0YS1kb2pvLWF0dGFjaC1ldmVudD1cIm9uZm9jdXM6X29uRm9jdXMsb25ibHVyOl9vbkJsdXIsb25rZXlwcmVzczpfb25LZXlQcmVzc1wiIC8+PC9kaXY+JyxcclxuICAgICAgJzxkaXYgY2xhc3M9XCJoYXNCdXR0b25cIj48YnV0dG9uIGNsYXNzPVwiY2xlYXItYnV0dG9uXCIgZGF0YS1kb2pvLWF0dGFjaC1ldmVudD1cIm9uY2xpY2s6IF9vbkNsZWFyQ2xpY2tcIj48L2J1dHRvbj48L2Rpdj4nLFxyXG4gICAgICAnPGRpdiBjbGFzcz1cImhhc0J1dHRvblwiPjxidXR0b24gY2xhc3M9XCJzdWJIZWFkZXJCdXR0b24gc2VhcmNoQnV0dG9uXCIgZGF0YS1kb2pvLWF0dGFjaC1ldmVudD1cImNsaWNrOiBzZWFyY2hcIj57JT0gJC5zZWFyY2hUZXh0ICV9PC9idXR0b24+PC9kaXY+JyxcclxuICAgICAgJzwvZGl2PicsXHJcbiAgICAgICc8bGFiZWwgZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cImxhYmVsTm9kZVwiPnslPSAkLnNlYXJjaFRleHQgJX08L2xhYmVsPicsXHJcbiAgICAgICc8L2Rpdj4nLFxyXG4gICAgICAnPGRpdj4kJC5hY2NvdW50VHlwZVRleHQ8c2VsZWN0IGlkPVwicXVlcnlUeXBlXCIgc3R5bGU9XCJmb250LXNpemU6IDE2cHhcIj48L3NlbGVjdD48L2Rpdj4nLCAvLyBhZGQgb3VyIG93biBzZWFyY2ggc3R1ZmZcclxuICAgIF0pLFxyXG4gIH0pLFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBkZXRhaWxWaWV3OiAnYWNjb3VudF9kZXRhaWwnLFxyXG4gIGl0ZW1JY29uQ2xhc3M6ICdzcHJlYWRzaGVldCcsIC8vIHRvZG86IHJlcGxhY2Ugd2l0aCBhcHByb3ByaWF0ZSBpY29uXHJcbiAgaWQ6ICdweFNlYXJjaF9BY2NvdW50cycsXHJcbiAgc2VjdXJpdHk6ICdDb250b3VyL01hcC9BY2NvdW50JyxcclxuICBlbnRpdHlOYW1lOiAnQWNjb3VudCcsXHJcbiAgYWxsb3dTZWxlY3Rpb246IHRydWUsXHJcbiAgZW5hYmxlQWN0aW9uczogdHJ1ZSxcclxuICBwYWdlU2l6ZTogMTAwLFxyXG4gIG9mZmxpbmVJZHM6IG51bGwsXHJcbiAgcmVzb3VyY2VLaW5kOiAnYWNjb3VudHMnLFxyXG4gIGVuYWJsZVNlYXJjaDogdHJ1ZSxcclxuICBlZGl0VmlldzogJ2FjY291bnRfZWRpdCcsXHJcbiAgZWRpdFNlY3VyaXR5OiAnRW50aXRpZXMvQWNjb3VudC9FZGl0JyxcclxuICByZWxhdGVkVmlld3M6IHt9LFxyXG4gIG1heERpc3RhbmNlOiA1MDAsXHJcblxyXG4gIGxhdDogbnVsbCwgLy8gbGF0aXR1ZGVcclxuICBsb246IG51bGwsIC8vIGxvbmdpdHVkZVxyXG5cclxuICBjcmVhdGVSZXF1ZXN0OiBmdW5jdGlvbiBjcmVhdGVSZXF1ZXN0KCkge1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBTYWdlLlNEYXRhLkNsaWVudC5TRGF0YUJhc2VSZXF1ZXN0KHRoaXMuZ2V0U2VydmljZSgpKTtcclxuICAgIGNvbnN0IHBhZ2VTaXplID0gdGhpcy5wYWdlU2l6ZTtcclxuICAgIGNvbnN0IHN0YXJ0SW5kZXggPSB0aGlzLmZlZWQgJiYgdGhpcy5mZWVkLiRzdGFydEluZGV4ID4gMCAmJiB0aGlzLmZlZWQuJGl0ZW1zUGVyUGFnZSA+IDAgPyB0aGlzLmZlZWQuJHN0YXJ0SW5kZXggKyB0aGlzLmZlZWQuJGl0ZW1zUGVyUGFnZSA6IDE7XHJcbiAgICByZXF1ZXN0LnVyaS5zZXRQYXRoU2VnbWVudCgwLCAnc2x4Jyk7XHJcbiAgICByZXF1ZXN0LnVyaS5zZXRQYXRoU2VnbWVudCgxLCAnZHluYW1pYycpO1xyXG4gICAgcmVxdWVzdC51cmkuc2V0UGF0aFNlZ21lbnQoMiwgJy0nKTtcclxuICAgIHJlcXVlc3QudXJpLnNldFBhdGhTZWdtZW50KDMsICdhY2NvdW50cycpO1xyXG4gICAgcmVxdWVzdC51cmkuc2V0UXVlcnlBcmcoJ2Zvcm1hdCcsICdKU09OJyk7XHJcbiAgICByZXF1ZXN0LnVyaS5zZXRRdWVyeUFyZygnc2VsZWN0JywgJ0FjY291bnROYW1lLEluZHVzdHJ5LFR5cGUsU3ViVHlwZSxBY2NvdW50TWFuYWdlci9Vc2VySW5mby9Vc2VyTmFtZSxBZGRyZXNzL0dlb2NvZGVMYXRpdHVkZSxBZGRyZXNzL0dlb2NvZGVMb25naXR1ZGUsT3duZXIvT3duZXJEZXNjcmlwdGlvbixXZWJBZGRyZXNzLE1haW5QaG9uZSxGYXgnKTtcclxuICAgIHJlcXVlc3QudXJpLnNldFF1ZXJ5QXJnKCd3aGVyZScsIGBUeXBlIGVxIFwiJHt0aGlzLmFjY3RUeXBlID8gdGhpcy5hY2N0VHlwZSA6ICdDdXN0b21lcid9XCIgYW5kICR7dGhpcy5fcmVxdWVzdERpc3RhbmNlQ2FsYygpfWApO1xyXG4gICAgcmVxdWVzdC51cmkuc2V0U3RhcnRJbmRleChzdGFydEluZGV4KTtcclxuICAgIHJlcXVlc3QudXJpLnNldENvdW50KHBhZ2VTaXplKTtcclxuICAgIHJldHVybiByZXF1ZXN0O1xyXG4gIH0sXHJcbiAgX3JlcXVlc3REaXN0YW5jZUNhbGMoKSB7XHJcbiAgICBjb25zdCBjb252ID0gQXBwLmlzQ3VycmVudFJlZ2lvbk1ldHJpYygpID8gMS42MDkzNDQgOiAxO1xyXG4gICAgcmV0dXJuIGAoKCR7Y29udn0gbXVsIHNxcnQoKCgoNjkuMSBtdWwgKEFkZHJlc3MuR2VvY29kZUxhdGl0dWRlLSgke3RoaXMubGF0fSkpKSkgbXVsICg2OS4xIG11bCAoQWRkcmVzcy5HZW9jb2RlTGF0aXR1ZGUtKCR7dGhpcy5sYXR9KSkpKSsoKDUzIG11bCAoQWRkcmVzcy5HZW9jb2RlTG9uZ2l0dWRlLSgke3RoaXMubG9ufSkpKSBtdWwgKDUzIG11bCAoQWRkcmVzcy5HZW9jb2RlTG9uZ2l0dWRlLSgke3RoaXMubG9ufSkpKSkpKSBsdCAke3RoaXMubWF4RGlzdGFuY2V9KWA7XHJcbiAgfSxcclxuICByZXF1ZXN0RGF0YTogZnVuY3Rpb24gcmVxdWVzdERhdGEoKSB7XHJcbiAgICB0aGlzLmxvYWRBY2NvdW50VHlwZXMoKTtcclxuICAgICQodGhpcy5kb21Ob2RlKS5hZGRDbGFzcygnbGlzdC1sb2FkaW5nJyk7XHJcblxyXG4gICAgaWYgKHRoaXMubGF0ICYmIHRoaXMubG9uKSB7XHJcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSB0aGlzLmNyZWF0ZVJlcXVlc3QoKTtcclxuICAgICAgcmVxdWVzdC5zZXJ2aWNlLnJlYWRGZWVkKHJlcXVlc3QsIHtcclxuICAgICAgICBzdWNjZXNzOiB0aGlzLm9uUmVxdWVzdERhdGFTdWNjZXNzLFxyXG4gICAgICAgIGZhaWx1cmU6IHRoaXMub25SZXF1ZXN0RGF0YUZhaWx1cmUsXHJcbiAgICAgICAgYWJvcnRlZDogdGhpcy5vblJlcXVlc3REYXRhQWJvcnRlZCxcclxuICAgICAgICBzY29wZTogdGhpcyxcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKGxhbmcuaGl0Y2godGhpcywgJ2dlb0xvY2F0aW9uUmVjZWl2ZWQnKSwgbGFuZy5oaXRjaCh0aGlzLCAnZ2VvTG9jYXRpb25FcnJvcicpLCB7XHJcbiAgICAgICAgZW5hYmxlSGlnaEFjY3VyYWN5OiB0cnVlLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIC8vIGN1c3RvbSByZXF1ZXN0IGRhdGEgc3VjY2VzcyBtZXRob2QgdG8gaW5zZXJ0IG91ciBcIm1lXCIgYXQgdGhlIGZyb250XHJcbiAgb25SZXF1ZXN0RGF0YVN1Y2Nlc3M6IGZ1bmN0aW9uIG9uUmVxdWVzdERhdGFTdWNjZXNzKGZlZWQpIHtcclxuICAgIGNvbnN0IGZlZWRSZXNvdXJjZXMgPSBmZWVkLiRyZXNvdXJjZXM7XHJcbiAgICBpZiAoZmVlZFJlc291cmNlcykge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZlZWQuJHJlc291cmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGVudHJ5ID0gZmVlZC4kcmVzb3VyY2VzW2ldO1xyXG4gICAgICAgIGVudHJ5LkRpc3RhbmNlID0gdGhpcy5kaXN0YW5jZUNhbGMoZW50cnkuQWRkcmVzcy5HZW9jb2RlTGF0aXR1ZGUsIGVudHJ5LkFkZHJlc3MuR2VvY29kZUxvbmdpdHVkZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFNvcnQgYnkgZGlzdGFuY2UgQVNDXHJcbiAgICAgIGZlZWQuJHJlc291cmNlcy5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGEuRGlzdGFuY2UgPiBiLkRpc3RhbmNlID8gMSA6IC0xO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHRoaXMucHJvY2Vzc0ZlZWQoZmVlZCk7XHJcbiAgICAkKHRoaXMuZG9tTm9kZSkucmVtb3ZlQ2xhc3MoJ2xpc3QtbG9hZGluZycpO1xyXG4gIH0sXHJcbiAgcHJvY2Vzc0ZlZWQ6IGZ1bmN0aW9uIHByb2Nlc3NGZWVkKF9mZWVkKSB7XHJcbiAgICBjb25zdCBmZWVkID0gX2ZlZWQ7XHJcbiAgICBpZiAoIXRoaXMuZmVlZCkge1xyXG4gICAgICB0aGlzLnNldCgnbGlzdENvbnRlbnQnLCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5mZWVkID0gZmVlZDtcclxuXHJcbiAgICBpZiAodGhpcy5mZWVkLiR0b3RhbFJlc3VsdHMgPT09IDApIHtcclxuICAgICAgdGhpcy5zZXQoJ2xpc3RDb250ZW50JywgdGhpcy5ub0RhdGFUZW1wbGF0ZS5hcHBseSh0aGlzKSk7XHJcbiAgICB9IGVsc2UgaWYgKGZlZWQuJHJlc291cmNlcykge1xyXG4gICAgICBjb25zdCBkb2NmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZlZWQuJHJlc291cmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGVudHJ5ID0gZmVlZC4kcmVzb3VyY2VzW2ldO1xyXG4gICAgICAgIGVudHJ5LiRkZXNjcmlwdG9yID0gZW50cnkuJGRlc2NyaXB0b3IgfHwgZmVlZC4kZGVzY3JpcHRvcjtcclxuICAgICAgICB0aGlzLmVudHJpZXNbZW50cnkuJGtleV0gPSBlbnRyeTtcclxuICAgICAgICBjb25zdCByb3dOb2RlID0gJCh0aGlzLnJvd1RlbXBsYXRlLmFwcGx5KGVudHJ5LCB0aGlzKSkuZ2V0KDApO1xyXG4gICAgICAgIGRvY2ZyYWcuYXBwZW5kQ2hpbGQocm93Tm9kZSk7XHJcbiAgICAgICAgdGhpcy5vbkFwcGx5Um93VGVtcGxhdGUoZW50cnksIHJvd05vZGUpO1xyXG4gICAgICAgIGlmICh0aGlzLnJlbGF0ZWRWaWV3cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICB0aGlzLm9uUHJvY2Vzc1JlbGF0ZWRWaWV3cyhlbnRyeSwgcm93Tm9kZSwgZmVlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZG9jZnJhZy5jaGlsZE5vZGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAkKHRoaXMuY29udGVudE5vZGUpLmFwcGVuZChkb2NmcmFnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgdGhpcy5mZWVkLiR0b3RhbFJlc3VsdHMgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGNvbnN0IHJlbWFpbmluZyA9IHRoaXMuZmVlZC4kdG90YWxSZXN1bHRzIC0gKHRoaXMuZmVlZC4kc3RhcnRJbmRleCArIHRoaXMuZmVlZC4kaXRlbXNQZXJQYWdlIC0gMSk7XHJcbiAgICAgIHRoaXMuc2V0KCdyZW1haW5pbmdDb250ZW50Jywgc3RyaW5nLnN1YnN0aXR1dGUodGhpcy5yZW1haW5pbmdUZXh0LCBbcmVtYWluaW5nXSkpO1xyXG4gICAgfVxyXG5cclxuICAgICQodGhpcy5kb21Ob2RlKS50b2dnbGVDbGFzcygnbGlzdC1oYXMtbW9yZScsIHRoaXMuaGFzTW9yZURhdGEoKSk7XHJcblxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hbGxvd0VtcHR5U2VsZWN0aW9uKSB7XHJcbiAgICAgICQodGhpcy5kb21Ob2RlKS5hZGRDbGFzcygnbGlzdC1oYXMtZW1wdHktb3B0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fbG9hZFByZXZpb3VzU2VsZWN0aW9ucygpO1xyXG4gIH0sXHJcbiAgZ2VvTG9jYXRpb25FcnJvcjogZnVuY3Rpb24gZ2VvTG9jYXRpb25FcnJvcihwb3NpdGlvbkVycm9yKSB7XHJcbiAgICBBcHAudG9hc3QuYWRkKHsgdGl0bGU6IHRoaXMuY3VycmVudExvY2F0aW9uRXJyb3JUZXh0LCBtZXNzYWdlOiBwb3NpdGlvbkVycm9yLm1lc3NhZ2UgfSk7XHJcbiAgICAkKHRoaXMuZG9tTm9kZSkucmVtb3ZlQ2xhc3MoJ2xpc3QtbG9hZGluZycpO1xyXG4gICAgdGhpcy5zZXQoJ2xpc3RDb250ZW50JywgJycpO1xyXG4gICAgRXJyb3JNYW5hZ2VyLmFkZFNpbXBsZUVycm9yKCdHZW9sb2NhdGlvbiBlcnJvci4nLCBwb3NpdGlvbkVycm9yLm1lc3NhZ2UpO1xyXG4gIH0sXHJcbiAgZ2VvTG9jYXRpb25SZWNlaXZlZDogZnVuY3Rpb24gZ2VvTG9jYXRpb25SZWNlaXZlZChwb3NpdGlvbikge1xyXG4gICAgdGhpcy5sYXQgPSBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGU7XHJcbiAgICB0aGlzLmxvbiA9IHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGU7XHJcbiAgICB0aGlzLnJlcXVlc3REYXRhKCk7XHJcbiAgfSxcclxuICBvcHRpb25zOiB7fSxcclxuICAvLyBhbHdheXMgcmVmcmVzaFxyXG4gIHJlZnJlc2hSZXF1aXJlZEZvcjogZnVuY3Rpb24gcmVmcmVzaFJlcXVpcmVkRm9yKG9wdGlvbnMpIHtcclxuICAgIGlmICghb3B0aW9ucykgeyAvLyBpZiBubyBvcHRpb25zIHdlcmUgcGFzc2VkIGluLCB0aGVuIHdlIGFyZSBzZWFyY2hpbmcgZnJvbSBhbiBhY2NvdW50XHJcbiAgICAgIHRoaXMubGF0ID0gbnVsbDtcclxuICAgICAgdGhpcy5sb24gPSBudWxsO1xyXG4gICAgICB0aGlzLm9wdGlvbnMudGl0bGUgPSB0aGlzLmFjY291bnRzTmVhck1lVGV4dDtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0sXHJcbiAgY3JlYXRlVG9vbExheW91dDogZnVuY3Rpb24gY3JlYXRlVG9vbExheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLnRvb2xzIHx8ICh0aGlzLnRvb2xzID0ge1xyXG4gICAgICB0YmFyOiBbXSxcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIHRoaXMuc3RhcnR1cCgpO1xyXG4gICAgdGhpcy5pbml0Q29ubmVjdHMoKTtcclxuICAgIHRoaXMudGl0bGVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYWdlVGl0bGUnKTtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGluaXQsIGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBsb2FkQWNjb3VudFR5cGVzOiBmdW5jdGlvbiBsb2FkQWNjb3VudFR5cGVzKCkge1xyXG4gICAgdGhpcy5xdWVyeVR5cGVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdxdWVyeVR5cGUnKTtcclxuICAgIHRoaXMucXVlcnlUeXBlRWwub25jaGFuZ2UgPSBsYW5nLmhpdGNoKHRoaXMsICdvbkFjY291bnRUeXBlQ2hhbmdlJyk7IC8vIHRoaXMuO1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBTYWdlLlNEYXRhLkNsaWVudC5TRGF0YVJlc291cmNlQ29sbGVjdGlvblJlcXVlc3QoQXBwLmdldFNlcnZpY2UoKSlcclxuICAgICAgLnNldFJlc291cmNlS2luZCgncGlja2xpc3RzJylcclxuICAgICAgLnNldENvbnRyYWN0TmFtZSgnc3lzdGVtJyk7XHJcbiAgICBjb25zdCB1cmkgPSByZXF1ZXN0LmdldFVyaSgpO1xyXG4gICAgdXJpLnNldFBhdGhTZWdtZW50KFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhVXJpLlJlc291cmNlUHJvcGVydHlJbmRleCwgJ2l0ZW1zJyk7XHJcbiAgICB1cmkuc2V0Q29sbGVjdGlvblByZWRpY2F0ZSgnbmFtZSBlcSBcIkFjY291bnQgVHlwZVwiJyk7XHJcbiAgICByZXF1ZXN0LmFsbG93Q2FjaGVVc2UgPSB0cnVlO1xyXG4gICAgcmVxdWVzdC5yZWFkKHtcclxuICAgICAgc3VjY2VzczogdGhpcy5vbkFjY291bnRUeXBlTG9hZCxcclxuICAgICAgZmFpbHVyZSgpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdmYWlsZWQgdG8gbG9hZCBhY2NvdW50IHR5cGUnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICB9LFxyXG4gICAgICBzY29wZTogdGhpcyxcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgb25BY2NvdW50VHlwZUNoYW5nZTogZnVuY3Rpb24gb25BY2NvdW50VHlwZUNoYW5nZSgpIHtcclxuICAgIHRoaXMuYWNjdFR5cGUgPSB0aGlzLnF1ZXJ5VHlwZUVsLnZhbHVlO1xyXG4gICAgdGhpcy5jbGVhcigpO1xyXG4gICAgdGhpcy5yZXF1ZXN0RGF0YSgpO1xyXG4gIH0sXHJcbiAgb25BY2NvdW50VHlwZUxvYWQ6IGZ1bmN0aW9uIG9uQWNjb3VudFR5cGVMb2FkKGRhdGEpIHtcclxuICAgIGlmICh0aGlzLnF1ZXJ5VHlwZUVsLm9wdGlvbnMgJiYgdGhpcy5xdWVyeVR5cGVFbC5vcHRpb25zLmxlbmd0aCA+IDApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS4kcmVzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHRoaXMucXVlcnlUeXBlRWwub3B0aW9uc1tpXSA9IG5ldyBPcHRpb24oZGF0YS4kcmVzb3VyY2VzW2ldLnRleHQsIGRhdGEuJHJlc291cmNlc1tpXS50ZXh0LCB0cnVlLCBmYWxzZSk7XHJcbiAgICAgIGlmICh0aGlzLnF1ZXJ5VHlwZUVsLm9wdGlvbnNbaV0udmFsdWUgPT09ICdDdXN0b21lcicpIHtcclxuICAgICAgICB0aGlzLnF1ZXJ5VHlwZUVsLm9wdGlvbnNbaV0uc2VsZWN0ZWQgPSAnVHJ1ZSc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGZvcm1hdFNlYXJjaFF1ZXJ5OiBmdW5jdGlvbiBmb3JtYXRTZWFyY2hRdWVyeShxcnkpIHtcclxuICAgIHJldHVybiBgQWNjb3VudE5hbWUgbGlrZSBcIiR7dGhpcy5lc2NhcGVTZWFyY2hRdWVyeShxcnkpfSVcImA7XHJcbiAgfSxcclxuICBjcmVhdGVBY3Rpb25MYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUFjdGlvbkxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmFjdGlvbnMgfHwgKHRoaXMuYWN0aW9ucyA9IFt7XHJcbiAgICAgIGlkOiAnY2FsbE1haW4nLFxyXG4gICAgICBjbHM6ICdwaG9uZScsXHJcbiAgICAgIGxhYmVsOiB0aGlzLmNhbGxNYWluQWN0aW9uVGV4dCxcclxuICAgICAgZW5hYmxlZDogYWN0aW9uLmhhc1Byb3BlcnR5LmJpbmREZWxlZ2F0ZSh0aGlzLCAnTWFpblBob25lJyksXHJcbiAgICAgIGZuOiBhY3Rpb24uY2FsbFBob25lLmJpbmREZWxlZ2F0ZSh0aGlzLCAnTWFpblBob25lJyksXHJcbiAgICB9LCB7XHJcbiAgICAgIGlkOiAnYWRkTm90ZScsXHJcbiAgICAgIGNsczogJ2VkaXQnLFxyXG4gICAgICBsYWJlbDogdGhpcy5hZGROb3RlQWN0aW9uVGV4dCxcclxuICAgICAgZm46IGFjdGlvbi5hZGROb3RlLmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgIH0sIHtcclxuICAgICAgaWQ6ICdhZGRBY3Rpdml0eScsXHJcbiAgICAgIGNsczogJ2NhbGVuZGFyJyxcclxuICAgICAgbGFiZWw6IHRoaXMuYWRkQWN0aXZpdHlBY3Rpb25UZXh0LFxyXG4gICAgICBmbjogYWN0aW9uLmFkZEFjdGl2aXR5LmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgIH0sIHtcclxuICAgICAgaWQ6ICdhZGRBdHRhY2htZW50JyxcclxuICAgICAgY2xzOiAnYXR0YWNoJyxcclxuICAgICAgbGFiZWw6IHRoaXMuYWRkQXR0YWNobWVudEFjdGlvblRleHQsXHJcbiAgICAgIGZuOiBhY3Rpb24uYWRkQXR0YWNobWVudC5iaW5kRGVsZWdhdGUodGhpcyksXHJcbiAgICB9XSk7XHJcbiAgfSxcclxuICBjYWxsTWFpbjogZnVuY3Rpb24gY2FsbE1haW4ocGFyYW1zKSB7XHJcbiAgICB0aGlzLmludm9rZUFjdGlvbkl0ZW1CeSgoYSkgPT4ge1xyXG4gICAgICByZXR1cm4gYS5pZCA9PT0gJ2NhbGxNYWluJztcclxuICAgIH0sIHBhcmFtcy5rZXkpO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19