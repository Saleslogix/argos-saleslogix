define('crm/Views/Attachment/MyAttachmentList', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', '../../Format', './List'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _Format, _List) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _string = _interopRequireDefault(_dojoString);

    var _format = _interopRequireDefault(_Format);

    var _AttachmentList = _interopRequireDefault(_List);

    /**
     * @class crm.Views.Attachments.MyAttachmentList
     *
     * @extends crm.Views.Attachments.List
     *
     * @requires crm.Format
     * @requires crm.Views.Attachments.List
     *
     */
    var __class = (0, _declare['default'])('crm.Views.Attachment.MyAttachmentList', [_AttachmentList['default']], {
        id: 'myattachment_list',
        titleText: 'My Attachments',
        queryWhere: function queryWhere() {
            return _string['default'].substitute('createUser eq "${0}"', [this._formatUserKey(App.context['user'].$key)]);
        },
        _formatUserKey: function _formatUserKey(userKey) {
            if (userKey === 'ADMIN') {
                userKey = 'ADMIN       '; //The attachment feed is picky and requires the Admin key to be padded to a 12 char.
            }
            return userKey;
        }
    });

    _lang['default'].setObject('Mobile.SalesLogix.Views.Attachment.MyAttachmentList', __class);
    module.exports = __class;
});
