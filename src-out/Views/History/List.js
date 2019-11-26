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

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9IaXN0b3J5L0xpc3QuanMiXSwibmFtZXMiOlsiYWN0aXZpdHlUeXBlSWNvbnMiLCJyZXNvdXJjZSIsImFjdGl2aXR5VHlwZVJlc291cmNlIiwiaGFzaFRhZ1Jlc291cmNlIiwiZHRGb3JtYXRSZXNvdXJjZSIsIl9fY2xhc3MiLCJmb3JtYXQiLCJpdGVtVGVtcGxhdGUiLCJTaW1wbGF0ZSIsIm5hbWVUZW1wbGF0ZSIsImhvdXJNaW51dGVGb3JtYXRUZXh0IiwiaG91ck1pbnV0ZUZvcm1hdFRleHQyNCIsImRhdGVGb3JtYXRUZXh0IiwidGl0bGVUZXh0Iiwidmlld0FjY291bnRBY3Rpb25UZXh0Iiwidmlld09wcG9ydHVuaXR5QWN0aW9uVGV4dCIsInZpZXdDb250YWN0QWN0aW9uVGV4dCIsImFkZEF0dGFjaG1lbnRBY3Rpb25UZXh0IiwicmVnYXJkaW5nVGV4dCIsInRvdWNoZWRUZXh0IiwiYWN0aXZpdHlUeXBlVGV4dCIsImF0VG9EbyIsImF0VG9Eb1RleHQiLCJhdFBob25lQ2FsbCIsImF0UGhvbmVDYWxsVGV4dCIsImF0QXBwb2ludG1lbnQiLCJhdEFwcG9pbnRtZW50VGV4dCIsImF0TGl0ZXJhdHVyZSIsImF0TGl0ZXJhdHVyZVRleHQiLCJhdFBlcnNvbmFsIiwiYXRQZXJzb25hbFRleHQiLCJhdFF1ZXN0aW9uIiwiYXRRdWVzdGlvblRleHQiLCJhdEVNYWlsIiwiYXRFTWFpbFRleHQiLCJhdE5vdGUiLCJhdE5vdGVUZXh0IiwiaGFzaFRhZ1F1ZXJpZXNUZXh0IiwibXlIaXN0b3J5SGFzaCIsIm5vdGUiLCJub3RlSGFzaCIsInBob25lY2FsbCIsInBob25lQ2FsbEhhc2giLCJtZWV0aW5nIiwibWVldGluZ0hhc2giLCJwZXJzb25hbCIsInBlcnNvbmFsSGFzaCIsImVtYWlsIiwiZW1haWxIYXNoIiwiZGV0YWlsVmlldyIsIml0ZW1JY29uQ2xhc3MiLCJpZCIsInNlY3VyaXR5IiwiZXhpc3RzUkUiLCJpbnNlcnRWaWV3IiwicXVlcnlPcmRlckJ5IiwicXVlcnlTZWxlY3QiLCJxdWVyeVdoZXJlIiwicmVzb3VyY2VLaW5kIiwiZW50aXR5TmFtZSIsImhhc2hUYWdRdWVyaWVzIiwibXlIaXN0b3J5IiwiQXBwIiwiY29udGV4dCIsInVzZXIiLCIka2V5IiwiYWN0aXZpdHlUeXBlSWNvbiIsImRlZmF1bHQiLCJhbGxvd1NlbGVjdGlvbiIsImVuYWJsZUFjdGlvbnMiLCJtb2RlbE5hbWUiLCJISVNUT1JZIiwiY3JlYXRlQWN0aW9uTGF5b3V0IiwiYWN0aW9ucyIsImxhYmVsIiwiZW5hYmxlZCIsImhhc1Byb3BlcnR5IiwiYmluZERlbGVnYXRlIiwiZm4iLCJuYXZpZ2F0ZVRvRW50aXR5IiwidmlldyIsImtleVByb3BlcnR5IiwidGV4dFByb3BlcnR5IiwiYWN0aW9uIiwiaGFzQ29udGFjdE9yTGVhZCIsImNscyIsImFkZEF0dGFjaG1lbnQiLCJ0aGVBY3Rpb24iLCJzZWxlY3Rpb24iLCJkYXRhIiwiQ29udGFjdElkIiwiTGVhZElkIiwibmF2aWdhdGVUb0NvbnRhY3RPckxlYWQiLCJlbnRpdHkiLCJyZXNvbHZlQ29udGFjdE9yTGVhZEVudGl0eSIsInZpZXdJZCIsIm9wdGlvbnMiLCJrZXkiLCJkZXNjcmlwdG9yIiwiQ29udGFjdE5hbWUiLCJMZWFkTmFtZSIsImdldFZpZXciLCJzaG93IiwiZW50cnkiLCJleGlzdHMiLCJ0ZXN0IiwiZm9ybWF0RGF0ZSIsImRhdGUiLCJzdGFydERhdGUiLCJtb21lbnQiLCJ0b0RhdGVGcm9tU3RyaW5nIiwibmV4dERhdGUiLCJjbG9uZSIsImFkZCIsImhvdXJzIiwiZm10IiwidmFsdWVPZiIsInN0YXJ0T2YiLCJpczI0SG91ckNsb2NrIiwidG9EYXRlIiwiZm9ybWF0UGlja2xpc3QiLCJwcm9wZXJ0eSIsInBpY2tsaXN0IiwiYXBwIiwicGlja2xpc3RTZXJ2aWNlIiwiX21vZGVsIiwiZm9ybWF0U2VhcmNoUXVlcnkiLCJzZWFyY2hRdWVyeSIsImVzY2FwZVNlYXJjaFF1ZXJ5IiwidG9VcHBlckNhc2UiLCJjcmVhdGVJbmRpY2F0b3JMYXlvdXQiLCJpdGVtSW5kaWNhdG9ycyIsIm9uQXBwbHkiLCJwYXJlbnQiLCJpc0VuYWJsZWQiLCJoYXNCZWVuVG91Y2hlZCIsIk1vZGlmeURhdGUiLCJtb2RpZmllZERhdGUiLCJjdXJyZW50RGF0ZSIsImVuZE9mIiwid2Vla0FnbyIsInN1YnRyYWN0IiwiaXNBZnRlciIsImlzQmVmb3JlIiwiZ2V0SXRlbUljb25DbGFzcyIsInR5cGUiLCJUeXBlIiwiX2dldEl0ZW1JY29uQ2xhc3MiLCJnZXRUaXRsZSIsImluaXQiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJhY3RpdmF0ZUVudHJ5IiwicGFyYW1zIiwiZW50cmllcyIsImFjdGl2aXR5UGFyYW1zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUF1QllBLGlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF2Qlo7Ozs7Ozs7Ozs7Ozs7OztBQTJCQSxNQUFNQyxXQUFXLG9CQUFZLGFBQVosQ0FBakI7QUFDQSxNQUFNQyx1QkFBdUIsb0JBQVksa0JBQVosQ0FBN0I7QUFDQSxNQUFNQyxrQkFBa0Isb0JBQVkscUJBQVosQ0FBeEI7QUFDQSxNQUFNQyxtQkFBbUIsb0JBQVksMkJBQVosQ0FBekI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7OztBQWVBLE1BQU1DLFVBQVUsdUJBQVEsd0JBQVIsRUFBa0MsMkVBQWxDLEVBQW1GO0FBQ2pHQyw0QkFEaUc7QUFFakc7QUFDQUMsa0JBQWMsSUFBSUMsUUFBSixDQUFhLENBQ3pCLDhCQUR5QixFQUV6QixrQ0FGeUIsRUFHekIsb0NBSHlCLEVBSXpCLGdCQUp5QixFQUt6Qix1Q0FMeUIsRUFNekIsU0FOeUIsRUFPekIsTUFQeUIsRUFRekIsMkRBUnlCLEVBU3pCLDJCQVR5QixFQVV6QixxR0FWeUIsRUFXekIsU0FYeUIsRUFZekIsOEJBWnlCLEVBYXpCLDhCQWJ5QixFQWN6QixnQkFkeUIsRUFlekIsUUFmeUIsRUFnQnpCLFFBaEJ5QixDQUFiLENBSG1GO0FB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O0FBQ0EsYUFBSytDLFNBQUwsQ0FBZUMsU0FBZixFQUEwQixDQUFDSSxjQUFELENBQTFCO0FBQ0QsT0FKRCxNQUlPO0FBQ0wsYUFBS0wsU0FBTCxDQUFlRSxhQUFmLEVBQThCRCxTQUE5QjtBQUNEO0FBQ0Y7QUExT2dHLEdBQW5GLENBQWhCOztvQkE2T2VsSixPIiwiZmlsZSI6Ikxpc3QuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJy4uLy4uL0Zvcm1hdCc7XHJcbmltcG9ydCBjb252ZXJ0IGZyb20gJ2FyZ29zL0NvbnZlcnQnO1xyXG5pbXBvcnQgYWN0aW9uIGZyb20gJy4uLy4uL0FjdGlvbic7XHJcbmltcG9ydCBMaXN0IGZyb20gJ2FyZ29zL0xpc3QnO1xyXG5pbXBvcnQgX1JpZ2h0RHJhd2VyTGlzdE1peGluIGZyb20gJy4uL19SaWdodERyYXdlckxpc3RNaXhpbic7XHJcbmltcG9ydCBfTWV0cmljTGlzdE1peGluIGZyb20gJy4uL19NZXRyaWNMaXN0TWl4aW4nO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcbmltcG9ydCAqIGFzIGFjdGl2aXR5VHlwZUljb25zIGZyb20gJy4uLy4uL01vZGVscy9BY3Rpdml0eS9BY3Rpdml0eVR5cGVJY29uJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcblxyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnaGlzdG9yeUxpc3QnKTtcclxuY29uc3QgYWN0aXZpdHlUeXBlUmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYWN0aXZpdHlUeXBlVGV4dCcpO1xyXG5jb25zdCBoYXNoVGFnUmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnaGlzdG9yeUxpc3RIYXNoVGFncycpO1xyXG5jb25zdCBkdEZvcm1hdFJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2hpc3RvcnlMaXN0RGF0ZVRpbWVGb3JtYXQnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLkhpc3RvcnkuTGlzdFxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5MaXN0XHJcbiAqIEBtaXhpbnMgY3JtLlZpZXdzLl9SaWdodERyYXdlckxpc3RNaXhpblxyXG4gKiBAbWl4aW5zIGNybS5WaWV3cy5fTWV0cmljTGlzdE1peGluXHJcbiAqIEBtaXhpbnMgY3JtLlZpZXdzLl9Hcm91cExpc3RNaXhpblxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuQ29udmVydFxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgY3JtLkZvcm1hdFxyXG4gKiBAcmVxdWlyZXMgY3JtLkFjdGlvblxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgbW9tZW50XHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLkhpc3RvcnkuTGlzdCcsIFtMaXN0LCBfUmlnaHREcmF3ZXJMaXN0TWl4aW4sIF9NZXRyaWNMaXN0TWl4aW5dLCB7XHJcbiAgZm9ybWF0LFxyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIGl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8cCBjbGFzcz1cImxpc3R2aWV3LWhlYWRpbmdcIj4nLFxyXG4gICAgJ3slIGlmICgkLlR5cGUgPT09IFwiYXROb3RlXCIpIHsgJX0nLFxyXG4gICAgJ3slOiAkJC5mb3JtYXREYXRlKCQuTW9kaWZ5RGF0ZSkgJX0nLFxyXG4gICAgJ3slIH0gZWxzZSB7ICV9JyxcclxuICAgICd7JTogJCQuZm9ybWF0RGF0ZSgkLkNvbXBsZXRlZERhdGUpICV9JyxcclxuICAgICd7JSB9ICV9JyxcclxuICAgICc8L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj57JT0gJCQubmFtZVRlbXBsYXRlLmFwcGx5KCQpICV9PC9wPicsXHJcbiAgICAneyUgaWYoJC5EZXNjcmlwdGlvbikgeyAlfScsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+eyU9ICQkLnJlZ2FyZGluZ1RleHQgKyAkJC5mb3JtYXRQaWNrbGlzdChcIkRlc2NyaXB0aW9uXCIpKCQuRGVzY3JpcHRpb24pICV9PC9wPicsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgICAnPGRpdiBjbGFzcz1cIm5vdGUtdGV4dC1pdGVtXCI+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwibm90ZS10ZXh0LXdyYXBcIj4nLFxyXG4gICAgJ3slOiAkLk5vdGVzICV9JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgXSksXHJcbiAgbmFtZVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJ3slIGlmICgkLkxlYWROYW1lICYmICQuQWNjb3VudE5hbWUpIHsgJX0nLFxyXG4gICAgJ3slOiAkLkxlYWROYW1lICV9IHwgeyU6ICQuQWNjb3VudE5hbWUgJX0nLFxyXG4gICAgJ3slIH0gZWxzZSBpZiAoJC5MZWFkTmFtZSkgeyAlfScsXHJcbiAgICAneyU6ICQuTGVhZE5hbWUgJX0nLFxyXG4gICAgJ3slIH0gZWxzZSBpZiAoJC5Db250YWN0TmFtZSAmJiAkLkFjY291bnROYW1lKSB7ICV9JyxcclxuICAgICd7JTogJC5Db250YWN0TmFtZSAlfSB8IHslOiAkLkFjY291bnROYW1lICV9JyxcclxuICAgICd7JSB9IGVsc2UgaWYgKCQuQ29udGFjdE5hbWUpIHsgJX0nLFxyXG4gICAgJ3slOiAkLkNvbnRhY3ROYW1lICV9JyxcclxuICAgICd7JSB9IGVsc2UgeyAlfScsXHJcbiAgICAneyU6ICQuQWNjb3VudE5hbWUgJX0nLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gIF0pLFxyXG5cclxuICAvLyBMb2NhbGl6YXRpb25cclxuICBob3VyTWludXRlRm9ybWF0VGV4dDogZHRGb3JtYXRSZXNvdXJjZS5ob3VyTWludXRlRm9ybWF0VGV4dCxcclxuICBob3VyTWludXRlRm9ybWF0VGV4dDI0OiBkdEZvcm1hdFJlc291cmNlLmhvdXJNaW51dGVGb3JtYXRUZXh0MjQsXHJcbiAgZGF0ZUZvcm1hdFRleHQ6IGR0Rm9ybWF0UmVzb3VyY2UuZGF0ZUZvcm1hdFRleHQsXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgdmlld0FjY291bnRBY3Rpb25UZXh0OiByZXNvdXJjZS52aWV3QWNjb3VudEFjdGlvblRleHQsXHJcbiAgdmlld09wcG9ydHVuaXR5QWN0aW9uVGV4dDogcmVzb3VyY2Uudmlld09wcG9ydHVuaXR5QWN0aW9uVGV4dCxcclxuICB2aWV3Q29udGFjdEFjdGlvblRleHQ6IHJlc291cmNlLnZpZXdDb250YWN0QWN0aW9uVGV4dCxcclxuICBhZGRBdHRhY2htZW50QWN0aW9uVGV4dDogcmVzb3VyY2UuYWRkQXR0YWNobWVudEFjdGlvblRleHQsXHJcbiAgcmVnYXJkaW5nVGV4dDogcmVzb3VyY2UucmVnYXJkaW5nVGV4dCxcclxuICB0b3VjaGVkVGV4dDogcmVzb3VyY2UudG91Y2hlZFRleHQsXHJcbiAgYWN0aXZpdHlUeXBlVGV4dDoge1xyXG4gICAgYXRUb0RvOiBhY3Rpdml0eVR5cGVSZXNvdXJjZS5hdFRvRG9UZXh0LFxyXG4gICAgYXRQaG9uZUNhbGw6IGFjdGl2aXR5VHlwZVJlc291cmNlLmF0UGhvbmVDYWxsVGV4dCxcclxuICAgIGF0QXBwb2ludG1lbnQ6IGFjdGl2aXR5VHlwZVJlc291cmNlLmF0QXBwb2ludG1lbnRUZXh0LFxyXG4gICAgYXRMaXRlcmF0dXJlOiBhY3Rpdml0eVR5cGVSZXNvdXJjZS5hdExpdGVyYXR1cmVUZXh0LFxyXG4gICAgYXRQZXJzb25hbDogYWN0aXZpdHlUeXBlUmVzb3VyY2UuYXRQZXJzb25hbFRleHQsXHJcbiAgICBhdFF1ZXN0aW9uOiBhY3Rpdml0eVR5cGVSZXNvdXJjZS5hdFF1ZXN0aW9uVGV4dCxcclxuICAgIGF0RU1haWw6IGFjdGl2aXR5VHlwZVJlc291cmNlLmF0RU1haWxUZXh0LFxyXG4gICAgYXROb3RlOiBhY3Rpdml0eVR5cGVSZXNvdXJjZS5hdE5vdGVUZXh0LFxyXG4gIH0sXHJcbiAgaGFzaFRhZ1F1ZXJpZXNUZXh0OiB7XHJcbiAgICAnbXktaGlzdG9yeSc6IGhhc2hUYWdSZXNvdXJjZS5teUhpc3RvcnlIYXNoLFxyXG4gICAgbm90ZTogaGFzaFRhZ1Jlc291cmNlLm5vdGVIYXNoLFxyXG4gICAgcGhvbmVjYWxsOiBoYXNoVGFnUmVzb3VyY2UucGhvbmVDYWxsSGFzaCxcclxuICAgIG1lZXRpbmc6IGhhc2hUYWdSZXNvdXJjZS5tZWV0aW5nSGFzaCxcclxuICAgIHBlcnNvbmFsOiBoYXNoVGFnUmVzb3VyY2UucGVyc29uYWxIYXNoLFxyXG4gICAgZW1haWw6IGhhc2hUYWdSZXNvdXJjZS5lbWFpbEhhc2gsXHJcbiAgfSxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgZGV0YWlsVmlldzogJ2hpc3RvcnlfZGV0YWlsJyxcclxuICBpdGVtSWNvbkNsYXNzOiAnZm9sZGVyJyxcclxuICBpZDogJ2hpc3RvcnlfbGlzdCcsXHJcbiAgc2VjdXJpdHk6IG51bGwsIC8vICdFbnRpdGllcy9IaXN0b3J5L1ZpZXcnLFxyXG4gIGV4aXN0c1JFOiAvXltcXHddezEyfSQvLFxyXG4gIGluc2VydFZpZXc6ICdoaXN0b3J5X2VkaXQnLFxyXG4gIHF1ZXJ5T3JkZXJCeTogbnVsbCxcclxuICBxdWVyeVNlbGVjdDogW10sXHJcbiAgcXVlcnlXaGVyZTogbnVsbCxcclxuICByZXNvdXJjZUtpbmQ6ICdoaXN0b3J5JyxcclxuICBlbnRpdHlOYW1lOiAnSGlzdG9yeScsXHJcbiAgaGFzaFRhZ1F1ZXJpZXM6IHtcclxuICAgICdteS1oaXN0b3J5JzogZnVuY3Rpb24gbXlIaXN0b3J5KCkge1xyXG4gICAgICByZXR1cm4gYFVzZXJJZCBlcSBcIiR7QXBwLmNvbnRleHQudXNlci4ka2V5fVwiYDtcclxuICAgIH0sXHJcbiAgICBub3RlOiAnVHlwZSBlcSBcImF0Tm90ZVwiJyxcclxuICAgIHBob25lY2FsbDogJ1R5cGUgZXEgXCJhdFBob25lQ2FsbFwiJyxcclxuICAgIG1lZXRpbmc6ICdUeXBlIGVxIFwiYXRBcHBvaW50bWVudFwiJyxcclxuICAgIHBlcnNvbmFsOiAnVHlwZSBlcSBcImF0UGVyc29uYWxcIicsXHJcbiAgICBlbWFpbDogJ1R5cGUgZXEgXCJhdEVNYWlsXCInLFxyXG4gIH0sXHJcbiAgYWN0aXZpdHlUeXBlSWNvbjogYWN0aXZpdHlUeXBlSWNvbnMuZGVmYXVsdCxcclxuICBhbGxvd1NlbGVjdGlvbjogdHJ1ZSxcclxuICBlbmFibGVBY3Rpb25zOiB0cnVlLFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuSElTVE9SWSxcclxuXHJcbiAgY3JlYXRlQWN0aW9uTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVBY3Rpb25MYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hY3Rpb25zIHx8ICh0aGlzLmFjdGlvbnMgPSBbe1xyXG4gICAgICBpZDogJ3ZpZXdBY2NvdW50JyxcclxuICAgICAgbGFiZWw6IHRoaXMudmlld0FjY291bnRBY3Rpb25UZXh0LFxyXG4gICAgICBlbmFibGVkOiBhY3Rpb24uaGFzUHJvcGVydHkuYmluZERlbGVnYXRlKHRoaXMsICdBY2NvdW50SWQnKSxcclxuICAgICAgZm46IGFjdGlvbi5uYXZpZ2F0ZVRvRW50aXR5LmJpbmREZWxlZ2F0ZSh0aGlzLCB7XHJcbiAgICAgICAgdmlldzogJ2FjY291bnRfZGV0YWlsJyxcclxuICAgICAgICBrZXlQcm9wZXJ0eTogJ0FjY291bnRJZCcsXHJcbiAgICAgICAgdGV4dFByb3BlcnR5OiAnQWNjb3VudE5hbWUnLFxyXG4gICAgICB9KSxcclxuICAgIH0sIHtcclxuICAgICAgaWQ6ICd2aWV3T3Bwb3J0dW5pdHknLFxyXG4gICAgICBsYWJlbDogdGhpcy52aWV3T3Bwb3J0dW5pdHlBY3Rpb25UZXh0LFxyXG4gICAgICBlbmFibGVkOiBhY3Rpb24uaGFzUHJvcGVydHkuYmluZERlbGVnYXRlKHRoaXMsICdPcHBvcnR1bml0eUlkJyksXHJcbiAgICAgIGZuOiBhY3Rpb24ubmF2aWdhdGVUb0VudGl0eS5iaW5kRGVsZWdhdGUodGhpcywge1xyXG4gICAgICAgIHZpZXc6ICdvcHBvcnR1bml0eV9kZXRhaWwnLFxyXG4gICAgICAgIGtleVByb3BlcnR5OiAnT3Bwb3J0dW5pdHlJZCcsXHJcbiAgICAgICAgdGV4dFByb3BlcnR5OiAnT3Bwb3J0dW5pdHlOYW1lJyxcclxuICAgICAgfSksXHJcbiAgICB9LCB7XHJcbiAgICAgIGlkOiAndmlld0NvbnRhY3QnLFxyXG4gICAgICBsYWJlbDogdGhpcy52aWV3Q29udGFjdEFjdGlvblRleHQsXHJcbiAgICAgIGFjdGlvbjogJ25hdmlnYXRlVG9Db250YWN0T3JMZWFkJyxcclxuICAgICAgZW5hYmxlZDogdGhpcy5oYXNDb250YWN0T3JMZWFkLFxyXG4gICAgfSwge1xyXG4gICAgICBpZDogJ2FkZEF0dGFjaG1lbnQnLFxyXG4gICAgICBjbHM6ICdhdHRhY2gnLFxyXG4gICAgICBsYWJlbDogdGhpcy5hZGRBdHRhY2htZW50QWN0aW9uVGV4dCxcclxuICAgICAgZm46IGFjdGlvbi5hZGRBdHRhY2htZW50LmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgIH1dKTtcclxuICB9LFxyXG4gIGhhc0NvbnRhY3RPckxlYWQ6IGZ1bmN0aW9uIGhhc0NvbnRhY3RPckxlYWQodGhlQWN0aW9uLCBzZWxlY3Rpb24pIHtcclxuICAgIHJldHVybiAoc2VsZWN0aW9uLmRhdGEuQ29udGFjdElkKSB8fCAoc2VsZWN0aW9uLmRhdGEuTGVhZElkKTtcclxuICB9LFxyXG4gIG5hdmlnYXRlVG9Db250YWN0T3JMZWFkOiBmdW5jdGlvbiBuYXZpZ2F0ZVRvQ29udGFjdE9yTGVhZCh0aGVBY3Rpb24sIHNlbGVjdGlvbikge1xyXG4gICAgY29uc3QgZW50aXR5ID0gdGhpcy5yZXNvbHZlQ29udGFjdE9yTGVhZEVudGl0eShzZWxlY3Rpb24uZGF0YSk7XHJcbiAgICBsZXQgdmlld0lkO1xyXG4gICAgbGV0IG9wdGlvbnM7XHJcblxyXG4gICAgc3dpdGNoIChlbnRpdHkpIHtcclxuICAgICAgY2FzZSAnQ29udGFjdCc6XHJcbiAgICAgICAgdmlld0lkID0gJ2NvbnRhY3RfZGV0YWlsJztcclxuICAgICAgICBvcHRpb25zID0ge1xyXG4gICAgICAgICAga2V5OiBzZWxlY3Rpb24uZGF0YS5Db250YWN0SWQsXHJcbiAgICAgICAgICBkZXNjcmlwdG9yOiBzZWxlY3Rpb24uZGF0YS5Db250YWN0TmFtZSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdMZWFkJzpcclxuICAgICAgICB2aWV3SWQgPSAnbGVhZF9kZXRhaWwnO1xyXG4gICAgICAgIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICBrZXk6IHNlbGVjdGlvbi5kYXRhLkxlYWRJZCxcclxuICAgICAgICAgIGRlc2NyaXB0b3I6IHNlbGVjdGlvbi5kYXRhLkxlYWROYW1lLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KHZpZXdJZCk7XHJcblxyXG4gICAgaWYgKHZpZXcgJiYgb3B0aW9ucykge1xyXG4gICAgICB2aWV3LnNob3cob3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICByZXNvbHZlQ29udGFjdE9yTGVhZEVudGl0eTogZnVuY3Rpb24gcmVzb2x2ZUNvbnRhY3RPckxlYWRFbnRpdHkoZW50cnkpIHtcclxuICAgIGNvbnN0IGV4aXN0cyA9IHRoaXMuZXhpc3RzUkU7XHJcblxyXG4gICAgaWYgKGVudHJ5KSB7XHJcbiAgICAgIGlmIChleGlzdHMudGVzdChlbnRyeS5MZWFkSWQpKSB7XHJcbiAgICAgICAgcmV0dXJuICdMZWFkJztcclxuICAgICAgfVxyXG4gICAgICBpZiAoZXhpc3RzLnRlc3QoZW50cnkuQ29udGFjdElkKSkge1xyXG4gICAgICAgIHJldHVybiAnQ29udGFjdCc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGZvcm1hdERhdGU6IGZ1bmN0aW9uIGZvcm1hdERhdGUoZGF0ZSkge1xyXG4gICAgY29uc3Qgc3RhcnREYXRlID0gbW9tZW50KGNvbnZlcnQudG9EYXRlRnJvbVN0cmluZyhkYXRlKSk7XHJcbiAgICBjb25zdCBuZXh0RGF0ZSA9IHN0YXJ0RGF0ZS5jbG9uZSgpLmFkZCh7XHJcbiAgICAgIGhvdXJzOiAyNCxcclxuICAgIH0pO1xyXG4gICAgbGV0IGZtdCA9IHRoaXMuZGF0ZUZvcm1hdFRleHQ7XHJcblxyXG4gICAgaWYgKHN0YXJ0RGF0ZS52YWx1ZU9mKCkgPCBuZXh0RGF0ZS52YWx1ZU9mKCkgJiYgc3RhcnREYXRlLnZhbHVlT2YoKSA+IG1vbWVudCgpLnN0YXJ0T2YoJ2RheScpLnZhbHVlT2YoKSkge1xyXG4gICAgICBmbXQgPSAoQXBwLmlzMjRIb3VyQ2xvY2soKSkgPyB0aGlzLmhvdXJNaW51dGVGb3JtYXRUZXh0MjQgOiB0aGlzLmhvdXJNaW51dGVGb3JtYXRUZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmb3JtYXQuZGF0ZShzdGFydERhdGUudG9EYXRlKCksIGZtdCk7XHJcbiAgfSxcclxuICBmb3JtYXRQaWNrbGlzdDogZnVuY3Rpb24gZm9ybWF0UGlja2xpc3QocHJvcGVydHkpIHtcclxuICAgIHJldHVybiBmb3JtYXQucGlja2xpc3QodGhpcy5hcHAucGlja2xpc3RTZXJ2aWNlLCB0aGlzLl9tb2RlbCwgcHJvcGVydHkpO1xyXG4gIH0sXHJcbiAgZm9ybWF0U2VhcmNoUXVlcnk6IGZ1bmN0aW9uIGZvcm1hdFNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5KSB7XHJcbiAgICByZXR1cm4gYHVwcGVyKERlc2NyaXB0aW9uKSBsaWtlIFwiJSR7dGhpcy5lc2NhcGVTZWFyY2hRdWVyeShzZWFyY2hRdWVyeS50b1VwcGVyQ2FzZSgpKX0lXCJgO1xyXG4gIH0sXHJcbiAgY3JlYXRlSW5kaWNhdG9yTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVJbmRpY2F0b3JMYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5pdGVtSW5kaWNhdG9ycyB8fCAodGhpcy5pdGVtSW5kaWNhdG9ycyA9IFt7XHJcbiAgICAgIGlkOiAndG91Y2hlZCcsXHJcbiAgICAgIGNsczogJ2ZsYWcnLFxyXG4gICAgICBsYWJlbDogdGhpcy50b3VjaGVkVGV4dCxcclxuICAgICAgb25BcHBseTogZnVuY3Rpb24gb25BcHBseShlbnRyeSwgcGFyZW50KSB7XHJcbiAgICAgICAgdGhpcy5pc0VuYWJsZWQgPSBwYXJlbnQuaGFzQmVlblRvdWNoZWQoZW50cnkpO1xyXG4gICAgICB9LFxyXG4gICAgfV0pO1xyXG4gIH0sXHJcbiAgaGFzQmVlblRvdWNoZWQ6IGZ1bmN0aW9uIGhhc0JlZW5Ub3VjaGVkKGVudHJ5KSB7XHJcbiAgICBpZiAoZW50cnkuTW9kaWZ5RGF0ZSkge1xyXG4gICAgICBjb25zdCBtb2RpZmllZERhdGUgPSBtb21lbnQoY29udmVydC50b0RhdGVGcm9tU3RyaW5nKGVudHJ5Lk1vZGlmeURhdGUpKTtcclxuICAgICAgY29uc3QgY3VycmVudERhdGUgPSBtb21lbnQoKS5lbmRPZignZGF5Jyk7XHJcbiAgICAgIGNvbnN0IHdlZWtBZ28gPSBtb21lbnQoKS5zdWJ0cmFjdCgxLCAnd2Vla3MnKTtcclxuXHJcbiAgICAgIHJldHVybiBtb2RpZmllZERhdGUuaXNBZnRlcih3ZWVrQWdvKSAmJlxyXG4gICAgICAgIG1vZGlmaWVkRGF0ZS5pc0JlZm9yZShjdXJyZW50RGF0ZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSxcclxuICBnZXRJdGVtSWNvbkNsYXNzOiBmdW5jdGlvbiBnZXRJdGVtSWNvbkNsYXNzKGVudHJ5KSB7XHJcbiAgICBjb25zdCB0eXBlID0gZW50cnkgJiYgZW50cnkuVHlwZTtcclxuICAgIHJldHVybiB0aGlzLl9nZXRJdGVtSWNvbkNsYXNzKHR5cGUpO1xyXG4gIH0sXHJcbiAgZ2V0VGl0bGU6IGZ1bmN0aW9uIGdldFRpdGxlKGVudHJ5KSB7XHJcbiAgICBjb25zdCB0eXBlID0gZW50cnkgJiYgZW50cnkuVHlwZTtcclxuICAgIHJldHVybiB0aGlzLmFjdGl2aXR5VHlwZVRleHRbdHlwZV0gfHwgdGhpcy50aXRsZVRleHQ7XHJcbiAgfSxcclxuICBfZ2V0SXRlbUljb25DbGFzczogZnVuY3Rpb24gX2dldEl0ZW1JY29uQ2xhc3ModHlwZSkge1xyXG4gICAgbGV0IGNscyA9IHRoaXMuYWN0aXZpdHlUeXBlSWNvblt0eXBlXTtcclxuICAgIGlmICghY2xzKSB7XHJcbiAgICAgIGNscyA9IHRoaXMuaXRlbUljb25DbGFzcztcclxuICAgIH1cclxuICAgIHJldHVybiBjbHM7XHJcbiAgfSxcclxuICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoaW5pdCwgYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIGFjdGl2YXRlRW50cnk6IGZ1bmN0aW9uIGFjdGl2YXRlRW50cnkocGFyYW1zKSB7XHJcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZW50cmllc1twYXJhbXMua2V5XTtcclxuICAgIGlmIChlbnRyeSkge1xyXG4gICAgICBjb25zdCBhY3Rpdml0eVBhcmFtcyA9IHBhcmFtcztcclxuICAgICAgYWN0aXZpdHlQYXJhbXMuZGVzY3JpcHRvciA9IHRoaXMuZ2V0VGl0bGUoZW50cnkpO1xyXG4gICAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMsIFthY3Rpdml0eVBhcmFtc10pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbmhlcml0ZWQoYWN0aXZhdGVFbnRyeSwgYXJndW1lbnRzKTtcclxuICAgIH1cclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==