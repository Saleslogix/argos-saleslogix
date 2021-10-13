define('crm/Integrations/BOE/Views/SyncResults/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', 'crm/Format', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _List, _Format, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _List2 = _interopRequireDefault(_List);

  var _Format2 = _interopRequireDefault(_Format);

  var _Names2 = _interopRequireDefault(_Names);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  const resource = (0, _I18n2.default)('syncResultsList');
  const dtFormatResource = (0, _I18n2.default)('syncResultsListDateTimeFormat');

  const __class = (0, _declare2.default)('crm.Integrations.BOE.Views.SyncResults.List', [_List2.default], {
    formatter: _Format2.default,
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading"><label class="group-label">{%: $$.directionText %}: </label>{%: $.RunName %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.statusText %}: </label>{%: $.HttpStatus %}</p>', '{% if ($.ErrorMessage) { %}', '<p class="micro-text"><label class="group-label">{%: $$.errorMessageText %}: </label>{%: $.ErrorMessage %}</p>', '{% } %}', '{% if ($.SyncedFrom) { %}', '<p class="micro-text"><label class="group-label">{%: $$.sentFromText %}: </label>{%: $.SyncedFrom.Name %}</p>', '{% } %}', '{% if ($.SyncedTo) { %}', '<p class="micro-text"><label class="group-label">{%: $$.processedByText %}: </label>{%: $.SyncedTo.Name %}</p>', '{% } %}', '<p class="micro-text"><label class="group-label">{%: $$.loggedText %}: </label>{%: $$.formatter.date($.Stamp, $$.dateFormatText) %}</p>']),

    // Localization
    titleText: resource.titleText,
    directionText: resource.directionText,
    userText: resource.userText,
    sentFromText: resource.sentFromText,
    processedByText: resource.processedByText,
    loggedText: resource.loggedText,
    statusText: resource.statusText,
    errorMessageText: resource.errorMessageText,
    dateFormatText: dtFormatResource.dateFormatText,

    // View Properties
    id: 'syncresult_list',
    detailView: '',
    modelName: _Names2.default.SYNCRESULT,
    resourceKind: 'syncResults',
    enableActions: false,
    groupsEnabled: false,
    hasSettings: false,
    expose: false,

    // Card layout
    itemIconClass: '',

    // Metrics
    entityName: 'SyncResult',

    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {});
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      const q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return `upper(HttpStatus) like "${q}%"`;
    }
  });

  _lang2.default.setObject('icboe.Views.SyncResults.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});