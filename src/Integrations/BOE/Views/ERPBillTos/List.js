import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import List from 'argos/List';
import _RightDrawerListMixin from 'crm/Views/_RightDrawerListMixin';
import _MetricListMixin from 'crm/Views/_MetricListMixin';
import _GroupListMixin from 'crm/Views/_GroupListMixin';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';

const resource = getResource('erpBillTosList');

const __class = declare('crm.Integrations.BOE.Views.ErpBillTos.List', [List, _RightDrawerListMixin, _MetricListMixin, _GroupListMixin], {
  // Templates
  itemTemplate: new Simplate([
    '<p class="listview-heading">{%: $.Name %}</p>',
    '<p class="listview-heading address">{%: $.Address.FullAddress %}</p>',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  id: 'erpbillto_list',
  detailView: 'erpbillto_detail',
  insertView: 'erpbillto_edit',
  allowSelection: true,
  enableActions: false,
  expose: false,
  modelName: MODEL_NAMES.ERPBILLTO,
  resourceKind: 'erpBillTos',
  security: 'Entities/ErpBillTo/View',
  insertSecurity: 'Entities/ErpBillTo/Add',

  // Card layout
  itemIconClass: '',

  // Groups
  enableDynamicGroupLayout: true,
  groupsEnabled: true,

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `upper(Name) like "%${q}%"`;
  },
});

lang.setObject('icboe.Views.ErpBillTos.List', __class);
export default __class;
