define('crm/Fields/NameField', ['module', 'exports', 'dojo/_base/declare', 'argos/Fields/EditorField', 'argos/FieldManager', 'argos/I18n'], function (module, exports, _declare, _EditorField, _FieldManager, _I18n) {
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

  var resource = (0, _I18n2.default)('nameField');

  var control = (0, _declare2.default)('crm.Fields.NameField', [_EditorField2.default], {
    // Localization
    emptyText: resource.emptyText,
    widgetTemplate: new Simplate(['<label for="{%= $.name %}"\n      {% if ($.required) { %}\n          class="required"\n      {% } %}>{%: $.label %}</label>\n    <div class="field field-control-wrapper">\n      <button class="button simpleSubHeaderButton field-control-trigger\n        aria-label="{%: $.lookupLabelText %}">\n        <svg class="icon" focusable="false" aria-hidden="true" role="presentation">\n          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-{%: $.iconClass %}"></use>\n        </svg>\n      </button>\n      <input data-dojo-attach-point="inputNode" readonly="readonly" type="text" />\n    </div>']),

    iconClass: 'quick-edit',

    createNavigationOptions: function createNavigationOptions() {
      var options = this.inherited(createNavigationOptions, arguments);
      // Name does not have an entity.
      delete options.entityName;

      return options;
    }
  });

  exports.default = _FieldManager2.default.register('name', control);
  module.exports = exports['default'];
});