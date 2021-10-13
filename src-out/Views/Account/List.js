define('crm/Views/Account/List', ['module', 'exports', 'dojo/_base/declare', '../../Action', 'argos/Utility', 'argos/List', '../_GroupListMixin', '../_MetricListMixin', '../_RightDrawerListMixin', '../../Models/Names', '../../Models/Activity/ActivityTypeText', 'argos/I18n'], function (module, exports, _declare, _Action, _Utility, _List, _GroupListMixin2, _MetricListMixin2, _RightDrawerListMixin2, _Names, _ActivityTypeText, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Action2 = _interopRequireDefault(_Action);

  var _Utility2 = _interopRequireDefault(_Utility);

  var _List2 = _interopRequireDefault(_List);

  var _GroupListMixin3 = _interopRequireDefault(_GroupListMixin2);

  var _MetricListMixin3 = _interopRequireDefault(_MetricListMixin2);

  var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

  var _Names2 = _interopRequireDefault(_Names);

  var _ActivityTypeText2 = _interopRequireDefault(_ActivityTypeText);

  var _I18n2 = _interopRequireDefault(_I18n);

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

  const resource = (0, _I18n2.default)('accountList');

  const __class = (0, _declare2.default)('crm.Views.Account.List', [_List2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default, _GroupListMixin3.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="micro-text">{%: $.Industry %}</p>', '<p class="micro-text">', '{%: $$.joinFields(" | ", [$.Type, $.SubType]) %}', '</p>', '<p class="micro-text">{%: $.AccountManager && $.AccountManager.UserInfo ? $.AccountManager.UserInfo.UserName : "" %}', '{% if ($.Owner && $.Owner.OwnerDescription) { %} | {%: $.Owner.OwnerDescription %}{% } %}</p>', '<p class="micro-text">{%: $.WebAddress %}</p>', '{% if ($.MainPhone) { %}', '<p class="micro-text">', '{%: $$.phoneAbbreviationText %} <span class="hyperlink" data-action="callMain" data-key="{%: $.$key %}">{%: argos.Format.phone($.MainPhone) %}</span>', // TODO: Avoid global
    '</p>', '{% } %}', '{% if ($.Fax) { %}', '<p class="micro-text">', '{%: $$.faxAbbreviationText + argos.Format.phone($.Fax) %}', // TODO: Avoid global
    '</p>', '{% } %}']),
    groupsEnabled: true,
    enableDynamicGroupLayout: true,

    joinFields: function joinFields(sep, fields) {
      return _Utility2.default.joinFields(sep, fields);
    },

    // Localization
    titleText: resource.titleText,
    activitiesText: resource.titleText,
    notesText: resource.notesText,
    scheduleText: resource.scheduleText,
    editActionText: resource.editActionText,
    callMainActionText: resource.callMainActionText,
    viewContactsActionText: resource.viewContactsActionText,
    addNoteActionText: resource.addNoteActionText,
    addActivityActionText: resource.addActivityActionText,
    addAttachmentActionText: resource.addAttachmentActionText,
    phoneAbbreviationText: resource.phoneAbbreviationText,
    faxAbbreviationText: resource.faxAbbreviationText,
    offlineText: resource.offlineText,

    // View Properties
    detailView: 'account_detail',
    itemIconClass: 'spreadsheet', // todo: replace with appropriate icon
    id: 'account_list',
    security: 'Entities/Account/View',
    insertView: 'account_edit',
    insertSecurity: 'Entities/Account/Add',
    entityName: 'Account',
    allowSelection: true,
    enableActions: true,
    offlineIds: null,
    resourceKind: 'accounts',
    modelName: _Names2.default.ACCOUNT,

    callMain: function callMain(params) {
      this.invokeActionItemBy(a => {
        return a.id === 'callMain';
      }, params.key);
    },
    createActionLayout: function createActionLayout() {
      return this.actions || (this.actions = [{
        id: 'edit',
        cls: 'edit',
        label: this.editActionText,
        security: 'Entities/Account/Edit',
        action: 'navigateToEditView'
      }, {
        id: 'callMain',
        cls: 'phone',
        label: this.callMainActionText,
        enabled: _Action2.default.hasProperty.bindDelegate(this, 'MainPhone'),
        fn: _Action2.default.callPhone.bindDelegate(this, 'MainPhone', _ActivityTypeText2.default.atPhoneCall)
      }, {
        id: 'viewContacts',
        label: this.viewContactsActionText,
        fn: this.navigateToRelatedView.bindDelegate(this, 'contact_related', 'Account.id eq "${0}"')
      }, {
        id: 'addNote',
        cls: 'quick-edit',
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
      const q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return `AccountNameUpper like "${q}%"`;
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});