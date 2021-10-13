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
   * @class
   * @alias module:crm/Environment
   * @static
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

  /**
  * @module crm/Environment
  */
  var __class = _lang2.default.setObject('crm.Environment', /** @lends module:crm/Environment */{
    /**
     * @param {string} number
     */
    initiateCall: function initiateCall(number) {
      // todo: open a new browser window for these when on a mobile device?
      // on a mobile device, launching an external handler can impact a view transition, and cause issues, which the timeout takes care of.
      // not the best way, perhaps a post-transition callback should be used for launching these? check transitioning, then queue if needed?
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