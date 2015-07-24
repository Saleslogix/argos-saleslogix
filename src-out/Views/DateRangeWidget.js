define('crm/Views/DateRangeWidget', ['exports'], function (exports) {
    /*
     * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
     */

    /**
     * @class crm.Views.rangeWidget
     *
     *
     * @requires argos._Templated
     * @requires argos.Store.SData
     *
     */
    define('crm/Views/DateRangeWidget', ['dojo/_base/declare', 'dojo/_base/lang', 'dojo/_base/array', 'dojo/Deferred', 'dojo/when', 'dojo/promise/all', 'dojo/dom-construct', 'dijit/_Widget', 'argos/_Templated'], function (declare, lang, array, Deferred, when, all, domConstruct, _Widget, _Templated) {
        var __class = declare('crm.Views.DateRangeWidget', [_Widget, _Templated], {
            /**
             * @property {Simplate}
             * Simple that defines the HTML Markup
            */
            widgetTemplate: new Simplate(['<div class="range-widget">', '<button data-dojo-attach-event="onclick:changeRange">', '<div data-dojo-attach-point="rangeDetailNode" class="range-detail">', '{%! $.itemTemplate %}', '</div>', '</button>', '</div>']),

            /**
             * @property {Simplate}
             * HTML markup for the range detail (name/value)
            */
            itemTemplate: new Simplate(['<span class="range-value">{%: $.value %} {%: $.valueUnit %}</span>']),

            // Localization
            value: '',

            // This is the onclick function that is to be overriden by the class that is using this widget
            changeRange: function changeRange() {}
        });

        lang.setObject('Mobile.SalesLogix.Views.DateRangeWidget', __class);
        return __class;
    });
});
