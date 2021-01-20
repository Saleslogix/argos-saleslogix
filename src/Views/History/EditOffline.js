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
import _EditBase from 'argos/_EditBase';
import MODEL_TYPES from 'argos/Models/Types';
import getResource from 'argos/I18n';
import MODEL_NAMES from '../../Models/Names';

const resource = getResource('historyEditOffline');

const __class = declare('crm.Views.History.EditOffline', [_EditBase], {
  // Localization
  titleText: resource.titleText,

  // View Properties
  id: 'history_edit_offline',
  entityName: 'History',
  resourceKind: 'history',

  getModel: function getModel() {
    const model = App.ModelManager.getModel(MODEL_NAMES.HISTORY, MODEL_TYPES.OFFLINE);
    return model;
  },
  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      title: resource.notesSectionText,
      name: 'NotesSection',
      children: [{
        name: 'Text',
        property: 'Text',
        label: resource.notesLabelText,
        cls: 'row-edit-text',
        type: 'textarea',
        autoFocus: true,
      }, {
        name: 'UID',
        property: 'UID',
        type: 'hidden',
      }],
    }]);
  },
  beforeTransitionTo: function beforeTransitionTo() {
    this.inherited(beforeTransitionTo, arguments);
    $(this.domNode).removeClass('panel-loading');
  },
  onTransitionTo: function onTransitionTo() {
    this.inherited(onTransitionTo, arguments);
    if (this.options.insert) {
      const now = Date.now();
      this.fields.UID.setValue(now);
    }
  },
});

export default __class;
