import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import action from 'crm/Action';
import string from 'dojo/string';
import List from 'argos/List';
import format from 'crm/Format';
import _CardLayoutListMixin from 'crm/Views/_CardLayoutListMixin';
import _RightDrawerListMixin from 'crm/Views/_RightDrawerListMixin';
import _MetricListMixin from 'crm/Views/_MetricListMixin';
import _GroupListMixin from 'crm/Views/_GroupListMixin';
import MODEL_NAMES from '../../Models/Names';
import utility from '../../Utility';
import getResource from 'argos/I18n';

const resource = getResource('erpShipmentsList');

const __class = declare('crm.Integrations.BOE.Views.ERPShipments.List', [List, _RightDrawerListMixin, _MetricListMixin, _CardLayoutListMixin, _GroupListMixin], {
  formatter: format,
  util: utility,

  // Templates
  itemTemplate: new Simplate([
    '<h3><label class="group-label">{%: $$.shipmentIDLabelText %}</label> {%: $.ErpExtId %}</h3>',
    '<h4> {% if ($.Account) { %}<label class="group-label"> {%: $$.accountLabelText %}</label> {%: $.Account.AccountName %} {% } %}</h4>',
    '<h4><label class="group-label">{%: $$.statusLabelText %}</label> {%: $.ErpStatus %}</h4>',
    '<h4> {% if ($.DatePromised) { %}<label class="group-label">{%: $$.datePromisedLabelText %}</label> {%: $$.formatter.date($.DatePromised) %} {% } %}</h4>',
    '<h4><label class="group-label"> {%: $$.totalBaseAmountText %} </label>',
    '{%: $$.util.formatMultiCurrency($.ShipmentTotalBaseAmount, $.BaseCurrencyCode) %}',
    '</h4>',
    '<h4><label class="group-label"> {%: $$.totalAmountText %} </label>',
    '{%: $$.util.formatMultiCurrency($.ShipmentTotalAmount, $.CurrencyCode) %}',
    '</h4>',
    '<h4><label class="group-label">{%: $$.documentDateText %}</label> {%: $$.formatter.date($.ErpDocumentDate) %}</h4>',
  ]),

  // Localization
  titleText: resource.titleText,
  statusLabelText: resource.statusLabelText,
  shipmentIDLabelText: resource.shipmentIDLabelText,
  accountLabelText: resource.accountLabelText,
  datePromisedLabelText: resource.datePromisedLabelText,
  viewAccountActionText: resource.viewAccountActionText,
  totalBaseAmountText: resource.totalBaseAmountText,
  totalAmountText: resource.totalAmountText,
  documentDateText: resource.documentDateText,

  // View Properties
  id: 'erpshipments_list',
  detailView: 'erpshipments_detail',
  modelName: MODEL_NAMES.ERPSHIPMENT,
  resourceKind: 'erpShipments',
  allowSelection: true,
  enableActions: true,
  enableHashTags: true,
  expose: true,
  security: 'Entities/ErpShipment/View',
  insertSecurity: 'Entities/ErpShipment/Add',

  // Groups
  enableDynamicGroupLayout: true,
  groupsEnabled: true,
  entityName: 'ERPShipment',

  // Card layout
  itemIconClass: 'fa fa-truck fa-2x',

  createActionLayout: function createActionLayout() {
    return this.actions || (this.actions = [{
      id: 'viewAccount',
      label: this.viewAccountActionText,
      enabled: action.hasProperty.bindDelegate(this, 'Account.$key'),
      fn: action.navigateToEntity.bindDelegate(this, {
        view: 'account_detail',
        keyProperty: 'Account.$key',
        textProperty: 'Account.AccountName',
      }),
    }]
    );
  },

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute('upper(Account.AccountName) like "${0}%" or upper(ErpExtId) like "${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
});

lang.setObject('icboe.Views.ERPShipments.List', __class);
export default __class;
