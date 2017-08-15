/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class crm.Integrations.BOE.DateRangeWidget
 */
import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _Widget from 'dijit/_Widget';
import _Templated from 'argos/_Templated';

const __class = declare('crm.Integrations.BOE.DateRangeWidget', [_Widget, _Templated], /** @lends crm.Integrations.BOE.DateRangeWidget# */{
    /**
     * @property {Simplate}
     * Simple that defines the HTML Markup
    */
  widgetTemplate: new Simplate([
    '<div class="range-widget">',
    '<button data-dojo-attach-event="onclick:changeRange">',
    '<div data-dojo-attach-point="rangeDetailNode" class="range-detail">',
    '{%! $.itemTemplate %}',
    '</div>',
    '</button>',
    '</div>',
  ]),

    /**
     * @property {Simplate}
     * HTML markup for the range detail (name/value)
    */
  itemTemplate: new Simplate([
    '<span class="range-value">{%: $.value %} {%: $.valueUnit %}</span>',
  ]),

    // Localization
  value: '',

    // This is the onclick function that is to be overriden by the class that is using this widget
  changeRange: function changeRange() {
  },
});

lang.setObject('Mobile.SalesLogix.Views.DateRangeWidget', __class);
lang.setObject('crm.Views.DateRangeWidget', __class);
export default __class;
