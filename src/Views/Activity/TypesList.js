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
import List from 'argos/List';
import MemoryStore from 'dojo/store/Memory';
import getResource from 'argos/I18n';
import * as activityTypeIcons from '../../Models/Activity/ActivityTypeIcon';

const resource = getResource('activityTypesList');

/**
 * @class crm.Views.Activity.TypesList
 *
 * @extends argos.List
 * @mixins argos._LegacySDataListMixin
 *
 * @requires argos.List
 * @requires argos._LegacySDataListMixin
 *
 */
const __class = declare('crm.Views.Activity.TypesList', [List], {
  // Templates
  liRowTemplate: new Simplate([
    '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}">',
    '{% if ($.icon) { %}',
    `<button type="button" class="btn-icon hide-focus list-item-selector visible">
      <svg class="icon" focusable="false" aria-hidden="true" role="presentation">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-{%: $.icon || "" %}"></use>
      </svg>
    </button>`,
    '{% } else if ($.iconClass) { %}',
    '<div class="{%= $.iconClass %}"></div>',
    '{% } %}',
    '{%! $$.itemTemplate %}',
    '</li>',
  ]),
  itemTemplate: new Simplate([
    '<h4 class="',
    '{% if ($.icon) { %}',
    'list-item-content',
    '{% } %} ">',
    '{%: $.$descriptor %}</h4>',
  ]),
  isCardView: false,
  // Localization
  titleText: resource.titleText,
  activityTypeText: {
    atToDo: resource.toDo,
    atPhoneCall: resource.phoneCall,
    atAppointment: resource.meeting,
    atLiterature: resource.literature,
    atPersonal: resource.personal,
    event: resource.eventText,
  },

  activityTypeOrder: [
    'atAppointment',
    // 'atLiterature', // For [#7206791], We will enable this later.
    'atPersonal',
    'atPhoneCall',
    'atToDo',
    'event',
  ],
  expose: false,
  enableSearch: false,
  enablePullToRefresh: false,
  id: 'activity_types_list',
  editView: 'activity_edit',
  eventEditView: 'event_edit',
  allowSelection: true, // adds list-show-selectors class to listview for displaying icons
  activityTypeIcon: activityTypeIcons.default,
  activateEntry: function activateEntry(params) {
    if (params.key) {
      const view = App.getView((params.key === 'event') ? this.eventEditView : this.editView);

      if (view) {
        const source = this.options && this.options.source;
        view.show({
          insert: true,
          entry: (this.options && this.options.entry) || null,
          source,
          activityType: params.key,
          title: this.activityTypeText[params.key],
          returnTo: this.options && this.options.returnTo,
          currentDate: this.options && this.options.currentDate,
        }, {
          returnTo: -1,
        });
      }
    }
  },
  refreshRequiredFor: function refreshRequiredFor(options) {
    let toReturn;
    if (this.options) {
      toReturn = options;
    } else {
      toReturn = true;
    }
    return toReturn;
  },
  hasMoreData: function hasMoreData() {
    return false;
  },
  createStore: function createStore() {
    const list = [];
    const eventViews = [
      'calendar_view',
      'calendar_monthlist',
      'calendar_weeklist',
      'calendar_daylist',
      'calendar_yearlist',
    ];

    for (let i = 0; i < this.activityTypeOrder.length; i++) {
      list.push({
        $key: this.activityTypeOrder[i],
        $descriptor: this.activityTypeText[this.activityTypeOrder[i]],
        icon: this.activityTypeIcon[this.activityTypeOrder[i]],
        type: this.activityTypeOrder[i],
      });
    }

    if (eventViews.indexOf(this.options.returnTo) === -1) {
      list.pop(); // remove event for non event views
    }

    const store = new MemoryStore({
      data: list,
    });
    return store;
  },
  init: function init() {
    this.inherited(arguments);
  },
  onTransitionAway: function onTransitionAway() {
    this.inherited(arguments);
    this.refreshRequired = true;
    this.store = null;
  },
  createToolLayout: function createToolLayout() {
    return this.tools || (this.tools = {
      tbar: [],
    });
  },
});

lang.setObject('Mobile.SalesLogix.Views.Activity.TypesList', __class);
export default __class;
