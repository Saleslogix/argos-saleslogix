define('crm/Fields/MultiCurrencyField', ['module', 'exports', 'dojo/_base/declare', 'argos/Fields/DecimalField', 'argos/FieldManager'], function (module, exports, _declare, _DecimalField, _FieldManager) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _DecimalField2 = _interopRequireDefault(_DecimalField);

  var _FieldManager2 = _interopRequireDefault(_FieldManager);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var control = (0, _declare2.default)('crm.Fields.MultiCurrencyField', [_DecimalField2.default], {
    attributeMap: {
      inputValue: {
        node: 'inputNode',
        type: 'attribute',
        attribute: 'value'
      },
      currencyCode: {
        node: 'currencyCodeNode',
        type: 'innerHTML'
      }
    },
    widgetTemplate: new Simplate(['<label for="{%= $.name %}">{%: $.label %}</label>', '{% if ($.enableClearButton && !$.readonly) { %}', '<button class="clear-button" data-dojo-attach-point="clearNode" data-dojo-attach-event="onclick:_onClearClick"></button>', '{% } %}', '<span data-dojo-attach-point="currencyCodeNode" class="currency-code-editlabel">{%: $.currencyCode %}</span>', '<input data-dojo-attach-point="inputNode" data-dojo-attach-event="onkeyup: _onKeyUp, onblur: _onBlur, onfocus: _onFocus" class="text-input" type="{%: $.inputType %}" name="{%= $.name %}" {% if ($.readonly) { %} readonly {% } %}>']),
    currencyCode: '',
    setCurrencyCode: function setCurrencyCode(code) {
      this.set('currencyCode', code);
    }
  }); /* Copyright 2017 Infor
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

  exports.default = _FieldManager2.default.register('multiCurrency', control);
  module.exports = exports['default'];
});