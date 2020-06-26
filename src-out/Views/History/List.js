function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

define("crm/Views/History/List", ["exports", "dojo/_base/declare", "../../Format", "argos/Convert", "../../Action", "argos/List", "../_RightDrawerListMixin", "../_MetricListMixin", "argos/I18n", "../../Models/Activity/ActivityTypeIcon", "../../Models/Names"], function (_exports, _declare, _Format, _Convert, _Action, _List, _RightDrawerListMixin2, _MetricListMixin2, _I18n, activityTypeIcons, _Names) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _Format = _interopRequireDefault(_Format);
  _Convert = _interopRequireDefault(_Convert);
  _Action = _interopRequireDefault(_Action);
  _List = _interopRequireDefault(_List);
  _RightDrawerListMixin2 = _interopRequireDefault(_RightDrawerListMixin2);
  _MetricListMixin2 = _interopRequireDefault(_MetricListMixin2);
  _I18n = _interopRequireDefault(_I18n);
  activityTypeIcons = _interopRequireWildcard(activityTypeIcons);
  _Names = _interopRequireDefault(_Names);

  function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
  var resource = (0, _I18n["default"])('historyList');
  var activityTypeResource = (0, _I18n["default"])('activityTypeText');
  var hashTagResource = (0, _I18n["default"])('historyListHashTags');
  var dtFormatResource = (0, _I18n["default"])('historyListDateTimeFormat');

  var __class = (0, _declare["default"])('crm.Views.History.List', [_List["default"], _RightDrawerListMixin2["default"], _MetricListMixin2["default"]], {
    format: _Format["default"],
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">', '{% if ($.Type === "atNote") { %}', '{%: $$.formatDate($.ModifyDate) %}', '{% } else { %}', '{%: $$.formatDate($.CompletedDate) %}', '{% } %}', '</p>', '<p class="micro-text">{%= $$.nameTemplate.apply($) %}</p>', '{% if($.Description) { %}', '<p class="micro-text">{%= $$.regardingText + $$.formatPicklist("Description")($.Description) %}</p>', '{% } %}', '<div class="note-text-item">', '<div class="note-text-wrap">', '{%: $.Notes %}', '</div>', '</div>']),
    nameTemplate: new Simplate(['{% if ($.LeadName && $.AccountName) { %}', '{%: $.LeadName %} | {%: $.AccountName %}', '{% } else if ($.LeadName) { %}', '{%: $.LeadName %}', '{% } else if ($.ContactName && $.AccountName) { %}', '{%: $.ContactName %} | {%: $.AccountName %}', '{% } else if ($.ContactName) { %}', '{%: $.ContactName %}', '{% } else { %}', '{%: $.AccountName %}', '{% } %}']),
    // Localization
    hourMinuteFormatText: dtFormatResource.hourMinuteFormatText,
    hourMinuteFormatText24: dtFormatResource.hourMinuteFormatText24,
    dateFormatText: dtFormatResource.dateFormatText,
    titleText: resource.titleText,
    viewAccountActionText: resource.viewAccountActionText,
    viewOpportunityActionText: resource.viewOpportunityActionText,
    viewContactActionText: resource.viewContactActionText,
    addAttachmentActionText: resource.addAttachmentActionText,
    regardingText: resource.regardingText,
    touchedText: resource.touchedText,
    activityTypeText: {
      atToDo: activityTypeResource.atToDoText,
      atPhoneCall: activityTypeResource.atPhoneCallText,
      atAppointment: activityTypeResource.atAppointmentText,
      atLiterature: activityTypeResource.atLiteratureText,
      atPersonal: activityTypeResource.atPersonalText,
      atQuestion: activityTypeResource.atQuestionText,
      atEMail: activityTypeResource.atEMailText,
      atNote: activityTypeResource.atNoteText
    },
    hashTagQueriesText: {
      'my-history': hashTagResource.myHistoryHash,
      note: hashTagResource.noteHash,
      phonecall: hashTagResource.phoneCallHash,
      meeting: hashTagResource.meetingHash,
      personal: hashTagResource.personalHash,
      email: hashTagResource.emailHash
    },
    // View Properties
    detailView: 'history_detail',
    itemIconClass: 'folder',
    id: 'history_list',
    security: null,
    // 'Entities/History/View',
    existsRE: /^[\w]{12}$/,
    insertView: 'history_edit',
    queryOrderBy: null,
    querySelect: [],
    queryWhere: null,
    resourceKind: 'history',
    entityName: 'History',
    hashTagQueries: {
      'my-history': function myHistory() {
        return "UserId eq \"".concat(App.context.user.$key, "\"");
      },
      note: 'Type eq "atNote"',
      phonecall: 'Type eq "atPhoneCall"',
      meeting: 'Type eq "atAppointment"',
      personal: 'Type eq "atPersonal"',
      email: 'Type eq "atEMail"'
    },
    activityTypeIcon: activityTypeIcons["default"],
    allowSelection: true,
    enableActions: true,
    modelName: _Names["default"].HISTORY,
    createActionLayout: function createActionLayout() {
      return this.actions || (this.actions = [{
        id: 'viewAccount',
        label: this.viewAccountActionText,
        enabled: _Action["default"].hasProperty.bindDelegate(this, 'AccountId'),
        fn: _Action["default"].navigateToEntity.bindDelegate(this, {
          view: 'account_detail',
          keyProperty: 'AccountId',
          textProperty: 'AccountName'
        })
      }, {
        id: 'viewOpportunity',
        label: this.viewOpportunityActionText,
        enabled: _Action["default"].hasProperty.bindDelegate(this, 'OpportunityId'),
        fn: _Action["default"].navigateToEntity.bindDelegate(this, {
          view: 'opportunity_detail',
          keyProperty: 'OpportunityId',
          textProperty: 'OpportunityName'
        })
      }, {
        id: 'viewContact',
        label: this.viewContactActionText,
        action: 'navigateToContactOrLead',
        enabled: this.hasContactOrLead
      }, {
        id: 'addAttachment',
        cls: 'attach',
        label: this.addAttachmentActionText,
        fn: _Action["default"].addAttachment.bindDelegate(this)
      }]);
    },
    hasContactOrLead: function hasContactOrLead(theAction, selection) {
      return selection.data.ContactId || selection.data.LeadId;
    },
    navigateToContactOrLead: function navigateToContactOrLead(theAction, selection) {
      var entity = this.resolveContactOrLeadEntity(selection.data);
      var viewId;
      var options;

      switch (entity) {
        case 'Contact':
          viewId = 'contact_detail';
          options = {
            key: selection.data.ContactId,
            descriptor: selection.data.ContactName
          };
          break;

        case 'Lead':
          viewId = 'lead_detail';
          options = {
            key: selection.data.LeadId,
            descriptor: selection.data.LeadName
          };
          break;

        default:
      }

      var view = App.getView(viewId);

      if (view && options) {
        view.show(options);
      }
    },
    resolveContactOrLeadEntity: function resolveContactOrLeadEntity(entry) {
      var exists = this.existsRE;

      if (entry) {
        if (exists.test(entry.LeadId)) {
          return 'Lead';
        }

        if (exists.test(entry.ContactId)) {
          return 'Contact';
        }
      }
    },
    formatDate: function formatDate(date) {
      var startDate = moment(_Convert["default"].toDateFromString(date));
      var nextDate = startDate.clone().add({
        hours: 24
      });
      var fmt = this.dateFormatText;

      if (startDate.valueOf() < nextDate.valueOf() && startDate.valueOf() > moment().startOf('day').valueOf()) {
        fmt = App.is24HourClock() ? this.hourMinuteFormatText24 : this.hourMinuteFormatText;
      }

      return _Format["default"].date(startDate.toDate(), fmt);
    },
    formatPicklist: function formatPicklist(property) {
      return _Format["default"].picklist(this.app.picklistService, this._model, property);
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      return "upper(Description) like \"%".concat(this.escapeSearchQuery(searchQuery.toUpperCase()), "%\"");
    },
    createIndicatorLayout: function createIndicatorLayout() {
      return this.itemIndicators || (this.itemIndicators = [{
        id: 'touched',
        cls: 'flag',
        title: this.touchedText,
        onApply: function onApply(entry, parent) {
          this.isEnabled = parent.hasBeenTouched(entry);
        }
      }]);
    },
    hasBeenTouched: function hasBeenTouched(entry) {
      if (entry.ModifyDate) {
        var modifiedDate = moment(_Convert["default"].toDateFromString(entry.ModifyDate));
        var currentDate = moment().endOf('day');
        var weekAgo = moment().subtract(1, 'weeks');
        return modifiedDate.isAfter(weekAgo) && modifiedDate.isBefore(currentDate);
      }

      return false;
    },
    getItemIconClass: function getItemIconClass(entry) {
      var type = entry && entry.Type;
      return this._getItemIconClass(type);
    },
    getTitle: function getTitle(entry) {
      var type = entry && entry.Type;
      return this.activityTypeText[type] || this.titleText;
    },
    _getItemIconClass: function _getItemIconClass(type) {
      var cls = this.activityTypeIcon[type];

      if (!cls) {
        cls = this.itemIconClass;
      }

      return cls;
    },
    init: function init() {
      this.inherited(init, arguments);
    },
    activateEntry: function activateEntry(params) {
      var entry = this.entries[params.key];

      if (entry) {
        var activityParams = params;
        activityParams.descriptor = this.getTitle(entry);
        this.inherited(arguments, [activityParams]);
      } else {
        this.inherited(activateEntry, arguments);
      }
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});