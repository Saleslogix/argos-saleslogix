import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import List from 'argos/List';
import getResource from 'argos/I18n';

const resource = getResource('userList');

/**
 * @class crm.Views.User.List
 *
 * @extends argos.List
 */
const __class = declare('crm.Views.User.List', [List], {
  // Templates
  itemTemplate: new Simplate([
    '<h3>{%: $.UserInfo.LastName %}, {%: $.UserInfo.FirstName %}</h3>',
    '<h4>{%: $.UserInfo.Title %}</h4>',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  id: 'user_list',
  queryOrderBy: 'UserInfo.LastName asc, UserInfo.FirstName asc',

  // Excluded types for the queryWhere
  // Type:
  // 3 - WebViewer
  // 5 - Retired
  // 6 - Template
  // 7 - AddOn
  queryWhere: 'Enabled eq true and (Type ne 3 AND Type ne 5 AND Type ne 6 AND Type ne 7)',
  querySelect: [
    'UserInfo/FirstName',
    'UserInfo/LastName',
    'UserInfo/Title',
    'UserInfo/UserName',
  ],
  resourceKind: 'users',

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute('upper(UserInfo.UserName) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
});

lang.setObject('Mobile.SalesLogix.Views.User.List', __class);
export default __class;
