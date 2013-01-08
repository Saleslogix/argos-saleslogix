define('spec/Format.spec', ['Mobile/SalesLogix/Format'],function(Format) {
    describe('Mobile/SalesLogix/Format', function() {
        describe('bigNumber', function() {
            it('should contain an M', function() {
                expect(Format.bigNumber(1000000)).toEqual('1.0M');
                expect(Format.bigNumber(9999999999)).toEqual('10,000.0M');
            });

            it('should contain a K', function() {
                expect(Format.bigNumber(100000)).toEqual('100.0K');
                expect(Format.bigNumber(999999)).toEqual('1,000.0K');
            });
        });
    });
});
