/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
/**
 * @class crm.SpeedSearchWidget
 *
 * @mixins argos._Templated
 *
 */
define('crm/SpeedSearchWidget', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/event',
    'dojo/dom-class',
    'dijit/_Widget',
    'argos/_Templated'
], function (declare, lang, event, domClass, _Widget, _Templated) {
    var __class = declare('crm.SpeedSearchWidget', [_Widget, _Templated], {
        /**
         * @property {Object} attributeMap
         */
        attributeMap: {
            queryValue: { node: 'queryNode', type: 'attribute', attribute: 'value' }
        },
        /**
         * @property {Simplate} widgetTemplate
         */
        widgetTemplate: new Simplate([
            '<div class="search-widget">',
            '<div class="table-layout">',
            '<div><input type="text" placeholder="{%= $.searchText %}" name="query" class="query" autocorrect="off" autocapitalize="off" data-dojo-attach-point="queryNode" data-dojo-attach-event="onfocus:_onFocus,onblur:_onBlur,onkeypress:_onKeyPress,onmouseup: _onMouseUp" /></div>',
            '</div>',
            '</div>'
        ]),
        /**
         * @property {DOMNode} queryNode HTML input node. The dojo attach point.
         */
        queryNode: null,
        /**
         * @property {String} searchText The placeholder text for the input.
         */
        searchText: 'SpeedSearch',
        _setQueryValueAttr: function (value) {
            this._onFocus();
            this.queryNode.value = value;
        },
        /**
         * Clears the current search query.
         */
        clear: function () {
            domClass.remove(this.domNode, 'search-active');
            this.set('queryValue', '');
        },
        /**
         * Fires onSearchExpression using the current search query.
         */
        search: function () {
            var queryTerm = this.getQuery();
            if (!lang.trim(queryTerm)) {
                return;
            }
            this.onSearchExpression(queryTerm, this);
        },
        /**
         * Returns the current search query.
         * @returns {String}
         */
        getQuery: function () {
            return this.queryNode.value;
        },
        configure: function (options) {
            lang.mixin(this, options);
        },
        _onClearClick: function (evt) {
            event.stop(evt);
            this.clear();
            this.queryNode.focus();
            this.queryNode.click();
        },
        _onBlur: function () {
            domClass.toggle(this.domNode, 'search-active', !!this.queryNode.value);
        },
        _onFocus: function () {
            domClass.add(this.domNode, 'search-active');
        },
        _onMouseUp: function () {
            // Work around a chrome issue where mouseup after a focus will de-select the text
            setTimeout(function () {
                this.queryNode.setSelectionRange(0, 9999);
            }.bind(this), 50);
        },
        _onKeyPress: function (evt) {
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
        onSearchExpression: function () {
        },
        getFormattedSearchQuery: function () {
            return null;
        }
    });
    lang.setObject('Mobile.SalesLogix.SpeedSearchWidget', __class);
    return __class;
});
