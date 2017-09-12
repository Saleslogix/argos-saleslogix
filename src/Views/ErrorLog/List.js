/* Copyright 2017 Infor
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import Memory from 'dojo/store/Memory';
import convert from 'argos/Convert';
import ErrorManager from 'argos/ErrorManager';
import List from 'argos/List';
import getResource from 'argos/I18n';

const resource = getResource('errorLogList');
const dtFormatResource = getResource('errorLogListDateTimeFormat');

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
  errorDateFormatText: dtFormatResource.errorDateFormatText,
  errorDateFormatText24: dtFormatResource.errorDateFormatText24,

  // Templates
  itemTemplate: new Simplate([
    '<p class="listview-heading">{%: crm.Format.date($.Date, (App.is24HourClock()) ? $$.errorDateFormatText24 : $$.errorDateFormatText) %}</p>',
    '<p class="micro-text">{%: $.Description %}</p>',
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

    errorItems.sort((a, b) => {
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
      tbar: [],
    });
  },
});

lang.setObject('Mobile.SalesLogix.Views.ErrorLog.List', __class);
export default __class;
