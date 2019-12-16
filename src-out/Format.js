define('crm/Format', ['module', 'exports', 'dojo/_base/lang', 'dojo/number', 'dojo/string', 'argos/Format', 'argos/I18n'], function (module, exports, _lang, _number, _string, _Format, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _lang2 = _interopRequireDefault(_lang);

  var _number2 = _interopRequireDefault(_number);

  var _string2 = _interopRequireDefault(_string);

  var _Format2 = _interopRequireDefault(_Format);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var f = ICRMCommonSDK.format; /* Copyright 2017 Infor
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

  var resource = (0, _I18n2.default)('crmFormat');

  /**
   * @class crm.Format
   * @extends argos.Format
   * @singleton
   */
  var __class = _lang2.default.setObject('crm.Format', _lang2.default.mixin({}, _Format2.default, /** @lends crm.Format */{
    /**
     * Address Culture Formats as defined by crm.Format.address
     * http://msdn.microsoft.com/en-us/library/cc195167.aspx
     */
    addressCultureFormats: f.addressCultureFormats,
    /**
     * Country name to culture identification
     * http://msdn.microsoft.com/en-us/goglobal/bb896001.aspx
     */
    countryCultures: f.countryCultures,
    addressItems: f.addressItems,
    /**
    Converts the given value using the provided format, joining with the separator character
    If no format given, will use predefined format for the addresses Country (or en-US as final fallback)
    <pre>
    Format    Description                                    Example
    ------    -----------------------------------------    -----------------------
     s         Salutation (Attention, Name)                ATTN: Mr. Bob
     S         Salutation Uppercase                        ATTN: MR. BOB
     a1        Address Line 1                              555 Oak Ave
     a2        Address Line 2                                #2038
     a3        Address Line 3
     m        Municipality (City, town, hamlet)            Phoenix
     M        Municipality Uppercase                        PHOENIX
     z        County (parish, providence)                    Maricopa
     Z         County Uppercase                            MARICOPA
     r        Region (State, area)                        AZ
     R        Region Uppercase                            AZ
     p         Postal Code (ZIP code)                        85021
     P         Postal Code Uppercase                        85021
     c         Country                                     France
     C         Country Uppercase                            FRANCE
       |        separator                                    as defined by separator variable
     </pre>
     @param {object} addr Address Entity containing all the SData properties
     @param {boolean} asText If set to true returns text only, if false returns anchor link to google maps
     @param {string|boolean} separator If false - separates with html <br>,
                          if true - separates with line return,
                          if defined as string - uses string to separate
     @param {string} fmt Address format to use, may also pass a culture string to use predefined format
     @return {string} Formatted address
    */
    address: f.address,
    collapseSpace: f.collapseSpace,
    resolveAddressCulture: f.resolveAddressCulture,
    replaceAddressPart: f.replaceAddressPart,
    // These were added to the SDK, and should not be here. Keeping the alias to not break anyone with a minor update.
    phoneFormat: f.phoneFormat,
    phone: f.phone,
    picklist: function picklist(service, // Picklist service reference
    model, // Reference to the entity's model for call getPicklistNameByProperty
    property, // Property to reference for fetching the picklist off the model
    picklistName) {
      var languageCode = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : App.getCurrentLocale();
      var picklistOptions = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : { // Override for picklistOptions on storage and display modes
        storage: f.PicklistStorageType.CODE,
        display: f.PicklistDataDisplayType.TEXT
      };

      var name = picklistName;
      if (!name) {
        if (!service || !model || !property) {
          return function (val) {
            return val;
          };
        }
        name = model.getPicklistNameByProperty(property);
      }
      var picklist = service.getPicklistByName(name, languageCode);

      return function (val) {
        return f.picklist(val, Object.assign({}, picklistOptions, picklist));
      };
    },
    PicklistDataDisplayType: f.PicklistDataDisplayType,
    PicklistStorageType: f.PicklistStorageType,
    currency: function currency(_val) {
      return f.currency(_val, Mobile.CultureInfo.numberFormat.currencyDecimalSeparator, Mobile.CultureInfo.numberFormat.currencyGroupSeparator);
    },
    bigNumber: function bigNumber(val) {
      var numParse = typeof val !== 'number' ? parseFloat(val) : val;
      var absVal = Math.abs(numParse);

      if (isNaN(numParse)) {
        return val;
      }

      var results = numParse.toString();
      if (absVal >= 1000000000) {
        // Billion
        numParse = numParse / 1000000000;
        results = _string2.default.substitute(resource.billionText, {
          val: _number2.default.format(numParse, { places: 1 })
        });
      } else if (absVal >= 1000000) {
        numParse = numParse / 1000000;
        results = _string2.default.substitute(resource.millionText, {
          val: _number2.default.format(numParse, { places: 1 })
        });
      } else if (absVal >= 1000) {
        numParse = numParse / 1000;
        results = _string2.default.substitute(resource.thousandText, {
          val: _number2.default.format(numParse, { places: 1 })
        });
      } else {
        results = _number2.default.round(numParse, 2).toString();
      }

      return results;
    },
    relativeDate: function relativeDate(date, timeless) {
      var val = f.date(date, timeless);
      return moment(val).fromNow();
    },
    multiCurrency: function multiCurrency(_val, code) {
      return f.multiCurrency(_val, code, Mobile.CultureInfo.numberFormat.currencyDecimalSeparator, Mobile.CultureInfo.numberFormat.currencyGroupSeparator);
    },
    nameLF: f.nameLF,
    mail: f.mail,
    // TODO: L20n
    userActivityFormatText: {
      asUnconfirmed: 'Unconfirmed',
      asAccepted: 'Accepted',
      asDeclned: 'Declined'
    },
    // TODO: Move
    userActivityStatus: function userActivityStatus(val) {
      return crm.Format.userActivityFormatText[val];
    },
    /**
     * Takes a string input and converts name to First amd Last initials
     * `Lee Hogan` -> `LH`
     * @param val
     * @returns {String}
     */
    formatUserInitial: f.formatUserInitial,
    /**
     * Takes a string input and the user name to First amd Last name
     * `Hogan, Lee` -> `Lee Hogan`
     * @param val
     * @returns {String}
     */
    formatByUser: f.formatByUser,
    /**
     * Takes a string input and the user name to First amd Last name
     * `Hogan, Lee` -> `Lee Hogan`
     * @param val
     * @returns {String}
     */
    resolveFirstLast: f.resolveFirstLast,
    fixedLocale: function fixedLocale(val, d) {
      return f.fixedLocale(val, d, Mobile.CultureInfo.numberFormat.numberGroupSeparator, Mobile.CultureInfo.numberFormat.numberDecimalSeparator);
    },
    time: function time(rawValue) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'days';

      var val = rawValue;

      if (typeof rawValue !== 'number') {
        val = parseFloat(rawValue);
      }

      var numParse = crm.Format.fixedLocale(val, 2);
      switch (type) {// eslint-disable-line
        case 'days':
          return _string2.default.substitute(resource.daysText, {
            val: numParse
          });
        case 'weeks':
          return _string2.default.substitute(resource.weeksText, {
            val: numParse
          });
        case 'months':
          return _string2.default.substitute(resource.monthsText, {
            val: numParse
          });
        case 'years':
          return _string2.default.substitute(resource.yearsText, {
            val: numParse
          });
      }
      return rawValue;
    }
  }));

  exports.default = __class;
  module.exports = exports['default'];
});