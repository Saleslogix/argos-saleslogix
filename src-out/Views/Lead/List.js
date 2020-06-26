define("crm/Views/Lead/List", ["exports", "dojo/_base/declare", "../../Action", "../../Format", "argos/Utility", "argos/List", "../_GroupListMixin", "../_MetricListMixin", "../_RightDrawerListMixin", "argos/I18n", "../../Models/Names"], function (_exports, _declare, _Action, _Format, _Utility, _List, _GroupListMixin2, _MetricListMixin2, _RightDrawerListMixin2, _I18n, _Names) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _Action = _interopRequireDefault(_Action);
  _Format = _interopRequireDefault(_Format);
  _Utility = _interopRequireDefault(_Utility);
  _List = _interopRequireDefault(_List);
  _GroupListMixin2 = _interopRequireDefault(_GroupListMixin2);
  _MetricListMixin2 = _interopRequireDefault(_MetricListMixin2);
  _RightDrawerListMixin2 = _interopRequireDefault(_RightDrawerListMixin2);
  _I18n = _interopRequireDefault(_I18n);
  _Names = _interopRequireDefault(_Names);

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
  var resource = (0, _I18n["default"])('leadList');

  var __class = (0, _declare["default"])('crm.Views.Lead.List', [_List["default"], _RightDrawerListMixin2["default"], _MetricListMixin2["default"], _GroupListMixin2["default"]], {
    // Templates
    itemTemplate: new Simplate(['<p class="micro-text">', '{%: $$.joinFields(" | ", [$$.formatPicklist("Title")($.Title), $.Company]) %}', '</p>', '{% if ($.WorkPhone) { %}', '<p class="micro-text">', '{%: $$.phoneAbbreviationText %} <span class="hyperlink" data-action="callWork" data-key="{%: $.$key %}">{%: argos.Format.phone($.WorkPhone) %}</span>', // TODO: Avoid global
    '</p>', '{% } %}', '{% if ($.Mobile) { %}', '<p class="micro-text">', '{%: $$.mobileAbbreviationText %} <span class="hyperlink" data-action="callMobile" data-key="{%: $.$key %}">{%: argos.Format.phone($.Mobile) %}</span>', // TODO: Avoid global
    '</p>', '{% } %}', '{% if ($.TollFree) { %}', '<p class="micro-text">', '{%: $$.tollFreeAbbreviationText %} {%: argos.Format.phone($.TollFree) %}', // TODO: Avoid global
    '</p>', '{% } %}', '<p class="micro-text">{%: $.WebAddress %}</p>', '{% if ($.Email) { %}', '<p class="micro-text">', '<span class="hyperlink" data-action="sendEmail" data-key="{%: $.$key %}">{%: $.Email %}</span>', '</p>', '{% } %}']),
    joinFields: function joinFields(sep, fields) {
      return _Utility["default"].joinFields(sep, fields);
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
      return _Format["default"].picklist(this.app.picklistService, this._model, property);
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
    modelName: _Names["default"].LEAD,
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
        enabled: _Action["default"].hasProperty.bindDelegate(this, 'WorkPhone'),
        fn: function fn(act, selectionIn) {
          var selectionOut = _this.linkLeadProperties(selectionIn);

          _Action["default"].callPhone.call(_this, act, selectionOut, 'WorkPhone');
        }
      }, {
        id: 'callMobile',
        cls: 'phone',
        label: this.callMobileActionText,
        enabled: _Action["default"].hasProperty.bindDelegate(this, 'Mobile'),
        fn: function fn(act, selectionIn) {
          var selectionOut = _this.linkLeadProperties(selectionIn);

          _Action["default"].callPhone.call(_this, act, selectionOut, 'Mobile');
        }
      }, {
        id: 'sendEmail',
        cls: 'mail',
        label: this.sendEmailActionText,
        enabled: _Action["default"].hasProperty.bindDelegate(this, 'Email'),
        fn: function fn(act, selectionIn) {
          var selectionOut = _this.linkLeadProperties(selectionIn);

          _Action["default"].sendEmail.call(_this, act, selectionOut, 'Email');
        }
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

      this.inherited(groupInvokeActionByName, arguments);
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return "(LastNameUpper like \"".concat(q, "%\" or upper(FirstName) like \"").concat(q, "%\" or CompanyUpper like \"").concat(q, "%\" or upper(LeadNameLastFirst) like \"%").concat(q, "%\")");
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});