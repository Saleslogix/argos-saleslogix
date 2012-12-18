define('spec/Aggregate.spec', ['Mobile/SalesLogix/Aggregate'],function(Aggregate) {
    var data = [
        { value: 2 },
        { value: 2 },
        { value: 3 },
        { value: 5 }
    ];

    describe('Mobile.SalesLogix.Aggregate sum', function() {
        it('should be 12', function() {
            expect(Aggregate.sum(data)).toEqual(12);
        });
    });

    describe('Mobile.SalesLogix.Aggregate avg', function() {
        it('should be 3', function() {
            expect(Aggregate.avg(data)).toEqual(3);
        });
    });

    describe('Mobile.SalesLogix.Aggregate max', function() {
        it('should be 5', function() {
            expect(Aggregate.max(data)).toEqual(5);
        });
    });

    describe('Mobile.SalesLogix.Aggregate min', function() {
        it('should be 2', function() {
            expect(Aggregate.min(data)).toEqual(2);
        });
    });

    describe('Mobile.SalesLogix.Aggregate count', function() {
        it('should be 4', function() {
            expect(Aggregate.count(data)).toEqual(4);
        });
    });

    describe('Mobile.SalesLogix.Aggregate first', function() {
        it('should be 2', function() {
            expect(Aggregate.first(data)).toEqual(2);
        });
    });

    describe('Mobile.SalesLogix.Aggregate last', function() {
        it('should be 5', function() {
            expect(Aggregate.last(data)).toEqual(5);
        });
    });
});
