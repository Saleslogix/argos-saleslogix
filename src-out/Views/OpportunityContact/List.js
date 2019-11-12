define('crm/Views/OpportunityContact/List', ['module', 'exports', 'dojo/_base/declare', 'argos/List', 'argos/I18n', 'crm/Format', '../../Models/Names'], function (module, exports, _declare, _List, _I18n, _Format, _Names) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _List2 = _interopRequireDefault(_List);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _Format2 = _interopRequireDefault(_Format);

  var _Names2 = _interopRequireDefault(_Names);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('opportunityContactList');

  /**
   * @class crm.Views.OpportunityContact.List
   *
   * @extends argos.List
   */
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

  var __class = (0, _declare2.default)('crm.Views.OpportunityContact.List', [_List2.default], {
    // Template
    itemTemplate: new Simplate(['<p class="micro-text {% if ($.IsPrimary) { %} primary {% } %}">', '{% if ($.SalesRole) { %}', '{%: $$.formatPicklist("SalesRole")($.SalesRole) %} | ', '{% } %}', '{%: $.Contact.Title %}</p>']),

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
    modelName: _Names2.default.OPPORTUNITYCONTACT,
    resourceKind: 'opportunityContacts',

    complete: function complete() {
      var view = App.getPrimaryActiveView();
      var selectionModel = view && view.get('selectionModel');
      var entry = void 0;

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
            cls: 'invisible',
            scope: this
          }, {
            id: 'cancel',
            side: 'left',
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
      return _Format2.default.picklist(this.app.picklistService, this._model, property);
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return '(upper(Contact.NameLF) like "' + q + '%")';
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9PcHBvcnR1bml0eUNvbnRhY3QvTGlzdC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJpdGVtVGVtcGxhdGUiLCJTaW1wbGF0ZSIsInRpdGxlVGV4dCIsInNlbGVjdFRpdGxlVGV4dCIsImFjdGl2aXRpZXNUZXh0Iiwibm90ZXNUZXh0Iiwic2NoZWR1bGVUZXh0IiwiaWQiLCJkZXRhaWxWaWV3Iiwic2VsZWN0VmlldyIsImluc2VydFZpZXciLCJzZWN1cml0eSIsInF1ZXJ5T3JkZXJCeSIsImV4cG9zZSIsInF1ZXJ5U2VsZWN0IiwibW9kZWxOYW1lIiwiT1BQT1JUVU5JVFlDT05UQUNUIiwicmVzb3VyY2VLaW5kIiwiY29tcGxldGUiLCJ2aWV3IiwiQXBwIiwiZ2V0UHJpbWFyeUFjdGl2ZVZpZXciLCJzZWxlY3Rpb25Nb2RlbCIsImdldCIsImVudHJ5IiwiZ2V0U2VsZWN0aW9uQ291bnQiLCJvcHRpb25zIiwiYWxsb3dFbXB0eVNlbGVjdGlvbiIsIlJlVUkiLCJiYWNrIiwiY29udGV4dCIsImlzTmF2aWdhdGlvbkZyb21SZXNvdXJjZUtpbmQiLCJzZWxlY3Rpb25zIiwiZ2V0U2VsZWN0aW9ucyIsInNlbGVjdGlvbktleSIsImhhc093blByb3BlcnR5IiwiT3Bwb3J0dW5pdHkiLCIka2V5Iiwia2V5IiwiQ29udGFjdCIsImVudHJpZXMiLCJuYXZpZ2F0ZVRvSW5zZXJ0VmlldyIsImNyZWF0ZU5hdmlnYXRpb25PcHRpb25zIiwicXVlcnkiLCJleHBhbmRFeHByZXNzaW9uIiwicHJlZmlsdGVyIiwic2VsZWN0aW9uT25seSIsInNpbmdsZVNlbGVjdCIsInNpbmdsZVNlbGVjdEFjdGlvbiIsImVuYWJsZUFjdGlvbnMiLCJ0aXRsZSIsInNlbGVjdCIsInRvb2xzIiwidGJhciIsImZuIiwiY2xzIiwic2NvcGUiLCJzaWRlIiwiZ2V0VmlldyIsImluc2VydCIsInNob3ciLCJyZXR1cm5UbyIsIm5hdmlnYXRlVG9TZWxlY3RWaWV3IiwiY3JlYXRlVG9vbExheW91dCIsInN2ZyIsImFjdGlvbiIsImdldFZpZXdTZWN1cml0eSIsImZvcm1hdFBpY2tsaXN0IiwicHJvcGVydHkiLCJwaWNrbGlzdCIsImFwcCIsInBpY2tsaXN0U2VydmljZSIsIl9tb2RlbCIsImZvcm1hdFNlYXJjaFF1ZXJ5Iiwic2VhcmNoUXVlcnkiLCJxIiwiZXNjYXBlU2VhcmNoUXVlcnkiLCJ0b1VwcGVyQ2FzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE1BQU1BLFdBQVcsb0JBQVksd0JBQVosQ0FBakI7O0FBRUE7Ozs7O0FBdkJBOzs7Ozs7Ozs7Ozs7Ozs7QUE0QkEsTUFBTUMsVUFBVSx1QkFBUSxtQ0FBUixFQUE2QyxnQkFBN0MsRUFBcUQ7QUFDbkU7QUFDQUMsa0JBQWMsSUFBSUMsUUFBSixDQUFhLENBQ3pCLGlFQUR5QixFQUV6QiwwQkFGeUIsRUFHekIsdURBSHlCLEVBSXpCLFNBSnlCLEVBS3pCLDRCQUx5QixDQUFiLENBRnFEOztBQVVuRTtBQUNBQyxlQUFXSixTQUFTSSxTQVgrQztBQVluRUMscUJBQWlCTCxTQUFTSyxlQVp5QztBQWFuRUMsb0JBQWdCTixTQUFTTSxjQWIwQztBQWNuRUMsZUFBV1AsU0FBU08sU0FkK0M7QUFlbkVDLGtCQUFjUixTQUFTUSxZQWY0Qzs7QUFpQm5FO0FBQ0FDLFFBQUkseUJBbEIrRDtBQW1CbkVDLGdCQUFZLDJCQW5CdUQ7QUFvQm5FQyxnQkFBWSxpQkFwQnVEO0FBcUJuRUMsZ0JBQVkseUJBckJ1RDtBQXNCbkVDLGNBQVUsdUJBdEJ5RDtBQXVCbkVDLGtCQUFjLElBdkJxRDtBQXdCbkVDLFlBQVEsS0F4QjJEO0FBeUJuRUMsaUJBQWEsRUF6QnNEO0FBMEJuRUMsZUFBVyxnQkFBWUMsa0JBMUI0QztBQTJCbkVDLGtCQUFjLHFCQTNCcUQ7O0FBNkJuRUMsY0FBVSxTQUFTQSxRQUFULEdBQW9CO0FBQzVCLFVBQU1DLE9BQU9DLElBQUlDLG9CQUFKLEVBQWI7QUFDQSxVQUFN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NUIsQ0FBUDtBQVNELEtBeEhrRTtBQXlIbkV5RCxvQkFBZ0IsU0FBU0EsY0FBVCxDQUF3QkMsUUFBeEIsRUFBa0M7QUFDaEQsYUFBTyxpQkFBT0MsUUFBUCxDQUFnQixLQUFLQyxHQUFMLENBQVNDLGVBQXpCLEVBQTBDLEtBQUtDLE1BQS9DLEVBQXVESixRQUF2RCxDQUFQO0FBQ0QsS0EzSGtFO0FBNEhuRUssdUJBQW1CLFNBQVNBLGlCQUFULENBQTJCQyxXQUEzQixFQUF3QztBQUN6RCxVQUFNQyxJQUFJLEtBQUtDLGlCQUFMLENBQXVCRixZQUFZRyxXQUFaLEVBQXZCLENBQVY7QUFDQSwrQ0FBdUNGLENBQXZDO0FBQ0Q7QUEvSGtFLEdBQXJELENBQWhCOztvQkFrSWU1RSxPIiwiZmlsZSI6Ikxpc3QuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgTGlzdCBmcm9tICdhcmdvcy9MaXN0JztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJ2NybS9Gb3JtYXQnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vLi4vTW9kZWxzL05hbWVzJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ29wcG9ydHVuaXR5Q29udGFjdExpc3QnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLk9wcG9ydHVuaXR5Q29udGFjdC5MaXN0XHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkxpc3RcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuT3Bwb3J0dW5pdHlDb250YWN0Lkxpc3QnLCBbTGlzdF0sIHtcclxuICAvLyBUZW1wbGF0ZVxyXG4gIGl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHQgeyUgaWYgKCQuSXNQcmltYXJ5KSB7ICV9IHByaW1hcnkgeyUgfSAlfVwiPicsXHJcbiAgICAneyUgaWYgKCQuU2FsZXNSb2xlKSB7ICV9JyxcclxuICAgICd7JTogJCQuZm9ybWF0UGlja2xpc3QoXCJTYWxlc1JvbGVcIikoJC5TYWxlc1JvbGUpICV9IHwgJyxcclxuICAgICd7JSB9ICV9JyxcclxuICAgICd7JTogJC5Db250YWN0LlRpdGxlICV9PC9wPicsXHJcbiAgXSksXHJcblxyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIHNlbGVjdFRpdGxlVGV4dDogcmVzb3VyY2Uuc2VsZWN0VGl0bGVUZXh0LFxyXG4gIGFjdGl2aXRpZXNUZXh0OiByZXNvdXJjZS5hY3Rpdml0aWVzVGV4dCxcclxuICBub3Rlc1RleHQ6IHJlc291cmNlLm5vdGVzVGV4dCxcclxuICBzY2hlZHVsZVRleHQ6IHJlc291cmNlLnNjaGVkdWxlVGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdvcHBvcnR1bml0eWNvbnRhY3RfbGlzdCcsXHJcbiAgZGV0YWlsVmlldzogJ29wcG9ydHVuaXR5Y29udGFjdF9kZXRhaWwnLFxyXG4gIHNlbGVjdFZpZXc6ICdjb250YWN0X3JlbGF0ZWQnLFxyXG4gIGluc2VydFZpZXc6ICdvcHBvcnR1bml0eWNvbnRhY3RfZWRpdCcsXHJcbiAgc2VjdXJpdHk6ICdFbnRpdGllcy9Db250YWN0L1ZpZXcnLFxyXG4gIHF1ZXJ5T3JkZXJCeTogbnVsbCxcclxuICBleHBvc2U6IGZhbHNlLFxyXG4gIHF1ZXJ5U2VsZWN0OiBbXSxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLk9QUE9SVFVOSVRZQ09OVEFDVCxcclxuICByZXNvdXJjZUtpbmQ6ICdvcHBvcnR1bml0eUNvbnRhY3RzJyxcclxuXHJcbiAgY29tcGxldGU6IGZ1bmN0aW9uIGNvbXBsZXRlKCkge1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRQcmltYXJ5QWN0aXZlVmlldygpO1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uTW9kZWwgPSB2aWV3ICYmIHZpZXcuZ2V0KCdzZWxlY3Rpb25Nb2RlbCcpO1xyXG4gICAgbGV0IGVudHJ5O1xyXG5cclxuICAgIGlmICghc2VsZWN0aW9uTW9kZWwpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzZWxlY3Rpb25Nb2RlbC5nZXRTZWxlY3Rpb25Db3VudCgpID09PSAwICYmIHZpZXcub3B0aW9ucy5hbGxvd0VtcHR5U2VsZWN0aW9uKSB7XHJcbiAgICAgIFJlVUkuYmFjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNvbnRleHQgPSBBcHAuaXNOYXZpZ2F0aW9uRnJvbVJlc291cmNlS2luZChbJ29wcG9ydHVuaXRpZXMnXSk7XHJcbiAgICBjb25zdCBzZWxlY3Rpb25zID0gc2VsZWN0aW9uTW9kZWwuZ2V0U2VsZWN0aW9ucygpO1xyXG5cclxuICAgIGZvciAoY29uc3Qgc2VsZWN0aW9uS2V5IGluIHNlbGVjdGlvbnMpIHtcclxuICAgICAgaWYgKHNlbGVjdGlvbnMuaGFzT3duUHJvcGVydHkoc2VsZWN0aW9uS2V5KSkge1xyXG4gICAgICAgIGVudHJ5ID0ge1xyXG4gICAgICAgICAgT3Bwb3J0dW5pdHk6IHtcclxuICAgICAgICAgICAgJGtleTogY29udGV4dC5rZXksXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgQ29udGFjdDogdmlldy5lbnRyaWVzW3NlbGVjdGlvbktleV0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChlbnRyeSkge1xyXG4gICAgICB0aGlzLm5hdmlnYXRlVG9JbnNlcnRWaWV3KGVudHJ5KTtcclxuICAgIH1cclxuICB9LFxyXG4gIGNyZWF0ZU5hdmlnYXRpb25PcHRpb25zOiBmdW5jdGlvbiBjcmVhdGVOYXZpZ2F0aW9uT3B0aW9ucygpIHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgIHF1ZXJ5OiB0aGlzLmV4cGFuZEV4cHJlc3Npb24odGhpcy5vcHRpb25zLnByZWZpbHRlciksXHJcbiAgICAgIHNlbGVjdGlvbk9ubHk6IHRydWUsXHJcbiAgICAgIHNpbmdsZVNlbGVjdDogdHJ1ZSxcclxuICAgICAgc2luZ2xlU2VsZWN0QWN0aW9uOiAnY29tcGxldGUnLFxyXG4gICAgICBhbGxvd0VtcHR5U2VsZWN0aW9uOiBmYWxzZSxcclxuICAgICAgZW5hYmxlQWN0aW9uczogZmFsc2UsXHJcbiAgICAgIHRpdGxlOiB0aGlzLnNlbGVjdFRpdGxlVGV4dCxcclxuICAgICAgc2VsZWN0OiBbXHJcbiAgICAgICAgJ0FjY291bnQvQWNjb3VudE5hbWUnLFxyXG4gICAgICAgICdBY2NvdW50TmFtZScsXHJcbiAgICAgICAgJ05hbWVMRicsXHJcbiAgICAgICAgJ1RpdGxlJyxcclxuICAgICAgXSxcclxuICAgICAgdG9vbHM6IHtcclxuICAgICAgICB0YmFyOiBbe1xyXG4gICAgICAgICAgaWQ6ICdjb21wbGV0ZScsXHJcbiAgICAgICAgICBmbjogdGhpcy5jb21wbGV0ZSxcclxuICAgICAgICAgIGNsczogJ2ludmlzaWJsZScsXHJcbiAgICAgICAgICBzY29wZTogdGhpcyxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICBpZDogJ2NhbmNlbCcsXHJcbiAgICAgICAgICBzaWRlOiAnbGVmdCcsXHJcbiAgICAgICAgICBmbjogUmVVSS5iYWNrLFxyXG4gICAgICAgICAgc2NvcGU6IFJlVUksXHJcbiAgICAgICAgfV0sXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgfSxcclxuICBuYXZpZ2F0ZVRvSW5zZXJ0VmlldzogZnVuY3Rpb24gbmF2aWdhdGVUb0luc2VydFZpZXcoZW50cnkpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyh0aGlzLmluc2VydFZpZXcpO1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgZW50cnksXHJcbiAgICAgIGluc2VydDogdHJ1ZSxcclxuICAgIH07XHJcbiAgICBpZiAodmlldyAmJiBvcHRpb25zKSB7XHJcbiAgICAgIHZpZXcuc2hvdyhvcHRpb25zLCB7XHJcbiAgICAgICAgcmV0dXJuVG86IC0xLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIG5hdmlnYXRlVG9TZWxlY3RWaWV3OiBmdW5jdGlvbiBuYXZpZ2F0ZVRvU2VsZWN0VmlldygpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyh0aGlzLnNlbGVjdFZpZXcpO1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuY3JlYXRlTmF2aWdhdGlvbk9wdGlvbnMoKTtcclxuICAgIGlmICh2aWV3ICYmIG9wdGlvbnMpIHtcclxuICAgICAgdmlldy5zaG93KG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgY3JlYXRlVG9vbExheW91dDogZnVuY3Rpb24gY3JlYXRlVG9vbExheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLnRvb2xzIHx8ICh0aGlzLnRvb2xzID0ge1xyXG4gICAgICB0YmFyOiBbe1xyXG4gICAgICAgIGlkOiAnYXNzb2NpYXRlJyxcclxuICAgICAgICB0aXRsZTogdGhpcy5zZWxlY3RUaXRsZVRleHQsXHJcbiAgICAgICAgc3ZnOiAnYWRkJyxcclxuICAgICAgICBhY3Rpb246ICduYXZpZ2F0ZVRvU2VsZWN0VmlldycsXHJcbiAgICAgICAgc2VjdXJpdHk6IEFwcC5nZXRWaWV3U2VjdXJpdHkodGhpcy5pbnNlcnRWaWV3LCAnaW5zZXJ0JyksXHJcbiAgICAgIH1dLFxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBmb3JtYXRQaWNrbGlzdDogZnVuY3Rpb24gZm9ybWF0UGlja2xpc3QocHJvcGVydHkpIHtcclxuICAgIHJldHVybiBmb3JtYXQucGlja2xpc3QodGhpcy5hcHAucGlja2xpc3RTZXJ2aWNlLCB0aGlzLl9tb2RlbCwgcHJvcGVydHkpO1xyXG4gIH0sXHJcbiAgZm9ybWF0U2VhcmNoUXVlcnk6IGZ1bmN0aW9uIGZvcm1hdFNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5KSB7XHJcbiAgICBjb25zdCBxID0gdGhpcy5lc2NhcGVTZWFyY2hRdWVyeShzZWFyY2hRdWVyeS50b1VwcGVyQ2FzZSgpKTtcclxuICAgIHJldHVybiBgKHVwcGVyKENvbnRhY3QuTmFtZUxGKSBsaWtlIFwiJHtxfSVcIilgO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19