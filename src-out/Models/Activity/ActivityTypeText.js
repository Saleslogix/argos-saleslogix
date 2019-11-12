define('crm/Models/Activity/ActivityTypeText', ['module', 'exports', 'argos/I18n'], function (module, exports, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('activityTypeText'); /* Copyright 2017 Infor
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

  exports.default = {
    atToDo: resource.atToDoText,
    atPhoneCall: resource.atPhoneCallText,
    atAppointment: resource.atAppointmentText,
    atLiterature: resource.atLiteratureText,
    atPersonal: resource.atPersonalText,
    atQuestion: resource.atQuestionText,
    atNote: resource.atNoteText,
    atEMail: resource.atEMailText
  };
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbHMvQWN0aXZpdHkvQWN0aXZpdHlUeXBlVGV4dC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsImF0VG9EbyIsImF0VG9Eb1RleHQiLCJhdFBob25lQ2FsbCIsImF0UGhvbmVDYWxsVGV4dCIsImF0QXBwb2ludG1lbnQiLCJhdEFwcG9pbnRtZW50VGV4dCIsImF0TGl0ZXJhdHVyZSIsImF0TGl0ZXJhdHVyZVRleHQiLCJhdFBlcnNvbmFsIiwiYXRQZXJzb25hbFRleHQiLCJhdFF1ZXN0aW9uIiwiYXRRdWVzdGlvblRleHQiLCJhdE5vdGUiLCJhdE5vdGVUZXh0IiwiYXRFTWFpbCIsImF0RU1haWxUZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBaUJBLE1BQU1BLFdBQVcsb0JBQVksa0JBQVosQ0FBakIsQyxDQWpCQTs7Ozs7Ozs7Ozs7Ozs7O29CQWtCZTtBQUNiQyxZQUFRRCxTQUFTRSxVQURKO0FBRWJDLGlCQUFhSCxTQUFTSSxlQUZUO0FBR2JDLG1CQUFlTCxTQUFTTSxpQkFIWDtBQUliQyxrQkFBY1AsU0FBU1EsZ0JBSlY7QUFLYkMsZ0JBQVlULFNBQVNVLGNBTFI7QUFNYkMsZ0JBQVlYLFNBQVNZLGNBTlI7QUFPYkMsWUFBUWIsU0FBU2MsVUFQSjtBQVFiQyxhQUFTZixTQUFTZ0I7QUFSTCxHIiwiZmlsZSI6IkFjdGl2aXR5VHlwZVRleHQuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdhY3Rpdml0eVR5cGVUZXh0Jyk7XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBhdFRvRG86IHJlc291cmNlLmF0VG9Eb1RleHQsXHJcbiAgYXRQaG9uZUNhbGw6IHJlc291cmNlLmF0UGhvbmVDYWxsVGV4dCxcclxuICBhdEFwcG9pbnRtZW50OiByZXNvdXJjZS5hdEFwcG9pbnRtZW50VGV4dCxcclxuICBhdExpdGVyYXR1cmU6IHJlc291cmNlLmF0TGl0ZXJhdHVyZVRleHQsXHJcbiAgYXRQZXJzb25hbDogcmVzb3VyY2UuYXRQZXJzb25hbFRleHQsXHJcbiAgYXRRdWVzdGlvbjogcmVzb3VyY2UuYXRRdWVzdGlvblRleHQsXHJcbiAgYXROb3RlOiByZXNvdXJjZS5hdE5vdGVUZXh0LFxyXG4gIGF0RU1haWw6IHJlc291cmNlLmF0RU1haWxUZXh0LFxyXG59O1xyXG4iXX0=