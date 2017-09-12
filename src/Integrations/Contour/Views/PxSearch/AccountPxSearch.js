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
import action from 'Mobile/SalesLogix/Action';
import SearchWidget from 'Sage/Platform/Mobile/SearchWidget';
import utility from 'argos/Utility';
import List from 'argos/List';
import _LegacyListBase from 'argos/_LegacySDataListMixin';
import getResource from 'argos/I18n';


const resource = getResource('acctPxSearch');

const __class = declare('crm.Integrations.Contour.Views.PxSearch.AccountPxSearch', [List, _LegacyListBase], {
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
  itemTemplate: new Simplate([
    '<p class="listview-heading">{%: $.AccountName %}</p>',
    '<p class="micro-text">{%: this.formatDecimal($.Distance) %} {%: this.distanceText() %}</p>',
    '<p class="micro-text">',
    '{%: $$.joinFields(" | ", [$.Type, $.SubType]) %}',
    '</p>',
    '<p class="micro-text">{%: $.AccountManager && $.AccountManager.UserInfo ? $.AccountManager.UserInfo.UserName : "" %} | {%: $.Owner.OwnerDescription %}</p>',
    '{% if ($.MainPhone) { %}',
    '<p class="micro-text">',
    '{%: $$.phoneAbbreviationText %} <span class="hyperlink" data-action="callMain" data-key="{%: $.$key %}">{%: argos.Format.phone($.MainPhone) %}</span>', // TODO: Avoid global
    '</p>',
    '{% } %}',
  ]),
  itemRowContentTemplate: new Simplate([
    '<div id="top_item_indicators" class="list-item-indicator-content"></div>',
    '<div class="list-item-content">{%! $$.itemTemplate %}</div>',
  ]),

  // Functions
  formatDecimal(n) {
    return Math.round(n * 100) / 100;
  },
  distanceText() {
    return (App.isRegionMetric) ? this.kilometerAbbrevText : this.mileAbbrevText;
  },
  distanceCalc(gLat, gLon) {
    const conv = (App.isRegionMetric) ? 1.609344 : 1;
    return conv * Math.sqrt(
      Math.pow((69.1 * (gLat - this.lat)), 2) +
      Math.pow((53.0 * (gLon - this.lon)), 2)
    );
  },
  joinFields: function joinFields(sep, fields) {
    return utility.joinFields(sep, fields);
  },

  // Add a search template for account type dropdown
  searchWidget: new SearchWidget({
    class: 'list-search',
    widgetTemplate: new Simplate([
      '<div class="search-widget" style="display: none;">', // hide the stock search stuff
      '<div class="table-layout">',
      '<div><input type="text" name="query" class="query" autocorrect="off" autocapitalize="off" data-dojo-attach-point="queryNode" data-dojo-attach-event="onfocus:_onFocus,onblur:_onBlur,onkeypress:_onKeyPress" /></div>',
      '<div class="hasButton"><button class="clear-button" data-dojo-attach-event="onclick: _onClearClick"></button></div>',
      '<div class="hasButton"><button class="subHeaderButton searchButton" data-dojo-attach-event="click: search">{%= $.searchText %}</button></div>',
      '</div>',
      '<label data-dojo-attach-point="labelNode">{%= $.searchText %}</label>',
      '</div>',
      '<div>$$.accountTypeText<select id="queryType" style="font-size: 16px"></select></div>', // add our own search stuff
    ]),
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

  createRequest() {
    const request = new Sage.SData.Client.SDataBaseRequest(this.getService());
    request.uri.setPathSegment(0, 'slx');
    request.uri.setPathSegment(1, 'dynamic');
    request.uri.setPathSegment(2, '-');
    request.uri.setPathSegment(3, 'accounts');
    request.uri.setQueryArg('format', 'JSON');
    request.uri.setQueryArg('select', 'AccountName,Industry,Type,SubType,AccountManager/UserInfo/UserName,Address/GeocodeLatitude,Address/GeocodeLongitude,Owner/OwnerDescription,WebAddress,MainPhone,Fax');
    request.uri.setQueryArg('where', `Type eq "${this.acctType ? this.acctType : 'Customer'}" and ${this._requestDistanceCalc()}`);
    return request;
  },
  _requestDistanceCalc() {
    const conv = (App.isRegionMetric) ? 1.609344 : 1;
    return `((${conv} mul sqrt((((69.1 mul (Address.GeocodeLatitude-(${this.lat})))) mul (69.1 mul (Address.GeocodeLatitude-(${this.lat}))))+((53 mul (Address.GeocodeLongitude-(${this.lon}))) mul (53 mul (Address.GeocodeLongitude-(${this.lon})))))) lt ${this.maxDistance})`;
  },
  requestData() {
    this.loadAccountTypes();
    $(this.domNode).addClass('list-loading');

    if (this.lat && this.lon) {
      const request = this.createRequest();
      request.service.readFeed(request, {
        success: this.onRequestDataSuccess,
        failure: this.onRequestDataFailure,
        aborted: this.onRequestDataAborted,
        scope: this,
      });
    } else {
      navigator.geolocation.getCurrentPosition(lang.hitch(this, 'geoLocationReceived'), lang.hitch(this, 'geoLocationError'), {
        enableHighAccuracy: true,
      });
    }
  },
  // custom request data success method to insert our "me" at the front
  onRequestDataSuccess(feed) {
    const feedResources = feed.$resources;
    if (feedResources) {
      for (let i = 0; i < feed.$resources.length; i++) {
        const entry = feed.$resources[i];
        entry.Distance = this.distanceCalc(entry.Address.GeocodeLatitude, entry.Address.GeocodeLongitude);
      }

      // Sort by distance ASC
      feed.$resources.sort((a, b) => {
        return a.Distance > b.Distance ? 1 : -1;
      });
    }
    this.processFeed(feed);
    $(this.domNode).removeClass('list-loading');
  },
  processFeed: function processFeed(_feed) {
    const feed = _feed;
    if (!this.feed) {
      this.set('listContent', '');
    }

    this.feed = feed;

    if (this.feed.$totalResults === 0) {
      this.set('listContent', this.noDataTemplate.apply(this));
    } else if (feed.$resources) {
      const docfrag = document.createDocumentFragment();
      for (let i = 0; i < feed.$resources.length; i++) {
        const entry = feed.$resources[i];
        entry.$descriptor = entry.$descriptor || feed.$descriptor;
        this.entries[entry.$key] = entry;
        const rowNode = $(this.rowTemplate.apply(entry, this)).get(0);
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
  },
  geoLocationError() {
    alert(this.currentLocationErrorText); // eslint-disable-line
    $(this.domNode).removeClass('list-loading');
  },
  geoLocationReceived(position) {
    this.lat = position.coords.latitude;
    this.lon = position.coords.longitude;
    this.requestData();
  },
  // only want the top 100 records
  hasMoreData() {
    return false;
  },
  options: {},
  // always refresh
  refreshRequiredFor(options) {
    if (!options) { // if no options were passed in, then we are searching from an account
      this.lat = null;
      this.lon = null;
      this.options.title = this.accountsNearMeText;
    }
    return true;
  },
  createToolLayout() {
    return this.tools || (this.tools = {
      tbar: [],
    });
  },
  init() {
    this.startup();
    this.initConnects();
    this.titleEl = document.getElementById('pageTitle');
    this.inherited(arguments);
  },
  loadAccountTypes() {
    this.queryTypeEl = document.getElementById('queryType');
    this.queryTypeEl.onchange = lang.hitch(this, 'onAccountTypeChange'); // this.;
    const request = new Sage.SData.Client.SDataResourceCollectionRequest(App.getService())
      .setResourceKind('picklists')
      .setContractName('system');
    const uri = request.getUri();
    uri.setPathSegment(Sage.SData.Client.SDataUri.ResourcePropertyIndex, 'items');
    uri.setCollectionPredicate('name eq "Account Type"');
    request.allowCacheUse = true;
    request.read({
      success: this.onAccountTypeLoad,
      failure() {
        console.error('failed to load account type'); // eslint-disable-line
      },
      scope: this,
    });
  },
  onAccountTypeChange() {
    this.acctType = this.queryTypeEl.value;
    this.clear();
    this.requestData();
  },
  onAccountTypeLoad(data) {
    if (this.queryTypeEl.options && this.queryTypeEl.options.length > 0) {
      return;
    }

    for (let i = 0; i < data.$resources.length; i++) {
      this.queryTypeEl.options[i] = new Option(data.$resources[i].text, data.$resources[i].text, true, false);
      if (this.queryTypeEl.options[i].value === 'Customer') {
        this.queryTypeEl.options[i].selected = 'True';
      }
    }
  },
  formatSearchQuery(qry) {
    return `AccountName like "${this.escapeSearchQuery(qry)}%"`;
  },
  createActionLayout: function createActionLayout() {
    return this.actions || (this.actions = [{
      id: 'callMain',
      cls: 'phone',
      label: this.callMainActionText,
      enabled: action.hasProperty.bindDelegate(this, 'MainPhone'),
      fn: action.callPhone.bindDelegate(this, 'MainPhone'),
    }, {
      id: 'addNote',
      cls: 'edit',
      label: this.addNoteActionText,
      fn: action.addNote.bindDelegate(this),
    }, {
      id: 'addActivity',
      cls: 'calendar',
      label: this.addActivityActionText,
      fn: action.addActivity.bindDelegate(this),
    }, {
      id: 'addAttachment',
      cls: 'attach',
      label: this.addAttachmentActionText,
      fn: action.addAttachment.bindDelegate(this),
    }]);
  },
  callMain: function callMain(params) {
    this.invokeActionItemBy((a) => {
      return a.id === 'callMain';
    }, params.key);
  },
});

export default __class;
