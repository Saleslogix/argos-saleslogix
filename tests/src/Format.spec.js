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
    });
});
