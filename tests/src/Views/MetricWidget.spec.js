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

    describe('Mobile.SalesLogix.Views.MetricWidget', function() {
        it('should be true', function() {
            var widget = new MetricWidget();
            widget.createStore = function() {
                return new MemoryStore({ data: data.$resources });
            };

            spyOn(widget, 'createStore');

            //widget.requestData();
            //expect(widget.createStore).toHaveBeenCalled();
        });
    });
});
