import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import Memory from 'dojo/store/Memory';
import convert from 'argos/Convert';
import ErrorManager from 'argos/ErrorManager';
import List from 'argos/List';
import getResource from 'argos/I18n';

const resource = getResource('errorLogList');

/**
 * @class crm.Views.ErrorLog.List
 *
 * @extends argos.List
 *
 * @requires crm.Format
 * @requires argos.ErrorManager
 */
const __class = declare('crm.Views.ErrorLog.List', [List], {
  // Localization
  titleText: resource.titleText,
  errorDateFormatText: resource.errorDateFormatText,

  // Templates
  itemTemplate: new Simplate([
    '<h3>{%: crm.Format.date($.Date, $$.errorDateFormatText) %}</h3>',
    '<h4>{%: $.Description %}</h4>',
  ]),

  // View Properties
  id: 'errorlog_list',
  enableSearch: false,
  enablePullToRefresh: false,
  hideSearch: true,
  expose: false,
  detailView: 'errorlog_detail',

  _onRefresh: function _onRefresh(o) {
    this.inherited(arguments);
    if (o.resourceKind === 'errorlogs' || o.resourceKind === 'localStorage') {
      this.refreshRequired = true;
    }
  },
  createStore: function createStore() {
    const errorItems = ErrorManager.getAllErrors();

    errorItems.sort(function sortErrorItems(a, b) {
      a.errorDateStamp = a.errorDateStamp || a.Date;
      b.errorDateStamp = b.errorDateStamp || b.Date;
      a.Date = a.errorDateStamp;
      b.Date = b.errorDateStamp;
      const A = convert.toDateFromString(a.errorDateStamp);
      const B = convert.toDateFromString(b.errorDateStamp);

      return A.valueOf() > B.valueOf();
    });

    return new Memory({
      data: errorItems,
    });
  },
  createToolLayout: function createToolLayout() {
    return this.tools || (this.tools = {
      'tbar': [],
    });
  },
});

lang.setObject('Mobile.SalesLogix.Views.ErrorLog.List', __class);
export default __class;
