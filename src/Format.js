/// <reference path="../../ext/ext-core-debug.js"/>
/// <reference path="../../platform/Application.js"/>
/// <reference path="../../platform/Format.js"/>
/// <reference path="../../sdata/SDataService.js"/>

Ext.namespace("Mobile.SalesLogix");

Mobile.SalesLogix.Format = (function() {
    var F = Sage.Platform.Mobile.Format;   
   
    return Ext.apply({}, {
        address: function(val, onlyText) {
            if (val === null || typeof val == "undefined") return "";
            
            var lines = [];
            if (!F.isEmpty(val['Address1'])) lines.push(F.encode(val['Address1']));
            if (!F.isEmpty(val['Address2'])) lines.push(F.encode(val['Address2']));
            if (!F.isEmpty(val['Address3'])) lines.push(F.encode(val['Address3']));
            if (!F.isEmpty(val['Address4'])) lines.push(F.encode(val['Address4']));

            var location = [];

            if (!F.isEmpty(val['City']) && !F.isEmpty(F.encode(val['State'])))
            {
                location.push(F.encode(val['City']) + ',');
                location.push(F.encode(val['State']));                                            
            }
            else
            {
                if (!F.isEmpty(val['City'])) location.push(F.encode(val['City']));
                if (!F.isEmpty(val['State'])) location.push(F.encode(val['State']));                
            }

            if (!F.isEmpty(val['PostalCode'])) location.push(F.encode(val['PostalCode']));
                   
            if (location.length > 0)
            {
                lines.push(location.join(' '));
            }

            if (!F.isEmpty(val['Country'])) lines.push(F.encode(val['Country']));
            
            var address = lines.join('<br />');
            var encoded_address = unescape(lines.join(','));

            if (onlyText === true && address == '') return 'empty';
            if (onlyText === true) return address;
            return String.format('<a target="_blank" href="http://maps.google.com/maps?q={1}">{0}</a>',address, encoded_address);
        },
        phone: function(val, withLink) {
            if (typeof val !== 'string') 
                return val;
            
            var formatNumber = function (number, extn, phNumber) {
                var numString = "", extnString = "";
                if (extn) extnString = 'x' + extn;
                if (number.length < 7) {
                    numString = number + "";
                }
                else {
                    numString = String.format('({0}) {1}-{2}', number.substring(0, 3), number.substring(3, 6), number.substring(6));
                }
                if (withLink === false) {
                    return String.format('{0}{1}', numString, extnString);
                }
                return String.format('<a href="tel:{0}">{1}{2}</a>', phNumber, numString, extnString);
            };

            if (/x/i.test(val)) {
                var numbers = val.split(/x/i);
                return formatNumber(numbers[0], numbers[1], val);
            }
            return formatNumber(val, "", val);
        },
        currency: function(val) {
            // todo: add localization support
            var v = Mobile.SalesLogix.Format.fixed(val),
                f = Math.floor(100 * (v - Math.floor(v)));

            return String.format('${0}.{1}',
                (Math.floor(v)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                (f.toString().length < 2)
                    ? '0' + f.toString()
                    : f.toString()
            );
        },
        date: function(val, fmt) {
            // 2007-04-12T00:00:00-07:00
            var match = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(Z|(-|\+)(\d{2}):(\d{2}))/.exec(val);
            if (match)
            {
                // new Date(year, month, date [, hour, minute, second, millisecond ])
                var utc = new Date(Date.UTC(
                    parseInt(match[1]),
                    parseInt(match[2]) - 1, // zero based
                    parseInt(match[3]),
                    parseInt(match[4]),
                    parseInt(match[5]),
                    parseInt(match[6])
                ));

                if (match[7] !== 'Z')
                {
                    // todo: add support for minutes
                    var h = parseInt(match[9]); 
                    var m = parseInt(match[10]);
                    if (match[8] === '-')
                        utc.addMinutes((h * 60) + m);
                    else
                        utc.addMinutes(-1 * ((h * 60) + m));
                }

                return utc.toString(fmt || 'M/d/yyyy');
            }
            else
            {
                return val;
            }                                    
        },
        fixed: function(val, d) {
            if (typeof d !== 'number')
                d = 2;

            var m = Math.pow(10, d);
            var v = Math.floor(parseFloat(val) * m) / m;
            return v;
        }             
    }, F);
})();
