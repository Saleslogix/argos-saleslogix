define('crm/Aggregate', ['exports', 'module', 'dojo/_base/lang', 'dojo/_base/array'], function (exports, module, _dojo_baseLang, _dojo_baseArray) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _array = _interopRequireDefault(_dojo_baseArray);

  /**
   * @class crm.Aggregate
   *
   * Aggregate functions. Currently used in metric widgets.
   *
   */
  var __class = _lang['default'].setObject('crm.Aggregate', {
    /**
     * Average
     * @param {Array} data Array of objects that contain a value property
     * @return {Number}
     */
    avg: function avg(data) {
      var aggr = window.crm.Aggregate;
      var average = aggr.sum(data) / aggr.count(data);
      return isNaN(average) ? 0 : average;
    },
    /**
     * Count
     * @param {Array} data Array of objects that contain a value property
     * @return {Number}
     */
    count: function count(data) {
      return data && data.length;
    },
    /**
     * First
     * @param {Array} data Array of objects that contain a value property
     * @returns
     * The first elements "value" property value
     */
    first: function first(data) {
      return data && data.length && data[0].value;
    },
    /**
     * Last
     * @param {Array} data Array of objects that contain a value property
     * @returns
     * The last elements "value" property value
     */
    last: function last(data) {
      return data && data.length && data[data.length - 1].value;
    },
    /**
     * Maximum
     * @param {Array} data Array of objects that contain a value property
     * @return {Number}
     */
    max: function max(data) {
      var flatten = _array['default'].map(data, function (item) {
        return item.value;
      });

      return Math.max.apply(null, flatten);
    },
    /**
     * Minimum
     * @param {Array} data Array of objects that contain a value property
     * @return {Number}
     */
    min: function min(data) {
      var flatten = _array['default'].map(data, function (item) {
        return item.value;
      });

      return flatten.length > 0 ? Math.min.apply(null, flatten) : 0;
    },
    /**
     * Sum
     * @param {Array} data Array of objects that contain a value property
     * @return {Number}
     */
    sum: function sum(data) {
      var total = 0;
      if (!Array.isArray(data)) {
        return total;
      }

      total = data.reduce(function (p, c) {
        return p + c.value;
      }, 0);

      return total;
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Aggregate', __class);
  module.exports = __class;
});
