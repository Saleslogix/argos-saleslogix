define('crm/Views/History/List', ['module', 'exports', 'dojo/_base/declare', '../../Format', 'argos/Convert', '../../Action', 'argos/List', '../_RightDrawerListMixin', '../_MetricListMixin', 'argos/I18n', '../../Models/Activity/ActivityTypeIcon', '../../Models/Names'], function (module, exports, _declare, _Format, _Convert, _Action, _List, _RightDrawerListMixin2, _MetricListMixin2, _I18n, _ActivityTypeIcon, _Names) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Format2 = _interopRequireDefault(_Format);

  var _Convert2 = _interopRequireDefault(_Convert);

  var _Action2 = _interopRequireDefault(_Action);

  var _List2 = _interopRequireDefault(_List);

  var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

  var _MetricListMixin3 = _interopRequireDefault(_MetricListMixin2);

  var _I18n2 = _interopRequireDefault(_I18n);

  var activityTypeIcons = _interopRequireWildcard(_ActivityTypeIcon);

  var _Names2 = _interopRequireDefault(_Names);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

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

  var resource = (0, _I18n2.default)('historyList');
  var activityTypeResource = (0, _I18n2.default)('activityTypeText');
  var hashTagResource = (0, _I18n2.default)('historyListHashTags');
  var dtFormatResource = (0, _I18n2.default)('historyListDateTimeFormat');

  /**
   * @class crm.Views.History.List
   *
   * @extends argos.List
   * @mixins crm.Views._RightDrawerListMixin
   * @mixins crm.Views._MetricListMixin
   * @mixins crm.Views._GroupListMixin
   *
   * @requires argos.Convert
   *
   * @requires crm.Format
   * @requires crm.Action
   *
   * @requires moment
   */
  var __class = (0, _declare2.default)('crm.Views.History.List', [_List2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default], {
    format: _Format2.default,
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
    security: null, // 'Entities/History/View',
    existsRE: /^[\w]{12}$/,
    insertView: 'history_edit',
    queryOrderBy: null,
    querySelect: [],
    queryWhere: null,
    resourceKind: 'history',
    entityName: 'History',
    hashTagQueries: {
      'my-history': function myHistory() {
        return 'UserId eq "' + App.context.user.$key + '"';
      },
      note: 'Type eq "atNote"',
      phonecall: 'Type eq "atPhoneCall"',
      meeting: 'Type eq "atAppointment"',
      personal: 'Type eq "atPersonal"',
      email: 'Type eq "atEMail"'
    },
    activityTypeIcon: activityTypeIcons.default,
    allowSelection: true,
    enableActions: true,
    modelName: _Names2.default.HISTORY,

    createActionLayout: function createActionLayout() {
      return this.actions || (this.actions = [{
        id: 'viewAccount',
        label: this.viewAccountActionText,
        enabled: _Action2.default.hasProperty.bindDelegate(this, 'AccountId'),
        fn: _Action2.default.navigateToEntity.bindDelegate(this, {
          view: 'account_detail',
          keyProperty: 'AccountId',
          textProperty: 'AccountName'
        })
      }, {
        id: 'viewOpportunity',
        label: this.viewOpportunityActionText,
        enabled: _Action2.default.hasProperty.bindDelegate(this, 'OpportunityId'),
        fn: _Action2.default.navigateToEntity.bindDelegate(this, {
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
        fn: _Action2.default.addAttachment.bindDelegate(this)
      }]);
    },
    hasContactOrLead: function hasContactOrLead(theAction, selection) {
      return selection.data.ContactId || selection.data.LeadId;
    },
    navigateToContactOrLead: function navigateToContactOrLead(theAction, selection) {
      var entity = this.resolveContactOrLeadEntity(selection.data);
      var viewId = void 0;
      var options = void 0;

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
      var startDate = moment(_Convert2.default.toDateFromString(date));
      var nextDate = startDate.clone().add({
        hours: 24
      });
      var fmt = this.dateFormatText;

      if (startDate.valueOf() < nextDate.valueOf() && startDate.valueOf() > moment().startOf('day').valueOf()) {
        fmt = App.is24HourClock() ? this.hourMinuteFormatText24 : this.hourMinuteFormatText;
      }

      return _Format2.default.date(startDate.toDate(), fmt);
    },
    formatPicklist: function formatPicklist(property) {
      return _Format2.default.picklist(this.app.picklistService, this._model, property);
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      return 'upper(Description) like "%' + this.escapeSearchQuery(searchQuery.toUpperCase()) + '%"';
    },
    createIndicatorLayout: function createIndicatorLayout() {
      return this.itemIndicators || (this.itemIndicators = [{
        id: 'touched',
        cls: 'flag',
        label: this.touchedText,
        onApply: function onApply(entry, parent) {
          this.isEnabled = parent.hasBeenTouched(entry);
        }
      }]);
    },
    hasBeenTouched: function hasBeenTouched(entry) {
      if (entry.ModifyDate) {
        var modifiedDate = moment(_Convert2.default.toDateFromString(entry.ModifyDate));
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
      this.inherited(arguments);
    },
    activateEntry: function activateEntry(params) {
      var entry = this.entries[params.key];
      if (entry) {
        var activityParams = params;
        activityParams.descriptor = this.getTitle(entry);
        this.inherited(arguments, [activityParams]);
      } else {
        this.inherited(arguments);
      }
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9IaXN0b3J5L0xpc3QuanMiXSwibmFtZXMiOlsiYWN0aXZpdHlUeXBlSWNvbnMiLCJyZXNvdXJjZSIsImFjdGl2aXR5VHlwZVJlc291cmNlIiwiaGFzaFRhZ1Jlc291cmNlIiwiZHRGb3JtYXRSZXNvdXJjZSIsIl9fY2xhc3MiLCJmb3JtYXQiLCJpdGVtVGVtcGxhdGUiLCJTaW1wbGF0ZSIsIm5hbWVUZW1wbGF0ZSIsImhvdXJNaW51dGVGb3JtYXRUZXh0IiwiaG91ck1pbnV0ZUZvcm1hdFRleHQyNCIsImRhdGVGb3JtYXRUZXh0IiwidGl0bGVUZXh0Iiwidmlld0FjY291bnRBY3Rpb25UZXh0Iiwidmlld09wcG9ydHVuaXR5QWN0aW9uVGV4dCIsInZpZXdDb250YWN0QWN0aW9uVGV4dCIsImFkZEF0dGFjaG1lbnRBY3Rpb25UZXh0IiwicmVnYXJkaW5nVGV4dCIsInRvdWNoZWRUZXh0IiwiYWN0aXZpdHlUeXBlVGV4dCIsImF0VG9EbyIsImF0VG9Eb1RleHQiLCJhdFBob25lQ2FsbCIsImF0UGhvbmVDYWxsVGV4dCIsImF0QXBwb2ludG1lbnQiLCJhdEFwcG9pbnRtZW50VGV4dCIsImF0TGl0ZXJhdHVyZSIsImF0TGl0ZXJhdHVyZVRleHQiLCJhdFBlcnNvbmFsIiwiYXRQZXJzb25hbFRleHQiLCJhdFF1ZXN0aW9uIiwiYXRRdWVzdGlvblRleHQiLCJhdEVNYWlsIiwiYXRFTWFpbFRleHQiLCJhdE5vdGUiLCJhdE5vdGVUZXh0IiwiaGFzaFRhZ1F1ZXJpZXNUZXh0IiwibXlIaXN0b3J5SGFzaCIsIm5vdGUiLCJub3RlSGFzaCIsInBob25lY2FsbCIsInBob25lQ2FsbEhhc2giLCJtZWV0aW5nIiwibWVldGluZ0hhc2giLCJwZXJzb25hbCIsInBlcnNvbmFsSGFzaCIsImVtYWlsIiwiZW1haWxIYXNoIiwiZGV0YWlsVmlldyIsIml0ZW1JY29uQ2xhc3MiLCJpZCIsInNlY3VyaXR5IiwiZXhpc3RzUkUiLCJpbnNlcnRWaWV3IiwicXVlcnlPcmRlckJ5IiwicXVlcnlTZWxlY3QiLCJxdWVyeVdoZXJlIiwicmVzb3VyY2VLaW5kIiwiZW50aXR5TmFtZSIsImhhc2hUYWdRdWVyaWVzIiwibXlIaXN0b3J5IiwiQXBwIiwiY29udGV4dCIsInVzZXIiLCIka2V5IiwiYWN0aXZpdHlUeXBlSWNvbiIsImRlZmF1bHQiLCJhbGxvd1NlbGVjdGlvbiIsImVuYWJsZUFjdGlvbnMiLCJtb2RlbE5hbWUiLCJISVNUT1JZIiwiY3JlYXRlQWN0aW9uTGF5b3V0IiwiYWN0aW9ucyIsImxhYmVsIiwiZW5hYmxlZCIsImhhc1Byb3BlcnR5IiwiYmluZERlbGVnYXRlIiwiZm4iLCJuYXZpZ2F0ZVRvRW50aXR5IiwidmlldyIsImtleVByb3BlcnR5IiwidGV4dFByb3BlcnR5IiwiYWN0aW9uIiwiaGFzQ29udGFjdE9yTGVhZCIsImNscyIsImFkZEF0dGFjaG1lbnQiLCJ0aGVBY3Rpb24iLCJzZWxlY3Rpb24iLCJkYXRhIiwiQ29udGFjdElkIiwiTGVhZElkIiwibmF2aWdhdGVUb0NvbnRhY3RPckxlYWQiLCJlbnRpdHkiLCJyZXNvbHZlQ29udGFjdE9yTGVhZEVudGl0eSIsInZpZXdJZCIsIm9wdGlvbnMiLCJrZXkiLCJkZXNjcmlwdG9yIiwiQ29udGFjdE5hbWUiLCJMZWFkTmFtZSIsImdldFZpZXciLCJzaG93IiwiZW50cnkiLCJleGlzdHMiLCJ0ZXN0IiwiZm9ybWF0RGF0ZSIsImRhdGUiLCJzdGFydERhdGUiLCJtb21lbnQiLCJ0b0RhdGVGcm9tU3RyaW5nIiwibmV4dERhdGUiLCJjbG9uZSIsImFkZCIsImhvdXJzIiwiZm10IiwidmFsdWVPZiIsInN0YXJ0T2YiLCJpczI0SG91ckNsb2NrIiwidG9EYXRlIiwiZm9ybWF0UGlja2xpc3QiLCJwcm9wZXJ0eSIsInBpY2tsaXN0IiwiYXBwIiwicGlja2xpc3RTZXJ2aWNlIiwiX21vZGVsIiwiZm9ybWF0U2VhcmNoUXVlcnkiLCJzZWFyY2hRdWVyeSIsImVzY2FwZVNlYXJjaFF1ZXJ5IiwidG9VcHBlckNhc2UiLCJjcmVhdGVJbmRpY2F0b3JMYXlvdXQiLCJpdGVtSW5kaWNhdG9ycyIsIm9uQXBwbHkiLCJwYXJlbnQiLCJpc0VuYWJsZWQiLCJoYXNCZWVuVG91Y2hlZCIsIk1vZGlmeURhdGUiLCJtb2RpZmllZERhdGUiLCJjdXJyZW50RGF0ZSIsImVuZE9mIiwid2Vla0FnbyIsInN1YnRyYWN0IiwiaXNBZnRlciIsImlzQmVmb3JlIiwiZ2V0SXRlbUljb25DbGFzcyIsInR5cGUiLCJUeXBlIiwiX2dldEl0ZW1JY29uQ2xhc3MiLCJnZXRUaXRsZSIsImluaXQiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJhY3RpdmF0ZUVudHJ5IiwicGFyYW1zIiwiZW50cmllcyIsImFjdGl2aXR5UGFyYW1zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUF1QllBLGlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF2Qlo7Ozs7Ozs7Ozs7Ozs7OztBQTJCQSxNQUFNQyxXQUFXLG9CQUFZLGFBQVosQ0FBakI7QUFDQSxNQUFNQyx1QkFBdUIsb0JBQVksa0JBQVosQ0FBN0I7QUFDQSxNQUFNQyxrQkFBa0Isb0JBQVkscUJBQVosQ0FBeEI7QUFDQSxNQUFNQyxtQkFBbUIsb0JBQVksMkJBQVosQ0FBekI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7OztBQWVBLE1BQU1DLFVBQVUsdUJBQVEsd0JBQVIsRUFBa0MsMkVBQWxDLEVBQW1GO0FBQ2pHQyw0QkFEaUc7QUFFakc7QUFDQUMsa0JBQWMsSUFBSUMsUUFBSixDQUFhLENBQ3pCLDhCQUR5QixFQUV6QixrQ0FGeUIsRUFHekIsb0NBSHlCLEVBSXpCLGdCQUp5QixFQUt6Qix1Q0FMeUIsRUFNekIsU0FOeUIsRUFPekIsTUFQeUIsRUFRekIsMkRBUnlCLEVBU3pCLDJCQVR5QixFQVV6QixxR0FWeUIsRUFXekIsU0FYeUIsRUFZekIsOEJBWnlCLEVBYXpCLDhCQWJ5QixFQWN6QixnQkFkeUIsRUFlekIsUUFmeUIsRUFnQnpCLFFBaEJ5QixDQUFiLENBSG1GO0FB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U0FBTCxDQUFlQyxTQUFmLEVBQTBCLENBQUNJLGNBQUQsQ0FBMUI7QUFDRCxPQUpELE1BSU87QUFDTCxhQUFLTCxTQUFMLENBQWVDLFNBQWY7QUFDRDtBQUNGO0FBMU9nRyxHQUFuRixDQUFoQjs7b0JBNk9lbEosTyIsImZpbGUiOiJMaXN0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICcuLi8uLi9Gb3JtYXQnO1xyXG5pbXBvcnQgY29udmVydCBmcm9tICdhcmdvcy9Db252ZXJ0JztcclxuaW1wb3J0IGFjdGlvbiBmcm9tICcuLi8uLi9BY3Rpb24nO1xyXG5pbXBvcnQgTGlzdCBmcm9tICdhcmdvcy9MaXN0JztcclxuaW1wb3J0IF9SaWdodERyYXdlckxpc3RNaXhpbiBmcm9tICcuLi9fUmlnaHREcmF3ZXJMaXN0TWl4aW4nO1xyXG5pbXBvcnQgX01ldHJpY0xpc3RNaXhpbiBmcm9tICcuLi9fTWV0cmljTGlzdE1peGluJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5pbXBvcnQgKiBhcyBhY3Rpdml0eVR5cGVJY29ucyBmcm9tICcuLi8uLi9Nb2RlbHMvQWN0aXZpdHkvQWN0aXZpdHlUeXBlSWNvbic7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi8uLi9Nb2RlbHMvTmFtZXMnO1xyXG5cclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2hpc3RvcnlMaXN0Jyk7XHJcbmNvbnN0IGFjdGl2aXR5VHlwZVJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2FjdGl2aXR5VHlwZVRleHQnKTtcclxuY29uc3QgaGFzaFRhZ1Jlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2hpc3RvcnlMaXN0SGFzaFRhZ3MnKTtcclxuY29uc3QgZHRGb3JtYXRSZXNvdXJjZSA9IGdldFJlc291cmNlKCdoaXN0b3J5TGlzdERhdGVUaW1lRm9ybWF0Jyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5IaXN0b3J5Lkxpc3RcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuTGlzdFxyXG4gKiBAbWl4aW5zIGNybS5WaWV3cy5fUmlnaHREcmF3ZXJMaXN0TWl4aW5cclxuICogQG1peGlucyBjcm0uVmlld3MuX01ldHJpY0xpc3RNaXhpblxyXG4gKiBAbWl4aW5zIGNybS5WaWV3cy5fR3JvdXBMaXN0TWl4aW5cclxuICpcclxuICogQHJlcXVpcmVzIGFyZ29zLkNvbnZlcnRcclxuICpcclxuICogQHJlcXVpcmVzIGNybS5Gb3JtYXRcclxuICogQHJlcXVpcmVzIGNybS5BY3Rpb25cclxuICpcclxuICogQHJlcXVpcmVzIG1vbWVudFxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5IaXN0b3J5Lkxpc3QnLCBbTGlzdCwgX1JpZ2h0RHJhd2VyTGlzdE1peGluLCBfTWV0cmljTGlzdE1peGluXSwge1xyXG4gIGZvcm1hdCxcclxuICAvLyBUZW1wbGF0ZXNcclxuICBpdGVtVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPHAgY2xhc3M9XCJsaXN0dmlldy1oZWFkaW5nXCI+JyxcclxuICAgICd7JSBpZiAoJC5UeXBlID09PSBcImF0Tm90ZVwiKSB7ICV9JyxcclxuICAgICd7JTogJCQuZm9ybWF0RGF0ZSgkLk1vZGlmeURhdGUpICV9JyxcclxuICAgICd7JSB9IGVsc2UgeyAlfScsXHJcbiAgICAneyU6ICQkLmZvcm1hdERhdGUoJC5Db21wbGV0ZWREYXRlKSAlfScsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgICAnPC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+eyU9ICQkLm5hbWVUZW1wbGF0ZS5hcHBseSgkKSAlfTwvcD4nLFxyXG4gICAgJ3slIGlmKCQuRGVzY3JpcHRpb24pIHsgJX0nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPnslPSAkJC5yZWdhcmRpbmdUZXh0ICsgJCQuZm9ybWF0UGlja2xpc3QoXCJEZXNjcmlwdGlvblwiKSgkLkRlc2NyaXB0aW9uKSAlfTwvcD4nLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJub3RlLXRleHQtaXRlbVwiPicsXHJcbiAgICAnPGRpdiBjbGFzcz1cIm5vdGUtdGV4dC13cmFwXCI+JyxcclxuICAgICd7JTogJC5Ob3RlcyAlfScsXHJcbiAgICAnPC9kaXY+JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gIF0pLFxyXG4gIG5hbWVUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICd7JSBpZiAoJC5MZWFkTmFtZSAmJiAkLkFjY291bnROYW1lKSB7ICV9JyxcclxuICAgICd7JTogJC5MZWFkTmFtZSAlfSB8IHslOiAkLkFjY291bnROYW1lICV9JyxcclxuICAgICd7JSB9IGVsc2UgaWYgKCQuTGVhZE5hbWUpIHsgJX0nLFxyXG4gICAgJ3slOiAkLkxlYWROYW1lICV9JyxcclxuICAgICd7JSB9IGVsc2UgaWYgKCQuQ29udGFjdE5hbWUgJiYgJC5BY2NvdW50TmFtZSkgeyAlfScsXHJcbiAgICAneyU6ICQuQ29udGFjdE5hbWUgJX0gfCB7JTogJC5BY2NvdW50TmFtZSAlfScsXHJcbiAgICAneyUgfSBlbHNlIGlmICgkLkNvbnRhY3ROYW1lKSB7ICV9JyxcclxuICAgICd7JTogJC5Db250YWN0TmFtZSAlfScsXHJcbiAgICAneyUgfSBlbHNlIHsgJX0nLFxyXG4gICAgJ3slOiAkLkFjY291bnROYW1lICV9JyxcclxuICAgICd7JSB9ICV9JyxcclxuICBdKSxcclxuXHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgaG91ck1pbnV0ZUZvcm1hdFRleHQ6IGR0Rm9ybWF0UmVzb3VyY2UuaG91ck1pbnV0ZUZvcm1hdFRleHQsXHJcbiAgaG91ck1pbnV0ZUZvcm1hdFRleHQyNDogZHRGb3JtYXRSZXNvdXJjZS5ob3VyTWludXRlRm9ybWF0VGV4dDI0LFxyXG4gIGRhdGVGb3JtYXRUZXh0OiBkdEZvcm1hdFJlc291cmNlLmRhdGVGb3JtYXRUZXh0LFxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIHZpZXdBY2NvdW50QWN0aW9uVGV4dDogcmVzb3VyY2Uudmlld0FjY291bnRBY3Rpb25UZXh0LFxyXG4gIHZpZXdPcHBvcnR1bml0eUFjdGlvblRleHQ6IHJlc291cmNlLnZpZXdPcHBvcnR1bml0eUFjdGlvblRleHQsXHJcbiAgdmlld0NvbnRhY3RBY3Rpb25UZXh0OiByZXNvdXJjZS52aWV3Q29udGFjdEFjdGlvblRleHQsXHJcbiAgYWRkQXR0YWNobWVudEFjdGlvblRleHQ6IHJlc291cmNlLmFkZEF0dGFjaG1lbnRBY3Rpb25UZXh0LFxyXG4gIHJlZ2FyZGluZ1RleHQ6IHJlc291cmNlLnJlZ2FyZGluZ1RleHQsXHJcbiAgdG91Y2hlZFRleHQ6IHJlc291cmNlLnRvdWNoZWRUZXh0LFxyXG4gIGFjdGl2aXR5VHlwZVRleHQ6IHtcclxuICAgIGF0VG9EbzogYWN0aXZpdHlUeXBlUmVzb3VyY2UuYXRUb0RvVGV4dCxcclxuICAgIGF0UGhvbmVDYWxsOiBhY3Rpdml0eVR5cGVSZXNvdXJjZS5hdFBob25lQ2FsbFRleHQsXHJcbiAgICBhdEFwcG9pbnRtZW50OiBhY3Rpdml0eVR5cGVSZXNvdXJjZS5hdEFwcG9pbnRtZW50VGV4dCxcclxuICAgIGF0TGl0ZXJhdHVyZTogYWN0aXZpdHlUeXBlUmVzb3VyY2UuYXRMaXRlcmF0dXJlVGV4dCxcclxuICAgIGF0UGVyc29uYWw6IGFjdGl2aXR5VHlwZVJlc291cmNlLmF0UGVyc29uYWxUZXh0LFxyXG4gICAgYXRRdWVzdGlvbjogYWN0aXZpdHlUeXBlUmVzb3VyY2UuYXRRdWVzdGlvblRleHQsXHJcbiAgICBhdEVNYWlsOiBhY3Rpdml0eVR5cGVSZXNvdXJjZS5hdEVNYWlsVGV4dCxcclxuICAgIGF0Tm90ZTogYWN0aXZpdHlUeXBlUmVzb3VyY2UuYXROb3RlVGV4dCxcclxuICB9LFxyXG4gIGhhc2hUYWdRdWVyaWVzVGV4dDoge1xyXG4gICAgJ215LWhpc3RvcnknOiBoYXNoVGFnUmVzb3VyY2UubXlIaXN0b3J5SGFzaCxcclxuICAgIG5vdGU6IGhhc2hUYWdSZXNvdXJjZS5ub3RlSGFzaCxcclxuICAgIHBob25lY2FsbDogaGFzaFRhZ1Jlc291cmNlLnBob25lQ2FsbEhhc2gsXHJcbiAgICBtZWV0aW5nOiBoYXNoVGFnUmVzb3VyY2UubWVldGluZ0hhc2gsXHJcbiAgICBwZXJzb25hbDogaGFzaFRhZ1Jlc291cmNlLnBlcnNvbmFsSGFzaCxcclxuICAgIGVtYWlsOiBoYXNoVGFnUmVzb3VyY2UuZW1haWxIYXNoLFxyXG4gIH0sXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGRldGFpbFZpZXc6ICdoaXN0b3J5X2RldGFpbCcsXHJcbiAgaXRlbUljb25DbGFzczogJ2ZvbGRlcicsXHJcbiAgaWQ6ICdoaXN0b3J5X2xpc3QnLFxyXG4gIHNlY3VyaXR5OiBudWxsLCAvLyAnRW50aXRpZXMvSGlzdG9yeS9WaWV3JyxcclxuICBleGlzdHNSRTogL15bXFx3XXsxMn0kLyxcclxuICBpbnNlcnRWaWV3OiAnaGlzdG9yeV9lZGl0JyxcclxuICBxdWVyeU9yZGVyQnk6IG51bGwsXHJcbiAgcXVlcnlTZWxlY3Q6IFtdLFxyXG4gIHF1ZXJ5V2hlcmU6IG51bGwsXHJcbiAgcmVzb3VyY2VLaW5kOiAnaGlzdG9yeScsXHJcbiAgZW50aXR5TmFtZTogJ0hpc3RvcnknLFxyXG4gIGhhc2hUYWdRdWVyaWVzOiB7XHJcbiAgICAnbXktaGlzdG9yeSc6IGZ1bmN0aW9uIG15SGlzdG9yeSgpIHtcclxuICAgICAgcmV0dXJuIGBVc2VySWQgZXEgXCIke0FwcC5jb250ZXh0LnVzZXIuJGtleX1cImA7XHJcbiAgICB9LFxyXG4gICAgbm90ZTogJ1R5cGUgZXEgXCJhdE5vdGVcIicsXHJcbiAgICBwaG9uZWNhbGw6ICdUeXBlIGVxIFwiYXRQaG9uZUNhbGxcIicsXHJcbiAgICBtZWV0aW5nOiAnVHlwZSBlcSBcImF0QXBwb2ludG1lbnRcIicsXHJcbiAgICBwZXJzb25hbDogJ1R5cGUgZXEgXCJhdFBlcnNvbmFsXCInLFxyXG4gICAgZW1haWw6ICdUeXBlIGVxIFwiYXRFTWFpbFwiJyxcclxuICB9LFxyXG4gIGFjdGl2aXR5VHlwZUljb246IGFjdGl2aXR5VHlwZUljb25zLmRlZmF1bHQsXHJcbiAgYWxsb3dTZWxlY3Rpb246IHRydWUsXHJcbiAgZW5hYmxlQWN0aW9uczogdHJ1ZSxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLkhJU1RPUlksXHJcblxyXG4gIGNyZWF0ZUFjdGlvbkxheW91dDogZnVuY3Rpb24gY3JlYXRlQWN0aW9uTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYWN0aW9ucyB8fCAodGhpcy5hY3Rpb25zID0gW3tcclxuICAgICAgaWQ6ICd2aWV3QWNjb3VudCcsXHJcbiAgICAgIGxhYmVsOiB0aGlzLnZpZXdBY2NvdW50QWN0aW9uVGV4dCxcclxuICAgICAgZW5hYmxlZDogYWN0aW9uLmhhc1Byb3BlcnR5LmJpbmREZWxlZ2F0ZSh0aGlzLCAnQWNjb3VudElkJyksXHJcbiAgICAgIGZuOiBhY3Rpb24ubmF2aWdhdGVUb0VudGl0eS5iaW5kRGVsZWdhdGUodGhpcywge1xyXG4gICAgICAgIHZpZXc6ICdhY2NvdW50X2RldGFpbCcsXHJcbiAgICAgICAga2V5UHJvcGVydHk6ICdBY2NvdW50SWQnLFxyXG4gICAgICAgIHRleHRQcm9wZXJ0eTogJ0FjY291bnROYW1lJyxcclxuICAgICAgfSksXHJcbiAgICB9LCB7XHJcbiAgICAgIGlkOiAndmlld09wcG9ydHVuaXR5JyxcclxuICAgICAgbGFiZWw6IHRoaXMudmlld09wcG9ydHVuaXR5QWN0aW9uVGV4dCxcclxuICAgICAgZW5hYmxlZDogYWN0aW9uLmhhc1Byb3BlcnR5LmJpbmREZWxlZ2F0ZSh0aGlzLCAnT3Bwb3J0dW5pdHlJZCcpLFxyXG4gICAgICBmbjogYWN0aW9uLm5hdmlnYXRlVG9FbnRpdHkuYmluZERlbGVnYXRlKHRoaXMsIHtcclxuICAgICAgICB2aWV3OiAnb3Bwb3J0dW5pdHlfZGV0YWlsJyxcclxuICAgICAgICBrZXlQcm9wZXJ0eTogJ09wcG9ydHVuaXR5SWQnLFxyXG4gICAgICAgIHRleHRQcm9wZXJ0eTogJ09wcG9ydHVuaXR5TmFtZScsXHJcbiAgICAgIH0pLFxyXG4gICAgfSwge1xyXG4gICAgICBpZDogJ3ZpZXdDb250YWN0JyxcclxuICAgICAgbGFiZWw6IHRoaXMudmlld0NvbnRhY3RBY3Rpb25UZXh0LFxyXG4gICAgICBhY3Rpb246ICduYXZpZ2F0ZVRvQ29udGFjdE9yTGVhZCcsXHJcbiAgICAgIGVuYWJsZWQ6IHRoaXMuaGFzQ29udGFjdE9yTGVhZCxcclxuICAgIH0sIHtcclxuICAgICAgaWQ6ICdhZGRBdHRhY2htZW50JyxcclxuICAgICAgY2xzOiAnYXR0YWNoJyxcclxuICAgICAgbGFiZWw6IHRoaXMuYWRkQXR0YWNobWVudEFjdGlvblRleHQsXHJcbiAgICAgIGZuOiBhY3Rpb24uYWRkQXR0YWNobWVudC5iaW5kRGVsZWdhdGUodGhpcyksXHJcbiAgICB9XSk7XHJcbiAgfSxcclxuICBoYXNDb250YWN0T3JMZWFkOiBmdW5jdGlvbiBoYXNDb250YWN0T3JMZWFkKHRoZUFjdGlvbiwgc2VsZWN0aW9uKSB7XHJcbiAgICByZXR1cm4gKHNlbGVjdGlvbi5kYXRhLkNvbnRhY3RJZCkgfHwgKHNlbGVjdGlvbi5kYXRhLkxlYWRJZCk7XHJcbiAgfSxcclxuICBuYXZpZ2F0ZVRvQ29udGFjdE9yTGVhZDogZnVuY3Rpb24gbmF2aWdhdGVUb0NvbnRhY3RPckxlYWQodGhlQWN0aW9uLCBzZWxlY3Rpb24pIHtcclxuICAgIGNvbnN0IGVudGl0eSA9IHRoaXMucmVzb2x2ZUNvbnRhY3RPckxlYWRFbnRpdHkoc2VsZWN0aW9uLmRhdGEpO1xyXG4gICAgbGV0IHZpZXdJZDtcclxuICAgIGxldCBvcHRpb25zO1xyXG5cclxuICAgIHN3aXRjaCAoZW50aXR5KSB7XHJcbiAgICAgIGNhc2UgJ0NvbnRhY3QnOlxyXG4gICAgICAgIHZpZXdJZCA9ICdjb250YWN0X2RldGFpbCc7XHJcbiAgICAgICAgb3B0aW9ucyA9IHtcclxuICAgICAgICAgIGtleTogc2VsZWN0aW9uLmRhdGEuQ29udGFjdElkLFxyXG4gICAgICAgICAgZGVzY3JpcHRvcjogc2VsZWN0aW9uLmRhdGEuQ29udGFjdE5hbWUsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnTGVhZCc6XHJcbiAgICAgICAgdmlld0lkID0gJ2xlYWRfZGV0YWlsJztcclxuICAgICAgICBvcHRpb25zID0ge1xyXG4gICAgICAgICAga2V5OiBzZWxlY3Rpb24uZGF0YS5MZWFkSWQsXHJcbiAgICAgICAgICBkZXNjcmlwdG9yOiBzZWxlY3Rpb24uZGF0YS5MZWFkTmFtZSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyh2aWV3SWQpO1xyXG5cclxuICAgIGlmICh2aWV3ICYmIG9wdGlvbnMpIHtcclxuICAgICAgdmlldy5zaG93KG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgcmVzb2x2ZUNvbnRhY3RPckxlYWRFbnRpdHk6IGZ1bmN0aW9uIHJlc29sdmVDb250YWN0T3JMZWFkRW50aXR5KGVudHJ5KSB7XHJcbiAgICBjb25zdCBleGlzdHMgPSB0aGlzLmV4aXN0c1JFO1xyXG5cclxuICAgIGlmIChlbnRyeSkge1xyXG4gICAgICBpZiAoZXhpc3RzLnRlc3QoZW50cnkuTGVhZElkKSkge1xyXG4gICAgICAgIHJldHVybiAnTGVhZCc7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGV4aXN0cy50ZXN0KGVudHJ5LkNvbnRhY3RJZCkpIHtcclxuICAgICAgICByZXR1cm4gJ0NvbnRhY3QnO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBmb3JtYXREYXRlOiBmdW5jdGlvbiBmb3JtYXREYXRlKGRhdGUpIHtcclxuICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IG1vbWVudChjb252ZXJ0LnRvRGF0ZUZyb21TdHJpbmcoZGF0ZSkpO1xyXG4gICAgY29uc3QgbmV4dERhdGUgPSBzdGFydERhdGUuY2xvbmUoKS5hZGQoe1xyXG4gICAgICBob3VyczogMjQsXHJcbiAgICB9KTtcclxuICAgIGxldCBmbXQgPSB0aGlzLmRhdGVGb3JtYXRUZXh0O1xyXG5cclxuICAgIGlmIChzdGFydERhdGUudmFsdWVPZigpIDwgbmV4dERhdGUudmFsdWVPZigpICYmIHN0YXJ0RGF0ZS52YWx1ZU9mKCkgPiBtb21lbnQoKS5zdGFydE9mKCdkYXknKS52YWx1ZU9mKCkpIHtcclxuICAgICAgZm10ID0gKEFwcC5pczI0SG91ckNsb2NrKCkpID8gdGhpcy5ob3VyTWludXRlRm9ybWF0VGV4dDI0IDogdGhpcy5ob3VyTWludXRlRm9ybWF0VGV4dDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZm9ybWF0LmRhdGUoc3RhcnREYXRlLnRvRGF0ZSgpLCBmbXQpO1xyXG4gIH0sXHJcbiAgZm9ybWF0UGlja2xpc3Q6IGZ1bmN0aW9uIGZvcm1hdFBpY2tsaXN0KHByb3BlcnR5KSB7XHJcbiAgICByZXR1cm4gZm9ybWF0LnBpY2tsaXN0KHRoaXMuYXBwLnBpY2tsaXN0U2VydmljZSwgdGhpcy5fbW9kZWwsIHByb3BlcnR5KTtcclxuICB9LFxyXG4gIGZvcm1hdFNlYXJjaFF1ZXJ5OiBmdW5jdGlvbiBmb3JtYXRTZWFyY2hRdWVyeShzZWFyY2hRdWVyeSkge1xyXG4gICAgcmV0dXJuIGB1cHBlcihEZXNjcmlwdGlvbikgbGlrZSBcIiUke3RoaXMuZXNjYXBlU2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkudG9VcHBlckNhc2UoKSl9JVwiYDtcclxuICB9LFxyXG4gIGNyZWF0ZUluZGljYXRvckxheW91dDogZnVuY3Rpb24gY3JlYXRlSW5kaWNhdG9yTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaXRlbUluZGljYXRvcnMgfHwgKHRoaXMuaXRlbUluZGljYXRvcnMgPSBbe1xyXG4gICAgICBpZDogJ3RvdWNoZWQnLFxyXG4gICAgICBjbHM6ICdmbGFnJyxcclxuICAgICAgbGFiZWw6IHRoaXMudG91Y2hlZFRleHQsXHJcbiAgICAgIG9uQXBwbHk6IGZ1bmN0aW9uIG9uQXBwbHkoZW50cnksIHBhcmVudCkge1xyXG4gICAgICAgIHRoaXMuaXNFbmFibGVkID0gcGFyZW50Lmhhc0JlZW5Ub3VjaGVkKGVudHJ5KTtcclxuICAgICAgfSxcclxuICAgIH1dKTtcclxuICB9LFxyXG4gIGhhc0JlZW5Ub3VjaGVkOiBmdW5jdGlvbiBoYXNCZWVuVG91Y2hlZChlbnRyeSkge1xyXG4gICAgaWYgKGVudHJ5Lk1vZGlmeURhdGUpIHtcclxuICAgICAgY29uc3QgbW9kaWZpZWREYXRlID0gbW9tZW50KGNvbnZlcnQudG9EYXRlRnJvbVN0cmluZyhlbnRyeS5Nb2RpZnlEYXRlKSk7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbW9tZW50KCkuZW5kT2YoJ2RheScpO1xyXG4gICAgICBjb25zdCB3ZWVrQWdvID0gbW9tZW50KCkuc3VidHJhY3QoMSwgJ3dlZWtzJyk7XHJcblxyXG4gICAgICByZXR1cm4gbW9kaWZpZWREYXRlLmlzQWZ0ZXIod2Vla0FnbykgJiZcclxuICAgICAgICBtb2RpZmllZERhdGUuaXNCZWZvcmUoY3VycmVudERhdGUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0sXHJcbiAgZ2V0SXRlbUljb25DbGFzczogZnVuY3Rpb24gZ2V0SXRlbUljb25DbGFzcyhlbnRyeSkge1xyXG4gICAgY29uc3QgdHlwZSA9IGVudHJ5ICYmIGVudHJ5LlR5cGU7XHJcbiAgICByZXR1cm4gdGhpcy5fZ2V0SXRlbUljb25DbGFzcyh0eXBlKTtcclxuICB9LFxyXG4gIGdldFRpdGxlOiBmdW5jdGlvbiBnZXRUaXRsZShlbnRyeSkge1xyXG4gICAgY29uc3QgdHlwZSA9IGVudHJ5ICYmIGVudHJ5LlR5cGU7XHJcbiAgICByZXR1cm4gdGhpcy5hY3Rpdml0eVR5cGVUZXh0W3R5cGVdIHx8IHRoaXMudGl0bGVUZXh0O1xyXG4gIH0sXHJcbiAgX2dldEl0ZW1JY29uQ2xhc3M6IGZ1bmN0aW9uIF9nZXRJdGVtSWNvbkNsYXNzKHR5cGUpIHtcclxuICAgIGxldCBjbHMgPSB0aGlzLmFjdGl2aXR5VHlwZUljb25bdHlwZV07XHJcbiAgICBpZiAoIWNscykge1xyXG4gICAgICBjbHMgPSB0aGlzLml0ZW1JY29uQ2xhc3M7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2xzO1xyXG4gIH0sXHJcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBhY3RpdmF0ZUVudHJ5OiBmdW5jdGlvbiBhY3RpdmF0ZUVudHJ5KHBhcmFtcykge1xyXG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmVudHJpZXNbcGFyYW1zLmtleV07XHJcbiAgICBpZiAoZW50cnkpIHtcclxuICAgICAgY29uc3QgYWN0aXZpdHlQYXJhbXMgPSBwYXJhbXM7XHJcbiAgICAgIGFjdGl2aXR5UGFyYW1zLmRlc2NyaXB0b3IgPSB0aGlzLmdldFRpdGxlKGVudHJ5KTtcclxuICAgICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzLCBbYWN0aXZpdHlQYXJhbXNdKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=