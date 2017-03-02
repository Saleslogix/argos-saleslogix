import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import List from 'argos/List';
import getResource from 'argos/I18n';

const resource = getResource('contractList');

/**
 * @class crm.Views.Contract.List
 *
 * @extends argos.List
 */
const __class = declare('crm.Views.Contract.List', [List], {
  // Templates
  itemTemplate: new Simplate([
    '<p class="listview-heading">{%= $.Account ? $.Account.AccountName : "" %}</p>',
    '<p class="listview-subheading">{%= $.ReferenceNumber %}</p>',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  contextView: 'context_dialog',
  detailView: 'contract_detail',
  id: 'contract_list',
  security: 'Entities/Contract/View',
  insertView: 'contract_edit',
  queryOrderBy: 'ReferenceNumber asc',
  querySelect: [
    'Account/AccountName',
    'Contact/FullName',
    'ReferenceNumber',
  ],
  resourceKind: 'contracts',

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute('(ReferenceNumber like "%${0}%")', [this.escapeSearchQuery(searchQuery)]);
  },
});

lang.setObject('Mobile.SalesLogix.Views.Contract.List', __class);
export default __class;
