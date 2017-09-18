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

import declare from 'dojo/_base/declare';
import string from 'dojo/string';
import format from '../../Format';
import validator from '../../Validator';
import Edit from 'argos/Edit';
import getResource from 'argos/I18n';

const resource = getResource('addressEdit');

/**
 * @class crm.Views.Address.Edit
 * @extends argos.Edit
 *
 */
const __class = declare('crm.Views.Address.Edit', [Edit], /** @lends crm.Views.Address.Edit# */{
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
    'ru-RU': ['State'],
  },

  // View Properties
  id: 'address_edit',

  init: function init() {
    this.inherited(arguments);
    this.connect(this.fields.Country, 'onChange', this.onCountryChange);
  },
  onCountryChange: function onCountryChange(value) {
    const locale = format.countryCultures[value] || 'en-US';
    this.hideFieldsForLocale(locale);
  },
  /**
   * Hides from view the field names defined in localeFieldHidden for the given locale
   * Doing so enables a user to enter an address
   * @param locale Localization string (Ex: 'en-US' or 'de-DE')
   */
  hideFieldsForLocale: function hideFieldsForLocale(locale) {
    const fieldsToHide = this.localeFieldHidden[locale];
    if (!fieldsToHide) {
      return;
    }

    for (let i = 0; i < fieldsToHide.length; i++) {
      const field = this.fields[fieldsToHide[i]];
      if (field) {
        field.hide();
      }
    }
  },
  formatDependentPicklist: function formatDependentPicklist(theFormat) {
    return string.substitute(theFormat, [this.options.entityName]);
  },
  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      name: 'EntityId',
      property: 'EntityId',
      type: 'hidden',
    }, {
      label: this.descriptionText,
      name: 'Description',
      property: 'Description',
      picklist: this.formatDependentPicklist.bindDelegate(
        this, 'Address Description (${0})', true
      ),
      requireSelection: false,
      title: this.descriptionTitleText,
      type: 'picklist',
      maxTextLength: 64,
      validator: [
        validator.exists,
        validator.exceedsMaxTextLength,
      ],
    }, {
      name: 'IsPrimary',
      property: 'IsPrimary',
      label: this.isPrimaryText,
      type: 'boolean',
    }, {
      name: 'IsMailing',
      property: 'IsMailing',
      label: this.isMailingText,
      type: 'boolean',
    }, {
      name: 'Address1',
      property: 'Address1',
      label: this.address1Text,
      type: 'text',
      maxTextLength: 64,
      validator: validator.exceedsMaxTextLength,
    }, {
      name: 'Address2',
      property: 'Address2',
      label: this.address2Text,
      type: 'text',
      maxTextLength: 64,
      validator: validator.exceedsMaxTextLength,
    }, {
      name: 'Address3',
      property: 'Address3',
      label: this.address3Text,
      type: 'text',
      maxTextLength: 64,
      validator: validator.exceedsMaxTextLength,
    }, {
      label: this.cityText,
      name: 'City',
      property: 'City',
      picklist: 'City',
      requireSelection: false,
      title: this.cityTitleText,
      type: 'picklist',
      maxTextLength: 32,
      validator: validator.exceedsMaxTextLength,
    }, {
      label: this.stateText,
      name: 'State',
      property: 'State',
      picklist: 'State',
      requireSelection: false,
      title: this.stateTitleText,
      type: 'picklist',
      maxTextLength: 32,
      validator: validator.exceedsMaxTextLength,
    }, {
      name: 'PostalCode',
      property: 'PostalCode',
      label: this.postalCodeText,
      type: 'text',
      maxTextLength: 24,
      validator: validator.exceedsMaxTextLength,
    }, {
      label: this.countryText,
      name: 'Country',
      property: 'Country',
      picklist: 'Country',
      requireSelection: false,
      title: this.countryTitleText,
      type: 'picklist',
      maxTextLength: 64,
      validator: validator.exceedsMaxTextLength,
    }, {
      label: this.salutationText,
      name: 'Salutation',
      property: 'Salutation',
      type: 'text',
      maxTextLength: 64,
      validator: validator.exceedsMaxTextLength,
    }]);
  },
});

export default __class;
