define("crm/Views/OpportunityContact/List", ["exports", "dojo/_base/declare", "argos/List", "argos/I18n", "crm/Format", "../../Models/Names"], function (_exports, _declare, _List, _I18n, _Format, _Names) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _List = _interopRequireDefault(_List);
  _I18n = _interopRequireDefault(_I18n);
  _Format = _interopRequireDefault(_Format);
  _Names = _interopRequireDefault(_Names);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
  var resource = (0, _I18n["default"])('opportunityContactList');

  var __class = (0, _declare["default"])('crm.Views.OpportunityContact.List', [_List["default"]], {
    // Template
    itemTemplate: new Simplate(['<p class="micro-text {% if ($.IsPrimary) { %} primary {% } %}">', '{% if ($.SalesRole) { %}', '{%: $$.formatPicklist("SalesRole")($.SalesRole) %} | ', '{% } %}', '{%: $.Contact.Title %}</p>']),
    // Localization
    titleText: resource.titleText,
    selectTitleText: resource.selectTitleText,
    activitiesText: resource.activitiesText,
    notesText: resource.notesText,
    scheduleText: resource.scheduleText,
    cancelText: resource.cancelText,
    // View Properties
    id: 'opportunitycontact_list',
    detailView: 'opportunitycontact_detail',
    selectView: 'contact_related',
    insertView: 'opportunitycontact_edit',
    security: 'Entities/Contact/View',
    queryOrderBy: null,
    expose: false,
    querySelect: [],
    modelName: _Names["default"].OPPORTUNITYCONTACT,
    resourceKind: 'opportunityContacts',
    complete: function complete() {
      var view = App.getPrimaryActiveView();
      var selectionModel = view && view.get('selectionModel');
      var entry;

      if (!selectionModel) {
        return;
      }

      if (selectionModel.getSelectionCount() === 0 && view.options.allowEmptySelection) {
        ReUI.back();
      }

      var context = App.isNavigationFromResourceKind(['opportunities']);
      var selections = selectionModel.getSelections();

      for (var selectionKey in selections) {
        if (selections.hasOwnProperty(selectionKey)) {
          entry = {
            Opportunity: {
              $key: context.key
            },
            Contact: view.entries[selectionKey]
          };
        }
      }

      if (entry) {
        this.navigateToInsertView(entry);
      }
    },
    createNavigationOptions: function createNavigationOptions() {
      var options = {
        query: this.expandExpression(this.options.prefilter),
        selectionOnly: true,
        singleSelect: true,
        singleSelectAction: 'complete',
        allowEmptySelection: false,
        enableActions: false,
        title: this.selectTitleText,
        select: ['Account/AccountName', 'AccountName', 'NameLF', 'Title'],
        tools: {
          tbar: [{
            id: 'complete',
            fn: this.complete,
            cls: 'hidden',
            scope: this
          }, {
            id: 'cancel',
            side: 'left',
            svg: 'cancel',
            title: this.cancelText,
            fn: ReUI.back,
            scope: ReUI
          }]
        }
      };
      return options;
    },
    navigateToInsertView: function navigateToInsertView(entry) {
      var view = App.getView(this.insertView);
      var options = {
        entry: entry,
        insert: true
      };

      if (view && options) {
        view.show(options, {
          returnTo: -1
        });
      }
    },
    navigateToSelectView: function navigateToSelectView() {
      var view = App.getView(this.selectView);
      var options = this.createNavigationOptions();

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
          security: App.getViewSecurity(this.insertView, 'insert')
        }]
      });
    },
    formatPicklist: function formatPicklist(property) {
      return _Format["default"].picklist(this.app.picklistService, this._model, property);
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return "(upper(Contact.NameLF) like \"".concat(q, "%\")");
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});