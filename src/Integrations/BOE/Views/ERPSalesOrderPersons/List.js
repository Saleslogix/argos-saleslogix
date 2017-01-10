import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import List from 'argos/List';
import _CardLayoutListMixin from 'crm/Views/_CardLayoutListMixin';
import _RightDrawerListMixin from 'crm/Views/_RightDrawerListMixin';
import _MetricListMixin from 'crm/Views/_MetricListMixin';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';

const resource = getResource('erpSalesOrderPersonsList');

const __class = declare('crm.Integrations.BOE.Views.ERPSalesOrderPersons.List', [List, _RightDrawerListMixin, _MetricListMixin, _CardLayoutListMixin], {
  // Templates
  // TODO: Need template from PM
  itemTemplate: new Simplate([
    '<h3>{%: $.ErpPerson.Name %}</h3>',
    '<div class="h4 address">{%: $.ErpPerson.Address.FullAddress %}</div>',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  id: 'erpsalesorderperson_list',
  modelName: MODEL_NAMES.ERPSALESORDERPERSON,
  resourceKind: 'erpSalesOrderPersons',
  allowSelection: true,
  enableActions: true,
  security: 'Entities/ErpPerson/View',
  insertSecurity: 'Entities/ErpPerson/Add',

  // Card layout
  itemIconClass: 'fa fa-user fa-2x',

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute('upper(ErpPerson.Name) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
});

lang.setObject('icboe.Views.ERPSalesOrderPersons.List', __class);
export default __class;
