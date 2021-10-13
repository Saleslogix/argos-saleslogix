define('crm/Views/Attachment/AddAttachment', ['module', 'exports', 'dojo/_base/declare', 'argos/Format', 'argos/Views/FileSelect', '../../AttachmentManager', '../../Environment', 'argos/I18n'], function (module, exports, _declare, _Format, _FileSelect, _AttachmentManager, _Environment, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Format2 = _interopRequireDefault(_Format);

  var _FileSelect2 = _interopRequireDefault(_FileSelect);

  var _AttachmentManager2 = _interopRequireDefault(_AttachmentManager);

  var _Environment2 = _interopRequireDefault(_Environment);

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

  const resource = (0, _I18n2.default)('attachmentAdd');

  const __class = (0, _declare2.default)('crm.Views.Attachment.AddAttachment', [_FileSelect2.default], {
    // Localization
    titleText: resource.titleText,

    // View Properties
    id: 'attachment_Add',

    onUploadFiles: function onUploadFiles() {
      const self = this;
      if (this._files && this._files.length > 0) {
        this.inherited(onUploadFiles, arguments);
        const fileItems = this.getFileItems();
        const am = new _AttachmentManager2.default();

        am.onSuccessUpdate = function onSuccessUpdate() {
          _Environment2.default.refreshAttachmentViews();
          ReUI.back();
        };

        am.onFailedUpload = function onFailedUpload(errorMessage) {
          self.onUpdateFailed(errorMessage);
          alert(errorMessage); // eslint-disable-line
          ReUI.back();
        };

        am.onUpdateProgress = function onUpdateProgress(percent) {
          const msg = _Format2.default.percent(percent / 100);
          self.onUpdateProgress(msg);
        };

        am.createAttachment(fileItems[0].file, {
          description: fileItems[0].description
        });
      }
    },
    cancelSelect: function cancelSelect() {
      ReUI.back();
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});