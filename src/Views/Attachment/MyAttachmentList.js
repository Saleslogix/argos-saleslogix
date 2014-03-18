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
       // queryInclude: [],
        queryWhere: function() {
            return string.substitute('createUser eq "${0}"', [App.context['user'].$key]);
       }
    });
});

