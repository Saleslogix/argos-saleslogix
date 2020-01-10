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
      this.inherited(groupInvokeActionByName, arguments);
    },

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return '(LastNameUpper like "' + q + '%" or upper(FirstName) like "' + q + '%" or CompanyUpper like "' + q + '%" or upper(LeadNameLastFirst) like "%' + q + '%")';
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});