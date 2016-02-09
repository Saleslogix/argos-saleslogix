import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import RelatedViewWidget from 'argos/RelatedViewWidget';
import getResource from 'argos/I18n';

const resource = getResource('historyRelated');

/**
 * @class crm.Views.History.RelatedView
 *
 * @extends argos.RelatedViewWidget
 *
 * @requires argos.Convert
 *
 * @requires crm.Format
 *
 */
const __class = declare('crm.Views.History.RelatedView', [RelatedViewWidget], {
  // Localization
  regardingText: resource.regardingText,
  byText: resource.byText,
  titleText: resource.titleText,

  id: 'relatedNotes',
  detailViewId: 'history_detail',
  listViewId: 'history_related',
  listViewWhere: null,
  enabled: true,
  showTab: false,
  enableActions: false,
  showTotalInTab: false,
  hideWhenNoData: true,
  resourceKind: 'history',
  select: ['Type', 'ModifyDate', 'CompleteDate', 'UserName', 'Description', 'Notes', 'AccountName'],
  where: null,
  sort: 'ModifyDate desc',
  pageSize: 3,
  relatedItemIconTemplate: new Simplate([
    '<div class="user-icon">{%: crm.Format.formatUserInitial($.UserName) %}</div>',
  ]),
  relatedItemHeaderTemplate: new Simplate([
    '<h4 ><strong>{%: $$.getDescription($) %} </strong></h4>',
    '<h4>{%: crm.Format.formatByUser($.UserName) %} {%: $$.byText %}  {%: crm.Format.relativeDate($.ModifyDate, false) %}</h4>',
  ]),
  relatedItemDetailTemplate: new Simplate([
    '<div class="note-text-wrap">',
    '<h4>{%: $.Notes %} ... </h4>',
    '</div>',
  ]),
  relatedViewHeaderTemplate: new Simplate([
    '<div class="line-bar"></div>',
  ]),
  getDescription: function getDescription(entry) {
    return (entry.Description) ? entry.Description : entry.$descriptor;
  },
});

lang.setObject('Mobile.SalesLogix.Views.History.RelatedView', __class);
export default __class;
