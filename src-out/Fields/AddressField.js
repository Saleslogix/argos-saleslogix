define("crm/Fields/AddressField", ["exports", "dojo/_base/declare", "argos/Fields/EditorField", "argos/FieldManager", "argos/I18n"], function (_exports, _declare, _EditorField, _FieldManager, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _EditorField = _interopRequireDefault(_EditorField);
  _FieldManager = _interopRequireDefault(_FieldManager);
  _I18n = _interopRequireDefault(_I18n);

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
  var resource = (0, _I18n["default"])('addressField');
  var control = (0, _declare["default"])('crm.Fields.AddressField', [_EditorField["default"]], {
    widgetTemplate: new Simplate(["<label for=\"{%= $.name %}\">{%: $.label %}</label>\n    <div class=\"field field-control-wrapper\">\n      <button\n        class=\"button simpleSubHeaderButton field-control-trigger\"\n        aria-label=\"{%: $.lookupLabelText %}\">\n        <svg class=\"icon\" focusable=\"false\" aria-hidden=\"true\" role=\"presentation\">\n          <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-{%: $.iconClass %}\"></use>\n        </svg>\n      </button>\n      <label data-dojo-attach-point=\"inputNode\"></label>\n    </div>"]),
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

  var _default = _FieldManager["default"].register('address', control);

  _exports["default"] = _default;
});