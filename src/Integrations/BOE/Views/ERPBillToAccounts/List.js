import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import List from 'argos/List';
import _RightDrawerListMixin from 'crm/Views/_RightDrawerListMixin';
import _MetricListMixin from 'crm/Views/_MetricListMixin';
import _GroupListMixin from 'crm/Views/_GroupListMixin';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';

const resource = getResource('erpBillToAccountsList');

const __class = declare('crm.Integrations.BOE.Views.ERPBillToAccounts.List', [List, _RightDrawerListMixin, _MetricListMixin, _GroupListMixin], {
  // Templates
  // TODO: Need template from PM
  itemTemplate: new Simplate([
    '<p class="listview-heading">{%: $.ErpBillTo.Name %}</p>',
    '<p class="micro-text address">{%: $.ErpBillTo.Address.FullAddress %}</p>',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  id: 'erpbilltoaccounts_list',
  detailView: 'erpbilltoaccounts_detail',
  insertView: 'erpbilltoaccounts_edit',
  resourceKind: 'erpBillToAccounts',
  allowSelection: true,
  enableActions: false,
  expose: false,
  modelName: MODEL_NAMES.ERPBILLTOACCOUNT,
  security: 'Entities/ErpBillTo/View',
  insertSecurity: 'Entities/ErpBillTo/Add',

  // Card layout
  itemIconClass: 'spreadsheet',

  // Groups
  enableDynamicGroupLayout: true,
  groupsEnabled: true,

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `upper(ErpBillTo.Name) like "%${q}%"`
  },
});

lang.setObject('icboe.Views.ERPBillToAccounts.List', __class);
export default __class;
