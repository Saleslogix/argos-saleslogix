import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import List from 'argos/List';
import getResource from 'argos/I18n';

const resource = getResource('userCalendarAccessList');

/**
 * @class crm.Views.User.CalendarAccessList
 *
 * @extends argos.List
 */
const __class = declare('crm.Views.User.CalendarAccessList', [List], {
  // Templates
  itemTemplate: new Simplate([
    '<p class="micro-text">{%: $.SubType %}</p>',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  id: 'calendar_access_list',
  queryOrderBy: 'Name',

  queryWhere: function queryWhere() {
    return `AllowAdd AND (AccessId eq 'EVERYONE' or AccessId eq '${App.context.user.$key}') AND Type eq 'User'`;
  },
  querySelect: [
    'Name',
    'SubType',
    'AccessId',
    'ResourceId',
  ],
  resourceKind: 'activityresourceviews',

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `upper(Name) like "%${q}%"`;
  },
});

lang.setObject('Mobile.SalesLogix.Views.User.CalendarAccessList', __class);
export default __class;
