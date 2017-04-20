import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import List from 'argos/List';
import _RightDrawerListMixin from 'crm/Views/_RightDrawerListMixin';
import _MetricListMixin from 'crm/Views/_MetricListMixin';
import _GroupListMixin from 'crm/Views/_GroupListMixin';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';

const resource = getResource('erpShipToAccountsList');

const __class = declare('crm.Integrations.BOE.Views.ERPShipToAccounts.List', [List, _RightDrawerListMixin, _MetricListMixin, _GroupListMixin], {
  // Templates
  itemTemplate: new Simplate([
    '<p class="listview-heading">{%: $.ErpShipTo.Name %}</p>',
    '<p class="micro-text address">{%: $.ErpShipTo.Address.FullAddress %}</p>',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  id: 'erpshiptoaccount_list',
  detailView: 'erpshiptoaccount_detail',
  insertView: 'erpshiptoaccount_edit',
  modelName: MODEL_NAMES.ERPSHIPTOACCOUNT,
  resourceKind: 'erpShipToAccounts',
  allowSelection: true,
  enableActions: true,
  expose: false,
  security: 'Entities/ErpShipTo/View',
  insertSecurity: 'Entities/ErpShipTo/Add',

  // Groups
  enableDynamicGroupLayout: false,
  groupsEnabled: false,

  // Card layout
  itemIconClass: 'warehouse',

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return `upper(ErpShipTo.Name) like "%${this.escapeSearchQuery(searchQuery.toUpperCase())}%"`;
  },
});

lang.setObject('icboe.Views.ERPShipToAccounts.List', __class);
export default __class;
