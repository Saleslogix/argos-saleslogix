import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import List from 'argos/List';
import getResource from 'argos/I18n';

const resource = getResource('competitorList');

/**
 * @class crm.Views.Competitor.List
 *
 * @extends argos.List
 *
 * @requires argos.List
 *
 */
const __class = declare('crm.Views.Competitor.List', [List], {
  // Templates
  itemTemplate: new Simplate([
    '<h3>{%= $.CompetitorName %}</h3>',
    '{% if ($.WebAddress) { %}<h4>{%= $.WebAddress %}</h4>{% } %}',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  detailView: 'competitor_detail',
  id: 'competitor_list',
  security: 'Entities/Competitor/View',
  insertView: 'competitor_edit',
  queryOrderBy: 'CompetitorName asc',
  querySelect: [
    'CompetitorName',
    'WebAddress',
  ],
  resourceKind: 'competitors',

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute('(CompetitorName like "%${0}%")', [this.escapeSearchQuery(searchQuery)]);
  },
});

lang.setObject('Mobile.SalesLogix.Views.Competitor.List', __class);
export default __class;
