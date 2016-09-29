import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import List from 'argos/List';
import format from 'crm/Format';
import _CardLayoutListMixin from 'crm/Views/_CardLayoutListMixin';
import _RightDrawerListMixin from 'crm/Views/_RightDrawerListMixin';
import _MetricListMixin from 'crm/Views/_MetricListMixin';
import _GroupListMixin from 'crm/Views/_GroupListMixin';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';

const resource = getResource('quotePersonList');

const __class = declare('crm.Integrations.BOE.Views.QuotePersons.List', [List, _RightDrawerListMixin, _MetricListMixin, _CardLayoutListMixin, _GroupListMixin], {
  formatter: format,
  // Templates
  itemTemplate: new Simplate([
    '<h4><label class="group-label">{%: $$.personNameText %}</label> {%: $.Person.Name %}</h4>',
    '<h4><label class="group-label">{%: $$.quoteNumberText %}</label> {%: $.Quote.QuoteNumber %}</h4>',
  ]),

  // Localization
  titleText: resource.titleText,
  personNameText: resource.personNameText,
  quoteNumberText: resource.quoteNumberText,

  // View Properties
  id: 'quotePerson_list',
  modelName: MODEL_NAMES.QUOTEPERSON,
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
    return string.substitute('upper(Quote.QuoteNumber) like "${0}%" or upper(Person.Name) like "${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
});

lang.setObject('icboe.Views.QuotePersons.List', __class);
export default __class;
