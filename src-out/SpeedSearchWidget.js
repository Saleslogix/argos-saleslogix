define('crm/SpeedSearchWidget', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/_base/event', 'dojo/dom-class', 'dijit/_Widget', 'argos/_Templated'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojo_baseEvent, _dojoDomClass, _dijit_Widget, _argos_Templated) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _event = _interopRequireDefault(_dojo_baseEvent);

    var _domClass = _interopRequireDefault(_dojoDomClass);

    var _Widget2 = _interopRequireDefault(_dijit_Widget);

    var _Templated2 = _interopRequireDefault(_argos_Templated);

    /**
     * @class crm.SpeedSearchWidget
     *
     * @mixins argos._Templated
     *
     */
    var __class = (0, _declare['default'])('crm.SpeedSearchWidget', [_Widget2['default'], _Templated2['default']], {
        /**
         * @property {Object} attributeMap
         */
        attributeMap: {
            queryValue: { node: 'queryNode', type: 'attribute', attribute: 'value' }
        },

        /**
         * @property {Simplate} widgetTemplate
         */
        widgetTemplate: new Simplate(['<div class="search-widget">', '<div class="table-layout">', '<div><input type="text" placeholder="{%= $.searchText %}" name="query" class="query" autocorrect="off" autocapitalize="off" data-dojo-attach-point="queryNode" data-dojo-attach-event="onfocus:_onFocus,onblur:_onBlur,onkeypress:_onKeyPress,onmouseup: _onMouseUp" /></div>', '</div>', '</div>']),
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
            _domClass['default'].remove(this.domNode, 'search-active');
            this.set('queryValue', '');
        },
        /**
         * Fires onSearchExpression using the current search query.
         */
        search: function search() {
            var queryTerm = this.getQuery();
            if (!_lang['default'].trim(queryTerm)) {
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
            _lang['default'].mixin(this, options);
        },
        _onClearClick: function _onClearClick(evt) {
            _event['default'].stop(evt);
            this.clear();
            this.queryNode.focus();
            this.queryNode.click();
        },
        _onBlur: function _onBlur() {
            _domClass['default'].toggle(this.domNode, 'search-active', !!this.queryNode.value);
        },
        _onFocus: function _onFocus() {
            _domClass['default'].add(this.domNode, 'search-active');
        },
        _onMouseUp: function _onMouseUp() {
            // Work around a chrome issue where mouseup after a focus will de-select the text
            setTimeout((function () {
                this.queryNode.setSelectionRange(0, 9999);
            }).bind(this), 50);
        },
        _onKeyPress: function _onKeyPress(evt) {
            if (evt.keyCode === 13 || evt.keyCode === 10) {
                _event['default'].stop(evt);
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
        }
    });

    _lang['default'].setObject('Mobile.SalesLogix.SpeedSearchWidget', __class);
    module.exports = __class;
});
