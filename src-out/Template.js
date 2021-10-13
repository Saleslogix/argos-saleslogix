define('crm/Template', ['module', 'exports', 'dojo/_base/lang', 'argos/Format'], function (module, exports, _lang) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _lang2 = _interopRequireDefault(_lang);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @class
   * @alias module:crm/Template
   * @classdesc Helper class that contains re-usuable {@link Simplate} templates.
   * @static
   */
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

  /**
   * @module crm/Template
   */
  const __class = _lang2.default.setObject('crm.Template', /** @lends module:crm/Template */{
    /**
     * @property {Simplate} nameLF
     * Template for lastname, firstname
     */
    nameLF: new Simplate(['{% if ($) { %}', '{% if ($.LastName && $.FirstName) { %}', '{%= $.LastName %}, {%= $.FirstName%}', '{% } else { %}', '{%: $.LastName ? $.LastName : $.FirstName %}', '{% } %}', '{% } %}']),

    /**
     * @property {Simplate} alternateKeyPrefixSuffix
     * Template for alternate key, takes a prefix and suffix
     */
    alternateKeyPrefixSuffix: new Simplate(['{%= $.AlternateKeyPrefix %}-{%= $.AlternateKeySuffix %}']),

    /**
     * @property {Simplate} noteDetailPropertyOld
     * Template for note details
     */
    noteDetailPropertyOld: new Simplate(['{% var F = argos.Format; %}', // TODO: Avoid global
    '<div class="row note-text-row {%= $.cls %}" data-property="{%= $.name %}">', '<label>{%: $.label %}</label>', '<div class="note-text-property">', '<div class="note-text-wrap">', '{%= F.nl2br(F.encode($.value)) %}', '</div>', '</div>', '</div>']),

    /**
     * @property {Simplate} noteDetailProperty
     * Template for note details
     */
    noteDetailProperty: new Simplate(['{% var F = argos.Format; %}', // TODO: Avoid global
    '<div class="row note-text-row {%= $.cls %}" data-property="{%= $.name %}">', '<label>{%: $.label %}</label>', '<pre>', '{%= F.encode($.value) %}', '</pre>', '</div>'])
  });

  exports.default = __class;
  module.exports = exports['default'];
});