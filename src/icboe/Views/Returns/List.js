import declare from 'dojo/_base/declare';
import string from 'dojo/string';
import List from 'argos/List';
import _CardLayoutListMixin from 'crm/Views/_CardLayoutListMixin';
import _RightDrawerListMixin from 'crm/Views/_RightDrawerListMixin';
import _MetricListMixin from 'crm/Views/_MetricListMixin';
import _GroupListMixin from 'crm/Views/_GroupListMixin';
import getResource from 'argos/I18n';

const resource = getResource('returnsList');

const __class = declare('icboe.Views.Returns.List', [List, _RightDrawerListMixin, _MetricListMixin, _CardLayoutListMixin, _GroupListMixin], {
  // Templates
  // TODO: Need template from PM
  itemTemplate: new Simplate([
    '<h3>{%: $.$descriptor %}</h3>',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  id: 'returns_list',
  security: 'Entities/Return/View',
  insertSecurity: 'Entities/Return/Add',
  resourceKind: 'returns',
  allowSelection: true,
  enableActions: true,

  // Card layout
  itemIconClass: 'fa fa-recycle-o fa-2x',

  // Groups
  enableDynamicGroupLayout: true,
  groupsEnabled: true,

  // Metrics
  entityName: 'Return',

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute('upper(ReturnNumber) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
});

export default __class;
