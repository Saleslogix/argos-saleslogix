define('crm/Views/Attachment/MyAttachmentList', ['module', 'exports', 'dojo/_base/declare', './List', 'argos/I18n'], function (module, exports, _declare, _List, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _List2 = _interopRequireDefault(_List);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('attachmentMyList');

  /**
   * @class crm.Views.Attachments.MyAttachmentList
   *
   * @extends crm.Views.Attachments.List
   *
   * @requires crm.Format
   * @requires crm.Views.Attachments.List
   *
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

  var __class = (0, _declare2.default)('crm.Views.Attachment.MyAttachmentList', [_List2.default], {
    id: 'myattachment_list',
    titleText: resource.titleText,
    queryWhere: function queryWhere() {
      var q = this._formatUserKey(App.context.user.$key);
      return 'createUser eq "' + q + '"';
    },
    _formatUserKey: function _formatUserKey(userKey) {
      var key = userKey;
      if (key === 'ADMIN') {
        key = 'ADMIN       '; // The attachment feed is picky and requires the Admin key to be padded to a 12 char.
      }
      return key;
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9BdHRhY2htZW50L015QXR0YWNobWVudExpc3QuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiaWQiLCJ0aXRsZVRleHQiLCJxdWVyeVdoZXJlIiwicSIsIl9mb3JtYXRVc2VyS2V5IiwiQXBwIiwiY29udGV4dCIsInVzZXIiLCIka2V5IiwidXNlcktleSIsImtleSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkEsTUFBTUEsV0FBVyxvQkFBWSxrQkFBWixDQUFqQjs7QUFFQTs7Ozs7Ozs7O0FBckJBOzs7Ozs7Ozs7Ozs7Ozs7QUE4QkEsTUFBTUMsVUFBVSx1QkFBUSx1Q0FBUixFQUFpRCxnQkFBakQsRUFBbUU7QUFDakZDLFFBQUksbUJBRDZFO0FBRWpGQyxlQUFXSCxTQUFTRyxTQUY2RDtBQUdqRkMsZ0JBQVksU0FBU0EsVUFBVCxHQUFzQjtBQUNoQyxVQUFNQyxJQUFJLEtBQUtDLGNBQUwsQ0FBb0JDLElBQUlDLE9BQUosQ0FBWUMsSUFBWixDQUFpQkMsSUFBckMsQ0FBVjtBQUNBLGlDQUF5QkwsQ0FBekI7QUFDRCxLQU5nRjtBQU9qRkMsb0JBQWdCLFNBQVNBLGNBQVQsQ0FBd0JLLE9BQXhCLEVBQWlDO0FBQy9DLFVBQUlDLE1BQU1ELE9BQVY7QUFDQSxVQUFJQyxRQUFRLE9BQVosRUFBcUI7QUFDbkJBLGNBQU0sY0FBTixDQURtQixDQUNHO0FBQ3ZCO0FBQ0QsYUFBT0EsR0FBUDtBQUNEO0FBYmdGLEdBQW5FLENBQWhCOztvQkFnQmVYLE8iLCJmaWxlIjoiTXlBdHRhY2htZW50TGlzdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBBdHRhY2htZW50TGlzdCBmcm9tICcuL0xpc3QnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdhdHRhY2htZW50TXlMaXN0Jyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5BdHRhY2htZW50cy5NeUF0dGFjaG1lbnRMaXN0XHJcbiAqXHJcbiAqIEBleHRlbmRzIGNybS5WaWV3cy5BdHRhY2htZW50cy5MaXN0XHJcbiAqXHJcbiAqIEByZXF1aXJlcyBjcm0uRm9ybWF0XHJcbiAqIEByZXF1aXJlcyBjcm0uVmlld3MuQXR0YWNobWVudHMuTGlzdFxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5BdHRhY2htZW50Lk15QXR0YWNobWVudExpc3QnLCBbQXR0YWNobWVudExpc3RdLCB7XHJcbiAgaWQ6ICdteWF0dGFjaG1lbnRfbGlzdCcsXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgcXVlcnlXaGVyZTogZnVuY3Rpb24gcXVlcnlXaGVyZSgpIHtcclxuICAgIGNvbnN0IHEgPSB0aGlzLl9mb3JtYXRVc2VyS2V5KEFwcC5jb250ZXh0LnVzZXIuJGtleSk7XHJcbiAgICByZXR1cm4gYGNyZWF0ZVVzZXIgZXEgXCIke3F9XCJgO1xyXG4gIH0sXHJcbiAgX2Zvcm1hdFVzZXJLZXk6IGZ1bmN0aW9uIF9mb3JtYXRVc2VyS2V5KHVzZXJLZXkpIHtcclxuICAgIGxldCBrZXkgPSB1c2VyS2V5O1xyXG4gICAgaWYgKGtleSA9PT0gJ0FETUlOJykge1xyXG4gICAgICBrZXkgPSAnQURNSU4gICAgICAgJzsgLy8gVGhlIGF0dGFjaG1lbnQgZmVlZCBpcyBwaWNreSBhbmQgcmVxdWlyZXMgdGhlIEFkbWluIGtleSB0byBiZSBwYWRkZWQgdG8gYSAxMiBjaGFyLlxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGtleTtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==