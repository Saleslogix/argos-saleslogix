define('crm/Views/History/EditOffline', ['module', 'exports', 'dojo/_base/declare', 'argos/_EditBase', 'argos/Models/Types', 'argos/I18n', '../../Models/Names'], function (module, exports, _declare, _EditBase2, _Types, _I18n, _Names) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _EditBase3 = _interopRequireDefault(_EditBase2);

  var _Types2 = _interopRequireDefault(_Types);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _Names2 = _interopRequireDefault(_Names);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('historyEditOffline'); /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.Views.History.EditOffline', [_EditBase3.default], {
    // Localization
    titleText: resource.titleText,

    // View Properties
    id: 'history_edit_offline',
    entityName: 'History',
    resourceKind: 'history',

    getModel: function getModel() {
      var model = App.ModelManager.getModel(_Names2.default.HISTORY, _Types2.default.OFFLINE);
      return model;
    },
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        title: resource.notesSectionText,
        name: 'NotesSection',
        children: [{
          name: 'Text',
          property: 'Text',
          label: resource.notesLabelText,
          cls: 'row-edit-text',
          type: 'textarea',
          autoFocus: true
        }, {
          name: 'UID',
          property: 'UID',
          type: 'hidden'
        }]
      }]);
    },
    beforeTransitionTo: function beforeTransitionTo() {
      this.inherited(beforeTransitionTo, arguments);
      $(this.domNode).removeClass('panel-loading');
    },
    onTransitionTo: function onTransitionTo() {
      this.inherited(onTransitionTo, arguments);
      if (this.options.insert) {
        var now = Date.now();
        this.fields.UID.setValue(now);
      }
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9IaXN0b3J5L0VkaXRPZmZsaW5lLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsInRpdGxlVGV4dCIsImlkIiwiZW50aXR5TmFtZSIsInJlc291cmNlS2luZCIsImdldE1vZGVsIiwibW9kZWwiLCJBcHAiLCJNb2RlbE1hbmFnZXIiLCJISVNUT1JZIiwiT0ZGTElORSIsImNyZWF0ZUxheW91dCIsImxheW91dCIsInRpdGxlIiwibm90ZXNTZWN0aW9uVGV4dCIsIm5hbWUiLCJjaGlsZHJlbiIsInByb3BlcnR5IiwibGFiZWwiLCJub3Rlc0xhYmVsVGV4dCIsImNscyIsInR5cGUiLCJhdXRvRm9jdXMiLCJiZWZvcmVUcmFuc2l0aW9uVG8iLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCIkIiwiZG9tTm9kZSIsInJlbW92ZUNsYXNzIiwib25UcmFuc2l0aW9uVG8iLCJvcHRpb25zIiwiaW5zZXJ0Iiwibm93IiwiRGF0ZSIsImZpZWxkcyIsIlVJRCIsInNldFZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkEsTUFBTUEsV0FBVyxvQkFBWSxvQkFBWixDQUFqQixDLENBckJBOzs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsTUFBTUMsVUFBVSx1QkFBUSwrQkFBUixFQUF5QyxvQkFBekMsRUFBc0Q7QUFDcEU7QUFDQUMsZUFBV0YsU0FBU0UsU0FGZ0Q7O0FBSXBFO0FBQ0FDLFFBQUksc0JBTGdFO0FBTXBFQyxnQkFBWSxTQU53RDtBQU9wRUMsa0JBQWMsU0FQc0Q7O0FBU3BFQyxjQUFVLFNBQVNBLFFBQVQsR0FBb0I7QUFDNUIsVUFBTUMsUUFBUUMsSUFBSUMsWUFBSixDQUFpQkgsUUFBakIsQ0FBMEIsZ0JBQVlJLE9BQXRDLEVBQStDLGdCQUFZQyxPQUEzRCxDQUFkO0FBQ0EsYUFBT0osS0FBUDtBQUNELEtBWm1FO0FBYXBFSyxrQkFBYyxTQUFTQSxZQUFULEdBQXdCO0FBQ3BDLGFBQU8sS0FBS0MsTUFBTCxLQUFnQixLQUFLQSxNQUFMLEdBQWMsQ0FBQztBQUNwQ0MsZUFBT2QsU0FBU2UsZ0JBRG9CO0FBRXBDQyxjQUFNLGNBRjhCO0FBR3BDQyxrQkFBVSxDQUFDO0FBQ1RELGdCQUFNLE1BREc7QUFFVEUsb0JBQVUsTUFGRDtBQUdUQyxpQkFBT25CLFNBQVNvQixjQUhQO0FBSVRDLGVBQUssZUFKSTtBQUtUQyxnQkFBTSxVQUxHO0FBTVRDLHFCQUFXO0FBTkYsU0FBRCxFQU9QO0FBQ0RQLGdCQUFNLEtBREw7QUFFREUsb0JBQVUsS0FGVDtBQUdESSxnQkFBTTtBQUhMLFNBUE87QUFIMEIsT0FBRCxDQUE5QixDQUFQO0FBZ0JELEtBOUJtRTtBQStCcEVFLHdCQUFvQixTQUFTQSxrQkFBVCxHQUE4QjtBQUNoRCxXQUFLQyxTQUFMLENBQWVELGtCQUFmLEVBQW1DRSxTQUFuQztBQUNBQyxRQUFFLEtBQUtDLE9BQVAsRUFBZ0JDLFdBQWhCLENBQTRCLGVBQTVCO0FBQ0QsS0FsQ21FO0FBbUNwRUMsb0JBQWdCLFNBQVNBLGNBQVQsR0FBMEI7QUFDeEMsV0FBS0wsU0FBTCxDQUFlSyxjQUFmLEVBQStCSixTQUEvQjtBQUNBLFVBQUksS0FBS0ssT0FBTCxDQUFhQyxNQUFqQixFQUF5QjtBQUN2QixZQUFNQyxNQUFNQyxLQUFLRCxHQUFMLEVBQVo7QUFDQSxhQUFLRSxNQUFMLENBQVlDLEdBQVosQ0FBZ0JDLFFBQWhCLENBQXlCSixHQUF6QjtBQUNEO0FBQ0Y7QUF6Q21FLEdBQXRELENBQWhCOztvQkE0Q2VoQyxPIiwiZmlsZSI6IkVkaXRPZmZsaW5lLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IF9FZGl0QmFzZSBmcm9tICdhcmdvcy9fRWRpdEJhc2UnO1xyXG5pbXBvcnQgTU9ERUxfVFlQRVMgZnJvbSAnYXJnb3MvTW9kZWxzL1R5cGVzJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vLi4vTW9kZWxzL05hbWVzJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2hpc3RvcnlFZGl0T2ZmbGluZScpO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5IaXN0b3J5LkVkaXRPZmZsaW5lJywgW19FZGl0QmFzZV0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdoaXN0b3J5X2VkaXRfb2ZmbGluZScsXHJcbiAgZW50aXR5TmFtZTogJ0hpc3RvcnknLFxyXG4gIHJlc291cmNlS2luZDogJ2hpc3RvcnknLFxyXG5cclxuICBnZXRNb2RlbDogZnVuY3Rpb24gZ2V0TW9kZWwoKSB7XHJcbiAgICBjb25zdCBtb2RlbCA9IEFwcC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoTU9ERUxfTkFNRVMuSElTVE9SWSwgTU9ERUxfVFlQRVMuT0ZGTElORSk7XHJcbiAgICByZXR1cm4gbW9kZWw7XHJcbiAgfSxcclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbe1xyXG4gICAgICB0aXRsZTogcmVzb3VyY2Uubm90ZXNTZWN0aW9uVGV4dCxcclxuICAgICAgbmFtZTogJ05vdGVzU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIG5hbWU6ICdUZXh0JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1RleHQnLFxyXG4gICAgICAgIGxhYmVsOiByZXNvdXJjZS5ub3Rlc0xhYmVsVGV4dCxcclxuICAgICAgICBjbHM6ICdyb3ctZWRpdC10ZXh0JyxcclxuICAgICAgICB0eXBlOiAndGV4dGFyZWEnLFxyXG4gICAgICAgIGF1dG9Gb2N1czogdHJ1ZSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdVSUQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnVUlEJyxcclxuICAgICAgICB0eXBlOiAnaGlkZGVuJyxcclxuICAgICAgfV0sXHJcbiAgICB9XSk7XHJcbiAgfSxcclxuICBiZWZvcmVUcmFuc2l0aW9uVG86IGZ1bmN0aW9uIGJlZm9yZVRyYW5zaXRpb25UbygpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGJlZm9yZVRyYW5zaXRpb25UbywgYXJndW1lbnRzKTtcclxuICAgICQodGhpcy5kb21Ob2RlKS5yZW1vdmVDbGFzcygncGFuZWwtbG9hZGluZycpO1xyXG4gIH0sXHJcbiAgb25UcmFuc2l0aW9uVG86IGZ1bmN0aW9uIG9uVHJhbnNpdGlvblRvKCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQob25UcmFuc2l0aW9uVG8sIGFyZ3VtZW50cyk7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmluc2VydCkge1xyXG4gICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5VSUQuc2V0VmFsdWUobm93KTtcclxuICAgIH1cclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==