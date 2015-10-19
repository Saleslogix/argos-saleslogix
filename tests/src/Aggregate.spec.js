/* eslint-disable */
define('spec/Aggregate.spec', ['Mobile/SalesLogix/Aggregate'], function(Aggregate) {
  describe('Mobile/SalesLogix/Aggregate', function() {
    var data = [{
      value: 2
    }, {
      value: 2
    }, {
      value: 3
    }, {
      value: 5
    }];

    describe('sum', function() {
      it('should be 12', function() {
        expect(Aggregate.sum(data))
          .toEqual(12);
      });
    });

    describe('avg', function() {
      it('should be 3', function() {
        expect(Aggregate.avg(data))
          .toEqual(3);
      });

      it('should be 0', function() {
        expect(Aggregate.avg([]))
          .toEqual(0);
      });
    });

    describe('max', function() {
      it('should be 5', function() {
        expect(Aggregate.max(data))
          .toEqual(5);
      });
    });

    describe('min', function() {
      it('should be 2', function() {
        expect(Aggregate.min(data))
          .toEqual(2);
      });

      it('should be 0', function() {
        expect(Aggregate.min([]))
          .toEqual(0);
      });
    });

    describe('count', function() {
      it('should be 4', function() {
        expect(Aggregate.count(data))
          .toEqual(4);
      });
    });

    describe('first', function() {
      it('should be 2', function() {
        expect(Aggregate.first(data))
          .toEqual(2);
      });
    });

    describe('last', function() {
      it('should be 5', function() {
        expect(Aggregate.last(data))
          .toEqual(5);
      });
    });
  });
});
