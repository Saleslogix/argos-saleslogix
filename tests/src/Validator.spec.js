/* eslint-disable */
define('spec/Validator.spec', ['Mobile/SalesLogix/Validator'], function(Validator) {
  describe('Mobile/SalesLogix/Validator', function() {
    describe('exists', function() {
      it('not empty should exist', function() {
        expect(Validator.exists.fn('foo'))
          .toEqual(false);
      });

      it('empty string should not exist', function() {
        expect(Validator.exists.fn(''))
          .toEqual(true);
      });
    });

    describe('picklistExists', function() {
      it('not empty should exist', function() {
        expect(Validator.picklistExists.fn('foo'))
          .toEqual(false);
      });

      it('empty string should not exist', function() {
        expect(Validator.picklistExists.fn(''))
          .toEqual(true);
      });

      it('empty key/text should not exist', function() {
        expect(Validator.picklistExists.fn({ key: '', text: '' }))
          .toEqual(true);
      });
    });

    describe('name', function() {
      it('should validate if first and last name are filled out', function() {
        expect(Validator.name.fn({
            FirstName: 'foo',
            LastName: 'bar'
          }))
          .toEqual(false);
      });

      it('should not validate if first and lastname are not filled out', function() {
        expect(Validator.name.fn(null))
          .toEqual(true);
        expect(Validator.name.fn({
            FirstName: '',
            LastName: 'bar'
          }))
          .toEqual(true);
        expect(Validator.name.fn({
            FirstName: 'foo',
            LastName: ''
          }))
          .toEqual(true);
      });

      it('should validate if first and last name contain unicode', function() {
        expect(Validator.name.fn({
            FirstName: 'тестпнч',
            LastName: 'тестпнч'
          }))
          .toEqual(false);
      });
    });

    describe('notEmpty', function() {
      var regex = Validator.notEmpty.test;

      it('should not be empty', function() {
        expect('foo')
          .toMatch(regex);
      });

      it('should not be empty unicode', function() {
        expect('тестпнч')
          .toMatch(regex);
      });

      it('should be empty', function() {
        expect('')
          .not.toMatch(regex);
      });
    });

    describe('hasText', function() {
      var regex = Validator.hasText.test;

      it('should have text', function() {
        expect('foo')
          .toMatch(regex);
      });

      it('should fail for all unicode (not supported)', function() {
        expect('тестпнч')
          .not.toMatch(regex);
      });

      it('should not have text', function() {
        expect('')
          .not.toMatch(regex);
        expect('*&')
          .not.toMatch(regex);
      });
    });

    describe('isInteger', function() {
      var regex = Validator.isInteger.test;

      it('should be an integer', function() {
        expect('10')
          .toMatch(regex);
      });

      it('should not be an integer', function() {
        expect('10.5')
          .not.toMatch(regex);
        expect('foo')
          .not.toMatch(regex);
      });
    });

    describe('isDecimal', function() {
      var regex = Validator.isDecimal.test;

      it('should be an decimal', function() {
        expect('10.55')
          .toMatch(regex);
      });

      it('should not be an decimal', function() {
        expect('foo')
          .not.toMatch(regex);
      });
    });

    describe('isCurrency', function() {
      it('should be currency', function() {
        expect(Validator.isCurrency.fn('10.50'))
          .toEqual(false);
      });

      it('should not be currency', function() {
        expect(Validator.isCurrency.fn('foo'))
          .toEqual(true);
      });

      it('should defualt to 2 decimal digits', function() {
        var original = Mobile.CultureInfo.numberFormat.currencyDecimalDigts;
        Mobile.CultureInfo.numberFormat.currencyDecimalDigits = false;
        expect(Validator.isCurrency.fn('10.40'))
          .toEqual(false);
        Mobile.CultureInfo.numberFormat.currencyDecimalDigts = original;
      });
    });

    describe('isInt32', function() {
      it('should be int32', function() {
        expect(Validator.isInt32.fn('10'))
          .toEqual(false);
        expect(Validator.isInt32.fn('2147483647'))
          .toEqual(false);
      });

      it('should not be int32', function() {
        expect(Validator.isInt32.fn('foo'))
          .toEqual(true);
        expect(Validator.isInt32.fn('10.50'))
          .toEqual(true);

        // Test an overflow
        expect(Validator.isInt32.fn('2147483648'))
          .toEqual(true);
      });
    });

    describe('exceedsMaxTextLength', function() {
      it('should validate max length', function() {
        // exceeds max length
        expect(Validator.exceedsMaxTextLength.fn('foo', {
            maxTextLength: '2'
          }))
          .toEqual(true);

        // equals max length
        expect(Validator.exceedsMaxTextLength.fn('foo', {
            maxTextLength: '3'
          }))
          .toEqual(false);

        // does not equal or exceed max length
        expect(Validator.exceedsMaxTextLength.fn('foo', {
            maxTextLength: '8'
          }))
          .toEqual(false);
      });
    });

    describe('isDateInRange', function() {
      var field = {
          minValue: (new Date(2000, 0, 1)),
          maxValue: (new Date(2013, 0, 1))
        },
        gt, lt, inRange;

      lt = new Date(1999, 0, 1);
      gt = new Date(2014, 0, 1);
      inRange = new Date(2005, 0, 1);

      it('should validate date is in range from today to one year from today', function() {
        expect(Validator.isDateInRange.fn(inRange, field))
          .toEqual(false);

        // Test min/max seperate like in the application
        expect(Validator.isDateInRange.fn(inRange, {
            maxValue: (new Date(2014, 0, 1))
          }))
          .toEqual(false);
        expect(Validator.isDateInRange.fn(inRange, {
            minValue: (new Date(2000, 0, 1))
          }))
          .toEqual(false);
      });

      it('should validate date is not in range from today to one year from today', function() {
        expect(Validator.isDateInRange.fn(lt, field))
          .toEqual(true);
        expect(Validator.isDateInRange.fn(gt, field))
          .toEqual(true);

        // Test min/max seperate like in the application
        expect(Validator.isDateInRange.fn(gt, {
            maxValue: (new Date(2013, 0, 1))
          }))
          .toEqual(true);
        expect(Validator.isDateInRange.fn(lt, {
            minValue: (new Date(2000, 0, 1))
          }))
          .toEqual(true);
      });

      it('should validate false if value is not a date', function() {
        expect(Validator.isDateInRange.fn(null, field))
          .toEqual(false);
      });
    });
  });
});
