define('crm/Views/Attachment/MyAttachmentList', ['module', 'exports', 'dojo/_base/declare', './List', 'argos/I18n'], function (module, exports, _declare, _List, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _List2 = _interopRequireDefault(_List);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('attachmentMyList');

  /**
   * @class crm.Views.Attachments.MyAttachmentList
   *
   * @extends crm.Views.Attachments.List
   *
   * @requires crm.Format
   * @requires crm.Views.Attachments.List
   *
   */
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

  var __class = (0, _declare2.default)('crm.Views.Attachment.MyAttachmentList', [_List2.default], {
    id: 'myattachment_list',
    titleText: resource.titleText,
    queryWhere: function queryWhere() {
      var q = this._formatUserKey(App.context.user.$key);
      return 'createUser eq "' + q + '"';
    },
    _formatUserKey: function _formatUserKey(userKey) {
      var key = userKey;
      if (key === 'ADMIN') {
        key = 'ADMIN       '; // The attachment feed is picky and requires the Admin key to be padded to a 12 char.
      }
      return key;
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});