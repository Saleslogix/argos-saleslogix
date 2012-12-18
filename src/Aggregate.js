define('Mobile/SalesLogix/Aggregate', [
    'dojo/_base/lang',
    'dojo/_base/array'
], function(
    lang,
    array
) {
    return lang.setObject('Mobile.SalesLogix.Aggregate', lang.mixin({}, {
        avg: function(data) {
            var aggr = Mobile.SalesLogix.Aggregate;
            return aggr.sum(data) / aggr.count(data);
        },
        count: function(data) {
            return data && data.length;
        },
        first: function(data) {
            return data && data.length && data[0].value;
        },
        last: function(data) {
            return data && data.length && data[data.length - 1].value;
        },
        max: function(data) {
            var flatten = [];
            array.forEach(data, function(item) {
                flatten.push(item.value);
            });

            return Math.max.apply(null, flatten);
        },
        min: function(data) {
            var flatten = [];
            array.forEach(data, function(item) {
                flatten.push(item.value);
            });

            return Math.min.apply(null, flatten);
        },
        sum: function(data) {
            var total = 0;
            array.forEach(data, function(item) {
                total = total + item.value;
            }, this);

            return total;
        }
    }));
});
