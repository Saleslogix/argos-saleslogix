/* eslint-disable */
define('spec/Format.spec', ['Mobile/SalesLogix/Format'], function(Format) {
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

      it('should format as text', function() {
        expect(Format.address(addressFeed, true, ';', ''))
          .toEqual('5555 N Gainey Center Dr;Suite 200;Scottsdale, AZ 85032;USA');
        expect(Format.address(addressFeed, true, true, ''))
          .toEqual('5555 N Gainey Center Dr\nSuite 200\nScottsdale, AZ 85032\nUSA');
        expect(Format.address(addressFeed, true, false, ''))
          .toEqual('5555 N Gainey Center Dr<br />Suite 200<br />Scottsdale, AZ 85032<br />USA');
      });

      it('should format as html', function() {
        expect(Format.address(addressFeed, false, ';', ''))
          .toEqual('<a class="hyperlink" href="javascript:App.showMapForAddress(\'5555%20N%20Gainey%20Center%20Dr%20Suite%20200%20Scottsdale%2C%20AZ%2085032%20USA\');">5555 N Gainey Center Dr<br />Suite 200<br />Scottsdale, AZ 85032<br />USA</a>');
      });

      it('should default to locale "en"', function() {
        Format.resolveAddressCulture = function() {
          return 'bad culture';
        };

        expect(Format.address(addressFeed, true, ';', ''))
          .toEqual('5555 N Gainey Center Dr;Suite 200;Scottsdale, AZ 85032;USA');
      });

      it('should parse a custom formatter', function() {
        var original = ICRMCommonSDK.format.resolveAddressCulture;

        ICRMCommonSDK.format.resolveAddressCulture = function() {
          return 'test-culture';
        };

        ICRMCommonSDK.format.addressCultureFormats['test-culture'] = 's';

        // Not specifying a format string will pull our custom test-culture defined above
        //expect(Format.address(addressFeed, true, ';'))
        //  .toEqual(addressFeed.Salutation);

        // salutation
        expect(Format.address(addressFeed, true, ';', 's'))
          .toEqual(addressFeed.Salutation);
        expect(Format.address(addressFeed, true, ';', 'S'))
          .toEqual(addressFeed.Salutation.toUpperCase());
        expect(Format.address({}, true, ';', 's'))
          .toEqual('');
        expect(Format.address({}, true, ';', 'S'))
          .toEqual('');

        // address
        expect(Format.address(addressFeed, true, ';', 'a4'))
          .toEqual(addressFeed.Address4);
        expect(Format.address({}, true, ';', 'a1'))
          .toEqual('');
        expect(Format.address({}, true, ';', 'a2'))
          .toEqual('');
        expect(Format.address({}, true, ';', 'a3'))
          .toEqual('');
        expect(Format.address({}, true, ';', 'a4'))
          .toEqual('');

        // city
        expect(Format.address(addressFeed, true, ';', 'm'))
          .toEqual(addressFeed.City);
        expect(Format.address({}, true, ';', 'm'))
          .toEqual('');
        expect(Format.address(addressFeed, true, ';', 'M'))
          .toEqual(addressFeed.City.toUpperCase());
        expect(Format.address({}, true, ';', 'M'))
          .toEqual('');

        // county
        expect(Format.address(addressFeed, true, ';', 'z'))
          .toEqual(addressFeed.County);
        expect(Format.address({}, true, ';', 'z'))
          .toEqual('');
        expect(Format.address(addressFeed, true, ';', 'Z'))
          .toEqual(addressFeed.County.toUpperCase());
        expect(Format.address({}, true, ';', 'Z'))
          .toEqual('');

        // state
        expect(Format.address(addressFeed, true, ';', 'r'))
          .toEqual(addressFeed.State);
        expect(Format.address({}, true, ';', 'r'))
          .toEqual('');
        expect(Format.address({}, true, ';', 'R'))
          .toEqual('');

        // postal code
        expect(Format.address({}, true, ';', 'p'))
          .toEqual('');
        expect(Format.address(addressFeed, true, ';', 'P'))
          .toEqual(addressFeed.PostalCode.toUpperCase());
        expect(Format.address({}, true, ';', 'P'))
          .toEqual('');

        // state
        expect(Format.address(addressFeed, true, ';', 'c'))
          .toEqual(addressFeed.Country);
        expect(Format.address({}, true, ';', 'c'))
          .toEqual('');
        expect(Format.address({}, true, ';', 'C'))
          .toEqual('');

        // nothing
        expect(Format.address(addressFeed, true, ';', 'a'))
          .toEqual('a');

        // handle nulls
        expect(Format.address(null))
          .toEqual('');

        // restore the original function
        Format.resolveAddressCulture = original;
      });
    });

    describe('bigNumber', function() {
      it('should contain an B', function() {
        expect(Format.bigNumber(9999999999))
          .toEqual('10.0B');
      });

      it('should contain an M', function() {
        expect(Format.bigNumber(1000000))
          .toEqual('1.0M');
      });

      it('should contain a K', function() {
        expect(Format.bigNumber(100000))
          .toEqual('100.0K');
        expect(Format.bigNumber(999999))
          .toEqual('1,000.0K');
        expect(Format.bigNumber(1000))
          .toEqual('1.0K');
      });

      it('should return the original value for non-numbers', function() {
        expect(Format.bigNumber('foo'))
          .toEqual('foo');

        // isNaN returns false for an empty string.. test that case
        expect(Format.bigNumber(''))
          .toEqual('');

        // Test if the original object reference is returned back
        var orig = {};
        expect(Format.bigNumber(orig))
          .toEqual(orig);
      });

      it('should format negative values', function() {
        expect(Format.bigNumber(-9999999999))
          .toEqual('-10.0B');
        expect(Format.bigNumber(-1000000))
          .toEqual('-1.0M');
        expect(Format.bigNumber(-100000))
          .toEqual('-100.0K');
        expect(Format.bigNumber(-999999))
          .toEqual('-1,000.0K');
        expect(Format.bigNumber(-1000))
          .toEqual('-1.0K');
      });

      it('should return the number if less than 1k', function() {
        expect(Format.bigNumber(0))
          .toEqual('0');
        expect(Format.bigNumber(1))
          .toEqual('1');
        expect(Format.bigNumber(5))
          .toEqual('5');
        expect(Format.bigNumber(50))
          .toEqual('50');
        expect(Format.bigNumber(500))
          .toEqual('500');
        expect(Format.bigNumber(999))
          .toEqual('999');
      });

      it('should round decimal numbers less than 1k', function () {
        expect(Format.bigNumber(-295.53582358235))
          .toEqual('-296');
      });
    });

    describe('phone', function() {
      it('should convert alpha', function() {
        expect(Format.phone('800-FOX-BORO', false))
          .toEqual('(800)-369-2676');
        expect(Format.phone('FOX-BORO', false))
          .toEqual('369-2676');
        expect(Format.phone('FOX-BORX', false))
          .toEqual('369-2679');
      });

      it('should support extensions', function() {
        expect(Format.phone('800-FOX-BOROx50', false))
          .toEqual('(800)-369-2676x50');
        expect(Format.phone('555-555-5555x8', false))
          .toEqual('(555)-555-5555x8');
      });
    });

    describe('currency', function() {
      it('should not format isNaN (undefined)', function() {
        expect(Format.currency())
          .toEqual(undefined);
      });

      it('should not format isNaN (null)', function() {
        expect(Format.currency(null))
          .toEqual(null);
      });

      it('should not format isNaN (string)', function() {
        expect(Format.currency('foo'))
          .toEqual('foo');
      });

      it('should should round using toFixed (round up)', function() {
        expect(Format.currency(12.558))
          .toEqual('12.56');
      });

      it('should should round using toFixed (round down)', function() {
        expect(Format.currency(12.554))
          .toEqual('12.55');
      });

      it('should should round using toFixed', function() {
        expect(Format.currency(12.555))
          .toEqual('12.55');
      });

      it('should group larger numbers', function() {
        expect(Format.currency(1294.55))
          .toEqual('1,294.55');
      });

      it('should use two significant digits', function() {
        expect(Format.currency(1294))
          .toEqual('1,294.00');
        expect(Format.currency(1294.5))
          .toEqual('1,294.50');
      });
    });

    describe('multiCurrency', function() {
      it('should format with code', function() {
        expect(Format.multiCurrency(12.55, 'USD'))
          .toEqual('12.55 USD');
      });
    });

    describe('nameLF', function() {
      var user = {
        FirstName: 'Bob',
        LastName: 'Smith'
      };

      it('should format a users last and first name with a comma', function() {
        expect(Format.nameLF(user))
          .toEqual('Smith, Bob');
        expect(Format.nameLF())
          .toEqual('');
        expect(Format.nameLF({
            FirstName: 'Bob'
          }))
          .toEqual('Bob');
      });
    });

    describe('mail', function() {
      it('should return an html mailto link', function() {
        expect(Format.mail('user@domain.test'))
          .toEqual('<a class="hyperlink" href="mailto:user@domain.test">user@domain.test</a>');
      });

      it('should not format non string values (number)', function() {
        expect(Format.mail(10))
          .toEqual(10);
      });

      it('should not format non string values (undefined)', function() {
        expect(Format.mail())
          .toEqual(undefined);
      });

      it('should not format non string values (null)', function() {
        expect(Format.mail(null))
          .toEqual(null);
      });
    });

    describe('userActivityStatus', function() {
      it('should format the activty status', function() {
        expect(Format.userActivityStatus('asAccepted'))
          .toEqual('Accepted');
        expect(Format.userActivityStatus('asUnconfirmed'))
          .toEqual('Unconfirmed');
        expect(Format.userActivityStatus('asDeclned'))
          .toEqual('Declined');
      });
    });

    describe('formatUserInitial', function() {
      it('should format the user\'s initials', function() {
        expect(Format.formatUserInitial('John Doe'))
          .toBe('JD');
        expect(Format.formatUserInitial('Doe, John'))
          .toBe('JD');
        expect(Format.formatUserInitial('John'))
          .toBe('J');
      });
    });

    describe('formatByUser', function() {
      it('should format the user\'s name', function() {
        expect(Format.formatByUser('Doe, John'))
          .toBe('John Doe');
        expect(Format.formatByUser('John Doe'))
          .toBe('John Doe');
        expect(Format.formatByUser('John'))
          .toBe('John');
      });
    });

    describe('relativeDate', function() {
      var date = new Date(Date.now());
      it('should show a relative date', function() {
        expect(Format.relativeDate(date))
          .toEqual('a few seconds ago');
      });

      it('should show a relative date using timeless', function() {
        expect(Format.relativeDate(date, true))
          .toMatch(/^in.+/);

        expect(Format.relativeDate(moment().subtract({days: 1}).toDate(), true))
          .toMatch(/^.+ago$/);
      });

      it('should handle an invalid date', function() {
        expect(Format.relativeDate(null)).toEqual('Invalid date');
      });
    });
  });
});
