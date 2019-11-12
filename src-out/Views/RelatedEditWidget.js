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
      this.inherited(arguments);
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
      this.inherited(arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9SZWxhdGVkRWRpdFdpZGdldC5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiY2xzIiwib3duZXIiLCJpZCIsImVkaXRWaWV3IiwidG9vbEJhclRlbXBsYXRlIiwiU2ltcGxhdGUiLCJvbkxvYWQiLCJwcm9jZXNzRW50cnkiLCJwYXJlbnRFbnRyeSIsImVudHJ5IiwiQ3RvciIsIl9zdGFydGVkIiwic2VjdGlvbkJlZ2luVGVtcGxhdGUiLCJpbml0Iiwib25VcGRhdGVDb21wbGV0ZWQiLCJiaW5kIiwidG9vbEJhck5vZGUiLCIkIiwiYXBwbHkiLCJnZXQiLCJvbkludm9rZVRvb2xCYXJBY3Rpb24iLCJjb250YWluZXJOb2RlIiwiYXBwZW5kIiwicGxhY2VBdCIsIm9wdGlvbnMiLCJzZWxlY3QiLCJnZXRFZGl0U2VsZWN0Iiwia2V5IiwiJGtleSIsImFjdGl2YXRlIiwicmVxdWVzdERhdGEiLCJlZGl0Vmlld0luc3RhbmNlIiwiZXZ0Iiwic2F2ZSIsInN0b3AiLCJnZXRFZGl0TGF5b3V0IiwiZWRpdExheW91dCIsImxheW91dCIsImZvckVhY2giLCJpdGVtIiwicmVhZG9ubHkiLCJwdXNoIiwiZm9ybU1vZGVsIiwiX3JlZnJlc2hDbGlja2VkIiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiZGVzdHJveSIsIl9zdWJzY3JpYmVzIiwiaGFuZGxlIiwidW5zdWJzY3JpYmUiLCJuYW1lIiwiZmllbGRzIiwiaGFzT3duUHJvcGVydHkiLCJydm0iLCJyZWdpc3RlclR5cGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsTUFBTUEsVUFBVSx1QkFBUSw2QkFBUixFQUF1QyxpQ0FBdkMsRUFBaUU7QUFDL0VDLFNBQUsscUJBRDBFO0FBRS9FQyxXQUFPLElBRndFO0FBRy9FQyxRQUFJLHFCQUgyRTtBQUkvRUMsY0FBVSxJQUpxRTtBQUsvRUMscUJBQWlCLElBQUlDLFFBQUosQ0FBYSxDQUM1Qix1QkFENEIsRUFFNUIseUdBRjRCLEVBRzVCLE9BSDRCLENBQWIsQ0FMOEQ7QUFVL0VDLFlBQVEsU0FBU0EsTUFBVCxHQUFrQjtBQUN4QixXQUFLQyxZQUFMLENBQWtCLEtBQUtDLFdBQXZCO0FBQ0QsS0FaOEU7QUFhL0VELGtCQUFjLFNBQVNBLFlBQVQsQ0FBc0JFLEtBQXRCLEVBQTZCO0FBQ3pDLFVBQU1DLE9BQVEsS0FBS1AsUUFBTixHQUFrQixLQUFLQSxRQUF2QixpQkFBYjtBQUNBLFVBQU1BLFdBQVcsSUFBSU8sSUFBSixDQUFTO0FBQ3hCUixZQUFPLEtBQUtBLEVBQVo7QUFEd0IsT0FBVCxDQUFqQjtBQUdBLFVBQUlDLFlBQVksQ0FBQ0EsU0FBU1EsUUFBMUIsRUFBb0M7QUFDbENSLGlCQUFTUyxvQkFBVCxHQUFnQyxJQUFJUCxRQUFKLENBQWEsQ0FDM0Msb0RBRDJDLENBQWIsQ0FBaEM7QUFHQUYsaUJBQVNVLElBQVQ7QUFDQVYsaUJBQVNRLFFBQVQsR0FBb0IsSUFBcEI7QUFDQVIsaUJBQVNXLGlCQUFULEdBQTZCLEtBQUtBLGlCQUFMLENBQXVCQyxJQUF2QixDQUE0QixJQUE1QixDQUE3QjtBQUNEO0FBQ0Q7QUFDQSxVQUFNQyxjQUFjQyxFQUFFLEtBQUtiLGVBQUwsQ0FBcUJjLEtBQXJCLENBQTJCVCxLQUEzQixFQUFrQyxJQUFsQyxDQUFGLEVBQTJDVSxHQUEzQyxDQUErQyxDQUEvQyxDQUFwQjtBQUNBLHdCQUFHSCxXQUFILEVBQWdCLE9BQWhCLEVBQXlCLEtBQUtJLHFCQUFMLENBQTJCTCxJQUEzQixDQUFnQyxJQUFoQyxDQUF6QjtBQUNBRSxRQUFFLEtBQUtJLGFBQVAsRUFBc0JDLE1BQXRCLENBQTZCTixXQUE3Qjs7QUFFQTtBQUNBYixlQUFTb0IsT0FBVCxDQUFpQixLQUFLRixhQUF0QixFQUFxQyxNQUFyQzs7QUFFQSxVQUFNRyxVQUFVO0FBQ2RDLGdCQUFRLEtBQUtDLGFBQUwsRUFETTtBQUVkQyxhQUFLbEIsTUFBTW1CO0FBRkcsT0FBaEI7QUFJQXpCLGVBQVNxQixPQUFULEdBQW1CQSxPQUFuQjtBQUNBckIsZUFBUzBCLFFBQVQ7QUFDQTFCLGVBQVMyQixXQUFUO0FBQ0EsV0FBS0MsZ0JBQUwsR0FBd0I1QixRQUF4QjtBQUNELEtBMUM4RTtBQTJDL0VpQiwyQkFBdUIsU0FBU0EscUJBQVQsQ0FBK0JZLEdBQS9CLEVBQW9DO0FBQ3pELFdBQUtELGdCQUFMLENBQXNCRSxJQUF0QjtBQUNBLHNCQUFNQyxJQUFOLENBQVdGLEdBQVg7QUFDRCxLQTlDOEU7QUErQy9FRyxtQkFBZSxTQUFTQSxhQUFULEdBQXlCO0FBQ3RDLFVBQU1DLGFBQWEsRUFBbkI7QUFDQSxVQUFJLEtBQUtDLE1BQVQsRUFBaUI7QUFDZixhQUFLQSxNQUFMLENBQVlDLE9BQVosQ0FBb0IsVUFBQ0MsSUFBRCxFQUFVO0FBQzVCLGNBQUksQ0FBQ0EsS0FBS0MsUUFBVixFQUFvQjtBQUNsQkosdUJBQVdLLElBQVgsQ0FBZ0JGLElBQWhCO0FBQ0Q7QUFDRixTQUpEO0FBS0Q7QUFDRCxhQUFPSCxVQUFQO0FBQ0QsS0F6RDhFO0FBMEQvRVYsbUJBQWUsU0FBU0EsYUFBVCxHQUF5QjtBQUN0QyxVQUFJRCxTQUFTLElBQWI7QUFDQSxVQUFJLEtBQUtpQixTQUFULEVBQW9CO0FBQ2xCakIsaUJBQVMsS0FBS2lCLFNBQUwsQ0FBZWhCLGFBQWYsRUFBVDtBQUNEO0FBQ0QsYUFBT0QsTUFBUDtBQUNELEtBaEU4RTtBQWlFL0VYLHVCQUFtQixTQUFTQSxpQkFBVCxHQUE2QjtBQUM5QyxVQUFJLEtBQUtiLEtBQUwsSUFBYyxLQUFLQSxLQUFMLENBQVcwQyxlQUE3QixFQUE4QztBQUM1QyxhQUFLMUMsS0FBTCxDQUFXMEMsZUFBWDtBQUNEO0FBQ0QsV0FBS0MsU0FBTCxDQUFlQyxTQUFmO0FBQ0QsS0F0RThFO0FBdUUvRUMsYUFBUyxTQUFTQSxPQUFULEdBQW1CO0FBQzFCLFdBQUtDLFdBQUwsQ0FBaUJULE9BQWpCLENBQXlCLFVBQUNVLE1BQUQsRUFBWTtBQUNuQywwQkFBUUMsV0FBUixDQUFvQkQsTUFBcEI7QUFDRCxPQUZEOztBQUlBLFVBQUksS0FBS2pCLGdCQUFULEVBQTJCO0FBQ3pCLGFBQUssSUFBTW1CLElBQVgsSUFBbUIsS0FBS25CLGdCQUFMLENBQXNCb0IsTUFBekMsRUFBaUQ7QUFDL0MsY0FBSSxLQUFLcEIsZ0JBQUwsQ0FBc0JvQixNQUF0QixDQUE2QkMsY0FBN0IsQ0FBNENGLElBQTVDLENBQUosRUFBdUQ7QUFDckQsaUJBQUtuQixnQkFBTCxDQUFzQm9CLE1BQXRCLENBQTZCRCxJQUE3QixFQUFtQ0osT0FBbkM7QUFDRDtBQUNGO0FBQ0QsYUFBS2YsZ0JBQUwsQ0FBc0JlLE9BQXRCO0FBQ0Q7QUFDRCxXQUFLRixTQUFMLENBQWVDLFNBQWY7QUFDRDtBQXJGOEUsR0FBakUsQ0FBaEIsQyxDQXhCQTs7Ozs7Ozs7Ozs7Ozs7O0FBK0dBLE1BQU1RLE1BQU0sa0NBQVo7QUFDQUEsTUFBSUMsWUFBSixDQUFpQixhQUFqQixFQUFnQ3ZELE9BQWhDO29CQUNlQSxPIiwiZmlsZSI6IlJlbGF0ZWRFZGl0V2lkZ2V0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGV2ZW50IGZyb20gJ2Rvam8vX2Jhc2UvZXZlbnQnO1xyXG5pbXBvcnQgb24gZnJvbSAnZG9qby9vbic7XHJcbmltcG9ydCBjb25uZWN0IGZyb20gJ2Rvam8vX2Jhc2UvY29ubmVjdCc7XHJcbmltcG9ydCBSZWxhdGVkVmlld01hbmFnZXIgZnJvbSAnYXJnb3MvUmVsYXRlZFZpZXdNYW5hZ2VyJztcclxuaW1wb3J0IF9SZWxhdGVkVmlld1dpZGdldEJhc2UgZnJvbSAnYXJnb3MvX1JlbGF0ZWRWaWV3V2lkZ2V0QmFzZSc7XHJcbmltcG9ydCBFZGl0IGZyb20gJ2FyZ29zL0VkaXQnO1xyXG5cclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuUmVsYXRlZEVkaXRXaWRnZXQnLCBbX1JlbGF0ZWRWaWV3V2lkZ2V0QmFzZV0sIHtcclxuICBjbHM6ICdyZWxhdGVkLWVkaXQtd2lkZ2V0JyxcclxuICBvd25lcjogbnVsbCxcclxuICBpZDogJ3JlbGF0ZWQtZWRpdC13aWRnZXQnLFxyXG4gIGVkaXRWaWV3OiBudWxsLFxyXG4gIHRvb2xCYXJUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGNsYXNzPVwidG9vbEJhclwiPicsXHJcbiAgICAnPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiB0b29sQnV0dG9uIHRvb2xCdXR0b24tcmlnaHQgIGZhIGZhLXNhdmUgZmEtZncgZmEtbGdcIiBkYXRhLWFjdGlvbj1cInNhdmVcIj48L2J1dHRvbj4nLFxyXG4gICAgJzxkaXY+JyxcclxuICBdKSxcclxuICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcclxuICAgIHRoaXMucHJvY2Vzc0VudHJ5KHRoaXMucGFyZW50RW50cnkpO1xyXG4gIH0sXHJcbiAgcHJvY2Vzc0VudHJ5OiBmdW5jdGlvbiBwcm9jZXNzRW50cnkoZW50cnkpIHtcclxuICAgIGNvbnN0IEN0b3IgPSAodGhpcy5lZGl0VmlldykgPyB0aGlzLmVkaXRWaWV3IDogRWRpdDtcclxuICAgIGNvbnN0IGVkaXRWaWV3ID0gbmV3IEN0b3Ioe1xyXG4gICAgICBpZDogYCR7dGhpcy5pZH1fZWRpdGAsXHJcbiAgICB9KTtcclxuICAgIGlmIChlZGl0VmlldyAmJiAhZWRpdFZpZXcuX3N0YXJ0ZWQpIHtcclxuICAgICAgZWRpdFZpZXcuc2VjdGlvbkJlZ2luVGVtcGxhdGUgPSBuZXcgU2ltcGxhdGUoW1xyXG4gICAgICAgICc8ZmllbGRzZXQgY2xhc3M9XCJ7JT0gKCQuY2xzIHx8ICQub3B0aW9ucy5jbHMpICV9XCI+JyxcclxuICAgICAgXSk7XHJcbiAgICAgIGVkaXRWaWV3LmluaXQoKTtcclxuICAgICAgZWRpdFZpZXcuX3N0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgICBlZGl0Vmlldy5vblVwZGF0ZUNvbXBsZXRlZCA9IHRoaXMub25VcGRhdGVDb21wbGV0ZWQuYmluZCh0aGlzKTtcclxuICAgIH1cclxuICAgIC8vIEFkZCB0aGUgdG9vbGJhciBmb3Igc2F2ZVxyXG4gICAgY29uc3QgdG9vbEJhck5vZGUgPSAkKHRoaXMudG9vbEJhclRlbXBsYXRlLmFwcGx5KGVudHJ5LCB0aGlzKSkuZ2V0KDApO1xyXG4gICAgb24odG9vbEJhck5vZGUsICdjbGljaycsIHRoaXMub25JbnZva2VUb29sQmFyQWN0aW9uLmJpbmQodGhpcykpO1xyXG4gICAgJCh0aGlzLmNvbnRhaW5lck5vZGUpLmFwcGVuZCh0b29sQmFyTm9kZSk7XHJcblxyXG4gICAgLy8gQWRkIHRoZSBlZGl0IHZpZXcgdG8gdmlld1xyXG4gICAgZWRpdFZpZXcucGxhY2VBdCh0aGlzLmNvbnRhaW5lck5vZGUsICdsYXN0Jyk7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgc2VsZWN0OiB0aGlzLmdldEVkaXRTZWxlY3QoKSxcclxuICAgICAga2V5OiBlbnRyeS4ka2V5LFxyXG4gICAgfTtcclxuICAgIGVkaXRWaWV3Lm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgZWRpdFZpZXcuYWN0aXZhdGUoKTtcclxuICAgIGVkaXRWaWV3LnJlcXVlc3REYXRhKCk7XHJcbiAgICB0aGlzLmVkaXRWaWV3SW5zdGFuY2UgPSBlZGl0VmlldztcclxuICB9LFxyXG4gIG9uSW52b2tlVG9vbEJhckFjdGlvbjogZnVuY3Rpb24gb25JbnZva2VUb29sQmFyQWN0aW9uKGV2dCkge1xyXG4gICAgdGhpcy5lZGl0Vmlld0luc3RhbmNlLnNhdmUoKTtcclxuICAgIGV2ZW50LnN0b3AoZXZ0KTtcclxuICB9LFxyXG4gIGdldEVkaXRMYXlvdXQ6IGZ1bmN0aW9uIGdldEVkaXRMYXlvdXQoKSB7XHJcbiAgICBjb25zdCBlZGl0TGF5b3V0ID0gW107XHJcbiAgICBpZiAodGhpcy5sYXlvdXQpIHtcclxuICAgICAgdGhpcy5sYXlvdXQuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgIGlmICghaXRlbS5yZWFkb25seSkge1xyXG4gICAgICAgICAgZWRpdExheW91dC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZWRpdExheW91dDtcclxuICB9LFxyXG4gIGdldEVkaXRTZWxlY3Q6IGZ1bmN0aW9uIGdldEVkaXRTZWxlY3QoKSB7XHJcbiAgICBsZXQgc2VsZWN0ID0gbnVsbDtcclxuICAgIGlmICh0aGlzLmZvcm1Nb2RlbCkge1xyXG4gICAgICBzZWxlY3QgPSB0aGlzLmZvcm1Nb2RlbC5nZXRFZGl0U2VsZWN0KCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2VsZWN0O1xyXG4gIH0sXHJcbiAgb25VcGRhdGVDb21wbGV0ZWQ6IGZ1bmN0aW9uIG9uVXBkYXRlQ29tcGxldGVkKCkge1xyXG4gICAgaWYgKHRoaXMub3duZXIgJiYgdGhpcy5vd25lci5fcmVmcmVzaENsaWNrZWQpIHtcclxuICAgICAgdGhpcy5vd25lci5fcmVmcmVzaENsaWNrZWQoKTtcclxuICAgIH1cclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xyXG4gICAgdGhpcy5fc3Vic2NyaWJlcy5mb3JFYWNoKChoYW5kbGUpID0+IHtcclxuICAgICAgY29ubmVjdC51bnN1YnNjcmliZShoYW5kbGUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHRoaXMuZWRpdFZpZXdJbnN0YW5jZSkge1xyXG4gICAgICBmb3IgKGNvbnN0IG5hbWUgaW4gdGhpcy5lZGl0Vmlld0luc3RhbmNlLmZpZWxkcykge1xyXG4gICAgICAgIGlmICh0aGlzLmVkaXRWaWV3SW5zdGFuY2UuZmllbGRzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XHJcbiAgICAgICAgICB0aGlzLmVkaXRWaWV3SW5zdGFuY2UuZmllbGRzW25hbWVdLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5lZGl0Vmlld0luc3RhbmNlLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgfSxcclxufSk7XHJcbmNvbnN0IHJ2bSA9IG5ldyBSZWxhdGVkVmlld01hbmFnZXIoKTtcclxucnZtLnJlZ2lzdGVyVHlwZSgncmVsYXRlZEVkaXQnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19