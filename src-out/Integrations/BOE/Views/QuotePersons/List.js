define('crm/Integrations/BOE/Views/QuotePersons/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', 'crm/Format', 'crm/Views/_RightDrawerListMixin', 'crm/Views/_MetricListMixin', 'crm/Views/_GroupListMixin', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _List, _Format, _RightDrawerListMixin2, _MetricListMixin2, _GroupListMixin2, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _List2 = _interopRequireDefault(_List);

  var _Format2 = _interopRequireDefault(_Format);

  var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

  var _MetricListMixin3 = _interopRequireDefault(_MetricListMixin2);

  var _GroupListMixin3 = _interopRequireDefault(_GroupListMixin2);

  var _Names2 = _interopRequireDefault(_Names);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  const resource = (0, _I18n2.default)('quotePersonList'); /* Copyright 2017 Infor
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

  const __class = (0, _declare2.default)('crm.Integrations.BOE.Views.QuotePersons.List', [_List2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default, _GroupListMixin3.default], {
    formatter: _Format2.default,
    // Templates
    itemTemplate: new Simplate(['<p class="micro-text"><label class="group-label">{%: $$.personNameText %}</label> {%: $.Person.Name %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.quoteNumberText %}</label> {%: $.Quote.QuoteNumber %}</p>']),

    // Localization
    titleText: resource.titleText,
    personNameText: resource.personNameText,
    quoteNumberText: resource.quoteNumberText,

    // View Properties
    id: 'quotePerson_list',
    modelName: _Names2.default.QUOTEPERSON,
    resourceKind: 'quotePersons',
    allowSelection: true,
    enableActions: false,
    expose: false,
    security: 'Entities/ErpPerson/View',
    insertSecurity: 'Entities/ErpPerson/Add',

    // Card layout
    itemIconClass: '',

    // Groups
    enableDynamicGroupLayout: false,
    groupsEnabled: false,

    // Metrics
    entityName: 'Quote Person',

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      const q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return `upper(Quote.QuoteNumber) like "${q}%" or upper(Person.Name) like "${q}%"`;
    }
  });

  _lang2.default.setObject('icboe.Views.QuotePersons.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});