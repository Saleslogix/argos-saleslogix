import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import event from 'dojo/_base/event';
import domClass from 'dojo/dom-class';
import _Widget from 'dijit/_Widget';
import _Templated from 'argos/_Templated';

/**
 * @class crm.SpeedSearchWidget
 *
 * @mixins argos._Templated
 *
 */
const __class = declare('crm.SpeedSearchWidget', [_Widget, _Templated], {
  /**
   * @property {Object} attributeMap
   */
  attributeMap: {
    queryValue: {
      node: 'queryNode',
      type: 'attribute',
      attribute: 'value',
    },
  },

  /**
   * @property {Simplate} widgetTemplate
   */
  widgetTemplate: new Simplate([
    '<div class="search-widget">',
    '<div class="table-layout">',
    '<div><input type="text" placeholder="{%= $.searchText %}" name="query" class="query" autocorrect="off" autocapitalize="off" data-dojo-attach-point="queryNode" data-dojo-attach-event="onfocus:_onFocus,onblur:_onBlur,onkeypress:_onKeyPress,onmouseup: _onMouseUp" /></div>',
    '</div>',
    '</div>',
  ]),
  /**
   * @property {DOMNode} queryNode HTML input node. The dojo attach point.
   */
  queryNode: null,

  /**
   * @property {String} searchText The placeholder text for the input.
   */
  searchText: 'SpeedSearch',

  _setQueryValueAttr: function _setQueryValueAttr(value) {
    this._onFocus();
    this.queryNode.value = value;
  },
  /**
   * Clears the current search query.
   */
  clear: function clear() {
    domClass.remove(this.domNode, 'search-active');
    this.set('queryValue', '');
  },
  /**
   * Fires onSearchExpression using the current search query.
   */
  search: function search() {
    const queryTerm = this.getQuery();
    if (!lang.trim(queryTerm)) {
      return;
    }

    this.onSearchExpression(queryTerm, this);
  },
  /**
   * Returns the current search query.
   * @returns {String}
   */
  getQuery: function getQuery() {
    return this.queryNode.value;
  },
  configure: function configure(options) {
    lang.mixin(this, options);
  },
  _onClearClick: function _onClearClick(evt) {
    event.stop(evt);
    this.clear();
    this.queryNode.focus();
    this.queryNode.click();
  },
  _onBlur: function _onBlur() {
    domClass.toggle(this.domNode, 'search-active', !!this.queryNode.value);
  },
  _onFocus: function _onFocus() {
    domClass.add(this.domNode, 'search-active');
  },
  _onMouseUp: function _onMouseUp() {
    // Work around a chrome issue where mouseup after a focus will de-select the text
    setTimeout(function onMouseUp() {
      this.queryNode.setSelectionRange(0, 9999);
    }.bind(this), 50);
  },
  _onKeyPress: function _onKeyPress(evt) {
    if (evt.keyCode === 13 || evt.keyCode === 10) {
      event.stop(evt);
      this.queryNode.blur();
      this.search();
    }
  },
  /**
   * The event that fires when the search widget provides an explicit search query
   * @param {String} expression
   * @param {Object} widget
   */
  onSearchExpression: function onSearchExpression() {},
  getFormattedSearchQuery: function getFormattedSearchQuery() {
    return null;
  },
});

lang.setObject('Mobile.SalesLogix.SpeedSearchWidget', __class);
export default __class;
