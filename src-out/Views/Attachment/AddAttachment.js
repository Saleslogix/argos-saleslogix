define('crm/Views/Attachment/AddAttachment', ['module', 'exports', 'dojo/_base/declare', 'argos/Format', 'argos/Views/FileSelect', '../../AttachmentManager', '../../Environment', 'argos/I18n'], function (module, exports, _declare, _Format, _FileSelect, _AttachmentManager, _Environment, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Format2 = _interopRequireDefault(_Format);

  var _FileSelect2 = _interopRequireDefault(_FileSelect);

  var _AttachmentManager2 = _interopRequireDefault(_AttachmentManager);

  var _Environment2 = _interopRequireDefault(_Environment);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  var resource = (0, _I18n2.default)('attachmentAdd');

  /**
   * @class crm.Views.Attachment.AddAttachment
   *
   * @extends argos.Views.FileSelect
   *
   * @requires argos.Views.FileSelect
   * @requires argos.Format
   *
   * @requires crm.AttachmentManager
   * @requires crm.Environment
   *
   */
  var __class = (0, _declare2.default)('crm.Views.Attachment.AddAttachment', [_FileSelect2.default], {
    // Localization
    titleText: resource.titleText,

    // View Properties
    id: 'attachment_Add',

    onUploadFiles: function onUploadFiles() {
      var self = this;
      if (this._files && this._files.length > 0) {
        this.inherited(onUploadFiles, arguments);
        var fileItems = this.getFileItems();
        var am = new _AttachmentManager2.default();

        am.onSuccessUpdate = function onSuccessUpdate() {
          _Environment2.default.refreshAttachmentViews();
          ReUI.back();
        };

        am.onFailedUpload = function onFailedUpload(errorMessage) {
          self.onUpdateFailed(errorMessage);
          alert(errorMessage); // eslint-disable-line
          ReUI.back();
        };

        am.onUpdateProgress = function onUpdateProgress(percent) {
          var msg = _Format2.default.percent(percent / 100);
          self.onUpdateProgress(msg);
        };

        am.createAttachment(fileItems[0].file, {
          description: fileItems[0].description
        });
      }
    },
    cancelSelect: function cancelSelect() {
      ReUI.back();
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9BdHRhY2htZW50L0FkZEF0dGFjaG1lbnQuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwidGl0bGVUZXh0IiwiaWQiLCJvblVwbG9hZEZpbGVzIiwic2VsZiIsIl9maWxlcyIsImxlbmd0aCIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImZpbGVJdGVtcyIsImdldEZpbGVJdGVtcyIsImFtIiwib25TdWNjZXNzVXBkYXRlIiwicmVmcmVzaEF0dGFjaG1lbnRWaWV3cyIsIlJlVUkiLCJiYWNrIiwib25GYWlsZWRVcGxvYWQiLCJlcnJvck1lc3NhZ2UiLCJvblVwZGF0ZUZhaWxlZCIsImFsZXJ0Iiwib25VcGRhdGVQcm9ncmVzcyIsInBlcmNlbnQiLCJtc2ciLCJjcmVhdGVBdHRhY2htZW50IiwiZmlsZSIsImRlc2NyaXB0aW9uIiwiY2FuY2VsU2VsZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsTUFBTUEsV0FBVyxvQkFBWSxlQUFaLENBQWpCOztBQUVBOzs7Ozs7Ozs7Ozs7QUFZQSxNQUFNQyxVQUFVLHVCQUFRLG9DQUFSLEVBQThDLHNCQUE5QyxFQUE0RDtBQUMxRTtBQUNBQyxlQUFXRixTQUFTRSxTQUZzRDs7QUFJMUU7QUFDQUMsUUFBSSxnQkFMc0U7O0FBTzFFQyxtQkFBZSxTQUFTQSxhQUFULEdBQXlCO0FBQ3RDLFVBQU1DLE9BQU8sSUFBYjtBQUNBLFVBQUksS0FBS0MsTUFBTCxJQUFlLEtBQUtBLE1BQUwsQ0FBWUMsTUFBWixHQUFxQixDQUF4QyxFQUEyQztBQUN6QyxhQUFLQyxTQUFMLENBQWVKLGFBQWYsRUFBOEJLLFNBQTlCO0FBQ0EsWUFBTUMsWUFBWSxLQUFLQyxZQUFMLEVBQWxCO0FBQ0EsWUFBTUMsS0FBSyxpQ0FBWDs7QUFFQUEsV0FBR0MsZUFBSCxHQUFxQixTQUFTQSxlQUFULEdBQTJCO0FBQzlDLGdDQUFZQyxzQkFBWjtBQUNBQyxlQUFLQyxJQUFMO0FBQ0QsU0FIRDs7QUFLQUosV0FBR0ssY0FBSCxHQUFvQixTQUFTQSxjQUFULENBQXdCQyxZQUF4QixFQUFzQztBQUN4RGIsZUFBS2MsY0FBTCxDQUFvQkQsWUFBcEI7QUFDQUUsZ0JBQU1GLFlBQU4sRUFGd0QsQ0FFbkM7QUFDckJILGVBQUtDLElBQUw7QUFDRCxTQUpEOztBQU1BSixXQUFHUyxnQkFBSCxHQUFzQixTQUFTQSxnQkFBVCxDQUEwQkMsT0FBMUIsRUFBbUM7QUFDdkQsY0FBTUMsTUFBTSxpQkFBVUQsT0FBVixDQUFrQkEsVUFBVSxHQUE1QixDQUFaO0FBQ0FqQixlQUFLZ0IsZ0JBQUwsQ0FBc0JFLEdBQXRCO0FBQ0QsU0FIRDs7QUFLQVgsV0FBR1ksZ0JBQUgsQ0FBb0JkLFVBQVUsQ0FBVixFQUFhZSxJQUFqQyxFQUF1QztBQUNyQ0MsdUJBQWFoQixVQUFVLENBQVYsRUFBYWdCO0FBRFcsU0FBdkM7QUFHRDtBQUNGLEtBbEN5RTtBQW1DMUVDLGtCQUFjLFNBQVNBLFlBQVQsR0FBd0I7QUFDcENaLFdBQUtDLElBQUw7QUFDRDtBQXJDeUUsR0FBNUQsQ0FBaEI7O29CQXdDZWYsTyIsImZpbGUiOiJBZGRBdHRhY2htZW50LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IHNka0Zvcm1hdCBmcm9tICdhcmdvcy9Gb3JtYXQnO1xyXG5pbXBvcnQgRmlsZVNlbGVjdCBmcm9tICdhcmdvcy9WaWV3cy9GaWxlU2VsZWN0JztcclxuaW1wb3J0IEF0dGFjaG1lbnRNYW5hZ2VyIGZyb20gJy4uLy4uL0F0dGFjaG1lbnRNYW5hZ2VyJztcclxuaW1wb3J0IEVudmlyb25tZW50IGZyb20gJy4uLy4uL0Vudmlyb25tZW50JztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYXR0YWNobWVudEFkZCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuQXR0YWNobWVudC5BZGRBdHRhY2htZW50XHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLlZpZXdzLkZpbGVTZWxlY3RcclxuICpcclxuICogQHJlcXVpcmVzIGFyZ29zLlZpZXdzLkZpbGVTZWxlY3RcclxuICogQHJlcXVpcmVzIGFyZ29zLkZvcm1hdFxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgY3JtLkF0dGFjaG1lbnRNYW5hZ2VyXHJcbiAqIEByZXF1aXJlcyBjcm0uRW52aXJvbm1lbnRcclxuICpcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuQXR0YWNobWVudC5BZGRBdHRhY2htZW50JywgW0ZpbGVTZWxlY3RdLCB7XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnYXR0YWNobWVudF9BZGQnLFxyXG5cclxuICBvblVwbG9hZEZpbGVzOiBmdW5jdGlvbiBvblVwbG9hZEZpbGVzKCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBpZiAodGhpcy5fZmlsZXMgJiYgdGhpcy5fZmlsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICB0aGlzLmluaGVyaXRlZChvblVwbG9hZEZpbGVzLCBhcmd1bWVudHMpO1xyXG4gICAgICBjb25zdCBmaWxlSXRlbXMgPSB0aGlzLmdldEZpbGVJdGVtcygpO1xyXG4gICAgICBjb25zdCBhbSA9IG5ldyBBdHRhY2htZW50TWFuYWdlcigpO1xyXG5cclxuICAgICAgYW0ub25TdWNjZXNzVXBkYXRlID0gZnVuY3Rpb24gb25TdWNjZXNzVXBkYXRlKCkge1xyXG4gICAgICAgIEVudmlyb25tZW50LnJlZnJlc2hBdHRhY2htZW50Vmlld3MoKTtcclxuICAgICAgICBSZVVJLmJhY2soKTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGFtLm9uRmFpbGVkVXBsb2FkID0gZnVuY3Rpb24gb25GYWlsZWRVcGxvYWQoZXJyb3JNZXNzYWdlKSB7XHJcbiAgICAgICAgc2VsZi5vblVwZGF0ZUZhaWxlZChlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIGFsZXJ0KGVycm9yTWVzc2FnZSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgICBSZVVJLmJhY2soKTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGFtLm9uVXBkYXRlUHJvZ3Jlc3MgPSBmdW5jdGlvbiBvblVwZGF0ZVByb2dyZXNzKHBlcmNlbnQpIHtcclxuICAgICAgICBjb25zdCBtc2cgPSBzZGtGb3JtYXQucGVyY2VudChwZXJjZW50IC8gMTAwKTtcclxuICAgICAgICBzZWxmLm9uVXBkYXRlUHJvZ3Jlc3MobXNnKTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGFtLmNyZWF0ZUF0dGFjaG1lbnQoZmlsZUl0ZW1zWzBdLmZpbGUsIHtcclxuICAgICAgICBkZXNjcmlwdGlvbjogZmlsZUl0ZW1zWzBdLmRlc2NyaXB0aW9uLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIGNhbmNlbFNlbGVjdDogZnVuY3Rpb24gY2FuY2VsU2VsZWN0KCkge1xyXG4gICAgUmVVSS5iYWNrKCk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=