define('spec/Format.spec', ['Mobile/SalesLogix/Format'],function(Format) {
    // Verify the the argos-saleslogix version of these work OK - SDK really contains the phone formatter.
    describe('Mobile/SalesLogix/Format', function() {
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
    });
});
