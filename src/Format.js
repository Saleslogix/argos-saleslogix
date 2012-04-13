define('Mobile/SalesLogix/Format', [
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/string',
    'Mobile/SalesLogix/Template',
    'Sage/Platform/Mobile/Format'
], function(
    lang,
    array,
    string,
    template,
    format
) {
    return lang.setObject('Mobile.SalesLogix.Format', lang.mixin({}, format, {
        /**
         * Address Culture Formats as defined by Mobile.SalesLogix.Format.address
         * http://msdn.microsoft.com/en-us/library/cc195167.aspx
         */
        addressCultureFormats: {
            'en': 'a1|a2|a3|m R p|C',
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
            'United Kingdom':'en-GB',
            'UK':'en-GB',
            'Britain':'en-GB',
            'England':'en-GB',
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
        Format	Description									Example
        ------	-----------------------------------------	-----------------------
         s 		Salutation (Attention, Name)    			ATTN: Mr. Bob
         S 		Salutation Uppercase						ATTN: MR. BOB
         a1		Address Line 1                  			555 Oak Ave
         a2		Address Line 2			                    #2038
         a3		Address Line 3
         m		Municipality (City, town, hamlet)			Phoenix
         M		Municipality Uppercase						PHOENIX
         z		County (parish, providence)					Maricopa
         Z 		County Uppercase							MARICOPA
         r		Region (State, area)                		AZ
         R		Region Uppercase							AZ
         p     	Postal Code (ZIP code)						85021
         P     	Postal Code Uppercase						85021
         c 		Country 									France
         C 		Country Uppercase							FRANCE

         |		separator			    					as defined by separator variable
         </pre>
         @param {object} o Address Entity containing all the SData properties
         @param {boolean} asText If set to true returns text only, if false returns anchor link to google maps
         @param {string|boolean} separator If false - separates with html <br>,
                              if true - separates with line return,
                              if defined as string - uses string to separate
         @param {string} fmt Address format to use, may also pass a culture string to use predefined format
         @return {string} Formatted address
        */
        address: function(o, asText, separator, fmt){
            var isEmpty = function(line){
                    var filterSymbols = lang.trim(line.replace(/,|\(|\)|\.|>|-|<|;|:|'|"|\/|\?|\[|\]|{|}|_|=|\+|\\|\||!|@|#|\$|%|\^|&|\*|`|~/g,''));
                    return filterSymbols === '';
                },
                _this = Mobile.SalesLogix.Format;

            if (!fmt)
            {
                var culture = _this.resolveAddressCulture(o);
                fmt = _this.addressCultureFormats[culture] || _this.addressCultureFormats['en'];
            }

            var lines = (fmt.indexOf('|') === -1) ? [fmt] : fmt.split('|'),
                address = [];

            array.forEach(lines, function(line) {
                line = _this.replaceAddressPart(line, o);
                if (!isEmpty(line))
                    this.push( _this.encode(_this.collapseSpace(line)));
            }, address);

            if (asText)
            {
                if (separator === true) separator = '\n';
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
        replaceAddressPart: function(fmt, o){
            return fmt.replace(/s|S|a1|a2|a3|a4|m|M|z|Z|r|R|p|P|c|C/g,
                function (part) {
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
                    default: return '';
                    }
                }
            );
        },
        /*
            {0}: original value
            {1}: cleaned value
            {2}: entire match (against clean value)
            {3..n}: match groups (against clean value)
        */
        phoneFormat: [{
            test: /^\+.*/,
            format: '${0}'
        },{
            test: /^(\d{3})(\d{3,4})$/,
            format: '${3}-${4}'
        },{
            test: /^(\d{3})(\d{3})(\d{2,4})$/, // 555 555 5555
            format: '(${3})-${4}-${5}'
        },{
            test: /^(\d{3})(\d{3})(\d{2,4})([^0-9]{1,}.*)$/, // 555 555 5555x
            format: '(${3})-${4}-${5}${6}'
        },{
            test: /^(\d{11,})(.*)$/,
            format: '${1}'
        }],
        phone: function(val, withLink) {
            if (typeof val !== 'string')
                return val;

            var formatters = Mobile.SalesLogix.Format.phoneFormat,
                clean = /^\+/.test(val)
                    ? val
                    : val.replace(/[^0-9x]/ig, ''),
                number;

            for (var i = 0; i < formatters.length; i++)
            {
                var formatter = formatters[i],
                    match;
                if ((match = formatter.test.exec(clean)))
                    number = string.substitute(formatter.format, [val, clean].concat(match));
            }

            if (number)
                return withLink === false
                    ? number
                    : string.substitute('<a href="tel:${0}">${1}</a>', [clean, number]);

            return val;
        },
        currency: function(val) {
            if (isNaN(val) || val === null)
                return val;

            var v = Mobile.SalesLogix.Format.fixed(val), // only 2 decimal places
                f = Math.floor((100 * (v - Math.floor(v))).toPrecision(2)); // for fractional part, only need 2 significant digits

            return string.substitute(
                Mobile.CultureInfo.numberFormat.currencySymbol
                + '${0}'
                + Mobile.CultureInfo.numberFormat.currencyDecimalSeparator
                + '${1}', [
                    (Math.floor(v)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1'+Mobile.CultureInfo.numberFormat.currencyGroupSeparator.replace("\\.",'.')),
                    (f.toString().length < 2) ? '0' + f.toString() : f.toString()
                ]
            ).replace(/ /g, '\u00A0'); //keep numbers from breaking
        },
        nameLF: function(val) {
            if (!val) return '';

            var name = template.nameLF.apply(val);
            if (name == ', ')
                name = '';

            return name;
        },
        mail: function(val) {
            if (typeof val !== 'string')
                return val;

            return string.substitute('<a href="mailto:${0}">${0}</a>', [val]);
        }
    }));
});