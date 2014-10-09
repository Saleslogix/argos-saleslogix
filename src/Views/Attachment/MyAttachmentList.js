/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.Views.Attachments.MyAttachmentList
 *
 * @extends Mobile.SalesLogix.Views.Attachments.List
 *
 * @requires Mobile.SalesLogix.Format
 * @requires Mobile.SalesLogix.Views.Attachments.List
 *
 */
define('Mobile/SalesLogix/Views/Attachment/MyAttachmentList', [
    'dojo/_base/declare',
    'dojo/string',
    'Mobile/SalesLogix/Format',
    'Mobile/SalesLogix/Views/Attachment/List'
], function(
    declare,
    string,
    format,
    AttachmentList
) {

    return declare('Mobile.SalesLogix.Views.Attachment.MyAttachmentList', [AttachmentList], {
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
});

