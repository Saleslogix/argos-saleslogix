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

import lang from 'dojo/_base/lang';
import 'argos/Format';

/**
 * @class crm.Template
 * @classdesc Helper class that contains re-usuable {@link Simplate} templates.
 * @requires argos.Format
 */
const __class = lang.setObject('crm.Template', /** @lends crm.Template */ {
  /**
   * @property {Simplate} nameLF
   * Template for lastname, firstname
   */
  nameLF: new Simplate([
    '{% if ($) { %}',
    '{% if ($.LastName && $.FirstName) { %}',
    '{%= $.LastName %}, {%= $.FirstName%}',
    '{% } else { %}',
    '{%: $.LastName ? $.LastName : $.FirstName %}',
    '{% } %}',
    '{% } %}',
  ]),

  /**
   * @property {Simplate} alternateKeyPrefixSuffix
   * Template for alternate key, takes a prefix and suffix
   */
  alternateKeyPrefixSuffix: new Simplate([
    '{%= $.AlternateKeyPrefix %}-{%= $.AlternateKeySuffix %}',
  ]),

  /**
   * @property {Simplate} noteDetailPropertyOld
   * Template for note details
   */
  noteDetailPropertyOld: new Simplate([
    '{% var F = argos.Format; %}', // TODO: Avoid global
    '<div class="row note-text-row {%= $.cls %}" data-property="{%= $.name %}">',
    '<label>{%: $.label %}</label>',
    '<div class="note-text-property">',
    '<div class="note-text-wrap">',
    '{%= F.nl2br(F.encode($.value)) %}',
    '</div>',
    '</div>',
    '</div>',
  ]),

  /**
   * @property {Simplate} noteDetailProperty
   * Template for note details
   */
  noteDetailProperty: new Simplate([
    '{% var F = argos.Format; %}', // TODO: Avoid global
    '<div class="row note-text-row {%= $.cls %}" data-property="{%= $.name %}">',
    '<label>{%: $.label %}</label>',
    '<pre>',
    '{%= F.encode($.value) %}',
    '</pre>',
    '</div>',
  ]),
});

export default __class;
