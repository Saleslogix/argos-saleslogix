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
import List from 'argos/List';
import getResource from 'argos/I18n';
import format from 'crm/Format';
import MODEL_NAMES from '../../Models/Names';

const resource = getResource('opportunityContactList');

/**
 * @class crm.Views.OpportunityContact.List
 *
 * @extends argos.List
 */
const __class = declare('crm.Views.OpportunityContact.List', [List], {
  // Template
  itemTemplate: new Simplate([
    '<p class="micro-text {% if ($.IsPrimary) { %} primary {% } %}">',
    '{% if ($.SalesRole) { %}',
    '{%: $$.formatPicklist("SalesRole")($.SalesRole) %} | ',
    '{% } %}',
    '{%: $.Contact.Title %}</p>',
  ]),

  // Localization
  titleText: resource.titleText,
  selectTitleText: resource.selectTitleText,
  activitiesText: resource.activitiesText,
  notesText: resource.notesText,
  scheduleText: resource.scheduleText,

  // View Properties
  id: 'opportunitycontact_list',
  detailView: 'opportunitycontact_detail',
  selectView: 'contact_related',
  insertView: 'opportunitycontact_edit',
  security: 'Entities/Contact/View',
  queryOrderBy: null,
  expose: false,
  querySelect: [],
  modelName: MODEL_NAMES.OPPORTUNITYCONTACT,
  resourceKind: 'opportunityContacts',

  complete: function complete() {
    const view = App.getPrimaryActiveView();
    const selectionModel = view && view.get('selectionModel');
    let entry;

    if (!selectionModel) {
      return;
    }

    if (selectionModel.getSelectionCount() === 0 && view.options.allowEmptySelection) {
      ReUI.back();
    }

    const context = App.isNavigationFromResourceKind(['opportunities']);
    const selections = selectionModel.getSelections();

    for (const selectionKey in selections) {
      if (selections.hasOwnProperty(selectionKey)) {
        entry = {
          Opportunity: {
            $key: context.key,
          },
          Contact: view.entries[selectionKey],
        };
      }
    }

    if (entry) {
      this.navigateToInsertView(entry);
    }
  },
  createNavigationOptions: function createNavigationOptions() {
    const options = {
      query: this.expandExpression(this.options.prefilter),
      selectionOnly: true,
      singleSelect: true,
      singleSelectAction: 'complete',
      allowEmptySelection: false,
      enableActions: false,
      title: this.selectTitleText,
      select: [
        'Account/AccountName',
        'AccountName',
        'NameLF',
        'Title',
      ],
      tools: {
        tbar: [{
          id: 'complete',
          fn: this.complete,
          cls: 'invisible',
          scope: this,
        }, {
          id: 'cancel',
          side: 'left',
          fn: ReUI.back,
          scope: ReUI,
        }],
      },
    };
    return options;
  },
  navigateToInsertView: function navigateToInsertView(entry) {
    const view = App.getView(this.insertView);
    const options = {
      entry,
      insert: true,
    };
    if (view && options) {
      view.show(options, {
        returnTo: -1,
      });
    }
  },
  navigateToSelectView: function navigateToSelectView() {
    const view = App.getView(this.selectView);
    const options = this.createNavigationOptions();
    if (view && options) {
      view.show(options);
    }
  },
  createToolLayout: function createToolLayout() {
    return this.tools || (this.tools = {
      tbar: [{
        id: 'associate',
        title: this.selectTitleText,
        svg: 'add',
        action: 'navigateToSelectView',
        security: App.getViewSecurity(this.insertView, 'insert'),
      }],
    });
  },
  formatPicklist: function formatPicklist(property) {
    return format.picklist(this.app.picklistService, this._model, property);
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `(upper(Contact.NameLF) like "${q}%")`;
  },
});

export default __class;
