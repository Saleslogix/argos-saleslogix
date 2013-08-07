/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('spec/Format.spec', ['Mobile/SalesLogix/Format'],function(Format) {
    // Verify the the argos-saleslogix version of these work OK - SDK really contains the phone formatter.
    describe('Mobile/SalesLogix/Format', function() {
        describe('address', function() {
            var addressFeed = {
                Salutation: 'ATTN: Qa Testers',
                Address1: '5555 N Gainey Center Dr',
                Address2: 'Suite 200',
                Address3: '',
                Address4: '',
                City: 'Scottsdale',
                County: 'Maricopa',
                State: 'az',
                PostalCode: '85032',
                Country: 'usa'
            };

            it('should format as text', function () {
                expect(Format.address(addressFeed, true, ';', '')).toEqual('5555 N Gainey Center Dr;Suite 200;Scottsdale, AZ 85032;USA');
            });

            it('should format as html', function () {
                expect(Format.address(addressFeed, false, ';', '')).toEqual('<a target="_blank" href="http://maps.google.com/maps?q=5555%20N%20Gainey%20Center%20Dr%20Suite%20200%20Scottsdale%2C%20AZ%2085032%20USA">5555 N Gainey Center Dr<br />Suite 200<br />Scottsdale, AZ 85032<br />USA</a>');
            });
        });

        describe('bigNumber', function() {
            it('should contain an B', function() {
                expect(Format.bigNumber(9999999999)).toEqual('10.0B');
            });

            it('should contain an M', function() {
                expect(Format.bigNumber(1000000)).toEqual('1.0M');
            });

            it('should contain a K', function() {
                expect(Format.bigNumber(100000)).toEqual('100.0K');
                expect(Format.bigNumber(999999)).toEqual('1,000.0K');
            });
        });

        describe('phone', function() {
            it('should convert alpha', function() {
                expect(Format.phone('800-FOX-BORO', false)).toEqual('(800)-369-2676');
                expect(Format.phone('FOX-BORO', false)).toEqual('369-2676');
                expect(Format.phone('FOX-BORX', false)).toEqual('369-2679');
            });

            it('should support extensions', function() {
                expect(Format.phone('800-FOX-BOROx50', false)).toEqual('(800)-369-2676x50');
                expect(Format.phone('555-555-5555x8', false)).toEqual('(555)-555-5555x8');
            });
        });

        describe('currency', function() {
            it('should not format isNaN (undefined)', function() {
                expect(Format.currency()).toEqual(undefined);
            });

            it('should not format isNaN (null)', function() {
                expect(Format.currency(null)).toEqual(null);
            });

            it('should not format isNaN (string)', function() {
                expect(Format.currency('foo')).toEqual('foo');
            });

            it('should should round using toFixed (round up)', function() {
                expect(Format.currency(12.558)).toEqual('12.56');
            });

            it('should should round using toFixed (round down)', function() {
                expect(Format.currency(12.554)).toEqual('12.55');
            });

            it('should should round using toFixed', function() {
                expect(Format.currency(12.555)).toEqual('12.55');
            });

            it('should group larger numbers', function() {
                expect(Format.currency(1294.55)).toEqual('1,294.55');
            });
        });

        describe('multiCurrency', function() {
            it('should format with code', function() {
                expect(Format.multiCurrency(12.55, 'USD')).toEqual('12.55 USD');
            });
        });
        
        describe('nameLF', function() {
            var user = {
                FirstName: 'Bob',
                LastName: 'Smith'
            };
            
            it('should format a users last and first name with a comma', function() {
                expect(Format.nameLF(user)).toEqual('Smith, Bob');
            });
        });

        describe('mail', function() {
            it('should return an html mailto link', function() {
                expect(Format.mail('user@domain.test')).toEqual('<a href="mailto:user@domain.test">user@domain.test</a>');
            });

            it('should not format non string values (number)', function() {
                expect(Format.mail(10)).toEqual(10);
            });

            it('should not format non string values (undefined)', function() {
                expect(Format.mail()).toEqual(undefined);
            });

            it('should not format non string values (null)', function() {
                expect(Format.mail(null)).toEqual(null);
            });
        });
        
        describe('userActivityStatus', function() {
            it('should format the activty status', function() {
                expect(Format.userActivityStatus('asAccepted')).toEqual('Accepted');
                expect(Format.userActivityStatus('asUnconfirmed')).toEqual('Unconfirmed');
                expect(Format.userActivityStatus('asDeclned')).toEqual('Declined');
            });
        });
    });
});

