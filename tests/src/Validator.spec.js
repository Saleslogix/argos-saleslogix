define('spec/Validator.spec', ['Mobile/SalesLogix/Validator'],function(Validator) {
    describe('Mobile/SalesLogix/Validator', function() {
        describe('exists', function() {
            it('not empty should exist', function() {
                expect(Validator.exists.fn('foo')).toEqual(false);
            });

            it('empty string should not exist', function() {
                expect(Validator.exists.fn('')).toEqual(true);
            });
        });

        describe('name', function() {
            it('should validate if first and last name are filled out', function() {
                expect(Validator.name.fn({ FirstName: 'foo', LastName: 'bar'})).toEqual(false);
            });

            it('should not validate if first and lastname are not filled out', function() {
                expect(Validator.name.fn(null)).toEqual(true);
                expect(Validator.name.fn({FirstName:'', LastName: 'bar'})).toEqual(true);
                expect(Validator.name.fn({FirstName:'foo', LastName: ''})).toEqual(true);
            });

            it('should validate if first and last name contain unicode', function() {
                expect(Validator.name.fn({ FirstName: '???????', LastName: '???????'})).toEqual(false);
            });
        });

        describe('notEmpty', function() {
            var regex = Validator.notEmpty.test;

            it('should not be empty', function() {
                expect('foo').toMatch(regex);
            });

            it('should not be empty unicode', function() {
                expect('???????').toMatch(regex);
            });

            it('should be empty', function() {
                expect('').not.toMatch(regex);
            });
        });

        describe('hasText', function() {
            var regex = Validator.hasText.test;

            it('should have text', function() {
                expect('foo').toMatch(regex);
            });

            it('should fail for all unicode (not supported)', function() {
                expect('???????').not.toMatch(regex);
            });

            it('should not have text', function() {
                expect('').not.toMatch(regex);
                expect('*&').not.toMatch(regex);
            });
        });
    });
});