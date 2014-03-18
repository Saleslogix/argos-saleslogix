/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.SpeedSearchWidget
 *
 * @mixins Sage.Platform.Mobile._Templated
 *
 */
define('Mobile/SalesLogix/SpeedSearchWidget', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/event',
    'dojo/dom-class',
    'dijit/_Widget',
    'Sage/Platform/Mobile/_Templated'
], function(
    declare,
    lang,
    event,
    domClass,
    _Widget,
    _Templated
) {
    return declare('Mobile.SalesLogix.SpeedSearchWidget', [_Widget, _Templated], {
        /**
         * @property {Object} attributeMap
         */
        attributeMap: {
            queryValue: {node: 'queryNode', type: 'attribute', attribute: 'value'}
        },

        /**
         * @property {Simplate} widgetTemplate
         */
        widgetTemplate: new Simplate([
            '<div class="search-widget">',
            '<div class="table-layout">',
                '<div><input type="text" placeholder="{%= $.searchText %}" name="query" class="query" autocorrect="off" autocapitalize="off" data-dojo-attach-point="queryNode" data-dojo-attach-event="onfocus:_onFocus,onblur:_onBlur,onkeypress:_onKeyPress" /></div>',
                '<div class="hasButton"><button class="clear-button" tabindex="-1" data-dojo-attach-event="onclick: _onClearClick"></button></div>',
                '<div class="hasButton"><button class="subHeaderButton searchButton" data-dojo-attach-event="click: search">{%= $.searchText %}</button></div>',
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

        _setQueryValueAttr: function(value) {
            this._onFocus();
            this.queryNode.value = value;
        },
        /**
         * Clears the current search query.
         */
        clear: function() {
            domClass.remove(this.domNode, 'search-active');
            this.set('queryValue', '');
        },
        /**
         * Fires onSearchExpression using the current search query.
         */
        search: function() {
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
        getQuery: function() {
            return this.queryNode.value;
        },
        configure: function(options) {
            lang.mixin(this, options);
        },
        _onClearClick: function(evt) {
            event.stop(evt);
            this.clear();
            this.queryNode.focus();
            this.queryNode.click();
        },
        _onBlur: function() {
            domClass.toggle(this.domNode, 'search-active', !!this.queryNode.value);
        },
        _onFocus: function() {
            domClass.add(this.domNode, 'search-active');
        },
        _onKeyPress: function(evt) {
            if (evt.keyCode == 13 || evt.keyCode == 10) {
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
        onSearchExpression: function(expression, widget) {
        }
    });
});

