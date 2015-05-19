/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
/**
 * @class crm.Views.Attachments.MyAttachmentList
 *
 * @extends crm.Views.Attachments.List
 *
 * @requires crm.Format
 * @requires crm.Views.Attachments.List
 *
 */
define('crm/Views/Attachment/MyAttachmentList', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/string',
    '../../Format',
    './List'
], function (declare, lang, string, format, AttachmentList) {
    var __class = declare('crm.Views.Attachment.MyAttachmentList', [AttachmentList], {
        id: 'myattachment_list',
        titleText: 'My Attachments',
        queryWhere: function () {
            return string.substitute('createUser eq "${0}"', [this._formatUserKey(App.context['user'].$key)]);
        },
        _formatUserKey: function (userKey) {
            if (userKey === 'ADMIN') {
                userKey = 'ADMIN       '; //The attachment feed is picky and requires the Admin key to be padded to a 12 char.
            }
            return userKey;
        }
    });
    lang.setObject('Mobile.SalesLogix.Views.Attachment.MyAttachmentList', __class);
    return __class;
});
