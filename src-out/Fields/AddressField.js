define('crm/Fields/AddressField', ['module', 'exports', 'dojo/_base/declare', 'argos/Fields/EditorField', 'argos/FieldManager', 'argos/I18n'], function (module, exports, _declare, _EditorField, _FieldManager, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _EditorField2 = _interopRequireDefault(_EditorField);

  var _FieldManager2 = _interopRequireDefault(_FieldManager);

  var _I18n2 = _interopRequireDefault(_I18n);

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

  const resource = (0, _I18n2.default)('addressField');

  const control = (0, _declare2.default)('crm.Fields.AddressField', [_EditorField2.default], {
    widgetTemplate: new Simplate([`<label for="{%= $.name %}">{%: $.label %}</label>
    <div class="field field-control-wrapper">
      <button
        class="button simpleSubHeaderButton field-control-trigger"
        aria-label="{%: $.lookupLabelText %}">
        <svg class="icon" focusable="false" aria-hidden="true" role="presentation">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-{%: $.iconClass %}"></use>
        </svg>
      </button>
      <label data-dojo-attach-point="inputNode"></label>
    </div>`]),
    iconClass: 'quick-edit',

    attributeMap: {
      addressContent: {
        node: 'inputNode',
        type: 'innerHTML'
      }
    },
    rows: 4,
    lookupLabelText: resource.lookupLabelText,
    emptyText: resource.emptyText,

    _enableTextElement: function _enableTextElement() {},
    _disableTextElement: function _disableTextElement() {},
    setText: function setText(text) {
      this.set('addressContent', text);
    }
  });

  exports.default = _FieldManager2.default.register('address', control);
  module.exports = exports['default'];
});