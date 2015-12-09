import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import domAttr from 'dojo/dom-attr';
import query from 'dojo/query';
import format from '../../Format';
import List from 'argos/List';
import getResource from 'argos/I18n';

const resource = getResource('addressList');

/**
 * @class crm.Views.Address.List
 *
 * @extends argos.List
 *
 * @requires argos.List
 *
 * @requires crm.Format
 *
 */
const __class = declare('crm.Views.Address.List', [List], {
  // Templates
  itemTemplate: new Simplate([
    '<h3>{%: $.$descriptor %}</h3>',
    '<h4>{%= crm.Format.address($, true) %}</h4>',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  detailView: null,
  id: 'address_list',
  security: null, // 'Entities/Address/View',
  insertSecurity: 'Entities/Address/Add',
  insertView: 'address_edit',
  resourceKind: 'addresses',
  allowSelection: true,
  enableActions: true,

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute('(Description like "${0}%" or City like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
  // Disable Add/Insert on toolbar
  createToolLayout: function createToolLayout() {
    return this.tools || (this.tools = {
      tbar: [],
    });
  },
  selectEntry: function selectEntry(params) {
    const row = query(params.$source).closest('[data-key]')[0];
    const key = row ? domAttr.get(row, 'data-key') : false;

    if (this._selectionModel && key) {
      App.showMapForAddress(format.address(this.entries[key], true, ' '));
    }
  },
});

lang.setObject('Mobile.SalesLogix.Views.Address.List', __class);
export default __class;
