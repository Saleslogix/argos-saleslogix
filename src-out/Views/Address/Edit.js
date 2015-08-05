define('crm/Views/Address/Edit', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', '../../Format', '../../Validator', 'argos/Edit'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _Format, _Validator, _argosEdit) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _string = _interopRequireDefault(_dojoString);

  var _format = _interopRequireDefault(_Format);

  var _validator = _interopRequireDefault(_Validator);

  var _Edit = _interopRequireDefault(_argosEdit);

  /**
   * @class crm.Views.Address.Edit
   *
   * @extends argos.Edit
   *
   * @requires argos.Edit
   *
   * @requires crm.Format
   * @requires crm.Validator
   *
   */
  var __class = (0, _declare['default'])('crm.Views.Address.Edit', [_Edit['default']], {
    //Localization
    address1Text: 'address 1',
    address2Text: 'address 2',
    address3Text: 'address 3',
    cityText: 'city',
    cityTitleText: 'City',
    countryText: 'country',
    countryTitleText: 'Country',
    descriptionText: 'description',
    descriptionTitleText: 'Description',
    isMailingText: 'shipping',
    isPrimaryText: 'primary',
    postalCodeText: 'postal',
    salutationText: 'attention',
    stateText: 'state',
    stateTitleText: 'State',
    titleText: 'Address',
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

    //View Properties
    id: 'address_edit',

    init: function init() {
      this.inherited(arguments);
      this.connect(this.fields['Country'], 'onChange', this.onCountryChange);
    },
    onCountryChange: function onCountryChange(value) {
      var locale = _format['default'].countryCultures[value] || 'en-US';
      this.hideFieldsForLocale(locale);
    },
    /**
     * Hides from view the field names defined in localeFieldHidden for the given locale
     * Doing so enables a user to enter an address
     * @param locale Localization string (Ex: 'en-US' or 'de-DE')
     */
    hideFieldsForLocale: function hideFieldsForLocale(locale) {
      var fieldsToHide, i, field;

      fieldsToHide = this.localeFieldHidden[locale];
      if (!fieldsToHide) {
        return;
      }

      for (i = 0; i < fieldsToHide.length; i++) {
        field = this.fields[fieldsToHide[i]];
        if (field) {
          field.hide();
        }
      }
    },
    formatDependentPicklist: function formatDependentPicklist(format) {
      return _string['default'].substitute(format, [this.options.entityName]);
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
        validator: [_validator['default'].exists, _validator['default'].exceedsMaxTextLength]
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
        validator: _validator['default'].exceedsMaxTextLength
      }, {
        name: 'Address2',
        property: 'Address2',
        label: this.address2Text,
        type: 'text',
        maxTextLength: 64,
        validator: _validator['default'].exceedsMaxTextLength
      }, {
        name: 'Address3',
        property: 'Address3',
        label: this.address3Text,
        type: 'text',
        maxTextLength: 64,
        validator: _validator['default'].exceedsMaxTextLength
      }, {
        label: this.cityText,
        name: 'City',
        property: 'City',
        picklist: 'City',
        requireSelection: false,
        title: this.cityTitleText,
        type: 'picklist',
        maxTextLength: 32,
        validator: _validator['default'].exceedsMaxTextLength
      }, {
        label: this.stateText,
        name: 'State',
        property: 'State',
        picklist: 'State',
        requireSelection: false,
        title: this.stateTitleText,
        type: 'picklist',
        maxTextLength: 32,
        validator: _validator['default'].exceedsMaxTextLength
      }, {
        name: 'PostalCode',
        property: 'PostalCode',
        label: this.postalCodeText,
        type: 'text',
        maxTextLength: 24,
        validator: _validator['default'].exceedsMaxTextLength
      }, {
        label: this.countryText,
        name: 'Country',
        property: 'Country',
        picklist: 'Country',
        requireSelection: false,
        title: this.countryTitleText,
        type: 'picklist',
        maxTextLength: 64,
        validator: _validator['default'].exceedsMaxTextLength
      }, {
        label: this.salutationText,
        name: 'Salutation',
        property: 'Salutation',
        type: 'text',
        maxTextLength: 64,
        validator: _validator['default'].exceedsMaxTextLength
      }]);
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.Address.Edit', __class);
  module.exports = __class;
});
