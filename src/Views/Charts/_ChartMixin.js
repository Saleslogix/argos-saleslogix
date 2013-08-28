/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/Charts/_ChartMixin', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/dom-geometry',
    'dojo/dom-attr'
], function(
    declare,
    lang,
    array,
    domGeo,
    domAttr
) {
    return declare('Mobile.SalesLogix.Views.Charts.GenericBar', null, {
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

