define('crm/Integrations/BOE/DateRangeWidget', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'dijit/_Widget', 'argos/_Templated'], function (module, exports, _declare, _lang, _Widget2, _Templated2) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Widget3 = _interopRequireDefault(_Widget2);

  var _Templated3 = _interopRequireDefault(_Templated2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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
  var __class = (0, _declare2.default)('crm.Integrations.BOE.DateRangeWidget', [_Widget3.default, _Templated3.default], {
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

  _lang2.default.setObject('crm.Views.DateRangeWidget', __class);
  exports.default = __class;
  module.exports = exports['default'];
});