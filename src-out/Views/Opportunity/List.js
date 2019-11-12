define('crm/Views/Opportunity/List', ['module', 'exports', 'dojo/_base/declare', '../../Action', '../../Format', 'argos/List', '../_GroupListMixin', '../_MetricListMixin', '../_RightDrawerListMixin', 'argos/I18n', '../../Models/Names'], function (module, exports, _declare, _Action, _Format, _List, _GroupListMixin2, _MetricListMixin2, _RightDrawerListMixin2, _I18n, _Names) {
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

  var resource = (0, _I18n2.default)('opportunityList');

  /**
   * @class crm.Views.Opportunity.List
   *
   * @extends argos.List
   * @mixins crm.Views._RightDrawerListMixin
   * @mixins crm.Views._MetricListMixin
   * @mixins crm.Views._GroupListMixin
   *
   * @requires argos.Format
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

  var __class = (0, _declare2.default)('crm.Views.Opportunity.List', [_List2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default, _GroupListMixin3.default], {
    // Templates
    // TODO: Support ExchangeRateCode with proper symbol
    itemTemplate: new Simplate(['{% if ($.Account) { %}', '<p class="micro-text">', '{%: $.Account.AccountName %}', '</p>', '<p class="micro-text">', '{% if ($.Account.AccountManager && $.Account.AccountManager.UserInfo) { %}', '{%: $.Account.AccountManager.UserInfo.UserName %}', '{% if ($.Account && $.Account.AccountManager.UserInfo.Region) { %}', ' | {%: $.Account.AccountManager.UserInfo.Region %}', '{% } %}', '{% } %}', '</p>', '{% } %}', '<p class="micro-text">', '{%: $.Status %}', '{% if ($.Stage) { %}', ' | {%: $.Stage %}', '{% } %}', '</p>', '{% if ($.SalesPotential) { %}', '<p class="micro-text"><strong>', '{% if (App.hasMultiCurrency()) { %}', '{%: crm.Format.multiCurrency($.SalesPotential * $.ExchangeRate, $.ExchangeRateCode) %}', '{% } else { %}', '{%: crm.Format.multiCurrency($.SalesPotential, App.getBaseExchangeRate().code) %}', '{% } %}', '</strong></p>', '{% } %}', '<p class="micro-text">{%: $$.formatDate($) %}</p>']),

    // Localization
    titleText: resource.titleText,
    activitiesText: resource.activitiesText,
    notesText: resource.notesText,
    scheduleText: resource.scheduleText,
    editActionText: resource.editActionText,
    viewAccountActionText: resource.viewAccountActionText,
    viewContactsActionText: resource.viewContactsActionText,
    viewProductsActionText: resource.viewProductsActionText,
    addNoteActionText: resource.addNoteActionText,
    addActivityActionText: resource.addActivityActionText,
    addAttachmentActionText: resource.addAttachmentActionText,
    actualCloseText: resource.actualCloseText,
    estimatedCloseText: resource.estimatedCloseText,
    quickEditActionText: resource.quickEditActionText,

    // View Properties
    id: 'opportunity_list',
    security: 'Entities/Opportunity/View',
    itemIconClass: 'finance',
    detailView: 'opportunity_detail',
    insertView: 'opportunity_edit',
    queryOrderBy: null,
    querySelect: [],
    modelName: _Names2.default.OPPORTUNITY,
    resourceKind: 'opportunities',
    entityName: 'Opportunity',
    groupsEnabled: true,
    allowSelection: true,
    enableActions: true,

    formatDate: function formatDate(entry) {
      if (entry.Status === 'Open' && entry.EstimatedClose) {
        return this.estimatedCloseText + _Format2.default.relativeDate(entry.EstimatedClose);
      } else if (entry.ActualClose) {
        return this.actualCloseText + _Format2.default.relativeDate(entry.ActualClose);
      }

      return '';
    },
    createActionLayout: function createActionLayout() {
      return this.actions || (this.actions = [{
        id: 'edit',
        cls: 'edit',
        label: this.editActionText,
        action: 'navigateToEditView',
        security: 'Entities/Opportunity/Edit'
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
        id: 'viewContacts',
        label: this.viewContactsActionText,
        fn: this.navigateToRelatedView.bindDelegate(this, 'opportunitycontact_related', 'Opportunity.Id eq "${0}"')
      }, {
        id: 'viewProducts',
        label: this.viewProductsActionText,
        fn: this.navigateToRelatedView.bindDelegate(this, 'opportunityproduct_related', 'Opportunity.Id eq "${0}"')
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
      }, {
        id: 'quickEdit',
        cls: 'edit',
        label: this.quickEditActionText,
        editView: 'opportunity_quick_edit',
        action: 'navigateToQuickEdit',
        security: 'Entities/Opportunity/Edit'
      }]);
    },

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return '(upper(Description) like "' + q + '%" or Account.AccountNameUpper like "' + q + '%")';
    },
    groupFieldFormatter: {
      CloseProbability: {
        name: 'CloseProbability',
        formatter: function formatter(value) {
          return _Format2.default.fixedLocale(value, 0) + '%';
        }
      }
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9PcHBvcnR1bml0eS9MaXN0LmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsIml0ZW1UZW1wbGF0ZSIsIlNpbXBsYXRlIiwidGl0bGVUZXh0IiwiYWN0aXZpdGllc1RleHQiLCJub3Rlc1RleHQiLCJzY2hlZHVsZVRleHQiLCJlZGl0QWN0aW9uVGV4dCIsInZpZXdBY2NvdW50QWN0aW9uVGV4dCIsInZpZXdDb250YWN0c0FjdGlvblRleHQiLCJ2aWV3UHJvZHVjdHNBY3Rpb25UZXh0IiwiYWRkTm90ZUFjdGlvblRleHQiLCJhZGRBY3Rpdml0eUFjdGlvblRleHQiLCJhZGRBdHRhY2htZW50QWN0aW9uVGV4dCIsImFjdHVhbENsb3NlVGV4dCIsImVzdGltYXRlZENsb3NlVGV4dCIsInF1aWNrRWRpdEFjdGlvblRleHQiLCJpZCIsInNlY3VyaXR5IiwiaXRlbUljb25DbGFzcyIsImRldGFpbFZpZXciLCJpbnNlcnRWaWV3IiwicXVlcnlPcmRlckJ5IiwicXVlcnlTZWxlY3QiLCJtb2RlbE5hbWUiLCJPUFBPUlRVTklUWSIsInJlc291cmNlS2luZCIsImVudGl0eU5hbWUiLCJncm91cHNFbmFibGVkIiwiYWxsb3dTZWxlY3Rpb24iLCJlbmFibGVBY3Rpb25zIiwiZm9ybWF0RGF0ZSIsImVudHJ5IiwiU3RhdHVzIiwiRXN0aW1hdGVkQ2xvc2UiLCJyZWxhdGl2ZURhdGUiLCJBY3R1YWxDbG9zZSIsImNyZWF0ZUFjdGlvbkxheW91dCIsImFjdGlvbnMiLCJjbHMiLCJsYWJlbCIsImFjdGlvbiIsImVuYWJsZWQiLCJoYXNQcm9wZXJ0eSIsImJpbmREZWxlZ2F0ZSIsImZuIiwibmF2aWdhdGVUb0VudGl0eSIsInZpZXciLCJrZXlQcm9wZXJ0eSIsInRleHRQcm9wZXJ0eSIsIm5hdmlnYXRlVG9SZWxhdGVkVmlldyIsImFkZE5vdGUiLCJhZGRBY3Rpdml0eSIsImFkZEF0dGFjaG1lbnQiLCJlZGl0VmlldyIsImZvcm1hdFNlYXJjaFF1ZXJ5Iiwic2VhcmNoUXVlcnkiLCJxIiwiZXNjYXBlU2VhcmNoUXVlcnkiLCJ0b1VwcGVyQ2FzZSIsImdyb3VwRmllbGRGb3JtYXR0ZXIiLCJDbG9zZVByb2JhYmlsaXR5IiwibmFtZSIsImZvcm1hdHRlciIsInZhbHVlIiwiZml4ZWRMb2NhbGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLE1BQU1BLFdBQVcsb0JBQVksaUJBQVosQ0FBakI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUEzQkE7Ozs7Ozs7Ozs7Ozs7OztBQXdDQSxNQUFNQyxVQUFVLHVCQUFRLDRCQUFSLEVBQXNDLHFHQUF0QyxFQUF3RztBQUN0SDtBQUNBO0FBQ0FDLGtCQUFjLElBQUlDLFFBQUosQ0FBYSxDQUN6Qix3QkFEeUIsRUFFekIsd0JBRnlCLEVBR3pCLDhCQUh5QixFQUl6QixNQUp5QixFQUt6Qix3QkFMeUIsRUFNekIsNEVBTnlCLEVBT3pCLG1EQVB5QixFQVF6QixvRUFSeUIsRUFTekIsb0RBVHlCLEVBVXpCLFNBVnlCLEVBV3pCLFNBWHlCLEVBWXpCLE1BWnlCLEVBYXpCLFNBYnlCLEVBY3pCLHdCQWR5QixFQWV6QixpQkFmeUIsRUFnQnpCLHNCQWhCeUIsRUFpQnpCLG1CQWpCeUIsRUFrQnpCLFNBbEJ5QixFQW1CekIsTUFuQnlCLEVBb0J6QiwrQkFwQnlCLEVBcUJ6QixnQ0FyQnlCLEVBc0J6QixxQ0F0QnlCLEVBdUJ6Qix3RkF2QnlCLEVBd0J6QixnQkF4QnlCLEVBeUJ6QixtRkF6QnlCLEVBMEJ6QixTQTFCeUIsRUEyQnpCLGVBM0J5QixFQTRCekIsU0E1QnlCLEVBNkJ6QixtREE3QnlCLENBQWIsQ0FId0c7O0FBbUN0SDtBQUNBQyxlQUFXSixTQUFTSSxTQXBDa0c7QUFxQ3RIQyxvQkFBZ0JMLFNBQVNLLGNBckM2RjtBQXNDdEhDLGVBQVdOLFNBQVNNLFNBdENrRztBQXVDdEhDLGtCQUFjUCxTQUFTTyxZQXZDK0Y7QUF3Q3RIQyxvQkFBZ0JSLFNBQVNRLGNBeEM2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QUFuQixDQUFnQyxJQUFoQztBQUpILE9BNUJvQyxFQWlDcEM7QUFDRDNCLFlBQUksZUFESDtBQUVEc0IsYUFBSyxRQUZKO0FBR0RDLGVBQU8sS0FBSzNCLHVCQUhYO0FBSURnQyxZQUFJLGlCQUFPUSxhQUFQLENBQXFCVCxZQUFyQixDQUFrQyxJQUFsQztBQUpILE9BakNvQyxFQXNDcEM7QUFDRDNCLFlBQUksV0FESDtBQUVEc0IsYUFBSyxNQUZKO0FBR0RDLGVBQU8sS0FBS3hCLG1CQUhYO0FBSURzQyxrQkFBVSx3QkFKVDtBQUtEYixnQkFBUSxxQkFMUDtBQU1EdkIsa0JBQVU7QUFOVCxPQXRDb0MsQ0FBaEMsQ0FBUDtBQThDRCxLQTFIcUg7O0FBNEh0SHFDLHVCQUFtQixTQUFTQSxpQkFBVCxDQUEyQkMsV0FBM0IsRUFBd0M7QUFDekQsVUFBTUMsSUFBSSxLQUFLQyxpQkFBTCxDQUF1QkYsWUFBWUcsV0FBWixFQUF2QixDQUFWO0FBQ0EsNENBQW9DRixDQUFwQyw2Q0FBNkVBLENBQTdFO0FBQ0QsS0EvSHFIO0FBZ0l0SEcseUJBQXFCO0FBQ25CQyx3QkFBa0I7QUFDaEJDLGNBQU0sa0JBRFU7QUFFaEJDLG1CQUFXLFNBQVNBLFNBQVQsQ0FBbUJDLEtBQW5CLEVBQTBCO0FBQ25DLGlCQUFVLGlCQUFPQyxXQUFQLENBQW1CRCxLQUFuQixFQUEwQixDQUExQixDQUFWO0FBQ0Q7QUFKZTtBQURDO0FBaElpRyxHQUF4RyxDQUFoQjs7b0JBMEllaEUsTyIsImZpbGUiOiJMaXN0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGFjdGlvbiBmcm9tICcuLi8uLi9BY3Rpb24nO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJy4uLy4uL0Zvcm1hdCc7XHJcbmltcG9ydCBMaXN0IGZyb20gJ2FyZ29zL0xpc3QnO1xyXG5pbXBvcnQgX0dyb3VwTGlzdE1peGluIGZyb20gJy4uL19Hcm91cExpc3RNaXhpbic7XHJcbmltcG9ydCBfTWV0cmljTGlzdE1peGluIGZyb20gJy4uL19NZXRyaWNMaXN0TWl4aW4nO1xyXG5pbXBvcnQgX1JpZ2h0RHJhd2VyTGlzdE1peGluIGZyb20gJy4uL19SaWdodERyYXdlckxpc3RNaXhpbic7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdvcHBvcnR1bml0eUxpc3QnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLk9wcG9ydHVuaXR5Lkxpc3RcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuTGlzdFxyXG4gKiBAbWl4aW5zIGNybS5WaWV3cy5fUmlnaHREcmF3ZXJMaXN0TWl4aW5cclxuICogQG1peGlucyBjcm0uVmlld3MuX01ldHJpY0xpc3RNaXhpblxyXG4gKiBAbWl4aW5zIGNybS5WaWV3cy5fR3JvdXBMaXN0TWl4aW5cclxuICpcclxuICogQHJlcXVpcmVzIGFyZ29zLkZvcm1hdFxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgY3JtLkFjdGlvblxyXG4gKiBAcmVxdWlyZXMgY3JtLkZvcm1hdFxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5PcHBvcnR1bml0eS5MaXN0JywgW0xpc3QsIF9SaWdodERyYXdlckxpc3RNaXhpbiwgX01ldHJpY0xpc3RNaXhpbiwgX0dyb3VwTGlzdE1peGluXSwge1xyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIC8vIFRPRE86IFN1cHBvcnQgRXhjaGFuZ2VSYXRlQ29kZSB3aXRoIHByb3BlciBzeW1ib2xcclxuICBpdGVtVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAneyUgaWYgKCQuQWNjb3VudCkgeyAlfScsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+JyxcclxuICAgICd7JTogJC5BY2NvdW50LkFjY291bnROYW1lICV9JyxcclxuICAgICc8L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj4nLFxyXG4gICAgJ3slIGlmICgkLkFjY291bnQuQWNjb3VudE1hbmFnZXIgJiYgJC5BY2NvdW50LkFjY291bnRNYW5hZ2VyLlVzZXJJbmZvKSB7ICV9JyxcclxuICAgICd7JTogJC5BY2NvdW50LkFjY291bnRNYW5hZ2VyLlVzZXJJbmZvLlVzZXJOYW1lICV9JyxcclxuICAgICd7JSBpZiAoJC5BY2NvdW50ICYmICQuQWNjb3VudC5BY2NvdW50TWFuYWdlci5Vc2VySW5mby5SZWdpb24pIHsgJX0nLFxyXG4gICAgJyB8IHslOiAkLkFjY291bnQuQWNjb3VudE1hbmFnZXIuVXNlckluZm8uUmVnaW9uICV9JyxcclxuICAgICd7JSB9ICV9JyxcclxuICAgICd7JSB9ICV9JyxcclxuICAgICc8L3A+JyxcclxuICAgICd7JSB9ICV9JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj4nLFxyXG4gICAgJ3slOiAkLlN0YXR1cyAlfScsXHJcbiAgICAneyUgaWYgKCQuU3RhZ2UpIHsgJX0nLFxyXG4gICAgJyB8IHslOiAkLlN0YWdlICV9JyxcclxuICAgICd7JSB9ICV9JyxcclxuICAgICc8L3A+JyxcclxuICAgICd7JSBpZiAoJC5TYWxlc1BvdGVudGlhbCkgeyAlfScsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+PHN0cm9uZz4nLFxyXG4gICAgJ3slIGlmIChBcHAuaGFzTXVsdGlDdXJyZW5jeSgpKSB7ICV9JyxcclxuICAgICd7JTogY3JtLkZvcm1hdC5tdWx0aUN1cnJlbmN5KCQuU2FsZXNQb3RlbnRpYWwgKiAkLkV4Y2hhbmdlUmF0ZSwgJC5FeGNoYW5nZVJhdGVDb2RlKSAlfScsXHJcbiAgICAneyUgfSBlbHNlIHsgJX0nLFxyXG4gICAgJ3slOiBjcm0uRm9ybWF0Lm11bHRpQ3VycmVuY3koJC5TYWxlc1BvdGVudGlhbCwgQXBwLmdldEJhc2VFeGNoYW5nZVJhdGUoKS5jb2RlKSAlfScsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgICAnPC9zdHJvbmc+PC9wPicsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+eyU6ICQkLmZvcm1hdERhdGUoJCkgJX08L3A+JyxcclxuICBdKSxcclxuXHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgYWN0aXZpdGllc1RleHQ6IHJlc291cmNlLmFjdGl2aXRpZXNUZXh0LFxyXG4gIG5vdGVzVGV4dDogcmVzb3VyY2Uubm90ZXNUZXh0LFxyXG4gIHNjaGVkdWxlVGV4dDogcmVzb3VyY2Uuc2NoZWR1bGVUZXh0LFxyXG4gIGVkaXRBY3Rpb25UZXh0OiByZXNvdXJjZS5lZGl0QWN0aW9uVGV4dCxcclxuICB2aWV3QWNjb3VudEFjdGlvblRleHQ6IHJlc291cmNlLnZpZXdBY2NvdW50QWN0aW9uVGV4dCxcclxuICB2aWV3Q29udGFjdHNBY3Rpb25UZXh0OiByZXNvdXJjZS52aWV3Q29udGFjdHNBY3Rpb25UZXh0LFxyXG4gIHZpZXdQcm9kdWN0c0FjdGlvblRleHQ6IHJlc291cmNlLnZpZXdQcm9kdWN0c0FjdGlvblRleHQsXHJcbiAgYWRkTm90ZUFjdGlvblRleHQ6IHJlc291cmNlLmFkZE5vdGVBY3Rpb25UZXh0LFxyXG4gIGFkZEFjdGl2aXR5QWN0aW9uVGV4dDogcmVzb3VyY2UuYWRkQWN0aXZpdHlBY3Rpb25UZXh0LFxyXG4gIGFkZEF0dGFjaG1lbnRBY3Rpb25UZXh0OiByZXNvdXJjZS5hZGRBdHRhY2htZW50QWN0aW9uVGV4dCxcclxuICBhY3R1YWxDbG9zZVRleHQ6IHJlc291cmNlLmFjdHVhbENsb3NlVGV4dCxcclxuICBlc3RpbWF0ZWRDbG9zZVRleHQ6IHJlc291cmNlLmVzdGltYXRlZENsb3NlVGV4dCxcclxuICBxdWlja0VkaXRBY3Rpb25UZXh0OiByZXNvdXJjZS5xdWlja0VkaXRBY3Rpb25UZXh0LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ29wcG9ydHVuaXR5X2xpc3QnLFxyXG4gIHNlY3VyaXR5OiAnRW50aXRpZXMvT3Bwb3J0dW5pdHkvVmlldycsXHJcbiAgaXRlbUljb25DbGFzczogJ2ZpbmFuY2UnLFxyXG4gIGRldGFpbFZpZXc6ICdvcHBvcnR1bml0eV9kZXRhaWwnLFxyXG4gIGluc2VydFZpZXc6ICdvcHBvcnR1bml0eV9lZGl0JyxcclxuICBxdWVyeU9yZGVyQnk6IG51bGwsXHJcbiAgcXVlcnlTZWxlY3Q6IFtdLFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuT1BQT1JUVU5JVFksXHJcbiAgcmVzb3VyY2VLaW5kOiAnb3Bwb3J0dW5pdGllcycsXHJcbiAgZW50aXR5TmFtZTogJ09wcG9ydHVuaXR5JyxcclxuICBncm91cHNFbmFibGVkOiB0cnVlLFxyXG4gIGFsbG93U2VsZWN0aW9uOiB0cnVlLFxyXG4gIGVuYWJsZUFjdGlvbnM6IHRydWUsXHJcblxyXG4gIGZvcm1hdERhdGU6IGZ1bmN0aW9uIGZvcm1hdERhdGUoZW50cnkpIHtcclxuICAgIGlmIChlbnRyeS5TdGF0dXMgPT09ICdPcGVuJyAmJiBlbnRyeS5Fc3RpbWF0ZWRDbG9zZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5lc3RpbWF0ZWRDbG9zZVRleHQgKyBmb3JtYXQucmVsYXRpdmVEYXRlKGVudHJ5LkVzdGltYXRlZENsb3NlKTtcclxuICAgIH0gZWxzZSBpZiAoZW50cnkuQWN0dWFsQ2xvc2UpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuYWN0dWFsQ2xvc2VUZXh0ICsgZm9ybWF0LnJlbGF0aXZlRGF0ZShlbnRyeS5BY3R1YWxDbG9zZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICcnO1xyXG4gIH0sXHJcbiAgY3JlYXRlQWN0aW9uTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVBY3Rpb25MYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hY3Rpb25zIHx8ICh0aGlzLmFjdGlvbnMgPSBbe1xyXG4gICAgICBpZDogJ2VkaXQnLFxyXG4gICAgICBjbHM6ICdlZGl0JyxcclxuICAgICAgbGFiZWw6IHRoaXMuZWRpdEFjdGlvblRleHQsXHJcbiAgICAgIGFjdGlvbjogJ25hdmlnYXRlVG9FZGl0VmlldycsXHJcbiAgICAgIHNlY3VyaXR5OiAnRW50aXRpZXMvT3Bwb3J0dW5pdHkvRWRpdCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIGlkOiAndmlld0FjY291bnQnLFxyXG4gICAgICBsYWJlbDogdGhpcy52aWV3QWNjb3VudEFjdGlvblRleHQsXHJcbiAgICAgIGVuYWJsZWQ6IGFjdGlvbi5oYXNQcm9wZXJ0eS5iaW5kRGVsZWdhdGUodGhpcywgJ0FjY291bnQuJGtleScpLFxyXG4gICAgICBmbjogYWN0aW9uLm5hdmlnYXRlVG9FbnRpdHkuYmluZERlbGVnYXRlKHRoaXMsIHtcclxuICAgICAgICB2aWV3OiAnYWNjb3VudF9kZXRhaWwnLFxyXG4gICAgICAgIGtleVByb3BlcnR5OiAnQWNjb3VudC4ka2V5JyxcclxuICAgICAgICB0ZXh0UHJvcGVydHk6ICdBY2NvdW50LkFjY291bnROYW1lJyxcclxuICAgICAgfSksXHJcbiAgICB9LCB7XHJcbiAgICAgIGlkOiAndmlld0NvbnRhY3RzJyxcclxuICAgICAgbGFiZWw6IHRoaXMudmlld0NvbnRhY3RzQWN0aW9uVGV4dCxcclxuICAgICAgZm46IHRoaXMubmF2aWdhdGVUb1JlbGF0ZWRWaWV3LmJpbmREZWxlZ2F0ZSh0aGlzLCAnb3Bwb3J0dW5pdHljb250YWN0X3JlbGF0ZWQnLCAnT3Bwb3J0dW5pdHkuSWQgZXEgXCIkezB9XCInKSxcclxuICAgIH0sIHtcclxuICAgICAgaWQ6ICd2aWV3UHJvZHVjdHMnLFxyXG4gICAgICBsYWJlbDogdGhpcy52aWV3UHJvZHVjdHNBY3Rpb25UZXh0LFxyXG4gICAgICBmbjogdGhpcy5uYXZpZ2F0ZVRvUmVsYXRlZFZpZXcuYmluZERlbGVnYXRlKHRoaXMsICdvcHBvcnR1bml0eXByb2R1Y3RfcmVsYXRlZCcsICdPcHBvcnR1bml0eS5JZCBlcSBcIiR7MH1cIicpLFxyXG4gICAgfSwge1xyXG4gICAgICBpZDogJ2FkZE5vdGUnLFxyXG4gICAgICBjbHM6ICdlZGl0JyxcclxuICAgICAgbGFiZWw6IHRoaXMuYWRkTm90ZUFjdGlvblRleHQsXHJcbiAgICAgIGZuOiBhY3Rpb24uYWRkTm90ZS5iaW5kRGVsZWdhdGUodGhpcyksXHJcbiAgICB9LCB7XHJcbiAgICAgIGlkOiAnYWRkQWN0aXZpdHknLFxyXG4gICAgICBjbHM6ICdjYWxlbmRhcicsXHJcbiAgICAgIGxhYmVsOiB0aGlzLmFkZEFjdGl2aXR5QWN0aW9uVGV4dCxcclxuICAgICAgZm46IGFjdGlvbi5hZGRBY3Rpdml0eS5iaW5kRGVsZWdhdGUodGhpcyksXHJcbiAgICB9LCB7XHJcbiAgICAgIGlkOiAnYWRkQXR0YWNobWVudCcsXHJcbiAgICAgIGNsczogJ2F0dGFjaCcsXHJcbiAgICAgIGxhYmVsOiB0aGlzLmFkZEF0dGFjaG1lbnRBY3Rpb25UZXh0LFxyXG4gICAgICBmbjogYWN0aW9uLmFkZEF0dGFjaG1lbnQuYmluZERlbGVnYXRlKHRoaXMpLFxyXG4gICAgfSwge1xyXG4gICAgICBpZDogJ3F1aWNrRWRpdCcsXHJcbiAgICAgIGNsczogJ2VkaXQnLFxyXG4gICAgICBsYWJlbDogdGhpcy5xdWlja0VkaXRBY3Rpb25UZXh0LFxyXG4gICAgICBlZGl0VmlldzogJ29wcG9ydHVuaXR5X3F1aWNrX2VkaXQnLFxyXG4gICAgICBhY3Rpb246ICduYXZpZ2F0ZVRvUXVpY2tFZGl0JyxcclxuICAgICAgc2VjdXJpdHk6ICdFbnRpdGllcy9PcHBvcnR1bml0eS9FZGl0JyxcclxuICAgIH1dKTtcclxuICB9LFxyXG5cclxuICBmb3JtYXRTZWFyY2hRdWVyeTogZnVuY3Rpb24gZm9ybWF0U2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkpIHtcclxuICAgIGNvbnN0IHEgPSB0aGlzLmVzY2FwZVNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5LnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgcmV0dXJuIGAodXBwZXIoRGVzY3JpcHRpb24pIGxpa2UgXCIke3F9JVwiIG9yIEFjY291bnQuQWNjb3VudE5hbWVVcHBlciBsaWtlIFwiJHtxfSVcIilgO1xyXG4gIH0sXHJcbiAgZ3JvdXBGaWVsZEZvcm1hdHRlcjoge1xyXG4gICAgQ2xvc2VQcm9iYWJpbGl0eToge1xyXG4gICAgICBuYW1lOiAnQ2xvc2VQcm9iYWJpbGl0eScsXHJcbiAgICAgIGZvcm1hdHRlcjogZnVuY3Rpb24gZm9ybWF0dGVyKHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIGAke2Zvcm1hdC5maXhlZExvY2FsZSh2YWx1ZSwgMCl9JWA7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19