define("crm/Views/Attachment/AddAttachment", ["exports", "dojo/_base/declare", "argos/Format", "argos/Views/FileSelect", "../../AttachmentManager", "../../Environment", "argos/I18n"], function (_exports, _declare, _Format, _FileSelect, _AttachmentManager, _Environment, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _Format = _interopRequireDefault(_Format);
  _FileSelect = _interopRequireDefault(_FileSelect);
  _AttachmentManager = _interopRequireDefault(_AttachmentManager);
  _Environment = _interopRequireDefault(_Environment);
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
  var resource = (0, _I18n["default"])('attachmentAdd');

  var __class = (0, _declare["default"])('crm.Views.Attachment.AddAttachment', [_FileSelect["default"]], {
    // Localization
    titleText: resource.titleText,
    // View Properties
    id: 'attachment_Add',
    onUploadFiles: function onUploadFiles() {
      var self = this;

      if (this._files && this._files.length > 0) {
        this.inherited(onUploadFiles, arguments);
        var fileItems = this.getFileItems();
        var am = new _AttachmentManager["default"]();

        am.onSuccessUpdate = function onSuccessUpdate() {
          _Environment["default"].refreshAttachmentViews();

          ReUI.back();
        };

        am.onFailedUpload = function onFailedUpload(errorMessage) {
          self.onUpdateFailed(errorMessage);
          alert(errorMessage); // eslint-disable-line

          ReUI.back();
        };

        am.onUpdateProgress = function onUpdateProgress(percent) {
          var msg = _Format["default"].percent(percent / 100);

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

  var _default = __class;
  _exports["default"] = _default;
});