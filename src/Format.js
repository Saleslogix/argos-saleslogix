/// <reference path="../../ext/ext-core-debug.js"/>
/// <reference path="../../platform/Application.js"/>
/// <reference path="../../platform/Format.js"/>
/// <reference path="../../sdata/SDataService.js"/>

Ext.namespace("Mobile.SalesLogix");

Mobile.SalesLogix.Format = (function() {
    var F = Sage.Platform.Mobile.Format;      
   
    return Ext.apply({}, {
        address: function(val, textOnly, nl) {
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

            if (textOnly) return nl ? lines.join(typeof nl === 'string' ? nl : '\n') : lines.join('<br />');

            return String.format('<a target="_blank" href="http://maps.google.com/maps?q={1}">{0}</a>',
                lines.join('<br />'),
                encodeURIComponent(lines.join(' '))
            );
        },
        phone: function(val, withLink) {
            if (typeof val !== 'string') 
                return val;

            var formatters = Sage.Platform.Mobile.Controls.PhoneField.prototype.formatters,
                clean = /^\+/.test(val)
                    ? val
                    : val.replace(/[^0-9x]/ig, ''),
                number;

            for (var i = 0; i < formatters.length; i++)
            {
                var formatter = formatters[i],
                    match;
                if ((match = formatter.test.exec(clean)))
                    number = String.format.apply(String, [formatter.format, val, clean].concat(match));                
            }

            if (number)
                return withLink === false
                    ? number
                    : String.format('<a href="tel:{0}">{1}</a>', clean, number);

            return val;
        },
        currency: function(val) {
            // todo: add localization support
            var v = Mobile.SalesLogix.Format.fixed(val),
                f = (100 * (v - Math.floor(v))).toPrecision(2);

            return String.format('${0}.{1}',
                (Math.floor(v)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                (f.toString() === '0.0')
                    ? '00'
                    : (f.toString().length < 2)
                        ? '0' + f.toString()
                        : f.toString()
            );
        },        
        nameLF: function(val) {
            if (!val) return '';

            var name = Mobile.SalesLogix.Template.nameLF.apply(val);
            if (name == ', ')
                name = '';
            
            return name;
        },
        mail: function(val) {
            if (typeof val !== 'string')
                return val;

            return String.format('<a href="mailto:{0}">{0}</a>', val);
        }             
    }, F);
})();
