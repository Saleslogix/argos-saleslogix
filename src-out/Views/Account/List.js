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

  var resource = (0, _I18n2.default)('accountList');

  /**
   * @class crm.Views.Account.List
   *
   * @extends argos.List
   * @requires argos.List
   * @requires argos.Format
   * @requires argos.Utility
   * @requires argos.Convert
   *
   * @requires crm.Action
   * @requires crm.Views._GroupListMixin
   * @requires crm.Views._MetricListMixin
   * @requires crm.Views._RightDrawerListMixin
   *
   */
  var __class = (0, _declare2.default)('crm.Views.Account.List', [_List2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default, _GroupListMixin3.default], {
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
      this.invokeActionItemBy(function (a) {
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
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'AccountNameUpper like "' + q + '%"';
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9BY2NvdW50L0xpc3QuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiaXRlbVRlbXBsYXRlIiwiU2ltcGxhdGUiLCJncm91cHNFbmFibGVkIiwiZW5hYmxlRHluYW1pY0dyb3VwTGF5b3V0Iiwiam9pbkZpZWxkcyIsInNlcCIsImZpZWxkcyIsInRpdGxlVGV4dCIsImFjdGl2aXRpZXNUZXh0Iiwibm90ZXNUZXh0Iiwic2NoZWR1bGVUZXh0IiwiZWRpdEFjdGlvblRleHQiLCJjYWxsTWFpbkFjdGlvblRleHQiLCJ2aWV3Q29udGFjdHNBY3Rpb25UZXh0IiwiYWRkTm90ZUFjdGlvblRleHQiLCJhZGRBY3Rpdml0eUFjdGlvblRleHQiLCJhZGRBdHRhY2htZW50QWN0aW9uVGV4dCIsInBob25lQWJicmV2aWF0aW9uVGV4dCIsImZheEFiYnJldmlhdGlvblRleHQiLCJvZmZsaW5lVGV4dCIsImRldGFpbFZpZXciLCJpdGVtSWNvbkNsYXNzIiwiaWQiLCJzZWN1cml0eSIsImluc2VydFZpZXciLCJpbnNlcnRTZWN1cml0eSIsImVudGl0eU5hbWUiLCJhbGxvd1NlbGVjdGlvbiIsImVuYWJsZUFjdGlvbnMiLCJvZmZsaW5lSWRzIiwicmVzb3VyY2VLaW5kIiwibW9kZWxOYW1lIiwiQUNDT1VOVCIsImNhbGxNYWluIiwicGFyYW1zIiwiaW52b2tlQWN0aW9uSXRlbUJ5IiwiYSIsImtleSIsImNyZWF0ZUFjdGlvbkxheW91dCIsImFjdGlvbnMiLCJjbHMiLCJsYWJlbCIsImFjdGlvbiIsImVuYWJsZWQiLCJoYXNQcm9wZXJ0eSIsImJpbmREZWxlZ2F0ZSIsImZuIiwiY2FsbFBob25lIiwiYXRQaG9uZUNhbGwiLCJuYXZpZ2F0ZVRvUmVsYXRlZFZpZXciLCJhZGROb3RlIiwiYWRkQWN0aXZpdHkiLCJhZGRBdHRhY2htZW50IiwiZm9ybWF0U2VhcmNoUXVlcnkiLCJzZWFyY2hRdWVyeSIsInEiLCJlc2NhcGVTZWFyY2hRdWVyeSIsInRvVXBwZXJDYXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQTJCQSxNQUFNQSxXQUFXLG9CQUFZLGFBQVosQ0FBakI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7OztBQWVBLE1BQU1DLFVBQVUsdUJBQVEsd0JBQVIsRUFBa0MscUdBQWxDLEVBQW9HO0FBQ2xIO0FBQ0FDLGtCQUFjLElBQUlDLFFBQUosQ0FBYSxDQUN6Qiw2Q0FEeUIsRUFFekIsd0JBRnlCLEVBR3pCLGtEQUh5QixFQUl6QixNQUp5QixFQUt6QixzSEFMeUIsRUFNekIsK0ZBTnlCLEVBT3pCLCtDQVB5QixFQVF6QiwwQkFSeUIsRUFTekIsd0JBVHlCLEVBVXpCLHVKQVZ5QixFQVVnSTtBQUN6SixVQVh5QixFQVl6QixTQVp5QixFQWF6QixvQkFieUIsRUFjekIsd0JBZHlCLEVBZXpCLDJEQWZ5QixFQWVvQztBQUM3RCxVQWhCeUIsRUFpQnpCLFNBakJ5QixDQUFiLENBRm9HO0FBcUJsSEMsbUJBQWUsSUFyQm1HO0FBc0JsSEMsOEJBQTBCLElBdEJ3Rjs7QUF3QmxIQyxnQkFBWSxTQUFTQSxVQUFULENBQW9CQyxHQUFwQixFQUF5QkMsTUFBekIsRUFBaUM7QUFDM0MsYUFBTyxrQkFBUUYsVUFBUixDQUFtQkMsR0FBbkIsRUFBd0JDLE1BQXhCLENBQVA7QUFDRCxLQTFCaUg7O0FBNEJsSDtBQUNBQyxlQUFXVCxTQUFTUyxTQTdCOEY7QUE4QmxIQyxvQkFBZ0JWLFNBQVNTLFNBOUJ5RjtBQStCbEhFLGVBQVdYLFNBQVNXLFNBL0I4RjtBQWdDbEhDLGtCQUFjWixTQUFTWSxZQWhDMkY7QUFpQ2xIQyxvQkFBZ0JiLFNBQVNhLGNBakN5RjtBQWtDbEhDLHdCQUFvQmQsU0FBU2Msa0JBbENxRjtBQW1DbEhDLDRCQUF3QmYsU0FBU2Usc0JBbkNpRjtBQW9DbEhDLHVCQUFtQmhCLFNBQVNnQixpQkFwQ3NGO0FBcUNsSEMsMkJBQXVCakIsU0FBU2lCLHFCQXJDa0Y7QUFzQ2xIQyw2QkFBeUJsQixTQUFTa0IsdUJBdENnRjtBQXVDbEhDLDJCQUF1Qm5CLFNBQVNtQixxQkF2Q2tGO0FBd0NsSEMseUJBQXFCcEIsU0FBU29CLG1CQXhDb0Y7QUF5Q2xIQyxpQkFBYXJCLFNBQVNxQixXQXpDNEY7O0FBMkNsSDtBQUNBQyxnQkFBWSxnQkE1Q3NHO0FBNkNsSEMsbUJBQWUsYUE3Q21HLEVBNkNwRjtBQUM5QkMsUUFBSSxjQTlDOEc7QUErQ2xIQyxjQUFVLHVCQS9Dd0c7QUFnRGxIQyxnQkFBWSxjQWhEc0c7QUFpRGxIQyxvQkFBZ0Isc0JBakRrRztBQWtEbEhDLGdCQUFZLFNBbERzRztBQW1EbEhDLG9CQUFnQixJQW5Ea0c7QUFvRGxIQyxtQkFBZSxJQXBEbUc7QUFxRGxIQyxnQkFBWSxJQXJEc0c7QUFzRGxIQyxrQkFBYyxVQXREb0c7QUF1RGxIQyxlQUFXLGdCQUFZQyxPQXZEMkY7O0FBeURsSEMsY0FBVSxTQUFTQSxRQUFULENBQWtCQyxNQUFsQixFQUEwQjtBQUNsQyxXQUFLQyxrQkFBTCxDQUF3QixVQUFDQyxDQUFELEVBQU87QUFDN0IsZUFBT0EsRUFBRWQsRUFBRixLQUFTLFVBQWhCO0FBQ0QsT0FGRCxFQUVHWSxPQUFPRyxHQUZWO0FBR0QsS0E3RGlIO0FBOERsSEMsd0JBQW9CLFNBQVNBLGtCQUFULEdBQThCO0FBQ2hELGFBQU8sS0FBS0MsT0FBTCxLQUFpQixLQUFLQSxPQUFMLEdBQWUsQ0FBQztBQUN0Q2pCLFlBQUksTUFEa0M7QUFFdENrQixhQUFLLE1BRmlDO0FBR3RDQyxlQUFPLEtBQUs5QixjQUgwQjtBQUl0Q1ksa0JBQVUsdUJBSjRCO0FBS3RDbUIsZ0JBQVE7QUFMOEIsT0FBRCxFQU1wQztBQUNEcEIsWUFBSSxVQURIO0FBRURrQixhQUFLLE9BRko7QUFHREMsZUFBTyxLQUFLN0Isa0JBSFg7QUFJRCtCLGlCQUFTLGlCQUFPQyxXQUFQLENBQW1CQyxZQUFuQixDQUFnQyxJQUFoQyxFQUFzQyxXQUF0QyxDQUpSO0FBS0RDLFlBQUksaUJBQU9DLFNBQVAsQ0FBaUJGLFlBQWpCLENBQThCLElBQTlCLEVBQW9DLFdBQXBDLEVBQWlELDJCQUFpQkcsV0FBbEU7QUFMSCxPQU5vQyxFQVlwQztBQUNEMUIsWUFBSSxjQURIO0FBRURtQixlQUFPLEtBQUs1QixzQkFGWDtBQUdEaUMsWUFBSSxLQUFLRyxxQkFBTCxDQUEyQkosWUFBM0IsQ0FBd0MsSUFBeEMsRUFBOEMsaUJBQTlDLEVBQWlFLHNCQUFqRTtBQUhILE9BWm9DLEVBZ0JwQztBQUNEdkIsWUFBSSxTQURIO0FBRURrQixhQUFLLFlBRko7QUFHREMsZUFBTyxLQUFLM0IsaUJBSFg7QUFJRGdDLFlBQUksaUJBQU9JLE9BQVAsQ0FBZUwsWUFBZixDQUE0QixJQUE1QjtBQUpILE9BaEJvQyxFQXFCcEM7QUFDRHZCLFlBQUksYUFESDtBQUVEa0IsYUFBSyxVQUZKO0FBR0RDLGVBQU8sS0FBSzFCLHFCQUhYO0FBSUQrQixZQUFJLGlCQUFPSyxXQUFQLENBQW1CTixZQUFuQixDQUFnQyxJQUFoQztBQUpILE9BckJvQyxFQTBCcEM7QUFDRHZCLFlBQUksZUFESDtBQUVEa0IsYUFBSyxRQUZKO0FBR0RDLGVBQU8sS0FBS3pCLHVCQUhYO0FBSUQ4QixZQUFJLGlCQUFPTSxhQUFQLENBQXFCUCxZQUFyQixDQUFrQyxJQUFsQztBQUpILE9BMUJvQyxDQUFoQyxDQUFQO0FBZ0NELEtBL0ZpSDtBQWdHbEhRLHVCQUFtQixTQUFTQSxpQkFBVCxDQUEyQkMsV0FBM0IsRUFBd0M7QUFDekQsVUFBTUMsSUFBSSxLQUFLQyxpQkFBTCxDQUF1QkYsWUFBWUcsV0FBWixFQUF2QixDQUFWO0FBQ0EseUNBQWlDRixDQUFqQztBQUNEO0FBbkdpSCxHQUFwRyxDQUFoQjs7b0JBc0dleEQsTyIsImZpbGUiOiJMaXN0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGFjdGlvbiBmcm9tICcuLi8uLi9BY3Rpb24nO1xyXG5pbXBvcnQgdXRpbGl0eSBmcm9tICdhcmdvcy9VdGlsaXR5JztcclxuaW1wb3J0IExpc3QgZnJvbSAnYXJnb3MvTGlzdCc7XHJcbmltcG9ydCBfR3JvdXBMaXN0TWl4aW4gZnJvbSAnLi4vX0dyb3VwTGlzdE1peGluJztcclxuaW1wb3J0IF9NZXRyaWNMaXN0TWl4aW4gZnJvbSAnLi4vX01ldHJpY0xpc3RNaXhpbic7XHJcbmltcG9ydCBfUmlnaHREcmF3ZXJMaXN0TWl4aW4gZnJvbSAnLi4vX1JpZ2h0RHJhd2VyTGlzdE1peGluJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCBBY3Rpdml0eVR5cGVUZXh0IGZyb20gJy4uLy4uL01vZGVscy9BY3Rpdml0eS9BY3Rpdml0eVR5cGVUZXh0JztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2FjY291bnRMaXN0Jyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5BY2NvdW50Lkxpc3RcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuTGlzdFxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuTGlzdFxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuRm9ybWF0XHJcbiAqIEByZXF1aXJlcyBhcmdvcy5VdGlsaXR5XHJcbiAqIEByZXF1aXJlcyBhcmdvcy5Db252ZXJ0XHJcbiAqXHJcbiAqIEByZXF1aXJlcyBjcm0uQWN0aW9uXHJcbiAqIEByZXF1aXJlcyBjcm0uVmlld3MuX0dyb3VwTGlzdE1peGluXHJcbiAqIEByZXF1aXJlcyBjcm0uVmlld3MuX01ldHJpY0xpc3RNaXhpblxyXG4gKiBAcmVxdWlyZXMgY3JtLlZpZXdzLl9SaWdodERyYXdlckxpc3RNaXhpblxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5BY2NvdW50Lkxpc3QnLCBbTGlzdCwgX1JpZ2h0RHJhd2VyTGlzdE1peGluLCBfTWV0cmljTGlzdE1peGluLCBfR3JvdXBMaXN0TWl4aW5dLCB7XHJcbiAgLy8gVGVtcGxhdGVzXHJcbiAgaXRlbVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPnslOiAkLkluZHVzdHJ5ICV9PC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+JyxcclxuICAgICd7JTogJCQuam9pbkZpZWxkcyhcIiB8IFwiLCBbJC5UeXBlLCAkLlN1YlR5cGVdKSAlfScsXHJcbiAgICAnPC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+eyU6ICQuQWNjb3VudE1hbmFnZXIgJiYgJC5BY2NvdW50TWFuYWdlci5Vc2VySW5mbyA/ICQuQWNjb3VudE1hbmFnZXIuVXNlckluZm8uVXNlck5hbWUgOiBcIlwiICV9JyxcclxuICAgICd7JSBpZiAoJC5Pd25lciAmJiAkLk93bmVyLk93bmVyRGVzY3JpcHRpb24pIHsgJX0gfCB7JTogJC5Pd25lci5Pd25lckRlc2NyaXB0aW9uICV9eyUgfSAlfTwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPnslOiAkLldlYkFkZHJlc3MgJX08L3A+JyxcclxuICAgICd7JSBpZiAoJC5NYWluUGhvbmUpIHsgJX0nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPicsXHJcbiAgICAneyU6ICQkLnBob25lQWJicmV2aWF0aW9uVGV4dCAlfSA8c3BhbiBjbGFzcz1cImh5cGVybGlua1wiIGRhdGEtYWN0aW9uPVwiY2FsbE1haW5cIiBkYXRhLWtleT1cInslOiAkLiRrZXkgJX1cIj57JTogYXJnb3MuRm9ybWF0LnBob25lKCQuTWFpblBob25lKSAlfTwvc3Bhbj4nLCAvLyBUT0RPOiBBdm9pZCBnbG9iYWxcclxuICAgICc8L3A+JyxcclxuICAgICd7JSB9ICV9JyxcclxuICAgICd7JSBpZiAoJC5GYXgpIHsgJX0nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPicsXHJcbiAgICAneyU6ICQkLmZheEFiYnJldmlhdGlvblRleHQgKyBhcmdvcy5Gb3JtYXQucGhvbmUoJC5GYXgpICV9JywgLy8gVE9ETzogQXZvaWQgZ2xvYmFsXHJcbiAgICAnPC9wPicsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgXSksXHJcbiAgZ3JvdXBzRW5hYmxlZDogdHJ1ZSxcclxuICBlbmFibGVEeW5hbWljR3JvdXBMYXlvdXQ6IHRydWUsXHJcblxyXG4gIGpvaW5GaWVsZHM6IGZ1bmN0aW9uIGpvaW5GaWVsZHMoc2VwLCBmaWVsZHMpIHtcclxuICAgIHJldHVybiB1dGlsaXR5LmpvaW5GaWVsZHMoc2VwLCBmaWVsZHMpO1xyXG4gIH0sXHJcblxyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIGFjdGl2aXRpZXNUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgbm90ZXNUZXh0OiByZXNvdXJjZS5ub3Rlc1RleHQsXHJcbiAgc2NoZWR1bGVUZXh0OiByZXNvdXJjZS5zY2hlZHVsZVRleHQsXHJcbiAgZWRpdEFjdGlvblRleHQ6IHJlc291cmNlLmVkaXRBY3Rpb25UZXh0LFxyXG4gIGNhbGxNYWluQWN0aW9uVGV4dDogcmVzb3VyY2UuY2FsbE1haW5BY3Rpb25UZXh0LFxyXG4gIHZpZXdDb250YWN0c0FjdGlvblRleHQ6IHJlc291cmNlLnZpZXdDb250YWN0c0FjdGlvblRleHQsXHJcbiAgYWRkTm90ZUFjdGlvblRleHQ6IHJlc291cmNlLmFkZE5vdGVBY3Rpb25UZXh0LFxyXG4gIGFkZEFjdGl2aXR5QWN0aW9uVGV4dDogcmVzb3VyY2UuYWRkQWN0aXZpdHlBY3Rpb25UZXh0LFxyXG4gIGFkZEF0dGFjaG1lbnRBY3Rpb25UZXh0OiByZXNvdXJjZS5hZGRBdHRhY2htZW50QWN0aW9uVGV4dCxcclxuICBwaG9uZUFiYnJldmlhdGlvblRleHQ6IHJlc291cmNlLnBob25lQWJicmV2aWF0aW9uVGV4dCxcclxuICBmYXhBYmJyZXZpYXRpb25UZXh0OiByZXNvdXJjZS5mYXhBYmJyZXZpYXRpb25UZXh0LFxyXG4gIG9mZmxpbmVUZXh0OiByZXNvdXJjZS5vZmZsaW5lVGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgZGV0YWlsVmlldzogJ2FjY291bnRfZGV0YWlsJyxcclxuICBpdGVtSWNvbkNsYXNzOiAnc3ByZWFkc2hlZXQnLCAvLyB0b2RvOiByZXBsYWNlIHdpdGggYXBwcm9wcmlhdGUgaWNvblxyXG4gIGlkOiAnYWNjb3VudF9saXN0JyxcclxuICBzZWN1cml0eTogJ0VudGl0aWVzL0FjY291bnQvVmlldycsXHJcbiAgaW5zZXJ0VmlldzogJ2FjY291bnRfZWRpdCcsXHJcbiAgaW5zZXJ0U2VjdXJpdHk6ICdFbnRpdGllcy9BY2NvdW50L0FkZCcsXHJcbiAgZW50aXR5TmFtZTogJ0FjY291bnQnLFxyXG4gIGFsbG93U2VsZWN0aW9uOiB0cnVlLFxyXG4gIGVuYWJsZUFjdGlvbnM6IHRydWUsXHJcbiAgb2ZmbGluZUlkczogbnVsbCxcclxuICByZXNvdXJjZUtpbmQ6ICdhY2NvdW50cycsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5BQ0NPVU5ULFxyXG5cclxuICBjYWxsTWFpbjogZnVuY3Rpb24gY2FsbE1haW4ocGFyYW1zKSB7XHJcbiAgICB0aGlzLmludm9rZUFjdGlvbkl0ZW1CeSgoYSkgPT4ge1xyXG4gICAgICByZXR1cm4gYS5pZCA9PT0gJ2NhbGxNYWluJztcclxuICAgIH0sIHBhcmFtcy5rZXkpO1xyXG4gIH0sXHJcbiAgY3JlYXRlQWN0aW9uTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVBY3Rpb25MYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hY3Rpb25zIHx8ICh0aGlzLmFjdGlvbnMgPSBbe1xyXG4gICAgICBpZDogJ2VkaXQnLFxyXG4gICAgICBjbHM6ICdlZGl0JyxcclxuICAgICAgbGFiZWw6IHRoaXMuZWRpdEFjdGlvblRleHQsXHJcbiAgICAgIHNlY3VyaXR5OiAnRW50aXRpZXMvQWNjb3VudC9FZGl0JyxcclxuICAgICAgYWN0aW9uOiAnbmF2aWdhdGVUb0VkaXRWaWV3JyxcclxuICAgIH0sIHtcclxuICAgICAgaWQ6ICdjYWxsTWFpbicsXHJcbiAgICAgIGNsczogJ3Bob25lJyxcclxuICAgICAgbGFiZWw6IHRoaXMuY2FsbE1haW5BY3Rpb25UZXh0LFxyXG4gICAgICBlbmFibGVkOiBhY3Rpb24uaGFzUHJvcGVydHkuYmluZERlbGVnYXRlKHRoaXMsICdNYWluUGhvbmUnKSxcclxuICAgICAgZm46IGFjdGlvbi5jYWxsUGhvbmUuYmluZERlbGVnYXRlKHRoaXMsICdNYWluUGhvbmUnLCBBY3Rpdml0eVR5cGVUZXh0LmF0UGhvbmVDYWxsKSxcclxuICAgIH0sIHtcclxuICAgICAgaWQ6ICd2aWV3Q29udGFjdHMnLFxyXG4gICAgICBsYWJlbDogdGhpcy52aWV3Q29udGFjdHNBY3Rpb25UZXh0LFxyXG4gICAgICBmbjogdGhpcy5uYXZpZ2F0ZVRvUmVsYXRlZFZpZXcuYmluZERlbGVnYXRlKHRoaXMsICdjb250YWN0X3JlbGF0ZWQnLCAnQWNjb3VudC5pZCBlcSBcIiR7MH1cIicpLFxyXG4gICAgfSwge1xyXG4gICAgICBpZDogJ2FkZE5vdGUnLFxyXG4gICAgICBjbHM6ICdxdWljay1lZGl0JyxcclxuICAgICAgbGFiZWw6IHRoaXMuYWRkTm90ZUFjdGlvblRleHQsXHJcbiAgICAgIGZuOiBhY3Rpb24uYWRkTm90ZS5iaW5kRGVsZWdhdGUodGhpcyksXHJcbiAgICB9LCB7XHJcbiAgICAgIGlkOiAnYWRkQWN0aXZpdHknLFxyXG4gICAgICBjbHM6ICdjYWxlbmRhcicsXHJcbiAgICAgIGxhYmVsOiB0aGlzLmFkZEFjdGl2aXR5QWN0aW9uVGV4dCxcclxuICAgICAgZm46IGFjdGlvbi5hZGRBY3Rpdml0eS5iaW5kRGVsZWdhdGUodGhpcyksXHJcbiAgICB9LCB7XHJcbiAgICAgIGlkOiAnYWRkQXR0YWNobWVudCcsXHJcbiAgICAgIGNsczogJ2F0dGFjaCcsXHJcbiAgICAgIGxhYmVsOiB0aGlzLmFkZEF0dGFjaG1lbnRBY3Rpb25UZXh0LFxyXG4gICAgICBmbjogYWN0aW9uLmFkZEF0dGFjaG1lbnQuYmluZERlbGVnYXRlKHRoaXMpLFxyXG4gICAgfV0pO1xyXG4gIH0sXHJcbiAgZm9ybWF0U2VhcmNoUXVlcnk6IGZ1bmN0aW9uIGZvcm1hdFNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5KSB7XHJcbiAgICBjb25zdCBxID0gdGhpcy5lc2NhcGVTZWFyY2hRdWVyeShzZWFyY2hRdWVyeS50b1VwcGVyQ2FzZSgpKTtcclxuICAgIHJldHVybiBgQWNjb3VudE5hbWVVcHBlciBsaWtlIFwiJHtxfSVcImA7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=