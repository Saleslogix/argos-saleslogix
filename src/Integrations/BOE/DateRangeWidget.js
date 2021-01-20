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
import _Widget from 'dijit/_Widget';
import _Templated from 'argos/_Templated';

const __class = declare('crm.Integrations.BOE.DateRangeWidget', [_Widget, _Templated], {
  widgetTemplate: new Simplate([
    '<div class="range-widget">',
    '<button data-dojo-attach-event="onclick:changeRange">',
    '<div data-dojo-attach-point="rangeDetailNode" class="range-detail">',
    '{%! $.itemTemplate %}',
    '</div>',
    '</button>',
    '</div>',
  ]),

  /*
   * HTML markup for the range detail (name/value)
   */
  itemTemplate: new Simplate([
    '<span class="range-value">{%: $.value %} {%: $.valueUnit %}</span>',
  ]),

  // Localization
  value: '',

  // This is the onclick function that is to be overriden by the class that is using this widget
  changeRange: function changeRange() {
  },
});

lang.setObject('crm.Views.DateRangeWidget', __class);
export default __class;
