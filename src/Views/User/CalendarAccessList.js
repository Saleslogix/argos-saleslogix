import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import List from 'argos/List';

/**
 * @class crm.Views.User.CalendarAccessList
 *
 * @extends argos.List
 */
const __class = declare('crm.Views.User.CalendarAccessList', [List], {
  // Templates
  itemTemplate: new Simplate([
    '<h3>{%: $.Name %}</h3>',
    '<h4>{%: $.SubType %}</h4>',
  ]),

  // Localization
  localeId: 'userCalendarAccessList',

  // View Properties
  id: 'calendar_access_list',
  queryOrderBy: 'Name',

  queryWhere: function queryWhere() {
    return "AllowAdd AND (AccessId eq 'EVERYONE' or AccessId eq '" + App.context.user.$key + "') AND Type eq 'User'";
  },
  querySelect: [
    'Name',
    'SubType',
    'AccessId',
    'ResourceId',
  ],
  resourceKind: 'activityresourceviews',

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute('upper(Name) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
});

lang.setObject('Mobile.SalesLogix.Views.User.CalendarAccessList', __class);
export default __class;
