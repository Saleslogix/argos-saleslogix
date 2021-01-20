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

import declare from 'dojo/_base/declare';
import sdkFormat from 'argos/Format';
import FileSelect from 'argos/Views/FileSelect';
import AttachmentManager from '../../AttachmentManager';
import Environment from '../../Environment';
import getResource from 'argos/I18n';

const resource = getResource('attachmentAdd');

const __class = declare('crm.Views.Attachment.AddAttachment', [FileSelect], {
  // Localization
  titleText: resource.titleText,

  // View Properties
  id: 'attachment_Add',

  onUploadFiles: function onUploadFiles() {
    const self = this;
    if (this._files && this._files.length > 0) {
      this.inherited(onUploadFiles, arguments);
      const fileItems = this.getFileItems();
      const am = new AttachmentManager();

      am.onSuccessUpdate = function onSuccessUpdate() {
        Environment.refreshAttachmentViews();
        ReUI.back();
      };

      am.onFailedUpload = function onFailedUpload(errorMessage) {
        self.onUpdateFailed(errorMessage);
        alert(errorMessage); // eslint-disable-line
        ReUI.back();
      };

      am.onUpdateProgress = function onUpdateProgress(percent) {
        const msg = sdkFormat.percent(percent / 100);
        self.onUpdateProgress(msg);
      };

      am.createAttachment(fileItems[0].file, {
        description: fileItems[0].description,
      });
    }
  },
  cancelSelect: function cancelSelect() {
    ReUI.back();
  },
});

export default __class;
