import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import List from 'argos/List';
import _RightDrawerListMixin from 'crm/Views/_RightDrawerListMixin';
import _MetricListMixin from 'crm/Views/_MetricListMixin';
import _GroupListMixin from 'crm/Views/_GroupListMixin';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';

const resource = getResource('erpAccountPersonsList');

const __class = declare('crm.Integrations.BOE.Views.ERPAccountPersons.List', [List, _RightDrawerListMixin, _MetricListMixin, _GroupListMixin], {
  // Templates
  // TODO: Need template from PM
  itemTemplate: new Simplate([
    '<p class="listview-heading">{%: $.ErpPerson.Name %}</p>',
    '<p class="micro-text address">{%: $.ErpPerson.Address.FullAddress %}</p>',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  id: 'erpaccountperson_list',
  modelName: MODEL_NAMES.ERPACCOUNTPERSON,
  resourceKind: 'erpAccountPersons',
  allowSelection: true,
  enableActions: false,
  security: 'Entities/ErpPerson/View',
  insertSecurity: 'Entities/ErpPerson/Add',

  // Card layout
  itemIconClass: 'fa fa-user fa-2x',

  // Groups
  enableDynamicGroupLayout: true,
  groupsEnabled: true,

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute('upper(ErpPerson.Name) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
});

lang.setObject('icboe.Views.ERPAccountPersons.List', __class);
export default __class;
