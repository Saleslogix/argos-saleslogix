define('crm/Views/Contact/List', ['module', 'exports', 'dojo/_base/declare', 'crm/Action', 'argos/Format', 'argos/List', '../_GroupListMixin', '../_MetricListMixin', '../_RightDrawerListMixin', 'argos/I18n', '../../Models/Names'], function (module, exports, _declare, _Action, _Format, _List, _GroupListMixin2, _MetricListMixin2, _RightDrawerListMixin2, _I18n, _Names) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Action2 = _interopRequireDefault(_Action);

  var _Format2 = _interopRequireDefault(_Format);

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

  var resource = (0, _I18n2.default)('contactList');

  /**
   * @class crm.Views.Contact.List
   *
   * @extends argos.List
   * @mixins crm.Views._RightDrawerListMixin
   * @mixins crm.Views._MetricListMixin
   *
   * @requires argos.List
   * @requires argos.Format
   * @requires argos.Convert
   * @requires crm.Views._RightDrawerListMixin
   * @requires crm.Views._GroupListMixin
   * @requires crm.Views._MetricListMixin
   * @requires crm.Action
   *
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

  var __class = (0, _declare2.default)('crm.Views.Contact.List', [_List2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default, _GroupListMixin3.default], {
    format: _Format2.default,
    // Template
    // Card Layout
    itemIconClass: 'user',
    itemTemplate: new Simplate(['<p class="micro-text">{% if($.Title) { %} {%: $.Title %} | {% } %} {%: $.AccountName %}</p>', '<p class="micro-text">{%: $.WebAddress %}</p>', '{% if ($.WorkPhone) { %}', '<p class="micro-text">', '{%: $$.phoneAbbreviationText %} <span class="hyperlink" data-action="callWork" data-key="{%: $.$key %}">{%: $$.format.phone($.WorkPhone) %}</span>', // TODO: Avoid global
    '</p>', '{% } %}', '{% if ($.Mobile) { %}', '<p class="micro-text">', '{%: $$.mobileAbbreviationText %} <span class="hyperlink" data-action="callMobile" data-key="{%: $.$key %}">{%: $$.format.phone($.Mobile) %}</span>', // TODO: Avoid global
    '</p>', '{% } %}', '{% if ($.Email) { %}', '<p class="micro-text">', '<span class="hyperlink" data-action="sendEmail" data-key="{%: $.$key %}">{%: $.Email %}</span>', '</p>', '{% } %}']),

    // Localization
    titleText: resource.titleText,
    activitiesText: resource.activitiesText,
    notesText: resource.notesText,
    scheduleText: resource.scheduleText,
    editActionText: resource.editActionText,
    callMainActionText: resource.callMainActionText,
    callWorkActionText: resource.callWorkActionText,
    callMobileActionText: resource.callMobileActionText,
    sendEmailActionText: resource.sendEmailActionText,
    viewAccountActionText: resource.viewAccountActionText,
    addNoteActionText: resource.addNoteActionText,
    addActivityActionText: resource.addActivityActionText,
    addAttachmentActionText: resource.addAttachmentActionText,
    phoneAbbreviationText: resource.phoneAbbreviationText,
    mobileAbbreviationText: resource.mobileAbbreviationText,

    // View Properties
    detailView: 'contact_detail',
    iconClass: 'user',
    id: 'contact_list',
    security: 'Entities/Contact/View',
    insertView: 'contact_edit',
    queryOrderBy: null,
    querySelect: [],
    resourceKind: 'contacts',
    entityName: 'Contact',
    modelName: _Names2.default.CONTACT,
    groupsEnabled: true,
    enableActions: true,
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
    createActionLayout: function createActionLayout() {
      return this.actions || (this.actions = [{
        id: 'edit',
        cls: 'edit',
        label: this.editActionText,
        security: 'Entities/Contact/Edit',
        action: 'navigateToEditView'
      }, {
        id: 'callWork',
        cls: 'phone',
        label: this.callWorkActionText,
        enabled: _Action2.default.hasProperty.bindDelegate(this, 'WorkPhone'),
        fn: _Action2.default.callPhone.bindDelegate(this, 'WorkPhone')
      }, {
        id: 'callMobile',
        cls: 'phone',
        label: this.callMobileActionText,
        enabled: _Action2.default.hasProperty.bindDelegate(this, 'Mobile'),
        fn: _Action2.default.callPhone.bindDelegate(this, 'Mobile')
      }, {
        id: 'viewAccount',
        label: this.viewAccountActionText,
        enabled: _Action2.default.hasProperty.bindDelegate(this, 'Account.$key'),
        fn: _Action2.default.navigateToEntity.bindDelegate(this, {
          view: 'account_detail',
          keyProperty: 'Account.$key',
          textProperty: 'AccountName'
        })
      }, {
        id: 'sendEmail',
        cls: 'mail',
        label: this.sendEmailActionText,
        enabled: _Action2.default.hasProperty.bindDelegate(this, 'Email'),
        fn: _Action2.default.sendEmail.bindDelegate(this, 'Email')
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
      return '(LastNameUpper like "' + q + '%" or upper(FirstName) like "' + q + '%" or upper(NameLF) like "%' + q + '%") or (Account.AccountNameUpper like "%' + q + '%")';
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});