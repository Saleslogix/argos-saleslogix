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
import AttachmentList from './List';
import getResource from 'argos/I18n';

const resource = getResource('attachmentMyList');

const __class = declare('crm.Views.Attachment.MyAttachmentList', [AttachmentList], {
  id: 'myattachment_list',
  titleText: resource.titleText,
  queryWhere: function queryWhere() {
    const q = this._formatUserKey(App.context.user.$key);
    return `createUser eq "${q}"`;
  },
  _formatUserKey: function _formatUserKey(userKey) {
    let key = userKey;
    if (key === 'ADMIN') {
      key = 'ADMIN       '; // The attachment feed is picky and requires the Admin key to be padded to a 12 char.
    }
    return key;
  },
});

export default __class;
