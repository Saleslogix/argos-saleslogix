import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import array from 'dojo/_base/array';
import List from 'argos/List';
import getResource from 'argos/I18n';

const resource = getResource('ownerList');

/**
 * @class crm.Views.Owner.List
 *
 * @extends argos.List
 */
const __class = declare('crm.Views.Owner.List', [List], {
  // Templates
  itemTemplate: new Simplate([
    '<h3>{%: $.OwnerDescription %}</h3>',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  id: 'owner_list',
  security: 'Entities/Owner/View',
  queryOrderBy: 'OwnerDescription',
  querySelect: [
    'OwnerDescription',
    'User/Enabled',
    'User/Type',
    'Type',
  ],
  queryWhere: "Type ne 'Department'",
  resourceKind: 'owners',

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute("upper(OwnerDescription) like '%${0}%'", [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
  processData: function processData(items) {
    if (items) {
      items = array.filter(items, function filterItems(item) { // eslint-disable-line
        return this._userEnabled(item) && this._isCorrectType(item);
      }, this);
    }

    this.inherited(arguments);
  },
  _userEnabled: function _userEnabled(item) {
    // If User is null, it is probably a team
    if (item.User === null || item.User.Enabled) {
      return true;
    }

    return false;
  },
  _isCorrectType: function _isCorrectType(item) {
    // If user is null, it is probably a team
    if (item.User === null) {
      return true;
    }

    // Filter out WebViewer, Retired, Template and AddOn users like the user list does
    return item.User.Type !== 3 && item.User.Type !== 5 && item.User.Type !== 6 && item.User.Type !== 7;
  },
});

lang.setObject('Mobile.SalesLogix.Views.Owner.List', __class);
export default __class;
