define('crm/Views/RelatedEditWidget', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/event', 'dojo/on', 'dojo/_base/connect', 'argos/RelatedViewManager', 'argos/_RelatedViewWidgetBase', 'argos/Edit'], function (module, exports, _declare, _event, _on, _connect, _RelatedViewManager, _RelatedViewWidgetBase2, _Edit) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _event2 = _interopRequireDefault(_event);

  var _on2 = _interopRequireDefault(_on);

  var _connect2 = _interopRequireDefault(_connect);

  var _RelatedViewManager2 = _interopRequireDefault(_RelatedViewManager);

  var _RelatedViewWidgetBase3 = _interopRequireDefault(_RelatedViewWidgetBase2);

  var _Edit2 = _interopRequireDefault(_Edit);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var __class = (0, _declare2.default)('crm.Views.RelatedEditWidget', [_RelatedViewWidgetBase3.default], {
    cls: 'related-edit-widget',
    owner: null,
    id: 'related-edit-widget',
    editView: null,
    toolBarTemplate: new Simplate(['<div class="toolBar">', '<button class="button toolButton toolButton-right  fa fa-save fa-fw fa-lg" data-action="save"></button>', '<div>']),
    onLoad: function onLoad() {
      this.processEntry(this.parentEntry);
    },
    processEntry: function processEntry(entry) {
      var Ctor = this.editView ? this.editView : _Edit2.default;
      var editView = new Ctor({
        id: this.id + '_edit'
      });
      if (editView && !editView._started) {
        editView.sectionBeginTemplate = new Simplate(['<fieldset class="{%= ($.cls || $.options.cls) %}">']);
        editView.init();
        editView._started = true;
        editView.onUpdateCompleted = this.onUpdateCompleted.bind(this);
      }
      // Add the toolbar for save
      var toolBarNode = $(this.toolBarTemplate.apply(entry, this)).get(0);
      (0, _on2.default)(toolBarNode, 'click', this.onInvokeToolBarAction.bind(this));
      $(this.containerNode).append(toolBarNode);

      // Add the edit view to view
      editView.placeAt(this.containerNode, 'last');

      var options = {
        select: this.getEditSelect(),
        key: entry.$key
      };
      editView.options = options;
      editView.activate();
      editView.requestData();
      this.editViewInstance = editView;
    },
    onInvokeToolBarAction: function onInvokeToolBarAction(evt) {
      this.editViewInstance.save();
      _event2.default.stop(evt);
    },
    getEditLayout: function getEditLayout() {
      var editLayout = [];
      if (this.layout) {
        this.layout.forEach(function (item) {
          if (!item.readonly) {
            editLayout.push(item);
          }
        });
      }
      return editLayout;
    },
    getEditSelect: function getEditSelect() {
      var select = null;
      if (this.formModel) {
        select = this.formModel.getEditSelect();
      }
      return select;
    },
    onUpdateCompleted: function onUpdateCompleted() {
      if (this.owner && this.owner._refreshClicked) {
        this.owner._refreshClicked();
      }
      this.inherited(onUpdateCompleted, arguments);
    },
    destroy: function destroy() {
      this._subscribes.forEach(function (handle) {
        _connect2.default.unsubscribe(handle);
      });

      if (this.editViewInstance) {
        for (var name in this.editViewInstance.fields) {
          if (this.editViewInstance.fields.hasOwnProperty(name)) {
            this.editViewInstance.fields[name].destroy();
          }
        }
        this.editViewInstance.destroy();
      }
      this.inherited(destroy, arguments);
    }
  }); /* Copyright 2017 Infor
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

  var rvm = new _RelatedViewManager2.default();
  rvm.registerType('relatedEdit', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9SZWxhdGVkRWRpdFdpZGdldC5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiY2xzIiwib3duZXIiLCJpZCIsImVkaXRWaWV3IiwidG9vbEJhclRlbXBsYXRlIiwiU2ltcGxhdGUiLCJvbkxvYWQiLCJwcm9jZXNzRW50cnkiLCJwYXJlbnRFbnRyeSIsImVudHJ5IiwiQ3RvciIsIl9zdGFydGVkIiwic2VjdGlvbkJlZ2luVGVtcGxhdGUiLCJpbml0Iiwib25VcGRhdGVDb21wbGV0ZWQiLCJiaW5kIiwidG9vbEJhck5vZGUiLCIkIiwiYXBwbHkiLCJnZXQiLCJvbkludm9rZVRvb2xCYXJBY3Rpb24iLCJjb250YWluZXJOb2RlIiwiYXBwZW5kIiwicGxhY2VBdCIsIm9wdGlvbnMiLCJzZWxlY3QiLCJnZXRFZGl0U2VsZWN0Iiwia2V5IiwiJGtleSIsImFjdGl2YXRlIiwicmVxdWVzdERhdGEiLCJlZGl0Vmlld0luc3RhbmNlIiwiZXZ0Iiwic2F2ZSIsInN0b3AiLCJnZXRFZGl0TGF5b3V0IiwiZWRpdExheW91dCIsImxheW91dCIsImZvckVhY2giLCJpdGVtIiwicmVhZG9ubHkiLCJwdXNoIiwiZm9ybU1vZGVsIiwiX3JlZnJlc2hDbGlja2VkIiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiZGVzdHJveSIsIl9zdWJzY3JpYmVzIiwiaGFuZGxlIiwidW5zdWJzY3JpYmUiLCJuYW1lIiwiZmllbGRzIiwiaGFzT3duUHJvcGVydHkiLCJydm0iLCJyZWdpc3RlclR5cGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsTUFBTUEsVUFBVSx1QkFBUSw2QkFBUixFQUF1QyxpQ0FBdkMsRUFBaUU7QUFDL0VDLFNBQUsscUJBRDBFO0FBRS9FQyxXQUFPLElBRndFO0FBRy9FQyxRQUFJLHFCQUgyRTtBQUkvRUMsY0FBVSxJQUpxRTtBQUsvRUMscUJBQWlCLElBQUlDLFFBQUosQ0FBYSxDQUM1Qix1QkFENEIsRUFF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T0FGRDs7QUFJQSxVQUFJLEtBQUtqQixnQkFBVCxFQUEyQjtBQUN6QixhQUFLLElBQU1tQixJQUFYLElBQW1CLEtBQUtuQixnQkFBTCxDQUFzQm9CLE1BQXpDLEVBQWlEO0FBQy9DLGNBQUksS0FBS3BCLGdCQUFMLENBQXNCb0IsTUFBdEIsQ0FBNkJDLGNBQTdCLENBQTRDRixJQUE1QyxDQUFKLEVBQXVEO0FBQ3JELGlCQUFLbkIsZ0JBQUwsQ0FBc0JvQixNQUF0QixDQUE2QkQsSUFBN0IsRUFBbUNKLE9BQW5DO0FBQ0Q7QUFDRjtBQUNELGFBQUtmLGdCQUFMLENBQXNCZSxPQUF0QjtBQUNEO0FBQ0QsV0FBS0YsU0FBTCxDQUFlRSxPQUFmLEVBQXdCRCxTQUF4QjtBQUNEO0FBckY4RSxHQUFqRSxDQUFoQixDLENBeEJBOzs7Ozs7Ozs7Ozs7Ozs7QUErR0EsTUFBTVEsTUFBTSxrQ0FBWjtBQUNBQSxNQUFJQyxZQUFKLENBQWlCLGFBQWpCLEVBQWdDdkQsT0FBaEM7b0JBQ2VBLE8iLCJmaWxlIjoiUmVsYXRlZEVkaXRXaWRnZXQuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgZXZlbnQgZnJvbSAnZG9qby9fYmFzZS9ldmVudCc7XHJcbmltcG9ydCBvbiBmcm9tICdkb2pvL29uJztcclxuaW1wb3J0IGNvbm5lY3QgZnJvbSAnZG9qby9fYmFzZS9jb25uZWN0JztcclxuaW1wb3J0IFJlbGF0ZWRWaWV3TWFuYWdlciBmcm9tICdhcmdvcy9SZWxhdGVkVmlld01hbmFnZXInO1xyXG5pbXBvcnQgX1JlbGF0ZWRWaWV3V2lkZ2V0QmFzZSBmcm9tICdhcmdvcy9fUmVsYXRlZFZpZXdXaWRnZXRCYXNlJztcclxuaW1wb3J0IEVkaXQgZnJvbSAnYXJnb3MvRWRpdCc7XHJcblxyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5SZWxhdGVkRWRpdFdpZGdldCcsIFtfUmVsYXRlZFZpZXdXaWRnZXRCYXNlXSwge1xyXG4gIGNsczogJ3JlbGF0ZWQtZWRpdC13aWRnZXQnLFxyXG4gIG93bmVyOiBudWxsLFxyXG4gIGlkOiAncmVsYXRlZC1lZGl0LXdpZGdldCcsXHJcbiAgZWRpdFZpZXc6IG51bGwsXHJcbiAgdG9vbEJhclRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxkaXYgY2xhc3M9XCJ0b29sQmFyXCI+JyxcclxuICAgICc8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIHRvb2xCdXR0b24gdG9vbEJ1dHRvbi1yaWdodCAgZmEgZmEtc2F2ZSBmYS1mdyBmYS1sZ1wiIGRhdGEtYWN0aW9uPVwic2F2ZVwiPjwvYnV0dG9uPicsXHJcbiAgICAnPGRpdj4nLFxyXG4gIF0pLFxyXG4gIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xyXG4gICAgdGhpcy5wcm9jZXNzRW50cnkodGhpcy5wYXJlbnRFbnRyeSk7XHJcbiAgfSxcclxuICBwcm9jZXNzRW50cnk6IGZ1bmN0aW9uIHByb2Nlc3NFbnRyeShlbnRyeSkge1xyXG4gICAgY29uc3QgQ3RvciA9ICh0aGlzLmVkaXRWaWV3KSA/IHRoaXMuZWRpdFZpZXcgOiBFZGl0O1xyXG4gICAgY29uc3QgZWRpdFZpZXcgPSBuZXcgQ3Rvcih7XHJcbiAgICAgIGlkOiBgJHt0aGlzLmlkfV9lZGl0YCxcclxuICAgIH0pO1xyXG4gICAgaWYgKGVkaXRWaWV3ICYmICFlZGl0Vmlldy5fc3RhcnRlZCkge1xyXG4gICAgICBlZGl0Vmlldy5zZWN0aW9uQmVnaW5UZW1wbGF0ZSA9IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAgICAgJzxmaWVsZHNldCBjbGFzcz1cInslPSAoJC5jbHMgfHwgJC5vcHRpb25zLmNscykgJX1cIj4nLFxyXG4gICAgICBdKTtcclxuICAgICAgZWRpdFZpZXcuaW5pdCgpO1xyXG4gICAgICBlZGl0Vmlldy5fc3RhcnRlZCA9IHRydWU7XHJcbiAgICAgIGVkaXRWaWV3Lm9uVXBkYXRlQ29tcGxldGVkID0gdGhpcy5vblVwZGF0ZUNvbXBsZXRlZC5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgLy8gQWRkIHRoZSB0b29sYmFyIGZvciBzYXZlXHJcbiAgICBjb25zdCB0b29sQmFyTm9kZSA9ICQodGhpcy50b29sQmFyVGVtcGxhdGUuYXBwbHkoZW50cnksIHRoaXMpKS5nZXQoMCk7XHJcbiAgICBvbih0b29sQmFyTm9kZSwgJ2NsaWNrJywgdGhpcy5vbkludm9rZVRvb2xCYXJBY3Rpb24uYmluZCh0aGlzKSk7XHJcbiAgICAkKHRoaXMuY29udGFpbmVyTm9kZSkuYXBwZW5kKHRvb2xCYXJOb2RlKTtcclxuXHJcbiAgICAvLyBBZGQgdGhlIGVkaXQgdmlldyB0byB2aWV3XHJcbiAgICBlZGl0Vmlldy5wbGFjZUF0KHRoaXMuY29udGFpbmVyTm9kZSwgJ2xhc3QnKTtcclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICBzZWxlY3Q6IHRoaXMuZ2V0RWRpdFNlbGVjdCgpLFxyXG4gICAgICBrZXk6IGVudHJ5LiRrZXksXHJcbiAgICB9O1xyXG4gICAgZWRpdFZpZXcub3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICBlZGl0Vmlldy5hY3RpdmF0ZSgpO1xyXG4gICAgZWRpdFZpZXcucmVxdWVzdERhdGEoKTtcclxuICAgIHRoaXMuZWRpdFZpZXdJbnN0YW5jZSA9IGVkaXRWaWV3O1xyXG4gIH0sXHJcbiAgb25JbnZva2VUb29sQmFyQWN0aW9uOiBmdW5jdGlvbiBvbkludm9rZVRvb2xCYXJBY3Rpb24oZXZ0KSB7XHJcbiAgICB0aGlzLmVkaXRWaWV3SW5zdGFuY2Uuc2F2ZSgpO1xyXG4gICAgZXZlbnQuc3RvcChldnQpO1xyXG4gIH0sXHJcbiAgZ2V0RWRpdExheW91dDogZnVuY3Rpb24gZ2V0RWRpdExheW91dCgpIHtcclxuICAgIGNvbnN0IGVkaXRMYXlvdXQgPSBbXTtcclxuICAgIGlmICh0aGlzLmxheW91dCkge1xyXG4gICAgICB0aGlzLmxheW91dC5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgaWYgKCFpdGVtLnJlYWRvbmx5KSB7XHJcbiAgICAgICAgICBlZGl0TGF5b3V0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBlZGl0TGF5b3V0O1xyXG4gIH0sXHJcbiAgZ2V0RWRpdFNlbGVjdDogZnVuY3Rpb24gZ2V0RWRpdFNlbGVjdCgpIHtcclxuICAgIGxldCBzZWxlY3QgPSBudWxsO1xyXG4gICAgaWYgKHRoaXMuZm9ybU1vZGVsKSB7XHJcbiAgICAgIHNlbGVjdCA9IHRoaXMuZm9ybU1vZGVsLmdldEVkaXRTZWxlY3QoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzZWxlY3Q7XHJcbiAgfSxcclxuICBvblVwZGF0ZUNvbXBsZXRlZDogZnVuY3Rpb24gb25VcGRhdGVDb21wbGV0ZWQoKSB7XHJcbiAgICBpZiAodGhpcy5vd25lciAmJiB0aGlzLm93bmVyLl9yZWZyZXNoQ2xpY2tlZCkge1xyXG4gICAgICB0aGlzLm93bmVyLl9yZWZyZXNoQ2xpY2tlZCgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pbmhlcml0ZWQob25VcGRhdGVDb21wbGV0ZWQsIGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xyXG4gICAgdGhpcy5fc3Vic2NyaWJlcy5mb3JFYWNoKChoYW5kbGUpID0+IHtcclxuICAgICAgY29ubmVjdC51bnN1YnNjcmliZShoYW5kbGUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHRoaXMuZWRpdFZpZXdJbnN0YW5jZSkge1xyXG4gICAgICBmb3IgKGNvbnN0IG5hbWUgaW4gdGhpcy5lZGl0Vmlld0luc3RhbmNlLmZpZWxkcykge1xyXG4gICAgICAgIGlmICh0aGlzLmVkaXRWaWV3SW5zdGFuY2UuZmllbGRzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XHJcbiAgICAgICAgICB0aGlzLmVkaXRWaWV3SW5zdGFuY2UuZmllbGRzW25hbWVdLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5lZGl0Vmlld0luc3RhbmNlLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIHRoaXMuaW5oZXJpdGVkKGRlc3Ryb3ksIGFyZ3VtZW50cyk7XHJcbiAgfSxcclxufSk7XHJcbmNvbnN0IHJ2bSA9IG5ldyBSZWxhdGVkVmlld01hbmFnZXIoKTtcclxucnZtLnJlZ2lzdGVyVHlwZSgncmVsYXRlZEVkaXQnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19