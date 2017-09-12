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
import View from 'argos/View';
import getResource from 'argos/I18n';

const resource = getResource('logOff');

const __class = declare('crm.Views.LogOff', [View], {
  // Templates
  widgetTemplate: new Simplate([
    '<div class="panel">',
    '<div class="wrapper">',
    '<div data-title="{%: $.titleText %}" class="signin {%= $.cls %}" hideBackButton="true">',
    '<p>{%= $.messageText %}</p>',
    '<p><a href="#" class="hyperlink" data-action="login">{%: $.loginText %}</a></p>',
    '</div>',
    '</div>',
    '</div>',
  ]),

  // Localization
  messageText: resource.messageText,
  loginText: resource.loginText,
  titleText: resource.titleText,

  id: 'logoff',

  login: function login() {
    window.location.reload();
  },

  createToolLayout: function createToolLayout() {
    return this.tools || (this.tools = {
      bbar: false,
      tbar: false,
    });
  },
});

lang.setObject('Mobile.SalesLogix.Views.LogOff', __class);
export default __class;
