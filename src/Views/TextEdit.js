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
import Edit from 'argos/Edit';
import getResource from 'argos/I18n';

const resource = getResource('textEdit');

/**
 * @class crm.Views.TextEdit
 *
 *
 * @extends argos.Edit
 *
 */
const __class = declare('crm.Views.TextEdit', [Edit], {
  // View Properties
  id: 'text_edit',
  titleText: resource.titleText,

  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      label: '',
      cls: 'note-text-row',
      name: 'Notes',
      type: 'textarea',
    }]);
  },
});

export default __class;
