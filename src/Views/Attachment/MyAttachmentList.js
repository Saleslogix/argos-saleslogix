import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import format from '../../Format';
import AttachmentList from './List';

/**
 * @class crm.Views.Attachments.MyAttachmentList
 *
 * @extends crm.Views.Attachments.List
 *
 * @requires crm.Format
 * @requires crm.Views.Attachments.List
 *
 */
var __class = declare('crm.Views.Attachment.MyAttachmentList', [AttachmentList], {
    id: 'myattachment_list',
    titleText: 'My Attachments',
    queryWhere: function() {
        return string.substitute('createUser eq "${0}"', [this._formatUserKey(App.context['user'].$key)]);
    },
    _formatUserKey: function(userKey) {
        if (userKey === 'ADMIN') {
            userKey = 'ADMIN       '; //The attachment feed is picky and requires the Admin key to be padded to a 12 char.
        }
        return userKey;
    }
});

lang.setObject('Mobile.SalesLogix.Views.Attachment.MyAttachmentList', __class);
export default __class;
