define('crm/Environment', ['exports', 'module', 'dojo/_base/lang', 'dojo/_base/window', 'dojo/_base/array', 'dojo/has', 'dojo/on', 'dojo/string', 'dojo/dom-construct', 'dojo/_base/sniff'], function (exports, module, _dojo_baseLang, _dojo_baseWindow, _dojo_baseArray, _dojoHas, _dojoOn, _dojoString, _dojoDomConstruct, _dojo_baseSniff) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _win = _interopRequireDefault(_dojo_baseWindow);

  var _array = _interopRequireDefault(_dojo_baseArray);

  var _has = _interopRequireDefault(_dojoHas);

  var _on = _interopRequireDefault(_dojoOn);

  var _string = _interopRequireDefault(_dojoString);

  var _domConstruct = _interopRequireDefault(_dojoDomConstruct);

  /**
   * @class crm.Environment
   *
   */
  var __class = _lang['default'].setObject('crm.Environment', {
    // todo: open a new browser window for these when on a mobile device?
    // on a mobile device, launching an external handler can impact a view transition, and cause issues, which the timeout takes care of.
    // not the best way, perhaps a post-transition callback should be used for launching these? check transitioning, then queue if needed?
    initiateCall: function initiateCall(number) {
      setTimeout(function () {
        window.location.href = _string['default'].substitute('tel:${0}', [number]);
      }, 500);
    },
    initiateEmail: function initiateEmail(email, subject, body) {
      setTimeout(function () {
        var mailtoUri = subject ? _string['default'].substitute('mailto:${0}?subject=${1}&body=${2}', [email, subject, body || '']) : _string['default'].substitute('mailto:${0}', [email]);
        window.location.href = mailtoUri;
      }, 1000); // 1 sec delay for iPad iOS5 to actually save nav state to local storage
    },
    showMapForAddress: function showMapForAddress(address) {
      var hiddenLink,
          href,
          windowName = '_blank';

      href = _string['default'].substitute('http://maps.google.com/maps?q=${0}', [address]);

      if ((0, _has['default'])('ie') || (0, _has['default'])('ff')) {
        window.open(href, windowName);
      } else {
        hiddenLink = _domConstruct['default'].create('a', {
          href: href,
          target: windowName
        }, _win['default'].body(), 'last');

        _on['default'].emit(hiddenLink, 'click', {
          bubbles: true,
          cancelable: true
        });

        _domConstruct['default'].destroy(hiddenLink);
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
        _array['default'].forEach(views, function (view_id) {
          var view = App.getView(view_id);
          if (view) {
            view.refreshRequired = true;
          }
        });
      }
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Environment', __class);
  module.exports = __class;
});
