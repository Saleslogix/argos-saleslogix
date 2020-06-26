define("crm/Views/Attachment/MyAttachmentList", ["exports", "dojo/_base/declare", "./List", "argos/I18n"], function (_exports, _declare, _List, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _List = _interopRequireDefault(_List);
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
  var resource = (0, _I18n["default"])('attachmentMyList');

  var __class = (0, _declare["default"])('crm.Views.Attachment.MyAttachmentList', [_List["default"]], {
    id: 'myattachment_list',
    titleText: resource.titleText,
    queryWhere: function queryWhere() {
      var q = this._formatUserKey(App.context.user.$key);

      return "createUser eq \"".concat(q, "\"");
    },
    _formatUserKey: function _formatUserKey(userKey) {
      var key = userKey;

      if (key === 'ADMIN') {
        key = 'ADMIN       '; // The attachment feed is picky and requires the Admin key to be padded to a 12 char.
      }

      return key;
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});