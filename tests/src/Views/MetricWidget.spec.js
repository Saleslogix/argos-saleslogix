/* eslint-disable */
define('spec/Views/MetricWidget.spec', [
  'dojo/json',
  'dojo/store/Memory',
  'dojo/text!spec/feeds/metric1.json',
  'Mobile/SalesLogix/Views/MetricWidget'
], function(
  json,
  MemoryStore,
  feed,
  MetricWidget
) {

  const data = JSON.parse(feed);

  describe('Mobile/SalesLogix/Views/MetricWidget', function() {
    it('should query a store when requesting data', function() {
      var store, widget;
      store = new MemoryStore({
        data: data.$resources,
        aggregate: 'sum',
        formatter: 'bigNumber',
      });
      widget = new MetricWidget({
        store: store,
        aggregate: 'sum',
        formatter: 'bigNumber',
      });

      spyOn(widget.store, 'query')
        .and.callThrough();
      widget.requestData();
      expect(widget.store.query)
        .toHaveBeenCalled();
    });

    describe('should render an itemTemplate when requesting data completes', function() {
      beforeEach(function(done) {
        this.store = new MemoryStore({
          data: data.$resources,
          aggregate: 'sum',
          formatter: 'bigNumber',
        });
        this.widget = new MetricWidget({
          store: this.store,
          aggregate: 'sum',
          formatter: 'bigNumber',
        });

        spyOn(this.widget.itemTemplate, 'apply')
          .and.callThrough();
        this.widget.requestData();
        setTimeout(function() {
          done();
        }, 100);
      });


      it('should call apply on itemTemplate', function(done) {
        expect(this.widget.itemTemplate.apply)
          .toHaveBeenCalled();
        done();
      });
    });
  });
});
