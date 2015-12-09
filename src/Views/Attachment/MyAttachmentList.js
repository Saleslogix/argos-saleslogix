import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import AttachmentList from './List';
import getResource from 'argos/I18n';

const resource = getResource('attachmentMyList');

/**
 * @class crm.Views.Attachments.MyAttachmentList
 *
 * @extends crm.Views.Attachments.List
 *
 * @requires crm.Format
 * @requires crm.Views.Attachments.List
 *
 */
const __class = declare('crm.Views.Attachment.MyAttachmentList', [AttachmentList], {
  id: 'myattachment_list',
  titleText: resource.titleText,
  queryWhere: function queryWhere() {
    return string.substitute('createUser eq "${0}"', [this._formatUserKey(App.context.user.$key)]);
  },
  _formatUserKey: function _formatUserKey(userKey) {
    let key = userKey;
    if (key === 'ADMIN') {
      key = 'ADMIN       '; // The attachment feed is picky and requires the Admin key to be padded to a 12 char.
    }
    return key;
  },
});

lang.setObject('Mobile.SalesLogix.Views.Attachment.MyAttachmentList', __class);
export default __class;
