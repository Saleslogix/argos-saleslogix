define('crm/Models/Activity/ActivityTypePicklists', ['exports'], function (exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getPicklistByActivityType = getPicklistByActivityType;
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

  var ActivityTypePicklists = exports.ActivityTypePicklists = {
    atAppointment: {
      Category: 'Meeting Category Codes',
      Description: 'Meeting Regarding'
    },
    atLiterature: {
      Description: 'Lit Request Regarding'
    },
    atPersonal: {
      Category: 'Meeting Category Codes',
      Description: 'Personal Activity Regarding'
    },
    atPhoneCall: {
      Category: 'Phone Call Category Codes',
      Description: 'Phone Call Regarding'
    },
    atToDo: {
      Category: 'To Do Category Codes',
      Description: 'To Do Regarding'
    },
    atEMail: {
      Category: 'E-mail Category Codes',
      Description: 'E-mail Regarding'
    }
  };

  function getPicklistByActivityType(type, which) {
    return ActivityTypePicklists[type] && ActivityTypePicklists[type][which];
  }

  exports.default = ActivityTypePicklists;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbHMvQWN0aXZpdHkvQWN0aXZpdHlUeXBlUGlja2xpc3RzLmpzIl0sIm5hbWVzIjpbImdldFBpY2tsaXN0QnlBY3Rpdml0eVR5cGUiLCJBY3Rpdml0eVR5cGVQaWNrbGlzdHMiLCJhdEFwcG9pbnRtZW50IiwiQ2F0ZWdvcnkiLCJEZXNjcmlwdGlvbiIsImF0TGl0ZXJhdHVyZSIsImF0UGVyc29uYWwiLCJhdFBob25lQ2FsbCIsImF0VG9EbyIsImF0RU1haWwiLCJ0eXBlIiwid2hpY2giXSwibWFwcGluZ3MiOiI7Ozs7VUF5Q2dCQSx5QixHQUFBQSx5QjtBQXpDaEI7Ozs7Ozs7Ozs7Ozs7OztBQWVPLE1BQU1DLHdEQUF3QjtBQUNuQ0MsbUJBQWU7QUFDYkMsZ0JBQVUsd0JBREc7QUFFYkMsbUJBQWE7QUFGQSxLQURvQjtBQUtuQ0Msa0JBQWM7QUFDWkQsbUJBQWE7QUFERCxLQUxxQjtBQVFuQ0UsZ0JBQVk7QUFDVkgsZ0JBQVUsd0JBREE7QUFFVkMsbUJBQWE7QUFGSCxLQVJ1QjtBQVluQ0csaUJBQWE7QUFDWEosZ0JBQVUsMkJBREM7QUFFWEMsbUJBQWE7QUFGRixLQVpzQjtBQWdCbkNJLFlBQVE7QUFDTkwsZ0JBQVUsc0JBREo7QUFFTkMsbUJBQWE7QUFGUCxLQWhCMkI7QUFvQm5DSyxhQUFTO0FBQ1BOLGdCQUFVLHVCQURIO0FBRVBDLG1CQUFhO0FBRk47QUFwQjBCLEdBQTlCOztBQTBCQSxXQUFTSix5QkFBVCxDQUFtQ1UsSUFBbkMsRUFBeUNDLEtBQXpDLEVBQWdEO0FBQ3JELFdBQU9WLHNCQUFzQlMsSUFBdEIsS0FBK0JULHNCQUFzQlMsSUFBdEIsRUFBNEJDLEtBQTVCLENBQXRDO0FBQ0Q7O29CQUVjVixxQiIsImZpbGUiOiJBY3Rpdml0eVR5cGVQaWNrbGlzdHMuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5leHBvcnQgY29uc3QgQWN0aXZpdHlUeXBlUGlja2xpc3RzID0ge1xyXG4gIGF0QXBwb2ludG1lbnQ6IHtcclxuICAgIENhdGVnb3J5OiAnTWVldGluZyBDYXRlZ29yeSBDb2RlcycsXHJcbiAgICBEZXNjcmlwdGlvbjogJ01lZXRpbmcgUmVnYXJkaW5nJyxcclxuICB9LFxyXG4gIGF0TGl0ZXJhdHVyZToge1xyXG4gICAgRGVzY3JpcHRpb246ICdMaXQgUmVxdWVzdCBSZWdhcmRpbmcnLFxyXG4gIH0sXHJcbiAgYXRQZXJzb25hbDoge1xyXG4gICAgQ2F0ZWdvcnk6ICdNZWV0aW5nIENhdGVnb3J5IENvZGVzJyxcclxuICAgIERlc2NyaXB0aW9uOiAnUGVyc29uYWwgQWN0aXZpdHkgUmVnYXJkaW5nJyxcclxuICB9LFxyXG4gIGF0UGhvbmVDYWxsOiB7XHJcbiAgICBDYXRlZ29yeTogJ1Bob25lIENhbGwgQ2F0ZWdvcnkgQ29kZXMnLFxyXG4gICAgRGVzY3JpcHRpb246ICdQaG9uZSBDYWxsIFJlZ2FyZGluZycsXHJcbiAgfSxcclxuICBhdFRvRG86IHtcclxuICAgIENhdGVnb3J5OiAnVG8gRG8gQ2F0ZWdvcnkgQ29kZXMnLFxyXG4gICAgRGVzY3JpcHRpb246ICdUbyBEbyBSZWdhcmRpbmcnLFxyXG4gIH0sXHJcbiAgYXRFTWFpbDoge1xyXG4gICAgQ2F0ZWdvcnk6ICdFLW1haWwgQ2F0ZWdvcnkgQ29kZXMnLFxyXG4gICAgRGVzY3JpcHRpb246ICdFLW1haWwgUmVnYXJkaW5nJyxcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFBpY2tsaXN0QnlBY3Rpdml0eVR5cGUodHlwZSwgd2hpY2gpIHtcclxuICByZXR1cm4gQWN0aXZpdHlUeXBlUGlja2xpc3RzW3R5cGVdICYmIEFjdGl2aXR5VHlwZVBpY2tsaXN0c1t0eXBlXVt3aGljaF07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFjdGl2aXR5VHlwZVBpY2tsaXN0cztcclxuIl19