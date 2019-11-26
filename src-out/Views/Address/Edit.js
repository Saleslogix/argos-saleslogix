define('crm/Views/Address/Edit', ['module', 'exports', 'dojo/_base/declare', 'dojo/string', '../../Format', '../../Validator', 'argos/Edit', 'argos/I18n'], function (module, exports, _declare, _string, _Format, _Validator, _Edit, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _string2 = _interopRequireDefault(_string);

  var _Format2 = _interopRequireDefault(_Format);

  var _Validator2 = _interopRequireDefault(_Validator);

  var _Edit2 = _interopRequireDefault(_Edit);

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

  var resource = (0, _I18n2.default)('addressEdit');

  /**
   * @class crm.Views.Address.Edit
   * @extends argos.Edit
   *
   */
  var __class = (0, _declare2.default)('crm.Views.Address.Edit', [_Edit2.default], /** @lends crm.Views.Address.Edit# */{
    // Localization
    address1Text: resource.address1Text,
    address2Text: resource.address2Text,
    address3Text: resource.address3Text,
    cityText: resource.cityText,
    cityTitleText: resource.cityTitleText,
    countryText: resource.countryText,
    countryTitleText: resource.countryTitleText,
    descriptionText: resource.descriptionText,
    descriptionTitleText: resource.descriptionTitleText,
    isMailingText: resource.isMailingText,
    isPrimaryText: resource.isPrimaryText,
    postalCodeText: resource.postalCodeText,
    salutationText: resource.salutationText,
    stateText: resource.stateText,
    stateTitleText: resource.stateTitleText,
    titleText: resource.titleText,
    /**
     * Each locale key contains an array of field names to be hidden
     * Set to null to skip and leave all fields visible
     */
    localeFieldHidden: {
      'en-US': null,
      'en-GB': ['State'],
      'fr-FR': ['State'],
      'de-DE': ['State'],
      'it-IT': null,
      'ru-RU': ['State']
    },

    // View Properties
    id: 'address_edit',

    init: function init() {
      this.inherited(init, arguments);
      this.connect(this.fields.Country, 'onChange', this.onCountryChange);
    },
    onCountryChange: function onCountryChange(value) {
      var locale = _Format2.default.countryCultures[value] || 'en-US';
      this.hideFieldsForLocale(locale);
    },
    /**
     * Hides from view the field names defined in localeFieldHidden for the given locale
     * Doing so enables a user to enter an address
     * @param locale Localization string (Ex: 'en-US' or 'de-DE')
     */
    hideFieldsForLocale: function hideFieldsForLocale(locale) {
      var fieldsToHide = this.localeFieldHidden[locale];
      if (!fieldsToHide) {
        return;
      }

      for (var i = 0; i < fieldsToHide.length; i++) {
        var field = this.fields[fieldsToHide[i]];
        if (field) {
          field.hide();
        }
      }
    },
    formatDependentPicklist: function formatDependentPicklist(theFormat) {
      return _string2.default.substitute(theFormat, [this.options.entityName]);
    },
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        name: 'EntityId',
        property: 'EntityId',
        type: 'hidden'
      }, {
        label: this.descriptionText,
        name: 'Description',
        property: 'Description',
        picklist: this.formatDependentPicklist.bindDelegate(this, 'Address Description (${0})', true),
        requireSelection: false,
        title: this.descriptionTitleText,
        type: 'picklist',
        maxTextLength: 64,
        validator: [_Validator2.default.exists, _Validator2.default.exceedsMaxTextLength]
      }, {
        name: 'IsPrimary',
        property: 'IsPrimary',
        label: this.isPrimaryText,
        type: 'boolean'
      }, {
        name: 'IsMailing',
        property: 'IsMailing',
        label: this.isMailingText,
        type: 'boolean'
      }, {
        name: 'Address1',
        property: 'Address1',
        label: this.address1Text,
        type: 'text',
        maxTextLength: 64,
        validator: _Validator2.default.exceedsMaxTextLength
      }, {
        name: 'Address2',
        property: 'Address2',
        label: this.address2Text,
        type: 'text',
        maxTextLength: 64,
        validator: _Validator2.default.exceedsMaxTextLength
      }, {
        name: 'Address3',
        property: 'Address3',
        label: this.address3Text,
        type: 'text',
        maxTextLength: 64,
        validator: _Validator2.default.exceedsMaxTextLength
      }, {
        label: this.cityText,
        name: 'City',
        property: 'City',
        picklist: 'City',
        requireSelection: false,
        title: this.cityTitleText,
        type: 'picklist',
        maxTextLength: 32,
        validator: _Validator2.default.exceedsMaxTextLength
      }, {
        label: this.stateText,
        name: 'State',
        property: 'State',
        picklist: 'State',
        requireSelection: false,
        title: this.stateTitleText,
        type: 'picklist',
        maxTextLength: 32,
        validator: _Validator2.default.exceedsMaxTextLength
      }, {
        name: 'PostalCode',
        property: 'PostalCode',
        label: this.postalCodeText,
        type: 'text',
        maxTextLength: 24,
        validator: _Validator2.default.exceedsMaxTextLength
      }, {
        label: this.countryText,
        name: 'Country',
        property: 'Country',
        picklist: 'Country',
        requireSelection: false,
        title: this.countryTitleText,
        type: 'picklist',
        maxTextLength: 64,
        validator: _Validator2.default.exceedsMaxTextLength
      }, {
        label: this.salutationText,
        name: 'Salutation',
        property: 'Salutation',
        type: 'text',
        maxTextLength: 64,
        validator: _Validator2.default.exceedsMaxTextLength
      }]);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9BZGRyZXNzL0VkaXQuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiYWRkcmVzczFUZXh0IiwiYWRkcmVzczJUZXh0IiwiYWRkcmVzczNUZXh0IiwiY2l0eVRleHQiLCJjaXR5VGl0bGVUZXh0IiwiY291bnRyeVRleHQiLCJjb3VudHJ5VGl0bGVUZXh0IiwiZGVzY3JpcHRpb25UZXh0IiwiZGVzY3JpcHRpb25UaXRsZVRleHQiLCJpc01haWxpbmdUZXh0IiwiaXNQcmltYXJ5VGV4dCIsInBvc3RhbENvZGVUZXh0Iiwic2FsdXRhdGlvblRleHQiLCJzdGF0ZVRleHQiLCJzdGF0ZVRpdGxlVGV4dCIsInRpdGxlVGV4dCIsImxvY2FsZUZpZWxkSGlkZGVuIiwiaWQiLCJpbml0IiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiY29ubmVjdCIsImZpZWxkcyIsIkNvdW50cnkiLCJvbkNvdW50cnlDaGFuZ2UiLCJ2YWx1ZSIsImxvY2FsZSIsImNvdW50cnlDdWx0dXJlcyIsImhpZGVGaWVsZHNGb3JMb2NhbGUiLCJmaWVsZHNUb0hpZGUiLCJpIiwibGVuZ3RoIiwiZmllbGQiLCJoaWRlIiwiZm9ybWF0RGVwZW5kZW50UGlja2xpc3QiLCJ0aGVGb3JtYXQiLCJzdWJzdGl0dXRlIiwib3B0aW9ucyIsImVudGl0eU5hbWUiLCJjcmVhdGVMYXlvdXQiLCJsYXlvdXQiLCJuYW1lIiwicHJvcGVydHkiLCJ0eXBlIiwibGFiZWwiLCJwaWNrbGlzdCIsImJpbmREZWxlZ2F0ZSIsInJlcXVpcmVTZWxlY3Rpb24iLCJ0aXRsZSIsIm1heFRleHRMZW5ndGgiLCJ2YWxpZGF0b3IiLCJleGlzdHMiLCJleGNlZWRzTWF4VGV4dExlbmd0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE1BQU1BLFdBQVcsb0JBQVksYUFBWixDQUFqQjs7QUFFQTs7Ozs7QUFLQSxNQUFN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QU1EQyxlQUFPLEtBQUtsQyxjQU5YO0FBT0Q2QixjQUFNLFVBUEw7QUFRRE0sdUJBQWUsRUFSZDtBQVNEQyxtQkFBVyxvQkFBVUU7QUFUcEIsT0E1RGtDLEVBc0VsQztBQUNEWCxjQUFNLFlBREw7QUFFREMsa0JBQVUsWUFGVDtBQUdERSxlQUFPLEtBQUtqQyxjQUhYO0FBSURnQyxjQUFNLE1BSkw7QUFLRE0sdUJBQWUsRUFMZDtBQU1EQyxtQkFBVyxvQkFBVUU7QUFOcEIsT0F0RWtDLEVBNkVsQztBQUNEUixlQUFPLEtBQUt2QyxXQURYO0FBRURvQyxjQUFNLFNBRkw7QUFHREMsa0JBQVUsU0FIVDtBQUlERyxrQkFBVSxTQUpUO0FBS0RFLDBCQUFrQixLQUxqQjtBQU1EQyxlQUFPLEtBQUsxQyxnQkFOWDtBQU9EcUMsY0FBTSxVQVBMO0FBUURNLHVCQUFlLEVBUmQ7QUFTREMsbUJBQVcsb0JBQVVFO0FBVHBCLE9BN0VrQyxFQXVGbEM7QUFDRFIsZUFBTyxLQUFLaEMsY0FEWDtBQUVENkIsY0FBTSxZQUZMO0FBR0RDLGtCQUFVLFlBSFQ7QUFJREMsY0FBTSxNQUpMO0FBS0RNLHVCQUFlLEVBTGQ7QUFNREMsbUJBQVcsb0JBQVVFO0FBTnBCLE9BdkZrQyxDQUE5QixDQUFQO0FBK0ZEO0FBL0o0RixHQUEvRSxDQUFoQjs7b0JBa0tlckQsTyIsImZpbGUiOiJFZGl0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IHN0cmluZyBmcm9tICdkb2pvL3N0cmluZyc7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnLi4vLi4vRm9ybWF0JztcclxuaW1wb3J0IHZhbGlkYXRvciBmcm9tICcuLi8uLi9WYWxpZGF0b3InO1xyXG5pbXBvcnQgRWRpdCBmcm9tICdhcmdvcy9FZGl0JztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYWRkcmVzc0VkaXQnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLkFkZHJlc3MuRWRpdFxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5FZGl0XHJcbiAqXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLkFkZHJlc3MuRWRpdCcsIFtFZGl0XSwgLyoqIEBsZW5kcyBjcm0uVmlld3MuQWRkcmVzcy5FZGl0IyAqL3tcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICBhZGRyZXNzMVRleHQ6IHJlc291cmNlLmFkZHJlc3MxVGV4dCxcclxuICBhZGRyZXNzMlRleHQ6IHJlc291cmNlLmFkZHJlc3MyVGV4dCxcclxuICBhZGRyZXNzM1RleHQ6IHJlc291cmNlLmFkZHJlc3MzVGV4dCxcclxuICBjaXR5VGV4dDogcmVzb3VyY2UuY2l0eVRleHQsXHJcbiAgY2l0eVRpdGxlVGV4dDogcmVzb3VyY2UuY2l0eVRpdGxlVGV4dCxcclxuICBjb3VudHJ5VGV4dDogcmVzb3VyY2UuY291bnRyeVRleHQsXHJcbiAgY291bnRyeVRpdGxlVGV4dDogcmVzb3VyY2UuY291bnRyeVRpdGxlVGV4dCxcclxuICBkZXNjcmlwdGlvblRleHQ6IHJlc291cmNlLmRlc2NyaXB0aW9uVGV4dCxcclxuICBkZXNjcmlwdGlvblRpdGxlVGV4dDogcmVzb3VyY2UuZGVzY3JpcHRpb25UaXRsZVRleHQsXHJcbiAgaXNNYWlsaW5nVGV4dDogcmVzb3VyY2UuaXNNYWlsaW5nVGV4dCxcclxuICBpc1ByaW1hcnlUZXh0OiByZXNvdXJjZS5pc1ByaW1hcnlUZXh0LFxyXG4gIHBvc3RhbENvZGVUZXh0OiByZXNvdXJjZS5wb3N0YWxDb2RlVGV4dCxcclxuICBzYWx1dGF0aW9uVGV4dDogcmVzb3VyY2Uuc2FsdXRhdGlvblRleHQsXHJcbiAgc3RhdGVUZXh0OiByZXNvdXJjZS5zdGF0ZVRleHQsXHJcbiAgc3RhdGVUaXRsZVRleHQ6IHJlc291cmNlLnN0YXRlVGl0bGVUZXh0LFxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIC8qKlxyXG4gICAqIEVhY2ggbG9jYWxlIGtleSBjb250YWlucyBhbiBhcnJheSBvZiBmaWVsZCBuYW1lcyB0byBiZSBoaWRkZW5cclxuICAgKiBTZXQgdG8gbnVsbCB0byBza2lwIGFuZCBsZWF2ZSBhbGwgZmllbGRzIHZpc2libGVcclxuICAgKi9cclxuICBsb2NhbGVGaWVsZEhpZGRlbjoge1xyXG4gICAgJ2VuLVVTJzogbnVsbCxcclxuICAgICdlbi1HQic6IFsnU3RhdGUnXSxcclxuICAgICdmci1GUic6IFsnU3RhdGUnXSxcclxuICAgICdkZS1ERSc6IFsnU3RhdGUnXSxcclxuICAgICdpdC1JVCc6IG51bGwsXHJcbiAgICAncnUtUlUnOiBbJ1N0YXRlJ10sXHJcbiAgfSxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdhZGRyZXNzX2VkaXQnLFxyXG5cclxuICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoaW5pdCwgYXJndW1lbnRzKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5Db3VudHJ5LCAnb25DaGFuZ2UnLCB0aGlzLm9uQ291bnRyeUNoYW5nZSk7XHJcbiAgfSxcclxuICBvbkNvdW50cnlDaGFuZ2U6IGZ1bmN0aW9uIG9uQ291bnRyeUNoYW5nZSh2YWx1ZSkge1xyXG4gICAgY29uc3QgbG9jYWxlID0gZm9ybWF0LmNvdW50cnlDdWx0dXJlc1t2YWx1ZV0gfHwgJ2VuLVVTJztcclxuICAgIHRoaXMuaGlkZUZpZWxkc0ZvckxvY2FsZShsb2NhbGUpO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogSGlkZXMgZnJvbSB2aWV3IHRoZSBmaWVsZCBuYW1lcyBkZWZpbmVkIGluIGxvY2FsZUZpZWxkSGlkZGVuIGZvciB0aGUgZ2l2ZW4gbG9jYWxlXHJcbiAgICogRG9pbmcgc28gZW5hYmxlcyBhIHVzZXIgdG8gZW50ZXIgYW4gYWRkcmVzc1xyXG4gICAqIEBwYXJhbSBsb2NhbGUgTG9jYWxpemF0aW9uIHN0cmluZyAoRXg6ICdlbi1VUycgb3IgJ2RlLURFJylcclxuICAgKi9cclxuICBoaWRlRmllbGRzRm9yTG9jYWxlOiBmdW5jdGlvbiBoaWRlRmllbGRzRm9yTG9jYWxlKGxvY2FsZSkge1xyXG4gICAgY29uc3QgZmllbGRzVG9IaWRlID0gdGhpcy5sb2NhbGVGaWVsZEhpZGRlbltsb2NhbGVdO1xyXG4gICAgaWYgKCFmaWVsZHNUb0hpZGUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmllbGRzVG9IaWRlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGZpZWxkID0gdGhpcy5maWVsZHNbZmllbGRzVG9IaWRlW2ldXTtcclxuICAgICAgaWYgKGZpZWxkKSB7XHJcbiAgICAgICAgZmllbGQuaGlkZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBmb3JtYXREZXBlbmRlbnRQaWNrbGlzdDogZnVuY3Rpb24gZm9ybWF0RGVwZW5kZW50UGlja2xpc3QodGhlRm9ybWF0KSB7XHJcbiAgICByZXR1cm4gc3RyaW5nLnN1YnN0aXR1dGUodGhlRm9ybWF0LCBbdGhpcy5vcHRpb25zLmVudGl0eU5hbWVdKTtcclxuICB9LFxyXG4gIGNyZWF0ZUxheW91dDogZnVuY3Rpb24gY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5b3V0IHx8ICh0aGlzLmxheW91dCA9IFt7XHJcbiAgICAgIG5hbWU6ICdFbnRpdHlJZCcsXHJcbiAgICAgIHByb3BlcnR5OiAnRW50aXR5SWQnLFxyXG4gICAgICB0eXBlOiAnaGlkZGVuJyxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMuZGVzY3JpcHRpb25UZXh0LFxyXG4gICAgICBuYW1lOiAnRGVzY3JpcHRpb24nLFxyXG4gICAgICBwcm9wZXJ0eTogJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgcGlja2xpc3Q6IHRoaXMuZm9ybWF0RGVwZW5kZW50UGlja2xpc3QuYmluZERlbGVnYXRlKFxyXG4gICAgICAgIHRoaXMsICdBZGRyZXNzIERlc2NyaXB0aW9uICgkezB9KScsIHRydWVcclxuICAgICAgKSxcclxuICAgICAgcmVxdWlyZVNlbGVjdGlvbjogZmFsc2UsXHJcbiAgICAgIHRpdGxlOiB0aGlzLmRlc2NyaXB0aW9uVGl0bGVUZXh0LFxyXG4gICAgICB0eXBlOiAncGlja2xpc3QnLFxyXG4gICAgICBtYXhUZXh0TGVuZ3RoOiA2NCxcclxuICAgICAgdmFsaWRhdG9yOiBbXHJcbiAgICAgICAgdmFsaWRhdG9yLmV4aXN0cyxcclxuICAgICAgICB2YWxpZGF0b3IuZXhjZWVkc01heFRleHRMZW5ndGgsXHJcbiAgICAgIF0sXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdJc1ByaW1hcnknLFxyXG4gICAgICBwcm9wZXJ0eTogJ0lzUHJpbWFyeScsXHJcbiAgICAgIGxhYmVsOiB0aGlzLmlzUHJpbWFyeVRleHQsXHJcbiAgICAgIHR5cGU6ICdib29sZWFuJyxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ0lzTWFpbGluZycsXHJcbiAgICAgIHByb3BlcnR5OiAnSXNNYWlsaW5nJyxcclxuICAgICAgbGFiZWw6IHRoaXMuaXNNYWlsaW5nVGV4dCxcclxuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnQWRkcmVzczEnLFxyXG4gICAgICBwcm9wZXJ0eTogJ0FkZHJlc3MxJyxcclxuICAgICAgbGFiZWw6IHRoaXMuYWRkcmVzczFUZXh0LFxyXG4gICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgIG1heFRleHRMZW5ndGg6IDY0LFxyXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGNlZWRzTWF4VGV4dExlbmd0aCxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ0FkZHJlc3MyJyxcclxuICAgICAgcHJvcGVydHk6ICdBZGRyZXNzMicsXHJcbiAgICAgIGxhYmVsOiB0aGlzLmFkZHJlc3MyVGV4dCxcclxuICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICBtYXhUZXh0TGVuZ3RoOiA2NCxcclxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhjZWVkc01heFRleHRMZW5ndGgsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdBZGRyZXNzMycsXHJcbiAgICAgIHByb3BlcnR5OiAnQWRkcmVzczMnLFxyXG4gICAgICBsYWJlbDogdGhpcy5hZGRyZXNzM1RleHQsXHJcbiAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgbWF4VGV4dExlbmd0aDogNjQsXHJcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmV4Y2VlZHNNYXhUZXh0TGVuZ3RoLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5jaXR5VGV4dCxcclxuICAgICAgbmFtZTogJ0NpdHknLFxyXG4gICAgICBwcm9wZXJ0eTogJ0NpdHknLFxyXG4gICAgICBwaWNrbGlzdDogJ0NpdHknLFxyXG4gICAgICByZXF1aXJlU2VsZWN0aW9uOiBmYWxzZSxcclxuICAgICAgdGl0bGU6IHRoaXMuY2l0eVRpdGxlVGV4dCxcclxuICAgICAgdHlwZTogJ3BpY2tsaXN0JyxcclxuICAgICAgbWF4VGV4dExlbmd0aDogMzIsXHJcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmV4Y2VlZHNNYXhUZXh0TGVuZ3RoLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5zdGF0ZVRleHQsXHJcbiAgICAgIG5hbWU6ICdTdGF0ZScsXHJcbiAgICAgIHByb3BlcnR5OiAnU3RhdGUnLFxyXG4gICAgICBwaWNrbGlzdDogJ1N0YXRlJyxcclxuICAgICAgcmVxdWlyZVNlbGVjdGlvbjogZmFsc2UsXHJcbiAgICAgIHRpdGxlOiB0aGlzLnN0YXRlVGl0bGVUZXh0LFxyXG4gICAgICB0eXBlOiAncGlja2xpc3QnLFxyXG4gICAgICBtYXhUZXh0TGVuZ3RoOiAzMixcclxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhjZWVkc01heFRleHRMZW5ndGgsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdQb3N0YWxDb2RlJyxcclxuICAgICAgcHJvcGVydHk6ICdQb3N0YWxDb2RlJyxcclxuICAgICAgbGFiZWw6IHRoaXMucG9zdGFsQ29kZVRleHQsXHJcbiAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgbWF4VGV4dExlbmd0aDogMjQsXHJcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmV4Y2VlZHNNYXhUZXh0TGVuZ3RoLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5jb3VudHJ5VGV4dCxcclxuICAgICAgbmFtZTogJ0NvdW50cnknLFxyXG4gICAgICBwcm9wZXJ0eTogJ0NvdW50cnknLFxyXG4gICAgICBwaWNrbGlzdDogJ0NvdW50cnknLFxyXG4gICAgICByZXF1aXJlU2VsZWN0aW9uOiBmYWxzZSxcclxuICAgICAgdGl0bGU6IHRoaXMuY291bnRyeVRpdGxlVGV4dCxcclxuICAgICAgdHlwZTogJ3BpY2tsaXN0JyxcclxuICAgICAgbWF4VGV4dExlbmd0aDogNjQsXHJcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmV4Y2VlZHNNYXhUZXh0TGVuZ3RoLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5zYWx1dGF0aW9uVGV4dCxcclxuICAgICAgbmFtZTogJ1NhbHV0YXRpb24nLFxyXG4gICAgICBwcm9wZXJ0eTogJ1NhbHV0YXRpb24nLFxyXG4gICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgIG1heFRleHRMZW5ndGg6IDY0LFxyXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGNlZWRzTWF4VGV4dExlbmd0aCxcclxuICAgIH1dKTtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==