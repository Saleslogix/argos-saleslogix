define('crm/Integrations/BOE/Views/ERPShipments/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'crm/Action', 'argos/List', 'crm/Format', 'crm/Views/_RightDrawerListMixin', 'crm/Views/_MetricListMixin', 'crm/Views/_GroupListMixin', '../../Models/Names', '../../Utility', 'argos/I18n'], function (module, exports, _declare, _lang, _Action, _List, _Format, _RightDrawerListMixin2, _MetricListMixin2, _GroupListMixin2, _Names, _Utility, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Action2 = _interopRequireDefault(_Action);

  var _List2 = _interopRequireDefault(_List);

  var _Format2 = _interopRequireDefault(_Format);

  var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

  var _MetricListMixin3 = _interopRequireDefault(_MetricListMixin2);

  var _GroupListMixin3 = _interopRequireDefault(_GroupListMixin2);

  var _Names2 = _interopRequireDefault(_Names);

  var _Utility2 = _interopRequireDefault(_Utility);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('erpShipmentsList'); /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ERPShipments.List', [_List2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default, _GroupListMixin3.default], {
    formatter: _Format2.default,
    util: _Utility2.default,

    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading"><label class="group-label">{%: $$.shipmentIDLabelText %}</label> {%: $.ErpExtId %}</p>', '<p class="micro-text"> {% if ($.Account) { %}<label class="group-label"> {%: $$.accountLabelText %}</label> {%: $.Account.AccountName %} {% } %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.statusLabelText %}</label> {%: $.ErpStatus %}</p>', '<p class="micro-text"> {% if ($.DatePromised) { %}<label class="group-label">{%: $$.datePromisedLabelText %}</label> {%: $$.formatter.date($.DatePromised) %} {% } %}</p>', '<p class="micro-text"><label class="group-label"> {%: $$.totalBaseAmountText %} </label>', '{%: $$.util.formatMultiCurrency($.ShipmentTotalBaseAmount, $.BaseCurrencyCode) %}', '</p>', '<p class="micro-text"><label class="group-label"> {%: $$.totalAmountText %} </label>', '{%: $$.util.formatMultiCurrency($.ShipmentTotalAmount, $.CurrencyCode) %}', '</p>', '<p class="micro-text"><label class="group-label">{%: $$.documentDateText %}</label> {%: $$.formatter.date($.ErpDocumentDate) %}</p>']),

    // Localization
    titleText: resource.titleText,
    statusLabelText: resource.statusLabelText,
    shipmentIDLabelText: resource.shipmentIDLabelText,
    accountLabelText: resource.accountLabelText,
    datePromisedLabelText: resource.datePromisedLabelText,
    viewAccountActionText: resource.viewAccountActionText,
    totalBaseAmountText: resource.totalBaseAmountText,
    totalAmountText: resource.totalAmountText,
    documentDateText: resource.documentDateText,

    // View Properties
    id: 'erpshipments_list',
    detailView: 'erpshipments_detail',
    modelName: _Names2.default.ERPSHIPMENT,
    resourceKind: 'erpShipments',
    allowSelection: true,
    enableActions: true,
    enableHashTags: true,
    expose: true,
    security: 'Entities/ErpShipment/View',
    insertSecurity: 'Entities/ErpShipment/Add',

    // Groups
    enableDynamicGroupLayout: true,
    groupsEnabled: true,
    entityName: 'ERPShipment',

    // Card layout
    itemIconClass: 'warehouse',

    createActionLayout: function createActionLayout() {
      return this.actions || (this.actions = [{
        id: 'viewAccount',
        label: this.viewAccountActionText,
        enabled: _Action2.default.hasProperty.bindDelegate(this, 'Account.$key'),
        fn: _Action2.default.navigateToEntity.bindDelegate(this, {
          view: 'account_detail',
          keyProperty: 'Account.$key',
          textProperty: 'Account.AccountName'
        })
      }]);
    },

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'upper(Account.AccountName) like "' + q + '%" or upper(ErpExtId) like "' + q + '%"';
    }
  });

  _lang2.default.setObject('icboe.Views.ERPShipments.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0VSUFNoaXBtZW50cy9MaXN0LmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsImZvcm1hdHRlciIsInV0aWwiLCJpdGVtVGVtcGxhdGUiLCJTaW1wbGF0ZSIsInRpdGxlVGV4dCIsInN0YXR1c0xhYmVsVGV4dCIsInNoaXBtZW50SURMYWJlbFRleHQiLCJhY2NvdW50TGFiZWxUZXh0IiwiZGF0ZVByb21pc2VkTGFiZWxUZXh0Iiwidmlld0FjY291bnRBY3Rpb25UZXh0IiwidG90YWxCYXNlQW1vdW50VGV4dCIsInRvdGFsQW1vdW50VGV4dCIsImRvY3VtZW50RGF0ZVRleHQiLCJpZCIsImRldGFpbFZpZXciLCJtb2RlbE5hbWUiLCJFUlBTSElQTUVOVCIsInJlc291cmNlS2luZCIsImFsbG93U2VsZWN0aW9uIiwiZW5hYmxlQWN0aW9ucyIsImVuYWJsZUhhc2hUYWdzIiwiZXhwb3NlIiwic2VjdXJpdHkiLCJpbnNlcnRTZWN1cml0eSIsImVuYWJsZUR5bmFtaWNHcm91cExheW91dCIsImdyb3Vwc0VuYWJsZWQiLCJlbnRpdHlOYW1lIiwiaXRlbUljb25DbGFzcyIsImNyZWF0ZUFjdGlvbkxheW91dCIsImFjdGlvbnMiLCJsYWJlbCIsImVuYWJsZWQiLCJoYXNQcm9wZXJ0eSIsImJpbmREZWxlZ2F0ZSIsImZuIiwibmF2aWdhdGVUb0VudGl0eSIsInZpZXciLCJrZXlQcm9wZXJ0eSIsInRleHRQcm9wZXJ0eSIsImZvcm1hdFNlYXJjaFF1ZXJ5Iiwic2VhcmNoUXVlcnkiLCJxIiwiZXNjYXBlU2VhcmNoUXVlcnkiLCJ0b1VwcGVyQ2FzZSIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkJBLE1BQU1BLFdBQVcsb0JBQVksa0JBQVosQ0FBakIsQyxDQTNCQTs7Ozs7Ozs7Ozs7Ozs7O0FBNkJBLE1BQU1DLFVBQVUsdUJBQVEsOENBQVIsRUFBd0QscUdBQXhELEVBQTBIO0FBQ3hJQywrQkFEd0k7QUFFeElDLDJCQUZ3STs7QUFJeEk7QUFDQUMsa0JBQWMsSUFBSUMsUUFBSixDQUFhLENBQ3pCLG9IQUR5QixFQUV6QixzSkFGeUIsRUFHekIsMkdBSHlCLEVBSXpCLDJLQUp5QixFQUt6QiwwRkFMeUIsRUFNekIsbUZBTnlCLEVBT3pCLE1BUHlCLEVBUXpCLHNGQVJ5QixFQVN6QiwyRUFUeUIsRUFVekIsTUFWeUIsRUFXekIscUlBWHlCLENBQWIsQ0FMMEg7O0FBbUJ4STtBQUNBQyxlQUFXTixTQUFTTSxTQXBCb0g7QUFxQnhJQyxxQkFBaUJQLFNBQVNPLGVBckI4RztBQXNCeElDLHlCQUFxQlIsU0FBU1EsbUJBdEIwRztBQXVCeElDLHNCQUFrQlQsU0FBU1MsZ0JBdkI2RztBQXdCeElDLDJCQUF1QlYsU0FBU1UscUJBeEJ3RztBQXlCeElDLDJCQUF1QlgsU0FBU1cscUJBekJ3RztBQTBCeElDLHlCQUFxQlosU0FBU1ksbUJBMUIwRztBQTJCeElDLHFCQUFpQmIsU0FBU2EsZUEzQjhHO0FBNEJ4SUMsc0JBQWtCZCxTQUFTYyxnQkE1QjZHOztBQThCeEk7QUFDQUMsUUFBSSxtQkEvQm9JO0FBZ0N4SUMsZ0JBQVkscUJBaEM0SDtBQWlDeElDLGVBQVcsZ0JBQVlDLFdBakNpSDtBQWtDeElDLGtCQUFjLGNBbEMwSDtBQW1DeElDLG9CQUFnQixJQW5Dd0g7QUFvQ3hJQyxtQkFBZSxJQXBDeUg7QUFxQ3hJQyxvQkFBZ0IsSUFyQ3dIO0FBc0N4SUMsWUFBUSxJQXRDZ0k7QUF1Q3hJQyxjQUFVLDJCQXZDOEg7QUF3Q3hJQyxvQkFBZ0IsMEJBeEN3SDs7QUEwQ3hJO0FBQ0FDLDhCQUEwQixJQTNDOEc7QUE0Q3hJQyxtQkFBZSxJQTVDeUg7QUE2Q3hJQyxnQkFBWSxhQTdDNEg7O0FBK0N4STtBQUNBQyxtQkFBZSxXQWhEeUg7O0FBa0R4SUMsd0JBQW9CLFNBQVNBLGtCQUFULEdBQThCO0FBQ2hELGFBQU8sS0FBS0MsT0FBTCxLQUFpQixLQUFLQSxPQUFMLEdBQWUsQ0FBQztBQUN0Q2hCLFlBQUksYUFEa0M7QUFFdENpQixlQUFPLEtBQUtyQixxQkFGMEI7QUFHdENzQixpQkFBUyxpQkFBT0MsV0FBUCxDQUFtQkMsWUFBbkIsQ0FBZ0MsSUFBaEMsRUFBc0MsY0FBdEMsQ0FINkI7QUFJdENDLFlBQUksaUJBQU9DLGdCQUFQLENBQXdCRixZQUF4QixDQUFxQyxJQUFyQyxFQUEyQztBQUM3Q0csZ0JBQU0sZ0JBRHVDO0FBRTdDQyx1QkFBYSxjQUZnQztBQUc3Q0Msd0JBQWM7QUFIK0IsU0FBM0M7QUFKa0MsT0FBRCxDQUFoQyxDQUFQO0FBV0QsS0E5RHVJOztBQWdFeElDLHVCQUFtQixTQUFTQSxpQkFBVCxDQUEyQkMsV0FBM0IsRUFBd0M7QUFDekQsVUFBTUMsSUFBSSxLQUFLQyxpQkFBTCxDQUF1QkYsWUFBWUcsV0FBWixFQUF2QixDQUFWO0FBQ0EsbURBQTJDRixDQUEzQyxvQ0FBMkVBLENBQTNFO0FBQ0Q7QUFuRXVJLEdBQTFILENBQWhCOztBQXNFQSxpQkFBS0csU0FBTCxDQUFlLCtCQUFmLEVBQWdEN0MsT0FBaEQ7b0JBQ2VBLE8iLCJmaWxlIjoiTGlzdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBhY3Rpb24gZnJvbSAnY3JtL0FjdGlvbic7XHJcbmltcG9ydCBMaXN0IGZyb20gJ2FyZ29zL0xpc3QnO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJ2NybS9Gb3JtYXQnO1xyXG5pbXBvcnQgX1JpZ2h0RHJhd2VyTGlzdE1peGluIGZyb20gJ2NybS9WaWV3cy9fUmlnaHREcmF3ZXJMaXN0TWl4aW4nO1xyXG5pbXBvcnQgX01ldHJpY0xpc3RNaXhpbiBmcm9tICdjcm0vVmlld3MvX01ldHJpY0xpc3RNaXhpbic7XHJcbmltcG9ydCBfR3JvdXBMaXN0TWl4aW4gZnJvbSAnY3JtL1ZpZXdzL19Hcm91cExpc3RNaXhpbic7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi8uLi9Nb2RlbHMvTmFtZXMnO1xyXG5pbXBvcnQgdXRpbGl0eSBmcm9tICcuLi8uLi9VdGlsaXR5JztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnZXJwU2hpcG1lbnRzTGlzdCcpO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLlZpZXdzLkVSUFNoaXBtZW50cy5MaXN0JywgW0xpc3QsIF9SaWdodERyYXdlckxpc3RNaXhpbiwgX01ldHJpY0xpc3RNaXhpbiwgX0dyb3VwTGlzdE1peGluXSwge1xyXG4gIGZvcm1hdHRlcjogZm9ybWF0LFxyXG4gIHV0aWw6IHV0aWxpdHksXHJcblxyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIGl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8cCBjbGFzcz1cImxpc3R2aWV3LWhlYWRpbmdcIj48bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC5zaGlwbWVudElETGFiZWxUZXh0ICV9PC9sYWJlbD4geyU6ICQuRXJwRXh0SWQgJX08L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj4geyUgaWYgKCQuQWNjb3VudCkgeyAlfTxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+IHslOiAkJC5hY2NvdW50TGFiZWxUZXh0ICV9PC9sYWJlbD4geyU6ICQuQWNjb3VudC5BY2NvdW50TmFtZSAlfSB7JSB9ICV9PC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+PGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQuc3RhdHVzTGFiZWxUZXh0ICV9PC9sYWJlbD4geyU6ICQuRXJwU3RhdHVzICV9PC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+IHslIGlmICgkLkRhdGVQcm9taXNlZCkgeyAlfTxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLmRhdGVQcm9taXNlZExhYmVsVGV4dCAlfTwvbGFiZWw+IHslOiAkJC5mb3JtYXR0ZXIuZGF0ZSgkLkRhdGVQcm9taXNlZCkgJX0geyUgfSAlfTwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+IHslOiAkJC50b3RhbEJhc2VBbW91bnRUZXh0ICV9IDwvbGFiZWw+JyxcclxuICAgICd7JTogJCQudXRpbC5mb3JtYXRNdWx0aUN1cnJlbmN5KCQuU2hpcG1lbnRUb3RhbEJhc2VBbW91bnQsICQuQmFzZUN1cnJlbmN5Q29kZSkgJX0nLFxyXG4gICAgJzwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+IHslOiAkJC50b3RhbEFtb3VudFRleHQgJX0gPC9sYWJlbD4nLFxyXG4gICAgJ3slOiAkJC51dGlsLmZvcm1hdE11bHRpQ3VycmVuY3koJC5TaGlwbWVudFRvdGFsQW1vdW50LCAkLkN1cnJlbmN5Q29kZSkgJX0nLFxyXG4gICAgJzwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLmRvY3VtZW50RGF0ZVRleHQgJX08L2xhYmVsPiB7JTogJCQuZm9ybWF0dGVyLmRhdGUoJC5FcnBEb2N1bWVudERhdGUpICV9PC9wPicsXHJcbiAgXSksXHJcblxyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIHN0YXR1c0xhYmVsVGV4dDogcmVzb3VyY2Uuc3RhdHVzTGFiZWxUZXh0LFxyXG4gIHNoaXBtZW50SURMYWJlbFRleHQ6IHJlc291cmNlLnNoaXBtZW50SURMYWJlbFRleHQsXHJcbiAgYWNjb3VudExhYmVsVGV4dDogcmVzb3VyY2UuYWNjb3VudExhYmVsVGV4dCxcclxuICBkYXRlUHJvbWlzZWRMYWJlbFRleHQ6IHJlc291cmNlLmRhdGVQcm9taXNlZExhYmVsVGV4dCxcclxuICB2aWV3QWNjb3VudEFjdGlvblRleHQ6IHJlc291cmNlLnZpZXdBY2NvdW50QWN0aW9uVGV4dCxcclxuICB0b3RhbEJhc2VBbW91bnRUZXh0OiByZXNvdXJjZS50b3RhbEJhc2VBbW91bnRUZXh0LFxyXG4gIHRvdGFsQW1vdW50VGV4dDogcmVzb3VyY2UudG90YWxBbW91bnRUZXh0LFxyXG4gIGRvY3VtZW50RGF0ZVRleHQ6IHJlc291cmNlLmRvY3VtZW50RGF0ZVRleHQsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnZXJwc2hpcG1lbnRzX2xpc3QnLFxyXG4gIGRldGFpbFZpZXc6ICdlcnBzaGlwbWVudHNfZGV0YWlsJyxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLkVSUFNISVBNRU5ULFxyXG4gIHJlc291cmNlS2luZDogJ2VycFNoaXBtZW50cycsXHJcbiAgYWxsb3dTZWxlY3Rpb246IHRydWUsXHJcbiAgZW5hYmxlQWN0aW9uczogdHJ1ZSxcclxuICBlbmFibGVIYXNoVGFnczogdHJ1ZSxcclxuICBleHBvc2U6IHRydWUsXHJcbiAgc2VjdXJpdHk6ICdFbnRpdGllcy9FcnBTaGlwbWVudC9WaWV3JyxcclxuICBpbnNlcnRTZWN1cml0eTogJ0VudGl0aWVzL0VycFNoaXBtZW50L0FkZCcsXHJcblxyXG4gIC8vIEdyb3Vwc1xyXG4gIGVuYWJsZUR5bmFtaWNHcm91cExheW91dDogdHJ1ZSxcclxuICBncm91cHNFbmFibGVkOiB0cnVlLFxyXG4gIGVudGl0eU5hbWU6ICdFUlBTaGlwbWVudCcsXHJcblxyXG4gIC8vIENhcmQgbGF5b3V0XHJcbiAgaXRlbUljb25DbGFzczogJ3dhcmVob3VzZScsXHJcblxyXG4gIGNyZWF0ZUFjdGlvbkxheW91dDogZnVuY3Rpb24gY3JlYXRlQWN0aW9uTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYWN0aW9ucyB8fCAodGhpcy5hY3Rpb25zID0gW3tcclxuICAgICAgaWQ6ICd2aWV3QWNjb3VudCcsXHJcbiAgICAgIGxhYmVsOiB0aGlzLnZpZXdBY2NvdW50QWN0aW9uVGV4dCxcclxuICAgICAgZW5hYmxlZDogYWN0aW9uLmhhc1Byb3BlcnR5LmJpbmREZWxlZ2F0ZSh0aGlzLCAnQWNjb3VudC4ka2V5JyksXHJcbiAgICAgIGZuOiBhY3Rpb24ubmF2aWdhdGVUb0VudGl0eS5iaW5kRGVsZWdhdGUodGhpcywge1xyXG4gICAgICAgIHZpZXc6ICdhY2NvdW50X2RldGFpbCcsXHJcbiAgICAgICAga2V5UHJvcGVydHk6ICdBY2NvdW50LiRrZXknLFxyXG4gICAgICAgIHRleHRQcm9wZXJ0eTogJ0FjY291bnQuQWNjb3VudE5hbWUnLFxyXG4gICAgICB9KSxcclxuICAgIH1dXHJcbiAgICApO1xyXG4gIH0sXHJcblxyXG4gIGZvcm1hdFNlYXJjaFF1ZXJ5OiBmdW5jdGlvbiBmb3JtYXRTZWFyY2hRdWVyeShzZWFyY2hRdWVyeSkge1xyXG4gICAgY29uc3QgcSA9IHRoaXMuZXNjYXBlU2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkudG9VcHBlckNhc2UoKSk7XHJcbiAgICByZXR1cm4gYHVwcGVyKEFjY291bnQuQWNjb3VudE5hbWUpIGxpa2UgXCIke3F9JVwiIG9yIHVwcGVyKEVycEV4dElkKSBsaWtlIFwiJHtxfSVcImA7XHJcbiAgfSxcclxufSk7XHJcblxyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuVmlld3MuRVJQU2hpcG1lbnRzLkxpc3QnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19