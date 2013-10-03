/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Format', [
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/string',
    'dojo/number',
    'Mobile/SalesLogix/Template',
    'Sage/Platform/Mobile/Format',
    'moment'
], function(
    lang,
    array,
    string,
    dojoNumber,
    template,
    format,
    moment
) {
    return lang.setObject('Mobile.SalesLogix.Format', lang.mixin({}, format, {
        /**
         * Address Culture Formats as defined by Mobile.SalesLogix.Format.address
         * http://msdn.microsoft.com/en-us/library/cc195167.aspx
         */
        addressCultureFormats: {
            'en': 'a1|a2|a3|m, R p|C',
            'en-GB': 'a1|a2|a3|M|P|C',
            'fr': 'a1|a2|a3|p M|C',
            'de': 'a1|a2|a3|p m|C',
            'it': 'a1|a2|a3|p m Z|C',
            'ru': 'a1|a2|a3|p m|C'
        },
        /**
         * Country name to culture identification
         * http://msdn.microsoft.com/en-us/goglobal/bb896001.aspx
         */
        countryCultures: {
            'USA': 'en',
            'United States': 'en',
            'United States of America': 'en',
            'US': 'en',
            'United Kingdom': 'en-GB',
            'UK': 'en-GB',
            'Britain': 'en-GB',
            'England': 'en-GB',
            'Russia': 'ru',
            'Россия': 'ru',
            'Italy': 'it',
            'Italia': 'it',
            'France': 'fr',
            'Germany': 'de',
            'Deutschland': 'de'
        },
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
         @param {object} o Address Entity containing all the SData properties
         @param {boolean} asText If set to true returns text only, if false returns anchor link to google maps
         @param {string|boolean} separator If false - separates with html <br>,
                              if true - separates with line return,
                              if defined as string - uses string to separate
         @param {string} fmt Address format to use, may also pass a culture string to use predefined format
         @return {string} Formatted address
        */
        address: function(o, asText, separator, fmt) {
            var isEmpty = function(line) {
                var filterSymbols = lang.trim(line.replace(/,|\(|\)|\.|>|-|<|;|:|'|"|\/|\?|\[|\]|{|}|_|=|\+|\\|\||!|@|#|\$|%|\^|&|\*|`|~/g, ''));//'
                return filterSymbols === '';
            },
                _this = Mobile.SalesLogix.Format;

            if (!fmt) {
                var culture = _this.resolveAddressCulture(o);
                fmt = _this.addressCultureFormats[culture] || _this.addressCultureFormats['en'];
            }

            var lines = (fmt.indexOf('|') === -1) ? [fmt] : fmt.split('|'),
                address = [];

            array.forEach(lines, function(line) {
                line = _this.replaceAddressPart(line, o);
                if (!isEmpty(line)) {
                    this.push(_this.encode(_this.collapseSpace(line)));
                }
            }, address);

            if (asText) {
                if (separator === true) {
                    separator = '\n';
                }
                return address.join(separator || '<br />');
            }

            return string.substitute(
                '<a target="_blank" href="http://maps.google.com/maps?q=${1}">${0}</a>',
                [address.join('<br />'), encodeURIComponent(_this.decode(address.join(' ')))]
            );
        },
        collapseSpace: function(text) {
            return lang.trim(text.replace(/\s+/g, ' '));
        },
        resolveAddressCulture: function(o) {
            return Mobile.SalesLogix.Format.countryCultures[o.Country] || Mobile.CultureInfo.name;
        },
        replaceAddressPart: function(fmt, o) {
            return fmt.replace(/s|S|a1|a2|a3|a4|m|M|z|Z|r|R|p|P|c|C/g,
                function(part) {
                    switch (part) {
                        case "s":
                            return o.Salutation || '';
                        case "S":
                            return (o.Salutation && o.Salutation.toUpperCase()) || '';
                        case "a1":
                            return o.Address1 || '';
                        case "a2":
                            return o.Address2 || '';
                        case "a3":
                            return o.Address3 || '';
                        case "a4":
                            return o.Address4 || '';
                        case "m":
                            return o.City || '';
                        case "M":
                            return (o.City && o.City.toUpperCase()) || '';
                        case "z":
                            return o.County || '';
                        case "Z":
                            return (o.County && o.County.toUpperCase()) || '';
                        case "r":
                            return o.State || '';
                        case "R":
                            return (o.State && o.State.toUpperCase()) || '';
                        case "p":
                            return o.PostalCode || '';
                        case "P":
                            return (o.PostalCode && o.PostalCode.toUpperCase()) || '';
                        case "c":
                            return o.Country || '';
                        case "C":
                            return (o.Country && o.Country.toUpperCase()) || '';
                        default:
                            return '';
                    }
                }
            );
        },
        // These were added to the SDK, and should not be here. Keeping the alias to not break anyone with a minor update.
        phoneFormat: format.phoneFormat,
        phone: format.phone,
        currency: function(val) {
            if (isNaN(val) || val === null) {
                return val;
            }

            var v = val.toFixed(2), // only 2 decimal places
                f = Math.floor((100 * (v - Math.floor(v))).toPrecision(2)); // for fractional part, only need 2 significant digits

            return string.substitute(
                '${0}'
                    + Mobile.CultureInfo.numberFormat.currencyDecimalSeparator
                    + '${1}', [
                        (Math.floor(v)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + Mobile.CultureInfo.numberFormat.currencyGroupSeparator.replace("\\.", '.')),
                        (f.toString().length < 2) ? '0' + f.toString() : f.toString()
                    ]
            ).replace(/ /g, '\u00A0'); //keep numbers from breaking
        },
        bigNumberAbbrText: {
            'billion': 'B',
            'million': 'M',
            'thousand': 'K'
        },
        bigNumber: function(val) {
            try {
                var numParse = isNaN(val) ? parseFloat(val) : val,
                    text = Mobile.SalesLogix.Format.bigNumberAbbrText;

                if (numParse && numParse >= 1000000000) {
                    numParse = numParse / 1000000000;
                    return dojoNumber.format(numParse, { places: 1 }) + text['billion'];
                } else if (numParse && numParse >= 1000000) {
                    numParse = numParse / 1000000;
                    return dojoNumber.format(numParse, { places: 1 }) + text['million'];
                } else if (numParse && numParse >= 1000) {
                    numParse = numParse / 1000;
                    return dojoNumber.format(numParse, { places: 1 }) + text['thousand'];
                }
            } catch(ex) {
                console.error(ex);
            }

            return val;
        },
        relativeDate: function(date, timeless) {
            var now;
            date = moment(date);
            if (!date || !date.isValid()) {
                throw new Error('Invalid date passed into Mobile.SalesLogix.Format.relativeDate');
            }

            if (timeless) {
                // utc
                date = date.add({minutes: date.zone()});
            }

            return date.fromNow();
        },
        multiCurrency: function(val, code) {
            return string.substitute('${0} ${1}', [Mobile.SalesLogix.Format.currency(val), code]);
        },
        nameLF: function(val) {
            if (!val) {
                return '';
            }

            var name = template.nameLF.apply(val);
            if (name == ', ') {
                name = '';
            }

            return name;
        },
        mail: function(val) {
            if (typeof val !== 'string') {
                return val;
            }

            return string.substitute('<a href="mailto:${0}">${0}</a>', [val]);
        },
        userActivityFormats: {
            'asUnconfirmed': 'Unconfirmed',
            'asAccepted': 'Accepted',
            'asDeclned': 'Declined'
        },
        userActivityStatus: function(val) {
            return Mobile.SalesLogix.Format.userActivityFormats[val];
        },
        /**
         * Takes a string input and converts name to First amd Last initials 
         * `Lee Hogan` -> `LH`
         * @param val
         * @returns {String}
         */
        formatUserInitial: function(user) {
            var firstLast = this.resolveFirstLast(user),
                initials = [firstLast[0].substr(0, 1)];

            if (firstLast[1]) {
                initials.push(firstLast[1].substr(0, 1));
            }

            return initials.join('').toUpperCase();
        },
        /**
        * Takes a string input and the user name to First amd Last name 
        * `Hogan, Lee` -> `Lee Hogan`
        * @param val
        * @returns {String}
        */
        formatByUser: function(user) {
            var name = this.resolveFirstLast(user);
            return name.join(' ');
        },
        /**
       * Takes a string input and the user name to First amd Last name 
       * `Hogan, Lee` -> `Lee Hogan`
       * @param val
       * @returns {String}
       */
        resolveFirstLast: function(name) {
            var firstLast = [];
            if (name.indexOf(' ') !== -1) {
                var names = name.split(' ');
                if (names[0].indexOf(',') !== -1) {
                    firstLast = [names[1], names[0].slice(0, -1)];
                }
                else {
                    firstLast = [names[0], names[1]];
                }
            }
            else {
                firstLast = [name];
            }
            return firstLast;
        }
    }));
});

