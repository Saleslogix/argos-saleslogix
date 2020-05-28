/* Copyright 2020 Infor
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
import List from 'argos/List';
import MemoryStore from 'dojo/store/Memory';
import getResource from 'argos/I18n';


const resource = getResource('activityAttendeeTypesList');

const __class = declare('crm.Views.ActivityAttendee.TypesList', [List], {
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
  addText: resource.addText,
  cancelText: resource.cancelText,
  attendeeTypeText: {
    Contact: resource.contactText,
    Lead: resource.leadText,
  },
  attendeeTypeOrder: [
    'Contact',
    'Lead',
  ],
  attendeeTypeLookup: {
    Contact: 'contact_related',
    Lead: 'lead_related',
  },
  expose: false,
  enableSearch: false,
  enablePullToRefresh: false,
  id: 'activity_attendee_types_list',
  editView: 'activity_attendee_edit',
  selectedAttendeeType: '',

  allowSelection: true, // adds list-show-selectors class to listview for displaying icons
  activateEntry: function activateEntry(params) {
    this.selectedAttendeeType = params.key;
    if (this.selectedAttendeeType) {
      const view = App.getView(this.attendeeTypeLookup[this.selectedAttendeeType]);
      if (view) {
        view.show({
          title: this.attendeeTypeText[this.selectedAttendeeType],
          enableActions: false,
          selectionOnly: true,
          singleSelect: true,
          singleSelectAction: 'complete',
          allowEmptySelection: false,
          negateHistory: true,
          continuousScrolling: false,
          simpleMode: true,
          tools: {
            tbar: [{
              id: 'cancel',
              side: 'left',
              svg: 'cancel',
              title: this.cancelText,
              fn: App.back,
            }, {
              id: 'complete',
              svg: 'check',
              title: this.addText,
              fn: this.onSelectContactOrLead,
              scope: this,
            }],
          },
        }, {
          returnTo: -1,
        });
      }
    }
  },
  onSelectContactOrLead: function onSelectContactOrLead() {
    const view = App.getPrimaryActiveView();
    const selectionModel = view.get('selectionModel');

    if (view && selectionModel) {
      const selections = selectionModel.getSelections();

      let entry;
      for (const selectionKey in selections) {
        if (selections.hasOwnProperty(selectionKey)) {
          entry = selections[selectionKey].data;
          break;
        }
      }

      this.navigateToEditView(entry);
    }
  },
  navigateToEditView: function navigateToEditView(entry) {
    const view = App.getView(this.editView);
    view.show({
      insert: true,
      entityType: this.selectedAttendeeType,
      entity: entry,
      activityEntity: this.options.selectedEntry,
    }, {
      returnTo: -1,
    });
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

    for (let i = 0; i < this.attendeeTypeOrder.length; i++) {
      list.push({
        $key: this.attendeeTypeOrder[i],
        $descriptor: this.attendeeTypeText[this.attendeeTypeOrder[i]],
        type: this.attendeeTypeOrder[i],
      });
    }

    const store = new MemoryStore({
      data: list,
    });
    return store;
  },
  init: function init() {
    this.inherited(init, arguments);
  },
  onTransitionAway: function onTransitionAway() {
    this.inherited(onTransitionAway, arguments);
    this.refreshRequired = true;
    this.store = null;
  },
  createToolLayout: function createToolLayout() {
    return this.tools || (this.tools = {
      tbar: [],
    });
  },
});

export default __class;
