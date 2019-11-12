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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Gb3JtYXQuanMiXSwibmFtZXMiOlsiZiIsIklDUk1Db21tb25TREsiLCJmb3JtYXQiLCJyZXNvdXJjZSIsIl9fY2xhc3MiLCJzZXRPYmplY3QiLCJtaXhpbiIsImFkZHJlc3NDdWx0dXJlRm9ybWF0cyIsImNvdW50cnlDdWx0dXJlcyIsImFkZHJlc3NJdGVtcyIsImFkZHJlc3MiLCJjb2xsYXBzZVNwYWNlIiwicmVzb2x2ZUFkZHJlc3NDdWx0dXJlIiwicmVwbGFjZUFkZHJlc3NQYXJ0IiwicGhvbmVGb3JtYXQiLCJwaG9uZSIsInBpY2tsaXN0Iiwic2VydmljZSIsIm1vZGVsIiwicHJvcGVydHkiLCJwaWNrbGlzdE5hbWUiLCJsYW5ndWFnZUNvZGUiLCJBcHAiLCJnZXRDdXJyZW50TG9jYWxlIiwicGlja2xpc3RPcHRpb25zIiwic3RvcmFnZSIsIlBpY2tsaXN0U3RvcmFnZVR5cGUiLCJDT0RFIiwiZGlzcGxheSIsIlBpY2tsaXN0RGF0YURpc3BsYXlUeXBlIiwiVEVYVCIsIm5hbWUiLCJ2YWwiLCJnZXRQaWNrbGlzdE5hbWVCeVByb3BlcnR5IiwiZ2V0UGlja2xpc3RCeU5hbWUiLCJPYmplY3QiLCJhc3NpZ24iLCJjdXJyZW5jeSIsIl92YWwiLCJNb2JpbGUiLCJDdWx0dXJlSW5mbyIsIm51bWJlckZvcm1hdCIsImN1cnJlbmN5RGVjaW1hbFNlcGFyYXRvciIsImN1cnJlbmN5R3JvdXBTZXBhcmF0b3IiLCJiaWdOdW1iZXIiLCJudW1QYXJzZSIsInBhcnNlRmxvYXQiLCJhYnNWYWwiLCJNYXRoIiwiYWJzIiwiaXNOYU4iLCJyZXN1bHRzIiwidG9TdHJpbmciLCJzdWJzdGl0dXRlIiwiYmlsbGlvblRleHQiLCJwbGFjZXMiLCJtaWxsaW9uVGV4dCIsInRob3VzYW5kVGV4dCIsInJvdW5kIiwicmVsYXRpdmVEYXRlIiwiZGF0ZSIsInRpbWVsZXNzIiwibW9tZW50IiwiZnJvbU5vdyIsIm11bHRpQ3VycmVuY3kiLCJjb2RlIiwibmFtZUxGIiwibWFpbCIsInVzZXJBY3Rpdml0eUZvcm1hdFRleHQiLCJhc1VuY29uZmlybWVkIiwiYXNBY2NlcHRlZCIsImFzRGVjbG5lZCIsInVzZXJBY3Rpdml0eVN0YXR1cyIsImNybSIsIkZvcm1hdCIsImZvcm1hdFVzZXJJbml0aWFsIiwiZm9ybWF0QnlVc2VyIiwicmVzb2x2ZUZpcnN0TGFzdCIsImZpeGVkTG9jYWxlIiwiZCIsIm51bWJlckdyb3VwU2VwYXJhdG9yIiwibnVtYmVyRGVjaW1hbFNlcGFyYXRvciIsInRpbWUiLCJyYXdWYWx1ZSIsInR5cGUiLCJkYXlzVGV4dCIsIndlZWtzVGV4dCIsIm1vbnRoc1RleHQiLCJ5ZWFyc1RleHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCQSxNQUFNQSxJQUFJQyxjQUFjQyxNQUF4QixDLENBckJBOzs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsTUFBTUMsV0FBVyxvQkFBWSxXQUFaLENBQWpCOztBQUVBOzs7OztBQUtBLE1BQU1DLFVBQVUsZUFBS0MsU0FBTCxDQUFlLFlBQWYsRUFBNkIsZUFBS0MsS0FBTCxDQUFXLEVBQVgsb0JBQXVCLHdCQUF3QjtBQUMxRjs7OztBQUlBQywyQkFBdUJQLEVBQUVPLHFCQUxpRTtBQU0xRjs7OztBQUlBQyxxQkFBaUJSLEVBQUVRLGVBVnVFO0FBVzFGQyxrQkFBY1QsRUFBRVMsWUFYMEU7QUFZMUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQ0FDLGFBQVNWLEVBQUVVLE9BNUMrRTtBQTZDMUZDLG1CQUFlWCxFQUFFVyxhQTdDeUU7QUE4QzFGQywyQkFBdUJaLEVBQUVZLHFCQTlDaUU7QUErQzFGQyx3QkFBb0JiLEVBQUVhLGtCQS9Db0U7QUFnRDFGO0FBQ0FDLGlCQUFhZCxFQUFFYyxXQWpEMkU7QUFrRDFGQyxXQUFPZixFQUFFZSxLQWxEaUY7QUFtRDFGQyxjQUFVLGtCQUNSQyxPQURRLEVBQ0M7QUFDVEMsU0FGUSxFQUVEO0FBQ1BDLFlBSFEsRUFHRTtBQUNWQyxnQkFKUSxFQVVMO0FBQUEsVUFMSEMsWUFLRyx1RUFMWUMsSUFBSUMsZ0JBQUosRUFLWjtBQUFBLFVBSkhDLGVBSUcsdUVBSmUsRUFBRTtBQUNsQkMsaUJBQVN6QixFQUFFMEIsbUJBQUYsQ0FBc0JDLElBRGY7QUFFaEJDLGlCQUFTNUIsRUFBRTZCLHVCQUFGLENBQTBCQztBQUZuQixPQUlmOztBQUNILFVBQUlDLE9BQU9YLFlBQVg7QUFDQSxVQUFJLENBQUNXLElBQUwsRUFBVztBQUNULFlBQUksQ0FBQ2QsT0FBRCxJQUFZLENBQUNDLEtBQWIsSUFBc0IsQ0FBQ0MsUUFBM0IsRUFBcUM7QUFDbkMsaUJBQU87QUFBQSxtQkFBT2EsR0FBUDtBQUFBLFdBQVA7QUFDRDtBQUNERCxlQUFPYixNQUFNZSx5QkFBTixDQUFnQ2QsUUFBaEMsQ0FBUDtBQUNEO0FBQ0QsVUFBTUgsV0FBV0MsUUFBUWlCLGlCQUFSLENBQTBCSCxJQUExQixFQUFnQ1YsWUFBaEMsQ0FBakI7O0FBRUEsYUFBTyxVQUFDVyxHQUFELEVBQVM7QUFDZCxlQUFPaEMsRUFBRWdCLFFBQUYsQ0FBV2dCLEdBQVgsRUFBZ0JHLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCWixlQUFsQixFQUFtQ1IsUUFBbkMsQ0FBaEIsQ0FBUDtBQUNELE9BRkQ7QUFHRCxLQTFFeUY7QUEyRTFGYSw2QkFBeUI3QixFQUFFNkIsdUJBM0UrRDtBQTRFMUZILHlCQUFxQjFCLEVBQUUwQixtQkE1RW1FO0FBNkUxRlcsY0FBVSxTQUFTQSxRQUFULENBQWtCQyxJQUFsQixFQUF3QjtBQUNoQyxhQUFPdEMsRUFBRXFDLFFBQUYsQ0FBV0MsSUFBWCxFQUFpQkMsT0FBT0MsV0FBUCxDQUFtQkMsWUFBbkIsQ0FBZ0NDLHdCQUFqRCxFQUNMSCxPQUFPQyxXQUFQLENBQW1CQyxZQUFuQixDQUFnQ0Usc0JBRDNCLENBQVA7QUFFRCxLQWhGeUY7QUFpRjFGQyxlQUFXLFNBQVNBLFNBQVQsQ0FBbUJaLEdBQW5CLEVBQXdCO0FBQ2pDLFVBQUlhLFdBQVcsT0FBT2IsR0FBUCxLQUFlLFFBQWYsR0FBMEJjLFdBQVdkLEdBQVgsQ0FBMUIsR0FBNENBLEdBQTNEO0FBQ0EsVUFBTWUsU0FBU0MsS0FBS0MsR0FBTCxDQUFTSixRQUFULENBQWY7O0FBRUEsVUFBSUssTUFBTUwsUUFBTixDQUFKLEVBQXFCO0FBQ25CLGVBQU9iLEdBQVA7QUFDRDs7QUFFRCxVQUFJbUIsVUFBVU4sU0FBU08sUUFBVCxFQUFkO0FBQ0EsVUFBSUwsVUFBVSxVQUFkLEVBQTBCO0FBQ3hCO0FBQ0FGLG1CQUFXQSxXQUFXLFVBQXRCO0FBQ0FNLGtCQUFVLGlCQUFPRSxVQUFQLENBQWtCbEQsU0FBU21ELFdBQTNCLEVBQXdDO0FBQ2hEdEIsZUFBSyxpQkFBVzlCLE1BQVgsQ0FBa0IyQyxRQUFsQixFQUE0QixFQUFFVSxRQUFRLENBQVYsRUFBNUI7QUFEMkMsU0FBeEMsQ0FBVjtBQUdELE9BTkQsTUFNTyxJQUFJUixVQUFVLE9BQWQsRUFBdUI7QUFDNUJGLG1CQUFXQSxXQUFXLE9BQXRCO0FBQ0FNLGtCQUFVLGlCQUFPRSxVQUFQLENBQWtCbEQsU0FBU3FELFdBQTNCLEVBQXdDO0FBQ2hEeEIsZUFBSyxpQkFBVzlCLE1BQVgsQ0FBa0IyQyxRQUFsQixFQUE0QixFQUFFVSxRQUFRLENBQVYsRUFBNUI7QUFEMkMsU0FBeEMsQ0FBVjtBQUdELE9BTE0sTUFLQSxJQUFJUixVQUFVLElBQWQsRUFBb0I7QUFDekJGLG1CQUFXQSxXQUFXLElBQXRCO0FBQ0FNLGtCQUFVLGlCQUFPRSxVQUFQLENBQWtCbEQsU0FBU3NELFlBQTNCLEVBQXlDO0FBQ2pEekIsZUFBSyxpQkFBVzlCLE1BQVgsQ0FBa0IyQyxRQUFsQixFQUE0QixFQUFFVSxRQUFRLENBQVYsRUFBNUI7QUFENEMsU0FBekMsQ0FBVjtBQUdELE9BTE0sTUFLQTtBQUNMSixrQkFBVSxpQkFBV08sS0FBWCxDQUFpQmIsUUFBakIsRUFBMkIsQ0FBM0IsRUFBOEJPLFFBQTlCLEVBQVY7QUFDRDs7QUFFRCxhQUFPRCxPQUFQO0FBQ0QsS0EvR3lGO0FBZ0gxRlEsa0JBQWMsU0FBU0EsWUFBVCxDQUFzQkMsSUFBdEIsRUFBNEJDLFFBQTVCLEVBQXNDO0FBQ2xELFVBQU03QixNQUFNaEMsRUFBRTRELElBQUYsQ0FBT0EsSUFBUCxFQUFhQyxRQUFiLENBQVo7QUFDQSxhQUFPQyxPQUFPOUIsR0FBUCxFQUFZK0IsT0FBWixFQUFQO0FBQ0QsS0FuSHlGO0FBb0gxRkMsbUJBQWUsU0FBU0EsYUFBVCxDQUF1QjFCLElBQXZCLEVBQTZCMkIsSUFBN0IsRUFBbUM7QUFDaEQsYUFBT2pFLEVBQUVnRSxhQUFGLENBQWdCMUIsSUFBaEIsRUFBc0IyQixJQUF0QixFQUE0QjFCLE9BQU9DLFdBQVAsQ0FBbUJDLFlBQW5CLENBQWdDQyx3QkFBNUQsRUFDTEgsT0FBT0MsV0FBUCxDQUFtQkMsWUFBbkIsQ0FBZ0NFLHNCQUQzQixDQUFQO0FBRUQsS0F2SHlGO0FBd0gxRnVCLFlBQVFsRSxFQUFFa0UsTUF4SGdGO0FBeUgxRkMsVUFBTW5FLEVBQUVtRSxJQXpIa0Y7QUEwSDFGO0FBQ0FDLDRCQUF3QjtBQUN0QkMscUJBQWUsYUFETztBQUV0QkMsa0JBQVksVUFGVTtBQUd0QkMsaUJBQVc7QUFIVyxLQTNIa0U7QUFnSTFGO0FBQ0FDLHdCQUFvQixTQUFTQSxrQkFBVCxDQUE0QnhDLEdBQTVCLEVBQWlDO0FBQ25ELGFBQU95QyxJQUFJQyxNQUFKLENBQVdOLHNCQUFYLENBQWtDcEMsR0FBbEMsQ0FBUDtBQUNELEtBbkl5RjtBQW9JMUY7Ozs7OztBQU1BMkMsdUJBQW1CM0UsRUFBRTJFLGlCQTFJcUU7QUEySTFGOzs7Ozs7QUFNQUMsa0JBQWM1RSxFQUFFNEUsWUFqSjBFO0FBa0oxRjs7Ozs7O0FBTUFDLHNCQUFrQjdFLEVBQUU2RSxnQkF4SnNFO0FBeUoxRkMsaUJBQWEsU0FBU0EsV0FBVCxDQUFxQjlDLEdBQXJCLEVBQTBCK0MsQ0FBMUIsRUFBNkI7QUFDeEMsYUFBTy9FLEVBQUU4RSxXQUFGLENBQWM5QyxHQUFkLEVBQW1CK0MsQ0FBbkIsRUFBc0J4QyxPQUFPQyxXQUFQLENBQW1CQyxZQUFuQixDQUFnQ3VDLG9CQUF0RCxFQUNMekMsT0FBT0MsV0FBUCxDQUFtQkMsWUFBbkIsQ0FBZ0N3QyxzQkFEM0IsQ0FBUDtBQUVELEtBNUp5RjtBQTZKMUZDLFVBQU0sU0FBU0EsSUFBVCxDQUFjQyxRQUFkLEVBQXVDO0FBQUEsVUFBZkMsSUFBZSx1RUFBUixNQUFROztBQUMzQyxVQUFJcEQsTUFBTW1ELFFBQVY7O0FBRUEsVUFBSSxPQUFPQSxRQUFQLEtBQW9CLFFBQXhCLEVBQWtDO0FBQ2hDbkQsY0FBTWMsV0FBV3FDLFFBQVgsQ0FBTjtBQUNEOztBQUVELFVBQU10QyxXQUFXNEIsSUFBSUMsTUFBSixDQUFXSSxXQUFYLENBQXVCOUMsR0FBdkIsRUFBNEIsQ0FBNUIsQ0FBakI7QUFDQSxjQUFRb0QsSUFBUixHQUFnQjtBQUNkLGFBQUssTUFBTDtBQUNFLGlCQUFPLGlCQUFPL0IsVUFBUCxDQUFrQmxELFNBQVNrRixRQUEzQixFQUFxQztBQUMxQ3JELGlCQUFLYTtBQURxQyxXQUFyQyxDQUFQO0FBR0YsYUFBSyxPQUFMO0FBQ0UsaUJBQU8saUJBQU9RLFVBQVAsQ0FBa0JsRCxTQUFTbUYsU0FBM0IsRUFBc0M7QUFDM0N0RCxpQkFBS2E7QUFEc0MsV0FBdEMsQ0FBUDtBQUdGLGFBQUssUUFBTDtBQUNFLGlCQUFPLGlCQUFPUSxVQUFQLENBQWtCbEQsU0FBU29GLFVBQTNCLEVBQXVDO0FBQzVDdkQsaUJBQUthO0FBRHVDLFdBQXZDLENBQVA7QUFHRixhQUFLLE9BQUw7QUFDRSxpQkFBTyxpQkFBT1EsVUFBUCxDQUFrQmxELFNBQVNxRixTQUEzQixFQUFzQztBQUMzQ3hELGlCQUFLYTtBQURzQyxXQUF0QyxDQUFQO0FBZEo7QUFrQkEsYUFBT3NDLFFBQVA7QUFDRDtBQXhMeUYsR0FBL0MsQ0FBN0IsQ0FBaEI7O29CQTJMZS9FLE8iLCJmaWxlIjoiRm9ybWF0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IGRvam9OdW1iZXIgZnJvbSAnZG9qby9udW1iZXInO1xyXG5pbXBvcnQgc3RyaW5nIGZyb20gJ2Rvam8vc3RyaW5nJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICdhcmdvcy9Gb3JtYXQnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCBmID0gSUNSTUNvbW1vblNESy5mb3JtYXQ7XHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2NybUZvcm1hdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uRm9ybWF0XHJcbiAqIEBleHRlbmRzIGFyZ29zLkZvcm1hdFxyXG4gKiBAc2luZ2xldG9uXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gbGFuZy5zZXRPYmplY3QoJ2NybS5Gb3JtYXQnLCBsYW5nLm1peGluKHt9LCBmb3JtYXQsIC8qKiBAbGVuZHMgY3JtLkZvcm1hdCAqL3tcclxuICAvKipcclxuICAgKiBBZGRyZXNzIEN1bHR1cmUgRm9ybWF0cyBhcyBkZWZpbmVkIGJ5IGNybS5Gb3JtYXQuYWRkcmVzc1xyXG4gICAqIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9jYzE5NTE2Ny5hc3B4XHJcbiAgICovXHJcbiAgYWRkcmVzc0N1bHR1cmVGb3JtYXRzOiBmLmFkZHJlc3NDdWx0dXJlRm9ybWF0cyxcclxuICAvKipcclxuICAgKiBDb3VudHJ5IG5hbWUgdG8gY3VsdHVyZSBpZGVudGlmaWNhdGlvblxyXG4gICAqIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvZ29nbG9iYWwvYmI4OTYwMDEuYXNweFxyXG4gICAqL1xyXG4gIGNvdW50cnlDdWx0dXJlczogZi5jb3VudHJ5Q3VsdHVyZXMsXHJcbiAgYWRkcmVzc0l0ZW1zOiBmLmFkZHJlc3NJdGVtcyxcclxuICAvKipcclxuICBDb252ZXJ0cyB0aGUgZ2l2ZW4gdmFsdWUgdXNpbmcgdGhlIHByb3ZpZGVkIGZvcm1hdCwgam9pbmluZyB3aXRoIHRoZSBzZXBhcmF0b3IgY2hhcmFjdGVyXHJcbiAgSWYgbm8gZm9ybWF0IGdpdmVuLCB3aWxsIHVzZSBwcmVkZWZpbmVkIGZvcm1hdCBmb3IgdGhlIGFkZHJlc3NlcyBDb3VudHJ5IChvciBlbi1VUyBhcyBmaW5hbCBmYWxsYmFjaylcclxuICA8cHJlPlxyXG4gIEZvcm1hdCAgICBEZXNjcmlwdGlvbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEV4YW1wbGVcclxuICAtLS0tLS0gICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgcyAgICAgICAgIFNhbHV0YXRpb24gKEF0dGVudGlvbiwgTmFtZSkgICAgICAgICAgICAgICAgQVRUTjogTXIuIEJvYlxyXG4gICBTICAgICAgICAgU2FsdXRhdGlvbiBVcHBlcmNhc2UgICAgICAgICAgICAgICAgICAgICAgICBBVFROOiBNUi4gQk9CXHJcbiAgIGExICAgICAgICBBZGRyZXNzIExpbmUgMSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDU1NSBPYWsgQXZlXHJcbiAgIGEyICAgICAgICBBZGRyZXNzIExpbmUgMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIzIwMzhcclxuICAgYTMgICAgICAgIEFkZHJlc3MgTGluZSAzXHJcbiAgIG0gICAgICAgIE11bmljaXBhbGl0eSAoQ2l0eSwgdG93biwgaGFtbGV0KSAgICAgICAgICAgIFBob2VuaXhcclxuICAgTSAgICAgICAgTXVuaWNpcGFsaXR5IFVwcGVyY2FzZSAgICAgICAgICAgICAgICAgICAgICAgIFBIT0VOSVhcclxuICAgeiAgICAgICAgQ291bnR5IChwYXJpc2gsIHByb3ZpZGVuY2UpICAgICAgICAgICAgICAgICAgICBNYXJpY29wYVxyXG4gICBaICAgICAgICAgQ291bnR5IFVwcGVyY2FzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICBNQVJJQ09QQVxyXG4gICByICAgICAgICBSZWdpb24gKFN0YXRlLCBhcmVhKSAgICAgICAgICAgICAgICAgICAgICAgIEFaXHJcbiAgIFIgICAgICAgIFJlZ2lvbiBVcHBlcmNhc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgQVpcclxuICAgcCAgICAgICAgIFBvc3RhbCBDb2RlIChaSVAgY29kZSkgICAgICAgICAgICAgICAgICAgICAgICA4NTAyMVxyXG4gICBQICAgICAgICAgUG9zdGFsIENvZGUgVXBwZXJjYXNlICAgICAgICAgICAgICAgICAgICAgICAgODUwMjFcclxuICAgYyAgICAgICAgIENvdW50cnkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRnJhbmNlXHJcbiAgIEMgICAgICAgICBDb3VudHJ5IFVwcGVyY2FzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICBGUkFOQ0VcclxuXHJcbiAgIHwgICAgICAgIHNlcGFyYXRvciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzIGRlZmluZWQgYnkgc2VwYXJhdG9yIHZhcmlhYmxlXHJcbiAgIDwvcHJlPlxyXG4gICBAcGFyYW0ge29iamVjdH0gYWRkciBBZGRyZXNzIEVudGl0eSBjb250YWluaW5nIGFsbCB0aGUgU0RhdGEgcHJvcGVydGllc1xyXG4gICBAcGFyYW0ge2Jvb2xlYW59IGFzVGV4dCBJZiBzZXQgdG8gdHJ1ZSByZXR1cm5zIHRleHQgb25seSwgaWYgZmFsc2UgcmV0dXJucyBhbmNob3IgbGluayB0byBnb29nbGUgbWFwc1xyXG4gICBAcGFyYW0ge3N0cmluZ3xib29sZWFufSBzZXBhcmF0b3IgSWYgZmFsc2UgLSBzZXBhcmF0ZXMgd2l0aCBodG1sIDxicj4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIHRydWUgLSBzZXBhcmF0ZXMgd2l0aCBsaW5lIHJldHVybixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgZGVmaW5lZCBhcyBzdHJpbmcgLSB1c2VzIHN0cmluZyB0byBzZXBhcmF0ZVxyXG4gICBAcGFyYW0ge3N0cmluZ30gZm10IEFkZHJlc3MgZm9ybWF0IHRvIHVzZSwgbWF5IGFsc28gcGFzcyBhIGN1bHR1cmUgc3RyaW5nIHRvIHVzZSBwcmVkZWZpbmVkIGZvcm1hdFxyXG4gICBAcmV0dXJuIHtzdHJpbmd9IEZvcm1hdHRlZCBhZGRyZXNzXHJcbiAgKi9cclxuICBhZGRyZXNzOiBmLmFkZHJlc3MsXHJcbiAgY29sbGFwc2VTcGFjZTogZi5jb2xsYXBzZVNwYWNlLFxyXG4gIHJlc29sdmVBZGRyZXNzQ3VsdHVyZTogZi5yZXNvbHZlQWRkcmVzc0N1bHR1cmUsXHJcbiAgcmVwbGFjZUFkZHJlc3NQYXJ0OiBmLnJlcGxhY2VBZGRyZXNzUGFydCxcclxuICAvLyBUaGVzZSB3ZXJlIGFkZGVkIHRvIHRoZSBTREssIGFuZCBzaG91bGQgbm90IGJlIGhlcmUuIEtlZXBpbmcgdGhlIGFsaWFzIHRvIG5vdCBicmVhayBhbnlvbmUgd2l0aCBhIG1pbm9yIHVwZGF0ZS5cclxuICBwaG9uZUZvcm1hdDogZi5waG9uZUZvcm1hdCxcclxuICBwaG9uZTogZi5waG9uZSxcclxuICBwaWNrbGlzdDogKFxyXG4gICAgc2VydmljZSwgLy8gUGlja2xpc3Qgc2VydmljZSByZWZlcmVuY2VcclxuICAgIG1vZGVsLCAvLyBSZWZlcmVuY2UgdG8gdGhlIGVudGl0eSdzIG1vZGVsIGZvciBjYWxsIGdldFBpY2tsaXN0TmFtZUJ5UHJvcGVydHlcclxuICAgIHByb3BlcnR5LCAvLyBQcm9wZXJ0eSB0byByZWZlcmVuY2UgZm9yIGZldGNoaW5nIHRoZSBwaWNrbGlzdCBvZmYgdGhlIG1vZGVsXHJcbiAgICBwaWNrbGlzdE5hbWUsIC8vIFBpY2tsaXN0IG5hbWUgdXNlZCAoY2FuIHVzZSB0aGlzIGluc3RlYWQgb2YgbW9kZWwtcHJvcGVydHkpXHJcbiAgICBsYW5ndWFnZUNvZGUgPSBBcHAuZ2V0Q3VycmVudExvY2FsZSgpLCAvLyBPdmVycmlkZSBmb3IgbGFuZ3VhZ2VDb2RlIHRvIGZldGNoXHJcbiAgICBwaWNrbGlzdE9wdGlvbnMgPSB7IC8vIE92ZXJyaWRlIGZvciBwaWNrbGlzdE9wdGlvbnMgb24gc3RvcmFnZSBhbmQgZGlzcGxheSBtb2Rlc1xyXG4gICAgICBzdG9yYWdlOiBmLlBpY2tsaXN0U3RvcmFnZVR5cGUuQ09ERSxcclxuICAgICAgZGlzcGxheTogZi5QaWNrbGlzdERhdGFEaXNwbGF5VHlwZS5URVhULFxyXG4gICAgfVxyXG4gICkgPT4ge1xyXG4gICAgbGV0IG5hbWUgPSBwaWNrbGlzdE5hbWU7XHJcbiAgICBpZiAoIW5hbWUpIHtcclxuICAgICAgaWYgKCFzZXJ2aWNlIHx8ICFtb2RlbCB8fCAhcHJvcGVydHkpIHtcclxuICAgICAgICByZXR1cm4gdmFsID0+IHZhbDtcclxuICAgICAgfVxyXG4gICAgICBuYW1lID0gbW9kZWwuZ2V0UGlja2xpc3ROYW1lQnlQcm9wZXJ0eShwcm9wZXJ0eSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBwaWNrbGlzdCA9IHNlcnZpY2UuZ2V0UGlja2xpc3RCeU5hbWUobmFtZSwgbGFuZ3VhZ2VDb2RlKTtcclxuXHJcbiAgICByZXR1cm4gKHZhbCkgPT4ge1xyXG4gICAgICByZXR1cm4gZi5waWNrbGlzdCh2YWwsIE9iamVjdC5hc3NpZ24oe30sIHBpY2tsaXN0T3B0aW9ucywgcGlja2xpc3QpKTtcclxuICAgIH07XHJcbiAgfSxcclxuICBQaWNrbGlzdERhdGFEaXNwbGF5VHlwZTogZi5QaWNrbGlzdERhdGFEaXNwbGF5VHlwZSxcclxuICBQaWNrbGlzdFN0b3JhZ2VUeXBlOiBmLlBpY2tsaXN0U3RvcmFnZVR5cGUsXHJcbiAgY3VycmVuY3k6IGZ1bmN0aW9uIGN1cnJlbmN5KF92YWwpIHtcclxuICAgIHJldHVybiBmLmN1cnJlbmN5KF92YWwsIE1vYmlsZS5DdWx0dXJlSW5mby5udW1iZXJGb3JtYXQuY3VycmVuY3lEZWNpbWFsU2VwYXJhdG9yLFxyXG4gICAgICBNb2JpbGUuQ3VsdHVyZUluZm8ubnVtYmVyRm9ybWF0LmN1cnJlbmN5R3JvdXBTZXBhcmF0b3IpO1xyXG4gIH0sXHJcbiAgYmlnTnVtYmVyOiBmdW5jdGlvbiBiaWdOdW1iZXIodmFsKSB7XHJcbiAgICBsZXQgbnVtUGFyc2UgPSB0eXBlb2YgdmFsICE9PSAnbnVtYmVyJyA/IHBhcnNlRmxvYXQodmFsKSA6IHZhbDtcclxuICAgIGNvbnN0IGFic1ZhbCA9IE1hdGguYWJzKG51bVBhcnNlKTtcclxuXHJcbiAgICBpZiAoaXNOYU4obnVtUGFyc2UpKSB7XHJcbiAgICAgIHJldHVybiB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHJlc3VsdHMgPSBudW1QYXJzZS50b1N0cmluZygpO1xyXG4gICAgaWYgKGFic1ZhbCA+PSAxMDAwMDAwMDAwKSB7XHJcbiAgICAgIC8vIEJpbGxpb25cclxuICAgICAgbnVtUGFyc2UgPSBudW1QYXJzZSAvIDEwMDAwMDAwMDA7XHJcbiAgICAgIHJlc3VsdHMgPSBzdHJpbmcuc3Vic3RpdHV0ZShyZXNvdXJjZS5iaWxsaW9uVGV4dCwge1xyXG4gICAgICAgIHZhbDogZG9qb051bWJlci5mb3JtYXQobnVtUGFyc2UsIHsgcGxhY2VzOiAxIH0pLFxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAoYWJzVmFsID49IDEwMDAwMDApIHtcclxuICAgICAgbnVtUGFyc2UgPSBudW1QYXJzZSAvIDEwMDAwMDA7XHJcbiAgICAgIHJlc3VsdHMgPSBzdHJpbmcuc3Vic3RpdHV0ZShyZXNvdXJjZS5taWxsaW9uVGV4dCwge1xyXG4gICAgICAgIHZhbDogZG9qb051bWJlci5mb3JtYXQobnVtUGFyc2UsIHsgcGxhY2VzOiAxIH0pLFxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAoYWJzVmFsID49IDEwMDApIHtcclxuICAgICAgbnVtUGFyc2UgPSBudW1QYXJzZSAvIDEwMDA7XHJcbiAgICAgIHJlc3VsdHMgPSBzdHJpbmcuc3Vic3RpdHV0ZShyZXNvdXJjZS50aG91c2FuZFRleHQsIHtcclxuICAgICAgICB2YWw6IGRvam9OdW1iZXIuZm9ybWF0KG51bVBhcnNlLCB7IHBsYWNlczogMSB9KSxcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXN1bHRzID0gZG9qb051bWJlci5yb3VuZChudW1QYXJzZSwgMikudG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0cztcclxuICB9LFxyXG4gIHJlbGF0aXZlRGF0ZTogZnVuY3Rpb24gcmVsYXRpdmVEYXRlKGRhdGUsIHRpbWVsZXNzKSB7XHJcbiAgICBjb25zdCB2YWwgPSBmLmRhdGUoZGF0ZSwgdGltZWxlc3MpO1xyXG4gICAgcmV0dXJuIG1vbWVudCh2YWwpLmZyb21Ob3coKTtcclxuICB9LFxyXG4gIG11bHRpQ3VycmVuY3k6IGZ1bmN0aW9uIG11bHRpQ3VycmVuY3koX3ZhbCwgY29kZSkge1xyXG4gICAgcmV0dXJuIGYubXVsdGlDdXJyZW5jeShfdmFsLCBjb2RlLCBNb2JpbGUuQ3VsdHVyZUluZm8ubnVtYmVyRm9ybWF0LmN1cnJlbmN5RGVjaW1hbFNlcGFyYXRvcixcclxuICAgICAgTW9iaWxlLkN1bHR1cmVJbmZvLm51bWJlckZvcm1hdC5jdXJyZW5jeUdyb3VwU2VwYXJhdG9yKTtcclxuICB9LFxyXG4gIG5hbWVMRjogZi5uYW1lTEYsXHJcbiAgbWFpbDogZi5tYWlsLFxyXG4gIC8vIFRPRE86IEwyMG5cclxuICB1c2VyQWN0aXZpdHlGb3JtYXRUZXh0OiB7XHJcbiAgICBhc1VuY29uZmlybWVkOiAnVW5jb25maXJtZWQnLFxyXG4gICAgYXNBY2NlcHRlZDogJ0FjY2VwdGVkJyxcclxuICAgIGFzRGVjbG5lZDogJ0RlY2xpbmVkJyxcclxuICB9LFxyXG4gIC8vIFRPRE86IE1vdmVcclxuICB1c2VyQWN0aXZpdHlTdGF0dXM6IGZ1bmN0aW9uIHVzZXJBY3Rpdml0eVN0YXR1cyh2YWwpIHtcclxuICAgIHJldHVybiBjcm0uRm9ybWF0LnVzZXJBY3Rpdml0eUZvcm1hdFRleHRbdmFsXTtcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIFRha2VzIGEgc3RyaW5nIGlucHV0IGFuZCBjb252ZXJ0cyBuYW1lIHRvIEZpcnN0IGFtZCBMYXN0IGluaXRpYWxzXHJcbiAgICogYExlZSBIb2dhbmAgLT4gYExIYFxyXG4gICAqIEBwYXJhbSB2YWxcclxuICAgKiBAcmV0dXJucyB7U3RyaW5nfVxyXG4gICAqL1xyXG4gIGZvcm1hdFVzZXJJbml0aWFsOiBmLmZvcm1hdFVzZXJJbml0aWFsLFxyXG4gIC8qKlxyXG4gICAqIFRha2VzIGEgc3RyaW5nIGlucHV0IGFuZCB0aGUgdXNlciBuYW1lIHRvIEZpcnN0IGFtZCBMYXN0IG5hbWVcclxuICAgKiBgSG9nYW4sIExlZWAgLT4gYExlZSBIb2dhbmBcclxuICAgKiBAcGFyYW0gdmFsXHJcbiAgICogQHJldHVybnMge1N0cmluZ31cclxuICAgKi9cclxuICBmb3JtYXRCeVVzZXI6IGYuZm9ybWF0QnlVc2VyLFxyXG4gIC8qKlxyXG4gICAqIFRha2VzIGEgc3RyaW5nIGlucHV0IGFuZCB0aGUgdXNlciBuYW1lIHRvIEZpcnN0IGFtZCBMYXN0IG5hbWVcclxuICAgKiBgSG9nYW4sIExlZWAgLT4gYExlZSBIb2dhbmBcclxuICAgKiBAcGFyYW0gdmFsXHJcbiAgICogQHJldHVybnMge1N0cmluZ31cclxuICAgKi9cclxuICByZXNvbHZlRmlyc3RMYXN0OiBmLnJlc29sdmVGaXJzdExhc3QsXHJcbiAgZml4ZWRMb2NhbGU6IGZ1bmN0aW9uIGZpeGVkTG9jYWxlKHZhbCwgZCkge1xyXG4gICAgcmV0dXJuIGYuZml4ZWRMb2NhbGUodmFsLCBkLCBNb2JpbGUuQ3VsdHVyZUluZm8ubnVtYmVyRm9ybWF0Lm51bWJlckdyb3VwU2VwYXJhdG9yLFxyXG4gICAgICBNb2JpbGUuQ3VsdHVyZUluZm8ubnVtYmVyRm9ybWF0Lm51bWJlckRlY2ltYWxTZXBhcmF0b3IpO1xyXG4gIH0sXHJcbiAgdGltZTogZnVuY3Rpb24gdGltZShyYXdWYWx1ZSwgdHlwZSA9ICdkYXlzJykge1xyXG4gICAgbGV0IHZhbCA9IHJhd1ZhbHVlO1xyXG5cclxuICAgIGlmICh0eXBlb2YgcmF3VmFsdWUgIT09ICdudW1iZXInKSB7XHJcbiAgICAgIHZhbCA9IHBhcnNlRmxvYXQocmF3VmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG51bVBhcnNlID0gY3JtLkZvcm1hdC5maXhlZExvY2FsZSh2YWwsIDIpO1xyXG4gICAgc3dpdGNoICh0eXBlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgY2FzZSAnZGF5cyc6XHJcbiAgICAgICAgcmV0dXJuIHN0cmluZy5zdWJzdGl0dXRlKHJlc291cmNlLmRheXNUZXh0LCB7XHJcbiAgICAgICAgICB2YWw6IG51bVBhcnNlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICBjYXNlICd3ZWVrcyc6XHJcbiAgICAgICAgcmV0dXJuIHN0cmluZy5zdWJzdGl0dXRlKHJlc291cmNlLndlZWtzVGV4dCwge1xyXG4gICAgICAgICAgdmFsOiBudW1QYXJzZSxcclxuICAgICAgICB9KTtcclxuICAgICAgY2FzZSAnbW9udGhzJzpcclxuICAgICAgICByZXR1cm4gc3RyaW5nLnN1YnN0aXR1dGUocmVzb3VyY2UubW9udGhzVGV4dCwge1xyXG4gICAgICAgICAgdmFsOiBudW1QYXJzZSxcclxuICAgICAgICB9KTtcclxuICAgICAgY2FzZSAneWVhcnMnOlxyXG4gICAgICAgIHJldHVybiBzdHJpbmcuc3Vic3RpdHV0ZShyZXNvdXJjZS55ZWFyc1RleHQsIHtcclxuICAgICAgICAgIHZhbDogbnVtUGFyc2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmF3VmFsdWU7XHJcbiAgfSxcclxufSkpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19