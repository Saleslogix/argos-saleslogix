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
        this.inherited(arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9BdHRhY2htZW50L0FkZEF0dGFjaG1lbnQuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwidGl0bGVUZXh0IiwiaWQiLCJvblVwbG9hZEZpbGVzIiwic2VsZiIsIl9maWxlcyIsImxlbmd0aCIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImZpbGVJdGVtcyIsImdldEZpbGVJdGVtcyIsImFtIiwib25TdWNjZXNzVXBkYXRlIiwicmVmcmVzaEF0dGFjaG1lbnRWaWV3cyIsIlJlVUkiLCJiYWNrIiwib25GYWlsZWRVcGxvYWQiLCJlcnJvck1lc3NhZ2UiLCJvblVwZGF0ZUZhaWxlZCIsImFsZXJ0Iiwib25VcGRhdGVQcm9ncmVzcyIsInBlcmNlbnQiLCJtc2ciLCJjcmVhdGVBdHRhY2htZW50IiwiZmlsZSIsImRlc2NyaXB0aW9uIiwiY2FuY2VsU2VsZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsTUFBTUEsV0FBVyxvQkFBWSxlQUFaLENBQWpCOztBQUVBOzs7Ozs7Ozs7Ozs7QUFZQSxNQUFNQyxVQUFVLHVCQUFRLG9DQUFSLEVBQThDLHNCQUE5QyxFQUE0RDtBQUMxRTtBQUNBQyxlQUFXRixTQUFTRSxTQUZzRDs7QUFJMUU7QUFDQUMsUUFBSSxnQkFMc0U7O0FBTzFFQyxtQkFBZSxTQUFTQSxhQUFULEdBQXlCO0FBQ3RDLFVBQU1DLE9BQU8sSUFBYjtBQUNBLFVBQUksS0FBS0MsTUFBTCxJQUFlLEtBQUtBLE1BQUwsQ0FBWUMsTUFBWixHQUFxQixDQUF4QyxFQUEyQztBQUN6QyxhQUFLQyxTQUFMLENBQWVDLFNBQWY7QUFDQSxZQUFNQyxZQUFZLEtBQUtDLFlBQUwsRUFBbEI7QUFDQSxZQUFNQyxLQUFLLGlDQUFYOztBQUVBQSxXQUFHQyxlQUFILEdBQXFCLFNBQVNBLGVBQVQsR0FBMkI7QUFDOUMsZ0NBQVlDLHNCQUFaO0FBQ0FDLGVBQUtDLElBQUw7QUFDRCxTQUhEOztBQUtBSixXQUFHSyxjQUFILEdBQW9CLFNBQVNBLGNBQVQsQ0FBd0JDLFlBQXhCLEVBQXNDO0FBQ3hEYixlQUFLYyxjQUFMLENBQW9CRCxZQUFwQjtBQUNBRSxnQkFBTUYsWUFBTixFQUZ3RCxDQUVuQztBQUNyQkgsZUFBS0MsSUFBTDtBQUNELFNBSkQ7O0FBTUFKLFdBQUdTLGdCQUFILEdBQXNCLFNBQVNBLGdCQUFULENBQTBCQyxPQUExQixFQUFtQztBQUN2RCxjQUFNQyxNQUFNLGlCQUFVRCxPQUFWLENBQWtCQSxVQUFVLEdBQTVCLENBQVo7QUFDQWpCLGVBQUtnQixnQkFBTCxDQUFzQkUsR0FBdEI7QUFDRCxTQUhEOztBQUtBWCxXQUFHWSxnQkFBSCxDQUFvQmQsVUFBVSxDQUFWLEVBQWFlLElBQWpDLEVBQXVDO0FBQ3JDQyx1QkFBYWhCLFVBQVUsQ0FBVixFQUFhZ0I7QUFEVyxTQUF2QztBQUdEO0FBQ0YsS0FsQ3lFO0FBbUMxRUMsa0JBQWMsU0FBU0EsWUFBVCxHQUF3QjtBQUNwQ1osV0FBS0MsSUFBTDtBQUNEO0FBckN5RSxHQUE1RCxDQUFoQjs7b0JBd0NlZixPIiwiZmlsZSI6IkFkZEF0dGFjaG1lbnQuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgc2RrRm9ybWF0IGZyb20gJ2FyZ29zL0Zvcm1hdCc7XHJcbmltcG9ydCBGaWxlU2VsZWN0IGZyb20gJ2FyZ29zL1ZpZXdzL0ZpbGVTZWxlY3QnO1xyXG5pbXBvcnQgQXR0YWNobWVudE1hbmFnZXIgZnJvbSAnLi4vLi4vQXR0YWNobWVudE1hbmFnZXInO1xyXG5pbXBvcnQgRW52aXJvbm1lbnQgZnJvbSAnLi4vLi4vRW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdhdHRhY2htZW50QWRkJyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5BdHRhY2htZW50LkFkZEF0dGFjaG1lbnRcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuVmlld3MuRmlsZVNlbGVjdFxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuVmlld3MuRmlsZVNlbGVjdFxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuRm9ybWF0XHJcbiAqXHJcbiAqIEByZXF1aXJlcyBjcm0uQXR0YWNobWVudE1hbmFnZXJcclxuICogQHJlcXVpcmVzIGNybS5FbnZpcm9ubWVudFxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5BdHRhY2htZW50LkFkZEF0dGFjaG1lbnQnLCBbRmlsZVNlbGVjdF0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdhdHRhY2htZW50X0FkZCcsXHJcblxyXG4gIG9uVXBsb2FkRmlsZXM6IGZ1bmN0aW9uIG9uVXBsb2FkRmlsZXMoKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIGlmICh0aGlzLl9maWxlcyAmJiB0aGlzLl9maWxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICAgIGNvbnN0IGZpbGVJdGVtcyA9IHRoaXMuZ2V0RmlsZUl0ZW1zKCk7XHJcbiAgICAgIGNvbnN0IGFtID0gbmV3IEF0dGFjaG1lbnRNYW5hZ2VyKCk7XHJcblxyXG4gICAgICBhbS5vblN1Y2Nlc3NVcGRhdGUgPSBmdW5jdGlvbiBvblN1Y2Nlc3NVcGRhdGUoKSB7XHJcbiAgICAgICAgRW52aXJvbm1lbnQucmVmcmVzaEF0dGFjaG1lbnRWaWV3cygpO1xyXG4gICAgICAgIFJlVUkuYmFjaygpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgYW0ub25GYWlsZWRVcGxvYWQgPSBmdW5jdGlvbiBvbkZhaWxlZFVwbG9hZChlcnJvck1lc3NhZ2UpIHtcclxuICAgICAgICBzZWxmLm9uVXBkYXRlRmFpbGVkKGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgYWxlcnQoZXJyb3JNZXNzYWdlKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICAgIFJlVUkuYmFjaygpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgYW0ub25VcGRhdGVQcm9ncmVzcyA9IGZ1bmN0aW9uIG9uVXBkYXRlUHJvZ3Jlc3MocGVyY2VudCkge1xyXG4gICAgICAgIGNvbnN0IG1zZyA9IHNka0Zvcm1hdC5wZXJjZW50KHBlcmNlbnQgLyAxMDApO1xyXG4gICAgICAgIHNlbGYub25VcGRhdGVQcm9ncmVzcyhtc2cpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgYW0uY3JlYXRlQXR0YWNobWVudChmaWxlSXRlbXNbMF0uZmlsZSwge1xyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBmaWxlSXRlbXNbMF0uZGVzY3JpcHRpb24sXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgY2FuY2VsU2VsZWN0OiBmdW5jdGlvbiBjYW5jZWxTZWxlY3QoKSB7XHJcbiAgICBSZVVJLmJhY2soKTtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==