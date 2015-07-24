define('crm/Views/DateRangeWidget', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/_base/array', 'dojo/Deferred', 'dojo/when', 'dojo/promise/all', 'dojo/dom-construct', 'dijit/_Widget', 'argos/_Templated'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojo_baseArray, _dojoDeferred, _dojoWhen, _dojoPromiseAll, _dojoDomConstruct, _dijit_Widget, _argos_Templated) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    /*
     * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
     */

    /**
     * @class crm.Views.rangeWidget
     *
     *
     * @requires argos._Templated
     * @requires argos._Widget
     *
     */

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _array = _interopRequireDefault(_dojo_baseArray);

    var _Deferred = _interopRequireDefault(_dojoDeferred);

    var _when = _interopRequireDefault(_dojoWhen);

    var _all = _interopRequireDefault(_dojoPromiseAll);

    var _domConstruct = _interopRequireDefault(_dojoDomConstruct);

    var _Widget2 = _interopRequireDefault(_dijit_Widget);

    var _Templated2 = _interopRequireDefault(_argos_Templated);

    var __class = (0, _declare['default'])('crm.Views.DateRangeWidget', [_Widget2['default'], _Templated2['default']], {
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

    _lang['default'].setObject('Mobile.SalesLogix.Views.DateRangeWidget', __class);
    module.exports = __class;
});
