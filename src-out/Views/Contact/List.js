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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9Db250YWN0L0xpc3QuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiZm9ybWF0IiwiaXRlbUljb25DbGFzcyIsIml0ZW1UZW1wbGF0ZSIsIlNpbXBsYXRlIiwidGl0bGVUZXh0IiwiYWN0aXZpdGllc1RleHQiLCJub3Rlc1RleHQiLCJzY2hlZHVsZVRleHQiLCJlZGl0QWN0aW9uVGV4dCIsImNhbGxNYWluQWN0aW9uVGV4dCIsImNhbGxXb3JrQWN0aW9uVGV4dCIsImNhbGxNb2JpbGVBY3Rpb25UZXh0Iiwic2VuZEVtYWlsQWN0aW9uVGV4dCIsInZpZXdBY2NvdW50QWN0aW9uVGV4dCIsImFkZE5vdGVBY3Rpb25UZXh0IiwiYWRkQWN0aXZpdHlBY3Rpb25UZXh0IiwiYWRkQXR0YWNobWVudEFjdGlvblRleHQiLCJwaG9uZUFiYnJldmlhdGlvblRleHQiLCJtb2JpbGVBYmJyZXZpYXRpb25UZXh0IiwiZGV0YWlsVmlldyIsImljb25DbGFzcyIsImlkIiwic2VjdXJpdHkiLCJpbnNlcnRWaWV3IiwicXVlcnlPcmRlckJ5IiwicXVlcnlTZWxlY3QiLCJyZXNvdXJjZUtpbmQiLCJlbnRpdHlOYW1lIiwibW9kZWxOYW1lIiwiQ09OVEFDVCIsImdyb3Vwc0VuYWJsZWQiLCJlbmFibGVBY3Rpb25zIiwiY2FsbFdvcmsiLCJwYXJhbXMiLCJpbnZva2VBY3Rpb25JdGVtQnkiLCJ0aGVBY3Rpb24iLCJrZXkiLCJjYWxsTW9iaWxlIiwic2VuZEVtYWlsIiwiY3JlYXRlQWN0aW9uTGF5b3V0IiwiYWN0aW9ucyIsImNscyIsImxhYmVsIiwiYWN0aW9uIiwiZW5hYmxlZCIsImhhc1Byb3BlcnR5IiwiYmluZERlbGVnYXRlIiwiZm4iLCJjYWxsUGhvbmUiLCJuYXZpZ2F0ZVRvRW50aXR5IiwidmlldyIsImtleVByb3BlcnR5IiwidGV4dFByb3BlcnR5IiwiYWRkTm90ZSIsImFkZEFjdGl2aXR5IiwiYWRkQXR0YWNobWVudCIsImZvcm1hdFNlYXJjaFF1ZXJ5Iiwic2VhcmNoUXVlcnkiLCJxIiwiZXNjYXBlU2VhcmNoUXVlcnkiLCJ0b1VwcGVyQ2FzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkEsTUFBTUEsV0FBVyxvQkFBWSxhQUFaLENBQWpCOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FBM0JBOzs7Ozs7Ozs7Ozs7Ozs7QUEyQ0EsTUFBTUMsVUFBVSx1QkFBUSx3QkFBUixFQUFrQyxxR0FBbEMsRUFBb0c7QUFDbEhDLDRCQURrSDtBQUVsSDtBQUNBO0FBQ0FDLG1CQUFlLE1BSm1HO0FBS2xIQyxrQkFBYyxJQUFJQyxRQUFKLENBQWEsQ0FDekIsNkZBRHlCLEVBRXpCLCtDQUZ5QixFQUd6QiwwQkFIeUIsRUFJekIsd0JBSnlCLEVBS3pCLG9KQUx5QixFQUs2SDtBQUN0SixVQU55QixFQU96QixTQVB5QixFQVF6Qix1QkFSeUIsRUFTekIsd0JBVHlCLEVBVXpCLG9KQVZ5QixFQVU2SDtBQUN0SixVQVh5QixFQVl6QixTQVp5QixFQWF6QixzQkFieUIsRUFjekIsd0JBZHlCLEVBZXpCLGdHQWZ5QixFQWdCekIsTUFoQnlCLEVBaUJ6QixTQWpCeUIsQ0FBYixDQUxvRzs7QUF5QmxIO0FBQ0FDLGVBQVdOLFNBQVNNLFNBMUI4RjtBQTJCbEhDLG9CQUFnQlAsU0FBU08sY0EzQnlGO0FBNEJsSEMsZUFBV1IsU0FBU1EsU0E1QjhGO0FBNkJsSEMsa0JBQWNULFNBQVNTLFlBN0IyRjtBQThCbEhDLG9CQUFnQlYsU0FBU1UsY0E5QnlGO0FBK0JsSEMsd0JBQW9CWCxTQUFTVyxrQkEvQnFGO0FBZ0NsSEMsd0JBQW9CWixTQUFTWSxrQkFoQ3FGO0FBaUNsSEMsMEJBQXNCYixTQUFTYSxvQkFqQ21GO0FBa0NsSEMseUJBQXFCZCxTQUFTYyxtQkFsQ29GO0FBbUNsSEMsMkJBQXVCZixTQUFTZSxxQkFuQ2tGO0FBb0NsSEMsdUJBQW1CaEIsU0FBU2dCLGlCQXBDc0Y7QUFxQ2xIQywyQkFBdUJqQixTQUFT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QXNDLE9BQXRDLENBSlI7QUFLREMsWUFBSSxpQkFBT1QsU0FBUCxDQUFpQlEsWUFBakIsQ0FBOEIsSUFBOUIsRUFBb0MsT0FBcEM7QUFMSCxPQTNCb0MsRUFpQ3BDO0FBQ0R6QixZQUFJLFNBREg7QUFFRG9CLGFBQUssTUFGSjtBQUdEQyxlQUFPLEtBQUs1QixpQkFIWDtBQUlEaUMsWUFBSSxpQkFBT00sT0FBUCxDQUFlUCxZQUFmLENBQTRCLElBQTVCO0FBSkgsT0FqQ29DLEVBc0NwQztBQUNEekIsWUFBSSxhQURIO0FBRURvQixhQUFLLFVBRko7QUFHREMsZUFBTyxLQUFLM0IscUJBSFg7QUFJRGdDLFlBQUksaUJBQU9PLFdBQVAsQ0FBbUJSLFlBQW5CLENBQWdDLElBQWhDO0FBSkgsT0F0Q29DLEVBMkNwQztBQUNEekIsWUFBSSxlQURIO0FBRURvQixhQUFLLFFBRko7QUFHREMsZUFBTyxLQUFLMUIsdUJBSFg7QUFJRCtCLFlBQUksaUJBQU9RLGFBQVAsQ0FBcUJULFlBQXJCLENBQWtDLElBQWxDO0FBSkgsT0EzQ29DLENBQWhDLENBQVA7QUFpREQsS0F4SGlIO0FBeUhsSFUsdUJBQW1CLFNBQVNBLGlCQUFULENBQTJCQyxXQUEzQixFQUF3QztBQUN6RCxVQUFNQyxJQUFJLEtBQUtDLGlCQUFMLENBQXVCRixZQUFZRyxXQUFaLEVBQXZCLENBQVY7QUFDQSx1Q0FBK0JGLENBQS9CLHFDQUFnRUEsQ0FBaEUsbUNBQStGQSxDQUEvRixnREFBMklBLENBQTNJO0FBQ0Q7QUE1SGlILEdBQXBHLENBQWhCOztvQkErSGUzRCxPIiwiZmlsZSI6Ikxpc3QuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgYWN0aW9uIGZyb20gJ2NybS9BY3Rpb24nO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJ2FyZ29zL0Zvcm1hdCc7XHJcbmltcG9ydCBMaXN0IGZyb20gJ2FyZ29zL0xpc3QnO1xyXG5pbXBvcnQgX0dyb3VwTGlzdE1peGluIGZyb20gJy4uL19Hcm91cExpc3RNaXhpbic7XHJcbmltcG9ydCBfTWV0cmljTGlzdE1peGluIGZyb20gJy4uL19NZXRyaWNMaXN0TWl4aW4nO1xyXG5pbXBvcnQgX1JpZ2h0RHJhd2VyTGlzdE1peGluIGZyb20gJy4uL19SaWdodERyYXdlckxpc3RNaXhpbic7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdjb250YWN0TGlzdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuQ29udGFjdC5MaXN0XHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkxpc3RcclxuICogQG1peGlucyBjcm0uVmlld3MuX1JpZ2h0RHJhd2VyTGlzdE1peGluXHJcbiAqIEBtaXhpbnMgY3JtLlZpZXdzLl9NZXRyaWNMaXN0TWl4aW5cclxuICpcclxuICogQHJlcXVpcmVzIGFyZ29zLkxpc3RcclxuICogQHJlcXVpcmVzIGFyZ29zLkZvcm1hdFxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuQ29udmVydFxyXG4gKiBAcmVxdWlyZXMgY3JtLlZpZXdzLl9SaWdodERyYXdlckxpc3RNaXhpblxyXG4gKiBAcmVxdWlyZXMgY3JtLlZpZXdzLl9Hcm91cExpc3RNaXhpblxyXG4gKiBAcmVxdWlyZXMgY3JtLlZpZXdzLl9NZXRyaWNMaXN0TWl4aW5cclxuICogQHJlcXVpcmVzIGNybS5BY3Rpb25cclxuICpcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuQ29udGFjdC5MaXN0JywgW0xpc3QsIF9SaWdodERyYXdlckxpc3RNaXhpbiwgX01ldHJpY0xpc3RNaXhpbiwgX0dyb3VwTGlzdE1peGluXSwge1xyXG4gIGZvcm1hdCxcclxuICAvLyBUZW1wbGF0ZVxyXG4gIC8vIENhcmQgTGF5b3V0XHJcbiAgaXRlbUljb25DbGFzczogJ3VzZXInLFxyXG4gIGl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj57JSBpZigkLlRpdGxlKSB7ICV9IHslOiAkLlRpdGxlICV9IHwgeyUgfSAlfSB7JTogJC5BY2NvdW50TmFtZSAlfTwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPnslOiAkLldlYkFkZHJlc3MgJX08L3A+JyxcclxuICAgICd7JSBpZiAoJC5Xb3JrUGhvbmUpIHsgJX0nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPicsXHJcbiAgICAneyU6ICQkLnBob25lQWJicmV2aWF0aW9uVGV4dCAlfSA8c3BhbiBjbGFzcz1cImh5cGVybGlua1wiIGRhdGEtYWN0aW9uPVwiY2FsbFdvcmtcIiBkYXRhLWtleT1cInslOiAkLiRrZXkgJX1cIj57JTogJCQuZm9ybWF0LnBob25lKCQuV29ya1Bob25lKSAlfTwvc3Bhbj4nLCAvLyBUT0RPOiBBdm9pZCBnbG9iYWxcclxuICAgICc8L3A+JyxcclxuICAgICd7JSB9ICV9JyxcclxuICAgICd7JSBpZiAoJC5Nb2JpbGUpIHsgJX0nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPicsXHJcbiAgICAneyU6ICQkLm1vYmlsZUFiYnJldmlhdGlvblRleHQgJX0gPHNwYW4gY2xhc3M9XCJoeXBlcmxpbmtcIiBkYXRhLWFjdGlvbj1cImNhbGxNb2JpbGVcIiBkYXRhLWtleT1cInslOiAkLiRrZXkgJX1cIj57JTogJCQuZm9ybWF0LnBob25lKCQuTW9iaWxlKSAlfTwvc3Bhbj4nLCAvLyBUT0RPOiBBdm9pZCBnbG9iYWxcclxuICAgICc8L3A+JyxcclxuICAgICd7JSB9ICV9JyxcclxuICAgICd7JSBpZiAoJC5FbWFpbCkgeyAlfScsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+JyxcclxuICAgICc8c3BhbiBjbGFzcz1cImh5cGVybGlua1wiIGRhdGEtYWN0aW9uPVwic2VuZEVtYWlsXCIgZGF0YS1rZXk9XCJ7JTogJC4ka2V5ICV9XCI+eyU6ICQuRW1haWwgJX08L3NwYW4+JyxcclxuICAgICc8L3A+JyxcclxuICAgICd7JSB9ICV9JyxcclxuICBdKSxcclxuXHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgYWN0aXZpdGllc1RleHQ6IHJlc291cmNlLmFjdGl2aXRpZXNUZXh0LFxyXG4gIG5vdGVzVGV4dDogcmVzb3VyY2Uubm90ZXNUZXh0LFxyXG4gIHNjaGVkdWxlVGV4dDogcmVzb3VyY2Uuc2NoZWR1bGVUZXh0LFxyXG4gIGVkaXRBY3Rpb25UZXh0OiByZXNvdXJjZS5lZGl0QWN0aW9uVGV4dCxcclxuICBjYWxsTWFpbkFjdGlvblRleHQ6IHJlc291cmNlLmNhbGxNYWluQWN0aW9uVGV4dCxcclxuICBjYWxsV29ya0FjdGlvblRleHQ6IHJlc291cmNlLmNhbGxXb3JrQWN0aW9uVGV4dCxcclxuICBjYWxsTW9iaWxlQWN0aW9uVGV4dDogcmVzb3VyY2UuY2FsbE1vYmlsZUFjdGlvblRleHQsXHJcbiAgc2VuZEVtYWlsQWN0aW9uVGV4dDogcmVzb3VyY2Uuc2VuZEVtYWlsQWN0aW9uVGV4dCxcclxuICB2aWV3QWNjb3VudEFjdGlvblRleHQ6IHJlc291cmNlLnZpZXdBY2NvdW50QWN0aW9uVGV4dCxcclxuICBhZGROb3RlQWN0aW9uVGV4dDogcmVzb3VyY2UuYWRkTm90ZUFjdGlvblRleHQsXHJcbiAgYWRkQWN0aXZpdHlBY3Rpb25UZXh0OiByZXNvdXJjZS5hZGRBY3Rpdml0eUFjdGlvblRleHQsXHJcbiAgYWRkQXR0YWNobWVudEFjdGlvblRleHQ6IHJlc291cmNlLmFkZEF0dGFjaG1lbnRBY3Rpb25UZXh0LFxyXG4gIHBob25lQWJicmV2aWF0aW9uVGV4dDogcmVzb3VyY2UucGhvbmVBYmJyZXZpYXRpb25UZXh0LFxyXG4gIG1vYmlsZUFiYnJldmlhdGlvblRleHQ6IHJlc291cmNlLm1vYmlsZUFiYnJldmlhdGlvblRleHQsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGRldGFpbFZpZXc6ICdjb250YWN0X2RldGFpbCcsXHJcbiAgaWNvbkNsYXNzOiAndXNlcicsXHJcbiAgaWQ6ICdjb250YWN0X2xpc3QnLFxyXG4gIHNlY3VyaXR5OiAnRW50aXRpZXMvQ29udGFjdC9WaWV3JyxcclxuICBpbnNlcnRWaWV3OiAnY29udGFjdF9lZGl0JyxcclxuICBxdWVyeU9yZGVyQnk6IG51bGwsXHJcbiAgcXVlcnlTZWxlY3Q6IFtdLFxyXG4gIHJlc291cmNlS2luZDogJ2NvbnRhY3RzJyxcclxuICBlbnRpdHlOYW1lOiAnQ29udGFjdCcsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5DT05UQUNULFxyXG4gIGdyb3Vwc0VuYWJsZWQ6IHRydWUsXHJcbiAgZW5hYmxlQWN0aW9uczogdHJ1ZSxcclxuICBjYWxsV29yazogZnVuY3Rpb24gY2FsbFdvcmsocGFyYW1zKSB7XHJcbiAgICB0aGlzLmludm9rZUFjdGlvbkl0ZW1CeSgodGhlQWN0aW9uKSA9PiB7XHJcbiAgICAgIHJldHVybiB0aGVBY3Rpb24uaWQgPT09ICdjYWxsV29yayc7XHJcbiAgICB9LCBwYXJhbXMua2V5KTtcclxuICB9LFxyXG4gIGNhbGxNb2JpbGU6IGZ1bmN0aW9uIGNhbGxNb2JpbGUocGFyYW1zKSB7XHJcbiAgICB0aGlzLmludm9rZUFjdGlvbkl0ZW1CeSgodGhlQWN0aW9uKSA9PiB7XHJcbiAgICAgIHJldHVybiB0aGVBY3Rpb24uaWQgPT09ICdjYWxsTW9iaWxlJztcclxuICAgIH0sIHBhcmFtcy5rZXkpO1xyXG4gIH0sXHJcbiAgc2VuZEVtYWlsOiBmdW5jdGlvbiBzZW5kRW1haWwocGFyYW1zKSB7XHJcbiAgICB0aGlzLmludm9rZUFjdGlvbkl0ZW1CeSgodGhlQWN0aW9uKSA9PiB7XHJcbiAgICAgIHJldHVybiB0aGVBY3Rpb24uaWQgPT09ICdzZW5kRW1haWwnO1xyXG4gICAgfSwgcGFyYW1zLmtleSk7XHJcbiAgfSxcclxuICBjcmVhdGVBY3Rpb25MYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUFjdGlvbkxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmFjdGlvbnMgfHwgKHRoaXMuYWN0aW9ucyA9IFt7XHJcbiAgICAgIGlkOiAnZWRpdCcsXHJcbiAgICAgIGNsczogJ2VkaXQnLFxyXG4gICAgICBsYWJlbDogdGhpcy5lZGl0QWN0aW9uVGV4dCxcclxuICAgICAgc2VjdXJpdHk6ICdFbnRpdGllcy9Db250YWN0L0VkaXQnLFxyXG4gICAgICBhY3Rpb246ICduYXZpZ2F0ZVRvRWRpdFZpZXcnLFxyXG4gICAgfSwge1xyXG4gICAgICBpZDogJ2NhbGxXb3JrJyxcclxuICAgICAgY2xzOiAncGhvbmUnLFxyXG4gICAgICBsYWJlbDogdGhpcy5jYWxsV29ya0FjdGlvblRleHQsXHJcbiAgICAgIGVuYWJsZWQ6IGFjdGlvbi5oYXNQcm9wZXJ0eS5iaW5kRGVsZWdhdGUodGhpcywgJ1dvcmtQaG9uZScpLFxyXG4gICAgICBmbjogYWN0aW9uLmNhbGxQaG9uZS5iaW5kRGVsZWdhdGUodGhpcywgJ1dvcmtQaG9uZScpLFxyXG4gICAgfSwge1xyXG4gICAgICBpZDogJ2NhbGxNb2JpbGUnLFxyXG4gICAgICBjbHM6ICdwaG9uZScsXHJcbiAgICAgIGxhYmVsOiB0aGlzLmNhbGxNb2JpbGVBY3Rpb25UZXh0LFxyXG4gICAgICBlbmFibGVkOiBhY3Rpb24uaGFzUHJvcGVydHkuYmluZERlbGVnYXRlKHRoaXMsICdNb2JpbGUnKSxcclxuICAgICAgZm46IGFjdGlvbi5jYWxsUGhvbmUuYmluZERlbGVnYXRlKHRoaXMsICdNb2JpbGUnKSxcclxuICAgIH0sIHtcclxuICAgICAgaWQ6ICd2aWV3QWNjb3VudCcsXHJcbiAgICAgIGxhYmVsOiB0aGlzLnZpZXdBY2NvdW50QWN0aW9uVGV4dCxcclxuICAgICAgZW5hYmxlZDogYWN0aW9uLmhhc1Byb3BlcnR5LmJpbmREZWxlZ2F0ZSh0aGlzLCAnQWNjb3VudC4ka2V5JyksXHJcbiAgICAgIGZuOiBhY3Rpb24ubmF2aWdhdGVUb0VudGl0eS5iaW5kRGVsZWdhdGUodGhpcywge1xyXG4gICAgICAgIHZpZXc6ICdhY2NvdW50X2RldGFpbCcsXHJcbiAgICAgICAga2V5UHJvcGVydHk6ICdBY2NvdW50LiRrZXknLFxyXG4gICAgICAgIHRleHRQcm9wZXJ0eTogJ0FjY291bnROYW1lJyxcclxuICAgICAgfSksXHJcbiAgICB9LCB7XHJcbiAgICAgIGlkOiAnc2VuZEVtYWlsJyxcclxuICAgICAgY2xzOiAnbWFpbCcsXHJcbiAgICAgIGxhYmVsOiB0aGlzLnNlbmRFbWFpbEFjdGlvblRleHQsXHJcbiAgICAgIGVuYWJsZWQ6IGFjdGlvbi5oYXNQcm9wZXJ0eS5iaW5kRGVsZWdhdGUodGhpcywgJ0VtYWlsJyksXHJcbiAgICAgIGZuOiBhY3Rpb24uc2VuZEVtYWlsLmJpbmREZWxlZ2F0ZSh0aGlzLCAnRW1haWwnKSxcclxuICAgIH0sIHtcclxuICAgICAgaWQ6ICdhZGROb3RlJyxcclxuICAgICAgY2xzOiAnZWRpdCcsXHJcbiAgICAgIGxhYmVsOiB0aGlzLmFkZE5vdGVBY3Rpb25UZXh0LFxyXG4gICAgICBmbjogYWN0aW9uLmFkZE5vdGUuYmluZERlbGVnYXRlKHRoaXMpLFxyXG4gICAgfSwge1xyXG4gICAgICBpZDogJ2FkZEFjdGl2aXR5JyxcclxuICAgICAgY2xzOiAnY2FsZW5kYXInLFxyXG4gICAgICBsYWJlbDogdGhpcy5hZGRBY3Rpdml0eUFjdGlvblRleHQsXHJcbiAgICAgIGZuOiBhY3Rpb24uYWRkQWN0aXZpdHkuYmluZERlbGVnYXRlKHRoaXMpLFxyXG4gICAgfSwge1xyXG4gICAgICBpZDogJ2FkZEF0dGFjaG1lbnQnLFxyXG4gICAgICBjbHM6ICdhdHRhY2gnLFxyXG4gICAgICBsYWJlbDogdGhpcy5hZGRBdHRhY2htZW50QWN0aW9uVGV4dCxcclxuICAgICAgZm46IGFjdGlvbi5hZGRBdHRhY2htZW50LmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgIH1dKTtcclxuICB9LFxyXG4gIGZvcm1hdFNlYXJjaFF1ZXJ5OiBmdW5jdGlvbiBmb3JtYXRTZWFyY2hRdWVyeShzZWFyY2hRdWVyeSkge1xyXG4gICAgY29uc3QgcSA9IHRoaXMuZXNjYXBlU2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkudG9VcHBlckNhc2UoKSk7XHJcbiAgICByZXR1cm4gYChMYXN0TmFtZVVwcGVyIGxpa2UgXCIke3F9JVwiIG9yIHVwcGVyKEZpcnN0TmFtZSkgbGlrZSBcIiR7cX0lXCIgb3IgdXBwZXIoTmFtZUxGKSBsaWtlIFwiJSR7cX0lXCIpIG9yIChBY2NvdW50LkFjY291bnROYW1lVXBwZXIgbGlrZSBcIiUke3F9JVwiKWA7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=