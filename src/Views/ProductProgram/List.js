import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import List from 'argos/List';
import getResource from 'argos/I18n';

const resource = getResource('productProgramList');

/**
 * @class crm.Views.ProductProgram.List
 *
 * @extends argos.List
 *
 * @requires crm.Format
 */
const __class = declare('crm.Views.ProductProgram.List', [List], {
  // Templates
  itemTemplate: new Simplate([
    '<h3>{%: $.Program %}</h3>',
    '<h4>',
    '{%: $.Price %}',
    '</h4>',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  id: 'productprogram_list',
  security: 'Entities/ProductProgram/View',
  queryOrderBy: 'Program',
  querySelect: [
    'DefaultProgram',
    'Program',
    'Price',
  ],
  resourceKind: 'productPrograms',

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute('(upper(Program) like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
});

lang.setObject('Mobile.SalesLogix.Views.ProductProgram.List', __class);
export default __class;
