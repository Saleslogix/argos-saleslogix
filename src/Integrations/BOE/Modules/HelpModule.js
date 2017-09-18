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
import _Module from './_Module';
import getResource from 'argos/I18n';

const resource = getResource('helpModule');

const __class = declare('crm.Integrations.BOE.Modules.HelpModule', [_Module], {
  sectionTitleText: resource.sectionTitleText,
  init: function init() {
  },
  loadViews: function loadViews() {
  },
  loadCustomizations: function loadCustomizations() {
    const am = this.applicationModule;
    const onHelpRowCreated = crm.Views.Help.prototype.onHelpRowCreated;
    am.registerCustomization('detail', 'help', {
      at: (row) => {
        return row.name === 'HelpSection';
      },
      type: 'insert',
      where: 'after',
      value: {
        title: this.sectionTitleText,
        name: 'BOEHelpSection',
        children: [{
          name: 'BOEHelp',
          devRoot: 'argos-icboe',
          baseUrl: 'help/locales/icboe',
          fileName: 'help.html',
          defaultUrl: 'help/locales/icboe/en/help.html',
          onCreate: onHelpRowCreated,
        }],
      },
    });
  },
  loadToolbars: function loadToolbars() {
  },
});

lang.setObject('icboe.Modules.HelpModule', __class);
export default __class;
