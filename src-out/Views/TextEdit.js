define('crm/Views/TextEdit', ['module', 'exports', 'dojo/_base/declare', 'argos/Edit', 'argos/I18n'], function (module, exports, _declare, _Edit, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('textEdit'); /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.Views.TextEdit', [_Edit2.default], {
    // View Properties
    id: 'text_edit',
    titleText: resource.titleText,

    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        label: '',
        cls: 'note-text-row',
        name: 'Notes',
        type: 'textarea'
      }]);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});