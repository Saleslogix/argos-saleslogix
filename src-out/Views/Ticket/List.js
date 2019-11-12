define('crm/Views/Ticket/List', ['module', 'exports', 'dojo/_base/declare', '../../Action', 'argos/List', '../_GroupListMixin', '../_MetricListMixin', '../_RightDrawerListMixin', 'argos/I18n', '../../Models/Names', 'crm/Format'], function (module, exports, _declare, _Action, _List, _GroupListMixin2, _MetricListMixin2, _RightDrawerListMixin2, _I18n, _Names, _Format) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Action2 = _interopRequireDefault(_Action);

  var _List2 = _interopRequireDefault(_List);

  var _GroupListMixin3 = _interopRequireDefault(_GroupListMixin2);

  var _MetricListMixin3 = _interopRequireDefault(_MetricListMixin2);

  var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _Names2 = _interopRequireDefault(_Names);

  var _Format2 = _interopRequireDefault(_Format);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('ticketList');

  /**
   * @class crm.Views.Ticket.List
   *
   * @extends argos.List
   * @mixins crm.Views._RightDrawerListMixin
   * @mixins crm.Views._MetricListMixin
   * @mixins crm.Views._GroupListMixin
   *
   * @requires crm.Action
   * @requires crm.Format
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

  var __class = (0, _declare2.default)('crm.Views.Ticket.List', [_List2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default, _GroupListMixin3.default], {
    format: _Format2.default,
    // Templates
    itemTemplate: new Simplate(['<p class="micro-text">{%: $.Subject %}</p>', '{% if(($.Account) && (!$.Contact)) { %}', '<p class="micro-text">{%: $$.viewContactActionText + ": " + $.Account.AccountName %}</p>', '{% } %}', '{% if(($.Account) && ($.Contact)) { %}', '<p class="micro-text">{%: $$.viewContactActionText + ": " + $.Contact.NameLF + " | " + $.Account.AccountName %}</p>', '{% } %}', '<p class="micro-text"> {%: $.AssignedTo ? ($$.assignedToText + $.AssignedTo.OwnerDescription) : this.notAssignedText %}</p>', '{% if($.Urgency) { %}', '<p class="micro-text">{%: $$.urgencyText + $.Urgency.Description %}</p>', '{% } %}', '{% if($.Area) { %}', '<p class="micro-text">{%: $$._areaCategoryIssueText($) %}</p>', '{% } %}', '{% if($.CreateDate) { %}', '<p class="micro-text">{%: $$.createdOnText %}  {%: $$.format.relativeDate($.CreateDate) %}</p>', '{% } %}', '{% if($.ModifyDate) { %}', '<p class="micro-text">{%: $$.modifiedText %}  {%: $$.format.relativeDate($.ModifyDate) %}</p>', '{% } %}', '{% if($.NeededByDate) { %}', '<p class="micro-text">{%: $$.neededByText %}  {%: $$.format.relativeDate($.NeededByDate) %}</p>', '{% } %}']),

    _areaCategoryIssueText: function _areaCategoryIssueText(feedItem) {
      var results = [feedItem.Area, feedItem.Category, feedItem.Issue];
      return results.filter(function (item) {
        return item !== '' && typeof item !== 'undefined' && item !== null;
      }).join(' > ');
    },

    // Localization
    titleText: resource.titleText,
    activitiesText: resource.activitiesText,
    scheduleText: resource.scheduleText,
    notAssignedText: resource.notAssignedText,
    editActionText: resource.editActionText,
    viewAccountActionText: resource.viewAccountActionText,
    viewContactActionText: resource.viewContactActionText,
    addNoteActionText: resource.addNoteActionText,
    addActivityActionText: resource.addActivityActionText,
    addAttachmentActionText: resource.addAttachmentActionText,
    assignedToText: resource.assignedToText,
    urgencyText: resource.urgencyText,
    createdOnText: resource.createdOnText,
    modifiedText: resource.modifiedText,
    neededByText: resource.neededByText,

    // View Properties
    detailView: 'ticket_detail',
    itemIconClass: 'expense-report',
    id: 'ticket_list',
    security: 'Entities/Ticket/View',
    insertView: 'ticket_edit',
    queryOrderBy: null,
    querySelect: [],
    modelName: _Names2.default.TICKET,
    resourceKind: 'tickets',
    entityName: 'Ticket',
    groupsEnabled: true,
    allowSelection: true,
    enableActions: true,

    createActionLayout: function createActionLayout() {
      return this.actions || (this.actions = [{
        id: 'edit',
        cls: 'edit',
        label: this.editActionText,
        action: 'navigateToEditView',
        security: 'Entities/Ticket/Edit'
      }, {
        id: 'viewAccount',
        label: this.viewAccountActionText,
        enabled: _Action2.default.hasProperty.bindDelegate(this, 'Account.$key'),
        fn: _Action2.default.navigateToEntity.bindDelegate(this, {
          view: 'account_detail',
          keyProperty: 'Account.$key',
          textProperty: 'Account.AccountName'
        })
      }, {
        id: 'viewContact',
        label: this.viewContactActionText,
        enabled: _Action2.default.hasProperty.bindDelegate(this, 'Contact.$key'),
        fn: _Action2.default.navigateToEntity.bindDelegate(this, {
          view: 'contact_detail',
          keyProperty: 'Contact.$key',
          textProperty: 'Contact.NameLF'
        })
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

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'TicketNumber like "' + q + '%" or AlternateKeySuffix like "' + q + '%" or upper(Subject) like "' + q + '%" or Account.AccountNameUpper like "' + q + '%"';
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9UaWNrZXQvTGlzdC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJmb3JtYXQiLCJpdGVtVGVtcGxhdGUiLCJTaW1wbGF0ZSIsIl9hcmVhQ2F0ZWdvcnlJc3N1ZVRleHQiLCJmZWVkSXRlbSIsInJlc3VsdHMiLCJBcmVhIiwiQ2F0ZWdvcnkiLCJJc3N1ZSIsImZpbHRlciIsIml0ZW0iLCJqb2luIiwidGl0bGVUZXh0IiwiYWN0aXZpdGllc1RleHQiLCJzY2hlZHVsZVRleHQiLCJub3RBc3NpZ25lZFRleHQiLCJlZGl0QWN0aW9uVGV4dCIsInZpZXdBY2NvdW50QWN0aW9uVGV4dCIsInZpZXdDb250YWN0QWN0aW9uVGV4dCIsImFkZE5vdGVBY3Rpb25UZXh0IiwiYWRkQWN0aXZpdHlBY3Rpb25UZXh0IiwiYWRkQXR0YWNobWVudEFjdGlvblRleHQiLCJhc3NpZ25lZFRvVGV4dCIsInVyZ2VuY3lUZXh0IiwiY3JlYXRlZE9uVGV4dCIsIm1vZGlmaWVkVGV4dCIsIm5lZWRlZEJ5VGV4dCIsImRldGFpbFZpZXciLCJpdGVtSWNvbkNsYXNzIiwiaWQiLCJzZWN1cml0eSIsImluc2VydFZpZXciLCJxdWVyeU9yZGVyQnkiLCJxdWVyeVNlbGVjdCIsIm1vZGVsTmFtZSIsIlRJQ0tFVCIsInJlc291cmNlS2luZCIsImVudGl0eU5hbWUiLCJncm91cHNFbmFibGVkIiwiYWxsb3dTZWxlY3Rpb24iLCJlbmFibGVBY3Rpb25zIiwiY3JlYXRlQWN0aW9uTGF5b3V0IiwiYWN0aW9ucyIsImNscyIsImxhYmVsIiwiYWN0aW9uIiwiZW5hYmxlZCIsImhhc1Byb3BlcnR5IiwiYmluZERlbGVnYXRlIiwiZm4iLCJuYXZpZ2F0ZVRvRW50aXR5IiwidmlldyIsImtleVByb3BlcnR5IiwidGV4dFByb3BlcnR5IiwiYWRkTm90ZSIsImFkZEFjdGl2aXR5IiwiYWRkQXR0YWNobWVudCIsImZvcm1hdFNlYXJjaFF1ZXJ5Iiwic2VhcmNo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QSxpQkFBVCxDQUEyQkMsV0FBM0IsRUFBd0M7QUFDekQsVUFBTUMsSUFBSSxLQUFLQyxpQkFBTCxDQUF1QkYsWUFBWUcsV0FBWixFQUF2QixDQUFWO0FBQ0EscUNBQTZCRixDQUE3Qix1Q0FBZ0VBLENBQWhFLG1DQUErRkEsQ0FBL0YsNkNBQXdJQSxDQUF4STtBQUNEO0FBbEhnSCxHQUFuRyxDQUFoQjs7b0JBcUhlNUQsTyIsImZpbGUiOiJMaXN0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGFjdGlvbiBmcm9tICcuLi8uLi9BY3Rpb24nO1xyXG5pbXBvcnQgTGlzdCBmcm9tICdhcmdvcy9MaXN0JztcclxuaW1wb3J0IF9Hcm91cExpc3RNaXhpbiBmcm9tICcuLi9fR3JvdXBMaXN0TWl4aW4nO1xyXG5pbXBvcnQgX01ldHJpY0xpc3RNaXhpbiBmcm9tICcuLi9fTWV0cmljTGlzdE1peGluJztcclxuaW1wb3J0IF9SaWdodERyYXdlckxpc3RNaXhpbiBmcm9tICcuLi9fUmlnaHREcmF3ZXJMaXN0TWl4aW4nO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi8uLi9Nb2RlbHMvTmFtZXMnO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJ2NybS9Gb3JtYXQnO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgndGlja2V0TGlzdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuVGlja2V0Lkxpc3RcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuTGlzdFxyXG4gKiBAbWl4aW5zIGNybS5WaWV3cy5fUmlnaHREcmF3ZXJMaXN0TWl4aW5cclxuICogQG1peGlucyBjcm0uVmlld3MuX01ldHJpY0xpc3RNaXhpblxyXG4gKiBAbWl4aW5zIGNybS5WaWV3cy5fR3JvdXBMaXN0TWl4aW5cclxuICpcclxuICogQHJlcXVpcmVzIGNybS5BY3Rpb25cclxuICogQHJlcXVpcmVzIGNybS5Gb3JtYXRcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuVGlja2V0Lkxpc3QnLCBbTGlzdCwgX1JpZ2h0RHJhd2VyTGlzdE1peGluLCBfTWV0cmljTGlzdE1peGluLCBfR3JvdXBMaXN0TWl4aW5dLCB7XHJcbiAgZm9ybWF0LFxyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIGl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj57JTogJC5TdWJqZWN0ICV9PC9wPicsXHJcbiAgICAneyUgaWYoKCQuQWNjb3VudCkgJiYgKCEkLkNvbnRhY3QpKSB7ICV9JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj57JTogJCQudmlld0NvbnRhY3RBY3Rpb25UZXh0ICsgXCI6IFwiICsgJC5BY2NvdW50LkFjY291bnROYW1lICV9PC9wPicsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgICAneyUgaWYoKCQuQWNjb3VudCkgJiYgKCQuQ29udGFjdCkpIHsgJX0nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPnslOiAkJC52aWV3Q29udGFjdEFjdGlvblRleHQgKyBcIjogXCIgKyAkLkNvbnRhY3QuTmFtZUxGICsgXCIgfCBcIiArICQuQWNjb3VudC5BY2NvdW50TmFtZSAlfTwvcD4nLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPiB7JTogJC5Bc3NpZ25lZFRvID8gKCQkLmFzc2lnbmVkVG9UZXh0ICsgJC5Bc3NpZ25lZFRvLk93bmVyRGVzY3JpcHRpb24pIDogdGhpcy5ub3RBc3NpZ25lZFRleHQgJX08L3A+JyxcclxuICAgICd7JSBpZigkLlVyZ2VuY3kpIHsgJX0nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPnslOiAkJC51cmdlbmN5VGV4dCArICQuVXJnZW5jeS5EZXNjcmlwdGlvbiAlfTwvcD4nLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gICAgJ3slIGlmKCQuQXJlYSkgeyAlfScsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+eyU6ICQkLl9hcmVhQ2F0ZWdvcnlJc3N1ZVRleHQoJCkgJX08L3A+JyxcclxuICAgICd7JSB9ICV9JyxcclxuICAgICd7JSBpZigkLkNyZWF0ZURhdGUpIHsgJX0nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPnslOiAkJC5jcmVhdGVkT25UZXh0ICV9ICB7JTogJCQuZm9ybWF0LnJlbGF0aXZlRGF0ZSgkLkNyZWF0ZURhdGUpICV9PC9wPicsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgICAneyUgaWYoJC5Nb2RpZnlEYXRlKSB7ICV9JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj57JTogJCQubW9kaWZpZWRUZXh0ICV9ICB7JTogJCQuZm9ybWF0LnJlbGF0aXZlRGF0ZSgkLk1vZGlmeURhdGUpICV9PC9wPicsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgICAneyUgaWYoJC5OZWVkZWRCeURhdGUpIHsgJX0nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPnslOiAkJC5uZWVkZWRCeVRleHQgJX0gIHslOiAkJC5mb3JtYXQucmVsYXRpdmVEYXRlKCQuTmVlZGVkQnlEYXRlKSAlfTwvcD4nLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gIF0pLFxyXG5cclxuICBfYXJlYUNhdGVnb3J5SXNzdWVUZXh0OiBmdW5jdGlvbiBfYXJlYUNhdGVnb3J5SXNzdWVUZXh0KGZlZWRJdGVtKSB7XHJcbiAgICBjb25zdCByZXN1bHRzID0gW2ZlZWRJdGVtLkFyZWEsIGZlZWRJdGVtLkNhdGVnb3J5LCBmZWVkSXRlbS5Jc3N1ZV07XHJcbiAgICByZXR1cm4gcmVzdWx0cy5maWx0ZXIoKGl0ZW0pID0+IHtcclxuICAgICAgcmV0dXJuIGl0ZW0gIT09ICcnICYmIHR5cGVvZiBpdGVtICE9PSAndW5kZWZpbmVkJyAmJiBpdGVtICE9PSBudWxsO1xyXG4gICAgfSkuam9pbignID4gJyk7XHJcbiAgfSxcclxuXHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgYWN0aXZpdGllc1RleHQ6IHJlc291cmNlLmFjdGl2aXRpZXNUZXh0LFxyXG4gIHNjaGVkdWxlVGV4dDogcmVzb3VyY2Uuc2NoZWR1bGVUZXh0LFxyXG4gIG5vdEFzc2lnbmVkVGV4dDogcmVzb3VyY2Uubm90QXNzaWduZWRUZXh0LFxyXG4gIGVkaXRBY3Rpb25UZXh0OiByZXNvdXJjZS5lZGl0QWN0aW9uVGV4dCxcclxuICB2aWV3QWNjb3VudEFjdGlvblRleHQ6IHJlc291cmNlLnZpZXdBY2NvdW50QWN0aW9uVGV4dCxcclxuICB2aWV3Q29udGFjdEFjdGlvblRleHQ6IHJlc291cmNlLnZpZXdDb250YWN0QWN0aW9uVGV4dCxcclxuICBhZGROb3RlQWN0aW9uVGV4dDogcmVzb3VyY2UuYWRkTm90ZUFjdGlvblRleHQsXHJcbiAgYWRkQWN0aXZpdHlBY3Rpb25UZXh0OiByZXNvdXJjZS5hZGRBY3Rpdml0eUFjdGlvblRleHQsXHJcbiAgYWRkQXR0YWNobWVudEFjdGlvblRleHQ6IHJlc291cmNlLmFkZEF0dGFjaG1lbnRBY3Rpb25UZXh0LFxyXG4gIGFzc2lnbmVkVG9UZXh0OiByZXNvdXJjZS5hc3NpZ25lZFRvVGV4dCxcclxuICB1cmdlbmN5VGV4dDogcmVzb3VyY2UudXJnZW5jeVRleHQsXHJcbiAgY3JlYXRlZE9uVGV4dDogcmVzb3VyY2UuY3JlYXRlZE9uVGV4dCxcclxuICBtb2RpZmllZFRleHQ6IHJlc291cmNlLm1vZGlmaWVkVGV4dCxcclxuICBuZWVkZWRCeVRleHQ6IHJlc291cmNlLm5lZWRlZEJ5VGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgZGV0YWlsVmlldzogJ3RpY2tldF9kZXRhaWwnLFxyXG4gIGl0ZW1JY29uQ2xhc3M6ICdleHBlbnNlLXJlcG9ydCcsXHJcbiAgaWQ6ICd0aWNrZXRfbGlzdCcsXHJcbiAgc2VjdXJpdHk6ICdFbnRpdGllcy9UaWNrZXQvVmlldycsXHJcbiAgaW5zZXJ0VmlldzogJ3RpY2tldF9lZGl0JyxcclxuICBxdWVyeU9yZGVyQnk6IG51bGwsXHJcbiAgcXVlcnlTZWxlY3Q6IFtdLFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuVElDS0VULFxyXG4gIHJlc291cmNlS2luZDogJ3RpY2tldHMnLFxyXG4gIGVudGl0eU5hbWU6ICdUaWNrZXQnLFxyXG4gIGdyb3Vwc0VuYWJsZWQ6IHRydWUsXHJcbiAgYWxsb3dTZWxlY3Rpb246IHRydWUsXHJcbiAgZW5hYmxlQWN0aW9uczogdHJ1ZSxcclxuXHJcbiAgY3JlYXRlQWN0aW9uTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVBY3Rpb25MYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hY3Rpb25zIHx8ICh0aGlzLmFjdGlvbnMgPSBbe1xyXG4gICAgICBpZDogJ2VkaXQnLFxyXG4gICAgICBjbHM6ICdlZGl0JyxcclxuICAgICAgbGFiZWw6IHRoaXMuZWRpdEFjdGlvblRleHQsXHJcbiAgICAgIGFjdGlvbjogJ25hdmlnYXRlVG9FZGl0VmlldycsXHJcbiAgICAgIHNlY3VyaXR5OiAnRW50aXRpZXMvVGlja2V0L0VkaXQnLFxyXG4gICAgfSwge1xyXG4gICAgICBpZDogJ3ZpZXdBY2NvdW50JyxcclxuICAgICAgbGFiZWw6IHRoaXMudmlld0FjY291bnRBY3Rpb25UZXh0LFxyXG4gICAgICBlbmFibGVkOiBhY3Rpb24uaGFzUHJvcGVydHkuYmluZERlbGVnYXRlKHRoaXMsICdBY2NvdW50LiRrZXknKSxcclxuICAgICAgZm46IGFjdGlvbi5uYXZpZ2F0ZVRvRW50aXR5LmJpbmREZWxlZ2F0ZSh0aGlzLCB7XHJcbiAgICAgICAgdmlldzogJ2FjY291bnRfZGV0YWlsJyxcclxuICAgICAgICBrZXlQcm9wZXJ0eTogJ0FjY291bnQuJGtleScsXHJcbiAgICAgICAgdGV4dFByb3BlcnR5OiAnQWNjb3VudC5BY2NvdW50TmFtZScsXHJcbiAgICAgIH0pLFxyXG4gICAgfSwge1xyXG4gICAgICBpZDogJ3ZpZXdDb250YWN0JyxcclxuICAgICAgbGFiZWw6IHRoaXMudmlld0NvbnRhY3RBY3Rpb25UZXh0LFxyXG4gICAgICBlbmFibGVkOiBhY3Rpb24uaGFzUHJvcGVydHkuYmluZERlbGVnYXRlKHRoaXMsICdDb250YWN0LiRrZXknKSxcclxuICAgICAgZm46IGFjdGlvbi5uYXZpZ2F0ZVRvRW50aXR5LmJpbmREZWxlZ2F0ZSh0aGlzLCB7XHJcbiAgICAgICAgdmlldzogJ2NvbnRhY3RfZGV0YWlsJyxcclxuICAgICAgICBrZXlQcm9wZXJ0eTogJ0NvbnRhY3QuJGtleScsXHJcbiAgICAgICAgdGV4dFByb3BlcnR5OiAnQ29udGFjdC5OYW1lTEYnLFxyXG4gICAgICB9KSxcclxuICAgIH0sIHtcclxuICAgICAgaWQ6ICdhZGROb3RlJyxcclxuICAgICAgY2xzOiAnZWRpdCcsXHJcbiAgICAgIGxhYmVsOiB0aGlzLmFkZE5vdGVBY3Rpb25UZXh0LFxyXG4gICAgICBmbjogYWN0aW9uLmFkZE5vdGUuYmluZERlbGVnYXRlKHRoaXMpLFxyXG4gICAgfSwge1xyXG4gICAgICBpZDogJ2FkZEFjdGl2aXR5JyxcclxuICAgICAgY2xzOiAnY2FsZW5kYXInLFxyXG4gICAgICBsYWJlbDogdGhpcy5hZGRBY3Rpdml0eUFjdGlvblRleHQsXHJcbiAgICAgIGZuOiBhY3Rpb24uYWRkQWN0aXZpdHkuYmluZERlbGVnYXRlKHRoaXMpLFxyXG4gICAgfSwge1xyXG4gICAgICBpZDogJ2FkZEF0dGFjaG1lbnQnLFxyXG4gICAgICBjbHM6ICdhdHRhY2gnLFxyXG4gICAgICBsYWJlbDogdGhpcy5hZGRBdHRhY2htZW50QWN0aW9uVGV4dCxcclxuICAgICAgZm46IGFjdGlvbi5hZGRBdHRhY2htZW50LmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgIH1dKTtcclxuICB9LFxyXG5cclxuICBmb3JtYXRTZWFyY2hRdWVyeTogZnVuY3Rpb24gZm9ybWF0U2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkpIHtcclxuICAgIGNvbnN0IHEgPSB0aGlzLmVzY2FwZVNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5LnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgcmV0dXJuIGBUaWNrZXROdW1iZXIgbGlrZSBcIiR7cX0lXCIgb3IgQWx0ZXJuYXRlS2V5U3VmZml4IGxpa2UgXCIke3F9JVwiIG9yIHVwcGVyKFN1YmplY3QpIGxpa2UgXCIke3F9JVwiIG9yIEFjY291bnQuQWNjb3VudE5hbWVVcHBlciBsaWtlIFwiJHtxfSVcImA7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=