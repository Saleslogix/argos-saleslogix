define("crm/Integrations/Contour/Views/PxSearch/AccountPxSearch", ["exports", "dojo/_base/declare", "dojo/_base/lang", "dojo/string", "Mobile/SalesLogix/Action", "Sage/Platform/Mobile/SearchWidget", "argos/Utility", "argos/List", "../../../../Format", "argos/_LegacySDataListMixin", "argos/I18n", "argos/ErrorManager"], function (_exports, _declare, _lang, _string, _Action, _SearchWidget, _Utility, _List, _Format, _LegacySDataListMixin, _I18n, _ErrorManager) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _string = _interopRequireDefault(_string);
  _Action = _interopRequireDefault(_Action);
  _SearchWidget = _interopRequireDefault(_SearchWidget);
  _Utility = _interopRequireDefault(_Utility);
  _List = _interopRequireDefault(_List);
  _Format = _interopRequireDefault(_Format);
  _LegacySDataListMixin = _interopRequireDefault(_LegacySDataListMixin);
  _I18n = _interopRequireDefault(_I18n);
  _ErrorManager = _interopRequireDefault(_ErrorManager);

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
  var resource = (0, _I18n["default"])('acctPxSearch');

  var __class = (0, _declare["default"])('crm.Integrations.Contour.Views.PxSearch.AccountPxSearch', [_List["default"], _LegacySDataListMixin["default"]], {
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
    // Functions
    formatDecimal: function formatDecimal(n) {
      return _Format["default"].fixedLocale(n, 2);
    },
    distanceText: function distanceText() {
      return App.isCurrentRegionMetric() ? this.kilometerAbbrevText : this.mileAbbrevText;
    },
    distanceCalc: function distanceCalc(gLat, gLon) {
      var conv = App.isCurrentRegionMetric() ? 1.609344 : 1;
      return conv * Math.sqrt(Math.pow(69.1 * (gLat - this.lat), 2) + Math.pow(53.0 * (gLon - this.lon), 2));
    },
    joinFields: function joinFields(sep, fields) {
      return _Utility["default"].joinFields(sep, fields);
    },
    // Add a search template for account type dropdown
    searchWidget: new _SearchWidget["default"]({
      "class": 'list-search',
      widgetTemplate: new Simplate(['<div class="search-widget" style="display: none;">', // hide the stock search stuff
      '<div class="table-layout">', '<div><input type="text" name="query" class="query" autocorrect="off" autocapitalize="off" data-dojo-attach-point="queryNode" data-dojo-attach-event="onfocus:_onFocus,onblur:_onBlur,onkeypress:_onKeyPress" /></div>', '<div class="hasButton"><button class="clear-button" data-dojo-attach-event="onclick: _onClearClick"></button></div>', '<div class="hasButton"><button class="subHeaderButton searchButton" data-dojo-attach-event="click: search">{%= $.searchText %}</button></div>', '</div>', '<label data-dojo-attach-point="labelNode">{%= $.searchText %}</label>', '</div>', '<div>$$.accountTypeText<select id="queryType" style="font-size: 16px"></select></div>' // add our own search stuff
      ])
    }),
    // View Properties
    detailView: 'account_detail',
    itemIconClass: 'spreadsheet',
    // todo: replace with appropriate icon
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
    lat: null,
    // latitude
    lon: null,
    // longitude
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
      request.uri.setQueryArg('where', "Type eq \"".concat(this.acctType ? this.acctType : 'Customer', "\" and ").concat(this._requestDistanceCalc()));
      request.uri.setStartIndex(startIndex);
      request.uri.setCount(pageSize);
      return request;
    },
    _requestDistanceCalc: function _requestDistanceCalc() {
      var conv = App.isCurrentRegionMetric() ? 1.609344 : 1;
      return "((".concat(conv, " mul sqrt((((69.1 mul (Address.GeocodeLatitude-(").concat(this.lat, ")))) mul (69.1 mul (Address.GeocodeLatitude-(").concat(this.lat, "))))+((53 mul (Address.GeocodeLongitude-(").concat(this.lon, "))) mul (53 mul (Address.GeocodeLongitude-(").concat(this.lon, ")))))) lt ").concat(this.maxDistance, ")");
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
        navigator.geolocation.getCurrentPosition(_lang["default"].hitch(this, 'geoLocationReceived'), _lang["default"].hitch(this, 'geoLocationError'), {
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
        } // Sort by distance ASC


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
        this.set('remainingContent', _string["default"].substitute(this.remainingText, [remaining]));
      }

      $(this.domNode).toggleClass('list-has-more', this.hasMoreData());

      if (this.options.allowEmptySelection) {
        $(this.domNode).addClass('list-has-empty-opt');
      }

      this._loadPreviousSelections();
    },
    geoLocationError: function geoLocationError(positionError) {
      App.toast.add({
        title: this.currentLocationErrorText,
        message: positionError.message
      });
      $(this.domNode).removeClass('list-loading');
      this.set('listContent', '');

      _ErrorManager["default"].addSimpleError('Geolocation error.', positionError.message);
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
      this.queryTypeEl.onchange = _lang["default"].hitch(this, 'onAccountTypeChange'); // this.;

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
        this.queryTypeEl.options[i] = new Option(data.$resources[i].text, data.$resources[i].code, true, false);

        if (this.queryTypeEl.options[i].value === 'Customer') {
          this.queryTypeEl.options[i].selected = 'True';
        }
      }
    },
    formatSearchQuery: function formatSearchQuery(qry) {
      return "AccountName like \"".concat(this.escapeSearchQuery(qry), "%\"");
    },
    createActionLayout: function createActionLayout() {
      return this.actions || (this.actions = [{
        id: 'callMain',
        cls: 'phone',
        label: this.callMainActionText,
        enabled: _Action["default"].hasProperty.bindDelegate(this, 'MainPhone'),
        fn: _Action["default"].callPhone.bindDelegate(this, 'MainPhone')
      }, {
        id: 'addNote',
        cls: 'edit',
        label: this.addNoteActionText,
        fn: _Action["default"].addNote.bindDelegate(this)
      }, {
        id: 'addActivity',
        cls: 'calendar',
        label: this.addActivityActionText,
        fn: _Action["default"].addActivity.bindDelegate(this)
      }, {
        id: 'addAttachment',
        cls: 'attach',
        label: this.addAttachmentActionText,
        fn: _Action["default"].addAttachment.bindDelegate(this)
      }]);
    },
    callMain: function callMain(params) {
      this.invokeActionItemBy(function (a) {
        return a.id === 'callMain';
      }, params.key);
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});