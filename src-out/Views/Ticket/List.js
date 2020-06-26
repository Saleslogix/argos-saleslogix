define("crm/Views/Ticket/List", ["exports", "dojo/_base/declare", "../../Action", "argos/List", "../_GroupListMixin", "../_MetricListMixin", "../_RightDrawerListMixin", "argos/I18n", "../../Models/Names", "crm/Format"], function (_exports, _declare, _Action, _List, _GroupListMixin2, _MetricListMixin2, _RightDrawerListMixin2, _I18n, _Names, _Format) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _Action = _interopRequireDefault(_Action);
  _List = _interopRequireDefault(_List);
  _GroupListMixin2 = _interopRequireDefault(_GroupListMixin2);
  _MetricListMixin2 = _interopRequireDefault(_MetricListMixin2);
  _RightDrawerListMixin2 = _interopRequireDefault(_RightDrawerListMixin2);
  _I18n = _interopRequireDefault(_I18n);
  _Names = _interopRequireDefault(_Names);
  _Format = _interopRequireDefault(_Format);

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
  var resource = (0, _I18n["default"])('ticketList');

  var __class = (0, _declare["default"])('crm.Views.Ticket.List', [_List["default"], _RightDrawerListMixin2["default"], _MetricListMixin2["default"], _GroupListMixin2["default"]], {
    format: _Format["default"],
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
    modelName: _Names["default"].TICKET,
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
        enabled: _Action["default"].hasProperty.bindDelegate(this, 'Account.$key'),
        fn: _Action["default"].navigateToEntity.bindDelegate(this, {
          view: 'account_detail',
          keyProperty: 'Account.$key',
          textProperty: 'Account.AccountName'
        })
      }, {
        id: 'viewContact',
        label: this.viewContactActionText,
        enabled: _Action["default"].hasProperty.bindDelegate(this, 'Contact.$key'),
        fn: _Action["default"].navigateToEntity.bindDelegate(this, {
          view: 'contact_detail',
          keyProperty: 'Contact.$key',
          textProperty: 'Contact.NameLF'
        })
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
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return "TicketNumber like \"".concat(q, "%\" or AlternateKeySuffix like \"").concat(q, "%\" or upper(Subject) like \"").concat(q, "%\" or Account.AccountNameUpper like \"").concat(q, "%\"");
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});