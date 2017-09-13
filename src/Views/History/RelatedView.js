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
import RelatedViewWidget from 'argos/RelatedViewWidget';
import getResource from 'argos/I18n';
import string from 'dojo/string';
import format from '../../Format';

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
  Format: format,
  relatedItemIconTemplate: new Simplate([
    '<div class="user-icon">{%: crm.Format.formatUserInitial($.UserName) %}</div>',
  ]),
  relatedItemHeaderTemplate: new Simplate([
    '<p class="micro-text"><strong>{%: $$.getDescription($) %} </strong></p>',
    '{% if($.UserName) { %}',
    '<p class="micro-text">{%= $$.getHeader($) %}</p>',
    '{% } else { %}',
    '<p class="micro-text">{%: $$.Format.date($.ModifyDate) %}</p>',
    '{% } %}',
  ]),
  relatedItemDetailTemplate: new Simplate([
    '<div class="note-text-wrap">',
    '<p class="micro-text">{%: $.Notes %} ... </p>',
    '</div>',
  ]),
  relatedViewHeaderTemplate: new Simplate([
    '<div class="line-bar"></div>',
  ]),
  getDescription: function getDescription(entry) {
    return (entry.Description) ? entry.Description : entry.$descriptor;
  },
  getHeader: function getHeader(entry) {
    return string.substitute(this.byText, [format.formatByUser(entry.UserName), format.date(entry.ModifyDate)]);
  },
});

lang.setObject('Mobile.SalesLogix.Views.History.RelatedView', __class);
export default __class;
