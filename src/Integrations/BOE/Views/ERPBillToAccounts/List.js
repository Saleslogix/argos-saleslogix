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

const resource = getResource('erpBillToAccountsList');

const __class = declare('crm.Integrations.BOE.Views.ERPBillToAccounts.List', [List, _RightDrawerListMixin, _MetricListMixin, _CardLayoutListMixin, _GroupListMixin], {
  // Templates
  // TODO: Need template from PM
  itemTemplate: new Simplate([
    '<h3>{%: $.ErpBillTo.Name %}</h3>',
    '<div class="h4 address">{%: $.ErpBillTo.Address.FullAddress %}</div>',
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
  itemIconClass: 'fa fa-building-o fa-2x',

  // Groups
  enableDynamicGroupLayout: true,
  groupsEnabled: true,

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute('upper(ErpBillTo.Name) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
});

lang.setObject('icboe.Views.ERPBillToAccounts.List', __class);
export default __class;
