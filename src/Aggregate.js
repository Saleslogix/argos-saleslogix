import lang from 'dojo/_base/lang';
import array from 'dojo/_base/array';

/**
* @class crm.Aggregate
*
* Aggregate functions. Currently used in metric widgets.
*
*/
var results = lang.setObject('crm.Aggregate', {
    /**
     * Average
     * @param {Array} data Array of objects that contain a value property
     * @return {Number}
     */
    avg: function(data) {
        var aggr = crm.Aggregate, results;
        results = aggr.sum(data) / aggr.count(data);
        return isNaN(results) ? 0 : results;
    },
    /**
     * Count
     * @param {Array} data Array of objects that contain a value property
     * @return {Number}
     */
    count: function(data) {
        return data && data.length;
    },
    /**
     * First
     * @param {Array} data Array of objects that contain a value property
     * @returns
     * The first elements "value" property value
     */
    first: function(data) {
        return data && data.length && data[0].value;
    },
    /**
     * Last
     * @param {Array} data Array of objects that contain a value property
     * @returns
     * The last elements "value" property value
     */
    last: function(data) {
        return data && data.length && data[data.length - 1].value;
    },
    /**
     * Maximum
     * @param {Array} data Array of objects that contain a value property
     * @return {Number}
     */
    max: function(data) {
        var flatten = [];
        array.forEach(data, function(item) {
            flatten.push(item.value);
        });

        return Math.max.apply(null, flatten);
    },
    /**
     * Minimum
     * @param {Array} data Array of objects that contain a value property
     * @return {Number}
     */
    min: function(data) {
        var flatten = [];
        array.forEach(data, function(item) {
            flatten.push(item.value);
        });

        return flatten.length > 0 ? Math.min.apply(null, flatten) : 0;
    },
    /**
     * Sum
     * @param {Array} data Array of objects that contain a value property
     * @return {Number}
     */
    sum: function(data) {
        var total = 0;
        array.forEach(data, function(item) {
            total = total + item.value;
        }, this);

        return total;
    }
});

lang.setObject('Mobile.SalesLogix.Aggregate', results);
export default results;
