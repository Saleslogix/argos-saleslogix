define('crm/Environment', ['module', 'exports', 'dojo/_base/lang', 'dojo/_base/sniff'], function (module, exports, _lang) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _lang2 = _interopRequireDefault(_lang);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @class crm.Environment
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

  var __class = _lang2.default.setObject('crm.Environment', {
    // todo: open a new browser window for these when on a mobile device?
    // on a mobile device, launching an external handler can impact a view transition, and cause issues, which the timeout takes care of.
    // not the best way, perhaps a post-transition callback should be used for launching these? check transitioning, then queue if needed?
    initiateCall: function initiateCall(number) {
      setTimeout(function () {
        window.location.href = 'tel:' + number;
      }, 500);
    },
    initiateEmail: function initiateEmail(email, subject, body) {
      setTimeout(function () {
        var mailtoUri = subject ? 'mailto:' + email + '?subject=' + subject + '&body=' + (body || '') : 'mailto:' + email;
        window.location.href = mailtoUri;
      }, 1000); // 1 sec delay for iPad iOS5 to actually save nav state to local storage
    },
    showMapForAddress: function showMapForAddress(address) {
      var href = window.location.protocol + '//maps.google.com/maps?output=embed&q=' + address;
      var view = App.getView('link_view');
      if (view) {
        view.show({
          link: href,
          title: address
        });
      }
    },
    attachmentViewsToRefresh: ['myattachment_list', 'attachment_list', 'attachment_related', 'account_attachment_related', 'contact_attachment_related', 'lead_attachment_related', 'opportunity_attachment_related', 'ticket_attachment_related', 'activity_attachment_related', 'history_attachment_related'],
    activityViewsToRefresh: ['myactivity_list', 'activity_list', 'activity_detail', 'activity_related', 'ticketactivity_related', 'history_related', 'history_list'],
    detailViewsToRefreshOnUpdate: ['account_detail', 'contact_detail', 'opportunity_detail', 'lead_detail', 'ticket_detail'],
    refreshStaleDetailViews: function refreshStaleDetailViews() {
      // List of detail views that will need refreshed when a note is added or an activity is completed (possibly others??).
      // Otherwise the etag will change and the server will give a 412: Preconditioned failed when we attempt to edit/save.
      var views = crm.Environment.detailViewsToRefreshOnUpdate || [];
      crm.Environment.refreshViews(views);
    },
    refreshActivityLists: function refreshActivityLists() {
      var views = crm.Environment.activityViewsToRefresh || [];
      crm.Environment.refreshViews(views);
    },
    refreshAttachmentViews: function refreshAttachmentViews() {
      var views = crm.Environment.attachmentViewsToRefresh || [];
      crm.Environment.refreshViews(views);
    },
    refreshViews: function refreshViews(views) {
      if (views && views.length > 0) {
        views.forEach(function (viewId) {
          var view = App.getView(viewId);
          if (view) {
            view.refreshRequired = true;
          }
        });
      }
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9FbnZpcm9ubWVudC5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwic2V0T2JqZWN0IiwiaW5pdGlhdGVDYWxsIiwibnVtYmVyIiwic2V0VGltZW91dCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsImluaXRpYXRlRW1haWwiLCJlbWFpbCIsInN1YmplY3QiLCJib2R5IiwibWFpbHRvVXJpIiwic2hvd01hcEZvckFkZHJlc3MiLCJhZGRyZXNzIiwicHJvdG9jb2wiLCJ2aWV3IiwiQXBwIiwiZ2V0VmlldyIsInNob3ciLCJsaW5rIiwidGl0bGUiLCJhdHRhY2htZW50Vmlld3NUb1JlZnJlc2giLCJhY3Rpdml0eVZpZXdzVG9SZWZyZXNoIiwiZGV0YWlsVmlld3NUb1JlZnJlc2hPblVwZGF0ZSIsInJlZnJlc2hTdGFsZURldGFpbFZpZXdzIiwidmlld3MiLCJjcm0iLCJFbnZpcm9ubWVudCIsInJlZnJlc2hWaWV3cyIsInJlZnJlc2hBY3Rpdml0eUxpc3RzIiwicmVmcmVzaEF0dGFjaG1lbnRWaWV3cyIsImxlbmd0aCIsImZvckVhY2giLCJ2aWV3SWQiLCJyZWZyZXNoUmVxdWlyZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFrQkE7Ozs7QUFsQkE7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxNQUFNQSxVQUFVLGVBQUtDLFNBQUwsQ0FBZSxpQkFBZixFQUFrQztBQUNoRDtBQUNBO0FBQ0E7QUFDQUMsa0JBQWMsU0FBU0EsWUFBVCxDQUFzQkMsTUFBdEIsRUFBOEI7QUFDMUNDLGlCQUFXLFlBQU07QUFDZkMsZUFBT0MsUUFBUCxDQUFnQkMsSUFBaEIsWUFBOEJKLE1BQTlCO0FBQ0QsT0FGRCxFQUVHLEdBRkg7QUFHRCxLQVIrQztBQVNoREssbUJBQWUsU0FBU0EsYUFBVCxDQUF1QkMsS0FBdkIsRUFBOEJDLE9BQTlCLEVBQXVDQyxJQUF2QyxFQUE2QztBQUMxRFAsaUJBQVcsWUFBTTtBQUNmLFlBQU1RLFlBQWFGLE9BQUQsZUFBc0JELEtBQXRCLGlCQUF1Q0MsT0FBdkMsZUFBdURDLFFBQVEsRUFBL0QsZ0JBQWdGRixLQUFsRztBQUNBSixlQUFPQyxRQUFQLENBQWdCQyxJQUFoQixHQUF1QkssU0FBdkI7QUFDRCxPQUhELEVBR0csSUFISCxFQUQwRCxDQUloRDtBQUNYLEtBZCtDO0FBZWhEQyx1QkFBbUIsU0FBU0EsaUJBQVQsQ0FBMkJDLE9BQTNCLEVBQW9DO0FBQ3JELFVBQU1QLE9BQVVGLE9BQU9DLFFBQVAsQ0FBZ0JTLFFBQTFCLDhDQUEyRUQsT0FBakY7QUFDQSxVQUFNRSxPQUFPQyxJQUFJQyxPQUFKLENBQVksV0FBWixDQUFiO0FBQ0EsVUFBSUYsSUFBSixFQUFVO0FBQ1JBLGFBQUtHLElBQUwsQ0FBVTtBQUNSQyxnQkFBTWIsSUFERTtBQUVSYyxpQkFBT1A7QUFGQyxTQUFWO0FBSUQ7QUFDRixLQXhCK0M7QUF5QmhEUSw4QkFBMEIsQ0FDeEIsbUJBRHdCLEVBRXhCLGlCQUZ3QixFQUd4QixvQkFId0IsRUFJeEIsNEJBSndCLEVBS3hCLDRCQUx3QixFQU14Qix5QkFOd0IsRUFPeEIsZ0NBUHdCLEVBUXhCLDJCQVJ3QixFQVN4Qiw2QkFUd0IsRUFVeEIsNEJBVndCLENBekJzQjtBQXFDaERDLDRCQUF3QixDQUN0QixpQkFEc0IsRUFFdEIsZUFGc0IsRUFHdEIsaUJBSHNCLEVBSXRCLGtCQUpzQixFQUt0Qix3QkFMc0IsRUFNdEIsaUJBTnNCLEVBT3RCLGNBUHNCLENBckN3QjtBQThDaERDLGtDQUE4QixDQUM1QixnQkFENEIsRUFFNUIsZ0JBRjRCLEVBRzVCLG9CQUg0QixFQUk1QixhQUo0QixFQUs1QixlQUw0QixDQTlDa0I7QUFxRGhEQyw2QkFBeUIsU0FBU0EsdUJBQVQsR0FBbUM7QUFDMUQ7QUFDQTtBQUNBLFVBQU1DLFFBQVFDLElBQUlDLFdBQUosQ0FBZ0JKLDRCQUFoQixJQUFnRCxFQUE5RDtBQUNBRyxVQUFJQyxXQUFKLENBQWdCQyxZQUFoQixDQUE2QkgsS0FBN0I7QUFDRCxLQTFEK0M7QUEyRGhESSwwQkFBc0IsU0FBU0Esb0JBQVQsR0FBZ0M7QUFDcEQsVUFBTUosUUFBUUMsSUFBSUMsV0FBSixDQUFnQkwsc0JBQWhCLElBQTBDLEVBQXhEO0FBQ0FJLFVBQUlDLFdBQUosQ0FBZ0JDLFlBQWhCLENBQTZCSCxLQUE3QjtBQUNELEtBOUQrQztBQStEaERLLDRCQUF3QixTQUFTQSxzQkFBVCxHQUFrQztBQUN4RCxVQUFNTCxRQUFRQyxJQUFJQyxXQUFKLENBQWdCTix3QkFBaEIsSUFBNEMsRUFBMUQ7QUFDQUssVUFBSUMsV0FBSixDQUFnQkMsWUFBaEIsQ0FBNkJILEtBQTdCO0FBQ0QsS0FsRStDO0FBbUVoREcsa0JBQWMsU0FBU0EsWUFBVCxDQUFzQkgsS0FBdEIsRUFBNkI7QUFDekMsVUFBSUEsU0FBU0EsTUFBTU0sTUFBTixHQUFlLENBQTVCLEVBQStCO0FBQzdCTixjQUFNTyxPQUFOLENBQWMsVUFBQ0MsTUFBRCxFQUFZO0FBQ3hCLGNBQU1sQixPQUFPQyxJQUFJQyxPQUFKLENBQVlnQixNQUFaLENBQWI7QUFDQSxjQUFJbEIsSUFBSixFQUFVO0FBQ1JBLGlCQUFLbUIsZUFBTCxHQUF1QixJQUF2QjtBQUNEO0FBQ0YsU0FMRDtBQU1EO0FBQ0Y7QUE1RStDLEdBQWxDLENBQWhCOztvQkErRWVuQyxPIiwiZmlsZSI6IkVudmlyb25tZW50LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0ICdkb2pvL19iYXNlL3NuaWZmJztcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLkVudmlyb25tZW50XHJcbiAqXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gbGFuZy5zZXRPYmplY3QoJ2NybS5FbnZpcm9ubWVudCcsIHtcclxuICAvLyB0b2RvOiBvcGVuIGEgbmV3IGJyb3dzZXIgd2luZG93IGZvciB0aGVzZSB3aGVuIG9uIGEgbW9iaWxlIGRldmljZT9cclxuICAvLyBvbiBhIG1vYmlsZSBkZXZpY2UsIGxhdW5jaGluZyBhbiBleHRlcm5hbCBoYW5kbGVyIGNhbiBpbXBhY3QgYSB2aWV3IHRyYW5zaXRpb24sIGFuZCBjYXVzZSBpc3N1ZXMsIHdoaWNoIHRoZSB0aW1lb3V0IHRha2VzIGNhcmUgb2YuXHJcbiAgLy8gbm90IHRoZSBiZXN0IHdheSwgcGVyaGFwcyBhIHBvc3QtdHJhbnNpdGlvbiBjYWxsYmFjayBzaG91bGQgYmUgdXNlZCBmb3IgbGF1bmNoaW5nIHRoZXNlPyBjaGVjayB0cmFuc2l0aW9uaW5nLCB0aGVuIHF1ZXVlIGlmIG5lZWRlZD9cclxuICBpbml0aWF0ZUNhbGw6IGZ1bmN0aW9uIGluaXRpYXRlQ2FsbChudW1iZXIpIHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGB0ZWw6JHtudW1iZXJ9YDtcclxuICAgIH0sIDUwMCk7XHJcbiAgfSxcclxuICBpbml0aWF0ZUVtYWlsOiBmdW5jdGlvbiBpbml0aWF0ZUVtYWlsKGVtYWlsLCBzdWJqZWN0LCBib2R5KSB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgY29uc3QgbWFpbHRvVXJpID0gKHN1YmplY3QpID8gYG1haWx0bzoke2VtYWlsfT9zdWJqZWN0PSR7c3ViamVjdH0mYm9keT0ke2JvZHkgfHwgJyd9YCA6IGBtYWlsdG86JHtlbWFpbH1gO1xyXG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IG1haWx0b1VyaTtcclxuICAgIH0sIDEwMDApOyAvLyAxIHNlYyBkZWxheSBmb3IgaVBhZCBpT1M1IHRvIGFjdHVhbGx5IHNhdmUgbmF2IHN0YXRlIHRvIGxvY2FsIHN0b3JhZ2VcclxuICB9LFxyXG4gIHNob3dNYXBGb3JBZGRyZXNzOiBmdW5jdGlvbiBzaG93TWFwRm9yQWRkcmVzcyhhZGRyZXNzKSB7XHJcbiAgICBjb25zdCBocmVmID0gYCR7d2luZG93LmxvY2F0aW9uLnByb3RvY29sfS8vbWFwcy5nb29nbGUuY29tL21hcHM/b3V0cHV0PWVtYmVkJnE9JHthZGRyZXNzfWA7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcoJ2xpbmtfdmlldycpO1xyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgdmlldy5zaG93KHtcclxuICAgICAgICBsaW5rOiBocmVmLFxyXG4gICAgICAgIHRpdGxlOiBhZGRyZXNzLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIGF0dGFjaG1lbnRWaWV3c1RvUmVmcmVzaDogW1xyXG4gICAgJ215YXR0YWNobWVudF9saXN0JyxcclxuICAgICdhdHRhY2htZW50X2xpc3QnLFxyXG4gICAgJ2F0dGFjaG1lbnRfcmVsYXRlZCcsXHJcbiAgICAnYWNjb3VudF9hdHRhY2htZW50X3JlbGF0ZWQnLFxyXG4gICAgJ2NvbnRhY3RfYXR0YWNobWVudF9yZWxhdGVkJyxcclxuICAgICdsZWFkX2F0dGFjaG1lbnRfcmVsYXRlZCcsXHJcbiAgICAnb3Bwb3J0dW5pdHlfYXR0YWNobWVudF9yZWxhdGVkJyxcclxuICAgICd0aWNrZXRfYXR0YWNobWVudF9yZWxhdGVkJyxcclxuICAgICdhY3Rpdml0eV9hdHRhY2htZW50X3JlbGF0ZWQnLFxyXG4gICAgJ2hpc3RvcnlfYXR0YWNobWVudF9yZWxhdGVkJyxcclxuICBdLFxyXG4gIGFjdGl2aXR5Vmlld3NUb1JlZnJlc2g6IFtcclxuICAgICdteWFjdGl2aXR5X2xpc3QnLFxyXG4gICAgJ2FjdGl2aXR5X2xpc3QnLFxyXG4gICAgJ2FjdGl2aXR5X2RldGFpbCcsXHJcbiAgICAnYWN0aXZpdHlfcmVsYXRlZCcsXHJcbiAgICAndGlja2V0YWN0aXZpdHlfcmVsYXRlZCcsXHJcbiAgICAnaGlzdG9yeV9yZWxhdGVkJyxcclxuICAgICdoaXN0b3J5X2xpc3QnLFxyXG4gIF0sXHJcbiAgZGV0YWlsVmlld3NUb1JlZnJlc2hPblVwZGF0ZTogW1xyXG4gICAgJ2FjY291bnRfZGV0YWlsJyxcclxuICAgICdjb250YWN0X2RldGFpbCcsXHJcbiAgICAnb3Bwb3J0dW5pdHlfZGV0YWlsJyxcclxuICAgICdsZWFkX2RldGFpbCcsXHJcbiAgICAndGlja2V0X2RldGFpbCcsXHJcbiAgXSxcclxuICByZWZyZXNoU3RhbGVEZXRhaWxWaWV3czogZnVuY3Rpb24gcmVmcmVzaFN0YWxlRGV0YWlsVmlld3MoKSB7XHJcbiAgICAvLyBMaXN0IG9mIGRldGFpbCB2aWV3cyB0aGF0IHdpbGwgbmVlZCByZWZyZXNoZWQgd2hlbiBhIG5vdGUgaXMgYWRkZWQgb3IgYW4gYWN0aXZpdHkgaXMgY29tcGxldGVkIChwb3NzaWJseSBvdGhlcnM/PykuXHJcbiAgICAvLyBPdGhlcndpc2UgdGhlIGV0YWcgd2lsbCBjaGFuZ2UgYW5kIHRoZSBzZXJ2ZXIgd2lsbCBnaXZlIGEgNDEyOiBQcmVjb25kaXRpb25lZCBmYWlsZWQgd2hlbiB3ZSBhdHRlbXB0IHRvIGVkaXQvc2F2ZS5cclxuICAgIGNvbnN0IHZpZXdzID0gY3JtLkVudmlyb25tZW50LmRldGFpbFZpZXdzVG9SZWZyZXNoT25VcGRhdGUgfHwgW107XHJcbiAgICBjcm0uRW52aXJvbm1lbnQucmVmcmVzaFZpZXdzKHZpZXdzKTtcclxuICB9LFxyXG4gIHJlZnJlc2hBY3Rpdml0eUxpc3RzOiBmdW5jdGlvbiByZWZyZXNoQWN0aXZpdHlMaXN0cygpIHtcclxuICAgIGNvbnN0IHZpZXdzID0gY3JtLkVudmlyb25tZW50LmFjdGl2aXR5Vmlld3NUb1JlZnJlc2ggfHwgW107XHJcbiAgICBjcm0uRW52aXJvbm1lbnQucmVmcmVzaFZpZXdzKHZpZXdzKTtcclxuICB9LFxyXG4gIHJlZnJlc2hBdHRhY2htZW50Vmlld3M6IGZ1bmN0aW9uIHJlZnJlc2hBdHRhY2htZW50Vmlld3MoKSB7XHJcbiAgICBjb25zdCB2aWV3cyA9IGNybS5FbnZpcm9ubWVudC5hdHRhY2htZW50Vmlld3NUb1JlZnJlc2ggfHwgW107XHJcbiAgICBjcm0uRW52aXJvbm1lbnQucmVmcmVzaFZpZXdzKHZpZXdzKTtcclxuICB9LFxyXG4gIHJlZnJlc2hWaWV3czogZnVuY3Rpb24gcmVmcmVzaFZpZXdzKHZpZXdzKSB7XHJcbiAgICBpZiAodmlld3MgJiYgdmlld3MubGVuZ3RoID4gMCkge1xyXG4gICAgICB2aWV3cy5mb3JFYWNoKCh2aWV3SWQpID0+IHtcclxuICAgICAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcodmlld0lkKTtcclxuICAgICAgICBpZiAodmlldykge1xyXG4gICAgICAgICAgdmlldy5yZWZyZXNoUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=