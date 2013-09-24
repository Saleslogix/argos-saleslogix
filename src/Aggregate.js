/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Aggregate', [
    'dojo/_base/lang',
    'dojo/_base/array'
], function(
    lang,
    array
) {
    var results = lang.setObject('Mobile.SalesLogix.Aggregate', {
        avg: function(data) {
            var aggr = Mobile.SalesLogix.Aggregate, results;
            results = aggr.sum(data) / aggr.count(data);
            return isNaN(results) ? 0 : results;
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

            return flatten.length > 0 ? Math.min.apply(null, flatten) : 0;
        },
        sum: function(data) {
            var total = 0;
            array.forEach(data, function(item) {
                total = total + item.value;
            }, this);

            return total;
        }
    });

    return results;
});

