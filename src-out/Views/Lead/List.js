define('crm/Views/Lead/List', ['module', 'exports', 'dojo/_base/declare', '../../Action', '../../Format', 'argos/Utility', 'argos/List', '../_GroupListMixin', '../_MetricListMixin', '../_RightDrawerListMixin', 'argos/I18n', '../../Models/Names'], function (module, exports, _declare, _Action, _Format, _Utility, _List, _GroupListMixin2, _MetricListMixin2, _RightDrawerListMixin2, _I18n, _Names) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Action2 = _interopRequireDefault(_Action);

  var _Format2 = _interopRequireDefault(_Format);

  var _Utility2 = _interopRequireDefault(_Utility);

  var _List2 = _interopRequireDefault(_List);

  var _GroupListMixin3 = _interopRequireDefault(_GroupListMixin2);

  var _MetricListMixin3 = _interopRequireDefault(_MetricListMixin2);

  var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _Names2 = _interopRequireDefault(_Names);

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

  var resource = (0, _I18n2.default)('leadList');

  /**
   * @class crm.Views.Lead.List
   *
   * @extends argos.List
   * @mixins crm.Views._RightDrawerListMixin
   * @mixins crm.Views._MetricListMixin
   * @mixins crm.Views._GroupListMixin
   *
   * @requires argos.Format
   * @requires argos.Utility
   *
   * @requires crm.Action
   */
  var __class = (0, _declare2.default)('crm.Views.Lead.List', [_List2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default, _GroupListMixin3.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="micro-text">', '{%: $$.joinFields(" | ", [$$.formatPicklist("Title")($.Title), $.Company]) %}', '</p>', '{% if ($.WorkPhone) { %}', '<p class="micro-text">', '{%: $$.phoneAbbreviationText %} <span class="hyperlink" data-action="callWork" data-key="{%: $.$key %}">{%: argos.Format.phone($.WorkPhone) %}</span>', // TODO: Avoid global
    '</p>', '{% } %}', '{% if ($.Mobile) { %}', '<p class="micro-text">', '{%: $$.mobileAbbreviationText %} <span class="hyperlink" data-action="callMobile" data-key="{%: $.$key %}">{%: argos.Format.phone($.Mobile) %}</span>', // TODO: Avoid global
    '</p>', '{% } %}', '{% if ($.TollFree) { %}', '<p class="micro-text">', '{%: $$.tollFreeAbbreviationText %} {%: argos.Format.phone($.TollFree) %}', // TODO: Avoid global
    '</p>', '{% } %}', '<p class="micro-text">{%: $.WebAddress %}</p>', '{% if ($.Email) { %}', '<p class="micro-text">', '<span class="hyperlink" data-action="sendEmail" data-key="{%: $.$key %}">{%: $.Email %}</span>', '</p>', '{% } %}']),

    joinFields: function joinFields(sep, fields) {
      return _Utility2.default.joinFields(sep, fields);
    },
    callWork: function callWork(params) {
      this.invokeActionItemBy(function (theAction) {
        return theAction.id === 'callWork';
      }, params.key);
    },
    callMobile: function callMobile(params) {
      this.invokeActionItemBy(function (theAction) {
        return theAction.id === 'callMobile';
      }, params.key);
    },
    sendEmail: function sendEmail(params) {
      this.invokeActionItemBy(function (theAction) {
        return theAction.id === 'sendEmail';
      }, params.key);
    },
    formatPicklist: function formatPicklist(property) {
      return _Format2.default.picklist(this.app.picklistService, this._model, property);
    },

    // Localization
    titleText: resource.titleText,
    activitiesText: resource.activitiesText,
    notesText: resource.notesText,
    scheduleText: resource.scheduleText,
    emailedText: resource.emailedText,
    calledText: resource.calledText,
    editActionText: resource.editActionText,
    callMobileActionText: resource.callMobileActionText,
    callWorkActionText: resource.callWorkActionText,
    sendEmailActionText: resource.sendEmailActionText,
    addNoteActionText: resource.addNoteActionText,
    addActivityActionText: resource.addActivityActionText,
    addAttachmentActionText: resource.addAttachmentActionText,
    phoneAbbreviationText: resource.phoneAbbreviationText,
    mobileAbbreviationText: resource.mobileAbbreviationText,
    tollFreeAbbreviationText: resource.tollFreeAbbreviationText,

    // View Properties
    detailView: 'lead_detail',
    itemIconClass: 'agent',
    iconTemplate: new Simplate(['<span class="fa-stack">', '<i class="fa fa-square-o fa-stack-2x"></i>', '<i class="fa fa-user fa-stack-1x fa-inverse"></i>', '</span>']),
    id: 'lead_list',
    security: 'Entities/Lead/View',
    insertView: 'lead_edit',
    queryOrderBy: null,
    querySelect: [],
    modelName: _Names2.default.LEAD,
    resourceKind: 'leads',
    entityName: 'Lead',
    groupsEnabled: true,
    allowSelection: true,
    enableActions: true,
    createActionLayout: function createActionLayout() {
      var _this = this;

      return this.actions || (this.actions = [{
        id: 'edit',
        cls: 'edit',
        label: this.editActionText,
        action: 'navigateToEditView',
        security: 'Entities/Lead/Edit'
      }, {
        id: 'callWork',
        cls: 'phone',
        label: this.callWorkActionText,
        enabled: _Action2.default.hasProperty.bindDelegate(this, 'WorkPhone'),
        fn: function fn(act, selectionIn) {
          var selectionOut = _this.linkLeadProperties(selectionIn);
          _Action2.default.callPhone.call(_this, act, selectionOut, 'WorkPhone');
        }
      }, {
        id: 'callMobile',
        cls: 'phone',
        label: this.callMobileActionText,
        enabled: _Action2.default.hasProperty.bindDelegate(this, 'Mobile'),
        fn: function fn(act, selectionIn) {
          var selectionOut = _this.linkLeadProperties(selectionIn);
          _Action2.default.callPhone.call(_this, act, selectionOut, 'Mobile');
        }
      }, {
        id: 'sendEmail',
        cls: 'mail',
        label: this.sendEmailActionText,
        enabled: _Action2.default.hasProperty.bindDelegate(this, 'Email'),
        fn: function fn(act, selectionIn) {
          var selectionOut = _this.linkLeadProperties(selectionIn);
          _Action2.default.sendEmail.call(_this, act, selectionOut, 'Email');
        }
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

    linkLeadProperties: function linkLeadProperties() {
      var selection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var data = selection.data;


      if (data) {
        selection.data.LeadId = data.$key;
        selection.data.AccountName = data.Company;
        selection.data.LeadName = data.LeadNameLastFirst;
      }
      return selection;
    },

    groupInvokeActionByName: function groupInvokeActionByName(actionName, options) {
      if (options) {
        options.selection = this.linkLeadProperties(options.selection);
      }
      this.inherited(arguments);
    },

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return '(LastNameUpper like "' + q + '%" or upper(FirstName) like "' + q + '%" or CompanyUpper like "' + q + '%" or upper(LeadNameLastFirst) like "%' + q + '%")';
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9MZWFkL0xpc3QuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiaXRlbVRlbXBsYXRlIiwiU2ltcGxhdGUiLCJqb2luRmllbGRzIiwic2VwIiwiZmllbGRzIiwiY2FsbFdvcmsiLCJwYXJhbXMiLCJpbnZva2VBY3Rpb25JdGVtQnkiLCJ0aGVBY3Rpb24iLCJpZCIsImtleSIsImNhbGxNb2JpbGUiLCJzZW5kRW1haWwiLCJmb3JtYXRQaWNrbGlzdCIsInByb3BlcnR5IiwicGlja2xpc3QiLCJhcHAiLCJwaWNrbGlzdFNlcnZpY2UiLCJfbW9kZWwiLCJ0aXRsZVRleHQiLCJhY3Rpdml0aWVzVGV4dCIsIm5vdGVzVGV4dCIsInNjaGVkdWxlVGV4dCIsImVtYWlsZWRUZXh0IiwiY2FsbGVkVGV4dCIsImVkaXRBY3Rpb25UZXh0IiwiY2FsbE1vYmlsZUFjdGlvblRleHQiLCJjYWxsV29ya0FjdGlvblRleHQiLCJzZW5kRW1haWxBY3Rpb25UZXh0IiwiYWRkTm90ZUFjdGlvblRleHQiLCJhZGRBY3Rpdml0eUFjdGlvblRleHQiLCJhZGRBdHRhY2htZW50QWN0aW9uVGV4dCIsInBob25lQWJicmV2aWF0aW9uVGV4dCIsIm1vYmlsZUFiYnJldmlhdGlvblRleHQiLCJ0b2xsRnJlZUFiYnJldmlhdGlvblRleHQiLCJkZXRhaWxWaWV3IiwiaXRlbUljb25DbGFzcyIsImljb25UZW1wbGF0ZSIsInNlY3VyaXR5IiwiaW5zZXJ0VmlldyIsInF1ZXJ5T3JkZXJCeSIsInF1ZXJ5U2VsZWN0IiwibW9kZWxOYW1lIiwiTEVBRCIsInJlc291cmNlS2luZCIsImVudGl0eU5hbWUiLCJncm91cHNFbmFibGVkIiwiYWxsb3dTZWxlY3Rpb24iLCJlbmFibGVBY3Rpb25zIiwiY3JlYXRlQWN0aW9uTGF5b3V0IiwiYWN0aW9ucyIsImNscyIsImxhYmVsIiwiYWN0aW9uIiwiZW5hYmxlZCIsImhhc1Byb3BlcnR5IiwiYmluZERlbGVnYXRlIiwiZm4iLCJhY3QiLCJzZWxlY3Rpb25JbiIsInNlbGVjdGlvbk91dCIsImxpbmtMZWFkUHJvcGVydGllcyIsImNhbGxQaG9uZSIsImNhbGwiLCJhZGROb3RlIiwiYWRkQWN0aXZpdHkiLCJhZGRBdHRhY2htZW50Iiwic2VsZWN0aW9uIiwiZGF0YSIsIkxlYWRJZCIsIiRrZXkiLCJBY2NvdW50TmFtZSIsIkNvbXBhbnkiLCJMZWFkTmFtZSIsIkxlYWROYW1lTGFzdEZpcnN0IiwiZ3JvdXBJbnZva2VBY3Rpb25CeU5hbWUiLCJhY3Rpb25OYW1lIiwib3B0aW9ucyIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImZvcm1hdFNlYXJjaFF1ZXJ5Iiwic2VhcmNoUXVlcnkiLCJxIiwiZXNjYXBlU2VhcmNoUXVlcnkiLCJ0b1VwcGVyQ2FzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsTUFBTUEsV0FBVyxvQkFBWSxVQUFaLENBQWpCOztBQUVBOzs7Ozs7Ozs7Ozs7O0FBYUEsTUFBTUMsVUFBVSx1QkFBUSxxQkFBUixFQUErQixxR0FBL0IsRUFBaUc7QUFDL0c7QUFDQUMsa0JBQWMsSUFBSUMsUUFBSixDQUFhLENBQ3pCLHdCQUR5QixFQUV6QiwrRUFGeUIsRUFHekIsTUFIeUIsRUFJekIsMEJBSnlCLEVBS3pCLHdCQUx5QixFQU16Qix1SkFOeUIsRUFNZ0k7QUFDekosVUFQeUIsRUFRekIsU0FSeUIsRUFTekIsdUJBVHlCLEVBVXpCLHdCQVZ5QixFQVd6Qix1SkFYeUIsRUFXZ0k7QUFDekosVUFaeUIsRUFhekIsU0FieUIsRUFjekIseUJBZHlCLEVBZXpCLHdCQWZ5QixFQWdCekIsMEVBaEJ5QixFQWdCbUQ7QUFDNUUsVUFqQnlCLEVBa0J6QixTQWxCeUIsRUFtQnpCLCtDQW5CeUIsRUFvQnpCLHNCQXBCeUIsRUFxQnpCLHdCQXJCeUIsRUFzQnpCLGdHQXRCeUIsRUF1QnpCLE1BdkJ5QixFQXdCekIsU0F4QnlCLENBQWIsQ0FG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S1csU0FBTCxDQUFlQyxTQUFmO0FBQ0QsS0E3SjhHOztBQStKL0dDLHVCQUFtQixTQUFTQSxpQkFBVCxDQUEyQkMsV0FBM0IsRUFBd0M7QUFDekQsVUFBTUMsSUFBSSxLQUFLQyxpQkFBTCxDQUF1QkYsWUFBWUcsV0FBWixFQUF2QixDQUFWO0FBQ0EsdUNBQStCRixDQUEvQixxQ0FBZ0VBLENBQWhFLGlDQUE2RkEsQ0FBN0YsOENBQXVJQSxDQUF2STtBQUNEO0FBbEs4RyxHQUFqRyxDQUFoQjs7b0JBcUtlbkYsTyIsImZpbGUiOiJMaXN0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGFjdGlvbiBmcm9tICcuLi8uLi9BY3Rpb24nO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJy4uLy4uL0Zvcm1hdCc7XHJcbmltcG9ydCB1dGlsaXR5IGZyb20gJ2FyZ29zL1V0aWxpdHknO1xyXG5pbXBvcnQgTGlzdCBmcm9tICdhcmdvcy9MaXN0JztcclxuaW1wb3J0IF9Hcm91cExpc3RNaXhpbiBmcm9tICcuLi9fR3JvdXBMaXN0TWl4aW4nO1xyXG5pbXBvcnQgX01ldHJpY0xpc3RNaXhpbiBmcm9tICcuLi9fTWV0cmljTGlzdE1peGluJztcclxuaW1wb3J0IF9SaWdodERyYXdlckxpc3RNaXhpbiBmcm9tICcuLi9fUmlnaHREcmF3ZXJMaXN0TWl4aW4nO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi8uLi9Nb2RlbHMvTmFtZXMnO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnbGVhZExpc3QnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLkxlYWQuTGlzdFxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5MaXN0XHJcbiAqIEBtaXhpbnMgY3JtLlZpZXdzLl9SaWdodERyYXdlckxpc3RNaXhpblxyXG4gKiBAbWl4aW5zIGNybS5WaWV3cy5fTWV0cmljTGlzdE1peGluXHJcbiAqIEBtaXhpbnMgY3JtLlZpZXdzLl9Hcm91cExpc3RNaXhpblxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuRm9ybWF0XHJcbiAqIEByZXF1aXJlcyBhcmdvcy5VdGlsaXR5XHJcbiAqXHJcbiAqIEByZXF1aXJlcyBjcm0uQWN0aW9uXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLkxlYWQuTGlzdCcsIFtMaXN0LCBfUmlnaHREcmF3ZXJMaXN0TWl4aW4sIF9NZXRyaWNMaXN0TWl4aW4sIF9Hcm91cExpc3RNaXhpbl0sIHtcclxuICAvLyBUZW1wbGF0ZXNcclxuICBpdGVtVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+JyxcclxuICAgICd7JTogJCQuam9pbkZpZWxkcyhcIiB8IFwiLCBbJCQuZm9ybWF0UGlja2xpc3QoXCJUaXRsZVwiKSgkLlRpdGxlKSwgJC5Db21wYW55XSkgJX0nLFxyXG4gICAgJzwvcD4nLFxyXG4gICAgJ3slIGlmICgkLldvcmtQaG9uZSkgeyAlfScsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+JyxcclxuICAgICd7JTogJCQucGhvbmVBYmJyZXZpYXRpb25UZXh0ICV9IDxzcGFuIGNsYXNzPVwiaHlwZXJsaW5rXCIgZGF0YS1hY3Rpb249XCJjYWxsV29ya1wiIGRhdGEta2V5PVwieyU6ICQuJGtleSAlfVwiPnslOiBhcmdvcy5Gb3JtYXQucGhvbmUoJC5Xb3JrUGhvbmUpICV9PC9zcGFuPicsIC8vIFRPRE86IEF2b2lkIGdsb2JhbFxyXG4gICAgJzwvcD4nLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gICAgJ3slIGlmICgkLk1vYmlsZSkgeyAlfScsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+JyxcclxuICAgICd7JTogJCQubW9iaWxlQWJicmV2aWF0aW9uVGV4dCAlfSA8c3BhbiBjbGFzcz1cImh5cGVybGlua1wiIGRhdGEtYWN0aW9uPVwiY2FsbE1vYmlsZVwiIGRhdGEta2V5PVwieyU6ICQuJGtleSAlfVwiPnslOiBhcmdvcy5Gb3JtYXQucGhvbmUoJC5Nb2JpbGUpICV9PC9zcGFuPicsIC8vIFRPRE86IEF2b2lkIGdsb2JhbFxyXG4gICAgJzwvcD4nLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gICAgJ3slIGlmICgkLlRvbGxGcmVlKSB7ICV9JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj4nLFxyXG4gICAgJ3slOiAkJC50b2xsRnJlZUFiYnJldmlhdGlvblRleHQgJX0geyU6IGFyZ29zLkZvcm1hdC5waG9uZSgkLlRvbGxGcmVlKSAlfScsIC8vIFRPRE86IEF2b2lkIGdsb2JhbFxyXG4gICAgJzwvcD4nLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPnslOiAkLldlYkFkZHJlc3MgJX08L3A+JyxcclxuICAgICd7JSBpZiAoJC5FbWFpbCkgeyAlfScsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+JyxcclxuICAgICc8c3BhbiBjbGFzcz1cImh5cGVybGlua1wiIGRhdGEtYWN0aW9uPVwic2VuZEVtYWlsXCIgZGF0YS1rZXk9XCJ7JTogJC4ka2V5ICV9XCI+eyU6ICQuRW1haWwgJX08L3NwYW4+JyxcclxuICAgICc8L3A+JyxcclxuICAgICd7JSB9ICV9JyxcclxuICBdKSxcclxuXHJcbiAgam9pbkZpZWxkczogZnVuY3Rpb24gam9pbkZpZWxkcyhzZXAsIGZpZWxkcykge1xyXG4gICAgcmV0dXJuIHV0aWxpdHkuam9pbkZpZWxkcyhzZXAsIGZpZWxkcyk7XHJcbiAgfSxcclxuICBjYWxsV29yazogZnVuY3Rpb24gY2FsbFdvcmsocGFyYW1zKSB7XHJcbiAgICB0aGlzLmludm9rZUFjdGlvbkl0ZW1CeSgodGhlQWN0aW9uKSA9PiB7XHJcbiAgICAgIHJldHVybiB0aGVBY3Rpb24uaWQgPT09ICdjYWxsV29yayc7XHJcbiAgICB9LCBwYXJhbXMua2V5KTtcclxuICB9LFxyXG4gIGNhbGxNb2JpbGU6IGZ1bmN0aW9uIGNhbGxNb2JpbGUocGFyYW1zKSB7XHJcbiAgICB0aGlzLmludm9rZUFjdGlvbkl0ZW1CeSgodGhlQWN0aW9uKSA9PiB7XHJcbiAgICAgIHJldHVybiB0aGVBY3Rpb24uaWQgPT09ICdjYWxsTW9iaWxlJztcclxuICAgIH0sIHBhcmFtcy5rZXkpO1xyXG4gIH0sXHJcbiAgc2VuZEVtYWlsOiBmdW5jdGlvbiBzZW5kRW1haWwocGFyYW1zKSB7XHJcbiAgICB0aGlzLmludm9rZUFjdGlvbkl0ZW1CeSgodGhlQWN0aW9uKSA9PiB7XHJcbiAgICAgIHJldHVybiB0aGVBY3Rpb24uaWQgPT09ICdzZW5kRW1haWwnO1xyXG4gICAgfSwgcGFyYW1zLmtleSk7XHJcbiAgfSxcclxuICBmb3JtYXRQaWNrbGlzdDogZnVuY3Rpb24gZm9ybWF0UGlja2xpc3QocHJvcGVydHkpIHtcclxuICAgIHJldHVybiBmb3JtYXQucGlja2xpc3QodGhpcy5hcHAucGlja2xpc3RTZXJ2aWNlLCB0aGlzLl9tb2RlbCwgcHJvcGVydHkpO1xyXG4gIH0sXHJcblxyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIGFjdGl2aXRpZXNUZXh0OiByZXNvdXJjZS5hY3Rpdml0aWVzVGV4dCxcclxuICBub3Rlc1RleHQ6IHJlc291cmNlLm5vdGVzVGV4dCxcclxuICBzY2hlZHVsZVRleHQ6IHJlc291cmNlLnNjaGVkdWxlVGV4dCxcclxuICBlbWFpbGVkVGV4dDogcmVzb3VyY2UuZW1haWxlZFRleHQsXHJcbiAgY2FsbGVkVGV4dDogcmVzb3VyY2UuY2FsbGVkVGV4dCxcclxuICBlZGl0QWN0aW9uVGV4dDogcmVzb3VyY2UuZWRpdEFjdGlvblRleHQsXHJcbiAgY2FsbE1vYmlsZUFjdGlvblRleHQ6IHJlc291cmNlLmNhbGxNb2JpbGVBY3Rpb25UZXh0LFxyXG4gIGNhbGxXb3JrQWN0aW9uVGV4dDogcmVzb3VyY2UuY2FsbFdvcmtBY3Rpb25UZXh0LFxyXG4gIHNlbmRFbWFpbEFjdGlvblRleHQ6IHJlc291cmNlLnNlbmRFbWFpbEFjdGlvblRleHQsXHJcbiAgYWRkTm90ZUFjdGlvblRleHQ6IHJlc291cmNlLmFkZE5vdGVBY3Rpb25UZXh0LFxyXG4gIGFkZEFjdGl2aXR5QWN0aW9uVGV4dDogcmVzb3VyY2UuYWRkQWN0aXZpdHlBY3Rpb25UZXh0LFxyXG4gIGFkZEF0dGFjaG1lbnRBY3Rpb25UZXh0OiByZXNvdXJjZS5hZGRBdHRhY2htZW50QWN0aW9uVGV4dCxcclxuICBwaG9uZUFiYnJldmlhdGlvblRleHQ6IHJlc291cmNlLnBob25lQWJicmV2aWF0aW9uVGV4dCxcclxuICBtb2JpbGVBYmJyZXZpYXRpb25UZXh0OiByZXNvdXJjZS5tb2JpbGVBYmJyZXZpYXRpb25UZXh0LFxyXG4gIHRvbGxGcmVlQWJicmV2aWF0aW9uVGV4dDogcmVzb3VyY2UudG9sbEZyZWVBYmJyZXZpYXRpb25UZXh0LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBkZXRhaWxWaWV3OiAnbGVhZF9kZXRhaWwnLFxyXG4gIGl0ZW1JY29uQ2xhc3M6ICdhZ2VudCcsXHJcbiAgaWNvblRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxzcGFuIGNsYXNzPVwiZmEtc3RhY2tcIj4nLFxyXG4gICAgJzxpIGNsYXNzPVwiZmEgZmEtc3F1YXJlLW8gZmEtc3RhY2stMnhcIj48L2k+JyxcclxuICAgICc8aSBjbGFzcz1cImZhIGZhLXVzZXIgZmEtc3RhY2stMXggZmEtaW52ZXJzZVwiPjwvaT4nLFxyXG4gICAgJzwvc3Bhbj4nLFxyXG4gIF0pLFxyXG4gIGlkOiAnbGVhZF9saXN0JyxcclxuICBzZWN1cml0eTogJ0VudGl0aWVzL0xlYWQvVmlldycsXHJcbiAgaW5zZXJ0VmlldzogJ2xlYWRfZWRpdCcsXHJcbiAgcXVlcnlPcmRlckJ5OiBudWxsLFxyXG4gIHF1ZXJ5U2VsZWN0OiBbXSxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLkxFQUQsXHJcbiAgcmVzb3VyY2VLaW5kOiAnbGVhZHMnLFxyXG4gIGVudGl0eU5hbWU6ICdMZWFkJyxcclxuICBncm91cHNFbmFibGVkOiB0cnVlLFxyXG4gIGFsbG93U2VsZWN0aW9uOiB0cnVlLFxyXG4gIGVuYWJsZUFjdGlvbnM6IHRydWUsXHJcbiAgY3JlYXRlQWN0aW9uTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVBY3Rpb25MYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hY3Rpb25zIHx8ICh0aGlzLmFjdGlvbnMgPSBbe1xyXG4gICAgICBpZDogJ2VkaXQnLFxyXG4gICAgICBjbHM6ICdlZGl0JyxcclxuICAgICAgbGFiZWw6IHRoaXMuZWRpdEFjdGlvblRleHQsXHJcbiAgICAgIGFjdGlvbjogJ25hdmlnYXRlVG9FZGl0VmlldycsXHJcbiAgICAgIHNlY3VyaXR5OiAnRW50aXRpZXMvTGVhZC9FZGl0JyxcclxuICAgIH0sIHtcclxuICAgICAgaWQ6ICdjYWxsV29yaycsXHJcbiAgICAgIGNsczogJ3Bob25lJyxcclxuICAgICAgbGFiZWw6IHRoaXMuY2FsbFdvcmtBY3Rpb25UZXh0LFxyXG4gICAgICBlbmFibGVkOiBhY3Rpb24uaGFzUHJvcGVydHkuYmluZERlbGVnYXRlKHRoaXMsICdXb3JrUGhvbmUnKSxcclxuICAgICAgZm46IChhY3QsIHNlbGVjdGlvbkluKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uT3V0ID0gdGhpcy5saW5rTGVhZFByb3BlcnRpZXMoc2VsZWN0aW9uSW4pO1xyXG4gICAgICAgIGFjdGlvbi5jYWxsUGhvbmUuY2FsbCh0aGlzLCBhY3QsIHNlbGVjdGlvbk91dCwgJ1dvcmtQaG9uZScpO1xyXG4gICAgICB9LFxyXG4gICAgfSwge1xyXG4gICAgICBpZDogJ2NhbGxNb2JpbGUnLFxyXG4gICAgICBjbHM6ICdwaG9uZScsXHJcbiAgICAgIGxhYmVsOiB0aGlzLmNhbGxNb2JpbGVBY3Rpb25UZXh0LFxyXG4gICAgICBlbmFibGVkOiBhY3Rpb24uaGFzUHJvcGVydHkuYmluZERlbGVnYXRlKHRoaXMsICdNb2JpbGUnKSxcclxuICAgICAgZm46IChhY3QsIHNlbGVjdGlvbkluKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uT3V0ID0gdGhpcy5saW5rTGVhZFByb3BlcnRpZXMoc2VsZWN0aW9uSW4pO1xyXG4gICAgICAgIGFjdGlvbi5jYWxsUGhvbmUuY2FsbCh0aGlzLCBhY3QsIHNlbGVjdGlvbk91dCwgJ01vYmlsZScpO1xyXG4gICAgICB9LFxyXG4gICAgfSwge1xyXG4gICAgICBpZDogJ3NlbmRFbWFpbCcsXHJcbiAgICAgIGNsczogJ21haWwnLFxyXG4gICAgICBsYWJlbDogdGhpcy5zZW5kRW1haWxBY3Rpb25UZXh0LFxyXG4gICAgICBlbmFibGVkOiBhY3Rpb24uaGFzUHJvcGVydHkuYmluZERlbGVnYXRlKHRoaXMsICdFbWFpbCcpLFxyXG4gICAgICBmbjogKGFjdCwgc2VsZWN0aW9uSW4pID0+IHtcclxuICAgICAgICBjb25zdCBzZWxlY3Rpb25PdXQgPSB0aGlzLmxpbmtMZWFkUHJvcGVydGllcyhzZWxlY3Rpb25Jbik7XHJcbiAgICAgICAgYWN0aW9uLnNlbmRFbWFpbC5jYWxsKHRoaXMsIGFjdCwgc2VsZWN0aW9uT3V0LCAnRW1haWwnKTtcclxuICAgICAgfSxcclxuICAgIH0sIHtcclxuICAgICAgaWQ6ICdhZGROb3RlJyxcclxuICAgICAgY2xzOiAnZWRpdCcsXHJcbiAgICAgIGxhYmVsOiB0aGlzLmFkZE5vdGVBY3Rpb25UZXh0LFxyXG4gICAgICBmbjogYWN0aW9uLmFkZE5vdGUuYmluZERlbGVnYXRlKHRoaXMpLFxyXG4gICAgfSwge1xyXG4gICAgICBpZDogJ2FkZEFjdGl2aXR5JyxcclxuICAgICAgY2xzOiAnY2FsZW5kYXInLFxyXG4gICAgICBsYWJlbDogdGhpcy5hZGRBY3Rpdml0eUFjdGlvblRleHQsXHJcbiAgICAgIGZuOiBhY3Rpb24uYWRkQWN0aXZpdHkuYmluZERlbGVnYXRlKHRoaXMpLFxyXG4gICAgfSwge1xyXG4gICAgICBpZDogJ2FkZEF0dGFjaG1lbnQnLFxyXG4gICAgICBjbHM6ICdhdHRhY2gnLFxyXG4gICAgICBsYWJlbDogdGhpcy5hZGRBdHRhY2htZW50QWN0aW9uVGV4dCxcclxuICAgICAgZm46IGFjdGlvbi5hZGRBdHRhY2htZW50LmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgIH1dKTtcclxuICB9LFxyXG5cclxuICBsaW5rTGVhZFByb3BlcnRpZXM6IGZ1bmN0aW9uIGxpbmtMZWFkUHJvcGVydGllcyhzZWxlY3Rpb24gPSB7fSkge1xyXG4gICAgY29uc3QgeyBkYXRhIH0gPSBzZWxlY3Rpb247XHJcblxyXG4gICAgaWYgKGRhdGEpIHtcclxuICAgICAgc2VsZWN0aW9uLmRhdGEuTGVhZElkID0gZGF0YS4ka2V5O1xyXG4gICAgICBzZWxlY3Rpb24uZGF0YS5BY2NvdW50TmFtZSA9IGRhdGEuQ29tcGFueTtcclxuICAgICAgc2VsZWN0aW9uLmRhdGEuTGVhZE5hbWUgPSBkYXRhLkxlYWROYW1lTGFzdEZpcnN0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNlbGVjdGlvbjtcclxuICB9LFxyXG5cclxuICBncm91cEludm9rZUFjdGlvbkJ5TmFtZTogZnVuY3Rpb24gZ3JvdXBJbnZva2VBY3Rpb25CeU5hbWUoYWN0aW9uTmFtZSwgb3B0aW9ucykge1xyXG4gICAgaWYgKG9wdGlvbnMpIHtcclxuICAgICAgb3B0aW9ucy5zZWxlY3Rpb24gPSB0aGlzLmxpbmtMZWFkUHJvcGVydGllcyhvcHRpb25zLnNlbGVjdGlvbik7XHJcbiAgICB9XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gIH0sXHJcblxyXG4gIGZvcm1hdFNlYXJjaFF1ZXJ5OiBmdW5jdGlvbiBmb3JtYXRTZWFyY2hRdWVyeShzZWFyY2hRdWVyeSkge1xyXG4gICAgY29uc3QgcSA9IHRoaXMuZXNjYXBlU2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkudG9VcHBlckNhc2UoKSk7XHJcbiAgICByZXR1cm4gYChMYXN0TmFtZVVwcGVyIGxpa2UgXCIke3F9JVwiIG9yIHVwcGVyKEZpcnN0TmFtZSkgbGlrZSBcIiR7cX0lXCIgb3IgQ29tcGFueVVwcGVyIGxpa2UgXCIke3F9JVwiIG9yIHVwcGVyKExlYWROYW1lTGFzdEZpcnN0KSBsaWtlIFwiJSR7cX0lXCIpYDtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==