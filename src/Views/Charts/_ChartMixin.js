/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/Charts/_ChartMixin', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/_base/connect',
    'dojo/dom-geometry',
    'dojo/dom-attr'
], function(
    declare,
    lang,
    array,
    connect,
    domGeo,
    domAttr
) {
    return declare('Mobile.SalesLogix.Views.Charts._ChartMixin', null, {
        _handle: null,
        _feedData: null,

        onTransitionTo: function() {
            this._handle = connect.subscribe('/app/setOrientation', this, function(value) {
                if (this._feedData) {
                    this.createChart(this._feedData);
                }
            });
        },
        onTransitionAway: function() {
            connect.unsubscribe(this._handle);
            this._feedData = null;
        },
        createChart: function(feedData) {
            this._feedData = feedData;
        },
        getTag: function() {
            return this.options && this.options.returnTo;
        },

        getSearchExpression: function() {
            return this.options && this.options.currentSearchExpression;
        },

        showSearchExpression: function() {
            var html;
            html = '<div>' + this.getSearchExpression() + '</div>';
            domAttr.set(this.searchExpressionNode, { innerHTML: html });
        },

        getSearchExpressionHeight: function() {
            var box = domGeo.getMarginBox(this.searchExpressionNode);
            return box.h;
        }
    });
});

