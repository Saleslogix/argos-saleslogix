import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import List from 'argos/List';
import _CardLayoutListMixin from 'crm/Views/_CardLayoutListMixin';
import _RightDrawerListMixin from 'crm/Views/_RightDrawerListMixin';
import _MetricListMixin from 'crm/Views/_MetricListMixin';
import _GroupListMixin from 'crm/Views/_GroupListMixin';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';

const resource = getResource('erpShipTosList');

const __class = declare('crm.Integrations.BOE.Views.ErpShipTos.List', [List, _RightDrawerListMixin, _MetricListMixin, _CardLayoutListMixin, _GroupListMixin], {
  // Templates
  itemTemplate: new Simplate([
    '<h3>{%: $.Name %}</h3>',
    '<div class="h4 address">{%: $.Address.FullAddress %}</div>',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  id: 'erpshipto_list',
  detailView: 'erpshipto_detail',
  insertView: 'erpshipto_edit',
  modelName: MODEL_NAMES.ERPSHIPTO,
  resourceKind: 'erpShipTos',
  allowSelection: true,
  enableActions: false,
  expose: false,
  security: 'Entities/ErpShipTo/View',
  insertSecurity: 'Entities/ErpShipTo/Add',

  // Groups
  enableDynamicGroupLayout: true,
  groupsEnabled: true,

  // Card layout
  itemIconClass: '',

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute('upper(Name) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
});

lang.setObject('icboe.Views.ErpShipTos.List', __class);
export default __class;
