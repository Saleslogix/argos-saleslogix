define("crm/Integrations/BOE/DateRangeWidget", ["exports", "dojo/_base/declare", "dojo/_base/lang", "dijit/_Widget", "argos/_Templated"], function (_exports, _declare, _lang, _Widget2, _Templated2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _Widget2 = _interopRequireDefault(_Widget2);
  _Templated2 = _interopRequireDefault(_Templated2);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  /* Copyright 2017 Infor
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  var __class = (0, _declare["default"])('crm.Integrations.BOE.DateRangeWidget', [_Widget2["default"], _Templated2["default"]], {
    widgetTemplate: new Simplate(['<div class="range-widget">', '<button data-dojo-attach-event="onclick:changeRange">', '<div data-dojo-attach-point="rangeDetailNode" class="range-detail">', '{%! $.itemTemplate %}', '</div>', '</button>', '</div>']),

    /*
     * HTML markup for the range detail (name/value)
     */
    itemTemplate: new Simplate(['<span class="range-value">{%: $.value %} {%: $.valueUnit %}</span>']),
    // Localization
    value: '',
    // This is the onclick function that is to be overriden by the class that is using this widget
    changeRange: function changeRange() {}
  });

  _lang["default"].setObject('crm.Views.DateRangeWidget', __class);

  var _default = __class;
  _exports["default"] = _default;
});