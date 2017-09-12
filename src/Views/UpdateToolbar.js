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
import MainToolbar from 'argos/MainToolbar';
import getResource from 'argos/I18n';

const resource = getResource('updateToolbar');

/**
 * @class crm.Views.UpdateToolbar
 *
 *
 * @extends argos.MainToolbar
 *
 */
const __class = declare('crm.Views.UpdateToolbar', [MainToolbar], {
  widgetTemplate: new Simplate([
    '<div class="update-toolbar">',
    '<h1 data-action="reload">{%= $.updateText %}</h1>',
    '</div>',
  ]),

  updateText: resource.updateText,

  managed: false,

  show: function show() {
    $('body').addClass('update-available');

    this.showTools([{
      id: 'cancel',
      side: 'right',
      fn: this.cancel,
      scope: this,
    }]);

    this.inherited(arguments);
  },

  showTools: function showTools() {
    this.inherited(arguments);
  },

  hide: function hide() {
    $('body').removeClass('update-available');
  },
  reload: function reload() {
    App.reload();
  },
  cancel: function cancel() {
    this.hide();
  },
});

lang.setObject('Mobile.SalesLogix.Views.UpdateToolbar', __class);
export default __class;
