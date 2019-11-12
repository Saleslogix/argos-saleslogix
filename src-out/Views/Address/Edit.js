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
      this.inherited(arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9BZGRyZXNzL0VkaXQuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiYWRkcmVzczFUZXh0IiwiYWRkcmVzczJUZXh0IiwiYWRkcmVzczNUZXh0IiwiY2l0eVRleHQiLCJjaXR5VGl0bGVUZXh0IiwiY291bnRyeVRleHQiLCJjb3VudHJ5VGl0bGVUZXh0IiwiZGVzY3JpcHRpb25UZXh0IiwiZGVzY3JpcHRpb25UaXRsZVRleHQiLCJpc01haWxpbmdUZXh0IiwiaXNQcmltYXJ5VGV4dCIsInBvc3RhbENvZGVUZXh0Iiwic2FsdXRhdGlvblRleHQiLCJzdGF0ZVRleHQiLCJzdGF0ZVRpdGxlVGV4dCIsInRpdGxlVGV4dCIsImxvY2FsZUZpZWxkSGlkZGVuIiwiaWQiLCJpbml0IiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiY29ubmVjdCIsImZpZWxkcyIsIkNvdW50cnkiLCJvbkNvdW50cnlDaGFuZ2UiLCJ2YWx1ZSIsImxvY2FsZSIsImNvdW50cnlDdWx0dXJlcyIsImhpZGVGaWVsZHNGb3JMb2NhbGUiLCJmaWVsZHNUb0hpZGUiLCJpIiwibGVuZ3RoIiwiZmllbGQiLCJoaWRlIiwiZm9ybWF0RGVwZW5kZW50UGlja2xpc3QiLCJ0aGVGb3JtYXQiLCJzdWJzdGl0dXRlIiwib3B0aW9ucyIsImVudGl0eU5hbWUiLCJjcmVhdGVMYXlvdXQiLCJsYXlvdXQiLCJuYW1lIiwicHJvcGVydHkiLCJ0eXBlIiwibGFiZWwiLCJwaWNrbGlzdCIsImJpbmREZWxlZ2F0ZSIsInJlcXVpcmVTZWxlY3Rpb24iLCJ0aXRsZSIsIm1heFRleHRMZW5ndGgiLCJ2YWxpZGF0b3IiLCJleGlzdHMiLCJleGNlZWRzTWF4VGV4dExlbmd0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE1BQU1BLFdBQVcsb0JBQVksYUFBWixDQUFqQjs7QUFFQTs7Ozs7QUFLQSxNQUFN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S2xDLGNBTlg7QUFPRDZCLGNBQU0sVUFQTDtBQVFETSx1QkFBZSxFQVJkO0FBU0RDLG1CQUFXLG9CQUFVRTtBQVRwQixPQTVEa0MsRUFzRWxDO0FBQ0RYLGNBQU0sWUFETDtBQUVEQyxrQkFBVSxZQUZUO0FBR0RFLGVBQU8sS0FBS2pDLGNBSFg7QUFJRGdDLGNBQU0sTUFKTDtBQUtETSx1QkFBZSxFQUxkO0FBTURDLG1CQUFXLG9CQUFVRTtBQU5wQixPQXRFa0MsRUE2RWxDO0FBQ0RSLGVBQU8sS0FBS3ZDLFdBRFg7QUFFRG9DLGNBQU0sU0FGTDtBQUdEQyxrQkFBVSxTQUhUO0FBSURHLGtCQUFVLFNBSlQ7QUFLREUsMEJBQWtCLEtBTGpCO0FBTURDLGVBQU8sS0FBSzFDLGdCQU5YO0FBT0RxQyxjQUFNLFVBUEw7QUFRRE0sdUJBQWUsRUFSZDtBQVNEQyxtQkFBVyxvQkFBVUU7QUFUcEIsT0E3RWtDLEVBdUZsQztBQUNEUixlQUFPLEtBQUtoQyxjQURYO0FBRUQ2QixjQUFNLFlBRkw7QUFHREMsa0JBQVUsWUFIVDtBQUlEQyxjQUFNLE1BSkw7QUFLRE0sdUJBQWUsRUFMZDtBQU1EQyxtQkFBVyxvQkFBVUU7QUFOcEIsT0F2RmtDLENBQTlCLENBQVA7QUErRkQ7QUEvSjRGLEdBQS9FLENBQWhCOztvQkFrS2VyRCxPIiwiZmlsZSI6IkVkaXQuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgc3RyaW5nIGZyb20gJ2Rvam8vc3RyaW5nJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICcuLi8uLi9Gb3JtYXQnO1xyXG5pbXBvcnQgdmFsaWRhdG9yIGZyb20gJy4uLy4uL1ZhbGlkYXRvcic7XHJcbmltcG9ydCBFZGl0IGZyb20gJ2FyZ29zL0VkaXQnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdhZGRyZXNzRWRpdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuQWRkcmVzcy5FZGl0XHJcbiAqIEBleHRlbmRzIGFyZ29zLkVkaXRcclxuICpcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuQWRkcmVzcy5FZGl0JywgW0VkaXRdLCAvKiogQGxlbmRzIGNybS5WaWV3cy5BZGRyZXNzLkVkaXQjICove1xyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIGFkZHJlc3MxVGV4dDogcmVzb3VyY2UuYWRkcmVzczFUZXh0LFxyXG4gIGFkZHJlc3MyVGV4dDogcmVzb3VyY2UuYWRkcmVzczJUZXh0LFxyXG4gIGFkZHJlc3MzVGV4dDogcmVzb3VyY2UuYWRkcmVzczNUZXh0LFxyXG4gIGNpdHlUZXh0OiByZXNvdXJjZS5jaXR5VGV4dCxcclxuICBjaXR5VGl0bGVUZXh0OiByZXNvdXJjZS5jaXR5VGl0bGVUZXh0LFxyXG4gIGNvdW50cnlUZXh0OiByZXNvdXJjZS5jb3VudHJ5VGV4dCxcclxuICBjb3VudHJ5VGl0bGVUZXh0OiByZXNvdXJjZS5jb3VudHJ5VGl0bGVUZXh0LFxyXG4gIGRlc2NyaXB0aW9uVGV4dDogcmVzb3VyY2UuZGVzY3JpcHRpb25UZXh0LFxyXG4gIGRlc2NyaXB0aW9uVGl0bGVUZXh0OiByZXNvdXJjZS5kZXNjcmlwdGlvblRpdGxlVGV4dCxcclxuICBpc01haWxpbmdUZXh0OiByZXNvdXJjZS5pc01haWxpbmdUZXh0LFxyXG4gIGlzUHJpbWFyeVRleHQ6IHJlc291cmNlLmlzUHJpbWFyeVRleHQsXHJcbiAgcG9zdGFsQ29kZVRleHQ6IHJlc291cmNlLnBvc3RhbENvZGVUZXh0LFxyXG4gIHNhbHV0YXRpb25UZXh0OiByZXNvdXJjZS5zYWx1dGF0aW9uVGV4dCxcclxuICBzdGF0ZVRleHQ6IHJlc291cmNlLnN0YXRlVGV4dCxcclxuICBzdGF0ZVRpdGxlVGV4dDogcmVzb3VyY2Uuc3RhdGVUaXRsZVRleHQsXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgLyoqXHJcbiAgICogRWFjaCBsb2NhbGUga2V5IGNvbnRhaW5zIGFuIGFycmF5IG9mIGZpZWxkIG5hbWVzIHRvIGJlIGhpZGRlblxyXG4gICAqIFNldCB0byBudWxsIHRvIHNraXAgYW5kIGxlYXZlIGFsbCBmaWVsZHMgdmlzaWJsZVxyXG4gICAqL1xyXG4gIGxvY2FsZUZpZWxkSGlkZGVuOiB7XHJcbiAgICAnZW4tVVMnOiBudWxsLFxyXG4gICAgJ2VuLUdCJzogWydTdGF0ZSddLFxyXG4gICAgJ2ZyLUZSJzogWydTdGF0ZSddLFxyXG4gICAgJ2RlLURFJzogWydTdGF0ZSddLFxyXG4gICAgJ2l0LUlUJzogbnVsbCxcclxuICAgICdydS1SVSc6IFsnU3RhdGUnXSxcclxuICB9LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ2FkZHJlc3NfZWRpdCcsXHJcblxyXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLkNvdW50cnksICdvbkNoYW5nZScsIHRoaXMub25Db3VudHJ5Q2hhbmdlKTtcclxuICB9LFxyXG4gIG9uQ291bnRyeUNoYW5nZTogZnVuY3Rpb24gb25Db3VudHJ5Q2hhbmdlKHZhbHVlKSB7XHJcbiAgICBjb25zdCBsb2NhbGUgPSBmb3JtYXQuY291bnRyeUN1bHR1cmVzW3ZhbHVlXSB8fCAnZW4tVVMnO1xyXG4gICAgdGhpcy5oaWRlRmllbGRzRm9yTG9jYWxlKGxvY2FsZSk7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBIaWRlcyBmcm9tIHZpZXcgdGhlIGZpZWxkIG5hbWVzIGRlZmluZWQgaW4gbG9jYWxlRmllbGRIaWRkZW4gZm9yIHRoZSBnaXZlbiBsb2NhbGVcclxuICAgKiBEb2luZyBzbyBlbmFibGVzIGEgdXNlciB0byBlbnRlciBhbiBhZGRyZXNzXHJcbiAgICogQHBhcmFtIGxvY2FsZSBMb2NhbGl6YXRpb24gc3RyaW5nIChFeDogJ2VuLVVTJyBvciAnZGUtREUnKVxyXG4gICAqL1xyXG4gIGhpZGVGaWVsZHNGb3JMb2NhbGU6IGZ1bmN0aW9uIGhpZGVGaWVsZHNGb3JMb2NhbGUobG9jYWxlKSB7XHJcbiAgICBjb25zdCBmaWVsZHNUb0hpZGUgPSB0aGlzLmxvY2FsZUZpZWxkSGlkZGVuW2xvY2FsZV07XHJcbiAgICBpZiAoIWZpZWxkc1RvSGlkZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWVsZHNUb0hpZGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgZmllbGQgPSB0aGlzLmZpZWxkc1tmaWVsZHNUb0hpZGVbaV1dO1xyXG4gICAgICBpZiAoZmllbGQpIHtcclxuICAgICAgICBmaWVsZC5oaWRlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGZvcm1hdERlcGVuZGVudFBpY2tsaXN0OiBmdW5jdGlvbiBmb3JtYXREZXBlbmRlbnRQaWNrbGlzdCh0aGVGb3JtYXQpIHtcclxuICAgIHJldHVybiBzdHJpbmcuc3Vic3RpdHV0ZSh0aGVGb3JtYXQsIFt0aGlzLm9wdGlvbnMuZW50aXR5TmFtZV0pO1xyXG4gIH0sXHJcbiAgY3JlYXRlTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXlvdXQgfHwgKHRoaXMubGF5b3V0ID0gW3tcclxuICAgICAgbmFtZTogJ0VudGl0eUlkJyxcclxuICAgICAgcHJvcGVydHk6ICdFbnRpdHlJZCcsXHJcbiAgICAgIHR5cGU6ICdoaWRkZW4nLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5kZXNjcmlwdGlvblRleHQsXHJcbiAgICAgIG5hbWU6ICdEZXNjcmlwdGlvbicsXHJcbiAgICAgIHByb3BlcnR5OiAnRGVzY3JpcHRpb24nLFxyXG4gICAgICBwaWNrbGlzdDogdGhpcy5mb3JtYXREZXBlbmRlbnRQaWNrbGlzdC5iaW5kRGVsZWdhdGUoXHJcbiAgICAgICAgdGhpcywgJ0FkZHJlc3MgRGVzY3JpcHRpb24gKCR7MH0pJywgdHJ1ZVxyXG4gICAgICApLFxyXG4gICAgICByZXF1aXJlU2VsZWN0aW9uOiBmYWxzZSxcclxuICAgICAgdGl0bGU6IHRoaXMuZGVzY3JpcHRpb25UaXRsZVRleHQsXHJcbiAgICAgIHR5cGU6ICdwaWNrbGlzdCcsXHJcbiAgICAgIG1heFRleHRMZW5ndGg6IDY0LFxyXG4gICAgICB2YWxpZGF0b3I6IFtcclxuICAgICAgICB2YWxpZGF0b3IuZXhpc3RzLFxyXG4gICAgICAgIHZhbGlkYXRvci5leGNlZWRzTWF4VGV4dExlbmd0aCxcclxuICAgICAgXSxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ0lzUHJpbWFyeScsXHJcbiAgICAgIHByb3BlcnR5OiAnSXNQcmltYXJ5JyxcclxuICAgICAgbGFiZWw6IHRoaXMuaXNQcmltYXJ5VGV4dCxcclxuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnSXNNYWlsaW5nJyxcclxuICAgICAgcHJvcGVydHk6ICdJc01haWxpbmcnLFxyXG4gICAgICBsYWJlbDogdGhpcy5pc01haWxpbmdUZXh0LFxyXG4gICAgICB0eXBlOiAnYm9vbGVhbicsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdBZGRyZXNzMScsXHJcbiAgICAgIHByb3BlcnR5OiAnQWRkcmVzczEnLFxyXG4gICAgICBsYWJlbDogdGhpcy5hZGRyZXNzMVRleHQsXHJcbiAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgbWF4VGV4dExlbmd0aDogNjQsXHJcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmV4Y2VlZHNNYXhUZXh0TGVuZ3RoLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnQWRkcmVzczInLFxyXG4gICAgICBwcm9wZXJ0eTogJ0FkZHJlc3MyJyxcclxuICAgICAgbGFiZWw6IHRoaXMuYWRkcmVzczJUZXh0LFxyXG4gICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgIG1heFRleHRMZW5ndGg6IDY0LFxyXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGNlZWRzTWF4VGV4dExlbmd0aCxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ0FkZHJlc3MzJyxcclxuICAgICAgcHJvcGVydHk6ICdBZGRyZXNzMycsXHJcbiAgICAgIGxhYmVsOiB0aGlzLmFkZHJlc3MzVGV4dCxcclxuICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICBtYXhUZXh0TGVuZ3RoOiA2NCxcclxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhjZWVkc01heFRleHRMZW5ndGgsXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLmNpdHlUZXh0LFxyXG4gICAgICBuYW1lOiAnQ2l0eScsXHJcbiAgICAgIHByb3BlcnR5OiAnQ2l0eScsXHJcbiAgICAgIHBpY2tsaXN0OiAnQ2l0eScsXHJcbiAgICAgIHJlcXVpcmVTZWxlY3Rpb246IGZhbHNlLFxyXG4gICAgICB0aXRsZTogdGhpcy5jaXR5VGl0bGVUZXh0LFxyXG4gICAgICB0eXBlOiAncGlja2xpc3QnLFxyXG4gICAgICBtYXhUZXh0TGVuZ3RoOiAzMixcclxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhjZWVkc01heFRleHRMZW5ndGgsXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLnN0YXRlVGV4dCxcclxuICAgICAgbmFtZTogJ1N0YXRlJyxcclxuICAgICAgcHJvcGVydHk6ICdTdGF0ZScsXHJcbiAgICAgIHBpY2tsaXN0OiAnU3RhdGUnLFxyXG4gICAgICByZXF1aXJlU2VsZWN0aW9uOiBmYWxzZSxcclxuICAgICAgdGl0bGU6IHRoaXMuc3RhdGVUaXRsZVRleHQsXHJcbiAgICAgIHR5cGU6ICdwaWNrbGlzdCcsXHJcbiAgICAgIG1heFRleHRMZW5ndGg6IDMyLFxyXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGNlZWRzTWF4VGV4dExlbmd0aCxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ1Bvc3RhbENvZGUnLFxyXG4gICAgICBwcm9wZXJ0eTogJ1Bvc3RhbENvZGUnLFxyXG4gICAgICBsYWJlbDogdGhpcy5wb3N0YWxDb2RlVGV4dCxcclxuICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICBtYXhUZXh0TGVuZ3RoOiAyNCxcclxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhjZWVkc01heFRleHRMZW5ndGgsXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLmNvdW50cnlUZXh0LFxyXG4gICAgICBuYW1lOiAnQ291bnRyeScsXHJcbiAgICAgIHByb3BlcnR5OiAnQ291bnRyeScsXHJcbiAgICAgIHBpY2tsaXN0OiAnQ291bnRyeScsXHJcbiAgICAgIHJlcXVpcmVTZWxlY3Rpb246IGZhbHNlLFxyXG4gICAgICB0aXRsZTogdGhpcy5jb3VudHJ5VGl0bGVUZXh0LFxyXG4gICAgICB0eXBlOiAncGlja2xpc3QnLFxyXG4gICAgICBtYXhUZXh0TGVuZ3RoOiA2NCxcclxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhjZWVkc01heFRleHRMZW5ndGgsXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLnNhbHV0YXRpb25UZXh0LFxyXG4gICAgICBuYW1lOiAnU2FsdXRhdGlvbicsXHJcbiAgICAgIHByb3BlcnR5OiAnU2FsdXRhdGlvbicsXHJcbiAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgbWF4VGV4dExlbmd0aDogNjQsXHJcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmV4Y2VlZHNNYXhUZXh0TGVuZ3RoLFxyXG4gICAgfV0pO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19