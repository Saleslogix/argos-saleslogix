import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import List from 'argos/List';
import _RightDrawerListMixin from 'crm/Views/_RightDrawerListMixin';
import _MetricListMixin from 'crm/Views/_MetricListMixin';
import _GroupListMixin from 'crm/Views/_GroupListMixin';
import getResource from 'argos/I18n';

const resource = getResource('returnsList');

const __class = declare('crm.Integrations.BOE.Views.Returns.List', [List, _RightDrawerListMixin, _MetricListMixin, _GroupListMixin], {
  // Templates
  // TODO: Need template from PM
  itemTemplate: new Simplate([
    '<p class="listview-heading">{%: $.$descriptor %}</p>',
  ]),

  // Localization
  titleText: resource.titleText,
  documentDateText: resource.documentDateText,

  // View Properties
  id: 'returns_list',
  security: 'Entities/Return/View',
  insertSecurity: 'Entities/Return/Add',
  resourceKind: 'returns',
  allowSelection: true,
  enableActions: true,

  // Card layout
  itemIconClass: 'load', // TODO: ensure soho has this icon

  // Groups
  enableDynamicGroupLayout: true,
  groupsEnabled: true,

  // Metrics
  entityName: 'Return',

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `upper(ReturnNumber) like "%${q}%"`;
  },
});

lang.setObject('icboe.Views.Returns.List', __class);
export default __class;
