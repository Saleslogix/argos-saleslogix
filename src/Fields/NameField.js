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
import lang from 'dojo/_base/lang';
import EditorField from 'argos/Fields/EditorField';
import FieldManager from 'argos/FieldManager';
import getResource from 'argos/I18n';

const resource = getResource('nameField');

const control = declare('crm.Fields.NameField', [EditorField], {
  // Localization
  emptyText: resource.emptyText,
  widgetTemplate: new Simplate([
    `<label for="{%= $.name %}"
      {% if ($.required) { %}
          class="required"
      {% } %}>{%: $.label %}</label>
    <div class="field field-control-wrapper">
      <button class="button simpleSubHeaderButton field-control-trigger
        aria-label="{%: $.lookupLabelText %}">
        <svg class="icon" focusable="false" aria-hidden="true" role="presentation">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-{%: $.iconClass %}"></use>
        </svg>
      </button>
      <input data-dojo-attach-point="inputNode" readonly="readonly" type="text" />
    </div>`,
  ]),

  iconClass: 'quick-edit',

  createNavigationOptions: function createNavigationOptions() {
    const options = this.inherited(arguments);
    // Name does not have an entity.
    delete options.entityName;

    return options;
  },
});

lang.setObject('Mobile.SalesLogix.Fields.NameField', control);
export default FieldManager.register('name', control);
