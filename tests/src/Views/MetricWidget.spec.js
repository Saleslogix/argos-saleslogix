/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
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
    var data = json.parse(feed);

    describe('Mobile/SalesLogix/Views/MetricWidget', function() {
        it('should query a store when requesting data', function() {
            var store, widget;
            store = new MemoryStore({ data: data.$resources });
            widget = new MetricWidget({ store: store });

            spyOn(widget.store, 'query').andCallThrough();
            widget.requestData();
            expect(widget.store.query).toHaveBeenCalled();
        });

        it('should render an itemTemplate when requesting data completes', function() {
            runs(function() {
                this.store = new MemoryStore({ data: data.$resources });
                this.widget = new MetricWidget({ store: this.store });

                spyOn(this.widget.itemTemplate, 'apply').andCallThrough();
                this.widget.requestData();
            });

            waits(100);

            runs(function() {
                expect(this.widget.itemTemplate.apply).toHaveBeenCalled();
            });
        });
    });
});
